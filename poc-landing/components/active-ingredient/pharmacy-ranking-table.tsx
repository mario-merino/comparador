import type { PharmacyRankingRow } from '@/lib/utils/active-ingredients';

interface PharmacyRankingTableProps {
  rows: PharmacyRankingRow[];
}

export function PharmacyRankingTable({ rows }: PharmacyRankingTableProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No hay suficiente información para construir el ranking.
      </p>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full text-left text-sm text-gray-700">
        <caption className="sr-only">
          Ranking de farmacias de los últimos 90 días.
        </caption>
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th scope="col" className="px-4 py-3">
              Farmacia
            </th>
            <th scope="col" className="px-4 py-3">
              % días con mínimo
            </th>
            <th scope="col" className="px-4 py-3">
              Posición promedio
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.pharmacy}>
              <td className="px-4 py-3 font-medium text-gray-900">{row.pharmacy}</td>
              <td className="px-4 py-3">{row.percentDaysWithMin}%</td>
              <td className="px-4 py-3">{row.averagePosition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
