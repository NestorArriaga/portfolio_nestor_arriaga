const sharp = require('sharp');
const fs = require('fs');

async function processAguascalientes() {
  const p16 = 'public/portfolio-media/page-renders/page-016.webp';
  const p17 = 'public/portfolio-media/page-renders/page-017.webp';
  
  if (!fs.existsSync(p16) || !fs.existsSync(p17)) {
    console.error('Source files not found');
    return;
  }

  // --- PAGE 16: TERRITORIAL PHOTO ---
  const tBase = 'public/portfolio-media/curated/territories';
  // Extract photo from left side of p16
  await sharp(p16).extract({ left: 0, top: 0, width: 1200, height: 849 }).toFile(`${tBase}/territory-aguascalientes-calvillo-photo.webp`);
  await sharp(p16).extract({ left: 300, top: 0, width: 600, height: 849 }).toFile(`${tBase}/territory-aguascalientes-calvillo-photo-portrait.webp`);
  await sharp(p16).extract({ left: 0, top: 200, width: 1200, height: 600 }).toFile(`${tBase}/territory-aguascalientes-calvillo-photo-landscape.webp`);
  await sharp(p16).extract({ left: 600, top: 400, width: 600, height: 400 }).toFile(`${tBase}/territory-aguascalientes-cluster-texture.webp`); // fallback texture

  // --- PAGE 17: PROJECT 09 ---
  // The layout has the map on the left (0 to 1200) and the text/clusters on the right (1200 to 2400)
  const p9Base = 'public/portfolio-media/curated/project-09';
  
  // Map (Left Half)
  const mapBox = { left: 0, top: 0, width: 1200, height: 849 };
  await sharp(p17).extract(mapBox).toFile(`${p9Base}/project-09-vocational-map-full.webp`);
  await sharp(p17).extract(mapBox).resize({ width: 1200 }).toFile(`${p9Base}/project-09-cluster-hero.webp`);
  await sharp(p17).extract(mapBox).resize({ width: 800 }).toFile(`${p9Base}/project-09-cluster-gallery.webp`);
  await sharp(p17).extract(mapBox).resize({ width: 400 }).toFile(`${p9Base}/project-09-vocational-map-preview.webp`);
  await sharp(p17).extract(mapBox).resize({ width: 400 }).toFile(`${p9Base}/project-09-cluster-thumbnail.webp`);
  
  // Territorial Silhouette (just a crop of the shape)
  await sharp(p17).extract({ left: 200, top: 100, width: 800, height: 700 }).toFile(`${p9Base}/project-09-state-silhouette.webp`);
  await sharp(p17).extract({ left: 300, top: 300, width: 600, height: 400 }).toFile(`${p9Base}/project-09-cluster-texture.webp`);

  // Text/Clusters (Right Half)
  // Green Cluster Diagram
  await sharp(p17).extract({ left: 1200, top: 150, width: 1200, height: 250 }).toFile(`${p9Base}/project-09-green-cluster-detail.webp`);
  // Orange Cluster Diagram
  await sharp(p17).extract({ left: 1200, top: 450, width: 1200, height: 250 }).toFile(`${p9Base}/project-09-orange-cluster-detail.webp`);
  // Methodology Route
  await sharp(p17).extract({ left: 1200, top: 750, width: 1200, height: 99 }).toFile(`${p9Base}/project-09-method-route.webp`);

  // Audit Composite (for proof)
  const auditCanvas = await sharp({
    create: { width: 2400, height: 1800, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  }).composite([
    { input: p17, top: 0, left: 0 },
    // Borders
    { input: Buffer.from('<svg><rect x="0" y="0" width="1200" height="849" fill="none" stroke="cyan" stroke-width="10"/></svg>'), top: 0, left: 0 },
    { input: Buffer.from('<svg><rect x="0" y="150" width="1200" height="250" fill="none" stroke="green" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    { input: Buffer.from('<svg><rect x="0" y="450" width="1200" height="250" fill="none" stroke="orange" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    { input: Buffer.from('<svg><rect x="0" y="750" width="1200" height="99" fill="none" stroke="magenta" stroke-width="10"/></svg>'), top: 0, left: 1200 },
    // Show Map Cut
    { input: `${p9Base}/project-09-vocational-map-preview.webp`, top: 900, left: 200 },
    // Show Method Cut (resized for preview)
    { input: await sharp(`${p9Base}/project-09-method-route.webp`).resize({ width: 800 }).toBuffer(), top: 900, left: 1400 },
  ]).toFile('public/portfolio-media/audit/block-12/page-17-resource-audit.png');

  console.log('Cropping page 16 and 17 completed successfully!');
}

processAguascalientes().catch(console.error);
