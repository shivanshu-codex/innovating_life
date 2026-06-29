/* ============================================
   LUMINA — SWIPE TO DISMISS / SWIPE ACTIONS
   Swipe left on a list item to reveal actions
   (archive, delete). Swipe right to dismiss.
   ============================================ */

const SWIPE_THRESHOLD = 80;
const SWIPE_COMPLETE = 200;

export function initSwipeAction(el, { onSwipeLeft, onSwipeRight } = {}) {
  if (!el) return () => {};

  let startX = 0;
  let startY = 0;
  let dx = 0;
  let tracking = false;

  function onTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    dx = 0;
    tracking = true;
    el.style.transition = 'none';
  }

  function onTouchMove(e) {
    if (!tracking) return;

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    dx = x - startX;
    const dy = Math.abs(y - startY);

    // Cancel if scrolling vertically
    if (dy > Math.abs(dx) * 1.5) {
      tracking = false;
      resetPosition();
      return;
    }

    // Only allow left swipe
    if (dx > 0 && !onSwipeRight) {
      resetPosition();
      return;
    }

    el.style.transform = `translateX(${dx}px)`;
    el.style.opacity = String(1 - Math.abs(dx) / SWIPE_COMPLETE * 0.4);
    e.preventDefault();
  }

  function onTouchEnd() {
    if (!tracking) return;
    tracking = false;

    el.style.transition = '';

    if (dx < -SWIPE_THRESHOLD && onSwipeLeft) {
      if (dx < -SWIPE_COMPLETE) {
        el.style.transform = `translateX(-100%)`;
        el.style.opacity = '0';
        setTimeout(() => onSwipeLeft(el), 300);
      } else {
        onSwipeLeft(el);
        resetPosition();
      }
    } else if (dx > SWIPE_THRESHOLD && onSwipeRight) {
      if (dx > SWIPE_COMPLETE) {
        el.style.transform = `translateX(100%)`;
        el.style.opacity = '0';
        setTimeout(() => onSwipeRight(el), 300);
      } else {
        onSwipeRight(el);
        resetPosition();
      }
    } else {
      resetPosition();
    }
  }

  function resetPosition() {
    el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    el.style.transform = '';
    el.style.opacity = '';
  }

  el.addEventListener('touchstart', onTouchStart, { passive: true });
  el.addEventListener('touchmove', onTouchMove, { passive: false });
  el.addEventListener('touchend', onTouchEnd, { passive: true });

  return function destroy() {
    el.removeEventListener('touchstart', onTouchStart);
    el.removeEventListener('touchmove', onTouchMove);
    el.removeEventListener('touchend', onTouchEnd);
  };
}
