
import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import debounce from 'lodash/debounce';
import { Doctor } from '@/data/mockDoctors';

interface AutocompleteHeaderProps {
  doctors: Doctor[];
  onSearch: (filteredDoctors: Doctor[]) => void;
}

const AutocompleteHeader = ({ doctors, onSearch }: AutocompleteHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (!term.trim()) {
        setSuggestions([]);
        onSearch(doctors);
        return;
      }

      const filtered = doctors
        .filter(doctor =>
          doctor.name.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 3);

      setSuggestions(filtered);
      onSearch(filtered);
    }, 300),
    [doctors, onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    setIsDropdownVisible(searchTerm.length > 0);
  }, [searchTerm, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    setSearchTerm(doctor.name);
    setIsDropdownVisible(false);
    onSearch([doctor]);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto pt-8 px-4">
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            data-testid="autocomplete-input"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for doctors..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 shadow-sm outline-none text-gray-800 placeholder:text-gray-400"
          />
        </div>

        {isDropdownVisible && suggestions.length > 0 && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50 transition-all duration-200">
            {suggestions.map((doctor, index) => (
              <div
                key={doctor.name}
                data-testid="suggestion-item"
                onClick={() => handleSuggestionClick(doctor)}
                className={`px-4 py-3 cursor-pointer hover:bg-purple-50 transition-colors duration-150
                  ${index !== suggestions.length - 1 ? 'border-b border-gray-100' : ''}
                `}
              >
                <div className="font-medium text-gray-800">{doctor.name}</div>
                <div className="text-sm text-gray-500">
                  {doctor.specialty.join(', ')} • {doctor.experience}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutocompleteHeader;
