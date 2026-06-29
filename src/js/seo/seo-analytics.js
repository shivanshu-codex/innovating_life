export class SEOAnalytics {
  constructor() {
    this.sessionStart = Date.now();
    this.trackOrganicSource();
    this.trackScrollDepth();
    this.trackTimeOnPage();
  }

  trackOrganicSource() {
    const referrer  = document.referrer;
    const isOrganic = [
      'google.', 'bing.com', 'duckduckgo.com', 'yahoo.com',
      'ecosia.org', 'baidu.com', 'yandex.',
    ].some(engine => referrer.includes(engine));

    if (isOrganic) {
      sessionStorage.setItem('lumina_organic', '1');
      try {
        const url   = new URL(referrer);
        const query = url.searchParams.get('q') || url.searchParams.get('query');
        if (query) sessionStorage.setItem('lumina_search_query', query);
      } catch {}
    }
  }

  trackScrollDepth() {
    if (!window.location.pathname.startsWith('/story/')) return;

    const milestones = [25, 50, 75, 90, 100];
    const reached    = new Set();
    const article    = document.querySelector('.story-body');
    if (!article) return;

    const onScroll = () => {
      const rect    = article.getBoundingClientRect();
      const total   = article.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct     = Math.min(100, Math.round((scrolled / total) * 100));

      milestones.forEach(m => {
        if (pct >= m && !reached.has(m)) {
          reached.add(m);
          this._send('scroll_depth', { depth: m, path: window.location.pathname });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  trackTimeOnPage() {
    window.addEventListener('pagehide', () => {
      const timeOnPage = Math.round((Date.now() - this.sessionStart) / 1000);
      this._send('time_on_page', {
        seconds:    timeOnPage,
        path:       window.location.pathname,
        is_organic: sessionStorage.getItem('lumina_organic') === '1',
      });
    });
  }

  _send(event, data) {
    navigator.sendBeacon?.('/api/analytics', JSON.stringify({ event, data, ts: Date.now() }));
    if (import.meta.env.DEV) {
      console.log(`📊 SEO Event: ${event}`, data);
    }
  }
}
