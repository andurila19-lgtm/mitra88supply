const fs = require('fs');
const content = fs.readFileSync('script_6.txt', 'utf8');

const matches = content.match(/_assets\/media\/[a-zA-Z0-9_\.]+/g);
const uniqueMedia = [...new Set(matches || [])];
console.log('Total unique media found:', uniqueMedia.length);
console.log(uniqueMedia);

fs.writeFileSync('media_list.json', JSON.stringify(uniqueMedia, null, 2));
