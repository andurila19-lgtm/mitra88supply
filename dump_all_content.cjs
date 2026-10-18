const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

// Find all occurrences of text objects.
// In Canva JSON, text is structured in elements with "A":[{"A?":"A","A":"<text>"}]
const textRegex = /"A":\[\{"A\?":"A","A":"([^"]*)"\}/g;
let match;
const allTexts = [];
while ((match = textRegex.exec(content)) !== null) {
  let val = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
  allTexts.push(val);
}

fs.writeFileSync('all_texts.txt', allTexts.join('\n---\n'));
console.log('Extracted', allTexts.length, 'text elements');

// Let's also extract fonts mapping
const fontRegex = /\{"A":"([^"]+)","B":(\d+),"C":"([^"]+)"/g;
const fonts = [];
while ((match = fontRegex.exec(content)) !== null) {
  fonts.push({ id: match[1], index: match[2], name: match[3] });
}
console.log('Fonts:', fonts);
fs.writeFileSync('fonts.json', JSON.stringify(fonts, null, 2));

// Let's find pages and structure
// Notice in snippet line 23:
// "g":[{"A?":"A","K":"PB1HZKqDwq2K6r26","L":"","O":"Tentang Kami"...
const pagesMatch = content.match(/"g":(\[\{"A\?":"A"[\s\S]*?\}\])/);
if (pagesMatch) {
  try {
    const pages = JSON.parse(pagesMatch[1]);
    console.log('Pages navigation:', pages);
    fs.writeFileSync('nav_pages.json', JSON.stringify(pages, null, 2));
  } catch(e) {
    console.log('Could not parse pages json directly:', e.message);
  }
}
