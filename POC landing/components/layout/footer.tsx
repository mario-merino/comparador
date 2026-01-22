export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700 text-center sm:text-left">
            Comparador de precios de medicamentos. Información actualizada regularmente.
          </p>
          <p className="text-xs text-gray-500 text-center sm:text-right">
            Datos referenciales. Verifica siempre en la farmacia.
          </p>
        </div>
      </div>
    </footer>
  );
}
