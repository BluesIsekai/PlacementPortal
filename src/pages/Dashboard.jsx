import React, { useState, useRef, useEffect } from "react";
import { LayoutDashboard, Code2, Building2, FileText, BarChart3, Bell, Moon, Sun, Settings, LogOut, User, Calendar, Mail, X, Menu, ChevronDown, GraduationCap, Target, TrendingUp, BookOpen, Users, Award, ChevronRight, Sparkles, Star, Search, Compass, MessageCircle, Send, Bot, Loader2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import Footer from "./Footer";

// Helper Components
const GoalProgress = ({ title, completed, total }) => {
  const theme = useTheme();
  const percentage = (completed / total) * 100;
  
  return (
    <div className={`${theme.bg.tertiary} rounded-xl p-3 ${theme.border.primary} border`}>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${theme.text.primary}`}>{title}</span>
        <span className={`text-xs ${theme.text.tertiary}`}>{completed}/{total}</span>
      </div>
      <div className={`h-2 ${theme.bg.secondary} rounded-full`}>
        <div 
          className="h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Card = ({ title, children, action }) => {
  const theme = useTheme();
  return (
    <div className={`rounded-2xl ${theme.border.primary} ${theme.bg.card} p-4 ${theme.shadow.card} border`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-semibold ${theme.text.primary}`}>{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
};

const ActivityItem = ({ icon, title, meta, badge }) => {
  const theme = useTheme();
  return (
    <div className={`flex items-center gap-3 rounded-xl p-3 ${theme.bg.hover} transition-colors`}>
      <div className={`p-2 ${theme.bg.tertiary} rounded-lg`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className={`font-medium text-sm ${theme.text.primary}`}>{title}</p>
        <p className={`text-xs ${theme.text.tertiary}`}>{meta}</p>
      </div>
      {badge && (
        <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
};

const SkillProgressItem = ({ skill, progress, level }) => {
  const theme = useTheme();
  return (
    <div className={`group ${theme.bg.cardHover} p-2 rounded-lg transition-colors`}>
      <div className="flex justify-between text-sm mb-1">
        <span className={`group-hover:text-indigo-400 transition-colors ${theme.text.primary}`}>{skill}</span>
        <span className={theme.text.tertiary}>{progress}%</span>
      </div>
      <div className={`h-2 ${theme.bg.secondary} rounded-full`}>
        <div 
          className="h-2 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={`flex justify-between text-xs ${theme.text.muted} mt-1`}>
        <span>Level</span>
        <span>{level}</span>
      </div>
    </div>
  );
};

const DriveItem = ({ company, date, time, type, status }) => {
  const theme = useTheme();
  const statusColor = status === "upcoming" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400";
  
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl ${theme.border.primary} ${theme.bg.card} ${theme.bg.cardHover} transition-colors group border`}>
      <div>
        <p className={`font-medium group-hover:text-indigo-400 transition-colors ${theme.text.primary}`}>{company}</p>
        <p className={`text-xs ${theme.text.tertiary}`}>{type}</p>
      </div>
      <div className="text-right">
        <p className={`font-medium ${theme.text.primary}`}>{date}</p>
        <p className={`text-xs ${theme.text.tertiary}`}>{time}</p>
        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor} mt-1 inline-block`}>{status}</span>
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, desc, btn, onClick }) => {
  const theme = useTheme();
  return (
    <div className={`rounded-2xl ${theme.border.primary} ${theme.bg.card} p-4 ${theme.border.hover} transition-all duration-300 group ${theme.shadow.card} border`}>
      <div className={`mb-2 flex items-center gap-2 ${theme.text.secondary} group-hover:text-indigo-400 transition-colors`}>
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className={`text-sm ${theme.text.tertiary}`}>{desc}</p>
      <div className="mt-3">
        <button
          type="button"
          onClick={onClick}
          className={`rounded-lg ${theme.border.primary} ${theme.button.secondary} px-3 py-1.5 text-sm transition-colors group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white border`}
        >
          {btn} <ChevronRight size={14} className="inline-block ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const ApplicationStatus = () => {
  const theme = useTheme();
  return (
    <section className={`rounded-2xl ${theme.border.primary} ${theme.bg.card} p-5 ${theme.shadow.card} border`}>
      <h3 className={`font-semibold ${theme.text.primary} mb-4`}>Application Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`text-center p-4 rounded-xl ${theme.bg.tertiary}`}>
          <div className="text-2xl font-bold text-blue-400">12</div>
          <div className={`text-sm ${theme.text.tertiary}`}>Applied</div>
        </div>
        <div className={`text-center p-4 rounded-xl ${theme.bg.tertiary}`}>
          <div className="text-2xl font-bold text-yellow-400">4</div>
          <div className={`text-sm ${theme.text.tertiary}`}>In Review</div>
        </div>
        <div className={`text-center p-4 rounded-xl ${theme.bg.tertiary}`}>
          <div className="text-2xl font-bold text-green-400">2</div>
          <div className={`text-sm ${theme.text.tertiary}`}>Interviews</div>
        </div>
        <div className={`text-center p-4 rounded-xl ${theme.bg.tertiary}`}>
          <div className="text-2xl font-bold text-indigo-400">1</div>
          <div className={`text-sm ${theme.text.tertiary}`}>Offers</div>
        </div>
      </div>
    </section>
  );
};

const InterviewResources = () => {
  const theme = useTheme();
  const resources = [
    { title: "Resume Builder", desc: "Create an ATS-friendly resume", icon: <FileText size={20} />, progress: 75 },
    { title: "Mock Interviews", desc: "Practice with AI or peers", icon: <User size={20} />, progress: 40 },
    { title: "Interview Questions", desc: "Company-specific questions", icon: <FileText size={20} />, progress: 60 },
    { title: "Placement Papers", desc: "Previous year questions", icon: <BarChart3 size={20} />, progress: 85 },
  ];

  return (
    <section className={`rounded-2xl ${theme.border.primary} ${theme.bg.card} p-5 ${theme.shadow.card} border`}>
      <h3 className={`font-semibold ${theme.text.primary} mb-4`}>Interview Prep Resources</h3>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource, index) => (
          <div key={index} className={`p-4 rounded-xl ${theme.bg.tertiary} ${theme.bg.cardHover} transition-colors group cursor-pointer`}>
            <div className={`mb-3 flex items-center gap-2 ${theme.text.secondary} group-hover:text-indigo-400 transition-colors`}>
              {resource.icon}
              <h4 className="font-medium text-sm">{resource.title}</h4>
            </div>
            <p className={`text-xs ${theme.text.tertiary} mb-3`}>{resource.desc}</p>
            <div className={`h-2 ${theme.bg.secondary} rounded-full mb-1`}>
              <div 
                className="h-2 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full" 
                style={{ width: `${resource.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className={theme.text.muted}>Progress</span>
              <span className={theme.text.muted}>{resource.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PerformanceOverview = () => {
  const theme = useTheme();
  return (
    <section className={`rounded-2xl ${theme.border.primary} ${theme.bg.card} p-5 ${theme.shadow.card} border`}>
      <h3 className={`font-semibold ${theme.text.primary} mb-4`}>Performance Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${theme.bg.tertiary} rounded-xl p-4`}>
          <h4 className={`text-sm font-medium mb-3 ${theme.text.primary}`}>Weekly Progress</h4>
          <div className="flex items-end justify-between h-32">
            {[40, 65, 50, 75, 60, 80, 70].map((height, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-6 bg-gradient-to-t from-indigo-500 to-violet-600 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
                <span className={`text-xs ${theme.text.muted} mt-1`}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`${theme.bg.tertiary} rounded-xl p-4`}>
          <h4 className={`text-sm font-medium mb-3 ${theme.text.primary}`}>Top Skills</h4>
          <div className="space-y-3">
            {[
              { skill: "Problem Solving", rating: 4.5 },
              { skill: "Data Structures", rating: 4.2 },
              { skill: "System Design", rating: 3.8 },
              { skill: "Communication", rating: 4.0 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`text-sm ${theme.text.primary}`}>{item.skill}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      className={star <= Math.floor(item.rating) ? "text-amber-400 fill-amber-400" : `${theme.text.muted}`} 
                    />
                  ))}
                  <span className={`text-xs ${theme.text.tertiary} ml-1`}>{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`mt-4 text-center p-3 ${theme.bg.tertiary} rounded-lg`}>
        <span className={`text-sm ${theme.text.secondary}`}>Success Rate: 12%</span>
      </div>
    </section>
  );
};

const AIChatWidget = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your placement mentor. Ask about quizzes, companies, or interview prep and I'll help you out.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const pendingMessages = [...messages, { role: "user", content: trimmed }];
    setInput("");

    if (!apiKey) {
      setMessages([
        ...pendingMessages,
        {
          role: "assistant",
          content: "Missing Google AI Studio API key. Add VITE_GEMINI_API_KEY to your environment and reload.",
        },
      ]);
      return;
    }

    setMessages(pendingMessages);
    setIsLoading(true);

    try {
      const contents = pendingMessages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      }));

      // Calls Google AI Studio (Gemini) API for chat completions.
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contents }),
        }
      );

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const message = errorPayload?.error?.message || "Failed to fetch response";
        throw new Error(message);
      }

      const data = await response.json();
      const text =
        data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text)
          .filter(Boolean)
          .join("\n")?.trim() ||
        "I couldn't find the right answer. Try asking in a different way.";

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch (error) {
      console.error("Placement AI chat error", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while reaching the AI service. " +
            (error instanceof Error ? error.message : "Please try again soon."),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div
          className={`flex h-[420px] w-72 sm:w-80 flex-col overflow-hidden rounded-xl border ${theme.border.primary} ${theme.bg.card} ${theme.shadow.card}`}
        >
          <div className={`flex items-center justify-between px-3 py-2 ${theme.bg.secondary}`}>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-indigo-500/20 grid place-content-center">
                <Bot size={18} className="text-indigo-400" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${theme.text.primary}`}>AI Helper</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`${theme.text.secondary} hover:text-rose-400 transition-colors`}
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          <div className={`flex-1 space-y-2 overflow-y-auto px-3 py-3 ${theme.bg.primary}`}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 text-sm leading-snug shadow-sm ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : `${theme.bg.tertiary} ${theme.text.primary}`
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${theme.bg.tertiary} ${theme.text.primary}`}>
                  <Loader2 size={16} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={`border-t ${theme.border.primary} ${theme.bg.secondary} p-3`}>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder={apiKey ? "Ask about placements, interviews, etc." : "Add VITE_GEMINI_API_KEY to enable chat."}
              className={`h-20 w-full resize-none rounded-lg border ${theme.border.primary} ${theme.bg.primary} ${theme.text.primary} px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              disabled={!apiKey || isLoading}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className={`text-[11px] ${theme.text.muted}`}>Shift+Enter for newline</span>
              <button
                type="submit"
                disabled={!input.trim() || isLoading || !apiKey}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  !input.trim() || isLoading || !apiKey
                    ? `${theme.bg.hover} ${theme.text.muted} cursor-not-allowed`
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                <Send size={15} />
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 transition-transform hover:scale-105"
        >
          <MessageCircle size={18} />
          Ask Placement AI
        </button>
      )}
    </div>
  );
};

// Main Dashboard Component
const PlacementPortalDashboard = () => {
  const theme = useTheme();
  const { logout, user } = useAuth();
  const [openUser, setOpenUser] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Code2 size={18} />, label: "Coding", path: "/coding" },
    { icon: <Building2 size={18} />, label: "Companies", path: "/companies" },
    { icon: <Search size={18} />, label: "Search Users", path: "/search" },
    { icon: <Compass size={18} />, label: "Explore Profiles", path: "/explore" },
    { icon: <FileText size={18} />, label: "Practice Quizzes", path: "/quizzes" },
    { icon: <BarChart3 size={18} />, label: "Report", path: "/reports" },
  ];

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      // logout function already handles navigation to landing page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Reset loading state when location changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Stats for the dashboard
  const dashboardStats = [
    { title: "Coding Streak", value: "12 days", icon: <TrendingUp size={16} />, change: "+3", positive: true },
    { title: "Avg Quiz Score", value: "76%", icon: <BarChart3 size={16} />, change: "+5%", positive: true },
    { title: "Applications", value: "27", icon: <Mail size={16} />, change: "+8", positive: true },
    { title: "Skills Mastered", value: "18/30", icon: <Award size={16} />, change: "+4", positive: true },
  ];

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme.bg.primary} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary} antialiased flex flex-col transition-colors duration-300 ease-in-out`}>
      {/* Top Bar */}
      <header className={`sticky top-0 z-30 ${theme.border.primary} ${theme.bg.navbar} backdrop-blur transition-colors duration-300 ease-in-out border-b`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
          {/* Brand and Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 ring-1 ring-white/10 grid place-content-center font-bold">
                <div className="relative flex flex-col items-center justify-center">
                  <GraduationCap className="text-yellow-300" size={16} />
                  <div className={`${theme.isDark ? 'text-white' : 'text-slate-800'} font-black text-sm`} style={{ textShadow: theme.isDark ? '0 0 6px rgba(255,255,255,0.5)' : '0 0 6px rgba(0,0,0,0.3)', fontFamily: 'monospace', lineHeight: '0.5', marginTop: '-1px', letterSpacing: '0.5px' }}>
                    P<span className="text-yellow-300">P</span>
                  </div>
                </div>
              </div>
              <div className="leading-tight">
                <p className={`font-semibold ${theme.text.primary}`}>Placement Portal</p>
                <p className={`text-xs ${theme.text.tertiary}`}>Student Dashboard</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block">
              <SearchBar 
                placeholder="Search users..." 
                className="w-64"
              />
            </div>

            <button
              className={`inline-flex items-center gap-2 rounded-lg ${theme.border.primary} ${theme.button.secondary} px-3 py-1.5 text-sm transition-all duration-300 hover:scale-105 border`}
              aria-label="Toggle theme"
              onClick={theme.toggleTheme}
            >
              {theme.isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">{theme.isDark ? "Light" : "Dark"}</span>
            </button>

            <button
              className={`relative rounded-lg ${theme.border.primary} ${theme.button.secondary} p-2 transition-all duration-300 hover:scale-105 border`}
              aria-label="Notifications"
              onClick={() => navigate("/notifications")}
            >
              <Bell size={18} />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-indigo-600 text-white text-[10px] grid place-content-center">3</span>
            </button>

            <div
              className="relative"
              ref={profileRef}
              onMouseEnter={() => setOpenUser(true)}
            >
              <button
                className={`flex items-center gap-2 rounded-xl ${theme.border.primary} ${theme.button.secondary} px-2 py-1.5 transition-all duration-300 hover:scale-105 border`}
              >
                <span className="text-lg">👤</span>
                <ChevronDown size={16} className={theme.text.tertiary} />
              </button>

              {openUser && (
                <div
                  className={`absolute right-0 mt-2 w-44 overflow-hidden rounded-xl ${theme.border.primary} ${theme.bg.secondary} ${theme.shadow.card} animate-fadeIn border`}
                >
                  <Link
                    to="/profile"
                    className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${theme.bg.hover} transition-colors`}
                  >
                    <User size={16} /> Profile
                  </Link>
                  <div className={`h-px ${theme.border.primary}`} />
                  <button 
                    onClick={handleLogout}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-400 ${theme.bg.hover} transition-colors`}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Horizontal Navigation Bar */}
      <nav className={`sticky top-16 z-20 ${theme.border.primary} ${theme.bg.navbar} backdrop-blur transition-colors duration-300 ease-in-out border-b`}>
        <div className="mx-auto max-w-7xl px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    location.pathname === item.path 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25" 
                      : `${theme.text.secondary} hover:${theme.text.primary} ${theme.bg.hover}`
                  }`}
                >
                  <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <Link
              to="/settings"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${theme.text.tertiary} hover:${theme.text.primary} ${theme.bg.hover} transition-all duration-200`}
            >
              <Settings size={16} />
              <span className="hidden lg:inline">Settings</span>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden py-3">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {navItems.slice(0, 3).map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      location.pathname === item.path 
                        ? "bg-indigo-600 text-white" 
                        : `${theme.text.secondary} hover:${theme.text.primary} ${theme.bg.hover}`
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              <button 
                onClick={() => setMobileNavOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium ${theme.text.secondary} hover:${theme.text.primary} ${theme.bg.hover} transition-colors`}
              >
                <Menu size={16} />
                More
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {mobileNavOpen && (
        <div className={`fixed inset-0 z-50 ${theme.bg.overlay} md:hidden`} onClick={() => setMobileNavOpen(false)}>
          <div className={`absolute right-0 top-0 h-full w-64 ${theme.bg.secondary} p-4 ${theme.shadow.hover} transition-colors duration-300 ease-in-out`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${theme.text.primary}`}>Navigation</h3>
              <button onClick={() => setMobileNavOpen(false)} className={theme.text.secondary}>
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path 
                      ? "bg-indigo-600 text-white" 
                      : `${theme.text.secondary} hover:${theme.text.primary} ${theme.bg.hover}`
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className={`h-px ${theme.border.primary} my-4`} />
              <Link
                to="/settings"
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${theme.text.secondary} hover:${theme.text.primary} ${theme.bg.hover} transition-colors`}
              >
                <Settings size={18} />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 flex-grow">
        <main className="space-y-6">
          {/* Dashboard Header with Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className={`text-2xl font-bold ${theme.text.primary}`}>Dashboard Overview</h1>
              <p className={theme.text.tertiary}>Welcome back, Kunj! Here's your placement preparation status.</p>
            </div>
            
            <div className={`flex ${theme.bg.secondary} rounded-lg p-1 ${theme.border.primary} border`}>
              {["overview", "performance", "goals"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    activeTab === tab 
                      ? "bg-indigo-600 text-white" 
                      : `${theme.text.tertiary} hover:${theme.text.secondary}`
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardStats.map((stat, index) => (
              <div key={index} className={`${theme.bg.card} rounded-xl p-4 ${theme.border.primary} ${theme.border.hover} transition-all duration-300 group ${theme.shadow.card} border`}>
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 ${theme.bg.tertiary} rounded-lg group-hover:bg-indigo-500/20 transition-colors`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${stat.positive 
                    ? (theme.isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700') 
                    : (theme.isDark ? 'bg-rose-900/30 text-rose-400' : 'bg-red-100 text-red-700')
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${theme.text.primary}`}>{stat.value}</h3>
                <p className={`text-sm ${theme.text.tertiary}`}>{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Daily Goals */}
          <section className={`rounded-2xl ${theme.border.primary} ${theme.bg.card} p-5 ${theme.shadow.card} border`}>
            <h1 className={`text-xl font-semibold ${theme.text.primary}`}>Daily Goals <Sparkles size={18} className="inline-block text-yellow-400 mb-1" /></h1>
            <p className={`mt-1 text-sm ${theme.text.tertiary}`}>Complete your daily targets to stay on track</p>

            {/* Progress section */}
            <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-3">
              <GoalProgress title="Coding Problems" completed={5} total={10} />
              <GoalProgress title="Quiz Attempts" completed={1} total={2} />
              <GoalProgress title="Company Research" completed={2} total={5} />
            </div>

            {/* Motivational quote */}
            <div className={`mt-4 p-3 ${theme.bg.tertiary} rounded-lg ${theme.border.primary} border`}>
              <p className={`text-sm ${theme.text.secondary} italic`}>"The expert in anything was once a beginner."</p>
              <p className={`text-xs ${theme.text.muted} mt-1`}>- Keep practicing daily!</p>
            </div>
          </section>

          {/* Application Status */}
          <ApplicationStatus />

          {/* Two columns: Activity + Charts */}
          <section className="grid gap-6 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-4">
              <Card title="Recent Activity" action={<button className={`text-xs ${theme.text.accent} hover:text-indigo-500`}>View All</button>}>
                <ActivityItem icon={<Code2 size={16} />} title="Solved 3 Medium DSA questions" meta="Today • 14:20" badge="+10 XP" />
                <ActivityItem icon={<FileText size={16} />} title="Quiz: DBMS Basics submitted" meta="Yesterday • Score 82%" badge="+15 XP" />
                <ActivityItem icon={<Building2 size={16} />} title="Applied for Microsoft SWE role" meta="22 Aug • 18:05" badge="Applied" />
                <ActivityItem icon={<Mail size={16} />} title="Received response from Amazon" meta="21 Aug • 09:30" badge="Response" />
              </Card>

              <Card title="Company-wise Questions">
                <div className="grid gap-3 grid-cols-2">
                  {[
                    { name: "TCS", count: 64, progress: 75 },
                    { name: "Infosys", count: 52, progress: 60 },
                    { name: "Wipro", count: 33, progress: 40 },
                    { name: "Accenture", count: 41, progress: 50 },
                    { name: "Microsoft", count: 78, progress: 30 },
                    { name: "Amazon", count: 65, progress: 45 },
                  ].map((c) => (
                    <div key={c.name} className={`flex flex-col gap-2 rounded-xl ${theme.border.primary} ${theme.bg.card} p-3 group ${theme.bg.cardHover} transition-colors border`}>
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${theme.text.primary}`}>{c.name}</span>
                        <span className={`text-sm ${theme.text.tertiary}`}>{c.count} Qs</span>
                      </div>
                      <div className={`h-1.5 ${theme.bg.secondary} rounded-full`}>
                        <div 
                          className="h-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full" 
                          style={{ width: `${c.progress}%` }}
                        ></div>
                      </div>
                      <div className={`flex justify-between text-xs ${theme.text.muted}`}>
                        <span>Progress</span>
                        <span>{c.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Company Recommendations */}
              <Card title="Recommended for You" action={<button className={`text-xs ${theme.text.accent} hover:text-indigo-500`}>View All</button>}>
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.border.primary} ${theme.bg.card} ${theme.bg.cardHover} transition-colors group cursor-pointer border`}>
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Building2 size={16} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm group-hover:text-indigo-400 transition-colors ${theme.text.primary}`}>Microsoft Interview Prep</p>
                      <p className={`text-xs ${theme.text.tertiary}`}>Focus on system design & coding</p>
                    </div>
                    <ChevronRight size={14} className={`${theme.text.muted} group-hover:text-indigo-400 transition-colors`} />
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.border.primary} ${theme.bg.card} ${theme.bg.cardHover} transition-colors group cursor-pointer border`}>
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Code2 size={16} className="text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm group-hover:text-indigo-400 transition-colors ${theme.text.primary}`}>Amazon Coding Practice</p>
                      <p className={`text-xs ${theme.text.tertiary}`}>Dynamic Programming & Graphs</p>
                    </div>
                    <ChevronRight size={14} className={`${theme.text.muted} group-hover:text-indigo-400 transition-colors`} />
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${theme.border.primary} ${theme.bg.card} ${theme.bg.cardHover} transition-colors group cursor-pointer border`}>
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FileText size={16} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm group-hover:text-indigo-400 transition-colors ${theme.text.primary}`}>Google Behavioral Round</p>
                      <p className={`text-xs ${theme.text.tertiary}`}>Leadership & Problem Solving</p>
                    </div>
                    <ChevronRight size={14} className={`${theme.text.muted} group-hover:text-indigo-400 transition-colors`} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Drives */}
              <Card title="Upcoming Drives" action={<button className={`text-xs ${theme.text.accent} hover:text-indigo-500`}>View All</button>}>
                <div className="space-y-3">
                  <DriveItem company="Microsoft" date="Aug 28" time="10:00 AM" type="Coding Test" status="upcoming" />
                  <DriveItem company="Amazon" date="Sep 2" time="11:30 AM" type="Virtual Interview" status="upcoming" />
                  <DriveItem company="Google" date="Sep 5" time="09:00 AM" type="Technical Round" status="preparing" />
                </div>
                <button className={`mt-4 w-full rounded-lg ${theme.border.primary} ${theme.button.secondary} px-3 py-2 text-sm flex items-center justify-center gap-2 transition-colors border`}>
                  <Calendar size={16} /> View Full Schedule
                </button>
              </Card>

              {/* Skill Progress */}
              <Card title="Skill Progress">
                <div className="space-y-4">
                  <SkillProgressItem skill="Data Structures" progress={75} level="Advanced" />
                  <SkillProgressItem skill="Algorithms" progress={65} level="Intermediate" />
                  <SkillProgressItem skill="DBMS" progress={80} level="Advanced" />
                  <SkillProgressItem skill="Communication" progress={60} level="Intermediate" />
                </div>
              </Card>
            </div>
          </section>

          {/* Interview Prep Resources */}
          <InterviewResources />

          {/* Quick actions */}
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ActionCard icon={<Code2 size={18} />} title="Practice Coding" desc="Filter by difficulty & topic" btn="Browse" />
            <ActionCard
              icon={<FileText size={18} />}
              title="Take a Quiz"
              desc="Timed with instant scorecard"
              btn="Start"
              onClick={() => navigate("/quizzes")}
            />
            <ActionCard icon={<Building2 size={18} />} title="Explore Companies" desc="Interview experiences & Qs" btn="Explore" />
          </section>

          {/* Performance Overview */}
          <PerformanceOverview />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      <AIChatWidget />
    </div>
  );
};

export default PlacementPortalDashboard;
