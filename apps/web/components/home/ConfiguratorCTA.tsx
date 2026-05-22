'use client';

// ============================================================
// SOBRE RUEDAS — ConfiguratorCTA
// Sección oscura con acento naranja — referencia
// ============================================================

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

const STEPS = [
  { step: 1, label: 'Elegí tu nivel', icon: '⭐' },
  { step: 2, label: 'Seleccioná la bota', icon: <img src="/images/products/risport-royal-pro.png" alt="Bota" className="w-7 h-7 object-contain drop-shadow-sm" /> },
  { step: 3, label: 'Elegí la plancha', icon: <img src="/images/products/plancha-magic1.png" alt="Plancha" className="w-7 h-7 object-contain drop-shadow-sm" /> },
  { step: 4, label: 'Configurá las ruedas', icon: <img src="/images/products/wheels-angel.png" alt="Ruedas" className="w-7 h-7 object-contain drop-shadow-sm" /> },
  { step: 5, label: 'Setup final y checkout', icon: '✅' },
];

export default function ConfiguratorCTA() {
  return (
    <section className="section-padding bg-[#E6C9C9] text-[#1C1612] overflow-hidden relative">
      {/* Glow naranja más sutil sobre fondo claro */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(217,114,48,0.1), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.4), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="container-apple relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Texto izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, type: "spring" as const, bounce: 0.4 }}
            className="flex flex-col items-center text-center md:items-start md:text-left w-full"
          >
            <span className="badge badge-accent mb-6 inline-flex justify-center shadow-sm bg-white border-transparent text-center">
              Configurador
            </span>
            <h2 className="text-[#1C1612] text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              Armá tu patín
              <br />
              <span className="text-[#D97230]">
                perfecto.
              </span>
            </h2>
            <p className="text-[#1C1612]/70 text-sm leading-relaxed mb-8 max-w-md font-medium">
              Nuestro configurador interactivo te guía paso a paso para crear el setup ideal según tu nivel y disciplina. Planchas filtradas por compatibilidad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/arma-el-tuyo" className="btn-primary gap-2 text-sm shadow-xl hover:scale-105 transition-transform">
                Empezar ahora
                <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/5491112345678?text=${encodeURIComponent('Hola! Quiero asesoramiento para armar mi setup de patines.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost border-[#1C1612]/10 text-[#1C1612] hover:bg-white hover:border-transparent hover:shadow-lg gap-2 text-sm"
              >
                <MessageCircle size={16} />
                Asesoramiento
              </a>
            </div>
          </motion.div>

          {/* Steps derecha */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="flex items-center gap-5 p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm hover:shadow-md hover:bg-white transition-all group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-white shadow-sm shrink-0"
                >
                  {s.icon}
                </motion.div>
                <div className="flex-1">
                  <p className="text-[#D97230] text-[10px] font-bold uppercase tracking-wider mb-1">
                    Paso {s.step}
                  </p>
                  <p className="text-[#1C1612] text-base font-semibold">{s.label}</p>
                </div>
                <motion.div
                  initial={{ x: -5, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <ArrowRight size={18} className="text-[#1C1612]/30 group-hover:text-[#D97230] group-hover:translate-x-1 transition-all" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
