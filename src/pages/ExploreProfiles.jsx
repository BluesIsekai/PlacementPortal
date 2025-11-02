import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { placementProfiles } from "../data/sampleProfiles";
import { 
  Search, 
  Filter, 
  ArrowLeft, 
  Users, 
  Award, 
  GraduationCap,
  MapPin,
  Eye,
  X,
  Grid3X3,
  List,
  SortAsc,
  SortDesc
} from "lucide-react";

const ExploreProfiles = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();
  const theme = useTheme();

  // Get unique departments and roles for filters
  const departments = ["All", ...new Set(placementProfiles.map(p => p.department))];
  const roles = ["All", "Student", "Guider"];

  // Filter and sort profiles
  const getFilteredAndSortedProfiles = () => {
    let filtered = placementProfiles.filter(profile => {
      const searchFields = [
        profile.name,
        profile.skills.join(" "),
        profile.department,
        profile.college,
        profile.bio,
        profile.city
      ].join(" ").toLowerCase();
      
      const matchesSearch = search === "" || searchFields.includes(search.toLowerCase());
      const matchesRole = roleFilter === "All" || profile.role === roleFilter;
      const matchesDepartment = departmentFilter === "All" || profile.department === departmentFilter;
      
      return matchesSearch && matchesRole && matchesDepartment;
    });

    // Sort profiles
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "college":
          aValue = a.college.toLowerCase();
          bValue = b.college.toLowerCase();
          break;
        case "department":
          aValue = a.department.toLowerCase();
          bValue = b.department.toLowerCase();
          break;
        case "role":
          aValue = a.role.toLowerCase();
          bValue = b.role.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  };

  const filteredProfiles = getFilteredAndSortedProfiles();

  const getRoleIcon = (role) => {
    switch (role) {
      case "Guider":
        return <Award className="w-4 h-4" />;
      case "Student":
        return <Users className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Guider":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "Student":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setDepartmentFilter("All");
    setSortBy("name");
    setSortOrder("asc");
  };

  const ProfileCard = ({ profile }) => (
    <div className={`${theme.bg.secondary} rounded-2xl ${theme.shadow.card} p-6 transition-all duration-300 ${theme.bg.hover} transform hover:scale-105 border ${theme.border.primary}`}>
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-3">
          <img
            src={profile.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-3 border-white dark:border-gray-700 shadow-md"
          />
          <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full ${getRoleBadgeColor(profile.role)} flex items-center justify-center border-2 border-white dark:border-gray-700`}>
            {getRoleIcon(profile.role)}
          </div>
        </div>
        
        <h2 className={`text-xl font-semibold text-center ${theme.text.primary} mb-1`}>
          {profile.name}
        </h2>
        <p className={`text-sm ${theme.text.tertiary} text-center`}>
          @{profile.username}
        </p>
        
        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium mt-2 ${getRoleBadgeColor(profile.role)}`}>
          {getRoleIcon(profile.role)}
          <span>{profile.role}</span>
        </div>
      </div>

      {/* Profile Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <GraduationCap className="w-4 h-4 mr-2" />
          <span className="text-center">{profile.department}</span>
        </div>
        
        <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-center">{profile.college}</span>
        </div>

        {profile.city && (
          <p className={`text-sm ${theme.text.tertiary} text-center`}>
            📍 {profile.city}
          </p>
        )}

        {/* Bio */}
        <p className={`text-sm ${theme.text.secondary} text-center line-clamp-2 leading-relaxed`}>
          {profile.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 justify-center">
          {profile.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {profile.skills.length > 3 && (
            <span className={`px-2 py-1 ${theme.text.tertiary} text-xs`}>
              +{profile.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Additional Info for Students */}
        {profile.role === "Student" && profile.cgpa && (
          <div className="text-center">
            <span className={`text-sm ${theme.text.secondary}`}>
              CGPA: <span className="font-semibold text-green-600">{profile.cgpa}</span>
            </span>
          </div>
        )}

        {/* Additional Info for Guiders */}
        {profile.role === "Guider" && profile.experience && (
          <div className="text-center">
            <span className={`text-sm ${theme.text.secondary}`}>
              Experience: <span className="font-semibold">{profile.experience}</span>
            </span>
          </div>
        )}
      </div>

      {/* View Profile Button */}
      <button
        onClick={() => navigate(`/profile/${profile.id}`)}
        className={`w-full flex items-center justify-center space-x-2 ${theme.button.primary} py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105`}
      >
        <Eye className="w-4 h-4" />
        <span>View Profile</span>
      </button>
    </div>
  );

  const ProfileListItem = ({ profile }) => (
    <div className={`${theme.bg.secondary} rounded-xl ${theme.shadow.card} p-4 transition-all duration-200 ${theme.bg.hover} border ${theme.border.primary}`}>
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="relative flex-shrink-0">
          <img
            src={profile.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80"}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getRoleBadgeColor(profile.role)} flex items-center justify-center`}>
            {getRoleIcon(profile.role)}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className={`text-lg font-semibold ${theme.text.primary} truncate`}>
              {profile.name}
            </h3>
            <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(profile.role)}`}>
              <span>{profile.role}</span>
            </div>
          </div>
          
          <p className={`text-sm ${theme.text.tertiary} mb-1`}>
            {profile.department} • {profile.college}
          </p>
          
          <p className={`text-sm ${theme.text.secondary} line-clamp-1 mb-2`}>
            {profile.bio}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {profile.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {profile.skills.length > 4 && (
              <span className={`text-xs ${theme.text.tertiary}`}>
                +{profile.skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(`/profile/${profile.id}`)}
          className={`flex-shrink-0 ${theme.button.primary} px-4 py-2 rounded-lg transition-colors`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.bg.primary} py-8`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className={`flex items-center space-x-2 ${theme.text.secondary} hover:${theme.text.primary} transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          
          <div className="text-center flex-1">
            <h1 className={`text-4xl font-bold ${theme.text.primary} mb-2`}>
              🌟 Explore Profiles
            </h1>
            <p className={`text-lg ${theme.text.secondary}`}>
              Discover students and mentors in our community
            </p>
          </div>
          
          <div className="w-32"> {/* Spacer for centering */}</div>
        </div>

        {/* Search and Filter Bar */}
        <div className={`${theme.bg.secondary} rounded-xl shadow-lg p-6 mb-8`}>
          {/* Search Input */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${theme.text.tertiary}`} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-10 py-3 border ${theme.border.primary} rounded-lg ${theme.bg.tertiary} ${theme.text.primary} placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Search by name, skills, department, college, or bio..."
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className={`h-5 w-5 ${theme.text.tertiary} hover:${theme.text.secondary}`} />
              </button>
            )}
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 ${theme.button.secondary} rounded-lg transition-colors`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {(roleFilter !== "All" || departmentFilter !== "All") && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 border ${theme.border.primary} rounded-md ${theme.bg.tertiary} ${theme.text.primary} text-sm`}
              >
                <option value="name">Sort by Name</option>
                <option value="college">Sort by College</option>
                <option value="department">Sort by Department</option>
                <option value="role">Sort by Role</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className={`p-2 ${theme.button.secondary} rounded-lg transition-colors`}
              >
                {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>
                  Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.border.primary} rounded-md ${theme.bg.tertiary} ${theme.text.primary}`}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>
                  Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className={`w-full px-3 py-2 border ${theme.border.primary} rounded-md ${theme.bg.tertiary} ${theme.text.primary}`}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className={`${theme.text.secondary}`}>
            Found <span className="font-semibold">{filteredProfiles.length}</span> profiles
            {search && ` for "${search}"`}
          </p>
        </div>

        {/* Profiles Grid/List */}
        {filteredProfiles.length > 0 ? (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProfiles.map((profile) =>
              viewMode === "grid" ? (
                <ProfileCard key={profile.id} profile={profile} />
              ) : (
                <ProfileListItem key={profile.id} profile={profile} />
              )
            )}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Users className={`w-12 h-12 ${theme.text.tertiary}`} />
            </div>
            <h3 className={`text-xl font-semibold ${theme.text.primary} mb-2`}>
              No profiles found
            </h3>
            <p className={`${theme.text.secondary} mb-4`}>
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className={`${theme.button.secondary} px-4 py-2 rounded-lg`}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreProfiles;
