"use client";
import React, { useState } from 'react';
import { RefreshCw, Trash2, Search, Eye, Filter, Users, Mail } from 'lucide-react';

const mockCustomers = [
  { id: '1', name: 'Martina Rossi', email: 'marti.rossi@email.com', ltv: 350000, orders: 4, lastActive: '14 Jul 2026', type: 'VIP' },
  { id: '2', name: 'Joaquin Silva', email: 'jsilva99@email.com', ltv: 116000, orders: 1, lastActive: '14 Jul 2026', type: 'Nuevo' },
  { id: '3', name: 'Lucia Gimenez', email: 'lu.gimenez@email.com', ltv: 280000, orders: 3, lastActive: '13 Jul 2026', type: 'Recurrente' },
  { id: '4', name: 'Tomas Fernandez', email: 'tomi.f@email.com', ltv: 145000, orders: 1, lastActive: '13 Jul 2026', type: 'Nuevo' },
  { id: '5', name: 'Sofia Mendez', email: 'sofi.mendez@email.com', ltv: 550000, orders: 7, lastActive: '12 Jul 2026', type: 'VIP' },
];

export default function AdminCustomers() {
  const [hasData, setHasData] = useState(false);
  const customers = hasData ? mockCustomers : [];

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Clientes</h1>
          <p className="text-sm text-[#B08B8B] mt-2 font-medium">Conoce a tus patinadores más fieles (CRM)</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setHasData(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#1C1612] text-white rounded-xl font-bold text-sm hover:bg-[#D97230] transition-colors"
          >
            <RefreshCw size={16} />
            Generar datos
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
        <div className="p-8 border-b border-[#1C1612]/5 flex flex-col md:flex-row justify-between gap-6 items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B08B8B]" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o email..." 
              className="w-full pl-12 pr-4 py-3.5 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-white text-[#1C1612] border border-[#1C1612]/10 hover:bg-[#F5F1EB] transition-colors">
            <Filter size={16} />
            Filtrar VIPs
          </button>
        </div>

        {/* Tabla */}
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
            <div className="w-16 h-16 bg-[#F5F1EB] rounded-2xl flex items-center justify-center text-[#B08B8B] mb-4">
              <Users size={24} />
            </div>
            <p className="text-[#1C1612] font-bold mb-2">No hay clientes registrados</p>
            <p className="text-sm text-[#B08B8B]">Genera datos de muestra para ver cómo funciona el CRM.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#F5F1EB]/30">
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5">Cliente</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Tipo</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Lifetime Value (LTV)</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Pedidos</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Última Compra</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1612]/5">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[#F5F1EB]/30 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-[#1C1612] text-sm">{customer.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#B08B8B] mt-1">
                        <Mail size={12} />
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl inline-flex items-center justify-center
                        ${customer.type === 'VIP' ? 'bg-[#D97230]/10 text-[#D97230]' : 
                          customer.type === 'Recurrente' ? 'bg-[#34D399]/10 text-[#34D399]' : 
                          'bg-[#1C1612]/5 text-[#1C1612]'}`}
                      >
                        {customer.type}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <p className="font-black text-[#1C1612] text-sm">${customer.ltv.toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-6 font-bold text-[#1C1612] text-sm text-center">
                      {customer.orders}
                    </td>
                    <td className="px-8 py-6 text-sm text-[#1C1612] font-medium text-center">
                      {customer.lastActive}
                    </td>
                    <td className="px-8 py-6 text-center flex justify-center gap-2">
                      <button className="p-3 text-[#B08B8B] hover:text-[#D97230] hover:bg-[#D97230]/10 rounded-xl transition-colors" title="Ver detalle">
                        <Eye size={18} />
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
