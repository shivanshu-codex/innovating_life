function showToast(message) {
  window.dispatchEvent(new CustomEvent('lumina:toast', { detail: { message } }));
}

const GOAL_OPTIONS = [
  {
    id:     'weekly_1',
    label:  'Write once a week',
    target: { stories: 1, period: 'week' },
    icon:   '🌱',
    sub:    'A gentle, sustainable practice.',
  },
  {
    id:     'weekly_3',
    label:  'Write three times a week',
    target: { stories: 3, period: 'week' },
    icon:   '🌿',
    sub:    'Enough to build a real habit.',
  },
  {
    id:     'daily',
    label:  'Write something every day',
    target: { stories: 1, period: 'day' },
    icon:   '✦',
    sub:    'A daily practice. The most powerful kind.',
  },
  {
    id:     'monthly_10',
    label:  'Write 10 stories this month',
    target: { stories: 10, period: 'month' },
    icon:   '📖',
    sub:    'Quality and quantity.',
  },
  {
    id:     'custom',
    label:  'Set my own goal',
    target: null,
    icon:   '🎯',
    sub:    'Define what the practice looks like for you.',
  },
  {
    id:     'none',
    label:  'No goal for now',
    target: null,
    icon:   '○',
    sub:    'Some writers work best without counting.',
  },
];

export function renderGoalSetter(container, currentGoal = null) {
  container.innerHTML = `
    <div class="goal-setter">
      <h3 class="goal-setter__title">Your writing goal</h3>
      <p class="goal-setter__sub">
        Only you can see this. It's here to help — not to judge.
      </p>
      <div class="goal-options">
        ${GOAL_OPTIONS.map(g => `
          <label class="goal-option ${currentGoal?.id === g.id ? 'is-selected' : ''}"
                 for="goal-${g.id}">
            <input
              type="radio"
              id="goal-${g.id}"
              name="writing_goal"
              value="${g.id}"
              class="sr-only"
              ${currentGoal?.id === g.id ? 'checked' : ''}
            />
            <span class="goal-option__icon">${g.icon}</span>
            <span>
              <span class="goal-option__label">${g.label}</span>
              <span class="goal-option__sub">${g.sub}</span>
            </span>
          </label>
        `).join('')}
      </div>
      <div id="custom-goal-input" style="display:none;">
        <label class="field-label" for="custom-goal-stories">Stories per</label>
        <div style="display:flex;gap:var(--space-2);align-items:center;margin-top:var(--space-1);">
          <input type="number" id="custom-goal-stories" min="1" max="365"
                 class="field-input" style="width:80px;" placeholder="3" />
          <select id="custom-goal-period" class="field-input" style="width:auto;">
            <option value="day">day</option>
            <option value="week" selected>week</option>
            <option value="month">month</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" id="save-goal" style="margin-top:var(--space-5);">
        Save goal
      </button>
    </div>
  `;

  let selectedId = currentGoal?.id || null;

  container.querySelectorAll('input[name="writing_goal"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedId = e.target.value;
      container.querySelectorAll('.goal-option').forEach(opt => {
        opt.classList.toggle('is-selected', opt.querySelector('input').value === selectedId);
      });
      document.getElementById('custom-goal-input').style.display =
        selectedId === 'custom' ? 'block' : 'none';
    });
  });

  document.getElementById('save-goal').addEventListener('click', async () => {
    if (!selectedId) return;

    let target = GOAL_OPTIONS.find(g => g.id === selectedId)?.target ?? null;

    if (selectedId === 'custom') {
      const stories = parseInt(document.getElementById('custom-goal-stories').value, 10) || 1;
      const period  = document.getElementById('custom-goal-period').value;
      target = { stories, period };
    }

    await fetch('/api/me/writing-goal', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ goalId: selectedId, target }),
    }).catch(() => {});

    showToast(selectedId === 'none'
      ? 'Goal removed. Write however feels right.'
      : 'Goal saved. It\'s just for you.',
    );
  });
}

export async function renderGoalProgress(container) {
  try {
    const res  = await fetch('/api/me/writing-goal/progress');
    const data = await res.json();
    if (!data?.goal || data.goal.id === 'none') return;

    const { goal, progress } = data;
    const pct = Math.min(100, Math.round((progress.count / goal.target.stories) * 100));

    container.innerHTML = `
      <div class="goal-progress">
        <div class="goal-progress__header">
          <span class="goal-progress__label">Your goal this ${goal.target.period}</span>
          <span class="goal-progress__count">
            ${progress.count} / ${goal.target.stories}
          </span>
        </div>
        <div class="goal-progress__bar" role="progressbar"
             aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="goal-progress__fill" style="width:${pct}%;"></div>
        </div>
        ${pct >= 100
          ? `<p class="goal-progress__done">✦ Goal reached. You can keep going or just rest.</p>`
          : `<p class="goal-progress__remaining">${goal.target.stories - progress.count} more to reach your goal.</p>`
        }
      </div>
    `;
  } catch {}
}
