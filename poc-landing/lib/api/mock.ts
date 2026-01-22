import type { Brand, SearchGeneric } from '@/lib/api/types';
import { ItemType } from '@/lib/api/types';

const baseActiveIngredients: Omit<SearchGeneric, 'type' | 'popularity'>[] = [
  {
    activePrinciple: 'Paracetamol',
    usesSummary: 'Dolor leve a moderado y fiebre.',
    forms: ['comprimido', 'cápsula'],
    concentration: '500mg, 650mg, 1000mg',
    format: 'Tabletas',
    productsConsolidated: 8,
  },
  {
    activePrinciple: 'Ibuprofeno',
    usesSummary: 'Dolor, inflamación y fiebre.',
    forms: ['comprimido', 'cápsula'],
    concentration: '200mg, 400mg, 600mg, 800mg',
    format: 'Tabletas',
    productsConsolidated: 9,
  },
  {
    activePrinciple: 'Omeprazol',
    usesSummary: 'Reflujo, gastritis y úlceras.',
    forms: ['cápsula'],
    concentration: '10mg, 20mg, 40mg',
    format: 'Cápsulas',
    productsConsolidated: 7,
  },
  {
    activePrinciple: 'Amoxicilina',
    usesSummary: 'Infecciones bacterianas comunes.',
    forms: ['cápsula', 'comprimido'],
    concentration: '250mg, 500mg, 750mg, 875mg',
    format: 'Cápsulas',
    productsConsolidated: 10,
  },
  {
    activePrinciple: 'Loratadina',
    usesSummary: 'Síntomas de alergia y rinitis.',
    forms: ['comprimido', 'jarabe'],
    concentration: '5mg, 10mg, 20mg',
    format: 'Tabletas',
    productsConsolidated: 6,
  },
  {
    activePrinciple: 'Metformina',
    usesSummary: 'Apoyo en control de glicemia.',
    forms: ['comprimido'],
    concentration: '500mg, 850mg, 1000mg',
    format: 'Tabletas',
    productsConsolidated: 8,
  },
  {
    activePrinciple: 'Atorvastatina',
    usesSummary: 'Control de colesterol.',
    forms: ['comprimido'],
    concentration: '10mg, 20mg, 40mg',
    format: 'Tabletas',
    productsConsolidated: 7,
  },
  {
    activePrinciple: 'Losartán',
    usesSummary: 'Apoyo en presión arterial.',
    forms: ['comprimido'],
    concentration: '25mg, 50mg, 100mg',
    format: 'Tabletas',
    productsConsolidated: 6,
  },
  {
    activePrinciple: 'Amlodipino',
    usesSummary: 'Apoyo en presión arterial.',
    forms: ['comprimido'],
    concentration: '5mg, 10mg',
    format: 'Tabletas',
    productsConsolidated: 5,
  },
  {
    activePrinciple: 'Sertralina',
    usesSummary: 'Apoyo en salud mental.',
    forms: ['comprimido'],
    concentration: '50mg, 100mg',
    format: 'Tabletas',
    productsConsolidated: 6,
  },
  {
    activePrinciple: 'Levotiroxina',
    usesSummary: 'Apoyo en función tiroidea.',
    forms: ['comprimido'],
    concentration: '25mcg, 50mcg, 100mcg',
    format: 'Tabletas',
    productsConsolidated: 7,
  },
  {
    activePrinciple: 'Azitromicina',
    usesSummary: 'Antibiótico de uso común.',
    forms: ['comprimido', 'jarabe'],
    concentration: '250mg, 500mg',
    format: 'Tabletas',
    productsConsolidated: 5,
  },
  {
    activePrinciple: 'Diclofenaco',
    usesSummary: 'Dolor e inflamación.',
    forms: ['comprimido', 'gel'],
    concentration: '50mg, 75mg',
    format: 'Tabletas',
    productsConsolidated: 6,
  },
  {
    activePrinciple: 'Clonazepam',
    usesSummary: 'Apoyo en ansiedad y sueño.',
    forms: ['comprimido', 'gotas'],
    concentration: '0.5mg, 1mg, 2mg',
    format: 'Tabletas',
    productsConsolidated: 5,
  },
];

const syntheticActiveIngredients: Omit<SearchGeneric, 'type' | 'popularity'>[] = Array.from(
  { length: 120 },
  (_, idx) => ({
    activePrinciple: `Principio Activo ${idx + 1}`,
    usesSummary: 'Uso general según indicación médica.',
    forms: ['comprimido'],
    concentration: '10mg, 20mg',
    format: 'Tabletas',
    productsConsolidated: 4,
  })
);

const mockActiveIngredients: SearchGeneric[] = [...baseActiveIngredients, ...syntheticActiveIngredients]
  .map((item, index) => ({
    type: ItemType.GENERIC,
    popularity: index + 1,
    ...item,
  }));

const mockBrands: Brand[] = [
  { type: ItemType.BRAND, name: 'Ozempic', usesSummary: 'Semaglutida inyectable.', popularity: 1 },
  { type: ItemType.BRAND, name: 'Altruline', usesSummary: 'Marca de uso común.', popularity: 2 },
  { type: ItemType.BRAND, name: 'Lyrica', usesSummary: 'Dolor neuropático.', popularity: 3 },
  { type: ItemType.BRAND, name: 'Humira', usesSummary: 'Tratamientos biológicos.', popularity: 4 },
  { type: ItemType.BRAND, name: 'Viagra', usesSummary: 'Disfunción eréctil.', popularity: 5 },
  { type: ItemType.BRAND, name: 'Lipitor', usesSummary: 'Control de colesterol.', popularity: 6 },
  { type: ItemType.BRAND, name: 'Zoloft', usesSummary: 'Apoyo en salud mental.', popularity: 7 },
  { type: ItemType.BRAND, name: 'Advil', usesSummary: 'Dolor e inflamación.', popularity: 8 },
  { type: ItemType.BRAND, name: 'Tylenol', usesSummary: 'Dolor y fiebre.', popularity: 9 },
  { type: ItemType.BRAND, name: 'Neurontin', usesSummary: 'Dolor neuropático.', popularity: 10 },
  { type: ItemType.BRAND, name: 'Clexane', usesSummary: 'Anticoagulante.', popularity: 11 },
  { type: ItemType.BRAND, name: 'Xarelto', usesSummary: 'Anticoagulante.', popularity: 12 },
  { type: ItemType.BRAND, name: 'Brilinta', usesSummary: 'Antiagregante.', popularity: 13 },
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

export async function getBrands(query?: string): Promise<Brand[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (!query) return mockBrands;

  const lowerQuery = query.toLowerCase();
  return mockBrands.filter((brand) => brand.name.toLowerCase().includes(lowerQuery));
}
