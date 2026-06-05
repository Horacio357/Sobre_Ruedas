const fs = require('fs');
const mockDataPath = './apps/web/lib/mock-data.ts';
let data = fs.readFileSync(mockDataPath, 'utf8');

// fix stock
data = data.replace(/stock: \d+,/g, 'stock_quantity: 10, low_stock_threshold: 2, track_inventory: true,');

// fix types
data = data.replace(/component_type: 'bolso'/g, "component_type: 'accesorio'");
data = data.replace(/component_type: 'ruleman'/g, "component_type: 'accesorio'");

// fix array closure
if (!data.includes('export const BRANDS')) {
  data = data.replace(/\];[\s\n]*$/, `];\n\nexport const BRANDS = ['Edea', 'Risport', 'Roll-Line', 'Komplex', 'Jackson', 'Sobre Ruedas', 'Sobre Ruedas Academy'];\nexport const CATEGORIES = [\n  { id: 'bota', label: 'Botas' },\n  { id: 'plancha', label: 'Planchas' },\n  { id: 'rueda', label: 'Ruedas' },\n  { id: 'accesorio', label: 'Bolsos y Accesorios' },\n  { id: 'combo', label: 'Combos' },\n  { id: 'curso', label: 'Cursos' },\n];\nexport const LEVELS = [\n  { id: 'iniciacion', label: 'Iniciación' },\n  { id: 'intermedio', label: 'Intermedio' },\n  { id: 'avanzado', label: 'Avanzado' },\n  { id: 'alto_rendimiento', label: 'Alto Rendimiento' },\n];\n`);
}

fs.writeFileSync(mockDataPath, data);
console.log('Fixed mock-data.ts');
