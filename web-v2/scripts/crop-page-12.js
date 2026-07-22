const sharp = require('sharp');
const fs = require('fs');

async function processPage12() {
  const source = 'public/portfolio-media/page-renders/page-012.webp';
  if (!fs.existsSync(source)) {
    console.error('Source file not found:', source);
    return;
  }

  // Dimensions of page-12 are 2400 x 849 (Pliego / Double spread)
  const leftHalf = { left: 0, top: 0, width: 1200, height: 849 };
  const rightHalf = { left: 1200, top: 0, width: 1200, height: 849 };

  // PROJECT 02
  const p2Base = 'public/portfolio-media/curated/project-02';
  await sharp(source).extract(leftHalf).toFile(`${p2Base}/project-02-carbon-map-full.webp`);
  await sharp(source).extract(leftHalf).resize({ width: 1200 }).toFile(`${p2Base}/project-02-carbon-map-hero.webp`);
  await sharp(source).extract(leftHalf).resize({ width: 800 }).toFile(`${p2Base}/project-02-carbon-map-gallery.webp`);
  await sharp(source).extract(leftHalf).resize({ width: 400 }).toFile(`${p2Base}/project-02-carbon-map-preview.webp`);
  
  // Crop a rough silhouette of the basin from the left half if needed, but we can just use the full map or CSS.
  // Actually let's just make the map-full the definitive one.

  // PROJECT 03
  const p3Base = 'public/portfolio-media/curated/project-03';
  await sharp(source).extract(rightHalf).toFile(`${p3Base}/project-03-optimal-zones-full.webp`);
  await sharp(source).extract(rightHalf).resize({ width: 1200 }).toFile(`${p3Base}/project-03-optimal-zones-hero.webp`);
  await sharp(source).extract(rightHalf).resize({ width: 800 }).toFile(`${p3Base}/project-03-optimal-zones-gallery.webp`);
  await sharp(source).extract(rightHalf).resize({ width: 400 }).toFile(`${p3Base}/project-03-optimal-zones-preview.webp`);

  console.log('Cropping completed successfully!');
}

processPage12().catch(console.error);
