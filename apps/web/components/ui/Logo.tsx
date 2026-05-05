'use client';

// ============================================================
// SOBRE RUEDAS — Componente Logo (Tipográfico)
// ============================================================

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className, variant = 'dark' }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center relative", className)}>
      <div className="flex items-center gap-2 select-none group">
        <span className={cn(
          "text-2xl md:text-3xl font-black italic tracking-tighter group-hover:text-[#D97230] transition-colors",
          variant === 'dark' ? "text-[#D97230]" : "text-white"
        )}>
          SR
        </span>
        <div className="flex flex-col">
          <span className={cn(
            "text-[10px] font-black tracking-[0.2em] uppercase leading-none",
            variant === 'dark' ? "text-[#1C1612]" : "text-white"
          )}>
            Sobre
          </span>
          <span className={cn(
            "text-[10px] font-black tracking-[0.2em] uppercase leading-none mt-0.5",
            variant === 'dark' ? "text-[#1C1612]" : "text-white"
          )}>
            Ruedas
          </span>
        </div>
      </div>
    </div>
  );
}
