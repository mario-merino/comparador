import type {
  SearchProduct,
  ExternalPrice,
  AvailabilityStatus,
  PrescriptionType,
} from '@/lib/api/types';

export interface PriceSnapshot {
  timestamp: Date;
  prices: Map<string, ExternalPrice>;
}

export interface ProductDisplay {
  id: number;
  name: string;
  activePrinciple: string;
  concentration: string;
  laboratory: string;
  format: string;
  completeFormat: string;
  prescriptionType: PrescriptionType;
  availability: {
    status: AvailabilityStatus;
    stock: number;
  };
  priceHistory: PriceSnapshot[];
  currentPrices: ExternalPrice[];
}

export interface ActiveIngredient {
  name: string;
  slug: string;
  description?: string;
  products: ProductDisplay[];
}
