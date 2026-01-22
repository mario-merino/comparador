import type {
  ActiveIngredientDetail,
  ActiveIngredientGroup,
  ActiveIngredientIndexItem,
  ProductPriceHistory,
  ProductPrice,
} from '@/types/active-ingredients';

const lastUpdatedAtISO = new Date().toISOString();

const activeIngredients: ActiveIngredientDetail[] = [
  {
    id: 'ai-ibuprofen',
    name: 'Ibuprofeno',
    slug: 'ibuprofeno',
    description:
      'Analgésico y antiinflamatorio de uso común para dolor leve a moderado.',
    commonUses: ['Dolor muscular', 'Dolor menstrual', 'Fiebre'],
    disclaimers: [
      'Información referencial; no reemplaza la indicación de un profesional de la salud.',
    ],
  },
  {
    id: 'ai-paracetamol',
    name: 'Paracetamol',
    slug: 'paracetamol',
    description:
      'Analgésico y antipirético de uso frecuente para dolor y fiebre.',
    commonUses: ['Dolor de cabeza', 'Fiebre', 'Dolor postoperatorio'],
    disclaimers: [
      'Si tienes dudas, consulta a un profesional de la salud.',
    ],
  },
];

function buildMonthlyHistory(
  months: number,
  minBase: number,
  avgBase: number,
  minStep: number,
  avgStep: number
): ProductPriceHistory[] {
  const history: ProductPriceHistory[] = [];
  const today = new Date();

  for (let i = months - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    date.setDate(1);
    history.push({
      dateISO: date.toISOString(),
      minPriceTotal: minBase + (months - 1 - i) * minStep,
      avgPriceTotal: avgBase + (months - 1 - i) * avgStep,
    });
  }

  return history;
}

function buildPrice(
  pharmacy: string,
  priceTotal: number,
  minutesAgo: number
): ProductPrice {
  const updatedAt = new Date(Date.now() - minutesAgo * 60 * 1000);
  return {
    pharmacy,
    priceTotal,
    currency: 'CLP',
    updatedAtISO: updatedAt.toISOString(),
  };
}

const groupsBySlug: Record<string, ActiveIngredientGroup[]> = {
  ibuprofeno: [
    {
      groupId: 'ibuprofen-tablet-400',
      label: 'Comprimidos 400 mg',
      form: 'tablet',
      doseLabel: '400 mg',
      unitBaseLabel: 'por comprimido',
      products: [
        {
          id: 'ibu-400-gen-20',
          displayName: 'Ibuprofeno 400 mg',
          laboratory: 'Laboratorio Andes',
          pack: { quantity: 20, unit: 'comprimidos' },
          prices: [
            buildPrice('MEKI', 2490, 30),
            buildPrice('Cruz Verde', 2790, 70),
            buildPrice('Farmacias Ahumada', 2690, 90),
          ],
          history: buildMonthlyHistory(8, 2150, 2450, 40, 55),
          tags: ['generic'],
        },
        {
          id: 'ibu-400-brand-20',
          displayName: 'Ibuprofeno Forte 400 mg',
          brand: 'IbuForte',
          laboratory: 'Laboratorio Austral',
          pack: { quantity: 20, unit: 'comprimidos' },
          prices: [
            buildPrice('MEKI', 3390, 40),
            buildPrice('Cruz Verde', 3590, 85),
            buildPrice('Farmacias Ahumada', 3490, 110),
          ],
          history: buildMonthlyHistory(8, 2950, 3250, 45, 60),
          tags: ['brand'],
        },
      ],
    },
    {
      groupId: 'ibuprofen-syrup-100',
      label: 'Jarabe 100 mg/5 ml',
      form: 'syrup',
      doseLabel: '100 mg/5 ml',
      unitBaseLabel: 'por 5 ml',
      products: [
        {
          id: 'ibu-syrup-gen-100',
          displayName: 'Ibuprofeno Jarabe 100 mg/5 ml',
          laboratory: 'Laboratorio Andes',
          pack: { quantity: 100, unit: 'ml' },
          prices: [
            buildPrice('MEKI', 2890, 50),
            buildPrice('Cruz Verde', 3090, 95),
            buildPrice('Farmacias Ahumada', 2990, 120),
          ],
          history: buildMonthlyHistory(8, 2550, 2850, 35, 50),
          tags: ['generic'],
        },
        {
          id: 'ibu-syrup-brand-120',
          displayName: 'Ibuprofeno Kids 100 mg/5 ml',
          brand: 'IbuKids',
          laboratory: 'Laboratorio Sur',
          pack: { quantity: 120, unit: 'ml' },
          prices: [
            buildPrice('MEKI', 3490, 60),
            buildPrice('Cruz Verde', 3690, 115),
            buildPrice('Farmacias Ahumada', 3590, 140),
          ],
          history: buildMonthlyHistory(8, 3050, 3350, 35, 45),
          tags: ['brand'],
        },
      ],
    },
  ],
  paracetamol: [
    {
      groupId: 'paracetamol-tablet-500',
      label: 'Comprimidos 500 mg',
      form: 'tablet',
      doseLabel: '500 mg',
      unitBaseLabel: 'por comprimido',
      products: [
        {
          id: 'para-500-gen-16',
          displayName: 'Paracetamol 500 mg',
          laboratory: 'Laboratorio Norte',
          pack: { quantity: 16, unit: 'comprimidos' },
          prices: [
            buildPrice('MEKI', 1990, 20),
            buildPrice('Cruz Verde', 2190, 80),
            buildPrice('Farmacias Ahumada', 2090, 95),
          ],
          history: buildMonthlyHistory(8, 1750, 2050, 35, 45),
          tags: ['generic'],
        },
        {
          id: 'para-500-brand-16',
          displayName: 'Paracetamol Plus 500 mg',
          brand: 'ParaPlus',
          laboratory: 'Laboratorio Central',
          pack: { quantity: 16, unit: 'comprimidos' },
          prices: [
            buildPrice('MEKI', 2690, 45),
            buildPrice('Cruz Verde', 2890, 105),
            buildPrice('Farmacias Ahumada', 2790, 135),
          ],
          history: buildMonthlyHistory(8, 2350, 2600, 40, 55),
          tags: ['brand'],
        },
      ],
    },
    {
      groupId: 'paracetamol-syrup-120',
      label: 'Jarabe 120 mg/5 ml',
      form: 'syrup',
      doseLabel: '120 mg/5 ml',
      unitBaseLabel: 'por 5 ml',
      products: [
        {
          id: 'para-syrup-gen-120',
          displayName: 'Paracetamol Jarabe 120 mg/5 ml',
          laboratory: 'Laboratorio Norte',
          pack: { quantity: 120, unit: 'ml' },
          prices: [
            buildPrice('MEKI', 2790, 35),
            buildPrice('Cruz Verde', 2990, 90),
            buildPrice('Farmacias Ahumada', 2890, 125),
          ],
          history: buildMonthlyHistory(8, 2450, 2750, 30, 45),
          tags: ['generic'],
        },
        {
          id: 'para-syrup-brand-100',
          displayName: 'Paracetamol Junior 120 mg/5 ml',
          brand: 'ParaJunior',
          laboratory: 'Laboratorio Central',
          pack: { quantity: 100, unit: 'ml' },
          prices: [
            buildPrice('MEKI', 3290, 55),
            buildPrice('Cruz Verde', 3490, 100),
            buildPrice('Farmacias Ahumada', 3390, 130),
          ],
          history: buildMonthlyHistory(8, 2950, 3250, 30, 40),
          tags: ['brand'],
        },
      ],
    },
  ],
};

export function getActiveIngredientsIndex(query?: string): ActiveIngredientIndexItem[] {
  const normalizedQuery = query?.trim().toLowerCase();
  if (!normalizedQuery) return activeIngredients;

  return activeIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(normalizedQuery) ||
    ingredient.slug.toLowerCase().includes(normalizedQuery)
  );
}

export function getActiveIngredientDetail(
  slug: string
): ActiveIngredientDetail | null {
  return activeIngredients.find((ingredient) => ingredient.slug === slug) ?? null;
}

export function getActiveIngredientGroups(
  slug: string
): ActiveIngredientGroup[] | null {
  return groupsBySlug[slug] ?? null;
}

export function getLastUpdatedAtISO(): string {
  return lastUpdatedAtISO;
}
