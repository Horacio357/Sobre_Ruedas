'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { PRODUCTS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import RadarChart from '@/components/ui/RadarChart';

export default function StepBoot() {
  const { level, boot: selectedBoot, setBoot, nextStep } = useConfiguratorStore();
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset confirmation when boot changes
  useEffect(() => {
    setIsConfirmed(false);
  }, [selectedBoot]);

  // Filtrar productos por categoría bota (mostramos todos para el demo)
  const availableBoots = PRODUCTS.filter(p => p.component_type === 'bota');
  const displayBoots = availableBoots;

  // Seleccionar la primera por defecto si no hay ninguna seleccionada
  useEffect(() => {
    if (!selectedBoot && displayBoots.length > 0) {
      setBoot(displayBoots[0]);
    }
  }, [selectedBoot, displayBoots, setBoot]);

  const currentBoot = selectedBoot || displayBoots[0];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 250 : scrollLeft + 250;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!currentBoot) return null;

  return (
    <div className="relative max-w-6xl mx-auto w-full min-h-[700px] flex flex-col items-center py-12 md:py-16 overflow-hidden">
      {/* Background Level Text */}
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.012] overflow-hidden z-0">
        <span className="text-[80px] md:text-[180px] font-black uppercase tracking-tightest leading-none whitespace-nowrap">
          {level || 'BOTA'}
        </span>
      </div>

      {/* Step Header */}
      <div className="relative z-10 w-full text-center mb-12 md:mb-16">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sr-accent text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 block"
        >
          Paso 3 de 6: Bota
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sr-gray-900 text-hero-sm font-black tracking-tightest mb-4"
        >
          Elegí tu bota
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sr-gray-400 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed px-4 opacity-80"
        >
          La bota es la extensión de tu cuerpo. Seleccionamos la tecnología líder para tu nivel <span className="text-sr-gray-900 font-black uppercase">{level}</span>.
        </motion.p>
      </div>

      {/* Model Selector (Carousel Style) - MORE SPACING */}
      <div className="relative z-30 w-full max-w-5xl px-4 mb-12 md:mb-20">
        <div className="flex items-center justify-between mb-4 px-4">
          <span className="text-[#1C1612] text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Ediciones Limitadas</span>
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')} 
              className="p-3 rounded-full border border-[#F5F0EA] bg-white/50 hover:bg-white hover:border-[#D97230] transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft size={18} className="text-[#1C1612]" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="p-3 rounded-full border border-[#F5F0EA] bg-white/50 hover:bg-white hover:border-[#D97230] transition-all shadow-sm active:scale-95"
            >
              <ChevronRight size={18} className="text-[#1C1612]" />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-5 md:gap-8 overflow-x-auto px-2 pb-6 no-scrollbar snap-x"
        >
          {displayBoots.map((boot, i) => {
            const isSelected = currentBoot.id === boot.id;
            return (
              <motion.button
                key={boot.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                onClick={() => setBoot(boot)}
                className={cn(
                  "group relative flex-shrink-0 w-36 md:w-48 snap-center rounded-[2rem] border-2 p-4 md:p-6 transition-all duration-500",
                  isSelected 
                   ? "border-[#D97230] bg-white shadow-[0_20px_40px_-10px_rgba(217,114,48,0.15)] scale-105 z-10" 
                   : "border-[#F5F0EA] bg-white/40 backdrop-blur-sm hover:border-[#EAE3D9] opacity-50 hover:opacity-100"
                )}
              >
                  <div className="h-24 md:h-36 mb-4 flex items-center justify-center">
                    <img 
                      src={boot.images?.[0]?.url ?? '/images/placeholder.png'} 
                      alt={boot.name}
                      className={cn(
                        "max-h-full max-w-full object-contain transition-transform duration-1000",
                        isSelected ? "scale-110 rotate-3" : "group-hover:scale-105"
                      )}
                    />
                  </div>
                  <div className="text-center">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-[0.2em] block mb-1",
                      isSelected ? "text-[#D97230]" : "text-[#9A8A72]"
                    )}>{boot.brand_name}</span>
                    <span className="text-xs md:text-sm font-black text-[#1C1612] block leading-tight">{boot.name}</span>
                  </div>
                
                {isSelected && (
                  <motion.div 
                    layoutId="check-boot-top"
                    className="absolute -top-2.5 -right-2.5 bg-[#D97230] text-white rounded-full p-1 shadow-lg z-20 border-2 border-white"
                  >
                    <Check size={12} strokeWidth={4} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Radar + Photo - HUGE GAPS */}
      <div className="relative z-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center w-full mb-12 md:mb-20 px-4">
        
        {/* Radar Chart Section */}
        <div className="flex flex-col items-center justify-center order-2 md:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBoot.id}
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 md:p-10 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm"
            >
              <RadarChart data={currentBoot.specs || []} size={280} className="md:scale-110" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Boot Photo Section */}
        <div className="flex items-center justify-center order-1 md:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBoot.id}
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -100, rotate: -10 }}
              transition={{ duration: 1, type: "spring" as const, stiffness: 60 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-[#D97230]/5 blur-[100px] rounded-full scale-150 opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
              
              <div className="relative z-10 bg-white p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-[#F5E1E1]/30 overflow-hidden">
                <img 
                  src={currentBoot.images?.[0]?.url ?? '/images/placeholder.png'} 
                  alt={currentBoot.name} 
                  className="relative z-10 max-h-[220px] md:max-h-[400px] w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Selected Boot Details (Bottom) */}
      <div className="relative z-10 w-full flex flex-col items-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBoot.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center pb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#D97230]/10 text-[#D97230] text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block"
            >
              {currentBoot.brand_name}
            </motion.span>
            <h3 className="text-sr-gray-900 text-xl md:text-2xl font-black mb-2 tracking-tight">
              {currentBoot.name}
            </h3>
            <p className="text-sr-gray-400 text-[10px] md:text-xs mb-6 font-medium italic opacity-80">
              "{currentBoot.short_desc}"
            </p>
            <div className="text-sr-gray-900 text-lg md:text-2xl font-black tracking-tightest mb-10">
              {formatPrice(currentBoot.price_ars)}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsConfirmed(true);
                setTimeout(nextStep, 800);
              }}
              className={cn(
                "group flex items-center gap-4 px-10 py-5 rounded-full font-black text-base shadow-xl transition-all duration-500",
                isConfirmed 
                  ? "bg-[#D97230] text-white shadow-[#D97230]/20" 
                  : "bg-[#1C1612] text-white hover:bg-[#D97230]"
              )}
            >
              {isConfirmed ? 'Bota Seleccionada' : 'Seleccionar esta bota'}
              <div className={cn(
                "rounded-full p-1.5 transition-colors",
                isConfirmed ? "bg-white/20" : "bg-white/10 group-hover:bg-white/20"
              )}>
                <Check size={18} strokeWidth={3} className={cn("transition-transform duration-500", isConfirmed && "scale-110")} />
              </div>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

