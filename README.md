# 🇬🇧 Cambridge KET (A2 Key) Mock Exam App - 6to Grado

Aplicación Web Completa de Simulacro de Examen **Cambridge KET (A2 Key) para 6to Grado**, desarrollada en arquitectura **MVC (Modelo - Vista - Controlador)** utilizando **Node.js, Express, SQLite y Vanilla HTML/CSS/JS**.

---

## 🚀 Características Principales

1. **Patrón de Arquitectura MVC Modular**:
   - `config/`: Inicialización de SQLite y esquemas de base de datos.
   - `models/`: Gestión de datos de estudiantes, entregas de examen y banco oficial KET A2.
   - `controllers/`: Lógica de negocio (procesamiento de respuestas, evaluación de selección múltiple, recepción de audio de voz).
   - `routes/`: Enrutamiento estructurado de vistas web y API RESTful.
   - `views/`: Plantillas frontend (Registro de Alumnos, Examen interactivo, Panel Docente).
   - `public/`: Estilos estéticos avanzados (Glassmorphism, animaciones, temporizador) y controladores cliente JS.

2. **Secciones Oficiales KET A2 Key**:
   - **Reading & Writing (Parts 1 - 7)**: Preguntas de opción múltiple, cloze, matching y áreas de redacción con contador de palabras en tiempo real.
   - **Listening (Parts 1 - 3)**: Preguntas de opción múltiple y llenado de datos con reproductores de audio e integración de **Web Speech API (Síntesis de voz en inglés)**.
   - **Speaking (Parts 1 - 2)**: Integración con **MediaRecorder API** en el navegador para grabar respuestas de voz del micrófono, con preescucha y subida mediante `FormData`.

3. **Panel de Administración para Profesores (`/admin`)**:
   - Autenticación mediante PIN (PIN por defecto: `ket2026`).
   - Métricas globales de la clase (Total de entregas, promedio de puntaje).
   - Filtro por sección o grado (`6to A`, `6to B`, etc.) y buscador por nombre.
   - Visualización de redacciones y **reproductor de audio integrado para escuchar las grabaciones de voz de los alumnos**.

---

## 🛠️ Instalación y Ejecución Local

1. Requisitos: Node.js (v18 o superior) e npm.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor local:
   ```bash
   npm start
   ```
4. Abrir en el navegador:
   - **Página de Registro e Examen para Estudiantes**: `http://localhost:3000/`
   - **Panel de Administración Docente**: `http://localhost:3000/admin` (PIN por defecto: `ket2026`)

---

## 📦 Instrucciones de Despliegue

### 1. Despliegue en Railway (Recomendado para Servidor Node.js Continuo + SQLite + Uploads)
Railway permite ejecutar el servidor de Node.js con persistencia de archivos de audio locales y SQLite:

1. Crea una cuenta en [Railway.app](https://railway.app).
2. Haz clic en **New Project** -> **Deploy from GitHub repo**.
3. Selecciona este repositorio.
4. (Opcional) En la pestaña **Variables**, define:
   - `PORT`: `3000`
   - `ADMIN_PASSCODE`: `TuClaveDocentePersonalizada`
5. Configura un **Volume** en Railway montado en `/uploads` para conservar las grabaciones de audio de los alumnos en producción.
6. ¡Listo! Railway generará un dominio público HTTPS automático (ej. `https://ket-exam-production.up.railway.app`).

---

### 2. Despliegue en Vercel (Opción Serverless)
Para desplegar la aplicación en Vercel como Serverless Functions:

1. Crea un archivo `vercel.json` en la raíz del proyecto:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "server.js", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "server.js" }
     ]
   }
   ```
2. **Nota para Persistencia en Vercel Serverless**: Dado que las funciones serverless de Vercel son efímeras y no mantienen archivos grabados en el disco local (`/uploads` y `ket_exam.db`), para producción en Vercel se recomienda conectar un servicio de almacenamiento como **Supabase** para la base de datos o **Cloudinary / AWS S3** para los audios de Speaking. En el código actual con SQLite local, funcionará en modo demo/memoria temporal.

---

## 🏫 Estructura de Archivos del Proyecto

```
/
├── config/
│   └── db.js                 # Conexión SQLite y esquemas
├── models/
│   ├── StudentModel.js       # Operaciones de alumnos
│   ├── ExamModel.js          # Banco KET A2 y evaluación
│   └── SubmissionModel.js    # Guardado de exámenes
├── views/
│   ├── index.html            # Registro de 6to grado
│   ├── exam.html             # Interfaz del examen y grabador
│   └── admin.html            # Panel privado de profesores
├── controllers/
│   ├── ExamController.js     # Lógica de renderizado y examen
│   ├── AudioController.js    # Subida de audios (Multer)
│   └── AdminController.js    # Panel docente y autenticación
├── routes/
│   ├── webRoutes.js          # Rutas HTML
│   └── apiRoutes.js          # Endpoints API REST
├── public/
│   ├── css/
│   │   └── styles.css        # Sistema de diseño estético
│   └── js/
│       ├── exam.js           # Lógica del cliente y MediaRecorder
│       └── admin.js          # Lógica del panel docente
├── uploads/                  # Carpeta de almacenamiento de audios
├── server.js                 # Servidor principal Express
├── package.json              # Configuración y dependencias
└── README.md                 # Documentación
