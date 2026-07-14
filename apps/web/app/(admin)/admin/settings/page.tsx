"use client";
import React from 'react';
import { Settings, Save, LayoutTemplate, Megaphone, Image as ImageIcon } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Configuración de la Tienda</h1>
          <p className="text-sm text-[#B08B8B] mt-2 font-medium">Personaliza el diseño y anuncios de la página principal</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-[#1C1612] text-white rounded-xl font-bold text-sm hover:bg-[#D97230] transition-colors shadow-lg shadow-[#D97230]/20">
          <Save size={16} />
          Guardar Cambios
        </button>
      </div>

      <div className="space-y-8">
        {/* Barra de Anuncios */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#1C1612]/5 pb-4">
            <Megaphone className="text-[#D97230]" size={24} />
            <h2 className="text-lg font-black text-[#1C1612]">Barra de Anuncios Superior</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D97230]"></div>
                <span className="ml-3 text-sm font-bold text-[#1C1612]">Mostrar barra de anuncios</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Texto del Anuncio</label>
              <input type="text" defaultValue="¡Envío gratis superando los $150.000!" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Link (Opcional)</label>
              <input type="text" placeholder="https://..." className="w-full px-4 py-3 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
            </div>
          </div>
        </div>

        {/* Banners Principales */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#1C1612]/5 pb-4">
            <ImageIcon className="text-[#D97230]" size={24} />
            <h2 className="text-lg font-black text-[#1C1612]">Banners de la Tienda</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-6 border-2 border-dashed border-[#1C1612]/10 rounded-2xl">
              <p className="font-bold text-[#1C1612] text-sm">Banner Principal (Hero)</p>
              <div className="aspect-video bg-[#F5F1EB] rounded-xl flex items-center justify-center overflow-hidden relative group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1563293815-54602f5a6bfa?q=80&w=600" alt="Hero" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold text-sm bg-black/50 px-4 py-2 rounded-lg">Cambiar Imagen</span>
                </div>
              </div>
              <input type="text" defaultValue="La excelencia en cada giro" placeholder="Título Principal" className="w-full px-4 py-2 bg-[#F5F1EB] rounded-xl outline-none text-sm font-medium" />
            </div>

            <div className="space-y-4 p-6 border-2 border-dashed border-[#1C1612]/10 rounded-2xl">
              <p className="font-bold text-[#1C1612] text-sm">Banner Secundario (Ofertas)</p>
              <div className="aspect-video bg-[#F5F1EB] rounded-xl flex items-center justify-center overflow-hidden relative group cursor-pointer">
                <div className="text-[#B08B8B] flex flex-col items-center gap-2">
                  <ImageIcon size={32} />
                  <span className="text-xs font-bold uppercase">Subir Banner</span>
                </div>
              </div>
              <input type="text" placeholder="Título Secundario" className="w-full px-4 py-2 bg-[#F5F1EB] rounded-xl outline-none text-sm font-medium" />
            </div>
          </div>
        </div>

        {/* Productos Destacados */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#1C1612]/5 pb-4">
            <LayoutTemplate className="text-[#D97230]" size={24} />
            <h2 className="text-lg font-black text-[#1C1612]">Productos Destacados (Inicio)</h2>
          </div>
          
          <p className="text-sm text-[#B08B8B]">Selecciona los 4 productos que quieres mostrar en la sección principal de la tienda.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <label className="text-[10px] font-bold text-[#B08B8B] uppercase tracking-widest">Posición {i}</label>
                <select className="w-full px-4 py-3 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium">
                  <option>Botas Edea Fly - Blanco</option>
                  <option>Plancha Roll Line Mistral</option>
                  <option>Ruedas Giotto 57mm</option>
                  <option>Rodamientos ABEC 9</option>
                  <option>Frenos Super Jump</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
