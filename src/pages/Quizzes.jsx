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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { questionBank } from "../data/quizQuestions";
import { quizCatalog } from "../data/quizzes";
import { stats as quizSummary } from "../data/quizData";
import { useQuiz } from "../context/QuizContext";

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
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { recordAttempt, totals: quickTotals, accuracy: quickAccuracy } = useQuiz();
  const navigate = useNavigate(); // Initialize navigate

  const quizzes = quizCatalog;
  const stats = quizSummary;

  const handleOptionSelect = (question, optionIndex) => {
    const optionValue = question.options[optionIndex];
    const isCorrect = optionValue === question.answer;

    setSelectedAnswers((prev) => ({
      ...prev,
      [question.id]: {
        index: optionIndex,
        isCorrect,
      },
    }));

    recordAttempt({
      questionId: question.id,
      correct: isCorrect,
      category: question.category,
      difficulty: question.difficulty,
      timeTaken: 1,
      prompt: question.question,
      source: "quick-practice",
      quizId: question.id,
    });
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

            {quickTotals.attempts > 0 && (
              <div
                className={`mt-4 flex flex-col gap-2 rounded-lg border ${theme.border.primary} ${
                  theme.isDark ? "bg-indigo-500/10" : "bg-indigo-50"
                } p-3 text-sm`}
              >
                <div className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
                  <BarChart3 size={16} />
                  <span>Your quick practice progress</span>
                </div>
                <p className={`${theme.text.secondary}`}>
                  Answered <span className="font-semibold">{quickTotals.attempts}</span> questions with
                  an accuracy of <span className="font-semibold">{quickAccuracy}%</span>.
                </p>
              </div>
            )}

            <div className="mt-4 space-y-4">
              {quickQuestions.map((question, index) => {
                const selection = selectedAnswers[question.id];
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
                        const isSelected = selection?.index === optionIndex;
                        const isCorrectOption = option === question.answer;
                        const isCorrectSelection = isSelected && selection?.isCorrect;
                        const isIncorrectSelection = isSelected && selection && !selection.isCorrect;
                        const showCorrectHighlight =
                          selection && !selection.isCorrect && isCorrectOption;

                        let optionClasses = `${theme.border.primary} ${
                          theme.isDark ? "bg-slate-900/60" : "bg-slate-50"
                        }`;

                        if (selection) {
                          if (isCorrectSelection) {
                            optionClasses = "border-green-500 bg-green-500/10 text-green-600 font-semibold";
                          } else if (isIncorrectSelection) {
                            optionClasses = "border-rose-500 bg-rose-500/10 text-rose-600 font-semibold";
                          } else if (showCorrectHighlight) {
                            optionClasses = "border-green-500/60 bg-green-500/10 text-green-600";
                          }
                        }

                        return (
                          <li key={optionIndex}>
                            <button
                              type="button"
                              onClick={() =>
                                handleOptionSelect(question, optionIndex)
                              }
                              className={`flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${optionClasses}`}
                            >
                              <span className="font-semibold">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <span>{option}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    {selection && (
                      <div
                        className={`mt-3 rounded-lg border-l-4 px-3 py-2 text-sm ${
                          selection.isCorrect
                            ? theme.isDark
                              ? "border-green-500 bg-green-500/10"
                              : "border-green-500 bg-green-50"
                            : theme.isDark
                            ? "border-rose-500 bg-rose-500/10"
                            : "border-rose-500 bg-rose-50"
                        }`}
                      >
                        <p className="font-semibold">
                          {selection.isCorrect
                            ? "Correct! Great job."
                            : `Not quite. Correct answer: ${
                                answerLabel ? `${answerLabel}. ` : ""
                              }${question.answer}`}
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
                    <span>{quiz.questionSet ? quiz.questionSet.length : 0} questions</span>
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

                    {quiz.questionSet && quiz.questionSet.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Sample Questions</h4>
                        <ol className={`list-decimal space-y-2 pl-5 text-sm ${theme.text.secondary}`}>
                          {quiz.questionSet.slice(0, 3).map((question) => (
                            <li key={question.id}>{question.prompt}</li>
                          ))}
                        </ol>
                        {quiz.questionSet.length > 3 && (
                          <p className={`mt-2 text-xs ${theme.text.muted}`}>
                            Contains {quiz.questionSet.length} total questions.
                          </p>
                        )}
                      </div>
                    )}
                    
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