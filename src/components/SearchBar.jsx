import React, { useState } from 'react';
import { Search, MapPin, Briefcase, X } from 'lucide-react';

const SearchBar = ({ onSearch, onClear, searchResults, isSearching, searchTerm }) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ search, location, category });
    }
  };

  const handleClear = () => {
    setSearch('');
    setLocation('');
    setCategory('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-full shadow-lg p-2.5 flex flex-col lg:flex-row items-center w-full mx-auto gap-2 lg:gap-0">
        <div className="flex items-center flex-1 pl-4 pr-2 w-full lg:w-auto">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Job title, keywords..."
            className="w-full focus:outline-none bg-transparent text-gray-700"
          />
        </div>
        
        <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

        <div className="relative flex items-center flex-1 px-4 w-full lg:w-auto">
          <MapPin className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="City or postcode"
            className="w-full focus:outline-none bg-transparent text-gray-700"
          />
        </div>

        <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

        <div className="relative flex items-center flex-1 px-4 w-full lg:w-auto">
          <Briefcase className="text-gray-400 mr-3" size={20} />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full focus:outline-none bg-transparent text-gray-700 appearance-none"
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Construction">Construction</option>
          </select>
        </div>

        <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Searching...
            </>
          ) : (
            <>
              <Search size={18} />
              Search Jobs
            </>
          )}
        </button>
      </form>

      {/* Search Results Summary */}
      {searchTerm && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-600">
            {searchResults.length > 0 ? (
              <>
                Found <span className="font-semibold text-blue-600">{searchResults.length}</span> job{searchResults.length !== 1 ? 's' : ''} 
                {searchTerm.search && ` for "${searchTerm.search}"`}
                {searchTerm.location && ` in ${searchTerm.location}`}
                {searchTerm.category && ` in ${searchTerm.category}`}
              </>
            ) : (
              <>
                No jobs found
                {searchTerm.search && ` for "${searchTerm.search}"`}
                {searchTerm.location && ` in ${searchTerm.location}`}
                {searchTerm.category && ` in ${searchTerm.category}`}
              </>
            )}
          </p>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={16} />
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

