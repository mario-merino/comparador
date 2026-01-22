import Link from 'next/link';

export function ErrorState() {
  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-xl font-semibold text-red-800">
        No pudimos cargar esta página
      </h2>
      <p className="mt-3 text-sm text-red-700">
        Intenta nuevamente en unos minutos. Si el problema persiste, vuelve al inicio.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex items-center justify-center rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
