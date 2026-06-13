'use client';

// ============================================================
// SOBRE RUEDAS — Detalle de Producto
// Diseño Apple-inspired: grandes espacios, tipografía elegante
// ============================================================

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/lib/mock-data';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { 
  ShoppingBag, 
  ChevronLeft, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCcw 
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const cart = useCartStore();
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-black mb-4">Producto no encontrado</h1>
          <Link href="/patines" className="btn-primary">Volver al catálogo</Link>
        </div>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-[#FFF9F9] pt-[116px]">
      <div className="container-apple py-8 md:py-16">
        {/* Breadcrumbs */}
        <Link 
          href="/patines" 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#B08B8B] hover:text-[#1C1612] transition-colors mb-12"
        >
          <ChevronLeft size={16} />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* Galería de Imágenes */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-[#FFF9F9] rounded-[40px] overflow-hidden flex items-center justify-center p-20 border border-[#F9EAEA] shadow-sm">
              <motion.img 
                layoutId={`img-${product.id}`}
                src={product.images?.[0]?.url || '/images/placeholder.png'} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const p = e.currentTarget.parentElement;
                  if (p) p.innerHTML = '<div class="text-9xl opacity-10">🛼</div>';
                }}
              />
            </div>
            {/* Thumbs (opcional) */}
            <div className="grid grid-cols-4 gap-6">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-square bg-[#FFF9F9] rounded-2xl border border-[#F9EAEA] opacity-40 hover:opacity-100 transition-opacity cursor-pointer shadow-sm" />
               ))}
            </div>
          </motion.div>

          {/* Información del Producto */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D97230] mb-3 block">
                {product.brand_name} — {product.skate_level?.[0]?.replace('_', ' ') ?? 'Intermedio'}
              </span>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extralight text-[#1C1612] tracking-tighter mb-4 leading-none">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex text-[#D97230]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm font-bold text-[#6B5E4A]">(48 reseñas)</span>
              </div>
            </div>

            <p className="text-xl font-light text-[#B08B8B] leading-relaxed mb-14 opacity-90 max-w-2xl">
              {product.description}
            </p>

            <div className="mb-16">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-extralight text-[#1C1612] tracking-tighter">
                  {formatPrice(product.price_ars)}
                </span>
                {product.compare_price && (
                  <span className="text-xl text-[#B08B8B] line-through font-light">
                    {formatPrice(product.compare_price)}
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-[#D97230] uppercase tracking-widest">
                En stock — Envío gratis mañana
              </p>
            </div>

            {/* Selección de Talle */}
            <div className="space-y-4 mb-10">
               <div className="flex justify-between items-center">
                 <span className="text-sm font-black uppercase tracking-widest text-[#1C1612]">Seleccioná tu talle</span>
                 <button className="text-xs font-bold text-[#D97230] hover:underline">Guía de talles</button>
               </div>
               <div className="grid grid-cols-4 gap-3">
                 {['245', '250', '255', '260', '265', '270', '275', '280'].map((size) => (
                   <button
                     key={size}
                     onClick={() => setSelectedSize(size)}
                     className={cn(
                       "py-4 rounded-2xl border font-black text-xs uppercase tracking-[0.2em] transition-all",
                       selectedSize === size 
                         ? "border-[#D97230] bg-[#D97230] text-white shadow-xl scale-105" 
                         : "border-[#F9EAEA] hover:border-[#D97230]/30 text-[#1C1612] hover:bg-white"
                     )}
                   >
                     {size}
                   </button>
                 ))}
               </div>
            </div>

            {/* Acciones */}
            <div className="space-y-4 pt-12 border-t border-[#F9EAEA]">
              <button 
                onClick={() => cart.addItem(product as any)}
                className="btn-primary w-full py-6 text-sm font-black uppercase tracking-[0.3em] gap-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <ShoppingBag size={20} />
                Agregar al carrito
              </button>
              
              <div className="grid sm:grid-cols-3 gap-6 mt-8 pt-12 border-t border-[#F9EAEA]/50">
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-[32px] border border-[#F9EAEA] shadow-sm">
                  <ShieldCheck size={24} strokeWidth={1.5} className="text-[#D97230] mb-4" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1C1612]">Garantía Oficial</span>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-[32px] border border-[#F9EAEA] shadow-sm">
                  <Truck size={24} strokeWidth={1.5} className="text-[#D97230] mb-4" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1C1612]">Envío Gratis</span>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-[32px] border border-[#F9EAEA] shadow-sm">
                  <RefreshCcw size={24} strokeWidth={1.5} className="text-[#D97230] mb-4" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1C1612]">Cambio Directo</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
