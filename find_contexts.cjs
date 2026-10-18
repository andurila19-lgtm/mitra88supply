const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');
const rasterMap = JSON.parse(fs.readFileSync('raster_map.json', 'utf8'));

for (const id of Object.keys(rasterMap)) {
  let pos = 0;
  const contexts = [];
  while ((pos = content.indexOf(id, pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(content.length, pos + 150);
    contexts.push(content.slice(start, end));
    pos += id.length;
  }
  console.log(`=== ID: ${id} (file: ${rasterMap[id][0].filename}) ===`);
  contexts.slice(0, 2).forEach(c => console.log('  CTX:', c.replace(/\n/g, ' ')));
}
