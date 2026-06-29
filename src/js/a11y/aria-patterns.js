import { FocusManager, announce } from './focus-manager.js';

export function createToggleButton({ label, pressedLabel, onToggle }) {
  const btn = document.createElement('button');
  btn.type  = 'button';
  btn.setAttribute('aria-pressed', 'false');
  btn.setAttribute('aria-label', label);

  btn.addEventListener('click', () => {
    const isPressed = btn.getAttribute('aria-pressed') === 'true';
    const newState  = !isPressed;
    btn.setAttribute('aria-pressed', String(newState));
    btn.setAttribute('aria-label', newState ? pressedLabel : label);
    onToggle?.(newState);
  });

  return btn;
}

export function initTabPanel(tablist) {
  const tabs   = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));

  tabs.forEach((tab, i) => {
    tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
    tab.setAttribute('aria-selected', String(i === 0));
    if (i !== 0) panels[i]?.setAttribute('hidden', '');
    else panels[i]?.removeAttribute('hidden');
  });

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(i));
    tab.addEventListener('keydown', (e) => {
      let targetIndex;
      if (e.key === 'ArrowRight') targetIndex = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft')  targetIndex = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home')       targetIndex = 0;
      if (e.key === 'End')        targetIndex = tabs.length - 1;

      if (targetIndex !== undefined) {
        e.preventDefault();
        activateTab(targetIndex);
        tabs[targetIndex].focus();
      }
    });
  });

  function activateTab(index) {
    tabs.forEach((t, i) => {
      t.setAttribute('aria-selected', String(i === index));
      t.setAttribute('tabindex', i === index ? '0' : '-1');
    });
    panels.forEach((p, i) => {
      if (!p) return;
      if (i === index) p.removeAttribute('hidden');
      else p.setAttribute('hidden', '');
    });
    announce(`${tabs[index].textContent.trim()} tab selected`);
  }
}

export function initDisclosure(trigger, panel) {
  const isExpanded = () => trigger.getAttribute('aria-expanded') === 'true';

  trigger.setAttribute('aria-expanded', 'false');
  if (!panel.id) panel.id = `panel-${Math.random().toString(36).slice(2)}`;
  trigger.setAttribute('aria-controls', panel.id);
  panel.setAttribute('hidden', '');

  trigger.addEventListener('click', () => {
    const expanded = !isExpanded();
    trigger.setAttribute('aria-expanded', String(expanded));
    if (expanded) panel.removeAttribute('hidden');
    else panel.setAttribute('hidden', '');
  });
}

export function initCombobox(input, listbox) {
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-haspopup', 'listbox');
  input.setAttribute('aria-controls', listbox.id);
  input.setAttribute('aria-activedescendant', '');
  listbox.setAttribute('role', 'listbox');

  let activeIndex = -1;

  const options = () => Array.from(listbox.querySelectorAll('[role="option"]'));

  const setActive = (index) => {
    options().forEach((opt, i) => {
      opt.setAttribute('aria-selected', String(i === index));
      if (i === index) {
        if (!opt.id) opt.id = `opt-${i}`;
        input.setAttribute('aria-activedescendant', opt.id);
      }
    });
    activeIndex = index;
  };

  input.addEventListener('keydown', (e) => {
    const opts = options();
    if (!opts.length) return;

    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIndex + 1, opts.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(Math.max(activeIndex - 1, 0)); }
    if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); opts[activeIndex].click(); }
    if (e.key === 'Escape') {
      listbox.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      activeIndex = -1;
    }
  });

  const showListbox = () => {
    listbox.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };
  const hideListbox = () => {
    listbox.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-activedescendant', '');
    activeIndex = -1;
  };

  input.addEventListener('input', showListbox);
  input.addEventListener('blur',  () => setTimeout(hideListbox, 150));

  return { showListbox, hideListbox, setActive };
}

export function openDialog(dialogEl, triggerEl) {
  dialogEl.setAttribute('role', 'dialog');
  dialogEl.setAttribute('aria-modal', 'true');

  const savedFocus = FocusManager.saveFocus();
  const cleanup    = FocusManager.trapFocus(dialogEl);
  document.body.setAttribute('aria-hidden', '');

  const closeHandler = () => {
    document.body.removeAttribute('aria-hidden');
    cleanup();
    FocusManager.returnFocus(triggerEl || savedFocus);
    dialogEl.removeEventListener('close', closeHandler);
  };
  dialogEl.addEventListener('close', closeHandler);

  return closeHandler;
}
