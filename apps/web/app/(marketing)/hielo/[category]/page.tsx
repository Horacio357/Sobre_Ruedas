import React from 'react';
import { PRODUCTS } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '@/components/catalog/ProductGrid';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    category: string;
  };
}

export default function HieloCategoryPage({ params }: Props) {
  let catId = params.category.endsWith('s') ? params.category.slice(0, -1) : params.category;
  if (params.category === 'accesorios') catId = 'accesorio';
  
  if (!['bota', 'cuchilla', 'accesorio'].includes(catId)) {
    return notFound();
  }

  const categoryProducts = PRODUCTS.filter(p => {
    // Es de hielo si explícitamente dice hielo, o si no tiene deporte definido y es bota o accesorio
    const isIce = p.skate_type === 'hielo' || !p.skate_type;
    return isIce && p.component_type === catId;
  });

  const categoryName = params.category;

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-32 pb-40">
      <div className="container-apple">
        
        {/* Encabezado */}
        <div className="mb-20 md:mb-32">
          <Link href="/hielo" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#D97230] mb-8 hover:opacity-70 transition-opacity">
            <ArrowRight className="rotate-180" size={14} /> Volver a todo Hielo
          </Link>
          <h1 className="text-5xl md:text-[5rem] font-black tracking-tighter text-[#1C1612] mb-6 leading-none capitalize">
            {categoryName}.
          </h1>
          <p className="text-lg md:text-2xl text-[#1C1612]/50 font-medium max-w-2xl">
            Descubre nuestra selección exclusiva de {categoryName.toLowerCase()} para hielo.
          </p>
        </div>

        {/* Filtros / Categorías Rápidas */}
        <div className="flex flex-wrap gap-4 mb-20">
          <Link href="/hielo" className="px-6 py-3 rounded-full bg-white border border-[#EAE3D9] text-[#1C1612] text-[11px] font-black uppercase tracking-widest hover:border-[#1C1612] transition-colors">
            Todos
          </Link>
          {['Botas', 'Cuchillas', 'Accesorios'].map(cat => {
            const catLower = cat.toLowerCase();
            const isCurrent = params.category === catLower;
            return (
              <Link 
                key={cat} 
                href={`/hielo/${catLower}`} 
                className={`px-6 py-3 rounded-full border text-[11px] font-black uppercase tracking-widest transition-colors ${
                  isCurrent 
                    ? 'bg-[#1C1612] text-white border-[#1C1612] shadow-lg' 
                    : 'bg-white border-[#EAE3D9] text-[#1C1612] hover:border-[#1C1612]'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {categoryProducts.length > 0 ? (
          <ProductGrid products={categoryProducts} />
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-medium text-[#1C1612] mb-4">No hay productos en esta categoría aún.</h3>
            <p className="text-[#1C1612]/60">Estamos actualizando nuestro catálogo.</p>
          </div>
        )}

      </div>
    </main>
  );
}
