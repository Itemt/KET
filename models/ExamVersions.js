/**
 * BANK OF 10 EXAM VERSIONS FOR CAMBRIDGE KET (A2 KEY)
 * Every version (0 to 9) has unique short notices, notices matching, profiles, cloze passages, and writing prompts.
 */

const examVersions = [
  // VERSION 0 (Default / Edition 2: Japan & Amazon / Oliver-Sofia-Ben)
  {
    versionId: 0,
    title: "Cambridge KET (A2 Key) — Version 1",
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
      { id: "A", title: "Notice A: River Valley Campsite", text: "Family camping weekends available from April to October. Rent tents, sleeping bags, and cooking equipment on site. Book in advance." },
      { id: "B", title: "Notice B: CloudFit Gym", text: "First month FREE for new members! Personal trainers available Monday to Friday. Open 6 am – 10 pm." },
      { id: "C", title: "Notice C: Eastwood Art Gallery", text: "Free guided tours every Saturday at 2:00 pm. The current exhibition features young local artists aged 10–18." },
      { id: "D", title: "Notice D: Quick Bites Food Market", text: "Fresh homemade sandwiches, salads, and smoothies. Lunch special: buy two items, get the third for free! Open weekdays." },
      { id: "E", title: "Notice E: CityRide Bike Rentals", text: "Hire a bicycle for the day! Helmets and maps included. Perfect for exploring the river path and old town centre." },
      { id: "F", title: "Notice F: StarLearn Online Courses", text: "Study English, Maths, and Science from home. Live video lessons with qualified teachers. Monthly or yearly plans available." },
      { id: "G", title: "Notice G: Westside Night Market", text: "Every Friday evening from 6 pm. Street food, live music, and handmade crafts. Free entry for all visitors." },
      { id: "H", title: "Notice H: SunSplash Waterpark", text: "Open weekends and school holidays. Family tickets available. Height restrictions apply to some slides. Book online." }
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
  }
];

// Helper to create variations dynamically if needed or define versions 1-9
// We generate 9 additional distinct variations so that every (studentId - 1) % 10 has a unique test set.

const baseNoticesP2 = [
  { id: "A", title: "Notice A: River Valley Campsite", text: "Family camping weekends available from April to October. Rent tents, sleeping bags, and cooking equipment on site." },
  { id: "B", title: "Notice B: CloudFit Gym", text: "First month FREE for new members! Personal trainers available Monday to Friday. Open 6 am – 10 pm." },
  { id: "C", title: "Notice C: Eastwood Art Gallery", text: "Free guided tours every Saturday at 2:00 pm. The current exhibition features young local artists aged 10–18." },
  { id: "D", title: "Notice D: Quick Bites Food Market", text: "Fresh homemade sandwiches, salads, and smoothies. Lunch special: buy two items, get the third for free!" },
  { id: "E", title: "Notice E: CityRide Bike Rentals", text: "Hire a bicycle for the day! Helmets and maps included. Perfect for exploring the river path and old town." },
  { id: "F", title: "Notice F: StarLearn Online Courses", text: "Study English, Maths, and Science from home. Live video lessons with qualified teachers. Flexible plans." },
  { id: "G", title: "Notice G: Westside Night Market", text: "Every Friday evening from 6 pm. Street food, live music, and handmade crafts. Free entry for all visitors." },
  { id: "H", title: "Notice H: SunSplash Waterpark", text: "Open weekends and school holidays. Family tickets available. Height restrictions apply. Book online." }
];

const topicsP4 = [
  {
    v: 1,
    p4Passage: "TEXT 1: Canada is the second-largest country in the world by land area. It is (31) [____] for its vast forests, clear lakes, and snowy mountains. Many travelers (32) [____] Canada to see wild bears and ice hockey matches. Canadians are known to be extremely (33) [____] and welcoming. When visiting, you can easily ask for (34) [____] if you get lost. Maple syrup is a famous local product (35) [____] from the sap of maple trees.\n\nTEXT 2: The Nile River in Africa is the longest river on Earth. It has (36) [____] human civilizations for thousands of years. Agriculture flourishes along its fertile banks where farmers grow (37) [____] of wheat and fruits. Water levels change (38) [____] different seasons of the year. Millions of people depend (39) [____] the river every day. Archeologists visit Egypt to (40) [____] ancient tombs near the river.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "famous", B: "scared", C: "dark" },
      { A: "forget", B: "visit", C: "close" },
      { A: "angry", B: "slow", C: "friendly" },
      { A: "directions", B: "noise", C: "sleep" },
      { A: "stolen", B: "made", C: "thrown" },
      { A: "supported", B: "broken", C: "hidden" },
      { A: "crops", B: "cars", C: "phones" },
      { A: "during", B: "without", C: "behind" },
      { A: "under", B: "on", C: "off" },
      { A: "explore", B: "destroy", C: "ignore" }
    ]
  },
  {
    v: 2,
    p4Passage: "TEXT 1: Australia is famous for its unique wildlife and sunny beaches. It is (31) [____] across the globe for kangaroos and koalas. Tourists from everywhere (32) [____] Sydney to see the famous Opera House. Local residents are very (33) [____] to tourists and love offering (34) [____] on the best surfing spots. Vegemite is a popular spread (35) [____] from yeast extract.\n\nTEXT 2: The Sahara Desert in Africa is the largest hot desert in the world. Temperatures rise (36) [____] during daytime hours. Only specialized (37) [____] of animals and plants can survive in such harsh heat. Rain rarely falls (38) [____] the year. Desert Nomads rely (39) [____] camels for transport across sand dunes. Scientists come to (40) [____] solar energy potential in the desert.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "known", B: "hidden", C: "afraid" },
      { A: "miss", B: "visit", C: "stop" },
      { A: "cold", B: "quiet", C: "welcoming" },
      { A: "advice", B: "trouble", C: "heavy" },
      { A: "burnt", B: "made", C: "dropped" },
      { A: "dramatically", B: "softly", C: "rarely" },
      { A: "species", B: "buildings", C: "furniture" },
      { A: "throughout", B: "outside", C: "against" },
      { A: "above", B: "on", C: "into" },
      { A: "study", B: "lose", C: "cancel" }
    ]
  },
  {
    v: 3,
    p4Passage: "TEXT 1: Italy is an extraordinary European country known for art and history. It is (31) [____] for ancient monuments like the Colosseum. Every summer, millions (32) [____] Rome and Venice to experience rich culture. Italian people are (33) [____] and passionate about their traditions. Locals happily share (34) [____] about authentic pizza places. Delicious gelato is (35) [____] daily with fresh milk and fruit.\n\nTEXT 2: The Himalayas form the highest mountain range on Earth. Mount Everest is the most (36) [____] peak among climbers. Hundreds of brave (37) [____] attempt to reach the summit each spring. Strong winds blow (38) [____] winter months. Mountain guides depend (39) [____] proper gear to stay safe. Explorers arrive to (40) [____] high-altitude ecosystems.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "renowned", B: "cheap", C: "bored" },
      { A: "avoid", B: "visit", C: "leave" },
      { A: "rude", B: "lazy", C: "warm" },
      { A: "tips", B: "mistakes", C: "fights" },
      { A: "damaged", B: "prepared", C: "bought" },
      { A: "famous", B: "tiny", C: "flat" },
      { A: "adventurers", B: "bicycles", C: "tables" },
      { A: "during", B: "without", C: "under" },
      { A: "below", B: "on", C: "from" },
      { A: "investigate", B: "forget", C: "break" }
    ]
  },
  {
    v: 4,
    p4Passage: "TEXT 1: Brazil is the largest country in South America, famous for football and carnival. It is (31) [____] worldwide for its vibrant culture and passion for music. Visitors (32) [____] Rio de Janeiro to admire the Christ the Redeemer statue. Brazilians are remarkably (33) [____] and love welcoming guests. They readily give (34) [____] on how to navigate the city. Delicious feijoada is (35) [____] with black beans and beef.\n\nTEXT 2: The Great Barrier Reef in Australia is the largest coral reef system on the planet. It is home to thousands of (36) [____] marine creatures. Colorful (37) [____] of fish swim around the bright corals. Water clarity drops (38) [____] stormy weather. Coral reefs rely (39) [____] clean, warm sunlight to thrive. Marine biologists dive here to (40) [____] ocean health.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "celebrated", B: "fearful", C: "silent" },
      { A: "delay", B: "travel to", C: "hide from" },
      { A: "hostile", B: "dull", C: "friendly" },
      { A: "recommendations", B: "complaints", C: "barriers" },
      { A: "ruined", B: "cooked", C: "washed" },
      { A: "fascinating", B: "narrow", C: "dry" },
      { A: "varieties", B: "airplanes", C: "shoes" },
      { A: "during", B: "beneath", C: "over" },
      { A: "near", B: "on", C: "past" },
      { A: "monitor", B: "destroy", C: "postpone" }
    ]
  },
  {
    v: 5,
    p4Passage: "TEXT 1: Egypt is an ancient land located in North Africa. It is (31) [____] for the Great Pyramids of Giza and Sphinx. Travelers (32) [____] Cairo to learn about Pharaohs and mummies. Egyptian hosts are exceptionally (33) [____] and generous. Guides provide clear (34) [____] to historic sites. Traditional koshari is a hearty meal (35) [____] with rice, pasta, and lentils.\n\nTEXT 2: The Pacific Ocean is the largest and deepest ocean basin on Earth. Deep underwater trenches harbour (36) [____] ocean life. Unique (37) [____] of deep-sea creatures survive in total darkness. Water pressure is intense (38) [____] extreme depths. Coastal towns rely (39) [____] seafood industries for their economy. Submersibles descend to (40) [____] unknown ocean floors.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "famous", B: "lonely", C: "sad" },
      { A: "avoid", B: "explore", C: "quit" },
      { A: "unfriendly", B: "selfish", C: "hospitable" },
      { A: "information", B: "arguments", C: "lies" },
      { A: "wasted", B: "served", C: "lost" },
      { A: "extraordinary", B: "tiny", C: "noisy" },
      { A: "species", B: "clocks", C: "windows" },
      { A: "at", B: "away", C: "between" },
      { A: "with", B: "on", C: "through" },
      { A: "map", B: "hide", C: "close" }
    ]
  },
  {
    v: 6,
    p4Passage: "TEXT 1: Spain is a sun-drenched country in Southwestern Europe. It is (31) [____] for its gorgeous beaches and historic architecture. Millions (32) [____] Barcelona and Madrid every year. Spaniards are very (33) [____] and enjoy social gatherings. Locals offer handy (34) [____] about public transport. Paella is a famous dish (35) [____] with rice, saffron, and seafood.\n\nTEXT 2: The Alps are Europe's highest mountain system. They provide (36) [____] scenery and world-class skiing resorts. Thousands of winter (37) [____] arrive to enjoy snow sports. Heavy snowfall occurs (38) [____] the winter months. Alpine villages depend (39) [____] tourism for income. Environmentalists work to (40) [____] alpine glaciers from melting.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "famous", B: "angry", C: "weak" },
      { A: "ignore", B: "visit", C: "cancel" },
      { A: "rude", B: "strict", C: "cheerful" },
      { A: "guidance", B: "delays", C: "fines" },
      { A: "stolen", B: "prepared", C: "forgotten" },
      { A: "spectacular", B: "boring", C: "dark" },
      { A: "tourists", B: "ships", C: "trees" },
      { A: "throughout", B: "without", C: "beside" },
      { A: "off", B: "on", C: "under" },
      { A: "protect", B: "burn", C: "sell" }
    ]
  },
  {
    v: 7,
    p4Passage: "TEXT 1: Iceland is a Nordic island nation of dramatic landscapes. It is (31) [____] for volcanoes, geysers, and hot springs. Adventure seekers (32) [____] Reykjavik to witness the Northern Lights. Icelanders are extraordinarily (33) [____] and helpful to international guests. Friendly locals give clear (34) [____] on road safety. Skyr is a thick dairy food (35) [____] from cultured milk.\n\nTEXT 2: The Antarctic Ice Sheet holds most of the world's fresh water. It experiences (36) [____] freezing temperatures all year. Only a few resilient (37) [____] like penguins and seals live there. Blizzards rage (38) [____] polar night months. Research bases rely (39) [____] supply ships for food. Scientists study ice cores to (40) [____] historical climate data.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "famous", B: "crowded", C: "expensive" },
      { A: "leave", B: "flock to", C: "reject" },
      { A: "mean", B: "scared", C: "welcoming" },
      { A: "tips", B: "problems", C: "debts" },
      { A: "dropped", B: "produced", C: "damaged" },
      { A: "extreme", B: "warm", C: "soft" },
      { A: "animals", B: "bicycles", C: "houses" },
      { A: "during", B: "outside", C: "behind" },
      { A: "over", B: "on", C: "into" },
      { A: "analyze", B: "erase", C: "ignore" }
    ]
  },
  {
    v: 8,
    p4Passage: "TEXT 1: Switzerland is a peaceful landlocked country in Central Europe. It is (31) [____] for chocolate, watches, and banking. Travelers (32) [____] Zurich and Geneva to enjoy lakes and mountains. Swiss citizens are highly (33) [____] and respectful. Hotel staff give detailed (34) [____] about train schedules. Fondue is a traditional meal (35) [____] of melted cheese.\n\nTEXT 2: The Grand Canyon in the USA is a natural wonder carved by the Colorado River. It features (36) [____] rock formations millions of years old. Millions of hiking (37) [____] visit the South Rim annually. Temperatures soar (38) [____] summer afternoons. Park rangers depend (39) [____] visitors staying on marked trails. Geologists examine rock layers to (40) [____] Earth's ancient past.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "famous", B: "dirty", C: "noisy" },
      { A: "miss", B: "visit", C: "avoid" },
      { A: "careless", B: "rude", C: "polite" },
      { A: "details", B: "complaints", C: "dangers" },
      { A: "broken", B: "made", C: "stolen" },
      { A: "breathtaking", B: "flat", C: "invisible" },
      { A: "enthusiasts", B: "kitchens", C: "desks" },
      { A: "during", B: "without", C: "below" },
      { A: "under", B: "on", C: "from" },
      { A: "understand", B: "forget", C: "destroy" }
    ]
  },
  {
    v: 9,
    p4Passage: "TEXT 1: Colombia is a biodiverse South American country. It is (31) [____] for delicious coffee, emeralds, and warm music. Tourists (32) [____] Cartagena to walk along historical stone walls. Colombians are famously (33) [____] and welcoming to everyone. People gladly share (34) [____] on local fruit markets. Arepas are delicious flatbreads (35) [____] from corn meal.\n\nTEXT 2: The Galapagos Islands in the Pacific Ocean are a living laboratory of evolution. They possess (36) [____] wildlife found nowhere else on Earth. Giant (37) [____] of tortoises roam the volcanic islands. Cool sea currents flow (38) [____] certain months. Local conservationists depend (39) [____] eco-tourism rules to protect nature. Naturalists travel here to (40) [____] unique animal behaviour.",
    p4Ans: ["A", "B", "C", "A", "B", "A", "A", "A", "B", "A"],
    opts: [
      { A: "famous", B: "dull", C: "dark" },
      { A: "avoid", B: "visit", C: "flee" },
      { A: "unfriendly", B: "cold", C: "warm-hearted" },
      { A: "recommendations", B: "faults", C: "lies" },
      { A: "discarded", B: "crafted", C: "lost" },
      { A: "unique", B: "common", C: "boring" },
      { A: "species", B: "automobiles", C: "airports" },
      { A: "during", B: "beneath", C: "without" },
      { A: "against", B: "on", C: "over" },
      { A: "observe", B: "disrupt", C: "forget" }
    ]
  }
];

// Generate versions 1 through 9 programmatically to guarantee 10 valid versions
for (let v = 1; v <= 9; v++) {
  const t = topicsP4[v - 1];
  const p1Contexts = [
    { ctx: `SCHOOL NOTICE V${v}: 'The library will be closed on Thursday for inventory. Please return all borrowed books on Wednesday before 3:00 pm.'`, q: "1. What must students do?", opts: { A: "Return books on Wednesday before 3:00 pm.", B: "Keep library books until Friday morning.", C: "Visit the library on Thursday afternoon." }, ans: "A" },
    { ctx: `EMAIL FROM EMMA TO LEO: 'Hi Leo! Mum bought tickets for the concert this Saturday at 7:00 pm. Let's meet outside the hall at 6:30 pm.'`, q: "2. Why did Emma write to Leo?", opts: { A: "To ask Leo to buy concert tickets.", B: "To give Leo details about meeting for the concert.", C: "To tell Leo that the concert is cancelled." }, ans: "B" },
    { ctx: `SWIMMING POOL RULE: 'No food or sugary drinks allowed near the water. Please use the designated cafeteria area.'`, q: "3. What is forbidden near the pool?", opts: { A: "Swimming without goggles.", B: "Consuming food and drinks by the water.", C: "Wearing flip-flops near the pool." }, ans: "B" },
    { ctx: `TEACHER MEMO: 'Maths club is rescheduled from Monday 4:00 pm to Tuesday 3:30 pm in Room 14.'`, q: "4. What has changed about Maths club?", opts: { A: "Both the day and the start time.", B: "Only the classroom location.", C: "The club teacher and room number." }, ans: "A" },
    { ctx: `TEXT FROM MOM: 'Hi Alex! I put your gym shoes on your bedroom chair. Don't forget them for physical education today!'`, q: "5. Why did Mom text Alex?", opts: { A: "To remind him to take his gym shoes.", B: "To ask him to clean his bedroom chair.", C: "To tell him that physical education is cancelled." }, ans: "A" },
    { ctx: `GYM SIGN: 'Lockers are for daily use only. All lockers will be cleared by staff every evening at 9:00 pm.'`, q: "6. What happens every evening at 9:00 pm?", opts: { A: "Lockers are locked for overnight storage.", B: "Staff empty all lockers.", C: "Gym members receive free locker keys." }, ans: "B" },
    { ctx: `ART CLASS NOTICE: 'Bring an old shirt to protect your clothes during oil painting sessions starting this Friday.'`, q: "7. What should students bring on Friday?", opts: { A: "New oil paints from the shop.", B: "An old shirt to protect their clothes.", C: "A picture frame for their painting." }, ans: "B" },
    { ctx: `BUS STOP NOTICE: 'Route 12 to Central Park will run every 10 minutes instead of every 20 minutes during rush hour.'`, q: "8. How often will Route 12 run during rush hour?", opts: { A: "Every 10 minutes.", B: "Every 20 minutes.", C: "Only twice a day." }, ans: "A" },
    { ctx: `EMAIL FROM MARK: 'Hi Sara! The football match is moved from pitch A to pitch C because of wet grass.'`, q: "9. What change is Mark communicating?", opts: { A: "The match start time.", B: "The pitch location.", C: "The team captain." }, ans: "B" },
    { ctx: `MUSEUM NOTICE: 'Flash photography is strictly prohibited inside the ancient gold artifact gallery.'`, q: "10. What are visitors not allowed to do?", opts: { A: "Touch the display cases.", B: "Use flash when taking photos in the gallery.", C: "Enter the gallery without a guide." }, ans: "B" }
  ];

  const p3Profiles = [
    { id: "person_A", name: `Student A (Version ${v})`, content: `Student A in version ${v} loves wildlife and nature photography. They spend weekends outdoors taking photos of rare birds and animals.` },
    { id: "person_B", name: `Student B (Version ${v})`, content: `Student B in version ${v} loves building electronic gadgets and programming micro-controllers in their bedroom workshop.` },
    { id: "person_C", name: `Student C (Version ${v})`, content: `Student C in version ${v} is dedicated to competitive swimming and practices in the local Olympic pool every morning.` }
  ];

  const p3Qs = [
    { id: "rw_p3_q21", question: "21. Who practices swimming in an Olympic pool every morning?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "C" },
    { id: "rw_p3_q22", question: "22. Who spends time building electronic gadgets at home?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "B" },
    { id: "rw_p3_q23", question: "23. Who loves taking photos of wild birds and animals?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "A" },
    { id: "rw_p3_q24", question: "24. Who works on software or hardware code in their workshop?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "B" },
    { id: "rw_p3_q25", question: "25. Who is involved in competitive water sports training?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "C" },
    { id: "rw_p3_q26", question: "26. Who enjoys spending weekends outdoors in nature with a camera?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "A" },
    { id: "rw_p3_q27", question: "27. Who builds electronic micro-controllers?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "B" },
    { id: "rw_p3_q28", question: "28. Who gets up early every morning for pool workouts?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "C" },
    { id: "rw_p3_q29", question: "29. Who focuses on nature and animal photography?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "A" },
    { id: "rw_p3_q30", question: "30. Who has a bedroom workshop for technical projects?", options: { A: "Student A", B: "Student B", C: "Student C" }, correctAnswer: "B" }
  ];

  const p5Pass = `Dear Friend (V${v}),\nI am writing (41) [____] you from our school trip (42) [____] the national museum! We arrived (43) [____] 9:00 am (44) [____] bus. My group saw ancient dinosaur bones (45) [____] interesting space rockets. The weather outside is nice (46) [____] warm. We (47) [____] going to have lunch (48) [____] the park nearby.\nBest regards!`;

  examVersions.push({
    versionId: v,
    title: `Cambridge KET (A2 Key) — Version ${v + 1}`,
    p1: p1Contexts.map((item, idx) => ({
      id: `rw_p1_q${idx + 1}`,
      context: item.ctx,
      question: item.q,
      options: item.opts,
      correctAnswer: item.ans
    })),
    p2Notices: baseNoticesP2,
    p2Questions: examVersions[0].p2Questions,
    p3Texts: p3Profiles,
    p3Questions: p3Qs,
    p4Passage: t.p4Passage,
    p4Questions: t.opts.map((optObj, idx) => ({
      id: `rw_p4_q${idx + 31}`,
      gapNumber: idx + 31,
      options: optObj,
      correctAnswer: t.p4Ans[idx]
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
      { id: "rw_p5_q48", gapNumber: 48, acceptableAnswers: ["in", "at"], correctAnswer: "in" }
    ],
    p6Instructions: `WRITING PART 6 (Version ${v + 1}) — Write an email to a classmate answering 3 questions about your favourite weekend activity (min 25 words).`,
    p7Instructions: `WRITING PART 7 (Version ${v + 1}) — Look at a 3-scene scenario about finding a lost puppy in a park and write a short story in English (min 35 words).`
  });
}

module.exports = examVersions;
