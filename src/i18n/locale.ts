import type en from './en.json';

export type Locale = 'en' | 'ar';

/** Content written in both languages. Leaving one out is a type error, not a missing string on the page. */
export type Localized = Record<Locale, string>;

export type MessageId = keyof typeof en;
