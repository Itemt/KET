const db = require('../config/db');

class SubmissionModel {
  static async save(submissionData) {
    const {
      student_id,
      attempt_time,
      score_reading_writing,
      score_listening,
      total_auto_score,
      max_auto_score,
      writing_part6,
      writing_part7,
      speaking_audio_url,
      raw_answers_json
    } = submissionData;

    const result = await db.run(
      `INSERT INTO submissions (
        student_id,
        attempt_time,
        score_reading_writing,
        score_listening,
        total_auto_score,
        max_auto_score,
        writing_part6,
        writing_part7,
        speaking_audio_url,
        raw_answers_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_id,
        attempt_time || new Date().toISOString(),
        score_reading_writing || 0,
        score_listening || 0,
        total_auto_score || 0,
        max_auto_score || 0,
        writing_part6 || '',
        writing_part7 || '',
        speaking_audio_url || '',
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
        s.score_reading_writing,
        s.score_listening,
        s.total_auto_score,
        s.max_auto_score,
        s.writing_part6,
        s.writing_part7,
        s.speaking_audio_url,
        s.submitted_at
      FROM submissions s
      JOIN students st ON s.student_id = st.id
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
      FROM submissions s
      JOIN students st ON s.student_id = st.id
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
    return db.run('DELETE FROM submissions WHERE id = ?', [submissionId]);
  }
}

module.exports = SubmissionModel;
