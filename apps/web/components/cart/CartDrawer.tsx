'use client';

// ============================================================
// SOBRE RUEDAS — Cart Drawer (Corregido)
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function CartDrawer() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    total 
  } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[101] bg-[#FAF7F2] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-[#EAE3D9] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D97230]/10 rounded-lg text-[#D97230]">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-black tracking-tighter text-[#1C1612]">Tu Carrito</h2>
                <span className="text-xs font-bold px-2 py-0.5 bg-[#F5F0EA] rounded-full text-[#9A8A72]">
                  {items.length}
                </span>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-[#FAF7F2] rounded-full transition-colors text-[#1C1612]">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="text-6xl grayscale opacity-20">🛼</div>
                  <p className="text-[#6B5E4A] font-medium">Tu carrito está vacío</p>
                  <button onClick={closeCart} className="text-[#D97230] font-bold text-sm hover:underline">
                    Empezar a comprar
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const itemImage = item.product.slug.includes('concerto') ? '/images/products/edea-concerto-black.jpg' :
                                    item.product.slug.includes('chorus') ? '/images/products/edea-chorus-white.jpg' :
                                    item.product.slug.includes('combo') ? '/images/products/edea-chorus-heel.jpg' :
                                    (item.product.images && item.product.images[0]?.url) || '';
                  
                  return (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl bg-white border border-[#EAE3D9] flex-shrink-0 overflow-hidden relative">
                         <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-10">🛼</div>
                         {itemImage && (
                           <img src={itemImage} alt={item.product.name} className="w-full h-full object-cover relative z-10" />
                         )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-sm font-bold text-[#1C1612] truncate pr-4">{item.product.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-[#9A8A72] hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#9A8A72] font-black uppercase tracking-widest mb-3">
                          {item.product.brand?.name || 'Marca'}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-[#EAE3D9] rounded-lg bg-white overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-2 hover:bg-[#FAF7F2] transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-xs font-bold w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-2 hover:bg-[#FAF7F2] transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-black text-[#1C1612]">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#EAE3D9] space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B5E4A] font-bold">Subtotal</span>
                  <span className="text-2xl font-black text-[#1C1612] tracking-tighter">{formatPrice(total)}</span>
                </div>
                <Link 
                  href="/checkout" 
                  onClick={closeCart}
                  className="btn-primary w-full py-4 gap-3 text-sm font-black uppercase tracking-widest shadow-xl flex items-center justify-center"
                >
                  Finalizar Compra
                  <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
