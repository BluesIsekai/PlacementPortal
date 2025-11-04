import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userName');
      const userData = localStorage.getItem('user');

      let storedUser = null;
      if (userData) {
        try {
          storedUser = JSON.parse(userData);
        } catch (error) {
          console.warn('Failed to parse stored user data, clearing corrupted state');
          localStorage.removeItem('user');
        }
      }

      const hasProfile = storedUser?.isProfileComplete || localStorage.getItem('isProfileComplete') === 'true';

      if (token && userEmail && hasProfile) {
        setIsAuthenticated(true);
        
        // Set user data from localStorage
        let userInfo = { email: userEmail };
        if (userName) userInfo.name = userName;
        if (storedUser) {
          userInfo = { ...userInfo, ...storedUser };
        }
        setUser(userInfo);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    try {
      // Store authentication data
      localStorage.setItem('token', token);
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', userData.email);
      if (userData.name) localStorage.setItem('userName', userData.name);
      localStorage.setItem('user', JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
      
      console.log('✅ User logged in successfully');
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint if available
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        if (token) {
          await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        }
      } catch (backendError) {
        console.warn('Backend logout failed (continuing with local logout):', backendError);
      }

      // Clear all authentication and user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('user');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('isProfileComplete');

      // Clear state
      setIsAuthenticated(false);
      setUser(null);

      console.log('✅ User logged out successfully');
      
      // Force redirect to landing page with window.location for immediate effect
      window.location.href = '/';
      
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
