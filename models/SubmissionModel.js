const db = require('../config/db');

class SubmissionModel {
  /**
   * Guarda un nuevo envío de examen en la base de datos
   * @param {object} submissionData 
   */
  static save(submissionData) {
    const {
      student_id,
      score_reading_writing,
      score_listening,
      total_auto_score,
      max_auto_score,
      writing_part6,
      writing_part7,
      speaking_audio_url,
      raw_answers_json
    } = submissionData;

    const stmt = db.prepare(`
      INSERT INTO submissions (
        student_id,
        score_reading_writing,
        score_listening,
        total_auto_score,
        max_auto_score,
        writing_part6,
        writing_part7,
        speaking_audio_url,
        raw_answers_json
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(
      student_id,
      score_reading_writing,
      score_listening,
      total_auto_score,
      max_auto_score,
      writing_part6 || '',
      writing_part7 || '',
      speaking_audio_url || '',
      JSON.stringify(raw_answers_json || {})
    );

    return info.lastInsertRowid;
  }

  /**
   * Obtiene todos los envíos con datos del estudiante para el panel de administración
   */
  static getAllWithStudent() {
    return db.prepare(`
      SELECT 
        s.id AS submission_id,
        st.id AS student_id,
        st.first_name,
        st.last_name,
        st.grade,
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
    `).all();
  }

  /**
   * Obtiene un envío por su ID con detalles completos
   * @param {number} submissionId 
   */
  static getById(submissionId) {
    const row = db.prepare(`
      SELECT 
        s.*,
        st.first_name,
        st.last_name,
        st.grade
      FROM submissions s
      JOIN students st ON s.student_id = st.id
      WHERE s.id = ?
    `).get(submissionId);

    if (row && row.raw_answers_json) {
      try {
        row.raw_answers_json = JSON.parse(row.raw_answers_json);
      } catch (e) {
        row.raw_answers_json = {};
      }
    }

    return row;
  }

  /**
   * Elimina un envío por ID
   * @param {number} submissionId 
   */
  static delete(submissionId) {
    return db.prepare('DELETE FROM submissions WHERE id = ?').run(submissionId);
  }
}

module.exports = SubmissionModel;
