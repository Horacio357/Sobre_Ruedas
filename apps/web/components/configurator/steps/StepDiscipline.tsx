'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { Feather, Music, Activity, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DISCIPLINES = [
  {
    id: 'libre',
    title: 'Libre',
    icon: Feather,
  },
  {
    id: 'danza',
    title: 'Danza',
    icon: Music,
  },
  {
    id: 'figuras',
    title: 'Figuras Obligatorias',
    icon: Activity,
  },
  {
    id: 'saltos',
    title: 'Saltos',
    icon: ArrowUpRight,
  },
];

export default function StepDiscipline() {
  const { discipline: selectedDiscipline, setDiscipline, nextStep } = useConfiguratorStore();

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-12">
        <h2 className="text-[#1C1612] text-3xl md:text-4xl font-bold tracking-tight mb-3">¿Qué disciplina practicás?</h2>
        <p className="text-[#9A8A72] text-sm md:text-base font-medium">
          Elegí la disciplina que más se adapta a vos.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {DISCIPLINES.map((disc, i) => (
          <motion.button
            key={disc.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            onClick={() => {
              setDiscipline(disc.id);
              setTimeout(nextStep, 400);
            }}
            className={cn(
              "group relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-2xl border bg-white transition-all duration-300",
              selectedDiscipline === disc.id
                ? "border-[#D97230] shadow-[0_10px_40px_-10px_rgba(217,114,48,0.2)]"
                : "border-[#EAE3D9] hover:border-[#9A8A72] hover:shadow-md"
            )}
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="mb-4 text-[#1C1612] transition-transform"
            >
              <disc.icon size={48} strokeWidth={1} />
            </motion.div>
            
            <h3 className="text-[#1C1612] text-sm md:text-base font-bold leading-tight">{disc.title}</h3>
            
            {/* Indicador de selección */}
            <div className={cn(
              "absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
              selectedDiscipline === disc.id 
                ? "border-[#D97230] bg-[#D97230]" 
                : "border-[#EAE3D9]"
            )}>
              {selectedDiscipline === disc.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
