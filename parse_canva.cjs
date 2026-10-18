const fs = require('fs');
const html = fs.readFileSync('canva_source.html', 'utf8');
console.log('HTML length:', html.length);

const waRegex = /https?:\/\/[^\s"'<>]+(?:wa\.me|whatsapp)[^\s"'<>]*/gi;
const waMatches = [...new Set(html.match(waRegex) || [])];
console.log('WA matches:', waMatches);

const allUrls = [...new Set(html.match(/https?:\/\/[^\s"'<>]+/gi) || [])];
console.log('Total URLs found:', allUrls.length);

const imgUrls = allUrls.filter(u => /\.(jpg|jpeg|png|webp|svg)/i.test(u) || u.includes('image') || u.includes('canva'));
console.log('Img/Canva URLs:', imgUrls.slice(0, 30));

// Look for bootstrap / data payloads
const scriptTags = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Script tags count:', scriptTags.length);
for (let i = 0; i < scriptTags.length; i++) {
  const s = scriptTags[i];
  if (s.includes('Mitra') || s.includes('0813') || s.includes('bahan')) {
    console.log(`Script ${i} mentions keywords, length: ${s.length}`);
    fs.writeFileSync(`script_${i}.txt`, s);
  }
}
