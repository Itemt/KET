const path = require('path');
const BonusStudentModel = require('../models/BonusStudentModel');
const BonusExamModel = require('../models/BonusExamModel');
const BonusSubmissionModel = require('../models/BonusSubmissionModel');

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "ket2026";

class BonusController {
  static renderBonusPage(req, res) {
    res.sendFile(path.join(__dirname, '../views/bonus.html'));
  }

  static renderBonusAdminPage(req, res) {
    res.sendFile(path.join(__dirname, '../views/bonus_admin.html'));
  }

  static async loginStudent(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Por favor ingresa tu usuario y contraseña.' });
      }

      const studentRecord = await BonusStudentModel.authenticate(username, password);
      if (!studentRecord) {
        return res.status(401).json({
          success: false,
          message: 'Usuario o contraseña incorrectos.'
        });
      }

      res.json({
        success: true,
        message: '¡Bienvenido(a) al Examen Bonus!',
        student: studentRecord
      });
    } catch (err) {
      console.error('Error en login de estudiante bonus:', err);
      res.status(500).json({ success: false, message: 'Error interno al autenticar.' });
    }
  }

  static getBonusExamData(req, res) {
    try {
      const sanitizedExam = BonusExamModel.getSanitizedBonusExamData();
      res.json({ success: true, exam: sanitizedExam });
    } catch (error) {
      console.error('Error al obtener datos del examen bonus:', error);
      res.status(500).json({ success: false, message: 'Error al cargar el examen bonus.' });
    }
  }

  static async submitBonusExam(req, res) {
    try {
      const { student, answers, attempt_time } = req.body;

      if (!student || (!student.firstName && !student.first_name)) {
        return res.status(400).json({ success: false, message: 'Datos de estudiante incompletos.' });
      }

      const firstName = student.firstName || student.first_name;
      const lastName = student.lastName || student.last_name || '';
      const grade = student.grade || '6to';
      const username = student.username || '';

      const studentRecord = await BonusStudentModel.createOrGet(firstName, lastName, grade, username);
      const evaluation = BonusExamModel.evaluateAnswers(answers || {});

      const submissionId = await BonusSubmissionModel.save({
        student_id: studentRecord.id,
        attempt_time: attempt_time || new Date().toISOString(),
        total_auto_score: evaluation.total_auto_score,
        max_auto_score: evaluation.max_auto_score,
        bonus_writing: answers ? answers.bonus_writing || '' : '',
        raw_answers_json: answers || {}
      });

      res.json({
        success: true,
        message: '¡Examen Bonus enviado exitosamente!',
        submissionId,
        score: {
          total: evaluation.total_auto_score,
          max: evaluation.max_auto_score
        }
      });
    } catch (error) {
      console.error('Error al procesar envío de examen bonus:', error);
      res.status(500).json({ success: false, message: 'Error al procesar tu examen bonus.' });
    }
  }

  static async getBonusSubmissions(req, res) {
    try {
      const submissions = await BonusSubmissionModel.getAllWithStudent();
      res.json({ success: true, submissions });
    } catch (error) {
      console.error('Error al consultar entregas bonus:', error);
      res.status(500).json({ success: false, message: 'Error al consultar entregas bonus.' });
    }
  }

  static async getBonusSubmissionDetail(req, res) {
    try {
      const { id } = req.params;
      const submission = await BonusSubmissionModel.getById(id);
      if (!submission) {
        return res.status(404).json({ success: false, message: 'Entrega bonus no encontrada.' });
      }
      res.json({ success: true, submission });
    } catch (error) {
      console.error('Error al obtener detalle de entrega bonus:', error);
      res.status(500).json({ success: false, message: 'Error al consultar detalle.' });
    }
  }

  static async deleteBonusSubmission(req, res) {
    try {
      const { id } = req.params;
      await BonusSubmissionModel.delete(id);
      res.json({ success: true, message: 'Entrega bonus eliminada.' });
    } catch (error) {
      console.error('Error al eliminar entrega bonus:', error);
      res.status(500).json({ success: false, message: 'Error al eliminar.' });
    }
  }
}

module.exports = BonusController;
