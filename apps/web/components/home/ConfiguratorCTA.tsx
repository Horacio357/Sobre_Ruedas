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
  { step: 2, label: 'Seleccioná la bota', icon: <img src="https://i.ibb.co/qYPZYx5y/6-1.png" alt="Bota" className="w-6 h-6 object-contain mix-blend-screen opacity-80" /> },
  { step: 3, label: 'Elegí la plancha', icon: <img src="https://i.ibb.co/hx3GqB85/2-4.png" alt="Plancha" className="w-6 h-6 object-contain mix-blend-screen opacity-80" /> },
  { step: 4, label: 'Configurá las ruedas', icon: <img src="https://i.ibb.co/mVmvF5tZ/patin.png" alt="Ruedas" className="w-6 h-6 object-contain mix-blend-screen opacity-80" /> },
  { step: 5, label: 'Setup final y checkout', icon: '✅' },
];

export default function ConfiguratorCTA() {
  return (
    <section className="section-padding bg-[#1C1612] text-white overflow-hidden relative">
      {/* Glow naranja */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(217,114,48,0.18) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(196,151,42,0.10) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="container-apple relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Texto izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="badge badge-accent mb-6 inline-flex">
              Configurador
            </span>
            <h2 className="text-white text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight leading-tight mb-6">
              Armá tu patín
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #D97230, #C4972A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                perfecto.
              </span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
              Nuestro configurador interactivo te guía paso a paso para crear el setup ideal según tu nivel y disciplina. Planchas filtradas por compatibilidad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/arma-el-tuyo" className="btn-primary gap-2 text-sm">
                Empezar ahora
                <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/5491112345678?text=${encodeURIComponent('Hola! Quiero asesoramiento para armar mi setup de patines.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost border-white/20 text-white hover:bg-white hover:text-[#1C1612] gap-2 text-sm"
              >
                <MessageCircle size={16} />
                Asesoramiento
              </a>
            </div>
          </motion.div>

          {/* Steps derecha */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-2.5"
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-4 p-3.5 rounded-lg bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] hover:border-[#D97230]/30 transition-all group"
              >
                <div className="w-9 h-9 rounded flex items-center justify-center text-xl bg-white/[0.06] shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white/30 text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                    Paso {s.step}
                  </p>
                  <p className="text-white text-sm font-semibold">{s.label}</p>
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-[#D97230] transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
