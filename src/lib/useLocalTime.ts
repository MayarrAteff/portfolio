import { useEffect, useState } from 'react';

const zone = 'Africa/Cairo';
const offsetFormat = new Intl.DateTimeFormat('en', { timeZone: zone, timeZoneName: 'shortOffset' });

/** The current time in Alexandria and its UTC offset ("GMT+3"), refreshed every 15 seconds. */
export function useLocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  const offset = offsetFormat.formatToParts(now).find((part) => part.type === 'timeZoneName')?.value ?? '';
  return { now, zone, offset };
}
