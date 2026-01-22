import type {
  ActiveIngredientGroup,
  ActiveIngredientProduct,
  PriceHistoryPoint,
  ProductPack,
  ProductPriceHistory,
  ProductTag,
} from '@/types/active-ingredients';

export interface PriceRow {
  productId: string;
  productName: string;
  laboratory: string;
  packLabel: string;
  priceTotal: number;
  pricePerUnit: number;
  pharmacy: string;
  tags: ProductTag[];
  updatedAtISO: string;
}

export interface GroupSummary {
  minUnitPrice: number | null;
  avgUnitPrice: number | null;
  latestUpdatedAtISO: string | null;
  pharmacies: string[];
}

export interface PharmacyRankingRow {
  pharmacy: string;
  percentDaysWithMin: number;
  averagePosition: number;
}

export function formatPack(pack: ProductPack): string {
  return `${pack.quantity} ${pack.unit}`;
}

export function buildPriceRows(group: ActiveIngredientGroup): PriceRow[] {
  return group.products.flatMap((product) =>
    product.prices.map((price) => ({
      productId: product.id,
      productName: product.displayName,
      laboratory: product.laboratory,
      packLabel: formatPack(product.pack),
      priceTotal: price.priceTotal,
      pricePerUnit: price.priceTotal / product.pack.quantity,
      pharmacy: price.pharmacy,
      tags: product.tags,
      updatedAtISO: price.updatedAtISO,
    }))
  );
}

export function getUniquePharmacies(groups: ActiveIngredientGroup[]): string[] {
  const pharmacies = new Set<string>();
  groups.forEach((group) => {
    group.products.forEach((product) => {
      product.prices.forEach((price) => pharmacies.add(price.pharmacy));
    });
  });
  return Array.from(pharmacies).sort();
}

export function getLatestUpdatedAtISO(
  groups: ActiveIngredientGroup[]
): string | null {
  const timestamps = groups.flatMap((group) =>
    group.products.flatMap((product) => product.prices.map((price) => price.updatedAtISO))
  );
  if (timestamps.length === 0) return null;
  return timestamps.reduce((latest, current) =>
    new Date(current) > new Date(latest) ? current : latest
  );
}

export function getGroupSummary(group: ActiveIngredientGroup): GroupSummary {
  const rows = buildPriceRows(group);
  if (rows.length === 0) {
    return { minUnitPrice: null, avgUnitPrice: null, latestUpdatedAtISO: null, pharmacies: [] };
  }

  const minUnitPrice = Math.min(...rows.map((row) => row.pricePerUnit));
  const avgUnitPrice =
    rows.reduce((sum, row) => sum + row.pricePerUnit, 0) / rows.length;
  const latestUpdatedAtISO = rows.reduce((latest, row) =>
    new Date(row.updatedAtISO) > new Date(latest) ? row.updatedAtISO : latest
  , rows[0].updatedAtISO);
  const pharmacies = Array.from(new Set(rows.map((row) => row.pharmacy))).sort();

  return { minUnitPrice, avgUnitPrice, latestUpdatedAtISO, pharmacies };
}

export function aggregateGroupHistory(
  group: ActiveIngredientGroup
): PriceHistoryPoint[] {
  const historyByDate = new Map<string, { minValues: number[]; avgValues: number[] }>();

  group.products.forEach((product) => {
    product.history.forEach((entry) => {
      const existing = historyByDate.get(entry.dateISO) ?? {
        minValues: [],
        avgValues: [],
      };
      // Convertir precio total a precio por unidad dividiendo por la cantidad del pack
      const pricePerUnitMin = entry.minPriceTotal / product.pack.quantity;
      const pricePerUnitAvg = entry.avgPriceTotal / product.pack.quantity;
      existing.minValues.push(pricePerUnitMin);
      existing.avgValues.push(pricePerUnitAvg);
      historyByDate.set(entry.dateISO, existing);
    });
  });

  return Array.from(historyByDate.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([dateISO, values]) => ({
      dateISO,
      minPricePerUnit: Math.min(...values.minValues),
      avgPricePerUnit:
        values.avgValues.reduce((sum, value) => sum + value, 0) /
        values.avgValues.length,
    }));
}

export function getLaboratoryCounts(
  group: ActiveIngredientGroup
): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>();
  group.products.forEach((product) => {
    counts.set(product.laboratory, (counts.get(product.laboratory) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function buildPharmacyRanking(rows: PriceRow[]): PharmacyRankingRow[] {
  if (rows.length === 0) return [];

  const stats = new Map<string, { prices: number[] }>();
  rows.forEach((row) => {
    const entry = stats.get(row.pharmacy) ?? { prices: [] };
    entry.prices.push(row.pricePerUnit);
    stats.set(row.pharmacy, entry);
  });

  const ranked = Array.from(stats.entries()).map(([pharmacy, data]) => {
    const average = data.prices.reduce((sum, value) => sum + value, 0) / data.prices.length;
    return { pharmacy, average };
  });

  ranked.sort((a, b) => a.average - b.average);

  const totalWeight = ranked.reduce((sum, _, index) => sum + (ranked.length - index), 0);

  return ranked.map((entry, index) => ({
    pharmacy: entry.pharmacy,
    percentDaysWithMin: Math.max(
      5,
      Math.round(((ranked.length - index) / totalWeight) * 100)
    ),
    averagePosition: Number((index + 1).toFixed(1)),
  }));
}

export function getProductLabel(product: ActiveIngredientProduct): string {
  return product.brand ? `${product.displayName} (${product.brand})` : product.displayName;
}
