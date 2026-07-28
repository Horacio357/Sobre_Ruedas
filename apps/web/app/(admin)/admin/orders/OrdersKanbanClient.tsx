"use client";
import React, { useState } from 'react';
import { Search, Eye, Filter, ShoppingBag, X, Package, Clock, CheckCircle2, Truck, Inbox } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import toast from 'react-hot-toast';

interface OrdersKanbanClientProps {
  initialOrders: any[];
}

const COLUMNS = [
  { id: 'pending', title: 'Pendiente de Pago', icon: <Clock size={18} className="text-orange-500" />, bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { id: 'processing', title: 'En Armado', icon: <Inbox size={18} className="text-blue-500" />, bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { id: 'confirmed', title: 'Listo para Despachar', icon: <CheckCircle2 size={18} className="text-emerald-500" />, bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  { id: 'shipped', title: 'Enviado', icon: <Truck size={18} className="text-purple-500" />, bgColor: 'bg-purple-50', borderColor: 'border-purple-200' }
];

export default function OrdersKanbanClient({ initialOrders }: OrdersKanbanClientProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const supabase = createClient();

  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    e.dataTransfer.setData('orderId', orderId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('orderId');
    if (!orderId) return;

    const order = orders.find(o => o.id === orderId);
    if (!order || order.status === newStatus) return;

    await updateOrderStatus(orderId, newStatus);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setIsUpdating(true);
    
    // Optimistic update
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      toast.error('Error al actualizar el estado');
      // Revert on error
      setOrders(initialOrders);
    } else {
      toast.success('Estado actualizado');
    }
    setIsUpdating(false);
  };

  const filteredOrders = orders.filter(o => 
    o.buyer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-[1600px] mx-auto overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Pedidos</h1>
          <p className="text-sm text-[#B08B8B] mt-2 font-medium">Gestiona y avanza el estado de las compras (Arrastra las tarjetas)</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B08B8B]" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por cliente o N°..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-[#D97230]/20 text-sm font-medium border border-[#1C1612]/10"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
        {COLUMNS.map(column => (
          <div 
            key={column.id} 
            className="flex-shrink-0 w-80 lg:w-1/4 min-w-[300px] flex flex-col snap-center"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className={`p-4 rounded-t-3xl border-t border-x ${column.borderColor} ${column.bgColor} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                {column.icon}
                <h3 className="font-black text-[#1C1612] text-sm">{column.title}</h3>
              </div>
              <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-[#1C1612] shadow-sm">
                {filteredOrders.filter(o => o.status === column.id || (column.id === 'shipped' && o.status === 'delivered')).length}
              </span>
            </div>
            
            <div className={`flex-1 p-4 rounded-b-3xl border-b border-x ${column.borderColor} bg-white/50 space-y-4 min-h-[500px]`}>
              {filteredOrders
                .filter(o => o.status === column.id || (column.id === 'shipped' && o.status === 'delivered'))
                .map(order => (
                <div 
                  key={order.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, order.id)}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-[#1C1612]/5 cursor-grab active:cursor-grabbing hover:shadow-md transition-all hover:-translate-y-1"
                  onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-[#B08B8B]">#{order.order_number || order.id.slice(0,6)}</span>
                    <span className="text-xs font-bold text-[#1C1612] bg-[#F5F1EB] px-2 py-1 rounded-lg">
                      {new Date(order.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <h4 className="font-black text-[#1C1612] text-sm mb-1">{order.buyer_name}</h4>
                  <p className="text-xs text-[#B08B8B] mb-4">{order.buyer_email}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#1C1612]/5">
                    <span className="font-black text-[#D97230]">${order.total_ars?.toLocaleString('es-AR')}</span>
                    <button className="w-8 h-8 rounded-full bg-[#F5F1EB] flex items-center justify-center text-[#1C1612] hover:bg-[#D97230] hover:text-white transition-colors">
                      <Eye size={14} />
                    </button>
                  </div>

                  {/* Botones de acción rápida para móvil */}
                  <div className="mt-3 flex gap-2 lg:hidden">
                    {column.id === 'pending' && (
                      <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'processing'); }} className="flex-1 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl">En Armado</button>
                    )}
                    {column.id === 'processing' && (
                      <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'confirmed'); }} className="flex-1 py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl">Listo</button>
                    )}
                    {column.id === 'confirmed' && (
                      <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'shipped'); }} className="flex-1 py-2 bg-purple-50 text-purple-600 text-xs font-bold rounded-xl">Enviado</button>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredOrders.filter(o => o.status === column.id || (column.id === 'shipped' && o.status === 'delivered')).length === 0 && (
                <div className="h-32 border-2 border-dashed border-[#1C1612]/10 rounded-2xl flex items-center justify-center">
                  <span className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Vacío</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-[#1C1612]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative">
            <div className="p-6 md:p-8 border-b border-[#1C1612]/5 relative shrink-0">
              <div className="text-center w-full">
                <h3 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Pedido #{selectedOrder.order_number || selectedOrder.id.slice(0,6)}</h3>
                <p className="text-[#B08B8B] mt-1 font-medium text-sm">{new Date(selectedOrder.created_at).toLocaleString('es-AR')}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-[#B08B8B] hover:text-[#1C1612] transition-colors rounded-xl hover:bg-[#F5F1EB]">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto w-full">
              <div className="bg-[#F5F1EB] p-6 rounded-3xl flex flex-col md:flex-row gap-6 justify-between items-center text-center md:text-left w-full">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest mb-2">Cliente</p>
                  <p className="font-black text-[#1C1612] text-lg">{selectedOrder.buyer_name}</p>
                  <p className="text-sm font-medium text-[#B08B8B] mt-1">{selectedOrder.buyer_email}</p>
                  <p className="text-sm font-medium text-[#B08B8B]">{selectedOrder.buyer_phone}</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-[#1C1612]/10"></div>
                <div className="flex-1 md:text-right">
                  <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest mb-2">Total Pagado</p>
                  <p className="font-black text-[#D97230] text-3xl md:text-4xl">${selectedOrder.total_ars?.toLocaleString('es-AR')}</p>
                </div>
              </div>
              
              <div className="bg-white border-2 border-dashed border-[#1C1612]/10 p-6 md:p-8 rounded-3xl">
                <h4 className="text-base font-black text-[#1C1612] mb-4 flex items-center justify-center md:justify-start gap-2">
                  <ShoppingBag size={18} className="text-[#D97230]" />
                  Dirección de Envío
                </h4>
                <div className="text-sm font-medium text-[#1C1612] space-y-1 text-center md:text-left">
                   {selectedOrder.shipping_address ? (
                     <>
                        <p>{selectedOrder.shipping_address.street}</p>
                        <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.province}</p>
                        <p>CP: {selectedOrder.shipping_address.zip}</p>
                     </>
                   ) : (
                     <p className="text-[#B08B8B]">Retiro en local o sin especificar</p>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
