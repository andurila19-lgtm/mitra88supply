const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('script_6.txt', 'utf8');
const dir = path.join(__dirname, 'downloaded_assets');
const files = fs.readdirSync(dir);

console.log(`Analyzing ${files.length} downloaded files...`);

// In script_6.txt, Canva has RASTER objects with id, version, files: [{ url, width, height, quality, mimeType }]
const rasterRegex = /\{"type":"RASTER","id":"([^"]+)","version":\d+,"files":\[([\s\S]*?)\]\}/g;
let match;
const rasterMap = {};
while ((match = rasterRegex.exec(content)) !== null) {
  const id = match[1];
  const filesBlock = match[2];
  const urlMatches = [...filesBlock.matchAll(/"url":"_assets\/media\/([^"]+)".*?"width":(\d+),"height":(\d+)/g)];
  rasterMap[id] = urlMatches.map(m => ({ filename: m[1], width: parseInt(m[2]), height: parseInt(m[3]) }));
}

console.log('Raster objects mapped:', Object.keys(rasterMap).length);
fs.writeFileSync('raster_map.json', JSON.stringify(rasterMap, null, 2));

// Print list of files with sizes
const fileDetails = files.map(f => {
  const stat = fs.statSync(path.join(dir, f));
  return { filename: f, size: stat.size };
}).sort((a,b) => b.size - a.size);

console.log('Files by size:', fileDetails);
