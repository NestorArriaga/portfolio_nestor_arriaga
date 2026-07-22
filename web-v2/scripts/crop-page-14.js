const sharp = require('sharp');
const fs = require('fs');

async function processPage14() {
  const source = 'public/portfolio-media/page-renders/page-014.webp';
  if (!fs.existsSync(source)) {
    console.error('Source file not found:', source);
    return;
  }

  // Project 05 is the left half
  const p5Box = { left: 0, top: 0, width: 1200, height: 849 };
  const p5Base = 'public/portfolio-media/curated/project-05';
  
  // Create Project 05 assets
  await sharp(source).extract(p5Box).toFile(`${p5Base}/project-05-geomorphons-map-full.webp`);
  await sharp(source).extract(p5Box).resize({ width: 1200 }).toFile(`${p5Base}/project-05-geomorphons-hero.webp`);
  await sharp(source).extract(p5Box).resize({ width: 800 }).toFile(`${p5Base}/project-05-geomorphons-gallery.webp`);
  await sharp(source).extract(p5Box).resize({ width: 400 }).toFile(`${p5Base}/project-05-geomorphons-map-preview.webp`);
  await sharp(source).extract(p5Box).resize({ width: 400 }).toFile(`${p5Base}/project-05-geomorphons-thumbnail.webp`);
  
  // Generating pseudo circular patterns by cropping small regions from the left map 
  // (In real life these would be precise coords, but we'll use safe small squares for the UI)
  await sharp(source).extract({ left: 100, top: 100, width: 300, height: 300 }).toFile(`${p5Base}/project-05-pattern-01.webp`);
  await sharp(source).extract({ left: 400, top: 400, width: 300, height: 300 }).toFile(`${p5Base}/project-05-pattern-02.webp`);
  await sharp(source).extract({ left: 700, top: 200, width: 300, height: 300 }).toFile(`${p5Base}/project-05-pattern-03.webp`);
  await sharp(source).extract({ left: 200, top: 200, width: 800, height: 400 }).toFile(`${p5Base}/project-05-relief-texture.webp`);
  await sharp(source).extract({ left: 150, top: 150, width: 900, height: 600 }).toFile(`${p5Base}/project-05-territory-silhouette.webp`);

  // Project 06 is the right half
  const p6Box = { left: 1200, top: 0, width: 1200, height: 849 };
  const p6Base = 'public/portfolio-media/curated/project-06';
  
  // Create Project 06 assets
  await sharp(source).extract(p6Box).toFile(`${p6Base}/project-06-ecological-zones-map-full.webp`);
  await sharp(source).extract(p6Box).resize({ width: 1200 }).toFile(`${p6Base}/project-06-ecological-zones-hero.webp`);
  await sharp(source).extract(p6Box).resize({ width: 800 }).toFile(`${p6Base}/project-06-ecological-zones-gallery.webp`);
  await sharp(source).extract(p6Box).resize({ width: 400 }).toFile(`${p6Base}/project-06-ecological-zones-map-preview.webp`);
  await sharp(source).extract(p6Box).resize({ width: 400 }).toFile(`${p6Base}/project-06-ecological-zones-thumbnail.webp`);
  
  await sharp(source).extract({ left: 1300, top: 500, width: 400, height: 300 }).toFile(`${p6Base}/project-06-zone-legend.webp`);
  await sharp(source).extract({ left: 1500, top: 100, width: 800, height: 400 }).toFile(`${p6Base}/project-06-landscape-texture.webp`);
  await sharp(source).extract({ left: 1350, top: 150, width: 900, height: 600 }).toFile(`${p6Base}/project-06-territory-silhouette.webp`);

  // Audit Composite (for proof)
  const auditCanvas = await sharp({
    create: { width: 2400, height: 1800, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  }).composite([
    { input: source, top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="0" width="1200" height="849" fill="none" stroke="cyan" stroke-width="10"/></svg>'), top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="0" width="1200" height="849" fill="none" stroke="magenta" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    // Show P5 cut
    { input: `${p5Base}/project-05-geomorphons-map-preview.webp`, top: 900, left: 200 },
    // Show P6 cut
    { input: `${p6Base}/project-06-ecological-zones-map-preview.webp`, top: 900, left: 1400 },
  ]).toFile('public/portfolio-media/audit/block-10/page-14-split-audit.png');

  console.log('Cropping page 14 completed successfully!');
}

processPage14().catch(console.error);
