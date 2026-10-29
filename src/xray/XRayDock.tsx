import { lazy, Suspense } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { cn } from '@/lib/cn';

import { Inspect } from './Inspect';
import { XRayPanel } from './XRayPanel';
import { useXRay } from './XRayProvider';

// Only downloaded the first time X-ray turns on.
const PerfHud = lazy(() => import('./PerfHud').then((module) => ({ default: module.PerfHud })));

export function XRayDock() {
  const intl = useIntl();
  const { enabled, toggle } = useXRay();

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:end-4 sm:w-96">
      {enabled && (
        <>
          <XRayPanel />
          <Suspense fallback={null}>
            <div className="pointer-events-auto w-full">
              <PerfHud />
            </div>
          </Suspense>
        </>
      )}
      <Inspect
        name="XRayDock"
        file="src/xray/XRayDock.tsx"
        note="xray.note.dock"
        label="top"
        className="pointer-events-auto rounded-full"
      >
        <button
          type="button"
          onClick={toggle}
          aria-pressed={enabled}
          title={intl.formatMessage({ id: 'xray.toggleLabel' })}
          className={cn(
            'flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur transition',
            enabled ? 'border-xray bg-xray text-bg' : 'border-line bg-surface/90 text-fg hover:border-xray',
          )}
        >
          <span className="relative flex h-2 w-2">
            {!enabled && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xray opacity-60 motion-reduce:hidden" />
            )}
            <span className={cn('relative inline-flex h-2 w-2 rounded-full', enabled ? 'bg-bg' : 'bg-xray')} />
          </span>
          <FormattedMessage id="xray.toggle" />
          <kbd className={cn('rounded border px-1.5 font-mono text-xs', enabled ? 'border-bg/40' : 'border-line')}>
            X
          </kbd>
        </button>
      </Inspect>
    </div>
  );
}
