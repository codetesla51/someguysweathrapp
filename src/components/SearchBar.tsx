import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const { 
    searchLocations, 
    searchResults, 
    setLocation 
  } = useWeather();
  
  // Handle input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 2) {
      searchLocations(value);
    }
  };
  
  // Handle selection of a location
  const handleSelectLocation = (lat: number, lon: number, name: string, country: string) => {
    setLocation({
      lat,
      lon,
      name,
      country
    });
    setQuery('');
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };
  
  // Handle clearing search input
  const handleClearSearch = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for a city..."
          className="w-full py-2 pl-10 pr-10 rounded-full 
                    bg-white/20 backdrop-blur-md
                    border border-white/30
                    text-white placeholder-white/70
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-white/50
                    focus:bg-white/30"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={18} className="text-white/70" />
        </div>
        
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X size={18} className="text-white/70 hover:text-white transition-colors" />
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {isFocused && searchResults.length > 0 && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-white/90 backdrop-blur-md 
                      rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
          >
            {searchResults.map((result, index) => (
              <div
                key={`${result.lat}-${result.lon}-${index}`}
                onClick={() => handleSelectLocation(
                  result.lat, 
                  result.lon, 
                  result.name, 
                  result.country
                )}
                className="px-4 py-3 flex items-center cursor-pointer
                          hover:bg-white/80 transition-colors
                          border-b border-gray-200 last:border-0"
              >
                <MapPin size={16} className="text-gray-500 mr-2" />
                <div className="text-gray-800">
                  <span className="font-medium">{result.name}</span>
                  <span className="text-gray-500 ml-1">
                    {result.state ? `${result.state}, ` : ''}
                    {result.country}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;