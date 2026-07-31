const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/ExamController');
const AudioController = require('../controllers/AudioController');
const AdminController = require('../controllers/AdminController');

// --- Rutas públicas de estudiante ---
// Lista de estudiantes pre-cargados
router.get('/students/list', ExamController.getStudentsList);

// Login de estudiante con nombreapellido
router.post('/students/login', ExamController.loginStudent);

// Obtener el examen (sanitizado)
router.get('/exam', ExamController.getExamData);

// Subida del audio grabado de Speaking
router.post('/speaking/upload', AudioController.uploadMiddleware, AudioController.handleUpload);

// Envío final del examen para procesar y calificar
router.post('/submit', ExamController.submitExam);

// --- Rutas privadas del panel de administración ---
// Login de Administrador
router.post('/admin/login', AdminController.login);

// Obtener todas las entregas
router.get('/admin/submissions', AdminController.getSubmissions);

// Obtener detalle de una entrega específica
router.get('/admin/submissions/:id', AdminController.getSubmissionDetail);

// Eliminar un envío
router.delete('/admin/submissions/:id', AdminController.deleteSubmission);

module.exports = router;
