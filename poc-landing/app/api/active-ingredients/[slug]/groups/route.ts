import { NextResponse } from 'next/server';
import { getActiveIngredientGroups } from '@/lib/mock/active-ingredients';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  const { slug } = await params;
  const groups = getActiveIngredientGroups(slug);

  if (!groups) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(groups);
}
