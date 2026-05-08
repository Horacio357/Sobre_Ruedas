'use client';

// ============================================================
// SOBRE RUEDAS — Product Card (Corregido)
// Apple-style clean design, warm palette, interactive effects
// ============================================================

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowUpRight, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cart = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-white flex flex-col h-full border border-[#F9EAEA]/50 shadow-none hover:shadow-2xl transition-all duration-700 rounded-[40px]"
    >
      <Link href={`/patines/${product.slug}`} className="relative block aspect-square overflow-hidden bg-transparent">
        {/* Product Image */}
        <div className="w-full h-full p-10 md:p-12 transition-transform duration-[1.5s] ease-out group-hover:scale-105 flex items-center justify-center">
          <img 
            src={product.images?.[0]?.url ?? '/images/placeholder.png'} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="flex items-center justify-center w-full h-full text-7xl opacity-[0.03]">🛼</div>`;
              }
            }}
          />
        </div>
      </Link>

      <div className="p-16 flex flex-col flex-1 text-center">
        <div className="mb-12">
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#D97230]/60 mb-6 block">
            {product.brand_name}
          </span>
          
          <h3 className="text-[#1C1612] text-2xl font-light tracking-tight mb-4">
            {product.name}
          </h3>
          
          <p className="text-[#B08B8B] text-[14px] leading-relaxed max-w-[280px] mx-auto font-light opacity-80">
            {product.short_desc}
          </p>
        </div>

        <div className="mt-auto flex flex-col items-center gap-10">
          <span className="text-2xl font-extralight text-[#1C1612] tracking-tighter">
            {formatPrice(product.price_ars)}
          </span>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              cart.addItem(product as any);
            }}
            className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D97230] hover:text-[#1C1612] transition-colors border-b border-[#D97230]/20 pb-1"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </motion.div>
  );
}
