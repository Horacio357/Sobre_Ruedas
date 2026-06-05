const fs = require('fs');
const path = './apps/web/lib/mock-data.ts';

let data = fs.readFileSync(path, 'utf8');

// We want to replace all lines that contain "url: '/images/..." or something similar
// Actually, it's safer to use regex to find image objects and filter them, or just string replacement for the URLs.

// Regex to find url: '/images/products/...'
data = data.replace(/url:\s*'\/images\/products\/[^']*'/g, "url: ''");

// Also remove the ice products fake images (they had https://i.ibb.co/95XjMJG/Roll-Line-Variant-M.png assigned)
// We know their product IDs are ice_1, ice_2, ice_3, ice_4, ice_5, ice_6
const iceIds = ['ice_1', 'ice_2', 'ice_3', 'ice_4', 'ice_5', 'ice_6'];
for (const id of iceIds) {
    const regex = new RegExp(`product_id:\\s*'${id}',\\s*url:\\s*'https:\\/\\/i\\.ibb\\.co\\/95XjMJG\\/Roll-Line-Variant-M\\.png'`, 'g');
    data = data.replace(regex, `product_id: '${id}', url: ''`);
}

fs.writeFileSync(path, data, 'utf8');
console.log("Mock data cleaned.");
