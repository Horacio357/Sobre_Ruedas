'use client';

// ============================================================
// SOBRE RUEDAS — Armá el tuyo (Wizard)
// Fase 4: Configurador de patines a medida
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import StepLevel from '@/components/configurator/steps/StepLevel';
import StepDiscipline from '@/components/configurator/steps/StepDiscipline';
import StepBoot from '@/components/configurator/steps/StepBoot';
import StepPlate from '@/components/configurator/steps/StepPlate';
import StepWheels from '@/components/configurator/steps/StepWheels';
import StepSummary from '@/components/configurator/steps/StepSummary';
import ConfiguratorFooter from '@/components/configurator/ConfiguratorFooter';
import { ChevronLeft, Check, Search, ShoppingBag, User as UserIcon } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 1, title: 'Nivel', subtitle: 'Tu experiencia' },
  { id: 2, title: 'Disciplina', subtitle: 'Tu estilo' },
  { id: 3, title: 'Bota', subtitle: 'Soporte y confort' },
  { id: 4, title: 'Plancha', subtitle: 'Estabilidad' },
  { id: 5, title: 'Ruedas', subtitle: 'Componentes' },
  { id: 6, title: 'Resumen', subtitle: 'Tu configuración' },
];

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
};

export default function ConfiguratorPage() {
  const { currentStep, direction } = useConfiguratorStore();

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col pt-[80px]">
      {/* Header estilo Wireframe */}
      <div className="bg-[#FAF7F2] py-2 md:py-4 sticky top-0 z-40 shadow-sm md:shadow-none">
        <div className="container-apple">
          
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <button className="p-2 text-[#1C1612] hover:bg-white rounded-full transition-colors">
              <Search size={18} className="md:w-5 md:h-5" />
            </button>
            <Link href="/" className="shrink-0">
              <Logo className="h-8 md:h-10 w-auto text-[#D97230]" />
            </Link>
            <div className="flex items-center gap-3 md:gap-4 text-[#1C1612]">
              <UserIcon size={18} className="md:w-5 md:h-5" />
              <ShoppingBag size={18} className="md:w-5 md:h-5" />
            </div>
          </div>

          {/* Stepper Visual Wireframe Style */}
          <div className="flex items-center justify-center max-w-lg mx-auto px-2 md:px-0">
            {STEPS.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative group">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 z-10",
                    step.id === currentStep ? "bg-[#D97230] text-white scale-110 shadow-md" :
                    step.id < currentStep ? "bg-[#1C1612] text-white" :
                    "bg-[#EAE3D9] text-[#9A8A72]"
                  )}>
                    {step.id < currentStep ? <Check size={12} strokeWidth={3} /> : step.id}
                  </div>
                  <span className="absolute -bottom-6 text-[9px] uppercase tracking-widest font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-[#1C1612]">
                    {step.title}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={cn(
                    "flex-1 h-[2px] mx-1 md:mx-2 transition-all duration-500",
                    step.id < currentStep ? "bg-[#1C1612]" : "bg-[#EAE3D9]"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>

      {/* Contenido Dinámico con Transiciones */}
      <div className="flex-1 overflow-x-hidden relative">
        <div className="container-apple py-8 md:py-16 pb-24 md:pb-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-6xl mx-auto"
            >
              {renderStep(currentStep)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer de Navegación */}
      <ConfiguratorFooter />
    </main>
  );
}

function renderStep(step: number) {
  switch (step) {
    case 1: return <StepLevel />;
    case 2: return <StepDiscipline />;
    case 3: return <StepBoot />;
    case 4: return <StepPlate />;
    case 5: return <StepWheels />;
    case 6: return <StepSummary />;
    default: return <StepLevel />;
  }
}
