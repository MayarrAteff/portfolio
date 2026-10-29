import { FormattedMessage, useIntl } from 'react-intl';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { education, roles } from '@/data/experience';
import { useLocale } from '@/i18n/LocaleProvider';
import { Inspect } from '@/xray/Inspect';

export function Experience() {
  const intl = useIntl();
  const { locale } = useLocale();
  const month = (value: string) => intl.formatDate(`${value}-01T00:00:00`, { month: 'short', year: 'numeric' });

  return (
    <Inspect name="Experience" file="src/sections/Experience.tsx" note="xray.note.experience">
      <section id="experience" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading index="02" title="section.experience" />
        <ol className="mt-10 space-y-10">
          {roles.map((role, index) => (
            <li key={role.company} className="relative ps-8">
              <span
                aria-hidden="true"
                className="absolute start-0 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg"
              />
              {index < roles.length - 1 && (
                <span aria-hidden="true" className="absolute -bottom-10 start-[5px] top-6 w-px bg-line" />
              )}
              <Reveal>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-xl font-semibold">
                    {role.company} <span className="font-normal text-muted">· {role.title[locale]}</span>
                  </h3>
                  <p className="shrink-0 font-mono text-sm text-muted">
                    {month(role.start)} – {role.end ? month(role.end) : <FormattedMessage id="experience.present" />}
                  </p>
                </div>
                <ul className="mt-4 space-y-2 text-muted">
                  {role.points.map((point) => (
                    <li key={point.en} className="flex gap-2 leading-relaxed">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      {point[locale]}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent rtl:tracking-normal">
            <FormattedMessage id="experience.education" />
          </p>
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="text-lg font-semibold">
              {education.degree[locale]} <span className="font-normal text-muted">· {education.school[locale]}</span>
            </h3>
            <p dir="ltr" className="shrink-0 font-mono text-sm text-muted">
              {education.years}
            </p>
          </div>
          <p className="mt-2 text-muted">{education.grade[locale]}</p>
        </Reveal>
      </section>
    </Inspect>
  );
}
