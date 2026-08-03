/**
 * MODELO DE EXAMEN KET (A2 Key) - CAMBRIDGE ENGLISH FOR 6TH GRADE
 * EDICIÓN 2 — Textos y preguntas completamente nuevos.
 * Estructura idéntica: 7 partes, 48 preguntas objetivas + 2 redacciones.
 */

class ExamModel {
  static getFullExamData() {
    return {
      title: "Cambridge KET (A2 Key) for Schools — Official Practice Exam · Edition 2",
      timeAllowedMinutes: 75,
      sections: {
        reading_writing: {
          title: "Reading & Writing Section",
          timeLimit: "75 minutes",
          totalParts: 7,
          parts: [

            /* ─────────────────────────────────────────────────────────────
               PART 1 — SHORT NOTICES & MESSAGES (10 Questions, Q1-10)
               Task: Read a notice / message and choose A, B, or C.
            ───────────────────────────────────────────────────────────── */
            {
              part: 1,
              instructions: "For questions 1–10, read each notice or message and choose the best answer (A, B, or C).",
              type: "multiple_choice",
              questions: [
                {
                  id: "rw_p1_q1",
                  context: "SCHOOL NOTICE: 'The science fair will take place on Friday, not Thursday as planned. All students must bring their projects to the gym before 8:00 am.'",
                  question: "1. What does the notice say?",
                  options: {
                    A: "The science fair is on Thursday and projects go to the library.",
                    B: "The science fair has been moved to Friday and students must arrive early.",
                    C: "Students must collect their projects from the gym on Friday."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q2",
                  context: "TEXT FROM ANNA TO JAKE: 'Jake, I left your art folder on the front doorstep. Mum says dinner is at 6:30 tonight — don't be late!'",
                  question: "2. Why did Anna send this message?",
                  options: {
                    A: "To ask Jake to bring her art folder.",
                    B: "To let Jake know where his folder is and remind him about dinner.",
                    C: "To tell Jake that dinner has been cancelled."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q3",
                  context: "PARK SIGN: 'Dogs must be kept on a lead at all times. Owners who do not follow this rule will be asked to leave.'",
                  question: "3. What does the park sign warn?",
                  options: {
                    A: "Dogs are not allowed in the park.",
                    B: "Dog owners must control their pets with a lead.",
                    C: "Only small dogs can enter the park."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q4",
                  context: "EMAIL FROM TEACHER: 'Please remember that the book report is due on Monday morning. I will not accept reports submitted after 9:00 am.'",
                  question: "4. What must students do?",
                  options: {
                    A: "Submit their book report before 9:00 am on Monday.",
                    B: "Email their report to the teacher on Monday afternoon.",
                    C: "Ask the teacher for more time if they are late."
                  },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p1_q5",
                  context: "RESTAURANT NOTICE: 'We are closed every Tuesday for staff training. We apologise for any inconvenience.'",
                  question: "5. When is the restaurant closed?",
                  options: {
                    A: "On Mondays for cleaning.",
                    B: "Every Tuesday for training.",
                    C: "At weekends for private events."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q6",
                  context: "TEXT FROM DAD: 'Hi Luis, I finished work early. I am at the supermarket now. Do you need anything special for your school project tomorrow?'",
                  question: "6. What is Dad doing?",
                  options: {
                    A: "He is picking Luis up from school.",
                    B: "He is at the supermarket and is asking if Luis needs anything.",
                    C: "He is asking Luis to finish his school project."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q7",
                  context: "SPORTS HALL NOTICE: 'The basketball court is reserved for Year 6 students every Wednesday from 12:00 to 1:00 pm.'",
                  question: "7. Who can use the basketball court on Wednesday at 12:30 pm?",
                  options: {
                    A: "All students at any time.",
                    B: "Only Year 6 students from 12:00 to 1:00 pm.",
                    C: "Teachers and staff only."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q8",
                  context: "TRAIN STATION NOTICE: 'The 4:15 pm train to Greenfield is delayed by 25 minutes due to signal problems.'",
                  question: "8. What time will the train to Greenfield now leave?",
                  options: {
                    A: "At 4:15 pm as scheduled.",
                    B: "At 4:40 pm.",
                    C: "The service has been cancelled."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q9",
                  context: "EMAIL FROM LUCY TO DAVID: 'Hi David! I changed the meeting point for Saturday. Instead of the café, let's meet outside the bookshop on Central Street at 11 am.'",
                  question: "9. What has Lucy changed?",
                  options: {
                    A: "The day and time of the meeting.",
                    B: "The location where they will meet.",
                    C: "The activity they are planning to do."
                  },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p1_q10",
                  context: "HOTEL NOTICE: 'Checkout time is 11:00 am. If you need a late checkout, please ask reception before 9:00 am on your day of departure.'",
                  question: "10. What should guests do if they want to leave after 11:00 am?",
                  options: {
                    A: "Check out without telling anyone.",
                    B: "Call the hotel the day before they arrive.",
                    C: "Speak to reception before 9:00 am on the day they leave."
                  },
                  correctAnswer: "C"
                }
              ]
            },

            /* ─────────────────────────────────────────────────────────────
               PART 2 — MATCHING NOTICES (8 notices A-H, Q11-20)
               Task: Match each person's need to the correct notice.
            ───────────────────────────────────────────────────────────── */
            {
              part: 2,
              instructions: "Read the eight notices below (A–H). For questions 11–20, match each person's statement to the most suitable notice (A–H). You can use each notice more than once.",
              type: "matching_notices",
              notices: [
                { id: "A", title: "Notice A: River Valley Campsite", text: "Family camping weekends available from April to October. Rent tents, sleeping bags, and cooking equipment on site. Book in advance." },
                { id: "B", title: "Notice B: CloudFit Gym", text: "First month FREE for new members! Personal trainers available Monday to Friday. Open 6 am – 10 pm." },
                { id: "C", title: "Notice C: Eastwood Art Gallery", text: "Free guided tours every Saturday at 2:00 pm. The current exhibition features young local artists aged 10–18." },
                { id: "D", title: "Notice D: Quick Bites Food Market", text: "Fresh homemade sandwiches, salads, and smoothies. Lunch special: buy two items, get the third for free! Open weekdays." },
                { id: "E", title: "Notice E: CityRide Bike Rentals", text: "Hire a bicycle for the day! Helmets and maps included. Perfect for exploring the river path and old town centre." },
                { id: "F", title: "Notice F: StarLearn Online Courses", text: "Study English, Maths, and Science from home. Live video lessons with qualified teachers. Monthly or yearly plans available." },
                { id: "G", title: "Notice G: Westside Night Market", text: "Every Friday evening from 6 pm. Street food, live music, and handmade crafts. Free entry for all visitors." },
                { id: "H", title: "Notice H: SunSplash Waterpark", text: "Open weekends and school holidays. Family tickets available. Height restrictions apply to some slides. Book online." }
              ],
              questions: [
                {
                  id: "rw_p2_q11",
                  question: "11. You want to visit an exhibition and see art created by young people.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p2_q12",
                  question: "12. You want to start exercising and pay nothing for the first month.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p2_q13",
                  question: "13. You want to go to a water attraction with your family during a school holiday.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "H"
                },
                {
                  id: "rw_p2_q14",
                  question: "14. You want to enjoy live music and food outdoors on a Friday night without paying an entrance fee.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "G"
                },
                {
                  id: "rw_p2_q15",
                  question: "15. You want to learn school subjects online with a real teacher.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "F"
                },
                {
                  id: "rw_p2_q16",
                  question: "16. You want to spend a night outdoors in nature and borrow camping equipment.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p2_q17",
                  question: "17. You want to explore the city on two wheels with a map included.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "E"
                },
                {
                  id: "rw_p2_q18",
                  question: "18. You want to buy a healthy lunch and get one item free.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "D"
                },
                {
                  id: "rw_p2_q19",
                  question: "19. You want a Saturday guided tour of a local art space at no cost.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p2_q20",
                  question: "20. You want to hire sports equipment to ride along a river path.",
                  options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" },
                  correctAnswer: "E"
                }
              ]
            },

            /* ─────────────────────────────────────────────────────────────
               PART 3 — MATCHING PROFILES (3 Texts, Q21-30)
               Task: Which person — Oliver, Sofia, or Ben?
            ───────────────────────────────────────────────────────────── */
            {
              part: 3,
              instructions: "Read the three short profiles about Oliver, Sofia, and Ben. For questions 21–30, decide which person each statement describes. Write A for Oliver, B for Sofia, or C for Ben.",
              type: "matching_texts",
              texts: [
                {
                  id: "person_A",
                  name: "Oliver",
                  content: "Oliver is crazy about cooking. Every weekend he experiments with new recipes in the kitchen. Last month he entered a school cooking competition and made a three-layer chocolate cake that won first prize. He wants to be a chef when he grows up."
                },
                {
                  id: "person_B",
                  name: "Sofia",
                  content: "Sofia loves astronomy. She spends clear nights in her garden looking at stars and planets through her telescope. She has a notebook where she draws maps of the constellations she finds. Her favourite planet is Saturn because of its rings."
                },
                {
                  id: "person_C",
                  name: "Ben",
                  content: "Ben is passionate about music. He has been playing the guitar since he was eight years old. He recently started writing his own songs. On weekends, he performs at his school's youth band with three other students."
                }
              ],
              questions: [
                {
                  id: "rw_p3_q21",
                  question: "21. Who participates in group music performances at school?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p3_q22",
                  question: "22. Who keeps written records of their observations in a notebook?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p3_q23",
                  question: "23. Who won a prize for something they made by hand?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p3_q24",
                  question: "24. Who has a hobby that they do late at night outdoors?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p3_q25",
                  question: "25. Who has been practising their skill since primary school age?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p3_q26",
                  question: "26. Who is interested in objects and phenomena beyond Earth?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "B"
                },
                {
                  id: "rw_p3_q27",
                  question: "27. Who would like to work in the food industry in the future?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p3_q28",
                  question: "28. Who recently began creating original artistic work?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "C"
                },
                {
                  id: "rw_p3_q29",
                  question: "29. Who tries different recipes and tests new ideas each week?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "A"
                },
                {
                  id: "rw_p3_q30",
                  question: "30. Who has a particular favourite among the planets in our solar system?",
                  options: { A: "Oliver", B: "Sofia", C: "Ben" },
                  correctAnswer: "B"
                }
              ]
            },

            /* ─────────────────────────────────────────────────────────────
               PART 4 — MULTIPLE CHOICE VOCABULARY CLOZE (10 Questions, Q31-40)
               Task: Choose the correct word for each gap.
            ───────────────────────────────────────────────────────────── */
            {
              part: 4,
              instructions: "Read the texts below. For questions 31–40, choose the correct word (A, B, or C) to fill each gap.",
              type: "multiple_choice_cloze",
              passage: "TEXT 1: Japan is a beautiful island country in East Asia. It is (31) [____] for its cherry blossom trees, which bloom every spring in pink and white colours. Millions of tourists (32) [____] Japan each year to see this natural spectacle. Japanese people are very (33) [____] to visitors and are happy to give (34) [____] about places to visit. Japan is also famous for its delicious food, especially sushi, which is (35) [____] from raw fish and rice.\n\nTEXT 2: The Amazon River in South America is one of the most (36) [____] rivers in the world. It flows through dense tropical rainforest and is home to thousands of (37) [____] of fish, birds, and reptiles. The water level rises (38) [____] the rainy season, flooding large areas of forest. Local communities depend (39) [____] the river for food, water, and transport. Scientists travel there every year to (40) [____] new species of wildlife.",
              questions: [
                { id: "rw_p4_q31", gapNumber: 31, options: { A: "famous", B: "worried", C: "tired" }, correctAnswer: "A" },
                { id: "rw_p4_q32", gapNumber: 32, options: { A: "avoid", B: "visit", C: "leave" }, correctAnswer: "B" },
                { id: "rw_p4_q33", gapNumber: 33, options: { A: "rude", B: "bored", C: "kind" }, correctAnswer: "C" },
                { id: "rw_p4_q34", gapNumber: 34, options: { A: "directions", B: "problems", C: "excuses" }, correctAnswer: "A" },
                { id: "rw_p4_q35", gapNumber: 35, options: { A: "broken", B: "made", C: "sold" }, correctAnswer: "B" },
                { id: "rw_p4_q36", gapNumber: 36, options: { A: "powerful", B: "tiny", C: "frozen" }, correctAnswer: "A" },
                { id: "rw_p4_q37", gapNumber: 37, options: { A: "species", B: "vehicles", C: "machines" }, correctAnswer: "A" },
                { id: "rw_p4_q38", gapNumber: 38, options: { A: "during", B: "without", C: "despite" }, correctAnswer: "A" },
                { id: "rw_p4_q39", gapNumber: 39, options: { A: "against", B: "on", C: "between" }, correctAnswer: "B" },
                { id: "rw_p4_q40", gapNumber: 40, options: { A: "discover", B: "remove", C: "forget" }, correctAnswer: "A" }
              ]
            },

            /* ─────────────────────────────────────────────────────────────
               PART 5 — OPEN CLOZE (8 Questions, Q41-48)
               Task: Write ONE word only for each gap.
            ───────────────────────────────────────────────────────────── */
            {
              part: 5,
              instructions: "Read the postcard below. For questions 41–48, write ONE word only to fill each gap.",
              type: "open_cloze",
              passage: "Hi Clara!\nGreetings (41) [____] sunny Australia! I am here (42) [____] my family on a two-week holiday. Yesterday we went (43) [____] a wildlife sanctuary and I saw real kangaroos (44) [____] koalas up close — it (45) [____] amazing! The weather here is warm (46) [____] beautiful every day. Tomorrow we (47) [____] going to visit the Great Barrier Reef (48) [____] snorkelling. I wish you were here!\nSee you soon,\nLuisa",
              questions: [
                { id: "rw_p5_q41", gapNumber: 41, acceptableAnswers: ["from"], correctAnswer: "from" },
                { id: "rw_p5_q42", gapNumber: 42, acceptableAnswers: ["with"], correctAnswer: "with" },
                { id: "rw_p5_q43", gapNumber: 43, acceptableAnswers: ["to"], correctAnswer: "to" },
                { id: "rw_p5_q44", gapNumber: 44, acceptableAnswers: ["and"], correctAnswer: "and" },
                { id: "rw_p5_q45", gapNumber: 45, acceptableAnswers: ["was", "is", "'s"], correctAnswer: "was" },
                { id: "rw_p5_q46", gapNumber: 46, acceptableAnswers: ["and"], correctAnswer: "and" },
                { id: "rw_p5_q47", gapNumber: 47, acceptableAnswers: ["are"], correctAnswer: "are" },
                { id: "rw_p5_q48", gapNumber: 48, acceptableAnswers: ["for", "to go"], correctAnswer: "for" }
              ]
            },

            /* ─────────────────────────────────────────────────────────────
               PART 6 — WRITING: SHORT EMAIL (min. 25 words)
            ───────────────────────────────────────────────────────────── */
            {
              part: 6,
              instructions: "WRITING PART 6 — Your English friend Leo has sent you this note:\n\n'Hi! I really want to visit your city sometime. Which place should I visit first? What food should I try? And what is the best way to travel around?'\n\nWrite an email to Leo answering his three questions. Write at least 25 words in English.",
              type: "text_production",
              minWords: 25,
              fieldName: "writing_part6"
            },

            /* ─────────────────────────────────────────────────────────────
               PART 7 — WRITING: SHORT STORY (min. 35 words)
            ───────────────────────────────────────────────────────────── */
            {
              part: 7,
              instructions: "WRITING PART 7 — Look at the three pictures below and write a short story in English (at least 35 words).\n\nYour story must include these three scenes:\n1. Scene 1: One rainy afternoon, Emma found an old letter inside a box in her grandmother's attic.\n2. Scene 2: She read the letter and discovered it was a treasure map drawn by her great-grandfather.\n3. Scene 3: The next morning, Emma and her cousin followed the map to a garden and found a small wooden box with old coins inside.\n\nWrite your story describing what happened, what the characters felt, and what the treasure was.",
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
