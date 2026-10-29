import type { ReactNode } from 'react';

// Tags allowed inside translated messages, e.g. "Press <kbd>X</kbd>". dir="ltr" keeps code readable inside Arabic text.
export const richText = {
  code: (chunks: ReactNode[]) => (
    <code dir="ltr" className="rounded bg-xray/10 px-1 py-0.5 font-mono text-[0.85em] text-fg">
      {chunks}
    </code>
  ),
  kbd: (chunks: ReactNode[]) => (
    <kbd className="mx-0.5 rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-xs text-fg shadow-[0_1px_0_rgb(var(--line))]">
      {chunks}
    </kbd>
  ),
};
