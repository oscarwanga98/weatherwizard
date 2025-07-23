import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { LocationSearch } from "@shared/weather-schema";

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

export function SearchBar({ onLocationSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: searchResults = [] } = useQuery<LocationSearch[]>({
    queryKey: ['/api/search', debouncedQuery],
    enabled: debouncedQuery.length > 2,
  });

  useEffect(() => {
    setShowResults(debouncedQuery.length > 2 && searchResults.length > 0);
  }, [debouncedQuery, searchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationClick = (location: LocationSearch) => {
    onLocationSelect(location.lat, location.lon);
    setQuery(`${location.name}, ${location.country}`);
    setShowResults(false);
  };

  return (
    <div className="mb-8">
      <div className="relative max-w-md mx-auto" ref={searchRef}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className="fas fa-search text-gray-400"></i>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => debouncedQuery.length > 2 && searchResults.length > 0 && setShowResults(true)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
          placeholder="Search for a city..."
        />
        
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
            {searchResults.map((location: LocationSearch, index: number) => (
              <div
                key={`${location.lat}-${location.lon}`}
                onClick={() => handleLocationClick(location)}
                className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {location.name}
                  {location.state && `, ${location.state}`}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {location.country}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
