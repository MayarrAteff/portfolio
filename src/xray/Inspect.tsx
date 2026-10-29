import { type ReactNode, useId } from 'react';
import { useIntl } from 'react-intl';

import type { MessageId } from '@/i18n/locale';
import { cn } from '@/lib/cn';

import { useRenderCount } from './useRenderCount';
import { useXRay, useXRaySelection } from './XRayProvider';

const labelPosition = {
  tab: 'start-0 top-0 rounded-ee-md',
  top: 'end-2 top-0 -translate-y-1/2 rounded-md',
  below: 'inset-x-0 bottom-0 mx-auto w-fit translate-y-1/2 rounded-md',
};

type InspectProps = {
  /** Component name shown on the label. */
  name: string;
  /** Path from the repo root, linked to GitHub from the note panel. */
  file: string;
  /** Translated note explaining why the component is built this way. */
  note: MessageId;
  /** Count-only label, for tight spots like header buttons and cards. */
  compact?: boolean;
  /**
   * Where the label sits. `tab` is pinned inside the top corner, so it never hides under the sticky header;
   * `top` straddles the top edge at the end side; `below` is centred under small controls.
   */
  label?: 'tab' | 'top' | 'below';
  className?: string;
  children: ReactNode;
};

export function Inspect({ name, file, note, compact, label = 'tab', className, children }: InspectProps) {
  const id = useId();
  const intl = useIntl();
  const { enabled } = useXRay();
  const { selected, select } = useXRaySelection();
  const { countRef, flashRef } = useRenderCount(children, (count) =>
    intl.formatMessage({ id: compact ? 'xray.rendersShort' : 'xray.renders' }, { count }),
  );
  const isSelected = selected?.id === id;

  return (
    <div className={cn('relative', className)}>
      {children}
      {enabled && (
        <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-dashed border-xray/70">
          <div ref={flashRef} className="absolute inset-0 rounded-[inherit] bg-xray/20 opacity-0" />
          <button
            type="button"
            title={`<${name} />`}
            aria-pressed={isSelected}
            onClick={() => select(isSelected ? null : { id, name, file, note })}
            className={cn(
              'pointer-events-auto absolute z-20 flex items-center gap-1.5 whitespace-nowrap px-1.5 py-0.5 font-mono text-[11px] leading-4 shadow-sm transition-colors',
              labelPosition[label],
              isSelected ? 'bg-fg text-bg' : 'bg-xray text-bg hover:bg-fg',
            )}
          >
            {compact ? <span className="sr-only">{name}</span> : <span dir="ltr">{`<${name} />`}</span>}
            <span ref={countRef} dir="ltr" className={compact ? undefined : 'opacity-80'} />
          </button>
        </div>
      )}
    </div>
  );
}
