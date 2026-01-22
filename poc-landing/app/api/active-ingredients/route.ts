import { NextResponse } from 'next/server';
import { getActiveIngredientsIndex } from '@/lib/mock/active-ingredients';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') ?? undefined;
  const data = getActiveIngredientsIndex(query);

  return NextResponse.json(data);
}
