'use client';

// ============================================================
// SOBRE RUEDAS — Step 4: Ruedas
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { PRODUCTS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import RadarChart from '@/components/ui/RadarChart';

export default function StepWheels() {
  const { wheels: selectedWheels, setWheels } = useConfiguratorStore();

  const availableWheels = PRODUCTS.filter(p => p.category === 'rueda');

  return (
    <div className="space-y-12">
      <div className="text-center mb-32">
        <h2 className="text-[#1C1612] text-4xl font-light tracking-tight mb-8">Elegí tus ruedas</h2>
        <p className="text-[#B08B8B] text-base max-w-2xl mx-auto font-light opacity-80 leading-relaxed">
          La dureza y el agarre dependen de la superficie donde patines. Todas nuestras opciones son de grado competitivo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
        {availableWheels.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setWheels(product as any)}
            className={cn(
              "group cursor-pointer rounded-[40px] bg-transparent transition-all duration-1000 overflow-hidden border border-transparent",
              selectedWheels?.id === product.id
                ? "shadow-2xl scale-[1.02] bg-white border-[#F9EAEA]"
                : "hover:shadow-xl hover:bg-white/50"
            )}
          >
            <div className="aspect-square bg-transparent relative overflow-hidden flex flex-col items-center justify-center p-20">
              {product.specs ? (
                <RadarChart data={product.specs} size={180} className="opacity-40 group-hover:opacity-100 transition-opacity duration-1000 scale-110" />
              ) : (
                <div className="text-9xl opacity-[0.03] group-hover:rotate-[180deg] transition-transform duration-1000">
                  ☸️
                </div>
              )}
              {selectedWheels?.id === product.id && (
                <div className="absolute top-8 right-8 bg-[#D97230] text-white p-2 rounded-full shadow-2xl">
                  <Check size={20} strokeWidth={3} />
                </div>
              )}
            </div>

            <div className="p-16 flex flex-col flex-1 text-center">
              <div className="flex flex-col items-center mb-10">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#9A8A72]/60 mb-8 block">
                  Set de 8 ruedas
                </span>
                <h3 className="text-[#1C1612] text-2xl font-light tracking-tight">{product.name}</h3>
              </div>
              <p className="text-[#B08B8B] text-[15px] mb-16 leading-relaxed font-light opacity-80 max-w-[280px] mx-auto">
                {product.shortDesc}
              </p>
              
              <div className="mt-auto pt-12 flex flex-col items-center gap-8">
                <span className="text-2xl font-extralight text-[#1C1612] tracking-tighter">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D97230] border-b border-[#D97230]/20 pb-1">
                  Seleccionar Ruedas
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
