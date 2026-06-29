export async function shareStory(story, showToast) {
  const url = `https://lumina.in/story/${story.slug}`;
  const shareData = {
    title: story.title,
    text:  `"${story.excerpt || story.body?.substring(0, 120) || ''}…" — ${story.author?.name || 'Anonymous'} on Lumina`,
    url,
  };

  if (navigator.share && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  showShareModal(story, showToast);
}

function showShareModal(story, showToast) {
  const url    = `https://lumina.in/story/${story.slug}`;
  const text   = encodeURIComponent(`"${story.title}" — ${story.author?.name || 'Anonymous'}`);
  const urlEnc = encodeURIComponent(url);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${text}%20${urlEnc}`,
    twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${urlEnc}`,
    telegram: `https://t.me/share/url?url=${urlEnc}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${urlEnc}`,
    email:    `mailto:?subject=${text}&body=${urlEnc}`,
  };

  const sheet = document.createElement('div');
  sheet.innerHTML = `
    <div class="sheet-backdrop is-open" id="share-backdrop"></div>
    <div class="bottom-sheet is-open" id="share-sheet">
      <div class="sheet-handle"></div>
      <div class="sheet-header">
        <span class="sheet-title">Share this story</span>
        <button class="sheet-close" id="share-close" aria-label="Close">✕</button>
      </div>
      <div class="sheet-body">
        <div class="sheet-action-list">
          <button class="sheet-action-item" id="share-copy">📋 Copy link</button>
          <a class="sheet-action-item" href="${shareLinks.whatsapp}" target="_blank" rel="noopener">💬 Share via WhatsApp</a>
          <a class="sheet-action-item" href="${shareLinks.twitter}"  target="_blank" rel="noopener">🐦 Share on X (Twitter)</a>
          <a class="sheet-action-item" href="${shareLinks.telegram}" target="_blank" rel="noopener">✈️ Share on Telegram</a>
          <a class="sheet-action-item" href="${shareLinks.linkedin}" target="_blank" rel="noopener">💼 Share on LinkedIn</a>
          <a class="sheet-action-item" href="${shareLinks.email}">✉️ Share via Email</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(sheet);
  document.body.style.overflow = 'hidden';

  const close = () => {
    sheet.remove();
    document.body.style.overflow = '';
  };

  sheet.querySelector('#share-backdrop').addEventListener('click', close);
  sheet.querySelector('#share-close').addEventListener('click', close);
  document.addEventListener('keydown', e => e.key === 'Escape' && close(), { once: true });

  sheet.querySelector('#share-copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToast?.('Link copied — share it wherever feels right.');
    } catch {
      showToast?.('Could not copy — try selecting the URL manually.');
    }
    close();
  });
}
