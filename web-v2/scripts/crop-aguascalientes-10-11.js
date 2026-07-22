const sharp = require('sharp');
const fs = require('fs');

async function processAptitudePages() {
  const p18 = 'public/portfolio-media/page-renders/page-018.webp';
  const p19 = 'public/portfolio-media/page-renders/page-019.webp';
  
  if (!fs.existsSync(p18) || !fs.existsSync(p19)) {
    console.error('Source files not found');
    return;
  }

  const p10Base = 'public/portfolio-media/curated/project-10';
  const p11Base = 'public/portfolio-media/curated/project-11';
  const auditBase = 'public/portfolio-media/audit/block-13';

  // --- PROJECT 10 (Page 18) ---
  // Layout: Map on left (0 to 1200), Attributes/Method on right (1200 to 2400)
  const map10Box = { left: 0, top: 0, width: 1200, height: 849 };
  await sharp(p18).extract(map10Box).toFile(`${p10Base}/project-10-conservation-map-full.webp`);
  await sharp(p18).extract(map10Box).resize({ width: 1200 }).toFile(`${p10Base}/project-10-conservation-aptitude-hero.webp`);
  await sharp(p18).extract(map10Box).resize({ width: 800 }).toFile(`${p10Base}/project-10-conservation-aptitude-gallery.webp`);
  await sharp(p18).extract(map10Box).resize({ width: 400 }).toFile(`${p10Base}/project-10-conservation-map-preview.webp`);
  await sharp(p18).extract(map10Box).resize({ width: 400 }).toFile(`${p10Base}/project-10-conservation-aptitude-thumbnail.webp`);
  
  await sharp(p18).extract({ left: 200, top: 100, width: 800, height: 700 }).toFile(`${p10Base}/project-10-state-silhouette.webp`);
  await sharp(p18).extract({ left: 300, top: 300, width: 600, height: 400 }).toFile(`${p10Base}/project-10-conservation-texture.webp`);

  await sharp(p18).extract({ left: 1200, top: 150, width: 1200, height: 500 }).toFile(`${p10Base}/project-10-conservation-attributes.webp`);
  await sharp(p18).extract({ left: 1200, top: 650, width: 1200, height: 199 }).toFile(`${p10Base}/project-10-conservation-method-route.webp`);

  // --- PROJECT 11 (Page 19) ---
  const map11Box = { left: 0, top: 0, width: 1200, height: 849 };
  await sharp(p19).extract(map11Box).toFile(`${p11Base}/project-11-agricultural-map-full.webp`);
  await sharp(p19).extract(map11Box).resize({ width: 1200 }).toFile(`${p11Base}/project-11-agricultural-aptitude-hero.webp`);
  await sharp(p19).extract(map11Box).resize({ width: 800 }).toFile(`${p11Base}/project-11-agricultural-aptitude-gallery.webp`);
  await sharp(p19).extract(map11Box).resize({ width: 400 }).toFile(`${p11Base}/project-11-agricultural-map-preview.webp`);
  await sharp(p19).extract(map11Box).resize({ width: 400 }).toFile(`${p11Base}/project-11-agricultural-aptitude-thumbnail.webp`);

  await sharp(p19).extract({ left: 200, top: 100, width: 800, height: 700 }).toFile(`${p11Base}/project-11-state-silhouette.webp`);
  await sharp(p19).extract({ left: 300, top: 300, width: 600, height: 400 }).toFile(`${p11Base}/project-11-agricultural-texture.webp`);

  await sharp(p19).extract({ left: 1200, top: 150, width: 1200, height: 500 }).toFile(`${p11Base}/project-11-agricultural-attributes.webp`);
  await sharp(p19).extract({ left: 1200, top: 650, width: 1200, height: 199 }).toFile(`${p11Base}/project-11-agricultural-method-route.webp`);

  // --- AUDIT COMPOSITES ---
  // P18 Audit
  await sharp({
    create: { width: 2400, height: 1800, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  }).composite([
    { input: p18, top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="0" width="1200" height="849" fill="none" stroke="cyan" stroke-width="10"/></svg>'), top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="150" width="1200" height="500" fill="none" stroke="green" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    { input: Buffer.from('<svg><rect x="0" y="650" width="1200" height="199" fill="none" stroke="magenta" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    { input: `${p10Base}/project-10-conservation-map-preview.webp`, top: 900, left: 200 },
  ]).toFile(`${auditBase}/page-18-resource-audit.png`);

  // P19 Audit
  await sharp({
    create: { width: 2400, height: 1800, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  }).composite([
    { input: p19, top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="0" width="1200" height="849" fill="none" stroke="cyan" stroke-width="10"/></svg>'), top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="150" width="1200" height="500" fill="none" stroke="green" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    { input: Buffer.from('<svg><rect x="0" y="650" width="1200" height="199" fill="none" stroke="magenta" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    { input: `${p11Base}/project-11-agricultural-map-preview.webp`, top: 900, left: 200 },
  ]).toFile(`${auditBase}/page-19-resource-audit.png`);

  // Pair Audit (comparing the two extracted maps)
  await sharp({
    create: { width: 2400, height: 1000, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  }).composite([
    { input: await sharp(`${p10Base}/project-10-conservation-aptitude-hero.webp`).resize({ width: 1100 }).toBuffer(), top: 50, left: 50 },
    { input: await sharp(`${p11Base}/project-11-agricultural-aptitude-hero.webp`).resize({ width: 1100 }).toBuffer(), top: 50, left: 1250 },
  ]).toFile(`${auditBase}/aptitude-pair-audit.png`);

  console.log('Cropping aptitude pages 18 and 19 completed successfully!');
}

processAptitudePages().catch(console.error);
