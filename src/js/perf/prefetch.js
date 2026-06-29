/* ============================================
   LUMINA — PREDICTIVE PREFETCH
   Hover for 65ms → prefetch that route's JS chunk.
   By the time user clicks, the chunk is cached.
   ============================================ */

const prefetchedUrls = new Set();

function prefetchUrl(url) {
  if (prefetchedUrls.has(url)) return;
  prefetchedUrls.add(url);

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = 'script';
  document.head.appendChild(link);
}

// Prefetch a route's page component via dynamic import
// Vite resolves this to the actual chunk at build time
const routeImporters = {
  '/feed':          () => import('../../pages/FeedPage.jsx'),
  '/explore':       () => import('../../pages/ExplorePage.jsx'),
  '/write':         () => import('../../pages/WritePage.jsx'),
  '/messages':      () => import('../../pages/MessagesPage.jsx'),
  '/notifications': () => import('../../pages/NotificationsPage.jsx'),
  '/profile':       () => import('../../pages/ProfilePage.jsx'),
  '/settings':      () => import('../../pages/SettingsPage.jsx'),
};

function prefetchRoute(href) {
  const importer = routeImporters[href];
  if (importer && !prefetchedUrls.has(href)) {
    prefetchedUrls.add(href);
    importer().catch(() => {}); // silent — it's just a prefetch
  }
}

export function initPrefetch() {
  // Hook into all nav links that have href matching known routes
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!routeImporters[href]) return;

    let timer;

    // Mouse hover intent (65ms delay)
    link.addEventListener('mouseenter', () => {
      timer = setTimeout(() => prefetchRoute(href), 65);
    });
    link.addEventListener('mouseleave', () => clearTimeout(timer));

    // Mobile: touchstart fires just before tap
    link.addEventListener('touchstart', () => prefetchRoute(href), { passive: true });
  });

  // Probabilistic prefetch: load likely-next pages during idle time
  function prefetchProbable() {
    const path = window.location.pathname;
    if (path === '/' || path === '/explore') {
      prefetchRoute('/feed');
    }
    if (path === '/feed') {
      prefetchRoute('/write');
      prefetchRoute('/messages');
    }
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(prefetchProbable, { timeout: 2000 });
  } else {
    setTimeout(prefetchProbable, 1000);
  }
}
