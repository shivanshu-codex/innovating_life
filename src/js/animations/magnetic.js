export function initMagnetic() {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = '';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}
