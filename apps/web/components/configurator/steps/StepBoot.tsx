'use client';

// ============================================================
// SOBRE RUEDAS — Step 2: Bota
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { PRODUCTS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import RadarChart from '@/components/ui/RadarChart';

export default function StepBoot() {
  const { level, boot: selectedBoot, setBoot } = useConfiguratorStore();

  // Filtrar productos por nivel y categoría bota
  const availableBoots = PRODUCTS.filter(p => 
    p.category === 'bota' && (p.level === level || level === 'alto_rendimiento')
  );

  return (
    <div className="space-y-12">
      <div className="text-center mb-32">
        <h2 className="text-[#1C1612] text-4xl font-light tracking-tight mb-8">Elegí tu bota</h2>
        <p className="text-[#B08B8B] text-base max-w-2xl mx-auto font-light opacity-80 leading-relaxed">
          La bota es la extensión de tu cuerpo. Seleccionamos la mejor tecnología para tu nivel de <span className="text-[#D97230] font-normal uppercase tracking-widest">{level?.replace('_', ' ')}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
        {availableBoots.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setBoot(product as any)}
            className={cn(
              "group cursor-pointer rounded-[40px] bg-transparent transition-all duration-1000 overflow-hidden border border-transparent",
              selectedBoot?.id === product.id
                ? "shadow-2xl scale-[1.02] bg-white border-[#F9EAEA]"
                : "hover:shadow-xl hover:bg-white/50"
            )}
          >
            {/* Imagen Miniatura */}
            <div className="aspect-square bg-transparent relative overflow-hidden flex flex-col items-center justify-center p-20">
              {product.specs ? (
                <RadarChart data={product.specs} size={180} className="opacity-40 group-hover:opacity-100 transition-opacity duration-1000 scale-110" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                  🛼
                </div>
              )}
              {selectedBoot?.id === product.id && (
                <div className="absolute top-8 right-8 bg-[#D97230] text-white p-2 rounded-full shadow-2xl">
                  <Check size={20} strokeWidth={3} />
                </div>
              )}
            </div>

            <div className="p-16 flex flex-col flex-1 text-center">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#D97230]/60 mb-8 block">
                {product.brand}
              </span>
              <h3 className="text-[#1C1612] text-2xl font-light tracking-tight mb-4">{product.name}</h3>
              <p className="text-[#B08B8B] text-[15px] font-light leading-relaxed mb-16 opacity-80 max-w-[280px] mx-auto">
                {product.shortDesc}
              </p>
              
              <div className="mt-auto pt-12 flex flex-col items-center gap-8">
                <span className="text-2xl font-extralight text-[#1C1612] tracking-tighter">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D97230] border-b border-[#D97230]/20 pb-1">
                  Seleccionar Bota
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
