'use client';

// ============================================================
// SOBRE RUEDAS — Componente Logo (Gráfico)
// Carga la imagen desde /public/logo.png
// ============================================================

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className, variant = 'dark' }: LogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="SR Patín" 
      className={cn("object-contain drop-shadow-sm transition-transform duration-300", className)} 
     referrerPolicy="no-referrer" />
  );
}
