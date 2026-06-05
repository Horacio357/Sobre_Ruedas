'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, MessageCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import RadarChart from '@/components/ui/RadarChart';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();
  const { addItem } = useCartStore();

  const handleCheckout = () => {
    if (boot) addItem(boot);
    if (plate) addItem(plate);
    if (wheels) addItem(wheels);
    router.push('/checkout');
  };

  return (
    <div className="relative w-full pt-40 md:pt-64 pb-64 md:pb-80 px-4 overflow-hidden">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8">
              <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#F5E1E1]/50 flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-shadow duration-300">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97230] mb-2">Disciplina</span>
                <span className="text-[#1C1612] text-sm md:text-base font-black uppercase tracking-tight">{discipline}</span>
              </div>
              <div className="bg-[#1C1612] p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Potencial</span>
                <span className="text-white text-sm md:text-base font-black uppercase tracking-tight">Pro-Elite</span>
              </div>
              <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#F5E1E1]/50 flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-shadow duration-300">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97230] mb-2">Nivel</span>
                <span className="text-[#1C1612] text-sm md:text-base font-black uppercase tracking-tight">{level}</span>
              </div>
            </div>
          </motion.div>

          {/* Product Cards Section */}
          <div className="space-y-12">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-[#1C1612] opacity-30 mb-12">Componentes Seleccionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 justify-items-stretch w-full max-w-4xl mx-auto">
              {selections.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" as const, stiffness: 80 }}
                  className="group bg-white p-6 md:p-8 rounded-[2.5rem] border border-[#F5E1E1]/50 shadow-md hover:shadow-2xl transition-all duration-700 flex flex-col justify-between h-full w-full"
                >
                  <div className="relative w-full aspect-square flex items-center justify-center mb-6 bg-[#FAF7F2] rounded-[1.75rem] p-6 overflow-hidden">
                    <Image 
                      src={item.product?.images?.[0]?.url ?? '/images/placeholder.png'} 
                      alt={item.product?.name || item.label} 
                      width={200}
                      height={200}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D97230] block mb-2">{item.label}</span>
                      <h4 className="text-[#1C1612] text-sm md:text-base font-black leading-snug uppercase tracking-tight px-1">{item.product?.name}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full mb-32 md:mb-48 items-center">
            <motion.button 
              onClick={handleCheckout}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ backgroundColor: '#D97230', borderBottomColor: '#B85C20' }}
              className="w-full max-w-4xl mx-auto relative group bg-sr-accent hover:bg-sr-accent-dark rounded-[3rem] p-8 md:p-12 text-white flex flex-col items-center justify-center text-center shadow-[0_30px_60px_-15px_rgba(217,114,48,0.5)] transition-all duration-500 mb-16 hover:scale-[1.02] active:scale-[0.98] border-b-[10px]"
            >
              <div className="mb-2 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80 group-hover:text-white block mb-4 transition-colors duration-500">Inversión Total</span>
                <span className="text-3xl md:text-5xl font-black text-white tracking-tightest mb-2 leading-none block">
                  {formatPrice(totalArs)}
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-white group-hover:text-[#FAF7F2] transition-colors mt-4 pointer-events-none">
                <ShoppingBag size={24} />
                <span className="text-lg md:text-xl font-black uppercase tracking-[0.2em]">Pagar y Finalizar Compra</span>
              </div>
            </motion.button>

            {/* Acciones Secundarias */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl mx-auto">
              <button className="flex-1 bg-white text-[#1C1612] border border-[#EAE3D9] px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:border-[#1C1612] transition-all flex items-center justify-center gap-4 shadow-sm hover:shadow-md">
                <MessageCircle size={18} />
                Consultar Experto
              </button>

              <button 
                onClick={reset}
                className="flex-1 flex justify-center items-center gap-3 text-[#1C1612]/40 hover:text-[#1C1612] font-black text-[10px] uppercase tracking-[0.5em] transition-all py-5"
              >
                <RefreshCw size={14} />
                Reiniciar Configuración
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
