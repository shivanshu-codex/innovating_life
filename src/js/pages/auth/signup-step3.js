const INTEREST_TOPICS = [
  { id: 'personal-growth', label: 'Personal growth',  icon: '🌱' },
  { id: 'grief',           label: 'Grief & loss',      icon: '💙' },
  { id: 'joy',             label: 'Joy',               icon: '✦'  },
  { id: 'love',            label: 'Love',              icon: '💛' },
  { id: 'mindfulness',     label: 'Mindfulness',       icon: '🧘' },
  { id: 'purpose',         label: 'Purpose',           icon: '🧭' },
  { id: 'relationships',   label: 'Relationships',     icon: '🤝' },
  { id: 'healing',         label: 'Healing',           icon: '🌿' },
  { id: 'identity',        label: 'Identity',          icon: '🪞' },
  { id: 'creativity',      label: 'Creativity',        icon: '🎨' },
  { id: 'gratitude',       label: 'Gratitude',         icon: '🙏' },
  { id: 'change',          label: 'Change',            icon: '🌊' },
];

export function renderStep3(container, { onComplete }) {
  container.innerHTML = `
    <div class="auth-step" data-step="3">
      <h2 class="auth-step__title">What do you want to explore?</h2>
      <p class="auth-step__sub">
        Pick a few topics — we'll personalise your feed.
        You can change this anytime.
      </p>
      <div class="topic-pill-grid" role="group" aria-label="Select topics you're interested in">
        ${INTEREST_TOPICS.map(t => `
          <label class="topic-pill" for="topic-${t.id}">
            <input
              type="checkbox"
              id="topic-${t.id}"
              name="topics"
              value="${t.id}"
              class="sr-only"
            />
            <span aria-hidden="true">${t.icon}</span>
            ${t.label}
          </label>
        `).join('')}
      </div>
      <p class="auth-step__skip-note">Not sure yet? That's fine.</p>
      <button class="btn btn-primary auth-step__next" id="step3-done">
        Take me to Lumina →
      </button>
    </div>
  `;

  container.querySelectorAll('input[name="topics"]').forEach(cb => {
    cb.addEventListener('change', () => {
      cb.closest('.topic-pill').classList.toggle('is-selected', cb.checked);
    });
  });

  document.getElementById('step3-done').addEventListener('click', async () => {
    const selected = Array.from(
      container.querySelectorAll('input[name="topics"]:checked'),
    ).map(cb => cb.value);

    if (selected.length) {
      await fetch('/api/me/interests', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ topics: selected }),
      }).catch(() => {});
    }

    onComplete({ topics: selected });
  });
}
