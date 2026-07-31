/**
 * MODELO DE EXAMEN BONUS (DESAFÍO AVANZADO KET / B1 PRELIMINARY)
 * Examen especial para estudiantes que terminan rápido el simulacro oficial.
 */

class BonusExamModel {
  static getFullBonusExamData() {
    return {
      title: "🚀 Cambridge KET Bonus Challenge - 6th Grade",
      timeAllowedMinutes: 30,
      sections: {
        bonus_reading_writing: {
          title: "Bonus Challenge Section",
          timeLimit: "30 minutes",
          totalParts: 4,
          parts: [
            /* --- BONUS PART 1: ADVANCED NOTICES (5 Questions) --- */
            {
              part: 1,
              instructions: "Read the notices below and choose the correct option (A, B, or C).",
              type: "multiple_choice",
              questions: [
                {
                  id: "bonus_p1_q1",
                  context: "SCIENCE LAB NOTICE: 'Safety goggles must be worn at all times during experiments. Do not touch chemicals without permission.'",
                  question: "1. What is the rule in the science lab?",
                  options: {
                    A: "You can remove safety goggles after starting the experiment.",
                    B: "Wearing safety goggles is compulsory during experiments.",
                    C: "Students can use chemicals whenever they want."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "bonus_p1_q2",
                  context: "ANNOUNCEMENT: 'The school orchestra audition has been extended to Friday. Register online before 5:00 pm.'",
                  question: "2. What should students wishing to join the orchestra do?",
                  options: {
                    A: "Sign up on the website before Friday afternoon.",
                    B: "Attend an audition on Friday at 5:00 pm.",
                    C: "Wait until next week to apply."
                  },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p1_q3",
                  context: "EMAIL FROM ELENA: 'Hi Chris, I left my English dictionary on your desk after class. Could you bring it to school tomorrow?'",
                  question: "3. Elena wrote this email to:",
                  options: {
                    A: "Borrow Chris's English dictionary for school.",
                    B: "Ask Chris to return a dictionary she left behind.",
                    C: "Lend Chris her dictionary for tomorrow's test."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "bonus_p1_q4",
                  context: "GYM CLUB NOTICE: 'Locker keys must be returned to the reception counter after every training session.'",
                  question: "4. What must gym members do with locker keys?",
                  options: {
                    A: "Keep them at home until their next training session.",
                    B: "Leave them inside the locker door.",
                    C: "Hand them back to the reception staff when finished."
                  },
                  correctAnswer: "C"
                },
                {
                  id: "bonus_p1_q5",
                  context: "ART ROOM SIGN: 'Please clean all paintbrushes and store them in the wooden trays before leaving.'",
                  question: "5. What are art students required to do?",
                  options: {
                    A: "Wash and put away their paint supplies properly.",
                    B: "Leave paintbrushes in the sink for the teacher to wash.",
                    C: "Buy new wooden trays for their paintbrushes."
                  },
                  correctAnswer: "A"
                }
              ]
            },

            /* --- BONUS PART 2: MATCHING PLACES & ACTIVITIES (5 Questions) --- */
            {
              part: 2,
              instructions: "Read the five notices below (A-E). For questions 6-10, match each statement to the correct notice.",
              type: "matching_notices",
              notices: [
                { id: "A", title: "Notice A: Astronomy Club", text: "Look through powerful telescopes every Thursday night! Learn about constellations and planets." },
                { id: "B", title: "Notice B: Robotics Workshop", text: "Design and program your own solar-powered robot. Saturdays from 10:00 am to 1:00 pm." },
                { id: "C", title: "Notice C: Creative Writing Hub", text: "Write original short stories and poetry! Weekly competitions with book prize vouchers." },
                { id: "D", title: "Notice D: Adventure Kayaking", text: "Learn river navigation and water safety techniques. Equipment and life jackets provided." },
                { id: "E", title: "Notice E: Chess Academy", text: "Master strategic moves and compete in junior regional tournaments every Sunday." }
              ],
              questions: [
                {
                  id: "bonus_p2_q6",
                  question: "6. You want to study stars and planets using specialized optical gear.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p2_q7",
                  question: "7. You want to code and construct machines that run on renewable energy.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E" },
                  correctAnswer: "B"
                },
                {
                  id: "bonus_p2_q8",
                  question: "8. You enjoy composing imaginative stories and winning book awards.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E" },
                  correctAnswer: "C"
                },
                {
                  id: "bonus_p2_q9",
                  question: "9. You want to practice outdoor water sports with safety gear included.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E" },
                  correctAnswer: "D"
                },
                {
                  id: "bonus_p2_q10",
                  question: "10. You want to improve your mental board strategy and join tournaments.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E" },
                  correctAnswer: "E"
                }
              ]
            },

            /* --- BONUS PART 3: ADVANCED VOCABULARY CLOZE (5 Questions) --- */
            {
              part: 3,
              instructions: "Read the article about Space Exploration. For questions 11-15, choose the correct word (A, B, or C).",
              type: "multiple_choice_cloze",
              passage: "Astronauts living on the International Space Station experience incredible things. They float in microgravity and watch fifteen sunrises every day. However, living in space requires great (11) [____]. Astronauts must exercise for two hours daily to keep their muscles (12) [____]. They also eat special dehydrated foods that are packaged in pouches. Communication with scientists on Earth is very (13) [____] for solving complex problems. In the future, humans plan to build permanent (14) [____] on the Moon and Mars so scientists can (15) [____] deep space in greater detail.",
              questions: [
                {
                  id: "bonus_p3_q11",
                  gapNumber: 11,
                  options: { A: "discipline", B: "laziness", C: "sleep" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p3_q12",
                  gapNumber: 12,
                  options: { A: "strong", B: "weak", C: "heavy" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p3_q13",
                  gapNumber: 13,
                  options: { A: "essential", B: "unnecessary", C: "impossible" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p3_q14",
                  gapNumber: 14,
                  options: { A: "bases", B: "roads", C: "forests" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p3_q15",
                  gapNumber: 15,
                  options: { A: "explore", B: "ignore", C: "forget" },
                  correctAnswer: "A"
                }
              ]
            },

            /* --- BONUS PART 4: CREATIVE WRITING CHALLENGE --- */
            {
              part: 4,
              instructions: "BONUS CREATIVE WRITING: Imagine you won a trip to a high-tech underwater laboratory! Write a short journal entry (at least 30 words in English) describing what you saw, what machines you used, and how you felt.",
              type: "text_production",
              minWords: 30,
              fieldName: "bonus_writing"
            }
          ]
        }
      }
    };
  }

  static getSanitizedBonusExamData() {
    const fullData = JSON.parse(JSON.stringify(this.getFullBonusExamData()));
    fullData.sections.bonus_reading_writing.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          delete q.correctAnswer;
          delete q.acceptableAnswers;
        });
      }
    });
    return fullData;
  }

  static evaluateAnswers(studentAnswers) {
    const fullData = this.getFullBonusExamData();
    let score = 0;
    let max = 0;

    fullData.sections.bonus_reading_writing.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          if (q.correctAnswer || q.acceptableAnswers) {
            max++;
            const given = (studentAnswers[q.id] || "").toString().trim().toLowerCase();
            if (q.correctAnswer && given === q.correctAnswer.toLowerCase()) {
              score++;
            }
          }
        });
      }
    });

    return {
      total_auto_score: score,
      max_auto_score: max
    };
  }
}

module.exports = BonusExamModel;
