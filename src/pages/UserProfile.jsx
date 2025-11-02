import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { placementProfiles } from '../data/sampleProfiles';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Globe, 
  Award, 
  BookOpen, 
  Star, 
  Users, 
  MessageCircle, 
  UserPlus,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  GraduationCap,
  Building,
  Clock,
  TrendingUp
} from 'lucide-react';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from backend first
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
        } else {
          // Fallback to sample data
          const sampleProfile = placementProfiles.find(p => p.id.toString() === userId);
          if (sampleProfile) {
            setUserProfile(formatSampleProfile(sampleProfile));
          } else {
            setUserProfile(null);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Fallback to sample data
        const sampleProfile = placementProfiles.find(p => p.id.toString() === userId);
        if (sampleProfile) {
          setUserProfile(formatSampleProfile(sampleProfile));
        } else {
          setUserProfile(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  // Format sample profile to match expected structure
  const formatSampleProfile = (sampleProfile) => {
    return {
      id: sampleProfile.id.toString(),
      name: sampleProfile.name,
      username: sampleProfile.username,
      email: sampleProfile.email,
      role: sampleProfile.role === 'Student' ? 'Competitor' : sampleProfile.role,
      profilePic: sampleProfile.profilePic,
      bio: sampleProfile.bio,
      college: sampleProfile.college,
      department: sampleProfile.department,
      degree: sampleProfile.degree || '',
      year: sampleProfile.year || '',
      city: sampleProfile.city,
      joinedDate: '2023-01-15', // Default date
      skills: sampleProfile.skills || [],
      interests: sampleProfile.interests || [],
      experience: sampleProfile.experience || sampleProfile.year || 'Not specified',
      rating: sampleProfile.cgpa ? (sampleProfile.cgpa / 2).toFixed(1) : (4.0 + Math.random()).toFixed(1),
      totalProjects: Math.floor(Math.random() * 20) + 5,
      githubContributions: Math.floor(Math.random() * 1000) + 100,
      achievements: sampleProfile.achievements || [
        { title: 'Academic Excellence', description: 'Top performer in class', date: '2023-12-01' }
      ],
      projects: sampleProfile.projects || [
        {
          title: 'Sample Project',
          description: 'A showcase project demonstrating technical skills',
          techStack: sampleProfile.skills.slice(0, 3),
          link: '#'
        }
      ],
      socialLinks: sampleProfile.socialLinks || {
        github: `https://github.com/${sampleProfile.username}`,
        linkedin: `https://linkedin.com/in/${sampleProfile.username}`
      },
      stats: {
        problemsSolved: Math.floor(Math.random() * 500) + 50,
        contestsParticipated: Math.floor(Math.random() * 30) + 5,
        ranking: sampleProfile.role === 'Student' ? 'Specialist' : 'Expert',
        menteeCount: sampleProfile.role === 'Guider' ? Math.floor(Math.random() * 50) + 10 : 0
      }
    };
  };

  const handleConnect = () => {
    // Implementation for connecting with user
    console.log('Connecting with user:', userProfile.name);
  };

  const handleMessage = () => {
    // Implementation for messaging user
    console.log('Opening message with user:', userProfile.name);
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${theme.text.secondary}`}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className={`min-h-screen ${theme.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${theme.text.primary} mb-2`}>Profile Not Found</h2>
          <p className={`${theme.text.secondary} mb-4`}>The user profile you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/search')}
            className={`${theme.button.primary} px-4 py-2 rounded-lg`}
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const getRoleIcon = (role) => {
    return role === 'Guider' ? <Award className="w-5 h-5" /> : <Users className="w-5 h-5" />;
  };

  const getRoleBadgeColor = (role) => {
    return role === 'Guider' 
      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center space-x-2 ${theme.text.secondary} hover:${theme.text.primary} mb-6 transition-colors`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Search</span>
        </button>

        {/* Profile Header */}
        <div className={`${theme.bg.secondary} rounded-2xl ${theme.shadow.card} p-8 mb-8`}>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={userProfile.profilePic || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80'}
                alt={userProfile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700"
              />
              <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full ${getRoleBadgeColor(userProfile.role)} flex items-center justify-center border-3 border-white dark:border-gray-700`}>
                {getRoleIcon(userProfile.role)}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className={`text-3xl font-bold ${theme.text.primary} mb-2`}>
                    {userProfile.name}
                  </h1>
                  <p className={`text-lg ${theme.text.tertiary} mb-2`}>
                    @{userProfile.username}
                  </p>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(userProfile.role)}`}>
                    {getRoleIcon(userProfile.role)}
                    <span>{userProfile.role}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={handleMessage}
                    className={`flex items-center space-x-2 ${theme.button.secondary} px-4 py-2 rounded-lg transition-colors`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={handleConnect}
                    className={`flex items-center space-x-2 ${theme.button.primary} px-4 py-2 rounded-lg transition-colors`}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>

              {/* Bio */}
              <p className={`${theme.text.secondary} mb-4 leading-relaxed`}>
                {userProfile.bio}
              </p>

              {/* Basic Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <GraduationCap className={`w-4 h-4 ${theme.text.tertiary}`} />
                  <span className={theme.text.secondary}>{userProfile.college}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className={`w-4 h-4 ${theme.text.tertiary}`} />
                  <span className={theme.text.secondary}>{userProfile.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className={`w-4 h-4 ${theme.text.tertiary}`} />
                  <span className={theme.text.secondary}>{userProfile.experience} experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className={`w-4 h-4 ${theme.text.tertiary}`} />
                  <span className={theme.text.secondary}>{userProfile.rating} rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {['overview', 'skills', 'projects', 'achievements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className={`${theme.bg.secondary} rounded-xl p-6`}>
                  <h3 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {userProfile.stats.problemsSolved}
                      </div>
                      <div className={`text-sm ${theme.text.tertiary}`}>Problems Solved</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {userProfile.stats.contestsParticipated}
                      </div>
                      <div className={`text-sm ${theme.text.tertiary}`}>Contests</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {userProfile.stats.ranking}
                      </div>
                      <div className={`text-sm ${theme.text.tertiary}`}>Ranking</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {userProfile.role === 'Guider' ? userProfile.stats.menteeCount : userProfile.totalProjects}
                      </div>
                      <div className={`text-sm ${theme.text.tertiary}`}>
                        {userProfile.role === 'Guider' ? 'Mentees' : 'Projects'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className={`${theme.bg.secondary} rounded-xl p-6`}>
                  <h3 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Education</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${theme.text.primary}`}>
                        {userProfile.degree} in {userProfile.department}
                      </h4>
                      <p className={`${theme.text.secondary} mb-1`}>{userProfile.college}</p>
                      <p className={`text-sm ${theme.text.tertiary}`}>{userProfile.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className={`${theme.bg.secondary} rounded-xl p-6`}>
                <h3 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Skills & Interests</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className={`font-medium ${theme.text.primary} mb-3`}>Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-medium ${theme.text.primary} mb-3`}>Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                {userProfile.projects.map((project, index) => (
                  <div key={index} className={`${theme.bg.secondary} rounded-xl p-6`}>
                    <div className="flex items-start justify-between mb-3">
                      <h4 className={`text-lg font-semibold ${theme.text.primary}`}>
                        {project.title}
                      </h4>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${theme.text.tertiary} hover:${theme.text.primary} transition-colors`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <p className={`${theme.text.secondary} mb-3`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-4">
                {userProfile.achievements.map((achievement, index) => (
                  <div key={index} className={`${theme.bg.secondary} rounded-xl p-6`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-semibold ${theme.text.primary} mb-1`}>
                          {achievement.title}
                        </h4>
                        <p className={`${theme.text.secondary} mb-2`}>{achievement.description}</p>
                        <p className={`text-sm ${theme.text.tertiary}`}>
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className={`${theme.bg.secondary} rounded-xl p-6`}>
              <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className={`w-4 h-4 ${theme.text.tertiary}`} />
                  <span className={`text-sm ${theme.text.secondary}`}>{userProfile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className={`w-4 h-4 ${theme.text.tertiary}`} />
                  <span className={`text-sm ${theme.text.secondary}`}>
                    Joined {new Date(userProfile.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {userProfile.socialLinks && (
              <div className={`${theme.bg.secondary} rounded-xl p-6`}>
                <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>Social Links</h3>
                <div className="space-y-3">
                  {userProfile.socialLinks.github && (
                    <a
                      href={userProfile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 ${theme.text.secondary} hover:${theme.text.primary} transition-colors`}
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                  {userProfile.socialLinks.linkedin && (
                    <a
                      href={userProfile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 ${theme.text.secondary} hover:${theme.text.primary} transition-colors`}
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                  {userProfile.socialLinks.twitter && (
                    <a
                      href={userProfile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 ${theme.text.secondary} hover:${theme.text.primary} transition-colors`}
                    >
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  )}
                  {userProfile.socialLinks.website && (
                    <a
                      href={userProfile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 ${theme.text.secondary} hover:${theme.text.primary} transition-colors`}
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className={`${theme.bg.secondary} rounded-xl p-6`}>
              <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>Quick Actions</h3>
              <div className="space-y-2">
                <button className={`w-full ${theme.button.secondary} py-2 px-3 rounded-lg text-sm transition-colors`}>
                  View Full Resume
                </button>
                <button className={`w-full ${theme.button.secondary} py-2 px-3 rounded-lg text-sm transition-colors`}>
                  Schedule Meeting
                </button>
                <button className={`w-full ${theme.button.secondary} py-2 px-3 rounded-lg text-sm transition-colors`}>
                  Report Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
