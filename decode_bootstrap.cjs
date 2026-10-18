const fs = require('fs');
const raw = fs.readFileSync('bootstrap_arg.txt', 'utf8');

// The string was inside '...' in JS, so it has escaped quotes and backslashes
// Let's decode it safely
const decoded = eval("'" + raw + "'");
const data = JSON.parse(decoded);
fs.writeFileSync('bootstrap.json', JSON.stringify(data, null, 2));
console.log('Successfully written bootstrap.json!');
console.log('Keys:', Object.keys(data));
