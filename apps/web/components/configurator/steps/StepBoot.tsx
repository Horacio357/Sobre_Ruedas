'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { PRODUCTS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import RadarChart from '@/components/ui/RadarChart';

export default function StepBoot() {
  const { level, discipline, boot: selectedBoot, setBoot, nextStep } = useConfiguratorStore();

  // Filtrar productos por nivel, categoría bota (y opcionalmente disciplina si la data lo soporta)
  // Por ahora simulamos que encontramos 3 opciones basadas en el nivel.
  const availableBoots = PRODUCTS.filter(p => 
    p.category === 'bota' && (p.level === level || level === 'avanzado' || level === 'alto_rendimiento')
  ).slice(0, 3);

  // Si no hay 3, rellenamos con las primeras para que siempre haya 3 en la demo
  const displayBoots = availableBoots.length === 3 ? availableBoots : PRODUCTS.filter(p => p.category === 'bota').slice(0, 3);
  const recommendedId = displayBoots[0]?.id;

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-[#1C1612] text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">Elegí tu bota ideal</h2>
        <p className="text-[#9A8A72] text-sm md:text-base font-medium">
          Recomendadas para tu nivel y disciplina.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {displayBoots.map((product, i) => {
          const isRecommended = product.id === recommendedId;
          const isSelected = selectedBoot?.id === product.id;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              onClick={() => {
                setBoot(product);
                setTimeout(nextStep, 400);
              }}
              className={cn(
                "group relative flex flex-col bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                isSelected
                  ? "border-[#D97230] shadow-[0_10px_40px_-10px_rgba(217,114,48,0.2)]"
                  : "border-[#EAE3D9] hover:border-[#9A8A72] hover:shadow-lg",
                isRecommended && !isSelected && "border-[#D97230]/50"
              )}
            >
              {isRecommended && (
                <div className="absolute top-4 left-4 z-10 bg-[#D97230] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Mejor Opción
                </div>
              )}
              
              {/* Selección Check */}
              <div className={cn(
                "absolute top-4 right-4 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected ? "border-[#D97230] bg-[#D97230] text-white" : "border-[#EAE3D9] bg-white/50 text-transparent"
              )}>
                <Check size={14} strokeWidth={3} />
              </div>

              {/* Imagen y Radar */}
              <div className="relative h-40 md:h-48 bg-[#FAF7F2] p-4 md:p-6 flex items-center justify-center group-hover:bg-[#F5F0EA] transition-colors">
                 {/* Imagen temporal si no hay asset real */}
                 <img 
                   src={i === 0 ? "https://i.ibb.co/xtjGfZQX/93-7.jpg" : i === 1 ? "https://i.ibb.co/qYPZYx5y/6-1.png" : "https://i.ibb.co/wNWB1hsW/93-1.jpg"} 
                   alt={product.name} 
                   className="max-h-full object-contain drop-shadow-xl z-10 group-hover:scale-105 transition-transform duration-500"
                 />
                 {/* Radar sutil de fondo */}
                 {product.specs && (
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-150">
                     <RadarChart data={product.specs} size={200} />
                   </div>
                 )}
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-1 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A8A72] mb-1">
                  {product.brand}
                </span>
                <h3 className="text-[#1C1612] text-lg font-bold mb-2 leading-tight">{product.name}</h3>
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
