import { FormattedMessage } from 'react-intl';

import { site } from '@/data/site';
import type { MessageId } from '@/i18n/locale';
import { useLocale } from '@/i18n/LocaleProvider';

import { LangToggle } from './LangToggle';
import { LogoMark } from './LogoMark';
import { ThemeToggle } from './ThemeToggle';

const links: { href: string; label: MessageId }[] = [
  { href: '#work', label: 'nav.work' },
  { href: '#experience', label: 'nav.experience' },
  { href: '#skills', label: 'nav.skills' },
  { href: '#contact', label: 'nav.contact' },
];

/** A floating glass pill instead of a full-width bar, so the dotted page shows around it. */
export function SiteHeader() {
  const { locale } = useLocale();

  return (
    <header className="sticky top-3 z-40 px-4 sm:px-6">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full border border-line/10 bg-surface/70 py-1.5 pe-1.5 ps-2 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2.5 rounded-full pe-2 text-sm font-semibold">
          <LogoMark />
          <span className="sr-only sm:not-sr-only">{site.name[locale]}</span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-6 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-fg">
                  <FormattedMessage id={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5">
          <LangToggle />
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg transition hover:bg-fg/85"
          >
            <FormattedMessage id="nav.talk" />
          </a>
        </div>
      </div>
    </header>
  );
}
