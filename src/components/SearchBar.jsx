import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ placeholder = "Search users, skills, colleges...", className = "" }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-4 w-4 ${theme.text.tertiary}`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`w-full pl-10 pr-10 py-2 border ${theme.border.primary} rounded-lg ${theme.bg.tertiary} ${theme.text.primary} placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm`}
          placeholder={placeholder}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700"
          >
            <X className={`h-4 w-4 ${theme.text.tertiary} hover:${theme.text.secondary}`} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
