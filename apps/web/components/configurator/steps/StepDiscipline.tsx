'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { Feather, Music, Activity, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DISCIPLINES = [
  {
    id: 'libre',
    title: 'Libre',
    desc: 'Salto y giros extremos.',
    icon: Feather,
  },
  {
    id: 'danza',
    title: 'Danza',
    desc: 'Elegancia y precisión.',
    icon: Music,
  },
  {
    id: 'figuras',
    title: 'Figuras Obligatorias',
    desc: 'Control y trazado puro.',
    icon: Activity,
  },
  {
    id: 'saltos',
    title: 'Saltos',
    desc: 'Potencia y elevación.',
    icon: ArrowUpRight,
  },
];

import { Check, ChevronRight } from 'lucide-react';

export default function StepDiscipline() {
  const { discipline: selectedDiscipline, setDiscipline, nextStep } = useConfiguratorStore();

  const handleSelect = (id: string) => {
    setDiscipline(id);
    setTimeout(nextStep, 600);
  };

  return (
    <div className="max-w-6xl mx-auto w-full py-16 md:py-24">
      <div className="text-center mb-16 md:mb-24">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#D97230] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 block"
        >
          Paso 2 de 6: Tu Estilo
        </motion.span>
        <h2 className="text-[#1C1612] text-hero-sm font-black tracking-tightest mb-4 leading-none">¿Qué disciplina practicás?</h2>
        <p className="text-[#1C1612]/50 text-sm md:text-base font-medium max-w-lg mx-auto opacity-80 leading-relaxed px-4">
          Cada especialidad requiere una ingeniería de precisión diferente.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 mb-16 px-6">
        {DISCIPLINES.map((disc, i) => (
          <motion.button
            key={disc.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleSelect(disc.id)}
            className={cn(
              "group relative flex flex-col items-center justify-center text-center p-6 md:p-10 rounded-[2.5rem] border-2 bg-white transition-all duration-500",
              selectedDiscipline === disc.id
                ? "border-[#D97230] shadow-[0_20px_50px_-12px_rgba(217,114,48,0.15)] scale-[1.03]"
                : "border-[#F5F0EA] hover:border-[#EAE3D9] opacity-60 hover:opacity-100"
            )}
          >
            <motion.div 
              whileHover={{ scale: 1.08, rotate: 8 }}
              className="mb-5 text-[#1C1612] p-4 rounded-full bg-[#FAF7F2] transition-transform"
            >
              <disc.icon size={36} strokeWidth={1.5} />
            </motion.div>
            
            <h3 className="text-sr-gray-900 text-lg md:text-xl font-black mb-2 tracking-tight">{disc.title}</h3>
            <p className="text-sr-gray-400 text-xs md:text-sm leading-relaxed font-medium">
              {disc.desc}
            </p>
            
            <AnimatePresence>
              {selectedDiscipline === disc.id && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-4 right-4 bg-[#D97230] text-white rounded-full p-1.5 shadow-lg"
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
