import { FormattedMessage } from 'react-intl';

import { site } from '@/data/site';
import { richText } from '@/i18n/richText';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 pb-24 pt-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <FormattedMessage id="footer.built" />{' '}
          <a
            href={site.repo}
            target="_blank"
            rel="noreferrer"
            className="text-fg underline decoration-line underline-offset-4 transition hover:decoration-fg"
          >
            <FormattedMessage id="footer.source" />
          </a>
        </p>
        <p>
          <FormattedMessage id="footer.hint" values={richText} />
        </p>
      </div>
    </footer>
  );
}
