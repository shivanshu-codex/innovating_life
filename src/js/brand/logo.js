const sizeMap = { sm: '1rem', md: '1.25rem', lg: '1.75rem', xl: '2.5rem' };

export function renderLogo({
  variant   = 'full',
  size      = 'md',
  theme     = 'default',
  href      = '/',
  ariaLabel = 'Lumina — go to home page',
} = {}) {

  const fontSize   = sizeMap[size] || sizeMap.md;
  const themeClass = theme !== 'default' ? ` wordmark--${theme}` : '';
  const symbol     = `<span class="logo__symbol" aria-hidden="true">✦</span>`;
  const text       = `<span class="logo__text${themeClass}">Lumina</span>`;

  let inner;
  switch (variant) {
    case 'symbol':
      inner = symbol;
      break;
    case 'wordmark':
      inner = text;
      break;
    case 'stacked':
      inner = `<span style="display:flex;flex-direction:column;align-items:center;gap:0.2em;">${symbol}${text}</span>`;
      break;
    default:
      inner = symbol + text;
  }

  return `<a href="${href}" class="logo nav-logo" style="font-size:${fontSize};" aria-label="${ariaLabel}">${inner}</a>`;
}
