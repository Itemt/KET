const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/ExamController');
const AdminController = require('../controllers/AdminController');

// Página de inicio / Registro de estudiante
router.get('/', ExamController.renderIndex);

// Interfaz del examen principal
router.get('/exam', ExamController.renderExam);

// Panel de Administración para docentes (Examen Principal)
router.get('/admin', AdminController.renderAdminPage);

module.exports = router;
