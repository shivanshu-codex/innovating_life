import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

const BUDGET = {
  LCP:  1500,
  INP:  100,
  CLS:  0.05,
  FCP:  800,
  TTFB: 200,
};

function sendVital({ name, value, rating, id, navigationType }) {
  if (document.visibilityState === 'hidden') return;

  const over = value > BUDGET[name];

  if (import.meta.env.DEV && over) {
    console.warn(`[Perf] ${name} ${value.toFixed(0)} exceeds budget ${BUDGET[name]} (${rating})`);
  }

  const payload = {
    metric:          name,
    value:           Math.round(name === 'CLS' ? value * 1000 : value),
    rating,
    id,
    page:            location.pathname,
    navigationType:  navigationType || 'navigate',
    overBudget:      over,
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      import.meta.env.VITE_ANALYTICS_ENDPOINT || '/api/analytics',
      JSON.stringify({ event: 'web_vital', ...payload })
    );
  }
}

export function initPerformanceMonitoring() {
  onLCP(sendVital);
  onINP(sendVital);
  onCLS(sendVital);
  onFCP(sendVital);
  onTTFB(sendVital);
}
