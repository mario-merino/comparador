import type { SearchGeneric } from '@/lib/api/types';
import { getActiveIngredients } from './mock';

export async function fetchActiveIngredients(query?: string): Promise<SearchGeneric[]> {
  return getActiveIngredients(query);
}
