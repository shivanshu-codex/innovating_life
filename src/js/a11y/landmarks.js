export function auditLandmarks() {
  if (!import.meta.env.DEV) return;

  const required = {
    'banner (header)':      'header[role="banner"], body > header',
    'navigation':           'nav[aria-label], [role="navigation"][aria-label]',
    'main':                 'main, [role="main"]',
    'contentinfo (footer)': 'footer[role="contentinfo"], body > footer',
  };

  const warnings = [];

  Object.entries(required).forEach(([name, selector]) => {
    const els = document.querySelectorAll(selector);
    if (els.length === 0) {
      warnings.push(`✕ Missing landmark: ${name}`);
    } else if (els.length > 1 && name !== 'navigation') {
      warnings.push(`⚠️ Multiple ${name} landmarks found (${els.length}) — expected 1`);
    }
  });

  const navs      = document.querySelectorAll('nav');
  const navLabels = Array.from(navs).map(n =>
    n.getAttribute('aria-label') || n.getAttribute('aria-labelledby')
  );
  const uniqueNavLabels = new Set(navLabels);
  if (navLabels.length !== uniqueNavLabels.size) {
    warnings.push('⚠️ Multiple <nav> elements with identical or missing aria-label');
  }

  if (warnings.length) {
    console.group('♿ Lumina A11y: Landmark Issues');
    warnings.forEach(w => console.warn(w));
    console.groupEnd();
  } else {
    console.log('✓ Lumina A11y: Landmark structure correct');
  }
}
