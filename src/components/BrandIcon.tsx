import type { CSSProperties } from 'react';
import type { SimpleIcon } from 'simple-icons';

import { cn } from '@/lib/cn';

function luminance(hex: string) {
  const value = parseInt(hex, 16);
  const channel = (shift: number) => ((value >> shift) & 255) / 255;
  return 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0);
}

/**
 * A tool's logo in its brand color; size it with `className`. Colors that would vanish into one theme (GitHub's near-black on dark,
 * TanStack's near-white on light) switch to the text color there; the rule lives in index.css.
 */
export function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  const tone = luminance(icon.hex);
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ '--brand': `#${icon.hex}` } as CSSProperties}
      className={cn('brand-icon shrink-0', tone < 0.1 && 'brand-dark', tone > 0.78 && 'brand-light', className)}
    >
      <path d={icon.path} />
    </svg>
  );
}
