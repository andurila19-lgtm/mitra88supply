const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

// Search for "RESELLER & APPLICATOR" in script_6
const idx = content.indexOf('RESELLER');
console.log('RESELLER index:', idx);
if (idx !== -1) {
  console.log('Context around RESELLER:', content.slice(Math.max(0, idx - 200), Math.min(content.length, idx + 300)));
}
