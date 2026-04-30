// Build-time generation of /og.png — a 1200×630 typographic card.
// Dark background, name in serif, positioning sentence in serif italic.
// No portrait, no logos. SVG → PNG via sharp.

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = '_site';
const OUT_PNG = path.join(OUT_DIR, 'og.png');
const OUT_SVG = path.join(OUT_DIR, 'og.svg');

const NAME = 'Anivar A. Aravind';
const POSITIONING = 'Engineering leadership and systems thinking';
const SUB = 'for technology that has to ship commercially, hold up under regulator and board scrutiny, and reach population scale at once.';
const URL = 'anivar.net';

const BG = '#0b0e14';
const INK = '#e8e6e1';
const MUTE = '#a6a39c';
const ACCENT = '#c9a35a';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <line x1="80" y1="120" x2="240" y2="120" stroke="${ACCENT}" stroke-width="3"/>
  <text x="80" y="225" font-family="Georgia, 'Times New Roman', serif" font-weight="600" font-size="76" fill="${INK}" letter-spacing="-1.5">${NAME}</text>
  <text x="80" y="320" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="40" fill="${INK}">${POSITIONING}</text>
  <foreignObject x="80" y="350" width="1040" height="180">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 1.45; color: ${MUTE}; max-width: 980px;">${SUB}</div>
  </foreignObject>
  <text x="80" y="560" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="22" fill="${MUTE}" letter-spacing="2">${URL}</text>
  <text x="1120" y="560" text-anchor="end" font-family="ui-monospace, 'JetBrains Mono', monospace" font-size="22" fill="${ACCENT}" letter-spacing="2">ENGINEERING · SYSTEMS · GOVERNANCE</text>
</svg>`;

await mkdir(OUT_DIR, { recursive: true });
await writeFile(OUT_SVG, svg);

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(OUT_PNG);

console.log('og: wrote', OUT_PNG);
