const fs = require('fs');

// 1. Fix productos/[category]/page.tsx
const pCategoryPath = 'apps/web/app/(marketing)/productos/[category]/page.tsx';
let pCategoryContent = fs.readFileSync(pCategoryPath, 'utf8');
pCategoryContent = pCategoryContent.replace(
  'export default function CategoryPage({ params }: Props) {',
  'export default async function CategoryPage({ params }: Props) {\n  const resolvedParams = await params;'
).replaceAll('params.category', 'resolvedParams.category');

// Fix 'bolsos' logic
pCategoryContent = pCategoryContent.replace(
  "if (resolvedParams.category === 'accesorios' || catId === 'accesorio') {",
  "if (resolvedParams.category === 'accesorios' || resolvedParams.category === 'bolsos' || catId === 'accesorio' || catId === 'bolso') {"
);
pCategoryContent = pCategoryContent.replace(
  "resolvedParams.category === 'accesorios' ? 'Bolsos y Accesorios' : resolvedParams.category",
  "(resolvedParams.category === 'accesorios' || resolvedParams.category === 'bolsos') ? 'Bolsos y Accesorios' : resolvedParams.category"
);
pCategoryContent = pCategoryContent.replace(
  "(cat.id === 'accesorio' && resolvedParams.category === 'accesorios')",
  "(cat.id === 'accesorio' && (resolvedParams.category === 'accesorios' || resolvedParams.category === 'bolsos'))"
);

fs.writeFileSync(pCategoryPath, pCategoryContent, 'utf8');

// 2. Fix hielo/[category]/page.tsx
const hCategoryPath = 'apps/web/app/(marketing)/hielo/[category]/page.tsx';
let hCategoryContent = fs.readFileSync(hCategoryPath, 'utf8');
hCategoryContent = hCategoryContent.replace(
  'export default function HieloCategoryPage({ params }: Props) {',
  'export default async function HieloCategoryPage({ params }: Props) {\n  const resolvedParams = await params;'
).replaceAll('params.category', 'resolvedParams.category');

fs.writeFileSync(hCategoryPath, hCategoryContent, 'utf8');

// 3. Fix patines/[slug]/page.tsx
const slugPath = 'apps/web/app/(marketing)/patines/[slug]/page.tsx';
let slugContent = fs.readFileSync(slugPath, 'utf8');
slugContent = slugContent.replace(
  'export default function ProductPage({ params }: Props) {',
  'export default async function ProductPage({ params }: Props) {\n  const resolvedParams = await params;'
).replaceAll('params.slug', 'resolvedParams.slug');
fs.writeFileSync(slugPath, slugContent, 'utf8');

console.log('Pages fixed!');
