/* ============================================
   LUMINA — SCROLL TO INPUT ON FOCUS
   On iOS, focused inputs can be hidden behind
   the keyboard. This scrolls them into view.
   ============================================ */

export function initScrollToInput(container) {
  if (!container) return () => {};

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (!isMobile) return () => {};

  function onFocusIn(e) {
    const target = e.target;
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

    // Small delay to let the keyboard appear first
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350);
  }

  container.addEventListener('focusin', onFocusIn);

  return function destroy() {
    container.removeEventListener('focusin', onFocusIn);
  };
}
