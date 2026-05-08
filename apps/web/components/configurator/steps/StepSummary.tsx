'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, MessageCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import RadarChart from '@/components/ui/RadarChart';

export default function StepSummary() {
  const { 
    level, 
    discipline,
    boot, 
    plate, 
    wheels, 
    totalArs, 
    reset 
  } = useConfiguratorStore();

  const selections = [
    { label: 'Bota', product: boot, icon: '🛼' },
    { label: 'Plancha', product: plate, icon: '🔩' },
    { label: 'Ruedas', product: wheels, icon: '☸️' },
  ];

  // Calcular rendimiento combinado
  const getCombinedSpecs = () => {
    const allSpecs = [
      ...(boot?.specs || []),
      ...(plate?.specs || []),
      ...(wheels?.specs || [])
    ];
    
    if (allSpecs.length === 0) return [
      { label: 'Rendimiento', value: 85 },
      { label: 'Estabilidad', value: 80 },
      { label: 'Velocidad', value: 90 },
      { label: 'Control', value: 85 },
      { label: 'Confort', value: 95 }
    ];

    const groups: Record<string, number[]> = {};
    allSpecs.forEach(s => {
      if (!groups[s.label]) groups[s.label] = [];
      groups[s.label].push(s.value);
    });
    
    return Object.keys(groups).map(label => ({
      label,
      value: Math.round(groups[label].reduce((a, b) => a + b, 0) / groups[label].length)
    })).slice(0, 5);
  };

  const combinedSpecs = getCombinedSpecs();

  return (
    <div className="relative w-full pt-40 md:pt-64 pb-64 px-4 overflow-hidden">
      {/* Background Decor — Subtle and non-obstructive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.02] z-0">
        <span className="text-[120px] md:text-[240px] font-black uppercase tracking-tightest leading-none">
          SOBRE RUEDAS
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24 md:mb-40">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            className="bg-sr-accent text-white p-5 rounded-full inline-flex mb-10 shadow-2xl shadow-sr-accent/20"
          >
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </motion.div>
          
          <h2 className="text-[#1C1612] text-[clamp(2.5rem,8vw,6rem)] font-extralight tracking-tightest mb-8 leading-none">
            Tu patín está listo.
          </h2>
          <p className="text-[#1C1612]/50 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Una configuración maestra de alto rendimiento diseñada específicamente para tu nivel <span className="text-sr-accent font-black">{level}</span>.
          </p>
        </div>

        {/* Content Grid: Stacked for better 'aire' */}
        <div className="flex flex-col gap-24 md:gap-40">
          
          {/* Performance Radar Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-16 rounded-[3rem] border border-[#F5E1E1]/50 shadow-warm flex flex-col items-center"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D97230] mb-16 opacity-60">DNA de Rendimiento</h3>
            
            <div className="w-full max-w-md aspect-square flex items-center justify-center mb-16">
               <RadarChart data={combinedSpecs} size={typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 400} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#F5E1E1]/30">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#D97230] block mb-2 opacity-60">Disciplina</span>
                <span className="text-[#1C1612] text-sm md:text-base font-black uppercase tracking-tight">{discipline}</span>
              </div>
              <div className="bg-[#1C1612] p-6 rounded-2xl text-white">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-2">Potencial</span>
                <span className="text-white text-sm md:text-base font-black uppercase tracking-tight">Pro-Elite</span>
              </div>
              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#F5E1E1]/30 col-span-2 md:col-span-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#D97230] block mb-2 opacity-60">Nivel</span>
                <span className="text-[#1C1612] text-sm md:text-base font-black uppercase tracking-tight">{level}</span>
              </div>
            </div>
          </motion.div>

          {/* Product Cards Section */}
          <div className="space-y-12">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-[#1C1612] opacity-30 mb-12">Componentes Seleccionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 justify-items-center">
              {selections.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" as const, stiffness: 80 }}
                  className="group bg-white p-8 rounded-[2.5rem] border border-[#F5E1E1]/50 shadow-md hover:shadow-2xl transition-all duration-700"
                >
                  <div className="aspect-square flex items-center justify-center mb-8 overflow-hidden">
                    <img 
                      src={item.product?.images?.[0]?.url ?? '/images/placeholder.png'} 
                      alt={item.product?.name} 
                      className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D97230] block mb-3">{item.label}</span>
                    <h4 className="text-[#1C1612] text-base font-black leading-tight uppercase tracking-tight">{item.product?.name}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-[#1C1612] rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-white flex flex-col items-center justify-center text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] mb-64"
          >
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 block mb-6">Inversión Total</span>
              <span className="text-4xl md:text-7xl font-black text-white tracking-tightest mb-4 leading-none block">
                {formatPrice(totalArs)}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
              <button className="flex-1 bg-white text-[#1C1612] px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-[#D97230] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-4">
                <ShoppingBag size={20} />
                Finalizar Compra
              </button>
              <button className="flex-1 bg-white/10 text-white border border-white/20 px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white/20 transition-all flex items-center justify-center gap-4">
                <MessageCircle size={20} />
                Consultar Experto
              </button>
            </div>

            <button 
              onClick={reset}
              className="mt-16 flex items-center gap-3 text-white/40 hover:text-white font-black text-[10px] uppercase tracking-[0.5em] transition-all"
            >
              <RefreshCw size={14} />
              Reiniciar Configuración
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
