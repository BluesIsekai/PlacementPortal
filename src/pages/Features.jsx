import React, { useState, useEffect } from "react";
import { 
  Code2, BookOpen, Building2, Users, 
  BarChart3, Target, Calendar, FileText,
  MessageCircle, Award, Shield, Zap,
  ChevronRight, CheckCircle, Play, Star,
  ArrowRight, Clock, TrendingUp, Bookmark
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [animatedItems, setAnimatedItems] = useState([]);

  useEffect(() => {
    // Animate features on scroll
    const timer = setTimeout(() => {
      setAnimatedItems([...Array(features.length).keys()]);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: "all", label: "All Features" },
    { id: "technical", label: "Technical Prep" },
    { id: "aptitude", label: "Aptitude Tests" },
    { id: "company", label: "Company Specific" },
    { id: "interview", label: "Interview Prep" }
  ];

  const features = [
    {
      title: "Coding Practice Platform",
      description: "Comprehensive coding environment with 10,000+ problems across difficulty levels",
      icon: <Code2 size={32} className="text-blue-500" />,
      category: "technical",
      highlights: [
        "Online code editor with syntax highlighting",
        "Multiple language support (C++, Java, Python, JavaScript)",
        "Test cases and real-time feedback",
        "Performance analytics and time complexity analysis"
      ],
      stats: { problems: "10,000+", languages: "15+", accuracy: "95%" }
    },
    {
      title: "Aptitude Test Preparation",
      description: "Master quantitative aptitude, logical reasoning, and verbal ability",
      icon: <BookOpen size={32} className="text-green-500" />,
      category: "aptitude",
      highlights: [
        "Section-wise practice tests",
        "Shortcut techniques and formula sheets",
        "Timed practice sessions",
        "Detailed solutions and explanations"
      ],
      stats: { questions: "5,000+", categories: "8+", average: "78% improvement" }
    },
    {
      title: "Company-Specific Preparation",
      description: "Tailored content for specific company recruitment processes",
      icon: <Building2 size={32} className="text-purple-500" />,
      category: "company",
      highlights: [
        "Previous year question patterns",
        "Company-specific coding questions",
        "Interview experiences and tips",
        "Expected compensation and roles"
      ],
      stats: { companies: "200+", patterns: "15+", success: "42% higher" }
    },
    {
      title: "Mock Interview Platform",
      description: "Practice interviews with AI evaluation and peer feedback",
      icon: <Users size={32} className="text-amber-500" />,
      category: "interview",
      highlights: [
        "AI-powered interview simulations",
        "Peer-to-peer mock interviews",
        "Technical and HR interview practice",
        "Detailed feedback and improvement areas"
      ],
      stats: { sessions: "10,000+", ratings: "4.8/5", improvement: "68% faster" }
    },
    {
      title: "Progress Analytics Dashboard",
      description: "Track your preparation with detailed analytics and insights",
      icon: <BarChart3 size={32} className="text-red-500" />,
      category: "technical",
      highlights: [
        "Performance tracking across categories",
        "Strength and weakness analysis",
        "Compare with peers (anonymous)",
        "Personalized recommendations"
      ],
      stats: { metrics: "20+", accuracy: "98%", updates: "Real-time" }
    },
    {
      title: "Placement Readiness Score",
      description: "Get a comprehensive score that evaluates your placement readiness",
      icon: <Target size={32} className="text-teal-500" />,
      category: "all",
      highlights: [
        "Multi-dimensional evaluation",
        "Company-specific target scores",
        "Improvement roadmap",
        "Readiness comparison"
      ],
      stats: { dimensions: "8", accuracy: "92%", adoption: "89% users" }
    },
    {
      title: "Interview Schedule Manager",
      description: "Organize and track your interview schedule and preparation",
      icon: <Calendar size={32} className="text-pink-500" />,
      category: "interview",
      highlights: [
        "Interview calendar and reminders",
        "Company application tracker",
        "Preparation timeline",
        "Document management"
      ],
      stats: { reminders: "Customizable", tracking: "100%", organized: "94% users" }
    },
    {
      title: "Resume Builder",
      description: "Create ATS-friendly resumes with professional templates",
      icon: <FileText size={32} className="text-indigo-500" />,
      category: "interview",
      highlights: [
        "ATS-optimized templates",
        "Company-specific resume tips",
        "Export to PDF/Word",
        "Resume score evaluation"
      ],
      stats: { templates: "25+", ats: "100% optimized", downloads: "Unlimited" }
    },
    {
      title: "Discussion Forums",
      description: "Connect with peers, seniors, and industry experts",
      icon: <MessageCircle size={32} className="text-orange-500" />,
      category: "all",
      highlights: [
        "Q&A with experts",
        "Placement experiences",
        "Study groups",
        "Doubts clarification"
      ],
      stats: { users: "50,000+", experts: "200+", answers: "98% responded" }
    }
  ];

  const filteredFeatures = features.filter(feature => 
    activeCategory === "all" || feature.category === activeCategory
  );

  const stats = [
    { value: "50,000+", label: "Active Users", icon: <Users className="text-blue-400" /> },
    { value: "200+", label: "Companies", icon: <Building2 className="text-green-400" /> },
    { value: "15,000+", label: "Practice Questions", icon: <BookOpen className="text-purple-400" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <Star className="text-amber-400" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 grid place-content-center font-bold text-white">
                PP
              </div>
              <span className="text-xl font-bold">Placement Portal</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/features" className="text-indigo-600 dark:text-indigo-400 font-medium">Features</Link>
              <Link to="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
              <Link to="/testimonials" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Testimonials</Link>
              <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link>
            </nav>
            
            <div className="flex gap-3">
              <Link to="/login" className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Everything You Need to 
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Ace Your Placements</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10">
            Our comprehensive platform provides all the tools and resources you need to prepare for campus placements and land your dream job.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 group hover:bg-indigo-700"
            >
              Get Started Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-semibold text-lg transition-colors border border-slate-300 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 flex items-center justify-center gap-2">
              <Play size={20} />
              Watch Demo
            </button>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4 text-center">Filter Features</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700 transition-all duration-500 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500 ${
                animatedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {feature.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {Object.entries(feature.stats).map(([key, value], i) => (
                    <div key={i}>
                      <div className="font-bold text-lg">{value}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-center text-white mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have secured their dream jobs through our platform. Start your preparation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg transition-colors hover:bg-slate-100 flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-4 bg-indigo-700 text-white rounded-lg font-semibold text-lg transition-colors hover:bg-indigo-800 flex items-center justify-center gap-2">
              <Play size={20} />
              Watch Demo
            </button>
          </div>
        </section>

        {/* Testimonial Preview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Loved by Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                    U{item}
                  </div>
                  <div>
                    <div className="font-semibold">Student {item}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Placed at Top Company</div>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  "This platform helped me crack my dream job. The company-specific preparation material was incredibly accurate!"
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 grid place-content-center font-bold text-white">
                  PP
                </div>
                <span className="text-lg font-bold">Placement Portal</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Your all-in-one platform for placement preparation.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Coding Practice</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Aptitude Tests</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Mock Interviews</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Company Prep</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <GitHub size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Placement Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;