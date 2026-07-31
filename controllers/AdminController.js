const path = require('path');
const SubmissionModel = require('../models/SubmissionModel');

// Clave o PIN de administrador por defecto (puede configurarse en .env)
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "ket2026";

class AdminController {
  /**
   * Renderiza la vista HTML del Panel Docente / Administrador
   */
  static renderAdminPage(req, res) {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
  }

  /**
   * Verificar autenticación de Administrador
   */
  static login(req, res) {
    const { passcode } = req.body;
    if (passcode === ADMIN_PASSCODE) {
      res.json({ success: true, message: 'Autenticación exitosa.' });
    } else {
      res.status(401).json({ success: false, message: 'PIN o Contraseña incorrecta.' });
    }
  }

  /**
   * Obtiene la lista de todos los exámenes enviados
   */
  static getSubmissions(req, res) {
    try {
      const submissions = SubmissionModel.getAllWithStudent();
      res.json({ success: true, submissions });
    } catch (error) {
      console.error('Error al consultar entregas:', error);
      res.status(500).json({ success: false, message: 'Error al consultar entregas.' });
    }
  }

  /**
   * Obtiene los detalles completos de una entrega por su ID
   */
  static getSubmissionDetail(req, res) {
    try {
      const { id } = req.params;
      const submission = SubmissionModel.getById(id);

      if (!submission) {
        return res.status(404).json({ success: false, message: 'Entrega no encontrada.' });
      }

      res.json({ success: true, submission });
    } catch (error) {
      console.error('Error al obtener detalle de entrega:', error);
      res.status(500).json({ success: false, message: 'Error al consultar el detalle de la entrega.' });
    }
  }

  /**
   * Elimina un registro de entrega por ID
   */
  static deleteSubmission(req, res) {
    try {
      const { id } = req.params;
      SubmissionModel.delete(id);
      res.json({ success: true, message: 'Entrega eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar entrega:', error);
      res.status(500).json({ success: false, message: 'Error al eliminar el registro.' });
    }
  }
}

module.exports = AdminController;
