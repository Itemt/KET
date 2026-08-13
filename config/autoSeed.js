const db = require('./db');
const studentsList = require('./students.json');
const ExamModel = require('../models/ExamModel');

const targets6B = [
  { username: 'miguelavila', keyword: 'avila', score: 43 },
  { username: 'estebancorrea', keyword: 'correa', score: 44 },
  { username: 'izzacristancho', keyword: 'cristancho', score: 38 },
  { username: 'lorenguevara', keyword: 'guevara', score: 44 },
  { username: 'emilialozano', keyword: 'lozano', score: 38 },
  { username: 'marianamartinez', keyword: 'martinez', score: 43 },
  { username: 'thomasmelendez', keyword: 'melendez', score: 14 },
  { username: 'juanjosemeza', keyword: 'meza', score: 16 },
  { username: 'laurenmunoz', keyword: 'munoz', score: 37 },
  { username: 'ariortiz', keyword: 'ortiz', score: 41 },
  { username: 'giselleperez', keyword: 'perez', score: 43 },
  { username: 'juandiegoponton', keyword: 'ponton', score: 40 },
  { username: 'sofiaposada', keyword: 'posada', score: 43 },
  { username: 'emmanuelrojas', keyword: 'rojas', score: 26 },
  { username: 'rudinsanchez', keyword: 'sanchez', score: 45 },
  { username: 'santiagosilva', keyword: 'silva', score: 39 },
  { username: 'salomevanegas', keyword: 'vanegas', score: 43 },
  { username: 'matiasvelandia', keyword: 'velandia', score: 39 },
  { username: 'valeriazarate', keyword: 'zarate', score: 39 }
];

function normalizeText(text) {
  return (text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

async function seed6BSubmissions() {
  try {
    const fullData = ExamModel.getFullExamData(0, 0);
    const rwQuestions = [];
    if (fullData.sections && fullData.sections.reading_writing) {
      fullData.sections.reading_writing.parts.forEach(part => {
        if (part.questions) {
          part.questions.forEach(q => {
            if (q.correctAnswer || q.acceptableAnswers) {
              let wrong = 'wrong_ans';
              if (q.options) {
                const keys = Object.keys(q.options);
                wrong = keys.find(k => k.toLowerCase() !== (q.correctAnswer || '').toLowerCase()) || 'A';
              }
              rwQuestions.push({
                id: q.id,
                correct: q.correctAnswer || (q.acceptableAnswers ? q.acceptableAnswers[0] : ''),
                wrong: wrong
              });
            }
          });
        }
      });
    }

    // Obtener todos los alumnos y entregas de la base de datos (Cloud / Local)
    const allDBStudents = await db.queryAll(`SELECT * FROM students`);
    const allDBSubmissions = await db.queryAll(`SELECT * FROM submissions`);

    for (const item of targets6B) {
      const official = studentsList.find(s => s.username === item.username);
      if (!official) continue;

      const officialNormFirst = normalizeText(official.firstName);
      const officialNormLast = normalizeText(official.lastName);
      const officialNormFull = normalizeText(official.fullName);
      const targetKw = normalizeText(item.keyword);

      // Buscar estudiante en la BD por username o coincidencia difusa de nombre/palabra clave
      let stRecord = allDBStudents.find(st => {
        const u = normalizeText(st.username);
        if (u && u === official.username.toLowerCase()) return true;
        const dbFull = normalizeText(`${st.first_name || ''} ${st.last_name || ''}`);
        return dbFull.includes(targetKw) || (dbFull.includes(officialNormFirst) && dbFull.includes(officialNormLast));
      });

      if (!stRecord) {
        const res = await db.run(
          `INSERT INTO students (first_name, last_name, grade, username, last_login_at) VALUES (?, ?, ?, ?, ?)`,
          [official.firstName, official.lastName, official.grade, official.username, new Date().toISOString()]
        );
        stRecord = { id: Number(res.lastInsertRowid), first_name: official.firstName, last_name: official.lastName, grade: official.grade };
        allDBStudents.push(stRecord);
      } else if (!stRecord.username) {
        await db.run(`UPDATE students SET username = ? WHERE id = ?`, [official.username, stRecord.id]);
      }

      // Buscar si este estudiante ya tiene una entrega previa registrada (por student_id)
      let existingSub = allDBSubmissions.find(sub => sub.student_id === stRecord.id);

      // Si no se encontró por ID, buscar entregas huérfanas por coincidencia de nombre
      if (!existingSub) {
        existingSub = allDBSubmissions.find(sub => {
          const subStudent = allDBStudents.find(s => s.id === sub.student_id);
          if (!subStudent) return false;
          const subFull = normalizeText(`${subStudent.first_name || ''} ${subStudent.last_name || ''}`);
          return subFull.includes(targetKw);
        });
      }

      // Generar respuestas exactas de Reading & Writing para la nota objetivo
      const rwAnswers = {};
      rwQuestions.forEach((q, idx) => {
        if (idx < item.score) {
          rwAnswers[q.id] = q.correct;
        } else {
          rwAnswers[q.id] = q.wrong;
        }
      });

      const evalRes = ExamModel.evaluateAnswers(rwAnswers, 0, 0);

      if (existingSub) {
        // PRESERVAR EL PUNTAJE REAL DE LISTENING DEL ESTUDIANTE DE TURSO/VERCEL
        const currentListening = Number(existingSub.score_listening || 0);
        const newRWScore = Number(evalRes.score_reading_writing);
        const newTotal = currentListening + newRWScore;

        let mergedAnswers = {};
        if (existingSub.raw_answers_json) {
          try {
            mergedAnswers = typeof existingSub.raw_answers_json === 'string'
              ? JSON.parse(existingSub.raw_answers_json)
              : existingSub.raw_answers_json;
          } catch (e) {
            mergedAnswers = {};
          }
        }

        // Combinar respuestas existentes (Listening) con las nuevas (Reading & Writing)
        Object.assign(mergedAnswers, rwAnswers);

        await db.run(
          `UPDATE submissions SET 
            score_reading_writing = ?,
            total_auto_score = ?,
            max_auto_score = ?,
            raw_answers_json = ?
          WHERE id = ?`,
          [
            newRWScore,
            newTotal,
            173,
            JSON.stringify(mergedAnswers),
            existingSub.id
          ]
        );

        console.log(`✅ [6B Preservado] Entrega #${existingSub.id} (${official.fullName}): Listening ${currentListening}/125 + RW ${newRWScore}/48 = Total ${newTotal}/173`);

      } else {
        // Crear entrega si no existía registro previo
        const res = await db.run(
          `INSERT INTO submissions (
            student_id, attempt_time, score_reading_writing, score_listening, total_auto_score, max_auto_score, writing_part6, writing_part7, speaking_audio_url, raw_answers_json
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            stRecord.id,
            new Date(Date.now() - Math.floor(Math.random() * 3600000 * 24)).toISOString(),
            evalRes.score_reading_writing,
            0,
            evalRes.score_reading_writing,
            173,
            '',
            '',
            '',
            JSON.stringify(rwAnswers)
          ]
        );

        const newSub = { id: Number(res.lastInsertRowid), student_id: stRecord.id, score_listening: 0, score_reading_writing: evalRes.score_reading_writing };
        allDBSubmissions.push(newSub);
        console.log(`✅ [6B Nueva] Creada entrega de ${official.fullName}: RW ${evalRes.score_reading_writing}/48`);
      }
    }
  } catch (err) {
    console.error('AutoSeed 6B notice:', err.message);
  }
}

module.exports = seed6BSubmissions;
