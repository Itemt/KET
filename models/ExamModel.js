/**
 * MODELO DE EXAMEN KET (A2 Key) - CAMBRIDGE ENGLISH FOR 6TH GRADE
 * Contiene el banco completo de preguntas oficial de simulacro (100% texto, sin imágenes), claves de respuesta y evaluación.
 */

class ExamModel {
  static getFullExamData() {
    return {
      title: "Cambridge KET (A2 Key) for Schools - Mock Exam 6th Grade",
      timeAllowedMinutes: 90,
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

            /* --- PART 6: WRITING AN EMAIL (25+ Words - Text Only) --- */
            {
              part: 6,
              instructions: "WRITING PART 6: Read the note from your friend Sam:\n\n'Hi! I would love to hang out this weekend. Which movie should we watch at your house? What time can I come over, and what snacks will we eat?'\n\nWrite an email answering Sam's three questions (write at least 25 words in English).",
              type: "text_production",
              minWords: 25,
              fieldName: "writing_part6"
            },

            /* --- PART 7: WRITING A STORY (35+ Words - Text Prompt Only, No Pictures) --- */
            {
              part: 7,
              instructions: "WRITING PART 7: Read the story scenario below and write a short story in English (at least 35 words).\n\nStory Scenario:\n1. Scene 1: Last Saturday morning, Tom and Laura packed their backpacks and traveled by bus to the sunny countryside.\n2. Scene 2: They spent the afternoon exploring a green forest, climbing a small hill, and having a picnic near a clear river.\n3. Scene 3: In the evening, they watched the sunset, felt tired but very happy, and traveled back home.\n\nWrite your story describing what happened, what the weather was like, and how they felt.",
              type: "text_production",
              minWords: 35,
              fieldName: "writing_part7"
            }
          ]
        },

        /* ==========================================================================
           LISTENING SECTION - COMPLETE 5 PARTS (100% TEXT TRANSCRIPTS)
           ========================================================================== */
        listening: {
          title: "Listening Section",
          timeLimit: "30 minutes",
          totalParts: 5,
          audioPlaceholderNote: "Click '▶️ Play Audio Track' on each question to listen to the dialogue in clear British English.",
          parts: [
            {
              part: 1,
              instructions: "For questions 1-5, listen to five short conversations. Choose the correct answer (A, B, or C).",
              type: "listening_multiple_choice",
              questions: [
                {
                  id: "lis_p1_q1",
                  audioScript: "Girl: What time does the school bus leave in the morning? Boy: Usually at quarter to eight, but tomorrow morning it will arrive ten minutes early at seven thirty-five. Girl: Great, thanks for telling me!",
                  question: "1. What time will the school bus arrive tomorrow morning?",
                  options: { A: "7:35 am", B: "7:45 am", C: "8:00 am" },
                  correctAnswer: "A"
                },
                {
                  id: "lis_p1_q2",
                  audioScript: "Boy: Where did you go on your holiday, Emma? Girl: We wanted to go camping in the mountains, but it rained every single day. So we visited my grandparents at their cottage near the beach instead! Boy: Sounds fun anyway!",
                  question: "2. Where did Emma spend her holiday?",
                  options: { A: "In the mountains", B: "At the beach", C: "At a campsite" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p1_q3",
                  audioScript: "Girl: How much did your new school backpack cost, Jack? Boy: Well, the regular price was twenty-five pounds, but it was on sale for fifteen pounds! Girl: Wow, what a bargain!",
                  question: "3. How much did Jack pay for his new backpack?",
                  options: { A: "£25", B: "£20", C: "£15" },
                  correctAnswer: "C"
                },
                {
                  id: "lis_p1_q4",
                  audioScript: "Boy: What is the weather going to be like for our P.E. lesson this afternoon? Girl: The weather forecast said it will stop raining at noon and we will have sunshine all afternoon! Boy: Awesome!",
                  question: "4. What will the weather be like this afternoon?",
                  options: { A: "Rainy", B: "Sunny", C: "Snowy" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p1_q5",
                  audioScript: "Girl: Which present did you buy for your sister's birthday? Boy: I thought about buying a pair of roller skates, but she really wanted a digital watch, so I got her the watch!",
                  question: "5. What present did the boy buy for his sister?",
                  options: { A: "A digital watch", B: "Roller skates", C: "A bicycle" },
                  correctAnswer: "A"
                }
              ]
            },
            {
              part: 2,
              instructions: "Listen to a teacher giving information about a school trip to the Science Museum. Fill in the missing information for questions 6-10.",
              type: "listening_gap_fill",
              audioScript: "Attention all 6th grade students! Here are the details for our upcoming school trip to the Science Museum. We are going on Thursday next week. The bus leaves school at eight thirty sharp. The museum entrance ticket costs six pounds per student. Please remember to bring your own packed lunch and a bottle of water. We will return to school at four o'clock in the afternoon.",
              questions: [
                { id: "lis_p2_q6", label: "6. Day of the school trip:", hint: "e.g., Thursday", acceptableAnswers: ["thursday"], correctAnswer: "Thursday" },
                { id: "lis_p2_q7", label: "7. Departure time from school:", hint: "e.g., 8:30 am", acceptableAnswers: ["8:30", "8:30 am", "8:30am", "eight thirty"], correctAnswer: "8:30 am" },
                { id: "lis_p2_q8", label: "8. Ticket price (£):", hint: "Number only, e.g., 6", acceptableAnswers: ["6", "six", "6 pounds"], correctAnswer: "6" },
                { id: "lis_p2_q9", label: "9. What to bring for lunch:", hint: "e.g., packed lunch", acceptableAnswers: ["packed lunch", "lunch"], correctAnswer: "packed lunch" },
                { id: "lis_p2_q10", label: "10. Return time to school:", hint: "e.g., 4:00 pm", acceptableAnswers: ["4:00", "4:00 pm", "4 pm", "4 o'clock", "4"], correctAnswer: "4:00 pm" }
              ]
            },
            {
              part: 3,
              instructions: "Listen to Oliver talking to his friend Maria about his new video game console. For questions 11-15, choose A, B, or C.",
              type: "listening_multiple_choice",
              audioScript: "Maria: Hey Oliver, is your new video game console fun? Oliver: It's fantastic! It was tricky to set up at first, but after practicing with my older brother, we played for hours! Maria: Who bought it for you? Oliver: My aunt gave it to me as a gift for my 12th birthday. Maria: What kind of games do you like playing most? Oliver: I love racing games! Driving virtual sports cars around international tracks is super cool. Maria: Can I come over on Friday to play? Oliver: Sure, come after 4:00 pm, after we finish our art project!",
              questions: [
                {
                  id: "lis_p3_q11",
                  question: "11. Who helped Oliver set up his video game console?",
                  options: { A: "His aunt", B: "His older brother", C: "His friend Maria" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p3_q12",
                  question: "12. Why did Oliver get the new console?",
                  options: { A: "As a birthday gift from his aunt", B: "He bought it with his pocket money", C: "He won a school raffle" },
                  correctAnswer: "A"
                },
                {
                  id: "lis_p3_q13",
                  question: "13. What is Oliver's favorite genre of video games?",
                  options: { A: "Puzzle games", B: "Racing games", C: "Soccer games" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p3_q14",
                  question: "14. When is Maria going to visit Oliver's house?",
                  options: { A: "On Thursday", B: "On Friday", C: "On Saturday" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p3_q15",
                  question: "15. What will Oliver finish before Maria arrives?",
                  options: { A: "His art project", B: "His science homework", C: "His dinner" },
                  correctAnswer: "A"
                }
              ]
            },
            {
              part: 4,
              instructions: "Listen to five short recordings. For questions 16-20, choose the main idea or correct option (A, B, or C).",
              type: "listening_multiple_choice",
              questions: [
                {
                  id: "lis_p4_q16",
                  audioScript: "Teacher: Hello students! Please remember that tomorrow is Sports Day. You must wear your white P.E. shirt and bring a hat because we will be outdoors on the field all morning.",
                  question: "16. What must students wear for Sports Day tomorrow?",
                  options: { A: "Their regular school uniform", B: "Their white P.E. shirt", C: "A yellow sweater" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p4_q17",
                  audioScript: "Girl: I love going to the city library on weekends. It's so quiet and cozy. I can read my favorite fantasy novels for hours in the comfortable armchairs.",
                  question: "17. Why does the girl enjoy going to the city library?",
                  options: { A: "Because it is quiet and comfortable", B: "Because she meets her classmates there", C: "Because there are computer games" },
                  correctAnswer: "A"
                },
                {
                  id: "lis_p4_q18",
                  audioScript: "Boy: Mum, can we make pancakes for breakfast? We have eggs, flour, and milk in the fridge, and we can add fresh strawberries on top!",
                  question: "18. What does the boy want to prepare for breakfast?",
                  options: { A: "Omelet", B: "Pancakes", C: "Toast with jam" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p4_q19",
                  audioScript: "Announcer: Attention shoppers! The bookstore on the second floor is offering a twenty percent discount on all children's comic books and storybooks today only!",
                  question: "19. What item is on discount at the bookstore today?",
                  options: { A: "Board games", B: "Children's books and comics", C: "School notebooks" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p4_q20",
                  audioScript: "Girl: My dog Toby got so dirty after playing in the muddy garden. Now I have to give him a bath in the tub before dad comes home!",
                  question: "20. What is the girl going to do next?",
                  options: { A: "Take the dog for a walk", B: "Give her dog a bath", C: "Feed the dog dinner" },
                  correctAnswer: "B"
                }
              ]
            },
            {
              part: 5,
              instructions: "Listen to Sophie talking to her brother about what her friends like doing in their free time. For questions 21-25, match each person to their favorite activity.",
              type: "listening_multiple_choice",
              questions: [
                {
                  id: "lis_p5_q21",
                  question: "21. David's favorite activity:",
                  options: { A: "Playing guitar", B: "Baking cupcakes", C: "Skateboarding" },
                  correctAnswer: "A"
                },
                {
                  id: "lis_p5_q22",
                  question: "22. Chloe's favorite activity:",
                  options: { A: "Photography", B: "Baking cupcakes", C: "Reading comics" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p5_q23",
                  question: "23. Ethan's favorite activity:",
                  options: { A: "Skateboarding", B: "Playing guitar", C: "Swimming" },
                  correctAnswer: "A"
                },
                {
                  id: "lis_p5_q24",
                  question: "24. Hannah's favorite activity:",
                  options: { A: "Painting", B: "Taking photographs", C: "Dancing" },
                  correctAnswer: "B"
                },
                {
                  id: "lis_p5_q25",
                  question: "25. Daniel's favorite activity:",
                  options: { A: "Reading comic books", B: "Baking cupcakes", C: "Playing guitar" },
                  correctAnswer: "A"
                }
              ]
            }
          ]
        },

        /* ==========================================================================
           SPEAKING SECTION - COMPLETE 2 PARTS (TEXT ONLY)
           ========================================================================== */
        speaking: {
          title: "Speaking Section",
          timeLimit: "10-15 minutes",
          totalParts: 2,
          instructions: "Use the microphone button below to record your voice answering the questions. You can listen to your recording before sending.",
          parts: [
            {
              part: 1,
              title: "Part 1: Personal Questions (Phase 1 & Phase 2)",
              questions: [
                "• Phase 1: What is your full name and how old are you?",
                "• Phase 1: Where do you live and who do you live with?",
                "• Phase 2: Tell me about your favorite subject at school and why you like it.",
                "• Phase 2: What do you usually do with your family or friends on weekends?"
              ]
            },
            {
              part: 2,
              title: "Part 2: Topic Discussion & Guided Questions",
              prompt: "Topic: 'SPORTS, HOBBIES AND FREE TIME'\n\nAnswer the following prompts clearly into the microphone:\n1. Do you prefer playing sports inside (like swimming or gym) or outside (like soccer or biking)? Why?\n2. Describe a favorite hobby you enjoy doing after school or during vacations.\n3. Do you think it is important for young people to do sports every week? Give your opinion.",
              recordingTarget: "speaking_audio"
            }
          ]
        }
      }
    };
  }

  /**
   * Retorna los datos del examen excluyendo las respuestas correctas para enviarlo de forma segura al estudiante.
   */
  static getSanitizedExamData() {
    const fullData = JSON.parse(JSON.stringify(this.getFullExamData()));
    
    // Limpiar claves de respuesta de Reading & Writing
    fullData.sections.reading_writing.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          delete q.correctAnswer;
          delete q.acceptableAnswers;
        });
      }
    });

    // Limpiar claves de respuesta de Listening
    fullData.sections.listening.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          delete q.correctAnswer;
          delete q.acceptableAnswers;
        });
      }
    });

    return fullData;
  }

  /**
   * Evalúa las respuestas enviadas por el alumno y calcula la puntuación automática.
   * @param {object} studentAnswers Objeto con las respuestas por ID
   */
  static evaluateAnswers(studentAnswers) {
    const fullData = this.getFullExamData();
    let scoreRW = 0;
    let maxRW = 0;
    let scoreLis = 0;
    let maxLis = 0;

    // Evaluar Reading & Writing
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

    // Evaluar Listening
    fullData.sections.listening.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          if (q.correctAnswer || q.acceptableAnswers) {
            maxLis++;
            const given = (studentAnswers[q.id] || "").toString().trim().toLowerCase();
            
            if (q.correctAnswer && given === q.correctAnswer.toLowerCase()) {
              scoreLis++;
            } else if (q.acceptableAnswers) {
              const isOk = q.acceptableAnswers.some(ans => ans.toLowerCase() === given);
              if (isOk) scoreLis++;
            }
          }
        });
      }
    });

    return {
      score_reading_writing: scoreRW,
      max_reading_writing: maxRW,
      score_listening: scoreLis,
      max_listening: maxLis,
      total_auto_score: scoreRW + scoreLis,
      max_auto_score: maxRW + maxLis
    };
  }
}

module.exports = ExamModel;
