const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

// Let's find all text chunks in the file
// Canva stores text in spans, paragraphs, or JSON objects
// Let's extract any text objects or strings with Indonesian words
const regex = /"text":"([^"]+)"/g;
let match;
const texts = [];
while ((match = regex.exec(content)) !== null) {
  texts.push(match[1]);
}
console.log('Texts with "text":', texts.length);

// Also look for text content in general strings
const indonesianKeywords = ["Mitra", "Supply", "Bahan", "Kue", "Layanan", "Portofolio", "Hubungi", "Produk", "Tentang", "Visi", "Misi", "Keunggulan", "Alamat", "Bandung", "Pengiriman", "Order", "Pemesanan"];
indonesianKeywords.forEach(kw => {
  const count = (content.match(new RegExp(kw, 'gi')) || []).length;
  console.log(`Keyword "${kw}": ${count} occurrences`);
});

// Let's write a snippet extractor around keywords
const lines = [];
indonesianKeywords.forEach(kw => {
  let pos = 0;
  while ((pos = content.indexOf(kw, pos)) !== -1) {
    const start = Math.max(0, pos - 80);
    const end = Math.min(content.length, pos + 120);
    lines.push(content.slice(start, end));
    pos += kw.length;
    if (lines.length > 50) break;
  }
});
fs.writeFileSync('snippets.txt', lines.join('\n---\n'));
console.log('Saved snippets.txt');
