const sharp = require('sharp');
const fs = require('fs');

async function processPage15() {
  const source = 'public/portfolio-media/page-renders/page-015.webp';
  if (!fs.existsSync(source)) {
    console.error('Source file not found:', source);
    return;
  }

  // Project 07 is the left half
  const p7Box = { left: 0, top: 0, width: 1200, height: 849 };
  const p7Base = 'public/portfolio-media/curated/project-07';
  
  // Create Project 07 assets
  await sharp(source).extract(p7Box).toFile(`${p7Base}/project-07-slope-map-full.webp`);
  await sharp(source).extract(p7Box).resize({ width: 1200 }).toFile(`${p7Base}/project-07-slope-hero.webp`);
  await sharp(source).extract(p7Box).resize({ width: 800 }).toFile(`${p7Base}/project-07-slope-gallery.webp`);
  await sharp(source).extract(p7Box).resize({ width: 400 }).toFile(`${p7Base}/project-07-slope-map-preview.webp`);
  await sharp(source).extract(p7Box).resize({ width: 400 }).toFile(`${p7Base}/project-07-slope-thumbnail.webp`);
  
  await sharp(source).extract({ left: 100, top: 500, width: 300, height: 250 }).toFile(`${p7Base}/project-07-slope-legend.webp`);
  await sharp(source).extract({ left: 150, top: 150, width: 900, height: 600 }).toFile(`${p7Base}/project-07-territory-silhouette.webp`);
  await sharp(source).extract({ left: 200, top: 200, width: 800, height: 400 }).toFile(`${p7Base}/project-07-relief-texture.webp`);

  // Project 08 is the right half
  const p8Box = { left: 1200, top: 0, width: 1200, height: 849 };
  const p8Base = 'public/portfolio-media/curated/project-08';
  
  // Create Project 08 assets
  await sharp(source).extract(p8Box).toFile(`${p8Base}/project-08-representative-geomorphons-map-full.webp`);
  await sharp(source).extract(p8Box).resize({ width: 1200 }).toFile(`${p8Base}/project-08-representative-geomorphons-hero.webp`);
  await sharp(source).extract(p8Box).resize({ width: 800 }).toFile(`${p8Base}/project-08-representative-geomorphons-gallery.webp`);
  await sharp(source).extract(p8Box).resize({ width: 400 }).toFile(`${p8Base}/project-08-representative-geomorphons-map-preview.webp`);
  await sharp(source).extract(p8Box).resize({ width: 400 }).toFile(`${p8Base}/project-08-representative-geomorphons-thumbnail.webp`);
  
  await sharp(source).extract({ left: 1400, top: 250, width: 600, height: 450 }).toFile(`${p8Base}/project-08-red-points-detail.webp`);
  await sharp(source).extract({ left: 1350, top: 150, width: 900, height: 600 }).toFile(`${p8Base}/project-08-territory-silhouette.webp`);
  await sharp(source).extract({ left: 1500, top: 100, width: 800, height: 400 }).toFile(`${p8Base}/project-08-pattern-texture.webp`);

  // Audit Composite (for proof)
  const auditCanvas = await sharp({
    create: { width: 2400, height: 1800, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  }).composite([
    { input: source, top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="0" width="1200" height="849" fill="none" stroke="cyan" stroke-width="10"/></svg>'), top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="0" width="1200" height="849" fill="none" stroke="magenta" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    // Show P7 cut
    { input: `${p7Base}/project-07-slope-map-preview.webp`, top: 900, left: 200 },
    // Show P8 cut
    { input: `${p8Base}/project-08-representative-geomorphons-map-preview.webp`, top: 900, left: 1400 },
  ]).toFile('public/portfolio-media/audit/block-11/page-15-split-audit.png');

  console.log('Cropping page 15 completed successfully!');
}

processPage15().catch(console.error);
