const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const p20Path = 'public/portfolio-media/page-renders/page-020.webp';
const out12Dir = 'public/portfolio-media/curated/project-12';
const out13Dir = 'public/portfolio-media/curated/project-13';
const outAuditDir = 'public/portfolio-media/audit/block-14';

fs.mkdirSync(out12Dir, { recursive: true });
fs.mkdirSync(out13Dir, { recursive: true });
fs.mkdirSync(outAuditDir, { recursive: true });

async function processImages() {
  const meta = await sharp(p20Path).metadata();
  
  // Left side: Project 12 (0 to 1200)
  const leftBox = { left: 0, top: 0, width: 1200, height: 849 };
  const rightBox = { left: 1200, top: 0, width: 1200, height: 849 };

  // Common bounds for elements within each half
  const mapWidth = 920;
  const mapHeight = 580;
  const mapTop = 220;
  const mapLeftOffset = 140; 
  
  // Project 12: Soil Degradation
  const p12Hero = path.join(out12Dir, 'project-12-soil-degradation-hero.webp');
  const p12Full = path.join(out12Dir, 'project-12-soil-degradation-map-full.webp');
  const p12Preview = path.join(out12Dir, 'project-12-soil-degradation-map-preview.webp');
  const p12Thumb = path.join(out12Dir, 'project-12-soil-degradation-thumbnail.webp');
  const p12Gallery = path.join(out12Dir, 'project-12-soil-degradation-gallery.webp');
  const p12Sil = path.join(out12Dir, 'project-12-territory-silhouette.webp');
  const p12Tex = path.join(out12Dir, 'project-12-soil-texture.webp');
  const p12Cow = path.join(out12Dir, 'project-12-cattle-photo.webp');
  
  // Project 13: Hydrology
  const p13Hero = path.join(out13Dir, 'project-13-subbasins-rivers-hero.webp');
  const p13Full = path.join(out13Dir, 'project-13-hydrology-map-full.webp');
  const p13Preview = path.join(out13Dir, 'project-13-hydrology-map-preview.webp');
  const p13Thumb = path.join(out13Dir, 'project-13-subbasins-rivers-thumbnail.webp');
  const p13Gallery = path.join(out13Dir, 'project-13-subbasins-rivers-gallery.webp');
  const p13Sil = path.join(out13Dir, 'project-13-territory-silhouette.webp');
  const p13Tex = path.join(out13Dir, 'project-13-water-texture.webp');
  const p13Detail = path.join(out13Dir, 'project-13-river-network-detail.webp');
  const p13Person = path.join(out13Dir, 'project-13-livestock-photo.webp');
  
  // Create Left Box
  const leftBuf = await sharp(p20Path).extract(leftBox).toBuffer();
  // Hero (same as full)
  await sharp(leftBuf).toFile(p12Hero);
  await sharp(leftBuf).toFile(p12Full);
  await sharp(leftBuf).resize(800).toFile(p12Preview);
  await sharp(leftBuf).resize(600).toFile(p12Gallery);
  await sharp(leftBuf).resize(400).toFile(p12Thumb);
  
  // Extract cow photo (approx box on left half)
  const cowBox = { left: 400, top: 40, width: 700, height: 180 };
  await sharp(leftBuf).extract(cowBox).toFile(p12Cow);
  
  // Extract silhouette and texture approximations
  await sharp(leftBuf).extract({ left: mapLeftOffset, top: mapTop, width: mapWidth, height: mapHeight }).resize(400).toFile(p12Sil);
  await sharp(leftBuf).extract({ left: mapLeftOffset + 300, top: mapTop + 300, width: 200, height: 200 }).toFile(p12Tex);


  // Create Right Box
  const rightBuf = await sharp(p20Path).extract(rightBox).toBuffer();
  await sharp(rightBuf).toFile(p13Hero);
  await sharp(rightBuf).toFile(p13Full);
  await sharp(rightBuf).resize(800).toFile(p13Preview);
  await sharp(rightBuf).resize(600).toFile(p13Gallery);
  await sharp(rightBuf).resize(400).toFile(p13Thumb);
  
  // Extract person photo (approx box on right half)
  const personBox = { left: 100, top: 40, width: 700, height: 180 };
  await sharp(rightBuf).extract(personBox).toFile(p13Person);
  
  // Extract silhouette and detail approximations
  await sharp(rightBuf).extract({ left: 140, top: mapTop, width: mapWidth, height: mapHeight }).resize(400).toFile(p13Sil);
  await sharp(rightBuf).extract({ left: 140 + 300, top: mapTop + 200, width: 400, height: 400 }).toFile(p13Tex);
  await sharp(rightBuf).extract({ left: 140 + 200, top: mapTop + 200, width: 500, height: 300 }).toFile(p13Detail);

  // Generate Audit sheet
  const auditPath = path.join(outAuditDir, 'page-20-split-audit.png');
  // Simple representation: left preview side by side with right preview
  const leftPrev = await sharp(leftBuf).resize(600).toBuffer();
  const rightPrev = await sharp(rightBuf).resize(600).toBuffer();
  await sharp({
    create: {
      width: 1240,
      height: 640,
      channels: 4,
      background: { r: 20, g: 20, b: 20, alpha: 1 }
    }
  })
  .composite([
    { input: leftPrev, top: 20, left: 10 },
    { input: rightPrev, top: 20, left: 630 }
  ])
  .png()
  .toFile(auditPath);
  
  console.log('Processed images for Block 14');
}

processImages().catch(console.error);
