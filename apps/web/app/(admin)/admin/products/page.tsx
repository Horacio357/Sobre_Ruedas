"use client";
import React, { useState } from 'react';
import { RefreshCw, Trash2, Search, Edit3, Image as ImageIcon, Plus, ArrowLeft, Link as LinkIcon, Upload } from 'lucide-react';

const mockProducts = [
  { id: '1', name: 'Botas Edea Fly', category: 'botas', price: 250000, stock: 5, color: 'Blanco', status: 'Activo' },
  { id: '2', name: 'Plancha Roll Line Mistral', category: 'planchas', price: 180000, stock: 12, color: 'Plata', status: 'Activo' },
  { id: '3', name: 'Ruedas Giotto 57mm', category: 'ruedas', price: 45000, stock: 0, color: 'Gris', status: 'Agotado' },
];

export default function AdminProducts() {
  const [hasData, setHasData] = useState(false);
  const [view, setView] = useState<'list' | 'form'>('list');
  const products = hasData ? mockProducts : [];

  if (view === 'form') {
    return (
      <div className="p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
        <button 
          onClick={() => setView('list')}
          className="flex items-center gap-2 text-[#B08B8B] hover:text-[#D97230] font-bold text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Volver a productos
        </button>
        
        <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight mb-8">Cargar Producto</h1>
        
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Info Básica */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 space-y-6">
            <h2 className="text-lg font-black text-[#1C1612]">Información Básica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Nombre del Producto</label>
                <input type="text" placeholder="Ej: Botas Edea Fly" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Categoría</label>
                <select className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium">
                  <option>Botas</option>
                  <option>Planchas</option>
                  <option>Ruedas</option>
                  <option>Accesorios</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Descripción</label>
                <textarea rows={4} placeholder="Describe los materiales, el uso recomendado..." className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* Detalles Técnicos */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 space-y-6">
            <h2 className="text-lg font-black text-[#1C1612]">Detalles Técnicos y Efectos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Color / Variante</label>
                <input type="text" placeholder="Ej: Blanco Perla" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Etiquetas / Efectos</label>
                <input type="text" placeholder="Ej: Liviano, Triple Salto, Profesional" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Precio (ARS)</label>
                <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Stock</label>
                <input type="number" placeholder="Cantidad" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
              </div>
            </div>
          </div>

          {/* Multimedia */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 space-y-6">
            <h2 className="text-lg font-black text-[#1C1612]">Imágenes y Videos</h2>
            
            <div className="space-y-6">
              {/* Fotos */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Carga de Foto</label>
                
                <div className="flex gap-4">
                  {/* Opción 1: URL */}
                  <div className="flex-1 p-6 border-2 border-dashed border-[#1C1612]/10 rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-[#1C1612] font-bold">
                      <LinkIcon size={18} className="text-[#D97230]" />
                      Por Enlace (URL)
                    </div>
                    <input type="text" placeholder="https://ejemplo.com/foto.jpg" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
                  </div>
                  
                  <div className="flex items-center justify-center font-bold text-[#B08B8B] text-xs uppercase tracking-widest">O</div>
                  
                  {/* Opción 2: Subir archivo */}
                  <div className="flex-1 p-6 border-2 border-dashed border-[#1C1612]/10 rounded-2xl flex flex-col items-center justify-center gap-2 bg-[#F5F1EB] hover:bg-[#F9EAEA] transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#B08B8B] group-hover:text-[#D97230] transition-colors">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm font-bold text-[#1C1612]">Subir desde tu PC</p>
                    <p className="text-xs text-[#B08B8B]">PNG, JPG o WEBP</p>
                  </div>
                </div>
              </div>

              {/* Video */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Link de Video (YouTube/Vimeo)</label>
                <input type="text" placeholder="https://youtube.com/watch?v=..." className="w-full px-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
                <p className="text-[10px] text-[#B08B8B] font-medium mt-1">Este video se mostrará en la galería del producto para el cliente.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => setView('list')} className="px-6 py-3 bg-white text-[#1C1612] border border-[#1C1612]/10 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-8 py-3 bg-[#1C1612] text-white rounded-xl font-bold text-sm hover:bg-[#D97230] transition-colors shadow-lg shadow-[#D97230]/20">
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Vista de Tabla
  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Productos</h1>
          <p className="text-sm text-[#B08B8B] mt-2 font-medium">Gestiona tu catálogo, precios y multimedia</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setView('form')}
            className="flex items-center gap-2 px-5 py-3 bg-[#D97230] text-white rounded-xl font-bold text-sm hover:bg-[#c26225] transition-colors shadow-lg shadow-[#D97230]/20"
          >
            <Plus size={16} />
            Cargar Producto
          </button>
          <div className="h-10 w-px bg-[#1C1612]/10 hidden md:block"></div>
          <button 
            onClick={() => setHasData(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#1C1612] text-white rounded-xl font-bold text-sm hover:bg-black transition-colors"
          >
            <RefreshCw size={16} />
            Datos de Muestra
          </button>
          <button 
            onClick={() => setHasData(false)}
            className="flex items-center gap-2 px-5 py-3 bg-white text-[#1C1612] border border-[#1C1612]/10 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
          >
            <Trash2 size={16} />
            Limpiar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[#1C1612]/5 overflow-hidden">
        {/* Barra de herramientas */}
        <div className="p-6 border-b border-[#1C1612]/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B08B8B]" size={18} />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="w-full pl-12 pr-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium"
            />
          </div>
        </div>

        {/* Tabla */}
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
            <div className="w-16 h-16 bg-[#F5F1EB] rounded-2xl flex items-center justify-center text-[#B08B8B] mb-4">
              <ImageIcon size={24} />
            </div>
            <p className="text-[#1C1612] font-bold mb-2">No hay productos</p>
            <p className="text-sm text-[#B08B8B] mb-6">El catálogo está vacío. Puedes generar datos de muestra o crear uno nuevo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F1EB]/50">
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Producto</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Categoría</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Precio</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Stock</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Estado</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1612]/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#F5F1EB]/30 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-[#1C1612] text-sm">{product.name}</p>
                      <p className="text-xs text-[#B08B8B] mt-0.5">Color: {product.color}</p>
                    </td>
                    <td className="p-4 text-sm text-[#1C1612] font-medium capitalize">{product.category}</td>
                    <td className="p-4 font-black text-[#1C1612]">${product.price}</td>
                    <td className="p-4 font-bold text-[#1C1612]">{product.stock}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg inline-flex items-center justify-center
                        ${product.status === 'Activo' ? 'bg-[#34D399]/10 text-[#34D399]' : 'bg-red-100 text-red-600'}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => setView('form')} className="p-2 text-[#B08B8B] hover:text-[#D97230] hover:bg-[#D97230]/10 rounded-lg transition-colors">
                        <Edit3 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
