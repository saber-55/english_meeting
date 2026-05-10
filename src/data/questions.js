export const categories = [
  "Self Introduction",
  "Academic Background",
  "Research Experience",
  "Project Experience",
  "Competition Experience",
  "Graduate Study Plan",
  "Supervisor Matching",
  "Professional Knowledge",
  "Stress Questions",
  "Follow-up Questions"
];

export const difficulties = ["Easy", "Medium", "Hard"];

export const builtInQuestions = [
  {
    id: "builtin-001",
    category: "Self Introduction",
    difficulty: "Easy",
    question: "Could you please introduce yourself briefly?",
    translation: "请你简要介绍一下自己。",
    referenceAnswer: "Good morning, professors. My name is ... I major in ... I am interested in research and hope to continue improving my academic ability during postgraduate study.",
    tags: ["introduction", "basic"]
  },
  {
    id: "builtin-002",
    category: "Self Introduction",
    difficulty: "Easy",
    question: "What are your main strengths?",
    translation: "你的主要优点是什么？",
    referenceAnswer: "My main strengths are responsibility, self-discipline, and the ability to learn independently. I can stay focused when facing long-term tasks.",
    tags: ["strengths", "personal"]
  },
  {
    id: "builtin-003",
    category: "Self Introduction",
    difficulty: "Easy",
    question: "What are your hobbies, and how do they influence you?",
    translation: "你的兴趣爱好是什么？它们如何影响你？",
    referenceAnswer: "I enjoy reading, sports, and learning new technologies. These hobbies help me relax, keep energetic, and maintain curiosity.",
    tags: ["hobbies", "personal"]
  },
  {
    id: "builtin-004",
    category: "Self Introduction",
    difficulty: "Medium",
    question: "How would your friends or classmates describe you?",
    translation: "你的朋友或同学会如何评价你？",
    referenceAnswer: "They may describe me as reliable, patient, and willing to cooperate with others, especially in group assignments and projects.",
    tags: ["personality", "teamwork"]
  },
  {
    id: "builtin-005",
    category: "Self Introduction",
    difficulty: "Medium",
    question: "Why do you think you are suitable for postgraduate study?",
    translation: "你为什么认为自己适合研究生学习？",
    referenceAnswer: "I think I am suitable because I enjoy exploring problems deeply, I am willing to read and practice, and I have clear motivation for further study.",
    tags: ["motivation", "postgraduate"]
  },
  {
    id: "builtin-006",
    category: "Self Introduction",
    difficulty: "Hard",
    question: "Can you describe a turning point in your undergraduate life?",
    translation: "你能描述本科阶段的一个转折点吗？",
    referenceAnswer: "A turning point was when I joined a project or competition. It helped me understand the gap between classroom knowledge and real problem solving.",
    tags: ["reflection", "growth"]
  },
  {
    id: "builtin-007",
    category: "Academic Background",
    difficulty: "Easy",
    question: "What is your undergraduate major?",
    translation: "你的本科专业是什么？",
    referenceAnswer: "My undergraduate major is ... Through this major, I learned fundamental knowledge in mathematics, programming, and professional courses.",
    tags: ["major", "basic"]
  },
  {
    id: "builtin-008",
    category: "Academic Background",
    difficulty: "Easy",
    question: "Which course impressed you most during your undergraduate study?",
    translation: "本科期间哪门课程给你留下最深印象？",
    referenceAnswer: "The course that impressed me most was ... because it helped me build a systematic understanding of my field.",
    tags: ["course", "study"]
  },
  {
    id: "builtin-009",
    category: "Academic Background",
    difficulty: "Medium",
    question: "What course was the most difficult for you, and how did you overcome it?",
    translation: "哪门课程对你来说最难？你是如何克服的？",
    referenceAnswer: "The most difficult course was ... I overcame it by reviewing basic concepts, doing exercises, and discussing problems with classmates.",
    tags: ["challenge", "learning"]
  },
  {
    id: "builtin-010",
    category: "Academic Background",
    difficulty: "Medium",
    question: "How do you usually learn a new technical topic?",
    translation: "你通常如何学习一个新的技术主题？",
    referenceAnswer: "I usually start from basic concepts, then read tutorials or papers, reproduce simple examples, and finally summarize what I have learned.",
    tags: ["learning method", "technical"]
  },
  {
    id: "builtin-011",
    category: "Academic Background",
    difficulty: "Medium",
    question: "What academic ability do you think is most important for graduate students?",
    translation: "你认为研究生最重要的学术能力是什么？",
    referenceAnswer: "I think the most important ability is independent learning, followed by critical thinking, communication, and the ability to conduct experiments carefully.",
    tags: ["academic ability", "graduate"]
  },
  {
    id: "builtin-012",
    category: "Academic Background",
    difficulty: "Hard",
    question: "How do you evaluate your undergraduate academic performance?",
    translation: "你如何评价自己的本科阶段学业表现？",
    referenceAnswer: "Overall, I think my performance shows steady effort. I still have room to improve, especially in deeper theoretical understanding and research training.",
    tags: ["academic performance", "reflection"]
  },
  {
    id: "builtin-013",
    category: "Research Experience",
    difficulty: "Easy",
    question: "Have you participated in any research-related work?",
    translation: "你是否参与过科研相关工作？",
    referenceAnswer: "Yes. I have participated in research-related learning or project work, where I learned how to define problems, search literature, and verify ideas.",
    tags: ["research", "experience"]
  },
  {
    id: "builtin-014",
    category: "Research Experience",
    difficulty: "Easy",
    question: "What is your understanding of scientific research?",
    translation: "你对科学研究的理解是什么？",
    referenceAnswer: "In my view, research means finding valuable problems, analyzing them systematically, proposing methods, and verifying them through evidence.",
    tags: ["research understanding", "basic"]
  },
  {
    id: "builtin-015",
    category: "Research Experience",
    difficulty: "Medium",
    question: "How do you usually read an academic paper?",
    translation: "你通常如何阅读一篇学术论文？",
    referenceAnswer: "I first read the abstract and conclusion, then understand the problem and method, check the experiments, and finally summarize the contribution and limitations.",
    tags: ["paper reading", "research"]
  },
  {
    id: "builtin-016",
    category: "Research Experience",
    difficulty: "Medium",
    question: "Can you describe a research or technical problem you tried to solve?",
    translation: "你能描述一个你尝试解决的科研或技术问题吗？",
    referenceAnswer: "I once tried to solve ... The key challenge was ... I analyzed possible causes, tested different solutions, and learned from the process.",
    tags: ["problem solving", "research"]
  },
  {
    id: "builtin-017",
    category: "Research Experience",
    difficulty: "Hard",
    question: "What would you do if your experimental results are worse than expected?",
    translation: "如果实验结果低于预期，你会怎么做？",
    referenceAnswer: "I would check the implementation, verify the data and settings, compare with baselines, analyze possible reasons, and adjust the method carefully.",
    tags: ["experiment", "failure"]
  },
  {
    id: "builtin-018",
    category: "Research Experience",
    difficulty: "Hard",
    question: "How do you judge whether a research problem is valuable?",
    translation: "你如何判断一个研究问题是否有价值？",
    referenceAnswer: "I would consider its theoretical significance, practical demand, novelty, feasibility, and whether solving it can bring meaningful improvement.",
    tags: ["research value", "critical thinking"]
  },
  {
    id: "builtin-019",
    category: "Project Experience",
    difficulty: "Easy",
    question: "Could you introduce one project you have completed?",
    translation: "请介绍一个你完成过的项目。",
    referenceAnswer: "One project I completed was ... It aimed to ... My main responsibility was ... Through it, I improved my practical ability.",
    tags: ["project", "introduction"]
  },
  {
    id: "builtin-020",
    category: "Project Experience",
    difficulty: "Easy",
    question: "What was your main responsibility in this project?",
    translation: "你在这个项目中的主要职责是什么？",
    referenceAnswer: "My main responsibility was to complete a specific module, test its function, communicate with teammates, and help integrate it into the whole system.",
    tags: ["responsibility", "project"]
  },
  {
    id: "builtin-021",
    category: "Project Experience",
    difficulty: "Medium",
    question: "What was the biggest challenge in your project?",
    translation: "你项目中最大的挑战是什么？",
    referenceAnswer: "The biggest challenge was ... I handled it by breaking the problem into smaller parts and testing each part step by step.",
    tags: ["challenge", "project"]
  },
  {
    id: "builtin-022",
    category: "Project Experience",
    difficulty: "Medium",
    question: "How did you cooperate with your teammates in the project?",
    translation: "你在项目中如何与队友合作？",
    referenceAnswer: "We divided tasks clearly, communicated progress regularly, discussed technical problems, and helped each other during integration and testing.",
    tags: ["teamwork", "project"]
  },
  {
    id: "builtin-023",
    category: "Project Experience",
    difficulty: "Medium",
    question: "What did you learn from your project experience?",
    translation: "你从项目经历中学到了什么？",
    referenceAnswer: "I learned that practical projects require not only technical knowledge, but also planning, testing, communication, and patience.",
    tags: ["learning", "project"]
  },
  {
    id: "builtin-024",
    category: "Project Experience",
    difficulty: "Hard",
    question: "If you could improve your project, what would you do?",
    translation: "如果可以改进你的项目，你会怎么做？",
    referenceAnswer: "I would improve the robustness, add more tests, optimize the performance, and make the documentation clearer for future maintenance.",
    tags: ["improvement", "project"]
  },
  {
    id: "builtin-025",
    category: "Competition Experience",
    difficulty: "Easy",
    question: "Have you participated in any competitions?",
    translation: "你参加过竞赛吗？",
    referenceAnswer: "Yes. I have participated in competitions related to my major. These experiences helped me improve practical skills and teamwork.",
    tags: ["competition", "experience"]
  },
  {
    id: "builtin-026",
    category: "Competition Experience",
    difficulty: "Easy",
    question: "Why did you join this competition?",
    translation: "你为什么参加这项竞赛？",
    referenceAnswer: "I joined it because I wanted to apply what I learned in class to real tasks and improve my engineering practice ability.",
    tags: ["motivation", "competition"]
  },
  {
    id: "builtin-027",
    category: "Competition Experience",
    difficulty: "Medium",
    question: "What was your contribution to the team during the competition?",
    translation: "你在竞赛团队中的贡献是什么？",
    referenceAnswer: "I was responsible for ... I also helped with testing, debugging, and communicating with teammates to complete the final work.",
    tags: ["contribution", "team"]
  },
  {
    id: "builtin-028",
    category: "Competition Experience",
    difficulty: "Medium",
    question: "What difficulties did your team meet in the competition?",
    translation: "你们团队在竞赛中遇到了哪些困难？",
    referenceAnswer: "We met difficulties such as time pressure, technical bugs, and integration problems. We solved them through discussion and repeated testing.",
    tags: ["difficulty", "competition"]
  },
  {
    id: "builtin-029",
    category: "Competition Experience",
    difficulty: "Hard",
    question: "What did the competition teach you about pressure management?",
    translation: "这项竞赛让你对压力管理有什么认识？",
    referenceAnswer: "It taught me to prioritize important tasks, stay calm, communicate clearly, and keep improving even when time is limited.",
    tags: ["pressure", "competition"]
  },
  {
    id: "builtin-030",
    category: "Competition Experience",
    difficulty: "Hard",
    question: "If you failed in a competition, how would you reflect on it?",
    translation: "如果竞赛失败了，你会如何复盘？",
    referenceAnswer: "I would analyze the reasons objectively, including preparation, technical choices, teamwork, and time management, then summarize lessons for future work.",
    tags: ["failure", "reflection"]
  },
  {
    id: "builtin-031",
    category: "Graduate Study Plan",
    difficulty: "Easy",
    question: "Why do you want to pursue postgraduate study?",
    translation: "你为什么想读研究生？",
    referenceAnswer: "I want to pursue postgraduate study because I hope to gain deeper knowledge, receive systematic research training, and improve my ability to solve complex problems.",
    tags: ["motivation", "graduate"]
  },
  {
    id: "builtin-032",
    category: "Graduate Study Plan",
    difficulty: "Easy",
    question: "What is your plan for the first year of postgraduate study?",
    translation: "你研究生第一年的计划是什么？",
    referenceAnswer: "In the first year, I plan to strengthen my theoretical foundation, read papers, learn research tools, and adapt to the research environment.",
    tags: ["first year", "plan"]
  },
  {
    id: "builtin-033",
    category: "Graduate Study Plan",
    difficulty: "Medium",
    question: "What research direction are you interested in?",
    translation: "你感兴趣的研究方向是什么？",
    referenceAnswer: "I am interested in ... because it combines theoretical value and practical application, and it matches my previous learning experience.",
    tags: ["research direction", "interest"]
  },
  {
    id: "builtin-034",
    category: "Graduate Study Plan",
    difficulty: "Medium",
    question: "How will you improve your research ability during graduate study?",
    translation: "研究生阶段你将如何提升科研能力？",
    referenceAnswer: "I will read literature regularly, reproduce classic methods, discuss with my supervisor, conduct experiments carefully, and summarize my work often.",
    tags: ["research ability", "plan"]
  },
  {
    id: "builtin-035",
    category: "Graduate Study Plan",
    difficulty: "Hard",
    question: "What is your long-term academic or career goal?",
    translation: "你的长期学术或职业目标是什么？",
    referenceAnswer: "My long-term goal is to become a person who can solve practical problems with solid professional knowledge and research ability.",
    tags: ["career goal", "future"]
  },
  {
    id: "builtin-036",
    category: "Graduate Study Plan",
    difficulty: "Hard",
    question: "How do you balance research, coursework, and personal life?",
    translation: "你如何平衡科研、课程和个人生活？",
    referenceAnswer: "I would make clear plans, set priorities, improve efficiency, and keep a healthy routine so that I can work sustainably.",
    tags: ["balance", "time management"]
  },
  {
    id: "builtin-037",
    category: "Supervisor Matching",
    difficulty: "Easy",
    question: "Why are you interested in our university?",
    translation: "你为什么对我们学校感兴趣？",
    referenceAnswer: "I am interested in your university because it has strong academic resources, a good research atmosphere, and directions that match my interests.",
    tags: ["university", "motivation"]
  },
  {
    id: "builtin-038",
    category: "Supervisor Matching",
    difficulty: "Easy",
    question: "Why are you interested in this research group?",
    translation: "你为什么对这个课题组感兴趣？",
    referenceAnswer: "I am interested in this group because its research direction is closely related to my background and future study plan.",
    tags: ["research group", "matching"]
  },
  {
    id: "builtin-039",
    category: "Supervisor Matching",
    difficulty: "Medium",
    question: "What kind of supervisor do you hope to work with?",
    translation: "你希望和什么样的导师合作？",
    referenceAnswer: "I hope to work with a supervisor who is rigorous, patient, open to communication, and able to guide students in research thinking.",
    tags: ["supervisor", "expectation"]
  },
  {
    id: "builtin-040",
    category: "Supervisor Matching",
    difficulty: "Medium",
    question: "How does your background match this research direction?",
    translation: "你的背景如何匹配这个研究方向？",
    referenceAnswer: "My coursework, project experience, and learning interests provide a basic foundation. I am also willing to learn new knowledge quickly.",
    tags: ["matching", "background"]
  },
  {
    id: "builtin-041",
    category: "Supervisor Matching",
    difficulty: "Hard",
    question: "What can you contribute to the research group?",
    translation: "你能为课题组做出什么贡献？",
    referenceAnswer: "I can contribute careful implementation, active communication, teamwork, and a responsible attitude toward experiments and research tasks.",
    tags: ["contribution", "lab"]
  },
  {
    id: "builtin-042",
    category: "Supervisor Matching",
    difficulty: "Hard",
    question: "If your supervisor's requirement is different from your own idea, what would you do?",
    translation: "如果导师要求和你的想法不同，你会怎么做？",
    referenceAnswer: "I would first understand the supervisor's reason, communicate my thoughts respectfully, and try to find a practical solution based on research goals.",
    tags: ["communication", "supervisor"]
  },
  {
    id: "builtin-043",
    category: "Professional Knowledge",
    difficulty: "Easy",
    question: "Can you explain a basic concept from your major?",
    translation: "你能解释一个本专业的基础概念吗？",
    referenceAnswer: "One basic concept is ... It means ... It is important because ...",
    tags: ["professional", "basic"]
  },
  {
    id: "builtin-044",
    category: "Professional Knowledge",
    difficulty: "Easy",
    question: "What programming language or tool are you most familiar with?",
    translation: "你最熟悉哪种编程语言或工具？",
    referenceAnswer: "I am most familiar with ... I have used it in coursework, projects, or experiments to solve practical problems.",
    tags: ["tool", "programming"]
  },
  {
    id: "builtin-045",
    category: "Professional Knowledge",
    difficulty: "Medium",
    question: "How do you understand the relationship between theory and practice?",
    translation: "你如何理解理论和实践的关系？",
    referenceAnswer: "Theory provides principles and methods, while practice tests whether these methods work in real situations. They support each other.",
    tags: ["theory", "practice"]
  },
  {
    id: "builtin-046",
    category: "Professional Knowledge",
    difficulty: "Medium",
    question: "What is an important development trend in your field?",
    translation: "你所在领域的一个重要发展趋势是什么？",
    referenceAnswer: "One important trend is ... It is important because it may improve efficiency, intelligence, or real-world application ability.",
    tags: ["trend", "field"]
  },
  {
    id: "builtin-047",
    category: "Professional Knowledge",
    difficulty: "Hard",
    question: "How would you explain a technical problem to someone outside your major?",
    translation: "你会如何向非本专业的人解释一个技术问题？",
    referenceAnswer: "I would avoid too many technical terms, use simple examples, explain the motivation first, and then describe the key idea step by step.",
    tags: ["communication", "technical"]
  },
  {
    id: "builtin-048",
    category: "Professional Knowledge",
    difficulty: "Hard",
    question: "How do you keep up with new technologies in your field?",
    translation: "你如何跟进本领域的新技术？",
    referenceAnswer: "I keep up by reading papers, following technical blogs or open-source projects, reproducing examples, and discussing with classmates.",
    tags: ["technology", "learning"]
  },
  {
    id: "builtin-049",
    category: "Stress Questions",
    difficulty: "Medium",
    question: "Your GPA is not the highest. Why should we choose you?",
    translation: "你的绩点不是最高的，我们为什么要选择你？",
    referenceAnswer: "Although my GPA is not the highest, I have clear motivation, practical experience, and strong willingness to improve through graduate study.",
    tags: ["GPA", "stress"]
  },
  {
    id: "builtin-050",
    category: "Stress Questions",
    difficulty: "Medium",
    question: "What is your biggest weakness?",
    translation: "你最大的缺点是什么？",
    referenceAnswer: "Sometimes I focus too much on details. I am learning to manage priorities better while still maintaining quality.",
    tags: ["weakness", "reflection"]
  },
  {
    id: "builtin-051",
    category: "Stress Questions",
    difficulty: "Medium",
    question: "What would you do if you are rejected by this program?",
    translation: "如果你没有被这个项目录取，你会怎么做？",
    referenceAnswer: "I would accept the result, reflect on my weaknesses, continue improving my academic ability, and look for other suitable opportunities.",
    tags: ["rejection", "stress"]
  },
  {
    id: "builtin-052",
    category: "Stress Questions",
    difficulty: "Hard",
    question: "Why did you not publish a paper during your undergraduate study?",
    translation: "你本科期间为什么没有发表论文？",
    referenceAnswer: "I understand publication requires deep research training. During undergraduate study, I focused on foundations and practice, and I hope to improve in graduate study.",
    tags: ["publication", "stress"]
  },
  {
    id: "builtin-053",
    category: "Stress Questions",
    difficulty: "Hard",
    question: "If you cannot adapt to graduate research, what will you do?",
    translation: "如果你无法适应研究生科研，你会怎么办？",
    referenceAnswer: "I would communicate with my supervisor, adjust my learning methods, ask for advice, and make a concrete plan to improve step by step.",
    tags: ["adaptation", "graduate"]
  },
  {
    id: "builtin-054",
    category: "Stress Questions",
    difficulty: "Hard",
    question: "What if your research progress is much slower than your classmates?",
    translation: "如果你的科研进度比同学慢很多，你会怎么办？",
    referenceAnswer: "I would not simply compare with others. I would analyze my own problems, improve efficiency, seek feedback, and keep steady progress.",
    tags: ["progress", "pressure"]
  },
  {
    id: "builtin-055",
    category: "Follow-up Questions",
    difficulty: "Easy",
    question: "Could you give an example?",
    translation: "你能举个例子吗？",
    referenceAnswer: "For example, in one course or project, I encountered a problem and solved it by analyzing causes and testing different solutions.",
    tags: ["example", "follow-up"]
  },
  {
    id: "builtin-056",
    category: "Follow-up Questions",
    difficulty: "Easy",
    question: "Could you explain it in more detail?",
    translation: "你能更详细地解释一下吗？",
    referenceAnswer: "Certainly. I can explain it from three aspects: the background, the method, and the result.",
    tags: ["detail", "follow-up"]
  },
  {
    id: "builtin-057",
    category: "Follow-up Questions",
    difficulty: "Medium",
    question: "What evidence supports your answer?",
    translation: "有什么证据支持你的回答？",
    referenceAnswer: "The evidence includes my learning experience, project results, feedback from teammates, and repeated testing or practice.",
    tags: ["evidence", "follow-up"]
  },
  {
    id: "builtin-058",
    category: "Follow-up Questions",
    difficulty: "Medium",
    question: "What would you do next if you had more time?",
    translation: "如果有更多时间，你下一步会做什么？",
    referenceAnswer: "I would improve the work further, test it under more conditions, read more related materials, and summarize the limitations.",
    tags: ["future work", "follow-up"]
  },
  {
    id: "builtin-059",
    category: "Follow-up Questions",
    difficulty: "Hard",
    question: "Can you compare your choice with another possible option?",
    translation: "你能把你的选择和另一种可能方案比较一下吗？",
    referenceAnswer: "Yes. Compared with the other option, my choice has advantages in ... but it may also have limitations in ...",
    tags: ["comparison", "follow-up"]
  },
  {
    id: "builtin-060",
    category: "Follow-up Questions",
    difficulty: "Hard",
    question: "What is the most important lesson you learned from this experience?",
    translation: "你从这段经历中学到的最重要经验是什么？",
    referenceAnswer: "The most important lesson is that careful planning, continuous learning, and timely communication are essential for solving complex problems.",
    tags: ["lesson", "reflection"]
  },
  {
    id: "builtin-061",
    category: "Project Experience",
    difficulty: "Medium",
    question: "Could you describe a project related to artificial intelligence or embedded systems?",
    translation: "你能描述一个与人工智能或嵌入式系统相关的项目吗？",
    referenceAnswer: "I worked on a project related to AI or embedded systems. My work involved implementation, testing, and understanding the constraints of real devices.",
    tags: ["personalized", "AI", "embedded"]
  },
  {
    id: "builtin-062",
    category: "Professional Knowledge",
    difficulty: "Medium",
    question: "What is your understanding of model compression or efficient deployment?",
    translation: "你如何理解模型压缩或高效部署？",
    referenceAnswer: "Model compression and efficient deployment aim to make models smaller and faster while keeping useful performance, especially on devices with limited resources.",
    tags: ["personalized", "model compression"]
  },
  {
    id: "builtin-063",
    category: "Graduate Study Plan",
    difficulty: "Medium",
    question: "Are you interested in edge intelligence or on-device AI? Why?",
    translation: "你是否对边缘智能或端侧 AI 感兴趣？为什么？",
    referenceAnswer: "Yes. I am interested because it connects algorithms with real applications, and it requires balancing accuracy, latency, memory, and hardware constraints.",
    tags: ["personalized", "edge intelligence"]
  }
];
