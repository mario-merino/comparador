import type { SearchGeneric } from '@/lib/api/types';
import { ItemType } from '@/lib/api/types';

const mockActiveIngredients: SearchGeneric[] = [
  {
    type: ItemType.GENERIC,
    activePrinciple: 'Paracetamol',
    usesSummary: 'Dolor leve a moderado y fiebre.',
    forms: ['comprimido', 'cápsula'],
    concentration: '500mg, 650mg, 1000mg',
    format: 'Tabletas',
    productsConsolidated: 8,
  },
  {
    type: ItemType.GENERIC,
    activePrinciple: 'Ibuprofeno',
    usesSummary: 'Dolor, inflamación y fiebre.',
    forms: ['comprimido', 'cápsula'],
    concentration: '200mg, 400mg, 600mg, 800mg',
    format: 'Tabletas',
    productsConsolidated: 9,
  },
  {
    type: ItemType.GENERIC,
    activePrinciple: 'Omeprazol',
    usesSummary: 'Reflujo, gastritis y úlceras.',
    forms: ['cápsula'],
    concentration: '10mg, 20mg, 40mg',
    format: 'Cápsulas',
    productsConsolidated: 7,
  },
  {
    type: ItemType.GENERIC,
    activePrinciple: 'Amoxicilina',
    usesSummary: 'Infecciones bacterianas comunes.',
    forms: ['cápsula', 'comprimido'],
    concentration: '250mg, 500mg, 750mg, 875mg',
    format: 'Cápsulas',
    productsConsolidated: 10,
  },
  {
    type: ItemType.GENERIC,
    activePrinciple: 'Loratadina',
    usesSummary: 'Síntomas de alergia y rinitis.',
    forms: ['comprimido', 'jarabe'],
    concentration: '5mg, 10mg, 20mg',
    format: 'Tabletas',
    productsConsolidated: 6,
  },
];

export async function getActiveIngredients(query?: string): Promise<SearchGeneric[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (!query) return mockActiveIngredients;

  const lowerQuery = query.toLowerCase();
  return mockActiveIngredients.filter(
    (ing) =>
      ing.activePrinciple.toLowerCase().includes(lowerQuery) ||
      ing.concentration.toLowerCase().includes(lowerQuery)
  );
}
