/**
 * MODELO DE EXAMEN KET (A2 Key) - CAMBRIDGE ENGLISH FOR 6TH GRADE
 * Examen enfocado exclusivamente en Reading & Writing (Partes 1-7).
 */

class ExamModel {
  static getFullExamData() {
    return {
      title: "Cambridge KET (A2 Key) for Schools - Mock Exam 6th Grade",
      timeAllowedMinutes: 60,
      sections: {
        reading_writing: {
          title: "Reading & Writing Section",
          timeLimit: "60 minutes",
          totalParts: 7,
          parts: [
            /* --- PART 1: SHORT NOTICES & MESSAGES (6 Questions) --- */
            {
              part: 1,
              instructions: "For questions 1-6, read each notice/email and choose the correct answer (A, B, or C).",
              type: "multiple_choice",
              questions: [
                {
                  id: "rw_p1_q1",
                  context: "LIBRARY NOTICE: 'All borrowed books must be returned by Friday afternoon. Late returns incur a fee of $1 per day.'",
                  question: "1. What does the library notice say?",
                  options: {
                    A: "You can keep library books until Saturday morning.",
                    B: "You must pay extra money if you return books after Friday.",
                    C: "There is no fee for returning books next week."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q2",
                  context: "EMAIL FROM BEN TO TOM: 'Hi Tom, my dad can drive us to the football stadium on Saturday. Meet us at my house at 2:00 pm. Don't forget your boots!'",
                  question: "2. Why did Ben write this email?",
                  options: {
                    A: "To invite Tom to play football at his house at 2:00 pm.",
                    B: "To give Tom details about their trip to the football stadium.",
                    C: "To ask Tom's father for a lift to the stadium."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q3",
                  context: "COMPUTER LAB RULES: 'No food or drinks near the keyboards. Please turn off computers before leaving.'",
                  question: "3. What are students expected to do?",
                  options: {
                    A: "Leave the computers running when they finish.",
                    B: "Keep snacks and drinks away from the equipment.",
                    C: "Eat their lunch in the computer lab."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q4",
                  context: "MEMO FROM MUSIC TEACHER: 'Choir practice moved from Tuesday 4:00 pm to Wednesday 3:30 pm in Room 12.'",
                  question: "4. What has changed about choir practice?",
                  options: {
                    A: "The day, the time, and the room teacher.",
                    B: "Only the room location.",
                    C: "Both the day and the start time."
                  },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p1_q5",
                  context: "TEXT FROM MOM: 'Hi Leo, I put your science project poster on the kitchen table. Don't forget to take it to school!'",
                  question: "5. Why did Mom text Leo?",
                  options: {
                    A: "To remind him to take his project to school.",
                    B: "To ask him to finish his science homework.",
                    C: "To tell him that she delivered his project to school."
                  },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p1_q6",
                  context: "SWIMMING POOL SIGN: 'Diving is only allowed in the deep end. Beginners must stay in the shallow area.'",
                  question: "6. What is the rule at the swimming pool?",
                  options: {
                    A: "Everyone can dive anywhere in the pool.",
                    B: "Beginner swimmers must not swim in the deep end.",
                    C: "Diving is prohibited in all areas of the pool."
                  },
                  correctAnswer: "B"
                }
              ]
            },

            /* --- PART 2: MATCHING ANNOUNCEMENTS & ADVERTISEMENTS (A-H) (6 Questions) --- */
            {
              part: 2,
              instructions: "Read the eight advertisements/notices below (A-H). For questions 7-12, match each person's statement to the correct notice (A-H).",
              type: "matching_notices",
              notices: [
                { id: "A", title: "Notice A: City Swimming Pool", text: "Open 7:00 am - 9:00 pm. Professional swimming lessons available for children every Tuesday and Thursday." },
                { id: "B", title: "Notice B: Green Park Cafe", text: "Special weekend offer: buy any lunch sandwich and receive a free ice-cold fruit juice! Open Saturdays & Sundays." },
                { id: "C", title: "Notice C: Tech World Store", text: "Huge clearance sale! 50% discount on wireless headphones, computer keyboards, and mice this week only." },
                { id: "D", title: "Notice D: Sunny Beach Hotel", text: "Free breakfast included for all guests! Book online today to get early summer family discounts." },
                { id: "E", title: "Notice E: St. Mary's Library", text: "Youth Book Club meets every Wednesday at 4:30 pm in the quiet reading room. All 6th graders welcome!" },
                { id: "F", title: "Notice F: Mountain Cinema", text: "Student ticket night! All cinema tickets are half-price ($5) every Monday evening with a valid student ID." },
                { id: "G", title: "Notice G: Central Bus Station", text: "Direct express buses to the international airport leave every 20 minutes from Stand B. Fast and cheap!" },
                { id: "H", title: "Notice H: Grand City Theater", text: "Children under 12 receive 50% off tickets for all weekend musical and magic theater shows." }
              ],
              questions: [
                {
                  id: "rw_p2_q7",
                  question: "7. You want to pay less for a movie ticket on a weekday evening.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "F"
                },
                {
                  id: "rw_p2_q8",
                  question: "8. You want an instructor to teach you how to swim better.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p2_q9",
                  question: "9. You want to get a free drink when you purchase food.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p2_q10",
                  question: "10. You want to join a school club after class to discuss stories.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "E"
                },
                {
                  id: "rw_p2_q11",
                  question: "11. You want to buy computer accessories at a discounted price.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p2_q12",
                  question: "12. You want cheap theater tickets for younger children on Saturday.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "H"
                }
              ]
            },

            /* --- PART 3: MATCHING PROFILES (7 Questions) --- */
            {
              part: 3,
              instructions: "Read the three short texts about three students' hobbies (Sarah, Lucas, Mia). For questions 13-19, choose the correct student.",
              type: "matching_texts",
              texts: [
                { id: "person_A", name: "Sarah", content: "Sarah loves wildlife and photography. Last weekend she visited a safari park with her family and took over 100 photos of birds and lions. She hopes to become a nature photographer." },
                { id: "person_B", name: "Lucas", content: "Lucas spends his weekends inventing things at home. He recently built a robot out of cardboard boxes and old computer parts with his older brother. They added LED lights and remote controls." },
                { id: "person_C", name: "Mia", content: "Mia is passionate about water sports. She goes to the coast every Saturday morning for sailing lessons. Even when the sea is rough, she loves steering small boats by herself." }
              ],
              questions: [
                {
                  id: "rw_p3_q13",
                  question: "13. Who spent their weekend constructing something at home?",
                  options: { A: "Sarah", B: "Lucas", C: "Mia" },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p3_q14",
                  question: "14. Who engages in outdoor water sports every weekend?",
                  options: { A: "Sarah", B: "Lucas", C: "Mia" },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p3_q15",
                  question: "15. Who likes taking pictures of animals and nature?",
                  options: { A: "Sarah", B: "Lucas", C: "Mia" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p3_q16",
                  question: "16. Who built a creative project together with a sibling?",
                  options: { A: "Sarah", B: "Lucas", C: "Mia" },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p3_q17",
                  question: "17. Who dreams of having a career outdoors with wild animals?",
                  options: { A: "Sarah", B: "Lucas", C: "Mia" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p3_q18",
                  question: "18. Who learned how to control a boat independently in the sea?",
                  options: { A: "Sarah", B: "Lucas", C: "Mia" },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p3_q19",
                  question: "19. Who recycled household materials like cardboard for a project?",
                  options: { A: "Sarah", B: "Lucas", C: "Mia" },
                  correctAnswer: "B"
                }
              ]
            },

            /* --- PART 4: MULTIPLE CHOICE VOCABULARY CLOZE (6 Questions) --- */
            {
              part: 4,
              instructions: "Read the text about Oceans and Marine Life. For questions 20-25, choose the correct word (A, B, or C) for each gap.",
              type: "multiple_choice_cloze",
              passage: "Oceans cover more than seventy percent of the Earth's surface and are home to millions of amazing creatures. Dolphins, for instance, are among the most (20) [____] animals in the sea. They live in social groups called pods and communicate using clicks and whistles. Dolphins can swim extremely (21) [____] and love jumping out of the water. They feed mainly (22) [____] small fish and squid. Scientists believe dolphins are very (23) [____] toward human beings and often swim alongside boats. It is very important for everyone to (24) [____] ocean waters clean so sea animals can (25) [____] safely.",
              questions: [
                {
                  id: "rw_p4_q20",
                  gapNumber: 20,
                  options: { A: "intelligent", B: "heavy", C: "difficult" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p4_q21",
                  gapNumber: 21,
                  options: { A: "fast", B: "slowly", C: "late" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p4_q22",
                  gapNumber: 22,
                  options: { A: "on", B: "at", C: "with" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p4_q23",
                  gapNumber: 23,
                  options: { A: "friendly", B: "dangerous", C: "scared" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p4_q24",
                  gapNumber: 24,
                  options: { A: "keep", B: "make", C: "break" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p4_q25",
                  gapNumber: 25,
                  options: { A: "live", B: "living", C: "lived" },
                  correctAnswer: "A"
                }
              ]
            },

            /* --- PART 5: OPEN GRAMMAR CLOZE (6 Questions) --- */
            {
              part: 5,
              instructions: "Read the email. For questions 26-31, write ONE word only for each gap.",
              type: "open_cloze",
              passage: "Dear Alex,\nI am writing to tell you (26) [____] my new puppy! His name (27) [____] Max and he is only three months old. He has fluffy brown fur (28) [____] big black eyes. Every morning, I take him for a walk (29) [____] the park near my house. He loves running after tennis balls. Do you (30) [____] any pets at home? I hope you can come and visit us (31) [____] Saturday!\nBest wishes,\nSam",
              questions: [
                { id: "rw_p5_q26", gapNumber: 26, acceptableAnswers: ["about"], correctAnswer: "about" },
                { id: "rw_p5_q27", gapNumber: 27, acceptableAnswers: ["is", "'s"], correctAnswer: "is" },
                { id: "rw_p5_q28", gapNumber: 28, acceptableAnswers: ["and"], correctAnswer: "and" },
                { id: "rw_p5_q29", gapNumber: 29, acceptableAnswers: ["in", "at", "through"], correctAnswer: "in" },
                { id: "rw_p5_q30", gapNumber: 30, acceptableAnswers: ["have"], correctAnswer: "have" },
                { id: "rw_p5_q31", gapNumber: 31, acceptableAnswers: ["this", "on", "next"], correctAnswer: "this" }
              ]
            },

            /* --- PART 6: WRITING AN EMAIL (25+ Words) --- */
            {
              part: 6,
              instructions: "WRITING PART 6: Read the note from your friend Sam:\n\n'Hi! I would love to hang out this weekend. Which movie should we watch at your house? What time can I come over, and what snacks will we eat?'\n\nWrite an email answering Sam's three questions (write at least 25 words in English).",
              type: "text_production",
              minWords: 25,
              fieldName: "writing_part6"
            },

            /* --- PART 7: WRITING A STORY (35+ Words) --- */
            {
              part: 7,
              instructions: "WRITING PART 7: Read the story scenario below and write a short story in English (at least 35 words).\n\nStory Scenario:\n1. Scene 1: Last Saturday morning, Tom and Laura packed their backpacks and traveled by bus to the sunny countryside.\n2. Scene 2: They spent the afternoon exploring a green forest, climbing a small hill, and having a picnic near a clear river.\n3. Scene 3: In the evening, they watched the sunset, felt tired but very happy, and traveled back home.\n\nWrite your story describing what happened, what the weather was like, and how they felt.",
              type: "text_production",
              minWords: 35,
              fieldName: "writing_part7"
            }
          ]
        }
      }
    };
  }

  static getSanitizedExamData() {
    const fullData = JSON.parse(JSON.stringify(this.getFullExamData()));
    
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

  static evaluateAnswers(studentAnswers) {
    const fullData = this.getFullExamData();
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
