'use client';

// ============================================================
// SOBRE RUEDAS — Armá el tuyo (Wizard)
// Fase 4: Configurador de patines a medida
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfiguratorStore } from '@/store/configuratorStore';
import StepLevel from '@/components/configurator/steps/StepLevel';
import StepBoot from '@/components/configurator/steps/StepBoot';
import StepPlate from '@/components/configurator/steps/StepPlate';
import StepWheels from '@/components/configurator/steps/StepWheels';
import StepSummary from '@/components/configurator/steps/StepSummary';
import ConfiguratorFooter from '@/components/configurator/ConfiguratorFooter';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  { id: 1, title: 'Nivel', subtitle: 'Tu experiencia' },
  { id: 2, title: 'Bota', subtitle: 'Soporte y confort' },
  { id: 3, title: 'Plancha', subtitle: 'Estabilidad' },
  { id: 4, title: 'Componentes', subtitle: 'Ruedas y frenos' },
  { id: 5, title: 'Resumen', subtitle: 'Tu configuración' },
];

export default function ConfiguratorPage() {
  const { currentStep, prevStep } = useConfiguratorStore();

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex flex-col pt-[116px]">
      {/* Header del Configurador */}
      <div className="bg-white border-b border-[#F5F0EA] py-6 sticky top-[52px] z-40">
        <div className="container-apple">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link href="/" className="p-2 hover:bg-[#FAF7F2] rounded-full transition-colors text-[#9A8A72]">
                <ChevronLeft size={20} />
              </Link>
              <div>
                <h1 className="text-[#1C1612] text-2xl font-black tracking-tighter">Armá el tuyo</h1>
                <p className="text-[#9A8A72] text-xs font-bold uppercase tracking-widest">
                  Paso {currentStep} de 5: {STEPS.find(s => s.id === currentStep)?.title}
                </p>
              </div>
            </div>

            {/* Stepper Visual */}
            <div className="flex items-center gap-2">
              {STEPS.map((step) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`w-10 h-1.5 rounded-full transition-all duration-500 ${
                      step.id <= currentStep ? 'bg-[#D97230]' : 'bg-[#EAE3D9]'
                    }`}
                  />
                  {step.id < 5 && <div className="w-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Dinámico con Transiciones */}
      <div className="flex-1 overflow-x-hidden">
        <div className="container-apple py-12 md:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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
    case 2: return <StepBoot />;
    case 3: return <StepPlate />;
    case 4: return <StepWheels />;
    case 5: return <StepSummary />;
    default: return <StepLevel />;
  }
}
