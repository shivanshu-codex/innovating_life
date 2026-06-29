/* ============================================
   LUMINA — HAPTIC FEEDBACK
   Wraps navigator.vibrate() with named patterns.
   Silent if device doesn't support it.
   ============================================ */

const supported =
  typeof navigator !== 'undefined' && 'vibrate' in navigator;

const patterns = {
  tap:        [10],
  light:      [15],
  medium:     [25],
  heavy:      [40],
  success:    [10, 40, 80],
  error:      [60, 20, 60],
  warning:    [30, 20, 30],
  longPress:  [50],
  doubleTap:  [10, 80, 10],
  notification: [20, 60, 20],
};

export function haptic(type = 'tap') {
  if (!supported) return;
  const pattern = patterns[type] ?? patterns.tap;
  try {
    navigator.vibrate(pattern);
  } catch (_) {
    // vibrate() can throw in sandboxed iframes — ignore
  }
}

export default haptic;
