import { FormattedMessage } from 'react-intl';

import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import { Contact } from '@/sections/Contact';
import { Experience } from '@/sections/Experience';
import { Hero } from '@/sections/Hero';
import { Skills } from '@/sections/Skills';
import { Work } from '@/sections/Work';

export function App() {
  return (
    <LocaleProvider>
      <a
        href="#main"
        className="sr-only rounded-full bg-fg px-4 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60]"
      >
        <FormattedMessage id="nav.skip" />
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
