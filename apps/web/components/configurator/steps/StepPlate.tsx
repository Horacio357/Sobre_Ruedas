'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { PRODUCTS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import RadarChart from '@/components/ui/RadarChart';

export default function StepPlate() {
  const { plate: selectedPlate, setPlate, nextStep } = useConfiguratorStore();

  const availablePlates = PRODUCTS.filter(p => p.category === 'plancha').slice(0, 2);

  // Fallback
  const displayPlates = availablePlates.length > 0 ? availablePlates : PRODUCTS.filter(p => p.category === 'plancha').slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-[#1C1612] text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">Elegí tu plancha</h2>
        <p className="text-[#9A8A72] text-sm md:text-base font-medium">
          Compatibles con tu bota seleccionada.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {displayPlates.map((product, i) => {
          const isSelected = selectedPlate?.id === product.id;
          const badgeText = i === 0 ? "Más Estabilidad" : "Más Respuesta";

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              onClick={() => {
                setPlate(product);
                setTimeout(nextStep, 400);
              }}
              className={cn(
                "group relative flex flex-col bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                isSelected
                  ? "border-[#D97230] shadow-[0_10px_40px_-10px_rgba(217,114,48,0.2)]"
                  : "border-[#EAE3D9] hover:border-[#9A8A72] hover:shadow-lg"
              )}
            >
              <div className="absolute top-4 left-4 z-10 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1C1612] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                {badgeText}
              </div>
              
              {/* Selección Check */}
              <div className={cn(
                "absolute top-4 right-4 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected ? "border-[#D97230] bg-[#D97230] text-white" : "border-[#EAE3D9] bg-white/50 text-transparent"
              )}>
                <Check size={14} strokeWidth={3} />
              </div>

              {/* Imagen y Radar */}
              <div className="relative h-40 md:h-48 bg-[#FAF7F2] p-4 md:p-8 flex items-center justify-center group-hover:bg-[#F5F0EA] transition-colors">
                 <img 
                   src="https://i.ibb.co/hx3GqB85/2-4.png" 
                   alt={product.name} 
                   className="max-w-full max-h-full object-contain drop-shadow-md z-10 group-hover:scale-105 transition-transform duration-500"
                 />
                 {product.specs && (
                   <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none scale-150">
                     <RadarChart data={product.specs} size={200} />
                   </div>
                 )}
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-1 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A8A72] mb-1">
                  {product.brand}
                </span>
                <h3 className="text-[#1C1612] text-xl font-bold mb-2 leading-tight">{product.name}</h3>
                <p className="text-[#9A8A72] text-xs leading-relaxed mb-6 flex-1">
                  {product.shortDesc}
                </p>
                <div className="mt-auto pt-4 border-t border-[#F5F0EA]">
                  <span className="text-[#1C1612] text-xl font-bold tracking-tighter block">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
