/**
 * MAESTRO DE 3 VERSIONES DE LISTENING KET (A2 KEY) - AUDIOS 1, 2, 3, 4 Y 5
 * Cada versión contiene 125 preguntas de Listening divididas en los 5 Audios:
 * - Audio 1: /audio/audio1.mp3 (Technology Summer Camp) -> 25 preguntas (Q1-Q25)
 * - Audio 2: /audio/audio2.mp3 (School Stress & Healthy Habits) -> 25 preguntas (Q26-Q50)
 * - Audio 3: /audio/audio3.mp3 (End-of-term Party Dialogue: Sarah & Tom) -> 25 preguntas (Q51-Q75)
 * - Audio 4: /audio/audio4.mp3 (Mega Tech & Nature Park School Trip) -> 25 preguntas (Q76-Q100)
 * - Audio 5: /audio/audio5.mp3 (Annual Young Inventors Competition) -> 25 preguntas (Q101-Q125)
 * Total por versión: 125 preguntas de Listening (375 preguntas únicas en total)
 */

const listeningVersions = [
  /* ==========================================================================
     VERSION 0 (Set A - 125 Preguntas KET)
     ========================================================================== */
  {
    versionId: 0,
    title: "Cambridge KET Listening (Set A)",
    audios: [
      {
        id: "audio1",
        audioUrl: "/audio/audio1.mp3",
        audioTitle: "Audio 1: Technology Summer Camp Announcement",
        parts: [
          {
            part: 1,
            title: "Audio 1 — Part 1: Multiple Choice (Questions 1–5)",
            instructions: "Listen to the announcement about the Technology Summer Camp. For questions 1–5, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q1", question: "1. What month is the Technology Summer Camp held this year?", options: { A: "August", B: "July", C: "June" }, correctAnswer: "B" },
              { id: "listening_q2", question: "2. What time does the bus leave from the school gate?", options: { A: "8:00 AM", B: "8:15 AM", C: "9:00 AM" }, correctAnswer: "B" },
              { id: "listening_q3", question: "3. How much do students from this school pay for the camp?", options: { A: "50 dollars", B: "30 dollars", C: "8 dollars" }, correctAnswer: "B" },
              { id: "listening_q4", question: "4. What must students bring for writing code and taking notes?", options: { A: "A laptop", B: "A notebook and a pen", C: "A tablet" }, correctAnswer: "B" },
              { id: "listening_q5", question: "5. What main project will students build during the camp this year?", options: { A: "Video games", B: "A Smart Robot", C: "A new drone" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 1 — Part 2: Information Completion (Questions 6–10)",
            instructions: "Listen to the announcement and complete questions 6–10. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q6", gapNumber: 6, label: "Camp Location:", prompt: "City ______ Center", correctAnswer: "science", acceptableAnswers: ["science", "Science"] },
              { id: "listening_q7", gapNumber: 7, label: "Start Date:", prompt: "July ______", correctAnswer: "15", acceptableAnswers: ["15", "15th", "15th of july"] },
              { id: "listening_q8", gapNumber: 8, label: "Morning Programming Teacher:", prompt: "Mr. ______", correctAnswer: "davis", acceptableAnswers: ["davis", "Davis"] },
              { id: "listening_q9", gapNumber: 9, label: "Afternoon Hardware Teacher:", prompt: "Miss ______", correctAnswer: "taylor", acceptableAnswers: ["taylor", "Taylor"] },
              { id: "listening_q10", gapNumber: 10, label: "School Secretary:", prompt: "Mrs. ______", correctAnswer: "smith", acceptableAnswers: ["smith", "Smith"] }
            ]
          },
          {
            part: 3,
            title: "Audio 1 — Part 3: Monologue Comprehension (Questions 11–15)",
            instructions: "Listen to Audio 1 again. For questions 11–15, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q11", question: "11. Why shouldn't students buy lunch at the center's cafeteria?", options: { A: "The cafeteria is closed in July.", B: "A simple sandwich costs 8 dollars.", C: "They only sell sweet sodas." }, correctAnswer: "B" },
              { id: "listening_q12", question: "12. Which drink is allowed at the summer camp?", options: { A: "Sweet soda", B: "Water", C: "Energy drinks" }, correctAnswer: "B" },
              { id: "listening_q13", question: "13. What clothes should students wear to the camp?", options: { A: "School uniform", B: "Comfortable clothes like jeans and t-shirts", C: "Formal suits" }, correctAnswer: "B" },
              { id: "listening_q14", question: "14. Why are sandals NOT allowed in the laboratory?", options: { A: "Because students work with heavy metal pieces and cables.", B: "Because of hot weather.", C: "Because of wet floors." }, correctAnswer: "A" },
              { id: "listening_q15", question: "15. What time can parents come to watch the robot competition on July 25th?", options: { A: "3:00 PM", B: "4:00 PM", C: "5:00 PM" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 1 — Part 4: Detailed Comprehension (Questions 16–20)",
            instructions: "For questions 16–20, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q16", question: "16. When was the Technology Summer Camp held last year?", options: { A: "In July", B: "In August", C: "In September" }, correctAnswer: "B" },
              { id: "listening_q17", question: "17. What time must students be at the school gate in the morning?", options: { A: "8:00 AM sharp", B: "8:15 AM", C: "8:30 AM" }, correctAnswer: "A" },
              { id: "listening_q18", question: "18. What does the 30 dollar price include?", options: { A: "Lunch and a laptop", B: "Bus transport and use of computers", C: "A drone and shoes" }, correctAnswer: "B" },
              { id: "listening_q19", question: "19. What will students do in the morning from 9:00 AM to 12:00 PM?", options: { A: "Build robot hardware", B: "Learn programming with Mr. Davis", C: "Eat lunch at the cafeteria" }, correctAnswer: "B" },
              { id: "listening_q20", question: "20. What special prize will the winning team receive in the competition?", options: { A: "A new laptop", B: "A new drone", C: "50 dollars cash" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 1 — Part 5: Matching & Rules Details (Questions 21–25)",
            instructions: "For questions 21–25, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q21", question: "21. When is the deadline to submit the money and permission form?", options: { A: "Before next Friday, the 12th", B: "July 15th", C: "July 25th" }, correctAnswer: "A" },
              { id: "listening_q22", question: "22. Who should receive the money and permission form?", options: { A: "The teacher speaking", B: "Mrs. Smith (school secretary)", C: "Mr. Davis" }, correctAnswer: "B" },
              { id: "listening_q23", question: "23. How is the word 'Robot' spelled in the announcement?", options: { A: "R-O-B-B-O-T", B: "R-O-B-O-T", C: "R-O-B-E-T" }, correctAnswer: "B" },
              { id: "listening_q24", question: "24. What type of footwear MUST students wear in the laboratory?", options: { A: "Sandals", B: "Open shoes", C: "Closed shoes like trainers" }, correctAnswer: "C" },
              { id: "listening_q25", question: "25. What project did students make at the camp LAST YEAR?", options: { A: "Smart robots", B: "Video games", C: "Drones" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio2",
        audioUrl: "/audio/audio2.mp3",
        audioTitle: "Audio 2: School Stress and Healthy Habits (Leo's Presentation)",
        parts: [
          {
            part: 1,
            title: "Audio 2 — Part 1: Health & Symptoms (Questions 26–30)",
            instructions: "Listen to Leo talking about school stress and healthy habits. For questions 26–30, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q26", question: "26. What health problem did Leo suffer from every single day last month?", options: { A: "Stomach ache", B: "Terrible headaches", C: "Back pain" }, correctAnswer: "B" },
              { id: "listening_q27", question: "27. What time does Leo go to sleep now after changing his routine?", options: { A: "Midnight", B: "9:00 PM", C: "9:30 PM" }, correctAnswer: "C" },
              { id: "listening_q28", question: "28. How much did each energy drink cost when Leo used to buy them?", options: { A: "2.00 dollars", B: "2.50 dollars", C: "5.00 dollars" }, correctAnswer: "B" },
              { id: "listening_q29", question: "29. Why did Leo stop playing football for the school team?", options: { A: "Because he hates football", B: "Because his left leg still hurts from an accident", C: "Because the team was cancelled" }, correctAnswer: "B" },
              { id: "listening_q30", question: "30. Who helps Leo with Math on Sunday mornings?", options: { A: "His Math teacher, Mr. Brown", B: "His older sister, Emma", C: "His best friend, Mark" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 2 — Part 2: Information Completion (Questions 31–35)",
            instructions: "Listen to Leo and complete questions 31–35. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q31", gapNumber: 31, label: "Phone Turn-Off Time:", prompt: "______ PM", correctAnswer: "9:00", acceptableAnswers: ["9:00", "9", "9:00 pm", "9:00 PM"] },
              { id: "listening_q32", gapNumber: 32, label: "Natural Drink:", prompt: "Orange ______", correctAnswer: "juice", acceptableAnswers: ["juice", "Juice"] },
              { id: "listening_q33", gapNumber: 33, label: "New Hobby / Sport:", prompt: "______", correctAnswer: "swimming", acceptableAnswers: ["swimming", "Swimming"] },
              { id: "listening_q34", gapNumber: 34, label: "Swimming Days:", prompt: "Tuesdays and ______", correctAnswer: "thursdays", acceptableAnswers: ["thursdays", "Thursdays", "thursday", "Thursday"] },
              { id: "listening_q35", gapNumber: 35, label: "Sister Emma's Age:", prompt: "______ years old", correctAnswer: "19", acceptableAnswers: ["19", "nineteen"] }
            ]
          },
          {
            part: 3,
            title: "Audio 2 — Part 3: Habits & Friendships (Questions 36–40)",
            instructions: "Listen to Audio 2 again. For questions 36–40, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q36", question: "36. Why did Leo use to go to bed at midnight in the past?", options: { A: "He was watching TV.", B: "He was chatting with friends on his phone.", C: "He was studying at school." }, correctAnswer: "B" },
              { id: "listening_q37", question: "37. Who advised Leo to stop drinking energy drinks?", options: { A: "His mother", B: "The school doctor", C: "His sister Emma" }, correctAnswer: "B" },
              { id: "listening_q38", question: "38. Who makes natural orange juice for Leo now?", options: { A: "His mother", B: "The school doctor", C: "Himself" }, correctAnswer: "A" },
              { id: "listening_q39", question: "39. What time does Leo go swimming on Tuesdays and Thursdays?", options: { A: "4:15 PM", B: "5:15 PM", C: "6:30 PM" }, correctAnswer: "B" },
              { id: "listening_q40", question: "40. What will Leo and Mark do together this Saturday afternoon?", options: { A: "Play football", B: "Go swimming", C: "Play video games" }, correctAnswer: "C" }
            ]
          },
          {
            part: 4,
            title: "Audio 2 — Part 4: Detailed Comprehension (Questions 41–45)",
            instructions: "For questions 41–45, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q41", question: "41. How long did Leo and Mark refrain from speaking after their fight?", options: { A: "For one day", B: "For a week", C: "For a month" }, correctAnswer: "B" },
              { id: "listening_q42", question: "42. How did Leo apologise to Mark yesterday?", options: { A: "He sent him a text message.", B: "He wrote him an email to say sorry.", C: "He called him on the phone." }, correctAnswer: "B" },
              { id: "listening_q43", question: "43. Why didn't Leo ask Mr. Brown for help with Math?", options: { A: "Mr. Brown was angry.", B: "Mr. Brown is always very busy.", C: "Mr. Brown left the school." }, correctAnswer: "B" },
              { id: "listening_q44", question: "44. Where does Leo's sister Emma study?", options: { A: "At high school", B: "At university", C: "At a sports center" }, correctAnswer: "B" },
              { id: "listening_q45", question: "45. What is Leo's main advice at the end of his talk?", options: { A: "Keep your stress a secret.", B: "Talk to someone if you feel stressed.", C: "Stop playing video games." }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 2 — Part 5: Final Review & Advice (Questions 46–50)",
            instructions: "For questions 46–50, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q46", question: "46. What symptom did Leo NOT have during his exam preparation?", options: { A: "Tired eyes", B: "Headaches", C: "Stomach ache" }, correctAnswer: "C" },
              { id: "listening_q47", question: "47. How many energy drinks did Leo use to drink every day?", options: { A: "One", B: "Two", C: "Three" }, correctAnswer: "B" },
              { id: "listening_q48", question: "48. On which days of the week does Leo NOT go swimming?", options: { A: "Tuesdays and Thursdays", B: "Mondays and Wednesdays", C: "Saturdays and Sundays" }, correctAnswer: "B" },
              { id: "listening_q49", question: "49. What school subject is very hard for Leo?", options: { A: "English", B: "Math", C: "Science" }, correctAnswer: "B" },
              { id: "listening_q50", question: "50. When does Emma help Leo with his studies?", options: { A: "Saturday afternoons", B: "Sunday mornings", C: "Friday nights" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio3",
        audioUrl: "/audio/audio3.mp3",
        audioTitle: "Audio 3: End-of-term Party Dialogue (Sarah & Tom)",
        parts: [
          {
            part: 1,
            title: "Audio 3 — Part 1: Party Details & Chores (Questions 51–55)",
            instructions: "Listen to the dialogue between Sarah and Tom about the party. For questions 51–55, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q51", question: "51. What date is Sarah's end-of-term party taking place?", options: { A: "Saturday the 12th", B: "Saturday the 15th", C: "Sunday the 16th" }, correctAnswer: "B" },
              { id: "listening_q52", question: "52. Why did Tom's mom initially say no to the party?", options: { A: "He didn't study for exams", B: "His bedroom was very messy", C: "He was sick" }, correctAnswer: "B" },
              { id: "listening_q53", question: "53. Whose job is it to take out the trash at Tom's house?", options: { A: "Tom's", B: "Tom's older brother's", C: "Tom's mother's" }, correctAnswer: "B" },
              { id: "listening_q54", question: "54. What time must everyone leave Sarah's house by?", options: { A: "8:00 PM", B: "8:30 PM", C: "9:00 PM" }, correctAnswer: "B" },
              { id: "listening_q55", question: "55. Why will Tom arrive at the party at 4:30 PM instead of 4:00 PM?", options: { A: "He has a football match", B: "He has a piano lesson at 3:30 PM", C: "He takes the bus" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 3 — Part 2: Information Completion (Questions 56–60)",
            instructions: "Listen to the dialogue and complete questions 56–60. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q56", gapNumber: 56, label: "Party Location:", prompt: "Living ______", correctAnswer: "room", acceptableAnswers: ["room", "Room"] },
              { id: "listening_q57", gapNumber: 57, label: "Pizza Quantity:", prompt: "______ large pizzas", correctAnswer: "3", acceptableAnswers: ["3", "three", "Three"] },
              { id: "listening_q58", gapNumber: 58, label: "Drinks Supplier:", prompt: "______", correctAnswer: "leo", acceptableAnswers: ["leo", "Leo"] },
              { id: "listening_q59", gapNumber: 59, label: "Snack Tom is bringing:", prompt: "Potato ______", correctAnswer: "chips", acceptableAnswers: ["chips", "Chips"] },
              { id: "listening_q60", gapNumber: 60, label: "Shoe Leaving Location:", prompt: "In the ______", correctAnswer: "hall", acceptableAnswers: ["hall", "Hall"] }
            ]
          },
          {
            part: 3,
            title: "Audio 3 — Part 3: Dialogue Comprehension (Questions 61–65)",
            instructions: "Listen to Audio 3 again. For questions 61–65, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q61", question: "61. Why is the party taking place inside the living room instead of the garden?", options: { A: "Because of rain", B: "Because it is too hot outside in the afternoon", C: "Because the garden is under repair" }, correctAnswer: "B" },
              { id: "listening_q62", question: "62. Who is paying for the three large pizzas?", options: { A: "Anna", B: "Sarah's parents", C: "Tom and Leo" }, correctAnswer: "B" },
              { id: "listening_q63", question: "63. What is Mark bringing to the party?", options: { A: "A video game console to play racing games", B: "Drinks", C: "Potato chips" }, correctAnswer: "A" },
              { id: "listening_q64", question: "64. What is Mia bringing to Sarah's party?", options: { A: "The music speaker", B: "The fan", C: "The pizzas" }, correctAnswer: "A" },
              { id: "listening_q65", question: "65. What important house rule did Sarah mention?", options: { A: "No loud music", B: "Mustn't wear shoes inside the living room", C: "Must leave by 7:00 PM" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 3 — Part 4: Detailed Comprehension (Questions 66–70)",
            instructions: "For questions 66–70, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q66", question: "66. What two chores did Tom's mom ask him to do?", options: { A: "Clean room and wash dishes", B: "Take out trash and wash cars", C: "Cook dinner and clean room" }, correctAnswer: "A" },
              { id: "listening_q67", question: "67. What time does Sarah's little sister go to sleep?", options: { A: "8:00 PM", B: "8:30 PM", C: "9:00 PM" }, correctAnswer: "C" },
              { id: "listening_q68", question: "68. How much did the three large pizzas cost in total?", options: { A: "10 dollars", B: "15 dollars", C: "20 dollars" }, correctAnswer: "B" },
              { id: "listening_q69", question: "69. What drinks is Leo buying for the party?", options: { A: "Fruit juice and lemonade", B: "Sodas and water", C: "Energy drinks" }, correctAnswer: "B" },
              { id: "listening_q70", question: "70. What type of video games are they going to play on Mark's console?", options: { A: "Football games", B: "Racing games", C: "Fighting games" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 3 — Part 5: Final Review & Rules (Questions 71–75)",
            instructions: "For questions 71–75, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q71", question: "71. Does Tom have to wash the dishes immediately?", options: { A: "Yes, right now", B: "No, he can do it tonight", C: "He doesn't have to do it at all" }, correctAnswer: "B" },
              { id: "listening_q72", question: "72. What device will keep them cool inside the living room?", options: { A: "Air conditioner", B: "The fan", C: "Open windows" }, correctAnswer: "B" },
              { id: "listening_q73", question: "73. How much money does Tom need to bring for the pizzas?", options: { A: "5 dollars", B: "15 dollars", C: "You don't have to bring any money" }, correctAnswer: "C" },
              { id: "listening_q74", question: "74. What type of snacks should Tom bring?", options: { A: "Sandwiches", B: "Potato chips", C: "Cake" }, correctAnswer: "B" },
              { id: "listening_q75", question: "75. Where must guests leave their shoes when they arrive?", options: { A: "Outside in the garden", B: "In the hall", C: "In the bedroom" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio4",
        audioUrl: "/audio/audio4.mp3",
        audioTitle: "Audio 4: School Trip to Mega Tech & Nature Park",
        parts: [
          {
            part: 1,
            title: "Audio 4 — Part 1: Trip Details & Costs (Questions 76–80)",
            instructions: "Listen to the announcement about the school trip. For questions 76–80, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q76", question: "76. Where is the school trip going this term?", options: { A: "City Science Center", B: "Mega Tech and Nature Park", C: "National Zoo" }, correctAnswer: "B" },
              { id: "listening_q77", question: "77. What date is the trip taking place?", options: { A: "Wednesday, September 16th", B: "Friday, September 18th", C: "Friday, October 18th" }, correctAnswer: "B" },
              { id: "listening_q78", question: "78. What time does the bus leave the school parking lot?", options: { A: "7:15 AM", B: "7:45 AM", C: "9:00 AM" }, correctAnswer: "B" },
              { id: "listening_q79", question: "79. How much does a school student ticket cost without lunch?", options: { A: "35 dollars", B: "22 dollars", C: "31 dollars" }, correctAnswer: "B" },
              { id: "listening_q80", question: "80. Why don't students need to bring notebooks or pens?", options: { A: "Writing is forbidden", B: "The park provides a digital tablet to every student", C: "They won't take notes" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 4 — Part 2: Information Completion (Questions 81–85)",
            instructions: "Listen to the announcement and complete questions 81–85. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q81", gapNumber: 81, label: "Parking Lot Arrival Time:", prompt: "______ AM", correctAnswer: "7:15", acceptableAnswers: ["7:15", "7:15 am", "7:15 AM"] },
              { id: "listening_q82", gapNumber: 82, label: "Total Cost with Lunch:", prompt: "$______", correctAnswer: "31", acceptableAnswers: ["31", "$31"] },
              { id: "listening_q83", gapNumber: 83, label: "Required Footwear:", prompt: "Closed ______", correctAnswer: "sneakers", acceptableAnswers: ["sneakers", "Sneakers"] },
              { id: "listening_q84", gapNumber: 84, label: "Morning Teacher:", prompt: "Mr. ______", correctAnswer: "clark", acceptableAnswers: ["clark", "Clark"] },
              { id: "listening_q85", gapNumber: 85, label: "School Nurse:", prompt: "Mrs. ______", correctAnswer: "green", acceptableAnswers: ["green", "Green"] }
            ]
          },
          {
            part: 3,
            title: "Audio 4 — Part 3: Rules & Schedule (Questions 86–90)",
            instructions: "Listen to Audio 4 again. For questions 86–90, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q86", question: "86. How much extra does the special park lunch combo cost?", options: { A: "5 dollars", B: "9 dollars", C: "22 dollars" }, correctAnswer: "B" },
              { id: "listening_q87", question: "87. What items MUST students bring with them?", options: { A: "Notebooks and pens", B: "A refillable water bottle and a small backpack", C: "Portable gaming consoles" }, correctAnswer: "B" },
              { id: "listening_q88", question: "88. Why are sandals or flip-flops NOT allowed?", options: { A: "Because of wet weather", B: "Because students will do climbing activities", C: "Because of bus rules" }, correctAnswer: "B" },
              { id: "listening_q89", question: "89. Who will supervise the afternoon outdoor activities and Zip-line challenge?", options: { A: "Mr. Clark", B: "Coach Sarah", C: "Mrs. Green" }, correctAnswer: "B" },
              { id: "listening_q90", question: "90. What rule did the bus driver, Mr. Bob, request?", options: { A: "No loud talking", B: "No eating inside the bus", C: "Sit in assigned seats" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 4 — Part 4: Detailed Comprehension (Questions 91–95)",
            instructions: "For questions 91–95, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q91", question: "91. When was the trip originally planned before being moved to September?", options: { A: "In August", B: "In October", C: "In November" }, correctAnswer: "B" },
              { id: "listening_q92", question: "92. What time will students arrive back at school after the trip?", options: { A: "4:30 PM", B: "5:30 PM", C: "6:00 PM" }, correctAnswer: "B" },
              { id: "listening_q93", question: "93. What food items are included in the special park lunch combo?", options: { A: "Pizza, fruit, and soda", B: "Chicken sandwich, fruit, and juice", C: "Burger, chips, and water" }, correctAnswer: "B" },
              { id: "listening_q94", question: "94. What electronic items are students forbidden from bringing?", options: { A: "Digital tablets", B: "Portable gaming consoles or expensive cameras", C: "Wristwatches" }, correctAnswer: "B" },
              { id: "listening_q95", question: "95. When from 9:00 AM to 12:00 PM will students visit the indoor VR Simulator and Coding Lab?", options: { A: "In the morning", B: "In the afternoon", C: "During lunch" }, correctAnswer: "A" }
            ]
          },
          {
            part: 5,
            title: "Audio 4 — Part 5: Final Review & Permissions (Questions 96–100)",
            instructions: "For questions 96–100, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q96", question: "96. What is the deadline to turn in the signed permission slip?", options: { A: "Wednesday, September 16th", B: "Friday, September 18th", C: "Monday, September 21st" }, correctAnswer: "A" },
              { id: "listening_q97", question: "97. To whom should students turn in their permission slips?", options: { A: "Mrs. Green", B: "Mr. Clark", C: "Coach Sarah" }, correctAnswer: "B" },
              { id: "listening_q98", question: "98. Where will lunch be eaten between 12:00 PM and 1:00 PM?", options: { A: "On the bus", B: "In the central pavilion", C: "At the VR lab" }, correctAnswer: "B" },
              { id: "listening_q99", question: "99. What is the cost of a regular adult ticket at the park?", options: { A: "22 dollars", B: "31 dollars", C: "35 dollars" }, correctAnswer: "C" },
              { id: "listening_q100", question: "100. Who is traveling with the group in case anyone feels unwell?", options: { A: "Mrs. Green, the school nurse", B: "Mr. Bob", C: "Coach Sarah" }, correctAnswer: "A" }
            ]
          }
        ]
      },

      {
        id: "audio5",
        audioUrl: "/audio/audio5.mp3",
        audioTitle: "Audio 5: Annual Young Inventors Competition Announcement",
        parts: [
          {
            part: 1,
            title: "Audio 5 — Part 1: Event Details & Dates (Questions 101–105)",
            instructions: "Listen to the announcement about the Young Inventors Competition. For questions 101–105, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q101", question: "101. What date will the Annual Young Inventors Competition take place?", options: { A: "Friday, October 10th", B: "Saturday, October 24th", C: "Saturday, November 24th" }, correctAnswer: "B" },
              { id: "listening_q102", question: "102. What is the application deadline for entering the competition?", options: { A: "Friday, October 10th", B: "Saturday, October 24th", C: "Friday, November 1st" }, correctAnswer: "A" },
              { id: "listening_q103", question: "103. Where will the competition be held?", options: { A: "Science Center", B: "Main school gymnasium", C: "School cafeteria" }, correctAnswer: "B" },
              { id: "listening_q104", question: "104. How much is the registration fee for school student teams?", options: { A: "15 dollars", B: "10 dollars", C: "5 dollars" }, correctAnswer: "B" },
              { id: "listening_q105", question: "105. What item MUST students bring from home?", options: { A: "Display table", B: "Lunch", C: "Water bottle" }, correctAnswer: "C" }
            ]
          },
          {
            part: 2,
            title: "Audio 5 — Part 2: Information Completion (Questions 106–110)",
            instructions: "Listen to the announcement and complete questions 106–110. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q106", gapNumber: 106, label: "Doors Open for Setup:", prompt: "______ AM", correctAnswer: "8:30", acceptableAnswers: ["8:30", "8:30 am", "8:30 AM"] },
              { id: "listening_q107", gapNumber: 107, label: "Team Registration Fee:", prompt: "$______", correctAnswer: "10", acceptableAnswers: ["10", "$10"] },
              { id: "listening_q108", gapNumber: 108, label: "Maximum Team Members:", prompt: "______ students", correctAnswer: "3", acceptableAnswers: ["3", "three", "Three"] },
              { id: "listening_q109", gapNumber: 109, label: "Student Coordinator:", prompt: "______", correctAnswer: "sarah", acceptableAnswers: ["sarah", "Sarah"] },
              { id: "listening_q110", gapNumber: 110, label: "Overall First Place Prize:", prompt: "3D ______", correctAnswer: "printer", acceptableAnswers: ["printer", "Printer"] }
            ]
          },
          {
            part: 3,
            title: "Audio 5 — Part 3: Schedule & Materials (Questions 111–115)",
            instructions: "Listen to Audio 5 again. For questions 111–115, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q111", question: "111. What time do project presentations start?", options: { A: "8:30 AM", B: "9:15 AM", C: "10:00 AM" }, correctAnswer: "B" },
              { id: "listening_q112", question: "112. What materials does the speaker encourage students to use for their inventions?", options: { A: "Expensive tech kits", B: "Recycled materials like cardboard and plastic bottles", C: "Heavy metal" }, correctAnswer: "B" },
              { id: "listening_q113", question: "113. Which of the following is STRICTLY FORBIDDEN due to safety rules?", options: { A: "Recycled cardboard", B: "Open flames or dangerous chemicals", C: "Participant badges" }, correctAnswer: "B" },
              { id: "listening_q114", question: "114. Who will judge the Robotics and Smart Gadgets category?", options: { A: "Mr. Evans", B: "Ms. Davis", C: "Dr. Miller" }, correctAnswer: "A" },
              { id: "listening_q115", question: "115. What time will the official awards ceremony take place?", options: { A: "2:00 PM", B: "3:00 PM", C: "4:00 PM" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 5 — Part 4: Detailed Comprehension (Questions 116–120)",
            instructions: "For questions 116–120, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q116", question: "116. When was the competition originally planned before being moved forward?", options: { A: "In September", B: "In November", C: "In December" }, correctAnswer: "B" },
              { id: "listening_q117", question: "117. What does the 10 dollar registration fee cover?", options: { A: "Display table and official participant badges", B: "3D printer and trophy", C: "Bus transport" }, correctAnswer: "A" },
              { id: "listening_q118", question: "118. What document must every team submit to Sarah at the registration desk?", options: { A: "A ten-page report", B: "A one-page printed summary", C: "A photo of their team" }, correctAnswer: "B" },
              { id: "listening_q119", question: "119. Who will judge the Green Energy and Recycling inventions category?", options: { A: "Mr. Evans", B: "Ms. Davis", C: "Dr. Miller" }, correctAnswer: "B" },
              { id: "listening_q120", question: "120. What will the overall first-place winning team receive besides trophy cups?", options: { A: "100 dollars cash", B: "A 3D printer for the school tech lab", C: "Free entry next year" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 5 — Part 5: Final Review & Rules (Questions 121–125)",
            instructions: "For questions 121–125, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q121", question: "121. How many students at maximum can work together in one team?", options: { A: "Two", B: "Three", C: "Five" }, correctAnswer: "B" },
              { id: "listening_q122", question: "122. Do registered participants need to buy lunch at the event?", options: { A: "Yes, 15 dollars for lunch", B: "No, lunch is provided for all registered participants", C: "Only if they arrive after 12:00 PM" }, correctAnswer: "B" },
              { id: "listening_q123", question: "123. Who is judging the Health Tech and Wellness devices category?", options: { A: "Mr. Evans", B: "Ms. Davis", C: "Dr. Miller" }, correctAnswer: "C" },
              { id: "listening_q124", question: "124. Until what time can the public and judges visit project stands?", options: { A: "12:00 PM", B: "2:00 PM", C: "3:00 PM" }, correctAnswer: "B" },
              { id: "listening_q125", question: "125. Where can Sarah, the student coordinator, be found on October 24th?", options: { A: "At the registration desk inside the gym lobby", B: "In the school tech lab", C: "Outside at the bus stop" }, correctAnswer: "A" }
            ]
          }
        ]
      }
    ]
  },

  /* ==========================================================================
     VERSION 1 (Set B - 125 Preguntas KET)
     ========================================================================== */
  {
    versionId: 1,
    title: "Cambridge KET Listening (Set B)",
    audios: [
      {
        id: "audio1",
        audioUrl: "/audio/audio1.mp3",
        audioTitle: "Audio 1: Technology Summer Camp Announcement",
        parts: [
          {
            part: 1,
            title: "Audio 1 — Part 1: Multiple Choice (Questions 1–5)",
            instructions: "Listen to the announcement about the Technology Summer Camp. For questions 1–5, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q1", question: "1. Where will the Technology Summer Camp take place this year?", options: { A: "At the school", B: "At the City Science Center", C: "At a university" }, correctAnswer: "B" },
              { id: "listening_q2", question: "2. How long does the camp last (from July 15th to July 25th)?", options: { A: "5 days", B: "10 days", C: "15 days" }, correctAnswer: "B" },
              { id: "listening_q3", question: "3. What is the usual price for a summer camp in the city?", options: { A: "30 dollars", B: "50 dollars", C: "8 dollars" }, correctAnswer: "B" },
              { id: "listening_q4", question: "4. Why don't students need to bring their laptops?", options: { A: "Laptops are forbidden.", B: "The Science Center has excellent computers.", C: "They won't use computers." }, correctAnswer: "B" },
              { id: "listening_q5", question: "5. What time is the morning programming class with Mr. Davis?", options: { A: "8:00 AM to 10:00 AM", B: "9:00 AM to 12:00 PM", C: "1:00 PM to 3:00 PM" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 1 — Part 2: Information Completion (Questions 6–10)",
            instructions: "Listen to the announcement and complete questions 6–10. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q6", gapNumber: 6, label: "Finish Date:", prompt: "July ______", correctAnswer: "25", acceptableAnswers: ["25", "25th", "25th of july"] },
              { id: "listening_q7", gapNumber: 7, label: "Arrival Time at School Gate:", prompt: "______ AM", correctAnswer: "8:00", acceptableAnswers: ["8:00", "8:00 am", "8"] },
              { id: "listening_q8", gapNumber: 8, label: "School Student Special Price:", prompt: "$______", correctAnswer: "30", acceptableAnswers: ["30", "$30"] },
              { id: "listening_q9", gapNumber: 9, label: "Cafeteria Sandwich Price:", prompt: "$______", correctAnswer: "8", acceptableAnswers: ["8", "$8"] },
              { id: "listening_q10", gapNumber: 10, label: "Main Project Word Spelling:", prompt: "R-O-B-O-______", correctAnswer: "t", acceptableAnswers: ["t", "T"] }
            ]
          },
          {
            part: 3,
            title: "Audio 1 — Part 3: Monologue Comprehension (Questions 11–15)",
            instructions: "Listen to Audio 1 again. For questions 11–15, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q11", question: "11. What will students do with Miss Taylor from 1:00 PM to 3:00 PM?", options: { A: "Learn programming", B: "Build the robot hardware", C: "Eat lunch" }, correctAnswer: "B" },
              { id: "listening_q12", question: "12. Which drinks are strictly forbidden at the camp?", options: { A: "Water", B: "Sweet sodas or energy drinks", C: "Natural fruit juice" }, correctAnswer: "B" },
              { id: "listening_q13", question: "13. What food arrangements should students make?", options: { A: "Buy lunch at the expensive cafeteria", B: "Bring a lunchbox from home", C: "Eat at school before leaving" }, correctAnswer: "B" },
              { id: "listening_q14", question: "14. Are students required to wear their school uniform?", options: { A: "No, they can wear jeans and t-shirts", B: "Yes, mandatory every day", C: "Only on the last day" }, correctAnswer: "A" },
              { id: "listening_q15", question: "15. What event will happen on the final day of the camp (July 25th)?", options: { A: "A video game competition", B: "A robot competition", C: "A swimming gala" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 1 — Part 4: Detailed Comprehension (Questions 16–20)",
            instructions: "For questions 16–20, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q16", question: "16. What time does the bus leave the school gate?", options: { A: "8:00 AM", B: "8:15 AM", C: "8:30 AM" }, correctAnswer: "B" },
              { id: "listening_q17", question: "17. Can the bus wait for late students?", options: { A: "Yes, it waits 15 minutes.", B: "No, it leaves exactly at 8:15 AM.", C: "Only if they call the school." }, correctAnswer: "B" },
              { id: "listening_q18", question: "18. What supplies must students bring with them?", options: { A: "Laptops and headphones", B: "A notebook and a pen", C: "A camera and tablet" }, correctAnswer: "B" },
              { id: "listening_q19", question: "19. How is the cafeteria at the Science Center described?", options: { A: "Very cheap", B: "Very expensive", C: "Closed for repairs" }, correctAnswer: "B" },
              { id: "listening_q20", question: "20. Who is invited to watch the robot competition at 4:00 PM on July 25th?", options: { A: "Only teachers", B: "Parents", C: "The whole town" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 1 — Part 5: Matching & Rules Details (Questions 21–25)",
            instructions: "For questions 21–25, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q21", question: "21. Who must receive the payment and permission form?", options: { A: "The teacher speaking", B: "Mrs. Smith (school secretary)", C: "Mr. Davis" }, correctAnswer: "B" },
              { id: "listening_q22", question: "22. When is the deadline to hand in the form and money?", options: { A: "Before next Friday, the 12th", B: "July 15th", C: "July 25th" }, correctAnswer: "A" },
              { id: "listening_q23", question: "23. Should students give money directly to the teacher speaking?", options: { A: "Yes, in the morning", B: "No, do not give money to the teacher", C: "Give it on the bus" }, correctAnswer: "B" },
              { id: "listening_q24", question: "24. Why are sandals NOT allowed in the lab?", options: { A: "Because students work with heavy metal pieces and cables", B: "Because of rainy weather", C: "Because of school uniform policy" }, correctAnswer: "A" },
              { id: "listening_q25", question: "25. What project did students work on during last year's camp?", options: { A: "Building smart robots", B: "Making video games", C: "Programming drones" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio2",
        audioUrl: "/audio/audio2.mp3",
        audioTitle: "Audio 2: School Stress and Healthy Habits (Leo's Presentation)",
        parts: [
          {
            part: 1,
            title: "Audio 2 — Part 1: Health & Symptoms (Questions 26–30)",
            instructions: "Listen to Leo talking about school stress and healthy habits. For questions 26–30, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q26", question: "26. What was Leo studying for last month when he felt stressed?", options: { A: "Driving test", B: "Final exams", C: "Music competition" }, correctAnswer: "B" },
              { id: "listening_q27", question: "27. What time does Leo turn off his phone completely at night?", options: { A: "8:30 PM", B: "9:00 PM", C: "9:30 PM" }, correctAnswer: "B" },
              { id: "listening_q28", question: "28. What drinks does Leo consume now instead of energy drinks?", options: { A: "Coffee and tea", B: "Water and natural orange juice", C: "Sweet sodas" }, correctAnswer: "B" },
              { id: "listening_q29", question: "29. Where does Leo go swimming on Tuesdays and Thursdays?", options: { A: "At the school pool", B: "At the sports center", C: "At the beach" }, correctAnswer: "B" },
              { id: "listening_q30", question: "30. What is the name of Leo's best friend?", options: { A: "Mark", B: "Brown", C: "Emma" }, correctAnswer: "A" }
            ]
          },
          {
            part: 2,
            title: "Audio 2 — Part 2: Information Completion (Questions 31–35)",
            instructions: "Listen to Leo and complete questions 31–35. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q31", gapNumber: 31, label: "Sleep Time:", prompt: "______ PM", correctAnswer: "9:30", acceptableAnswers: ["9:30", "9:30 pm", "9:30 PM"] },
              { id: "listening_q32", gapNumber: 32, label: "Energy Drink Price:", prompt: "$______", correctAnswer: "2.50", acceptableAnswers: ["2.50", "$2.50", "2,50"] },
              { id: "listening_q33", gapNumber: 33, label: "Swimming Time:", prompt: "______ PM", correctAnswer: "5:15", acceptableAnswers: ["5:15", "5:15 pm", "5:15 PM"] },
              { id: "listening_q34", gapNumber: 34, label: "Math Teacher's Name:", prompt: "Mr. ______", correctAnswer: "brown", acceptableAnswers: ["brown", "Brown"] },
              { id: "listening_q35", gapNumber: 35, label: "Helper's Name:", prompt: "Sister ______", correctAnswer: "emma", acceptableAnswers: ["emma", "Emma"] }
            ]
          },
          {
            part: 3,
            title: "Audio 2 — Part 3: Habits & Friendships (Questions 36–40)",
            instructions: "Listen to Audio 2 again. For questions 36–40, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q36", question: "36. How does Leo feel when he wakes up now after going to bed at 9:30 PM?", options: { A: "Tired", B: "Fantastic", C: "Sick" }, correctAnswer: "B" },
              { id: "listening_q37", question: "37. Why did the school doctor advise Leo to stop drinking energy drinks?", options: { A: "They are unhealthy and expensive.", B: "They taste bad.", C: "They are illegal." }, correctAnswer: "A" },
              { id: "listening_q38", question: "38. Why did Leo stop playing football for his school team?", options: { A: "He hurt his left leg in an accident last year.", B: "He wanted to play basketball.", C: "He moved to another town." }, correctAnswer: "A" },
              { id: "listening_q39", question: "39. How did Leo resolve the disagreement with his best friend Mark?", options: { A: "He called Mark's parents.", B: "He wrote Mark an email to say sorry.", C: "Mark came to his house unexpectedly." }, correctAnswer: "B" },
              { id: "listening_q40", question: "40. What subject is Emma great at?", options: { A: "Languages", B: "Numbers / Math", C: "History" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 2 — Part 4: Detailed Comprehension (Questions 41–45)",
            instructions: "For questions 41–45, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q41", question: "41. Which part of Leo's body was NOT affected by stomach ache?", options: { A: "He had no stomach ache at all.", B: "Stomach", C: "Legs" }, correctAnswer: "A" },
              { id: "listening_q42", question: "42. What days of the week does Leo go swimming?", options: { A: "Mondays and Wednesdays", B: "Tuesdays and Thursdays", C: "Saturdays and Sundays" }, correctAnswer: "B" },
              { id: "listening_q43", question: "43. What plan do Leo and Mark have for this Saturday afternoon?", options: { A: "Go to the sports center", B: "Play video games together", C: "Study for Math" }, correctAnswer: "B" },
              { id: "listening_q44", question: "44. Why couldn't Leo get help from Mr. Brown?", options: { A: "Mr. Brown was absent.", B: "Mr. Brown is always very busy.", C: "Mr. Brown charges money." }, correctAnswer: "B" },
              { id: "listening_q45", question: "45. What advice does Leo give about stress at the end of his presentation?", options: { A: "Don't tell anyone.", B: "You should talk to someone and not keep it a secret.", C: "Stop playing video games." }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 2 — Part 5: Final Review & Advice (Questions 46–50)",
            instructions: "For questions 46–50, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q46", question: "46. How many energy drinks did Leo drink daily in the past?", options: { A: "One", B: "Two", C: "Three" }, correctAnswer: "B" },
              { id: "listening_q47", question: "47. Who makes natural orange juice for Leo?", options: { A: "His sister Emma", B: "His mom", C: "The cafeteria staff" }, correctAnswer: "B" },
              { id: "listening_q48", question: "48. Where was Leo's leg injured last year?", options: { A: "Right leg", B: "Left leg", C: "Both legs" }, correctAnswer: "B" },
              { id: "listening_q49", question: "49. How old is Leo's sister Emma?", options: { A: "17", B: "19", C: "21" }, correctAnswer: "B" },
              { id: "listening_q50", question: "50. What day of the week does Emma help Leo with Math?", options: { A: "Saturday afternoon", B: "Sunday morning", C: "Friday nights" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio3",
        audioUrl: "/audio/audio3.mp3",
        audioTitle: "Audio 3: End-of-term Party Dialogue (Sarah & Tom)",
        parts: [
          {
            part: 1,
            title: "Audio 3 — Part 1: Party Details & Chores (Questions 51–55)",
            instructions: "Listen to the dialogue between Sarah and Tom about the party. For questions 51–55, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q51", question: "51. What date is Sarah's end-of-term party taking place?", options: { A: "Saturday the 12th", B: "Saturday the 15th", C: "Sunday the 16th" }, correctAnswer: "B" },
              { id: "listening_q52", question: "52. Why did Tom's mom initially say no to the party?", options: { A: "He didn't study for exams", B: "His bedroom was very messy", C: "He was sick" }, correctAnswer: "B" },
              { id: "listening_q53", question: "53. Whose job is it to take out the trash at Tom's house?", options: { A: "Tom's", B: "Tom's older brother's", C: "Tom's mother's" }, correctAnswer: "B" },
              { id: "listening_q54", question: "54. What time must everyone leave Sarah's house by?", options: { A: "8:00 PM", B: "8:30 PM", C: "9:00 PM" }, correctAnswer: "B" },
              { id: "listening_q55", question: "55. Why will Tom arrive at the party at 4:30 PM instead of 4:00 PM?", options: { A: "He has a football match", B: "He has a piano lesson at 3:30 PM", C: "He takes the bus" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 3 — Part 2: Information Completion (Questions 56–60)",
            instructions: "Listen to the dialogue and complete questions 56–60. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q56", gapNumber: 56, label: "Party Location:", prompt: "Living ______", correctAnswer: "room", acceptableAnswers: ["room", "Room"] },
              { id: "listening_q57", gapNumber: 57, label: "Pizza Quantity:", prompt: "______ large pizzas", correctAnswer: "3", acceptableAnswers: ["3", "three", "Three"] },
              { id: "listening_q58", gapNumber: 58, label: "Drinks Supplier:", prompt: "______", correctAnswer: "leo", acceptableAnswers: ["leo", "Leo"] },
              { id: "listening_q59", gapNumber: 59, label: "Snack Tom is bringing:", prompt: "Potato ______", correctAnswer: "chips", acceptableAnswers: ["chips", "Chips"] },
              { id: "listening_q60", gapNumber: 60, label: "Shoe Leaving Location:", prompt: "In the ______", correctAnswer: "hall", acceptableAnswers: ["hall", "Hall"] }
            ]
          },
          {
            part: 3,
            title: "Audio 3 — Part 3: Dialogue Comprehension (Questions 61–65)",
            instructions: "Listen to Audio 3 again. For questions 61–65, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q61", question: "61. Why is the party taking place inside the living room instead of the garden?", options: { A: "Because of rain", B: "Because it is too hot outside in the afternoon", C: "Because the garden is under repair" }, correctAnswer: "B" },
              { id: "listening_q62", question: "62. Who is paying for the three large pizzas?", options: { A: "Anna", B: "Sarah's parents", C: "Tom and Leo" }, correctAnswer: "B" },
              { id: "listening_q63", question: "63. What is Mark bringing to the party?", options: { A: "A video game console to play racing games", B: "Drinks", C: "Potato chips" }, correctAnswer: "A" },
              { id: "listening_q64", question: "64. What is Mia bringing to Sarah's party?", options: { A: "The music speaker", B: "The fan", C: "The pizzas" }, correctAnswer: "A" },
              { id: "listening_q65", question: "65. What important house rule did Sarah mention?", options: { A: "No loud music", B: "Mustn't wear shoes inside the living room", C: "Must leave by 7:00 PM" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 3 — Part 4: Detailed Comprehension (Questions 66–70)",
            instructions: "For questions 66–70, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q66", question: "66. What two chores did Tom's mom ask him to do?", options: { A: "Clean room and wash dishes", B: "Take out trash and wash cars", C: "Cook dinner and clean room" }, correctAnswer: "A" },
              { id: "listening_q67", question: "67. What time does Sarah's little sister go to sleep?", options: { A: "8:00 PM", B: "8:30 PM", C: "9:00 PM" }, correctAnswer: "C" },
              { id: "listening_q68", question: "68. How much did the three large pizzas cost in total?", options: { A: "10 dollars", B: "15 dollars", C: "20 dollars" }, correctAnswer: "B" },
              { id: "listening_q69", question: "69. What drinks is Leo buying for the party?", options: { A: "Fruit juice and lemonade", B: "Sodas and water", C: "Energy drinks" }, correctAnswer: "B" },
              { id: "listening_q70", question: "70. What type of video games are they going to play on Mark's console?", options: { A: "Football games", B: "Racing games", C: "Fighting games" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 3 — Part 5: Final Review & Details (Questions 71–75)",
            instructions: "For questions 71–75, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q71", question: "71. Why must everyone leave Sarah's house by 8:30 PM?", options: { A: "Sarah's parents go to sleep", B: "Her little sister goes to sleep at 9:00 PM", C: "The bus stops running" }, correctAnswer: "B" },
              { id: "listening_q72", question: "72. What cooling device is in the living room?", options: { A: "Air conditioner", B: "The fan", C: "Ice machine" }, correctAnswer: "B" },
              { id: "listening_q73", question: "73. Are they having sandwiches at the party?", options: { A: "Yes, ham sandwiches", B: "No, Anna bought pizzas instead", C: "Only for Tom" }, correctAnswer: "B" },
              { id: "listening_q74", question: "74. Do students need to bring money for the pizza?", options: { A: "Yes, 5 dollars each", B: "No, Sarah's parents are paying", C: "Yes, 15 dollars total" }, correctAnswer: "B" },
              { id: "listening_q75", question: "75. Where will Tom go right after the phone call?", options: { A: "To the supermarket", B: "To clean his room now", C: "To his piano lesson" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio4",
        audioUrl: "/audio/audio4.mp3",
        audioTitle: "Audio 4: School Trip to Mega Tech & Nature Park",
        parts: [
          {
            part: 1,
            title: "Audio 4 — Part 1: Trip Details & Dates (Questions 76–80)",
            instructions: "Listen to the announcement about the school trip. For questions 76–80, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q76", question: "76. Why was the trip date changed from October to September 18th?", options: { A: "The school was closed in October", B: "The park offered a better date this month", C: "Buses were not available" }, correctAnswer: "B" },
              { id: "listening_q77", question: "77. At what time must students arrive at the school parking lot?", options: { A: "7:15 AM sharp", B: "7:45 AM", C: "8:00 AM" }, correctAnswer: "A" },
              { id: "listening_q78", question: "78. How much is saved per ticket by booking as a school group (35 dollars vs 22 dollars)?", options: { A: "9 dollars", B: "13 dollars", C: "22 dollars" }, correctAnswer: "B" },
              { id: "listening_q79", question: "79. What items MUST NOT be brought on the trip?", options: { A: "Small backpack", B: "Portable gaming consoles or expensive cameras", C: "Water bottle" }, correctAnswer: "B" },
              { id: "listening_q80", question: "80. Who is Coach Sarah?", options: { A: "The school nurse", B: "The supervisor for afternoon outdoor activities and Zip-line", C: "The bus driver" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 4 — Part 2: Information Completion (Questions 81–85)",
            instructions: "Listen to the announcement and complete questions 81–85. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q81", gapNumber: 81, label: "Student Ticket Price:", prompt: "$______", correctAnswer: "22", acceptableAnswers: ["22", "$22"] },
              { id: "listening_q82", gapNumber: 82, label: "Extra Lunch Combo Price:", prompt: "$______", correctAnswer: "9", acceptableAnswers: ["9", "$9"] },
              { id: "listening_q83", gapNumber: 83, label: "Morning Lab Subject:", prompt: "VR Simulator & ______", correctAnswer: "coding", acceptableAnswers: ["coding", "Coding"] },
              { id: "listening_q84", gapNumber: 84, label: "Afternoon Challenge:", prompt: "______-line", correctAnswer: "zip", acceptableAnswers: ["zip", "Zip"] },
              { id: "listening_q85", gapNumber: 85, label: "Bus Rule:", prompt: "No ______ inside the bus", correctAnswer: "eating", acceptableAnswers: ["eating", "Eating", "food"] }
            ]
          },
          {
            part: 3,
            title: "Audio 4 — Part 3: Equipment & Schedule (Questions 86–90)",
            instructions: "Listen to Audio 4 again. For questions 86–90, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q86", question: "86. What will every student receive at the park entrance to record answers?", options: { A: "A notebook", B: "A digital tablet", C: "A clipboard" }, correctAnswer: "B" },
              { id: "listening_q87", question: "87. Which items are required for every student to bring?", options: { A: "Refillable water bottle and small backpack", B: "Laptops and headphones", C: "Sandals and cameras" }, correctAnswer: "A" },
              { id: "listening_q88", question: "88. What type of footwear must students wear for safety during climbing activities?", options: { A: "Sandals", B: "Flip-flops", C: "Closed sneakers" }, correctAnswer: "C" },
              { id: "listening_q89", question: "89. What time does the afternoon outdoor activity session finish?", options: { A: "1:00 PM", B: "3:30 PM", C: "4:30 PM" }, correctAnswer: "B" },
              { id: "listening_q90", question: "90. What is the role of Mrs. Green on the trip?", options: { A: "Bus driver", B: "School nurse", C: "Coding instructor" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 4 — Part 4: Detailed Comprehension (Questions 91–95)",
            instructions: "For questions 91–95, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q91", question: "91. How much is the total cost for a student who buys the ticket and the park lunch combo (22 dollars + 9 dollars)?", options: { A: "22 dollars", B: "31 dollars", C: "35 dollars" }, correctAnswer: "B" },
              { id: "listening_q92", question: "92. What drink is included in the special park lunch combo?", options: { A: "Soda", B: "Juice", C: "Water" }, correctAnswer: "B" },
              { id: "listening_q93", question: "93. What time will the group leave the park in the afternoon?", options: { A: "3:30 PM", B: "4:30 PM", C: "5:30 PM" }, correctAnswer: "B" },
              { id: "listening_q94", question: "94. Can students bring their own lunch from home instead of ordering the combo?", options: { A: "Yes, if they prefer", B: "No, park lunch is mandatory", C: "Only if they have allergies" }, correctAnswer: "A" },
              { id: "listening_q95", question: "95. Why shouldn't students bring expensive cameras?", options: { A: "Cameras are forbidden by law", B: "The school is not responsible for lost electronics", C: "Park has no light" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 4 — Part 5: Final Review & Permissions (Questions 96–100)",
            instructions: "For questions 96–100, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q96", question: "96. On what day of the week is the permission slip due?", options: { A: "Wednesday, September 16th", B: "Friday, September 18th", C: "Monday, September 21st" }, correctAnswer: "A" },
              { id: "listening_q97", question: "97. Who asked students to keep the bus clean by not eating inside?", options: { A: "Mr. Clark", B: "Mr. Bob (the bus driver)", C: "Mrs. Green" }, correctAnswer: "B" },
              { id: "listening_q98", question: "98. Where will students be from 9:00 AM to 12:00 PM?", options: { A: "At the central pavilion", B: "At the indoor VR Simulator and Coding Lab", C: "On the Zip-line" }, correctAnswer: "B" },
              { id: "listening_q99", question: "99. What casual clothes are permitted?", options: { A: "T-shirts and shorts with closed sneakers", B: "Swimming suits", C: "Pajamas" }, correctAnswer: "A" },
              { id: "listening_q100", question: "100. What happens at 5:30 PM?", options: { A: "Bus leaves school", B: "Students arrive back at school", C: "Lunch begins" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio5",
        audioUrl: "/audio/audio5.mp3",
        audioTitle: "Audio 5: Annual Young Inventors Competition Announcement",
        parts: [
          {
            part: 1,
            title: "Audio 5 — Part 1: Event Details & Dates (Questions 101–105)",
            instructions: "Listen to the announcement about the Young Inventors Competition. For questions 101–105, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q101", question: "101. What is the name of the competition announced by the speaker?", options: { A: "Science Fair 2026", B: "Annual Young Inventors Competition", C: "Robot Challenge" }, correctAnswer: "B" },
              { id: "listening_q102", question: "102. On what day of the week is the competition held?", options: { A: "Friday", B: "Saturday", C: "Sunday" }, correctAnswer: "B" },
              { id: "listening_q103", question: "103. When do project presentations start in the gymnasium?", options: { A: "8:30 AM", B: "9:15 AM", C: "10:00 AM" }, correctAnswer: "B" },
              { id: "listening_q104", question: "104. What is the commercial price charged by normal science competitions (15 dollars) versus school fee (10 dollars)?", options: { A: "10 dollars for school students", B: "5 dollars for school students", C: "Free" }, correctAnswer: "A" },
              { id: "listening_q105", question: "105. Are students required to buy expensive technology kits?", options: { A: "Yes, mandatory", B: "No, recycled materials are strongly encouraged", C: "Only for robotics" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 5 — Part 2: Information Completion (Questions 106–110)",
            instructions: "Listen to the announcement and complete questions 106–110. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q106", gapNumber: 106, label: "Competition Date:", prompt: "October ______", correctAnswer: "24", acceptableAnswers: ["24", "24th"] },
              { id: "listening_q107", gapNumber: 107, label: "Application Deadline:", prompt: "October ______", correctAnswer: "10", acceptableAnswers: ["10", "10th"] },
              { id: "listening_q108", gapNumber: 108, label: "Awards Ceremony Time:", prompt: "______ PM", correctAnswer: "3:00", acceptableAnswers: ["3:00", "3", "3:00 pm", "3:00 PM"] },
              { id: "listening_q109", gapNumber: 109, label: "Green Energy Judge:", prompt: "Ms. ______", correctAnswer: "davis", acceptableAnswers: ["davis", "Davis"] },
              { id: "listening_q110", gapNumber: 110, label: "Health Tech Judge:", prompt: "Dr. ______", correctAnswer: "miller", acceptableAnswers: ["miller", "Miller"] }
            ]
          },
          {
            part: 3,
            title: "Audio 5 — Part 3: Rules & Categories (Questions 111–115)",
            instructions: "Listen to Audio 5 again. For questions 111–115, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q111", question: "111. What time do doors open for setup in the school gymnasium?", options: { A: "8:00 AM", B: "8:30 AM", C: "9:00 AM" }, correctAnswer: "B" },
              { id: "listening_q112", question: "112. Is food provided for registered participants?", options: { A: "Yes, lunch is provided", B: "No, students must buy food", C: "Only drinks are provided" }, correctAnswer: "A" },
              { id: "listening_q113", question: "113. What happens to any project that uses hazardous materials or open flames?", options: { A: "It receives a warning", B: "It will be disqualified immediately", C: "It loses 5 points" }, correctAnswer: "B" },
              { id: "listening_q114", question: "114. What category is Mr. Evans responsible for judging?", options: { A: "Robotics and Smart Gadgets", B: "Green Energy", C: "Health Tech" }, correctAnswer: "A" },
              { id: "listening_q115", question: "115. Where should teams hand in their one-page summary upon arrival?", options: { A: "To Mr. Evans in the lab", B: "To Sarah at the registration desk in the gym lobby", C: "To the principal" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 5 — Part 4: Detailed Comprehension (Questions 116–120)",
            instructions: "For questions 116–120, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q116", question: "116. Can a student participate individually in the competition?", options: { A: "Yes, individually or in teams up to 3 students", B: "No, teams of 3 are mandatory", C: "Only pairs allowed" }, correctAnswer: "A" },
              { id: "listening_q117", question: "117. What must students bring to stay hydrated during the day?", options: { A: "Energy drinks", B: "Own water bottle", C: "Orange juice" }, correctAnswer: "B" },
              { id: "listening_q118", question: "118. What item will Sarah give each team at the registration desk?", options: { A: "A 3D printer", B: "Table assignment", C: "Lunch box" }, correctAnswer: "B" },
              { id: "listening_q119", question: "119. Which category covers recycling inventions?", options: { A: "Robotics", B: "Green Energy and Recycling", C: "Wellness" }, correctAnswer: "B" },
              { id: "listening_q120", question: "120. What prize will be placed in the school tech lab by the winning team?", options: { A: "A 3D printer", B: "A smart TV", C: "10 computers" }, correctAnswer: "A" }
            ]
          },
          {
            part: 5,
            title: "Audio 5 — Part 5: Final Review & Rules (Questions 121–125)",
            instructions: "For questions 121–125, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q121", question: "121. When is the deadline to submit the team application form?", options: { A: "Friday, October 10th", B: "Saturday, October 24th", C: "November 1st" }, correctAnswer: "A" },
              { id: "listening_q122", question: "122. What time does stand visiting for judges and public end?", options: { A: "1:00 PM", B: "2:00 PM", C: "3:00 PM" }, correctAnswer: "B" },
              { id: "listening_q123", question: "123. What materials are recommended for building prototypes?", options: { A: "Cardboard, plastic bottles, and old electronics", B: "Gold and silver", C: "Glass and fire" }, correctAnswer: "A" },
              { id: "listening_q124", question: "124. What participant item is included in the 10 dollar registration fee besides the table?", options: { A: "Official participant badges", B: "T-shirts", C: "Water bottle" }, correctAnswer: "A" },
              { id: "listening_q125", question: "125. What is Dr. Miller's judging specialty?", options: { A: "Robotics", B: "Health Tech and Wellness devices", C: "Green Energy" }, correctAnswer: "B" }
            ]
          }
        ]
      }
    ]
  },

  /* ==========================================================================
     VERSION 2 (Set C - 125 Preguntas KET)
     ========================================================================== */
  {
    versionId: 2,
    title: "Cambridge KET Listening (Set C)",
    audios: [
      {
        id: "audio1",
        audioUrl: "/audio/audio1.mp3",
        audioTitle: "Audio 1: Technology Summer Camp Announcement",
        parts: [
          {
            part: 1,
            title: "Audio 1 — Part 1: Multiple Choice (Questions 1–5)",
            instructions: "Listen to the announcement about the Technology Summer Camp. For questions 1–5, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q1", question: "1. What month was the camp held last year versus this year?", options: { A: "Last year in July, this year in August", B: "Last year in August, this year in July", C: "Both years in July" }, correctAnswer: "B" },
              { id: "listening_q2", question: "2. How much money do students save compared to the normal city price of 50 dollars?", options: { A: "10 dollars", B: "20 dollars", C: "30 dollars" }, correctAnswer: "B" },
              { id: "listening_q3", question: "3. How will students travel to the City Science Center every morning?", options: { A: "By train", B: "By bus from the school gate", C: "On foot" }, correctAnswer: "B" },
              { id: "listening_q4", question: "4. What is the price of a simple sandwich at the center's cafeteria?", options: { A: "5 dollars", B: "8 dollars", C: "15 dollars" }, correctAnswer: "B" },
              { id: "listening_q5", question: "5. What is the grand prize for the winning team at the robot competition?", options: { A: "A new drone", B: "A new computer", C: "Free entry next year" }, correctAnswer: "A" }
            ]
          },
          {
            part: 2,
            title: "Audio 1 — Part 2: Information Completion (Questions 6–10)",
            instructions: "Listen to the announcement and complete questions 6–10. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q6", gapNumber: 6, label: "Bus Departure Time:", prompt: "______ AM", correctAnswer: "8:15", acceptableAnswers: ["8:15", "8:15 am", "8:15 AM"] },
              { id: "listening_q7", gapNumber: 7, label: "Student Price:", prompt: "$______", correctAnswer: "30", acceptableAnswers: ["30", "$30"] },
              { id: "listening_q8", gapNumber: 8, label: "Morning Subject:", prompt: "______", correctAnswer: "programming", acceptableAnswers: ["programming", "Programming", "coding", "Coding"] },
              { id: "listening_q9", gapNumber: 9, label: "Afternoon Subject:", prompt: "Robot ______", correctAnswer: "hardware", acceptableAnswers: ["hardware", "Hardware"] },
              { id: "listening_q10", gapNumber: 10, label: "Allowed Footwear:", prompt: "______ shoes", correctAnswer: "closed", acceptableAnswers: ["closed", "Closed", "trainers", "Trainers"] }
            ]
          },
          {
            part: 3,
            title: "Audio 1 — Part 3: Monologue Comprehension (Questions 11–15)",
            instructions: "Listen to Audio 1 again. For questions 11–15, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q11", question: "11. Who will teach programming in the mornings (9:00 AM to 12:00 PM)?", options: { A: "Mr. Davis", B: "Miss Taylor", C: "Mrs. Smith" }, correctAnswer: "A" },
              { id: "listening_q12", question: "12. Who will supervise the robot hardware construction in the afternoon?", options: { A: "Mr. Davis", B: "Miss Taylor", C: "Mrs. Smith" }, correctAnswer: "B" },
              { id: "listening_q13", question: "13. What drink can students bring from home?", options: { A: "Water", B: "Sweet soda", C: "Energy drink" }, correctAnswer: "A" },
              { id: "listening_q14", question: "14. What footwear is explicitly forbidden in the lab?", options: { A: "Trainers", B: "Closed shoes", C: "Sandals" }, correctAnswer: "C" },
              { id: "listening_q15", question: "15. What time does the robot competition start for parents on the final day?", options: { A: "3:00 PM", B: "4:00 PM", C: "5:00 PM" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 1 — Part 4: Detailed Comprehension (Questions 16–20)",
            instructions: "For questions 16–20, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q16", question: "16. On what exact date does the Technology Summer Camp start this year?", options: { A: "July 12th", B: "July 15th", C: "July 25th" }, correctAnswer: "B" },
              { id: "listening_q17", question: "17. When must students arrive at the school gate to catch the bus?", options: { A: "8:00 AM sharp", B: "8:15 AM", C: "8:45 AM" }, correctAnswer: "A" },
              { id: "listening_q18", question: "18. What hardware does the Science Center provide for the students?", options: { A: "Laptops and notebooks", B: "Excellent computers", C: "Drones and sandals" }, correctAnswer: "B" },
              { id: "listening_q19", question: "19. Why did the teacher spell the word R-O-B-O-T?", options: { A: "It is this year's main project.", B: "It is the name of the cafeteria.", C: "It is a password for computers." }, correctAnswer: "A" },
              { id: "listening_q20", question: "20. What will parents be able to do at 4:00 PM on July 25th?", options: { A: "Take a tour of the school", B: "Watch the robot competition", C: "Pay the camp fees" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 1 — Part 5: Matching & Rules Details (Questions 21–25)",
            instructions: "For questions 21–25, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q21", question: "21. What is Mrs. Smith's job at the school?", options: { A: "Science teacher", B: "School secretary", C: "Bus driver" }, correctAnswer: "B" },
              { id: "listening_q22", question: "22. By what day must the money and permission form be submitted?", options: { A: "Before next Friday, the 12th", B: "On Monday July 15th", C: "On July 25th" }, correctAnswer: "A" },
              { id: "listening_q23", question: "23. Is school uniform required during the summer camp?", options: { A: "Yes, every day", B: "No, comfortable clothes like jeans and t-shirts are fine", C: "Only during lunch" }, correctAnswer: "B" },
              { id: "listening_q24", question: "24. Why must students wear closed shoes like trainers in the laboratory?", options: { A: "Because they will work with heavy metal pieces and cables", B: "Because it is a school rule", C: "Because of cold temperatures" }, correctAnswer: "A" },
              { id: "listening_q25", question: "25. What project was done at last year's camp?", options: { A: "Smart robots", B: "Video games", C: "Drones" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio2",
        audioUrl: "/audio/audio2.mp3",
        audioTitle: "Audio 2: School Stress and Healthy Habits (Leo's Presentation)",
        parts: [
          {
            part: 1,
            title: "Audio 2 — Part 1: Health & Symptoms (Questions 26–30)",
            instructions: "Listen to Leo talking about school stress and healthy habits. For questions 26–30, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q26", question: "26. What symptoms did Leo experience every single day when stressed?", options: { A: "Tired eyes and terrible headaches", B: "Stomach ache and fever", C: "Sore throat" }, correctAnswer: "A" },
              { id: "listening_q27", question: "27. What time was Leo going to bed in the past before changing his routine?", options: { A: "10:00 PM", B: "11:00 PM", C: "Midnight" }, correctAnswer: "C" },
              { id: "listening_q28", question: "28. Why did the school doctor tell Leo to stop energy drinks?", options: { A: "They cause toothache.", B: "They are bad for health and expensive at 2.50 dollars each.", C: "They are for adults only." }, correctAnswer: "B" },
              { id: "listening_q29", question: "29. Why did Leo start swimming as a new hobby?", options: { A: "He wanted a safe, relaxing activity because his left leg hurt.", B: "He wants to compete in the Olympics.", C: "His friends forced him." }, correctAnswer: "A" },
              { id: "listening_q30", question: "30. Who is Emma?", options: { A: "Leo's Math teacher", B: "Leo's 19-year-old sister at university", C: "Leo's best friend" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 2 — Part 2: Information Completion (Questions 31–35)",
            instructions: "Listen to Leo and complete questions 31–35. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q31", gapNumber: 31, label: "Phone Turn-Off Time:", prompt: "______ PM", correctAnswer: "9:00", acceptableAnswers: ["9:00", "9", "9:00 pm", "9:00 PM"] },
              { id: "listening_q32", gapNumber: 32, label: "Natural Drink:", prompt: "Water and ______ juice", correctAnswer: "orange", acceptableAnswers: ["orange", "Orange"] },
              { id: "listening_q33", gapNumber: 33, label: "Injured Body Part:", prompt: "Left ______", correctAnswer: "leg", acceptableAnswers: ["leg", "Leg"] },
              { id: "listening_q34", gapNumber: 34, label: "Best Friend's Name:", prompt: "______", correctAnswer: "mark", acceptableAnswers: ["mark", "Mark"] },
              { id: "listening_q35", gapNumber: 35, label: "Difficult Subject:", prompt: "______", correctAnswer: "math", acceptableAnswers: ["math", "Math", "mathematics"] }
            ]
          },
          {
            part: 3,
            title: "Audio 2 — Part 3: Habits & Friendships (Questions 36–40)",
            instructions: "Listen to Audio 2 again. For questions 36–40, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q36", question: "36. Why was Leo chatting on his phone until midnight in the past?", options: { A: "He was talking with his friends.", B: "He was playing online games.", C: "He was doing homework." }, correctAnswer: "A" },
              { id: "listening_q37", question: "37. Who prepares natural orange juice for Leo every day?", options: { A: "His sister Emma", B: "His mother", C: "The doctor" }, correctAnswer: "B" },
              { id: "listening_q38", question: "38. On which two days does Leo go swimming at 5:15 PM?", options: { A: "Mondays and Wednesdays", B: "Tuesdays and Thursdays", C: "Fridays and Saturdays" }, correctAnswer: "B" },
              { id: "listening_q39", question: "39. What happened between Leo and his best friend Mark when Leo was stressed?", options: { A: "They went on a trip.", B: "They had a big fight and didn't speak for a week.", C: "They studied together." }, correctAnswer: "B" },
              { id: "listening_q40", question: "40. When does Emma help Leo with Math?", options: { A: "Saturday afternoon", B: "Sunday morning", C: "Monday night" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 2 — Part 4: Detailed Comprehension (Questions 41–45)",
            instructions: "For questions 41–45, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q41", question: "41. How much money did Leo spend per day on two energy drinks at 2.50 dollars each?", options: { A: "2.50 dollars", B: "5.00 dollars", C: "10.00 dollars" }, correctAnswer: "B" },
              { id: "listening_q42", question: "42. What sport did Leo play before switching to swimming?", options: { A: "Basketball", B: "Football for the school team", C: "Tennis" }, correctAnswer: "B" },
              { id: "listening_q43", question: "43. How did Leo make peace with Mark yesterday?", options: { A: "He bought him a present.", B: "He wrote him an email to say sorry.", C: "He called his sister." }, correctAnswer: "B" },
              { id: "listening_q44", question: "44. Why couldn't Leo get help from his Math teacher Mr. Brown?", options: { A: "Mr. Brown was always very busy.", B: "Mr. Brown lives far away.", C: "Mr. Brown doesn't like Leo." }, correctAnswer: "A" },
              { id: "listening_q45", question: "45. What is Emma good at?", options: { A: "Swimming", B: "Numbers / Math", C: "Football" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 2 — Part 5: Final Review & Advice (Questions 46–50)",
            instructions: "For questions 46–50, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q46", question: "46. Did Leo have a stomach ache during his exams?", options: { A: "Yes, severe stomach ache.", B: "No, he did NOT have a stomach ache.", C: "Only on Mondays." }, correctAnswer: "B" },
              { id: "listening_q47", question: "47. What time does Leo go to sleep now?", options: { A: "9:00 PM", B: "9:30 PM", C: "Midnight" }, correctAnswer: "B" },
              { id: "listening_q48", question: "48. Where does Leo go swimming?", options: { A: "At school", B: "At the sports center", C: "At home" }, correctAnswer: "B" },
              { id: "listening_q49", question: "49. What are Leo and Mark planning to do this Saturday afternoon?", options: { A: "Play video games together", B: "Go swimming", C: "Visit the doctor" }, correctAnswer: "A" },
              { id: "listening_q50", question: "50. What mustn't you do if you feel stressed, according to Leo?", options: { A: "Talk to someone", B: "Keep it a secret", C: "Go to sleep early" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio3",
        audioUrl: "/audio/audio3.mp3",
        audioTitle: "Audio 3: End-of-term Party Dialogue (Sarah & Tom)",
        parts: [
          {
            part: 1,
            title: "Audio 3 — Part 1: Party Details & Chores (Questions 51–55)",
            instructions: "Listen to the dialogue between Sarah and Tom about the party. For questions 51–55, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q51", question: "51. Whose house is the end-of-term party at?", options: { A: "Tom's", B: "Sarah's", C: "Mark's" }, correctAnswer: "B" },
              { id: "listening_q52", question: "52. What chores must Tom complete to get permission to go to the party?", options: { A: "Wash car and walk dog", B: "Clean room and wash dishes", C: "Do homework and cook" }, correctAnswer: "B" },
              { id: "listening_q53", question: "53. Why doesn't Tom have to take out the trash?", options: { A: "It's his older brother's job", B: "The trash was already taken out", C: "Sarah takes out his trash" }, correctAnswer: "A" },
              { id: "listening_q54", question: "54. What time will Tom arrive at the party?", options: { A: "4:00 PM", B: "4:30 PM", C: "5:00 PM" }, correctAnswer: "B" },
              { id: "listening_q55", question: "55. What will they use inside the living room to stay cool?", options: { A: "Air conditioning", B: "The fan", C: "Open door" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 3 — Part 2: Information Completion (Questions 56–60)",
            instructions: "Listen to the dialogue and complete questions 56–60. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q56", gapNumber: 56, label: "Party Day:", prompt: "Saturday, July ______", correctAnswer: "15", acceptableAnswers: ["15", "15th"] },
              { id: "listening_q57", gapNumber: 57, label: "Start Time:", prompt: "______ PM", correctAnswer: "4:00", acceptableAnswers: ["4:00", "4", "4:00 pm", "4:00 PM"] },
              { id: "listening_q58", gapNumber: 58, label: "Tom's Lesson:", prompt: "______ lesson", correctAnswer: "piano", acceptableAnswers: ["piano", "Piano"] },
              { id: "listening_q59", gapNumber: 59, label: "Pizza Buyer:", prompt: "______", correctAnswer: "anna", acceptableAnswers: ["anna", "Anna"] },
              { id: "listening_q60", gapNumber: 60, label: "Speaker Buyer/Provider:", prompt: "______", correctAnswer: "mia", acceptableAnswers: ["mia", "Mia"] }
            ]
          },
          {
            part: 3,
            title: "Audio 3 — Part 3: Dialogue Comprehension (Questions 61–65)",
            instructions: "Listen to Audio 3 again. For questions 61–65, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q61", question: "61. Why must everyone leave by 8:30 PM?", options: { A: "Sarah's little sister goes to sleep at 9:00 PM", B: "The party ends at 6:00 PM", C: "Tom has another class" }, correctAnswer: "A" },
              { id: "listening_q62", question: "62. How much did the 3 large pizzas cost?", options: { A: "10 dollars", B: "15 dollars", C: "20 dollars" }, correctAnswer: "B" },
              { id: "listening_q63", question: "63. Are guests expected to pay for the pizzas?", options: { A: "Yes, 15 dollars each", B: "No, Sarah's parents are paying", C: "Yes, 5 dollars each" }, correctAnswer: "B" },
              { id: "listening_q64", question: "64. What video game console activity will they do on Mark's console?", options: { A: "Racing games", B: "Sports games", C: "Puzzles" }, correctAnswer: "A" },
              { id: "listening_q65", question: "65. What snack did Sarah suggest Tom bring?", options: { A: "Sandwiches", B: "Potato chips", C: "Apples" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 3 — Part 4: Detailed Comprehension (Questions 66–70)",
            instructions: "For questions 66–70, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q66", question: "66. When does Sarah's party start and finish?", options: { A: "Starts at 3:00 PM, finishes at 7:00 PM", B: "Starts at 4:00 PM, finishes at 8:00 PM", C: "Starts at 5:00 PM, finishes at 9:00 PM" }, correctAnswer: "B" },
              { id: "listening_q67", question: "67. What time is Tom's piano lesson?", options: { A: "3:30 PM", B: "4:00 PM", C: "4:30 PM" }, correctAnswer: "A" },
              { id: "listening_q68", question: "68. What is Leo buying for the party?", options: { A: "Pizzas and sandwiches", B: "Sodas and water", C: "Potato chips" }, correctAnswer: "B" },
              { id: "listening_q69", question: "69. What is Mia bringing to the party?", options: { A: "The music speaker", B: "Video games", C: "Food" }, correctAnswer: "A" },
              { id: "listening_q70", question: "70. What is the rule about shoes at Sarah's house?", options: { A: "Must wear clean shoes", B: "Mustn't wear shoes inside living room (leave in hall)", C: "Leave shoes outside in the rain" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 3 — Part 5: Final Review & Details (Questions 71–75)",
            instructions: "For questions 71–75, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q71", question: "71. Can Tom wash the dishes tonight instead of right now?", options: { A: "Yes, Sarah suggested doing it tonight", B: "No, he must wash them now", C: "He doesn't have to wash them" }, correctAnswer: "A" },
              { id: "listening_q72", question: "72. Are they serving sandwiches at the party?", options: { A: "Yes, 3 varieties", B: "No, Anna bought 3 large pizzas", C: "Only if Tom brings them" }, correctAnswer: "B" },
              { id: "listening_q73", question: "73. What drinks will Leo bring?", options: { A: "Sodas and water", B: "Orange juice", C: "Tea" }, correctAnswer: "A" },
              { id: "listening_q74", question: "74. What type of games will they play on Mark's console?", options: { A: "Racing games", B: "Football games", C: "Action games" }, correctAnswer: "A" },
              { id: "listening_q75", question: "75. What is the last thing Tom says he will do before the party on Saturday?", options: { A: "Clean his room now", B: "Buy shoes", C: "Call Mia" }, correctAnswer: "A" }
            ]
          }
        ]
      },

      {
        id: "audio4",
        audioUrl: "/audio/audio4.mp3",
        audioTitle: "Audio 4: School Trip to Mega Tech & Nature Park",
        parts: [
          {
            part: 1,
            title: "Audio 4 — Part 1: Trip Details & Dates (Questions 76–80)",
            instructions: "Listen to the announcement about the school trip. For questions 76–80, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q76", question: "76. Why was the trip date changed from October to September 18th?", options: { A: "The school was closed in October", B: "The park offered a better date this month", C: "Buses were not available" }, correctAnswer: "B" },
              { id: "listening_q77", question: "77. At what time must students arrive at the school parking lot?", options: { A: "7:15 AM sharp", B: "7:45 AM", C: "8:00 AM" }, correctAnswer: "A" },
              { id: "listening_q78", question: "78. How much is saved per ticket by booking as a school group (35 dollars vs 22 dollars)?", options: { A: "9 dollars", B: "13 dollars", C: "22 dollars" }, correctAnswer: "B" },
              { id: "listening_q79", question: "79. What items MUST NOT be brought on the trip?", options: { A: "Small backpack", B: "Portable gaming consoles or expensive cameras", C: "Water bottle" }, correctAnswer: "B" },
              { id: "listening_q80", question: "80. Who is Coach Sarah?", options: { A: "The school nurse", B: "The supervisor for afternoon outdoor activities and Zip-line", C: "The bus driver" }, correctAnswer: "B" }
            ]
          },
          {
            part: 2,
            title: "Audio 4 — Part 2: Information Completion (Questions 81–85)",
            instructions: "Listen to the announcement and complete questions 81–85. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q81", gapNumber: 81, label: "Student Ticket Price:", prompt: "$______", correctAnswer: "22", acceptableAnswers: ["22", "$22"] },
              { id: "listening_q82", gapNumber: 82, label: "Extra Lunch Combo Price:", prompt: "$______", correctAnswer: "9", acceptableAnswers: ["9", "$9"] },
              { id: "listening_q83", gapNumber: 83, label: "Morning Lab Subject:", prompt: "VR Simulator & ______", correctAnswer: "coding", acceptableAnswers: ["coding", "Coding"] },
              { id: "listening_q84", gapNumber: 84, label: "Afternoon Challenge:", prompt: "______-line", correctAnswer: "zip", acceptableAnswers: ["zip", "Zip"] },
              { id: "listening_q85", gapNumber: 85, label: "Bus Rule:", prompt: "No ______ inside the bus", correctAnswer: "eating", acceptableAnswers: ["eating", "Eating", "food"] }
            ]
          },
          {
            part: 3,
            title: "Audio 4 — Part 3: Equipment & Schedule (Questions 86–90)",
            instructions: "Listen to Audio 4 again. For questions 86–90, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q86", question: "86. What will every student receive at the park entrance to record answers?", options: { A: "A notebook", B: "A digital tablet", C: "A clipboard" }, correctAnswer: "B" },
              { id: "listening_q87", question: "87. Which items are required for every student to bring?", options: { A: "Refillable water bottle and small backpack", B: "Laptops and headphones", C: "Sandals and cameras" }, correctAnswer: "A" },
              { id: "listening_q88", question: "88. What type of footwear must students wear for safety during climbing activities?", options: { A: "Sandals", B: "Flip-flops", C: "Closed sneakers" }, correctAnswer: "C" },
              { id: "listening_q89", question: "89. What time does the afternoon outdoor activity session finish?", options: { A: "1:00 PM", B: "3:30 PM", C: "4:30 PM" }, correctAnswer: "B" },
              { id: "listening_q90", question: "90. What is the role of Mrs. Green on the trip?", options: { A: "Bus driver", B: "School nurse", C: "Coding instructor" }, correctAnswer: "B" }
            ]
          },
          {
            part: 4,
            title: "Audio 4 — Part 4: Detailed Comprehension (Questions 91–95)",
            instructions: "For questions 91–95, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q91", question: "91. How much is the total cost for a student who buys the ticket and the park lunch combo (22 dollars + 9 dollars)?", options: { A: "22 dollars", B: "31 dollars", C: "35 dollars" }, correctAnswer: "B" },
              { id: "listening_q92", question: "92. What drink is included in the special park lunch combo?", options: { A: "Soda", B: "Juice", C: "Water" }, correctAnswer: "B" },
              { id: "listening_q93", question: "93. What time will the group leave the park in the afternoon?", options: { A: "3:30 PM", B: "4:30 PM", C: "5:30 PM" }, correctAnswer: "B" },
              { id: "listening_q94", question: "94. Can students bring their own lunch from home instead of ordering the combo?", options: { A: "Yes, if they prefer", B: "No, park lunch is mandatory", C: "Only if they have allergies" }, correctAnswer: "A" },
              { id: "listening_q95", question: "95. Why shouldn't students bring expensive cameras?", options: { A: "Cameras are forbidden by law", B: "The school is not responsible for lost electronics", C: "Park has no light" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 4 — Part 5: Final Review & Permissions (Questions 96–100)",
            instructions: "For questions 96–100, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q96", question: "96. On what day of the week is the permission slip due?", options: { A: "Wednesday, September 16th", B: "Friday, September 18th", C: "Monday, September 21st" }, correctAnswer: "A" },
              { id: "listening_q97", question: "97. Who asked students to keep the bus clean by not eating inside?", options: { A: "Mr. Clark", B: "Mr. Bob (the bus driver)", C: "Mrs. Green" }, correctAnswer: "B" },
              { id: "listening_q98", question: "98. Where will students be from 9:00 AM to 12:00 PM?", options: { A: "At the central pavilion", B: "At the indoor VR Simulator and Coding Lab", C: "On the Zip-line" }, correctAnswer: "B" },
              { id: "listening_q99", question: "99. What casual clothes are permitted?", options: { A: "T-shirts and shorts with closed sneakers", B: "Swimming suits", C: "Pajamas" }, correctAnswer: "A" },
              { id: "listening_q100", question: "100. What happens at 5:30 PM?", options: { A: "Bus leaves school", B: "Students arrive back at school", C: "Lunch begins" }, correctAnswer: "B" }
            ]
          }
        ]
      },

      {
        id: "audio5",
        audioUrl: "/audio/audio5.mp3",
        audioTitle: "Audio 5: Annual Young Inventors Competition Announcement",
        parts: [
          {
            part: 1,
            title: "Audio 5 — Part 1: Event Details & Dates (Questions 101–105)",
            instructions: "Listen to the announcement about the Young Inventors Competition. For questions 101–105, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q101", question: "101. What month was the Annual Young Inventors Competition originally planned for?", options: { A: "October", B: "November", C: "December" }, correctAnswer: "B" },
              { id: "listening_q102", question: "102. What is the deadline for turning in team application forms?", options: { A: "Friday, October 10th", B: "Saturday, October 24th", C: "Friday, October 30th" }, correctAnswer: "A" },
              { id: "listening_q103", question: "103. What time does the awards ceremony start?", options: { A: "1:00 PM", B: "2:00 PM", C: "3:00 PM" }, correctAnswer: "C" },
              { id: "listening_q104", question: "104. What safety rule must all projects follow?", options: { A: "Must use high-voltage electricity", B: "Mustn't use dangerous chemicals, open flames, or high-voltage", C: "Must be built of metal" }, correctAnswer: "B" },
              { id: "listening_q105", question: "105. What is the grand prize for the overall first-place team?", options: { A: "A 3D printer for the school tech lab and trophy cups", B: "$100 gift card", C: "Trip to Tech Park" }, correctAnswer: "A" }
            ]
          },
          {
            part: 2,
            title: "Audio 5 — Part 2: Information Completion (Questions 106–110)",
            instructions: "Listen to the announcement and complete questions 106–110. Write ONE word, number, or time in each gap.",
            type: "gap_fill",
            questions: [
              { id: "listening_q106", gapNumber: 106, label: "Setup Time:", prompt: "______ AM", correctAnswer: "8:30", acceptableAnswers: ["8:30", "8:30 am", "8:30 AM"] },
              { id: "listening_q107", gapNumber: 107, label: "Presentation Start Time:", prompt: "______ AM", correctAnswer: "9:15", acceptableAnswers: ["9:15", "9:15 am", "9:15 AM"] },
              { id: "listening_q108", gapNumber: 108, label: "Registration Fee:", prompt: "$______", correctAnswer: "10", acceptableAnswers: ["10", "$10"] },
              { id: "listening_q109", gapNumber: 109, label: "Summary Page Length:", prompt: "______ page", correctAnswer: "1", acceptableAnswers: ["1", "one", "One"] },
              { id: "listening_q110", gapNumber: 110, label: "Robotics Judge:", prompt: "Mr. ______", correctAnswer: "evans", acceptableAnswers: ["evans", "Evans"] }
            ]
          },
          {
            part: 3,
            title: "Audio 5 — Part 3: Monologue Comprehension (Questions 111–115)",
            instructions: "Listen to Audio 5 again. For questions 111–115, choose the best answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q111", question: "111. Where in the gymnasium will Sarah be stationed?", options: { A: "On stage", B: "At the registration desk inside the gym lobby", C: "In the cafeteria" }, correctAnswer: "B" },
              { id: "listening_q112", question: "112. Are late entries accepted after Friday, October 10th?", options: { A: "Yes, with $5 extra", B: "No, late entries will NOT be accepted", C: "Only for 6th graders" }, correctAnswer: "B" },
              { id: "listening_q113", question: "113. What is included with the 10-dollar registration fee?", options: { A: "Display table and official participant badges", B: "3D printer", C: "Water bottle" }, correctAnswer: "A" },
              { id: "listening_q114", question: "114. What must every team hand in to Sarah upon registration?", options: { A: "Their working prototype", B: "A one-page printed summary explaining their invention", C: "Entry money" }, correctAnswer: "B" },
              { id: "listening_q115", question: "115. Who judges the Health Tech and Wellness devices category?", options: { A: "Mr. Evans", B: "Ms. Davis", C: "Dr. Miller" }, correctAnswer: "C" }
            ]
          },
          {
            part: 4,
            title: "Audio 5 — Part 4: Detailed Comprehension (Questions 116–120)",
            instructions: "For questions 116–120, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q116", question: "116. How many judges will be evaluating the three project categories?", options: { A: "Two", B: "Three", C: "Five" }, correctAnswer: "B" },
              { id: "listening_q117", question: "117. What should students bring to stay hydrated?", options: { A: "Sodas", B: "Refillable water bottle", C: "Milk" }, correctAnswer: "B" },
              { id: "listening_q118", question: "118. What category does Ms. Davis evaluate?", options: { A: "Robotics and Smart Gadgets", B: "Green Energy and Recycling inventions", C: "Health Tech" }, correctAnswer: "B" },
              { id: "listening_q119", question: "119. Can a team have 4 members?", options: { A: "Yes, up to 5", B: "No, maximum team size is 3 students", C: "Unlimited" }, correctAnswer: "B" },
              { id: "listening_q20", question: "120. What time do project presentations begin on October 24th?", options: { A: "8:30 AM", B: "9:15 AM sharp", C: "12:00 PM" }, correctAnswer: "B" }
            ]
          },
          {
            part: 5,
            title: "Audio 5 — Part 5: Matching & Rules Details (Questions 121–125)",
            instructions: "For questions 121–125, choose the correct answer (A, B, or C).",
            type: "multiple_choice",
            questions: [
              { id: "listening_q121", question: "121. Where will project presentations take place?", options: { A: "Main school gymnasium", B: "City hall", C: "Library" }, correctAnswer: "A" },
              { id: "listening_q122", question: "122. What happens at 2:00 PM?", options: { A: "Setup begins", B: "Public and judges stand visits end", C: "Lunch is served" }, correctAnswer: "B" },
              { id: "listening_q123", question: "123. What materials are recommended for the inventions?", options: { A: "Expensive tech kits", B: "Recycled materials like cardboard and plastic bottles", C: "Gold wires" }, correctAnswer: "B" },
              { id: "listening_q124", question: "124. What happens if a team uses open flames or dangerous chemicals?", options: { A: "Project is disqualified immediately", B: "They pay $10 fine", C: "They get warning" }, correctAnswer: "A" },
              { id: "listening_q125", question: "125. What individual awards will first-place team members receive?", options: { A: "Trophy cups", B: "Laptops", C: "Medals only" }, correctAnswer: "A" }
            ]
          }
        ]
      }
    ]
  }
];

module.exports = listeningVersions;
