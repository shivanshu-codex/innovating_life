import { shareStory } from '../seo/share.js';

export async function loadYearInReview() {
  const res  = await fetch('/api/me/year-in-review');
  return await res.json();
}

export function renderYearInReview(data, container) {
  const {
    storiesWritten,
    totalWords,
    longestStreak,
    topTopic,
    totalResonances,
    totalReflections,
    uniqueReadersEstimate,
    mostResonantStory,
  } = data;

  const readingHours = Math.round(totalWords / 200 / 60 * 10) / 10;

  const slides = [
    {
      icon:  '✦',
      stat:  storiesWritten,
      label: `stor${storiesWritten === 1 ? 'y' : 'ies'} written this year`,
      sub:   'Each one a piece of your life, put into words.',
    },
    {
      icon:  '✍️',
      stat:  totalWords.toLocaleString('en-IN'),
      label: 'words',
      sub:   `That's about ${readingHours} hours of reading for someone else.`,
    },
    {
      icon:  '✦',
      stat:  longestStreak,
      label: `day${longestStreak === 1 ? '' : 's'} in your longest streak`,
      sub:   'That\'s how many mornings (or evenings) you chose the page.',
    },
    {
      icon:  '💙',
      stat:  totalResonances,
      label: 'resonances',
      sub:   uniqueReadersEstimate > 0
        ? `Roughly ${uniqueReadersEstimate} different people felt something when they read your words.`
        : 'People noticed.',
    },
    {
      icon:   '🌿',
      stat:   topTopic,
      label:  'was your most-written topic',
      isText: true,
      sub:    'You kept coming back to it. That says something.',
    },
    mostResonantStory ? {
      icon:    '📖',
      isQuote: true,
      quote:   `"${mostResonantStory.title}"`,
      label:   `reached ${mostResonantStory.resonanceCount} people — your most-resonated story`,
      sub:     'Some words travel further than you expect.',
    } : null,
  ].filter(Boolean);

  container.innerHTML = `
    <div class="year-review">
      <div class="year-review__slides" id="yr-slides">
        ${slides.map((slide, i) => `
          <div class="year-review__slide ${i === 0 ? 'is-active' : ''}" data-index="${i}">
            <span class="yr-icon">${slide.icon}</span>
            ${slide.isQuote
              ? `<p class="yr-quote">${slide.quote}</p>`
              : `<p class="yr-stat${slide.isText ? ' yr-stat--text' : ''}">${slide.stat}</p>`
            }
            <p class="yr-label">${slide.label}</p>
            <p class="yr-sub">${slide.sub}</p>
          </div>
        `).join('')}
      </div>
      <div class="year-review__nav">
        ${slides.map((_, i) => `
          <button class="yr-dot ${i === 0 ? 'is-active' : ''}"
                  data-slide="${i}" aria-label="Slide ${i + 1}"></button>
        `).join('')}
      </div>
      <div class="year-review__footer">
        <p class="yr-footer-text">Your ${new Date().getFullYear()} on Lumina</p>
        <button class="btn btn-primary yr-share-btn" id="yr-share">
          Share my year ✦
        </button>
      </div>
    </div>
  `;

  let current = 0;

  const goTo = (i) => {
    container.querySelectorAll('.year-review__slide').forEach((s, idx) => {
      s.classList.toggle('is-active', idx === i);
    });
    container.querySelectorAll('.yr-dot').forEach((d, idx) => {
      d.classList.toggle('is-active', idx === i);
    });
    current = i;
  };

  container.querySelectorAll('.yr-dot').forEach(dot => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.slide, 10)));
  });

  let startX = 0;
  const slidesEl = document.getElementById('yr-slides');
  if (slidesEl) {
    slidesEl.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    slidesEl.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && current < slides.length - 1) goTo(current + 1);
        if (diff < 0 && current > 0)                 goTo(current - 1);
      }
    });
  }

  document.getElementById('yr-share')?.addEventListener('click', () => {
    shareStory({
      title:   `My ${new Date().getFullYear()} on Lumina`,
      excerpt: `I wrote ${storiesWritten} stories and ${totalWords.toLocaleString('en-IN')} words this year. ${totalResonances} people resonated with them.`,
      slug:    `year-in-review/${new Date().getFullYear()}`,
    });
  });
}
