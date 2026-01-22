import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  fetchActiveIngredientDetail,
  fetchActiveIngredientGroups,
  fetchActiveIngredientsIndex,
} from '@/lib/api/active-ingredients-client';
import type {
  ActiveIngredientDetail,
  ActiveIngredientGroup,
  ActiveIngredientIndexItem,
} from '@/types/active-ingredients';
import { PageHeader } from '@/components/active-ingredient/page-header';
import { GroupTabs } from '@/components/active-ingredient/group-tabs';
import { RelatedLinks } from '@/components/active-ingredient/related-links';
import { Faqs } from '@/components/active-ingredient/faqs';
import { ErrorState } from '@/components/active-ingredient/error-state';
import { EmptyState } from '@/components/active-ingredient/empty-state';

export const revalidate = 14400;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const detail = await fetchActiveIngredientDetail(slug);
    if (!detail) {
      return { title: 'Principio activo no encontrado' };
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const title = `${detail.name}: precios, presentaciones y alternativas`;
    const description = `${detail.description} Compara precios y presentaciones disponibles.`;
    const canonical = `${baseUrl}/principio-activo/${detail.slug}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: 'article',
      },
    };
  } catch {
    return {
      title: 'Principio activo',
      description: 'Comparador de precios de medicamentos en Chile.',
    };
  }
}

export default async function ActiveIngredientPage({ params }: PageProps) {
  const { slug } = await params;
  let detail: ActiveIngredientDetail | null = null;
  let groups: ActiveIngredientGroup[] = [];
  let index: ActiveIngredientIndexItem[] = [];

  try {
    detail = await fetchActiveIngredientDetail(slug);
    if (!detail) {
      notFound();
    }
    [groups, index] = await Promise.all([
      fetchActiveIngredientGroups(slug),
      fetchActiveIngredientsIndex(),
    ]);
  } catch {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <main id="contenido-principal">
          <ErrorState />
        </main>
      </div>
    );
  }

  const related = index.filter((item) => item.slug !== detail.slug).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rounded-md bg-white px-3 py-2 text-sm font-semibold text-primary-700 shadow"
      >
        Saltar al contenido principal
      </a>
      <main id="contenido-principal">
        <PageHeader detail={detail} />
        {groups.length === 0 ? (
          <div className="mt-10">
            <EmptyState />
          </div>
        ) : (
          <GroupTabs groups={groups} activeIngredientName={detail.name} />
        )}
        <RelatedLinks items={related} />
        <Faqs activeIngredientName={detail.name} />
      </main>
    </div>
  );
}
