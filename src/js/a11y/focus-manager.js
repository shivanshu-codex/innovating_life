const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary',
].join(', ');

export class FocusManager {

  static trapFocus(container) {
    const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS))
      .filter(el => !el.closest('[hidden]') && el.offsetParent !== null);

    if (!focusable.length) return () => {};

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    first.focus();

    const handler = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', handler);
    return () => container.removeEventListener('keydown', handler);
  }

  static focusMain() {
    const main = document.getElementById('main-content');
    if (!main) return;
    main.focus();

    const h1 = main.querySelector('h1');
    if (h1) announce(h1.textContent);
  }

  static returnFocus(triggerElement) {
    if (triggerElement && typeof triggerElement.focus === 'function') {
      setTimeout(() => triggerElement.focus(), 50);
    }
  }

  static saveFocus() {
    return document.activeElement;
  }

  static firstFocusable(container) {
    return container.querySelector(FOCUSABLE_SELECTORS);
  }
}

export function announce(message, priority = 'polite') {
  const id = priority === 'assertive' ? 'a11y-alert' : 'a11y-announcer';
  const el = document.getElementById(id);
  if (!el) return;

  el.textContent = '';
  requestAnimationFrame(() => {
    el.textContent = message;
  });
}
