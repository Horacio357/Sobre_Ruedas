const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'apps/web/components/layout/Footer.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements
content = content.replace(/bg-\[\#1C1612\]/g, 'bg-[#F9EAEA]');
content = content.replace(/text-\[\#B8A98E\]/g, 'text-[#1C1612]');
content = content.replace(/text-white/g, 'text-[#1C1612]');
content = content.replace(/text-\[\#9A8A72\]/g, 'text-[#B08B8B]');
content = content.replace(/text-\[\#6B5E4A\]/g, 'text-[#B08B8B]');
content = content.replace(/text-\[\#4A4235\]/g, 'text-[#D97230]');
content = content.replace(/border-white\/\[0\.06\]/g, 'border-[#1C1612]/10');
content = content.replace(/border-white\/\[0\.07\]/g, 'border-[#1C1612]/10');
content = content.replace(/border-white\/\[0\.10\]/g, 'border-[#1C1612]/20');
content = content.replace(/bg-white\/\[0\.07\]/g, 'bg-white/50');
content = content.replace(/bg-white\/\[0\.05\]/g, 'bg-white/50');
content = content.replace(/bg-white\/\[0\.03\]/g, 'bg-white/50');
content = content.replace(/bg-white\/\[0\.06\]/g, 'bg-white/80');
content = content.replace(/bg-white\/\[0\.10\]/g, 'bg-white');
content = content.replace(/hover:text-white/g, 'hover:text-[#D97230]');
content = content.replace(/variant="light"/g, 'variant="dark"');

fs.writeFileSync(filePath, content);
console.log('Footer colors updated');
