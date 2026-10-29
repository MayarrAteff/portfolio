import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import type { MessageId } from '@/i18n/locale';
import { cn } from '@/lib/cn';
import { eyebrow } from '@/lib/styles';

type SectionHeadingProps = {
  label: MessageId;
  title: MessageId;
  /** Optional lead paragraph under the title. */
  children?: ReactNode;
};

export function SectionHeading({ label, title, children }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className={cn('flex items-center gap-2 text-muted', eyebrow)}>
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        <FormattedMessage id={label} />
      </p>
      <h2 className="mt-3 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl rtl:tracking-normal">
        <FormattedMessage id={title} />
      </h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted">{children}</p>}
    </div>
  );
}
