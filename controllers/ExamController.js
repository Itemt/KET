const path = require('path');
const StudentModel = require('../models/StudentModel');
const ExamModel = require('../models/ExamModel');
const SubmissionModel = require('../models/SubmissionModel');

class ExamController {
  /**
   * Renderiza o sirve la página de inicio (Registro de estudiante)
   */
  static renderIndex(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
  }

  /**
   * Renderiza la vista principal del examen
   */
  static renderExam(req, res) {
    res.sendFile(path.join(__dirname, '../views/exam.html'));
  }

  /**
   * Endpoint API: Entrega el examen sanitized (sin respuestas correctas expuestas)
   */
  static getExamData(req, res) {
    try {
      const sanitizedExam = ExamModel.getSanitizedExamData();
      res.json({ success: true, exam: sanitizedExam });
    } catch (error) {
      console.error('Error al obtener datos del examen:', error);
      res.status(500).json({ success: false, message: 'Error al cargar el examen.' });
    }
  }

  /**
   * Endpoint API: Recibe el examen completo del estudiante, califica la opción múltiple y guarda en la DB.
   */
  static submitExam(req, res) {
    try {
      const { student, answers, speaking_audio_url } = req.body;

      if (!student || !student.firstName || !student.lastName || !student.grade) {
        return res.status(400).json({ success: false, message: 'Datos de estudiante incompletos.' });
      }

      // 1. Registrar o recuperar el registro del estudiante en DB
      const studentRecord = StudentModel.createOrGet(student.firstName, student.lastName, student.grade);

      // 2. Evaluar respuestas de opción múltiple / cloze
      const evaluation = ExamModel.evaluateAnswers(answers || {});

      // 3. Guardar el envío completo
      const submissionId = SubmissionModel.save({
        student_id: studentRecord.id,
        score_reading_writing: evaluation.score_reading_writing,
        score_listening: evaluation.score_listening,
        total_auto_score: evaluation.total_auto_score,
        max_auto_score: evaluation.max_auto_score,
        writing_part6: answers.writing_part6 || '',
        writing_part7: answers.writing_part7 || '',
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
