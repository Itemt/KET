const db = require('../config/db');
const studentsList = require('../config/students.json');

class StudentModel {
  static getAuthorizedList() {
    return studentsList.map(s => ({
      id: s.id,
      fullName: s.fullName,
      username: s.username,
      grade: s.grade
    }));
  }

  static async authenticate(username, password) {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim().toLowerCase();

    const officialStudent = studentsList.find(s =>
      s.username.toLowerCase() === cleanUser && s.password.toLowerCase() === cleanPass
    );

    if (!officialStudent) {
      return null;
    }

    const attemptTime = new Date().toISOString();
    const studentRecord = await this.createOrGet(
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

  static async createOrGet(firstName, lastName, grade, username = '') {
    const cleanFirst = firstName.trim();
    const cleanLast = lastName.trim();
    const cleanGrade = grade.trim();
    const cleanUser = username.trim().toLowerCase();

    // Buscar estudiante existente por username o nombre completo
    const existing = await db.queryOne(
      `SELECT * FROM students 
       WHERE (LENGTH(?) > 0 AND username IS NOT NULL AND LOWER(username) = ?)
          OR (LOWER(first_name) = ? AND LOWER(last_name) = ?)
       ORDER BY id DESC LIMIT 1`,
      [cleanUser, cleanUser, cleanFirst.toLowerCase(), cleanLast.toLowerCase()]
    );

    if (existing) {
      // Actualizar last_login_at
      await db.run(
        `UPDATE students SET last_login_at = ? WHERE id = ?`,
        [new Date().toISOString(), existing.id]
      );
      return existing;
    }

    // Crear nuevo estudiante
    const result = await db.run(
      `INSERT INTO students (first_name, last_name, grade, username, last_login_at)
       VALUES (?, ?, ?, ?, ?)`,
      [cleanFirst, cleanLast, cleanGrade, cleanUser || null, new Date().toISOString()]
    );

    return {
      id: Number(result.lastInsertRowid),
      first_name: cleanFirst,
      last_name: cleanLast,
      grade: cleanGrade,
      username: cleanUser
    };
  }

  static async getById(id) {
    return db.queryOne('SELECT * FROM students WHERE id = ?', [parseInt(id, 10)]);
  }
}

module.exports = StudentModel;
