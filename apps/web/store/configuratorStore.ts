// ============================================================
// SOBRE RUEDAS — Configurator Store (Zustand)
// Gestiona el estado del wizard "Armá el tuyo"
// ============================================================

import { create } from 'zustand';
import type { SkateLevel, Product, ProductVariant } from '@/types';

export type ConfiguratorStep = 1 | 2 | 3 | 4 | 5 | 6;

interface ConfiguratorState {
  // Paso actual (1–6)
  currentStep: ConfiguratorStep;
  direction: number; // 1 (forward) or -1 (backward)

  // Selecciones del wizard
  level: SkateLevel | null;
  discipline: string | null;
  boot: Product | null;
  bootVariant: ProductVariant | null;
  plate: Product | null;
  wheels: Product | null;
  wheelsVariant: ProductVariant | null;
  bearing: Product | null;

  // UI
  isWhatsAppModalOpen: boolean;

  // Computed
  totalArs: number;
  isStepComplete: (step: ConfiguratorStep) => boolean;
  canAdvance: boolean;

  // Acciones
  setLevel: (level: SkateLevel) => void;
  setDiscipline: (discipline: string) => void;
  setBoot: (boot: Product, variant?: ProductVariant) => void;
  setPlate: (plate: Product) => void;
  setWheels: (wheels: Product, variant?: ProductVariant) => void;
  setBearing: (bearing: Product) => void;
  updateTotal: () => void;
  goToStep: (step: ConfiguratorStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  openWhatsAppModal: () => void;
  closeWhatsAppModal: () => void;
}

const initialState = {
  currentStep: 1 as ConfiguratorStep,
  direction: 1,
  level: null,
  discipline: null,
  boot: null,
  bootVariant: null,
  plate: null,
  wheels: null,
  wheelsVariant: null,
  bearing: null,
  totalArs: 0,
  isWhatsAppModalOpen: false,
};

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  ...initialState,

  // ── Computed ────────────────────────────────────────────────
  isStepComplete: (step) => {
    const { level, discipline, boot, plate, wheels } = get();
    switch (step) {
      case 1: return !!level;
      case 2: return !!discipline;
      case 3: return !!boot;
      case 4: return !!plate;
      case 5: return !!wheels;
      case 6: return true;
      default: return false;
    }
  },

  get canAdvance() {
    return get().isStepComplete(get().currentStep);
  },

  // ── Acciones ────────────────────────────────────────────────
  setLevel: (level) => {
    set({ level, boot: null, plate: null, wheels: null });
    get().updateTotal();
  },
  setDiscipline: (discipline) => {
    set({ discipline });
  },
  setBoot: (boot, variant) => {
    set({ boot, bootVariant: variant ?? null, plate: null });
    get().updateTotal();
  },
  setPlate: (plate) => {
    set({ plate });
    get().updateTotal();
  },
  setWheels: (wheels, variant) => {
    set({ wheels, wheelsVariant: variant ?? null });
    get().updateTotal();
  },
  setBearing: (bearing) => {
    set({ bearing });
    get().updateTotal();
  },

  updateTotal: () => {
    const { boot, bootVariant, plate, wheels, wheelsVariant, bearing } = get();
    let total = 0;
    if (boot) total += boot.price_ars + (bootVariant?.price_modifier ?? 0);
    if (plate) total += plate.price_ars;
    if (wheels) total += wheels.price_ars + (wheelsVariant?.price_modifier ?? 0);
    if (bearing) total += bearing.price_ars;
    set({ totalArs: total });
  },

  goToStep: (step) => {
    const { currentStep } = get();
    set({ currentStep: step, direction: step > currentStep ? 1 : -1 });
  },
  nextStep: () => {
    const { currentStep, isStepComplete } = get();
    if (currentStep < 6 && isStepComplete(currentStep)) {
      set({ currentStep: (currentStep + 1) as ConfiguratorStep, direction: 1 });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: (currentStep - 1) as ConfiguratorStep, direction: -1 });
    }
  },
  reset: () => set(initialState),

  openWhatsAppModal: () => set({ isWhatsAppModalOpen: true }),
  closeWhatsAppModal: () => set({ isWhatsAppModalOpen: false }),
}));
