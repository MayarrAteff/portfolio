import { FormattedMessage } from 'react-intl';

import { site } from '@/data/site';

import { ArrowUpRightIcon } from './icons';

export function Footer() {
  return (
    <footer className="border-t border-line/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <FormattedMessage id="footer.built" />
        </p>
        <a
          href={site.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-fg underline decoration-line/20 underline-offset-4 transition hover:decoration-fg"
        >
          <FormattedMessage id="footer.source" />
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
