const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'apps', 'web', 'lib', 'mock-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// regex to find all images with i.ibb.co
// We'll replace them intelligently based on the alt/name or just the line context if possible, 
// but since we just have the url string in the regex, let's just use a general replacement for the URL part.
// Wait, to be smart, we can match the entire product block or just replace line by line based on the product.

const lines = content.split('\n');
let currentProduct = "";

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("name: '")) {
        currentProduct = lines[i].toLowerCase();
    }
    
    if (lines[i].includes("https://i.ibb.co/")) {
        let replacement = "/images/products/bolso-magic1.png"; // default
        
        if (currentProduct.includes("rueda") || currentProduct.includes("ruleman") || currentProduct.includes("abec")) {
            replacement = "/images/products/wheels-angel.png";
        } else if (currentProduct.includes("plancha") || currentProduct.includes("variant") || currentProduct.includes("mistral") || currentProduct.includes("roll-line")) {
            replacement = "/images/products/plate-energy.png";
        } else if (currentProduct.includes("bota") || currentProduct.includes("risport")) {
            replacement = "/images/products/dance-prime.png";
        } else if (currentProduct.includes("bolso") || currentProduct.includes("funda") || currentProduct.includes("toalla") || currentProduct.includes("herramienta")) {
            replacement = "/images/products/bolso-magic1.png";
        }

        // Replace the URL string
        lines[i] = lines[i].replace(/https:\/\/i\.ibb\.co\/[^']+/g, replacement);
    }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log("Fixed all ImgBB links in mock-data.ts!");
