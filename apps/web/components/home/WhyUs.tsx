'use client';

// ============================================================
// SOBRE RUEDAS — WhyUs
// 4 props de valor con paleta warm crema
// ============================================================

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';

const VALUES = [
  {
    icon: Truck,
    title: 'Envíos a todo el país',
    description: 'Enviamos a cualquier punto de Argentina. Packaging seguro para tu equipo.',
  },
  {
    icon: ShieldCheck,
    title: 'Hasta 6 cuotas sin interés',
    description: 'Con tarjetas seleccionadas y hasta 12 cuotas con interés.',
  },
  {
    icon: HeartHandshake,
    title: 'Compra segura',
    description: 'Tus datos siempre protegidos. Pagos procesados con máxima seguridad.',
  },
  {
    icon: Zap,
    title: 'Atención personalizada',
    description: 'Estamos para ayudarte. Respondemos por WhatsApp de lunes a sábado.',
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding-sm bg-white border-t border-[#EAE3D9]" aria-labelledby="why-us-heading">
      <div className="container-apple">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F5F0EA] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={20} className="text-[#D97230]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1612] text-sm mb-1 uppercase tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-xs text-[#6B5E4A] leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
