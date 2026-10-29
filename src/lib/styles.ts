import type { CSSProperties } from 'react';

/** Position in a row, for the `--stagger` delay the reveal animations read (see index.css). */
export const stagger = (index: number) => ({ '--stagger': index }) as CSSProperties;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

const buttonBase = `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${focusRing}`;

export const button = {
  primary: `${buttonBase} bg-fg text-bg hover:bg-fg/85`,
  secondary: `${buttonBase} border border-line/10 bg-surface-2/60 text-fg hover:border-line/25`,
};

export const iconButton = `inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-line/10 bg-surface/70 px-2.5 text-fg transition hover:border-line/25 ${focusRing}`;

/** The one card style the whole site uses, so the hero's bento and the sections below read as one system. */
export const card = 'rounded-3xl border border-line/10 bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.04)]';

export const chip = 'rounded-full border border-line/10 bg-surface-2/60 px-3 py-1 font-mono text-xs text-muted';

/**
 * Small uppercase labels; the color is left to the caller. Letter-spacing breaks the joins between Arabic letters,
 * so it's reset in RTL.
 */
export const eyebrow =
  'font-mono text-xs uppercase tracking-[0.14em] rtl:font-sans rtl:normal-case rtl:tracking-normal';

export { focusRing };
