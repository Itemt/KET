const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/ExamController');
const AudioController = require('../controllers/AudioController');
const AdminController = require('../controllers/AdminController');
const BonusController = require('../controllers/BonusController');

// --- Rutas públicas de estudiante (Examen Principal) ---
router.get('/students/list', ExamController.getStudentsList);
router.post('/students/login', ExamController.loginStudent);
router.get('/exam', ExamController.getExamData);
router.post('/speaking/upload', AudioController.uploadMiddleware, AudioController.handleUpload);
router.post('/submit', ExamController.submitExam);

// --- Rutas del panel docente (Examen Principal) ---
router.post('/admin/login', AdminController.login);
router.get('/admin/submissions', AdminController.getSubmissions);
router.get('/admin/submissions/:id', AdminController.getSubmissionDetail);
router.delete('/admin/submissions/:id', AdminController.deleteSubmission);

// --- Rutas del Examen Bonus (Completamente aisladas) ---
router.post('/bonus/login', BonusController.loginStudent);
router.get('/bonus/exam', BonusController.getBonusExamData);
router.post('/bonus/submit', BonusController.submitBonusExam);

// --- Rutas del panel docente Bonus ---
router.get('/bonus/submissions', BonusController.getBonusSubmissions);
router.get('/bonus/submissions/:id', BonusController.getBonusSubmissionDetail);
router.delete('/bonus/submissions/:id', BonusController.deleteBonusSubmission);

module.exports = router;
