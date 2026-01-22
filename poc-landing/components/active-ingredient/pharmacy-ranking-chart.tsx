import type { PharmacyRankingRow } from '@/lib/utils/active-ingredients';

interface PharmacyRankingChartProps {
  rows: PharmacyRankingRow[];
}

export function PharmacyRankingChart({ rows }: PharmacyRankingChartProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No hay suficiente información para construir el ranking.
      </p>
    );
  }

  const maxPercent = Math.max(...rows.map((r) => r.percentDaysWithMin), 100);
  const barHeight = 32;
  const barSpacing = 12;
  const chartWidth = 600;
  const labelWidth = 140;
  const barChartWidth = chartWidth - labelWidth - 40;
  const totalHeight = rows.length * (barHeight + barSpacing) - barSpacing;

  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white p-4">
      <div className="min-w-[600px]">
        <svg
          width={chartWidth}
          height={totalHeight + 40}
          viewBox={`0 0 ${chartWidth} ${totalHeight + 40}`}
          role="img"
          aria-label="Ranking de farmacias"
        >
          <title>Ranking de farmacias de los últimos 90 días</title>
          <desc>
            Gráfico de barras horizontales mostrando el porcentaje de días con precio mínimo y la
            posición promedio de cada farmacia.
          </desc>

          {/* Bars */}
          {rows.map((row, index) => {
            const y = 20 + index * (barHeight + barSpacing);
            const barWidth = (row.percentDaysWithMin / maxPercent) * barChartWidth;
            const barColor = index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#6366f1';

            return (
              <g key={row.pharmacy}>
                {/* Pharmacy name */}
                <text
                  x={labelWidth - 8}
                  y={y + barHeight / 2 + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#111827"
                  fontWeight="500"
                >
                  {row.pharmacy}
                </text>

                {/* Bar background */}
                <rect
                  x={labelWidth + 8}
                  y={y}
                  width={barChartWidth}
                  height={barHeight}
                  fill="#f3f4f6"
                  rx="4"
                />

                {/* Bar */}
                <rect
                  x={labelWidth + 8}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={barColor}
                  rx="4"
                />

                {/* Percentage label */}
                <text
                  x={labelWidth + 12 + barWidth}
                  y={y + barHeight / 2 + 4}
                  fontSize="11"
                  fill="#111827"
                  fontWeight="500"
                >
                  {row.percentDaysWithMin}%
                </text>

                {/* Position badge */}
                <circle
                  cx={labelWidth + barChartWidth + 24}
                  cy={y + barHeight / 2}
                  r="12"
                  fill="#ffffff"
                  stroke="#d1d5db"
                  strokeWidth="1"
                />
                <text
                  x={labelWidth + barChartWidth + 24}
                  y={y + barHeight / 2 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#374151"
                  fontWeight="600"
                >
                  {Math.round(row.averagePosition)}
                </text>

                {/* Tooltip title */}
                <title>
                  {row.pharmacy}: {row.percentDaysWithMin}% días con precio mínimo, posición
                  promedio {row.averagePosition}
                </title>
              </g>
            );
          })}

          {/* X-axis label */}
          <text
            x={labelWidth + 8 + barChartWidth / 2}
            y={totalHeight + 35}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            % días con precio mínimo
          </text>
        </svg>
      </div>

      {/* Accessible table for screen readers */}
      <table className="sr-only">
        <caption>Ranking de farmacias de los últimos 90 días</caption>
        <thead>
          <tr>
            <th scope="col">Farmacia</th>
            <th scope="col">% días con mínimo</th>
            <th scope="col">Posición promedio</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.pharmacy}>
              <td>{row.pharmacy}</td>
              <td>{row.percentDaysWithMin}%</td>
              <td>{row.averagePosition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
