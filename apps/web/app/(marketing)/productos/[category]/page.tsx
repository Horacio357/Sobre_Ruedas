import React from 'react';
import { PRODUCTS, CATEGORIES } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductGrid from '@/components/catalog/ProductGrid';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  // Las categorías vienen en plural desde la URL ej: 'botas', 'planchas'
  // Buscamos si existe la categoría (quitando la 's' final de forma simple, en la vida real sería más robusto)
  let catId = resolvedParams.category.endsWith('s') ? resolvedParams.category.slice(0, -1) : resolvedParams.category;
  if (resolvedParams.category === 'rulemanes') catId = 'ruleman';
  
  const categoryInfo = CATEGORIES.find(c => c.id === catId);
  
  if (!categoryInfo && resolvedParams.category !== 'accesorios') {
    // Casos especiales (ej. accesorios)
    if (resolvedParams.category !== 'accesorios') {
      return notFound();
    }
  }

  // Filtrar productos
  const categoryProducts = PRODUCTS.filter(p => {
    // Excluir productos exclusivos de hielo
    if (p.skate_type === 'hielo') return false;

    if (resolvedParams.category === 'accesorios' || resolvedParams.category === 'bolsos' || catId === 'accesorio' || catId === 'bolso') {
      return p.component_type === 'accesorio';
    }
    return p.component_type === catId;
  });

  const categoryName = categoryInfo ? categoryInfo.label : ((resolvedParams.category === 'accesorios' || resolvedParams.category === 'bolsos') ? 'Bolsos y Accesorios' : resolvedParams.category);

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-32 pb-40">
      <div className="container-apple">
        
        {/* Encabezado */}
        <div className="mb-20 md:mb-32">
          <Link href="/productos" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#D97230] mb-8 hover:opacity-70 transition-opacity">
            <ArrowRight className="rotate-180" size={14} /> Volver a Todos los Productos
          </Link>
          <h1 className="text-5xl md:text-[5rem] font-black tracking-tighter text-[#1C1612] mb-6 leading-none capitalize">
            {categoryName}.
          </h1>
          <p className="text-lg md:text-2xl text-[#1C1612]/50 font-medium max-w-2xl">
            Descubre nuestra selección exclusiva de {categoryName.toLowerCase()} para llevar tu patinaje al siguiente nivel.
          </p>
        </div>

        {/* Filtros / Categorías Rápidas */}
        <div className="flex flex-wrap gap-4 mb-20">
          <Link href="/productos" className="px-6 py-3 rounded-full bg-white border border-[#EAE3D9] text-[#1C1612] text-[11px] font-black uppercase tracking-widest hover:border-[#1C1612] transition-colors">
            Todos
          </Link>
          {CATEGORIES.map(cat => {
            const isCurrent = cat.id === catId || (cat.id === 'accesorio' && (resolvedParams.category === 'accesorios' || resolvedParams.category === 'bolsos'));
            return (
              <Link 
                key={cat.id} 
                href={cat.id === 'accesorio' ? `/productos/accesorios` : `/productos/${cat.id}s`} 
                className={`px-6 py-3 rounded-full border text-[11px] font-black uppercase tracking-widest transition-colors ${
                  isCurrent 
                    ? 'bg-[#1C1612] text-white border-[#1C1612] shadow-lg' 
                    : 'bg-white border-[#EAE3D9] text-[#1C1612] hover:border-[#1C1612]'
                }`}
              >
                {cat.label}
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
