const db = require('../config/bonus_db');

class BonusSubmissionModel {
  static async save(submissionData) {
    const {
      student_id,
      attempt_time,
      total_auto_score,
      max_auto_score,
      bonus_writing,
      raw_answers_json
    } = submissionData;

    const result = await db.run(
      `INSERT INTO bonus_submissions (
        student_id,
        attempt_time,
        total_auto_score,
        max_auto_score,
        bonus_writing,
        raw_answers_json
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        student_id,
        attempt_time || new Date().toISOString(),
        total_auto_score || 0,
        max_auto_score || 0,
        bonus_writing || '',
        typeof raw_answers_json === 'string' ? raw_answers_json : JSON.stringify(raw_answers_json || {})
      ]
    );

    return Number(result.lastInsertRowid);
  }

  static async getAllWithStudent() {
    const rows = await db.queryAll(`
      SELECT
        s.id AS submission_id,
        st.id AS student_id,
        st.first_name,
        st.last_name,
        st.grade,
        s.attempt_time,
        s.total_auto_score,
        s.max_auto_score,
        s.bonus_writing,
        s.submitted_at
      FROM bonus_submissions s
      JOIN bonus_students st ON s.student_id = st.id
      ORDER BY s.submitted_at DESC
    `, []);

    return rows;
  }

  static async getById(submissionId) {
    const row = await db.queryOne(`
      SELECT
        s.*,
        st.first_name,
        st.last_name,
        st.grade
      FROM bonus_submissions s
      JOIN bonus_students st ON s.student_id = st.id
      WHERE s.id = ?
    `, [submissionId]);

    if (row && row.raw_answers_json && typeof row.raw_answers_json === 'string') {
      try {
        row.raw_answers_json = JSON.parse(row.raw_answers_json);
      } catch (e) {
        row.raw_answers_json = {};
      }
    }

    return row;
  }

  static async delete(submissionId) {
    return db.run('DELETE FROM bonus_submissions WHERE id = ?', [submissionId]);
  }
}

module.exports = BonusSubmissionModel;
