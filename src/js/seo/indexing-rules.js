import { MetaManager } from './meta-manager.js';

export const indexingRules = {
  '/':              { index: true,  priority: 'highest' },
  '/explore':       { index: true,  priority: 'high'    },
  '/about':         { index: true,  priority: 'medium'  },
  '/story/[slug]':  { index: true,  priority: 'highest' },
  '/topic/[slug]':  { index: true,  priority: 'high'    },
  '/u/[username]':  { index: true,  priority: 'medium'  },

  '/feed':          { index: false, reason: 'personalised, requires auth' },
  '/write':         { index: false, reason: 'tool page, no unique content' },
  '/messages':      { index: false, reason: 'private conversations' },
  '/notifications': { index: false, reason: 'personal data' },
  '/saved':         { index: false, reason: 'personal data' },
  '/settings':      { index: false, reason: 'account management' },
  '/auth':          { index: false, reason: 'authentication flows' },
  '/admin':         { index: false, reason: 'admin panel' },
};

const NOINDEX_PREFIXES = [
  '/feed', '/write', '/messages', '/notifications',
  '/saved', '/settings', '/auth', '/admin',
];

export function applyIndexingRule(path = window.location.pathname) {
  const shouldNoindex = NOINDEX_PREFIXES.some(r => path.startsWith(r));
  if (shouldNoindex) {
    MetaManager.update({ noindex: true });
  }
}
