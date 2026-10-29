import { FormattedMessage } from 'react-intl';

import type { MessageId } from '@/i18n/locale';

export function SectionHeading({ index, title }: { index: string; title: MessageId }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm text-accent">{index}</span>
      {/* Letter-spacing breaks the joins between Arabic letters, so it's reset in RTL. */}
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted rtl:tracking-normal">
        <FormattedMessage id={title} />
      </h2>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
