import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to dark
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? JSON.parse(saved) : true; // Default to dark mode
    }
    return true;
  });

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = {
    isDark,
    toggleTheme,
    // Theme-specific classes
    bg: {
      primary: isDark ? 'bg-slate-950' : 'bg-gray-100',
      secondary: isDark ? 'bg-slate-900' : 'bg-white',
      tertiary: isDark ? 'bg-slate-800' : 'bg-gray-50',
      card: isDark ? 'bg-slate-900/60' : 'bg-white',
      hover: isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-50',
      cardHover: isDark ? 'hover:bg-slate-800/40' : 'hover:bg-gray-50',
      navbar: isDark ? 'bg-slate-950/80' : 'bg-white/80',
      overlay: isDark ? 'bg-black/70' : 'bg-black/20',
    },
    text: {
      primary: isDark ? 'text-slate-100' : 'text-gray-900',
      secondary: isDark ? 'text-slate-300' : 'text-gray-700',
      tertiary: isDark ? 'text-slate-400' : 'text-gray-500',
      muted: isDark ? 'text-slate-500' : 'text-gray-400',
      accent: isDark ? 'text-indigo-400' : 'text-indigo-600',
    },
    border: {
      primary: isDark ? 'border-slate-800' : 'border-gray-200',
      secondary: isDark ? 'border-slate-700' : 'border-gray-300',
      hover: isDark ? 'hover:border-indigo-500/30' : 'hover:border-indigo-300',
    },
    shadow: {
      card: isDark ? 'shadow-xl' : 'shadow-md',
      hover: isDark ? 'shadow-2xl' : 'shadow-lg',
    },
    button: {
      primary: isDark ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white',
      secondary: isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700' : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-200',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
