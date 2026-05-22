'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { Leaf, Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const LEVELS = [
  {
    id: 'iniciacion',
    title: 'Principiante',
    desc: 'Estoy comenzando a patinar',
    icon: Leaf,
    color: 'text-green-500',
  },
  {
    id: 'intermedio',
    title: 'Intermedio',
    desc: 'Ya tengo experiencia y quiero mejorar',
    icon: Flame,
    color: 'text-yellow-500',
  },
  {
    id: 'avanzado',
    title: 'Avanzado',
    desc: 'Entreno seguido o compito',
    icon: Zap,
    color: 'text-red-500',
  },
];

import { Check, ChevronRight } from 'lucide-react';

export default function StepLevel() {
  const { level: selectedLevel, setLevel, nextStep } = useConfiguratorStore();

  const handleSelect = (id: any) => {
    setLevel(id);
    if (selectedLevel === id) {
      nextStep();
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full py-16 md:py-24">
      <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24 w-full">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#D97230] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 block text-center"
        >
          Paso 1 de 6: Tu Experiencia
        </motion.span>
        <h2 className="text-[#1C1612] text-3xl md:text-4xl font-black tracking-tightest mb-4 leading-none text-center">¿Cuál es tu nivel?</h2>
        <p className="text-[#1C1612]/50 text-sm md:text-base font-medium max-w-lg mx-auto opacity-80 leading-relaxed px-4 text-center">
          Para recomendarte el equipo exacto, necesitamos conocer tu punto de partida.
        </p>
      </div>

      <div 
        role="radiogroup" 
        aria-label="Selecciona tu nivel de experiencia"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-6"
      >
        {LEVELS.map((level, i) => (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleSelect(level.id)}
            role="radio"
            aria-checked={selectedLevel === level.id}
            tabIndex={0}
            className={cn(
              "group relative flex flex-col items-center text-center p-6 md:p-12 rounded-[2.5rem] border-2 bg-white transition-all duration-500",
              selectedLevel === level.id
                ? "border-[#D97230] shadow-[0_20px_50px_-12px_rgba(217,114,48,0.15)] scale-[1.03]"
                : "border-[#F5F0EA] hover:border-[#EAE3D9] opacity-60 hover:opacity-100"
            )}
          >
            <motion.div 
              whileHover={{ scale: 1.08 }}
              className={cn("mb-6 p-5 rounded-full bg-[#FAF7F2] transition-colors shadow-sm", level.color)}
            >
              <level.icon size={36} strokeWidth={1.5} />
            </motion.div>
            
            <h3 className="text-sr-gray-900 text-lg md:text-xl font-black mb-2 tracking-tight">{level.title}</h3>
            <p className="text-sr-gray-400 text-xs md:text-sm leading-relaxed font-medium">
              {level.desc}
            </p>
            
            <AnimatePresence>
              {selectedLevel === level.id && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onAnimationComplete={() => {
                    nextStep();
                  }}
                  className="absolute top-5 right-5 bg-[#D97230] text-white rounded-full p-1.5 shadow-lg"
                >
                  <Check size={20} strokeWidth={4} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
