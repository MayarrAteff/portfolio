import { FormattedMessage } from 'react-intl';

import { ArrowDownIcon, DownloadIcon } from '@/components/icons';
import { site } from '@/data/site';
import type { MessageId } from '@/i18n/locale';
import { richText } from '@/i18n/richText';
import { button } from '@/lib/styles';
import { Inspect } from '@/xray/Inspect';
import { useXRay } from '@/xray/XRayProvider';

const facts: { value: string; label: MessageId }[] = [
  { value: '3+', label: 'hero.fact.years' },
  { value: '2', label: 'hero.fact.languages' },
  { value: '3', label: 'hero.fact.portals' },
];

export function Hero() {
  const { enabled, toggle } = useXRay();

  return (
    <Inspect name="Hero" file="src/sections/Hero.tsx" note="xray.note.hero">
      <section id="top" className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-28">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted sm:text-sm rtl:font-sans rtl:normal-case rtl:tracking-normal">
          <FormattedMessage id="hero.eyebrow" />
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl rtl:tracking-normal">
          <FormattedMessage id="hero.name" />
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          <FormattedMessage id="hero.lead" />
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#work" className={button.primary}>
            <FormattedMessage id="hero.work" />
            <ArrowDownIcon />
          </a>
          <a href={site.cv} download className={button.secondary}>
            <DownloadIcon />
            <FormattedMessage id="hero.cv" />
          </a>
        </div>

        <div className="mt-8 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-dashed border-xray/50 bg-xray/5 px-4 py-3 text-sm">
          <span className="font-medium">
            <FormattedMessage id="hero.curious" />
          </span>
          <span className="text-muted">
            <FormattedMessage id="hero.press" values={richText} />
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            className="font-medium text-xray underline decoration-xray/40 underline-offset-4 transition hover:decoration-xray"
          >
            <FormattedMessage id={enabled ? 'hero.xrayOff' : 'hero.xrayOn'} />
          </button>
        </div>

        <dl className="mt-16 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
          {facts.map((fact) => (
            // dt comes first for screen readers; flex-col-reverse shows the number on top.
            <div key={fact.label} className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-muted">
                <FormattedMessage id={fact.label} />
              </dt>
              <dd dir="ltr" className="text-start text-4xl font-semibold tracking-tight rtl:text-end">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Inspect>
  );
}
