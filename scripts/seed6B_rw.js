/**
 * scripts/seed6B_rw.js
 * 
 * Conecta a la base de datos (Turso Cloud en producción, SQLite en local)
 * usando las mismas credenciales que el servidor.
 * 
 * NO se usa en startup. Se invoca una sola vez vía el endpoint:
 *   POST /api/admin/seed-6b-rw  (requiere header X-Admin-Key)
 */

const ExamModel = require('../models/ExamModel');
const studentsList = require('../config/students.json');

// Mapping exacto: username → target_score (en orden de lista 6B)
const TARGETS = [
  { username: 'miguelavila',     score: 43 },  // Ávila Silva Miguel Ángel
  { username: 'estebancorrea',   score: 44 },  // Correa Arias Esteban David
  { username: 'izzacristancho',  score: 38 },  // Cristancho Martínez Izza Ninel
  // Fonseca Granados Jerónimo → NO está en la lista, se omite
  { username: 'lorenguevara',    score: 44 },  // Guevara Carreño Loren Victoria
  { username: 'emilialozano',    score: 38 },  // Lozano Velásquez Emilia
  { username: 'marianamartinez', score: 43 },  // Martínez Gélvez Mariana
  { username: 'thomasmelendez',  score: 14 },  // Meléndez Anaya Thomás Andrés
  { username: 'juanjosemeza',    score: 16 },  // Meza Viloria Juan José
  { username: 'laurenmunoz',     score: 37 },  // Muñoz Morales Lauren Alejandra
  { username: 'ariortiz',        score: 41 },  // Ortiz Rodríguez Ari Daniel
  { username: 'giselleperez',    score: 43 },  // Pérez Bermeo Giselle
  { username: 'juandiegoponton', score: 40 },  // Pontón Sánchez Juan Diego
  { username: 'sofiaposada',     score: 43 },  // Posada Arévalo Sofía
  { username: 'emmanuelrojas',   score: 26 },  // Rojas Quintero Emmanuel
  { username: 'rudinsanchez',    score: 45 },  // Sánchez Noguera Rudin Daniel
  { username: 'santiagosilva',   score: 39 },  // Silva Cubides Santiago
  { username: 'salomevanegas',   score: 43 },  // Vanegas Quintana Salomé
  { username: 'matiasvelandia',  score: 39 },  // Velandia Meneses Matías
  { username: 'valeriazarate',   score: 39 },  // Zárate Mercado Valeria
];

async function seed6BReadingWriting(db) {
  const results = [];

  for (const target of TARGETS) {
    const studentInfo = studentsList.find(s => s.username === target.username);
    if (!studentInfo) {
      results.push({ username: target.username, status: 'ERROR', msg: 'Not in students.json' });
      continue;
    }

    // Buscar o crear el estudiante en la DB
    let stRecord = await db.queryOne(
      `SELECT id FROM students WHERE username = ? LIMIT 1`,
      [target.username]
    );

    let studentDbId;
    if (stRecord) {
      studentDbId = Number(stRecord.id);
    } else {
      const ins = await db.run(
        `INSERT INTO students (first_name, last_name, grade, username, last_login_at) VALUES (?, ?, ?, ?, ?)`,
        [studentInfo.firstName, studentInfo.lastName, studentInfo.grade, studentInfo.username, new Date().toISOString()]
      );
      studentDbId = Number(ins.lastInsertRowid);
    }

    // Determinar versión del examen según student_id en DB
    const rwVersion = ExamModel.getVersionForStudent(studentDbId);
    const fullData = ExamModel.getFullExamData(rwVersion, 0);

    // Recolectar preguntas evaluables de Parts 1-5 (NO Part 6 ni Part 7)
    const evalQuestions = [];
    fullData.sections.reading_writing.parts.forEach(part => {
      if (part.part >= 6) return;
      if (!part.questions) return;
      part.questions.forEach(q => {
        if (q.correctAnswer || q.acceptableAnswers) {
          evalQuestions.push(q);
        }
      });
    });

    // Construir respuestas ficticias
    const rwAnswers = {};
    evalQuestions.forEach((q, idx) => {
      if (idx < target.score) {
        rwAnswers[q.id] = q.correctAnswer || (q.acceptableAnswers ? q.acceptableAnswers[0] : '');
      } else {
        if (q.options) {
          const keys = Object.keys(q.options);
          const wrongKey = keys.find(k => k.toLowerCase() !== (q.correctAnswer || '').toLowerCase());
          rwAnswers[q.id] = wrongKey || keys[0];
        } else {
          rwAnswers[q.id] = '__wrong__';
        }
      }
    });

    // Evaluar para confirmar score real
    const evalResult = ExamModel.evaluateAnswers(rwAnswers, rwVersion, 0);
    const newRWScore = evalResult.score_reading_writing;

    // Buscar submission existente
    const existing = await db.queryOne(
      `SELECT id, score_listening, raw_answers_json, writing_part6, writing_part7 FROM submissions WHERE student_id = ? LIMIT 1`,
      [studentDbId]
    );

    if (existing) {
      const existingListening = Number(existing.score_listening || 0);
      const newTotal = existingListening + newRWScore;

      // Mergear: preservar respuestas de Listening, sobrescribir RW
      let mergedAnswers = {};
      if (existing.raw_answers_json) {
        try {
          mergedAnswers = typeof existing.raw_answers_json === 'string'
            ? JSON.parse(existing.raw_answers_json)
            : existing.raw_answers_json;
        } catch (e) { mergedAnswers = {}; }
      }
      Object.assign(mergedAnswers, rwAnswers);

      await db.run(
        `UPDATE submissions 
         SET score_reading_writing = ?,
             total_auto_score = ?,
             max_auto_score = 173,
             raw_answers_json = ?
         WHERE id = ?`,
        [newRWScore, newTotal, JSON.stringify(mergedAnswers), Number(existing.id)]
      );

      results.push({
        name: studentInfo.fullName,
        status: 'UPDATED',
        listening: existingListening,
        rw: newRWScore,
        total: newTotal
      });
    } else {
      // Crear nueva submission solo con RW (listening = 0)
      await db.run(
        `INSERT INTO submissions 
         (student_id, attempt_time, score_reading_writing, score_listening, total_auto_score, max_auto_score, writing_part6, writing_part7, speaking_audio_url, raw_answers_json)
         VALUES (?, ?, ?, 0, ?, 173, '', '', '', ?)`,
        [
          studentDbId,
          new Date(Date.now() - Math.floor(Math.random() * 3600000 * 2)).toISOString(),
          newRWScore,
          newRWScore,
          JSON.stringify(rwAnswers)
        ]
      );

      results.push({
        name: studentInfo.fullName,
        status: 'INSERTED',
        listening: 0,
        rw: newRWScore,
        total: newRWScore
      });
    }
  }

  return results;
}

module.exports = seed6BReadingWriting;
