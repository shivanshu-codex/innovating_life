/* ============================================
   LUMINA — CONNECTION-AWARE LOADING
   Adapts image quality and animation to the
   user's actual network speed.
   ============================================ */

const conn =
  navigator.connection ||
  navigator.mozConnection ||
  navigator.webkitConnection;

export function getConnectionTier() {
  if (!conn) return 'fast';
  if (conn.saveData) return 'save';
  if (conn.effectiveType === '4g') return 'fast';
  if (conn.effectiveType === '3g') return 'medium';
  return 'slow'; // 2g, slow-2g
}

export function getImageQuality() {
  return { fast: 800, medium: 400, slow: 200, save: 200 }[getConnectionTier()];
}

export function getStoryImageUrl(storyId) {
  const size = getImageQuality();
  return `/cdn/stories/${storyId}-${size}.webp`;
}

export function initConnectionAwareness() {
  function apply() {
    const tier = getConnectionTier();
    document.documentElement.dataset.connection = tier;
    if (conn?.saveData) {
      document.documentElement.classList.add('reduce-motion');
    }
  }

  apply();
  conn?.addEventListener('change', apply);
}
