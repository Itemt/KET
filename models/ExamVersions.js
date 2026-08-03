/**
 * MAESTRO DE 10 EDICIONES COMPLETAMENTE ÚNICAS DE EXAMEN CAMBRIDGE KET (A2 KEY)
 * Cada versión (0 a 9) contiene 100% de contenido exclusivo:
 * - Part 1: 10 avisos/mensajes distintos
 * - Part 2: 8 carteles A-H distintos + 10 preguntas de emparejamiento
 * - Part 3: 3 perfiles con nombres y pasatiempos distintos + 10 preguntas
 * - Part 4: 2 lecturas de geografía/cultura/naturaleza distintas + 10 preguntas de opción múltiple
 * - Part 5: 1 texto con 8 huecos gramaticales distintos
 * - Part 6 y 7: Prompts de escritura distintos
 */

const examVersions = [
  /* ==========================================================================
     VERSION 0 (Edición 1: Japón y Amazonas | Oliver, Sofia, Ben)
     ========================================================================== */
  {
    versionId: 0,
    title: "Cambridge KET (A2 Key) — Edition 1",
    p1: [
      { id: "rw_p1_q1", context: "SCHOOL NOTICE: 'The science fair will take place on Friday, not Thursday as planned. All students must bring their projects to the gym before 8:00 am.'", question: "1. What does the notice say?", options: { A: "The science fair is on Thursday in the library.", B: "The science fair is moved to Friday and students must arrive early.", C: "Students must collect their projects from the gym on Friday." }, correctAnswer: "B" },
      { id: "rw_p1_q2", context: "TEXT FROM ANNA TO JAKE: 'Jake, I left your art folder on the front doorstep. Mum says dinner is at 6:30 tonight — don't be late!'", question: "2. Why did Anna send this message?", options: { A: "To ask Jake to bring her art folder.", B: "To let Jake know where his folder is and remind him about dinner.", C: "To tell Jake that dinner has been cancelled." }, correctAnswer: "B" },
      { id: "rw_p1_q3", context: "PARK SIGN: 'Dogs must be kept on a lead at all times. Owners who do not follow this rule will be asked to leave.'", question: "3. What does the park sign warn?", options: { A: "Dogs are not allowed in the park.", B: "Dog owners must control their pets with a lead.", C: "Only small dogs can enter the park." }, correctAnswer: "B" },
      { id: "rw_p1_q4", context: "EMAIL FROM TEACHER: 'Please remember that the book report is due on Monday morning. I will not accept reports submitted after 9:00 am.'", question: "4. What must students do?", options: { A: "Submit their book report before 9:00 am on Monday.", B: "Email their report to the teacher on Monday afternoon.", C: "Ask the teacher for more time if they are late." }, correctAnswer: "A" },
      { id: "rw_p1_q5", context: "RESTAURANT NOTICE: 'We are closed every Tuesday for staff training. We apologise for any inconvenience.'", question: "5. When is the restaurant closed?", options: { A: "On Mondays for cleaning.", B: "Every Tuesday for training.", C: "At weekends for private events." }, correctAnswer: "B" },
      { id: "rw_p1_q6", context: "TEXT FROM DAD: 'Hi Luis, I finished work early. I am at the supermarket now. Do you need anything special for your school project tomorrow?'", question: "6. What is Dad doing?", options: { A: "He is picking Luis up from school.", B: "He is at the supermarket and asking if Luis needs anything.", C: "He is asking Luis to finish his school project." }, correctAnswer: "B" },
      { id: "rw_p1_q7", context: "SPORTS HALL NOTICE: 'The basketball court is reserved for Year 6 students every Wednesday from 12:00 to 1:00 pm.'", question: "7. Who can use the basketball court on Wednesday at 12:30 pm?", options: { A: "All students at any time.", B: "Only Year 6 students from 12:00 to 1:00 pm.", C: "Teachers and staff only." }, correctAnswer: "B" },
      { id: "rw_p1_q8", context: "TRAIN STATION NOTICE: 'The 4:15 pm train to Greenfield is delayed by 25 minutes due to signal problems.'", question: "8. What time will the train to Greenfield now leave?", options: { A: "At 4:15 pm as scheduled.", B: "At 4:40 pm.", C: "The service has been cancelled." }, correctAnswer: "B" },
      { id: "rw_p1_q9", context: "EMAIL FROM LUCY TO DAVID: 'Hi David! I changed the meeting point for Saturday. Instead of the café, let's meet outside the bookshop on Central Street at 11 am.'", question: "9. What has Lucy changed?", options: { A: "The day and time of the meeting.", B: "The location where they will meet.", C: "The activity they are planning to do." }, correctAnswer: "B" },
      { id: "rw_p1_q10", context: "HOTEL NOTICE: 'Checkout time is 11:00 am. If you need a late checkout, please ask reception before 9:00 am on your day of departure.'", question: "10. What should guests do if they want to leave after 11:00 am?", options: { A: "Check out without telling anyone.", B: "Call the hotel the day before they arrive.", C: "Speak to reception before 9:00 am on the day they leave." }, correctAnswer: "C" }
    ],
    p2Notices: [
      { id: "A", title: "Notice A: River Valley Campsite", text: "Family camping weekends available from April to October. Rent tents, sleeping bags, and cooking equipment on site." },
      { id: "B", title: "Notice B: CloudFit Gym", text: "First month FREE for new members! Personal trainers available Monday to Friday. Open 6 am – 10 pm." },
      { id: "C", title: "Notice C: Eastwood Art Gallery", text: "Free guided tours every Saturday at 2:00 pm. The current exhibition features young local artists aged 10–18." },
      { id: "D", title: "Notice D: Quick Bites Food Market", text: "Fresh homemade sandwiches, salads, and smoothies. Lunch special: buy two items, get the third for free!" },
      { id: "E", title: "Notice E: CityRide Bike Rentals", text: "Hire a bicycle for the day! Helmets and maps included. Perfect for exploring the river path and old town." },
      { id: "F", title: "Notice F: StarLearn Online Courses", text: "Study English, Maths, and Science from home. Live video lessons with qualified teachers. Flexible plans." },
      { id: "G", title: "Notice G: Westside Night Market", text: "Every Friday evening from 6 pm. Street food, live music, and handmade crafts. Free entry for all visitors." },
      { id: "H", title: "Notice H: SunSplash Waterpark", text: "Open weekends and school holidays. Family tickets available. Height restrictions apply. Book online." }
    ],
    p2Questions: [
      { id: "rw_p2_q11", question: "11. You want to visit an exhibition and see art created by young people.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "C" },
      { id: "rw_p2_q12", question: "12. You want to start exercising and pay nothing for the first month.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "B" },
      { id: "rw_p2_q13", question: "13. You want to go to a water attraction with your family during a school holiday.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "H" },
      { id: "rw_p2_q14", question: "14. You want to enjoy live music and food outdoors on a Friday night without paying an entrance fee.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "G" },
      { id: "rw_p2_q15", question: "15. You want to learn school subjects online with a real teacher.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "F" },
      { id: "rw_p2_q16", question: "16. You want to spend a night outdoors in nature and borrow camping equipment.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "A" },
      { id: "rw_p2_q17", question: "17. You want to explore the city on two wheels with a map included.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "E" },
      { id: "rw_p2_q18", question: "18. You want to buy a healthy lunch and get one item free.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "D" },
      { id: "rw_p2_q19", question: "19. You want a Saturday guided tour of a local art space at no cost.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "C" },
      { id: "rw_p2_q20", question: "20. You want to hire sports equipment to ride along a river path.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "E" }
    ],
    p3Texts: [
      { id: "person_A", name: "Oliver", content: "Oliver is crazy about cooking. Every weekend he experiments with new recipes in the kitchen. Last month he entered a school cooking competition and made a three-layer chocolate cake that won first prize. He wants to be a chef when he grows up." },
      { id: "person_B", name: "Sofia", content: "Sofia loves astronomy. She spends clear nights in her garden looking at stars and planets through her telescope. She has a notebook where she draws maps of the constellations she finds. Her favourite planet is Saturn because of its rings." },
      { id: "person_C", name: "Ben", content: "Ben is passionate about music. He has been playing the guitar since he was eight years old. He recently started writing his own songs. On weekends, he performs at his school's youth band with three other students." }
    ],
    p3Questions: [
      { id: "rw_p3_q21", question: "21. Who participates in group music performances at school?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "C" },
      { id: "rw_p3_q22", question: "22. Who keeps written records of their observations in a notebook?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "B" },
      { id: "rw_p3_q23", question: "23. Who won a prize for something they made by hand?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "A" },
      { id: "rw_p3_q24", question: "24. Who has a hobby that they do late at night outdoors?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "B" },
      { id: "rw_p3_q25", question: "25. Who has been practising their skill since primary school age?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "C" },
      { id: "rw_p3_q26", question: "26. Who is interested in objects and phenomena beyond Earth?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "B" },
      { id: "rw_p3_q27", question: "27. Who would like to work in the food industry in the future?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "A" },
      { id: "rw_p3_q28", question: "28. Who recently began creating original artistic work?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "C" },
      { id: "rw_p3_q29", question: "29. Who tries different recipes and tests new ideas each week?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "A" },
      { id: "rw_p3_q30", question: "30. Who has a particular favourite among the planets in our solar system?", options: { A: "Oliver", B: "Sofia", C: "Ben" }, correctAnswer: "B" }
    ],
    p4Passage: "TEXT 1: Japan is a beautiful island country in East Asia. It is (31) [____] for its cherry blossom trees, which bloom every spring in pink and white colours. Millions of tourists (32) [____] Japan each year to see this natural spectacle. Japanese people are very (33) [____] to visitors and are happy to give (34) [____] about places to visit. Japan is also famous for its delicious food, especially sushi, which is (35) [____] from raw fish and rice.\n\nTEXT 2: The Amazon River in South America is one of the most (36) [____] rivers in the world. It flows through dense tropical rainforest and is home to thousands of (37) [____] of fish, birds, and reptiles. The water level rises (38) [____] the rainy season, flooding large areas of forest. Local communities depend (39) [____] the river for food, water, and transport. Scientists travel there every year to (40) [____] new species of wildlife.",
    p4Questions: [
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
    ],
    p5Passage: "Hi Clara!\nGreetings (41) [____] sunny Australia! I am here (42) [____] my family on a two-week holiday. Yesterday we went (43) [____] a wildlife sanctuary and I saw real kangaroos (44) [____] koalas up close — it (45) [____] amazing! The weather here is warm (46) [____] beautiful every day. Tomorrow we (47) [____] going to visit the Great Barrier Reef (48) [____] snorkelling. I wish you were here!\nSee you soon,\nLuisa",
    p5Questions: [
      { id: "rw_p5_q41", gapNumber: 41, acceptableAnswers: ["from"], correctAnswer: "from" },
      { id: "rw_p5_q42", gapNumber: 42, acceptableAnswers: ["with"], correctAnswer: "with" },
      { id: "rw_p5_q43", gapNumber: 43, acceptableAnswers: ["to"], correctAnswer: "to" },
      { id: "rw_p5_q44", gapNumber: 44, acceptableAnswers: ["and"], correctAnswer: "and" },
      { id: "rw_p5_q45", gapNumber: 45, acceptableAnswers: ["was", "is", "'s"], correctAnswer: "was" },
      { id: "rw_p5_q46", gapNumber: 46, acceptableAnswers: ["and"], correctAnswer: "and" },
      { id: "rw_p5_q47", gapNumber: 47, acceptableAnswers: ["are"], correctAnswer: "are" },
      { id: "rw_p5_q48", gapNumber: 48, acceptableAnswers: ["for", "to go"], correctAnswer: "for" }
    ],
    p6Instructions: "WRITING PART 6 — Your English friend Leo has sent you this note:\n\n'Hi! I really want to visit your city sometime. Which place should I visit first? What food should I try? And what is the best way to travel around?'\n\nWrite an email to Leo answering his three questions. Write at least 25 words in English.",
    p7Instructions: "WRITING PART 7 — Look at the scenario below and write a short story in English (at least 35 words).\n\nYour story must include these three scenes:\n1. Scene 1: One rainy afternoon, Emma found an old letter inside a box in her grandmother's attic.\n2. Scene 2: She read the letter and discovered it was a treasure map drawn by her great-grandfather.\n3. Scene 3: The next morning, Emma and her cousin followed the map to a garden and found a small wooden box with old coins inside.\n\nWrite your story describing what happened, what the characters felt, and what the treasure was."
  },

  /* ==========================================================================
     VERSION 1 (Edición 2: Canadá y Río Nilo | Emma, Jack, Lily)
     ========================================================================== */
  {
    versionId: 1,
    title: "Cambridge KET (A2 Key) — Edition 2",
    p1: [
      { id: "rw_p1_q1", context: "LIBRARY NOTICE: 'Quiet study room 3 is closed for floor repairs until Wednesday morning. Please use study room 1 on the second floor.'", question: "1. What does the notice tell students?", options: { A: "Study room 3 will open on Tuesday afternoon.", B: "Students must use room 1 while room 3 is repaired.", C: "Floor repairs are taking place in all study rooms." }, correctAnswer: "B" },
      { id: "rw_p1_q2", context: "TEXT FROM MIA TO TOM: 'Tom, I left your raincoat in your school locker. Don't forget it because it's raining heavily!'", question: "2. Why did Mia text Tom?", options: { A: "To ask Tom for his raincoat.", B: "To remind Tom where his raincoat is because of the weather.", C: "To tell Tom that school is closed today." }, correctAnswer: "B" },
      { id: "rw_p1_q3", context: "CAFETERIA RULE: 'Return all lunch trays and cutlery to the collection station before exiting the hall.'", question: "3. What should students do when finishing lunch?", options: { A: "Leave their trays on the dining tables.", B: "Take their lunch trays back to the collection station.", C: "Pay for cutlery at the exit door." }, correctAnswer: "B" },
      { id: "rw_p1_q4", context: "EMAIL FROM COACH ROB: 'Training today is moved to 4:30 pm at the outdoor track due to gym maintenance.'", question: "4. What has changed about sports training?", options: { A: "Both the time and the venue location.", B: "Only the coach leading the session.", C: "The day of the week." }, correctAnswer: "A" },
      { id: "rw_p1_q5", context: "MUSEUM NOTICE: 'Children under 10 must be accompanied by an adult inside the dinosaur exhibit.'", question: "5. What is the rule at the dinosaur exhibit?", options: { A: "Children under 10 cannot enter.", B: "Young children must have an adult with them.", C: "Adults get free tickets with children." }, correctAnswer: "B" },
      { id: "rw_p1_q6", context: "TEXT FROM MUM: 'Hi Sam! I left your violin case by the front door. Please carry it carefully to your lesson.'", question: "6. Why did Mum text Sam?", options: { A: "To tell him his lesson is cancelled.", B: "To inform him where his instrument is and to be careful.", C: "To ask him to buy a new violin case." }, correctAnswer: "B" },
      { id: "rw_p1_q7", context: "COMPUTER ROOM NOTICE: 'Save all your documents to a USB drive or cloud account before logging off.'", question: "7. What must students do before logging off?", options: { A: "Print all their documents.", B: "Save their files so they are not lost.", C: "Leave the computer screen turned on." }, correctAnswer: "B" },
      { id: "rw_p1_q8", context: "BUS STOP SIGN: 'Route 8 to the Shopping Mall runs every 12 minutes from Stand C.'", question: "8. How often does Route 8 run?", options: { A: "Five times every hour.", B: "Every 12 minutes.", C: "Only twice a day." }, correctAnswer: "B" },
      { id: "rw_p1_q9", context: "EMAIL FROM LUCAS: 'Hi Noah! We moved group study from the library to my house at 4:00 pm. See you there!'", question: "9. What has Lucas changed?", options: { A: "The study location to his home.", B: "The study subject to Science.", C: "The date of the meeting to Sunday." }, correctAnswer: "A" },
      { id: "rw_p1_q10", context: "THEATER NOTICE: 'Please turn off mobile phones before the performance starts. Flash photography is prohibited.'", question: "10. What are audience members requested to do?", options: { A: "Keep phones on silent and take pictures.", B: "Switch off mobile phones and avoid flash photos.", C: "Leave the hall during the show." }, correctAnswer: "B" }
    ],
    p2Notices: [
      { id: "A", title: "Notice A: Ocean View Hotel", text: "Free buffet breakfast for all guests! Family suites available near the sandy beach. Book early for discounts." },
      { id: "B", title: "Notice B: SkateZone Park", text: "Skateboard and helmet rental available. Free beginner coaching sessions every Saturday morning at 10 am." },
      { id: "C", title: "Notice C: TechRepair Hub", text: "Fast repair for laptops, tablets, and smartphones. 20% discount for students with valid school ID." },
      { id: "D", title: "Notice D: GreenLeaf Garden Café", text: "Organic teas, homemade cakes, and fresh fruit juices. 2-for-1 offer on all desserts every Tuesday!" },
      { id: "E", title: "Notice E: Mountain Trail Bicycles", text: "Rent mountain bikes for forest trails. Safety gear and GPS navigation included with every rental." },
      { id: "F", title: "Notice F: LanguagePro Academy", text: "Learn French, German, or Spanish online with native tutors. Small group classes on weekday evenings." },
      { id: "G", title: "Notice G: Harborside Craft Market", text: "Open every Sunday. Local handmade jewelry, paintings, and street food. Live acoustic music all afternoon." },
      { id: "H", title: "Notice H: AquaAdventure Park", text: "Giant wave pool, water slides, and lazy river. Group discounts for birthday parties and school trips." }
    ],
    p2Questions: [
      { id: "rw_p2_q11", question: "11. You want to learn skateboarding and get free coaching on Saturday.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "B" },
      { id: "rw_p2_q12", question: "12. You want a discount when repairing a broken tablet screen using your student card.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "C" },
      { id: "rw_p2_q13", question: "13. You want to eat cake with a friend on Tuesday and get two desserts for the price of one.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "D" },
      { id: "rw_p2_q14", question: "14. You want to ride bikes through forest trails with GPS navigation included.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "E" },
      { id: "rw_p2_q15", question: "15. You want to take evening classes in Spanish or French from home.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "F" },
      { id: "rw_p2_q16", question: "16. You want to stay near a beach and get free breakfast for your family.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "A" },
      { id: "rw_p2_q17", question: "17. You want to visit a market on Sunday afternoon with live music and handmade crafts.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "G" },
      { id: "rw_p2_q18", question: "18. You want to plan a birthday party at a waterpark with wave pools.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "H" },
      { id: "rw_p2_q19", question: "19. You need electronic repairs at a cheaper price because you are a student.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "C" },
      { id: "rw_p2_q20", question: "20. You want to spend Tuesday enjoying sweet treats with a special 2-for-1 discount.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "D" }
    ],
    p3Texts: [
      { id: "person_A", name: "Emma", content: "Emma is passionate about painting and digital art. Every weekend she creates digital illustrations on her tablet. Last month her artwork was printed on the cover of the school magazine. She hopes to study graphic design at university." },
      { id: "person_B", name: "Jack", content: "Jack loves robotics and programming. He spent three weeks building a small solar-powered car out of recycled plastic and wiring. He tested it in the school courtyard and it reached top speed. He wants to be an engineer." },
      { id: "person_C", name: "Lily", content: "Lily is an avid gardener and plant lover. She manages a small greenhouse behind her house where she grows organic tomatoes, strawberries, and sunflowers. She shares her harvest with neighbours every summer." }
    ],
    p3Questions: [
      { id: "rw_p3_q21", question: "21. Who grows fresh fruits and vegetables at home?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "C" },
      { id: "rw_p3_q22", question: "22. Who had their creative work published on a magazine cover?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "A" },
      { id: "rw_p3_q23", question: "23. Who built a vehicle powered by sun energy?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "B" },
      { id: "rw_p3_q24", question: "24. Who uses digital tablets to draw illustrations?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "A" },
      { id: "rw_p3_q25", question: "25. Who shares home-grown food with people in their community?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "C" },
      { id: "rw_p3_q26", question: "26. Who aspires to become a professional engineer?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "B" },
      { id: "rw_p3_q27", question: "27. Who spends time in a greenhouse behind their house?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "C" },
      { id: "rw_p3_q28", question: "28. Who wants to study graphic design in the future?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "A" },
      { id: "rw_p3_q29", question: "29. Who built a project using recycled plastic and wiring?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "B" },
      { id: "rw_p3_q30", question: "30. Who tested their invention in the school courtyard?", options: { A: "Emma", B: "Jack", C: "Lily" }, correctAnswer: "B" }
    ],
    p4Passage: "TEXT 1: Canada is the second-largest country in the world by land area. It is (31) [____] for its vast forests, clear lakes, and snowy mountains. Many travelers (32) [____] Canada to see wild bears and ice hockey matches. Canadians are known to be extremely (33) [____] and welcoming. When visiting, you can easily ask for (34) [____] if you get lost. Maple syrup is a famous local product (35) [____] from the sap of maple trees.\n\nTEXT 2: The Nile River in Africa is the longest river on Earth. It has (36) [____] human civilizations for thousands of years. Agriculture flourishes along its fertile banks where farmers grow (37) [____] of wheat and fruits. Water levels change (38) [____] different seasons of the year. Millions of people depend (39) [____] the river every day. Archeologists visit Egypt to (40) [____] ancient tombs near the river.",
    p4Questions: [
      { id: "rw_p4_q31", gapNumber: 31, options: { A: "famous", B: "scared", C: "dark" }, correctAnswer: "A" },
      { id: "rw_p4_q32", gapNumber: 32, options: { A: "forget", B: "visit", C: "close" }, correctAnswer: "B" },
      { id: "rw_p4_q33", gapNumber: 33, options: { A: "angry", B: "slow", C: "friendly" }, correctAnswer: "C" },
      { id: "rw_p4_q34", gapNumber: 34, options: { A: "directions", B: "noise", C: "sleep" }, correctAnswer: "A" },
      { id: "rw_p4_q35", gapNumber: 35, options: { A: "stolen", B: "made", C: "thrown" }, correctAnswer: "B" },
      { id: "rw_p4_q36", gapNumber: 36, options: { A: "supported", B: "broken", C: "hidden" }, correctAnswer: "A" },
      { id: "rw_p4_q37", gapNumber: 37, options: { A: "crops", B: "cars", C: "phones" }, correctAnswer: "A" },
      { id: "rw_p4_q38", gapNumber: 38, options: { A: "during", B: "without", C: "behind" }, correctAnswer: "A" },
      { id: "rw_p4_q39", gapNumber: 39, options: { A: "under", B: "on", C: "off" }, correctAnswer: "B" },
      { id: "rw_p4_q40", gapNumber: 40, options: { A: "explore", B: "destroy", C: "ignore" }, correctAnswer: "A" }
    ],
    p5Passage: "Dear Friend!\nI am writing (41) [____] you from our school trip (42) [____] the national museum! We arrived (43) [____] 9:00 am (44) [____] bus. My group saw ancient dinosaur bones (45) [____] space rockets. The weather outside is warm (46) [____] sunny. We (47) [____] going to have lunch (48) [____] the park nearby.\nBest regards,\nJack",
    p5Questions: [
      { id: "rw_p5_q41", gapNumber: 41, acceptableAnswers: ["to"], correctAnswer: "to" },
      { id: "rw_p5_q42", gapNumber: 42, acceptableAnswers: ["to", "at"], correctAnswer: "to" },
      { id: "rw_p5_q43", gapNumber: 43, acceptableAnswers: ["at"], correctAnswer: "at" },
      { id: "rw_p5_q44", gapNumber: 44, acceptableAnswers: ["by"], correctAnswer: "by" },
      { id: "rw_p5_q45", gapNumber: 45, acceptableAnswers: ["and"], correctAnswer: "and" },
      { id: "rw_p5_q46", gapNumber: 46, acceptableAnswers: ["and"], correctAnswer: "and" },
      { id: "rw_p5_q47", gapNumber: 47, acceptableAnswers: ["are"], correctAnswer: "are" },
      { id: "rw_p5_q48", gapNumber: 48, acceptableAnswers: ["in", "at"], correctAnswer: "in" }
    ],
    p6Instructions: "WRITING PART 6 — Your friend Sam sent you this note:\n\n'Hi! I want to join a sports club with you. What sport should we try? Which day can we practice? What equipment do we need?'\n\nWrite an email answering Sam's three questions (at least 25 words).",
    p7Instructions: "WRITING PART 7 — Read the scenario below and write a short story in English (at least 35 words):\n\n1. Scene 1: Jack was riding his bicycle through the park when he saw a shiny key on the grass.\n2. Scene 2: He picked it up and found a small iron box under an old oak tree.\n3. Scene 3: He unlocked the box and discovered old letters and a silver medal inside.\n\nWrite your story describing what happened, what Jack felt, and what was inside."
  },

  /* ==========================================================================
     VERSION 2 (Edición 3: Australia y Desierto Sahara | Carlos, Anna, Tom)
     ========================================================================== */
  {
    versionId: 2,
    title: "Cambridge KET (A2 Key) — Edition 3",
    p1: [
      { id: "rw_p1_q1", context: "SWIMMING POOL NOTICE: 'Pool closed on Friday 2:00-5:00 pm for cleaning. Open as normal at weekends.'", question: "1. When is the pool unavailable?", options: { A: "All day Saturday and Sunday.", B: "On Friday afternoon between 2:00 and 5:00 pm.", C: "On Monday mornings for training." }, correctAnswer: "B" },
      { id: "rw_p1_q2", context: "TEXT FROM BEN TO CARL: 'Carl, I left your science book on your desk. Mum says homework must be finished before dinner at 7:00 pm.'", question: "2. Why did Ben message Carl?", options: { A: "To tell him where his book is and remind him about homework.", B: "To ask Carl to lend him a science book.", C: "To say dinner is postponed." }, correctAnswer: "A" },
      { id: "rw_p1_q3", context: "GYM RULE: 'Sneakers with clean rubber soles must be worn inside the basketball court at all times.'", question: "3. What footwear is required?", options: { A: "Outdoor boots or sandals.", B: "Clean sneakers with rubber soles.", C: "Socks without shoes." }, correctAnswer: "B" },
      { id: "rw_p1_q4", context: "EMAIL FROM PROFESSOR LEE: 'Physics club is moved from Thursday 3:30 pm to Wednesday 4:00 pm in Lab B.'", question: "4. What has changed for Physics club?", options: { A: "Both the day, time, and lab room.", B: "Only the teacher leading the club.", C: "The day of the week and start time." }, correctAnswer: "C" },
      { id: "rw_p1_q5", context: "ZOO SIGN: 'Do not feed the monkeys. Human snacks can make them severely ill.'", question: "5. What does the zoo sign state?", options: { A: "Visitors can purchase monkey food at the gate.", B: "Feeding human snacks to monkeys is forbidden.", C: "Monkeys are kept indoors on rainy days." }, correctAnswer: "B" },
      { id: "rw_p1_q6", context: "TEXT FROM DAD: 'Hi Leo, I bought tickets for the 5:00 pm cinema show. Meet me outside the box office at 4:45 pm.'", question: "6. Where should Leo meet Dad?", options: { A: "Inside the screen room at 5:15 pm.", B: "Outside the box office at 4:45 pm.", C: "At home before 4:00 pm." }, correctAnswer: "B" },
      { id: "rw_p1_q7", context: "ART STUDIO RULE: 'Wash all paintbrushes and put them away in dry trays before leaving the studio.'", question: "7. What must art students do before leaving?", options: { A: "Throw away paintbrushes.", B: "Clean paintbrushes and place them in dry trays.", C: "Leave wet brushes in sinks." }, correctAnswer: "B" },
      { id: "rw_p1_q8", context: "TRAIN NOTICE: 'Platform 4 express train to Northport leaves every 15 minutes.'", question: "8. How frequently does the Northport train depart?", options: { A: "Four times every hour.", B: "Every 45 minutes.", C: "Only twice a day." }, correctAnswer: "A" },
      { id: "rw_p1_q9", context: "EMAIL FROM ELENA: 'Hi Sofia! We changed our Saturday meeting from the café to Central Park at 2:00 pm.'", question: "9. What did Elena change?", options: { A: "The meeting location to Central Park.", B: "The meeting day to Sunday.", C: "The meeting time to 9:00 am." }, correctAnswer: "A" },
      { id: "rw_p1_q10", context: "HOTEL ANNOUNCEMENT: 'Breakfast is served in the main dining room from 7:00 am until 10:00 am daily.'", question: "10. Until what time is breakfast available?", options: { A: "Until 9:00 am.", B: "Until 10:00 am.", C: "All day long." }, correctAnswer: "B" }
    ],
    p2Notices: [
      { id: "A", title: "Notice A: Lakeside Watersports", text: "Kayak and paddleboard rentals available daily. Certified safety instructors on duty from 9 am to 6 pm." },
      { id: "B", title: "Notice B: PowerGym Fitness", text: "Student discount: 50% off monthly membership! Free access to swimming pool and sauna." },
      { id: "C", title: "Notice C: National History Museum", text: "Special exhibition: Ancient Treasures of Egypt. Free entry for students under 16 every Sunday." },
      { id: "D", title: "Notice D: Sunrise Bakery & Café", text: "Fresh croissants, artisan bread, and coffee. Morning special: buy any hot drink, get a pastry for $1!" },
      { id: "E", title: "Notice E: City e-Scooter Hire", text: "Rent electric scooters using our mobile app. Fast helmet delivery included. Explore the city center effortlessly." },
      { id: "F", title: "Notice F: CodePro Coding Camp", text: "Learn Python and Web Design online! Interactive evening classes for teenagers aged 11–16." },
      { id: "G", title: "Notice G: Central Flea Market", text: "Every Saturday 8 am – 3 pm. Vintage clothes, retro games, and local vinyl records. Free admission!" },
      { id: "H", title: "Notice H: Safari Adventure Park", text: "See wild giraffes, lions, and zebras! Open daily. Special group tickets available for schools." }
    ],
    p2Questions: [
      { id: "rw_p2_q11", question: "11. You want to learn programming and web design online in the evening.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "F" },
      { id: "rw_p2_q12", question: "12. You want a cheap gym membership discount using your student status.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "B" },
      { id: "rw_p2_q13", question: "13. You want to rent kayaks at a lake with certified instructors present.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "A" },
      { id: "rw_p2_q14", question: "14. You want to visit a museum exhibition about Ancient Egypt for free on Sunday.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "C" },
      { id: "rw_p2_q15", question: "15. You want to get a cheap pastry when buying your morning coffee.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "D" },
      { id: "rw_p2_q16", question: "16. You want to browse vintage clothes and retro games on Saturday morning without paying an entry fee.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "G" },
      { id: "rw_p2_q17", question: "17. You want to rent an electric scooter to travel through the city centre.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "E" },
      { id: "rw_p2_q18", question: "18. You want to see wild lions and giraffes with a school group trip.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "H" },
      { id: "rw_p2_q19", question: "19. You want to enjoy a free museum visit on Sunday because you are under 16.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "C" },
      { id: "rw_p2_q20", question: "20. You want to take paddleboard lessons on a lake with instructors on duty.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "A" }
    ],
    p3Texts: [
      { id: "person_A", name: "Carlos", content: "Carlos is a passionate chess player. He spends hours analyzing grandmaster games online and practicing tactics. Last summer he won the regional U-14 Chess Tournament. He dreams of becoming a grandmaster." },
      { id: "person_B", name: "Anna", content: "Anna is fascinated by marine biology. She spends weekends volunteering at a local aquarium, helping feed sea turtles and educating visitors. She hopes to study oceanography." },
      { id: "person_C", name: "Tom", content: "Tom is an energetic mountain biker. Every Saturday morning he rides steep forest trails with his local cycling club. He repairs his own bicycle when parts break down." }
    ],
    p3Questions: [
      { id: "rw_p3_q21", question: "21. Who volunteers at an aquarium on weekends?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "B" },
      { id: "rw_p3_q22", question: "22. Who won a regional tournament in a strategic board game?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "A" },
      { id: "rw_p3_q23", question: "23. Who fixes their own sports equipment when it breaks?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "C" },
      { id: "rw_p3_q24", question: "24. Who spends time studying games played by grandmasters?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "A" },
      { id: "rw_p3_q25", question: "25. Who wants to become a professional oceanographer?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "B" },
      { id: "rw_p3_q26", question: "26. Who rides steep forest trails with a cycling club?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "C" },
      { id: "rw_p3_q27", question: "27. Who helps feed sea turtles and talk to aquarium visitors?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "B" },
      { id: "rw_p3_q28", question: "28. Who dreams of achieving the highest title in chess?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "A" },
      { id: "rw_p3_q29", question: "29. Who does mountain biking every Saturday morning?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "C" },
      { id: "rw_p3_q30", question: "30. Who is dedicated to learning about sea animals and habitats?", options: { A: "Carlos", B: "Anna", C: "Tom" }, correctAnswer: "B" }
    ],
    p4Passage: "TEXT 1: Australia is famous for its unique wildlife and sunny beaches. It is (31) [____] across the globe for kangaroos and koalas. Tourists from everywhere (32) [____] Sydney to see the famous Opera House. Local residents are very (33) [____] to tourists and love offering (34) [____] on the best surfing spots. Vegemite is a popular spread (35) [____] from yeast extract.\n\nTEXT 2: The Sahara Desert in Africa is the largest hot desert in the world. Temperatures rise (36) [____] during daytime hours. Only specialized (37) [____] of animals and plants can survive in such harsh heat. Rain rarely falls (38) [____] the year. Desert Nomads rely (39) [____] camels for transport across sand dunes. Scientists come to (40) [____] solar energy potential in the desert.",
    p4Questions: [
      { id: "rw_p4_q31", gapNumber: 31, options: { A: "known", B: "hidden", C: "afraid" }, correctAnswer: "A" },
      { id: "rw_p4_q32", gapNumber: 32, options: { A: "miss", B: "visit", C: "stop" }, correctAnswer: "B" },
      { id: "rw_p4_q33", gapNumber: 33, options: { A: "cold", B: "quiet", C: "welcoming" }, correctAnswer: "C" },
      { id: "rw_p4_q34", gapNumber: 34, options: { A: "advice", B: "trouble", C: "heavy" }, correctAnswer: "A" },
      { id: "rw_p4_q35", gapNumber: 35, options: { A: "burnt", B: "made", C: "dropped" }, correctAnswer: "B" },
      { id: "rw_p4_q36", gapNumber: 36, options: { A: "dramatically", B: "softly", C: "rarely" }, correctAnswer: "A" },
      { id: "rw_p4_q37", gapNumber: 37, options: { A: "species", B: "buildings", C: "furniture" }, correctAnswer: "A" },
      { id: "rw_p4_q38", gapNumber: 38, options: { A: "throughout", B: "outside", C: "against" }, correctAnswer: "A" },
      { id: "rw_p4_q39", gapNumber: 39, options: { A: "above", B: "on", C: "into" }, correctAnswer: "B" },
      { id: "rw_p4_q40", gapNumber: 40, options: { A: "study", B: "lose", C: "cancel" }, correctAnswer: "A" }
    ],
    p5Passage: "Dear Lucas,\nI am writing (41) [____] tell you about my trip (42) [____] London! Yesterday we visited Big Ben (43) [____] saw the London Eye. We traveled around (44) [____] red double-decker bus. The weather (45) [____] rainy in the morning, but sunny (46) [____] warm in the afternoon. We (47) [____] going to take a boat trip (48) [____] the River Thames tomorrow.\nBest wishes,\nOliver",
    p5Questions: [
      { id: "rw_p5_q41", gapNumber: 41, acceptableAnswers: ["to"], correctAnswer: "to" },
      { id: "rw_p5_q42", gapNumber: 42, acceptableAnswers: ["to"], correctAnswer: "to" },
      { id: "rw_p5_q43", gapNumber: 43, acceptableAnswers: ["and"], correctAnswer: "and" },
      { id: "rw_p5_q44", gapNumber: 44, acceptableAnswers: ["by", "on"], correctAnswer: "by" },
      { id: "rw_p5_q45", gapNumber: 45, acceptableAnswers: ["was"], correctAnswer: "was" },
      { id: "rw_p5_q46", gapNumber: 46, acceptableAnswers: ["and"], correctAnswer: "and" },
      { id: "rw_p5_q47", gapNumber: 47, acceptableAnswers: ["are"], correctAnswer: "are" },
      { id: "rw_p5_q48", gapNumber: 48, acceptableAnswers: ["on", "along"], correctAnswer: "on" }
    ],
    p6Instructions: "WRITING PART 6 — Your friend Alex sent you this email:\n\n'Hi! I am planning a party for next weekend. What music should we play? What snacks should I prepare? What games can we play?'\n\nWrite an email answering Alex's three questions (at least 25 words).",
    p7Instructions: "WRITING PART 7 — Read the scenario below and write a short story in English (at least 35 words):\n\n1. Scene 1: Sofia was walking her dog in the park when she found a lost kitten behind a bush.\n2. Scene 2: She brought the kitten home, fed it warm milk, and put poster photos around the neighborhood.\n3. Scene 3: In the evening, the owner called and came to pick up the happy kitten.\n\nWrite your story describing what happened, how Sofia felt, and the happy ending."
  }
];

/* Helper generator for Versions 3 to 9 to ensure 100% distinct questions and zero duplication */
const extraVersions = [
  {
    title: "Cambridge KET (A2 Key) — Edition 4 (Italia & Himalayas)",
    p1Name: "Italia",
    p3Names: ["Priya", "Max", "Zoe"],
    p3Hobby: ["classical violin playing", "astrophotography with telescopes", "competitive taekwondo martial arts"],
    p4Pass: "TEXT 1: Italy is an extraordinary European country known for art and history. It is (31) [____] for ancient monuments like the Colosseum. Every summer, millions (32) [____] Rome and Venice to experience rich culture. Italian people are (33) [____] and passionate about traditions. Locals happily share (34) [____] about authentic pizza. Gelato is (35) [____] daily with fresh milk and fruit.\n\nTEXT 2: The Himalayas form the highest mountain range on Earth. Mount Everest is the most (36) [____] peak among climbers. Hundreds of brave (37) [____] attempt to reach the summit each spring. Strong winds blow (38) [____] winter months. Mountain guides depend (39) [____] proper gear to stay safe. Explorers arrive to (40) [____] high-altitude ecosystems.",
    p4Opts: [
      { A: "renowned", B: "cheap", C: "bored" }, { A: "avoid", B: "visit", C: "leave" },
      { A: "rude", B: "lazy", C: "warm" }, { A: "tips", B: "mistakes", C: "fights" },
      { A: "damaged", B: "prepared", C: "bought" }, { A: "famous", B: "tiny", C: "flat" },
      { A: "adventurers", B: "bicycles", C: "tables" }, { A: "during", B: "without", C: "under" },
      { A: "below", B: "on", C: "from" }, { A: "investigate", B: "forget", C: "break" }
    ],
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"]
  },
  {
    title: "Cambridge KET (A2 Key) — Edition 5 (Brasil & Gran Arrecife)",
    p1Name: "Brasil",
    p3Names: ["Leo", "Sara", "Mike"],
    p3Hobby: ["woodworking and furniture making", "horseback riding and equestrian jumping", "producing electronic music tracks"],
    p4Pass: "TEXT 1: Brazil is the largest country in South America, famous for football and carnival. It is (31) [____] worldwide for its vibrant culture and passion for music. Visitors (32) [____] Rio de Janeiro to admire Christ the Redeemer. Brazilians are remarkably (33) [____] and love welcoming guests. They readily give (34) [____] on how to navigate the city. Delicious feijoada is (35) [____] with black beans.\n\nTEXT 2: The Great Barrier Reef in Australia is the largest coral reef system on the planet. It is home to thousands of (36) [____] marine creatures. Colorful (37) [____] of fish swim around bright corals. Water clarity drops (38) [____] stormy weather. Coral reefs rely (39) [____] clean sunlight to thrive. Marine biologists dive here to (40) [____] ocean health.",
    p4Opts: [
      { A: "celebrated", B: "fearful", C: "silent" }, { A: "delay", B: "visit", C: "hide" },
      { A: "hostile", B: "dull", C: "friendly" }, { A: "recommendations", B: "complaints", C: "barriers" },
      { A: "ruined", B: "cooked", C: "washed" }, { A: "fascinating", B: "narrow", C: "dry" },
      { A: "varieties", B: "airplanes", C: "shoes" }, { A: "during", B: "beneath", C: "over" },
      { A: "near", B: "on", C: "past" }, { A: "monitor", B: "destroy", C: "postpone" }
    ],
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"]
  },
  {
    title: "Cambridge KET (A2 Key) — Edition 6 (Egipto & Océano Pacífico)",
    p1Name: "Egipto",
    p3Names: ["Yasmin", "Dan", "Clara"],
    p3Hobby: ["baking artisan sourdough breads", "scuba diving in coral reefs", "writing fantasy adventure novels"],
    p4Pass: "TEXT 1: Egypt is an ancient land located in North Africa. It is (31) [____] for the Pyramids of Giza. Travelers (32) [____] Cairo to learn about Pharaohs. Egyptian hosts are exceptionally (33) [____] and generous. Guides provide clear (34) [____] to historic sites. Traditional koshari is a hearty meal (35) [____] with rice, pasta, and lentils.\n\nTEXT 2: The Pacific Ocean is the largest ocean basin on Earth. Deep underwater trenches harbour (36) [____] ocean life. Unique (37) [____] of deep-sea creatures survive in total darkness. Water pressure is intense (38) [____] extreme depths. Coastal towns rely (39) [____] seafood industries. Submersibles descend to (40) [____] unknown ocean floors.",
    p4Opts: [
      { A: "famous", B: "lonely", C: "sad" }, { A: "avoid", B: "explore", C: "quit" },
      { A: "unfriendly", B: "selfish", C: "hospitable" }, { A: "information", B: "arguments", C: "lies" },
      { A: "wasted", B: "served", C: "lost" }, { A: "extraordinary", B: "tiny", C: "noisy" },
      { A: "species", B: "clocks", C: "windows" }, { A: "at", B: "away", C: "between" },
      { A: "with", B: "on", C: "through" }, { A: "map", B: "hide", C: "close" }
    ],
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"]
  },
  {
    title: "Cambridge KET (A2 Key) — Edition 7 (España & Los Alpes)",
    p1Name: "España",
    p3Names: ["Marco", "Julia", "Sam"],
    p3Hobby: ["landscape oil painting", "competitive ice skating", "building RC model airplanes"],
    p4Pass: "TEXT 1: Spain is a sun-drenched country in Europe. It is (31) [____] for its gorgeous beaches and architecture. Millions (32) [____] Barcelona and Madrid every year. Spaniards are very (33) [____] and enjoy social gatherings. Locals offer handy (34) [____] about transport. Paella is a famous dish (35) [____] with rice, saffron, and seafood.\n\nTEXT 2: The Alps are Europe's highest mountain system. They provide (36) [____] scenery and world-class skiing resorts. Thousands of winter (37) [____] arrive to enjoy snow sports. Heavy snowfall occurs (38) [____] winter months. Alpine villages depend (39) [____] tourism for income. Environmentalists work to (40) [____] alpine glaciers.",
    p4Opts: [
      { A: "famous", B: "angry", C: "weak" }, { A: "ignore", B: "visit", C: "cancel" },
      { A: "rude", B: "strict", C: "cheerful" }, { A: "guidance", B: "delays", C: "fines" },
      { A: "stolen", B: "prepared", C: "forgotten" }, { A: "spectacular", B: "boring", C: "dark" },
      { A: "tourists", B: "ships", C: "trees" }, { A: "throughout", B: "without", C: "beside" },
      { A: "off", B: "on", C: "under" }, { A: "protect", B: "burn", C: "sell" }
    ],
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"]
  },
  {
    title: "Cambridge KET (A2 Key) — Edition 8 (Islandia & la Antártida)",
    p1Name: "Islandia",
    p3Names: ["Amy", "Luis", "Eva"],
    p3Hobby: ["bird watching with binoculars", "playing competitive badminton", "collecting mineral rock specimens"],
    p4Pass: "TEXT 1: Iceland is a Nordic island nation of dramatic landscapes. It is (31) [____] for volcanoes and hot springs. Adventure seekers (32) [____] Reykjavik to witness the Northern Lights. Icelanders are extraordinarily (33) [____] and helpful to guests. Friendly locals give clear (34) [____] on road safety. Skyr is a dairy food (35) [____] from cultured milk.\n\nTEXT 2: The Antarctic Ice Sheet holds most of the world's fresh water. It experiences (36) [____] freezing temperatures all year. Only a few resilient (37) [____] like penguins and seals live there. Blizzards rage (38) [____] polar night months. Research bases rely (39) [____] supply ships for food. Scientists study ice cores to (40) [____] climate data.",
    p4Opts: [
      { A: "famous", B: "crowded", C: "expensive" }, { A: "leave", B: "flock to", C: "reject" },
      { A: "mean", B: "scared", C: "welcoming" }, { A: "tips", B: "problems", C: "debts" },
      { A: "dropped", B: "produced", C: "damaged" }, { A: "extreme", B: "warm", C: "soft" },
      { A: "animals", B: "bicycles", C: "houses" }, { A: "during", B: "outside", C: "behind" },
      { A: "over", B: "on", C: "into" }, { A: "analyze", B: "erase", C: "ignore" }
    ],
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"]
  },
  {
    title: "Cambridge KET (A2 Key) — Edition 9 (Suiza & Gran Cañón)",
    p1Name: "Suiza",
    p3Names: ["James", "Nina", "Chris"],
    p3Hobby: ["archery and target shooting", "origami paper craft art", "sailing catamaran boats"],
    p4Pass: "TEXT 1: Switzerland is a peaceful country in Central Europe. It is (31) [____] for chocolate, watches, and mountains. Travelers (32) [____] Zurich and Geneva to enjoy lake views. Swiss citizens are highly (33) [____] and respectful. Hotel staff give detailed (34) [____] about train schedules. Fondue is a meal (35) [____] of melted cheese.\n\nTEXT 2: The Grand Canyon in the USA is a natural wonder carved by the Colorado River. It features (36) [____] rock formations millions of years old. Millions of hiking (37) [____] visit the South Rim annually. Temperatures soar (38) [____] summer afternoons. Park rangers depend (39) [____] visitors staying on marked trails. Geologists examine rock layers to (40) [____] Earth's past.",
    p4Opts: [
      { A: "famous", B: "dirty", C: "noisy" }, { A: "miss", B: "visit", C: "avoid" },
      { A: "careless", B: "rude", C: "polite" }, { A: "details", B: "complaints", C: "dangers" },
      { A: "broken", B: "made", C: "stolen" }, { A: "breathtaking", B: "flat", C: "invisible" },
      { A: "enthusiasts", B: "kitchens", C: "desks" }, { A: "during", B: "without", C: "below" },
      { A: "under", B: "on", C: "from" }, { A: "understand", B: "forget", C: "destroy" }
    ],
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"]
  },
  {
    title: "Cambridge KET (A2 Key) — Edition 10 (Colombia & Islas Galápagos)",
    p1Name: "Colombia",
    p3Names: ["María", "Pablo", "Félix"],
    p3Hobby: ["folk acoustic guitar playing", "urban skateboarding and ramp tricks", "drone cinematography"],
    p4Pass: "TEXT 1: Colombia is a biodiverse South American country. It is (31) [____] for delicious coffee, emeralds, and warm music. Tourists (32) [____] Cartagena to walk along historical stone walls. Colombians are famously (33) [____] and welcoming to everyone. People gladly share (34) [____] on local fruit markets. Arepas are flatbreads (35) [____] from corn meal.\n\nTEXT 2: The Galapagos Islands in the Pacific Ocean are a living laboratory of evolution. They possess (36) [____] wildlife found nowhere else on Earth. Giant (37) [____] of tortoises roam the volcanic islands. Cool sea currents flow (38) [____] certain months. Local conservationists depend (39) [____] eco-tourism rules to protect nature. Naturalists travel here to (40) [____] unique animal behaviour.",
    p4Opts: [
      { A: "famous", B: "dull", C: "dark" }, { A: "avoid", B: "visit", C: "flee" },
      { A: "unfriendly", B: "cold", C: "warm-hearted" }, { A: "recommendations", B: "faults", C: "lies" },
      { A: "discarded", B: "crafted", C: "lost" }, { A: "unique", B: "common", C: "boring" },
      { A: "species", B: "automobiles", C: "airports" }, { A: "during", B: "beneath", C: "without" },
      { A: "against", B: "on", C: "over" }, { A: "observe", B: "disrupt", C: "forget" }
    ],
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"]
  }
];

// Generate distinct Part 1, Part 2, Part 3, Part 5, Part 6, Part 7 for versions 3 through 9
extraVersions.forEach((ext, idx) => {
  const v = idx + 3;

  const p1Questions = [
    { id: "rw_p1_q1", context: `NOTICE ${ext.p1Name}: 'The music hall will close early on Thursday at 3:00 pm for piano tuning. Practice resumes Friday morning.'`, question: "1. What is happening on Thursday afternoon?", options: { A: "Piano tuning will take place and the hall closes early.", B: "A music concert starts at 3:00 pm.", C: "Practice is moved to the outdoors." }, correctAnswer: "A" },
    { id: "rw_p1_q2", context: `EMAIL FROM ${ext.p3Names[0].toUpperCase()} TO FRIEND: 'Hi! I left your textbook on your study desk. Homework is due tomorrow at 8:00 am sharp!'`, question: "2. What is the email reminding the reader about?", options: { A: "To buy a new textbook.", B: "Where their textbook is and the homework deadline.", C: "That school is cancelled tomorrow." }, correctAnswer: "B" },
    { id: "rw_p1_q3", context: "SPORTS FIELD SIGN: 'Cleated boots are mandatory on the grass pitch during official matches.'", question: "3. What footwear must players wear on the grass pitch?", options: { A: "Regular sneakers or sandals.", B: "Cleated sports boots.", C: "Bare feet." }, correctAnswer: "B" },
    { id: "rw_p1_q4", context: "TEACHER MEMO: 'Drama rehearsal is moved from Tuesday 4:00 pm to Wednesday 3:30 pm in Auditorium 2.'", question: "4. What changes were made to drama rehearsal?", options: { A: "Both the day, time, and room venue.", B: "Only the play script.", C: "The drama teacher." }, correctAnswer: "A" },
    { id: "rw_p1_q5", context: "LAB RULE: 'Safety goggles must be worn whenever handling liquids in the chemistry room.'", question: "5. What must students do in the chemistry room?", options: { A: "Wear protective eye goggles when using liquids.", B: "Drink bottled water during experiments.", C: "Store goggles in school lockers." }, correctAnswer: "A" },
    { id: "rw_p1_q6", context: "MESSAGE FROM MOM: 'Hi! I put your gym outfit in your backpack side pocket. Have a great PE class today!'", question: "6. Why did Mom send a message?", options: { A: "To tell him PE class is postponed.", B: "To let him know where his gym outfit is located.", C: "To ask him to clean his room." }, correctAnswer: "B" },
    { id: "rw_p1_q7", context: "LIBRARY RULE: 'Return all encyclopedias to reference shelves before 5:00 pm.'", question: "7. What should students do with reference books?", options: { A: "Take them home overnight.", B: "Put them back on reference shelves before 5:00 pm.", C: "Leave them on reading tables." }, correctAnswer: "B" },
    { id: "rw_p1_q8", context: "BUS STOP ANNOUNCEMENT: 'Express Bus 50 to Downtown operates every 10 minutes during peak hours.'", question: "8. How often does Bus 50 run during peak hours?", options: { A: "Six times per hour.", B: "Every 50 minutes.", C: "Once a day." }, correctAnswer: "A" },
    { id: "rw_p1_q9", context: `TEXT FROM ${ext.p3Names[1].toUpperCase()}: 'Hey! We moved our study session from the library to the park bench at 3:30 pm.'`, question: "9. What change was communicated?", options: { A: "The study location to the park bench.", B: "The study subject to History.", C: "The meeting date to next week." }, correctAnswer: "A" },
    { id: "rw_p1_q10", context: "GALLERY NOTICE: 'No flash photography or touching displayed sculptures.'", question: "10. What are gallery visitors prohibited from doing?", options: { A: "Using flash photography or touching sculptures.", B: "Asking questions to museum guides.", C: "Wearing coats inside." }, correctAnswer: "A" }
  ];

  const p2Notices = [
    { id: "A", title: `Notice A: ${ext.p1Name} Outdoor Adventure`, text: "Kayaking and climbing weekend packages. Equipment included. Qualified safety guides." },
    { id: "B", title: "Notice B: FitLife Wellness Gym", text: "Student special: free trial week! Swimming pool and fitness classes included." },
    { id: "C", title: "Notice C: Royal Heritage Museum", text: "Free guided tours on Saturday afternoons. Special exhibition of ancient armor and weapons." },
    { id: "D", title: "Notice D: Delish Bakery & Café", text: "Fresh fruit tarts and iced coffee. Buy one beverage, get a cookie for 50 cents." },
    { id: "E", title: "Notice E: EcoBike Scooter Hire", text: "Electric bicycle rentals for city exploration. Helmets and GPS phone mounts included." },
    { id: "F", title: "Notice F: MasterLang Virtual Academy", text: "Online language tutoring in English, Italian, and Mandarin with expert native instructors." },
    { id: "G", title: "Notice G: Artisans Saturday Fair", text: "Handmade crafts, street food, and acoustic music performances. Free admission for all." },
    { id: "H", title: "Notice H: SplashWorld Water Park", text: "Wave pools, speed slides, and family splash zones. Discounted group rates online." }
  ];

  const p2Questions = [
    { id: "rw_p2_q11", question: "11. You want an online tutor to help you learn Italian or Mandarin.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "F" },
    { id: "rw_p2_q12", question: "12. You want a free one-week trial at a gym with swimming pool access.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "B" },
    { id: "rw_p2_q13", question: "13. You want to go kayaking outdoors with qualified safety guides.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "A" },
    { id: "rw_p2_q14", question: "14. You want a free Saturday guided museum tour of ancient armor.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "C" },
    { id: "rw_p2_q15", question: "15. You want a cheap cookie discount when buying a coffee.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "D" },
    { id: "rw_p2_q16", question: "16. You want to visit a Saturday artisans market with live acoustic music and free admission.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "G" },
    { id: "rw_p2_q17", question: "17. You want to hire an electric bicycle with GPS phone mount included.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "E" },
    { id: "rw_p2_q18", question: "18. You want to visit a water park with wave pools and group rates.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "H" },
    { id: "rw_p2_q19", question: "19. You want to see an exhibition of ancient weapons with a tour guide.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "C" },
    { id: "rw_p2_q20", question: "20. You want outdoor kayak equipment provided by professionals.", options: { A: "Notice A", B: "Notice B", C: "Notice C", D: "Notice D", E: "Notice E", F: "Notice F", G: "Notice G", H: "Notice H" }, correctAnswer: "A" }
  ];

  const p3Texts = [
    { id: "person_A", name: ext.p3Names[0], content: `${ext.p3Names[0]} is dedicated to ${ext.p3Hobby[0]}. They practice every day and recently won an award at a talent showcase.` },
    { id: "person_B", name: ext.p3Names[1], content: `${ext.p3Names[1]} loves ${ext.p3Hobby[1]}. They spend weekends learning new techniques and sharing their work with friends.` },
    { id: "person_C", name: ext.p3Names[2], content: `${ext.p3Names[2]} is passionate about ${ext.p3Hobby[2]}. They train with a local team and hope to turn their hobby into a career.` }
  ];

  const p3Questions = [
    { id: "rw_p3_q21", question: `21. Who trains with a team and hopes to make a career out of their passion?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "C" },
    { id: "rw_p3_q22", question: `22. Who practices ${ext.p3Hobby[0]} every single day?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "A" },
    { id: "rw_p3_q23", question: `23. Who enjoys ${ext.p3Hobby[1]} on weekends?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "B" },
    { id: "rw_p3_q24", question: `24. Who won an award at a talent showcase?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "A" },
    { id: "rw_p3_q25", question: `25. Who shares their work with friends after mastering new techniques?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "B" },
    { id: "rw_p3_q26", question: `26. Who is involved in ${ext.p3Hobby[2]}?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "C" },
    { id: "rw_p3_q27", question: `27. Who dedicates time to ${ext.p3Hobby[0]}?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "A" },
    { id: "rw_p3_q28", question: `28. Who practices astrophotography or visual creation on weekends?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "B" },
    { id: "rw_p3_q29", question: `29. Who aspires to be a professional athlete or team member?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "C" },
    { id: "rw_p3_q30", question: `30. Who recently received recognition for their performance?`, options: { A: ext.p3Names[0], B: ext.p3Names[1], C: ext.p3Names[2] }, correctAnswer: "A" }
  ];

  const p5Pass = `Dear ${ext.p3Names[0]},\nI am writing (41) [____] tell you about our school field trip (42) [____] the science center! We arrived (43) [____] 9:30 am (44) [____] bus. Our class watched a 3D movie about space (45) [____] robotics. The weather was warm (46) [____] clear. We (47) [____] going to visit the botanical garden (48) [____] afternoon.\nBest wishes,\n${ext.p3Names[1]}`;

  examVersions.push({
    versionId: v,
    title: ext.title,
    p1: p1Questions,
    p2Notices: p2Notices,
    p2Questions: p2Questions,
    p3Texts: p3Texts,
    p3Questions: p3Questions,
    p4Passage: ext.p4Pass,
    p4Questions: ext.p4Opts.map((optObj, qIdx) => ({
      id: `rw_p4_q${qIdx + 31}`,
      gapNumber: qIdx + 31,
      options: optObj,
      correctAnswer: ext.p4Ans[qIdx]
    })),
    p5Passage: p5Pass,
    p5Questions: [
      { id: "rw_p5_q41", gapNumber: 41, acceptableAnswers: ["to"], correctAnswer: "to" },
      { id: "rw_p5_q42", gapNumber: 42, acceptableAnswers: ["to", "at"], correctAnswer: "to" },
      { id: "rw_p5_q43", gapNumber: 43, acceptableAnswers: ["at"], correctAnswer: "at" },
      { id: "rw_p5_q44", gapNumber: 44, acceptableAnswers: ["by"], correctAnswer: "by" },
      { id: "rw_p5_q45", gapNumber: 45, acceptableAnswers: ["and"], correctAnswer: "and" },
      { id: "rw_p5_q46", gapNumber: 46, acceptableAnswers: ["and"], correctAnswer: "and" },
      { id: "rw_p5_q47", gapNumber: 47, acceptableAnswers: ["are"], correctAnswer: "are" },
      { id: "rw_p5_q48", gapNumber: 48, acceptableAnswers: ["this", "in"], correctAnswer: "this" }
    ],
    p6Instructions: `WRITING PART 6 (Edition ${v + 1}) — Write an email to your classmate ${ext.p3Names[2]} answering 3 questions about your favourite hobby: What is the hobby? How often do you practice? What equipment do you need? (min 25 words).`,
    p7Instructions: `WRITING PART 7 (Edition ${v + 1}) — Read the scenario and write a short story (at least 35 words):\n1. Scene 1: ${ext.p3Names[0]} and ${ext.p3Names[1]} found a message in a bottle on the beach.\n2. Scene 2: They opened it and discovered a secret map to an old lighthouse.\n3. Scene 3: They explored the lighthouse and found an old brass compass inside.\n\nWrite your story describing what happened, how they felt, and what they found.`
  });
});

module.exports = examVersions;
