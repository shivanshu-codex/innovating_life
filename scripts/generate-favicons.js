import sharp         from 'sharp';
import { readFileSync } from 'fs';

const SVG_SOURCE = 'public/favicon.svg';

async function generateFavicons() {
  const svgBuffer = readFileSync(SVG_SOURCE);

  const sizes = [
    { name: 'favicon-16x16.png',          size: 16  },
    { name: 'favicon-32x32.png',          size: 32  },
    { name: 'apple-touch-icon.png',       size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`public/${name}`);
    console.log(`✓ Generated ${name} (${size}×${size})`);
  }

  const maskablePadding = Math.round(512 * 0.1);
  const iconSize        = 512 - maskablePadding * 2;

  await sharp(svgBuffer)
    .resize(iconSize, iconSize)
    .extend({
      top:        maskablePadding,
      bottom:     maskablePadding,
      left:       maskablePadding,
      right:      maskablePadding,
      background: { r: 245, g: 168, b: 0, alpha: 1 },
    })
    .png()
    .toFile('public/android-chrome-512x512-maskable.png');
  console.log('✓ Generated maskable icon');

  console.log('\n✦ All favicons generated successfully.');
}

generateFavicons();
