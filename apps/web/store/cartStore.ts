// ============================================================
// SOBRE RUEDAS — Cart Store (Zustand)
// Gestiona el carrito de compras con persistencia en localStorage
// ============================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant, DiscountCode } from '@/types';
import { generateSessionId } from '@/lib/utils';

interface CartState {
  // Estado
  items: CartItem[];
  discountCode: DiscountCode | null;
  isOpen: boolean;
  sessionId: string;

  // ── Computed (ahora como estado para mejor reactividad) ───
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  
  // Acciones
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateTotals: () => void;
  clearCart: () => void;
  applyDiscount: (code: DiscountCode) => void;
  removeDiscount: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // ── Estado inicial ─────────────────────────────────────
      items: [],
      discountCode: null,
      isOpen: false,
      sessionId: generateSessionId(),
      itemCount: 0,
      subtotal: 0,
      discountAmount: 0,
      total: 0,

      // ── Acciones ──────────────────────────────────────────
      addItem: (product, variant, quantity = 1) => {
        const state = get();
        const unitPrice = (product as any).price + (variant?.price_modifier ?? 0);
        const itemId = variant ? `${product.id}_${variant.id}` : product.id;

        const existingIndex = state.items.findIndex((i) => i.id === itemId);

        if (existingIndex >= 0) {
          // Incrementar cantidad si ya existe
          const updated = [...state.items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
            subtotal: (updated[existingIndex].quantity + quantity) * unitPrice,
          };
          set({ items: updated });
          get().updateTotals();
        } else {
          // Agregar nuevo ítem
          const newItem: CartItem = {
            id: itemId,
            product,
            variant,
            quantity,
            unitPrice,
            subtotal: quantity * unitPrice,
          };
          set({ items: [...state.items, newItem], isOpen: true });
          get().updateTotals();
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
        get().updateTotals();
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId
              ? { ...i, quantity, subtotal: quantity * i.unitPrice }
              : i
          ),
        }));
        get().updateTotals();
      },

      updateTotals: () => {
        const { items, discountCode } = get();
        const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
        const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
        
        let discountAmount = 0;
        if (discountCode) {
          if (discountCode.discount_type === 'percentage') {
            discountAmount = Math.round(subtotal * (discountCode.discount_value / 100));
          } else {
            discountAmount = Math.min(discountCode.discount_value, subtotal);
          }
        }

        set({ 
          itemCount, 
          subtotal, 
          discountAmount, 
          total: Math.max(0, subtotal - discountAmount) 
        });
      },

      clearCart: () => {
        set({ items: [], discountCode: null });
        get().updateTotals();
      },

      applyDiscount: (code) => {
        set({ discountCode: code });
        get().updateTotals();
      },

      removeDiscount: () => {
        set({ discountCode: null });
        get().updateTotals();
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'sobre-ruedas-cart',
      storage: createJSONStorage(() => localStorage),
      // Solo persistir items y descuento, no el estado de UI
      partialize: (state) => ({
        items: state.items,
        discountCode: state.discountCode,
        sessionId: state.sessionId,
      }),
    }
  )
);
