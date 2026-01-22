"use client";

import type { KeyboardEvent } from 'react';
import { useId, useMemo, useRef, useState } from 'react';
import type { ActiveIngredientGroup } from '@/types/active-ingredients';
import {
  aggregateGroupHistory,
  buildPharmacyRanking,
  buildPriceRows,
  getGroupSummary,
} from '@/lib/utils/active-ingredients';
import { formatDate, formatPrice } from '@/lib/utils/format';
import { PriceComparator } from './price-comparator';
import { HistoryChart } from './history-chart';
import { PharmacyRankingChart } from './pharmacy-ranking-chart';

interface GroupTabsProps {
  groups: ActiveIngredientGroup[];
  activeIngredientName: string;
}

export function GroupTabs({ groups, activeIngredientName }: GroupTabsProps) {
  const initialGroupId = groups[0]?.groupId ?? '';
  const [activeGroupId, setActiveGroupId] = useState(initialGroupId);
  const tabsId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeGroup = useMemo(
    () => groups.find((group) => group.groupId === activeGroupId) ?? groups[0],
    [activeGroupId, groups]
  );

  if (!activeGroup) {
    return null;
  }

  const activeIndex = Math.max(
    0,
    groups.findIndex((group) => group.groupId === activeGroup.groupId)
  );

  const rows = buildPriceRows(activeGroup);
  const summary = getGroupSummary(activeGroup);
  const history = aggregateGroupHistory(activeGroup);
  const ranking = buildPharmacyRanking(rows);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const nextIndex =
      event.key === 'ArrowRight'
        ? (activeIndex + 1) % groups.length
        : (activeIndex - 1 + groups.length) % groups.length;
    const nextGroup = groups[nextIndex];
    setActiveGroupId(nextGroup.groupId);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-gray-900">Presentaciones</h2>
      <div
        className="mt-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Selector de presentaciones"
        onKeyDown={onKeyDown}
      >
        {groups.map((group, index) => {
          const tabId = `${tabsId}-tab-${group.groupId}`;
          const panelId = `${tabsId}-panel-${group.groupId}`;
          const isActive = group.groupId === activeGroup.groupId;
          return (
            <button
              key={group.groupId}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveGroupId(group.groupId)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                isActive
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:text-primary-700'
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${tabsId}-panel-${activeGroup.groupId}`}
        role="tabpanel"
        aria-labelledby={`${tabsId}-tab-${activeGroup.groupId}`}
        className="mt-8"
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          {activeIngredientName} – {activeGroup.label}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">Precio mínimo por unidad hoy</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {summary.minUnitPrice !== null
                ? formatPrice(Math.round(summary.minUnitPrice))
                : 'Sin datos'}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">Precio promedio por unidad</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {summary.avgUnitPrice !== null
                ? formatPrice(Math.round(summary.avgUnitPrice))
                : 'Sin datos'}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">Última actualización del grupo</p>
            <p className="mt-2 text-sm font-semibold text-gray-900">
              {summary.latestUpdatedAtISO ? formatDate(summary.latestUpdatedAtISO) : 'Sin datos'}
            </p>
          </div>
        </div>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Comparador de precios</h3>
          <PriceComparator rows={rows} unitBaseLabel={activeGroup.unitBaseLabel} />
        </section>

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900">Histórico</h3>
          <p className="mt-2 text-sm text-gray-600">
            Metodología: los valores mostrados corresponden al precio por unidad ({activeGroup.unitBaseLabel}).
            El mínimo es el menor precio por unidad registrado en el mes y el promedio es el valor medio del período.
          </p>
          <HistoryChart history={history} unitBaseLabel={activeGroup.unitBaseLabel} />
        </section>

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900">Ranking de farmacias</h3>
          <p className="mt-2 text-sm text-gray-600">
            Estimación basada en las últimas 12 semanas con los precios disponibles.
          </p>
          <PharmacyRankingChart rows={ranking} />
        </section>
      </div>
    </section>
  );
}
