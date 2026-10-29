import { FormattedMessage, useIntl } from 'react-intl';

import { useLocale } from '@/i18n/LocaleProvider';
import { iconButton } from '@/lib/styles';
import { Inspect } from '@/xray/Inspect';

export function LangToggle() {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();
  const next = locale === 'en' ? 'ar' : 'en';

  return (
    <Inspect
      name="LangToggle"
      file="src/components/LangToggle.tsx"
      note="xray.note.langToggle"
      compact
      label="below"
      className="rounded-full"
    >
      <button
        type="button"
        onClick={() => setLocale(next)}
        // The visible language name is the accessible name; the hint is only a tooltip.
        title={intl.formatMessage({ id: 'lang.switchLabel' })}
        className={`${iconButton} text-sm font-medium`}
      >
        <span lang={next}>
          <FormattedMessage id="lang.switch" />
        </span>
      </button>
    </Inspect>
  );
}
