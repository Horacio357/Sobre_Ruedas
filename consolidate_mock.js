const fs = require('fs');
const path = './apps/web/lib/mock-data.ts';

let data = fs.readFileSync(path, 'utf8');

// 1. Identify all products
const productRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)'[\s\S]*?\}(?=,\n\s*\{|\n\];)/g;
let match;
const products = [];

// For a simpler approach, we'll just parse the file manually or use a mapping.
// Let's just find the `new_prod_` products and map their images to the original products by name.
const newProds = [];
const lines = data.split('\n');
let inNewProd = false;
let currentNewProd = {};

// It's much easier to just do simple string replacements if we know the names and URLs.
// Wait, the images are in the `images` array at the bottom of `mock-data.ts`!
// And the products are in the `PRODUCTS` array.
// I will just read the file and replace the `url: ''` with the correct `url` based on the old `images` array or user provided list.

const imageMapping = [
  { term: 'Variant M', url: 'https://i.ibb.co/95XjMJG/Roll-Line-Variant-M.png' },
  { term: 'Variant C', url: 'https://i.ibb.co/mrg0h3s0/Roll-Line-Variant-C.png' },
  { term: 'Variant f', url: 'https://i.ibb.co/1t9dF7fT/Roll-Line-Variant-f.png' },
  { term: 'Spin', url: 'https://i.ibb.co/4Z5W8g4G/Roll-Line-Spin.png' },
  { term: 'Saturno', url: 'https://i.ibb.co/nq9g9Td7/Roll-Line-Saturno.png' },
  { term: 'Magnum', url: 'https://i.ibb.co/jvMxyczh/Roll-Line-ruedas-magnum.png' },
  { term: 'Helium', url: 'https://i.ibb.co/SDTQ8ZBB/Roll-Line-ruedas-helium.png' },
  { term: 'Giotto', url: 'https://i.ibb.co/k51S22Kx/Roll-Line-ruedas-giotto.png' },
  { term: 'Boxer', url: 'https://i.ibb.co/7NSXMRkk/Roll-Line-ruedas-boxer.png' },
  { term: 'Mistral', url: 'https://i.ibb.co/vCcLCJzm/Roll-Line-Mistral-2.png' },
  { term: 'Mirage', url: 'https://i.ibb.co/LdKwnRPZ/Roll-Line-Mirage.png' },
  { term: 'Matrix', url: 'https://i.ibb.co/JWZ7ZvF6/Roll-Line-Matrix.png' },
  { term: 'Evo', url: 'https://i.ibb.co/YTw3VGP8/Roll-Line-Evo.png' },
  { term: 'Energy', url: 'https://i.ibb.co/d4VhV7bb/Dance-prime.png' }, // wait, energy has no ibb link?
  { term: 'Dance', url: 'https://i.ibb.co/d4VhV7bb/Dance-prime.png' },
  { term: 'Bolso', url: 'https://i.ibb.co/8gcN7Lc1/Bolso-Edea-always-with-me.png' },
];

for (const map of imageMapping) {
  // Replace empty urls in lines that have the product_id of products with this name...
  // Since images and products are separated, this is tricky to do safely via regex.
  // Instead, I'll just write a JS script that `eval`s or parses the exported arrays, updates them, and writes them back.
}
