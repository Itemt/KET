const db = require('../config/db');
const studentsList = require('../config/students.json');

class StudentModel {
  /**
   * Obtener la lista completa de estudiantes autorizados
   */
  static getAuthorizedList() {
    return studentsList.map(s => ({
      id: s.id,
      fullName: s.fullName,
      username: s.username,
      grade: s.grade
    }));
  }

  /**
   * Autenticar un estudiante con username y password (ambos 'nombreapellido')
   * @param {string} username 
   * @param {string} password 
   */
  static authenticate(username, password) {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim().toLowerCase();

    // Buscar en la lista oficial pre-cargada
    const officialStudent = studentsList.find(s => 
      s.username.toLowerCase() === cleanUser && s.password.toLowerCase() === cleanPass
    );

    if (!officialStudent) {
      return null;
    }

    // Registrar o actualizar sesión en la base de datos con hora de intento
    const attemptTime = new Date().toISOString();
    const studentRecord = this.createOrGet(
      officialStudent.firstName,
      officialStudent.lastName,
      officialStudent.grade,
      officialStudent.username
    );

    return {
      ...studentRecord,
      fullName: officialStudent.fullName,
      attemptTime
    };
  }

  /**
   * Registra o recupera un estudiante existente
   */
  static createOrGet(firstName, lastName, grade, username = '') {
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const cleanGrade = grade.trim();
    const cleanUser = username.trim().toLowerCase();

    try {
      const existing = db.prepare(`
        SELECT * FROM students 
        WHERE LOWER(username) = LOWER(?) OR (LOWER(first_name) = LOWER(?) AND LOWER(last_name) = LOWER(?))
        ORDER BY id DESC LIMIT 1
      `).get(cleanUser, cleanFirst, cleanLast);

      if (existing) {
        return existing;
      }
    } catch (e) {
      // Ignorar si la columna no existe aún
    }

    const stmt = db.prepare(`
      INSERT INTO students (first_name, last_name, grade, username)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(cleanFirst, cleanLast, cleanGrade, cleanUser);

    return {
      id: info.lastInsertRowid,
      first_name: cleanFirst,
      last_name: cleanLast,
      grade: cleanGrade,
      username: cleanUser
    };
  }

  static getById(id) {
    return db.prepare('SELECT * FROM students WHERE id = ?').get(id);
  }
}

module.exports = StudentModel;
