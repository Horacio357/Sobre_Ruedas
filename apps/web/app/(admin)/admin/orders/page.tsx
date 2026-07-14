"use client";
import React, { useState } from 'react';
import { RefreshCw, Trash2, Search, Eye, Filter, ShoppingBag, X, Package } from 'lucide-react';

const mockOrders = [
  { id: '1005', customer: 'Martina Rossi', email: 'marti.rossi@email.com', date: '14 Jul 2026', total: 101500, status: 'Pagado', method: 'Mercado Pago' },
  { id: '1004', customer: 'Joaquin Silva', email: 'jsilva99@email.com', date: '14 Jul 2026', total: 116000, status: 'Pendiente', method: 'Transferencia' },
  { id: '1003', customer: 'Lucia Gimenez', email: 'lu.gimenez@email.com', date: '13 Jul 2026', total: 130500, status: 'Pagado', method: 'Modo' },
  { id: '1002', customer: 'Tomas Fernandez', email: 'tomi.f@email.com', date: '13 Jul 2026', total: 145000, status: 'Enviado', method: 'Mercado Pago' },
  { id: '1001', customer: 'Sofia Mendez', email: 'sofi.mendez@email.com', date: '12 Jul 2026', total: 159500, status: 'Entregado', method: 'Mercado Pago' },
];

export default function AdminOrders() {
  const [hasData, setHasData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isFiltered, setIsFiltered] = useState(false);

  const baseOrders = hasData ? mockOrders : [];
  const displayOrders = isFiltered ? baseOrders.filter(o => o.status === 'Pagado') : baseOrders;

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
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

      <div className="bg-white rounded-[2rem] shadow-sm border border-[#1C1612]/5 overflow-hidden">
        {/* Barra de herramientas */}
        <div className="p-8 border-b border-[#1C1612]/5 flex flex-col md:flex-row justify-between gap-6 items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B08B8B]" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por cliente..." 
              className="w-full pl-12 pr-4 py-3.5 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium"
            />
          </div>
          <button 
            onClick={() => setIsFiltered(!isFiltered)}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-colors border ${isFiltered ? 'bg-[#D97230] text-white border-[#D97230]' : 'bg-white text-[#1C1612] border-[#1C1612]/10 hover:bg-[#F5F1EB]'}`}
          >
            <Filter size={16} />
            {isFiltered ? 'Quitar Filtro (Pagados)' : 'Filtrar Pagados'}
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
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#F5F1EB]/30">
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">ID</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Cliente</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Fecha</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Total</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Estado</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#B08B8B] uppercase tracking-widest whitespace-nowrap border-b border-[#1C1612]/5 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1612]/5">
                {displayOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#F5F1EB]/30 transition-colors">
                    <td className="px-8 py-6 font-bold text-[#1C1612] text-sm text-center">#{order.id}</td>
                    <td className="px-8 py-6 text-center">
                      <p className="font-bold text-[#1C1612] text-sm">{order.customer}</p>
                      <p className="text-xs text-[#B08B8B] mt-1">{order.email}</p>
                    </td>
                    <td className="px-8 py-6 text-sm text-[#1C1612] font-medium text-center">{order.date}</td>
                    <td className="px-8 py-6 text-center">
                      <p className="font-black text-[#1C1612]">${order.total}</p>
                      <p className="text-[10px] text-[#B08B8B] uppercase tracking-widest mt-1">{order.method}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl inline-flex items-center justify-center
                        ${order.status === 'Pagado' ? 'bg-[#34D399]/10 text-[#34D399]' : 
                          order.status === 'Pendiente' ? 'bg-orange-100 text-orange-600' : 
                          order.status === 'Enviado' ? 'bg-blue-100 text-blue-600' : 
                          'bg-[#1C1612]/5 text-[#1C1612]'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center flex justify-center">
                      <button 
                        onClick={() => handleViewOrder(order)}
                        className="p-3 text-[#B08B8B] hover:text-[#D97230] hover:bg-[#D97230]/10 rounded-xl transition-colors"
                        title="Ver detalle"
                      >
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

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-[#1C1612]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative">
            {/* Cabecera */}
            <div className="p-6 md:p-8 border-b border-[#1C1612]/5 relative shrink-0">
              <div className="text-center w-full">
                <h3 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Pedido #{selectedOrder.id}</h3>
                <p className="text-[#B08B8B] mt-1 font-medium text-sm">14 Jul 2026</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-[#B08B8B] hover:text-[#1C1612] transition-colors rounded-xl hover:bg-[#F5F1EB]">
                <X size={24} />
              </button>
            </div>
            
            {/* Contenido */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto w-full">
              {/* Cliente y Total */}
              <div className="bg-[#F5F1EB] p-6 rounded-3xl flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left w-full">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest mb-2">Cliente</p>
                  <p className="font-black text-[#1C1612] text-lg">Martina Rossi</p>
                  <p className="text-sm font-medium text-[#B08B8B] mt-1">marti.rossi@email.com</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-[#1C1612]/10"></div>
                <div className="w-16 h-px bg-[#1C1612]/10 md:hidden"></div>
                <div className="flex-1 md:text-right">
                  <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest mb-2">Total Pagado</p>
                  <p className="font-black text-[#D97230] text-3xl md:text-4xl">$101.500</p>
                </div>
              </div>
              
              {/* Artículos */}
              <div className="w-full">
                <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest mb-3 text-center md:text-left">Artículos (Mock)</p>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-5 border border-[#1C1612]/10 rounded-3xl w-full text-center sm:text-left bg-white">
                  <div className="w-16 h-16 bg-[#F5F1EB] rounded-2xl flex items-center justify-center text-[#B08B8B] shrink-0">
                    <Package size={24} />
                  </div>
                  <div>
                    <p className="font-black text-[#1C1612] text-base">Botas Edea Fly - Blanco</p>
                    <p className="text-xs font-bold text-[#B08B8B] mt-2 bg-[#F5F1EB] px-3 py-1 rounded-full inline-block">1 unidad</p>
                  </div>
                </div>
              </div>

              {/* Logística y Envío */}
              <div className="bg-white border-2 border-dashed border-[#1C1612]/10 p-6 md:p-8 rounded-3xl flex flex-col items-center md:items-start text-center md:text-left w-full">
                <h4 className="text-base font-black text-[#1C1612] mb-6 flex items-center justify-center md:justify-start gap-2">
                  <ShoppingBag size={18} className="text-[#D97230]" />
                  Logística y Envío
                </h4>
                <div className="w-full space-y-4">
                  <label className="block text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Código de Seguimiento</label>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <input type="text" placeholder="Ej: AND-123456789" className="flex-1 px-4 py-3.5 bg-[#F5F1EB] rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-black tracking-widest text-center sm:text-left text-[#1C1612]" />
                    <button className="px-8 py-3.5 bg-[#1C1612] text-white rounded-2xl font-bold text-sm hover:bg-[#D97230] transition-colors shadow-lg shadow-[#D97230]/20 whitespace-nowrap">
                      Guardar y Notificar
                    </button>
                  </div>
                  <p className="text-[11px] font-medium text-[#B08B8B]">Al guardar, se enviará un email al cliente con el link.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
