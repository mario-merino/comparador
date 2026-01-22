"use client";

import { useId, useMemo, useState } from 'react';

interface LaboratoryFilterProps {
  laboratories: Array<{ name: string; count: number }>;
}

export function LaboratoryFilter({ laboratories }: LaboratoryFilterProps) {
  const [query, setQuery] = useState('');
  const inputId = useId();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return laboratories;
    return laboratories.filter((lab) => lab.name.toLowerCase().includes(normalized));
  }, [laboratories, query]);

  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
      <label className="text-sm font-semibold text-gray-800" htmlFor={inputId}>
        Filtrar laboratorios
      </label>
      <input
        id={inputId}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Busca un laboratorio"
        className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      />
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {filtered.length === 0 ? (
          <li className="text-gray-500">No hay coincidencias.</li>
        ) : (
          filtered.map((lab) => (
            <li
              key={lab.name}
              className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2"
            >
              <span>{lab.name}</span>
              <span className="text-xs font-semibold text-gray-500">
                {lab.count} productos
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
