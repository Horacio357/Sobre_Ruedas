'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { Leaf, Flame, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const LEVELS = [
  {
    id: 'principiante',
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

export default function StepLevel() {
  const { level: selectedLevel, setLevel, nextStep } = useConfiguratorStore();

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-[#1C1612] text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">¿Cuál es tu nivel?</h2>
        <p className="text-[#9A8A72] text-sm md:text-base font-medium">
          Esto nos ayuda a recomendarte el patín ideal para vos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {LEVELS.map((level, i) => (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            onClick={() => {
              setLevel(level.id as any);
              setTimeout(nextStep, 400);
            }}
            className={cn(
              "group relative flex flex-col items-center text-center p-6 md:p-10 rounded-2xl border bg-white transition-all duration-300",
              selectedLevel === level.id
                ? "border-[#D97230] shadow-[0_10px_40px_-10px_rgba(217,114,48,0.2)]"
                : "border-[#EAE3D9] hover:border-[#9A8A72] hover:shadow-md"
            )}
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={cn("mb-6 transition-colors", level.color)}
            >
              <level.icon size={48} strokeWidth={1.5} />
            </motion.div>
            
            <h3 className="text-[#1C1612] text-xl font-bold mb-2">{level.title}</h3>
            <p className="text-[#9A8A72] text-sm leading-relaxed font-medium">
              {level.desc}
            </p>
            
            {/* Indicador de selección */}
            <div className={cn(
              "absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
              selectedLevel === level.id 
                ? "border-[#D97230] bg-[#D97230]" 
                : "border-[#EAE3D9]"
            )}>
              {selectedLevel === level.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
