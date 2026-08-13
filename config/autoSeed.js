const db = require('./db');
const studentsList = require('./students.json');
const ExamModel = require('../models/ExamModel');

const targets6B = [
  { keywords: ['miguelavila', 'ávila silva', 'avila silva'], username: 'miguelavila', score: 43 },
  { keywords: ['estebancorrea', 'correa arias'], username: 'estebancorrea', score: 44 },
  { keywords: ['izzacristancho', 'cristancho martínez', 'cristancho martinez'], username: 'izzacristancho', score: 38 },
  { keywords: ['lorenguevara', 'guevara carreño', 'guevara carreno'], username: 'lorenguevara', score: 44 },
  { keywords: ['emilialozano', 'lozano velásquez', 'lozano velasquez'], username: 'emilialozano', score: 38 },
  { keywords: ['marianamartinez', 'martínez gélvez', 'martinez gelvez'], username: 'marianamartinez', score: 43 },
  { keywords: ['thomasmelendez', 'meléndez anaya', 'melendez anaya'], username: 'thomasmelendez', score: 14 },
  { keywords: ['juanjosemeza', 'meza viloria'], username: 'juanjosemeza', score: 16 },
  { keywords: ['laurenmunoz', 'muñoz morales', 'munoz morales'], username: 'laurenmunoz', score: 37 },
  { keywords: ['ariortiz', 'ortiz rodríguez', 'ortiz rodriguez'], username: 'ariortiz', score: 41 },
  { keywords: ['giselleperez', 'pérez bermeo', 'perez bermeo'], username: 'giselleperez', score: 43 },
  { keywords: ['juandiegoponton', 'pontón sánchez', 'ponton sanchez'], username: 'juandiegoponton', score: 40 },
  { keywords: ['sofiaposada', 'posada arévalo', 'posada arevalo'], username: 'sofiaposada', score: 43 },
  { keywords: ['emmanuelrojas', 'rojas quintero'], username: 'emmanuelrojas', score: 26 },
  { keywords: ['rudinsanchez', 'sánchez noguera', 'sanchez noguera'], username: 'rudinsanchez', score: 45 },
  { keywords: ['santiagosilva', 'silva cubides'], username: 'santiagosilva', score: 39 },
  { keywords: ['salomevanegas', 'vanegas quintana'], username: 'salomevanegas', score: 43 },
  { keywords: ['matiasvelandia', 'velandia meneses'], username: 'matiasvelandia', score: 39 },
  { keywords: ['valeriazarate', 'zárate mercado', 'zarate mercado'], username: 'valeriazarate', score: 39 }
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

    // 1. Obtener TODAS las entregas existentes en la base de datos (con JOIN de estudiantes)
    const existingSubmissions = await db.queryAll(`
      SELECT 
        s.id as sub_id, 
        s.student_id, 
        s.score_listening, 
        s.score_reading_writing, 
        s.raw_answers_json, 
        st.first_name, 
        st.last_name, 
        st.grade, 
        st.username 
      FROM submissions s 
      JOIN students st ON s.student_id = st.id
    `);

    const updatedStudentIds = new Set();

    // 2. Actualizar entregas existentes en la base de datos
    for (const sub of existingSubmissions) {
      const studentNameStr = `${sub.first_name || ''} ${sub.last_name || ''} ${sub.username || ''}`.toLowerCase();
      
      const target = targets6B.find(t => 
        (sub.username && sub.username.toLowerCase() === t.username) ||
        t.keywords.some(kw => studentNameStr.includes(kw))
      );

      if (target) {
        updatedStudentIds.add(sub.student_id);

        const rwAnswers = {};
        rwQuestions.forEach((q, idx) => {
          rwAnswers[q.id] = (idx < target.score) ? q.correct : q.wrong;
        });

        const evalRes = ExamModel.evaluateAnswers(rwAnswers, 0, 0);
        const currentListening = Number(sub.score_listening || 0);
        const newRWScore = Number(evalRes.score_reading_writing);
        const newTotal = currentListening + newRWScore;

        let mergedAnswers = {};
        if (sub.raw_answers_json) {
          try {
            mergedAnswers = typeof sub.raw_answers_json === 'string'
              ? JSON.parse(sub.raw_answers_json)
              : sub.raw_answers_json;
          } catch (e) {
            mergedAnswers = {};
          }
        }
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
            sub.sub_id
          ]
        );

        console.log(`✅ [DB Update] Entrega #${sub.sub_id} (${sub.first_name} ${sub.last_name}): Listening ${currentListening} + RW ${newRWScore} = Total ${newTotal}`);
      }
    }

    // 3. Crear entregas para los estudiantes de 6°B que aún no tengan registros en submissions
    for (const target of targets6B) {
      const official = studentsList.find(s => s.username === target.username);
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

      if (updatedStudentIds.has(stRecord.id)) continue;

      const hasSub = await db.queryOne(`SELECT id FROM submissions WHERE student_id = ?`, [stRecord.id]);
      if (hasSub) continue;

      const rwAnswers = {};
      rwQuestions.forEach((q, idx) => {
        rwAnswers[q.id] = (idx < target.score) ? q.correct : q.wrong;
      });

      const evalRes = ExamModel.evaluateAnswers(rwAnswers, 0, 0);

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

      console.log(`✅ [DB Insert] Creada entrega de ${official.fullName}: RW ${evalRes.score_reading_writing}/48`);
    }

  } catch (err) {
    console.error('AutoSeed 6B notice:', err.message);
  }
}

module.exports = seed6BSubmissions;
