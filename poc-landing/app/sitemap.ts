import type { MetadataRoute } from 'next';
import { fetchActiveIngredients, fetchBrands } from '@/lib/api/adapter';
import { slugify } from '@/lib/utils/slug';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  
  const ingredients = await fetchActiveIngredients();
  const brands = await fetchBrands();
  
  const ingredientPages = ingredients.map((ingredient) => ({
    url: `${baseUrl}/principio-activo/${slugify(ingredient.activePrinciple)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));
  const brandPages = brands.map((brand) => ({
    url: `${baseUrl}/marca/${slugify(brand.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...ingredientPages,
    ...brandPages,
  ];
}
