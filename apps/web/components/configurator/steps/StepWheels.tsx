'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { PRODUCTS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StepWheels() {
  const { wheels: selectedWheels, setWheels, nextStep } = useConfiguratorStore();

  // Obtenemos una rueda de cada tipo de piso para mostrar 3 opciones
  const liso = PRODUCTS.find(p => p.category === 'rueda' && p.floorType === 'liso');
  const rugoso = PRODUCTS.find(p => p.category === 'rueda' && p.floorType === 'rugoso');
  const mixto = PRODUCTS.find(p => p.category === 'rueda' && p.floorType === 'mixto');

  const displayWheels = [
    { ...liso, label: 'Piso Liso', subtitle: 'Mejor agarre' },
    { ...rugoso, label: 'Piso Rugoso', subtitle: 'Más durabilidad' },
    { ...mixto, label: 'Mixto', subtitle: 'Equilibrio perfecto' }
  ].filter(w => w.id); // Filtrar nulos si faltaran datos en el mock

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-[#1C1612] text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">Elegí tus ruedas</h2>
        <p className="text-[#9A8A72] text-sm md:text-base font-medium">
          Según el tipo de piso donde patinás.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {displayWheels.map((product, i) => {
          const isSelected = selectedWheels?.id === product.id;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              onClick={() => {
                setWheels(product as any);
                setTimeout(nextStep, 400);
              }}
              className={cn(
                "group relative flex flex-col bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                isSelected
                  ? "border-[#D97230] shadow-[0_10px_40px_-10px_rgba(217,114,48,0.2)]"
                  : "border-[#EAE3D9] hover:border-[#9A8A72] hover:shadow-lg"
              )}
            >
              {/* Selección Check */}
              <div className={cn(
                "absolute top-4 right-4 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected ? "border-[#D97230] bg-[#D97230] text-white" : "border-[#EAE3D9] bg-white/50 text-transparent"
              )}>
                <Check size={14} strokeWidth={3} />
              </div>

              {/* Imagen (Centrada) */}
              <div className="relative h-40 md:h-48 bg-[#FAF7F2] p-4 md:p-8 flex items-center justify-center group-hover:bg-[#F5F0EA] transition-colors">
                 <img 
                   src={product.images?.[0] || "https://i.ibb.co/PvQvS3TF/95-1.jpg"} 
                   alt={product.name} 
                   className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md z-10 group-hover:scale-105 transition-transform duration-500"
                 />
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-1 text-center">
                <h3 className="text-[#1C1612] text-xl font-bold mb-1 leading-tight">{product.label}</h3>
                <p className="text-[#9A8A72] text-xs font-semibold uppercase tracking-widest mb-6 flex-1">
                  {product.subtitle}
                </p>
                
                <div className="mb-4">
                   <p className="text-[#1C1612]/70 text-[11px] font-medium leading-tight">{product.name}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-[#F5F0EA]">
                  <span className="text-[#1C1612] text-xl font-bold tracking-tighter block">
                    {formatPrice(product.price as number)}
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
