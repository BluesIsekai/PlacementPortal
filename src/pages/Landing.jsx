import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { 
  GraduationCap, Code2, Building2, BookOpen, 
  Award, Users, ChevronRight, ArrowRight, Star, 
  TrendingUp, Mail, Phone, MapPin, Facebook, 
  Twitter, Instagram, Linkedin, Github, Heart, 
  ArrowUp, CheckCircle, X, Rocket, 
  Target, Calendar, Clock, ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const theme = useTheme(); // Still get theme for any shared utilities
  
  // Force dark theme for landing page only
  const darkTheme = {
    bg: {
      primary: 'bg-slate-950',
      secondary: 'bg-slate-900',
      tertiary: 'bg-slate-800',
      card: 'bg-slate-900/60',
      hover: 'hover:bg-slate-800',
      cardHover: 'hover:bg-slate-800/40',
      navbar: 'bg-slate-950/80',
      overlay: 'bg-black/70',
      accent: 'bg-indigo-600',
      buttonPrimary: 'bg-indigo-600',
      buttonPrimaryHover: 'hover:bg-indigo-700',
      buttonSecondary: 'bg-slate-800',
      buttonSecondaryHover: 'hover:bg-slate-700',
    },
    text: {
      primary: 'text-slate-100',
      secondary: 'text-slate-300',
      tertiary: 'text-slate-400',
      muted: 'text-slate-500',
      accent: 'text-indigo-400',
      gradient: 'text-indigo-400',
    },
    border: {
      primary: 'border-slate-800',
      secondary: 'border-slate-700',
      hover: 'hover:border-indigo-500/30',
    },
    shadow: {
      card: 'shadow-xl',
      hover: 'shadow-2xl',
    },
  };
  
  const [isLogin, setIsLogin] = useState(true);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [animateTestimonials, setAnimateTestimonials] = useState(false);
  const [animateHowItWorks, setAnimateHowItWorks] = useState(false);
  const [animateCompanies, setAnimateCompanies] = useState(false);
  const [animateFAQ, setAnimateFAQ] = useState(false);
  const [animateNewsletter, setAnimateNewsletter] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations on component mount
    const timer1 = setTimeout(() => setAnimateFeatures(true), 500);
    const timer2 = setTimeout(() => setAnimateStats(true), 1000);
    const timer3 = setTimeout(() => setAnimateTestimonials(true), 1500);
    const timer4 = setTimeout(() => setAnimateHowItWorks(true), 2000);
    const timer5 = setTimeout(() => setAnimateCompanies(true), 2500);
    const timer6 = setTimeout(() => setAnimateFAQ(true), 3000);
    const timer7 = setTimeout(() => setAnimateNewsletter(true), 3500);
    
    // Auto rotate features
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    
    // Scroll event listener with more animation triggers
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // Trigger animations based on scroll position
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollY > windowHeight * 0.3 && !animateHowItWorks) {
        setAnimateHowItWorks(true);
      }
      if (scrollY > windowHeight * 0.6 && !animateCompanies) {
        setAnimateCompanies(true);
      }
      if (scrollY > windowHeight * 1.0 && !animateFAQ) {
        setAnimateFAQ(true);
      }
      if (scrollY > windowHeight * 1.3 && !animateNewsletter) {
        setAnimateNewsletter(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearInterval(featureInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animateHowItWorks, animateCompanies, animateFAQ, animateNewsletter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { value: "5000+", label: "Students Placed", icon: <Users className="text-blue-400" /> },
    { value: "200+", label: "Companies", icon: <Building2 className="text-green-400" /> },
    { value: "10,000+", label: "Practice Questions", icon: <BookOpen className="text-purple-400" /> },
    { value: "98%", label: "Satisfaction Rate", icon: <Star className="text-amber-400" /> }
  ];

  const features = [
    {
      icon: <Code2 size={48} className="text-blue-500" />,
      title: "Coding Practice",
      description: "Sharpen your coding skills with our curated problem sets",
      details: "Access 1000+ coding problems with varying difficulty levels, from beginner to advanced. Get instant feedback and detailed solutions."
    },
    {
      icon: <BookOpen size={48} className="text-green-500" />,
      title: "Aptitude Tests",
      description: "Practice quantitative, verbal and reasoning questions",
      details: "Comprehensive aptitude preparation with timed tests, performance analytics, and personalized recommendations for improvement."
    },
    {
      icon: <Building2 size={48} className="text-purple-500" />,
      title: "Company Prep",
      description: "Company-specific interview questions and patterns",
      details: "Get insider knowledge with company-specific question banks, interview patterns, and preparation strategies for top tech companies."
    },
    {
      icon: <Users size={48} className="text-amber-500" />,
      title: "Mock Interviews",
      description: "Practice with peers and get detailed feedback",
      details: "Simulate real interview scenarios with AI-powered mock interviews or connect with peers for practice sessions with detailed feedback."
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Placed at Microsoft",
      image: "RS",
      content: "This platform helped me crack my dream job. The company-specific preparation material was incredibly accurate!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Placed at Google",
      image: "PP",
      content: "The mock interviews gave me the confidence I needed. The detailed feedback helped me improve significantly.",
      rating: 5
    },
    {
      name: "Amit Kumar",
      role: "Placed at Amazon",
      image: "AK",
      content: "The coding practice platform is exceptional. The problems are well-curated and similar to actual interview questions.",
      rating: 5
    }
  ];

  const resources = [
    { name: "Blog", href: "#", icon: <BookOpen size={16} /> },
    { name: "Interview Guides", href: "#", icon: <FileTextIcon size={16} /> },
    { name: "Resume Templates", href: "#", icon: <FileTextIcon size={16} /> },
    { name: "Webinars", href: "#", icon: <Calendar size={16} /> },
    { name: "Placement Statistics", href: "#", icon: <TrendingUp size={16} /> }
  ];

  const company = [
    { name: "About Us", href: "#", icon: <Users size={16} /> },
    { name: "Careers", href: "#", icon: <BriefcaseIcon size={16} /> },
    { name: "Contact", href: "#", icon: <Mail size={16} /> },
    { name: "Privacy Policy", href: "#", icon: <ShieldIcon size={16} /> },
    { name: "Terms of Service", href: "#", icon: <FileTextIcon size={16} /> }
  ];

  return (
    <div className={`min-h-screen ${darkTheme.bg.primary} ${darkTheme.text.primary} overflow-hidden dark`}>
      {/* Enhanced Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 animate-pulse"
            style={{
              width: Math.random() * 140 + 40,
              height: Math.random() * 140 + 40,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 15}s infinite ease-in-out, pulse ${Math.random() * 3 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
        
        {/* Floating code symbols */}
        {['{ }', '</>', '( )', '[ ]', '&&', '||', '++', '--'].map((symbol, i) => (
          <div
            key={`symbol-${i}`}
            className="absolute text-indigo-500/20 font-mono text-2xl animate-bounce"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`
            }}
          >
            {symbol}
          </div>
        ))}
        
        {/* Interactive particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        </div>
        
        {/* Pulsing orb */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ width: '300px', height: '300px' }} />
            <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000" style={{ width: '300px', height: '300px' }} />
          </div>
        </div>
      </div>

      {/* Header */}
  <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`relative h-12 w-12 rounded-xl ${darkTheme.bg.accent} grid place-content-center font-bold`}>
              <div className="relative flex flex-col items-center justify-center">
                <GraduationCap className="text-yellow-300" size={20} />
                <div className={`font-black text-lg tracking-wide ${darkTheme.text.primary}`} style={{ textShadow: '0 0 8px rgba(255,255,255,0.5)', fontFamily: 'monospace', lineHeight: '0.4', marginTop: '-4px' }}>
                  P<span className="text-yellow-300">P</span>
                </div>
              </div>
            </div>
            <span className={`text-xl font-bold ${darkTheme.text.gradient}`}> 
              Placement Portal
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/features')} className={`hover:${darkTheme.text.accent} transition-colors hover:scale-105 transform duration-200 bg-transparent border-none outline-none cursor-pointer`}>Features</button>
            <a href="#testimonials" className={`hover:${darkTheme.text.accent} transition-colors hover:scale-105 transform duration-200`}>Testimonials</a>
            <a href="#resources" className={`hover:${darkTheme.text.accent} transition-colors hover:scale-105 transform duration-200`}>Resources</a>
            <a href="#contact" className={`hover:${darkTheme.text.accent} transition-colors hover:scale-105 transform duration-200`}>Contact</a>
          </nav>
          
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/login')}
              className={`px-4 py-2 rounded-lg ${darkTheme.bg.buttonPrimary} ${darkTheme.bg.buttonPrimaryHover} transition-colors font-medium hover:scale-105 transform duration-200 shadow-lg`}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className={`px-4 py-2 rounded-lg ${darkTheme.bg.buttonSecondary} border ${darkTheme.border.primary} ${darkTheme.bg.buttonSecondaryHover} transition-colors font-medium hover:scale-105 transform duration-200`}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left side - Content */}
            <div className="lg:w-2/3 text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 ${darkTheme.bg.secondary} backdrop-blur-sm rounded-full px-4 py-2 mb-6 border ${darkTheme.border.primary}`}>
                <Rocket className="h-5 w-5 text-indigo-400 animate-bounce" />
                <span className={`text-sm ${darkTheme.text.primary}`}>Trusted by 50,000+ students</span>
                <ChevronDown className={`h-4 w-4 ${darkTheme.text.muted} animate-bounce`} />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Launch Your 
                <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent"> Tech Career</span>
              </h1>
              
              <p className={`text-xl ${darkTheme.text.secondary} mb-8 max-w-2xl`}>
                The all-in-one platform to ace your placement preparations. Practice coding, attempt mock tests, and get placed in your dream company.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 group hover:scale-105 transform duration-200 shadow-lg shadow-indigo-500/30"
                >
                  Get Started Free 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                {/* Removed Watch Demo button */}
              </div>
              
              {/* Stats */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 ${animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}>
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`text-center lg:text-left ${darkTheme.bg.secondary} backdrop-blur-sm p-4 rounded-xl border ${darkTheme.border.primary} hover:border-indigo-500/30 transition-all duration-300 hover:scale-105 transform`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${darkTheme.bg.tertiary} rounded-lg`}>
                        {stat.icon}
                      </div>
                      <div>
                        <div className={`text-2xl font-bold mb-1 ${darkTheme.text.primary}`}>{stat.value}</div>
                        <div className={`${darkTheme.text.muted} text-sm`}>{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side - Animated Feature Showcase */}
            <div className="lg:w-1/3 w-full max-w-md mx-auto">
              <div className={`${darkTheme.bg.card} backdrop-blur-md rounded-2xl p-6 ${darkTheme.shadow.card} border ${darkTheme.border.primary} hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-500`}>
                <div className="flex justify-center mb-6">
                  {features[activeFeature].icon}
                </div>
                
                <h3 className={`text-xl font-semibold text-center mb-3 ${darkTheme.text.primary}`}>
                  {features[activeFeature].title}
                </h3>
                
                <p className={`${darkTheme.text.muted} text-center mb-4`}>
                  {features[activeFeature].description}
                </p>
                
                <p className={`${darkTheme.text.secondary} text-sm text-center`}>
                  {features[activeFeature].details}
                </p>
                
                <div className="flex justify-center mt-6">
                  <div className="flex gap-2">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === activeFeature ? 'w-6 bg-indigo-500' : `w-2 ${darkTheme.bg.muted}`}`}
                        aria-label={`Feature ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="mt-8 space-y-4">
                <div className={`flex items-center gap-3 ${darkTheme.text.primary} p-3 ${darkTheme.bg.secondary} backdrop-blur-sm rounded-lg border ${darkTheme.border.primary} hover:border-indigo-500/30 transition-all duration-300`}>
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Access to all practice materials</span>
                </div>
                <div className={`flex items-center gap-3 ${darkTheme.text.primary} p-3 ${darkTheme.bg.secondary} backdrop-blur-sm rounded-lg border ${darkTheme.border.primary} hover:border-indigo-500/30 transition-all duration-300`}>
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Personalized progress tracking</span>
                </div>
                <div className={`flex items-center gap-3 ${darkTheme.text.primary} p-3 ${darkTheme.bg.secondary} backdrop-blur-sm rounded-lg border ${darkTheme.border.primary} hover:border-indigo-500/30 transition-all duration-300`}>
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Company-specific preparation</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className={`relative py-16 lg:py-24 ${darkTheme.bg.secondary}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need to <span className="text-indigo-400">Get Placed</span></h2>
              <p className={`text-xl ${darkTheme.text.secondary} max-w-3xl mx-auto`}>Our comprehensive platform provides all the tools you need to ace your placement process</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`${darkTheme.bg.card} backdrop-blur-sm rounded-xl p-6 border ${darkTheme.border.primary} hover:border-indigo-500/30 transition-all duration-500 hover:scale-105 transform ${animateFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className={theme.text.secondary}>{feature.description}</p>
                  <button className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1">
                    Learn more <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our <span className="text-indigo-400">Students Say</span></h2>
              <p className={`text-xl ${darkTheme.text.secondary} max-w-3xl mx-auto`}>Hear from students who have successfully secured their dream jobs using our platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`${darkTheme.bg.card} backdrop-blur-sm rounded-xl p-6 border ${darkTheme.border.primary} hover:border-indigo-500/30 transition-all duration-300 hover:scale-105 transform ${animateTestimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                      {testimonial.image}
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-indigo-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={theme.text.secondary}>"{testimonial.content}"</p>
                  <div className="flex mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`relative py-16 lg:py-24 ${darkTheme.bg.secondary}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to <span className="text-indigo-400">Transform Your Career</span>?</h2>
            <p className={`text-xl ${darkTheme.text.secondary} mb-8`}>Join thousands of students who have secured their dream jobs through our platform</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 hover:scale-105 transform duration-200 shadow-lg shadow-indigo-500/30"
              >
                Get Started Now
                <ArrowRight size={20} />
              </button>
              {/* Removed Schedule a Demo button */}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It <span className="text-indigo-400">Works</span></h2>
              <p className={`text-xl ${darkTheme.text.secondary} max-w-3xl mx-auto`}>Simple steps to ace your placement preparation and land your dream job</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className={`text-center group ${animateHowItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`} style={{ transitionDelay: '0ms' }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-indigo-500/50">
                    <span className="text-2xl font-bold text-white group-hover:animate-pulse">1</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 hidden lg:block transform -translate-x-1/2 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-400 transition-colors duration-300">Sign Up</h3>
                <p className={`${darkTheme.text.secondary} group-hover:${darkTheme.text.primary} transition-colors duration-300`}>Create your account and set up your personalized learning profile</p>
              </div>
              
              <div className={`text-center group ${animateHowItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`} style={{ transitionDelay: '200ms' }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-green-500/50">
                    <span className="text-2xl font-bold text-white group-hover:animate-pulse">2</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-500 to-teal-600 hidden lg:block transform -translate-x-1/2 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition-colors duration-300">Practice</h3>
                <p className={`${darkTheme.text.secondary} group-hover:${darkTheme.text.primary} transition-colors duration-300`}>Start solving coding problems, take quizzes, and practice mock interviews</p>
              </div>
              
              <div className={`text-center group ${animateHowItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`} style={{ transitionDelay: '400ms' }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/50">
                    <span className="text-2xl font-bold text-white group-hover:animate-pulse">3</span>
                  </div>
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-600 hidden lg:block transform -translate-x-1/2 animate-pulse"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors duration-300">Track Progress</h3>
                <p className={`${darkTheme.text.secondary} group-hover:${darkTheme.text.primary} transition-colors duration-300`}>Monitor your improvement with detailed analytics and personalized feedback</p>
              </div>
              
              <div className={`text-center group ${animateHowItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`} style={{ transitionDelay: '600ms' }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-amber-500/50">
                    <span className="text-2xl font-bold text-white group-hover:animate-pulse">4</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-amber-400 transition-colors duration-300">Get Placed</h3>
                <p className={`${darkTheme.text.secondary} group-hover:${darkTheme.text.primary} transition-colors duration-300`}>Apply confidently to your dream companies and ace the interviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className={`relative py-16 lg:py-24 ${darkTheme.bg.secondary}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by Students from <span className="text-indigo-400">Top Universities</span></h2>
              <p className={`text-xl ${darkTheme.text.secondary} max-w-3xl mx-auto`}>Students from prestigious institutions trust our platform for their placement preparation</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
              {["IIT Delhi", "IIT Mumbai", "NIT Trichy", "BITS Pilani", "VIT Chennai", "IIIT Hyderabad", "IIIT Allahabad"].map((college, index) => (
                <div 
                  key={index} 
                  className={`${darkTheme.bg.card} backdrop-blur-sm rounded-xl p-4 text-center hover:${darkTheme.bg.hover || theme.bg.secondary} transition-all duration-500 hover:scale-110 hover:rotate-2 transform border ${darkTheme.border.primary} hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/25 ${animateCompanies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCard(`college-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${hoveredCard === `college-${index}` ? 'animate-bounce' : ''}`}>
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{college}</h3>
                </div>
              ))}
            </div>
            
            <div className="mt-16">
              <h3 className={`text-2xl font-bold text-center mb-8 ${animateCompanies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}>Our Alumni Work At</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
                {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Tesla", "SpaceX"].map((company, index) => (
                  <div 
                    key={index} 
                    className={`${darkTheme.bg.card} backdrop-blur-sm rounded-lg p-4 text-center hover:${darkTheme.bg.hover || theme.bg.secondary} transition-all duration-500 hover:scale-110 hover:-rotate-2 transform border ${darkTheme.border.primary} hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/25 cursor-pointer ${animateCompanies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${(index + 6) * 50}ms` }}
                    onMouseEnter={() => setHoveredCard(`company-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-md flex items-center justify-center mx-auto mb-2 transition-all duration-300 ${hoveredCard === `company-${index}` ? 'animate-spin' : ''}`}>
                      <Building2 size={16} className="text-white" />
                    </div>
                    <span className="text-xs font-medium">{company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked <span className="text-indigo-400">Questions</span></h2>
              <p className={`text-xl ${darkTheme.text.secondary}`}>Everything you need to know about our placement preparation platform</p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "Is the platform suitable for beginners?",
                  answer: "Absolutely! Our platform caters to all skill levels. We have beginner-friendly coding problems, basic aptitude questions, and step-by-step learning paths to help you start from scratch."
                },
                {
                  question: "How often is the content updated?",
                  answer: "We update our content regularly with new coding problems, company-specific questions, and interview experiences. Our team adds fresh content weekly to keep pace with industry trends."
                },
                {
                  question: "Can I track my progress over time?",
                  answer: "Yes! Our advanced analytics dashboard shows your progress across different categories, strengths and weaknesses, performance trends, and personalized recommendations for improvement."
                },
                {
                  question: "Do you provide company-specific preparation?",
                  answer: "We offer detailed preparation materials for 200+ companies including coding patterns, previous interview questions, company culture insights, and specific tips from successful candidates."
                },
                {
                  question: "What makes your mock interviews special?",
                  answer: "Our mock interviews are conducted by industry professionals and senior engineers from top tech companies. You'll receive detailed feedback on both technical and soft skills."
                },
                {
                  question: "Is there a mobile app available?",
                  answer: "Currently, we offer a responsive web platform that works seamlessly on all devices. A dedicated mobile app is in development and will be available soon."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className={`${darkTheme.bg.card} backdrop-blur-sm rounded-xl p-6 border ${darkTheme.border.primary} hover:border-indigo-500/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer ${animateFAQ ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCard(`faq-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-3 hover:text-indigo-400 transition-colors duration-300">
                    <div className={`w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredCard === `faq-${index}` ? 'animate-pulse bg-indigo-500 scale-110' : ''}`}>
                      <span className="text-xs font-bold text-white">Q</span>
                    </div>
                    {faq.question}
                  </h3>
                  <p className={`${darkTheme.text.secondary} leading-relaxed ml-9 hover:${darkTheme.text.primary} transition-colors duration-300`}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={`relative py-16 lg:py-24 ${darkTheme.bg.secondary}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className={`${darkTheme.bg.card} backdrop-blur-md rounded-2xl p-8 border ${darkTheme.border.primary} hover:border-indigo-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 ${animateNewsletter ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Mail size={48} className={`text-indigo-400 mx-auto mb-6 transition-all duration-300 ${animateNewsletter ? 'animate-bounce' : ''}`} />
              <h2 className="text-3xl font-bold mb-4">Stay Updated with <span className="text-indigo-400">Latest Tips</span></h2>
              <p className={`text-xl ${darkTheme.text.secondary} mb-8`}>Get weekly placement tips, coding challenges, and success stories delivered to your inbox</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`flex-1 px-4 py-3 ${darkTheme.bg.primary} border ${darkTheme.border.primary} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${darkTheme.text.primary} placeholder-${darkTheme.text.muted} transition-all duration-300 hover:border-indigo-500/50`}
                />
                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-all duration-300 hover:scale-110 hover:rotate-1 transform flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/50">
                  Subscribe
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              
              <p className={`text-sm ${darkTheme.text.muted} mt-4 hover:${darkTheme.text.secondary} transition-colors duration-300`}>
                No spam, unsubscribe at any time. Join 10,000+ students already subscribed.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className={`relative ${darkTheme.bg.primary} backdrop-blur-md border-t ${darkTheme.border.primary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 grid place-content-center font-bold">
                  <div className="relative flex flex-col items-center justify-center">
                    <GraduationCap className="text-yellow-300" size={20} />
                    <div className="text-white font-black text-lg tracking-wide" style={{ textShadow: '0 0 8px rgba(255,255,255,0.5)', fontFamily: 'monospace', lineHeight: '0.4', marginTop: '-4px' }}>
                      P<span className="text-yellow-300">P</span>
                    </div>
                  </div>
                </div>
                <span className="text-xl font-bold">Placement Portal</span>
              </div>
              <p className={`${darkTheme.text.secondary} mb-6`}>
                Your all-in-one platform for placement preparation. Practice coding, attempt mock tests, and get placed in your dream company.
              </p>
              <div className="flex gap-4">
                <a href="#" className={`${darkTheme.text.secondary} hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200`}>
                  <Facebook size={20} />
                </a>
                <a href="#" className={`${darkTheme.text.secondary} hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200`}>
                  <Twitter size={20} />
                </a>
                <a href="#" className={`${darkTheme.text.secondary} hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200`}>
                  <Instagram size={20} />
                </a>
                <a href="#" className={`${darkTheme.text.secondary} hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200`}>
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource.href} className={`${darkTheme.text.secondary} hover:text-indigo-400 transition-colors flex items-center gap-2 hover:translate-x-1 transform duration-200`}>
                      {resource.icon}
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className={`${darkTheme.text.secondary} hover:text-indigo-400 transition-colors flex items-center gap-2 hover:translate-x-1 transform duration-200`}>
                      {item.icon}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-3">
                <li className={`flex items-center gap-3 ${darkTheme.text.secondary} hover:text-indigo-400 transition-colors`}>
                  <Mail size={18} />
                  <span>support@placementportal.com</span>
                </li>
                <li className={`flex items-center gap-3 ${darkTheme.text.secondary} hover:text-indigo-400 transition-colors`}>
                  <Phone size={18} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className={`flex items-center gap-3 ${darkTheme.text.secondary} hover:text-indigo-400 transition-colors`}>
                  <MapPin size={18} />
                  <span>University Campus, Computer Science Department</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className={`border-t ${darkTheme.border.primary} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}>
            <p className={`${darkTheme.text.muted} text-sm flex items-center gap-1`}>
              © {new Date().getFullYear()} Placement Portal. Made with <Heart size={14} className="text-rose-500 inline" /> for students
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className={`${darkTheme.text.muted} hover:text-indigo-400 text-sm transition-colors`}>Privacy Policy</a>
              <a href="#" className={`${darkTheme.text.muted} hover:text-indigo-400 text-sm transition-colors`}>Terms of Service</a>
              <a href="#" className={`${darkTheme.text.muted} hover:text-indigo-400 text-sm transition-colors`}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 z-50 hover:scale-110 transform animate-bounce hover:animate-none hover:shadow-indigo-500/50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="transition-transform duration-300 hover:scale-110" />
        </button>
      )}

      {/* Enhanced Global Styles for Animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(15deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInDown {
          0% {
            opacity: 0;
            transform: translateY(-100px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(99, 102, 241, 0.2), 0 0 10px rgba(99, 102, 241, 0.2), 0 0 15px rgba(99, 102, 241, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.4), 0 0 20px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.4);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.8s ease-out;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .bg-grid-white\/\[0\.05\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        
        /* Parallax scroll effect */
        .parallax-element {
          transition: transform 0.1s ease-out;
        }
      `}</style>
    </div>
  );
};

// Custom Icons
const FileTextIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" x2="8" y1="13" y2="13"/>
    <line x1="16" x2="8" y1="17" y2="17"/>
    <line x1="10" x2="8" y1="9" y2="9"/>
  </svg>
);

const BriefcaseIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const ShieldIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const PlayIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

export default LandingPage;
