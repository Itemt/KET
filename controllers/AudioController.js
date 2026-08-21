const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Usar memoryStorage para compatibilidad total con Serverless (Vercel) y entornos de solo lectura
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // Límite de 15 MB
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
        return res.status(500).json({ success: false, message: 'Error interno procesando el audio.' });
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

      // Convertir audio a Data URL Base64 para persistencia serverless garantizada en base de datos
      const mime = req.file.mimetype || 'audio/webm';
      const base64Audio = `data:${mime};base64,${req.file.buffer.toString('base64')}`;

      // En desarrollo local con disco escribible, intentar guardar copia física en uploads
      let filename = `speaking-${Date.now()}-${Math.round(Math.random() * 1E9)}.webm`;
      try {
        const uploadDir = path.join(__dirname, '../uploads/speaking');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadDir, filename), req.file.buffer);
      } catch (diskErr) {
        // En Vercel Serverless el disco es de solo lectura; se utiliza de forma transparente el base64Audio
      }

      res.json({
        success: true,
        message: 'Audio de Speaking procesado correctamente.',
        audioUrl: base64Audio,
        filename: filename
      });
    } catch (error) {
      console.error('Error en controlador de audio:', error);
      res.status(500).json({ success: false, message: 'Error al procesar la subida del audio.' });
    }
  }
}

module.exports = AudioController;
