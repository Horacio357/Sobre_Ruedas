'use client';

// ============================================================
// SOBRE RUEDAS — Featured Products (Corregido)
// Warm palette, premium hover effects, actual images
// ============================================================

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Edea Concerto',
    shortDesc: 'Bota de competición en fibra de carbono. Máximo soporte para saltos triples y cuádruples.',
    price: 380000,
    badge: 'Elite',
    badgeType: 'accent',
    level: 'Alto Rendimiento',
    slug: 'edea-concerto',
    image: 'https://i.ibb.co/N27h4kN3/96-7.jpg', // Imagen de la bota negra (Concerto)
  },
  {
    id: '2',
    name: 'Edea Chorus',
    shortDesc: 'Equilibrio perfecto entre ligereza y soporte avanzado para saltos dobles.',
    price: 245000,
    badge: 'Popular',
    badgeType: 'bestseller',
    level: 'Avanzado',
    slug: 'edea-chorus',
    image: 'https://i.ibb.co/tpCCVKXb/95-7.jpg', // Imagen de la bota blanca (Chorus)
  },
  {
    id: '3',
    name: 'Combo Profesional',
    shortDesc: 'Set completo con plancha Roll-Line y ruedas Komplex para competición.',
    price: 420000,
    comparePrice: 480000,
    badge: 'Recomendado',
    badgeType: 'new',
    level: 'Competición',
    slug: 'combo-profesional',
    image: 'https://i.ibb.co/xtjGfZQX/93-7.jpg', // Risport / Combo alternativo
  },
];

export default function FeaturedProducts() {
  const cart = useCartStore();

  return (
    <section className="section-padding bg-[#FFF9F9]" aria-labelledby="featured-heading">
      <div className="container-apple">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-40"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D97230] font-black mb-4 block">
            Selección de Elite
          </span>
          <h2 id="featured-heading" className="text-[#1C1612] text-3xl font-light tracking-tight mb-4">
            Seleccionados de Elite
          </h2>
          <p className="text-[#B08B8B] text-base max-w-xl mx-auto font-light opacity-80">
            Equipamiento técnico probado por campeones mundiales.
          </p>
        </motion.div>

        {/* Grilla */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
          {FEATURED_PRODUCTS.map((product) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12, 
                rotateX: 2, 
                rotateY: 2,
                boxShadow: "0 25px 50px -12px rgba(217, 114, 48, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="group bg-transparent overflow-hidden"
            >
              <Link href={`/patines/${product.slug}`} className="block relative aspect-square overflow-hidden bg-[#FFF0F0]">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`badge badge-${product.badgeType} text-[10px]`}>
                    {product.badge}
                  </span>
                </div>

                {/* Imagen del producto */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-20 transition-transform duration-[2s] ease-out group-hover:scale-105 mix-blend-multiply"
                  onError={(e) => {
                    // Fallback a un emoji si la imagen no existe
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML += `<div class="w-full h-full flex items-center justify-center text-7xl opacity-20">🛼</div>`;
                  }}
                />

                {/* Overlay de interacción */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1C1612]/5 transition-colors duration-500" />
                
                {/* Botón rápido */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="btn-primary w-full text-xs py-2.5 shadow-xl">
                    Ver detalles técnicos
                  </button>
                </div>
              </Link>

              {/* Info */}
              <div className="p-16 text-center">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#D97230]/60 mb-8 block">
                  {product.level}
                </span>
                
                <h3 className="font-light text-[#1C1612] text-3xl mb-6 tracking-tight">
                  {product.name}
                </h3>
                
                <p className="text-[15px] text-[#B08B8B] mb-12 font-light leading-relaxed opacity-80 max-w-[300px] mx-auto">
                  {product.shortDesc}
                </p>

                <div className="flex flex-col items-center gap-12">
                  <span className="text-3xl font-extralight text-[#1C1612] tracking-tighter">
                    {formatPrice(product.price)}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => cart.addItem({ 
                      id: product.id, 
                      name: product.name, 
                      price: product.price,
                      brand: { name: 'Edea' }, 
                      slug: product.slug,
                      images: [{ url: product.image }]
                    } as any)}
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D97230] border-b border-[#D97230]/30 pb-1"
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
          className="text-center mt-16"
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
