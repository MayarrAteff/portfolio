import { useSyncExternalStore } from 'react';
import { type MetricType, onCLS, onINP, onLCP } from 'web-vitals';

export type Rating = MetricType['rating'];
type Vital = { value: number; rating: Rating };
type Vitals = Partial<Record<'LCP' | 'CLS' | 'INP', Vital>>;

let vitals: Vitals = {};
const listeners = new Set<() => void>();

function report(metric: MetricType) {
  vitals = { ...vitals, [metric.name]: { value: metric.value, rating: metric.rating } };
  listeners.forEach((listener) => listener());
}

/** Called once from main.tsx: LCP has to be observed from page load, long before anyone opens X-ray. */
export function startVitals() {
  onLCP(report, { reportAllChanges: true });
  onCLS(report, { reportAllChanges: true });
  onINP(report, { reportAllChanges: true });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useVitals() {
  return useSyncExternalStore(subscribe, () => vitals);
}
