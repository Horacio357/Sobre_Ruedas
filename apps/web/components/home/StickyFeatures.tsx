'use client';

// ============================================================
// SOBRE RUEDAS — Sticky Features (Apple  Style)
// Scroll interactivo: Producto fijo y textos que deslizan
// ============================================================

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FEATURES = [
  {
    title: 'Soporte de Élite',
    desc: 'Botas termoformables diseñadas con anatomía de precisión italiana que proporciona soporte óptimo y máximo confort al tobillo.',
    color: '#B08B8B',
    img: '/images/products/risport-rf1-elite.png'
  },
  {
    title: 'Precisión Milimétrica',
    desc: 'Cada plancha es mecanizada con control numérico en aluminio de grado aeronáutico, ofreciendo la respuesta más rápida en cada salto técnico.',
    color: '#D97230',
    img: '/images/products/plancha-magic1.png'
  },
  {
    title: 'Desplazamiento Infinito',
    desc: 'Ruedas de alta tecnología con núcleos elásticos para un agarre excepcional en pista de competencia y máxima velocidad.',
    color: '#1C1612',
    img: '/images/products/wheels-angel.png'
  }
];

export default function StickyFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Spring physics for organic scrolling momentum and buttery smooth transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative bg-white">
      <div className="grid lg:grid-cols-2">
        
        {/* Lado Izquierdo: Producto Sticky */}
        <div className="hidden lg:block h-screen sticky top-0 overflow-hidden bg-[#FFF9F9]">
          <div className="absolute inset-0 flex items-center justify-center p-20">
            {FEATURES.map((feature, index) => {
              // Smooth continuous cross-fade overlapping ranges to completely eliminate empty screen gaps
              const getOpacityRange = (i: number) => {
                if (i === 0) return {
                  input: [0, 0.28, 0.42],
                  output: [1, 1, 0]
                };
                if (i === 1) return {
                  input: [0.22, 0.36, 0.62, 0.76],
                  output: [0, 1, 1, 0]
                };
                return {
                  input: [0.56, 0.70, 1.0],
                  output: [0, 1, 1]
                };
              };
              
              // Apple-style depth scale: glide from distance, rest at center, scale forward on exit
              const getScaleRange = (i: number) => {
                if (i === 0) return {
                  input: [0, 0.28, 0.42],
                  output: [1, 1, 1.08]
                };
                if (i === 1) return {
                  input: [0.22, 0.36, 0.62, 0.76],
                  output: [0.92, 1, 1, 1.08]
                };
                return {
                  input: [0.56, 0.70, 1.0],
                  output: [0.92, 1, 1]
                };
              };

              // Elegant floating translation (glide up and down on scroll)
              const getYRange = (i: number) => {
                if (i === 0) return {
                  input: [0, 0.28, 0.42],
                  output: [0, 0, -60]
                };
                if (i === 1) return {
                  input: [0.22, 0.36, 0.62, 0.76],
                  output: [60, 0, 0, -60]
                };
                return {
                  input: [0.56, 0.70, 1.0],
                  output: [60, 0, 0]
                };
              };

              // Subtle physical 3D rotation (tumble)
              const getRotateRange = (i: number) => {
                if (i === 0) return {
                  input: [0, 0.28, 0.42],
                  output: [0, 0, -4]
                };
                if (i === 1) return {
                  input: [0.22, 0.36, 0.62, 0.76],
                  output: [4, 0, 0, -4]
                };
                return {
                  input: [0.56, 0.70, 1.0],
                  output: [4, 0, 0]
                };
              };
              
              const opacityRange = getOpacityRange(index);
              const scaleRange = getScaleRange(index);
              const yRange = getYRange(index);
              const rotateRange = getRotateRange(index);
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(smoothProgress, opacityRange.input, opacityRange.output);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const scale = useTransform(smoothProgress, scaleRange.input, scaleRange.output);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(smoothProgress, yRange.input, yRange.output);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const rotate = useTransform(smoothProgress, rotateRange.input, rotateRange.output);
              
              return (
                <motion.div
                  key={index}
                  style={{ opacity, scale, y, rotate }}
                  className="absolute inset-0 flex items-center justify-center p-24"
                >
                  <img 
                    src={feature.img} 
                    alt={feature.title}
                    className="max-h-[75%] w-auto object-contain drop-shadow-[0_24px_48px_rgba(217,114,48,0.18)]"
                   referrerPolicy="no-referrer" />
                </motion.div>
              );
            })}
          </div>
          
          {/* Progress Bar Vertical */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 h-40 w-[2px] bg-[#F9EAEA] rounded-full overflow-hidden">
             <motion.div 
                style={{ scaleY: smoothProgress, originY: 0 }}
                className="w-full h-full bg-[#D97230]"
             />
          </div>
        </div>

        {/* Lado Derecho: Textos que scrollean con aire y espaciado majestuoso */}
        <div className="relative py-[15vh] lg:py-0 px-6 md:px-20 lg:px-32 z-10">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-20%' }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-md w-full mx-auto lg:mx-0 min-h-[60vh] lg:min-h-[120vh] flex flex-col justify-center py-20 lg:py-0 mb-32 lg:mb-0"
            >
              <span 
                className="text-[12px] font-bold uppercase tracking-[0.4em] mb-6 block"
                style={{ color: feature.color }}
              >
                Innovación 0{index + 1}
              </span>
              <h2 className="text-[clamp(1.85rem,4vw,2.75rem)] font-bold text-[#1C1612] tracking-tighter leading-tight mb-10">
                {feature.title}
              </h2>
              <p className="text-xl text-[#B08B8B] leading-relaxed font-light mb-16">
                {feature.desc}
              </p>
              
              <div className="lg:hidden rounded-[32px] overflow-hidden shadow-lg border border-[#F9EAEA] bg-white/60 p-8 flex items-center justify-center aspect-square max-w-sm mx-auto mt-12 mb-20">
                <img src={feature.img} alt={feature.title} className="max-h-[85%] w-auto object-contain"  referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
