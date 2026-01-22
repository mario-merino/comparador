'use client';

import Link from 'next/link';
import type { SearchGeneric } from '@/lib/api/types';

interface SearchResultsProps {
  results: SearchGeneric[];
  isLoading?: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-4 text-center text-gray-500">
        <p>Buscando...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mt-4 text-center text-gray-500">
        <p>No se encontraron resultados</p>
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {results.map((result) => {
        const slug = result.activePrinciple
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');

        return (
          <li key={result.activePrinciple}>
            <Link
              href={`/principio-activo/${slug}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">
                {result.activePrinciple}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {result.concentration} • {result.format}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {result.productsConsolidated} producto
                {result.productsConsolidated !== 1 ? 's' : ''} disponible
                {result.productsConsolidated !== 1 ? 's' : ''}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
