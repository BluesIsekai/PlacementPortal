import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { placementProfiles, searchProfiles, filterProfilesByRole } from '../data/sampleProfiles';
import { 
  Search, 
  Filter, 
  User, 
  Users, 
  Award, 
  BookOpen, 
  MapPin, 
  Eye,
  X,
  ChevronDown
} from 'lucide-react';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    role: searchParams.get('role') || '',
    skillCategory: searchParams.get('skill') || '',
    college: searchParams.get('college') || ''
  });

  // Debounced search
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams({
          query: query,
          role: filters.role,
          skillCategory: filters.skillCategory,
          college: filters.college
        });

        const response = await fetch(`http://localhost:5000/api/search?${searchParams}`);
        
        if (response.ok) {
          const data = await response.json();
          setResults(data.users || []);
        } else {
          console.log('Backend not available, using sample data');
          // Fallback to sample data
          const sampleResults = getFilteredSampleData(query, filters);
          setResults(sampleResults);
        }
      } catch (error) {
        console.log('Backend error, using sample data:', error.message);
        // Fallback to sample data
        const sampleResults = getFilteredSampleData(query, filters);
        setResults(sampleResults);
      } finally {
        setIsLoading(false);
      }
    };

    const delay = setTimeout(fetchResults, 400); // Debounce
    return () => clearTimeout(delay);
  }, [query, filters]);

  // Function to filter sample data based on search and filters
  const getFilteredSampleData = (searchQuery, appliedFilters) => {
    let filteredData = [...placementProfiles];
    
    // Apply text search
    if (searchQuery && searchQuery.length >= 2) {
      filteredData = searchProfiles(filteredData, searchQuery);
    }
    
    // Apply role filter
    if (appliedFilters.role) {
      // Map "Competitor" to "Student" for compatibility
      const roleToFilter = appliedFilters.role === 'Competitor' ? 'Student' : appliedFilters.role;
      filteredData = filterProfilesByRole(filteredData, roleToFilter);
    }
    
    // Apply skill category filter
    if (appliedFilters.skillCategory) {
      filteredData = filteredData.filter(profile =>
        profile.skills.some(skill => 
          skill.toLowerCase().includes(appliedFilters.skillCategory.toLowerCase())
        )
      );
    }
    
    // Apply college filter
    if (appliedFilters.college) {
      filteredData = filteredData.filter(profile =>
        profile.college.toLowerCase().includes(appliedFilters.college.toLowerCase())
      );
    }
    
    // Transform to match expected format
    return filteredData.map(profile => ({
      id: profile.id.toString(),
      name: profile.name,
      username: profile.username,
      role: profile.role === 'Student' ? 'Competitor' : profile.role, // Map back for display
      skills: profile.skills,
      interests: profile.interests || [],
      profilePic: profile.profilePic,
      bio: profile.bio,
      college: profile.college,
      city: profile.city,
      experience: profile.experience || profile.year || 'Not specified',
      rating: profile.cgpa ? (profile.cgpa / 2).toFixed(1) : (4.0 + Math.random()).toFixed(1)
    }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      role: '',
      skillCategory: '',
      college: ''
    });
  };

  const viewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const getRoleIcon = (role) => {
    return role === 'Guider' ? <Award className="w-4 h-4" /> : <Users className="w-4 h-4" />;
  };

  const getRoleBadgeColor = (role) => {
    return role === 'Guider' 
      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} py-8`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${theme.text.primary} mb-2`}>
            🔍 Find Your Network
          </h1>
          <p className={`text-lg ${theme.text.secondary}`}>
            Discover competitors and mentors to accelerate your learning journey
          </p>
        </div>

        {/* Search Bar */}
        <div className={`${theme.bg.secondary} rounded-xl shadow-lg p-6 mb-8`}>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${theme.text.tertiary}`} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border ${theme.border.primary} rounded-lg ${theme.bg.tertiary} ${theme.text.primary} placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Search by name, skills, interests, or college..."
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className={`h-5 w-5 ${theme.text.tertiary} hover:${theme.text.secondary}`} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 ${theme.button.secondary} rounded-lg transition-colors`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {(filters.role || filters.skillCategory || filters.college) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) => handleFilterChange('role', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.border.primary} rounded-md ${theme.bg.tertiary} ${theme.text.primary}`}
                >
                  <option value="">All Roles</option>
                  <option value="Competitor">Competitor</option>
                  <option value="Guider">Guider</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>
                  Skill Category
                </label>
                <select
                  value={filters.skillCategory}
                  onChange={(e) => handleFilterChange('skillCategory', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.border.primary} rounded-md ${theme.bg.tertiary} ${theme.text.primary}`}
                >
                  <option value="">All Skills</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Backend Development">Backend Development</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>
                  College
                </label>
                <select
                  value={filters.college}
                  onChange={(e) => handleFilterChange('college', e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.border.primary} rounded-md ${theme.bg.tertiary} ${theme.text.primary}`}
                >
                  <option value="">All Colleges</option>
                  <option value="IIT Delhi">IIT Delhi</option>
                  <option value="IIT Bombay">IIT Bombay</option>
                  <option value="NIT Trichy">NIT Trichy</option>
                  <option value="BITS Pilani">BITS Pilani</option>
                  <option value="VIT Vellore">VIT Vellore</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="mb-4">
          {query.length >= 2 && (
            <div className="flex items-center justify-between mb-4">
              <p className={`${theme.text.secondary}`}>
                {isLoading ? 'Searching...' : `Found ${results.length} results for "${query}"`}
              </p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className={`${theme.text.secondary}`}>Searching for users...</p>
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((user) => (
              <div
                key={user.id}
                className={`${theme.bg.secondary} rounded-xl ${theme.shadow.card} p-6 transition-all duration-200 ${theme.bg.hover} transform hover:scale-105`}
              >
                {/* Profile Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={user.profilePic || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80'}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getRoleBadgeColor(user.role)} flex items-center justify-center`}>
                      {getRoleIcon(user.role)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${theme.text.primary}`}>
                      {user.name}
                    </h3>
                    <p className={`text-sm ${theme.text.tertiary}`}>
                      @{user.username}
                    </p>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      <span>{user.role}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className={`text-sm ${theme.text.secondary} mb-4 line-clamp-2`}>
                  {user.bio}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className={`text-sm font-medium ${theme.text.primary} mb-2`}>Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skills.length > 3 && (
                      <span className={`px-2 py-1 ${theme.text.tertiary} text-xs`}>
                        +{user.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Location & Experience */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{user.city}</span>
                  </div>
                  <span>{user.experience} experience</span>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className={`text-sm ${theme.text.tertiary}`}>
                      {user.rating}
                    </span>
                  </div>
                </div>

                {/* View Profile Button */}
                <button
                  onClick={() => viewProfile(user.id)}
                  className={`w-full flex items-center justify-center space-x-2 ${theme.button.primary} py-2 px-4 rounded-lg transition-colors`}
                >
                  <Eye className="w-4 h-4" />
                  <span>View Profile</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && query.length >= 2 && results.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className={`w-12 h-12 ${theme.text.tertiary}`} />
            </div>
            <h3 className={`text-xl font-semibold ${theme.text.primary} mb-2`}>
              No results found
            </h3>
            <p className={`${theme.text.secondary} mb-4`}>
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setQuery('');
                clearFilters();
              }}
              className={`${theme.button.secondary} px-4 py-2 rounded-lg`}
            >
              Clear search
            </button>
          </div>
        )}

        {/* Search Tips */}
        {query.length < 2 && (
          <div className={`${theme.bg.secondary} rounded-xl p-6 text-center`}>
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={`text-xl font-semibold ${theme.text.primary} mb-2`}>
              Start your search
            </h3>
            <p className={`${theme.text.secondary} mb-4`}>
              Type at least 2 characters to search for users
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                  💡 Search Tips
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li>• Search by name or username</li>
                  <li>• Find by skills (e.g., "React", "Python")</li>
                  <li>• Search interests or hobbies</li>
                  <li>• Look up by college name</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-900 dark:text-green-200 mb-2">
                  🎯 Find Your Match
                </h4>
                <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                  <li>• <strong>Competitors:</strong> Fellow students</li>
                  <li>• <strong>Guiders:</strong> Experienced mentors</li>
                  <li>• Use filters for better results</li>
                  <li>• Connect and learn together</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
