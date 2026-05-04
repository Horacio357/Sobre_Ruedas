'use client';

// ============================================================
// SOBRE RUEDAS — Step 1: Nivel
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { Star, Zap, Trophy, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

const LEVELS = [
  {
    id: 'iniciacion',
    title: 'Iniciación',
    desc: 'Ideal para quienes dan sus primeros pasos en el patinaje artístico.',
    icon: Medal,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'intermedio',
    title: 'Intermedio',
    desc: 'Para patinadores que ya dominan lo básico y empiezan con saltos simples.',
    icon: Star,
    color: 'bg-green-50 text-green-600',
  },
  {
    id: 'avanzado',
    title: 'Avanzado',
    desc: 'Equipamiento técnico para perfeccionar saltos dobles y trompos.',
    icon: Zap,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    id: 'alto_rendimiento',
    title: 'Alto Rendimiento',
    desc: 'Máxima tecnología para competición de elite y saltos triples.',
    icon: Trophy,
    color: 'bg-purple-50 text-purple-600',
  },
];

export default function StepLevel() {
  const { level: selectedLevel, setLevel, nextStep } = useConfiguratorStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-[#1C1612] text-xl font-black mb-2">¿Cuál es tu nivel actual?</h2>
        <p className="text-[#6B5E4A] text-[13px] font-medium">
          Esto nos ayudará a filtrarte los componentes más adecuados para tu patinaje.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {LEVELS.map((level, i) => (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => {
              setLevel(level.id as any);
              setTimeout(nextStep, 400); // Pequeño delay para feedback visual
            }}
            className={cn(
              "group relative p-8 rounded-2xl border-2 text-left transition-all duration-300",
              selectedLevel === level.id
                ? "border-[#D97230] bg-white shadow-xl scale-[1.02]"
                : "border-white bg-white/60 hover:border-[#EAE3D9] hover:bg-white"
            )}
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", level.color)}>
              <level.icon size={24} />
            </div>
            
            <h3 className="text-[#1C1612] text-lg font-black mb-1">{level.title}</h3>
            <p className="text-[#6B5E4A] text-[12px] leading-relaxed mb-6 font-medium">
              {level.desc}
            </p>
            
            <div className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
              selectedLevel === level.id 
                ? "border-[#D97230] bg-[#D97230]" 
                : "border-[#EAE3D9]"
            )}>
              {selectedLevel === level.id && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>

            {/* Acento lateral */}
            {selectedLevel === level.id && (
              <motion.div 
                layoutId="level-accent"
                className="absolute inset-y-0 left-0 w-1.5 bg-[#D97230] rounded-l-2xl" 
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
