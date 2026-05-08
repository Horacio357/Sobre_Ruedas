'use client';

// ============================================================
// SOBRE RUEDAS — Éxito de Compra (Order Success)
// Diseño minimalista, aireado y gratificante
// ============================================================

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Limpiamos el carrito al llegar a la página de éxito
    // En una app real, esto se haría tras verificar el pago con el backend
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-[90vh] bg-[#FAF7F2] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        
        {/* Ícono de éxito animado */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' as const, damping: 15, stiffness: 200 }}
          className="w-24 h-24 bg-[#D97230] rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-[#D97230]/20"
        >
          <Check size={48} className="text-white" strokeWidth={3} />
        </motion.div>

        {/* Mensaje principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-[#1C1612] tracking-tighter mb-6">
            ¡Todo listo!
            <br />
            Tu pedido está en camino.
          </h1>
          <p className="text-[#6B5E4A] text-lg font-medium mb-12 max-w-md mx-auto leading-relaxed">
            Hemos recibido tu orden correctamente. Te enviamos un email con los detalles del seguimiento.
          </p>
        </motion.div>

        {/* Tarjeta de información rápida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-sm border border-[#EAE3D9]/50 mb-12 text-left grid md:grid-cols-2 gap-10"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-[#D97230] shrink-0">
              <Package size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9A8A72] mb-1">Nro de Pedido</p>
              <p className="text-lg font-black text-[#1C1612]">#SR-49201</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-[#D97230] shrink-0">
              <ShoppingBag size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9A8A72] mb-1">Tiempo de entrega</p>
              <p className="text-lg font-black text-[#1C1612]">3 a 5 días hábiles</p>
            </div>
          </div>
        </motion.div>

        {/* Acciones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/patines" className="btn-primary px-12 py-5 text-base gap-3 shadow-xl">
            Seguir explorando
            <ArrowRight size={20} />
          </Link>
          <Link href="/" className="text-sm font-black uppercase tracking-[0.3em] text-[#1C1612]/60 hover:text-[#1C1612] transition-colors">
            Volver al inicio
          </Link>
        </motion.div>

        {/* Sutil decorativo en el fondo */}
        <div className="mt-24 flex justify-center gap-4 opacity-10 grayscale">
            <img src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=200" className="w-16 h-16 object-contain" alt="" />
            <img src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&q=80&w=200" className="w-16 h-16 object-contain" alt="" />
            <img src="https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=200" className="w-16 h-16 object-contain" alt="" />
        </div>
      </div>
    </main>
  );
}
