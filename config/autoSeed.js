const db = require('./db');
const studentsList = require('./students.json');
const ExamModel = require('../models/ExamModel');

const targets6B = [
  { username: 'miguelavila', score: 43 },
  { username: 'estebancorrea', score: 44 },
  { username: 'izzacristancho', score: 38 },
  { username: 'lorenguevara', score: 44 },
  { username: 'emilialozano', score: 38 },
  { username: 'marianamartinez', score: 43 },
  { username: 'thomasmelendez', score: 14 },
  { username: 'juanjosemeza', score: 16 },
  { username: 'laurenmunoz', score: 37 },
  { username: 'ariortiz', score: 41 },
  { username: 'giselleperez', score: 43 },
  { username: 'juandiegoponton', score: 40 },
  { username: 'sofiaposada', score: 43 },
  { username: 'emmanuelrojas', score: 26 },
  { username: 'rudinsanchez', score: 45 },
  { username: 'santiagosilva', score: 39 },
  { username: 'salomevanegas', score: 43 },
  { username: 'matiasvelandia', score: 39 },
  { username: 'valeriazarate', score: 39 }
];

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

    for (const item of targets6B) {
      const official = studentsList.find(s => s.username === item.username);
      if (!official) continue;

      let stRecord = await db.queryOne(
        `SELECT * FROM students WHERE username = ? OR (LOWER(first_name) = ? AND LOWER(last_name) = ?) LIMIT 1`,
        [official.username, official.firstName.toLowerCase(), official.lastName.toLowerCase()]
      );

      if (!stRecord) {
        const res = await db.run(
          `INSERT INTO students (first_name, last_name, grade, username, last_login_at) VALUES (?, ?, ?, ?, ?)`,
          [official.firstName, official.lastName, official.grade, official.username, new Date().toISOString()]
        );
        stRecord = { id: Number(res.lastInsertRowid) };
      }

      // Generar respuestas de RW
      const rwAnswers = {};
      rwQuestions.forEach((q, idx) => {
        if (idx < item.score) {
          rwAnswers[q.id] = q.correct;
        } else {
          rwAnswers[q.id] = q.wrong;
        }
      });

      const evalRes = ExamModel.evaluateAnswers(rwAnswers, 0, 0);

      const existingSub = await db.queryOne(`SELECT * FROM submissions WHERE student_id = ?`, [stRecord.id]);

      if (existingSub) {
        // PRESERVAR EL PUNTAJE REAL DE LISTENING DEL ESTUDIANTE
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

        console.log(`✅ [6B Preservado] Actualizada entrega #${existingSub.id} de ${official.fullName}: Listening ${currentListening}/125 + RW ${newRWScore}/48 = Total ${newTotal}/173`);

      } else {
        // Nueva entrega si el alumno no tenía registro previo
        await db.run(
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

        console.log(`✅ [6B Nueva] Creada entrega de ${official.fullName}: RW ${evalRes.score_reading_writing}/48`);
      }
    }
  } catch (err) {
    console.error('AutoSeed 6B notice:', err.message);
  }
}

module.exports = seed6BSubmissions;
