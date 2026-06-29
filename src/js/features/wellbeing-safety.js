const CRISIS_INDICATORS = [
  'want to die',
  'don\'t want to be here',
  'end my life',
  'kill myself',
  'no reason to live',
  'better off without me',
  'can\'t go on',
  'wish i was dead',
  'ending it all',
  'suicide',
  'take my own life',
];

const DISTRESS_INDICATORS = [
  'can\'t cope',
  'falling apart',
  'can\'t do this anymore',
  'no one cares',
  'completely alone',
  'exhausted by everything',
  'nothing will ever change',
  'i give up',
  'i hate myself',
  'not okay',
  'rock bottom',
  'can\'t see a way out',
];

export function analyseSafetySignals(text) {
  const lower = text.toLowerCase();
  const crisis   = CRISIS_INDICATORS.some(phrase => lower.includes(phrase));
  const distress = DISTRESS_INDICATORS.some(phrase => lower.includes(phrase));
  if (crisis)   return { level: 'crisis',   phrase: CRISIS_INDICATORS.find(p => lower.includes(p)) };
  if (distress) return { level: 'distress', phrase: DISTRESS_INDICATORS.find(p => lower.includes(p)) };
  return null;
}

export function showSafetyBanner(signal) {
  const existing = document.getElementById('lumina-safety-banner');
  if (existing) existing.remove();

  const banner  = document.createElement('div');
  banner.id     = 'lumina-safety-banner';
  banner.setAttribute('role', 'alert');
  banner.setAttribute('aria-live', 'polite');

  if (signal.level === 'crisis') {
    banner.style.cssText = `
      position:fixed; bottom:var(--space-6,24px); left:50%; transform:translateX(-50%);
      z-index:9999; background:#EFF6FF; border:1px solid #BFDBFE;
      border-radius:16px; padding:16px 20px; max-width:480px; width:calc(100% - 48px);
      box-shadow:0 8px 32px rgba(0,0,0,0.12); display:flex; gap:12px; align-items:flex-start;
    `;
    banner.innerHTML = `
      <span style="font-size:1.4rem;flex-shrink:0;">💙</span>
      <div>
        <p style="margin:0 0 6px;font-size:0.9rem;font-weight:600;color:#1E3A5F;">
          You don't have to feel this alone.
        </p>
        <p style="margin:0 0 10px;font-size:0.85rem;color:#2563EB;line-height:1.5;">
          If you're in crisis, real support is available right now.
          <a href="tel:9152987821" style="color:#1D4ED8;font-weight:600;">iCall: 9152987821</a> (Mon–Sat 8am–10pm) ·
          <a href="https://findahelpline.com" target="_blank" rel="noopener" style="color:#1D4ED8;font-weight:600;">findahelpline.com</a>
        </p>
        <p style="margin:0;font-size:0.8rem;color:#64748B;">
          Your story still belongs here. This note will disappear on its own.
        </p>
      </div>
      <button id="safety-banner-close" style="background:none;border:none;cursor:pointer;color:#94A3B8;font-size:1.1rem;padding:0;flex-shrink:0;" aria-label="Close">✕</button>
    `;
  } else {
    banner.style.cssText = `
      position:fixed; bottom:var(--space-6,24px); left:50%; transform:translateX(-50%);
      z-index:9999; background:#F0FDF4; border:1px solid #BBF7D0;
      border-radius:16px; padding:14px 18px; max-width:420px; width:calc(100% - 48px);
      box-shadow:0 8px 24px rgba(0,0,0,0.08); display:flex; gap:10px; align-items:flex-start;
    `;
    banner.innerHTML = `
      <span style="font-size:1.2rem;flex-shrink:0;">🌿</span>
      <div style="flex:1">
        <p style="margin:0;font-size:0.85rem;color:#166534;line-height:1.5;">
          It sounds like things are really hard right now. Keep writing — or take a breath first.
          You don't have to get it all out at once.
        </p>
      </div>
      <button id="safety-banner-close" style="background:none;border:none;cursor:pointer;color:#94A3B8;font-size:1rem;padding:0;flex-shrink:0;" aria-label="Close">✕</button>
    `;
  }

  document.body.appendChild(banner);

  const closeBtn = document.getElementById('safety-banner-close');
  if (closeBtn) closeBtn.addEventListener('click', () => banner.remove());

  const timer = setTimeout(() => {
    if (banner.parentNode) banner.remove();
  }, 30000);

  closeBtn?.addEventListener('click', () => clearTimeout(timer));
}

export function initWellbeingMonitor(textareaSelector) {
  const textarea = document.querySelector(textareaSelector);
  if (!textarea) return;

  let debounceTimer;
  let lastSignalLevel = null;

  textarea.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const signal = analyseSafetySignals(textarea.value);
      if (signal && signal.level !== lastSignalLevel) {
        lastSignalLevel = signal.level;
        showSafetyBanner(signal);
      }
      if (!signal) lastSignalLevel = null;
    }, 1200);
  });
}
