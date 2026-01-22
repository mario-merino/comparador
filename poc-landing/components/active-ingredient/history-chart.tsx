import { formatDateShort, formatPrice } from '@/lib/utils/format';
import type { PriceHistoryPoint } from '@/types/active-ingredients';

interface HistoryChartProps {
  history: PriceHistoryPoint[];
  unitBaseLabel: string;
}

export function HistoryChart({ history, unitBaseLabel }: HistoryChartProps) {
  if (history.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No contamos con historial suficiente para este grupo.
      </p>
    );
  }

  // Responsive dimensions - usar viewBox para hacerlo responsive
  const baseWidth = 800;
  const baseHeight = 300;
  const padding = { top: 20, right: 40, bottom: 40, left: 60 };
  
  const chartWidth = baseWidth - padding.left - padding.right;
  const chartHeight = baseHeight - padding.top - padding.bottom;

  const minValues = history.map((h) => h.minPricePerUnit);
  const avgValues = history.map((h) => h.avgPricePerUnit);
  const allValues = [...minValues, ...avgValues];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue || 1;

  const xScale = (index: number) =>
    padding.left + (index / (history.length - 1 || 1)) * chartWidth;
  const yScale = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;

  const minPath = history
    .map((h, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(h.minPricePerUnit)}`)
    .join(' ');

  const avgPath = history
    .map((h, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(h.avgPricePerUnit)}`)
    .join(' ');

  const gridLines = 5;
  const gridValues: number[] = [];
  for (let i = 0; i <= gridLines; i++) {
    gridValues.push(minValue + (valueRange / gridLines) * i);
  }

  return (
    <>
      {/* Tabla para mobile */}
      <div className="mt-4 sm:hidden overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm text-gray-700">
          <caption className="sr-only">
            Historial mensual de precios mínimos y promedio por unidad
          </caption>
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th scope="col" className="px-3 py-2.5">
                Mes
              </th>
              <th scope="col" className="px-3 py-2.5">
                Mínimo {unitBaseLabel}
              </th>
              <th scope="col" className="px-3 py-2.5">
                Promedio {unitBaseLabel}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((item) => (
              <tr key={item.dateISO}>
                <td className="px-3 py-2.5 font-medium text-gray-900">
                  {formatDateShort(item.dateISO)}
                </td>
                <td className="px-3 py-2.5">{formatPrice(Math.round(item.minPricePerUnit))}</td>
                <td className="px-3 py-2.5">{formatPrice(Math.round(item.avgPricePerUnit))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráfico para desktop */}
      <div className="mt-4 hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
        <div className="min-w-[720px]">
          <svg
            width={baseWidth}
            height={baseHeight}
            viewBox={`0 0 ${baseWidth} ${baseHeight}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Gráfico de historial de precios por unidad"
            className="block"
          >
            <title>Historial mensual de precios mínimos y promedio por unidad</title>
            <desc>
              Gráfico de líneas mostrando la evolución de precios mínimos y promedio por unidad a lo
              largo del tiempo. Los valores están expresados en {unitBaseLabel}.
            </desc>

            {/* Grid lines */}
            {gridValues.map((value, i) => {
              const y = yScale(value);
              return (
                <g key={`grid-${i}`}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={baseWidth - padding.right}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="12"
                    fill="#6b7280"
                  >
                    {formatPrice(Math.round(value))}
                  </text>
                </g>
              );
            })}

            {/* X-axis labels */}
            {history.map((h, i) => {
              const x = xScale(i);
              const date = new Date(h.dateISO);
              const monthLabel = date.toLocaleDateString('es-CL', { month: 'short' });
              return (
                <g key={`x-label-${i}`}>
                  <line
                    x1={x}
                    y1={baseHeight - padding.bottom}
                    x2={x}
                    y2={baseHeight - padding.bottom + 5}
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={baseHeight - padding.bottom + 22}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#6b7280"
                  >
                    {monthLabel}
                  </text>
                </g>
              );
            })}

            {/* Chart area background */}
            <rect
              x={padding.left}
              y={padding.top}
              width={chartWidth}
              height={chartHeight}
              fill="#f9fafb"
              opacity="0.5"
            />

            {/* Average line */}
            <path
              d={avgPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Min line */}
            <path
              d={minPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points - Average */}
            {history.map((h, i) => {
              const x = xScale(i);
              const y = yScale(h.avgPricePerUnit);
              return (
                <g key={`avg-point-${i}`}>
                  <circle cx={x} cy={y} r="4.5" fill="#3b82f6" />
                  <title>
                    {formatDateShort(h.dateISO)}: Promedio {formatPrice(Math.round(h.avgPricePerUnit))}
                  </title>
                </g>
              );
            })}

            {/* Data points - Min */}
            {history.map((h, i) => {
              const x = xScale(i);
              const y = yScale(h.minPricePerUnit);
              return (
                <g key={`min-point-${i}`}>
                  <circle cx={x} cy={y} r="4.5" fill="#10b981" />
                  <title>
                    {formatDateShort(h.dateISO)}: Mínimo {formatPrice(Math.round(h.minPricePerUnit))}
                  </title>
                </g>
              );
            })}

            {/* Legend */}
            <g transform={`translate(${baseWidth - padding.right - 120}, ${padding.top + 8})`}>
              <line x1="0" y1="0" x2="22" y2="0" stroke="#10b981" strokeWidth="2.5" />
              <text x="28" y="4" fontSize="12" fill="#374151">
                Mínimo
              </text>
              <line x1="0" y1="16" x2="22" y2="16" stroke="#3b82f6" strokeWidth="2.5" />
              <text x="28" y="20" fontSize="12" fill="#374151">
                Promedio
              </text>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
