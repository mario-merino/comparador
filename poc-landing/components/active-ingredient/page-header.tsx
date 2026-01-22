import type { ActiveIngredientDetail } from '@/types/active-ingredients';

interface PageHeaderProps {
  detail: ActiveIngredientDetail;
}

export function PageHeader({ detail }: PageHeaderProps) {
  return (
    <header className="rounded-3xl border border-primary-100/50 bg-gradient-to-b from-primary-50 to-white p-6 sm:p-10">
      <p className="text-sm font-medium text-primary-700">Principio activo</p>
      <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
        {detail.name}: precios, presentaciones y alternativas
      </h1>
      <p className="mt-4 text-base sm:text-lg text-gray-700">
        {detail.description}
      </p>
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Usos comunes</h2>
        <ul className="mt-3 space-y-2 text-gray-700">
          {detail.commonUses.map((use) => (
            <li key={use} className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>{use}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900">Avisos</h2>
        <ul className="mt-3 space-y-2 text-gray-600">
          {detail.disclaimers.map((item) => (
            <li key={item} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
