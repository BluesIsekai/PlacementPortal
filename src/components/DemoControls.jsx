import React from 'react';
import { resetProfileCompletion } from '../utils/profileUtils';

const DemoControls = () => {
  const handleResetProfile = () => {
    resetProfileCompletion();
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    alert('Profile reset! You can now test the first-time user flow. Please refresh the page and try logging in.');
  };

  const handleSimulateFirstLogin = () => {
    // Create a demo token for authentication
    localStorage.setItem('token', 'demo-jwt-token-' + Date.now());
    localStorage.setItem('userEmail', 'demo@example.com');
    
    // Remove profile completion to simulate first-time user
    localStorage.removeItem('isProfileComplete');
    localStorage.removeItem('userProfile');
    
    window.location.href = '/complete-profile';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Demo Controls</h3>
      <div className="space-y-2">
        <button
          onClick={handleSimulateFirstLogin}
          className="w-full text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors"
        >
          🚀 Test Complete Profile Flow
        </button>
        <button
          onClick={handleResetProfile}
          className="w-full text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-colors"
        >
          🔄 Reset Profile Data
        </button>
      </div>
    </div>
  );
};

export default DemoControls;
