import { FormattedMessage } from 'react-intl';

import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/data/site';
import { button } from '@/lib/styles';
import { Inspect } from '@/xray/Inspect';

export function Contact() {
  return (
    <Inspect name="Contact" file="src/sections/Contact.tsx" note="xray.note.contact">
      <section id="contact" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading index="04" title="section.contact" />
        <Reveal className="mt-10 rounded-3xl border border-line bg-surface p-6 sm:p-12">
          <h3 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl rtl:tracking-normal">
            <FormattedMessage id="contact.title" />
          </h3>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            <FormattedMessage id="contact.body" />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className={button.primary}>
              <MailIcon />
              <FormattedMessage id="contact.email" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className={button.secondary}>
              <LinkedInIcon />
              <FormattedMessage id="contact.linkedin" />
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className={button.secondary}>
              <GitHubIcon />
              <FormattedMessage id="contact.github" />
            </a>
            <a href={site.cv} download className={button.secondary}>
              <DownloadIcon />
              <FormattedMessage id="contact.cv" />
            </a>
          </div>
          <p dir="ltr" className="mt-6 text-start font-mono text-sm text-muted rtl:text-end">
            {site.email}
          </p>
        </Reveal>
      </section>
    </Inspect>
  );
}
