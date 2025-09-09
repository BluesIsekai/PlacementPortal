import React, { useState } from "react";
import { 
  Building2, Search, Filter, MapPin, Users, 
  Award, Star, TrendingUp, Calendar, 
  BookOpen, ChevronDown, ChevronUp, ExternalLink,
  BarChart3, Clock, FileText, Play,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCompany, setExpandedCompany] = useState(null);

  // Sample company data
  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "G",
      industry: "Technology",
      difficulty: "hard",
      popularity: 4.9,
      hiring: true,
      location: "Multiple Locations",
      description: "World's leading technology company specializing in Internet-related services and products.",
      recruitment: {
        process: ["Online Test", "Technical Rounds", "HR Interview"],
        duration: "4-6 weeks",
        offers: "15-20 LPA",
        skills: ["Data Structures", "Algorithms", "System Design", "Problem Solving"]
      },
      resources: {
        questions: 125,
        experiences: 42,
        quizzes: 8
      }
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "M",
      industry: "Technology",
      difficulty: "hard",
      popularity: 4.7,
      hiring: true,
      location: "Bangalore, Hyderabad",
      description: "Multinational technology company that develops, manufactures, licenses, supports, and sells computer software.",
      recruitment: {
        process: ["Online Assessment", "Group Discussion", "Technical Interviews", "HR Round"],
        duration: "3-5 weeks",
        offers: "12-18 LPA",
        skills: ["C++", "Java", "Cloud Computing", "System Design"]
      },
      resources: {
        questions: 110,
        experiences: 35,
        quizzes: 6
      }
    },
    {
      id: 3,
      name: "TCS",
      logo: "T",
      industry: "IT Services",
      difficulty: "medium",
      popularity: 4.5,
      hiring: true,
      location: "Pan India",
      description: "Global leader in IT services, consulting, and business solutions.",
      recruitment: {
        process: ["Aptitude Test", "Technical Interview", "HR Interview"],
        duration: "2-4 weeks",
        offers: "3.5-7 LPA",
        skills: ["Aptitude", "Communication", "Basic Programming"]
      },
      resources: {
        questions: 90,
        experiences: 25,
        quizzes: 5
      }
    },
    {
      id: 4,
      name: "Infosys",
      logo: "I",
      industry: "IT Services",
      difficulty: "medium",
      popularity: 4.3,
      hiring: true,
      location: "Pan India",
      description: "Leading IT services company providing consulting and outsourcing solutions.",
      recruitment: {
        process: ["Online Test", "Technical Interview", "HR Interview"],
        duration: "3-5 weeks",
        offers: "3.6-6 LPA",
        skills: ["Logical Reasoning", "Verbal Ability", "Programming"]
      },
      resources: {
        questions: 85,
        experiences: 30,
        quizzes: 4
      }
    },
    {
      id: 5,
      name: "HDFC Bank",
      logo: "H",
      industry: "Banking & Finance",
      difficulty: "medium",
      popularity: 4.6,
      hiring: true,
      location: "Pan India",
      description: "India's leading private sector bank offering a wide range of financial products and services.",
      recruitment: {
        process: ["Aptitude Test", "Group Discussion", "HR Interview"],
        duration: "3-4 weeks",
        offers: "4-8 LPA",
        skills: ["Finance", "Customer Handling", "Communication"]
      },
      resources: {
        questions: 70,
        experiences: 20,
        quizzes: 3
      }
    },
    {
      id: 6,
      name: "ICICI Bank",
      logo: "I",
      industry: "Banking & Finance",
      difficulty: "medium",
      popularity: 4.4,
      hiring: true,
      location: "Pan India",
      description: "Leading private sector bank in India offering banking and financial services.",
      recruitment: {
        process: ["Online Test", "Technical Interview", "HR Interview"],
        duration: "3-5 weeks",
        offers: "4-7 LPA",
        skills: ["Banking Knowledge", "Customer Service", "Problem Solving"]
      },
      resources: {
        questions: 65,
        experiences: 18,
        quizzes: 2
      }
    }
  ];

  const filters = [
    { id: "all", label: "All Companies" },
    { id: "technology", label: "Technology" },
    { id: "it-services", label: "IT Services" },
    { id: "finance", label: "Banking & Finance" },
    { id: "hiring", label: "Currently Hiring" }
  ];

  const difficultyColors = {
    easy: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    medium: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    hard: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
  };

  const filteredCompanies = companies.filter(company => {
    // Industry filter
    if (activeFilter !== "all") {
      if (activeFilter === "hiring") {
        if (!company.hiring) return false;
      } else if (company.industry.toLowerCase() !== activeFilter.toLowerCase()) {
        return false;
      }
    }
    
    // Search filter
    if (searchQuery && !company.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !company.industry.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold">Companies</h1>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Companies</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Explore companies and their recruitment processes
            </p>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <BarChart3 size={18} />
            Compare Companies
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Building2 size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{companies.length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Companies</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{companies.filter(c => c.hiring).length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Currently Hiring</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FileText size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">782</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Practice Questions</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <BookOpen size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">386</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Interview Experiences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-slate-500" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === filter.id
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompanies.map(company => (
            <div key={company.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                      {company.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{company.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{company.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium">{company.popularity}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{company.location}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[company.difficulty]}`}>
                    {company.difficulty.charAt(0).toUpperCase() + company.difficulty.slice(1)}
                  </div>
                  <div className={`flex items-center gap-1 ${company.hiring ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    <div className={`h-2 w-2 rounded-full ${company.hiring ? 'bg-green-600' : 'bg-red-600'}`}></div>
                    <span>{company.hiring ? 'Hiring' : 'Not Hiring'}</span>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{company.description}</p>
                
                {expandedCompany === company.id && (
                  <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <h4 className="font-medium mb-3">Recruitment Process</h4>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <Clock size={14} />
                        <span>Duration: {company.recruitment.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                        <Award size={14} />
                        <span>Average CTC: {company.recruitment.offers}</span>
                      </div>
                      
                      <h5 className="font-medium text-sm mb-2">Process Stages:</h5>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside mb-3">
                        {company.recruitment.process.map((stage, index) => (
                          <li key={index}>{stage}</li>
                        ))}
                      </ul>
                      
                      <h5 className="font-medium text-sm mb-2">Key Skills Required:</h5>
                      <div className="flex flex-wrap gap-2">
                        {company.recruitment.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-3">Practice Resources</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white dark:bg-slate-600/30 p-3 rounded-lg text-center">
                        <p className="font-semibold">{company.resources.questions}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Questions</p>
                      </div>
                      <div className="bg-white dark:bg-slate-600/30 p-3 rounded-lg text-center">
                        <p className="font-semibold">{company.resources.experiences}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Experiences</p>
                      </div>
                      <div className="bg-white dark:bg-slate-600/30 p-3 rounded-lg text-center">
                        <p className="font-semibold">{company.resources.quizzes}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Quizzes</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1">
                        <Play size={14} />
                        Practice Questions
                      </button>
                      <button className="flex-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors">
                        View Experiences
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setExpandedCompany(expandedCompany === company.id ? null : company.id)}
                    className="text-sm text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1"
                  >
                    {expandedCompany === company.id ? (
                      <>
                        Show Less <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        Show Details <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                  
                  <button className="text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
                    Add to Compare <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-12 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
              <Building2 size={32} className="text-slate-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No companies found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
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

export default Companies;