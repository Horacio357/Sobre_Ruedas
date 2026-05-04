'use client';

// ============================================================
// SOBRE RUEDAS — Finalizar Compra (Checkout)
// Refactorización de Espacios y Bordes Suaves
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { 
  ShieldCheck, 
  Truck, 
  ChevronRight, 
  ShoppingBag,
  ArrowLeft,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PAYMENT_METHODS = [
  { id: 'mercadopago', name: 'Mercado Pago', logo: '💳', desc: 'Cuotas con tarjeta y dinero en cuenta' },
  { id: 'modo', name: 'MODO', logo: '📱', desc: 'Pagá con tu banco directamente' },
  { id: 'gocuotas', name: 'GO Cuotas', logo: '💳', desc: 'Cuotas sin tarjeta de crédito' },
  { id: 'nave', name: 'Nave', logo: '⛵', desc: 'La nueva forma de pagar de Galicia' },
  { id: 'paypal', name: 'PayPal', logo: '🌎', desc: 'Pagos internacionales en USD' },
];

export default function CheckoutPage() {
  const { items, total } = useCartStore();
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', zip: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const router = useRouter();

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulamos el proceso de pago
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/checkout/success');
    }, 2500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FAF7F2] px-12">
        <ShoppingBag className="text-[#D8CEBC] mb-8" size={64} strokeWidth={1} />
        <h1 className="text-3xl font-black text-[#1C1612] mb-4 tracking-tighter">Tu carrito está vacío</h1>
        <Link href="/patines" className="btn-primary px-10 py-4 text-sm uppercase tracking-widest">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] pt-12 pb-40">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        
        {/* Header de navegación interna */}
        <div className="mb-16 flex items-center justify-between">
          <Link href="/patines" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#9A8A72] hover:text-[#D97230] transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Volver al catálogo
          </Link>
          <div className="flex items-center gap-3">
             <div className={cn("h-1.5 w-12 rounded-full transition-colors", step >= 1 ? "bg-[#D97230]" : "bg-[#EAE3D9]")} />
             <div className={cn("h-1.5 w-12 rounded-full transition-colors", step >= 2 ? "bg-[#D97230]" : "bg-[#EAE3D9]")} />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* ── Sección de Formulario (Izquierda) ─────────────────── */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">
            
            {/* Paso 1: Envío */}
            <section className={cn(
              "bg-white rounded-3xl shadow-sm border border-[#EAE3D9]/50 overflow-hidden transition-all duration-500",
              step === 1 ? "ring-1 ring-[#D97230]/10" : "opacity-50"
            )}>
              <div className="p-10 md:p-16">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors shadow-sm",
                      step > 1 ? "bg-green-500 text-white" : "bg-[#1C1612] text-white"
                    )}>
                      {step > 1 ? <CheckCircle2 size={24} /> : "1"}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-[#1C1612]">Datos de Envío</h2>
                  </div>
                  {step > 1 && (
                    <button onClick={() => setStep(1)} className="text-[11px] font-black text-[#D97230] uppercase tracking-widest hover:underline bg-[#D97230]/5 px-4 py-2 rounded-full">Editar</button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div 
                      key="step1-form"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      <div className="md:col-span-2">
                        <Input label="Email de contacto" name="email" value={formData.email} onChange={handleInputChange} placeholder="tu@email.com" />
                      </div>
                      <Input label="Nombre" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Nombre" />
                      <Input label="Apellido" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Apellido" />
                      <div className="md:col-span-2">
                        <Input label="Dirección" name="address" value={formData.address} onChange={handleInputChange} placeholder="Calle y número, departamento..." />
                      </div>
                      <Input label="Ciudad" name="city" value={formData.city} onChange={handleInputChange} placeholder="Ej: CABA" />
                      <Input label="Código Postal" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="Ej: 1425" />
                      
                      <div className="md:col-span-2 pt-10">
                        <button 
                          onClick={() => setStep(2)}
                          disabled={!formData.email || !formData.address || !formData.firstName}
                          className="btn-primary w-full md:w-auto px-16 py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl disabled:opacity-30 transition-all"
                        >
                          Continuar al pago
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="step1-summary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 text-sm text-[#6B5E4A] font-medium bg-[#FAF7F2] p-6 rounded-2xl border border-[#F5F0EA]"
                    >
                      <Truck size={18} className="text-[#D97230]" />
                      <span>Entregar a <strong>{formData.firstName} {formData.lastName}</strong> en {formData.address}, {formData.city}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Paso 2: Pago */}
            <section className={cn(
              "bg-white rounded-3xl shadow-sm border border-[#EAE3D9]/50 overflow-hidden transition-all duration-500",
              step === 2 ? "ring-1 ring-[#D97230]/10" : "opacity-30 pointer-events-none"
            )}>
              <div className="p-10 md:p-16">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-[#1C1612] text-white flex items-center justify-center font-black text-lg shadow-sm">2</div>
                  <h2 className="text-3xl font-black tracking-tight text-[#1C1612]">Método de Pago</h2>
                </div>

                <AnimatePresence>
                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      {PAYMENT_METHODS.map(method => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={cn(
                            "w-full flex items-center gap-6 p-6 md:p-8 rounded-2xl border-2 transition-all text-left group",
                            selectedMethod === method.id ? "border-[#D97230] bg-[#FAF7F2] shadow-sm" : "border-[#F5F0EA] hover:border-[#D97230]/20"
                          )}
                        >
                          <span className="text-3xl group-hover:scale-110 transition-transform duration-500">{method.logo}</span>
                          <div className="flex-1">
                            <p className="font-black text-[#1C1612] text-lg">{method.name}</p>
                            <p className="text-[10px] text-[#9A8A72] font-black uppercase tracking-widest mt-1">{method.desc}</p>
                          </div>
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                            selectedMethod === method.id ? "bg-[#D97230] border-[#D97230]" : "border-[#EAE3D9]"
                          )}>
                            {selectedMethod === method.id && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      ))}

                      <div className="pt-12">
                        <button 
                          onClick={handlePayment}
                          disabled={!selectedMethod || isProcessing}
                          className="btn-primary w-full py-6 text-base font-black uppercase tracking-[0.2em] shadow-2xl disabled:opacity-30"
                        >
                          {isProcessing ? "Procesando pago..." : "Finalizar Compra"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>

          {/* ── Resumen de Compra (Derecha) ───────────────────────── */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-[#1C1612] rounded-3xl p-10 xl:p-12 text-white shadow-2xl sticky top-32 border border-white/5 overflow-hidden">
              {/* Sutil gradiente de fondo */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#D97230] rounded-full blur-[90px] opacity-10" />
              
              <h3 className="text-2xl font-black mb-10 flex items-center gap-4 tracking-tight">
                <ShieldCheck className="text-[#D97230]" size={28} />
                Resumen
              </h3>

              <div className="space-y-8 mb-10 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar-dark">
                {items.map(item => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner">🛼</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white/90 text-sm truncate">{item.product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-[9px] text-[#D97230] font-black uppercase tracking-widest bg-[#D97230]/10 px-2 py-0.5 rounded">Cant: {item.quantity}</span>
                         <p className="font-black text-white text-base">{formatPrice(item.unitPrice * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 space-y-5">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <span>Envío</span>
                  <span className="text-[#D97230] border border-[#D97230]/30 bg-[#D97230]/5 px-3 py-1 rounded-full text-[9px]">¡Gratis!</span>
                </div>
                <div className="flex justify-between items-end pt-8 border-t border-white/10">
                  <span className="text-lg font-bold text-white/20 uppercase tracking-widest mb-1">Total</span>
                  <span className="text-4xl font-black text-white tracking-tighter leading-none">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-4 text-white/30 group hover:text-white/50 transition-colors">
                  <Lock size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Pago 100% Seguro</span>
                </div>
                <div className="flex items-center gap-4 text-white/30 group hover:text-white/50 transition-colors">
                  <Truck size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Envío Prioritario</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#9A8A72] block ml-2">{label}</label>
      <input 
        {...props}
        className="w-full px-8 py-5 bg-[#FAF7F2] border-2 border-transparent rounded-2xl text-[#1C1612] font-black placeholder:text-[#D8CEBC]/40 focus:border-[#D97230]/30 focus:bg-white transition-all outline-none text-base shadow-inner"
      />
    </div>
  );
}
