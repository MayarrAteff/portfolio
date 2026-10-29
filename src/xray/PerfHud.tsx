import { use, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { ChevronIcon } from '@/components/icons';
import type { MessageId } from '@/i18n/locale';
import { cn } from '@/lib/cn';
import { type Rating, useVitals } from '@/lib/vitals';

import { Inspect } from './Inspect';

type BuildStats = { initialJs: number; lazyJs: number; css: number };

// Fetched once, when this lazy chunk first loads. `use()` suspends until it resolves.
const buildStatsPromise: Promise<BuildStats | null> = import.meta.env.DEV
  ? Promise.resolve(null)
  : fetch('/build-stats.json')
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null);

const ratingColor: Record<Rating, string> = {
  good: 'text-emerald-600 dark:text-emerald-400',
  'needs-improvement': 'text-amber-600 dark:text-amber-400',
  poor: 'text-rose-600 dark:text-rose-400',
};

function useFrameStats() {
  const [stats, setStats] = useState({ fps: 0, domNodes: 0 });

  useEffect(() => {
    let frames = 0;
    let start = performance.now();
    let id = requestAnimationFrame(function loop(now) {
      frames += 1;
      if (now - start >= 1000) {
        setStats({
          fps: Math.round((frames * 1000) / (now - start)),
          domNodes: document.getElementsByTagName('*').length,
        });
        frames = 0;
        start = now;
      }
      id = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return stats;
}

// Collapsed on phones so the dock doesn't cover half the screen. <details> keeps its own open state natively.
const startsOpen = window.matchMedia('(min-width: 640px)').matches;

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

function Metric({ label, value, rating }: { label: string; value?: string; rating?: Rating }) {
  return (
    <div className="min-w-0">
      <dt className="truncate text-[10px] uppercase tracking-wide text-muted">{label}</dt>
      <dd
        dir="ltr"
        className={cn('text-start font-mono text-sm tabular-nums rtl:text-end', rating && ratingColor[rating])}
      >
        {value ?? '—'}
      </dd>
    </div>
  );
}

export function PerfHud() {
  const intl = useIntl();
  const build = use(buildStatsPromise);
  const { LCP, CLS, INP } = useVitals();
  const { fps, domNodes } = useFrameStats();
  const label = (id: MessageId) => intl.formatMessage({ id });

  return (
    <Inspect
      name="PerfHud"
      file="src/xray/PerfHud.tsx"
      note="xray.note.perfHud"
      label="top"
      className="w-full rounded-xl"
    >
      <details
        open={startsOpen}
        className="group rounded-xl border border-line bg-surface/95 p-3 shadow-lg backdrop-blur"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold [&::-webkit-details-marker]:hidden">
          <FormattedMessage id="xray.hud.title" />
          <ChevronIcon className="h-3.5 w-3.5 text-muted transition-transform group-open:rotate-180" />
        </summary>
        <dl className="mt-2 grid grid-cols-4 gap-x-3 gap-y-2">
          <Metric label="LCP" value={LCP && `${(LCP.value / 1000).toFixed(2)} s`} rating={LCP?.rating} />
          <Metric label="CLS" value={CLS?.value.toFixed(3)} rating={CLS?.rating} />
          <Metric label="INP" value={INP && `${Math.round(INP.value)} ms`} rating={INP?.rating} />
          <Metric label={label('xray.hud.fps')} value={fps ? String(fps) : undefined} />
          <Metric label={label('xray.hud.dom')} value={domNodes ? String(domNodes) : undefined} />
          <Metric label={label('xray.hud.initialJs')} value={build ? kb(build.initialJs) : undefined} />
          <Metric label={label('xray.hud.lazyJs')} value={build ? kb(build.lazyJs) : undefined} />
          <Metric label={label('xray.hud.css')} value={build ? kb(build.css) : undefined} />
        </dl>
        <p className="mt-2 text-[10px] text-muted">
          <FormattedMessage id={build ? 'xray.hud.gzip' : 'xray.hud.dev'} />
        </p>
      </details>
    </Inspect>
  );
}
