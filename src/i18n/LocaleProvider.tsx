import { createContext, type ReactNode, use, useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';

import ar from './ar.json';
import en from './en.json';
import type { Locale } from './locale';

// Typing `ar` as `typeof en` makes a key missing from the Arabic file a compile error.
const messages: Record<Locale, typeof en> = { en, ar };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  // index.html already applied the saved locale to <html> before first paint.
  const [locale, setLocale] = useState<Locale>(() => (document.documentElement.lang === 'ar' ? 'ar' : 'en'));

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('locale', locale);
    } catch {
      // Storage can be blocked (private mode); the page still works, it just won't remember.
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <LocaleContext value={value}>
      <IntlProvider locale={locale === 'ar' ? 'ar-u-nu-latn' : 'en'} messages={messages[locale]} defaultLocale="en">
        {children}
      </IntlProvider>
    </LocaleContext>
  );
}

export function useLocale() {
  const context = use(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
