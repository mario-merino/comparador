'use client';

import { useState, useCallback } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { fetchSearchResults } from '@/lib/api/adapter';
import type { SearchEntity } from '@/lib/api/types';
import { ItemType } from '@/lib/api/types';
import { slugify } from '@/lib/utils/slug';
import Link from 'next/link';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function BuscarPage() {
  const [results, setResults] = useState<SearchEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchSearchResults(query);
      setResults(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Buscar Principio Activo o Marca
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-600">Buscando...</p>
        ) : results.length === 0 ? (
          <p className="text-gray-600">No se encontraron resultados</p>
        ) : (
          <ul className="space-y-2">
            {results.map((item) => {
              const isBrand = item.type === ItemType.BRAND;
              const name = isBrand ? item.name : item.activePrinciple;
              const href = isBrand
                ? `/marca/${slugify(item.name)}`
                : `/principio-activo/${slugify(item.activePrinciple)}`;
              return (
                <li key={`${item.type}-${name}`} className="rounded-lg border border-gray-200 p-4">
                  <Link href={href} className="block">
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">
                      {isBrand ? 'Marca' : 'Principio activo'}
                    </p>
                    <p className="text-sm text-gray-700">{item.usesSummary}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
