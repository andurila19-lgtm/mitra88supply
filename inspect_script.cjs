const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

// Search for JSON or objects inside script
// Let's find any URLs or links
const urls = [...new Set(content.match(/https?:\\\/\\\/[^\s"'<>]+|https?:\/\/[^\s"'<>]+/g) || [])];
console.log('URLs in script_6:', urls.length);
urls.forEach(u => console.log('URL:', u.replace(/\\\//g, '/')));

// Search for text strings, titles, phone numbers
const phoneMatches = content.match(/\+?62[0-9\- ]{8,15}|08[0-9\- ]{8,15}/g);
console.log('Phone numbers found:', [...new Set(phoneMatches || [])]);
