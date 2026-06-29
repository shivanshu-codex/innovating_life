/**
 * Lumina — Image Processing Pipeline
 * Run when a new image is uploaded:
 *   node scripts/process-images.js <input.jpg> <imageId>
 *
 * Generates WebP + AVIF + JPG at multiple sizes for responsive images.
 * Requires: npm install sharp
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STORY_COVER_SIZES = [400, 800, 1200];
const AVATAR_SIZES      = [40, 80, 160];

export async function processStoryImage(inputPath, imageId) {
  const outputBase = path.join(__dirname, '..', 'public', 'cdn', 'stories', imageId);
  const placeholders = [];

  for (const width of STORY_COVER_SIZES) {
    const height = Math.round(width * (9 / 16)); // enforce 16:9

    // WebP — primary format, universal support
    await sharp(inputPath)
      .resize(width, height, { fit: 'cover', position: 'attention' })
      .webp({ quality: 80, effort: 6 })
      .toFile(`${outputBase}-${width}.webp`);

    // AVIF — best compression, growing browser support
    await sharp(inputPath)
      .resize(width, height, { fit: 'cover', position: 'attention' })
      .avif({ quality: 65, effort: 6 })
      .toFile(`${outputBase}-${width}.avif`);

    // JPEG — universal fallback
    await sharp(inputPath)
      .resize(width, height, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(`${outputBase}-${width}.jpg`);

    console.log(`  ✓ ${imageId} @ ${width}px — webp, avif, jpg`);
  }

  // Tiny blur placeholder (20×11px, ~300 bytes as base64)
  const buf = await sharp(inputPath)
    .resize(20, 11)
    .webp({ quality: 20 })
    .toBuffer();

  return `data:image/webp;base64,${buf.toString('base64')}`;
}

export async function processAvatar(inputPath, userId) {
  const outputBase = path.join(__dirname, '..', 'public', 'cdn', 'avatars', userId);

  for (const size of AVATAR_SIZES) {
    await sharp(inputPath)
      .resize(size, size, { fit: 'cover', position: 'face' })
      .webp({ quality: 85 })
      .toFile(`${outputBase}-${size}.webp`);

    console.log(`  ✓ avatar:${userId} @ ${size}px`);
  }
}

// CLI usage: node scripts/process-images.js <inputPath> <id> <type=story|avatar>
if (process.argv[2]) {
  const [, , inputPath, id, type = 'story'] = process.argv;
  const fn = type === 'avatar' ? processAvatar : processStoryImage;
  fn(inputPath, id)
    .then((placeholder) => {
      if (placeholder) console.log('Blur placeholder:', placeholder.slice(0, 60) + '…');
    })
    .catch(console.error);
}
