const path = require('path');
const fs = require('fs');

let db = null;

// Intentar cargar SQLite con better-sqlite3
try {
  const Database = require('better-sqlite3');

  // Crear carpeta de uploads solo si es entorno local / con escritura
  try {
    const uploadsDir = path.join(__dirname, '../uploads/speaking');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (e) {
    console.warn('Directorio /uploads no editable en Serverless.');
  }

  // En Vercel o entorno Serverless, usar base de datos en memoria o archivo temporal
  const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
  const dbPath = isVercel ? ':memory:' : path.join(__dirname, '../ket_exam.db');
  
  db = new Database(dbPath);
  if (!isVercel) {
    db.pragma('journal_mode = WAL');
  }

  // Inicializar tablas
  db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      grade TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

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

} catch (err) {
  console.warn('⚠️ SQLite nativo no disponible en este entorno Serverless. Activando almacenamiento en memoria fallback:', err.message);

  // Fallback DB en memoria para entornos Serverless como Vercel
  const memoryStore = {
    students: [],
    submissions: []
  };

  db = {
    memory: true,
    prepare: (query) => {
      const q = query.toLowerCase();
      
      return {
        run: (...args) => {
          if (q.includes('insert into students')) {
            const id = memoryStore.students.length + 1;
            memoryStore.students.push({ id, first_name: args[0], last_name: args[1], grade: args[2], created_at: new Date().toISOString() });
            return { lastInsertRowid: id };
          }
          if (q.includes('insert into submissions')) {
            const id = memoryStore.submissions.length + 1;
            memoryStore.submissions.push({
              id,
              student_id: args[0],
              score_reading_writing: args[1],
              score_listening: args[2],
              total_auto_score: args[3],
              max_auto_score: args[4],
              writing_part6: args[5],
              writing_part7: args[6],
              speaking_audio_url: args[7],
              raw_answers_json: args[8],
              submitted_at: new Date().toISOString()
            });
            return { lastInsertRowid: id };
          }
          if (q.includes('delete from submissions')) {
            memoryStore.submissions = memoryStore.submissions.filter(s => s.id !== args[0]);
            return { changes: 1 };
          }
          return { lastInsertRowid: 1, changes: 0 };
        },
        get: (...args) => {
          if (q.includes('from students')) {
            return memoryStore.students.find(s => 
              s.first_name.toLowerCase() === args[0].toLowerCase() &&
              s.last_name.toLowerCase() === args[1].toLowerCase() &&
              s.grade === args[2]
            ) || null;
          }
          if (q.includes('from submissions')) {
            const sub = memoryStore.submissions.find(s => s.id === parseInt(args[0], 10));
            if (sub) {
              const st = memoryStore.students.find(s => s.id === sub.student_id) || {};
              return { ...sub, first_name: st.first_name || 'Estudiante', last_name: st.last_name || '', grade: st.grade || '6to' };
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
