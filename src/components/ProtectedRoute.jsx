import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserProfileStatus } from '../utils/profileUtils';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    shouldRedirectToCompleteProfile: false
  });

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      try {
        // Check if user is authenticated
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const isLoggedIn = !!token;
        
        if (isLoggedIn) {
          // Check if profile is complete
          const { isComplete } = getUserProfileStatus();
          const currentPath = location.pathname;
          
          // Pages that don't require profile completion or authentication
          const publicPaths = ['/complete-profile', '/login', '/register', '/', '/features'];
          const protectedPaths = ['/dashboard', '/profile', '/settings', '/notifications', '/quizzes', '/companies', '/coding', '/reports', '/schedule', '/progress-report'];
          
          if (protectedPaths.includes(currentPath) && !isComplete) {
            setAuthState({
              isAuthenticated: true,
              shouldRedirectToCompleteProfile: true
            });
          } else {
            setAuthState({
              isAuthenticated: true,
              shouldRedirectToCompleteProfile: false
            });
          }
        } else {
          // Check if trying to access protected route without authentication
          const protectedPaths = ['/dashboard', '/profile', '/settings', '/notifications', '/quizzes', '/companies', '/coding', '/reports', '/schedule', '/progress-report', '/complete-profile'];
          
          if (protectedPaths.includes(location.pathname)) {
            setAuthState({
              isAuthenticated: false,
              shouldRedirectToCompleteProfile: false
            });
          } else {
            setAuthState({
              isAuthenticated: false,
              shouldRedirectToCompleteProfile: false
            });
          }
        }
      } catch (error) {
        console.error('Error checking auth and profile status:', error);
        setAuthState({
          isAuthenticated: false,
          shouldRedirectToCompleteProfile: false
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndProfile();
  }, [location.pathname]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/profile', '/settings', '/notifications', '/quizzes', '/companies', '/coding', '/reports', '/schedule', '/progress-report', '/complete-profile'];
  
  // If not authenticated and trying to access protected route, redirect to login
  if (!authState.isAuthenticated && protectedPaths.includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but profile incomplete, redirect to complete profile
  if (authState.isAuthenticated && authState.shouldRedirectToCompleteProfile) {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
