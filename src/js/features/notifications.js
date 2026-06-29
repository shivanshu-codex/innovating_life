const NOTIF_COPY = {
  resonated: (actor, count) =>
    count === 1
      ? `<strong>${actor}</strong> resonated with your story`
      : `<strong>${actor}</strong> and ${count - 1} other${count > 2 ? 's' : ''} resonated with your story`,

  reflected: (actor) =>
    `<strong>${actor}</strong> left a reflection on your story`,

  bookmarked: (actor) =>
    `<strong>${actor}</strong> saved your story`,

  message: (actor) =>
    `<strong>${actor}</strong> sent you a message`,

  milestone_10: (title) =>
    `Your story <em>"${title}"</em> reached 10 resonances ✦`,

  milestone_50: (title) =>
    `50 people resonated with <em>"${title}"</em> — that's something.`,

  milestone_100: (title) =>
    `100 hearts felt your words in <em>"${title}"</em>. Thank you for writing it.`,

  featured: (title) =>
    `Your story <em>"${title}"</em> has been featured in Explore ✦`,

  followed: (actor) =>
    `<strong>${actor}</strong> is now following your writing`,

  prompt_daily: (promptText) =>
    `Today's prompt: "${promptText}"`,
};

export class NotificationManager {
  constructor() {
    this.bell        = document.getElementById('notif-bell');
    this.badge       = document.getElementById('notif-badge');
    this.panel       = null;
    this.unreadCount = 0;
    this.isOpen      = false;
    this._init();
  }

  _init() {
    if (!this.bell) return;

    this.bell.addEventListener('click', () => {
      this.isOpen ? this.closePanel() : this.openPanel();
    });

    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.bell.closest('.notif-bell-wrapper')?.contains(e.target)) {
        this.closePanel();
      }
    });

    this._pollNotifications();
    setInterval(() => this._pollNotifications(), 30000);
  }

  async _pollNotifications() {
    try {
      const res  = await fetch('/api/notifications/unread-count');
      const data = await res.json();
      this.updateBadge(data.count);
    } catch {}
  }

  updateBadge(count) {
    this.unreadCount = count;
    if (!this.badge) return;
    if (count > 0) {
      this.badge.textContent = count > 99 ? '99+' : count;
      this.badge.hidden      = false;
      this.badge.style.animation = 'none';
      void this.badge.offsetWidth;
      this.badge.style.animation = '';
    } else {
      this.badge.hidden = true;
    }
  }

  async openPanel() {
    this.isOpen = true;
    this.panel  = document.createElement('div');
    this.panel.className = 'notif-panel';
    this.panel.innerHTML = `
      <div class="notif-panel__header">
        <span class="notif-panel__title">Notifications</span>
        <button class="notif-panel__mark-all" id="notif-mark-all">Mark all read</button>
      </div>
      <div class="notif-list" id="notif-list">
        <div class="notif-empty">
          <div class="notif-empty__icon">✦</div>
          <p class="notif-empty__title">Loading…</p>
        </div>
      </div>
    `;

    this.bell.closest('.notif-bell-wrapper')?.appendChild(this.panel);

    document.getElementById('notif-mark-all')?.addEventListener('click', async () => {
      await fetch('/api/notifications/mark-all-read', { method: 'PATCH' });
      this.updateBadge(0);
      this.panel?.querySelectorAll('.notif-item.is-unread').forEach(item => {
        item.classList.remove('is-unread');
      });
    });

    await this._loadNotifications();
  }

  async _loadNotifications() {
    try {
      const res  = await fetch('/api/notifications?limit=20');
      const data = await res.json();
      const list = document.getElementById('notif-list');
      if (!list) return;

      if (!data.notifications?.length) {
        list.innerHTML = `
          <div class="notif-empty">
            <div class="notif-empty__icon">✦</div>
            <p class="notif-empty__title">You're all caught up</p>
            <p class="notif-empty__body">When someone resonates with your writing,<br>you'll hear about it here.</p>
          </div>
        `;
        return;
      }

      list.innerHTML = data.notifications.map(n => `
        <a class="notif-item ${n.isRead ? '' : 'is-unread'}"
           href="${n.actionUrl || '#'}"
           data-id="${n.id}">
          <div class="notif-avatar${n.actorAvatar ? '' : ' notif-avatar--system'}">
            ${n.actorAvatar
              ? `<img src="${n.actorAvatar}" alt="${n.actorName}" width="36" height="36" loading="lazy">`
              : this._typeIcon(n.type)
            }
          </div>
          <div class="notif-body">
            <p class="notif-text">${this._copyForNotif(n)}</p>
            ${n.contentPreview ? `<p class="notif-preview">${n.contentPreview}</p>` : ''}
          </div>
          <span class="notif-time">${this._relativeTime(n.createdAt)}</span>
        </a>
      `).join('');

      const unreadIds = data.notifications.filter(n => !n.isRead).map(n => n.id);
      if (unreadIds.length) {
        fetch('/api/notifications/mark-read', {
          method:  'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ ids: unreadIds }),
        });
        this.updateBadge(Math.max(0, this.unreadCount - unreadIds.length));
      }
    } catch {
      const list = document.getElementById('notif-list');
      if (list) list.innerHTML = `
        <div class="notif-empty">
          <p class="notif-empty__title">Couldn't load notifications</p>
        </div>
      `;
    }
  }

  _copyForNotif(n) {
    const fn = NOTIF_COPY[n.type];
    if (!fn) return n.body || '';
    if (n.type === 'resonated')     return fn(n.actorName, n.actorCount || 1);
    if (n.type === 'reflected')     return fn(n.actorName);
    if (n.type === 'bookmarked')    return fn(n.actorName);
    if (n.type === 'message')       return fn(n.actorName);
    if (n.type === 'milestone_10')  return fn(n.contentTitle);
    if (n.type === 'milestone_50')  return fn(n.contentTitle);
    if (n.type === 'milestone_100') return fn(n.contentTitle);
    if (n.type === 'featured')      return fn(n.contentTitle);
    if (n.type === 'followed')      return fn(n.actorName);
    if (n.type === 'prompt_daily')  return fn(n.promptText);
    return n.body || '';
  }

  _typeIcon(type) {
    const icons = {
      resonated:     '✦',
      milestone_10:  '🌟',
      milestone_50:  '🌟',
      milestone_100: '🌟',
      featured:      '✦',
      prompt_daily:  '✍️',
    };
    return icons[type] || '✦';
  }

  _relativeTime(dateStr) {
    const diff  = Date.now() - new Date(dateStr).getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days  = Math.floor(hours / 24);
    if (mins < 1)   return 'just now';
    if (mins < 60)  return `${mins}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7)   return `${days}d`;
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }

  closePanel() {
    this.isOpen = false;
    this.panel?.remove();
    this.panel  = null;
  }
}
