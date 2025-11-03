import React, { useEffect, useMemo, useState } from "react";
import {
  Code2, Play, Save, RotateCcw, BookOpen,
  Timer, ChevronDown, ChevronUp, Filter,
  Search, Star, TrendingUp, BarChart3,
  CheckCircle, XCircle, HelpCircle, Award,
  Zap, Coffee, Clock, Terminal, Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUserData } from "../context/UserDataContext";

function isSameDay(a, b) {
  if (!a || !b) return false;
  const first = new Date(a);
  const second = new Date(b);
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

const defaultJavaScriptStarter = [
  "// Write your code here",
  "function solveProblem(input) {",
  "  // Your solution",
  "  return input;",
  "}",
].join("\n");


const CodingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, userData, recordSubmissionResult, loadingUser } = useUserData();
  const [activeTab, setActiveTab] = useState("problems");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProblem, setExpandedProblem] = useState(null);
  const [code, setCode] = useState(defaultJavaScriptStarter);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const Lang = {
    C: {
      name: "c",
      version: "10.2.0",
      filename: "my_cool_code.c",
    },
    "C#": {
      name: "csharp",
      version: "6.12.0",
      filename: "my_cool_code.cs",
    },
    "C++": {
      name: "c++",
      version: "10.2.0",
      filename: "my_cool_code.cpp",
    },
    Go: {
      name: "go",
      version: "1.16.2",
      filename: "my_cool_code.go",
    },
    Java: {
      name: "java",
      version: "15.0.2",
      filename: "my_cool_code.java",
    },
    JavaScript: {
      name: "javascript",
      version: "18.15.0",
      filename: "my_cool_code.js",
    },
    PHP: {
      name: "php",
      version: "8.2.3",
      filename: "my_cool_code.php",
    },
    Python: {
      name: "python",
      version: "3.10.0",
      filename: "my_cool_code.py",
    },
    Ruby: {
      name: "ruby",
      version: "3.0.1",
      filename: "my_cool_code.rb",
    },
  };

  const problems = useMemo(() => ([
    {
      id: 1,
      title: "Two Sum",
      difficulty: "easy",
      topics: ["Arrays", "Hash Table"],
      acceptance: "78%",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        },
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
      ],
      starterCode:
        "function solveProblem(nums, target) {\n  // Return indices of the two numbers that add up to target\n  return [];\n}",
      testCases: [
        {
          id: "sample-1",
          args: [[2, 7, 11, 15], 9],
          expected: [0, 1],
        },
        {
          id: "sample-2",
          args: [[3, 2, 4], 6],
          expected: [1, 2],
        },
        {
          id: "hidden-1",
          args: [[3, 3], 6],
          expected: [0, 1],
          hidden: true,
        },
      ],
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "medium",
      topics: ["Linked List", "Recursion"],
      acceptance: "65%",
      description:
        "Given an array representing the values of a singly linked list, reverse the values and return the reversed list.",
      examples: [
        {
          input: "head = [1,2,3,4,5]",
          output: "[5,4,3,2,1]",
          explanation: "The list is reversed.",
        },
      ],
      constraints: [
        "The number of nodes in the list is the range [0, 5000]",
        "-5000 <= Node.val <= 5000",
      ],
      starterCode:
        "function solveProblem(head) {\n  // head is provided as an array of values\n  return head;\n}",
      testCases: [
        {
          id: "sample-1",
          args: [[1, 2, 3, 4, 5]],
          expected: [5, 4, 3, 2, 1],
        },
        {
          id: "sample-2",
          args: [[1, 2]],
          expected: [2, 1],
        },
        {
          id: "edge-empty",
          args: [[]],
          expected: [],
          hidden: true,
        },
      ],
    },
    {
      id: 3,
      title: "Median of Two Sorted Arrays",
      difficulty: "hard",
      topics: ["Arrays", "Binary Search", "Divide and Conquer"],
      acceptance: "32%",
      description:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      examples: [
        {
          input: "nums1 = [1,3], nums2 = [2]",
          output: "2.00000",
          explanation: "The merged array is [1,2,3] and the median is 2.",
        },
        {
          input: "nums1 = [1,2], nums2 = [3,4]",
          output: "2.50000",
          explanation:
            "The merged array is [1,2,3,4] and the median is (2 + 3) / 2 = 2.5.",
        },
      ],
      constraints: [
        "nums1.length == m",
        "nums2.length == n",
        "0 <= m <= 1000",
        "0 <= n <= 1000",
        "1 <= m + n <= 2000",
      ],
      starterCode:
        "function solveProblem(nums1, nums2) {\n  // Return the median of the two sorted arrays\n  return 0;\n}",
      testCases: [
        {
          id: "sample-1",
          args: [[1, 3], [2]],
          expected: 2,
        },
        {
          id: "sample-2",
          args: [[1, 2], [3, 4]],
          expected: 2.5,
        },
        {
          id: "edge-large",
          args: [[0, 0], [0, 0]],
          expected: 0,
          hidden: true,
        },
      ],
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "easy",
      topics: ["String", "Stack"],
      acceptance: "81%",
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      examples: [
        {
          input: 's = "()"',
          output: "true",
          explanation: "The parentheses are properly closed.",
        },
        {
          input: 's = "()[]{}"',
          output: "true",
          explanation: "All parentheses are properly closed.",
        },
      ],
      constraints: [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}'.",
      ],
      starterCode:
        "function solveProblem(s) {\n  // Return true if the parentheses string is valid\n  return false;\n}",
      testCases: [
        {
          id: "sample-1",
          args: ["()"],
          expected: true,
        },
        {
          id: "sample-2",
          args: ["()[]{}"],
          expected: true,
        },
        {
          id: "hidden-1",
          args: ["(]"],
          expected: false,
          hidden: true,
        },
      ],
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
          explanation: '"aba" is also a valid answer.',
        },
        {
          input: 's = "cbbd"',
          output: '"bb"',
          explanation: "The longest palindromic substring is 'bb'.",
        },
      ],
      constraints: [
        "1 <= s.length <= 1000",
        "s consist of only digits and English letters.",
      ],
      starterCode:
        "function solveProblem(s) {\n  // Return the longest palindromic substring\n  return '';\n}",
      testCases: [
        {
          id: "sample-1",
          args: ["babad"],
          expected: "bab",
        },
        {
          id: "sample-2",
          args: ["cbbd"],
          expected: "bb",
        },
        {
          id: "hidden-1",
          args: ["a"],
          expected: "a",
          hidden: true,
        },
      ],
    },
  ]), []);

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

  const statusFilters = [
    { id: "all", label: "All Status" },
    { id: "solved", label: "Solved" },
    { id: "unsolved", label: "Unsolved" },
  ];

  const tabs = [
    { id: "problems", label: "Problems" },
    { id: "code", label: "Code" },
    { id: "submissions", label: "Submissions" },
    { id: "solutions", label: "Solutions" }
  ];

  const stats = userData?.stats || {
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
  };
  const submissions = userData?.submissions || [];
  const successfulSubmissions = submissions.filter((submission) => submission.status === "passed");
  const acceptanceRate = submissions.length
    ? Math.round((successfulSubmissions.length / submissions.length) * 100)
    : 0;
  const userStats = {
    problemsSolved: stats.totalSolved,
    easySolved: stats.easySolved,
    mediumSolved: stats.mediumSolved,
    hardSolved: stats.hardSolved,
    acceptanceRate: `${acceptanceRate}%`,
    rank: submissions.length > 0 ? "Active" : "Getting Started",
  };
  const completedProblems = userData?.completedProblems || {};
  const completedProblemsArray = Object.values(completedProblems || {});

  const latestSubmissionByProblem = useMemo(() => {
    if (!submissions?.length) return {};
    return submissions.reduce((acc, submission) => {
      if (!submission?.problemId) return acc;
      const existing = acc[submission.problemId];
      const submittedAt = submission.submittedAt ? new Date(submission.submittedAt) : null;
      if (!existing) {
        acc[submission.problemId] = submission;
        return acc;
      }
      const existingDate = existing.submittedAt ? new Date(existing.submittedAt) : null;
      if (submittedAt && (!existingDate || submittedAt > existingDate)) {
        acc[submission.problemId] = submission;
      }
      return acc;
    }, {});
  }, [submissions]);

  const sortedSubmissions = useMemo(() => {
    if (!submissions?.length) return [];
    return [...submissions].sort((a, b) => {
      const aDate = a?.submittedAt ? new Date(a.submittedAt).getTime() : 0;
      const bDate = b?.submittedAt ? new Date(b.submittedAt).getTime() : 0;
      return bDate - aDate;
    });
  }, [submissions]);

  const difficultyTotals = useMemo(() => {
    return problems.reduce(
      (acc, problem) => ({
        ...acc,
        [problem.difficulty]: (acc[problem.difficulty] || 0) + 1,
      }),
      { easy: 0, medium: 0, hard: 0 },
    );
  }, [problems]);

  const solvedToday = completedProblemsArray.filter((entry) =>
    entry?.solvedAt ? isSameDay(entry.solvedAt, new Date()) : false,
  ).length;
  const DAILY_GOAL = 3;
  const weeklyWindow = new Date();
  weeklyWindow.setDate(weeklyWindow.getDate() - 7);
  const solvedLast7Days = completedProblemsArray.filter((entry) => {
    if (!entry?.solvedAt) return false;
    const solvedDate = new Date(entry.solvedAt);
    return solvedDate >= weeklyWindow;
  }).length;
  const easyGoal = Math.max(difficultyTotals.easy || 0, userStats.easySolved || 0, 1);
  const mediumGoal = Math.max(difficultyTotals.medium || 0, userStats.mediumSolved || 0, 1);
  const hardGoal = Math.max(difficultyTotals.hard || 0, userStats.hardSolved || 0, 1);
  const dailyGoalProgress = Math.min(100, (solvedToday / DAILY_GOAL) * 100);

  const searchTermLower = searchTerm.trim().toLowerCase();

  const filteredProblems = problems.filter((problem) => {
    const solved = Boolean(completedProblems[problem.id]?.solved);

    if (selectedDifficulty !== "all" && problem.difficulty !== selectedDifficulty) {
      return false;
    }

    if (selectedTopic !== "all" && !problem.topics.includes(selectedTopic)) {
      return false;
    }

    if (selectedStatus === "solved" && !solved) {
      return false;
    }

    if (selectedStatus === "unsolved" && solved) {
      return false;
    }

    if (searchTermLower) {
      const matchesTitle = problem.title.toLowerCase().includes(searchTermLower);
      const matchesTopic = problem.topics.some((topic) =>
        topic.toLowerCase().includes(searchTermLower),
      );
      if (!matchesTitle && !matchesTopic) {
        return false;
      }
    }

    return true;
  });

  const formatTestValue = (value) => {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  };

  const selectedProblem = useMemo(
    () => problems.find((problem) => problem.id === expandedProblem) || null,
    [problems, expandedProblem],
  );

  const submissionAttempts = useMemo(() => {
    if (!selectedProblem) return 0;
    return submissions.filter((submission) => submission.problemId === selectedProblem.id).length;
  }, [selectedProblem?.id, submissions]);

  const showToast = (type, message) => {
    setToast({ type, message, timestamp: Date.now() });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const deepEqual = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((value, index) => deepEqual(value, b[index]));
    }
    if (typeof a === "object" && typeof b === "object" && a && b) {
      const keys = Object.keys({ ...a, ...b });
      return keys.every((key) => deepEqual(a[key], b[key]));
    }
    if (typeof a === "number" && typeof b === "number") {
      return Math.abs(a - b) < 1e-6;
    }
    return a === b;
  };

  const formatRelativeTime = (date) => {
    if (!date) return null;
    const target = new Date(date);
    const diffMs = Date.now() - target.getTime();
    if (Number.isNaN(diffMs)) return null;
    const diffSeconds = Math.floor(diffMs / 1000);
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return target.toLocaleDateString();
  };

  const formatDateTime = (date) => {
    if (!date) return "Unknown";
    const target = new Date(date);
    if (Number.isNaN(target.getTime())) return "Unknown";
    return target.toLocaleString();
  };

  useEffect(() => {
    if (!selectedProblem) {
      setOutput("");
      setTestResults([]);
      setSubmissionMessage(null);
      return;
    }

    if (selectedLanguage === "JavaScript") {
      setCode(selectedProblem.starterCode);
    } else {
      setCode(languageStarterCodes[selectedLanguage] || defaultJavaScriptStarter);
    }
    setOutput("");
    setTestResults([]);
    setSubmissionMessage(null);
  }, [selectedProblem?.id, selectedLanguage]);

  const runCode = async () => {
    setIsRunning(true);
    setSubmissionMessage(null);
    const body = JSON.stringify({
      language: Lang[selectedLanguage].name,
      version: Lang[selectedLanguage].version,
      files: [
        {
          name: Lang[selectedLanguage].filename,
          content: `${code}`,
        },
      ],
      stdin: input,
      args: [],
      compile_timeout: 10000,
      run_timeout: 10000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    });

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await response.json();
      if (data.run && data.run.output) {
        setOutput(data.run.output);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!selectedProblem) {
      setSubmissionMessage({ type: "error", text: "Select a problem first." });
      showToast("error", "Select a problem before submitting.");
      return;
    }

    if (!user) {
      setSubmissionMessage({
        type: "error",
        text: "You must be signed in to submit. Please log in and try again.",
      });
      showToast("error", "Please log in to submit solutions.");
      return;
    }

    if (selectedLanguage !== "JavaScript") {
      setSubmissionMessage({
        type: "error",
        text: "The built-in judge currently supports JavaScript submissions only.",
      });
      showToast("error", "Built-in judge currently accepts JavaScript only.");
      return;
    }

    setIsSubmitting(true);

    try {
      const results = runLocalTests();
      setTestResults(results);

      const compileError = results.find((result) => result.error);
      if (compileError) {
        setSubmissionMessage({ type: "error", text: compileError.error });
        showToast("error", compileError.error);
        return;
      }

      const passedAll = results.every((result) => result.passed);

      const successMessage = passedAll
        ? "Great job! All test cases passed."
        : "Some test cases failed. Review the results below.";

      setSubmissionMessage({
        type: passedAll ? "success" : "error",
        text: successMessage,
      });

      showToast(passedAll ? "success" : "error", successMessage);

      const testResultsPayload = results.map(({ id, passed, error, actual, expected }) => ({
        id,
        passed,
        error: error || null,
        actual: actual ?? null,
        expected: expected ?? null,
      }));

      const response = await recordSubmissionResult({
        problem: selectedProblem,
        passed: passedAll,
        language: selectedLanguage,
        testResults: testResultsPayload,
      });

      if (!response?.success && response?.error) {
        setSubmissionMessage({ type: "error", text: response.error });
        showToast("error", response.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCode = () => {
    let starter = defaultJavaScriptStarter;
    if (selectedLanguage === "JavaScript" && selectedProblem?.starterCode) {
      starter = selectedProblem.starterCode;
    } else if (languageStarterCodes[selectedLanguage]) {
      starter = languageStarterCodes[selectedLanguage];
    }
    setCode(starter);
    setOutput("");
    setTestResults([]);
    setSubmissionMessage(null);
  };


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "text-green-400 bg-green-500/20";
      case "medium": return "text-yellow-400 bg-yellow-500/20";
      case "hard": return "text-red-400 bg-red-500/20";
      default: return `${theme.text.tertiary} ${theme.bg.accent}`;
    }
  };

  const languageStarterCodes = {
    C: "// Write your C code here\n#include <stdio.h>\n\nint main() {\n    // Your solution\n    return 0;\n}",
    "C#": "// Write your C# code here\nusing System;\n\npublic class Solution {\n    public static void SolveProblem(string input) {\n        // Your solution\n    }\n}",
    "C++": "// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nvoid solveProblem(string input) {\n    // Your solution\n}\n",
    Go: "// Write your Go code here\npackage main\n\nimport \"fmt\"\n\nfunc solveProblem(input string) {\n    // Your solution\n    fmt.Println(input)\n}",
    Java: "// Write your Java code here\npublic class Solution {\n    public static void solveProblem(String input) {\n        // Your solution\n    }\n}",
    JavaScript: defaultJavaScriptStarter,
    PHP: "<?php\n// Write your PHP code here\nfunction solveProblem($input) {\n  // Your solution\n  return $input;\n}",
    Python: "# Write your Python code here\ndef solve_problem(input):\n    # Your solution\n    return input",
    Ruby: "# Write your Ruby code here\ndef solve_problem(input)\n  # Your solution\n  input\nend"
  };


  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(languageStarterCodes[newLanguage]);
    setOutput("");
    setTestResults([]);
    setSubmissionMessage(null);
  };

  const runLocalTests = () => {
    if (!selectedProblem) return [];

    try {
      const userFn = new Function(`${code}; return solveProblem;`)();
      if (typeof userFn !== "function") {
        return [
          {
            id: "missing-function",
            hidden: false,
            passed: false,
            error: "Define a solveProblem function to run tests.",
          },
        ];
      }

      return selectedProblem.testCases.map((testCase) => {
        try {
          const actual = userFn(...(testCase.args || []));
          return {
            id: testCase.id,
            hidden: Boolean(testCase.hidden),
            passed: deepEqual(actual, testCase.expected),
            actual,
            expected: testCase.expected,
            error: null,
          };
        } catch (error) {
          return {
            id: testCase.id,
            hidden: Boolean(testCase.hidden),
            passed: false,
            error: error?.message || "Runtime error",
            expected: testCase.expected,
          };
        }
      });
    } catch (error) {
      return [
        {
          id: "compile-error",
          hidden: false,
          passed: false,
          error: error?.message || "Compilation failed",
        },
      ];
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary}`}>
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <div
            className={`flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg text-sm font-medium ${toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-rose-600 text-white"
              }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={18} className="shrink-0" />
            ) : (
              <XCircle size={18} className="shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${theme.text.primary}`}>Coding Practice</h1>
          <p className={`${theme.text.secondary} mt-2`}>
            Sharpen your coding skills with curated problems
          </p>
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
                <Search size={18} className={`${theme.text.tertiary}`} />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg border ${theme.border.primary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.bg.tertiary} ${theme.text.primary}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${theme.border.primary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.bg.tertiary} ${theme.text.primary} text-sm`}
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>{difficulty.label}</option>
                  ))}
                </select>

                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${theme.border.primary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.bg.tertiary} ${theme.text.primary} text-sm`}
                >
                  {topics.map(topic => (
                    <option key={topic.id} value={topic.id}>{topic.label}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${theme.border.primary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.bg.tertiary} ${theme.text.primary} text-sm`}
                >
                  {statusFilters.map((status) => (
                    <option key={status.id} value={status.id}>{status.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                {filteredProblems.map(problem => {
                  const solved = Boolean(completedProblems[problem.id]?.solved);
                  const latestSubmission = latestSubmissionByProblem?.[problem.id];
                  const lastAttempt = latestSubmission?.submittedAt
                    ? formatRelativeTime(latestSubmission.submittedAt)
                    : null;
                  return (
                    <div
                      key={problem.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${expandedProblem === problem.id
                          ? `border-indigo-500 ${theme.bg.accent}`
                          : `${solved ? "border-green-500/60" : theme.border.primary} ${theme.bg.cardHover}`
                        }`}
                      onClick={() => setExpandedProblem(expandedProblem === problem.id ? null : problem.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${theme.text.primary}`}>{problem.title}</h3>
                          {solved && <CheckCircle size={16} className="text-green-400" />}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className={`text-sm ${theme.text.tertiary}`}>
                          Acceptance: {problem.acceptance}
                          <div className={`text-xs mt-1 ${theme.text.muted}`}>
                            {lastAttempt
                              ? `Last attempt: ${lastAttempt} (${latestSubmission?.status === "passed" ? "Passed" : "Failed"})`
                              : "No attempts yet"}
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 ${theme.text.muted}`}>
                          {expandedProblem === problem.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>

                      {expandedProblem === problem.id && (
                        <div className={`mt-3 pt-3 border-t ${theme.border.default}`}>
                          <p className={`text-sm ${theme.text.muted} mb-2`}>{problem.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {problem.topics.map(topic => (
                              <span key={topic} className={`px-2 py-1 ${theme.bg.hover} text-xs rounded-full`}>
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Tracking */}
            <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-5`}>
              <h2 className="font-semibold mb-4">Your Progress</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Easy</span>
                    <span>{userStats.easySolved}/{easyGoal}</span>
                  </div>
                  <div className={`w-full ${theme.bg.muted} rounded-full h-2`}>
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (userStats.easySolved / easyGoal) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Medium</span>
                    <span>{userStats.mediumSolved}/{mediumGoal}</span>
                  </div>
                  <div className={`w-full ${theme.bg.muted} rounded-full h-2`}>
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (userStats.mediumSolved / mediumGoal) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hard</span>
                    <span>{userStats.hardSolved}/{hardGoal}</span>
                  </div>
                  <div className={`w-full ${theme.bg.muted} rounded-full h-2`}>
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (userStats.hardSolved / hardGoal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className={`mt-4 text-sm ${theme.text.tertiary}`}>
                Solved {solvedLast7Days} problem{solvedLast7Days === 1 ? "" : "s"} in the last 7 days.
              </div>

              <div className={`mt-6 pt-4 border-t ${theme.border.default}`}>
                <h3 className="font-medium mb-2">Daily Goal</h3>
                <div className="flex items-center gap-3">
                  <div className={`flex-1 ${theme.bg.muted} rounded-full h-2`}>
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${dailyGoalProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{solvedToday}/{DAILY_GOAL} problems</span>
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
                      <h3 className="font-semibold">{selectedProblem?.title || "Select a problem"}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedProblem?.difficulty || "easy")}`}>
                          {selectedProblem?.difficulty || ""}
                        </span>
                        {selectedProblem?.acceptance && (
                          <span className="text-sm text-slate-600 dark:text-slate-400">Acceptance: {selectedProblem.acceptance}</span>
                        )}
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
                    <div className="bg-slate-100 m-5 rounded-sm dark:bg-slate-900/50">
                      <h1 className="font-medium p-2 mx-5 rounded">Input</h1>
                      <textarea type="text" value={input} onChange={(e) => { setInput(e.target.value) }} className="w-full h-48 p-4 font-mono text-sm focus:outline-none resize-none " />
                    </div>
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

                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={16} />
                              Submit
                            </>
                          )}
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
                        {selectedProblem && (
                          <div className="flex items-center gap-1">
                            <BarChart3 size={16} />
                            <span>Attempts: {submissionAttempts}</span>
                          </div>
                        )}
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

                          {submissionMessage && (
                            <div
                              className={`mt-4 rounded-lg border p-4 text-sm ${submissionMessage.type === "success"
                                  ? "border-green-500/40 bg-green-500/10 text-green-400"
                                  : "border-rose-500/40 bg-rose-500/10 text-rose-400"
                                }`}
                            >
                              {submissionMessage.text}
                            </div>
                          )}
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
                  {sortedSubmissions.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                      <Terminal size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No submissions yet. Solve a problem to see your history here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sortedSubmissions.map((submission, index) => {
                        const passedCount = submission?.testResults?.filter((result) => result.passed).length || 0;
                        const totalTests = submission?.testResults?.length || 0;
                        const statusSuccess = submission?.status === "passed";
                        return (
                          <div
                            key={`${submission.problemId}-${submission.submittedAt || index}`}
                            className={`rounded-xl border p-4 ${theme.bg.cardHover} transition-colors`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div>
                                <p className={`font-medium ${theme.text.primary}`}>{submission.problemTitle}</p>
                                <p className={`text-sm ${theme.text.tertiary}`}>
                                  {formatDateTime(submission.submittedAt)} • {submission.language}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span
                                  className={`text-xs font-semibold px-2 py-1 rounded-full ${statusSuccess
                                      ? "bg-green-500/15 text-green-400"
                                      : "bg-rose-500/15 text-rose-400"
                                    }`}
                                >
                                  {statusSuccess ? "Passed" : "Failed"}
                                </span>
                                <span className={`text-xs ${theme.text.tertiary}`}>
                                  {passedCount}/{totalTests} tests
                                </span>
                              </div>
                            </div>
                            {totalTests > 0 && (
                              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                {submission.testResults.map((result) => (
                                  <div
                                    key={result.id}
                                    className={`rounded-lg border px-3 py-2 text-xs ${result.passed
                                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                                        : "border-rose-500/30 bg-rose-500/10 text-rose-400"
                                      }`}
                                  >
                                    <div className="flex justify-between">
                                      <span>{result.id}</span>
                                      <span>{result.passed ? "Passed" : result.error ? "Error" : "Failed"}</span>
                                    </div>
                                    {result.error && <p className="mt-1 opacity-80">{result.error}</p>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
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