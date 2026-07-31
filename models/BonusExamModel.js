/**
 * MODELO DE EXAMEN BONUS EXTENDIDO (DESAFÍO AVANZADO KET / B1 PRELIMINARY)
 * Examen extendido (33 preguntas objetivas + 2 redactadas) para estudiantes avanzados.
 */

class BonusExamModel {
  static getFullBonusExamData() {
    return {
      title: "🚀 Cambridge KET & B1 Bonus Challenge - Extended Edition",
      timeAllowedMinutes: 45,
      sections: {
        bonus_reading_writing: {
          title: "Extended Bonus Challenge Section",
          timeLimit: "45 minutes",
          totalParts: 6,
          parts: [
            /* --- BONUS PART 1: ADVANCED SHORT NOTICES (8 Questions) --- */
            {
              part: 1,
              instructions: "For questions 1-8, read the short notice/email and choose the correct answer (A, B, or C).",
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
                },
                {
                  id: "bonus_p1_q6",
                  context: "SCHOOL TRIP MEMO: 'Bus departs at 8:00 am sharp. Late arrivals will have to arrange their own transport to the museum.'",
                  question: "6. What is the instruction regarding the bus departure?",
                  options: {
                    A: "The bus will wait for anyone arriving after 8:00 am.",
                    B: "Students missing the 8:00 am bus must find another way to the museum.",
                    C: "The museum trip starts at 8:00 am inside the museum."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "bonus_p1_q7",
                  context: "TEACHER MESSAGE: 'Homework submitted after midnight on Sunday will lose 10% of marks for each day late.'",
                  question: "7. What happens if homework is submitted on Monday?",
                  options: {
                    A: "It will be rejected completely.",
                    B: "Students will receive extra bonus points.",
                    C: "The total grade will be reduced."
                  },
                  correctAnswer: "C"
                },
                {
                  id: "bonus_p1_q8",
                  context: "CAFETERIA ANNOUNCEMENT: 'Salad bar open from 12:00 pm. Show student ID card to receive a free apple with your lunch meal.'",
                  question: "8. How can students get a free piece of fruit?",
                  options: {
                    A: "By presenting their student identity card at lunch.",
                    B: "By buying three salads at the cafeteria.",
                    C: "By ordering their meal before 12:00 pm."
                  },
                  correctAnswer: "A"
                }
              ]
            },

            /* --- BONUS PART 2: MATCHING PLACES & ACTIVITIES (7 Questions) --- */
            {
              part: 2,
              instructions: "Read the eight notices below (A-H). For questions 9-15, match each person's statement to the correct notice.",
              type: "matching_notices",
              notices: [
                { id: "A", title: "Notice A: Astronomy Club", text: "Look through powerful telescopes every Thursday night! Learn about constellations and planets." },
                { id: "B", title: "Notice B: Robotics Workshop", text: "Design and program your own solar-powered robot. Saturdays from 10:00 am to 1:00 pm." },
                { id: "C", title: "Notice C: Creative Writing Hub", text: "Write original short stories and poetry! Weekly competitions with book prize vouchers." },
                { id: "D", title: "Notice D: Adventure Kayaking", text: "Learn river navigation and water safety techniques. Equipment and life jackets provided." },
                { id: "E", title: "Notice E: Chess Academy", text: "Master strategic moves and compete in junior regional tournaments every Sunday." },
                { id: "F", title: "Notice F: Culinary Cooking School", text: "Bake international breads and healthy meals with certified chefs. Ingredients provided." },
                { id: "G", title: "Notice G: Junior Photography Studio", text: "Master camera lighting, focus, and digital photo editing tools. Camera gear provided." },
                { id: "H", title: "Notice H: Eco Garden Club", text: "Plant organic vegetables and flowers in the school greenhouse every Tuesday afternoon." }
              ],
              questions: [
                {
                  id: "bonus_p2_q9",
                  question: "9. You want to study stars and planets using specialized optical gear.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p2_q10",
                  question: "10. You want to code and construct machines that run on solar energy.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "B"
                },
                {
                  id: "bonus_p2_q11",
                  question: "11. You enjoy composing imaginative stories and winning book awards.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "C"
                },
                {
                  id: "bonus_p2_q12",
                  question: "12. You want to practice outdoor water sports with safety gear included.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "D"
                },
                {
                  id: "bonus_p2_q13",
                  question: "13. You want to improve your mental board strategy and join tournaments.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "E"
                },
                {
                  id: "bonus_p2_q14",
                  question: "14. You want to learn how to cook healthy meals with expert chefs.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "F"
                },
                {
                  id: "bonus_p2_q15",
                  question: "15. You want to take professional photos and edit them on computers.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "G"
                }
              ]
            },

            /* --- BONUS PART 3: EXTENDED READING COMPREHENSION (6 Questions) --- */
            {
              part: 3,
              instructions: "Read the article about Alex's Drone Invention. For questions 16-21, choose the correct answer (A, B, or C).",
              type: "multiple_choice",
              passage: "Alex is a twelve-year-old student who has always loved flying objects. Last year, he decided to design a lightweight drone to help rescue lost animals in national parks. Using recycled plastic and small electric motors, Alex spent three months building his prototype in his garage.\n\nHis drone is equipped with a thermal camera that detects body heat, making it easy to spot lost pets even at night. During a test flight in October, Alex's drone successfully located a missing puppy in a dense forest near his town in less than twenty minutes.\n\nLocal news reporters interviewed Alex, and several technology companies offered to support his project. Alex plans to study aerospace engineering at university and hopes his drones will be used by rescue teams worldwide.",
              questions: [
                {
                  id: "bonus_p3_q16",
                  context: "Article: Alex's Drone Invention",
                  question: "16. Why did Alex build his drone?",
                  options: {
                    A: "To enter a commercial flying race.",
                    B: "To assist in finding lost animals in parks.",
                    C: "To sell plastic toys to his classmates."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "bonus_p3_q17",
                  context: "Article: Alex's Drone Invention",
                  question: "17. What material did Alex use to build the drone frame?",
                  options: {
                    A: "Recycled plastic.",
                    B: "Heavy aluminum metal.",
                    C: "Glass and carbon fiber."
                  },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p3_q18",
                  context: "Article: Alex's Drone Invention",
                  question: "18. How does the drone spot animals at night?",
                  options: {
                    A: "By making loud whistle sounds.",
                    B: "By dropping bright flashlights.",
                    C: "By using a camera that senses body heat."
                  },
                  correctAnswer: "C"
                },
                {
                  id: "bonus_p3_q19",
                  context: "Article: Alex's Drone Invention",
                  question: "19. How long did it take the drone to find the missing puppy in October?",
                  options: {
                    A: "Under twenty minutes.",
                    B: "Over three days.",
                    C: "Exactly two hours."
                  },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p3_q20",
                  context: "Article: Alex's Drone Invention",
                  question: "20. What happened after Alex was interviewed by reporters?",
                  options: {
                    A: "He stopped working on his invention.",
                    B: "Tech companies offered to help his project.",
                    C: "He sold his garage to a university."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "bonus_p3_q21",
                  context: "Article: Alex's Drone Invention",
                  question: "21. What is Alex's goal for the future?",
                  options: {
                    A: "To study aerospace engineering and aid global rescue teams.",
                    B: "To become a full-time news reporter.",
                    C: "To build toy cars for children."
                  },
                  correctAnswer: "A"
                }
              ]
            },

            /* --- BONUS PART 4: VOCABULARY CLOZE - FUTURE CITIES (6 Questions) --- */
            {
              part: 4,
              instructions: "Read the article about Future Smart Cities. For questions 22-27, choose the correct word (A, B, or C).",
              type: "multiple_choice_cloze",
              passage: "Future cities will look very different from the ones we live in today. Engineers are designing smart buildings covered in green (22) [____] that produce oxygen and reduce heat. Electric buses and flying taxis will transport citizens (23) [____] without generating air pollution. Instead of traditional coal power plants, cities will rely entirely on (24) [____] energy from wind turbines and solar panels. Sensors will monitor water usage to prevent any (25) [____] of natural resources. Scientists believe these innovations will make urban life much more (26) [____] and healthy for future (27) [____].",
              questions: [
                {
                  id: "bonus_p4_q22",
                  gapNumber: 22,
                  options: { A: "plants", B: "pavements", C: "smoke" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p4_q23",
                  gapNumber: 23,
                  options: { A: "quietly", B: "loudly", C: "dangerously" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p4_q24",
                  gapNumber: 24,
                  options: { A: "clean", B: "dirty", C: "expensive" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p4_q25",
                  gapNumber: 25,
                  options: { A: "waste", B: "saving", C: "creation" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p4_q26",
                  gapNumber: 26,
                  options: { A: "comfortable", B: "painful", C: "boring" },
                  correctAnswer: "A"
                },
                {
                  id: "bonus_p4_q27",
                  gapNumber: 27,
                  options: { A: "generations", B: "machines", C: "statues" },
                  correctAnswer: "A"
                }
              ]
            },

            /* --- BONUS PART 5: OPEN GRAMMAR CLOZE - CAMPING TRIP (6 Questions) --- */
            {
              part: 5,
              instructions: "Read the email about a camping trip. For questions 28-33, write ONE word only for each gap.",
              type: "open_cloze",
              passage: "Dear David,\nI hope you (28) [____] having a great week! Next Friday, my family and I are going (29) [____] a camping expedition in the pine mountains. We will pitch our tents near a calm lake and build a campfire (30) [____] cook dinner. My dad bought a new compass so we (31) [____] explore the hiking trails safely. Would you like to come (32) [____] us? Please ask your parents and let (33) [____] know soon!\nBest regards,\nOliver",
              questions: [
                { id: "bonus_p5_q28", gapNumber: 28, acceptableAnswers: ["are"], correctAnswer: "are" },
                { id: "bonus_p5_q29", gapNumber: 29, acceptableAnswers: ["on", "for"], correctAnswer: "on" },
                { id: "bonus_p5_q30", gapNumber: 30, acceptableAnswers: ["to"], correctAnswer: "to" },
                { id: "bonus_p5_q31", gapNumber: 31, acceptableAnswers: ["can", "will"], correctAnswer: "can" },
                { id: "bonus_p5_q32", gapNumber: 32, acceptableAnswers: ["with"], correctAnswer: "with" },
                { id: "bonus_p5_q33", gapNumber: 33, acceptableAnswers: ["me", "us"], correctAnswer: "me" }
              ]
            },

            /* --- BONUS PART 6: DOUBLE CREATIVE WRITING CHALLENGE --- */
            {
              part: 6,
              instructions: "BONUS CREATIVE WRITING CHALLENGE (Part 6A & 6B):\n\nTask 6A (Email Response - Minimum 30 words):\nReply to Oliver's email above. Accept the invitation to go camping, ask what clothes or sleeping equipment you should bring, and suggest an outdoor activity to do at the lake.\n\nTask 6B (Story Continuation - Minimum 40 words):\nImagine you and Oliver arrived at the lake camping site at dusk, but suddenly heard a mysterious sound behind the tall trees... Write a story continuing what happened next!",
              type: "text_production_double",
              fieldNameA: "bonus_writing_part6a",
              fieldNameB: "bonus_writing_part6b"
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
            } else if (q.acceptableAnswers) {
              const isOk = q.acceptableAnswers.some(ans => ans.toLowerCase() === given);
              if (isOk) score++;
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
