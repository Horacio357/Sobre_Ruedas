'use client';

// ============================================================
// SOBRE RUEDAS — Configurator Footer
// Controles de navegación del wizard
// ============================================================

import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

const STEPS = [
  { id: 1, title: 'Nivel' },
  { id: 2, title: 'Disciplina' },
  { id: 3, title: 'Bota' },
  { id: 4, title: 'Plancha' },
  { id: 5, title: 'Ruedas' },
  { id: 6, title: 'Resumen' },
];

export default function ConfiguratorFooter() {
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    isStepComplete,
    totalArs 
  } = useConfiguratorStore();

  const isComplete = isStepComplete(currentStep);
  const nextStepLabel = STEPS[currentStep]?.title;

  if (currentStep === 6) return null;

  return (
    <footer className="relative w-full mt-8 md:mt-16 pb-16">
      <div className="container-apple">
        {/* Subtle Divider */}
        <div className="flex items-center gap-6 mb-10 opacity-15">
          <div className="h-[1px] flex-1 bg-[#1C1612]" />
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-[#1C1612] translate-x-[0.3em]">Navegación</span>
          <div className="h-[1px] flex-1 bg-[#1C1612]" />
        </div>

        <div className="flex items-center justify-between gap-6 max-w-5xl mx-auto">
          {/* Botón Volver */}
          <div className="flex flex-col items-start gap-1.5">
            {currentStep > 1 && (
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-sr-gray-400 opacity-60 ml-3">Anterior</span>
            )}
            <button
              onClick={prevStep}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-[9px] uppercase tracking-[0.3em] transition-all",
                currentStep === 1 
                  ? "opacity-0 pointer-events-none" 
                  : "text-sr-gray-400 hover:bg-white hover:text-sr-gray-900 border border-sr-gray-100 hover:border-sr-gray-200 bg-sr-cream"
              )}
            >
              <ChevronLeft size={12} />
              Atrás
            </button>
          </div>

          {/* Info central (solo desktop) */}
          <div className="hidden lg:flex flex-col items-center">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-sr-gray-400 mb-1 opacity-50">Configuración Actual</span>
            <span className="text-xl font-black text-sr-gray-900 tracking-tightest">{formatPrice(totalArs)}</span>
          </div>

          {/* Botón Siguiente */}
          <div className="flex flex-col items-end gap-1.5">
            {isComplete && currentStep < 6 && (
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-sr-accent mr-3 animate-pulse">
                Próximo: {nextStepLabel}
              </span>
            )}
            <button
              onClick={nextStep}
              disabled={!isComplete || (currentStep as number) === 6}
              className={cn(
                "flex items-center gap-2 px-8 py-2.5 rounded-full font-black text-[9px] uppercase tracking-[0.3em] transition-all",
                !isComplete || (currentStep as number) === 6
                  ? "opacity-0 pointer-events-none"
                  : "bg-sr-gray-900 text-white hover:bg-sr-accent shadow-md hover:shadow-sr-accent/20 hover:scale-105 active:scale-95"
              )}
            >
              {currentStep === 5 ? 'Resumen Final' : 'Siguiente'}
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
