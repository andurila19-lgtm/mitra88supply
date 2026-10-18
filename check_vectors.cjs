const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

// Look for SVG or VECTOR definitions
const vectorRegex = /\{"type":"VECTOR","id":"([^"]+)"[\s\S]*?\}/g;
let match;
let vectorCount = 0;
while ((match = vectorRegex.exec(content)) !== null) {
  vectorCount++;
  if (vectorCount <= 10) console.log('Vector:', match[1]);
}
console.log('Total vectors:', vectorCount);

// Let's also check if there is an image that has MITRA88 or triangle
const files = fs.readdirSync('downloaded_assets');
console.log('Checking remaining png/jpgs...');
