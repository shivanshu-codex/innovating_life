export function auditHeadings(container = document) {
  if (!import.meta.env.DEV) return [];

  const headings  = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let h1Count     = 0;
  let lastLevel   = 0;
  const issues    = [];

  headings.forEach(h => {
    const level = parseInt(h.tagName[1]);
    if (level === 1) h1Count++;

    if (level > lastLevel + 1 && lastLevel !== 0) {
      issues.push(`⚠️ Heading skip: H${lastLevel} → H${level} at: "${h.textContent.trim().substring(0, 50)}"`);
    }
    lastLevel = level;
  });

  if (h1Count === 0) issues.push('✗ No H1 found on page');
  if (h1Count > 1)  issues.push(`✗ Multiple H1 tags found (${h1Count}). Each page should have exactly one.`);

  if (issues.length) {
    console.group('🔍 Lumina SEO: Heading Audit Issues');
    issues.forEach(i => console.warn(i));
    console.groupEnd();
  } else {
    console.log('✓ Lumina SEO: Heading structure is correct');
  }

  return issues;
}
