/**
 * MODELO DE EXAMEN KET (A2 Key) - CAMBRIDGE ENGLISH FOR 6TH GRADE
 * Soporta 10 versiones dinámicas de Reading & Writing y 3 versiones de Listening (Audios 1 y 2).
 */

const examVersions = require('./ExamVersions');
const listeningVersions = require('./ListeningVersions');

class ExamModel {
  /**
   * Versión determinística de Reading & Writing según ID de alumno.
   */
  static getVersionForStudent(studentId) {
    const parsedId = parseInt(studentId, 10);
    if (isNaN(parsedId) || parsedId <= 0) return 0;
    return (parsedId - 1) % examVersions.length;
  }

  /**
   * Versión determinística de Listening (0, 1 o 2) según ID de alumno.
   */
  static getListeningVersionForStudent(studentId) {
    const parsedId = parseInt(studentId, 10);
    if (isNaN(parsedId) || parsedId <= 0) return 0;
    return (parsedId - 1) % listeningVersions.length;
  }

  static getVersionData(versionIndex = 0) {
    const idx = Math.abs(parseInt(versionIndex, 10) || 0) % examVersions.length;
    return examVersions[idx] || examVersions[0];
  }

  static getListeningVersionData(listeningVersionIndex = 0) {
    const idx = Math.abs(parseInt(listeningVersionIndex, 10) || 0) % listeningVersions.length;
    return listeningVersions[idx] || listeningVersions[0];
  }

  static getFullExamData(versionIndex = 0, listeningVersionIndex = 0) {
    const vData = this.getVersionData(versionIndex);
    const lData = this.getListeningVersionData(listeningVersionIndex);

    return {
      title: vData.title || "Cambridge KET (A2 Key) for Schools — Official Practice Exam",
      timeAllowedMinutes: 90,
      version: vData.versionId,
      listeningVersion: lData.versionId,
      sections: {
        reading_writing: {
          title: "Reading & Writing Section",
          timeLimit: "60 minutes",
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
        },

        listening: {
          title: "Listening Section (Audio 1 & Audio 2)",
          timeLimit: "30 minutes",
          versionId: lData.versionId,
          audios: lData.audios
        }
      }
    };
  }

  static getSanitizedExamData(versionIndex = 0, listeningVersionIndex = 0) {
    const fullData = JSON.parse(JSON.stringify(this.getFullExamData(versionIndex, listeningVersionIndex)));

    // Sanitizar Reading & Writing
    if (fullData.sections && fullData.sections.reading_writing) {
      fullData.sections.reading_writing.parts.forEach(part => {
        if (part.questions) {
          part.questions.forEach(q => {
            delete q.correctAnswer;
            delete q.acceptableAnswers;
          });
        }
      });
    }

    // Sanitizar Listening Audios
    if (fullData.sections && fullData.sections.listening && fullData.sections.listening.audios) {
      fullData.sections.listening.audios.forEach(audioObj => {
        if (audioObj.parts) {
          audioObj.parts.forEach(part => {
            if (part.questions) {
              part.questions.forEach(q => {
                delete q.correctAnswer;
                delete q.acceptableAnswers;
              });
            }
          });
        }
      });
    }

    return fullData;
  }

  static evaluateAnswers(studentAnswers, versionIndex = 0, listeningVersionIndex = 0) {
    const fullData = this.getFullExamData(versionIndex, listeningVersionIndex);
    let scoreRW = 0;
    let maxRW = 0;
    let scoreList = 0;
    let maxList = 0;

    // Evaluación de Reading & Writing
    if (fullData.sections && fullData.sections.reading_writing) {
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
    }

    // Evaluación de Listening Audios
    if (fullData.sections && fullData.sections.listening && fullData.sections.listening.audios) {
      fullData.sections.listening.audios.forEach(audioObj => {
        if (audioObj.parts) {
          audioObj.parts.forEach(part => {
            if (part.questions) {
              part.questions.forEach(q => {
                if (q.correctAnswer || q.acceptableAnswers) {
                  maxList++;
                  const given = (studentAnswers[q.id] || "").toString().trim().toLowerCase();

                  if (q.correctAnswer && given === q.correctAnswer.toLowerCase()) {
                    scoreList++;
                  } else if (q.acceptableAnswers) {
                    const isOk = q.acceptableAnswers.some(ans => ans.toLowerCase() === given);
                    if (isOk) scoreList++;
                  }
                }
              });
            }
          });
        }
      });
    }

    return {
      score_reading_writing: scoreRW,
      max_reading_writing: maxRW,
      score_listening: scoreList,
      max_listening: maxList,
      total_auto_score: scoreRW + scoreList,
      max_auto_score: maxRW + maxList
    };
  }
}

module.exports = ExamModel;
