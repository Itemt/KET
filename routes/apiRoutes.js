const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/ExamController');
const AudioController = require('../controllers/AudioController');
const AdminController = require('../controllers/AdminController');

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
router.post('/admin/seed-6b-rw', AdminController.seed6BRW);

module.exports = router;
