"use client";
import React, { useState } from 'react';
import { RefreshCw, Trash2, Search, Eye, Filter } from 'lucide-react';

const mockOrders = [
  { id: '1005', customer: 'Martina Rossi', email: 'marti.rossi@email.com', date: '14 Jul 2026', total: 101500, status: 'Pagado', method: 'Mercado Pago' },
  { id: '1004', customer: 'Joaquin Silva', email: 'jsilva99@email.com', date: '14 Jul 2026', total: 116000, status: 'Pendiente', method: 'Transferencia' },
  { id: '1003', customer: 'Lucia Gimenez', email: 'lu.gimenez@email.com', date: '13 Jul 2026', total: 130500, status: 'Pagado', method: 'Modo' },
  { id: '1002', customer: 'Tomas Fernandez', email: 'tomi.f@email.com', date: '13 Jul 2026', total: 145000, status: 'Enviado', method: 'Mercado Pago' },
  { id: '1001', customer: 'Sofia Mendez', email: 'sofi.mendez@email.com', date: '12 Jul 2026', total: 159500, status: 'Entregado', method: 'Mercado Pago' },
];

export default function AdminOrders() {
  const [hasData, setHasData] = useState(false);
  const orders = hasData ? mockOrders : [];

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Pedidos</h1>
          <p className="text-sm text-[#B08B8B] mt-2 font-medium">Gestiona las compras de tus clientes</p>
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

      <div className="bg-white rounded-3xl shadow-sm border border-[#1C1612]/5 overflow-hidden">
        {/* Barra de herramientas */}
        <div className="p-6 border-b border-[#1C1612]/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B08B8B]" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por cliente, email o ID..." 
              className="w-full pl-12 pr-4 py-3 bg-[#F5F1EB] rounded-xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#1C1612] border border-[#1C1612]/10 rounded-xl font-bold text-sm hover:bg-[#F5F1EB] transition-colors">
            <Filter size={16} />
            Filtrar
          </button>
        </div>

        {/* Tabla */}
        {!hasData ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
            <div className="w-16 h-16 bg-[#F5F1EB] rounded-2xl flex items-center justify-center text-[#B08B8B] mb-4">
              <ShoppingBag size={24} />
            </div>
            <p className="text-[#1C1612] font-bold mb-2">No hay pedidos</p>
            <p className="text-sm text-[#B08B8B]">Genera datos de muestra para ver cómo funciona esta sección.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F1EB]/50">
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">ID</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Cliente</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Fecha</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Total</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap">Estado</th>
                  <th className="p-4 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1612]/5">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#F5F1EB]/30 transition-colors">
                    <td className="p-4 font-bold text-[#1C1612] text-sm">#{order.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-[#1C1612] text-sm">{order.customer}</p>
                      <p className="text-xs text-[#B08B8B] mt-0.5">{order.email}</p>
                    </td>
                    <td className="p-4 text-sm text-[#1C1612] font-medium">{order.date}</td>
                    <td className="p-4">
                      <p className="font-black text-[#1C1612]">${order.total}</p>
                      <p className="text-[10px] text-[#B08B8B] uppercase tracking-widest mt-1">{order.method}</p>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg inline-flex items-center justify-center
                        ${order.status === 'Pagado' ? 'bg-[#34D399]/10 text-[#34D399]' : 
                          order.status === 'Pendiente' ? 'bg-orange-100 text-orange-600' : 
                          order.status === 'Enviado' ? 'bg-blue-100 text-blue-600' : 
                          'bg-[#1C1612]/5 text-[#1C1612]'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-[#B08B8B] hover:text-[#D97230] hover:bg-[#D97230]/10 rounded-lg transition-colors">
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
