import Link from 'next/link';
import type { ActiveIngredientIndexItem } from '@/types/active-ingredients';

interface RelatedLinksProps {
  items: ActiveIngredientIndexItem[];
}

export function RelatedLinks({ items }: RelatedLinksProps) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900">Alternativas relacionadas</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/principio-activo/${item.slug}`}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:border-primary-300 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
