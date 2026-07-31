const db = require('../config/db');

class StudentModel {
  /**
   * Registra o recupera un estudiante existente por Nombre, Apellido y Grado
   * @param {string} firstName 
   * @param {string} lastName 
   * @param {string} grade 
   * @returns {object} Objeto del estudiante con id
   */
  static createOrGet(firstName, lastName, grade) {
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const cleanGrade = grade.trim();

    // Verificar si ya existe en la misma sesión/grado
    const existing = db.prepare(`
      SELECT * FROM students 
      WHERE LOWER(first_name) = LOWER(?) 
        AND LOWER(last_name) = LOWER(?) 
        AND grade = ?
      ORDER BY id DESC LIMIT 1
    `).get(cleanFirst, cleanLast, cleanGrade);

    if (existing) {
      return existing;
    }

    const stmt = db.prepare(`
      INSERT INTO students (first_name, last_name, grade)
      VALUES (?, ?, ?)
    `);
    const info = stmt.run(cleanFirst, cleanLast, cleanGrade);

    return {
      id: info.lastInsertRowid,
      first_name: cleanFirst,
      last_name: cleanLast,
      grade: cleanGrade
    };
  }

  /**
   * Obtener un estudiante por ID
   * @param {number} id 
   */
  static getById(id) {
    return db.prepare('SELECT * FROM students WHERE id = ?').get(id);
  }
}

module.exports = StudentModel;
