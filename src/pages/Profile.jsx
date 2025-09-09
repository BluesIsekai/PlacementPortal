import React, { useState, useEffect } from "react";
import { 
  User, Mail, Phone, MapPin, GraduationCap, Calendar, 
  Edit3, Save, X, Briefcase, Code, Award, BookOpen,
  Linkedin, Github, ExternalLink, Download, Upload,
  Star, ChevronDown, ChevronUp, Camera, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "John",
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    location: "Mumbai, India",
    college: "Engineering College",
    department: "Computer Science",
    graduationYear: "2024",
    cgpa: "9.2",
    resumeLink: "/resume.pdf",
    linkedin: "https://linkedin.com/in/user/exmple",
    github: "https://github.com/user/example",
    portfolio: "https://example.dev",
    bio: "Passionate computer science student with interest in web development and machine learning. Actively preparing for campus placements.",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Python", level: 75 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Data Structures", level: 88 }
    ],
    projects: [
      {
        name: "E-Commerce Website",
        description: "Full-stack e-commerce platform with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        link: "https://github.com/kunjpatel/ecommerce"
      },
      {
        name: "ML Price Prediction",
        description: "Machine learning model to predict housing prices",
        technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
        link: "https://github.com/kunjpatel/ml-housing"
      },
      {
        name: "Task Management App",
        description: "Mobile task management application with React Native",
        technologies: ["React Native", "Firebase", "Redux"],
        link: "https://github.com/kunjpatel/taskapp"
      }
    ],
    achievements: [
      "Won Smart India Hackathon 2022",
      "Google Cloud Certification",
      "1st place in College Coding Competition"
    ],
    stats: {
      problemsSolved: 248,
      quizzesTaken: 18,
      companiesApplied: 7,
      mockInterviews: 3
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" }
  ];

  const limitedSkills = showAllSkills ? profileData.skills : profileData.skills.slice(0, 6);
  const limitedProjects = showAllProjects ? profileData.projects : profileData.projects.slice(0, 2);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary} transition-colors duration-300 ease-in-out`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className={`p-2 rounded-lg ${theme.button.secondary} ${theme.border.primary} transition-colors border`}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className={`text-3xl font-bold ${theme.text.primary}`}>Profile</h1>
        </div>

        {/* Header */}
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Manage your profile and showcase your skills to recruiters
        </p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Profile Card */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 relative">
                  <User size={64} className="text-indigo-500" />
                  <div className="absolute bottom-0 right-0">
                    <button
                      className="bg-indigo-600 text-white p-2 rounded-full"
                      title="Edit Profile Picture"
                      onClick={() => setShowOptions((prev) => !prev)}
                    >
                      <Edit3 size={16} />
                    </button>
                    {showOptions && (
                      <div className="absolute top-full mt-2 flex flex-col gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg">
                        <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                          <Camera size={16} />
                          Camera
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                          <Upload size={16} />
                          Upload
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{profileData.department} Student</p>
                <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">{profileData.bio}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-slate-500" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-slate-500" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-slate-500" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
                <button
                  onClick={() => alert('Profile link copied to clipboard!')}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <ExternalLink size={18} />
                  Share Profile
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold mb-3">Social Links</h3>
                <div className="space-y-3">
                  <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <Linkedin size={18} />
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={14} />
                  </a>
                  <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <Github size={18} />
                    <span>GitHub Profile</span>
                    <ExternalLink size={14} />
                  </a>
                  <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <Briefcase size={18} />
                    <span>Portfolio Website</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <a href={profileData.resumeLink} download className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  <Download size={18} />
                  Download Resume
                </a>
                {isEditing && (
                  <button className="flex items-center justify-center gap-2 w-full py-2.5 mt-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors">
                    <Upload size={18} />
                    Update Resume
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
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

              {/* Tab Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Placement Preparation Stats</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Code size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <p className="text-2xl font-bold">{profileData.stats.problemsSolved}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Problems Solved</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <p className="text-2xl font-bold">{profileData.stats.quizzesTaken}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Quizzes Taken</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Briefcase size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <p className="text-2xl font-bold">{profileData.stats.companiesApplied}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Companies Applied</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <User size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <p className="text-2xl font-bold">{profileData.stats.mockInterviews}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Mock Interviews</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Top Skills</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {profileData.skills.slice(0, 4).map((skill, index) => (
                          <div key={index} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-sm text-slate-600 dark:text-slate-400">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                      <div className="space-y-4">
                        {profileData.projects.slice(0, 2).map((project, index) => (
                          <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                            <h3 className="font-semibold">{project.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {project.technologies.map((tech, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm mt-3">
                              View Project <ExternalLink size={14} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Education Tab */}
                {activeTab === "education" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Education Details</h2>
                    
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                          <GraduationCap size={24} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          {isEditing ? (
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">College/University</label>
                                <input
                                  type="text"
                                  name="college"
                                  value={profileData.college}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Department</label>
                                <input
                                  type="text"
                                  name="department"
                                  value={profileData.department}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Graduation Year</label>
                                  <input
                                    type="text"
                                    name="graduationYear"
                                    value={profileData.graduationYear}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">CGPA</label>
                                  <input
                                    type="text"
                                    name="cgpa"
                                    value={profileData.cgpa}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <h3 className="font-semibold text-lg">{profileData.college}</h3>
                              <p className="text-slate-600 dark:text-slate-400 mt-1">{profileData.department}</p>
                              <div className="flex items-center gap-4 mt-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Calendar size={16} className="text-slate-500" />
                                  <span>Graduation: {profileData.graduationYear}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award size={16} className="text-slate-500" />
                                  <span>CGPA: {profileData.cgpa}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Relevant Courses</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Data Structures", "Algorithms", "Database Systems", "Operating Systems", "Computer Networks", "Software Engineering"].map((course, index) => (
                          <span key={index} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-sm">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Skills & Proficiency</h2>
                      {isEditing && (
                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                          Add Skill
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {limitedSkills.map((skill, index) => (
                        <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{skill.name}</span>
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <button className="text-slate-500 hover:text-indigo-600">
                                  <Edit3 size={16} />
                                </button>
                                <button className="text-slate-500 hover:text-rose-600">
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <span className="text-sm text-slate-600 dark:text-slate-400">{skill.level}%</span>
                            )}
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {profileData.skills.length > 6 && (
                      <button 
                        onClick={() => setShowAllSkills(!showAllSkills)}
                        className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium"
                      >
                        {showAllSkills ? (
                          <>
                            <ChevronUp size={16} /> Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} /> Show All Skills
                          </>
                        )}
                      </button>
                    )}

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="font-semibold mb-4">Skill Categories</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: "Programming Languages", count: 5 },
                          { name: "Web Technologies", count: 4 },
                          { name: "Databases", count: 3 },
                          { name: "Tools & Frameworks", count: 6 }
                        ].map((category, index) => (
                          <div key={index} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{category.count} skills</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Projects</h2>
                      {isEditing && (
                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                          Add Project
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {limitedProjects.map((project, index) => (
                        <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{project.name}</h3>
                            {isEditing && (
                              <div className="flex items-center gap-2">
                                <button className="text-slate-500 hover:text-indigo-600">
                                  <Edit3 size={16} />
                                </button>
                                <button className="text-slate-500 hover:text-rose-600">
                                  <X size={16} />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mt-2">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-sm rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 mt-4">
                            View Project <ExternalLink size={16} />
                          </a>
                        </div>
                      ))}
                    </div>

                    {profileData.projects.length > 2 && (
                      <button 
                        onClick={() => setShowAllProjects(!showAllProjects)}
                        className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium"
                      >
                        {showAllProjects ? (
                          <>
                            <ChevronUp size={16} /> Show Less Projects
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} /> Show All Projects
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Achievements & Certifications</h2>
                      {isEditing && (
                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                          Add Achievement
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {profileData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <Award size={20} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{achievement}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Issued in 2023</p>
                          </div>
                          {isEditing && (
                            <button className="text-slate-500 hover:text-rose-600">
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="font-semibold mb-4">Certifications</h3>
                      <div className="space-y-4">
                        {[
                          { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2023" },
                          { name: "Google Data Analytics", issuer: "Google", date: "2022" },
                          { name: "Microsoft Azure Fundamentals", issuer: "Microsoft", date: "2022" }
                        ].map((cert, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{cert.issuer} • {cert.date}</p>
                            </div>
                            <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                              View Certificate
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Edit Your Profile</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="3"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;