import { FocusManager, announce } from './focus-manager.js';

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new CustomEvent('lumina:navigate', { detail: { path } }));
}

const SHORTCUTS = [
  { key: 'g h', description: 'Go to Home/Feed',     action: () => navigate('/feed')          },
  { key: 'g e', description: 'Go to Explore',       action: () => navigate('/explore')       },
  { key: 'g w', description: 'Go to Write',         action: () => navigate('/write')         },
  { key: 'g p', description: 'Go to your Profile',  action: () => navigate('/me')            },
  { key: 'g n', description: 'Go to Notifications', action: () => navigate('/notifications') },
  { key: 'n',   description: 'New story',           action: () => navigate('/write'),
    skipIn: ['input', 'textarea', '[contenteditable]'] },
  { key: '/',   description: 'Search',              action: openSearch,
    skipIn: ['input', 'textarea'] },
  { key: '?',   description: 'Keyboard shortcuts',  action: openShortcutsHelp },
  { key: 'Escape', description: 'Close modal/panel', action: closeTopLayer },
];

let pendingKey   = null;
let pendingTimer = null;

export function initKeyboardShortcuts() {
  document.addEventListener('keydown', handleKeydown);
}

function handleKeydown(e) {
  const tag     = document.activeElement?.tagName?.toLowerCase();
  const inField = ['input', 'textarea', 'select'].includes(tag)
               || document.activeElement?.isContentEditable;

  if (e.key === 'Escape') {
    closeTopLayer();
    return;
  }

  if (inField) return;

  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const key = e.key;

  if (pendingKey === 'g') {
    clearTimeout(pendingTimer);
    pendingKey = null;
    const seq      = `g ${key}`;
    const shortcut = SHORTCUTS.find(s => s.key === seq);
    if (shortcut) {
      e.preventDefault();
      shortcut.action();
      announce(`Navigating to ${shortcut.description.replace('Go to ', '')}`);
    }
    return;
  }

  if (key === 'g') {
    pendingKey   = 'g';
    pendingTimer = setTimeout(() => { pendingKey = null; }, 800);
    return;
  }

  const shortcut = SHORTCUTS.find(s => s.key === key);
  if (shortcut) {
    e.preventDefault();
    shortcut.action();
  }
}

function closeTopLayer() {
  const closeHandlers = [
    () => document.querySelector('.bottom-sheet.is-open')?.dispatchEvent(new CustomEvent('close')),
    () => document.querySelector('[role="dialog"]')?.dispatchEvent(new CustomEvent('close')),
    () => { const p = document.querySelector('.notif-panel'); if (p) { p.remove(); return true; } },
  ];
  for (const handler of closeHandlers) {
    if (handler()) return;
  }
}

function openSearch() {
  document.getElementById('search-trigger')?.click();
}

function openShortcutsHelp() {
  const modal = document.createElement('div');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Keyboard shortcuts');
  modal.innerHTML = `
    <div class="shortcuts-backdrop" id="shortcuts-backdrop"></div>
    <div class="shortcuts-modal">
      <div class="shortcuts-modal__header">
        <h2 class="shortcuts-modal__title">Keyboard shortcuts</h2>
        <button class="shortcuts-modal__close" id="shortcuts-close" aria-label="Close">✕</button>
      </div>
      <dl class="shortcuts-list">
        ${SHORTCUTS.filter(s => s.description !== 'Keyboard shortcuts').map(s => `
          <div class="shortcut-row">
            <dt class="shortcut-key">
              ${s.key.split(' ').map(k =>
                `<kbd class="kbd">${k === 'Escape' ? 'Esc' : k}</kbd>`
              ).join(' then ')}
            </dt>
            <dd class="shortcut-desc">${s.description}</dd>
          </div>
        `).join('')}
      </dl>
    </div>
  `;

  document.body.appendChild(modal);
  const inner   = modal.querySelector('.shortcuts-modal');
  const cleanup = FocusManager.trapFocus(inner);
  const trigger = FocusManager.saveFocus();

  const close = () => {
    modal.remove();
    cleanup();
    FocusManager.returnFocus(trigger);
  };

  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  document.getElementById('shortcuts-close').addEventListener('click', close);
  document.getElementById('shortcuts-backdrop').addEventListener('click', close);
}
