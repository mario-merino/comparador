export enum ItemType {
  GENERIC = 'GENERIC',
}

export interface SearchGeneric {
  type: ItemType.GENERIC;
  activePrinciple: string;
  usesSummary?: string;
  forms?: string[];
  concentration: string;
  format: string;
  productsConsolidated: number;
}
