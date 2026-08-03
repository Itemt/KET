/**
 * MODELO DE EXAMEN KET (A2 Key) - CAMBRIDGE ENGLISH FOR 6TH GRADE
 * Soporta 10 versiones dinámicas de examen asignadas por ID de estudiante.
 */

const examVersions = require('./ExamVersions');

class ExamModel {
  /**
   * Calcula determinísticamente la versión del examen para un estudiante.
   * studentId 1 -> versión 0
   * studentId 2 -> versión 1
   * ...
   * studentId 10 -> versión 9
   * studentId 11 -> versión 0
   */
  static getVersionForStudent(studentId) {
    const parsedId = parseInt(studentId, 10);
    if (isNaN(parsedId) || parsedId <= 0) return 0;
    return (parsedId - 1) % examVersions.length;
  }

  static getVersionData(versionIndex = 0) {
    const idx = Math.abs(parseInt(versionIndex, 10) || 0) % examVersions.length;
    return examVersions[idx] || examVersions[0];
  }

  static getFullExamData(versionIndex = 0) {
    const vData = this.getVersionData(versionIndex);

    return {
      title: vData.title || "Cambridge KET (A2 Key) for Schools — Official Practice Exam",
      timeAllowedMinutes: 75,
      version: vData.versionId,
      sections: {
        reading_writing: {
          title: "Reading & Writing Section",
          timeLimit: "75 minutes",
          totalParts: 7,
          parts: [
            /* PART 1: SHORT NOTICES & MESSAGES (Q1-10) */
            {
              part: 1,
              instructions: "For questions 1–10, read each notice or message and choose the best answer (A, B, or C).",
              type: "multiple_choice",
              questions: vData.p1
            },

            /* PART 2: MATCHING NOTICES (8 Notices A-H, Q11-20) */
            {
              part: 2,
              instructions: "Read the eight notices below (A–H). For questions 11–20, match each person's statement to the most suitable notice (A–H).",
              type: "matching_notices",
              notices: vData.p2Notices,
              questions: vData.p2Questions
            },

            /* PART 3: MATCHING PROFILES (3 Texts, Q21-30) */
            {
              part: 3,
              instructions: "Read the three short profiles. For questions 21–30, decide which person each statement describes.",
              type: "matching_texts",
              texts: vData.p3Texts,
              questions: vData.p3Questions
            },

            /* PART 4: MULTIPLE CHOICE VOCABULARY CLOZE (Q31-40) */
            {
              part: 4,
              instructions: "Read the texts below. For questions 31–40, choose the correct word (A, B, or C) to fill each gap.",
              type: "multiple_choice_cloze",
              passage: vData.p4Passage,
              questions: vData.p4Questions
            },

            /* PART 5: OPEN CLOZE (Q41-48) */
            {
              part: 5,
              instructions: "Read the text below. For questions 41–48, write ONE word only to fill each gap.",
              type: "open_cloze",
              passage: vData.p5Passage,
              questions: vData.p5Questions
            },

            /* PART 6: WRITING SHORT EMAIL */
            {
              part: 6,
              instructions: vData.p6Instructions,
              type: "text_production",
              minWords: 25,
              fieldName: "writing_part6"
            },

            /* PART 7: WRITING SHORT STORY */
            {
              part: 7,
              instructions: vData.p7Instructions,
              type: "text_production",
              minWords: 35,
              fieldName: "writing_part7"
            }
          ]
        }
      }
    };
  }

  static getSanitizedExamData(versionIndex = 0) {
    const fullData = JSON.parse(JSON.stringify(this.getFullExamData(versionIndex)));

    fullData.sections.reading_writing.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          delete q.correctAnswer;
          delete q.acceptableAnswers;
        });
      }
    });

    return fullData;
  }

  static evaluateAnswers(studentAnswers, versionIndex = 0) {
    const fullData = this.getFullExamData(versionIndex);
    let scoreRW = 0;
    let maxRW = 0;

    fullData.sections.reading_writing.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          if (q.correctAnswer || q.acceptableAnswers) {
            maxRW++;
            const given = (studentAnswers[q.id] || "").toString().trim().toLowerCase();

            if (q.correctAnswer && given === q.correctAnswer.toLowerCase()) {
              scoreRW++;
            } else if (q.acceptableAnswers) {
              const isOk = q.acceptableAnswers.some(ans => ans.toLowerCase() === given);
              if (isOk) scoreRW++;
            }
          }
        });
      }
    });

    return {
      score_reading_writing: scoreRW,
      max_reading_writing: maxRW,
      score_listening: 0,
      max_listening: 0,
      total_auto_score: scoreRW,
      max_auto_score: maxRW
    };
  }
}

module.exports = ExamModel;
