'use client';

// ============================================================
// SOBRE RUEDAS — Hero Section (Apple  Style)
// Scroll-Triggered Animations, Zoom, Parallax
// ============================================================

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Spring animations for smoother feeling
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const scale = useTransform(smoothProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, -5]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const y = useTransform(smoothProgress, [0, 1], [0, 200]);
  const blur = useTransform(smoothProgress, [0, 1], ['blur(0px)', 'blur(20px)']);

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-[#FFF9F9] overflow-hidden"
      aria-label="Hero — Sobre Ruedas"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Atmosphere */}
        <motion.div 
          style={{ opacity, filter: blur }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(217,114,48,0.1) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute right-[-10%] top-[20%] w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(217,114,48,0.05) 0%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Content Layer */}
        <motion.div
          style={{ scale, rotate, opacity, y }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#F9EAEA] text-[10px] font-bold uppercase tracking-[0.2em] text-[#D97230] mb-10 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97230] animate-pulse" />
              Nueva Colección 2024
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-[clamp(2.5rem,8vw,6rem)] font-extralight leading-[1.05] tracking-tighter text-[#1C1612] mb-12 md:mb-16"
          >
            La perfección
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97230] to-[#C4972A]">
              en cada giro.
            </span>
          </motion.h1>

          {/* CTAs */}
          <motion.div
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/arma-el-tuyo" className="btn-primary px-12 py-5 text-base gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all">
              Configurar mis patines
              <ArrowRight size={20} />
            </Link>
            <Link href="/patines" className="text-sm font-bold uppercase tracking-[0.3em] text-[#1C1612]/60 hover:text-[#1C1612] transition-colors">
              Explorar Catálogo
            </Link>
          </motion.div>

          {/* Main Hero Product (Floating Effect) */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" as const }}
            className="mt-10 md:mt-20 flex justify-center"
          >
             <div className="relative group">
                {/* Glow behind product */}
                <div className="absolute inset-0 bg-[#D97230]/20 blur-[100px] rounded-full scale-75 group-hover:scale-110 transition-transform duration-1000" />
                <img 
                  src="https://i.ibb.co/3yGbSNHB/96-6.jpg"
                  alt="Patín Artístico Premium"
                  className="relative h-[400px] w-auto object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.15)] hover:-translate-y-4 transition-transform duration-700"
                />
             </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#B08B8B]"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Descubre más</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} strokeWidth={1} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
