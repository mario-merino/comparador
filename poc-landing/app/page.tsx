import Link from 'next/link';
import { HomeSearch } from '@/components/search/home-search';
import { fetchActiveIngredients, fetchBrands } from '@/lib/api/adapter';
import { slugify } from '@/lib/utils/slug';

export const revalidate = 14400;

export default async function HomePage() {
  const [popularIngredients, popularBrands] = await Promise.all([
    fetchActiveIngredients(),
    fetchBrands(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <section className="text-center mb-14 rounded-3xl bg-gradient-to-b from-primary-50 to-white p-8 sm:p-12 border border-primary-100/40 shadow-sm">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Compara Precios de Medicamentos
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Encuentra el mejor precio para tu medicamento en diferentes farmacias.
        </p>
        <div className="max-w-2xl mx-auto">
          <HomeSearch />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Búsquedas rápidas y datos claros para decidir mejor.
        </p>
      </section>

      <section className="mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Principios Activos Populares
              </h2>
            </div>
            <div className="max-h-[640px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularIngredients.map((ingredient) => {
                  const slug = slugify(ingredient.activePrinciple);
                  return (
                    <Link
                      key={ingredient.activePrinciple}
                      href={`/principio-activo/${slug}`}
                      className="block p-6 border border-gray-200 rounded-2xl bg-white hover:border-primary-300 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {ingredient.activePrinciple}
                      </h3>
                      <p className="text-sm text-gray-700 mt-2">
                        {ingredient.usesSummary ?? 'Usos principales disponibles en detalle.'}
                      </p>
                      <p className="text-sm text-gray-800 mt-4">
                        <span className="font-medium text-gray-800">Formas disponibles:</span>{' '}
                        {ingredient.forms && ingredient.forms.length > 0
                          ? ingredient.forms.join(', ')
                          : ingredient.format.toLowerCase()}
                      </p>
                      <span className="mt-5 inline-flex items-center rounded-md bg-primary-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
                        Ver precios
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Marcas Populares
              </h2>
            </div>
            <div className="max-h-[640px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularBrands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={`/marca/${slugify(brand.name)}`}
                    className="block rounded-2xl border border-gray-200 bg-white p-5 hover:border-primary-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    <p className="text-lg font-semibold text-gray-900">{brand.name}</p>
                    <p className="text-sm text-gray-700 mt-2">{brand.usesSummary}</p>
                    <span className="mt-4 inline-flex items-center rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-primary-400 hover:text-primary-700">
                      Ver marca
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          ¿Cómo funciona?
        </h2>
        <ul className="space-y-3 text-gray-800">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>
              Busca por principio activo para ver todos los productos disponibles
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>Compara precios entre diferentes farmacias en tiempo real</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">✓</span>
            <span>Revisa el historial de precios para tomar la mejor decisión</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
