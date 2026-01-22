'use client';

import { useMemo, useState } from 'react';
import type { PriceRow } from '@/lib/utils/active-ingredients';
import { PriceTable } from './price-table';

interface PriceComparatorProps {
  rows: PriceRow[];
  unitBaseLabel: string;
}

type SortField = 'pricePerUnit' | 'priceTotal' | 'laboratory' | 'pharmacy';
type SortDirection = 'asc' | 'desc';

export function PriceComparator({ rows, unitBaseLabel }: PriceComparatorProps) {
  const [selectedLaboratories, setSelectedLaboratories] = useState<Set<string>>(new Set());
  const [selectedPharmacies, setSelectedPharmacies] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('pricePerUnit');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const uniqueLaboratories = useMemo(() => {
    return Array.from(new Set(rows.map((row) => row.laboratory))).sort();
  }, [rows]);

  const uniquePharmacies = useMemo(() => {
    return Array.from(new Set(rows.map((row) => row.pharmacy))).sort();
  }, [rows]);

  const filteredAndSortedRows = useMemo(() => {
    let filtered = rows;

    if (selectedLaboratories.size > 0) {
      filtered = filtered.filter((row) => selectedLaboratories.has(row.laboratory));
    }

    if (selectedPharmacies.size > 0) {
      filtered = filtered.filter((row) => selectedPharmacies.has(row.pharmacy));
    }

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'pricePerUnit':
          comparison = a.pricePerUnit - b.pricePerUnit;
          break;
        case 'priceTotal':
          comparison = a.priceTotal - b.priceTotal;
          break;
        case 'laboratory':
          comparison = a.laboratory.localeCompare(b.laboratory);
          break;
        case 'pharmacy':
          comparison = a.pharmacy.localeCompare(b.pharmacy);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [rows, selectedLaboratories, selectedPharmacies, sortField, sortDirection]);

  const toggleLaboratory = (lab: string) => {
    const newSet = new Set(selectedLaboratories);
    if (newSet.has(lab)) {
      newSet.delete(lab);
    } else {
      newSet.add(lab);
    }
    setSelectedLaboratories(newSet);
  };

  const togglePharmacy = (pharmacy: string) => {
    const newSet = new Set(selectedPharmacies);
    if (newSet.has(pharmacy)) {
      newSet.delete(pharmacy);
    } else {
      newSet.add(pharmacy);
    }
    setSelectedPharmacies(newSet);
  };

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSelectedLaboratories(new Set());
    setSelectedPharmacies(new Set());
  };

  const hasActiveFilters = selectedLaboratories.size > 0 || selectedPharmacies.size > 0;

  return (
    <div className="mt-4">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-3">
            <div>
              <label htmlFor="laboratory-filter" className="block text-sm font-medium text-gray-700">
                Filtrar por laboratorio
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {uniqueLaboratories.map((lab) => {
                  const isSelected = selectedLaboratories.has(lab);
                  return (
                    <button
                      key={lab}
                      type="button"
                      onClick={() => toggleLaboratory(lab)}
                      aria-pressed={isSelected}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                        isSelected
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:text-primary-700'
                      }`}
                    >
                      {lab}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="pharmacy-filter" className="block text-sm font-medium text-gray-700">
                Filtrar por farmacia
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {uniquePharmacies.map((pharmacy) => {
                  const isSelected = selectedPharmacies.has(pharmacy);
                  return (
                    <button
                      key={pharmacy}
                      type="button"
                      onClick={() => togglePharmacy(pharmacy)}
                      aria-pressed={isSelected}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                        isSelected
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:text-primary-700'
                      }`}
                    >
                      {pharmacy}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <div>
              <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700">
                Ordenar por
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSortChange('pricePerUnit')}
                  aria-pressed={sortField === 'pricePerUnit'}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    sortField === 'pricePerUnit'
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:text-primary-700'
                  }`}
                >
                  Precio {unitBaseLabel}
                  {sortField === 'pricePerUnit' && (
                    <span className="ml-1" aria-label={`Orden ${sortDirection === 'asc' ? 'ascendente' : 'descendente'}`}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleSortChange('priceTotal')}
                  aria-pressed={sortField === 'priceTotal'}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    sortField === 'priceTotal'
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:text-primary-700'
                  }`}
                >
                  Precio total
                  {sortField === 'priceTotal' && (
                    <span className="ml-1" aria-label={`Orden ${sortDirection === 'asc' ? 'ascendente' : 'descendente'}`}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleSortChange('laboratory')}
                  aria-pressed={sortField === 'laboratory'}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    sortField === 'laboratory'
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:text-primary-700'
                  }`}
                >
                  Laboratorio
                  {sortField === 'laboratory' && (
                    <span className="ml-1" aria-label={`Orden ${sortDirection === 'asc' ? 'ascendente' : 'descendente'}`}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleSortChange('pharmacy')}
                  aria-pressed={sortField === 'pharmacy'}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    sortField === 'pharmacy'
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:text-primary-700'
                  }`}
                >
                  Farmacia
                  {sortField === 'pharmacy' && (
                    <span className="ml-1" aria-label={`Orden ${sortDirection === 'asc' ? 'ascendente' : 'descendente'}`}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-primary-700 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="rounded-lg border border-primary-200 bg-primary-50 px-4 py-2 text-sm text-primary-800">
            Mostrando {filteredAndSortedRows.length} de {rows.length} resultados
          </div>
        )}
      </div>

      <PriceTable rows={filteredAndSortedRows} unitBaseLabel={unitBaseLabel} />
    </div>
  );
}
