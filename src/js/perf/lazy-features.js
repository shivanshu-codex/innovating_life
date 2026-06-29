/* ============================================
   LUMINA — LAZY FEATURE LOADING
   Features not needed on first paint are imported
   only when the user actually triggers them.
   In a React app this complements React.lazy():
   React.lazy handles route-level splitting,
   this handles feature-level splitting within pages.
   ============================================ */

// Register all once-listeners after DOM ready
export function initLazyFeatures() {
  // Onboarding tour: only for users who haven't completed it
  if (localStorage.getItem('lumina_onboarded') !== 'true') {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(async () => {
        // When the onboarding feature module is built, import it here:
        // const { initOnboarding } = await import('../features/onboarding.js');
        // initOnboarding();
      }, { timeout: 3000 });
    }
  }

  // blur-up: init lazy image observers after paint
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('./blur-up.js').then(({ initBlurUp }) => initBlurUp());
    });
  } else {
    setTimeout(() => {
      import('./blur-up.js').then(({ initBlurUp }) => initBlurUp());
    }, 500);
  }
}
