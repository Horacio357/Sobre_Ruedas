'use client';

// ============================================================
// SOBRE RUEDAS — Componente Logo (Corregido)
// ============================================================

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className, variant = 'dark' }: LogoProps) {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  // Logo SVG de alta calidad (Fallback oficial)
  const FallbackLogo = () => (
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
  );

  return (
    <div className={cn("flex items-center justify-center relative", className)}>
      {status !== 'error' && (
        <img
          src="https://i.ibb.co/xSQt5z5t/logo-1046544147-1753126883-468d2cec07e9b66422b238af249cd6641753126883.png"
          alt="Sobre Ruedas"
          className={cn(
            "h-full w-auto object-contain transition-opacity duration-300",
            status === 'success' ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setStatus('success')}
          onError={() => setStatus('error')}
        />
      )}
      {(status === 'error' || status === 'loading') && (
        <div className={status === 'loading' ? 'opacity-0' : ''}>
          <FallbackLogo />
        </div>
      )}
    </div>
  );
}
