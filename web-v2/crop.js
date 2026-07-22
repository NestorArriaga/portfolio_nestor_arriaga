const sharp = require('sharp');
async function run() {
  const metadata = await sharp('public/portfolio-media/page-renders/page-012.webp').metadata();
  console.log('Width:', metadata.width, 'Height:', metadata.height);
}
run();
