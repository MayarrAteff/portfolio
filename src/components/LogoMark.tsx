import { cn } from '@/lib/cn';

/** The site's mark, also the favicon: an M selected like a layer in a design tool, resize handles and all. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('h-8 w-8 shrink-0', className)}>
      <rect width="64" height="64" rx="16" fill="#111118" />
      <rect x="11" y="13" width="42" height="38" fill="none" stroke="#8b7bff" strokeWidth="2.5" />
      <path
        d="M21 42V23l11 11 11-11v19"
        fill="none"
        stroke="#fff"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="#fff" stroke="#8b7bff" strokeWidth="2">
        <rect x="7" y="9" width="8" height="8" rx="1.5" />
        <rect x="49" y="9" width="8" height="8" rx="1.5" />
        <rect x="7" y="47" width="8" height="8" rx="1.5" />
        <rect x="49" y="47" width="8" height="8" rx="1.5" />
      </g>
    </svg>
  );
}
