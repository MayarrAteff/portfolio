import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { CheckIcon, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { button, card, eyebrow, iconButton } from '@/lib/styles';

export function Contact() {
  const intl = useIntl();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function copyEmail() {
    navigator.clipboard?.writeText(site.email).then(
      () => setCopied(true),
      () => {
        // Clipboard can be refused; the address is still on screen to select.
      },
    );
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className={cn(card, 'relative overflow-hidden p-8 sm:p-14')}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-40 -top-48 h-[28rem] w-[28rem] bg-[radial-gradient(closest-side,rgb(var(--g1)/0.18),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -end-40 h-[28rem] w-[28rem] bg-[radial-gradient(closest-side,rgb(var(--g3)/0.16),transparent)]"
        />

        <div className="relative max-w-2xl">
          <p className={cn('flex items-center gap-2 text-muted', eyebrow)}>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            <FormattedMessage id="section.contact.label" />
          </p>
          <h2 className="mt-3 text-balance font-display text-4xl font-bold tracking-tight sm:text-6xl rtl:tracking-normal">
            <FormattedMessage id="section.contact.title" />
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            <FormattedMessage id="contact.body" />
          </p>
        </div>

        <div className="relative mt-10 flex flex-wrap items-center gap-3">
          <div className="flex min-w-0 max-w-full items-center gap-1 rounded-2xl border border-line/10 bg-surface-2/60 py-1.5 pe-1.5 ps-4">
            <a href={`mailto:${site.email}`} dir="ltr" className="truncate font-mono text-sm sm:text-base">
              {site.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={intl.formatMessage({ id: copied ? 'contact.copied' : 'contact.copy' })}
              title={intl.formatMessage({ id: 'contact.copy' })}
              className={cn(iconButton, 'shrink-0 rounded-xl')}
            >
              {copied ? <CheckIcon className="text-emerald-500" /> : <CopyIcon />}
            </button>
          </div>
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
      </div>
    </section>
  );
}
