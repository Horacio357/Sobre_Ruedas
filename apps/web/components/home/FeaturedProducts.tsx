'use client';

// ============================================================
// SOBRE RUEDAS — Featured Products (Corregido)
// Warm palette, premium hover effects, actual images
// ============================================================

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

const FEATURED_PRODUCTS = [
  {
    id: 'p3_4',
    name: 'Risport Royal Pro',
    brand_name: 'Risport',
    component_type: 'bota' as const,
    skate_level: ['avanzado'] as any,
    price_ars: 285000,
    short_desc: 'El estándar de excelencia en botas de cuero profesionales. Confort inigualable.',
    description: 'Bota de cuero natural premium.',
    slug: 'risport-royal-pro',
    images: [{ id: 'img34_1', product_id: 'p3_4', url: '/images/products/risport-royal-pro.png', sort_order: 0, is_primary: true }],
    is_active: true,
    is_featured: true,
    is_outlet: false,
    stock_quantity: 7,
    low_stock_threshold: 2,
    track_inventory: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    badge: 'Popular',
    badgeType: 'bestseller' as const,
  },
  {
    id: 'p3_5',
    name: 'Risport Dance Prime',
    brand_name: 'Risport',
    component_type: 'bota' as const,
    skate_level: ['alto_rendimiento'] as any,
    price_ars: 450000,
    short_desc: 'El máximo estándar de excelencia para danza artística. Perfil bajo y máxima flexión.',
    description: 'Bota para danza elite.',
    slug: 'risport-dance-prime',
    images: [{ id: 'img35_1', product_id: 'p3_5', url: '/images/products/dance-prime.png', sort_order: 0, is_primary: true }],
    is_active: true,
    is_featured: true,
    is_outlet: false,
    stock_quantity: 4,
    low_stock_threshold: 1,
    track_inventory: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    badge: 'Elite',
    badgeType: 'accent' as const,
  },
  {
    id: 'b1',
    name: 'Edea Always With Me',
    brand_name: 'Edea',
    component_type: 'accesorio' as const,
    skate_level: ['intermedio', 'avanzado'] as any,
    price_ars: 75000,
    short_desc: 'Bolso térmico de diseño italiano para llevar tus patines protegidos con elegancia.',
    description: 'Bolso térmico para patines.',
    slug: 'bolso-edea-always-with-me',
    images: [{ id: 'img_b1', product_id: 'b1', url: '/images/products/bolso-edea-always.png', sort_order: 0, is_primary: true }],
    is_active: true,
    is_featured: true,
    is_outlet: false,
    stock_quantity: 10,
    low_stock_threshold: 2,
    track_inventory: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    badge: 'Nuevo',
    badgeType: 'new' as const,
  },
];

export default function FeaturedProducts() {
  const cart = useCartStore();

  return (
    <section className="pt-32 pb-32 md:pt-56 md:pb-44 bg-[#FFF9F9]" aria-labelledby="featured-heading">
      <div className="container-apple flex flex-col gap-24 md:gap-40">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 id="featured-heading" className="text-[#1C1612] text-4xl md:text-5xl font-extralight tracking-tight leading-tight">
            Colección sin límites.
          </h2>
        </motion.div>

        {/* Grilla */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {FEATURED_PRODUCTS.map((product) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -14, 
                rotateX: 2, 
                rotateY: 2,
                boxShadow: "0 30px 60px -15px rgba(217, 114, 48, 0.12)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="group bg-transparent overflow-hidden"
            >
              <Link href={`/patines/${product.slug}`} className="block relative aspect-square overflow-hidden bg-white/70 border border-[#F7EAEA] rounded-[36px] p-8 shadow-sm hover:border-[#D97230]/20 transition-colors duration-500 flex items-center justify-center">
                {/* Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className={`badge badge-${product.badgeType} text-[10px]`}>
                    {product.badge}
                  </span>
                </div>

                {/* Imagen del producto */}
                <div className="absolute inset-0 p-8 flex items-center justify-center pointer-events-none">
                  <div className="relative w-full h-[75%] transition-transform duration-[1.5s] ease-out group-hover:scale-105">
                    <Image
                      src={product.images?.[0]?.url || '/images/placeholder.png'}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Overlay de interacción */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1C1612]/[0.02] transition-colors duration-500" />
                
                {/* Botón rápido */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="btn-primary w-full text-xs py-2.5 shadow-xl">
                    Ver detalles técnicos
                  </button>
                </div>
              </Link>

              {/* Info */}
              <div className="pt-10 pb-8 px-6 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D97230]/80 mb-4 block">
                  {product.skate_level?.[0]?.replace('_', ' ') ?? 'Intermedio'}
                </span>
                
                <h3 className="font-medium text-[#1C1612] text-2xl mb-4 tracking-tight leading-tight">
                  {product.name}
                </h3>
                
                <p className="text-[14px] text-[#B08B8B] mb-8 font-light leading-relaxed opacity-80 max-w-[280px] mx-auto">
                  {product.short_desc}
                </p>

                <div className="flex flex-col items-center gap-6">
                  <span className="text-2xl font-light text-[#1C1612] tracking-tighter">
                    {formatPrice(product.price_ars)}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => cart.addItem({ 
                      id: product.id, 
                      name: product.name, 
                      price_ars: product.price_ars,
                      brand_name: product.brand_name, 
                      slug: product.slug,
                      images: product.images
                    } as any)}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D97230] border-b-2 border-[#D97230]/20 hover:border-[#D97230] pb-1 transition-all duration-300"
                  >
                    Añadir al Carrito
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="/patines" className="btn-secondary gap-3 inline-flex text-sm px-10 py-4 border-2 border-[#F9EAEA] hover:border-[#D97230] hover:text-[#D97230]">
            Ver colección completa
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
