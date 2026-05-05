'use client';

// ============================================================
// SOBRE RUEDAS — Configurator Footer
// Controles de navegación del wizard
// ============================================================

import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function ConfiguratorFooter() {
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    isStepComplete,
    totalArs 
  } = useConfiguratorStore();

  const isComplete = isStepComplete(currentStep);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#F5F0EA] py-4 md:py-6 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
      <div className="container-apple">
        <div className="flex items-center justify-between gap-4">
          {/* Botón Volver */}
          <button
            onClick={prevStep}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all",
              currentStep === 1 
                ? "opacity-0 pointer-events-none" 
                : "text-[#9A8A72] hover:bg-[#FAF7F2] hover:text-[#1C1612]"
            )}
          >
            <ChevronLeft size={18} />
            Atrás
          </button>

          {/* Info central (solo desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A8A72]">Total Estimado</span>
              <span className="text-xl font-bold text-[#1C1612] tracking-tighter">{formatPrice(totalArs)}</span>
            </div>
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={nextStep}
            disabled={!isComplete || currentStep === 6}
            className={cn(
              "flex items-center gap-2 px-10 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-md",
              !isComplete || currentStep === 6
                ? "bg-[#EAE3D9] text-[#9A8A72] cursor-not-allowed shadow-none"
                : "bg-[#D97230] text-white hover:bg-[#B85C20] hover:scale-105 active:scale-95"
            )}
          >
            {currentStep === 5 ? 'Ver Resumen' : 'Continuar'}
            {isComplete ? <ChevronRight size={18} /> : <div className="w-4 h-4 rounded-full border-2 border-[#9A8A72]/30 border-t-[#9A8A72] animate-spin ml-2" />}
          </button>
        </div>
      </div>
    </footer>
  );
}
