const fs = require('fs');
const path = './apps/web/lib/mock-data.ts';

let data = fs.readFileSync(path, 'utf8');

// The new products have category_id but missing component_type
// Let's add component_type right after category_id
data = data.replace(/(category_id:\s*'planchas',)/g, "$1 component_type: 'plancha',");
data = data.replace(/(category_id:\s*'ruedas',)/g, "$1 component_type: 'rueda',");
data = data.replace(/(category_id:\s*'botas',)/g, "$1 component_type: 'bota',");

// The user said "controla que todas se vean".
// If old products are showing up with empty images, let's remove them from the configurator by removing their component_type, OR just let's assign a default placeholder to them if they have url: '' so they are at least VISIBLE as requested.
// Wait! If I just add `component_type` to the new products, BOTH the old and new products will show up in the configurator.
// The old products will be blank, the new products will have images.
// I should just assign the transparent images directly to the OLD products instead! That's much cleaner!

// Let's map transparent URLs to the old products using a simple regex replace based on the image ID.
// For example, product p5 (Giotto plate) has image id 'img5_1'
// I'll just restore the original mock-data.ts and do a clean URL replacement.
