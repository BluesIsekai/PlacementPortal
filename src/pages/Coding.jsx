import React, { useEffect, useState } from "react";
import { 
  Code2, Play, Save, RotateCcw, BookOpen, 
  Timer, ChevronDown, ChevronUp, Filter, 
  Search, Star, TrendingUp, BarChart3, 
  CheckCircle, XCircle, HelpCircle, Award,
  Zap, Coffee, Clock, Terminal
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
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const Lang = {
  "C": {
    "name": "c",
    "version": "10.2.0",
    "filename": "my_cool_code.c"
  },
  "C#": {
    "name": "csharp",
    "version": "6.12.0",
    "filename": "my_cool_code.cs"
  },
  "C++": {
    "name": "c++",
    "version": "10.2.0",
    "filename": "my_cool_code.cpp"
  },
  "Go": {
    "name": "go",
    "version": "1.16.2",
    "filename": "my_cool_code.go"
  },
  "Java": {
    "name": "java",
    "version": "15.0.2",
    "filename": "my_cool_code.java"
  },
  "JavaScript": {
    "name": "javascript",
    "version": "18.15.0",
    "filename": "my_cool_code.js"
  },
  "PHP": {
    "name": "php",
    "version": "8.2.3",
    "filename": "my_cool_code.php"
  },
  "Python": {
    "name": "python",
    "version": "3.10.0",
    "filename": "my_cool_code.py"
  },
  "Ruby": {
    "name": "ruby",
    "version": "3.0.1",
    "filename": "my_cool_code.rb"
  }
};


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
    },
    {
      id: 6,
      title: "Merge Two Sorted Lists",
      difficulty: "easy",
      topics: ["Linked List"],
      acceptance: "72%",
      description: "Merge two sorted linked lists and return the head of the merged list.",
      examples: [
        {
          input: "list1 = [1,2,4], list2 = [1,3,4]",
          output: "[1,1,2,3,4,4]",
          explanation: "Elements should appear in non-decreasing order."
        }
      ],
      constraints: [
        "The number of nodes in both lists is in the range [0, 50]",
        "-100 <= Node.val <= 100"
      ],
      starterCode: "function mergeTwoLists(list1, list2) {\n    // Your code here\n};"
    },
    {
      id: 7,
      title: "Climbing Stairs",
      difficulty: "easy",
      topics: ["Dynamic Programming"],
      acceptance: "69%",
      description: "You are climbing a staircase. Each time you can climb 1 or 2 steps. Compute how many distinct ways you can climb to the top.",
      examples: [
        {
          input: "n = 3",
          output: "3",
          explanation: "1 step + 1 step + 1 step, 1 step + 2 steps, 2 steps + 1 step"
        }
      ],
      constraints: [
        "1 <= n <= 45"
      ],
      starterCode: "function climbStairs(n) {\n    // Your code here\n};"
    },
    {
      id: 8,
      title: "Best Time to Buy and Sell Stock",
      difficulty: "easy",
      topics: ["Arrays", "Dynamic Programming"],
      acceptance: "55%",
      description: "Given an array prices where prices[i] is the price of a stock on the ith day, maximize profit by choosing a single day to buy and a different day to sell.",
      examples: [
        {
          input: "prices = [7,1,5,3,6,4]",
          output: "5",
          explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6)."
        }
      ],
      constraints: [
        "1 <= prices.length <= 10^5",
        "0 <= prices[i] <= 10^4"
      ],
      starterCode: "function maxProfit(prices) {\n    // Your code here\n};"
    },
    {
      id: 9,
      title: "Maximum Subarray",
      difficulty: "easy",
      topics: ["Arrays", "Dynamic Programming"],
      acceptance: "53%",
      description: "Find the contiguous subarray which has the largest sum and return its sum.",
      examples: [
        {
          input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          output: "6",
          explanation: "The subarray [4,-1,2,1] has the largest sum 6."
        }
      ],
      constraints: [
        "1 <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4"
      ],
      starterCode: "function maxSubArray(nums) {\n    // Your code here\n};"
    },
    {
      id: 10,
      title: "Binary Tree Level Order Traversal",
      difficulty: "medium",
      topics: ["Trees", "Breadth-First Search"],
      acceptance: "64%",
      description: "Return the level order traversal of the nodes' values of a binary tree.",
      examples: [
        {
          input: "root = [3,9,20,null,null,15,7]",
          output: "[[3],[9,20],[15,7]]",
          explanation: "Visit nodes level by level."
        }
      ],
      constraints: [
        "The number of nodes in the tree is in the range [0, 2000]",
        "-1000 <= Node.val <= 1000"
      ],
      starterCode: "function levelOrder(root) {\n    // Your code here\n};"
    },
    {
      id: 11,
      title: "Product of Array Except Self",
      difficulty: "medium",
      topics: ["Arrays"],
      acceptance: "65%",
      description: "Return an array answer such that answer[i] is the product of all elements of nums except nums[i] without using division.",
      examples: [
        {
          input: "nums = [1,2,3,4]",
          output: "[24,12,8,6]",
          explanation: "Compute prefix and suffix products."
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^5",
        "-30 <= nums[i] <= 30",
        "The product of any prefix or suffix fits in a 32-bit integer"
      ],
      starterCode: "function productExceptSelf(nums) {\n    // Your code here\n};"
    },
    {
      id: 12,
      title: "Validate Binary Search Tree",
      difficulty: "medium",
      topics: ["Trees", "Depth-First Search"],
      acceptance: "32%",
      description: "Determine if a binary tree is a valid binary search tree.",
      examples: [
        {
          input: "root = [2,1,3]",
          output: "true",
          explanation: "Left subtree values are less and right subtree values are greater."
        },
        {
          input: "root = [5,1,4,null,null,3,6]",
          output: "false",
          explanation: "Node with value 3 is in the wrong position."
        }
      ],
      constraints: [
        "The number of nodes in the tree is in the range [0, 10^4]",
        "-2^31 <= Node.val <= 2^31 - 1"
      ],
      starterCode: "function isValidBST(root) {\n    // Your code here\n};"
    },
    {
      id: 13,
      title: "Word Break",
      difficulty: "medium",
      topics: ["Dynamic Programming", "Strings"],
      acceptance: "45%",
      description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
      examples: [
        {
          input: 's = "leetcode", wordDict = ["leet","code"]',
          output: "true",
          explanation: 's can be segmented as "leet code".'
        }
      ],
      constraints: [
        "1 <= s.length <= 300",
        "1 <= wordDict.length <= 1000",
        "1 <= wordDict[i].length <= 20"
      ],
      starterCode: "function wordBreak(s, wordDict) {\n    // Your code here\n};"
    },
    {
      id: 14,
      title: "Number of Islands",
      difficulty: "medium",
      topics: ["Arrays", "Depth-First Search"],
      acceptance: "58%",
      description: "Given a 2D grid map of '1's (land) and '0's (water), count the number of islands.",
      examples: [
        {
          input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] ',
          output: "3",
          explanation: "Each connected component of land counts as one island."
        }
      ],
      constraints: [
        "m == grid.length",
        "n == grid[i].length",
        "1 <= m, n <= 300"
      ],
      starterCode: "function numIslands(grid) {\n    // Your code here\n};"
    },
    {
      id: 15,
      title: "Longest Increasing Subsequence",
      difficulty: "medium",
      topics: ["Dynamic Programming"],
      acceptance: "49%",
      description: "Return the length of the longest strictly increasing subsequence of an integer array.",
      examples: [
        {
          input: "nums = [10,9,2,5,3,7,101,18]",
          output: "4",
          explanation: "The LIS is [2,3,7,101]."
        }
      ],
      constraints: [
        "1 <= nums.length <= 2500",
        "-10^4 <= nums[i] <= 10^4"
      ],
      starterCode: "function lengthOfLIS(nums) {\n    // Your code here\n};"
    },
    {
      id: 16,
      title: "LRU Cache",
      difficulty: "hard",
      topics: ["Design", "Hash Table"],
      acceptance: "37%",
      description: "Design a data structure that follows the constraints of a Least Recently Used cache.",
      examples: [
        {
          input: "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"] with capacity 2",
          output: "[null,null,null,1,null,-1,null,-1,3,4]",
          explanation: "Use get and put operations respecting LRU eviction."
        }
      ],
      constraints: [
        "1 <= capacity <= 3000",
        "0 <= key <= 10^4",
        "0 <= value <= 10^5",
        "At most 2 * 10^5 calls will be made"
      ],
      starterCode: "class LRUCache {\n  constructor(capacity) {\n    // Your initialization here\n  }\n\n  get(key) {\n    // Your code here\n  }\n\n  put(key, value) {\n    // Your code here\n  }\n}"
    },
    {
      id: 17,
      title: "Trapping Rain Water",
      difficulty: "hard",
      topics: ["Arrays", "Two Pointers"],
      acceptance: "53%",
      description: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
      examples: [
        {
          input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
          output: "6",
          explanation: "Use two-pointer or stack to compute trapped water."
        }
      ],
      constraints: [
        "n == height.length",
        "1 <= n <= 2 * 10^4",
        "0 <= height[i] <= 10^5"
      ],
      starterCode: "function trap(height) {\n    // Your code here\n};"
    },
    {
      id: 18,
      title: "Sliding Window Maximum",
      difficulty: "hard",
      topics: ["Arrays", "Deque"],
      acceptance: "44%",
      description: "Given an array nums and a sliding window of size k, return the maximum value in each window.",
      examples: [
        {
          input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
          output: "[3,3,5,5,6,7]",
          explanation: "Maintain decreasing deque for O(n) solution."
        }
      ],
      constraints: [
        "1 <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4",
        "1 <= k <= nums.length"
      ],
      starterCode: "function maxSlidingWindow(nums, k) {\n    // Your code here\n};"
    },
    {
      id: 19,
      title: "Alien Dictionary",
      difficulty: "hard",
      topics: ["Graphs", "Topological Sort"],
      acceptance: "34%",
      description: "Given a sorted dictionary of an alien language, derive the order of the alphabet.",
      examples: [
        {
          input: 'words = ["wrt","wrf","er","ett","rftt"]',
          output: '"wertf"',
          explanation: "Build precedence graph and perform topological sort."
        }
      ],
      constraints: [
        "1 <= words.length <= 100",
        "1 <= words[i].length <= 100",
        "Words consist of lowercase English letters"
      ],
      starterCode: "function alienOrder(words) {\n    // Your code here\n};"
    },
    {
      id: 20,
      title: "Minimum Window Substring",
      difficulty: "hard",
      topics: ["Strings", "Sliding Window"],
      acceptance: "41%",
      description: "Given two strings s and t, return the minimum window in s which contains all the characters in t.",
      examples: [
        {
          input: 's = "ADOBECODEBANC", t = "ABC"',
          output: '"BANC"',
          explanation: "Shortest substring containing all required characters."
        }
      ],
      constraints: [
        "1 <= s.length, t.length <= 10^5",
        "s and t consist of uppercase and lowercase English letters"
      ],
      starterCode: "function minWindow(s, t) {\n    // Your code here\n};"
    },
    {
      id: 21,
      title: "Palindrome Partitioning",
      difficulty: "medium",
      topics: ["Backtracking", "Dynamic Programming"],
      acceptance: "52%",
      description: "Partition a string such that every substring of the partition is a palindrome and return all partitions.",
      examples: [
        {
          input: 's = "aab"',
          output: "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
          explanation: "Generate all palindrome partitions."
        }
      ],
      constraints: [
        "1 <= s.length <= 16",
        "s consists of lowercase English letters"
      ],
      starterCode: "function partition(s) {\n    // Your code here\n};"
    },
    {
      id: 22,
      title: "Combination Sum",
      difficulty: "medium",
      topics: ["Backtracking"],
      acceptance: "70%",
      description: "Given an array of distinct integers candidates and a target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
      examples: [
        {
          input: "candidates = [2,3,6,7], target = 7",
          output: "[[2,2,3],[7]]",
          explanation: "Use DFS with backtracking to explore combinations."
        }
      ],
      constraints: [
        "1 <= candidates.length <= 30",
        "2 <= candidates[i] <= 40",
        "1 <= target <= 40"
      ],
      starterCode: "function combinationSum(candidates, target) {\n    // Your code here\n};"
    },
    {
      id: 23,
      title: "Rotate Image",
      difficulty: "medium",
      topics: ["Arrays", "Matrix"],
      acceptance: "68%",
      description: "You are given an n x n 2D matrix representing an image; rotate the image by 90 degrees clockwise in-place.",
      examples: [
        {
          input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
          output: '[[7,4,1],[8,5,2],[9,6,3]]',
          explanation: "Transpose then reverse each row."
        }
      ],
      constraints: [
        "n == matrix.length == matrix[i].length",
        "1 <= n <= 20",
        "-1000 <= matrix[i][j] <= 1000"
      ],
      starterCode: "function rotate(matrix) {\n    // Your code here\n};"
    },
    {
      id: 24,
      title: "Merge Intervals",
      difficulty: "medium",
      topics: ["Arrays", "Sorting"],
      acceptance: "57%",
      description: "Given an array of intervals, merge all overlapping intervals and return the result.",
      examples: [
        {
          input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
          output: "[[1,6],[8,10],[15,18]]",
          explanation: "Sort by start time and merge overlapping intervals."
        }
      ],
      constraints: [
        "1 <= intervals.length <= 10^4",
        "intervals[i].length == 2",
        "0 <= intervals[i][0] <= intervals[i][1] <= 10^4"
      ],
      starterCode: "function merge(intervals) {\n    // Your code here\n};"
    },
    {
      id: 25,
      title: "Serialize and Deserialize Binary Tree",
      difficulty: "hard",
      topics: ["Trees", "Design"],
      acceptance: "56%",
      description: "Design an algorithm to serialize and deserialize a binary tree.",
      examples: [
        {
          input: "root = [1,2,3,null,null,4,5]",
          output: "Tree structure remains the same after serialize and deserialize",
          explanation: "Use BFS or DFS encoding with null markers."
        }
      ],
      constraints: [
        "The number of nodes in the tree is in the range [0, 10^4]",
        "-1000 <= Node.val <= 1000"
      ],
      starterCode: "class Codec {\n  serialize(root) {\n    // Your code here\n  }\n\n  deserialize(data) {\n    // Your code here\n  }\n}"
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

  const runCode = async () => {
    setIsRunning(true);
    const body=JSON.stringify({
      language: Lang[selectedLanguage].name,
      version: Lang[selectedLanguage].version,
      files: [
        {
          name: Lang[selectedLanguage].filename,
          content: `${code}`,
        },
      ],
      stdin:input,
      args: [],
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    })

    console.log(input)
    const res = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:body,
  });
  const data = await res.json();
  if(data.run.stdout){
    setOutput(data.run.stdout);

  }else if(data.run.stderr){
    
    setOutput(data.run.stderr);
  }
    setIsRunning(false);



  };



  const resetCode = () => {
    setCode("// Write your code here\nfunction solveProblem(input) {\n  // Your solution\n  return input;\n}");
    setOutput("");
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
    JavaScript: "// Write your JavaScript code here\nfunction solveProblem(input) {\n  // Your solution\n  return input;\n}",
    PHP: "<?php\n// Write your PHP code here\nfunction solveProblem($input) {\n  // Your solution\n  return $input;\n}",
    Python: "# Write your Python code here\ndef solve_problem(input):\n    # Your solution\n    return input",
    Ruby: "# Write your Ruby code here\ndef solve_problem(input)\n  # Your solution\n  input\nend"
  };


  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(languageStarterCodes[newLanguage]);
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary}`}>
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
                  className={`flex-1 px-3 py-2 rounded-lg border ${theme.border.primary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.bg.tertiary} ${theme.text.primary}`}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
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
              </div>
              
              <div className="space-y-3">
                {filteredProblems.map(problem => (
                  <div 
                    key={problem.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      expandedProblem === problem.id 
                        ? `border-indigo-500 ${theme.bg.accent}` 
                        : `${theme.border.primary} ${theme.bg.cardHover}`
                    }`}
                    onClick={() => setExpandedProblem(expandedProblem === problem.id ? null : problem.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${theme.text.primary}`}>{problem.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className={`text-sm ${theme.text.tertiary}`}>
                        Acceptance: {problem.acceptance}
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
                ))}
              </div>
            </div>
            
            {/* Progress Tracking */}
            <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} p-5`}>
              <h2 className="font-semibold mb-4">Your Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Easy</span>
                    <span>{userStats.easySolved}/25</span>
                  </div>
                  <div className={`w-full ${theme.bg.muted} rounded-full h-2`}>
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
                  <div className={`w-full ${theme.bg.muted} rounded-full h-2`}>
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
                  <div className={`w-full ${theme.bg.muted} rounded-full h-2`}>
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{ width: `${(userStats.hardSolved / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className={`mt-6 pt-4 border-t ${theme.border.default}`}>
                <h3 className="font-medium mb-2">Daily Goal</h3>
                <div className="flex items-center gap-3">
                  <div className={`flex-1 ${theme.bg.muted} rounded-full h-2`}>
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
            <div className={`${theme.bg.card} rounded-xl ${theme.shadow.card} overflow-hidden`}>
              {/* Tabs */}
              <div className={`border-b ${theme.border.primary}`}>
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
                        className={`px-2 py-1 rounded border ${theme.border.primary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${theme.bg.secondary} ${theme.text.primary} text-sm`}
                      >
                        {Object.keys(languageStarterCodes).sort().map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className={`w-full h-96 p-4 font-mono text-sm focus:outline-none resize-none ${theme.bg.secondary} ${theme.text.primary}`}
                      spellCheck="false"
                    />
                    <div className="bg-slate-100 m-5 rounded-sm dark:bg-slate-900/50">
                    <h1 className="font-medium p-2 mx-5 rounded">Input</h1>
                    <textarea type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} className="w-full h-48 p-4 font-mono text-sm focus:outline-none resize-none "/>
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
                      <div className={`mt-4 p-4 ${theme.bg.secondary} rounded-lg`}>
                        <h4 className={`font-medium mb-2 ${theme.text.primary}`}>Output</h4>
                        <pre className={`text-sm font-mono ${theme.text.secondary} whitespace-pre-wrap`}>
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
                            <div key={index} className={`mb-4 p-4 ${theme.bg.secondary} rounded-lg`}>
                              <p className={`font-medium ${theme.text.primary}`}>Example {index + 1}:</p>
                              <p className={`mt-1 ${theme.text.secondary}`}><strong>Input:</strong> {example.input}</p>
                              <p className={`${theme.text.secondary}`}><strong>Output:</strong> {example.output}</p>
                              {example.explanation && (
                                <p className={`${theme.text.secondary}`}><strong>Explanation:</strong> {example.explanation}</p>
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
                            <span key={topic} className={`px-3 py-1 ${theme.bg.accent} ${theme.text.secondary} text-sm rounded-full`}>
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