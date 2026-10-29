import { createContext, type ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react';

import type { MessageId } from '@/i18n/locale';

export type Inspected = {
  id: string;
  name: string;
  file: string;
  note: MessageId;
};

type XRayContextValue = {
  enabled: boolean;
  toggle: () => void;
};

type SelectionContextValue = {
  selected: Inspected | null;
  select: (target: Inspected | null) => void;
};

// Two contexts on purpose: clicking a label changes the selection, and only components that read the selection
// (the labels and the note panel) should re-render because of it. Sections that only care about `enabled` stay put.
const XRayContext = createContext<XRayContextValue | null>(null);
const SelectionContext = createContext<SelectionContextValue | null>(null);

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}

export function XRayProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => new URLSearchParams(window.location.search).get('xray') === '1');
  const [selected, setSelected] = useState<Inspected | null>(null);

  const toggle = useCallback(() => {
    setEnabled((value) => !value);
    setSelected(null);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('xray', enabled);
    // Mirror the mode in the URL, so a recruiter can send "?xray=1" straight to an engineer.
    const url = new URL(window.location.href);
    if (enabled) url.searchParams.set('xray', '1');
    else url.searchParams.delete('xray');
    window.history.replaceState(window.history.state, '', url);
  }, [enabled]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return;
      // event.code is the physical key, so the shortcut also works with an Arabic keyboard layout.
      if (event.code === 'KeyX') toggle();
      if (event.key === 'Escape') setSelected(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  const xray = useMemo(() => ({ enabled, toggle }), [enabled, toggle]);
  const selection = useMemo(() => ({ selected, select: setSelected }), [selected]);

  return (
    <XRayContext value={xray}>
      <SelectionContext value={selection}>{children}</SelectionContext>
    </XRayContext>
  );
}

export function useXRay() {
  const context = use(XRayContext);
  if (!context) throw new Error('useXRay must be used inside XRayProvider');
  return context;
}

export function useXRaySelection() {
  const context = use(SelectionContext);
  if (!context) throw new Error('useXRaySelection must be used inside XRayProvider');
  return context;
}
