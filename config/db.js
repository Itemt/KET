const path = require('path');
const fs = require('fs');

// ============================================================
// Motor de Base de Datos Unificado
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

  // Índices para búsquedas rápidas por username
  await client.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_students_username ON students(username) WHERE username IS NOT NULL AND username != ''
  `);

  console.log('✅ Base de Datos Turso (libSQL en la nube) conectada y lista.');
  return client;
}

// ============================================================
// Inicialización sincrónica con detección de entorno
// ============================================================
const TURSO_CONFIGURED = !!process.env.TURSO_DATABASE_URL;

if (TURSO_CONFIGURED) {
  // Turso disponible (Vercel o local con variable de entorno configurada)
  console.log('ℹ️ Usando motor Turso (libSQL en la nube)...');

  // Crear un proxy async que inicializa el cliente la primera vez
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

    // Métodos helper para mantener compatibilidad con el código existente
    async execute(sql, args = []) {
      const client = await getTursoClient();
      return client.execute({ sql, args });
    },

    async queryAll(sql, args = []) {
      const result = await this.execute(sql, args);
      return result.rows;
    },

    async queryOne(sql, args = []) {
      const result = await this.execute(sql, args);
      return result.rows[0] || null;
    },

    async run(sql, args = []) {
      const result = await this.execute(sql, args);
      return {
        lastInsertRowid: result.lastInsertRowid,
        changes: result.rowsAffected
      };
    }
  };

  // Inicializar inmediatamente en background
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

    try { nativeDb.exec(`ALTER TABLE students ADD COLUMN username TEXT;`); } catch (e) {}
    try { nativeDb.exec(`ALTER TABLE submissions ADD COLUMN attempt_time DATETIME;`); } catch (e) {}

    // Envolver el DB nativo en la misma interfaz async para compatibilidad
    db = {
      isTurso: false,
      _native: nativeDb,

      async execute(sql, args = []) {
        const rows = nativeDb.prepare(sql).all(...args);
        return { rows };
      },

      async queryAll(sql, args = []) {
        return nativeDb.prepare(sql).all(...args);
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

    console.log('✅ Base de Datos SQLite local cargada (modo desarrollo).');

  } catch (err) {
    console.error('❌ Error crítico al inicializar la base de datos:', err.message);
    console.error('💡 Configura TURSO_DATABASE_URL para usar la base de datos en la nube.');
    throw err;
  }
}

module.exports = db;
