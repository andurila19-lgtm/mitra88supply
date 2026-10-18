const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

// Pages are in "g": [ { "K": "PB1HZKqDwq2K6r26", "L": "", "O": "Tentang Kami" }, ... ]
// Let's find the section corresponding to "PB1HZKqDwq2K6r26"
const pages = ["PB1HZKqDwq2K6r26", "PBNx2GJCcsW1h9x5", "PBfhmqVQbg09znCQ", "PBqd1xc6czchNYcS"];

pages.forEach(pId => {
  console.log(`\n=================== PAGE ${pId} ===================`);
  const idx = content.indexOf(`"a":"${pId}"`);
  if (idx !== -1) {
    const chunk = content.slice(idx, idx + 4000);
    // Find text and raster references in this chunk
    const texts = [...chunk.matchAll(/"A":\[\{"A\?":"A","A":"([^"]*)"\}/g)].map(m => m[1].replace(/\\n/g, '\n'));
    console.log('Texts:', texts);
    const rasters = [...chunk.matchAll(/"A":"(MA[a-zA-Z0-9_\-]+|MAG[a-zA-Z0-9_\-]+)"/g)].map(m => m[1]);
    console.log('Rasters:', [...new Set(rasters)]);
  }
});
