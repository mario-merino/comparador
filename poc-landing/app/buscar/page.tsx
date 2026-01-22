'use client';

import { useState, useCallback } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { fetchActiveIngredients } from '@/lib/api/adapter';
import type { SearchGeneric } from '@/lib/api/types';

export default function BuscarPage() {
  const [results, setResults] = useState<SearchGeneric[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchActiveIngredients(query);
      setResults(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Buscar Principio Activo
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-600">Buscando...</p>
        ) : results.length === 0 ? (
          <p className="text-gray-600">No se encontraron resultados</p>
        ) : (
          <ul className="space-y-2">
            {results.map((item) => (
              <li key={item.activePrinciple} className="rounded-lg border border-gray-200 p-4">
                <p className="font-semibold text-gray-900">{item.activePrinciple}</p>
                <p className="text-sm text-gray-700">{item.usesSummary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
