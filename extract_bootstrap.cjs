const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

const regex = /window\['bootstrap'\]\s*=\s*JSON\.parse\('([\s\S]*?)'\);\s*window\['__canva_app_init__'\]/;
const match = content.match(regex);
if (match) {
  const unescaped = match[1].replace(/\\'/g, "'").replace(/\\\\/g, "\\");
  // Some json unescaping might be needed
  try {
    const parsed = JSON.parse(unescaped);
    fs.writeFileSync('bootstrap.json', JSON.stringify(parsed, null, 2));
    console.log('Successfully saved bootstrap.json');
  } catch(e) {
    console.log('Direct JSON parse failed, trying alternative unescape:', e.message);
    // evaluate via vm or clean regex
    try {
      const data = eval("'" + match[1] + "'");
      fs.writeFileSync('bootstrap.json', JSON.stringify(JSON.parse(data), null, 2));
      console.log('Successfully saved bootstrap.json via eval string!');
    } catch(err) {
      console.error('Eval failed too:', err.message);
      fs.writeFileSync('bootstrap_raw.txt', match[1]);
    }
  }
} else {
  console.log('Could not match bootstrap regex');
}
