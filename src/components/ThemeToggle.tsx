import { useState } from 'react';
import { useIntl } from 'react-intl';

import { iconButton } from '@/lib/styles';
import { Inspect } from '@/xray/Inspect';

import { MoonIcon, SunIcon } from './icons';

export function ThemeToggle() {
  const intl = useIntl();
  // The class on <html> is the source of truth (index.html sets it before first paint); this state only drives the icon.
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Storage can be blocked; the theme still switches for this visit.
    }
    setDark(next);
  }

  return (
    <Inspect
      name="ThemeToggle"
      file="src/components/ThemeToggle.tsx"
      note="xray.note.themeToggle"
      compact
      label="below"
      className="rounded-full"
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={intl.formatMessage({ id: dark ? 'theme.toLight' : 'theme.toDark' })}
        className={iconButton}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>
    </Inspect>
  );
}
