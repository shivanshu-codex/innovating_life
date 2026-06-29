/* ============================================
   LUMINA — REAL USER MONITORING
   Observes Core Web Vitals from real browsers.
   Sends via sendBeacon on page load.
   Dev mode: logs a console.table report.
   ============================================ */

class LuminaRUM {
  constructor() {
    this.metrics = {};
    this.observe();
  }

  observe() {
    // LCP — Largest Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        this.metrics.lcp = Math.round(last.startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (_) {}

    // CLS — Cumulative Layout Shift
    try {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) clsValue += entry.value;
          this.metrics.cls = +clsValue.toFixed(4);
        });
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (_) {}

    // INP — Interaction to Next Paint (worst interaction latency)
    try {
      new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.interactionId) {
            const inp = Math.round(entry.duration);
            if (!this.metrics.inp || inp > this.metrics.inp) {
              this.metrics.inp = inp;
            }
          }
        });
      }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
    } catch (_) {}

    // FCP — First Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const entry = list.getEntries().find(e => e.name === 'first-contentful-paint');
        if (entry) this.metrics.fcp = Math.round(entry.startTime);
      }).observe({ type: 'paint', buffered: true });
    } catch (_) {}

    // TTFB + load time via Navigation Timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const nav = performance.getEntriesByType('navigation')[0];
        if (nav) {
          this.metrics.ttfb = Math.round(nav.responseStart - nav.requestStart);
          this.metrics.domInteractive = Math.round(nav.domInteractive);
          this.metrics.loadTime = Math.round(nav.loadEventEnd);
        }
        this.flush();
      }, 0);
    });
  }

  flush() {
    if (!this.metrics.fcp && !this.metrics.lcp) return;

    const payload = {
      ...this.metrics,
      url: window.location.pathname,
      connection: navigator.connection?.effectiveType ?? 'unknown',
      device: window.innerWidth < 768 ? 'mobile' : 'desktop',
      ts: Date.now(),
    };

    // Non-blocking beacon — survives page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/metrics', JSON.stringify(payload));
    }

    // Dev-only: visual report in console
    if (import.meta.env.DEV) {
      const { lcp = 0, inp = 0, cls = 0, fcp = 0, ttfb = 0 } = this.metrics;
      /* eslint-disable no-console */
      console.table({
        'LCP  (target ≤1.5s)':  `${lcp}ms   ${lcp  <= 1500 ? '✅' : '❌'}`,
        'INP  (target ≤100ms)': `${inp}ms   ${inp  <= 100  ? '✅' : '❌'}`,
        'CLS  (target ≤0.05)':  `${cls}     ${cls  <= 0.05 ? '✅' : '❌'}`,
        'FCP  (target ≤0.8s)':  `${fcp}ms   ${fcp  <= 800  ? '✅' : '❌'}`,
        'TTFB (target ≤200ms)': `${ttfb}ms  ${ttfb <= 200  ? '✅' : '❌'}`,
      });
      /* eslint-enable no-console */
    }
  }
}

export function initRUM() {
  if (typeof window !== 'undefined' && !window.__luminaRUM) {
    window.__luminaRUM = new LuminaRUM();
  }
}
