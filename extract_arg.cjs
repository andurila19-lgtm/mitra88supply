const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

const marker = "window['bootstrap'] = JSON.parse(";
const idx = content.indexOf(marker);
console.log('Marker idx:', idx);
if (idx !== -1) {
  const rest = content.slice(idx + marker.length);
  const quoteChar = rest[0]; // should be ' or "
  console.log('Quote char:', quoteChar);
  // find closing quote and parenthesis
  let endIdx = rest.lastIndexOf(");");
  console.log('End idx:', endIdx);
  const rawArg = rest.slice(1, endIdx - 1);
  fs.writeFileSync('bootstrap_arg.txt', rawArg);
  console.log('Wrote bootstrap_arg.txt, length:', rawArg.length);
}
