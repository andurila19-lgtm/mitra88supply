const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

// Canva puts data in a JSON object in window.__INITIAL_STATE__ or similar
// Let's find JSON object
const match = content.match(/window\.[a-zA-Z0-9_]+\s*=\s*(\{[\s\S]*\});?/);
if (match) {
  console.log('Found window assignment!');
  try {
    const jsonStr = match[1];
    fs.writeFileSync('initial_state.json', jsonStr);
    console.log('Saved initial_state.json, length:', jsonStr.length);
  } catch(e) {
    console.error('Error writing json:', e);
  }
} else {
  // Let's inspect the start of script_6
  console.log('Start of script_6:', content.slice(0, 500));
}
