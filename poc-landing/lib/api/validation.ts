import { z } from 'zod';

export const externalPriceSchema = z.object({
  seller: z.string(),
  amount: z.number(),
  saleAmount: z.number(),
  lastUpdate: z.string(),
  product: z.any().optional(),
  url: z.string().optional(),
});

export const availabilitySchema = z.object({
  status: z.enum([
    'AVAILABLE_24_HRS',
    'AVAILABLE',
    'REPRESENTATION',
    'SOLD_OUT',
    'HIDDEN',
  ]),
  stock: z.number(),
});

export const searchProductSchema = z.object({
  type: z.enum(['PRODUCT', 'CONSOLIDATED_PRODUCT']),
  id: z.number(),
  name: z.string(),
  activePrinciple: z.string(),
  concentration: z.string(),
  laboratory: z.string(),
  quantity: z.number(),
  unit: z.string(),
  format: z.string(),
  completeFormat: z.string(),
  prescriptionType: z
    .enum(['CHECK', 'HELD', 'SIMPLE', 'NOT_REQUIRED'])
    .nullable(),
  price: z.number(),
  discount: z
    .object({
      price: z.number(),
    })
    .optional(),
  isMedicine: z.boolean(),
  subCategories: z.array(
    z.object({
      name: z.string(),
      slug: z.string(),
    })
  ),
  slug: z.string(),
  imagesUrl: z.array(z.string()),
  externalPrices: z.array(externalPriceSchema),
  availability: availabilitySchema,
  alternatives: z.array(z.any()),
});

export function validateSearchProduct(data: unknown): boolean {
  try {
    searchProductSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
