import React from 'react';
import SizeCalculator from '@/components/guide/SizeCalculator';
import { Ruler, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'Guía de Talles — Sobre Ruedas',
  description: 'Calcula tu talle ideal de bota y plancha con nuestra herramienta profesional basada en estándares de Roll-Line, Edea y Risport.',
};

export default function GuiaPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F9] pt-56 md:pt-64 pb-64 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-40 md:gap-56">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-24 md:mb-32 gap-6 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97230]/10 border border-[#D97230]/20 text-[#D97230] text-[10px] font-black uppercase tracking-[0.2em]">
            Herramienta Profesional
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-[#1C1612] text-center">
            El talle perfecto <br />
            <span className="text-[#D97230]">está aquí.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[#B08B8B] text-xl font-light leading-relaxed opacity-80 text-center">
            Utilizamos las tablas oficiales de Roll-Line para garantizar que la bota y la plancha trabajen en total sincronía con tu patinaje.
          </p>
        </div>

        {/* Calculator Component */}
        <div className="w-full">
          <SizeCalculator />
        </div>

        {/* Benefits/Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 w-full">
          <div className="flex flex-col items-center text-center gap-6 md:gap-8">
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-[#D97230] border border-[#F9EAEA]">
              <Ruler size={32} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-[#1C1612]">Precisión Milimétrica</h3>
              <p className="text-sm text-[#B08B8B] leading-relaxed max-w-[250px] mx-auto opacity-80">
                Basado en las tablas de coincidencia oficiales de Roll-Line.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-6 md:gap-8">
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-[#D97230] border border-[#F9EAEA]">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-[#1C1612]">Garantía de Marca</h3>
              <p className="text-sm text-[#B08B8B] leading-relaxed max-w-[250px] mx-auto opacity-80">
                Trabajamos con los estándares de Edea, Risport y Belati.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-6 md:gap-8">
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-[#D97230] border border-[#F9EAEA]">
              <Zap size={32} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium text-[#1C1612]">Mejor Rendimiento</h3>
              <p className="text-sm text-[#B08B8B] leading-relaxed max-w-[250px] mx-auto opacity-80">
                Un talle correcto evita lesiones y aumenta tu agilidad.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="w-full p-12 md:p-20 bg-[#1C1612] rounded-[48px] flex flex-col items-center justify-center text-center gap-10 md:gap-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#D97230] blur-[150px] rounded-full" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#D97230] blur-[150px] rounded-full" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-center relative z-10">¿Dudas con tu elección?</h2>
          <p className="text-[#B08B8B]/60 text-[13px] md:text-base max-w-xl mx-auto leading-relaxed font-light text-center relative z-10">
            Nuestro equipo de especialistas puede asesorarte de forma personalizada vía WhatsApp para encontrar tu configuración ideal.
          </p>
          <button className="bg-white text-[#1C1612] px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#D97230] hover:text-white transition-all relative z-10">
            Hablar con un experto
          </button>
        </div>

      </div>
    </main>
  );
}
