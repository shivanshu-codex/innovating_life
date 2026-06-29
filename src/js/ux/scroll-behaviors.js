export function initScrollBehaviors() {
  const topbar = document.querySelector('.topbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (topbar) {
      topbar.classList.toggle('is-scrolled', scrollY > 10);

      if (window.innerWidth < 768) {
        if (scrollY > lastScrollY && scrollY > 100) {
          topbar.classList.add('is-hidden');
        } else {
          topbar.classList.remove('is-hidden');
        }
      } else {
        topbar.classList.remove('is-hidden');
      }
    }

    lastScrollY = scrollY;
  }, { passive: true });
}
