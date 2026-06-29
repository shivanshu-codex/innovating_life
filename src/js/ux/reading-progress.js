export function initReadingProgress(barSelector = '.reading-progress', articleSelector = '.story-body') {
  const bar = document.querySelector(barSelector);
  const article = document.querySelector(articleSelector);
  if (!bar || !article) return;

  const update = () => {
    const articleRect = article.getBoundingClientRect();
    const total = article.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -articleRect.top);
    const pct = total <= 0 ? 100 : Math.min(100, (scrolled / total) * 100);
    bar.style.width = `${pct}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();

  return () => window.removeEventListener('scroll', update);
}
