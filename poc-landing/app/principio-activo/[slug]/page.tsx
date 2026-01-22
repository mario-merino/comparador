import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ActiveIngredientPage({ params }: PageProps) {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">En construcción</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h1>
        <p className="mt-4 text-gray-700">
          Estamos preparando el detalle de este principio activo y su historial de precios.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
