'use client';

// ============================================================
// SOBRE RUEDAS — Step 4: Ruedas
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { PRODUCTS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Check, ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import RadarChart from '@/components/ui/RadarChart';

export default function StepWheels() {
  const { wheels: selectedWheels, setWheels, nextStep } = useConfiguratorStore();
  const [showAlternatives, setShowAlternatives] = useState(false);

  const availableWheels = PRODUCTS.filter(p => p.category === 'rueda');

  const recommended = availableWheels[0];
  const alternatives = availableWheels.slice(1);

  const handleSelect = (product: any) => {
    setWheels(product);
  };

  const handleSelectAndNext = (product: any) => {
    setWheels(product);
    setTimeout(nextStep, 150);
  };

  if (!recommended) return null;

  return (
    <div className="space-y-12">
      <div className="text-center mb-16">
        <h2 className="text-[#1C1612] text-4xl font-light tracking-tight mb-4">Recomendación Ideal</h2>
        <p className="text-[#B08B8B] text-base max-w-2xl mx-auto font-light opacity-80 leading-relaxed">
          La dureza y el agarre dependen de la superficie donde patines. Esta es la mejor opción todoterreno competitivo.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden border border-[#F9EAEA] flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 p-12 flex flex-col justify-center relative bg-[#FAF7F2]">
           {recommended.specs ? (
             <RadarChart data={recommended.specs} size={240} className="mx-auto" />
           ) : (
             <div className="text-9xl opacity-[0.03] text-center">☸️</div>
           )}
        </div>
        <div className="md:w-1/2 p-12 md:p-16 flex flex-col">
          <span className="badge badge-accent mb-6 inline-flex self-start">Elección Experta</span>
          <h3 className="text-[#1C1612] text-3xl font-bold tracking-tight mb-4">{recommended.name}</h3>
          <p className="text-[#B08B8B] text-sm leading-relaxed mb-8">
            {recommended.description}
          </p>
          <div className="mt-auto">
            <span className="text-3xl font-light text-[#1C1612] tracking-tighter block mb-6">
              {formatPrice(recommended.price)}
            </span>
            <button 
              onClick={() => handleSelectAndNext(recommended)}
              className="w-full btn-primary py-4 text-base gap-2 group"
            >
              Elegir y Continuar
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      {alternatives.length > 0 && (
        <div className="pt-12 text-center">
          <button 
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="text-sm font-bold uppercase tracking-[0.2em] text-[#9A8A72] hover:text-[#D97230] transition-colors inline-flex items-center gap-2"
          >
            Ver otras opciones
            <ChevronDown size={16} className={cn("transition-transform", showAlternatives && "rotate-180")} />
          </button>
          
          <AnimatePresence>
            {showAlternatives && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 overflow-hidden"
              >
                {alternatives.map((product, i) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className={cn(
                      "cursor-pointer rounded-3xl p-8 border transition-all text-left flex flex-col",
                      selectedWheels?.id === product.id
                        ? "border-[#D97230] bg-[#FFF9F9] shadow-md"
                        : "border-[#EAE3D9] bg-white hover:border-[#D97230]/30"
                    )}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97230]/60 mb-2">{product.brand}</span>
                    <h4 className="text-xl font-bold text-[#1C1612] mb-4">{product.name}</h4>
                    <p className="text-sm text-[#B08B8B] mb-8 flex-1">{product.shortDesc}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-light text-[#1C1612]">{formatPrice(product.price)}</span>
                      {selectedWheels?.id === product.id ? (
                        <Check size={20} className="text-[#D97230]" />
                      ) : (
                        <span className="text-xs font-bold text-[#D97230]">Elegir</span>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
