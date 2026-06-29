const BASE = 'https://lumina.in';

const CANONICAL_MAP = {
  '/index.html': '/',
  '/home':       '/',
  '/index':      '/',
};

export function getCanonicalUrl(path) {
  const cleanPath = (path || window.location.pathname)
    .split('?')[0]
    .replace(/\/$/, '') || '/';

  return `${BASE}${CANONICAL_MAP[cleanPath] || cleanPath}`;
}

export function getPaginatedCanonical(basePath, page) {
  if (page <= 1) return getCanonicalUrl(basePath);
  return `${getCanonicalUrl(basePath)}?page=${page}`;
}

export function setPaginationLinks(basePath, currentPage, totalPages) {
  if (currentPage > 1) {
    const prev = document.createElement('link');
    prev.rel   = 'prev';
    prev.href  = currentPage === 2
      ? `${BASE}${basePath}`
      : `${BASE}${basePath}?page=${currentPage - 1}`;
    document.head.appendChild(prev);
  }

  if (currentPage < totalPages) {
    const next = document.createElement('link');
    next.rel  = 'next';
    next.href = `${BASE}${basePath}?page=${currentPage + 1}`;
    document.head.appendChild(next);
  }
}
