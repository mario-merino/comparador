import type { ProductDisplay } from '@/types/domain';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatPrice, getAllSellers, getMinPriceFromSnapshot } from '@/lib/utils/format';
import { getLatestSnapshot } from '@/lib/utils/format';

interface ProductTableProps {
  products: ProductDisplay[];
}

function getAvailabilityBadgeVariant(
  status: string
): 'default' | 'success' | 'warning' | 'error' {
  switch (status) {
    case 'AVAILABLE_24_HRS':
    case 'AVAILABLE':
      return 'success';
    case 'REPRESENTATION':
      return 'warning';
    case 'SOLD_OUT':
    case 'HIDDEN':
      return 'error';
    default:
      return 'default';
  }
}

function getAvailabilityLabel(status: string): string {
  switch (status) {
    case 'AVAILABLE_24_HRS':
      return 'Disponible 24h';
    case 'AVAILABLE':
      return 'Disponible';
    case 'REPRESENTATION':
      return 'Bajo pedido';
    case 'SOLD_OUT':
      return 'Agotado';
    case 'HIDDEN':
      return 'Oculto';
    default:
      return status;
  }
}

export function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return <p className="text-gray-500">No hay productos disponibles</p>;
  }

  const allSellers = getAllSellers(
    products.flatMap((p) => p.priceHistory)
  );

  const getPriceForSeller = (
    product: ProductDisplay,
    seller: string
  ): number | null => {
    const latest = getLatestSnapshot(product.priceHistory);
    if (!latest) return null;
    const price = latest.prices.get(seller);
    return price ? price.saleAmount || price.amount : null;
  };

  const getMinPrice = (product: ProductDisplay): number | null => {
    const latest = getLatestSnapshot(product.priceHistory);
    return latest ? getMinPriceFromSnapshot(latest) : null;
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Producto</TableHeaderCell>
          <TableHeaderCell>Laboratorio</TableHeaderCell>
          <TableHeaderCell>Formato</TableHeaderCell>
          <TableHeaderCell>Prescripción</TableHeaderCell>
          {allSellers.map((seller) => (
            <TableHeaderCell key={seller}>{seller}</TableHeaderCell>
          ))}
          <TableHeaderCell>Disponibilidad</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => {
          const minPrice = getMinPrice(product);
          return (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.laboratory}</TableCell>
              <TableCell>{product.completeFormat}</TableCell>
              <TableCell>
                {product.prescriptionType ? (
                  <Badge variant="warning">{product.prescriptionType}</Badge>
                ) : (
                  <span className="text-gray-400">No requiere</span>
                )}
              </TableCell>
              {allSellers.map((seller) => {
                const price = getPriceForSeller(product, seller);
                const isMinPrice = price !== null && minPrice !== null && price === minPrice;
                return (
                  <TableCell
                    key={seller}
                    className={isMinPrice ? 'font-semibold text-primary-600' : ''}
                  >
                    {price !== null ? formatPrice(price) : '-'}
                  </TableCell>
                );
              })}
              <TableCell>
                <Badge variant={getAvailabilityBadgeVariant(product.availability.status)}>
                  {getAvailabilityLabel(product.availability.status)}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
