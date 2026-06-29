const SIGNUP_MOTIVATIONS = [
  {
    id:    'share',
    icon:  '✍️',
    label: 'I have something to write',
    sub:   'A story, a thought, an experience I want to put into words',
  },
  {
    id:    'read',
    icon:  '📖',
    label: 'I want to read real stories',
    sub:   'I\'m looking for honest writing from real people',
  },
  {
    id:    'connect',
    icon:  '🤝',
    label: 'I want to find my people',
    sub:   'People who understand what I\'m going through',
  },
  {
    id:    'heal',
    icon:  '🌿',
    label: 'Writing helps me process things',
    sub:   'I use writing as a way to understand myself',
  },
  {
    id:    'curious',
    icon:  '✦',
    label: 'I\'m just curious',
    sub:   'I want to explore and see what\'s here',
  },
];

export function renderStep1(container, { onNext }) {
  container.innerHTML = `
    <div class="auth-step" data-step="1">
      <h2 class="auth-step__title">What brings you here?</h2>
      <p class="auth-step__sub">This helps us show you what matters most.</p>
      <div class="motivation-grid" role="radiogroup" aria-label="What brings you to Lumina">
        ${SIGNUP_MOTIVATIONS.map(m => `
          <label class="motivation-option" for="mot-${m.id}">
            <input
              type="radio"
              id="mot-${m.id}"
              name="motivation"
              value="${m.id}"
              class="sr-only"
            />
            <span class="motivation-option__icon" aria-hidden="true">${m.icon}</span>
            <span>
              <span class="motivation-option__label">${m.label}</span>
              <span class="motivation-option__sub">${m.sub}</span>
            </span>
          </label>
        `).join('')}
      </div>
      <button class="btn btn-primary auth-step__next" id="step1-next" disabled>
        Continue →
      </button>
    </div>
  `;

  let selected = null;

  container.querySelectorAll('input[name="motivation"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      selected = e.target.value;
      container.querySelectorAll('.motivation-option').forEach(opt => {
        opt.classList.toggle('is-selected', opt.querySelector('input').value === selected);
      });
      document.getElementById('step1-next').disabled = false;
    });
  });

  document.getElementById('step1-next').addEventListener('click', () => {
    if (selected) onNext({ motivation: selected });
  });
}
