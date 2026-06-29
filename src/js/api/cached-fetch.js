/* ============================================
   LUMINA — SWR (Stale-While-Revalidate) FETCH
   Returns cached data immediately (feels instant),
   then revalidates in the background.
   ============================================ */

const cache = new Map();

export async function swrFetch(url, options = {}) {
  const {
    ttl = 30_000,       // 30 seconds
    revalidate = true,
    onUpdate = null,    // callback when fresh data arrives
  } = options;

  const now = Date.now();
  const cached = cache.get(url);

  // Return stale data immediately if within TTL
  if (cached && now - cached.timestamp < ttl) {
    if (revalidate && onUpdate) {
      // Background revalidation — don't block the caller
      fetch(url)
        .then((r) => {
          if (!r.ok) return;
          return r.json();
        })
        .then((fresh) => {
          if (!fresh) return;
          cache.set(url, { data: fresh, timestamp: Date.now() });
          onUpdate(fresh);
        })
        .catch(() => {}); // stale data is fine on failure
    }
    return cached.data;
  }

  // No cache or expired — fetch fresh
  const response = await fetch(url);
  if (!response.ok) {
    // Prefer stale over error
    if (cached) return cached.data;
    throw new Error(`HTTP ${response.status}: ${url}`);
  }

  const data = await response.json();
  cache.set(url, { data, timestamp: now });
  return data;
}

export function invalidateCache(url) {
  if (url) {
    cache.delete(url);
  } else {
    cache.clear();
  }
}
