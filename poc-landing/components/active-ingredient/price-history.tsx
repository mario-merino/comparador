import type { ProductDisplay } from '@/types/domain';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@/components/ui/table';
import { formatPrice, formatDateShort, getAllSellers } from '@/lib/utils/format';

interface PriceHistoryProps {
  product: ProductDisplay;
}

export function PriceHistory({ product }: PriceHistoryProps) {
  if (product.priceHistory.length === 0) {
    return <p className="text-gray-500">No hay historial de precios disponible</p>;
  }

  const allSellers = getAllSellers(product.priceHistory);
  const sortedHistory = [...product.priceHistory].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Historial de Precios</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Fecha</TableHeaderCell>
            {allSellers.map((seller) => (
              <TableHeaderCell key={seller}>{seller}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedHistory.map((snapshot, idx) => (
            <TableRow key={idx}>
              <TableCell>{formatDateShort(snapshot.timestamp)}</TableCell>
              {allSellers.map((seller) => {
                const price = snapshot.prices.get(seller);
                return (
                  <TableCell key={seller}>
                    {price
                      ? formatPrice(price.saleAmount || price.amount)
                      : '-'}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
