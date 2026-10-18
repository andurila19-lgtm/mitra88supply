const fs = require('fs');
const https = require('https');
const path = require('path');

const mediaList = JSON.parse(fs.readFileSync('media_list.json', 'utf8'));
const targetDir = path.join(__dirname, 'downloaded_assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadFile(relPath) {
  const url = `https://mitra88supply.my.canva.site/${relPath}`;
  const filename = path.basename(relPath);
  const dest = path.join(targetDir, filename);

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${url}: status ${res.statusCode}`);
        return resolve(null);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve({ filename, size: fs.statSync(dest).size });
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err.message);
      resolve(null);
    });
  });
}

async function main() {
  console.log(`Downloading ${mediaList.length} assets...`);
  const results = [];
  for (const m of mediaList) {
    const res = await downloadFile(m);
    if (res) results.push(res);
  }
  console.log(`Downloaded ${results.length} files successfully!`);
}

main();
