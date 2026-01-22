export type CurrencyCode = 'CLP';
export type ProductTag = 'generic' | 'brand';
export type ProductForm = 'tablet' | 'capsule' | 'syrup' | 'suspension' | 'drop' | 'other';

export interface ActiveIngredientIndexItem {
  id: string;
  name: string;
  slug: string;
}

export interface ActiveIngredientDetail extends ActiveIngredientIndexItem {
  description: string;
  commonUses: string[];
  disclaimers: string[];
}

export interface ProductPack {
  quantity: number;
  unit: string;
}

export interface ProductPrice {
  pharmacy: string;
  priceTotal: number;
  currency: CurrencyCode;
  updatedAtISO: string;
}

export interface ProductPriceHistory {
  dateISO: string;
  minPriceTotal: number;
  avgPriceTotal: number;
}

export interface PriceHistoryPoint {
  dateISO: string;
  minPricePerUnit: number;
  avgPricePerUnit: number;
}

export interface ActiveIngredientProduct {
  id: string;
  displayName: string;
  brand?: string;
  laboratory: string;
  pack: ProductPack;
  prices: ProductPrice[];
  history: ProductPriceHistory[];
  tags: ProductTag[];
}

export interface ActiveIngredientGroup {
  groupId: string;
  label: string;
  form: ProductForm;
  doseLabel: string;
  unitBaseLabel: string;
  products: ActiveIngredientProduct[];
}
