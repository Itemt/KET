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

      const version = ExamModel.getVersionForStudent(studentRecord.id);

      res.json({
        success: true,
        message: '¡Bienvenido(a) al examen!',
        student: {
          ...studentRecord,
          examVersion: version
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
      let version = 0;
      if (studentId) {
        version = ExamModel.getVersionForStudent(studentId);
      } else if (req.query.version !== undefined) {
        version = parseInt(req.query.version, 10) || 0;
      }

      const sanitizedExam = ExamModel.getSanitizedExamData(version);
      res.json({ success: true, exam: sanitizedExam, version });
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

      const version = ExamModel.getVersionForStudent(studentRecord.id);
      const evaluation = ExamModel.evaluateAnswers(answers || {}, version);

      const submissionId = await SubmissionModel.save({
        student_id: studentRecord.id,
        attempt_time: attempt_time || student.startTime || student.attemptTime || new Date().toISOString(),
        score_reading_writing: evaluation.score_reading_writing,
        score_listening: evaluation.score_listening,
        total_auto_score: evaluation.total_auto_score,
        max_auto_score: evaluation.max_auto_score,
        writing_part6: answers ? answers.writing_part6 || '' : '',
        writing_part7: answers ? answers.writing_part7 || '' : '',
        speaking_audio_url: speaking_audio_url || '',
        raw_answers_json: answers || {}
      });

      res.json({
        success: true,
        message: '¡Examen enviado exitosamente!',
        submissionId,
        score: {
          total: evaluation.total_auto_score,
          max: evaluation.max_auto_score,
          reading_writing: evaluation.score_reading_writing,
          listening: evaluation.score_listening
        }
      });
    } catch (error) {
      console.error('Error al procesar el envío del examen:', error);
      res.status(500).json({ success: false, message: 'Ocurrió un error al procesar tu examen.' });
    }
  }
}

module.exports = ExamController;
