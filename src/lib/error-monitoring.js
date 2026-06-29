import * as Sentry from '@sentry/react';

export function initErrorMonitoring() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn || import.meta.env.DEV) return;

  Sentry.init({
    dsn,
    environment:      import.meta.env.MODE,
    release:          import.meta.env.VITE_GIT_SHA || 'dev',
    tracesSampleRate: 0.1,

    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,

    beforeSend(event) {
      const msg = event.message || event.exception?.values?.[0]?.value || '';
      const ignorePatterns = [
        'ResizeObserver loop',
        'Non-Error promise rejection',
        'Network request failed',
        'Load failed',
        'ChunkLoadError',
      ];
      if (ignorePatterns.some(p => msg.includes(p))) return null;

      if (event.request?.cookies)  delete event.request.cookies;
      if (event.request?.headers?.Authorization) delete event.request.headers.Authorization;

      return event;
    },
  });
}
