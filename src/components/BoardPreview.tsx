import { FormattedMessage } from 'react-intl';

import type { Localized } from '@/i18n/locale';
import { useLocale } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';

type Column = { title: Localized; cards: { initials: string; match: number }[] };

const columns: Column[] = [
  {
    title: { en: 'Applied', ar: 'تقدّم' },
    cards: [
      { initials: 'NH', match: 92 },
      { initials: 'OK', match: 74 },
      { initials: 'SA', match: 61 },
    ],
  },
  {
    title: { en: 'Screening', ar: 'فرز' },
    cards: [
      { initials: 'YM', match: 88 },
      { initials: 'LF', match: 79 },
    ],
  },
  { title: { en: 'Interview', ar: 'مقابلة' }, cards: [{ initials: 'KT', match: 95 }] },
  { title: { en: 'Offer', ar: 'عرض' }, cards: [{ initials: 'HR', match: 97 }] },
];

const avatarColors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500'];

/** A drawing of HireFlow's hiring board in HTML and CSS: sharp at any size, themed, and mirrored in Arabic. */
export function BoardPreview() {
  const { locale } = useLocale();

  return (
    <div aria-hidden="true" className="relative border-t border-line bg-bg/60 p-4 sm:p-6 lg:border-s lg:border-t-0">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] text-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
          <FormattedMessage id="project.board.live" />
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {columns.map((column, columnIndex) => (
          <div key={column.title.en} className="min-w-0 rounded-xl bg-line/40 p-1.5 sm:p-2">
            <p className="mb-2 truncate px-1 text-[11px] font-medium text-muted">
              {column.title[locale]} <span className="opacity-60">{column.cards.length}</span>
            </p>
            <div className="space-y-1.5">
              {column.cards.map((card, cardIndex) => (
                <div
                  key={card.initials}
                  className={cn(
                    'rounded-lg border border-line bg-surface p-1.5 shadow-sm sm:p-2',
                    columnIndex === 1 && cardIndex === 0 && 'rotate-2 ring-2 ring-accent/40',
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white',
                        avatarColors[(columnIndex + cardIndex) % avatarColors.length],
                      )}
                    >
                      {card.initials}
                    </span>
                    <span className="hidden h-1.5 flex-1 rounded bg-line sm:block" />
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded bg-line">
                    <div className="h-full rounded bg-accent" style={{ width: `${card.match}%` }} />
                  </div>
                  <p className="mt-1 text-end font-mono text-[9px] text-muted">{card.match}%</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
