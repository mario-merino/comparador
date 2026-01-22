import type {
  ActiveIngredientDetail,
  ActiveIngredientGroup,
  ActiveIngredientIndexItem,
} from '@/types/active-ingredients';

const REVALIDATE_SECONDS = 14400;

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
}

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${getBaseUrl()}${path}`;
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error(`API_ERROR_${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchActiveIngredientDetail(
  slug: string
): Promise<ActiveIngredientDetail | null> {
  try {
    return await fetchJson<ActiveIngredientDetail>(`/api/active-ingredients/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return null;
    }
    throw error;
  }
}

export async function fetchActiveIngredientGroups(
  slug: string
): Promise<ActiveIngredientGroup[]> {
  return fetchJson<ActiveIngredientGroup[]>(
    `/api/active-ingredients/${slug}/groups`
  );
}

export async function fetchActiveIngredientsIndex(
  query?: string
): Promise<ActiveIngredientIndexItem[]> {
  const search = query ? `?query=${encodeURIComponent(query)}` : '';
  return fetchJson<ActiveIngredientIndexItem[]>(`/api/active-ingredients${search}`);
}
