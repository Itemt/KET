const path = require('path');
const fs = require('fs');

// ============================================================
// Motor de Base de Datos Unificado (Turso Cloud / SQLite Local)
// - En Vercel / Serverless: usa Turso (libSQL en la nube)
// - En local sin TURSO_DATABASE_URL: usa SQLite nativo (better-sqlite3)
// ============================================================

let db = null;

// ============================================================
// MOTOR TURSO / libSQL (Serverless - siempre persistente)
// ============================================================
async function initTurso() {
  const { createClient } = require('@libsql/client');

  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (!tursoUrl) {
    throw new Error('TURSO_DATABASE_URL no configurado');
  }

  const client = createClient({
    url: tursoUrl,
    authToken: tursoToken || undefined
  });

  // Crear tablas si no existen
  await client.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      grade TEXT NOT NULL,
      username TEXT,
      last_login_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      attempt_time TEXT,
      score_reading_writing INTEGER DEFAULT 0,
      score_listening INTEGER DEFAULT 0,
      total_auto_score INTEGER DEFAULT 0,
      max_auto_score INTEGER DEFAULT 0,
      writing_part6 TEXT,
      writing_part7 TEXT,
      speaking_audio_url TEXT,
      raw_answers_json TEXT NOT NULL DEFAULT '{}',
      submitted_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    )
  `);

  // Tablas Bonus
  await client.execute(`
    CREATE TABLE IF NOT EXISTS bonus_students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      grade TEXT NOT NULL,
      username TEXT,
      last_login_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS bonus_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      attempt_time TEXT,
      total_auto_score INTEGER DEFAULT 0,
      max_auto_score INTEGER DEFAULT 0,
      bonus_writing TEXT,
      raw_answers_json TEXT NOT NULL DEFAULT '{}',
      submitted_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (student_id) REFERENCES bonus_students(id) ON DELETE CASCADE
    )
  `);

  // Migraciones defensivas (Safe Alter) para asegurar que bases de datos existentes no fallen jamás
  const safeAlter = async (sql) => {
    try { await client.execute(sql); } catch (e) { /* Columna ya existe */ }
  };

  await safeAlter(`ALTER TABLE students ADD COLUMN username TEXT;`);
  await safeAlter(`ALTER TABLE students ADD COLUMN last_login_at TEXT;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN attempt_time TEXT;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN score_reading_writing INTEGER DEFAULT 0;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN score_listening INTEGER DEFAULT 0;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN total_auto_score INTEGER DEFAULT 0;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN max_auto_score INTEGER DEFAULT 0;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN writing_part6 TEXT;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN writing_part7 TEXT;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN speaking_audio_url TEXT;`);
  await safeAlter(`ALTER TABLE submissions ADD COLUMN raw_answers_json TEXT DEFAULT '{}';`);

  // Índices para búsquedas rápidas
  try {
    await client.execute(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_students_username ON students(username) WHERE username IS NOT NULL AND username != ''
    `);
  } catch (e) {}

  console.log('✅ Base de Datos Turso (libSQL en la nube) conectada y verificada.');
  return client;
}

// ============================================================
// Inicialización sincrónica con detección de entorno
// ============================================================
const TURSO_CONFIGURED = !!process.env.TURSO_DATABASE_URL;

if (TURSO_CONFIGURED) {
  console.log('ℹ️ Usando motor Turso (libSQL en la nube)...');

  let _tursoClient = null;
  let _initPromise = null;

  async function getTursoClient() {
    if (_tursoClient) return _tursoClient;
    if (_initPromise) return _initPromise;
    _initPromise = initTurso().then(client => {
      _tursoClient = client;
      _initPromise = null;
      return client;
    });
    return _initPromise;
  }

  db = {
    isTurso: true,
    getClient: getTursoClient,

    async execute(sql, args = []) {
      const client = await getTursoClient();
      return client.execute({ sql, args });
    },

    async queryAll(sql, args = []) {
      const result = await this.execute(sql, args);
      return result && result.rows ? result.rows : [];
    },

    async queryOne(sql, args = []) {
      const result = await this.execute(sql, args);
      return result && result.rows && result.rows[0] ? result.rows[0] : null;
    },

    async run(sql, args = []) {
      const result = await this.execute(sql, args);
      return {
        lastInsertRowid: result.lastInsertRowid,
        changes: result.rowsAffected
      };
    }
  };

  getTursoClient().catch(err => {
    console.error('❌ Error al conectar con Turso:', err.message);
  });

} else {
  // Fallback: SQLite nativo para desarrollo local
  try {
    const Database = require('better-sqlite3');

    const uploadsDir = path.join(__dirname, '../uploads/speaking');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const dbPath = path.join(__dirname, '../ket_exam.db');
    const nativeDb = new Database(dbPath);
    nativeDb.pragma('journal_mode = WAL');

    nativeDb.exec(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        grade TEXT NOT NULL,
        username TEXT,
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
        raw_answers_json TEXT NOT NULL DEFAULT '{}',
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
      );
    `);

    // Migraciones defensivas (Safe Alter) para SQLite local
    const safeAlterNative = (sql) => {
      try { nativeDb.exec(sql); } catch (e) {}
    };

    safeAlterNative(`ALTER TABLE students ADD COLUMN username TEXT;`);
    safeAlterNative(`ALTER TABLE students ADD COLUMN last_login_at DATETIME;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN attempt_time DATETIME;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN score_reading_writing INTEGER DEFAULT 0;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN score_listening INTEGER DEFAULT 0;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN total_auto_score INTEGER DEFAULT 0;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN max_auto_score INTEGER DEFAULT 0;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN writing_part6 TEXT;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN writing_part7 TEXT;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN speaking_audio_url TEXT;`);
    safeAlterNative(`ALTER TABLE submissions ADD COLUMN raw_answers_json TEXT DEFAULT '{}';`);

    db = {
      isTurso: false,
      _native: nativeDb,

      async execute(sql, args = []) {
        const rows = nativeDb.prepare(sql).all(...args);
        return { rows };
      },

      async queryAll(sql, args = []) {
        return nativeDb.prepare(sql).all(...args) || [];
      },

      async queryOne(sql, args = []) {
        return nativeDb.prepare(sql).get(...args) || null;
      },

      async run(sql, args = []) {
        const info = nativeDb.prepare(sql).run(...args);
        return {
          lastInsertRowid: info.lastInsertRowid,
          changes: info.changes
        };
      }
    };

    console.log('✅ Base de Datos SQLite local cargada y verificada.');

  } catch (err) {
    console.error('❌ Error crítico al inicializar la base de datos:', err.message);
    throw err;
  }
}

module.exports = db;
