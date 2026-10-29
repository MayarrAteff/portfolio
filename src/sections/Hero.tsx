import type { ReactNode } from 'react';
import { FormattedMessage, FormattedTime } from 'react-intl';

import { BrandIcon } from '@/components/BrandIcon';
import { ArrowDownIcon, ArrowUpRightIcon, DownloadIcon } from '@/components/icons';
import { hireflow } from '@/data/projects';
import { site } from '@/data/site';
import { dailyStack } from '@/data/skills';
import type { Localized } from '@/i18n/locale';
import { useLocale } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';
import { button, card, eyebrow, focusRing } from '@/lib/styles';
import { useLocalTime } from '@/lib/useLocalTime';

const initials: Localized = { en: 'MA', ar: 'م ع' };

// A few cards from the HireFlow board, drawn small.
const kanban: { title: Localized; dots: string[] }[] = [
  { title: { en: 'Applied', ar: 'تقدّم' }, dots: ['bg-sky-500', 'bg-violet-500', 'bg-sky-500'] },
  { title: { en: 'Interview', ar: 'مقابلة' }, dots: ['bg-pink-500', 'bg-amber-500'] },
  { title: { en: 'Offer', ar: 'عرض' }, dots: ['bg-emerald-500'] },
];

// The highlighted word in the headline is marked <g>…</g> in the translations.
const highlight = { g: (chunks: ReactNode[]) => <span className="text-gradient">{chunks}</span> };

const label = cn(eyebrow, 'text-muted');

/**
 * A bento grid: each card answers one thing a recruiter wants to know (who, where, what now, best project,
 * stack, languages, how to reach me). The grid's areas live in index.css and mirror in Arabic.
 */
export function Hero() {
  const { locale, setLocale } = useLocale();
  const other = locale === 'en' ? 'ar' : 'en';
  const { now, zone, offset } = useLocalTime();

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-6 pt-10 sm:px-6 sm:pt-14">
      <div className="bento">
        <article className={cn(card, 'relative flex flex-col gap-6 overflow-hidden p-6 [grid-area:intro] sm:p-8')}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -end-32 -top-40 h-96 w-96 bg-[radial-gradient(closest-side,rgb(var(--g2)/0.28),transparent)]"
          />
          <div className="relative flex flex-wrap items-center gap-3">
            <span className="avatar-ring rounded-full p-0.5">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-surface font-display text-lg font-bold">
                {initials[locale]}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-surface-2/60 px-3 py-1 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <FormattedMessage id="hero.available" />
            </span>
          </div>
          <h1 className="relative text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl rtl:leading-snug rtl:tracking-normal">
            <span className="block">
              <FormattedMessage id="hero.greeting" />
            </span>
            <FormattedMessage id="hero.title" values={highlight} />
          </h1>
          <p className="relative max-w-xl text-lg leading-relaxed text-muted">
            <FormattedMessage id="hero.lead" />
          </p>
          <div className="relative mt-auto flex flex-wrap gap-3">
            <a href="#work" className={button.primary}>
              <FormattedMessage id="hero.work" />
              <ArrowDownIcon />
            </a>
            <a href={site.cv} download className={button.secondary}>
              <DownloadIcon />
              <FormattedMessage id="hero.cv" />
            </a>
          </div>
        </article>

        <article className={cn(card, 'flex flex-col justify-between gap-4 p-5 [grid-area:now]')}>
          <p className={label}>
            <FormattedMessage id="hero.now.label" />
          </p>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-600 to-pink-600 text-xl font-bold text-white"
          >
            Q
          </span>
          <div>
            <p className="font-semibold">
              <FormattedMessage id="hero.now.role" />
            </p>
            <p className="mt-1 text-sm text-muted">
              <FormattedMessage id="hero.now.detail" />
            </p>
          </div>
        </article>

        <article
          className={cn(card, 'relative flex flex-col justify-between gap-4 overflow-hidden p-5 [grid-area:time]')}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(var(--g1)/0.16),transparent_60%)]"
          />
          <p className={cn(label, 'relative')}>
            <FormattedMessage id="hero.time.label" />
          </p>
          <p className="relative font-mono text-4xl font-medium tabular-nums tracking-tight">
            <FormattedTime value={now} timeZone={zone} hour="2-digit" minute="2-digit" hourCycle="h23" />
          </p>
          <div className="relative">
            <p className="font-semibold">
              <FormattedMessage id="hero.time.place" />
            </p>
            <p dir="ltr" className="mt-1 text-start text-sm text-muted rtl:text-end">
              {offset}
            </p>
          </div>
        </article>

        <a
          href="#work"
          className={cn(
            card,
            focusRing,
            'group grid items-center gap-5 p-5 transition [grid-area:project] hover:border-line/20 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]',
          )}
        >
          <div>
            <p className={label}>
              <FormattedMessage id="hero.project.label" />
            </p>
            <p className="mt-3 flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight">
              {hireflow.name}
              <ArrowUpRightIcon className="transition group-hover:-translate-y-0.5" />
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{hireflow.tagline[locale]}</p>
          </div>
          <div
            aria-hidden="true"
            className="grid -rotate-2 grid-cols-3 gap-1.5 rounded-2xl border border-line/10 bg-surface-2/70 p-2.5 transition duration-300 group-hover:rotate-0 motion-reduce:transition-none"
          >
            {kanban.map((column) => (
              <div key={column.title.en} className="grid content-start gap-1.5">
                <span className="truncate font-mono text-[9px] text-muted">{column.title[locale]}</span>
                {column.dots.map((dot, index) => (
                  <span key={index} className="flex h-6 items-center gap-1.5 rounded-md bg-surface px-1.5 shadow-sm">
                    <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', dot)} />
                    <span className="h-1 flex-1 rounded bg-line/10" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </a>

        <article className={cn(card, 'flex flex-col gap-4 p-5 [grid-area:stack]')}>
          <p className={label}>
            <FormattedMessage id="hero.stack.label" />
          </p>
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {/* Not everyone knows the logos, so each one names itself on hover, on keyboard focus and on tap. */}
            {dailyStack.map((tool) => (
              <li key={tool.name} className="group/tool relative">
                <span
                  tabIndex={0}
                  className={cn(
                    focusRing,
                    'grid aspect-square place-items-center rounded-2xl border border-line/10 bg-surface-2/60 transition group-hover/tool:-translate-y-0.5 group-hover/tool:border-line/20',
                  )}
                >
                  <BrandIcon icon={tool.icon} className="h-1/2 w-1/2" />
                  <span className="sr-only">{tool.name}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2.5 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-fg px-2.5 py-1 text-xs font-medium text-bg opacity-0 shadow-lg transition duration-150 group-focus-within/tool:translate-y-0 group-focus-within/tool:opacity-100 group-hover/tool:translate-y-0 group-hover/tool:opacity-100 motion-reduce:transition-none"
                >
                  {tool.name}
                  <span className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-fg" />
                </span>
              </li>
            ))}
          </ul>
        </article>

        {/* The real language switch, not a demo: the whole page flips. */}
        <button
          type="button"
          onClick={() => setLocale(other)}
          className={cn(
            card,
            focusRing,
            'flex flex-col justify-between gap-4 p-5 text-start transition [grid-area:lang] hover:border-line/20',
          )}
        >
          <span className="sr-only">
            <FormattedMessage id="lang.switchLabel" />
          </span>
          <span className={label}>
            <FormattedMessage id="hero.lang.label" />
          </span>
          <span aria-hidden="true" className="flex items-center gap-3 font-display text-3xl font-bold">
            <span lang="en">EN</span>
            <span
              className={cn(
                'relative h-6 w-11 shrink-0 rounded-full transition-colors',
                locale === 'ar' ? 'bg-accent' : 'bg-line/15',
              )}
            >
              <span
                className={cn(
                  'absolute top-1 h-4 w-4 rounded-full bg-surface shadow transition-all',
                  locale === 'ar' ? 'end-1' : 'start-1',
                )}
              />
            </span>
            <span lang="ar">ع</span>
          </span>
          <span className="text-sm leading-relaxed text-muted">
            <FormattedMessage id="hero.lang.body" />
          </span>
        </button>

        <a
          href="#contact"
          className={cn(
            focusRing,
            'bg-gradient-brand flex flex-col justify-between gap-4 rounded-3xl p-5 text-white transition [grid-area:contact] hover:brightness-110',
          )}
        >
          <span className={cn(eyebrow, 'text-white/90')}>
            <FormattedMessage id="hero.contact.label" />
          </span>
          <span className="font-display text-2xl font-bold leading-tight">
            <FormattedMessage id="hero.contact.title" />
          </span>
          <span dir="ltr" className="truncate text-start font-mono text-sm text-white/90 rtl:text-end">
            {site.email}
          </span>
        </a>
      </div>
    </section>
  );
}
