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

    if (db.isServerless) {
      const lockFn = db.withLock || (fn => fn());
      return lockFn(async () => {
        const store = await db.fetchStore();
        // Usar max(id)+1 en lugar de length+1 para evitar IDs duplicados en envíos simultáneos
        const maxId = store.submissions.reduce((m, s) => Math.max(m, s.id || 0), 0);
        const id = maxId + 1;
        const newSub = {
          id,
          student_id: parseInt(student_id, 10),
          attempt_time: attempt_time || new Date().toISOString(),
          score_reading_writing: score_reading_writing || 0,
          score_listening: score_listening || 0,
          total_auto_score: total_auto_score || 0,
          max_auto_score: max_auto_score || 0,
          writing_part6: writing_part6 || '',
          writing_part7: writing_part7 || '',
          speaking_audio_url: speaking_audio_url || '',
          raw_answers_json: typeof raw_answers_json === 'string' ? raw_answers_json : JSON.stringify(raw_answers_json || {}),
          submitted_at: new Date().toISOString()
        };
        store.submissions.push(newSub);
        await db.saveStore(store);
        return id;
      });
    }

    // Entorno SQLite nativo
    const stmt = db.prepare(`
      INSERT INTO submissions (
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
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(
      student_id,
      attempt_time || new Date().toISOString(),
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

  static async getAllWithStudent() {
    const studentsList = require('../config/students.json');
    if (db.isServerless) {
      const store = await db.fetchStore();
      return store.submissions.map(sub => {
        let st = store.students.find(s => s.id === sub.student_id);
        if (!st) {
          const official = studentsList.find(s => s.id === sub.student_id);
          if (official) {
            st = { first_name: official.firstName, last_name: official.lastName, grade: official.grade };
          }
        }
        st = st || {};

        return {
          submission_id: sub.id,
          student_id: sub.student_id,
          first_name: st.first_name || 'Estudiante',
          last_name: st.last_name || '',
          grade: st.grade || '6to',
          attempt_time: sub.attempt_time || sub.submitted_at,
          score_reading_writing: sub.score_reading_writing,
          score_listening: sub.score_listening,
          total_auto_score: sub.total_auto_score,
          max_auto_score: sub.max_auto_score,
          writing_part6: sub.writing_part6,
          writing_part7: sub.writing_part7,
          speaking_audio_url: sub.speaking_audio_url,
          submitted_at: sub.submitted_at
        };
      }).sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
    }

    return db.prepare(`
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
    `).all();
  }

  static async getById(submissionId) {
    if (db.isServerless) {
      const store = await db.fetchStore();
      const subId = parseInt(submissionId, 10);
      const sub = store.submissions.find(s => s.id === subId);
      if (sub) {
        const st = store.students.find(s => s.id === sub.student_id) || {};
        let rawAnswers = sub.raw_answers_json;
        if (typeof rawAnswers === 'string') {
          try { rawAnswers = JSON.parse(rawAnswers); } catch (e) { rawAnswers = {}; }
        }
        return {
          ...sub,
          first_name: st.first_name || 'Estudiante',
          last_name: st.last_name || '',
          grade: st.grade || '6to',
          attempt_time: sub.attempt_time || sub.submitted_at,
          raw_answers_json: rawAnswers
        };
      }
      return null;
    }

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
    if (db.isServerless) {
      const store = await db.fetchStore();
      store.submissions = store.submissions.filter(s => s.id !== parseInt(submissionId, 10));
      await db.saveStore(store);
      return { changes: 1 };
    }
    return db.prepare('DELETE FROM submissions WHERE id = ?').run(submissionId);
  }
}

module.exports = SubmissionModel;
