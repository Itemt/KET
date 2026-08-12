const path = require('path');
const StudentModel = require('../models/StudentModel');
const ExamModel = require('../models/ExamModel');
const SubmissionModel = require('../models/SubmissionModel');

class ExamController {
  static renderIndex(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  }

  static renderExam(req, res) {
    res.sendFile(path.join(__dirname, '../views/exam.html'));
  }

  static getStudentsList(req, res) {
    const list = StudentModel.getAuthorizedList();
    res.json({ success: true, students: list });
  }

  static async loginStudent(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Por favor ingresa tu usuario y contraseña.' });
      }

      const studentRecord = await StudentModel.authenticate(username, password);

      if (!studentRecord) {
        return res.status(401).json({
          success: false,
          message: 'Usuario o contraseña incorrectos. Recuerda que es tu nombreapellido (ej. thiagoalvarez).'
        });
      }

      const rwVersion = ExamModel.getVersionForStudent(studentRecord.id);
      const listeningVersion = ExamModel.getListeningVersionForStudent(studentRecord.id);

      res.json({
        success: true,
        message: '¡Bienvenido(a) al examen!',
        student: {
          ...studentRecord,
          examVersion: rwVersion,
          listeningVersion: listeningVersion
        }
      });
    } catch (err) {
      console.error('Error en login de estudiante:', err);
      res.status(500).json({ success: false, message: 'Error interno al autenticar.' });
    }
  }

  static getExamData(req, res) {
    try {
      const studentId = req.query.studentId || req.query.student_id;
      let rwVersion = 0;
      let listeningVersion = 0;

      if (studentId) {
        rwVersion = ExamModel.getVersionForStudent(studentId);
        listeningVersion = ExamModel.getListeningVersionForStudent(studentId);
      } else {
        if (req.query.version !== undefined) {
          rwVersion = parseInt(req.query.version, 10) || 0;
        }
        if (req.query.listeningVersion !== undefined) {
          listeningVersion = parseInt(req.query.listeningVersion, 10) || 0;
        }
      }

      const sanitizedExam = ExamModel.getSanitizedExamData(rwVersion, listeningVersion);
      res.json({
        success: true,
        exam: sanitizedExam,
        version: rwVersion,
        listeningVersion: listeningVersion
      });
    } catch (error) {
      console.error('Error al obtener datos del examen:', error);
      res.status(500).json({ success: false, message: 'Error al cargar el examen.' });
    }
  }

  static async submitExam(req, res) {
    try {
      const { student, answers, speaking_audio_url, attempt_time } = req.body;

      if (!student || (!student.firstName && !student.first_name)) {
        return res.status(400).json({ success: false, message: 'Datos de estudiante incompletos.' });
      }

      const firstName = student.firstName || student.first_name;
      const lastName = student.lastName || student.last_name || '';
      const grade = student.grade || '6to';
      const username = student.username || '';

      const studentRecord = await StudentModel.createOrGet(firstName, lastName, grade, username);

      const rwVersion = ExamModel.getVersionForStudent(studentRecord.id);
      const listeningVersion = ExamModel.getListeningVersionForStudent(studentRecord.id);

      // Verificar si ya existe una entrega previa de este estudiante para fusionar (MERGE)
      const existingSubmission = await SubmissionModel.getByStudentId(studentRecord.id);

      let mergedAnswers = {};
      let finalWritingPart6 = '';
      let finalWritingPart7 = '';

      if (existingSubmission && existingSubmission.raw_answers_json) {
        mergedAnswers = { ...existingSubmission.raw_answers_json };
        finalWritingPart6 = existingSubmission.writing_part6 || '';
        finalWritingPart7 = existingSubmission.writing_part7 || '';
      }

      // Fusionar las respuestas entrantes sobre las existentes (sin borrar la otra sección)
      if (answers && typeof answers === 'object') {
        Object.keys(answers).forEach(key => {
          const val = answers[key];
          if (val !== undefined && val !== null && val.toString().trim() !== '') {
            mergedAnswers[key] = val.toString().trim();
          }
        });

        if (answers.writing_part6 && answers.writing_part6.trim() !== '') {
          finalWritingPart6 = answers.writing_part6.trim();
        }
        if (answers.writing_part7 && answers.writing_part7.trim() !== '') {
          finalWritingPart7 = answers.writing_part7.trim();
        }
      }

      // Evaluar sobre el conjunto fusionado completo
      const evaluation = ExamModel.evaluateAnswers(mergedAnswers, rwVersion, listeningVersion);

      let submissionId;
      if (existingSubmission) {
        // Actualizar la entrega existente conservando los datos de la otra sección
        submissionId = existingSubmission.id || existingSubmission.submission_id;
        await SubmissionModel.update(submissionId, {
          attempt_time: attempt_time || existingSubmission.attempt_time || new Date().toISOString(),
          score_reading_writing: evaluation.score_reading_writing,
          score_listening: evaluation.score_listening,
          total_auto_score: evaluation.total_auto_score,
          max_auto_score: evaluation.max_auto_score,
          writing_part6: finalWritingPart6,
          writing_part7: finalWritingPart7,
          speaking_audio_url: speaking_audio_url || existingSubmission.speaking_audio_url || '',
          raw_answers_json: mergedAnswers
        });
      } else {
        // Crear nueva entrega
        submissionId = await SubmissionModel.save({
          student_id: studentRecord.id,
          attempt_time: attempt_time || new Date().toISOString(),
          score_reading_writing: evaluation.score_reading_writing,
          score_listening: evaluation.score_listening,
          total_auto_score: evaluation.total_auto_score,
          max_auto_score: evaluation.max_auto_score,
          writing_part6: finalWritingPart6,
          writing_part7: finalWritingPart7,
          speaking_audio_url: speaking_audio_url || '',
          raw_answers_json: mergedAnswers
        });
      }

      res.json({
        success: true,
        message: '¡Examen enviado exitosamente!',
        submissionId,
        score: {
          total: evaluation.total_auto_score,
          max: evaluation.max_auto_score,
          total_auto_score: evaluation.total_auto_score,
          max_auto_score: evaluation.max_auto_score,
          reading_writing: evaluation.score_reading_writing,
          score_reading_writing: evaluation.score_reading_writing,
          max_reading_writing: evaluation.max_reading_writing,
          listening: evaluation.score_listening,
          score_listening: evaluation.score_listening,
          max_listening: evaluation.max_listening
        }
      });
    } catch (error) {
      console.error('Error al procesar el envío del examen:', error);
      res.status(500).json({ success: false, message: 'Ocurrió un error al procesar tu examen.' });
    }
  }
}

module.exports = ExamController;
