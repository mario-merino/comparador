import { formatDateShort, formatPrice } from '@/lib/utils/format';
import type { PriceHistoryPoint } from '@/types/active-ingredients';

interface HistoryTableProps {
  history: PriceHistoryPoint[];
  unitBaseLabel: string;
}

export function HistoryTable({ history, unitBaseLabel }: HistoryTableProps) {
  if (history.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No contamos con historial suficiente para este grupo.
      </p>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full text-left text-sm text-gray-700">
        <caption className="sr-only">
          Historial mensual de precios mínimos y promedio por unidad.
        </caption>
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th scope="col" className="px-4 py-3">
              Mes
            </th>
            <th scope="col" className="px-4 py-3">
              Precio mínimo {unitBaseLabel}
            </th>
            <th scope="col" className="px-4 py-3">
              Precio promedio {unitBaseLabel}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {history.map((item) => (
            <tr key={item.dateISO}>
              <td className="px-4 py-3 font-medium text-gray-900">
                {formatDateShort(item.dateISO)}
              </td>
              <td className="px-4 py-3">{formatPrice(Math.round(item.minPricePerUnit))}</td>
              <td className="px-4 py-3">{formatPrice(Math.round(item.avgPricePerUnit))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
