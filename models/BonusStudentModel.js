const db = require('../config/bonus_db');
const studentsList = require('../config/students.json');

class BonusStudentModel {
  static async authenticate(username, password) {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim().toLowerCase();

    const officialStudent = studentsList.find(s =>
      s.username.toLowerCase() === cleanUser && s.password.toLowerCase() === cleanPass
    );

    if (!officialStudent) return null;

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

    const existing = await db.queryOne(
      `SELECT * FROM bonus_students
       WHERE (username IS NOT NULL AND username != '' AND LOWER(username) = ?)
          OR (LOWER(first_name) = ? AND LOWER(last_name) = ?)
       ORDER BY id DESC LIMIT 1`,
      [cleanUser, cleanFirst.toLowerCase(), cleanLast.toLowerCase()]
    );

    if (existing) {
      await db.run(
        `UPDATE bonus_students SET last_login_at = ? WHERE id = ?`,
        [new Date().toISOString(), existing.id]
      );
      return existing;
    }

    const result = await db.run(
      `INSERT INTO bonus_students (first_name, last_name, grade, username, last_login_at)
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
}

module.exports = BonusStudentModel;
