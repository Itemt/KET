const path = require('path');
const SubmissionModel = require('../models/SubmissionModel');
const ExamModel = require('../models/ExamModel');
const db = require('../config/db');
const seed6BReadingWriting = require('../scripts/seed6B_rw');

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "ket2026";

class AdminController {
  static renderAdminPage(req, res) {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
  }

  static login(req, res) {
    const { passcode } = req.body;
    if (passcode === ADMIN_PASSCODE) {
      res.json({ success: true, message: 'Autenticación exitosa.' });
    } else {
      res.status(401).json({ success: false, message: 'PIN o Contraseña incorrecta.' });
    }
  }

  static async getSubmissions(req, res) {
    try {
      const submissions = await SubmissionModel.getAllWithStudent();
      res.json({ success: true, submissions });
    } catch (error) {
      console.error('Error al consultar entregas:', error);
      res.status(500).json({ success: false, message: 'Error al consultar entregas.' });
    }
  }

  static async getSubmissionDetail(req, res) {
    try {
      const { id } = req.params;
      const submission = await SubmissionModel.getById(id);

      if (!submission) {
        return res.status(404).json({ success: false, message: 'Entrega no encontrada.' });
      }

      // Adjuntar datos completos del examen (incluyendo respuestas correctas y enunciados)
      const rwVersion = ExamModel.getVersionForStudent(submission.student_id);
      const listeningVersion = ExamModel.getListeningVersionForStudent(submission.student_id);
      submission.fullExamData = ExamModel.getFullExamData(rwVersion, listeningVersion);

      res.json({ success: true, submission });
    } catch (error) {
      console.error('Error al obtener detalle de entrega:', error);
      res.status(500).json({ success: false, message: 'Error al consultar el detalle de la entrega.' });
    }
  }

  static async deleteSubmission(req, res) {
    try {
      const { id } = req.params;
      await SubmissionModel.delete(id);
      res.json({ success: true, message: 'Entrega eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar entrega:', error);
      res.status(500).json({ success: false, message: 'Error al eliminar el registro.' });
    }
  }

  static async seed6BRW(req, res) {
    try {
      const { passcode } = req.body;
      if (passcode !== ADMIN_PASSCODE) {
        return res.status(401).json({ success: false, message: 'PIN incorrecto.' });
      }
      const results = await seed6BReadingWriting(db);
      res.json({ success: true, results });
    } catch (error) {
      console.error('Error en seed 6B RW:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = AdminController;
