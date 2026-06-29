export const PRIVACY_OPTIONS = [
  {
    value:    'PUBLIC',
    icon:     '🌍',
    label:    'Public',
    sublabel: 'Anyone can read this',
  },
  {
    value:    'COMMUNITY',
    icon:     '✦',
    label:    'Community',
    sublabel: 'Members only',
  },
  {
    value:    'ANONYMOUS',
    icon:     '🎭',
    label:    'Anonymous',
    sublabel: 'Public, but not you',
  },
  {
    value:    'PRIVATE',
    icon:     '🔒',
    label:    'Private',
    sublabel: 'Only you can see this',
  },
];

export function renderPrivacySelector(container, { selected = 'PUBLIC', onChange } = {}) {
  container.innerHTML = '';
  container.className = 'privacy-selector';

  PRIVACY_OPTIONS.forEach(option => {
    const btn = document.createElement('button');
    btn.type      = 'button';
    btn.className = 'privacy-option' + (option.value === selected ? ' is-selected' : '');
    btn.setAttribute('aria-pressed', option.value === selected ? 'true' : 'false');
    btn.innerHTML = `
      <span class="privacy-option__icon">${option.icon}</span>
      <span>
        <span class="privacy-option__label">${option.label}</span>
        <span class="privacy-option__sublabel">${option.sublabel}</span>
      </span>
    `;

    btn.addEventListener('click', () => {
      container.querySelectorAll('.privacy-option').forEach(el => {
        el.classList.remove('is-selected');
        el.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
      if (onChange) onChange(option.value);
    });

    container.appendChild(btn);
  });

  return {
    getValue: () => {
      const sel = container.querySelector('.privacy-option.is-selected');
      return sel ? PRIVACY_OPTIONS.find(o => {
        const icon = sel.querySelector('.privacy-option__label').textContent;
        return o.label === icon;
      })?.value ?? selected : selected;
    },
    setValue: (value) => {
      container.querySelectorAll('.privacy-option').forEach((el, i) => {
        const isMatch = PRIVACY_OPTIONS[i]?.value === value;
        el.classList.toggle('is-selected', isMatch);
        el.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
      });
    },
  };
}
