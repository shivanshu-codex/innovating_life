/**
 * Lumina — Critical CSS Extractor
 * Run after `npm run build` + `npm run preview`:
 *   node scripts/generate-critical.js
 *
 * Extracts above-the-fold CSS and inlines it into each HTML file.
 * This eliminates render-blocking CSS for the initial paint.
 * Requires: npm install --save-dev critical
 */

import { generate } from 'critical';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const pages = [
  { src: 'index.html',   target: 'index.html' },
  { src: 'index.html',   target: 'explore.html' },  // SPA — same HTML
];

async function run() {
  for (const page of pages) {
    console.log(`Extracting critical CSS for ${page.src}...`);
    try {
      await generate({
        base:    distDir,
        src:     page.src,
        target:  page.target,
        inline:  true,
        extract: false,
        // Mobile viewport — critical CSS for smallest screen first
        width:   375,
        height:  812,
        penthouse: {
          timeout:        60000,
          renderWaitTime: 300,
        },
      });
      console.log(`  ✓ Done: ${page.target}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${page.src}`, err.message);
    }
  }
}

run();
