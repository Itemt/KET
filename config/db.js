const path = require('path');
const fs = require('fs');

let db = null;

// Archivo de respaldo en /tmp para entornos Serverless (Vercel)
const tmpJsonPath = '/tmp/ket_data.json';

function loadTmpStore() {
  try {
    if (fs.existsSync(tmpJsonPath)) {
      const raw = fs.readFileSync(tmpJsonPath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Error leyendo /tmp/ket_data.json:', e.message);
  }
  return { students: [], submissions: [] };
}

function saveTmpStore(store) {
  try {
    fs.writeFileSync(tmpJsonPath, JSON.stringify(store, null, 2), 'utf8');
  } catch (e) {
    console.warn('Error guardando en /tmp/ket_data.json:', e.message);
  }
}

// Intentar cargar SQLite con better-sqlite3 (Entorno Local / Railway)
try {
  const Database = require('better-sqlite3');

  try {
    const uploadsDir = path.join(__dirname, '../uploads/speaking');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (e) {
    // Silencioso en Serverless
  }

  const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
  const dbPath = isVercel ? '/tmp/ket_exam.db' : path.join(__dirname, '../ket_exam.db');
  
  db = new Database(dbPath);
  if (!isVercel) {
    db.pragma('journal_mode = WAL');
  }

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

  console.log('✅ Base de Datos SQLite inicializada correctamente.');

} catch (err) {
  console.warn('⚠️ Activando motor de datos resiliente para Serverless:', err.message);

  global.memoryStore = global.memoryStore || loadTmpStore();
  const memoryStore = global.memoryStore;

  db = {
    memory: true,
    prepare: (query) => {
      const q = query.toLowerCase();
      
      return {
        run: (...args) => {
          if (q.includes('insert into students')) {
            const existing = memoryStore.students.find(s => 
              (s.username && args[3] && s.username.toLowerCase() === args[3].toLowerCase()) ||
              (s.first_name.toLowerCase() === args[0].toLowerCase() && s.last_name.toLowerCase() === args[1].toLowerCase())
            );
            if (existing) {
              existing.last_login_at = new Date().toISOString();
              saveTmpStore(memoryStore);
              return { lastInsertRowid: existing.id };
            }
            const id = memoryStore.students.length + 1;
            const newStudent = { id, first_name: args[0], last_name: args[1], grade: args[2], username: args[3] || '', last_login_at: new Date().toISOString(), created_at: new Date().toISOString() };
            memoryStore.students.push(newStudent);
            saveTmpStore(memoryStore);
            return { lastInsertRowid: id };
          }
          if (q.includes('insert into submissions')) {
            const id = memoryStore.submissions.length + 1;
            const newSub = {
              id,
              student_id: args[0],
              attempt_time: args[1] || new Date().toISOString(),
              score_reading_writing: args[2],
              score_listening: args[3],
              total_auto_score: args[4],
              max_auto_score: args[5],
              writing_part6: args[6],
              writing_part7: args[7],
              speaking_audio_url: args[8],
              raw_answers_json: args[9],
              submitted_at: new Date().toISOString()
            };
            memoryStore.submissions.push(newSub);
            saveTmpStore(memoryStore);
            return { lastInsertRowid: id };
          }
          if (q.includes('delete from submissions')) {
            memoryStore.submissions = memoryStore.submissions.filter(s => s.id !== parseInt(args[0], 10));
            saveTmpStore(memoryStore);
            return { changes: 1 };
          }
          return { lastInsertRowid: 1, changes: 0 };
        },
        get: (...args) => {
          if (q.includes('from students')) {
            if (args.length === 1) { // Buscar por username o ID
              return memoryStore.students.find(s => 
                (s.username && s.username.toLowerCase() === args[0].toString().toLowerCase()) ||
                s.id === parseInt(args[0], 10)
              ) || null;
            }
            return memoryStore.students.find(s => 
              s.first_name.toLowerCase() === args[0].toLowerCase() &&
              s.last_name.toLowerCase() === args[1].toLowerCase() &&
              s.grade === args[2]
            ) || null;
          }
          if (q.includes('from submissions')) {
            const subId = parseInt(args[0], 10);
            const sub = memoryStore.submissions.find(s => s.id === subId);
            if (sub) {
              const st = memoryStore.students.find(s => s.id === sub.student_id) || {};
              return {
                ...sub,
                first_name: st.first_name || 'Estudiante',
                last_name: st.last_name || '',
                grade: st.grade || '6to',
                attempt_time: sub.attempt_time || sub.submitted_at
              };
            }
            return null;
          }
          return null;
        },
        all: () => {
          if (q.includes('from submissions')) {
            return memoryStore.submissions.map(sub => {
              const st = memoryStore.students.find(s => s.id === sub.student_id) || {};
              return {
                submission_id: sub.id,
                student_id: sub.student_id,
                first_name: st.first_name || 'Estudiante',
                last_name: st.last_name || '',
                grade: st.grade || '6to',
                attempt_time: sub.attempt_time || sub.submitted_at,
                score_reading_writing: sub.score_reading_writing,
                score_listening: sub.score_listening,
                total_auto_score: sub.total_auto_score,
                max_auto_score: sub.max_auto_score,
                writing_part6: sub.writing_part6,
                writing_part7: sub.writing_part7,
                speaking_audio_url: sub.speaking_audio_url,
                submitted_at: sub.submitted_at
              };
            });
          }
          return [];
        }
      };
    }
  };
}

module.exports = db;
