interface FaqsProps {
  activeIngredientName: string;
}

const FAQS = [
  {
    question: '¿Los precios incluyen todas las farmacias?',
    answer:
      'Comparamos farmacias disponibles en la base actual. Puede variar según cobertura y stock.',
  },
  {
    question: '¿Cada cuánto se actualiza la información?',
    answer:
      'Actualizamos y revalidamos los datos varias veces al día con un máximo de 4 horas.',
  },
  {
    question: '¿Qué significa “precio por unidad”?',
    answer:
      'Es el costo estimado por comprimido, cápsula o porción según el pack informado.',
  },
  {
    question: '¿Puedo confiar en estos datos para decidir?',
    answer:
      'La información es referencial y no reemplaza la recomendación de un profesional.',
  },
];

export function Faqs({ activeIngredientName }: FaqsProps) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900">Preguntas frecuentes</h2>
      <div className="mt-4 space-y-4">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <summary className="cursor-pointer text-sm font-semibold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              {faq.question.replace('{active}', activeIngredientName)}
            </summary>
            <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
