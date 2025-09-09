import React, { useState, useEffect } from "react";
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
  const [isLogin, setIsLogin] = useState(true);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [animateTestimonials, setAnimateTestimonials] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations on component mount
    const timer1 = setTimeout(() => setAnimateFeatures(true), 500);
    const timer2 = setTimeout(() => setAnimateStats(true), 1000);
    const timer3 = setTimeout(() => setAnimateTestimonials(true), 1500);
    
    // Auto rotate features
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    
    // Scroll event listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(featureInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10"
            style={{
              width: Math.random() * 120 + 30,
              height: Math.random() * 120 + 30,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 7}s`
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
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 grid place-content-center font-bold animate-pulse">
              PP
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Placement Portal
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/features')} className="hover:text-indigo-300 transition-colors hover:scale-105 transform duration-200 bg-transparent border-none outline-none cursor-pointer">Features</button>
            <a href="#testimonials" className="hover:text-indigo-300 transition-colors hover:scale-105 transform duration-200">Testimonials</a>
            <a href="#resources" className="hover:text-indigo-300 transition-colors hover:scale-105 transform duration-200">Resources</a>
            <a href="#contact" className="hover:text-indigo-300 transition-colors hover:scale-105 transform duration-200">Contact</a>
          </nav>
          
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium hover:scale-105 transform duration-200 shadow-lg shadow-indigo-500/20"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors font-medium hover:scale-105 transform duration-200"
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
              <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-slate-700/30">
                <Rocket className="h-5 w-5 text-indigo-400 animate-bounce" />
                <span className="text-sm">Trusted by 50,000+ students</span>
                <ChevronDown className="h-4 w-4 text-slate-400 animate-bounce" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Launch Your 
                <span className="bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent"> Tech Career</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl">
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
                    className="text-center lg:text-left bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300 hover:scale-105 transform"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-700/50 rounded-lg">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-slate-400 text-sm">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side - Animated Feature Showcase */}
            <div className="lg:w-1/3 w-full max-w-md mx-auto">
              <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-slate-700/50 hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-500">
                <div className="flex justify-center mb-6">
                  {features[activeFeature].icon}
                </div>
                
                <h3 className="text-xl font-semibold text-center mb-3">
                  {features[activeFeature].title}
                </h3>
                
                <p className="text-slate-400 text-center mb-4">
                  {features[activeFeature].description}
                </p>
                
                <p className="text-slate-300 text-sm text-center">
                  {features[activeFeature].details}
                </p>
                
                <div className="flex justify-center mt-6">
                  <div className="flex gap-2">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === activeFeature ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-600'}`}
                        aria-label={`Feature ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-slate-300 p-3 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Access to all practice materials</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 p-3 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Personalized progress tracking</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 p-3 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                  <span>Company-specific preparation</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="relative py-16 lg:py-24 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need to <span className="text-indigo-400">Get Placed</span></h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">Our comprehensive platform provides all the tools you need to ace your placement process</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-500 hover:scale-105 transform ${animateFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
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
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">Hear from students who have successfully secured their dream jobs using our platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300 hover:scale-105 transform ${animateTestimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
                  <p className="text-slate-400">"{testimonial.content}"</p>
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
        <section className="relative py-16 lg:py-24 bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to <span className="text-indigo-400">Transform Your Career</span>?</h2>
            <p className="text-xl text-slate-400 mb-8">Join thousands of students who have secured their dream jobs through our platform</p>
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
      </main>

      {/* Footer */}
      <footer id="contact" className="relative bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 grid place-content-center font-bold">
                  PP
                </div>
                <span className="text-xl font-bold">Placement Portal</span>
              </div>
              <p className="text-slate-400 mb-6">
                Your all-in-one platform for placement preparation. Practice coding, attempt mock tests, and get placed in your dream company.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors hover:scale-110 transform duration-200">
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
                    <a href={resource.href} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 hover:translate-x-1 transform duration-200">
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
                    <a href={item.href} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 hover:translate-x-1 transform duration-200">
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
                <li className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors">
                  <Mail size={18} />
                  <span>support@placementportal.com</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors">
                  <Phone size={18} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-colors">
                  <MapPin size={18} />
                  <span>University Campus, Computer Science Department</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm flex items-center gap-1">
              © {new Date().getFullYear()} Placement Portal. Made with <Heart size={14} className="text-rose-500 inline" /> for students
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 z-50 hover:scale-110 transform"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        
        .bg-grid-white\/\[0\.05\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
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