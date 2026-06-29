import { ConversionEvents } from '../analytics/conversion-events.js';

export class ReferralManager {

  constructor(username) {
    this.username   = username;
    this.referralUrl = `https://lumina.in?ref=${username}`;
  }

  renderShareUI(container) {
    container.innerHTML = `
      <div class="referral-card">
        <div class="referral-card__header">
          <span class="referral-card__icon" aria-hidden="true">✦</span>
          <div>
            <p class="referral-card__title">Invite someone to Lumina</p>
            <p class="referral-card__sub">
              Share your link. When they join, you'll hear about it.
            </p>
          </div>
        </div>
        <div class="referral-link-row">
          <div class="referral-link-display" id="referral-link-text">
            lumina.in?ref=${this.username}
          </div>
          <button class="btn btn-primary referral-copy-btn" id="referral-copy">
            Copy link
          </button>
        </div>
        <div class="referral-share-row">
          <button class="referral-share-btn" data-method="whatsapp" title="Share via WhatsApp">
            <span aria-hidden="true">💬</span> WhatsApp
          </button>
          <button class="referral-share-btn" data-method="twitter" title="Share on Twitter">
            <span aria-hidden="true">🐦</span> Twitter
          </button>
          <button class="referral-share-btn" data-method="email" title="Share via Email">
            <span aria-hidden="true">✉️</span> Email
          </button>
        </div>
        <p class="referral-count" id="referral-count">Loading…</p>
      </div>
    `;

    this._attachHandlers(container);
    this._loadReferralCount();
  }

  _attachHandlers(container) {
    document.getElementById('referral-copy')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(this.referralUrl);
        const btn = document.getElementById('referral-copy');
        btn.textContent = 'Copied ✓';
        setTimeout(() => { btn.textContent = 'Copy link'; }, 2000);
        ConversionEvents.referralSent('link_copied');
      } catch {}
    });

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        `I've been writing on Lumina — a quiet place for honest stories. Come join me: ${this.referralUrl}`,
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        'Writing honestly on Lumina. Come read (and write) with me:',
      )}&url=${encodeURIComponent(this.referralUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(
        'Come write with me on Lumina',
      )}&body=${encodeURIComponent(
        `I've been using Lumina to share and read honest human stories. I think you'd like it.\n\n${this.referralUrl}`,
      )}`,
    };

    container.querySelectorAll('.referral-share-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const method = btn.dataset.method;
        window.open(shareUrls[method], '_blank', 'noopener');
        ConversionEvents.referralSent(method);
      });
    });
  }

  async _loadReferralCount() {
    try {
      const res  = await fetch('/api/me/referrals/count');
      const data = await res.json();
      const el   = document.getElementById('referral-count');
      if (!el) return;
      el.textContent = data.count === 0
        ? 'No one has joined through your link yet.'
        : data.count === 1
          ? '1 person joined Lumina through your link.'
          : `${data.count} people joined Lumina through your link.`;
    } catch {}
  }
}

export function initReferralLanding() {
  const params = new URLSearchParams(window.location.search);
  const ref    = params.get('ref');
  if (!ref) return;

  sessionStorage.setItem('lumina_ref', ref);

  fetch(`/api/users/${ref}/public-profile`)
    .then(r => r.json())
    .then(data => {
      if (!data?.name) return;

      const eyebrow = document.querySelector('.hero__eyebrow');
      if (eyebrow) {
        eyebrow.innerHTML = `
          ${data.avatarUrl
            ? `<img src="${data.avatarUrl}" width="20" height="20"
                style="border-radius:50%;object-fit:cover;" alt="${data.name}">`
            : '✦'
          }
          You were invited by ${data.name}
        `;
      }

      const primaryCta = document.querySelector('.hero__ctas .btn-primary');
      if (primaryCta) primaryCta.textContent = `Join ${data.name.split(' ')[0]} on Lumina →`;
    })
    .catch(() => {});
}
