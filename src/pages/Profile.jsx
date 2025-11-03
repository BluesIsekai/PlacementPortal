import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Edit3,
  X,
  Briefcase,
  Code,
  Award,
  BookOpen,
  Linkedin,
  Github,
  ExternalLink,
  Download,
  Upload,
  ChevronDown,
  ChevronUp,
  Camera,
  LogOut,
  Loader2,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUserData } from "../context/UserDataContext";

const emptySkill = { name: "", level: 0 };
const emptyProject = { name: "", description: "", technologies: [], link: "" };

const cloneProfile = (source = {}) => ({
  ...source,
  skills: (source.skills || []).map((skill) => ({ ...skill })),
  projects: (source.projects || []).map((project) => ({
    ...project,
    technologies: [...(project.technologies || [])],
  })),
  achievements: [...(source.achievements || [])],
});

const parseCount = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    user,
    userData,
    loadingUser,
    loadingUserData,
    updateUserProfile,
    logout,
  } = useUserData();

  const baseProfile = useMemo(() => {
    if (userData?.profile) {
      return userData.profile;
    }
    return {
      uid: user?.uid || "",
      email: user?.email || "",
      displayName: user?.displayName || "",
      name: user?.displayName || "",
      phone: "",
      location: "",
      college: "",
      department: "",
      graduationYear: "",
      cgpa: "",
      resumeLink: "",
      linkedin: "",
      github: "",
      portfolio: "",
      bio: "",
      avatarUrl: "",
      skills: [],
      projects: [],
      achievements: [],
      quizzesTaken: 0,
      companiesApplied: 0,
      mockInterviews: 0,
      createdAt: null,
      updatedAt: null,
    };
  }, [userData?.profile, user?.uid, user?.email, user?.displayName]);

  const stats = useMemo(() => {
    const fallback = {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
    };
    if (!userData?.stats) {
      return fallback;
    }
    return {
      totalSolved: userData.stats.totalSolved ?? 0,
      easySolved: userData.stats.easySolved ?? 0,
      mediumSolved: userData.stats.mediumSolved ?? 0,
      hardSolved: userData.stats.hardSolved ?? 0,
    };
  }, [userData?.stats]);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [formData, setFormData] = useState(() => cloneProfile(baseProfile));
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate("/login", { replace: true });
    }
  }, [loadingUser, user, navigate]);

  useEffect(() => {
    if (!isEditing) {
      setFormData(cloneProfile(baseProfile));
    }
  }, [baseProfile, isEditing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-avatar-menu")) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayProfile = isEditing ? formData : baseProfile;
  const skillsList = isEditing ? formData.skills : baseProfile.skills;
  const projectsList = isEditing ? formData.projects : baseProfile.projects;
  const limitedSkills = showAllSkills ? skillsList : skillsList.slice(0, 6);
  const limitedProjects = showAllProjects ? projectsList : projectsList.slice(0, 2);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (!isEditing) return;
    if (name === "quizzesTaken" || name === "companiesApplied" || name === "mockInterviews") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseCount(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSkillChange = (index, field, value) => {
    if (!isEditing) return;
    setFormData((prev) => {
      const updated = prev.skills.map((skill, skillIndex) => {
        if (skillIndex !== index) return skill;
        if (field === "level") {
          const parsed = Number.parseInt(value, 10);
          const level = Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : 0;
          return { ...skill, level };
        }
        return { ...skill, name: value };
      });
      return { ...prev, skills: updated };
    });
  };

  const addSkill = () => {
    if (!isEditing) return;
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, { ...emptySkill }] }));
  };

  const removeSkill = (index) => {
    if (!isEditing) return;
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, skillIndex) => skillIndex !== index),
    }));
  };

  const handleProjectChange = (index, field, value) => {
    if (!isEditing) return;
    setFormData((prev) => {
      const updated = prev.projects.map((project, projectIndex) => {
        if (projectIndex !== index) return project;
        if (field === "technologies") {
          const technologies = value
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean);
          return { ...project, technologies };
        }
        return { ...project, [field]: value };
      });
      return { ...prev, projects: updated };
    });
  };

  const addProject = () => {
    if (!isEditing) return;
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...emptyProject }],
    }));
  };

  const removeProject = (index) => {
    if (!isEditing) return;
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, projectIndex) => projectIndex !== index),
    }));
  };

  const handleAchievementChange = (index, value) => {
    if (!isEditing) return;
    setFormData((prev) => {
      const updated = prev.achievements.map((achievement, achievementIndex) =>
        achievementIndex === index ? value : achievement,
      );
      return { ...prev, achievements: updated };
    });
  };

  const addAchievement = () => {
    if (!isEditing) return;
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  };

  const removeAchievement = (index) => {
    if (!isEditing) return;
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, achievementIndex) => achievementIndex !== index),
    }));
  };

  const startEditing = () => {
    setStatusMessage(null);
    setFormData(cloneProfile(baseProfile));
    setShowOptions(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(cloneProfile(baseProfile));
    setIsEditing(false);
    setStatusMessage(null);
  };

  const handleSave = async () => {
    if (!isEditing) return;
    setIsSaving(true);
    setStatusMessage(null);
    const payload = {
      ...formData,
      quizzesTaken: parseCount(formData.quizzesTaken),
      companiesApplied: parseCount(formData.companiesApplied),
      mockInterviews: parseCount(formData.mockInterviews),
    };

    try {
      const result = await updateUserProfile(payload);
      if (!result.success) {
        setStatusMessage({
          type: "error",
          text: result.error || "Failed to update profile.",
        });
        return;
      }
      setIsEditing(false);
      setStatusMessage({ type: "success", text: "Profile updated successfully." });
    } catch (error) {
      setStatusMessage({ type: "error", text: error?.message || "Profile update failed." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (!result.success) {
      setStatusMessage({
        type: "error",
        text: result.error || "Unable to log out. Please try again.",
      });
      return;
    }
    navigate("/login", { replace: true });
  };

  const handleShareProfile = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator?.clipboard && typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setStatusMessage({ type: "success", text: "Profile link copied to clipboard." });
      } else {
        setStatusMessage({ type: "error", text: "Clipboard access unavailable on this device." });
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error?.message || "Unable to copy profile link. Please try again.",
      });
    }
  };

  const nameDisplay =
    displayProfile.displayName ||
    displayProfile.name ||
    displayProfile.email?.split("@")[0] ||
    "Candidate";

  const departmentDisplay =
    displayProfile.department
      ? `${displayProfile.department} Student`
      : "Update your department";

  const emailDisplay = displayProfile.email || user?.email || "Add your email";
  const phoneDisplay = displayProfile.phone || "Add your phone number";
  const locationDisplay = displayProfile.location || "Add your location";
  const resumeLink = displayProfile.resumeLink || "#";

  const isLoading = loadingUser || loadingUserData;

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary} transition-colors duration-300 ease-in-out`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${theme.text.primary}`}>Profile</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your profile and showcase your skills to recruiters
          </p>
        </div>

        {statusMessage && (
          <div
            className={`mb-6 rounded-lg border p-4 text-sm ${
              statusMessage.type === "success"
                ? "border-green-500/40 bg-green-500/10 text-green-500"
                : "border-rose-500/40 bg-rose-500/10 text-rose-400"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {isLoading && (
          <div
            className="mb-6 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <Loader2 size={16} className="animate-spin" />
            Loading your profile...
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="profile-avatar-menu relative w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  {displayProfile.avatarUrl ? (
                    <img
                      src={displayProfile.avatarUrl}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={64} className="text-indigo-500" />
                  )}
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
                <h2 className="text-2xl font-bold">{nameDisplay}</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{departmentDisplay}</p>
                <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
                  {displayProfile.bio || "Add a short bio to let recruiters know more about you."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-slate-500" />
                  <span>{emailDisplay}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-slate-500" />
                  <span>{phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-slate-500" />
                  <span>{locationDisplay}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {!isEditing && (
                  <button
                    onClick={startEditing}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={handleShareProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <ExternalLink size={18} />
                  Share Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold mb-3">Social Links</h3>
                <div className="space-y-3">
                  <a
                    href={displayProfile.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 ${
                      displayProfile.linkedin
                        ? "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        : "text-slate-400 cursor-not-allowed"
                    }`}
                    onClick={(event) => {
                      if (!displayProfile.linkedin) event.preventDefault();
                    }}
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={displayProfile.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 ${
                      displayProfile.github
                        ? "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        : "text-slate-400 cursor-not-allowed"
                    }`}
                    onClick={(event) => {
                      if (!displayProfile.github) event.preventDefault();
                    }}
                  >
                    <Github size={18} />
                    <span>GitHub Profile</span>
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={displayProfile.portfolio || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 ${
                      displayProfile.portfolio
                        ? "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        : "text-slate-400 cursor-not-allowed"
                    }`}
                    onClick={(event) => {
                      if (!displayProfile.portfolio) event.preventDefault();
                    }}
                  >
                    <Briefcase size={18} />
                    <span>Portfolio Website</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <a
                  href={resumeLink}
                  download
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Download size={18} />
                  Download Resume
                </a>
                {isEditing && (
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-full py-2.5 mt-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Upload size={18} />
                    Update Resume
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                        activeTab === tab.id
                          ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Placement Preparation Stats</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Code size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <p className="text-2xl font-bold">{stats.totalSolved}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Problems Solved</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <p className="text-2xl font-bold">{displayProfile.quizzesTaken ?? 0}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Quizzes Taken</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Briefcase size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <p className="text-2xl font-bold">{displayProfile.companiesApplied ?? 0}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Companies Applied</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <User size={24} className="text-indigo-600 dark:text-indigo-400" />
                            <div>
                              <p className="text-2xl font-bold">{displayProfile.mockInterviews ?? 0}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Mock Interviews</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Top Skills</h2>
                      {limitedSkills.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          No skills added yet. {isEditing ? "Use the skills tab to add your expertise." : "Switch to edit mode to add skills."}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {limitedSkills.map((skill, index) => (
                            <div key={`${skill.name}-${index}`} className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
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
                      )}
                      {skillsList.length > 6 && (
                        <button
                          onClick={() => setShowAllSkills((prev) => !prev)}
                          className="mt-3 flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium"
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
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                      {limitedProjects.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          No projects listed yet. {isEditing ? "Use the projects tab to add details." : "Switch to edit mode to add projects."}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {limitedProjects.map((project, index) => (
                            <div key={`${project.name || "project"}-${index}`} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                              <h3 className="font-semibold">{project.name || "Untitled Project"}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {project.description || "Add a short description to highlight what you built."}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {(project.technologies || []).length > 0 ? (
                                  project.technologies.map((tech, i) => (
                                    <span
                                      key={`${tech}-${i}`}
                                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full"
                                    >
                                      {tech}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-slate-500 dark:text-slate-400">
                                    Add technologies to showcase your tech stack.
                                  </span>
                                )}
                              </div>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm mt-3"
                                >
                                  View Project <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {projectsList.length > 2 && (
                        <button
                          onClick={() => setShowAllProjects((prev) => !prev)}
                          className="mt-3 flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium"
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
                  </div>
                )}

                {activeTab === "education" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Education Details</h2>
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                          <GraduationCap size={24} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1 space-y-4">
                          {isEditing ? (
                            <>
                              <div>
                                <label className="block text-sm font-medium mb-2">College/University</label>
                                <input
                                  type="text"
                                  name="college"
                                  value={formData.college}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Department</label>
                                <input
                                  type="text"
                                  name="department"
                                  value={formData.department}
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
                                    value={formData.graduationYear}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">CGPA</label>
                                  <input
                                    type="text"
                                    name="cgpa"
                                    value={formData.cgpa}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <h3 className="font-semibold text-lg">{displayProfile.college || "Add your college"}</h3>
                              <p className="text-slate-600 dark:text-slate-400 mt-1">
                                {displayProfile.department || "Add your department"}
                              </p>
                              <div className="flex items-center gap-4 mt-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Calendar size={16} className="text-slate-500" />
                                  <span>
                                    Graduation: {displayProfile.graduationYear || "Add your graduation year"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award size={16} className="text-slate-500" />
                                  <span>CGPA: {displayProfile.cgpa || "Add your CGPA"}</span>
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
                        {displayProfile.courses && displayProfile.courses.length > 0
                          ? displayProfile.courses.map((course, index) => (
                              <span
                                key={`${course}-${index}`}
                                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-sm"
                              >
                                {course}
                              </span>
                            ))
                          : [
                              "Data Structures",
                              "Algorithms",
                              "Database Systems",
                              "Operating Systems",
                              "Computer Networks",
                              "Software Engineering",
                            ].map((course, index) => (
                              <span
                                key={`${course}-${index}`}
                                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-sm"
                              >
                                {course}
                              </span>
                            ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Skills &amp; Proficiency</h2>
                      {isEditing && (
                        <button
                          onClick={addSkill}
                          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          Add Skill
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {(isEditing ? formData.skills : baseProfile.skills).map((skill, index) => (
                        <div key={`${skill.name || "skill"}-${index}`} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            {isEditing ? (
                              <input
                                type="text"
                                value={skill.name}
                                placeholder="Skill name"
                                onChange={(event) => handleSkillChange(index, "name", event.target.value)}
                                className="w-full max-w-xs px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                              />
                            ) : (
                              <span className="font-medium">{skill.name}</span>
                            )}
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={skill.level}
                                  onChange={(event) => handleSkillChange(index, "level", event.target.value)}
                                  className="w-20 px-2 py-1 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                                />
                                <button
                                  onClick={() => removeSkill(index)}
                                  className="text-slate-500 hover:text-rose-600"
                                  title="Remove skill"
                                >
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

                      {isEditing && formData.skills.length === 0 && (
                        <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          No skills yet. Click "Add Skill" to include your expertise.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Projects</h2>
                      {isEditing && (
                        <button
                          onClick={addProject}
                          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          Add Project
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {(isEditing ? formData.projects : baseProfile.projects).map((project, index) => (
                        <div key={`${project.name || "project"}-${index}`} className="border border-slate-200 dark:border-slate-700 rounded-lg p-5">
                          <div className="flex justify-between items-start">
                            {isEditing ? (
                              <input
                                type="text"
                                value={project.name}
                                placeholder="Project name"
                                onChange={(event) => handleProjectChange(index, "name", event.target.value)}
                                className="w-full max-w-sm px-3 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                              />
                            ) : (
                              <h3 className="font-semibold text-lg">{project.name || "Untitled Project"}</h3>
                            )}
                            {isEditing && (
                              <button
                                onClick={() => removeProject(index)}
                                className="text-slate-500 hover:text-rose-600"
                                title="Remove project"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>

                          {isEditing ? (
                            <textarea
                              value={project.description}
                              placeholder="Project description"
                              onChange={(event) => handleProjectChange(index, "description", event.target.value)}
                              className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                              rows={3}
                            ></textarea>
                          ) : (
                            <p className="text-slate-600 dark:text-slate-400 mt-2">
                              {project.description || "Add a summary to highlight your impact."}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2 mt-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={(project.technologies || []).join(", ")}
                                placeholder="Technologies (comma separated)"
                                onChange={(event) => handleProjectChange(index, "technologies", event.target.value)}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                              />
                            ) : (project.technologies || []).length > 0 ? (
                              project.technologies.map((tech, techIndex) => (
                                <span
                                  key={`${tech}-${techIndex}`}
                                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-sm rounded-full"
                                >
                                  {tech}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                Add technologies to highlight your stack.
                              </span>
                            )}
                          </div>

                          <div className="mt-4">
                            {isEditing ? (
                              <input
                                type="text"
                                value={project.link}
                                placeholder="Project link"
                                onChange={(event) => handleProjectChange(index, "link", event.target.value)}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                              />
                            ) : project.link ? (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 mt-3"
                              >
                                View Project <ExternalLink size={16} />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      ))}

                      {isEditing && formData.projects.length === 0 && (
                        <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          No projects yet. Click "Add Project" to document your work.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "achievements" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Achievements &amp; Certifications</h2>
                      {isEditing && (
                        <button
                          onClick={addAchievement}
                          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          Add Achievement
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {(isEditing ? formData.achievements : baseProfile.achievements).map((achievement, index) => (
                        <div key={`${achievement || "achievement"}-${index}`} className="flex items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                            <Award size={20} className="text-amber-600 dark:text-amber-400" />
                          </div>
                          <div className="flex-1">
                            {isEditing ? (
                              <input
                                type="text"
                                value={achievement}
                                placeholder="Achievement detail"
                                onChange={(event) => handleAchievementChange(index, event.target.value)}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-600"
                              />
                            ) : (
                              <p className="font-medium">{achievement}</p>
                            )}
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {isEditing ? "Add the issuing body and year" : "Issued recently"}
                            </p>
                          </div>
                          {isEditing && (
                            <button
                              onClick={() => removeAchievement(index)}
                              className="text-slate-500 hover:text-rose-600"
                              title="Remove achievement"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}

                      {isEditing && formData.achievements.length === 0 && (
                        <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                          No achievements yet. Click "Add Achievement" to highlight your wins.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Edit Your Profile</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resume Link
                  </label>
                  <input
                    type="url"
                    id="resumeLink"
                    name="resumeLink"
                    value={formData.resumeLink}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="quizzesTaken" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quizzes Taken
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="quizzesTaken"
                    name="quizzesTaken"
                    value={formData.quizzesTaken ?? 0}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="companiesApplied" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Companies Applied
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="companiesApplied"
                    name="companiesApplied"
                    value={formData.companiesApplied ?? 0}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label htmlFor="mockInterviews" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mock Interviews
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="mockInterviews"
                    name="mockInterviews"
                    value={formData.mockInterviews ?? 0}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                  {isSaving ? "Saving..." : "Save Changes"}
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