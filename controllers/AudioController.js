const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Asegurar directorio de destino
const uploadDir = path.join(__dirname, '../uploads/speaking');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname) || '.webm';
    cb(null, `speaking-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 } // Límite de 25 MB
}).single('audio');

class AudioController {
  /**
   * Middleware Multer exportado
   */
  static uploadMiddleware(req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ success: false, message: `Error de carga de audio: ${err.message}` });
      } else if (err) {
        return res.status(500).json({ success: false, message: 'Error interno guardando el audio.' });
      }
      next();
    });
  }

  /**
   * Endpoint de procesamiento de subida
   */
  static handleUpload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No se recibió ningún archivo de audio.' });
      }

      // Generar URL pública relativa
      const relativeUrl = `/uploads/speaking/${req.file.filename}`;

      res.json({
        success: true,
        message: 'Audio de Speaking subido correctamente.',
        audioUrl: relativeUrl,
        filename: req.file.filename
      });
    } catch (error) {
      console.error('Error en controlador de audio:', error);
      res.status(500).json({ success: false, message: 'Error al procesar la subida del audio.' });
    }
  }
}

module.exports = AudioController;
