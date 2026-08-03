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

    if (db.isServerless) {
      const store = await db.fetchStore();
      let existing = store.students.find(s => 
        (s.username && cleanUser && s.username.toLowerCase() === cleanUser) ||
        (s.first_name.toLowerCase() === cleanFirst.toLowerCase() && s.last_name.toLowerCase() === cleanLast.toLowerCase())
      );

      if (existing) {
        existing.last_login_at = new Date().toISOString();
        await db.saveStore(store);
        return existing;
      }

      const maxId = store.students.reduce((m, s) => Math.max(m, s.id || 0), 0);
      const id = maxId + 1;
      const newStudent = {
        id,
        first_name: cleanFirst,
        last_name: cleanLast,
        grade: cleanGrade,
        username: cleanUser,
        last_login_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      store.students.push(newStudent);
      await db.saveStore(store);
      return newStudent;
    }

    try {
      const existing = db.prepare(`
        SELECT * FROM bonus_students 
        WHERE LOWER(username) = LOWER(?) OR (LOWER(first_name) = LOWER(?) AND LOWER(last_name) = LOWER(?))
        ORDER BY id DESC LIMIT 1
      `).get(cleanUser, cleanFirst, cleanLast);

      if (existing) return existing;
    } catch (e) {}

    const stmt = db.prepare(`
      INSERT INTO bonus_students (first_name, last_name, grade, username)
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
}

module.exports = BonusStudentModel;
