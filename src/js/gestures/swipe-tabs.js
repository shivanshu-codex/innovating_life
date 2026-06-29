/* ============================================
   LUMINA — SWIPE BETWEEN TABS
   Horizontal swipe on a content area cycles tabs.
   Works with any array of tab indices.
   ============================================ */

const MIN_SWIPE = 50;
const MAX_VERTICAL_RATIO = 0.5;

export function initSwipeTabs(container, { tabCount, currentTab, onChange }) {
  if (!container || tabCount < 2) return () => {};

  let startX = 0;
  let startY = 0;
  let active = false;

  function onTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    active = true;
  }

  function onTouchEnd(e) {
    if (!active) return;
    active = false;

    const dx = e.changedTouches[0].clientX - startX;
    const dy = Math.abs(e.changedTouches[0].clientY - startY);

    if (dy > Math.abs(dx) * MAX_VERTICAL_RATIO) return;
    if (Math.abs(dx) < MIN_SWIPE) return;

    const current = typeof currentTab === 'function' ? currentTab() : currentTab;

    if (dx < 0 && current < tabCount - 1) {
      onChange(current + 1);
    } else if (dx > 0 && current > 0) {
      onChange(current - 1);
    }
  }

  function onTouchCancel() {
    active = false;
  }

  container.addEventListener('touchstart', onTouchStart, { passive: true });
  container.addEventListener('touchend', onTouchEnd, { passive: true });
  container.addEventListener('touchcancel', onTouchCancel, { passive: true });

  return function destroy() {
    container.removeEventListener('touchstart', onTouchStart);
    container.removeEventListener('touchend', onTouchEnd);
    container.removeEventListener('touchcancel', onTouchCancel);
  };
}
