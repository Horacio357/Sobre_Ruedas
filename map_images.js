const fs = require('fs');

const path = './apps/web/lib/mock-data.ts';
let data = fs.readFileSync(path, 'utf8');

// The transparent links provided by the user
const links = [
  { match: /plate-variant-m\.png/i, url: 'https://i.ibb.co/95XjMJG/Roll-Line-Variant-M.png' },
  { match: /plate-variant-c\.png/i, url: 'https://i.ibb.co/mrg0h3s0/Roll-Line-Variant-C.png' },
  { match: /plate-variant-f\.png/i, url: 'https://i.ibb.co/1t9dF7fT/Roll-Line-Variant-f.png' },
  { match: /plate-spin\.png/i, url: 'https://i.ibb.co/4Z5W8g4G/Roll-Line-Spin.png' },
  { match: /wheels-angel\.png/i, url: 'https://i.ibb.co/SDTQ8ZBB/Roll-Line-ruedas-helium.png' }, // Not Angel, let's just use what they gave
  { match: /plate-giotto\.png/i, url: 'https://i.ibb.co/k51S22Kx/Roll-Line-ruedas-giotto.png' }, // wait, Giotto wheels or plate? The user gave 'Roll-Line-ruedas-giotto.png'. So it's wheels!
  { match: /plancha-magic1\.png/i, url: 'https://i.ibb.co/JWZ7ZvF6/Roll-Line-Matrix.png' }, // Matrix
  { match: /plancha-magic2\.png/i, url: 'https://i.ibb.co/YTw3VGP8/Roll-Line-Evo.png' }, // Evo
  { match: /plancha-magic3\.png/i, url: 'https://i.ibb.co/nq9g9Td7/Roll-Line-Saturno.png' }, // Saturno
  { match: /plancha-magic4\.png/i, url: 'https://i.ibb.co/jvMxyczh/Roll-Line-ruedas-magnum.png' }, // Magnum
  { match: /plancha-magic5\.png/i, url: 'https://i.ibb.co/7NSXMRkk/Roll-Line-ruedas-boxer.png' }, // Boxer
  { match: /plancha-magic6\.png/i, url: 'https://i.ibb.co/vCcLCJzm/Roll-Line-Mistral-2.png' }, // Mistral
  { match: /plancha-magic7\.png/i, url: 'https://i.ibb.co/LdKwnRPZ/Roll-Line-Mirage.png' }, // Mirage
  { match: /risport-royal-pro\.png/i, url: 'https://i.ibb.co/d4VhV7bb/Dance-prime.png' }, // Dance prime
  { match: /risport-venus\.png/i, url: 'https://i.ibb.co/84tmmn28/Risport-Venus.png' },
];

const lines = data.split('\n');
for (let i = 0; i < lines.length; i++) {
    for (const mapping of links) {
        if (lines[i].includes('url:') && mapping.match.test(lines[i])) {
            lines[i] = lines[i].replace(/url:\s*'[^']+'/, `url: '${mapping.url}'`);
        }
    }
}

// Now we need to DELETE all new_prod_ products and their images to prevent duplicates.
const filteredLines = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('id: \'new_prod_')) {
        skip = true;
    }
    if (skip && line.includes('},')) {
        skip = false;
        continue;
    }
    if (skip) continue;

    // Delete images of new_prod
    if (line.includes("product_id: 'new_prod_")) {
        continue;
    }

    filteredLines.push(line);
}

fs.writeFileSync(path, filteredLines.join('\n'), 'utf8');
console.log('Images mapped and duplicates removed.');
