import type { Localized } from '@/i18n/locale';
import { useLocale } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';

import { CheckIcon } from './icons';

type Supplier = { name: Localized; price: number; days: number; rating: number };

// Made-up numbers: the real product is private, so this is a redrawing of the kind of screen I build there.
const suppliers: Supplier[] = [
  { name: { en: 'Supplier A', ar: 'المورّد أ' }, price: 182, days: 14, rating: 4.6 },
  { name: { en: 'Supplier B', ar: 'المورّد ب' }, price: 164, days: 9, rating: 4.8 },
  { name: { en: 'Supplier C', ar: 'المورّد ج' }, price: 171, days: 21, rating: 4.1 },
];
const best = 1;

const labels = {
  title: { en: 'Quote comparison', ar: 'مقارنة عروض الأسعار' },
  item: { en: 'Office chairs × 40', ar: 'كراسي مكتب × 40' },
  price: { en: 'Unit price', ar: 'سعر الوحدة' },
  delivery: { en: 'Delivery', ar: 'التسليم' },
  rating: { en: 'Rating', ar: 'التقييم' },
  days: { en: 'days', ar: 'يوم' },
  best: { en: 'Best value', ar: 'أفضل قيمة' },
  approve: { en: 'Approve', ar: 'اعتماد' },
  spend: { en: 'Spend this quarter', ar: 'الإنفاق هذا الربع' },
} satisfies Record<string, Localized>;

const spend = [38, 52, 44, 70, 61, 84, 76];

/** A drawing of a procurement screen in HTML and CSS: themed, sharp at any size, and mirrored in Arabic. */
export function QuotePreview() {
  const { locale } = useLocale();
  const rows = [
    { label: labels.price[locale], values: suppliers.map((supplier) => `$${supplier.price}`) },
    { label: labels.delivery[locale], values: suppliers.map((supplier) => `${supplier.days} ${labels.days[locale]}`) },
    // No ★: it isn't in the Latin fonts, and the fallback search would download a whole Arabic font weight.
    { label: labels.rating[locale], values: suppliers.map((supplier) => `${supplier.rating}/5`) },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative flex h-full flex-col justify-center border-b border-line/10 bg-surface-2/50 p-4 sm:p-6 lg:border-b-0 lg:border-e"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
        </div>
        <span className="truncate font-mono text-[11px] text-muted">RFQ-0142 · {labels.item[locale]}</span>
      </div>

      <div className="rounded-xl border border-line/10 bg-surface p-3 shadow-sm sm:p-4">
        <p className="text-xs font-semibold">{labels.title[locale]}</p>
        <div className="mt-3 grid grid-cols-[1.1fr_repeat(3,1fr)] gap-x-1.5 gap-y-1 text-[10px] sm:text-[11px]">
          <span />
          {suppliers.map((supplier, index) => (
            <span
              key={supplier.name.en}
              className={cn(
                'truncate rounded-t-md px-1.5 pt-1.5 font-medium',
                index === best ? 'bg-accent/10 text-accent' : 'text-muted',
              )}
            >
              {supplier.name[locale]}
            </span>
          ))}
          {rows.map((row) => (
            <div key={row.label} className="contents">
              <span className="truncate py-1 text-muted">{row.label}</span>
              {row.values.map((value, index) => (
                <span
                  key={index}
                  dir="ltr"
                  className={cn(
                    'px-1.5 py-1 text-start font-mono rtl:text-end',
                    index === best && 'bg-accent/10 font-semibold text-fg',
                  )}
                >
                  {value}
                </span>
              ))}
            </div>
          ))}
          <span />
          {suppliers.map((supplier, index) => (
            <span key={supplier.name.en} className={cn('rounded-b-md px-1.5 pb-1.5', index === best && 'bg-accent/10')}>
              {index === best && (
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-700 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                  <CheckIcon className="h-2.5 w-2.5" />
                  {labels.best[locale]}
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <span className="rounded-full bg-fg px-3 py-1 text-[10px] font-medium text-bg">{labels.approve[locale]}</span>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-line/10 bg-surface p-3 shadow-sm sm:p-4">
        <p className="text-[11px] text-muted">{labels.spend[locale]}</p>
        <div className="mt-2 flex h-14 items-end gap-1.5">
          {spend.map((height, index) => (
            <span
              key={index}
              className={cn('flex-1 rounded-t', index === spend.length - 2 ? 'bg-gradient-brand' : 'bg-accent/20')}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
