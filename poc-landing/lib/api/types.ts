export enum ItemType {
  GENERIC = 'GENERIC',
  BRAND = 'BRAND',
}

export interface SearchGeneric {
  type: ItemType.GENERIC;
  activePrinciple: string;
  usesSummary?: string;
  forms?: string[];
  concentration: string;
  format: string;
  productsConsolidated: number;
  popularity: number;
}

export interface Brand {
  type: ItemType.BRAND;
  name: string;
  usesSummary?: string;
  popularity: number;
}

export type SearchEntity = SearchGeneric | Brand;
