import React, { useState } from "react";
import { 
  BarChart3, Download, Calendar, 
  Target, TrendingUp, Award, Clock, 
  CheckCircle, XCircle, HelpCircle, Filter,
  Star, ChevronDown, ChevronUp, BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ProgressReport = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Sample progress data
  const progressData = {
    overall: {
      quizzesAttempted: 18,
      averageScore: 76,
      totalTimeSpent: "15h 30m",
      improvement: 12, // percentage improvement
      bestCategory: "Aptitude",
      weakestCategory: "Verbal"
    },
    categoryPerformance: [
      {
        category: "Aptitude",
        attempts: 6,
        averageScore: 82,
        bestScore: 95,
        improvement: 15,
        topics: [
          { name: "Percentages", score: 85, attempts: 3 },
          { name: "Ratios", score: 90, attempts: 2 },
          { name: "Time & Work", score: 78, attempts: 4 },
          { name: "Profit & Loss", score: 75, attempts: 3 }
        ]
      },
      {
        category: "Verbal",
        attempts: 4,
        averageScore: 68,
        bestScore: 80,
        improvement: 5,
        topics: [
          { name: "Grammar", score: 72, attempts: 2 },
          { name: "Vocabulary", score: 65, attempts: 3 },
          { name: "Reading Comprehension", score: 70, attempts: 2 }
        ]
      },
      {
        category: "Reasoning",
        attempts: 5,
        averageScore: 80,
        bestScore: 92,
        improvement: 10,
        topics: [
          { name: "Puzzles", score: 85, attempts: 3 },
          { name: "Series", score: 78, attempts: 2 },
          { name: "Pattern Recognition", score: 82, attempts: 4 }
        ]
      },
      {
        category: "Technical",
        attempts: 3,
        averageScore: 74,
        bestScore: 88,
        improvement: 8,
        topics: [
          { name: "DSA", score: 70, attempts: 2 },
          { name: "DBMS", score: 80, attempts: 3 },
          { name: "OS", score: 72, attempts: 2 }
        ]
      }
    ],
    recentAttempts: [
      {
        id: 1,
        name: "Aptitude Test: Quantitative Ability",
        date: "Today, 10:30 AM",
        score: 85,
        timeSpent: "25m",
        correct: 17,
        incorrect: 3,
        skipped: 0
      },
      {
        id: 2,
        name: "Verbal Ability Practice",
        date: "Yesterday, 4:15 PM",
        score: 72,
        timeSpent: "18m",
        correct: 11,
        incorrect: 4,
        skipped: 0
      },
      {
        id: 3,
        name: "Logical Reasoning Challenge",
        date: "2 days ago, 11:20 AM",
        score: 88,
        timeSpent: "35m",
        correct: 22,
        incorrect: 3,
        skipped: 0
      }
    ],
    goals: {
      targetScore: 85,
      quizzesPerWeek: 5,
      currentWeekQuizzes: 3,
      weeklyTargetMet: false
    }
  };

  const timeRanges = [
    { id: "week", label: "Last Week" },
    { id: "month", label: "Last Month" },
    { id: "quarter", label: "Last 3 Months" },
    { id: "all", label: "All Time" }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-amber-500";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getImprovementColor = (improvement) => {
    return improvement >= 0 ? "text-green-600" : "text-red-600";
  };

  const exportReport = () => {
    // In a real app, this would generate and download a PDF report
    alert("Progress report exported successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quiz Progress Report</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Track your performance and identify areas for improvement
            </p>
          </div>
          <button 
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Download size={18} />
            Export Report
          </button>
        </div>

        {/* Time Range Filter */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={18} className="text-slate-500" />
            <span className="font-medium">Time Range:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {timeRanges.map(range => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progressData.overall.quizzesAttempted}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Quizzes Attempted</p>
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {timeRanges.find(r => r.id === timeRange)?.label}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Award size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${getScoreColor(progressData.overall.averageScore)}`}>
                  {progressData.overall.averageScore}%
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Average Score</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp size={14} className={getImprovementColor(progressData.overall.improvement)} />
              <span className={getImprovementColor(progressData.overall.improvement)}>
                +{progressData.overall.improvement}% improvement
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Clock size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progressData.overall.totalTimeSpent}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Time Spent</p>
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {timeRanges.find(r => r.id === timeRange)?.label}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <Target size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progressData.goals.currentWeekQuizzes}/{progressData.goals.quizzesPerWeek}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Weekly Goal</p>
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {progressData.goals.weeklyTargetMet ? "Goal achieved! 🎉" : "Keep going!"}
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Performance by Category</h2>
          
          <div className="space-y-4">
            {progressData.categoryPerformance.map((category, index) => (
              <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium">{category.category}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {category.attempts} attempt{category.attempts !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-semibold ${getScoreColor(category.averageScore)}`}>
                        {category.averageScore}%
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Average</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-amber-600 dark:text-amber-400">
                        {category.bestScore}%
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Best</p>
                    </div>
                    <div>
                      {expandedCategory === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>
                
                {expandedCategory === index && (
                  <div className="mt-4 pl-11">
                    <h4 className="font-medium mb-3">Topic-wise Performance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.topics.map((topic, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                          <span className="text-sm font-medium">{topic.name}</span>
                          <div className="text-right">
                            <p className={`text-sm font-semibold ${getScoreColor(topic.score)}`}>
                              {topic.score}%
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {topic.attempts} attempt{topic.attempts !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className={getImprovementColor(category.improvement)} />
                        <span className={`text-sm ${getImprovementColor(category.improvement)}`}>
                          +{category.improvement}% improvement over time
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Attempts */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Quiz Attempts</h2>
            
            <div className="space-y-4">
              {progressData.recentAttempts.map(attempt => (
                <div key={attempt.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">{attempt.name}</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{attempt.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className={`text-lg font-bold ${getScoreColor(attempt.score)}`}>
                          {attempt.score}%
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Score</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-lg font-bold">{attempt.timeSpent}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Time</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircle size={16} />
                          <span className="font-semibold">{attempt.correct}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Correct</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                          <XCircle size={16} />
                          <span className="font-semibold">{attempt.incorrect}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Incorrect</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              View All Attempts
            </button>
          </div>

          {/* Goals and Recommendations */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Goals & Recommendations</h2>
            
            <div className="space-y-6">
              {/* Target Score */}
              <div>
                <h3 className="font-medium mb-3">Target Score Progress</h3>
                <div className="bg-slate-100 dark:bg-slate-700/30 rounded-full h-3 mb-2">
                  <div 
                    className="bg-indigo-600 h-3 rounded-full" 
                    style={{ width: `${(progressData.overall.averageScore / progressData.goals.targetScore) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Current: {progressData.overall.averageScore}%</span>
                  <span>Target: {progressData.goals.targetScore}%</span>
                </div>
              </div>
              
              {/* Weekly Goal */}
              <div>
                <h3 className="font-medium mb-3">Weekly Quiz Goal</h3>
                <div className="bg-slate-100 dark:bg-slate-700/30 rounded-full h-3 mb-2">
                  <div 
                    className="bg-green-600 h-3 rounded-full" 
                    style={{ width: `${(progressData.goals.currentWeekQuizzes / progressData.goals.quizzesPerWeek) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed: {progressData.goals.currentWeekQuizzes}</span>
                  <span>Goal: {progressData.goals.quizzesPerWeek}</span>
                </div>
              </div>
              
              {/* Recommendations */}
              <div>
                <h3 className="font-medium mb-3">Recommended Actions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Star size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Focus on <strong>Verbal Ability</strong> (your weakest category)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Practice <strong>Time & Work</strong> problems in Aptitude section</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Take 2 more quizzes this week to meet your goal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;