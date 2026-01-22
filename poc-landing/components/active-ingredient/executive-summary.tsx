import { formatDate } from '@/lib/utils/format';

interface ExecutiveSummaryProps {
  groupCount: number;
  pharmacyCount: number;
  latestUpdatedAtISO: string | null;
}

export function ExecutiveSummary({
  groupCount,
  pharmacyCount,
  latestUpdatedAtISO,
}: ExecutiveSummaryProps) {
  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900">Resumen ejecutivo</h2>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <dt className="text-sm text-gray-600">Presentaciones disponibles</dt>
          <dd className="mt-2 text-2xl font-semibold text-gray-900">
            {groupCount}
          </dd>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <dt className="text-sm text-gray-600">Farmacias comparadas</dt>
          <dd className="mt-2 text-2xl font-semibold text-gray-900">
            {pharmacyCount}
          </dd>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <dt className="text-sm text-gray-600">Última actualización</dt>
          <dd className="mt-2 text-base font-semibold text-gray-900">
            {latestUpdatedAtISO ? formatDate(latestUpdatedAtISO) : 'Sin datos'}
          </dd>
        </div>
      </dl>
    </section>
  );
}
