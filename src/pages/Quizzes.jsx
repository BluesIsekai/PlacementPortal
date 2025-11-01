import React, { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  BarChart3,
  Award,
  Sparkles,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp,
  BookOpen,
  Timer,
  HelpCircle,
  Target,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { questionBank } from "../data/quizQuestions";

const QUICK_QUESTION_STORAGE_KEY = "placement-portal::quick-question-pool";

const getRandomSubset = (pool, count) => {
  const available = [...pool];
  const selection = [];
  const take = Math.min(count, available.length);

  for (let i = 0; i < take; i += 1) {
    const index = Math.floor(Math.random() * available.length);
    selection.push(available.splice(index, 1)[0]);
  }

  return selection;
};

const selectQuickQuestions = () => {
  const fallback = getRandomSubset(questionBank, 5);

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.sessionStorage.getItem(QUICK_QUESTION_STORAGE_KEY);
    const validIds = new Set(questionBank.map((question) => question.id));
    let remainingIds = [];

    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        remainingIds = parsed.filter((id) => validIds.has(id));
      }
    }

    if (remainingIds.length < 5) {
      remainingIds = questionBank.map((question) => question.id);
    }

    const pickedIds = getRandomSubset(remainingIds, 5);
    const leftoverIds = remainingIds.filter((id) => !pickedIds.includes(id));

    window.sessionStorage.setItem(
      QUICK_QUESTION_STORAGE_KEY,
      JSON.stringify(leftoverIds)
    );

    return pickedIds
      .map((id) => questionBank.find((question) => question.id === id))
      .filter(Boolean);
  } catch (error) {
    console.error("Unable to select quick questions", error);
    return fallback;
  }
};

const formatDifficultyLabel = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "";

const Quizzes = () => {
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [quickQuestions] = useState(() => selectQuickQuestions());
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  // Sample quiz data
  const quizzes = [
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
      topics: ["Percentages", "Ratios", "Time & Work", "Profit & Loss"]
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
      topics: ["Grammar", "Vocabulary", "Reading Comprehension"]
    },
    {
      id: 3,
      title: "Logical Reasoning Challenge",
      description: "Advanced logical reasoning problems",
      category: "reasoning",
      difficulty: "hard",
      questions: 25,
      time: 40,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Puzzles", "Series", "Pattern Recognition", "Deductive Reasoning"]
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      description: "Test your DSA knowledge for technical interviews",
      category: "technical",
      difficulty: "hard",
      questions: 15,
      time: 45,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Arrays", "Linked Lists", "Trees", "Sorting Algorithms"]
    },
    {
      id: 5,
      title: "DBMS Fundamentals",
      description: "Database management systems concepts",
      category: "technical",
      difficulty: "medium",
      questions: 20,
      time: 30,
      completed: true,
      score: 90,
      attempts: 1,
      bestScore: 90,
      topics: ["SQL", "Normalization", "Transactions", "Indexing"]
    },
    {
      id: 6,
      title: "Operating Systems Concepts",
      description: "Test your knowledge of OS fundamentals",
      category: "technical",
      difficulty: "medium",
      questions: 18,
      time: 25,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Process Management", "Memory Management", "Scheduling"]
    },
    {
      id: 7,
      title: "Company Specific: TCS Pattern",
      description: "Practice questions based on TCS recruitment pattern",
      category: "company",
      difficulty: "medium",
      questions: 30,
      time: 45,
      completed: true,
      score: 76,
      attempts: 2,
      bestScore: 76,
      topics: ["Quantitative", "Verbal", "Programming", "Reasoning"]
    },
    {
      id: 8,
      title: "Company Specific: Infosys Pattern",
      description: "Practice questions based on Infosys recruitment pattern",
      category: "company",
      difficulty: "medium",
      questions: 25,
      time: 35,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Pseudo Code", "Logical Reasoning", "Verbal Ability"]
    },
    {
      id: 9,
      title: "Aptitude: Probability and Statistics",
      description: "Master probability and statistics for aptitude tests",
      category: "aptitude",
      difficulty: "medium",
      questions: 20,
      time: 30,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Probability", "Statistics", "Combinatorics"]
    },
    {
      id: 10,
      title: "Verbal: Sentence Correction",
      description: "Practice sentence correction and grammar rules",
      category: "verbal",
      difficulty: "easy",
      questions: 15,
      time: 20,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Grammar", "Sentence Structure", "Error Detection"]
    },
    {
      id: 11,
      title: "Technical: Networking Basics",
      description: "Test your knowledge of computer networking fundamentals",
      category: "technical",
      difficulty: "medium",
      questions: 18,
      time: 25,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["OSI Model", "TCP/IP", "Routing"]
    },
    {
      id: 12,
      title: "Technical: Cybersecurity Essentials",
      description: "Learn and test your cybersecurity basics",
      category: "technical",
      difficulty: "hard",
      questions: 20,
      time: 40,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Encryption", "Threat Analysis", "Firewalls"]
    },
    {
      id: 13,
      title: "Aptitude: Geometry and Mensuration",
      description: "Solve problems on geometry and mensuration",
      category: "aptitude",
      difficulty: "hard",
      questions: 25,
      time: 40,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Triangles", "Circles", "Volume & Surface Area"]
    },
    {
      id: 14,
      title: "Verbal: Reading Comprehension",
      description: "Improve your reading comprehension skills",
      category: "verbal",
      difficulty: "medium",
      questions: 20,
      time: 30,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Passage Analysis", "Critical Thinking", "Inference"]
    },
    {
      id: 15,
      title: "Reasoning: Analytical Puzzles",
      description: "Challenge yourself with analytical puzzles",
      category: "reasoning",
      difficulty: "hard",
      questions: 30,
      time: 50,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Seating Arrangements", "Blood Relations", "Logical Deductions"]
    },
    {
      id: 16,
      title: "Technical: Software Engineering Basics",
      description: "Test your knowledge of software engineering principles",
      category: "technical",
      difficulty: "easy",
      questions: 15,
      time: 20,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["SDLC", "Agile Methodology", "Version Control"]
    },
    {
      id: 17,
      title: "Technical: Cloud Computing Fundamentals",
      description: "Learn and test your cloud computing basics",
      category: "technical",
      difficulty: "medium",
      questions: 18,
      time: 30,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["AWS", "Azure", "Virtualization"]
    },
    {
      id: 18,
      title: "Aptitude: Basic Arithmetic",
      description: "Practice fundamental arithmetic operations",
      category: "aptitude",
      difficulty: "easy",
      questions: 10,
      time: 15,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Addition", "Subtraction", "Multiplication", "Division"]
    },
    {
      id: 19,
      title: "Aptitude: Advanced Probability",
      description: "Solve challenging probability problems",
      category: "aptitude",
      difficulty: "hard",
      questions: 25,
      time: 40,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Bayes Theorem", "Conditional Probability", "Random Variables"]
    },
    {
      id: 20,
      title: "Verbal: Synonyms and Antonyms",
      description: "Enhance your vocabulary with synonyms and antonyms",
      category: "verbal",
      difficulty: "easy",
      questions: 12,
      time: 15,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Synonyms", "Antonyms", "Word Usage"]
    },
    {
      id: 21,
      title: "Verbal: Critical Reasoning",
      description: "Test your critical reasoning skills",
      category: "verbal",
      difficulty: "hard",
      questions: 20,
      time: 30,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Assumptions", "Conclusions", "Arguments"]
    },
    {
      id: 22,
      title: "Reasoning: Basic Patterns",
      description: "Identify simple patterns and sequences",
      category: "reasoning",
      difficulty: "easy",
      questions: 10,
      time: 15,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Number Patterns", "Shape Patterns"]
    },
    {
      id: 23,
      title: "Reasoning: Advanced Logical Deductions",
      description: "Challenge yourself with advanced logical deductions",
      category: "reasoning",
      difficulty: "hard",
      questions: 30,
      time: 50,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Syllogisms", "Complex Puzzles", "Critical Thinking"]
    },
    {
      id: 24,
      title: "Technical: Basics of Programming",
      description: "Test your understanding of basic programming concepts",
      category: "technical",
      difficulty: "easy",
      questions: 15,
      time: 20,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Variables", "Loops", "Functions"]
    },
    {
      id: 25,
      title: "Technical: Advanced Algorithms",
      description: "Solve complex algorithmic problems",
      category: "technical",
      difficulty: "hard",
      questions: 20,
      time: 40,
      completed: false,
      score: null,
      attempts: 0,
      bestScore: null,
      topics: ["Dynamic Programming", "Graph Theory", "Greedy Algorithms"]
    }
  ];

  const toggleAnswerVisibility = (questionId) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const categories = [
    { id: "all", label: "All Quizzes" },
    { id: "aptitude", label: "Aptitude" },
    { id: "verbal", label: "Verbal" },
    { id: "reasoning", label: "Reasoning" },
    { id: "technical", label: "Technical" },
    { id: "company", label: "Company Specific" }
  ];

  const difficulties = [
    { id: "all", label: "All Levels" },
    { id: "easy", label: "Easy" },
    { id: "medium", label: "Medium" },
    { id: "hard", label: "Hard" }
  ];

  const stats = {
    totalQuizzes: 24,
    completedQuizzes: 12,
    averageScore: 78,
    totalTimeSpent: "15h 30m"
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    // Category filter
    if (activeCategory !== "all" && quiz.category !== activeCategory) return false;
    
    // Difficulty filter
    if (difficultyFilter !== "all" && quiz.difficulty !== difficultyFilter) return false;
    
    // Search filter
    if (searchQuery && !quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !quiz.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "text-green-400 bg-green-500/20";
      case "medium": return "text-yellow-400 bg-yellow-500/20";
      case "hard": return "text-red-400 bg-red-500/20";
      default: return `${theme.text.tertiary} ${theme.bg.accent}`;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "aptitude": return <TrendingUp size={18} />;
      case "verbal": return <BookOpen size={18} />;
      case "reasoning": return <Target size={18} />;
      case "technical": return <Code size={18} />;
      case "company": return <Building size={18} />;
      default: return <HelpCircle size={18} />;
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text.primary} mb-6`}>Practice Quizzes</h1>
            <p className={`${theme.text.secondary} mt-2`}>
              Prepare for your placements with curated quizzes
            </p>
          </div>
          {/* Updated button to navigate to ProgressReport page */}
          <button
            onClick={() => navigate("/progress-report")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <BarChart3 size={18} />
            View Progress Report
          </button>
        </div>

        {quickQuestions.length > 0 && (
          <div className={`${theme.bg.card} ${theme.shadow.card} rounded-xl p-6 mb-8`}>
            <div className="flex flex-col gap-4 border-b border-dashed pb-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-lg p-2 ${
                    theme.isDark ? "bg-indigo-500/20" : "bg-indigo-100"
                  }`}
                >
                  <Sparkles size={20} className="text-indigo-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Quick Practice Deck</h2>
                  <p className={`text-sm ${theme.text.muted}`}>
                    Five random questions from our 50-question bank appear once
                    per session. Refresh after completing all to see a new set.
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${theme.text.muted}`}>
                <Timer size={16} />
                <span>Approx. 5 minutes</span>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {quickQuestions.map((question, index) => {
                const isRevealed = Boolean(revealedAnswers[question.id]);
                const answerIndex = question.options.findIndex(
                  (option) => option === question.answer
                );
                const answerLabel =
                  answerIndex >= 0 ? String.fromCharCode(65 + answerIndex) : "";

                return (
                  <div
                    key={question.id}
                    className={`rounded-xl border ${theme.border.primary} p-4 ${
                      theme.isDark ? "bg-slate-900/40" : "bg-white"
                    }`}
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase tracking-wide ${theme.text.accent}`}
                        >
                          {question.category}
                        </p>
                        <p className="mt-1 font-semibold leading-snug">
                          {`Q${index + 1}. ${question.question}`}
                        </p>
                      </div>
                      <span
                        className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyColor(
                          question.difficulty
                        )}`}
                      >
                        {formatDifficultyLabel(question.difficulty)}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isCorrect =
                          isRevealed && option === question.answer;
                        return (
                          <li
                            key={optionIndex}
                            className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
                              isCorrect
                                ? "border-indigo-500 bg-indigo-500/10 font-medium"
                                : `${theme.border.primary} ${
                                    theme.isDark
                                      ? "bg-slate-900/60"
                                      : "bg-slate-50"
                                  }`
                            }`}
                          >
                            <span className="font-semibold">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span>{option}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <button
                      type="button"
                      onClick={() => toggleAnswerVisibility(question.id)}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                    >
                      {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                      {isRevealed ? "Hide answer" : "Show answer"}
                    </button>

                    {isRevealed && (
                      <div
                        className={`mt-3 rounded-lg border-l-4 border-indigo-500 px-3 py-2 text-sm ${
                          theme.isDark ? "bg-slate-900/50" : "bg-indigo-50"
                        }`}
                      >
                        <p className="font-semibold">
                          Correct: {answerLabel ? `${answerLabel}. ` : ""}
                          {question.answer}
                        </p>
                        {question.explanation && (
                          <p className={`mt-1 ${theme.text.muted}`}>
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className={`mt-5 flex items-center gap-2 text-xs ${theme.text.muted}`}
            >
              <AlertCircle size={14} />
              <span>
                The rotation avoids repeats until the entire 50-question bank is
                exhausted.
              </span>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.bg.accent} rounded-lg`}>
                <BookOpen size={20} className="text-blue-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${theme.text.primary}`}>{stats.totalQuizzes}</p>
                <p className={`text-sm ${theme.text.tertiary}`}>Total Quizzes</p>
              </div>
            </div>
          </div>
          <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.bg.accent} rounded-lg`}>
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${theme.text.primary}`}>{stats.completedQuizzes}</p>
                <p className={`text-sm ${theme.text.tertiary}`}>Completed</p>
              </div>
            </div>
          </div>
          <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.bg.accent} rounded-lg`}>
                <Award size={20} className="text-amber-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${theme.text.primary}`}>{stats.averageScore}%</p>
                <p className={`text-sm ${theme.text.tertiary}`}>Average Score</p>
              </div>
            </div>
          </div>
          <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.isDark ? 'bg-purple-900/30' : 'bg-purple-100'} rounded-lg`}>
                <Clock size={20} className={`${theme.isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalTimeSpent}</p>
                <p className={`text-sm ${theme.text.muted}`}>Time Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4 mb-6`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.text.muted}`} />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.border.default} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.bg.input}`}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter size={18} className={`${theme.text.muted}`} />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-indigo-600 text-white"
                        : `${theme.bg.hover} ${theme.text.secondary} hover:${theme.bg.hover2}`
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              {/* Difficulty Filters */}
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className={`px-3 py-1.5 rounded-lg border ${theme.border.default} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.bg.input} text-sm`}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuizzes.map(quiz => (
            <div key={quiz.id} className={`${theme.bg.card} rounded-xl ${theme.shadow.card} overflow-hidden`}>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 ${theme.bg.hover} rounded-lg`}>
                      {getCategoryIcon(quiz.category)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                    </span>
                  </div>
                  {quiz.completed && (
                    <div className={`flex items-center gap-1 ${theme.isDark ? 'text-green-400' : 'text-green-600'}`}>
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>
                <p className={`${theme.text.muted} text-sm mb-4`}>{quiz.description}</p>
                
                <div className={`flex items-center gap-4 text-sm ${theme.text.muted} mb-4`}>
                  <div className="flex items-center gap-1">
                    <HelpCircle size={16} />
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{quiz.time} mins</span>
                  </div>
                </div>
                
                {expandedQuiz === quiz.id && (
                  <div className={`mt-4 p-4 ${theme.bg.accent} rounded-lg`}>
                    <h4 className="font-medium mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {quiz.topics.map((topic, index) => (
                        <span key={index} className={`px-2 py-1 ${theme.bg.hover} text-xs rounded-full`}>
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    {quiz.completed && (
                      <div className={`mt-4 pt-4 border-t ${theme.border.default}`}>
                        <h4 className="font-medium mb-2">Your Performance:</h4>
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center gap-1 ${theme.isDark ? 'text-green-400' : 'text-green-600'}`}>
                            <span className="font-semibold">{quiz.score}%</span>
                            <span>Score</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">{quiz.attempts}</span>
                            <span>Attempts</span>
                          </div>
                          {quiz.bestScore && (
                            <div className={`flex items-center gap-1 ${theme.isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                              <Star size={14} className="fill-current" />
                              <span className="font-semibold">{quiz.bestScore}%</span>
                              <span>Best</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setExpandedQuiz(expandedQuiz === quiz.id ? null : quiz.id)}
                    className="text-sm text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1"
                  >
                    {expandedQuiz === quiz.id ? (
                      <>
                        Show Less <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        Show Details <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                  
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Play size={16} />
                    {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
              <HelpCircle size={32} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No quizzes found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setDifficultyFilter("all");
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Adding missing icon component
const Code = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

// Adding missing icon component
const Building = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <rect x="9" y="6" width="6" height="6"></rect>
    <line x1="9" y1="14" x2="9" y2="20"></line>
    <line x1="15" y1="14" x2="15" y2="20"></line>
  </svg>
);

export default Quizzes;