// ============================================================
// SOBRE RUEDAS — Configurator Store (Zustand)
// Gestiona el estado del wizard "Armá el tuyo"
// ============================================================

import { create } from 'zustand';
import type { SkateLevel, Product, ProductVariant } from '@/types';

export type ConfiguratorStep = 1 | 2 | 3 | 4 | 5;

interface ConfiguratorState {
  // Paso actual (1–5)
  currentStep: ConfiguratorStep;

  // Selecciones del wizard
  level: SkateLevel | null;
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
  level: null,
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
    const { level, boot, plate, wheels } = get();
    switch (step) {
      case 1: return !!level;
      case 2: return !!boot;
      case 3: return !!plate;
      case 4: return !!wheels;
      case 5: return true;
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
    if (boot) total += (boot as any).price + (bootVariant?.price_modifier ?? 0);
    if (plate) total += (plate as any).price;
    if (wheels) total += (wheels as any).price + (wheelsVariant?.price_modifier ?? 0);
    if (bearing) total += (bearing as any).price;
    set({ totalArs: total });
  },

  goToStep: (step) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep, isStepComplete } = get();
    if (currentStep < 5 && isStepComplete(currentStep)) {
      set({ currentStep: (currentStep + 1) as ConfiguratorStep });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: (currentStep - 1) as ConfiguratorStep });
    }
  },
  reset: () => set(initialState),

  openWhatsAppModal: () => set({ isWhatsAppModalOpen: true }),
  closeWhatsAppModal: () => set({ isWhatsAppModalOpen: false }),
}));
