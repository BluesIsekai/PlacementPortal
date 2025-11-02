import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: localStorage.getItem('userEmail') || '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    bio: '',
    address: '',
    profilePicture: null,
    profilePictureUrl: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle textarea key press to prevent form submission on Enter
  const handleTextareaKeyPress = (e) => {
    // Allow Enter key in textarea without submitting form
    if (e.key === 'Enter') {
      e.stopPropagation();
    }
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profilePicture: 'File size should be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        profilePicture: file,
        profilePictureUrl: URL.createObjectURL(file)
      }));
      
      setErrors(prev => ({
        ...prev,
        profilePicture: ''
      }));
    }
  };

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (step === 2) {
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (formData.phoneNumber && !/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Please enter a valid phone number';
      }
    }

    // Step 3 has no required fields - bio is optional
    // This step is just for review and final submission

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    console.log('handleNext called on step:', currentStep);
    if (validateStep(currentStep)) {
      const nextStep = Math.min(currentStep + 1, totalSteps);
      console.log('Moving to step:', nextStep);
      setCurrentStep(nextStep);
    } else {
      console.log('Validation failed for step:', currentStep);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submission triggered on step:', currentStep);
    
    // Only allow submission on the final step
    if (currentStep !== totalSteps) {
      console.log('Form submission blocked - not on final step');
      return;
    }
    
    if (!validateStep(currentStep)) {
      console.log('Form submission blocked - validation failed');
      return;
    }

    console.log('Proceeding with form submission...');
    setIsLoading(true);

    try {
      // Get token for authentication
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      // Prepare form data for submission
      const profileData = {
        ...formData,
        isProfileComplete: true,
        profileCompletedAt: new Date().toISOString()
      };

      // Try to save to backend
      try {
        const response = await fetch('http://localhost:5000/api/complete-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(profileData)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Profile completed successfully:', result);
          
          // Update localStorage with the new profile completion status
          localStorage.setItem('isProfileComplete', 'true');
          localStorage.setItem('userProfile', JSON.stringify(profileData));
        } else {
          console.warn('Backend save failed, using localStorage fallback');
        }
      } catch (error) {
        console.warn('Backend not available, using localStorage fallback:', error);
      }

      // Always save to localStorage as fallback
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      localStorage.setItem('isProfileComplete', 'true');

      // Show success message
      alert('🎉 Profile completed successfully! Welcome to the platform!');
      
      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error completing profile:', error);
      alert('Failed to complete profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          👋 Welcome! Let's set up your profile
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tell us a bit about yourself to get started
        </p>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 flex items-center justify-center">
            {formData.profilePictureUrl ? (
              <img src={formData.profilePictureUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">👤</span>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </label>
        </div>
        {errors.profilePicture && <p className="text-red-500 text-sm mt-2">{errors.profilePicture}</p>}
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.fullName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500'
            } focus:ring-2 focus:border-transparent transition-all`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.username 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500'
            } focus:ring-2 focus:border-transparent transition-all`}
            placeholder="Choose a username"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!!localStorage.getItem('userEmail')}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500'
            } focus:ring-2 focus:border-transparent transition-all ${
              localStorage.getItem('userEmail') ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.gender 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500'
            } focus:ring-2 focus:border-transparent transition-all`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.dateOfBirth 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500'
            } focus:ring-2 focus:border-transparent transition-all`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📞 Contact Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Let's add your contact details
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phoneNumber 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500'
            } focus:ring-2 focus:border-transparent transition-all`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address (Optional)
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:ring-2 focus:border-transparent transition-all resize-none"
            placeholder="Enter your address"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ✨ Tell us about yourself
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add a bio to let others know more about you (optional but recommended)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio / About Me
          <span className="text-gray-500 text-xs ml-1">(Optional)</span>
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          onKeyPress={handleTextareaKeyPress}
          onKeyDown={(e) => {
            // Prevent form submission on Enter key
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          rows={5}
          maxLength={500}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:ring-2 focus:border-transparent transition-all resize-none"
          placeholder="Tell us about yourself, your interests, goals, career aspirations, hobbies, or anything you'd like to share with others..."
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formData.bio.length}/500 characters
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            💡 A good bio helps others understand who you are!
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
          💡 Pro Tips for your bio:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Mention your field of study or career interests</li>
          <li>• Share your goals and aspirations</li>
          <li>• Include hobbies or personal interests</li>
          <li>• Keep it professional yet personal</li>
        </ul>
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📋 Profile Summary
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p><span className="font-medium">Name:</span> {formData.fullName}</p>
          <p><span className="font-medium">Username:</span> {formData.username}</p>
          <p><span className="font-medium">Email:</span> {formData.email}</p>
          <p><span className="font-medium">Phone:</span> {formData.phoneNumber}</p>
          <p><span className="font-medium">Gender:</span> {formData.gender}</p>
          <p><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}</p>
          {formData.address && <p><span className="font-medium">Address:</span> {formData.address}</p>}
          {formData.bio ? (
            <p><span className="font-medium">Bio:</span> {formData.bio.substring(0, 100)}{formData.bio.length > 100 ? '...' : ''}</p>
          ) : (
            <p className="text-gray-500 italic">No bio added yet</p>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ Ready to complete your profile? Click "Save & Continue" below!
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <form 
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              // Prevent form submission on Enter key unless it's the submit button
              if (e.key === 'Enter' && e.target.type !== 'submit') {
                e.preventDefault();
                console.log('Form submission prevented via Enter key');
              }
            }}
          >
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                }`}
              >
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all"
                >
                  Next Step ({currentStep + 1}/{totalSteps})
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Submit button clicked on step', currentStep);
                    if (currentStep === totalSteps) {
                      handleSubmit(e);
                    } else {
                      console.log('Submit blocked - not on final step');
                    }
                  }}
                  className={`px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    '🎉 Complete Profile & Continue'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
