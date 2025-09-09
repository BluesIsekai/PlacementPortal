import React, { useState } from "react";
import { 
  Code2, Play, Save, RotateCcw, BookOpen, 
  Timer, ChevronDown, ChevronUp, Filter, 
  Search, Star, TrendingUp, BarChart3, 
  CheckCircle, XCircle, HelpCircle, Award,
  Zap, Coffee, Clock, Terminal, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const CodingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("problems");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here\nfunction solveProblem(input) {\n  // Your solution\n  return input;\n}");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");

  // Sample coding problems
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "easy",
      topics: ["Arrays", "Hash Table"],
      acceptance: "78%",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9"
      ],
      starterCode: "function twoSum(nums, target) {\n    // Your code here\n};"
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "medium",
      topics: ["Linked List", "Recursion"],
      acceptance: "65%",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      examples: [
        {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
          explanation: "The linked list is reversed."
        }
      ],
      constraints: [
        "The number of nodes in the list is the range [0, 5000]",
        "-5000 <= Node.val <= 5000"
      ],
      starterCode: "function reverseList(head) {\n    // Your code here\n};"
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "hard",
      topics: ["Arrays", "Binary Search", "Divide and Conquer"],
      acceptance: "32%",
      description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      examples: [
        {
          input: "nums1 = [1,3], nums2 = [2]",
          output: "2.00000",
          explanation: "The merged array is [1,2,3] and the median is 2."
        },
        {
          input: "nums1 = [1,2], nums2 = [3,4]",
          output: "2.50000",
          explanation: "The merged array is [1,2,3,4] and the median is (2 + 3) / 2 = 2.5."
        }
      ],
      constraints: [
        "nums1.length == m",
        "nums2.length == n",
        "0 <= m <= 1000",
        "0 <= n <= 1000",
        "1 <= m + n <= 2000"
      ],
      starterCode: "function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n};"
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "easy",
      topics: ["String", "Stack"],
      acceptance: "81%",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: [
        {
          input: 's = "()"',
          output: "true",
          explanation: "The parentheses are properly closed."
        },
        {
          input: 's = "()[]{}"',
          output: "true",
          explanation: "All parentheses are properly closed."
        }
      ],
      constraints: [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}'."
      ],
      starterCode: "function isValid(s) {\n    // Your code here\n};"
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "medium",
      topics: ["String", "Dynamic Programming"],
      acceptance: "31%",
      description: "Given a string s, return the longest palindromic substring in s.",
      examples: [
        {
          input: 's = "babad"',
          output: '"bab"',
          explanation: '"aba" is also a valid answer.'
        },
        {
          input: 's = "cbbd"',
          output: '"bb"',
          explanation: "The longest palindromic substring is 'bb'."
        }
      ],
      constraints: [
        "1 <= s.length <= 1000",
        "s consist of only digits and English letters."
      ],
      starterCode: "function longestPalindrome(s) {\n    // Your code here\n};"
    }
  ];

  const difficulties = [
    { id: "all", label: "All Difficulty" },
    { id: "easy", label: "Easy" },
    { id: "medium", label: "Medium" },
    { id: "hard", label: "Hard" }
  ];

  const topics = [
    { id: "all", label: "All Topics" },
    { id: "Arrays", label: "Arrays" },
    { id: "Strings", label: "Strings" },
    { id: "Linked List", label: "Linked List" },
    { id: "Trees", label: "Trees" },
    { id: "Dynamic Programming", label: "Dynamic Programming" },
    { id: "Sorting", label: "Sorting" },
    { id: "Graphs", label: "Graphs" }
  ];

  const tabs = [
    { id: "problems", label: "Problems" },
    { id: "code", label: "Code" },
    { id: "submissions", label: "Submissions" },
    { id: "solutions", label: "Solutions" }
  ];

  const userStats = {
    problemsSolved: 48,
    easySolved: 25,
    mediumSolved: 18,
    hardSolved: 5,
    acceptanceRate: "78%",
    rank: "Top 15%"
  };

  const filteredProblems = problems.filter(problem => {
    // Difficulty filter
    if (selectedDifficulty !== "all" && problem.difficulty !== selectedDifficulty) return false;
    
    // Topic filter
    if (selectedTopic !== "all" && !problem.topics.includes(selectedTopic)) return false;
    
    return true;
  });

  const runCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput("Code executed successfully!\n\nTest Cases:\n✓ Test case 1 passed\n✓ Test case 2 passed\n✓ Test case 3 passed\n\nAll test cases passed!");
      setIsRunning(false);
    }, 2000);
  };

  const resetCode = () => {
    setCode("// Write your code here\nfunction solveProblem(input) {\n  // Your solution\n  return input;\n}");
    setOutput("");
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "hard": return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  const languageStarterCodes = {
    C: "// Write your C code here\n#include <stdio.h>\n\nint main() {\n    // Your solution\n    return 0;\n}",
    "C#": "// Write your C# code here\nusing System;\n\npublic class Solution {\n    public static void SolveProblem(string input) {\n        // Your solution\n    }\n}",
    "C++": "// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nvoid solveProblem(string input) {\n    // Your solution\n}\n",
    Go: "// Write your Go code here\npackage main\n\nimport \"fmt\"\n\nfunc solveProblem(input string) {\n    // Your solution\n    fmt.Println(input)\n}",
    Java: "// Write your Java code here\npublic class Solution {\n    public static void solveProblem(String input) {\n        // Your solution\n    }\n}",
    JavaScript: "// Write your JavaScript code here\nfunction solveProblem(input) {\n  // Your solution\n  return input;\n}",
    PHP: "<?php\n// Write your PHP code here\nfunction solveProblem($input) {\n  // Your solution\n  return $input;\n}",
    Python: "# Write your Python code here\ndef solve_problem(input):\n    # Your solution\n    return input",
    Ruby: "# Write your Ruby code here\ndef solve_problem(input)\n  # Your solution\n  input\nend"
  };

  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(languageStarterCodes[newLanguage]);
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button and Heading */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className={`p-2 rounded-lg ${theme.bg.secondary} ${theme.bg.hover} transition-colors`}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className={`text-3xl font-bold ${theme.text.primary}`}>Coding Practice</h1>
            <p className={`${theme.text.secondary} mt-2`}>
              Sharpen your coding skills with curated problems
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.bg.accent} rounded-lg`}>
                <Code2 size={20} className="text-indigo-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${theme.text.primary}`}>{userStats.problemsSolved}</p>
                <p className={`text-sm ${theme.text.tertiary}`}>Solved</p>
              </div>
            </div>
          </div>
          
          <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.bg.accent} rounded-lg`}>
                <CheckCircle size={20} className="text-green-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${theme.text.primary}`}>{userStats.acceptanceRate}</p>
                <p className={`text-sm ${theme.text.tertiary}`}>Acceptance</p>
              </div>
            </div>
          </div>
          
          <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.bg.accent} rounded-lg`}>
                <Award size={20} className="text-amber-400" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${theme.text.primary}`}>{userStats.rank}</p>
                <p className={`text-sm ${theme.text.tertiary}`}>Rank</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Problem List */}
          <div className="lg:w-1/3">
            <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-4 mb-6`}>
              <div className="flex items-center gap-2 mb-4">
                <Search size={18} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600 text-sm"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                  ))}
                </select>
                
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600 text-sm"
                >
                  {topics.map(topic => (
                    <option key={topic.id} value={topic.id}>{topic.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-3">
                {filteredProblems.map(problem => (
                  <div 
                    key={problem.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      expandedProblem === problem.id 
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                    onClick={() => setExpandedProblem(expandedProblem === problem.id ? null : problem.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{problem.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Acceptance: {problem.acceptance}
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        {expandedProblem === problem.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                    
                    {expandedProblem === problem.id && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{problem.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {problem.topics.map(topic => (
                            <span key={topic} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress Tracking */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
              <h2 className="font-semibold mb-4">Your Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Easy</span>
                    <span>{userStats.easySolved}/25</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(userStats.easySolved / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Medium</span>
                    <span>{userStats.mediumSolved}/40</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full" 
                      style={{ width: `${(userStats.mediumSolved / 40) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hard</span>
                    <span>{userStats.hardSolved}/15</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${(userStats.hardSolved / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <h3 className="font-medium mb-2">Daily Goal</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">3/5 problems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Code Editor */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Code Editor */}
              {activeTab === "code" && (
                <div className="p-0">
                  <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <div>
                      <h3 className="font-semibold">Two Sum</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor("easy")}`}>
                          Easy
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">Acceptance: 78%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
                        <Save size={18} />
                      </button>
                      <button 
                        onClick={resetCode}
                        className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                      >
                        <RotateCcw size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
                      <select 
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        className="px-2 py-1 rounded border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600 text-sm"
                      >
                        {Object.keys(languageStarterCodes).sort().map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                    
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-96 p-4 font-mono text-sm focus:outline-none resize-none bg-slate-50 dark:bg-slate-900/50"
                      spellCheck="false"
                    />
                  </div>
                  
                  <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={runCode}
                          disabled={isRunning}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          {isRunning ? (
                            <>
                              <Clock size={16} />
                              Running...
                            </>
                          ) : (
                            <>
                              <Play size={16} />
                              Run Code
                            </>
                          )}
                        </button>
                        
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                          <CheckCircle size={16} />
                          Submit
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Zap size={16} />
                          <span>Time: O(n)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coffee size={16} />
                          <span>Space: O(n)</span>
                        </div>
                      </div>
                    </div>
                    
                    {output && (
                      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <h4 className="font-medium mb-2">Output</h4>
                        <pre className="text-sm font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                          {output}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Problem Description */}
              {activeTab === "problems" && expandedProblem && (
                <div className="p-6">
                  {problems.filter(p => p.id === expandedProblem).map(problem => (
                    <div key={problem.id}>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-2xl font-bold">{problem.title}</h2>
                          <div className="flex items-center gap-3 mt-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                            <span className="text-slate-600 dark:text-slate-400">Acceptance: {problem.acceptance}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveTab("code")}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          Solve Problem
                        </button>
                      </div>
                      
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="mb-4">{problem.description}</p>
                        
                        <div className="mb-6">
                          <h3 className="font-semibold mb-2">Examples</h3>
                          {problem.examples.map((example, index) => (
                            <div key={index} className="mb-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                              <p className="font-medium">Example {index + 1}:</p>
                              <p className="mt-1"><strong>Input:</strong> {example.input}</p>
                              <p><strong>Output:</strong> {example.output}</p>
                              {example.explanation && (
                                <p><strong>Explanation:</strong> {example.explanation}</p>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="font-semibold mb-2">Constraints</h3>
                          <ul className="list-disc list-inside">
                            {problem.constraints.map((constraint, index) => (
                              <li key={index} className="text-sm">{constraint}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {problem.topics.map(topic => (
                            <span key={topic} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-sm rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Submissions */}
              {activeTab === "submissions" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Submissions</h2>
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <Terminal size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No submissions yet. Solve a problem to see your submissions here.</p>
                  </div>
                </div>
              )}
              
              {/* Solutions */}
              {activeTab === "solutions" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Solutions</h2>
                  <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Solutions will be available after you attempt the problem.</p>
                  </div>
                </div>
              )}

              {/* Default message when no problem is selected */}
              {expandedProblem === null && activeTab === "problems" && (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Terminal size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No problem selected. Please choose a problem from the list to view its details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPage;