/* ============================================
   LUMINA — LONG PRESS GESTURE
   500ms hold triggers context menu / actions.
   ============================================ */

const DURATION = 500;
const MOVE_THRESHOLD = 8;

export function onLongPress(el, callback) {
  if (!el) return () => {};

  let timer = null;
  let startX = 0;
  let startY = 0;

  function start(e) {
    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX;
    startY = touch.clientY;

    timer = setTimeout(() => {
      callback(e);
      timer = null;
    }, DURATION);
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function onMove(e) {
    if (!timer) return;
    const touch = e.touches ? e.touches[0] : e;
    const dx = Math.abs(touch.clientX - startX);
    const dy = Math.abs(touch.clientY - startY);
    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
      cancel();
    }
  }

  el.addEventListener('touchstart', start, { passive: true });
  el.addEventListener('touchmove', onMove, { passive: true });
  el.addEventListener('touchend', cancel, { passive: true });
  el.addEventListener('touchcancel', cancel, { passive: true });

  return function destroy() {
    cancel();
    el.removeEventListener('touchstart', start);
    el.removeEventListener('touchmove', onMove);
    el.removeEventListener('touchend', cancel);
    el.removeEventListener('touchcancel', cancel);
  };
}
