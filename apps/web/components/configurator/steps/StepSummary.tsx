'use client';

// ============================================================
// SOBRE RUEDAS — Step 5: Resumen
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, MessageCircle, RefreshCw } from 'lucide-react';

export default function StepSummary() {
  const { 
    level, 
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-32">
        <h2 className="text-[#1C1612] text-4xl font-light tracking-tight mb-8">¡Tu configuración está lista!</h2>
        <p className="text-[#B08B8B] text-base max-w-2xl mx-auto font-light opacity-80 leading-relaxed">
          Revisá los detalles de tu armado personalizado para <span className="text-[#D97230] font-normal uppercase tracking-widest">{level?.replace('_', ' ')}</span>.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 space-y-4">
          {selections.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-10 p-10 bg-white rounded-[40px] shadow-sm border border-[#F9EAEA]"
            >
              <div className="w-24 h-24 rounded-3xl bg-[#FFF9F9] flex items-center justify-center text-4xl border border-[#F9EAEA]">
                {item.icon}
              </div>
              <div className="flex-1">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D97230] mb-2 block">
                  {item.label}
                </span>
                <h3 className="text-[#1C1612] text-xl font-light tracking-tight">{item.product?.name || 'No seleccionado'}</h3>
                <p className="text-[#B08B8B] text-xs font-black uppercase tracking-widest opacity-60">
                  {typeof item.product?.brand === 'string' ? item.product.brand : (item.product?.brand as any)?.name}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-[#1C1612]">
                  {formatPrice((item.product as any)?.price || (item.product as any)?.price_ars || 0)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Card de Total */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1C1612] text-white p-8 rounded-3xl flex flex-col shadow-2xl relative overflow-hidden"
        >
          {/* Decoración */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D97230] rounded-full opacity-10 blur-3xl" />
          
          <h3 className="text-lg font-bold mb-8 text-white/80">Total del Armado</h3>
          
          <div className="mb-auto">
            <span className="text-3xl md:text-4xl font-black tracking-tighter text-[#FAF7F2]">
              {formatPrice(totalArs)}
            </span>
            <p className="text-sm text-white/50 mt-2">
              Incluye armado y calibración bonificada.
            </p>
          </div>

          <div className="space-y-3 mt-12">
            <button className="btn-primary w-full gap-3 py-4 text-sm font-black uppercase tracking-widest">
              <ShoppingBag size={18} />
              Agregar al carrito
            </button>
            <button className="flex items-center justify-center gap-3 w-full py-4 text-sm font-bold text-white/70 hover:text-white transition-colors">
              <MessageCircle size={18} />
              Consultar a un experto
            </button>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={reset}
          className="flex items-center gap-2 text-[#B08B8B] hover:text-[#D97230] font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
        >
          <RefreshCw size={14} />
          Reiniciar configuración
        </button>
      </div>
    </div>
  );
}
