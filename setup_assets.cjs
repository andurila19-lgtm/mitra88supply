const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images');
fs.mkdirSync(targetDir, { recursive: true });

const assetMapping = {
  // Posters & Banners
  'poster-hero.jpg': '12126b93893727dccf4ceef1fea5a4fd.jpg',
  'banner-keunggulan.png': 'ef60b36131fca26ad0cedb0d4b9a9a0f.png',
  
  // Brand Logos
  'brand-armstrong.png': 'e450cf013677ec95c2f9f7bc27110179.png',
  'brand-metallux.png': '50ee42e64bfb1a57f7ce26cb3d4b1744.png',
  'brand-usg-boral.png': 'd19305367538220917902bab194c57d7.png',
  'brand-knauf.png': 'e3e99cf9ea296833ddc0a6b80a3525ae.png',
  'brand-amf.jpg': '4302cc4a7e1cc33d8f488563797e694a.jpg',
  
  // Products
  'product-metallux-600.jpg': '43a13618dcf5238d195b6e176dbbf91b.jpg',
  'product-armstrong-acoustic.jpg': '389fc427ac577b2dc1f3c1f444888526.jpg',
  'product-jayapanel-gyptile.jpg': 'd01e30bfe0d7b00cf586f1cd6cbf3353.jpg',
  'product-usg-pinperf.jpg': 'dfcdf87983429ffe2851b801e6841a48.jpg',
  'product-amf-thermatex.jpg': '50b82574593513c336875e6b07bbbee7.jpg',
  'product-pinperf-sample.jpg': '1033085bab01aab8765c200099c8b738.jpg',
  
  // Portfolio
  'portfolio-marunda.jpg': '6482f4155cdbb0dd88ce56e663432cf1.jpg',
  'portfolio-datacenter.jpg': 'aae92ae131f71a2f2e45190e73a5dfb7.jpg',
  'portfolio-datacenter-alt.jpg': 'ecf20cfe74609991c0f38b40a8d82750.jpg',
  'portfolio-hallway.jpg': 'f888c3709561e2d1aafe8ccd16373e78.jpg',
  'portfolio-hallway-alt.jpg': '88a5121c3a07dcf61b8752cb0198787f.jpg',
  'portfolio-meeting-room.jpg': '94dd9b33c91ebf2a492406190c92f9d7.jpg',
  'portfolio-installation.jpg': 'f1326484166c43122f0386067c1e4884.jpg',

  // Social / UI Icons
  'icon-youtube.png': '0b7c1ca2467af534ab6945c4a1bf7cb9.png',
  'icon-wa.png': '2337296a891d17034846c61a6c863be1.png',
  'bg-interior.png': 'a31aa18d7bbbc619c6036d06cf1557d6.png'
};

const srcDir = path.join(__dirname, 'downloaded_assets');

let copied = 0;
for (const [destName, srcName] of Object.entries(assetMapping)) {
  const src = path.join(srcDir, srcName);
  const dest = path.join(targetDir, destName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    copied++;
    console.log(`Copied ${srcName} -> ${destName}`);
  } else {
    console.warn(`Warning: source file not found: ${srcName}`);
  }
}

console.log(`Successfully organized ${copied} assets into public/images/`);
