import type { PriceSnapshot } from '@/types/domain';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

export function getLatestSnapshot(
  snapshots: PriceSnapshot[]
): PriceSnapshot | null {
  if (snapshots.length === 0) return null;
  return snapshots.reduce((latest, current) =>
    current.timestamp > latest.timestamp ? current : latest
  );
}

export function getMinPriceFromSnapshot(
  snapshot: PriceSnapshot
): number | null {
  const prices = Array.from(snapshot.prices.values())
    .map((ep) => ep.saleAmount || ep.amount)
    .filter((p): p is number => p > 0);
  return prices.length > 0 ? Math.min(...prices) : null;
}

export function getAllSellers(snapshots: PriceSnapshot[]): string[] {
  const sellersSet = new Set<string>();
  snapshots.forEach((snapshot) => {
    snapshot.prices.forEach((_, seller) => {
      sellersSet.add(seller);
    });
  });
  return Array.from(sellersSet).sort();
}
