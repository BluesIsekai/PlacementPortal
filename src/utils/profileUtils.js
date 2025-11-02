// Utility functions for profile completion detection
export const checkProfileCompletion = (user) => {
  // Check if user object has isProfileComplete flag
  if (user && typeof user.isProfileComplete === 'boolean') {
    return user.isProfileComplete;
  }

  // Check localStorage for profile completion status
  const isComplete = localStorage.getItem('isProfileComplete');
  if (isComplete === 'true') {
    return true;
  }

  // Check if essential profile fields are filled
  const userProfile = localStorage.getItem('userProfile');
  if (userProfile) {
    try {
      const profile = JSON.parse(userProfile);
      const requiredFields = ['fullName', 'username', 'email', 'gender', 'dateOfBirth', 'phoneNumber'];
      
      const hasAllRequiredFields = requiredFields.every(field => 
        profile[field] && profile[field].toString().trim() !== ''
      );
      
      if (hasAllRequiredFields && profile.isProfileComplete) {
        return true;
      }
    } catch (error) {
      console.error('Error parsing user profile:', error);
    }
  }

  return false;
};

// Get user profile completion status from JWT token or localStorage
export const getUserProfileStatus = () => {
  // First try to get from JWT token payload
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  
  if (token) {
    try {
      // Decode JWT token (basic decode without verification for demo)
      const payload = JSON.parse(atob(token.split('.')[1] || token));
      if (payload.isProfileComplete !== undefined) {
        return {
          isComplete: payload.isProfileComplete,
          user: payload
        };
      }
    } catch (error) {
      console.log('Token decode failed, using localStorage fallback');
    }
  }

  // Fallback to localStorage check
  const isComplete = checkProfileCompletion();
  const userProfile = localStorage.getItem('userProfile');
  
  return {
    isComplete,
    user: userProfile ? JSON.parse(userProfile) : null
  };
};

// Update profile completion status
export const updateProfileCompletionStatus = (isComplete = true) => {
  localStorage.setItem('isProfileComplete', isComplete.toString());
  
  // Update user profile object if it exists
  const userProfile = localStorage.getItem('userProfile');
  if (userProfile) {
    try {
      const profile = JSON.parse(userProfile);
      profile.isProfileComplete = isComplete;
      if (isComplete) {
        profile.profileCompletedAt = new Date().toISOString();
      }
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error updating profile completion status:', error);
    }
  }
};

// Check if user should be redirected to complete profile
export const shouldRedirectToCompleteProfile = () => {
  const { isComplete } = getUserProfileStatus();
  const currentPath = window.location.pathname;
  
  // Don't redirect if already on complete-profile page or login/register pages
  const excludePaths = ['/complete-profile', '/login', '/register', '/'];
  
  if (excludePaths.includes(currentPath)) {
    return false;
  }
  
  return !isComplete;
};

// Simulate first-time login detection (in real app, this would come from backend)
export const isFirstTimeLogin = () => {
  const firstTimeFlag = localStorage.getItem('hasLoggedInBefore');
  return firstTimeFlag !== 'true';
};

// Mark user as having logged in before
export const markAsReturningUser = () => {
  localStorage.setItem('hasLoggedInBefore', 'true');
};

// Reset profile completion (for testing purposes)
export const resetProfileCompletion = () => {
  localStorage.removeItem('isProfileComplete');
  localStorage.removeItem('userProfile');
  localStorage.removeItem('hasLoggedInBefore');
  console.log('Profile completion status reset');
};
