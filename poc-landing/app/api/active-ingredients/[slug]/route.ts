import { NextResponse } from 'next/server';
import { getActiveIngredientDetail } from '@/lib/mock/active-ingredients';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  const { slug } = await params;
  const detail = getActiveIngredientDetail(slug);

  if (!detail) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(detail);
}
