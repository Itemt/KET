const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Inicializar la base de datos
require('./config/db');
const autoSeed = require('./config/autoSeed');
autoSeed();

const webRoutes = require('./routes/webRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir archivos estáticos del cliente
app.use(express.static(path.join(__dirname, 'public')));

// Servir carpeta de archivos subidos (audios grabados)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Registrar enrutadores MVC
app.use('/', webRoutes);
app.use('/api', apiRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send(`
    <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta requerida no existe.</p>
      <a href="/" style="color: #4f46e5; font-weight: bold;">Volver a Inicio</a>
    </div>
  `);
});

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error('❌ Error no controlado en la aplicación:', err);
  res.status(500).json({ success: false, message: 'Ocurrió un error interno en el servidor.' });
});

// Iniciar servidor Express con puerto dinámico en caso de conflicto
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Servidor KET A2 Mock Exam corriendo en: http://localhost:${PORT}`);
  console.log(`🏫 Listo para estudiantes de 6to Grado.`);
  console.log(`🔑 PIN de Panel de Administración por defecto: "ket2026"`);
  console.log(`====================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = 3001;
    console.log(`⚠️ El puerto ${PORT} está ocupado. Iniciando en puerto alternativo ${ALT_PORT}...`);
    app.listen(ALT_PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Servidor KET A2 Mock Exam corriendo en: http://localhost:${ALT_PORT}`);
      console.log(`🏫 Listo para estudiantes de 6to Grado.`);
      console.log(`🔑 PIN de Panel de Administración por defecto: "ket2026"`);
      console.log(`====================================================`);
    });
  } else {
    console.error('❌ Error de servidor:', err);
  }
});

