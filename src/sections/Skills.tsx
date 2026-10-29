import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BrandIcon } from '@/components/BrandIcon';
import { SearchIcon } from '@/components/icons';
import { SectionHeading } from '@/components/SectionHeading';
import { type Skill, type SkillGroup, skillGroups, skills } from '@/data/skills';
import { cn } from '@/lib/cn';
import { card, focusRing } from '@/lib/styles';

type Filter = SkillGroup | 'all';

// Written out in full so Tailwind sees the class names (it drops classes that only exist as `tone-${group}`).
const tone: Record<SkillGroup, string> = {
  frontend: 'tone-frontend',
  data: 'tone-data',
  architecture: 'tone-architecture',
  backend: 'tone-backend',
  design: 'tone-design',
};

function matches(skill: Skill, query: string) {
  return !query || [skill.name, ...(skill.keywords ?? [])].some((text) => text.toLowerCase().includes(query));
}

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}

/** A tool without a logo gets two letters in its group's color. */
function Monogram({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[rgb(var(--c)/0.14)] font-mono text-[9px] font-bold text-[rgb(var(--c))]"
    >
      {name.replace(/[^A-Za-z]/g, '').slice(0, 2)}
    </span>
  );
}

/**
 * Grouped, so a recruiter can answer "can she do X?" from one card, with search and filters on top.
 * The search matches extra keywords too: "rtl" finds React Intl, "forms" finds React Hook Form.
 */
export function Skills() {
  const intl = useIntl();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const needle = query.trim().toLowerCase();
  const groups = filter === 'all' ? skillGroups : [filter];
  const hits = skills.filter((skill) => groups.includes(skill.group) && matches(skill, needle)).length;

  // "/" jumps to the search, as on GitHub and most docs sites.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || isTypingTarget(event.target)) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filters: { id: Filter; count: number }[] = [
    { id: 'all', count: skills.length },
    ...skillGroups.map((group) => ({ id: group, count: skills.filter((skill) => skill.group === group).length })),
  ];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading label="section.skills.label" title="section.skills.title">
        <FormattedMessage id="skills.lead" />
      </SectionHeading>

      <div className="mt-10 grid gap-4">
        <label className="flex items-center gap-3 rounded-2xl border border-line/10 bg-surface px-4 transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15">
          <SearchIcon className="h-5 w-5 text-muted" />
          <span className="sr-only">
            <FormattedMessage id="skills.search" />
          </span>
          <input
            ref={inputRef}
            id="skill-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={intl.formatMessage({ id: 'skills.placeholder' })}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-base outline-none placeholder:text-muted"
          />
          {needle ? (
            <span className="shrink-0 font-mono text-xs text-muted">
              <FormattedMessage id="skills.results" values={{ count: hits }} />
            </span>
          ) : (
            <kbd className="hidden shrink-0 rounded-md border border-line/15 px-1.5 py-0.5 font-mono text-xs text-muted sm:block">
              /
            </kbd>
          )}
        </label>
        <p aria-live="polite" className="sr-only">
          {needle && <FormattedMessage id="skills.results" values={{ count: hits }} />}
        </p>

        <div role="group" aria-label={intl.formatMessage({ id: 'skills.search' })} className="flex flex-wrap gap-2">
          {filters.map(({ id, count }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={cn(
                focusRing,
                id !== 'all' && tone[id],
                'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
                filter === id
                  ? 'border-[rgb(var(--c,var(--fg)))] bg-[rgb(var(--c,var(--fg))/0.1)] text-fg'
                  : 'border-line/10 bg-surface text-muted hover:text-fg',
              )}
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[rgb(var(--c,var(--fg)))]" />
              {id === 'all' ? (
                <FormattedMessage id="skills.all" />
              ) : (
                <FormattedMessage id={`skills.group.${id}` as const} />
              )}
              <span className="font-mono text-xs opacity-60">{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => {
          const groupSkills = skills.filter((skill) => skill.group === group);
          return (
            <div
              key={group}
              className={cn(
                card,
                tone[group],
                'tone-glow relative overflow-hidden p-6',
                // Frontend is the core of the job, so it gets the wide card.
                filter === 'all' && group === 'frontend' && 'lg:col-span-2',
              )}
            >
              <div className="relative flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2.5 font-semibold">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-[3px] bg-[rgb(var(--c))] shadow-[0_0_12px_rgb(var(--c))]"
                  />
                  <FormattedMessage id={`skills.group.${group}` as const} />
                </h3>
                <span className="font-mono text-xs text-muted">{groupSkills.length}</span>
              </div>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {groupSkills.map((skill) => {
                  const hit = matches(skill, needle);
                  return (
                    <li
                      key={skill.name}
                      dir="ltr"
                      className={cn(
                        'inline-flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-sm transition duration-200',
                        needle && hit && 'border-[rgb(var(--c))] bg-[rgb(var(--c)/0.1)]',
                        needle && !hit && 'border-line/10 opacity-30',
                        !needle && 'border-line/10 bg-surface-2/50 hover:-translate-y-0.5 hover:border-line/20',
                      )}
                    >
                      {skill.icon ? (
                        <BrandIcon icon={skill.icon} className="h-5 w-5" />
                      ) : (
                        <Monogram name={skill.name} />
                      )}
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {needle && hits === 0 && (
        <p className="mt-6 text-muted">
          <FormattedMessage id="skills.empty" values={{ query: query.trim() }} />
        </p>
      )}
    </section>
  );
}
