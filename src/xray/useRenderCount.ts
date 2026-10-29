import { type ReactNode, useLayoutEffect, useRef } from 'react';

const NOT_RENDERED = Symbol('not-rendered');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/**
 * Counts renders of the component that owns an <Inspect>.
 *
 * When the owner renders, it creates a new `children` element for <Inspect>. When <Inspect> renders only because
 * X-ray context changed, `children` is the same object, so that render isn't counted. The label is written straight
 * to the DOM, so counting never causes a render of its own.
 */
export function useRenderCount(children: ReactNode, format: (count: number) => string) {
  const count = useRef(0);
  const lastChildren = useRef<ReactNode | typeof NOT_RENDERED>(NOT_RENDERED);
  const countRef = useRef<HTMLSpanElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (lastChildren.current !== children) {
      lastChildren.current = children;
      count.current += 1;
      if (!reducedMotion.matches) {
        flashRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: 'ease-out' });
      }
    }
    if (countRef.current) countRef.current.textContent = format(count.current);
  });

  return { countRef, flashRef };
}
