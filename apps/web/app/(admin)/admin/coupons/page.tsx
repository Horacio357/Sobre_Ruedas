"use client";
import React, { useState } from 'react';
import { RefreshCw, Trash2, Search, Edit3, Plus, ArrowLeft, Ticket, Percent } from 'lucide-react';

const mockCoupons = [
  { id: '1', code: 'MUNDIAL2026', type: 'percentage', value: 15, status: 'Activo', uses: 45, maxUses: 100, expires: '31 Dic 2026' },
  { id: '2', code: 'ENVIOFREE', type: 'fixed', value: 0, status: 'Activo', uses: 120, maxUses: 500, expires: 'No expira' },
  { id: '3', code: 'BIENVENIDA', type: 'percentage', value: 10, status: 'Activo', uses: 32, maxUses: null, expires: 'No expira' },
  { id: '4', code: 'HOTSALE', type: 'percentage', value: 25, status: 'Expirado', uses: 80, maxUses: 80, expires: '15 May 2026' },
];

export default function AdminCoupons() {
  const [hasData, setHasData] = useState(false);
  const [view, setView] = useState<'list' | 'form'>('list');
  const coupons = hasData ? mockCoupons : [];

  if (view === 'form') {
    return (
      <div className="p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
        <button 
          onClick={() => setView('list')}
          className="flex items-center gap-2 text-[#B08B8B] hover:text-[#D97230] font-bold text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Volver a cupones
        </button>
        
        <h1 className="text-2xl font-black text-[#1C1612] tracking-tight mb-8">Crear Nuevo Cupón</h1>
        
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 space-y-6">
            <h2 className="text-base md:text-lg font-black text-[#1C1612]">Detalles del Descuento</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Código (El cliente lo escribirá)</label>
                <input type="text" placeholder="Ej: VERANO20" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-black uppercase tracking-widest text-[#1C1612]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Tipo de Descuento</label>
                <select className="w-full px-4 py-3 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium">
                  <option>Porcentaje (%)</option>
                  <option>Monto Fijo ($)</option>
                  <option>Envío Gratis</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Valor del Descuento</label>
                <div className="relative">
                  <input type="number" placeholder="Ej: 15" className="w-full pl-4 pr-10 py-3 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
                  <Percent size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B08B8B]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 space-y-6">
            <h2 className="text-base md:text-lg font-black text-[#1C1612]">Límites y Condiciones</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Límite de usos totales</label>
                <input type="number" placeholder="Ej: 100 (Dejar en blanco para ilimitado)" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Fecha de Vencimiento</label>
                <input type="date" className="w-full px-4 py-3 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium text-[#1C1612]" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => setView('list')} className="px-6 py-3 bg-white text-[#1C1612] border border-[#1C1612]/10 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" onClick={() => setView('list')} className="px-8 py-3 bg-[#1C1612] text-white rounded-xl font-bold text-sm hover:bg-[#D97230] transition-colors shadow-lg shadow-[#D97230]/20">
              Crear Cupón
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Vista de Tabla
  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Cupones de Descuento</h1>
          <p className="text-sm text-[#B08B8B] mt-2 font-medium">Crea promociones para fechas especiales y fidelización</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setView('form')}
            className="flex items-center gap-2 px-5 py-3 bg-[#D97230] text-white rounded-xl font-bold text-sm hover:bg-[#c26225] transition-colors shadow-lg shadow-[#D97230]/20"
          >
            <Plus size={16} />
            Nuevo Cupón
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

      <div className="bg-white rounded-[2rem] shadow-sm border border-[#1C1612]/5 overflow-hidden">
        {/* Barra de herramientas */}
        <div className="p-8 border-b border-[#1C1612]/5 flex flex-col sm:flex-row justify-between gap-6 items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B08B8B]" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por código..." 
              className="w-full pl-12 pr-4 py-3.5 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium text-[#1C1612] uppercase"
            />
          </div>
        </div>

        {/* Tabla */}
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
            <div className="w-16 h-16 bg-[#F5F1EB] rounded-2xl flex items-center justify-center text-[#B08B8B] mb-4">
              <Ticket size={24} />
            </div>
            <p className="text-[#1C1612] font-bold mb-2">No tienes cupones activos</p>
            <p className="text-sm text-[#B08B8B]">Genera datos de muestra o crea tu primera promoción.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#F5F1EB]/30">
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5">Código</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Descuento</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Usos</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Vencimiento</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Estado</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1612]/5">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-[#F5F1EB]/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5F1EB] rounded-lg border border-[#1C1612]/10 border-dashed">
                        <Ticket size={14} className="text-[#D97230]" />
                        <span className="font-black text-[#1C1612] text-sm tracking-widest">{coupon.code}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <p className="font-bold text-[#1C1612] text-sm">
                        {coupon.type === 'percentage' ? `${coupon.value}% OFF` : coupon.type === 'fixed' && coupon.value === 0 ? 'Envío Gratis' : `$${coupon.value} OFF`}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex flex-col items-center">
                        <p className="font-black text-[#1C1612] text-sm">{coupon.uses} <span className="text-xs text-[#B08B8B] font-medium">/ {coupon.maxUses || '∞'}</span></p>
                        {coupon.maxUses && (
                          <div className="w-16 h-1.5 bg-[#F5F1EB] rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-[#D97230]" style={{ width: `${(coupon.uses / coupon.maxUses) * 100}%` }}></div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-[#1C1612] font-medium text-center">{coupon.expires}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl inline-flex items-center justify-center
                        ${coupon.status === 'Activo' ? 'bg-[#34D399]/10 text-[#34D399]' : 'bg-red-100 text-red-600'}`}
                      >
                        {coupon.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center flex justify-center">
                      <button onClick={() => setView('form')} className="p-3 text-[#B08B8B] hover:text-[#D97230] hover:bg-[#D97230]/10 rounded-xl transition-colors" title="Editar Cupón">
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
