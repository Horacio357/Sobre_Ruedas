'use client';

// ============================================================
// SOBRE RUEDAS — Brands Strip (Corregido)
// Marquee infinito real sin solapamientos
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';

const BRANDS = [
  'Risport', 'Edea', 'Jackson', 'SP Teri', 'MK Blade',
  'Snyder', 'Sure-Grip', 'Pilot', 'Witch Doctor', 'Riedell',
];

export default function BrandsStrip() {
  return (
    <section 
      className="py-12 border-y border-[#EAE3D9] bg-white overflow-hidden" 
      aria-label="Nuestras marcas"
    >
      <div className="container-apple mb-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#9A8A72] font-bold">
          Marcas líderes del mercado
        </p>
      </div>

      {/* Contenedor del Marquee */}
      <div className="relative flex whitespace-nowrap">
        {/* Usamos dos grupos para el efecto infinito sin cortes */}
        <motion.div 
          className="flex items-center min-w-max"
          animate={{ x: [0, "-50%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Grupo 1 */}
          <div className="flex items-center gap-32 px-16 min-w-max">
            {BRANDS.map((brand) => (
              <span 
                key={brand} 
                className="text-2xl md:text-4xl font-black text-[#E0D5C5] hover:text-[#D97230] transition-all cursor-default select-none tracking-tighter"
              >
                {brand}
              </span>
            ))}
          </div>
          {/* Grupo 2 (Duplicado para loop) */}
          <div className="flex items-center gap-32 px-16 min-w-max">
            {BRANDS.map((brand) => (
              <span 
                key={`${brand}-2`} 
                className="text-2xl md:text-4xl font-black text-[#E0D5C5] hover:text-[#D97230] transition-all cursor-default select-none tracking-tighter"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
