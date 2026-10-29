import { flushSync } from 'react-dom';

type Options = {
  /** Marks a language flip, so CSS can reveal the new page in the direction it reads (see index.css). */
  flip?: 'ltr' | 'rtl';
};

/**
 * Runs a React state update inside a view transition, so the browser animates between the before and after
 * snapshots. flushSync makes the DOM change happen inside the callback, where the browser expects it.
 * Without support, or with reduced motion, the update just happens.
 */
export function withViewTransition(update: () => void, { flip }: Options = {}) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reducedMotion) {
    update();
    return;
  }

  const root = document.documentElement;
  if (flip) root.dataset.flip = flip;
  const transition = document.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => delete root.dataset.flip);
}
