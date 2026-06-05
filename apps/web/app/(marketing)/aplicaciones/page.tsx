'use client';

// ============================================================
// SOBRE RUEDAS — Aplicaciones Page (Apple  Premium Style)
// Fullscreen showcase, Interactive Carousel, Glassmorphic Details
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  ArrowLeft, 
  Sparkles, 
  Globe, 
  Users, 
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const APPS = [
  {
    id: 'training',
    name: 'Sobre Ruedas Training',
    type: 'App de Entrenamiento Profesional',
    badge: 'Popular',
    trial: '8 DÍAS DE PRUEBA GRATIS',
    tagline: 'El gimnasio y la pista de patinaje, en la palma de tu mano.',
    desc: 'Diseñada específicamente para entrenadores (coaches) y atletas de alto rendimiento. Planifica rutinas complejas, analiza saltos mediante inteligencia artificial de video, y entrena a patinadores de cualquier parte del mundo de forma remota.',
    price: 'Suscripción Premium tras los 8 días de prueba. Consulta planes personalizados para clubes.',
    img: '/images/training-app.png',
    bgGradient: 'from-[#D97230] to-[#E8BA50]',
    accentColor: '#D97230',
    features: [
      { icon: <Globe size={18} />, text: 'Entrenamiento Global Remoto' },
      { icon: <Sparkles size={18} />, text: 'Análisis de Saltos por IA' },
      { icon: <Users size={18} />, text: 'Gestión Completa de Alumnos' },
      { icon: <Clock size={18} />, text: 'Métricas de Telemetría en Tiempo Real' }
    ]
  },
  {
    id: 'social',
    name: 'Sobre Ruedas Social',
    type: 'Red Social de Patinaje',
    badge: 'Comunidad',
    trial: '100% GRATIS',
    tagline: 'Conecta, comparte y brilla junto a la comunidad global.',
    desc: 'La primera red social exclusiva para patinadores artísticos. Comparte tus progresos, sube videos de tus rutinas, obtén feedback de otros skaters de nivel avanzado y participa en los desafíos y rankings globales semanales.',
    price: 'Completamente gratuita. Disponible para iOS y Android.',
    img: '/images/social-app.png',
    bgGradient: 'from-[#1C1612] to-[#6B5E4A]',
    accentColor: '#1C1612',
    features: [
      { icon: <Users size={18} />, text: 'Muro de Comunidad Interactivo' },
      { icon: <Sparkles size={18} />, text: 'Desafíos Semanales con Premios' },
      { icon: <Globe size={18} />, text: 'Rankings por Disciplina y Nivel' },
      { icon: <ShieldCheck size={18} />, text: 'Espacio Seguro y Moderado' }
    ]
  }
];

export default function AplicacionesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === APPS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? APPS.length - 1 : prev - 1));
  };

  const activeApp = APPS[activeIndex];

  return (
    <main className="min-h-screen bg-[#FFF9F9] pt-32 pb-48 md:pt-48 md:pb-72 relative overflow-hidden" aria-label="Aplicaciones Sobre Ruedas">
      {/* Background blobs for premium depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-[10%] top-[10%] w-[600px] h-[600px] rounded-full bg-[#D97230]/5 blur-[120px]" />
        <div className="absolute -right-[10%] top-[40%] w-[600px] h-[600px] rounded-full bg-[#E8BA50]/5 blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12px] uppercase tracking-[0.4em] text-[#D97230] font-black block"
          >
            Ecosistema Digital
          </motion.span>
        </div>

        {/* Carousel Showcase */}
        <div className="relative max-w-[1300px] mx-auto mb-64 md:mb-80">
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            
            {/* Left side: Interactive mockup with floating cards */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1 relative">
              
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-[#D97230]/15 blur-[100px] rounded-full scale-125 opacity-70 transition-opacity duration-1000" />

              <motion.div 
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[240px] md:w-[260px] lg:w-[280px] aspect-[9/18.5] bg-[#1C1612] rounded-[48px] p-3 shadow-[0_40px_80px_rgba(217,114,48,0.25)] border-[6px] border-[#3A3128] overflow-hidden group"
              >
                
                {/* iPhone Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1C1612] rounded-full z-20" />
                
                {/* Carousel Image container */}
                <div className="w-full h-full rounded-[38px] overflow-hidden bg-[#FAF7F2] relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeApp.id}
                      src={activeApp.img}
                      alt={activeApp.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-full h-full object-cover"
                     referrerPolicy="no-referrer" />
                  </AnimatePresence>
                </div>

                {/* Glassmorphic Badge inside screen */}
                <div className="absolute bottom-6 inset-x-6 z-10 glass-dark rounded-[24px] p-5 text-center text-white">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D97230] mb-1.5 block">
                    {activeApp.trial}
                  </span>
                  <p className="text-[12px] font-medium tracking-tight text-white/90">
                    {activeApp.type}
                  </p>
                </div>
              </motion.div>

              {/* Floating micro-interactions */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 z-10 glass rounded-3xl p-5 shadow-lg hidden md:block max-w-[180px] border border-[#F9EAEA]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D97230]/10 flex items-center justify-center text-[#D97230]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#1C1612]">8 Días gratis</p>
                    <p className="text-[8px] text-[#B08B8B]">Acceso completo</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-28 md:bottom-32 -right-6 z-10 glass rounded-3xl p-5 shadow-lg hidden md:block max-w-[180px] border border-[#F9EAEA]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1C1612]/5 flex items-center justify-center text-[#1C1612]">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#1C1612]">Red Global</p>
                    <p className="text-[8px] text-[#B08B8B]">Patinadores y Coaches</p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Controls on Mobile/Overlay */}
              <div className="absolute inset-y-1/2 -inset-x-8 md:-inset-x-12 flex justify-between pointer-events-none">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-[#F9EAEA] text-[#1C1612] hover:border-[#D97230] hover:text-[#D97230] shadow-md flex items-center justify-center transition-all cursor-pointer pointer-events-auto hover:scale-105 active:scale-95"
                  aria-label="Anterior aplicación"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-[#F9EAEA] text-[#1C1612] hover:border-[#D97230] hover:text-[#D97230] shadow-md flex items-center justify-center transition-all cursor-pointer pointer-events-auto hover:scale-105 active:scale-95"
                  aria-label="Siguiente aplicación"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

            </div>

            {/* Right side: Detailed Description and features */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeApp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-10 md:gap-14"
                >
                  {/* Category & Badge */}
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D97230] bg-[#D97230]/5 px-4 py-2 rounded-full">
                      {activeApp.trial}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C1612]/60">
                      {activeApp.badge}
                    </span>
                  </div>

                  {/* Name and Tagline */}
                  <div>
                    <h2 className="text-[#1C1612] text-4xl md:text-5xl font-light tracking-tight mb-4">
                      {activeApp.name}
                    </h2>
                    <p className="text-xl text-[#D97230] font-medium tracking-tight">
                      {activeApp.tagline}
                    </p>
                  </div>

                  {/* Desc */}
                  <p className="text-[#B08B8B] text-base md:text-lg leading-relaxed font-light">
                    {activeApp.desc}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-6">
                    {activeApp.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: `${activeApp.accentColor}10`, color: activeApp.accentColor }}
                        >
                          {feature.icon}
                        </div>
                        <span className="text-sm font-medium text-[#1C1612] tracking-tight">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Price info block */}
                  <div className="p-6 bg-white border border-[#F9EAEA] rounded-[24px] flex items-start gap-4 shadow-sm mt-4 md:mt-8">
                    <div className="w-10 h-10 shrink-0 bg-[#D97230]/5 rounded-full flex items-center justify-center text-[#D97230]">
                      <Smartphone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1C1612] mb-1">CONDICIÓN Y DISPONIBILIDAD</p>
                      <p className="text-xs text-[#B08B8B] leading-relaxed font-light">{activeApp.price}</p>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Download Section (CTAs) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-white border border-[#F9EAEA] rounded-[48px] p-10 md:p-20 text-center shadow-lg relative overflow-hidden mt-20 md:mt-32"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2]/50 to-[#FFF9F9]/50 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-16 md:space-y-20">
            <span className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#F9EAEA] text-[9px] font-black uppercase tracking-[0.2em] text-[#D97230]">
              Descarga Inmediata
            </span>
            
            <div className="space-y-6 flex flex-col items-center justify-center w-full">
              <h2 className="text-[#1C1612] text-2xl md:text-4xl font-light tracking-tight leading-tight text-center">
                Instala la aplicación en tu celular
              </h2>
              <p className="text-[#B08B8B] text-sm md:text-base font-light leading-relaxed text-center max-w-2xl">
                Disponible ahora para cualquier dispositivo móvil. Si eres entrenador, aprovecha tus **8 días de prueba gratis** para conectar con patinadores de todo el mundo hoy mismo.
              </p>
            </div>

            {/* Apple & Android Symmetrical Dark Premium Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-10 pt-6 md:pt-10">
              <button 
                onClick={() => alert('¡Próximamente disponible en App Store!')}
                className="flex items-center gap-4 text-white px-10 py-5 rounded-[24px] shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#1C1612' }}
              >
                {/* Simple Apple Icon svg */}
                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,22c-1.28,0-1.69-.78-3.15-.78s-1.92.76-3.14.78c-1.34,0-2.31-1.33-3.15-2.53C4.5,17,3.21,11.39,4.95,8.36a5.66,5.66,0,0,1,4.8-2.88c1.3,0,2.52.9,3.32.9s1.82-.9,3.37-.74a5.27,5.27,0,0,1,4.13,2.88c-3.18,1.92-2.67,6.13.62,7.46A12,12,0,0,1,18.71,19.5M15.9,5.55A5.27,5.27,0,0,0,17.15,1.7a5.41,5.41,0,0,0-3.5,1.82,5,5,0,0,0-1.29,3.77A4.63,4.63,0,0,0,15.9,5.55Z"/>
                </svg>
                <div className="text-left leading-none">
                  <p className="text-[9px] uppercase tracking-wider text-white/60 mb-1.5">Consíguelo en el</p>
                  <p className="text-base font-bold tracking-tight text-white">App Store</p>
                </div>
              </button>

              <button 
                onClick={() => alert('¡Próximamente disponible en Google Play!')}
                className="flex items-center gap-4 text-white px-10 py-5 rounded-[24px] shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center hover:opacity-90 active:scale-95"
                style={{ backgroundColor: '#1C1612' }}
              >
                {/* Simple Play Store Icon svg */}
                <svg className="w-6 h-6 fill-current text-[#D97230]" viewBox="0 0 24 24">
                  <path d="M5,3.31a2,2,0,0,0-1,1.73V18.96a2,2,0,0,0,1,1.73L13.88,12Z M18,9.75,15.1,8.08,14.63,11.38Z M4.3,20.46,12.72,13.88,14.63,12.62,17.2,11.12Z M4.3,3.54,12.72,10.12,14.63,11.38,17.2,12.88Z"/>
                </svg>
                <div className="text-left leading-none">
                  <p className="text-[9px] uppercase tracking-wider text-white/60 mb-1.5">Disponible en</p>
                  <p className="text-base font-bold tracking-tight text-white">Google Play</p>
                </div>
              </button>
            </div>
            
            <p className="text-[10px] text-[#B08B8B] tracking-wider uppercase font-semibold pt-4">
              * La versión de entrenamiento requiere registro y acreditación de coach.
            </p>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="text-center mt-48 md:mt-64 mb-16">
          <Link href="/" className="btn-secondary gap-3 text-sm px-8 py-3.5 border border-[#F9EAEA] hover:border-[#D97230]">
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>

      </div>
    </main>
  );
}
