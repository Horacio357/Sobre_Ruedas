const fs = require('fs');
const path = require('path');

const inputHTML = `
<img src="https://i.ibb.co/20FQHH7J/Roll-Line-Variant-M-2.png" alt="Roll Line Variant M (2)" border="0">
<img src="https://i.ibb.co/k6kfzjSg/Roll-Line-Variant-M-1.png" alt="Roll Line Variant M (1)" border="0">
<img src="https://i.ibb.co/95XjMJG/Roll-Line-Variant-M.png" alt="Roll Line Variant M" border="0">
<img src="https://i.ibb.co/5hTWwVt2/Roll-Line-Variant-f-1.png" alt="Roll Line Variant f (1)" border="0">
<img src="https://i.ibb.co/1t9dF7fT/Roll-Line-Variant-f.png" alt="Roll Line Variant f" border="0">
<img src="https://i.ibb.co/7xHB2Spv/Roll-Line-Variant-C-2.png" alt="Roll Line Variant C (2)" border="0">
<img src="https://i.ibb.co/9mcwRw0x/Roll-Line-Variant-C-1.png" alt="Roll Line Variant C (1)" border="0">
<img src="https://i.ibb.co/mrg0h3s0/Roll-Line-Variant-C.png" alt="Roll Line Variant C" border="0">
<img src="https://i.ibb.co/kVDNXT7Z/Roll-Line-Spin-2.png" alt="Roll Line Spin (2)" border="0">
<img src="https://i.ibb.co/6RPrdvS5/Roll-Line-Spin-1.png" alt="Roll Line Spin (1)" border="0">
<img src="https://i.ibb.co/Y7qbvG2v/Roll-Line-Spin.png" alt="Roll Line Spin" border="0">
<img src="https://i.ibb.co/Y4NBJpvL/Roll-Line-Saturno.png" alt="Roll Line Saturno" border="0">
<img src="https://i.ibb.co/nq9g9Td7/Roll-Line-Saturno.png" alt="Roll Line Saturno" border="0">
<img src="https://i.ibb.co/HMs8SvT/Roll-Line-ruedas-magnum-4.png" alt="Roll Line ruedas magnum (4)" border="0">
<img src="https://i.ibb.co/qL6cCZXX/Roll-Line-ruedas-magnum-3.png" alt="Roll Line ruedas magnum (3)" border="0">
<img src="https://i.ibb.co/bjVtkfBr/Roll-Line-ruedas-magnum-2.png" alt="Roll Line ruedas magnum (2)" border="0">
<img src="https://i.ibb.co/B5Jvgkrp/Roll-Line-ruedas-magnum-1.png" alt="Roll Line ruedas magnum (1)" border="0">
<img src="https://i.ibb.co/jvMxyczh/Roll-Line-ruedas-magnum.png" alt="Roll Line ruedas magnum" border="0">
<img src="https://i.ibb.co/1Jtv6ptc/Roll-Line-ruedas-helium-1.png" alt="Roll Line ruedas helium (1)" border="0">
<img src="https://i.ibb.co/SDTQ8ZBB/Roll-Line-ruedas-helium.png" alt="Roll Line ruedas helium" border="0">
<img src="https://i.ibb.co/21cx1KRz/Roll-Line-ruedas-giotto-2.png" alt="Roll Line ruedas giotto (2)" border="0">
<img src="https://i.ibb.co/MyV1qWJR/Roll-Line-ruedas-giotto-1.png" alt="Roll Line ruedas giotto (1)" border="0">
<img src="https://i.ibb.co/27x4zKRP/Roll-Line-ruedas-giotto.png" alt="Roll Line ruedas giotto" border="0">
<img src="https://i.ibb.co/tPhmhZQy/Roll-Line-ruedas-boxer-2.png" alt="Roll Line ruedas boxer (2)" border="0">
<img src="https://i.ibb.co/twkfFR0L/Roll-Line-ruedas-boxer-1.png" alt="Roll Line ruedas boxer (1)" border="0">
<img src="https://i.ibb.co/7NSXMRkk/Roll-Line-ruedas-boxer.png" alt="Roll Line ruedas boxer" border="0">
<img src="https://i.ibb.co/vCcLCJzm/Roll-Line-Mistral-2.png" alt="Roll Line Mistral (2)" border="0">
<img src="https://i.ibb.co/LdKwnRPZ/Roll-Line-Mirage.png" alt="Roll Line Mirage" border="0">
<img src="https://i.ibb.co/YBjYgtjb/Roll-Line-Mirage.png" alt="Roll Line Mirage" border="0">
<img src="https://i.ibb.co/JWZ7ZvF6/Roll-Line-Matrix.png" alt="Roll Line Matrix" border="0">
<img src="https://i.ibb.co/7JyhBPwM/Roll-Line-Matrix-1.png" alt="Roll Line Matrix (1)" border="0">
<img src="https://i.ibb.co/S4fM9kns/Roll-Line-Matrix.png" alt="Roll Line Matrix" border="0">
<img src="https://i.ibb.co/MkKdRKW4/Roll-Line-giotto-1.png" alt="Roll Line giotto (1)" border="0">
<img src="https://i.ibb.co/wNm85s07/Roll-Line-giotto.png" alt="Roll Line giotto" border="0">
<img src="https://i.ibb.co/B515yXm1/Roll-Line-frenos-rosas.png" alt="Roll Line frenos rosas" border="0">
<img src="https://i.ibb.co/KjhD9tg0/Roll-Line-frenos-grises.png" alt="Roll Line frenos grises" border="0">
<img src="https://i.ibb.co/GQXrTqM5/Roll-Line-Evo-1.png" alt="Roll Line Evo (1)" border="0">
<img src="https://i.ibb.co/YTw3VGP8/Roll-Line-Evo.png" alt="Roll Line Evo" border="0">
<img src="https://i.ibb.co/8g4WfdjR/Roll-Line-Evo.png" alt="Roll Line Evo" border="0">
<img src="https://i.ibb.co/k6JJfjmn/Roll-Line-dance-2.png" alt="Roll Line dance (2)" border="0">
<img src="https://i.ibb.co/32Xp12P/Roll-Line-dance-1.png" alt="Roll Line dance (1)" border="0">
<img src="https://i.ibb.co/KpQ2QW3f/Roll-Line-dance.png" alt="Roll Line dance" border="0">
<img src="https://i.ibb.co/PGVp2Q8C/Roll-Line-blaster-1.png" alt="Roll Line blaster (1)" border="0">
<img src="https://i.ibb.co/pBDq0vdg/Roll-Line-blaster.png" alt="Roll Line blaster" border="0">
<img src="https://i.ibb.co/5xFRWWqw/Roll-Line-Avile.png" alt="Roll Line Avile" border="0">
<img src="https://i.ibb.co/Ld0FZxhC/Roll-Line-agile.png" alt="Roll Line agile" border="0">
<img src="https://i.ibb.co/V07WxZt1/Roll-Line-agile.png" alt="Roll Line agile" border="0">
<img src="https://i.ibb.co/84tmmn28/Risport-Venus.png" alt="Risport Venus" border="0">
<img src="https://i.ibb.co/Z4rXynv/Risport-Royal-pro.png" alt="Risport Royal pro" border="0">
<img src="https://i.ibb.co/NQHrh87/Risport-RF1-elite-1.png" alt="Risport RF1 elite (1)" border="0">
<img src="https://i.ibb.co/5g5VM78m/Risport-Gemma.png" alt="Risport Gemma" border="0">
<img src="https://i.ibb.co/4wh55MjV/Risport-gemma.png" alt="Risport gemma" border="0">
<img src="https://i.ibb.co/d4VhV7bb/Dance-prime.png" alt="Dance prime" border="0">
<img src="https://i.ibb.co/WvtzdycW/Risport-antares.png" alt="Risport antares" border="0">
<img src="https://i.ibb.co/M5nrdD57/Risport-Ambra.png" alt="Risport Ambra" border="0">
<img src="https://i.ibb.co/v62XwXnT/Magic-Eraser-260526-160524.png" alt="Magic Eraser 260526 160524" border="0">
<img src="https://i.ibb.co/SwNbdXCN/Magic-Eraser-260526-160355.png" alt="Magic Eraser 260526 160355" border="0">
<img src="https://i.ibb.co/JRmtZBYd/Magic-Eraser-260526-155332.png" alt="Magic Eraser 260526 155332" border="0">
<img src="https://i.ibb.co/39rnGdV7/Magic-Eraser-260526-155309.png" alt="Magic Eraser 260526 155309" border="0">
<img src="https://i.ibb.co/JwjdLSJ7/Magic-Eraser-260526-155252.png" alt="Magic Eraser 260526 155252" border="0">
<img src="https://i.ibb.co/vxr81s5f/Magic-Eraser-260526-155236.png" alt="Magic Eraser 260526 155236" border="0">
<img src="https://i.ibb.co/C54Scqzr/Magic-Eraser-260526-155217.png" alt="Magic Eraser 260526 155217" border="0">
<img src="https://i.ibb.co/XZM3gCBV/Magic-Eraser-260526-155150.png" alt="Magic Eraser 260526 155150" border="0">
<img src="https://i.ibb.co/PsDnrQJn/Magic-Eraser-260526-151943.png" alt="Magic Eraser 260526 151943" border="0">
<img src="https://i.ibb.co/wFHxdLNN/Magic-Eraser-260526-151710.png" alt="Magic Eraser 260526 151710" border="0">
<img src="https://i.ibb.co/Hf0BJyQ5/Magic-Eraser-260526-151540.png" alt="Magic Eraser 260526 151540" border="0">
`;

// Regex to extract src and alt
const regex = /<img src="([^"]+)" alt="([^"]+)"/g;
let match;
const products = [];

// Group items by base name to put multiple images in one product
const grouped = {};

while ((match = regex.exec(inputHTML)) !== null) {
  let url = match[1];
  let alt = match[2];
  
  // ignore magic eraser for now or add them as random accessories
  if (alt.includes("Magic Eraser")) {
    alt = "Accesorio SR Patín"; // default name
  }

  // extract base name by removing trailing " (1)", " (2)"
  let baseName = alt.replace(/\s\(\d+\)$/, '').trim();
  
  // normalize uppercase
  baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
  
  if (!grouped[baseName]) {
    grouped[baseName] = [];
  }
  grouped[baseName].push(url);
}

const mockDataPath = path.join(__dirname, 'apps', 'web', 'lib', 'mock-data.ts');
let mockData = fs.readFileSync(mockDataPath, 'utf8');

let newEntries = "";
let idCounter = 900;

for (const [name, urls] of Object.entries(grouped)) {
  // Check if product already exists (loosely)
  if (mockData.includes(name) && name !== "Accesorio SR Patín") {
    console.log("Skipping (already exists): " + name);
    continue;
  }
  
  idCounter++;
  const prodId = 'new_prod_' + idCounter;
  
  // Determine component_type
  let type = "accesorio";
  let brand = "Genérico";
  
  if (name.toLowerCase().includes("risport") || name.toLowerCase().includes("dance prime")) {
    type = "bota";
    brand = "Risport";
  } else if (name.toLowerCase().includes("roll line")) {
    if (name.toLowerCase().includes("rueda")) type = "rueda";
    else if (name.toLowerCase().includes("freno")) type = "accesorio";
    else type = "plancha";
    brand = "Roll Line";
  } else if (name.toLowerCase().includes("bolso") || name.toLowerCase().includes("edea")) {
    type = "bolso";
    brand = "Edea";
  }
  
  const imagesArray = urls.map((u, idx) => {
    return "{ id: 'img_" + prodId + "_" + idx + "', product_id: '" + prodId + "', url: '" + u + "', sort_order: " + idx + ", is_primary: " + (idx === 0) + " }";
  }).join(",\n      ");
  
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const entry = "  {\n" +
"    id: '" + prodId + "',\n" +
"    name: '" + name + "',\n" +
"    slug: '" + slug + "-" + idCounter + "',\n" +
"    brand_name: '" + brand + "',\n" +
"    component_type: '" + type + "',\n" +
"    price_ars: " + Math.floor(Math.random() * (250000 - 50000 + 1) + 50000) + ",\n" +
"    description: 'Descripción para " + name + ". Producto de excelente calidad.',\n" +
"    short_desc: 'Calidad superior y rendimiento óptimo.',\n" +
"    images: [\n      " + imagesArray + "\n    ],\n" +
"    is_featured: false,\n" +
"    is_active: true,\n" +
"    is_outlet: false,\n" +
"    stock: 10,\n" +
"    created_at: new Date().toISOString()\n" +
"  },";
  
  newEntries += entry + "\n";
  console.log("Added: " + name);
}

// insert before the closing bracket of export const PRODUCTS
const insertIndex = mockData.lastIndexOf('];');
if (insertIndex !== -1 && newEntries.length > 0) {
  mockData = mockData.slice(0, insertIndex) + newEntries + "\n" + mockData.slice(insertIndex);
  fs.writeFileSync(mockDataPath, mockData, 'utf8');
  console.log("Successfully injected products!");
} else {
  console.log("No new products added.");
}
