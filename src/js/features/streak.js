function showToast(message) {
  window.dispatchEvent(new CustomEvent('lumina:toast', { detail: { message } }));
}

export class StreakDisplay {
  constructor(container) {
    this.container = container;
  }

  async render() {
    const streak = await this.fetchStreak();
    if (!streak) return;
    this.container.innerHTML = this._buildHTML(streak);
    this._attachHandlers(streak);
  }

  async fetchStreak() {
    try {
      const res = await fetch('/api/me/streak');
      return await res.json();
    } catch { return null; }
  }

  _buildHTML(streak) {
    const { currentStreak, longestStreak, lastWrittenDate, isRestDay, gracePeriodUsed } = streak;
    const wroteToday = this._isToday(lastWrittenDate);
    const icon       = isRestDay ? '♾️' : wroteToday ? '✦' : '◯';
    const statusText = wroteToday
      ? 'Written today'
      : isRestDay
        ? 'Rest day'
        : 'Not yet today';

    const isPersonalBest = currentStreak >= longestStreak && currentStreak >= 7;

    return `
      <div class="streak-card">
        <div class="streak-main">
          <span class="streak-icon" aria-hidden="true">${icon}</span>
          <div class="streak-info">
            <span class="streak-count">${currentStreak}</span>
            <span class="streak-label">day${currentStreak !== 1 ? 's' : ''} writing</span>
          </div>
        </div>
        <div class="streak-meta">
          <span class="streak-status ${wroteToday ? 'is-done' : isRestDay ? 'is-rest' : ''}">
            ${statusText}
          </span>
          ${!wroteToday && !isRestDay && !gracePeriodUsed ? `
            <button class="streak-rest-btn" id="streak-rest-btn">
              Take a rest day
            </button>
          ` : ''}
        </div>
        ${isPersonalBest
          ? `<p class="streak-best">Personal best 🎉</p>`
          : longestStreak > currentStreak
            ? `<p class="streak-best">Your best: ${longestStreak} days</p>`
            : ''
        }
      </div>
    `;
  }

  _attachHandlers() {
    const restBtn = this.container.querySelector('#streak-rest-btn');
    if (!restBtn) return;

    restBtn.addEventListener('click', async () => {
      try {
        const res  = await fetch('/api/me/streak/rest-day', { method: 'POST' });
        const data = await res.json();
        if (data.ok) {
          showToast('Rest day recorded. See you tomorrow. ♾️');
          this.render();
        } else if (data.error === 'already_used') {
          showToast('You\'ve already taken a rest day this week.');
        }
      } catch {
        showToast('Something went wrong. Please try again.');
      }
    });
  }

  _isToday(dateStr) {
    if (!dateStr) return false;
    const d   = new Date(dateStr);
    const now = new Date();
    return d.getFullYear() === now.getFullYear()
        && d.getMonth()    === now.getMonth()
        && d.getDate()     === now.getDate();
  }
}
