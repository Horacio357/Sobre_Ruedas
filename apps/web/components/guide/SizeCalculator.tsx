'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Info, ArrowRight, CheckCircle2 } from 'lucide-react';

// ============================================================
// DATA: Roll-Line Correspondence Tables
// ============================================================

type Brand = 'edea' | 'risport' | 'belati';

interface SizeMapping {
  plate: string;
  minMm?: number;
  maxMm?: number;
  minEu?: number;
  maxEu?: number;
}

const DATA: Record<Brand, SizeMapping[]> = {
  edea: [
    { plate: '100', minMm: 185, maxMm: 190 },
    { plate: '110', minMm: 195, maxMm: 200 },
    { plate: '120', minMm: 205, maxMm: 210 },
    { plate: '130', minMm: 215, maxMm: 220 },
    { plate: '140', minMm: 225, maxMm: 235 },
    { plate: '150', minMm: 240, maxMm: 245 },
    { plate: '160', minMm: 250, maxMm: 260 },
    { plate: '170', minMm: 265, maxMm: 275 },
    { plate: '180', minMm: 280, maxMm: 290 },
    { plate: '190', minMm: 295, maxMm: 300 },
  ],
  risport: [
    { plate: '90', minMm: 180, maxMm: 190, minEu: 26, maxEu: 28 },
    { plate: '100', minMm: 195, maxMm: 205, minEu: 29, maxEu: 31 },
    { plate: '110', minMm: 210, maxMm: 220, minEu: 31.5, maxEu: 33 },
    { plate: '120', minMm: 225, maxMm: 235, minEu: 33.5, maxEu: 35 },
    { plate: '130', minMm: 240, maxMm: 250, minEu: 35.5, maxEu: 37 },
    { plate: '140', minMm: 255, maxMm: 265, minEu: 37.5, maxEu: 39 },
    { plate: '150', minMm: 270, maxMm: 280, minEu: 39.5, maxEu: 41 },
    { plate: '160', minMm: 285, maxMm: 295, minEu: 41.5, maxEu: 42.5 },
    { plate: '170', minMm: 295, maxMm: 305, minEu: 43, maxEu: 44 },
  ],
  belati: [
    { plate: '90', minEu: 27, maxEu: 29 },
    { plate: '100', minEu: 30, maxEu: 31 },
    { plate: '110', minEu: 32, maxEu: 32 },
    { plate: '120', minEu: 33, maxEu: 34 },
    { plate: '130', minEu: 35, maxEu: 36 },
    { plate: '140', minEu: 37, maxEu: 37 },
    { plate: '150', minEu: 38, maxEu: 38 },
    { plate: '160', minEu: 39, maxEu: 40 },
    { plate: '170', minEu: 41, maxEu: 41 },
    { plate: '180', minEu: 42, maxEu: 43 },
    { plate: '190', minEu: 44, maxEu: 44 },
  ],
};

const BRANDS = [
  { id: 'edea', name: 'Edea', logo: '/images/brands/edea.png' },
  { id: 'risport', name: 'Risport', logo: '/images/brands/risport.png' },
  { id: 'belati', name: 'Belati / Graf', logo: '/images/brands/belati.png' },
];

export default function SizeCalculator() {
  const [selectedBrand, setSelectedBrand] = useState<Brand>('edea');
  const [measurement, setMeasurement] = useState<number>(245);
  const [inputType, setInputType] = useState<'mm' | 'eu'>('mm');

  const result = useMemo(() => {
    const table = DATA[selectedBrand];
    if (inputType === 'mm') {
      return table.find((m) => m.minMm && m.maxMm && measurement >= m.minMm && measurement <= m.maxMm);
    } else {
      return table.find((m) => m.minEu && m.maxEu && measurement >= m.minEu && measurement <= m.maxEu);
    }
  }, [selectedBrand, measurement, inputType]);

  return (
    <div className="max-w-5xl mx-auto p-8 md:p-12 lg:p-16 bg-white/40 backdrop-blur-3xl rounded-[60px] border border-white/50 shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Left: Inputs */}
        <div className="flex flex-col justify-center space-y-12">
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1C1612] mb-3">Calculadora de Talle</h2>
            <p className="text-[13px] text-[#B08B8B] font-light leading-relaxed max-w-sm">
              Ingresa tus medidas para obtener el talle ideal de bota y plancha recomendado por expertos.
            </p>
          </div>

          {/* Brand Selector */}
          <div className="space-y-5 flex flex-col items-center w-full">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97230]">1. Selecciona tu marca</label>
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              {BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id as Brand)}
                  className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                    selectedBrand === brand.id 
                      ? 'border-[#D97230] bg-[#D97230]/5 text-[#D97230] shadow-inner' 
                      : 'border-[#F9EAEA] bg-white text-[#B08B8B] hover:border-[#D97230]/30'
                  }`}
                >
                  <span className="text-xs font-bold tracking-tight">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Type Selector */}
          <div className="space-y-6 flex flex-col items-center w-full">
            <div className="flex items-center justify-between w-full max-w-sm">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97230]">2. Tu medida</label>
              <div className="flex bg-[#FFF0F0] p-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                <button 
                  onClick={() => { setInputType('mm'); setMeasurement(245); }}
                  className={`px-4 py-1.5 rounded-full transition-all ${inputType === 'mm' ? 'bg-white text-[#D97230] shadow-sm' : 'text-[#9A8A72]'}`}
                >
                  MM
                </button>
                <button 
                  onClick={() => { setInputType('eu'); setMeasurement(38); }}
                  className={`px-4 py-1.5 rounded-full transition-all ${inputType === 'eu' ? 'bg-white text-[#D97230] shadow-sm' : 'text-[#9A8A72]'}`}
                >
                  EU
                </button>
              </div>
            </div>

            <div className="relative group w-full max-w-sm">
              <input
                type="range"
                min={inputType === 'mm' ? 180 : 26}
                max={inputType === 'mm' ? 310 : 46}
                step={inputType === 'mm' ? 5 : 0.5}
                value={measurement}
                onChange={(e) => setMeasurement(Number(e.target.value))}
                className="w-full h-1 bg-[#F9EAEA] rounded-lg appearance-none cursor-pointer accent-[#D97230]"
              />
              <div className="flex justify-between mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#1C1612] tabular-nums">{measurement}</span>
                  <span className="text-sm font-black text-[#B08B8B] uppercase tracking-widest">{inputType}</span>
                </div>
                <div className="bg-[#FAF7F2] px-4 py-2 rounded-xl border border-[#EAE3D9] flex items-center gap-2">
                  <Ruler size={14} className="text-[#D97230]" />
                  <span className="text-[11px] font-bold text-[#B08B8B]">Desliza para ajustar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="relative">
          <div className="h-full bg-white rounded-[40px] p-10 md:p-14 lg:p-16 shadow-2xl border border-[#F5F0EA] flex flex-col justify-center text-center">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key={`${selectedBrand}-${measurement}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-16"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#B08B8B]">Bota Recomendada</span>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-6xl md:text-7xl font-light text-[#1C1612] tracking-tighter tabular-nums">
                        {inputType === 'mm' ? measurement : (selectedBrand === 'risport' || selectedBrand === 'belati' ? measurement : '—')}
                      </span>
                      <span className="text-xs font-black tracking-[0.3em] text-[#D97230]">
                        {selectedBrand.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#D97230]/30 to-transparent" />

                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#B08B8B]">Plancha Roll-Line</span>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-6xl md:text-7xl font-light text-[#D97230] tracking-tighter tabular-nums">
                        {result.plate}
                      </span>
                      <span className="text-xs font-black tracking-[0.3em] text-[#1C1612]">
                        VAR / GIOTTO
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto text-[#9A8A72]">
                    <Info size={32} />
                  </div>
                  <p className="text-sm font-medium text-[#9A8A72] leading-relaxed">
                    Medida fuera de rango.<br />Consulta a un especialista.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
