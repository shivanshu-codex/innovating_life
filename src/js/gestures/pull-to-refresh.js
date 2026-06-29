/* ============================================
   LUMINA — PULL TO REFRESH GESTURE
   Touch: pull down > 80px triggers refresh.
   ============================================ */

const THRESHOLD = 80;
const MAX_PULL = 120;

export function initPullToRefresh(container, onRefresh) {
  if (!container) return () => {};

  let startY = 0;
  let pulling = false;
  let currentPull = 0;
  let refreshing = false;

  const indicator = container.querySelector('.ptr-indicator');
  const spinner = container.querySelector('.ptr-spinner');
  const label = container.querySelector('.ptr-label');

  function setTopOffset(px) {
    if (indicator) indicator.style.top = `${px - 60}px`;
    if (spinner) {
      const rotation = (px / THRESHOLD) * 180;
      spinner.style.transform = `rotate(${rotation}deg)`;
    }
    if (label) {
      label.textContent = px >= THRESHOLD ? 'Release to refresh' : 'Pull to refresh';
    }
  }

  function onTouchStart(e) {
    if (refreshing) return;
    if (container.scrollTop > 0) return;
    startY = e.touches[0].clientY;
    pulling = false;
    currentPull = 0;
  }

  function onTouchMove(e) {
    if (refreshing) return;
    if (container.scrollTop > 0) return;

    const dy = e.touches[0].clientY - startY;
    if (dy <= 0) return;

    pulling = true;
    currentPull = Math.min(dy * 0.6, MAX_PULL);

    if (indicator) indicator.classList.add('is-pulling');
    setTopOffset(currentPull);

    if (currentPull > 10) {
      e.preventDefault();
    }
  }

  async function onTouchEnd() {
    if (!pulling || refreshing) {
      cleanup();
      return;
    }

    if (currentPull >= THRESHOLD) {
      refreshing = true;
      if (indicator) indicator.classList.add('is-refreshing');
      if (label) label.textContent = 'Refreshing…';
      setTopOffset(THRESHOLD);

      try {
        await onRefresh();
      } finally {
        refreshing = false;
        cleanup();
      }
    } else {
      cleanup();
    }

    pulling = false;
    currentPull = 0;
  }

  function cleanup() {
    if (indicator) {
      indicator.classList.remove('is-pulling', 'is-refreshing');
      indicator.style.top = '';
    }
    if (spinner) spinner.style.transform = '';
  }

  container.addEventListener('touchstart', onTouchStart, { passive: true });
  container.addEventListener('touchmove', onTouchMove, { passive: false });
  container.addEventListener('touchend', onTouchEnd, { passive: true });

  return function destroy() {
    container.removeEventListener('touchstart', onTouchStart);
    container.removeEventListener('touchmove', onTouchMove);
    container.removeEventListener('touchend', onTouchEnd);
  };
}
