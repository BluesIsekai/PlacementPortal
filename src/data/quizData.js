export const stats = {
  totalQuizzes: 25,
  completedQuizzes: 12,
  averageScore: 78,
  totalTimeSpent: "15h 30m",
};

export const quizzes = [
  {
    id: 1,
    title: "Aptitude Test: Quantitative Ability",
    description: "Test your quantitative skills with these challenging problems",
    category: "aptitude",
    difficulty: "medium",
    questions: 20,
    time: 30,
    completed: true,
    score: 85,
    attempts: 3,
    bestScore: 92,
    topics: ["Percentages", "Ratios", "Time & Work", "Profit & Loss"],
  },
  {
    id: 2,
    title: "Verbal Ability Practice",
    description: "Improve your English grammar and vocabulary",
    category: "verbal",
    difficulty: "easy",
    questions: 15,
    time: 20,
    completed: true,
    score: 78,
    attempts: 2,
    bestScore: 78,
    topics: ["Grammar", "Vocabulary", "Reading Comprehension"],
  },
  // ... Add more quizzes as needed
];
