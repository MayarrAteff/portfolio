import { FormattedMessage } from 'react-intl';

import { BoardPreview } from '@/components/BoardPreview';
import { ArrowUpRightIcon, GitHubIcon } from '@/components/icons';
import { QuotePreview } from '@/components/QuotePreview';
import { SectionHeading } from '@/components/SectionHeading';
import { hireflow, quotem } from '@/data/projects';
import type { MessageId } from '@/i18n/locale';
import { useLocale } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';
import { button, card, chip, eyebrow } from '@/lib/styles';

const title = 'mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl rtl:tracking-normal';
const subheading = cn(eyebrow, 'text-accent');

function Kind({ id }: { id: MessageId }) {
  return (
    <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
      <FormattedMessage id={id} />
    </span>
  );
}

function Bullet() {
  return <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />;
}

function Stack({ tools }: { tools: string[] }) {
  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {tools.map((tool) => (
        <li key={tool} className={chip}>
          {tool}
        </li>
      ))}
    </ul>
  );
}

export function Work() {
  const { locale } = useLocale();

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading label="section.work.label" title="section.work.title" />

      <article className={cn(card, 'reveal mt-12 overflow-hidden')}>
        <div className="grid lg:grid-cols-[1fr_1.15fr]">
          <div className="p-6 sm:p-10">
            <Kind id="project.side" />
            <h3 className={title}>{hireflow.name}</h3>
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
            <Stack tools={hireflow.stack} />
          </div>
          <BoardPreview />
        </div>

        <div className="grid gap-8 border-t border-line/10 p-6 sm:p-10 md:grid-cols-3">
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
                <li key={decision.en} className="flex gap-2.5 leading-relaxed">
                  <Bullet />
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
      </article>

      <article className={cn(card, 'reveal mt-6 grid overflow-hidden lg:grid-cols-[1.15fr_1fr]')}>
        <QuotePreview />
        <div className="p-6 sm:p-10">
          <Kind id="project.day" />
          <h3 className={title}>{quotem.name}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{quotem.tagline[locale]}</p>
          <h4 className={cn(subheading, 'mt-8')}>
            <FormattedMessage id="project.highlights" />
          </h4>
          <ul className="mt-3 space-y-2 text-muted">
            {quotem.highlights.map((highlight) => (
              <li key={highlight.en} className="flex gap-2.5 leading-relaxed">
                <Bullet />
                {highlight[locale]}
              </li>
            ))}
          </ul>
          <Stack tools={quotem.stack} />
          <p className="mt-6 text-xs text-muted">
            <FormattedMessage id="project.private" />
          </p>
        </div>
      </article>
    </section>
  );
}
