import React from 'react';
import { PRODUCTS } from '@/lib/mock-data';
import Link from 'next/link';
import ProductGrid from '@/components/catalog/ProductGrid';

export default function HieloPage() {
  const iceProducts = PRODUCTS.filter(p => p.skate_type === 'hielo' || (p.component_type === 'bota' && !p.skate_type));

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-32 pb-40">
      <div className="container-apple">
        
        {/* Encabezado */}
        <div className="mb-20 md:mb-32">
          <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter text-[#1C1612] mb-6 leading-[0.9]">
            Hielo.
          </h1>
          <p className="text-xl md:text-2xl text-[#1C1612]/50 font-medium max-w-2xl">
            Descubre nuestra colección exclusiva para patinaje sobre hielo. Elegancia y precisión en cada movimiento.
          </p>
        </div>

        {/* Filtros / Categorías Rápidas */}
        <div className="flex flex-wrap gap-4 mb-20">
          <Link href="/hielo" className="px-6 py-3 rounded-full bg-[#1C1612] text-white text-[11px] font-black uppercase tracking-widest shadow-lg">
            Todos
          </Link>
          <Link href="/hielo/botas" className="px-6 py-3 rounded-full bg-white border border-[#EAE3D9] text-[#1C1612] text-[11px] font-black uppercase tracking-widest hover:border-[#1C1612] transition-colors">
            Botas
          </Link>
          <Link href="/hielo/cuchillas" className="px-6 py-3 rounded-full bg-white border border-[#EAE3D9] text-[#1C1612] text-[11px] font-black uppercase tracking-widest hover:border-[#1C1612] transition-colors">
            Cuchillas
          </Link>
          <Link href="/hielo/accesorios" className="px-6 py-3 rounded-full bg-white border border-[#EAE3D9] text-[#1C1612] text-[11px] font-black uppercase tracking-widest hover:border-[#1C1612] transition-colors">
            Accesorios
          </Link>
        </div>

        <ProductGrid products={iceProducts} />
      </div>
    </main>
  );
}
