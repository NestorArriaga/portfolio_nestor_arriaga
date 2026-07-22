const sharp = require('sharp');
const fs = require('fs');

async function processPage13() {
  const source = 'public/portfolio-media/page-renders/page-013.webp';
  if (!fs.existsSync(source)) {
    console.error('Source file not found:', source);
    return;
  }

  // Use the right half as it typically contains the core map for these single-project spreads
  const rightHalf = { left: 1200, top: 0, width: 1200, height: 849 };
  const p4Base = 'public/portfolio-media/curated/project-04';

  await sharp(source).extract(rightHalf).toFile(`${p4Base}/project-04-land-use-full.webp`);
  await sharp(source).extract(rightHalf).resize({ width: 1200 }).toFile(`${p4Base}/project-04-land-use-hero.webp`);
  await sharp(source).extract(rightHalf).resize({ width: 800 }).toFile(`${p4Base}/project-04-land-use-gallery.webp`);
  await sharp(source).extract(rightHalf).resize({ width: 400 }).toFile(`${p4Base}/project-04-land-use-preview.webp`);
  
  console.log('Cropping page 13 completed successfully!');
}

processPage13().catch(console.error);
