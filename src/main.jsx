import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initKeyboardHandler }      from './js/ux/keyboard-handler';
import { initConnectionAwareness, initPerfTier } from './js/perf/mobile-perf';
import { initConnectionAwareness as initConnAware } from './js/perf/connection-aware';
import { initRUM }                  from './js/perf/rum';
import { initLazyFeatures }         from './js/perf/lazy-features';
import { SEOAnalytics }             from './js/seo/seo-analytics';

// ── Boot: synchronous, runs before first render ────────────────
initKeyboardHandler();
initPerfTier();
initConnectionAwareness();
initConnAware();

// ── Render React app ───────────────────────────────────────────
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// ── Post-render: non-blocking perf tools ──────────────────────
// RUM starts observing immediately but sends only after load
initRUM();

// Lazy features and blur-up run in idle time
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => initLazyFeatures(), { timeout: 3000 });
} else {
  setTimeout(initLazyFeatures, 1000);
}

// SEO analytics — organic source detection + scroll/time tracking
new SEOAnalytics();
