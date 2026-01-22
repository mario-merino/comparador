import { formatPrice } from '@/lib/utils/format';
import type { PriceRow } from '@/lib/utils/active-ingredients';

interface PriceTableProps {
  rows: PriceRow[];
  unitBaseLabel: string;
}

export function PriceTable({ rows, unitBaseLabel }: PriceTableProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No hay precios disponibles para esta presentación.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <div className="space-y-4 sm:hidden">
        {rows.map((row) => (
          <article
            key={`${row.productId}-${row.pharmacy}`}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="text-xs font-semibold text-gray-500">Producto</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {row.productName}
            </div>
            {row.tags.includes('generic') && (
              <span className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Genérico
              </span>
            )}
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs font-semibold text-gray-500">Laboratorio</div>
                <div className="mt-1 text-gray-800">{row.laboratory}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500">Pack</div>
                <div className="mt-1 text-gray-800">{row.packLabel}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500">Precio total</div>
                <div className="mt-1 text-gray-800">{formatPrice(row.priceTotal)}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500">
                  Precio {unitBaseLabel}
                </div>
                <div className="mt-1 text-gray-800">
                  {formatPrice(Math.round(row.pricePerUnit))}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-xs font-semibold text-gray-500">Farmacia</div>
                <div className="mt-1 text-gray-800">{row.pharmacy}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden sm:block">
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-left text-sm text-gray-700">
            <caption className="sr-only">
              Tabla comparativa de precios por producto y farmacia.
            </caption>
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Producto
                </th>
                <th scope="col" className="px-4 py-3">
                  Laboratorio
                </th>
                <th scope="col" className="px-4 py-3">
                  Pack
                </th>
                <th scope="col" className="px-4 py-3">
                  Precio total
                </th>
                <th scope="col" className="px-4 py-3">
                  Precio {unitBaseLabel}
                </th>
                <th scope="col" className="px-4 py-3">
                  Farmacia
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={`${row.productId}-${row.pharmacy}`}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <div className="flex flex-wrap items-center gap-2">
                      <span>{row.productName}</span>
                      {row.tags.includes('generic') && (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                          Genérico
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.laboratory}</td>
                  <td className="px-4 py-3">{row.packLabel}</td>
                  <td className="px-4 py-3">{formatPrice(row.priceTotal)}</td>
                  <td className="px-4 py-3">
                    {formatPrice(Math.round(row.pricePerUnit))}
                  </td>
                  <td className="px-4 py-3">{row.pharmacy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
