const path = require('path');
const fs = require('fs');

let db = null;

// === ALMACENAMIENTO EN LA NUBE - BONUS ===
const CLOUD_PRIMARY_URL = 'https://jsonblob.com/api/jsonBlob/019fc84b-aa86-7824-844e-d54414f3c0db';

// Rutas de respaldo local
const tmpJsonPath = '/tmp/ket_bonus_data.json';
const backupJsonPath = path.join(__dirname, '../data/ket_bonus_backup.json');

// Cache en memoria global independiente para el Bonus
global.bonusMemoryStore = global.bonusMemoryStore || null;

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
        global.bonusMemoryStore = data;
        try { fs.writeFileSync(tmpJsonPath, JSON.stringify(data, null, 2), 'utf8'); } catch (e) {}
        try { fs.writeFileSync(backupJsonPath, JSON.stringify(data, null, 2), 'utf8'); } catch (e) {}
        return data;
      }
    }
  } catch (e) {
    console.warn('⚠️ Bonus Cloud Store primario no disponible:', e.message);
  }

  // 2. Fallback a /tmp local
  try {
    if (fs.existsSync(tmpJsonPath)) {
      const raw = fs.readFileSync(tmpJsonPath, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.students) && Array.isArray(parsed.submissions)) {
        console.log('ℹ️ Bonus: Usando respaldo /tmp local.');
        global.bonusMemoryStore = parsed;
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
        console.log('ℹ️ Bonus: Usando respaldo del repositorio local.');
        global.bonusMemoryStore = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  // 4. Memoria en caliente de la sesión
  if (global.bonusMemoryStore) {
    return global.bonusMemoryStore;
  }

  // 5. Tabla vacía
  const empty = { students: [], submissions: [] };
  global.bonusMemoryStore = empty;
  return empty;
}

// ============================================================
// SAVE - Guarda datos con escritura en cascada
// ============================================================
async function saveCloudStore(store) {
  global.bonusMemoryStore = store;

  try { fs.writeFileSync(tmpJsonPath, JSON.stringify(store, null, 2), 'utf8'); } catch (e) {}
  try { fs.writeFileSync(backupJsonPath, JSON.stringify(store, null, 2), 'utf8'); } catch (e) {}

  fetch(CLOUD_PRIMARY_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(store),
    signal: AbortSignal.timeout(8000)
  }).then(r => {
    if (!r.ok) console.warn('⚠️ Error guardando en Bonus Cloud Store, status:', r.status);
  }).catch(e => {
    console.warn('⚠️ Error de red al guardar en Bonus Cloud Store:', e.message);
  });
}

try {
  const Database = require('better-sqlite3');
  const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
  if (isVercel) {
    throw new Error('Entorno Vercel Serverless para Bonus.');
  }

  const dbPath = path.join(__dirname, '../ket_bonus_exam.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS bonus_students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      grade TEXT NOT NULL,
      username TEXT UNIQUE,
      last_login_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bonus_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      attempt_time DATETIME,
      total_auto_score INTEGER DEFAULT 0,
      max_auto_score INTEGER DEFAULT 0,
      bonus_writing TEXT,
      raw_answers_json TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ Base de Datos SQLite Bonus cargada.');

} catch (err) {
  console.log('ℹ️ Motor Async Bonus Cloud Store activado para Serverless.');

  db = {
    isServerless: true,
    fetchStore: fetchCloudStore,
    saveStore: saveCloudStore
  };
}

module.exports = db;
