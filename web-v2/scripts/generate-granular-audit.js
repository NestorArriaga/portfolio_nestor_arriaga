const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'public/portfolio-media/page-renders';
const auditDir = 'public/portfolio-media/audit/block-15';

fs.mkdirSync(auditDir, { recursive: true });

async function run() {
  const pages = [];
  for (let i = 21; i <= 40; i++) {
    const pageNum = i.toString().padStart(3, '0');
    const srcPath = path.join(srcDir, `page-${pageNum}.webp`);
    if (fs.existsSync(srcPath)) {
      pages.push({ i, path: srcPath });
      // Generate individual audit copies (resize for manageable file size if needed, but the prompt says "high resolution", so we'll just copy it)
      const auditPath = path.join(auditDir, `page-${i}-audit.png`);
      await sharp(srcPath).png().toFile(auditPath);
    }
  }

  // Create Contact Sheet
  // Grid: 5 columns, 4 rows
  const colCount = 5;
  const rowCount = 4;
  const thumbW = 400;
  const thumbH = (400 * 849) / 1200; // Assuming 1200x849 ratio (page ratio) ~ 400x283
  const gap = 20;

  const width = colCount * thumbW + (colCount + 1) * gap;
  const height = rowCount * thumbH + (rowCount + 1) * gap + 100;

  // Process thumbnails
  const composites = [];
  for (let idx = 0; idx < pages.length; idx++) {
    const p = pages[idx];
    const col = idx % colCount;
    const row = Math.floor(idx / colCount);
    
    const x = gap + col * (thumbW + gap);
    const y = gap + row * (thumbH + gap) + 80;

    const buf = await sharp(p.path).resize(thumbW).toBuffer();
    composites.push({
      input: buf,
      left: x,
      top: y
    });
  }

  await sharp({
    create: { width, height: Math.ceil(height), channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  })
  .composite(composites)
  .png()
  .toFile(path.join(auditDir, 'granular-pages-21-40-contact-sheet.png'));
  
  // Large contact sheet (double size)
  const compositesLg = [];
  const lW = 800;
  const lH = (800 * 849) / 1200;
  const lGap = 40;
  const lw = colCount * lW + (colCount + 1) * lGap;
  const lh = rowCount * lH + (rowCount + 1) * lGap + 100;
  
  for (let idx = 0; idx < pages.length; idx++) {
    const p = pages[idx];
    const col = idx % colCount;
    const row = Math.floor(idx / colCount);
    const x = lGap + col * (lW + lGap);
    const y = lGap + row * (lH + lGap) + 80;
    const buf = await sharp(p.path).resize(lW).toBuffer();
    compositesLg.push({ input: buf, left: x, top: y });
  }

  await sharp({
    create: { width: lw, height: Math.ceil(lh), channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } }
  })
  .composite(compositesLg)
  .png()
  .toFile(path.join(auditDir, 'granular-pages-21-40-contact-sheet-large.png'));

  console.log('Contact sheets and audit images generated.');
}

run().catch(console.error);
