export type Currency = 'CLP';

export type FormType = 'tablet' | 'capsule' | 'syrup' | 'suspension';

export interface ActiveIngredientSummary {
  id: string;
  name: string;
  slug: string;
}

export interface ActiveIngredientDetail extends ActiveIngredientSummary {
  description: string;
  commonUses: string[];
  disclaimers: string[];
}

export interface ProductPack {
  quantity: number;
  unit: string;
}

export interface PricePoint {
  pharmacy: string;
  priceTotal: number;
  currency: Currency;
  updatedAtISO: string;
}

export interface PriceHistoryPoint {
  dateISO: string;
  minPriceTotal: number;
  avgPriceTotal: number;
}

export interface Product {
  id: string;
  displayName: string;
  brand?: string;
  laboratory: string;
  pack: ProductPack;
  prices: PricePoint[];
  history: PriceHistoryPoint[];
  tags: Array<'generic' | 'brand'>;
}

export interface ActiveIngredientGroup {
  groupId: string;
  label: string;
  form: FormType;
  doseLabel: string;
  unitBaseLabel: string;
  products: Product[];
}
