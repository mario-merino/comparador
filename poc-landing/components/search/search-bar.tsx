'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function SearchBar({
  onSearch,
  placeholder = 'Busca por principio activo o marca...',
  debounceMs = 300,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, onSearch, debounceMs]);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search
          className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 sm:text-sm"
        placeholder={placeholder}
        aria-label="Buscar principio activo"
      />
    </div>
  );
}
