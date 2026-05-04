'use client';

// ============================================================
// SOBRE RUEDAS — Totals Sync Hook
// Sincroniza los totales del carrito después de la hidratación
// ============================================================

import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function TotalsSync() {
  const updateTotals = useCartStore((state) => state.updateTotals);

  useEffect(() => {
    // Recalcular totales una vez que el componente se monta (post-hidratación)
    updateTotals();
  }, [updateTotals]);

  return null;
}
