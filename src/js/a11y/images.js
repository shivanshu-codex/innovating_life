export function auditImages() {
  if (!import.meta.env.DEV) return;

  const images = Array.from(document.querySelectorAll('img'));
  const issues = [];

  images.forEach((img, i) => {
    const src = img.src || img.dataset.src || '(lazy)';
    const alt = img.getAttribute('alt');

    if (alt === null) {
      issues.push(`✕ Image ${i + 1} missing alt attribute: ${src.slice(-50)}`);
    }

    if (!img.width || !img.height) {
      issues.push(`⚠️ Image ${i + 1} missing explicit width/height (causes CLS): ${src.slice(-50)}`);
    }
  });

  document.querySelectorAll('button svg, a svg').forEach((svg, i) => {
    const btn   = svg.closest('button, a');
    const label = btn?.getAttribute('aria-label')
               || btn?.getAttribute('aria-labelledby')
               || btn?.textContent?.trim();

    if (!label && !svg.getAttribute('aria-label') && !svg.getAttribute('aria-labelledby')) {
      issues.push(`✕ SVG icon ${i + 1} in interactive element has no accessible label`);
    }

    if (label && svg.getAttribute('aria-hidden') !== 'true') {
      issues.push(`⚠️ SVG icon ${i + 1} not aria-hidden (redundant with parent label)`);
    }
  });

  if (issues.length) {
    console.group('♿ Lumina A11y: Image Issues');
    issues.forEach(i => console.warn(i));
    console.groupEnd();
  } else {
    console.log('✓ Lumina A11y: All images have correct alt attributes');
  }
}

export const AltText = {
  avatar:     (name)          => `${name}'s profile photo`,
  storyCover: (_title)        => '',
  ogImage:    (title, author) => `"${title}" by ${author} — story on Lumina`,
  topicHero:  (_topicName)    => '',
  icon:       ()              => '',
};
