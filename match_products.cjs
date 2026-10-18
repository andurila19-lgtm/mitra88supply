const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');
const rasterMap = JSON.parse(fs.readFileSync('raster_map.json', 'utf8'));

// Find occurrences of text near images
const products = [
  "Metallux",
  "ARMSTRONG",
  "JAYA PANEL",
  "USG BORAL",
  "AMF THERMATEX",
  "Marunda",
  "Data center",
  "MENGAPA",
  "Alamat Kantor",
  "mitra88supply"
];

products.forEach(p => {
  const idx = content.indexOf(p);
  if (idx !== -1) {
    const chunk = content.slice(Math.max(0, idx - 1000), Math.min(content.length, idx + 1000));
    const rasters = [...chunk.matchAll(/"A":"(MA[a-zA-Z0-9_\-]+|MAG[a-zA-Z0-9_\-]+)"/g)].map(m => m[1]);
    const matched = [...new Set(rasters)].filter(r => rasterMap[r]).map(r => `${r}: ${rasterMap[r][0].filename}`);
    console.log(`Keyword: ${p} -> rasters:`, matched);
  }
});
