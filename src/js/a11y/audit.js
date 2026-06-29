export async function runA11yAudit(context = document) {
  if (!import.meta.env.DEV) return;

  const axe = await import('axe-core').catch(() => null);
  if (!axe) {
    console.warn('♿ Install axe-core for accessibility audits: npm i -D axe-core');
    return;
  }

  const results = await axe.default.run(context, {
    runOnly: {
      type:   'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
    },
  });

  if (results.violations.length === 0) {
    console.log(`✓ Lumina A11y: No violations on ${window.location.pathname}`);
    return;
  }

  console.group(`♿ Lumina A11y: ${results.violations.length} violations on ${window.location.pathname}`);
  results.violations.forEach(v => {
    console.group(`✕ [${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
    console.info('Help:', v.helpUrl);
    v.nodes.forEach(node => {
      console.log('Element:', node.target.join(', '));
      console.log('Fix:', node.failureSummary);
    });
    console.groupEnd();
  });
  console.groupEnd();

  return results;
}

export function initA11yMonitor() {
  if (!import.meta.env.DEV) return;

  setTimeout(() => runA11yAudit(), 500);

  window.addEventListener('popstate',        () => setTimeout(() => runA11yAudit(), 500));
  window.addEventListener('lumina:navigate', () => setTimeout(() => runA11yAudit(), 500));
}
