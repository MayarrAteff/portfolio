import { FormattedMessage, useIntl } from 'react-intl';

import { GraduationCapIcon } from '@/components/icons';
import { SectionHeading } from '@/components/SectionHeading';
import { education, roles } from '@/data/experience';
import { useLocale } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';
import { card, eyebrow } from '@/lib/styles';

/** The CGPA as a ring: the arc is the share of the maximum, drawn with the site's gradient. */
function GpaRing({ value, max }: { value: number; max: number }) {
  const intl = useIntl();
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const shown = intl.formatNumber(value, { minimumFractionDigits: 1 });

  return (
    <div className="relative grid h-20 w-20 shrink-0 place-items-center">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id="gpa-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'rgb(var(--g1))' }} />
            <stop offset="0.5" style={{ stopColor: 'rgb(var(--g2))' }} />
            <stop offset="1" style={{ stopColor: 'rgb(var(--g3))' }} />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r={radius} fill="none" strokeWidth="5" className="stroke-line/10" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          stroke="url(#gpa-gradient)"
          strokeDasharray={`${(value / max) * circumference} ${circumference}`}
        />
      </svg>
      <span aria-hidden="true" className="relative text-center leading-none">
        <span className="block font-display text-xl font-bold">{shown}</span>
        <span dir="ltr" className="font-mono text-[10px] text-muted">
          / {intl.formatNumber(max, { minimumFractionDigits: 1 })}
        </span>
      </span>
      <span className="sr-only">
        <FormattedMessage id="experience.gpaValue" values={{ value: shown, max }} />
      </span>
    </div>
  );
}

/**
 * A credential, not a job, so it gets its own look: a gradient outline, a cap, the honors as a badge and the
 * CGPA as a ring, under its own label rather than in line with the roles.
 */
function Education() {
  const { locale } = useLocale();

  return (
    <div className="reveal mt-14">
      <p className={cn('flex items-center gap-2 text-muted', eyebrow)}>
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        <FormattedMessage id="experience.education" />
      </p>
      <div className="mt-4 rounded-3xl bg-gradient-to-br from-[rgb(var(--g1)/0.5)] via-[rgb(var(--g2)/0.2)] to-[rgb(var(--g3)/0.5)] p-px">
        <div className="relative grid items-center gap-5 overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface p-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-7 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -end-24 -top-24 h-64 w-64 bg-[radial-gradient(closest-side,rgb(var(--g2)/0.14),transparent)]"
          />
          <span className="bg-gradient-brand relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg shadow-violet-500/20">
            <GraduationCapIcon className="h-7 w-7" />
          </span>
          <div className="relative min-w-0">
            <h3 className="text-balance font-display text-xl font-bold tracking-tight sm:text-2xl rtl:tracking-normal">
              {education.degree[locale]}
            </h3>
            <p className="mt-1 text-muted">
              {education.school[locale]} ·{' '}
              <span dir="ltr" className="font-mono text-sm">
                {education.years}
              </span>
            </p>
            <span className="mt-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {education.honors[locale]}
            </span>
          </div>
          <div className="relative flex items-center gap-3 sm:flex-col sm:gap-1.5">
            <GpaRing value={education.gpa.value} max={education.gpa.max} />
            <span aria-hidden="true" className={cn(eyebrow, 'text-muted')}>
              <FormattedMessage id="experience.gpa" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const intl = useIntl();
  const { locale } = useLocale();
  const month = (value: string) => intl.formatDate(`${value}-01T00:00:00`, { month: 'short', year: 'numeric' });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading label="section.experience.label" title="section.experience.title" />

      {/* On wide screens, hovering one role dims the others, so the one being read stands out. */}
      <ol className="group/roles mt-12 grid gap-3">
        {/* The reveal animates the list item; the card inside keeps its own opacity for the hover dimming. */}
        {roles.map((role) => (
          <li key={role.company} className="reveal">
            <div
              className={cn(
                card,
                'grid gap-3 p-6 transition duration-300 hover:border-line/20 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8 sm:p-8 lg:hover:!opacity-100 lg:group-hover/roles:opacity-60',
              )}
            >
              <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-start">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {month(role.start)} – {role.end ? month(role.end) : <FormattedMessage id="experience.present" />}
                </p>
                {!role.end && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                    <FormattedMessage id="experience.now" />
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight rtl:tracking-normal">{role.company}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{role.title[locale]}</p>
                <ul className="mt-4 space-y-2 text-muted">
                  {role.points.map((point) => (
                    <li key={point.en} className="flex gap-2.5 leading-relaxed">
                      <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-line/25" />
                      {point[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <Education />
    </section>
  );
}
