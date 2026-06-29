/* ============================================
   LUMINA — MOBILE PERFORMANCE HINTS
   Lazy init, connection-aware image quality,
   and reduced animation on low-end devices.
   ============================================ */

/* Detect slow connection and set data-saver on <html> */
export function initConnectionAwareness() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return;

  function applyHints() {
    const slow = conn.effectiveType === '2g' || conn.saveData;
    document.documentElement.dataset.dataSaver = slow ? 'true' : 'false';
  }

  applyHints();
  conn.addEventListener('change', applyHints);
}

/* Set data-perf="low" for low-end devices to disable heavy animations */
export function initPerfTier() {
  // If device has ≤ 2 logical cores or ≤ 2 GB RAM it's likely low-end
  const cpuCores = navigator.hardwareConcurrency ?? 4;
  const lowEnd = cpuCores <= 2;
  document.documentElement.dataset.perf = lowEnd ? 'low' : 'high';
}

/* IntersectionObserver-based lazy loading for any [data-src] image */
export function initLazyImages(root = document) {
  const images = root.querySelectorAll('img[data-src]');
  if (!images.length) return;

  if (!('IntersectionObserver' in window)) {
    images.forEach(img => {
      img.src = img.dataset.src;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '200px' }
  );

  images.forEach(img => observer.observe(img));
}

/* Defer non-critical third-party scripts until idle */
export function deferUntilIdle(fn) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn, { timeout: 2000 });
  } else {
    setTimeout(fn, 200);
  }
}
