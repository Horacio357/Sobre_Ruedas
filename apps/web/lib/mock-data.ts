// ============================================================
// SOBRE RUEDAS — Mock Data
// Datos para el catálogo (Fase 3)
// ============================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'bota' | 'plancha' | 'rueda' | 'combo';
  level: 'iniciacion' | 'intermedio' | 'avanzado' | 'alto_rendimiento';
  price: number;
  comparePrice?: number;
  description: string;
  shortDesc: string;
  images: string[];
  isFeatured?: boolean;
  isOutlet?: boolean;
  badge?: string;
  badgeType?: 'new' | 'discount' | 'bestseller' | 'accent';
  discipline?: ('libre' | 'danza' | 'figuras' | 'saltos')[];
  floorType?: 'liso' | 'rugoso' | 'mixto';
  specs?: {
    label: string;
    value: number;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Edea Concerto',
    slug: 'edea-concerto',
    brand: 'Edea',
    category: 'bota',
    level: 'alto_rendimiento',
    price: 380000,
    description: 'La bota Concerto ha sido diseñada para el patinaje de alto nivel. Su estructura rígida proporciona el soporte necesario para saltos triples y cuádruples, manteniendo una ligereza excepcional gracias a sus materiales de vanguardia.',
    shortDesc: 'Soporte supremo para alta competición y saltos complejos.',
    images: ['https://i.ibb.co/N27h4kN3/96-7.jpg', 'https://i.ibb.co/3yGbSNHB/96-6.jpg'],
    isFeatured: true,
    badge: 'Elite',
    badgeType: 'accent',
    discipline: ['libre', 'saltos'],
    specs: [
      { label: 'Rigidez', value: 95 },
      { label: 'Peso', value: 80 },
      { label: 'Acolchado', value: 70 },
      { label: 'Control', value: 98 },
      { label: 'Salto', value: 95 },
    ],
  },
  {
    id: 'p2',
    name: 'Edea Chorus',
    slug: 'edea-chorus',
    brand: 'Edea',
    category: 'bota',
    level: 'avanzado',
    price: 245000,
    description: 'La bota Chorus es el paso ideal para patinadores que están perfeccionando sus saltos dobles. Combina elegancia con una rigidez intermedia que permite una gran libertad de movimiento sin sacrificar el soporte del tobillo.',
    shortDesc: 'Equilibrio perfecto entre flexibilidad y soporte avanzado.',
    images: ['https://i.ibb.co/tpCCVKXb/95-7.jpg', 'https://i.ibb.co/rRWY511b/95-6.jpg'],
    badge: 'Más vendido',
    badgeType: 'bestseller',
    discipline: ['libre', 'danza'],
    specs: [
      { label: 'Rigidez', value: 70 },
      { label: 'Peso', value: 90 },
      { label: 'Acolchado', value: 85 },
      { label: 'Control', value: 85 },
      { label: 'Confort', value: 90 },
    ],
  },
  {
    id: 'p3',
    name: 'Risport RF3 Pro',
    slug: 'risport-rf3-pro',
    brand: 'Risport',
    category: 'bota',
    level: 'intermedio',
    price: 195000,
    description: 'Diseñada para patinadores que buscan un rendimiento profesional en un paquete cómodo. La RF3 Pro es una leyenda en la pista, conocida por su durabilidad y su ajuste anatómico superior.',
    shortDesc: 'Tradición y tecnología para el patinador en ascenso.',
    images: ['https://i.ibb.co/xtjGfZQX/93-7.jpg'],
    discipline: ['libre', 'figuras'],
    specs: [
      { label: 'Rigidez', value: 60 },
      { label: 'Peso', value: 75 },
      { label: 'Acolchado', value: 95 },
      { label: 'Control', value: 80 },
      { label: 'Tradición', value: 90 },
    ],
  },
  {
    id: 'p4',
    name: 'Combo Iniciación Profesional',
    slug: 'combo-iniciacion',
    brand: 'Sobre Ruedas',
    category: 'combo',
    level: 'iniciacion',
    price: 135000,
    comparePrice: 165000,
    description: 'Todo lo que necesitas para empezar con el pie derecho. Incluye bota de cuero reforzado, plancha de aluminio liviano y ruedas de dureza media aptas para todo tipo de superficies.',
    shortDesc: 'Set completo: Bota + Plancha + Ruedas + Rodamientos.',
    images: ['https://i.ibb.co/rRLNkNQd/96-1.jpg'],
    badge: '20% OFF',
    badgeType: 'discount',
    discipline: ['libre'],
  },
  {
    id: 'p5',
    name: 'Roll-Line Giotto',
    slug: 'roll-line-giotto',
    brand: 'Roll-Line',
    category: 'plancha',
    level: 'alto_rendimiento',
    price: 155000,
    description: 'La plancha Giotto es la elección de los campeones mundiales de figuras. Su precisión milimétrica y su construcción en aleación de aluminio de grado aeronáutico la hacen insuperable.',
    shortDesc: 'Precisión absoluta para la disciplina de figuras.',
    images: ['https://i.ibb.co/wNWB1hsW/93-1.jpg'],
    discipline: ['figuras'],
    specs: [
      { label: 'Estabilidad', value: 98 },
      { label: 'Agilidad', value: 70 },
      { label: 'Peso', value: 75 },
      { label: 'Respuesta', value: 95 },
      { label: 'Precisión', value: 100 },
    ],
  },
  {
    id: 'p6',
    name: 'Ruedas Komplex Angel',
    slug: 'komplex-angel',
    brand: 'Komplex',
    category: 'rueda',
    level: 'avanzado',
    price: 45000,
    description: 'Ruedas profesionales con núcleo de elastómero que proporcionan un agarre excepcional en superficies resbaladizas sin comprometer la velocidad.',
    shortDesc: 'Set de 8 ruedas profesionales de alta densidad.',
    images: ['https://i.ibb.co/PvQvS3TF/95-1.jpg'],
    badge: 'Nuevo',
    badgeType: 'new',
    discipline: ['libre', 'danza'],
    floorType: 'liso',
    specs: [
      { label: 'Agarre', value: 85 },
      { label: 'Velocidad', value: 90 },
      { label: 'Deslize', value: 75 },
      { label: 'Durabilidad', value: 80 },
      { label: 'Rebote', value: 88 },
    ],
  },
  {
    id: 'p6_2',
    name: 'Ruedas Roll-Line Magnum',
    slug: 'roll-line-magnum',
    brand: 'Roll-Line',
    category: 'rueda',
    level: 'intermedio',
    price: 40000,
    description: 'Perfectas para superficies rugosas y asfalto.',
    shortDesc: 'Set de 8 ruedas para piso rugoso.',
    images: ['https://i.ibb.co/PvQvS3TF/95-1.jpg'],
    floorType: 'rugoso',
  },
  {
    id: 'p6_3',
    name: 'Ruedas Edea Fox',
    slug: 'edea-fox',
    brand: 'Edea',
    category: 'rueda',
    level: 'avanzado',
    price: 42000,
    description: 'Equilibrio perfecto para quienes cambian de pista frecuentemente.',
    shortDesc: 'Set de 8 ruedas mixtas.',
    images: ['https://i.ibb.co/PvQvS3TF/95-1.jpg'],
    floorType: 'mixto',
  },
  {
    id: 'p7',
    name: 'Masterclass: Saltos Dobles',
    slug: 'masterclass-saltos-dobles',
    brand: 'Sobre Ruedas Academy',
    category: 'curso',
    level: 'intermedio',
    price: 45000,
    description: 'Curso online completo con 10 módulos en video para perfeccionar la técnica de tus saltos dobles. Incluye análisis biomecánico y rutinas fuera de pista.',
    shortDesc: 'Curso online: Técnica y biomecánica de saltos dobles.',
    images: ['https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2070&auto=format&fit=crop'],
    badge: 'Digital',
    badgeType: 'new',
    discipline: ['libre', 'saltos'],
  }
];

export const BRANDS = ['Edea', 'Risport', 'Roll-Line', 'Komplex', 'Jackson', 'Sobre Ruedas', 'Sobre Ruedas Academy'];
export const CATEGORIES = [
  { id: 'bota', label: 'Botas' },
  { id: 'plancha', label: 'Planchas' },
  { id: 'rueda', label: 'Ruedas' },
  { id: 'combo', label: 'Combos' },
  { id: 'curso', label: 'Cursos' },
];
export const LEVELS = [
  { id: 'iniciacion', label: 'Iniciación' },
  { id: 'intermedio', label: 'Intermedio' },
  { id: 'avanzado', label: 'Avanzado' },
  { id: 'alto_rendimiento', label: 'Alto Rendimiento' },
];
