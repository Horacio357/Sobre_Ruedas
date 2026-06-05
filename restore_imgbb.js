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
<img src="https://i.ibb.co/jsm3xFz/Magic-Eraser-260526-151301-1.png" alt="Magic Eraser 260526 151301-1" border="0">
<img src="https://i.ibb.co/ZprqWBGs/Magic-Eraser-260526-151235.png" alt="Magic Eraser 260526 151235" border="0">
<img src="https://i.ibb.co/Z6rSvcB0/Magic-Eraser-260526-151218.png" alt="Magic Eraser 260526 151218" border="0">
<img src="https://i.ibb.co/C3M3DZ25/Magic-Eraser-260526-151204.png" alt="Magic Eraser 260526 151204" border="0">
<img src="https://i.ibb.co/cKRFtfnD/Magic-Eraser-260526-151135.png" alt="Magic Eraser 260526 151135" border="0">
<img src="https://i.ibb.co/HDGYg4Yw/Magic-Eraser-260526-151119-1.png" alt="Magic Eraser 260526 151119-1" border="0">
<img src="https://i.ibb.co/S4phhGjZ/Bolso-Edea-always-with-me-2.png" alt="Bolso Edea always with me (2)" border="0">
<img src="https://i.ibb.co/sv4GnzwL/Bolso-Edea-always-with-me-1.png" alt="Bolso Edea always with me (1)" border="0">
<img src="https://i.ibb.co/8gcN7Lc1/Bolso-Edea-always-with-me.png" alt="Bolso Edea always with me" border="0">
`;

// Extract map
const regex = /<img src="([^"]+)" alt="([^"]+)"/g;
let match;
const imgMap = {};

while ((match = regex.exec(inputHTML)) !== null) {
  let url = match[1];
  let alt = match[2];
  
  let baseName = alt.replace(/\s\(\d+\)$/, '').trim();
  baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1);
  
  // Specific mappings for the ones in the screenshot
  if (baseName.includes("Magic Eraser")) {
    // I don't know which magic eraser corresponds to which accessory, so I'll just map them manually
  } else {
    imgMap[baseName.toLowerCase()] = url;
  }
}

// Manual mappings based on what I see in the prompt
imgMap["bolso edea always with me"] = "https://i.ibb.co/8gcN7Lc1/Bolso-Edea-always-with-me.png";
imgMap["bolso edea always with me (gris)"] = "https://i.ibb.co/sv4GnzwL/Bolso-Edea-always-with-me-1.png";
imgMap["bolso edea always with me (azul)"] = "https://i.ibb.co/S4phhGjZ/Bolso-Edea-always-with-me-2.png";
imgMap["rulemanes de acero abec 7"] = "https://i.ibb.co/C54Scqzr/Magic-Eraser-260526-155217.png";
imgMap["funda protectora edea"] = "https://i.ibb.co/XZM3gCBV/Magic-Eraser-260526-155150.png";
imgMap["cordones profesionales"] = "https://i.ibb.co/PsDnrQJn/Magic-Eraser-260526-151943.png";
imgMap["toalla deportiva microfibra"] = "https://i.ibb.co/wFHxdLNN/Magic-Eraser-260526-151710.png";
imgMap["rulemanes de cerámica abec 9"] = "https://i.ibb.co/vxr81s5f/Magic-Eraser-260526-155236.png";
imgMap["kit de herramientas multiuso"] = "https://i.ibb.co/Hf0BJyQ5/Magic-Eraser-260526-151540.png";

// Let's modify mock-data.ts
const mockDataPath = path.join(__dirname, 'apps', 'web', 'lib', 'mock-data.ts');
let mockData = fs.readFileSync(mockDataPath, 'utf8');

const lines = mockData.split('\n');
let currentName = "";

for (let i = 0; i < lines.length; i++) {
    const nameMatch = lines[i].match(/name: '([^']+)'/);
    if (nameMatch) {
        currentName = nameMatch[1].toLowerCase();
    }
    
    if (lines[i].includes("images: [")) {
        // Look at the next few lines for the URL
        let urlLineIdx = -1;
        for (let j = i+1; j < i+5 && j < lines.length; j++) {
            if (lines[j].includes("url: '")) {
                urlLineIdx = j;
                break;
            }
        }
        
        if (urlLineIdx !== -1) {
            // Check if we have a mapped URL for currentName
            let matchKey = Object.keys(imgMap).find(k => currentName.includes(k) || k.includes(currentName));
            if (matchKey && imgMap[matchKey]) {
                lines[urlLineIdx] = lines[urlLineIdx].replace(/url: '[^']+'/, `url: '${imgMap[matchKey]}'`);
            } else if (lines[urlLineIdx].includes("bolso-magic1.png") || lines[urlLineIdx].includes("wheels-angel.png")) {
                // For other generated products, we already have their ImgBB links because add_new_products.js put them there, but fix_images.js overwrote them!
                // Wait! fix_images.js overwrote ALL of them!
                // Let's find the original ImgBB link from imgMap if possible
                let fallbackKey = Object.keys(imgMap).find(k => currentName.includes(k) || k.includes(currentName));
                if (fallbackKey) {
                    lines[urlLineIdx] = lines[urlLineIdx].replace(/url: '[^']+'/, `url: '${imgMap[fallbackKey]}'`);
                }
            }
        }
    }
}

fs.writeFileSync(mockDataPath, lines.join('\n'), 'utf8');
console.log("Restored ImgBB links based on mapping!");
