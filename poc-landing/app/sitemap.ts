import type { MetadataRoute } from 'next';
import { fetchBrands } from '@/lib/api/adapter';
import { fetchActiveIngredientsIndex } from '@/lib/api/active-ingredients-client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  
  const ingredients = await fetchActiveIngredientsIndex();
  const brands = await fetchBrands();
  
  const ingredientPages = ingredients.map((ingredient) => ({
    url: `${baseUrl}/principio-activo/${ingredient.slug}`,
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
