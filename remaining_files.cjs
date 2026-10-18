const fs = require('fs');
const files = fs.readdirSync('downloaded_assets');

const alreadyViewed = new Set([
  'd19305367538220917902bab194c57d7.png', // USG BORAL logo
  '0b7c1ca2467af534ab6945c4a1bf7cb9.png', // 3D Youtube icon
  'e450cf013677ec95c2f9f7bc27110179.png', // Armstrong logo
  '50ee42e64bfb1a57f7ce26cb3d4b1744.png', // Metallux logo
  'a31aa18d7bbbc619c6036d06cf1557d6.png', // Room background
  '43a13618dcf5238d195b6e176dbbf91b.jpg', // Metallux 600x600 graphic
  '389fc427ac577b2dc1f3c1f444888526.jpg', // Armstrong samples
  'dfcdf87983429ffe2851b801e6841a48.jpg', // USG Boral pin perf
  '50b82574593513c336875e6b07bbbee7.jpg', // AMF Thermatex star board
  'd01e30bfe0d7b00cf586f1cd6cbf3353.jpg', // Jaya panel boxes
  '1033085bab01aab8765c200099c8b738.jpg', // USG pin perf board
  '4302cc4a7e1cc33d8f488563797e694a.jpg', // AMF logo
  'ac8350992e61d8cfc75956f1f2d0b728.png', // Mengapa Memilih Kami graphic
  '12126b93893727dccf4ceef1fea5a4fd.jpg', // Ceiling Reseller & Applicator poster
  '6482f4155cdbb0dd88ce56e663432cf1.jpg', // Marunda project
  'ecf20cfe74609991c0f38b40a8d82750.jpg', // Data center server room project
  '2337296a891d17034846c61a6c863be1.png', // WhatsApp icon
  'f1326484166c43122f0386067c1e4884.jpg', // Ceiling hall work
  '88a5121c3a07dcf61b8752cb0198787f.jpg'  // Ceiling corridor
]);

const remaining = files.filter(f => !alreadyViewed.has(f));
console.log('Remaining files:', remaining);
