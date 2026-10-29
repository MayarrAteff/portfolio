import { FormattedMessage } from 'react-intl';

import { useLocale } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';
import { iconButton } from '@/lib/styles';

/** Shows both languages with the current one lit, so it's clear what the button does in either language. */
export function LangToggle() {
  const { locale, setLocale } = useLocale();
  const next = locale === 'en' ? 'ar' : 'en';

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      className={cn(iconButton, 'gap-1.5 px-3 text-xs font-semibold')}
    >
      <span className="sr-only">
        <FormattedMessage id="lang.switchLabel" />
      </span>
      <span lang="en" className={locale === 'en' ? 'text-fg' : 'text-muted'}>
        EN
      </span>
      <span aria-hidden="true" className="text-muted">
        ·
      </span>
      <span lang="ar" className={cn('text-sm', locale === 'ar' ? 'text-fg' : 'text-muted')}>
        ع
      </span>
    </button>
  );
}
