const path = require('path');
const fs = require('fs');

let db = null;
const CLOUD_STORE_URL = 'https://jsonblob.com/api/jsonBlob/019fb8d7-0bd6-731c-b97f-4cf857d9e57e';
const tmpJsonPath = '/tmp/ket_bonus_data.json';

// Cache en memoria global independiente para el Bonus
global.bonusMemoryStore = global.bonusMemoryStore || { students: [], submissions: [] };

async function fetchCloudStore() {
  try {
    const res = await fetch(CLOUD_STORE_URL, { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.students) && Array.isArray(data.submissions)) {
        global.bonusMemoryStore = data;
        return data;
      }
    }
  } catch (e) {
    console.warn('Advertencia leyendo Bonus Cloud Store:', e.message);
  }
  
  try {
    if (fs.existsSync(tmpJsonPath)) {
      const raw = fs.readFileSync(tmpJsonPath, 'utf8');
      global.bonusMemoryStore = JSON.parse(raw);
    }
  } catch (e) {}

  return global.bonusMemoryStore;
}

async function saveCloudStore(store) {
  global.bonusMemoryStore = store;
  
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
    console.warn('Advertencia guardando en Bonus Cloud Store:', e.message);
  }
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
