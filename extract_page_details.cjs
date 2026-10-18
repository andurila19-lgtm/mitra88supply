const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');
const rasterMap = JSON.parse(fs.readFileSync('raster_map.json', 'utf8'));

// Find all occurrences of page IDs
const pIds = ["PB1HZKqDwq2K6r26", "PBNx2GJCcsW1h9x5", "PBfhmqVQbg09znCQ", "PBqd1xc6czchNYcS"];
const pNames = {
  "PB1HZKqDwq2K6r26": "Tentang Kami (Home)",
  "PBNx2GJCcsW1h9x5": "Layanan (Produk dan Layanan)",
  "PBfhmqVQbg09znCQ": "Porto Folio Project",
  "PBqd1xc6czchNYcS": "Hubungi Kami"
};

const indices = pIds.map(id => ({ id, name: pNames[id], index: content.indexOf(`"a":"${id}"`) })).sort((a,b) => a.index - b.index);

for (let i = 0; i < indices.length; i++) {
  const current = indices[i];
  const next = indices[i+1];
  const start = current.index;
  const end = next ? next.index : content.length;
  const slice = content.slice(start, end);

  console.log(`\n=================== ${current.name} (length: ${slice.length}) ===================`);
  
  const texts = [...slice.matchAll(/"A":\[\{"A\?":"A","A":"([^"]*)"\}/g)].map(m => m[1].replace(/\\n/g, '\n').trim());
  console.log('--- TEXTS:');
  texts.forEach((t, ti) => console.log(` [${ti+1}] ${t.replace(/\n/g, ' ')}`));

  const rasters = [...slice.matchAll(/"A":"(MA[a-zA-Z0-9_\-]+|MAG[a-zA-Z0-9_\-]+)"/g)].map(m => m[1]);
  const uniqueRasters = [...new Set(rasters)].filter(r => rasterMap[r]);
  console.log('--- IMAGES:');
  uniqueRasters.forEach(r => {
    console.log(` - ${r} -> ${rasterMap[r][0].filename} (${rasterMap[r][0].width}x${rasterMap[r][0].height})`);
  });
}
