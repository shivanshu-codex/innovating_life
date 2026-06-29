export const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

export function onMotionPreferenceChange(callback) {
  window.matchMedia('(prefers-reduced-motion: reduce)')
    .addEventListener('change', (e) => callback(e.matches));
}
