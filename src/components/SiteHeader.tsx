import { FormattedMessage } from 'react-intl';

import type { MessageId } from '@/i18n/locale';
import { Inspect } from '@/xray/Inspect';

import { LangToggle } from './LangToggle';
import { ThemeToggle } from './ThemeToggle';

const links: { href: string; label: MessageId }[] = [
  { href: '#work', label: 'nav.work' },
  { href: '#experience', label: 'nav.experience' },
  { href: '#skills', label: 'nav.skills' },
  { href: '#contact', label: 'nav.contact' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <Inspect name="SiteHeader" file="src/components/SiteHeader.tsx" note="xray.note.header">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="text-base font-semibold tracking-tight">
            <FormattedMessage id="hero.name" />
            <span className="text-accent">.</span>
          </a>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex gap-7 text-sm text-muted">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-fg">
                    <FormattedMessage id={link.label} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </Inspect>
    </header>
  );
}
