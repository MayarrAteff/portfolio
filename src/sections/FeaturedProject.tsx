import { FormattedMessage } from 'react-intl';

import { BoardPreview } from '@/components/BoardPreview';
import { ArrowUpRightIcon, GitHubIcon } from '@/components/icons';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { hireflow } from '@/data/projects';
import { useLocale } from '@/i18n/LocaleProvider';
import { button } from '@/lib/styles';
import { Inspect } from '@/xray/Inspect';

const subheading = 'text-xs font-semibold uppercase tracking-[0.15em] text-accent rtl:tracking-normal';

export function FeaturedProject() {
  const { locale } = useLocale();

  return (
    <Inspect name="FeaturedProject" file="src/sections/FeaturedProject.tsx" note="xray.note.project">
      <section id="work" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading index="01" title="section.work" />
        <Reveal className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="p-6 sm:p-10">
              <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{hireflow.name}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted">{hireflow.tagline[locale]}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={hireflow.live} target="_blank" rel="noreferrer" className={button.primary}>
                  <FormattedMessage id="project.live" />
                  <ArrowUpRightIcon />
                </a>
                <a href={hireflow.repo} target="_blank" rel="noreferrer" className={button.secondary}>
                  <GitHubIcon />
                  <FormattedMessage id="project.code" />
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">
                {hireflow.stack.map((tool) => (
                  <li key={tool} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            <BoardPreview />
          </div>

          <div className="grid gap-8 border-t border-line p-6 sm:p-10 md:grid-cols-3">
            <div>
              <h4 className={subheading}>
                <FormattedMessage id="project.problem" />
              </h4>
              <p className="mt-3 leading-relaxed text-muted">{hireflow.problem[locale]}</p>
            </div>
            <div>
              <h4 className={subheading}>
                <FormattedMessage id="project.decisions" />
              </h4>
              <ul className="mt-3 space-y-2 text-muted">
                {hireflow.decisions.map((decision) => (
                  <li key={decision.en} className="flex gap-2 leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {decision[locale]}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={subheading}>
                <FormattedMessage id="project.learned" />
              </h4>
              <p className="mt-3 leading-relaxed text-muted">{hireflow.learned[locale]}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </Inspect>
  );
}
