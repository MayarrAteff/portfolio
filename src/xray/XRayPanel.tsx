import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { CloseIcon } from '@/components/icons';
import { site } from '@/data/site';
import { richText } from '@/i18n/richText';

import { useXRaySelection } from './XRayProvider';

export function XRayPanel() {
  const intl = useIntl();
  const { selected, select } = useXRaySelection();
  const [showIntro, setShowIntro] = useState(true);

  if (!selected && !showIntro) return null;

  function close() {
    select(null);
    setShowIntro(false);
  }

  return (
    <div className="pointer-events-auto max-h-[40vh] w-full overflow-y-auto rounded-xl border border-xray/40 bg-surface/95 p-4 text-sm shadow-xl backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        {selected ? (
          <p dir="ltr" className="font-mono font-semibold text-xray">{`<${selected.name} />`}</p>
        ) : (
          <p className="font-semibold text-xray">
            <FormattedMessage id="xray.panel.introTitle" />
          </p>
        )}
        <button
          type="button"
          onClick={close}
          aria-label={intl.formatMessage({ id: 'xray.panel.close' })}
          className="-m-1 rounded-md p-1 text-muted transition hover:text-fg"
        >
          <CloseIcon />
        </button>
      </div>
      {selected ? (
        <>
          <p className="mt-2 leading-relaxed text-muted">
            <FormattedMessage id={selected.note} values={richText} />
          </p>
          <a
            href={site.sourceBase + selected.file}
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            className="mt-3 inline-block break-all font-mono text-xs text-accent underline-offset-4 hover:underline"
          >
            {selected.file} ↗
          </a>
        </>
      ) : (
        <p className="mt-1 leading-relaxed text-muted">
          <FormattedMessage id="xray.panel.intro" />
        </p>
      )}
    </div>
  );
}
