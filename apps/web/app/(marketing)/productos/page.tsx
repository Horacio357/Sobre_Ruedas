import React from 'react';
import { PRODUCTS, CATEGORIES } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '@/components/catalog/ProductGrid';
import FilterSidebar from '@/components/catalog/FilterSidebar';

export default function ProductosPage() {
  // Para la página principal, mostraremos los destacados primero
  const featuredProducts = PRODUCTS.filter(p => p.is_featured && p.skate_type !== 'hielo');
  
  // Productos de ruedas o compartidos
  const rollerProducts = PRODUCTS.filter(p => p.skate_type !== 'hielo');

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-32 pb-40">
      <div className="container-apple">
        
        {/* Encabezado */}
        <div className="mb-20 md:mb-32">
          <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter text-[#1C1612] mb-6 leading-[0.9]">
            Ruedas.
          </h1>
          <p className="text-lg md:text-2xl text-[#1C1612]/50 font-medium max-w-2xl">
            Explora nuestra selección completa de botas, planchas, ruedas y accesorios de nivel profesional.
          </p>
        </div>

        {/* Filtros / Categorías Rápidas */}
        <div className="flex flex-wrap gap-4 mb-20">
          <Link href="/productos" className="px-6 py-3 rounded-full bg-[#1C1612] text-white text-[11px] font-black uppercase tracking-widest shadow-lg">
            Todos
          </Link>
          {CATEGORIES.map(cat => (
            <Link 
              key={cat.id} 
              href={`/productos/${cat.id}s`} 
              className="px-6 py-3 rounded-full bg-white border border-[#EAE3D9] text-[#1C1612] text-[11px] font-black uppercase tracking-widest hover:border-[#1C1612] transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Destacados */}
        {featuredProducts.length > 0 && (
          <div className="mb-32">
            <h2 className="text-2xl font-black tracking-tight text-[#1C1612] mb-12 flex items-center gap-4">
              Destacados <ArrowRight className="text-[#D97230]" />
            </h2>
            <ProductGrid products={featuredProducts} />
          </div>
        )}

        {/* Todos los Productos */}
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#1C1612] mb-12 flex items-center gap-4">
            Explorar Todo <ArrowRight className="text-[#D97230]" />
          </h2>
          <ProductGrid products={rollerProducts} />
        </div>

      </div>
    </main>
  );
}
