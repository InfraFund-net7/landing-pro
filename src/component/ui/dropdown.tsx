'use client';

import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  key: string;
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string, key: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    onChange?.(option.value, option.key);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-left text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out flex items-center justify-between"
      >
        <span className={selectedOption ? 'text-slate-200' : 'text-slate-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="py-1 max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors duration-200 ease-in-out ${
                selectedValue === option.value
                  ? 'bg-slate-700 text-primary'
                  : 'text-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
