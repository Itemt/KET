const path = require('path');
const fs = require('fs');

let db = null;

// === ALMACENAMIENTO EN LA NUBE - PRIMARIO Y SECUNDARIO ===
// Primario: JSONBlob (activo y con datos del 31 de julio)
const CLOUD_PRIMARY_URL = 'https://jsonblob.com/api/jsonBlob/019fc84b-a815-70ce-ae0e-37c7c5b58b8f';

// Rutas de respaldo local
const tmpJsonPath = '/tmp/ket_data.json';
const backupJsonPath = path.join(__dirname, '../data/ket_backup.json');

// Cache en memoria global
global.memoryStore = global.memoryStore || null;

// Mutex simple para prevenir condiciones de carrera en envíos simultáneos
global._ketSaveLock = global._ketSaveLock || Promise.resolve();

async function withSaveLock(fn) {
  let releaseLock;
  const lockAcquired = new Promise(resolve => { releaseLock = resolve; });
  const prevLock = global._ketSaveLock;
  global._ketSaveLock = lockAcquired;
  await prevLock;
  try {
    return await fn();
  } finally {
    releaseLock();
  }
}

// ============================================================
// FETCH - Lee datos con cascada de fallbacks
// ============================================================
async function fetchCloudStore() {
  // 1. Intentar leer desde la nube primaria
  try {
    const res = await fetch(CLOUD_PRIMARY_URL, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.students) && Array.isArray(data.submissions)) {
        global.memoryStore = data;
        // Actualizar respaldo local silenciosamente
        try { fs.writeFileSync(tmpJsonPath, JSON.stringify(data, null, 2), 'utf8'); } catch (e) {}
        try { fs.writeFileSync(backupJsonPath, JSON.stringify(data, null, 2), 'utf8'); } catch (e) {}
        return data;
      }
    }
  } catch (e) {
    console.warn('⚠️ Cloud Store primario no disponible:', e.message);
  }

  // 2. Fallback a /tmp local
  try {
    if (fs.existsSync(tmpJsonPath)) {
      const raw = fs.readFileSync(tmpJsonPath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.students) && Array.isArray(parsed.submissions)) {
        console.log('ℹ️ Usando respaldo /tmp local.');
        global.memoryStore = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  // 3. Fallback al archivo de respaldo en el repo
  try {
    if (fs.existsSync(backupJsonPath)) {
      const raw = fs.readFileSync(backupJsonPath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.students) && Array.isArray(parsed.submissions)) {
        console.log('ℹ️ Usando respaldo del repositorio local.');
        global.memoryStore = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  // 4. Último recurso: memoria en caliente (si ya fue cargada antes en esta sesión)
  if (global.memoryStore) {
    console.log('ℹ️ Usando memoria en caliente de la sesión actual.');
    return global.memoryStore;
  }

  // 5. Tabla vacía
  const empty = { students: [], submissions: [] };
  global.memoryStore = empty;
  return empty;
}

// ============================================================
// SAVE - Guarda datos con escritura en cascada
// ============================================================
async function saveCloudStore(store) {
  // Siempre actualizar la memoria
  global.memoryStore = store;

  // Guardar en /tmp local (síncrono, siempre funciona en Vercel durante la sesión)
  try { fs.writeFileSync(tmpJsonPath, JSON.stringify(store, null, 2), 'utf8'); } catch (e) {}

  // Guardar en respaldo del repo (si tiene permisos de escritura)
  try { fs.writeFileSync(backupJsonPath, JSON.stringify(store, null, 2), 'utf8'); } catch (e) {}

  // Guardar en la nube primaria (async, no bloquea la respuesta al estudiante)
  fetch(CLOUD_PRIMARY_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(store),
    signal: AbortSignal.timeout(8000)
  }).then(r => {
    if (!r.ok) console.warn('⚠️ Error guardando en Cloud Store primario, status:', r.status);
  }).catch(e => {
    console.warn('⚠️ Error de red al guardar en Cloud Store:', e.message);
  });
}

// ============================================================
// Intentar SQLite nativo primero (Local / Railway)
// ============================================================
try {
  const Database = require('better-sqlite3');

  try {
    const uploadsDir = path.join(__dirname, '../uploads/speaking');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (e) {}

  const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
  if (isVercel) {
    throw new Error('Entorno Vercel Serverless activado - usando motor Async Cloud Store.');
  }

  const dbPath = path.join(__dirname, '../ket_exam.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      grade TEXT NOT NULL,
      username TEXT UNIQUE,
      last_login_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      attempt_time DATETIME,
      score_reading_writing INTEGER DEFAULT 0,
      score_listening INTEGER DEFAULT 0,
      total_auto_score INTEGER DEFAULT 0,
      max_auto_score INTEGER DEFAULT 0,
      writing_part6 TEXT,
      writing_part7 TEXT,
      speaking_audio_url TEXT,
      raw_answers_json TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    );
  `);

  try { db.exec(`ALTER TABLE students ADD COLUMN username TEXT;`); } catch (e) {}
  try { db.exec(`ALTER TABLE submissions ADD COLUMN attempt_time DATETIME;`); } catch (e) {}

  console.log('✅ Base de Datos SQLite nativa cargada.');

} catch (err) {
  console.log('ℹ️ Motor Cloud Async activado para Serverless.');

  db = {
    isServerless: true,
    fetchStore: fetchCloudStore,
    saveStore: saveCloudStore,
    withLock: withSaveLock
  };
}

module.exports = db;
