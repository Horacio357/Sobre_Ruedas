const fs = require('fs');
const { execSync } = require('child_process');

// 1. Get old mock-data.ts
const oldData = execSync('git show 96b8f98:apps/web/lib/mock-data.ts', { encoding: 'utf8' });
// Extract the images arrays or just find all url definitions
const urlMap = {}; // productId -> url

// Extremely hacky but effective way to parse product_id and url
const lines = oldData.split('\n');
for (const line of lines) {
    if (line.includes('product_id:') && line.includes('url:')) {
        const prodMatch = line.match(/product_id:\s*'([^']+)'/);
        const urlMatch = line.match(/url:\s*'([^']+)'/);
        if (prodMatch && urlMatch) {
            if (!urlMap[prodMatch[1]]) {
                urlMap[prodMatch[1]] = [];
            }
            urlMap[prodMatch[1]].push(urlMatch[1]);
        }
    }
}

// 2. Read current mock-data.ts
const currentPath = './apps/web/lib/mock-data.ts';
let currentData = fs.readFileSync(currentPath, 'utf8');

// 3. For each line in currentData that has product_id and url: '', replace it if we have it in urlMap
const currentLines = currentData.split('\n');
for (let i = 0; i < currentLines.length; i++) {
    const line = currentLines[i];
    if (line.includes('product_id:') && line.includes("url: ''")) {
        const prodMatch = line.match(/product_id:\s*'([^']+)'/);
        if (prodMatch) {
            const pid = prodMatch[1];
            // If the old data had this product, restore its first image
            // We'll just shift from urlMap to handle multiple images
            if (urlMap[pid] && urlMap[pid].length > 0) {
                const restoredUrl = urlMap[pid].shift();
                currentLines[i] = line.replace("url: ''", `url: '${restoredUrl}'`);
            }
        }
    }
}

// 4. Also, for the new products that I added via add_new_products.js, let's just make sure they are visible. 
// But wait, the NEW products (new_prod_901 etc) already have valid i.ibb.co urls! So they don't have url: ''. They are fine.
// What about the ice blades? I set their url to '' to remove the plate image. That's fine, they will fallback to placeholder.png.

fs.writeFileSync(currentPath, currentLines.join('\n'), 'utf8');
console.log('Restored old placeholder URLs for missing images.');
