'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, MessageCircle, RefreshCw } from 'lucide-react';
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

  // Simulamos un gráfico combinado usando los datos de la bota si existen
  const combinedSpecs = boot?.specs || plate?.specs || wheels?.specs || [
      { label: 'Estabilidad', value: 85 },
      { label: 'Velocidad', value: 80 },
      { label: 'Agarre', value: 90 },
      { label: 'Rebote', value: 75 },
      { label: 'Ligereza', value: 80 },
  ];

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-[#1C1612] text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">¡Tu patín está listo!</h2>
        <p className="text-[#9A8A72] text-sm md:text-base font-medium">
          Revisá tu configuración personalizada antes de finalizar.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
        {/* Left Col: Gráfico de Rendimiento */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#1C1612] rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden"
        >
          {/* Luz de fondo sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D97230]/20 blur-[80px] rounded-full pointer-events-none" />
          
          <h3 className="text-white text-lg font-bold mb-8 relative z-10 text-center">Rendimiento Estimado</h3>
          
          <div className="flex-1 flex items-center justify-center relative z-10 min-h-[250px]">
             <RadarChart data={combinedSpecs} size={280} className="mx-auto" />
          </div>

          <div className="mt-8 text-center relative z-10 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
             <p className="text-[#EAE3D9] text-sm">
                Tu patín es ideal para: <span className="font-bold text-white capitalize">{discipline || 'Todas las disciplinas'}</span>
             </p>
             <p className="text-[#EAE3D9] text-sm mt-1">
                Nivel: <span className="font-bold text-white capitalize">{level?.replace('_', ' ') || 'No definido'}</span>
             </p>
          </div>
        </motion.div>

        {/* Right Col: Componentes y Total */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col space-y-4 md:space-y-6"
        >
          <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#EAE3D9] flex-1">
            <h3 className="text-[#1C1612] text-base md:text-lg font-bold mb-4 md:mb-6">Componentes Seleccionados</h3>
            
            <div className="space-y-3 md:space-y-4">
              {selections.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-[#FAF7F2] border border-[#F5F0EA]">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-lg md:text-xl shadow-sm">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A8A72] block mb-0.5">
                      {item.label}
                    </span>
                    <h4 className="text-[#1C1612] text-sm font-bold">{item.product?.name || 'No seleccionado'}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1C1612]">
                      {formatPrice((item.product as any)?.price || 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card de Total */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#EAE3D9]">
            <div className="flex justify-between items-end mb-6 md:mb-8">
              <h3 className="text-[#9A8A72] text-sm font-bold uppercase tracking-widest">Total</h3>
              <span className="text-3xl md:text-4xl font-black tracking-tighter text-[#1C1612]">
                {formatPrice(totalArs)}
              </span>
            </div>
  
            <div className="space-y-3">
              <button className="w-full bg-[#D97230] text-white hover:bg-[#B85C20] py-4 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95">
                <ShoppingBag size={18} />
                Agregar al carrito
              </button>
              <button className="w-full bg-[#FAF7F2] text-[#1C1612] hover:bg-[#F5F0EA] py-4 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-[#EAE3D9]">
                <MessageCircle size={18} />
                Consultar a un experto
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center pb-8">
        <button 
          onClick={reset}
          className="flex items-center gap-2 text-[#9A8A72] hover:text-[#1C1612] font-bold text-xs uppercase tracking-widest transition-colors"
        >
          <RefreshCw size={14} />
          Empezar de nuevo
        </button>
      </div>
    </div>
  );
}
