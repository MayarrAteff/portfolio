const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

const buttonBase = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${focusRing}`;

export const button = {
  primary: `${buttonBase} bg-fg text-bg hover:opacity-85`,
  secondary: `${buttonBase} border border-line bg-surface text-fg hover:border-fg/40`,
};

export const iconButton = `inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-line bg-surface px-2.5 text-fg transition hover:border-fg/40 ${focusRing}`;
