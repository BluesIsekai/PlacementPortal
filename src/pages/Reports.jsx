import React, { useState, useEffect } from "react";
import { 
  BarChart3, Download, Filter, Calendar, 
  TrendingUp, Target, Award, Clock,
  BookOpen, Code2, Users, PieChart,
  ChevronDown, ChevronUp, Eye, EyeOff
} from "lucide-react";

const ReportsPage = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [activeTab, setActiveTab] = useState("overview");
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Sample report data
  const reportData = {
    overview: {
      totalSolved: 248,
      accuracy: 76,
      avgTime: "2.4min",
      rank: "Top 15%",
      improvement: 12,
      consistency: 88
    },
    categoryPerformance: [
      { category: "Data Structures", score: 82, improvement: 8, questions: 124 },
      { category: "Algorithms", score: 78, improvement: 12, questions: 96 },
      { category: "Database", score: 85, improvement: 5, questions: 67 },
      { category: "Operating Systems", score: 72, improvement: 15, questions: 53 },
      { category: "Networking", score: 68, improvement: 10, questions: 42 }
    ],
    difficultyPerformance: [
      { difficulty: "Easy", solved: 125, accuracy: 89, avgTime: "1.2min" },
      { difficulty: "Medium", solved: 96, accuracy: 74, avgTime: "3.1min" },
      { difficulty: "Hard", solved: 27, accuracy: 52, avgTime: "6.8min" }
    ],
    dailyActivity: [
      { day: "Mon", problems: 12, time: "48min" },
      { day: "Tue", problems: 8, time: "32min" },
      { day: "Wed", problems: 15, time: "63min" },
      { day: "Thu", problems: 10, time: "45min" },
      { day: "Fri", problems: 14, time: "58min" },
      { day: "Sat", problems: 18, time: "72min" },
      { day: "Sun", problems: 6, time: "24min" }
    ],
    companyWise: [
      { company: "TCS", prepared: 85, questions: 64 },
      { company: "Infosys", prepared: 78, questions: 52 },
      { company: "Wipro", prepared: 72, questions: 33 },
      { company: "Microsoft", prepared: 65, questions: 47 },
      { company: "Amazon", prepared: 68, questions: 41 },
      { company: "Google", prepared: 58, questions: 29 }
    ],
    mockTests: [
      { test: "Aptitude Test #1", score: 82, percentile: 76, time: "25min" },
      { test: "Coding Challenge #3", score: 78, percentile: 72, time: "45min" },
      { test: "Technical MCQ #2", score: 85, percentile: 81, time: "20min" },
      { test: "Full Mock Interview", score: 74, percentile: 68, time: "60min" }
    ]
  };

  const timeRanges = [
    { id: "week", label: "Last Week" },
    { id: "month", label: "Last Month" },
    { id: "quarter", label: "Last 3 Months" },
    { id: "all", label: "All Time" }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 size={18} /> },
    { id: "category", label: "By Category", icon: <BookOpen size={18} /> },
    { id: "difficulty", label: "By Difficulty", icon: <Target size={18} /> },
    { id: "company", label: "Company Wise", icon: <Users size={18} /> },
    { id: "tests", label: "Mock Tests", icon: <Award size={18} /> }
  ];

  const exportReport = () => {
    // In a real app, this would generate and download a PDF report
    alert("Report exported successfully!");
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getImprovementColor = (improvement) => {
    return improvement >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Performance Reports</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Track your progress and analyze your preparation
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={exportReport}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <Download size={18} />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <Filter size={18} />
              Filter
            </button>
          </div>
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
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Code2 size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{reportData.overview.totalSolved}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Problems Solved</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Target size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{reportData.overview.accuracy}%</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Accuracy</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Clock size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{reportData.overview.avgTime}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Time</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <Award size={20} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{reportData.overview.rank}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Rank</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <TrendingUp size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">+{reportData.overview.improvement}%</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Improvement</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                    <PieChart size={20} className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{reportData.overview.consistency}%</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Consistency</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Activity */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Daily Activity</h2>
              <div className="grid grid-cols-7 gap-2">
                {reportData.dailyActivity.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{day.day}</div>
                    <div className="h-24 bg-slate-100 dark:bg-slate-700 rounded-lg flex flex-col justify-end p-2">
                      <div 
                        className="bg-indigo-600 rounded-lg mb-1"
                        style={{ height: `${(day.problems / 20) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="font-medium">{day.problems} problems</div>
                      <div className="text-slate-500 dark:text-slate-400">{day.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Category Performance</h2>
                <button 
                  onClick={() => setShowDetailedView(!showDetailedView)}
                  className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-medium"
                >
                  {showDetailedView ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showDetailedView ? "Hide Details" : "Show Details"}
                </button>
              </div>
              
              <div className="space-y-4">
                {reportData.categoryPerformance.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{category.category}</span>
                      <div className="flex items-center gap-4">
                        <span className={`font-semibold ${getScoreColor(category.score)}`}>
                          {category.score}%
                        </span>
                        <span className={`text-sm ${getImprovementColor(category.improvement)}`}>
                          +{category.improvement}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${category.score}%` }}
                      ></div>
                    </div>
                    {showDetailedView && (
                      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                        <span>{category.questions} questions practiced</span>
                        <span>+{category.improvement}% improvement</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category Performance Tab */}
        {activeTab === "category" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Performance by Category</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="pb-3 text-left">Category</th>
                    <th className="pb-3 text-center">Score</th>
                    <th className="pb-3 text-center">Improvement</th>
                    <th className="pb-3 text-center">Questions</th>
                    <th className="pb-3 text-center">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.categoryPerformance.map((category, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-4 font-medium">{category.category}</td>
                      <td className="py-4 text-center">
                        <span className={`font-semibold ${getScoreColor(category.score)}`}>
                          {category.score}%
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`${getImprovementColor(category.improvement)}`}>
                          +{category.improvement}%
                        </span>
                      </td>
                      <td className="py-4 text-center">{category.questions}</td>
                      <td className="py-4 text-center">
                        <div className="flex justify-center">
                          <TrendingUp size={16} className="text-green-500" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Difficulty Performance Tab */}
        {activeTab === "difficulty" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Performance by Difficulty</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {reportData.difficultyPerformance.map((difficulty, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5">
                  <h3 className="font-semibold mb-4">{difficulty.difficulty}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Solved</span>
                        <span className="font-medium">{difficulty.solved}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: `${(difficulty.solved / 150) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Accuracy</span>
                        <span className="font-medium">{difficulty.accuracy}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${difficulty.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Avg. Time</span>
                        <span className="font-medium">{difficulty.avgTime}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-amber-600 h-2 rounded-full" 
                          style={{ width: `${(parseFloat(difficulty.avgTime) / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Company Wise Tab */}
        {activeTab === "company" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Company-wise Preparation</h2>
            
            <div className="space-y-4">
              {reportData.companyWise.map((company, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{company.company}</span>
                    <span className="font-semibold">{company.prepared}% prepared</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${company.prepared}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                    <span>{company.questions} questions practiced</span>
                    <span>{company.prepared}% prepared</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mock Tests Tab */}
        {activeTab === "tests" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Mock Test Performance</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="pb-3 text-left">Test Name</th>
                    <th className="pb-3 text-center">Score</th>
                    <th className="pb-3 text-center">Percentile</th>
                    <th className="pb-3 text-center">Time Spent</th>
                    <th className="pb-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.mockTests.map((test, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-4 font-medium">{test.test}</td>
                      <td className="py-4 text-center">
                        <span className={`font-semibold ${getScoreColor(test.score)}`}>
                          {test.score}%
                        </span>
                      </td>
                      <td className="py-4 text-center">{test.percentile}%</td>
                      <td className="py-4 text-center">{test.time}</td>
                      <td className="py-4 text-center">
                        <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;