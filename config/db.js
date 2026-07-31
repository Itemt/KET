const path = require('path');
const fs = require('fs');

let db = null;
const CLOUD_STORE_URL = 'https://jsonblob.com/api/jsonBlob/019fb8a2-b355-7175-8959-772dcddae5ca';
const tmpJsonPath = '/tmp/ket_data.json';

// Cache en memoria global
global.memoryStore = global.memoryStore || { students: [], submissions: [] };

async function fetchCloudStore() {
  try {
    const res = await fetch(CLOUD_STORE_URL, { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.students) && Array.isArray(data.submissions)) {
        global.memoryStore = data;
        return data;
      }
    }
  } catch (e) {
    console.warn('Advertencia leyendo Cloud Store:', e.message);
  }
  
  try {
    if (fs.existsSync(tmpJsonPath)) {
      const raw = fs.readFileSync(tmpJsonPath, 'utf8');
      global.memoryStore = JSON.parse(raw);
    }
  } catch (e) {}

  return global.memoryStore;
}

async function saveCloudStore(store) {
  global.memoryStore = store;
  
  try {
    fs.writeFileSync(tmpJsonPath, JSON.stringify(store, null, 2), 'utf8');
  } catch (e) {}

  try {
    await fetch(CLOUD_STORE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(store)
    });
  } catch (e) {
    console.warn('Advertencia guardando en Cloud Store:', e.message);
  }
}

// Intentar SQLite nativo primero (Local / Railway)
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

  console.log('✅ Base de Datos SQLite nativa cargada.');

} catch (err) {
  console.log('ℹ️ Motor Cloud Async activado para Serverless.');

  db = {
    isServerless: true,
    fetchStore: fetchCloudStore,
    saveStore: saveCloudStore
  };
}

module.exports = db;
