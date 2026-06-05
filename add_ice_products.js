const fs = require('fs');
const mockDataPath = './apps/web/lib/mock-data.ts';
let data = fs.readFileSync(mockDataPath, 'utf8');

const iceProducts = `
  {
    id: 'ice_1',
    name: 'Cuchilla John Wilson Pattern 99',
    slug: 'cuchilla-john-wilson-pattern-99',
    brand_name: 'John Wilson',
    component_type: 'cuchilla',
    skate_level: ['alto_rendimiento'],
    skate_type: 'hielo',
    price_ars: 550000,
    description: 'La cuchilla elegida por los campeones mundiales. Acero al carbono de la más alta calidad.',
    short_desc: 'Cuchilla de nivel elite para saltos triples y cuádruples.',
    images: [{ id: 'img_ice_1', product_id: 'ice_1', url: 'https://i.ibb.co/95XjMJG/Roll-Line-Variant-M.png', sort_order: 0, is_primary: true }], // placeholder
    is_active: true,
    is_featured: true,
    is_outlet: false,
    stock_quantity: 5,
    low_stock_threshold: 2,
    track_inventory: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ice_2',
    name: 'Cuchilla MK Professional',
    slug: 'cuchilla-mk-professional',
    brand_name: 'MK',
    component_type: 'cuchilla',
    skate_level: ['intermedio', 'avanzado'],
    skate_type: 'hielo',
    price_ars: 280000,
    description: 'La cuchilla más popular para patinadores en desarrollo. Excelente balance y control.',
    short_desc: 'Cuchilla ideal para saltos simples y dobles.',
    images: [{ id: 'img_ice_2', product_id: 'ice_2', url: 'https://i.ibb.co/95XjMJG/Roll-Line-Variant-M.png', sort_order: 0, is_primary: true }], // placeholder
    is_active: true,
    is_featured: false,
    is_outlet: false,
    stock_quantity: 8,
    low_stock_threshold: 3,
    track_inventory: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ice_3',
    name: 'Cuchilla Jackson Ultima Matrix',
    slug: 'cuchilla-jackson-ultima-matrix',
    brand_name: 'Jackson',
    component_type: 'cuchilla',
    skate_level: ['avanzado', 'alto_rendimiento'],
    skate_type: 'hielo',
    price_ars: 420000,
    description: 'Chasis de aluminio ligero con filo de acero inoxidable. 33% más liviana que las cuchillas tradicionales.',
    short_desc: 'Cuchilla ultraligera de rendimiento avanzado.',
    images: [{ id: 'img_ice_3', product_id: 'ice_3', url: 'https://i.ibb.co/95XjMJG/Roll-Line-Variant-M.png', sort_order: 0, is_primary: true }], // placeholder
    is_active: true,
    is_featured: false,
    is_outlet: false,
    stock_quantity: 4,
    low_stock_threshold: 1,
    track_inventory: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
`;

// Insert before the closing bracket of PRODUCTS array
const productsEndIndex = data.indexOf('];\n\nexport const BRANDS');
if (productsEndIndex !== -1) {
    data = data.slice(0, productsEndIndex) + iceProducts + data.slice(productsEndIndex);
    
    // Also add 'cuchilla' to CATEGORIES
    data = data.replace(
        "{ id: 'curso', label: 'Cursos' },", 
        "{ id: 'curso', label: 'Cursos' },\n  { id: 'cuchilla', label: 'Cuchillas' },"
    );
    
    // add MK and John Wilson to BRANDS if not present
    if (!data.includes("'MK'")) {
        data = data.replace(
            "'Jackson',",
            "'Jackson', 'MK', 'John Wilson',"
        );
    }
    
    fs.writeFileSync(mockDataPath, data);
    console.log('Ice products added successfully');
} else {
    console.log('Error: Could not find PRODUCTS array end');
}
