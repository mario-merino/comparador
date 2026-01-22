import type { Brand, SearchEntity, SearchGeneric } from '@/lib/api/types';
import { getActiveIngredients, getBrands } from './mock';

export async function fetchActiveIngredients(query?: string): Promise<SearchGeneric[]> {
  const ingredients = await getActiveIngredients(query);
  return ingredients.sort((a, b) => a.popularity - b.popularity);
}

export async function fetchBrands(query?: string): Promise<Brand[]> {
  const brands = await getBrands(query);
  return brands.sort((a, b) => a.popularity - b.popularity);
}

export async function fetchSearchResults(query: string): Promise<SearchEntity[]> {
  const [ingredients, brands] = await Promise.all([
    fetchActiveIngredients(query),
    fetchBrands(query),
  ]);
  return [...ingredients, ...brands];
}
