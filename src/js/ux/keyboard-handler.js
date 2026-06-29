/* ============================================
   LUMINA — VIRTUAL KEYBOARD HANDLER
   Tracks keyboard height via visualViewport API
   and sets --keyboard-height on :root.
   ============================================ */

export function initKeyboardHandler() {
  if (typeof window === 'undefined') return () => {};
  if (!window.visualViewport) return () => {};

  const root = document.documentElement;
  let rafId = null;

  function update() {
    const vv = window.visualViewport;
    const keyboardHeight = window.innerHeight - vv.height - vv.offsetTop;
    const safeHeight = Math.max(0, keyboardHeight);

    root.style.setProperty('--keyboard-height', `${safeHeight}px`);

    if (safeHeight > 50) {
      document.body.classList.add('keyboard-open');
    } else {
      document.body.classList.remove('keyboard-open');
    }
  }

  function scheduleUpdate() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(update);
  }

  window.visualViewport.addEventListener('resize', scheduleUpdate);
  window.visualViewport.addEventListener('scroll', scheduleUpdate);

  update();

  return function destroy() {
    window.visualViewport.removeEventListener('resize', scheduleUpdate);
    window.visualViewport.removeEventListener('scroll', scheduleUpdate);
    if (rafId) cancelAnimationFrame(rafId);
    root.style.setProperty('--keyboard-height', '0px');
    document.body.classList.remove('keyboard-open');
  };
}
