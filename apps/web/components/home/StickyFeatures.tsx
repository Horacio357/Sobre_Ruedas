'use client';

// ============================================================
// SOBRE RUEDAS — Sticky Features (Apple  Style)
// Scroll interactivo: Producto fijo y textos que deslizan
// ============================================================

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FEATURES = [
  {
    title: 'Precisión Milimétrica',
    desc: 'Cada componente es ensamblado a mano por expertos, garantizando un equilibrio perfecto en cada salto.',
    color: '#D97230',
    img: 'https://i.ibb.co/wNWB1hsW/93-1.jpg' // Roll-Line Giotto
  },
  {
    title: 'Soporte de Élite',
    desc: 'Botas diseñadas con tecnología ergonómica que se adapta a la forma de tu pie para un control absoluto.',
    color: '#B08B8B',
    img: 'https://i.ibb.co/xtjGfZQX/93-7.jpg' // Risport RF3
  },
  {
    title: 'Durabilidad Eterna',
    desc: 'Materiales de grado aeronáutico que resisten el desgaste del entrenamiento de alto rendimiento.',
    color: '#1C1612',
    img: 'https://i.ibb.co/PvQvS3TF/95-1.jpg' // Komplex wheels
  }
];

export default function StickyFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} className="relative bg-white">
      <div className="grid lg:grid-cols-2">
        
        {/* Lado Izquierdo: Producto Sticky */}
        <div className="hidden lg:block h-screen sticky top-0 overflow-hidden bg-[#FFF9F9]">
          <div className="absolute inset-0 flex items-center justify-center p-20">
            {FEATURES.map((feature, index) => {
              const start = index / FEATURES.length;
              const end = (index + 1) / FEATURES.length;
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const scale = useTransform(scrollYProgress, [start, end], [0.8, 1.1]);
              
              return (
                <motion.div
                  key={index}
                  style={{ opacity, scale }}
                  className="absolute inset-0 flex items-center justify-center p-24"
                >
                  <img 
                    src={feature.img} 
                    alt={feature.title}
                    className="max-h-full w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] mix-blend-multiply"
                  />
                </motion.div>
              );
            })}
          </div>
          
          {/* Progress Bar Vertical */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 h-40 w-[2px] bg-[#F9EAEA] rounded-full overflow-hidden">
             <motion.div 
               style={{ scaleY: scrollYProgress, originY: 0 }}
               className="w-full h-full bg-[#D97230]"
             />
          </div>
        </div>

        {/* Lado Derecho: Textos que scrollean */}
        <div className="space-y-[50vh] py-[25vh] px-8 md:px-20 lg:px-32">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-20%' }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-md"
            >
              <span 
                className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 block"
                style={{ color: feature.color }}
              >
                Innovación 0{index + 1}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#1C1612] tracking-tighter leading-tight mb-6">
                {feature.title}
              </h2>
              <p className="text-lg text-[#B08B8B] leading-relaxed font-light">
                {feature.desc}
              </p>
              
              <div className="mt-12 lg:hidden rounded-[40px] overflow-hidden shadow-2xl border border-[#F9EAEA] bg-[#FFF9F9] p-8">
                <img src={feature.img} alt={feature.title} className="w-full h-auto mix-blend-multiply" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
