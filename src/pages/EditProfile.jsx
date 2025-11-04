import React, { useState, useEffect, useRef } from "react";
import { 
  User, Mail, Phone, MapPin, Calendar, Save, X, 
  Upload, Camera, Eye, EyeOff, ChevronDown, 
  AlertCircle, CheckCircle, ExternalLink, Link,
  Instagram, Linkedin, Twitter, Github, Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { loadUserProfile, saveUserProfile } from "../utils/profileUtils";
import { isFirebaseConfigured } from "../lib/firebase";

const createDefaultFormData = () => {
  const storedEmail = typeof window !== "undefined"
    ? window.localStorage.getItem("userEmail") || "john.doe@example.com"
    : "john.doe@example.com";

  return {
    profilePicture: null,
    profilePictureUrl: "",
    fullName: "John Doe",
    username: "johndoe",
    email: storedEmail,
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1999-05-15",
    gender: "male",
    bio: "Passionate computer science student with interest in web development and machine learning. Actively preparing for campus placements.",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    website: "https://johndoe.dev",
    socialMedia: {
      instagram: "https://instagram.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
    },
    skills: "JavaScript, React, Node.js, Python, Machine Learning",
    occupation: "Computer Science Student",
    education: "Bachelor's in Computer Science",
    company: "University College",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};

const EditProfile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cloudSyncReady, setCloudSyncReady] = useState(isFirebaseConfigured);
  const [cloudSyncWarning, setCloudSyncWarning] = useState(!isFirebaseConfigured);
  const [profileLoading, setProfileLoading] = useState(true);

  const [formData, setFormData] = useState(() => createDefaultFormData());

  const mergeFormState = (previous, incoming, fallbackEmail) => {
    const safeIncoming = incoming || {};
    const mergedAddress = {
      ...(previous.address || {}),
      ...(typeof safeIncoming.address === "object" && safeIncoming.address ? safeIncoming.address : {}),
    };
    const mergedSocial = {
      ...(previous.socialMedia || {}),
      ...(typeof safeIncoming.socialMedia === "object" && safeIncoming.socialMedia ? safeIncoming.socialMedia : {}),
    };

    return {
      ...previous,
      ...safeIncoming,
      email: safeIncoming.email || fallbackEmail || previous.email,
      address: mergedAddress,
      socialMedia: mergedSocial,
      profilePicture: null,
      profilePictureUrl: safeIncoming.profilePictureUrl || previous.profilePictureUrl || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  };

  const buildProfilePayload = (docEmail) => {
    const address = {
      street: formData.address?.street || '',
      city: formData.address?.city || '',
      state: formData.address?.state || '',
      zipCode: formData.address?.zipCode || '',
    };

    const socialMedia = {
      instagram: formData.socialMedia?.instagram || '',
      linkedin: formData.socialMedia?.linkedin || '',
      twitter: formData.socialMedia?.twitter || '',
      github: formData.socialMedia?.github || '',
    };

    return {
      fullName: formData.fullName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim() || docEmail,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bio: formData.bio,
      address,
      website: formData.website,
      socialMedia,
      skills: formData.skills,
      occupation: formData.occupation,
      education: formData.education,
      company: formData.company,
      profilePictureUrl: formData.profilePictureUrl || profilePreview || '',
    };
  };

  useEffect(() => {
    const ensureDemoToken = () => {
      if (typeof window === "undefined") {
        return;
      }
      if (!window.localStorage.getItem('token') && !window.localStorage.getItem('authToken')) {
        const demoToken = 'demo-jwt-token-' + Date.now();
        window.localStorage.setItem('token', demoToken);
        console.log('Created demo token:', demoToken);
      }
    };

    ensureDemoToken();

    let isMounted = true;
    const resolvedEmail = user?.email || (typeof window !== "undefined" ? window.localStorage.getItem('userEmail') : null);

    if (!resolvedEmail) {
      setProfileLoading(false);
      setCloudSyncReady(false);
      setCloudSyncWarning(true);
      return () => {
        isMounted = false;
      };
    }

    const hydrateProfile = async () => {
      setProfileLoading(true);
      try {
        const result = await loadUserProfile(resolvedEmail);
        if (!isMounted) {
          return;
        }
        if (result.profile) {
          setFormData((prev) => mergeFormState(prev, result.profile, resolvedEmail));
          setProfilePreview(result.profile.profilePictureUrl || null);
        }
        const unavailable = Boolean(result.firebaseUnavailable);
        setCloudSyncReady(!unavailable);
        setCloudSyncWarning(unavailable);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        console.warn('Failed to load profile from cloud, using cached data', error);
        setCloudSyncReady(false);
        setCloudSyncWarning(true);
        if (typeof window !== "undefined") {
          try {
            const cachedRaw = window.localStorage.getItem('userProfile');
            if (cachedRaw) {
              const cachedProfile = JSON.parse(cachedRaw);
              setFormData((prev) => mergeFormState(prev, cachedProfile, resolvedEmail));
              setProfilePreview(cachedProfile.profilePictureUrl || null);
            }
          } catch (parseError) {
            console.warn('Failed to parse cached profile data', parseError);
          }
        }
      } finally {
        if (isMounted) {
          setProfileLoading(false);
        }
      }
    };

    hydrateProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else if (name.includes('socialMedia.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profilePicture: 'File size should be less than 5MB'
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profilePicture: 'Please select an image file'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          profilePicture: file,
          profilePictureUrl: typeof e.target.result === "string" ? e.target.result : prev.profilePictureUrl || ""
        }));
        setErrors(prev => ({
          ...prev,
          profilePicture: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[\d\s\(\)-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    // Password validation (if changing password)
    if (showPasswordSection) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }

      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters';
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // URL validations
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
    }

    Object.keys(formData.socialMedia).forEach(platform => {
      const url = formData.socialMedia[platform];
      if (url && !/^https?:\/\/.+/.test(url)) {
        newErrors[`socialMedia.${platform}`] = 'Please enter a valid URL';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Form data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setIsLoading(true);
    setErrors({});

    const resolvedEmail = user?.email || (typeof window !== "undefined" ? window.localStorage.getItem('userEmail') : null);

    if (!resolvedEmail && !formData.email) {
      setErrors({ submit: 'Unable to determine your account email. Please log in again.' });
      setIsLoading(false);
      return;
    }

    const docEmail = resolvedEmail || formData.email;

    try {
      const payload = buildProfilePayload(docEmail);
      console.log('Attempting to save profile via Firebase:', payload);

      const result = await saveUserProfile(docEmail, payload);

      setCloudSyncReady(!result.firebaseUnavailable);
      setCloudSyncWarning(Boolean(result.firebaseUnavailable));

      setFormData((prev) => mergeFormState(prev, result.profile, docEmail));
      setProfilePreview(result.profile.profilePictureUrl || null);

      if (typeof window !== "undefined") {
        if (payload.fullName) {
          window.localStorage.setItem('userName', payload.fullName);
        }
        if (payload.email) {
          window.localStorage.setItem('userEmail', payload.email);
        }
        try {
          const storedUserRaw = window.localStorage.getItem('user');
          const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : {};
          const mergedUser = {
            ...storedUser,
            email: payload.email || storedUser.email,
            name: payload.fullName || storedUser.name,
            fullName: payload.fullName || storedUser.fullName,
            bio: payload.bio || storedUser.bio,
            isProfileComplete: true,
          };
          window.localStorage.setItem('user', JSON.stringify(mergedUser));
        } catch (storageError) {
          console.warn('Failed to update cached user info', storageError);
        }
      }

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      console.error('Failed to save profile data', error);
      setErrors({ submit: error?.message || 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  // Debug function to test API connection
  const testConnection = async () => {
    const resolvedEmail = user?.email || (typeof window !== "undefined" ? window.localStorage.getItem('userEmail') : null);
    if (!resolvedEmail) {
      alert('No user email available. Log in again to test sync.');
      return;
    }
    try {
      const result = await loadUserProfile(resolvedEmail);
      setCloudSyncReady(!result.firebaseUnavailable);
      setCloudSyncWarning(Boolean(result.firebaseUnavailable));
      alert(result.firebaseUnavailable
        ? 'Connected to local cache. Firebase sync unavailable.'
        : 'Firebase connection successful.');
    } catch (error) {
      console.error('Connection test failed:', error);
      setCloudSyncReady(false);
      setCloudSyncWarning(true);
      alert(`Connection test failed: ${error.message}`);
    }
  };

  // Debug function to test save functionality
  const testSave = async () => {
    const resolvedEmail = user?.email || (typeof window !== "undefined" ? window.localStorage.getItem('userEmail') : null);
    if (!resolvedEmail && !formData.email) {
      alert('Cannot determine user email to save profile.');
      return;
    }
    try {
      const payload = buildProfilePayload(resolvedEmail || formData.email);
      const result = await saveUserProfile(resolvedEmail || formData.email, payload);
      setCloudSyncReady(!result.firebaseUnavailable);
      setCloudSyncWarning(Boolean(result.firebaseUnavailable));
      alert(result.firebaseUnavailable
        ? 'Profile saved locally. Firebase sync unavailable.'
        : 'Profile saved to Firebase successfully!');
    } catch (error) {
      console.error('Test save failed:', error);
      alert(`Test save failed: ${error.message}`);
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} ${theme.text.primary} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className={`inline-flex items-center gap-2 ${theme.text.secondary} hover:${theme.text.primary} transition-colors mb-4`}
          >
            <X size={20} />
            Back to Profile
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <p className={`${theme.text.secondary} mt-2`}>
                Update your personal information and preferences
              </p>
            </div>
            {/* Backend Connection Status */}
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                cloudSyncReady 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              }`}>
                {cloudSyncReady ? '🟢 Cloud Sync Active' : '🟡 Offline Mode'}
              </div>
              <button
                onClick={testConnection}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-800 border border-blue-200 rounded-full hover:bg-blue-200 transition-colors"
              >
                Test Connection
              </button>
              <button
                onClick={testSave}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-800 border border-purple-200 rounded-full hover:bg-purple-200 transition-colors"
              >
                Test Save
              </button>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-pulse">
            <CheckCircle className="text-green-600" size={20} />
            <div>
              <span className="text-green-800 font-medium">
                ✅ Profile updated successfully!
              </span>
              <p className="text-green-600 text-sm mt-1">
                {cloudSyncWarning
                  ? 'Working offline for now. Changes will sync automatically once Firebase is reachable.'
                  : 'Redirecting to your profile page...'}
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <div>
              <span className="text-red-800 font-medium">{errors.submit}</span>
              {cloudSyncWarning && (
                <p className="text-red-600 text-sm mt-1">
                  Cloud sync is currently unavailable. Changes are saved locally and will sync when Firebase is accessible.
                </p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <div className={`${theme.bg.secondary} rounded-xl p-6 shadow-lg`}>
            <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={32} className={theme.text.muted} />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Upload size={18} />
                  Upload Photo
                </button>
                <p className={`${theme.text.muted} text-sm mt-2`}>
                  JPG, PNG up to 5MB
                </p>
                {errors.profilePicture && (
                  <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className={`${theme.bg.secondary} rounded-xl p-6 shadow-lg`}>
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors.fullName ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors.username ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors.email ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors.phone ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors.dateOfBirth ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors appearance-none`}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme.text.muted} pointer-events-none`} size={20} />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Bio / About Me</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none`}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Address Information */}
          <div className={`${theme.bg.secondary} rounded-xl p-6 shadow-lg`}>
            <h2 className="text-xl font-semibold mb-6">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Street Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Enter your street address"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Enter your city"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Enter your state"
                />
              </div>

              {/* Zip Code */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Zip Code</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Enter your zip code"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className={`${theme.bg.secondary} rounded-xl p-6 shadow-lg`}>
            <h2 className="text-xl font-semibold mb-6">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Website */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Website / Portfolio</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors.website ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="https://your-website.com"
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                )}
              </div>

              {/* Skills */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Skills / Interests</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="JavaScript, React, Python, Machine Learning (comma-separated)"
                />
                <p className={`${theme.text.muted} text-sm mt-1`}>
                  Separate skills with commas
                </p>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-medium mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Your current occupation"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium mb-2">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Your educational background"
                />
              </div>

              {/* Company */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Company / Institution</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${theme.border.primary} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="Your current company or institution"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className={`${theme.bg.secondary} rounded-xl p-6 shadow-lg`}>
            <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Instagram */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Instagram size={16} className="text-pink-500" />
                  Instagram
                </label>
                <input
                  type="url"
                  name="socialMedia.instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors['socialMedia.instagram'] ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="https://instagram.com/username"
                />
                {errors['socialMedia.instagram'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['socialMedia.instagram']}</p>
                )}
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Linkedin size={16} className="text-blue-600" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="socialMedia.linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors['socialMedia.linkedin'] ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="https://linkedin.com/in/username"
                />
                {errors['socialMedia.linkedin'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['socialMedia.linkedin']}</p>
                )}
              </div>

              {/* Twitter */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Twitter size={16} className="text-blue-400" />
                  Twitter
                </label>
                <input
                  type="url"
                  name="socialMedia.twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors['socialMedia.twitter'] ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="https://twitter.com/username"
                />
                {errors['socialMedia.twitter'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['socialMedia.twitter']}</p>
                )}
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Github size={16} className={theme.text.primary} />
                  GitHub
                </label>
                <input
                  type="url"
                  name="socialMedia.github"
                  value={formData.socialMedia.github}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                    errors['socialMedia.github'] ? 'border-red-500' : theme.border.primary
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                  placeholder="https://github.com/username"
                />
                {errors['socialMedia.github'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['socialMedia.github']}</p>
                )}
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className={`${theme.bg.secondary} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Change Password</h2>
              <button
                type="button"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className={`text-sm ${theme.text.secondary} hover:${theme.text.primary} transition-colors`}
              >
                {showPasswordSection ? 'Hide' : 'Show'} Password Section
              </button>
            </div>

            {showPasswordSection && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Password */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pr-12 ${theme.bg.primary} border ${
                        errors.currentPassword ? 'border-red-500' : theme.border.primary
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme.text.muted} hover:${theme.text.primary} transition-colors`}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 ${theme.bg.primary} border ${
                      errors.newPassword ? 'border-red-500' : theme.border.primary
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                    placeholder="Enter new password"
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pr-12 ${theme.bg.primary} border ${
                        errors.confirmPassword ? 'border-red-500' : theme.border.primary
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme.text.muted} hover:${theme.text.primary} transition-colors`}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 border min-w-[140px] ${
                isLoading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105 transform'
              } ${theme.bg.primary} ${theme.border.primary} ${theme.text.primary} hover:${theme.bg.hover}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3 min-w-[140px] justify-center ${
                isLoading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transform shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
