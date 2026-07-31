const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Asegurar que existan los directorios necesarios
const uploadsDir = path.join(__dirname, '../uploads/speaking');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(__dirname, '../ket_exam.db');
const db = new Database(dbPath);

// Configurar pragmas para rendimiento e integridad
db.pragma('journal_mode = WAL');

// Inicializar esquemas de la base de datos
function initDatabase() {
  // Tabla de Estudiantes
  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      grade TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Tabla de Envíos de Examen (Submissions)
  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
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

  console.log('✅ Base de Datos SQLite inicializada correctamente.');
}

initDatabase();

module.exports = db;
