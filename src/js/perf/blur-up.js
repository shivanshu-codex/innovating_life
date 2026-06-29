/* ============================================
   LUMINA — BLUR-UP IMAGE INITIALISER
   Finds all .img-full elements and adds
   .is-loaded when they finish loading.
   ============================================ */

export function initBlurUp(root = document) {
  root.querySelectorAll('.img-full').forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('is-loaded'));
      img.addEventListener('error', () => {
        // Hide broken image icon — placeholder remains visible
        img.style.display = 'none';
      });
    }
  });
}
