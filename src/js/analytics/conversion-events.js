export const ConversionEvents = {

  landingViewed: (source) => track('landing_viewed', {
    source,
    referrer: document.referrer,
  }),

  ctaClicked: (ctaId, location) => track('cta_clicked', { ctaId, location }),

  storyOpenedFromLanding: (storySlug) => track('story_opened_from_landing', { storySlug }),

  signupStarted: (trigger) => track('signup_started', { trigger }),

  signupStep: (step) => track('signup_step_completed', { step }),

  accountCreated: (method) => track('account_created', { method }),

  firstStoryPublished: (storyId, minutesSinceSignup) => track('first_story_published', {
    storyId,
    minutesSinceSignup,
  }),

  referralSent: (method) => track('referral_sent', { method }),

  referralConverted: (referrerId) => track('referral_converted', { referrerId }),

  upgradeClicked: (plan, location) => track('upgrade_clicked', { plan, location }),

  emailUnsubscribed: (listType) => track('email_unsubscribed', { listType }),
};

export function track(event, data = {}) {
  const payload = {
    event,
    data,
    ts:      Date.now(),
    path:    window.location.pathname,
    session: getSessionId(),
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      '/api/analytics/events',
      new Blob([JSON.stringify(payload)], { type: 'application/json' }),
    );
    return;
  }

  fetch('/api/analytics/events', {
    method:    'POST',
    headers:   { 'Content-Type': 'application/json' },
    body:      JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

function getSessionId() {
  let id = sessionStorage.getItem('lumina_sid');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('lumina_sid', id);
  }
  return id;
}
