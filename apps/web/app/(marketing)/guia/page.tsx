import React from 'react';
import SizeCalculator from '@/components/guide/SizeCalculator';
import { Ruler, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'Guía de Talles — Sobre Ruedas',
  description: 'Calcula tu talle ideal de bota y plancha con nuestra herramienta profesional basada en estándares de Roll-Line, Edea y Risport.',
};

export default function GuiaPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F9] pt-48 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97230]/10 border border-[#D97230]/20 text-[#D97230] text-[10px] font-black uppercase tracking-[0.2em]">
            Herramienta Profesional
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.1] tracking-tight text-[#1C1612]">
            El talle perfecto <br />
            <span className="text-[#D97230]">está aquí.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-[#B08B8B] text-xl font-light leading-relaxed opacity-80">
            Utilizamos las tablas oficiales de Roll-Line para garantizar que la bota y la plancha trabajen en total sincronía con tu patinaje.
          </p>
        </div>

        {/* Calculator Component */}
        <div className="mb-32">
          <SizeCalculator />
        </div>

        {/* Benefits/Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-40">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-[#D97230] border border-[#F9EAEA]">
              <Ruler size={32} strokeWidth={1.5} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-[#1C1612]">Precisión Milimétrica</h3>
              <p className="text-sm text-[#B08B8B] leading-relaxed max-w-[250px] mx-auto opacity-80">
                Basado en las tablas de coincidencia oficiales de Roll-Line.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-[#D97230] border border-[#F9EAEA]">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-[#1C1612]">Garantía de Marca</h3>
              <p className="text-sm text-[#B08B8B] leading-relaxed max-w-[250px] mx-auto opacity-80">
                Trabajamos con los estándares de Edea, Risport y Belati.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-20 h-20 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-[#D97230] border border-[#F9EAEA]">
              <Zap size={32} strokeWidth={1.5} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-[#1C1612]">Mejor Rendimiento</h3>
              <p className="text-sm text-[#B08B8B] leading-relaxed max-w-[250px] mx-auto opacity-80">
                Un talle correcto evita lesiones y aumenta tu agilidad.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-32 p-12 bg-[#1C1612] rounded-[48px] text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#D97230] blur-[150px] rounded-full" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#D97230] blur-[150px] rounded-full" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">¿Dudas con tu elección?</h2>
          <p className="text-[#B08B8B]/60 text-[13px] max-w-xl mx-auto leading-relaxed font-light">
            Nuestro equipo de especialistas puede asesorarte de forma personalizada vía WhatsApp para encontrar tu configuración ideal.
          </p>
          <button className="bg-white text-[#1C1612] px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#D97230] hover:text-white transition-all">
            Hablar con un experto
          </button>
        </div>

      </div>
    </main>
  );
}
