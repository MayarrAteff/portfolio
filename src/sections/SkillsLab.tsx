import { memo, useLayoutEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { SectionHeading } from '@/components/SectionHeading';
import { type Skill, type SkillGroup, skillGroups, skills } from '@/data/skills';
import { cn } from '@/lib/cn';
import { Inspect } from '@/xray/Inspect';

type MatchState = 'idle' | 'match' | 'dim';

const groupColor: Record<SkillGroup, string> = {
  frontend: 'bg-indigo-500',
  data: 'bg-emerald-500',
  architecture: 'bg-amber-500',
  backend: 'bg-rose-500',
  design: 'bg-sky-500',
};

// Cards that rendered in the current commit. Child layout effects run before the parent's, so by the time
// SkillsLab's effect runs, every card that rendered has already added itself.
const commitLog = { cards: 0 };

function matchState(skill: Skill, query: string): MatchState {
  if (!query) return 'idle';
  const needle = query.toLowerCase();
  const isMatch = [skill.name, ...(skill.keywords ?? [])].some((text) => text.toLowerCase().includes(needle));
  return isMatch ? 'match' : 'dim';
}

function SkillCard({ skill, state }: { skill: Skill; state: MatchState }) {
  useLayoutEffect(() => {
    commitLog.cards += 1;
  });

  return (
    <Inspect
      name="SkillCard"
      file="src/sections/SkillsLab.tsx"
      note="xray.note.skillCard"
      label="top"
      compact
      className="rounded-xl"
    >
      <div
        className={cn(
          'flex h-full items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition duration-200',
          state === 'match' ? 'border-accent/60 bg-accent/10' : 'border-line bg-surface',
          state === 'dim' && 'opacity-35',
        )}
      >
        <span aria-hidden="true" className={cn('h-2 w-2 shrink-0 rounded-full', groupColor[skill.group])} />
        <span dir="ltr" className="truncate">
          {skill.name}
        </span>
      </div>
    </Inspect>
  );
}

const MemoSkillCard = memo(SkillCard);

export function SkillsLab() {
  const intl = useIntl();
  const [query, setQuery] = useState('');
  const [memoOn, setMemoOn] = useState(false);
  const renderedRef = useRef<HTMLElement>(null);
  const trimmed = query.trim();
  const matches = skills.filter((skill) => matchState(skill, trimmed) !== 'dim').length;
  // Switching the component type remounts every card, which is why the counters reset when memo is toggled.
  const Card = memoOn ? MemoSkillCard : SkillCard;

  useLayoutEffect(() => {
    if (renderedRef.current) renderedRef.current.textContent = String(commitLog.cards);
    commitLog.cards = 0;
  });

  return (
    <Inspect name="SkillsLab" file="src/sections/SkillsLab.tsx" note="xray.note.skillsLab">
      <section id="skills" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading index="03" title="section.skills" />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          <FormattedMessage id="skills.lead" />
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <label className="flex-1">
            <span className="sr-only">
              <FormattedMessage id="skills.filter" />
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={intl.formatMessage({ id: 'skills.placeholder' })}
              className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-base outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={memoOn}
            onClick={() => setMemoOn((value) => !value)}
            className="inline-flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 font-mono text-sm transition hover:border-fg/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span dir="ltr">
              <FormattedMessage id="skills.memo" />
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn('relative h-5 w-9 rounded-full transition-colors', memoOn ? 'bg-accent' : 'bg-line')}
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all',
                    memoOn ? 'start-[1.125rem]' : 'start-0.5',
                  )}
                />
              </span>
              <span className="min-w-[3ch] text-muted">
                <FormattedMessage id={memoOn ? 'skills.on' : 'skills.off'} />
              </span>
            </span>
          </button>
        </div>

        <p className="mt-3 text-sm text-muted">
          <FormattedMessage
            id="skills.stats"
            values={{
              total: skills.length,
              rendered: '',
              // The number is written in the layout effect above; React never manages this element's text.
              b: () => <b ref={renderedRef} className="font-mono font-semibold text-fg" />,
            }}
          />
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          {skillGroups.map((group) => (
            <li key={group} className="flex items-center gap-2">
              <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', groupColor[group])} />
              <FormattedMessage id={`skills.group.${group}` as const} />
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill) => (
            <Card key={skill.name} skill={skill} state={matchState(skill, trimmed)} />
          ))}
        </div>

        {trimmed && matches === 0 && (
          <p className="mt-4 text-sm text-muted">
            <FormattedMessage id="skills.empty" values={{ query: trimmed }} />
          </p>
        )}
      </section>
    </Inspect>
  );
}
