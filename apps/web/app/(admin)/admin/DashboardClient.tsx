"use client";
import React from 'react';
import { TrendingUp, Users, ShoppingBag, AlertCircle, Package } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface DashboardClientProps {
  kpis: {
    ingresos: number;
    pedidos: number;
    clientes: number;
    alertasStock: number;
  };
  chartData: { name: string; ventas: number }[];
  recentOrders: any[];
  lowStockProducts: any[];
}

export default function DashboardClient({ kpis, chartData, recentOrders, lowStockProducts }: DashboardClientProps) {
  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#B08B8B] mt-2 font-medium">Resumen del rendimiento de Sobre Ruedas</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 flex flex-col items-center justify-center text-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D97230]/10 flex items-center justify-center text-[#D97230]">
              <TrendingUp size={24} />
            </div>
            <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Ingresos Totales</p>
          </div>
          <h3 className="text-3xl font-black text-[#1C1612] tracking-tighter">
            ${kpis.ingresos.toLocaleString('es-AR')}
          </h3>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 flex flex-col items-center justify-center text-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#34D399]/10 flex items-center justify-center text-[#34D399]">
              <ShoppingBag size={24} />
            </div>
            <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Pedidos (30d)</p>
          </div>
          <h3 className="text-3xl font-black text-[#1C1612] tracking-tighter">{kpis.pedidos}</h3>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 flex flex-col items-center justify-center text-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
              <Users size={24} />
            </div>
            <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Clientes Totales</p>
          </div>
          <h3 className="text-3xl font-black text-[#1C1612] tracking-tighter">{kpis.clientes}</h3>
        </div>

        <Link href="/admin/products?filter=low_stock" className={`p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 flex flex-col items-center justify-center text-center gap-4 transition-colors cursor-pointer group ${kpis.alertasStock > 0 ? 'bg-[#1C1612] text-white hover:bg-[#2A231C]' : 'bg-white hover:bg-[#F5F1EB]'}`}>
          <div className="flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${kpis.alertasStock > 0 ? 'bg-white/10 text-white' : 'bg-orange-100 text-orange-500'}`}>
              <AlertCircle size={24} />
            </div>
            <p className={`text-xs font-bold uppercase tracking-widest ${kpis.alertasStock > 0 ? 'text-white/60' : 'text-[#B08B8B]'}`}>Alertas Stock</p>
          </div>
          <h3 className={`text-3xl font-black tracking-tighter ${kpis.alertasStock > 0 ? 'text-white' : 'text-[#1C1612]'}`}>{kpis.alertasStock}</h3>
        </Link>
      </div>

      {/* Alertas de Stock Rápidas */}
      {lowStockProducts.length > 0 && (
        <div className="mb-12 bg-orange-50/50 border border-orange-200/50 p-6 md:p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-orange-500" size={24} />
            <h3 className="text-lg font-black text-[#1C1612]">Atención: Inventario Crítico</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lowStockProducts.slice(0, 4).map(product => (
              <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F5F1EB] rounded-xl flex items-center justify-center shrink-0">
                  <Package size={20} className="text-[#B08B8B]" />
                </div>
                <div>
                  <p className="font-bold text-[#1C1612] text-sm line-clamp-1" title={product.name}>{product.name}</p>
                  <p className="text-xs font-bold text-orange-500 mt-1">Quedan: {product.stock_quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {lowStockProducts.length > 4 && (
             <p className="text-sm font-medium text-[#B08B8B] mt-4 text-center">
               + {lowStockProducts.length - 4} productos más con bajo stock. Revisa la sección de productos.
             </p>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-[#1C1612]/5 h-auto flex flex-col">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-xl font-black text-[#1C1612] tracking-tight">Gráfico de Ventas</h3>
            <p className="text-sm text-[#B08B8B] mt-2">Rendimiento de los últimos 30 días</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97230" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D97230" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#B08B8B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#B08B8B', fontSize: 12}} tickFormatter={(value) => `$${value}`} dx={-10} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1C1612" opacity={0.05} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '13px' }}
                  formatter={(value: any) => [`$${value.toLocaleString('es-AR')}`, 'Ventas']}
                />
                <Area type="monotone" dataKey="ventas" stroke="#D97230" strokeWidth={4} fillOpacity={1} fill="url(#colorVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#1C1612]/5 h-auto flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-[#1C1612] tracking-tight">Últimos Pedidos</h3>
            <Link href="/admin/orders" className="text-xs font-bold text-[#D97230] hover:underline">Ver todos</Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-sm text-[#B08B8B] text-center px-4 leading-relaxed">No hay pedidos recientes.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link href={`/admin/orders?id=${order.id}`} key={order.id} className="block flex items-center justify-between p-4 hover:bg-[#F5F1EB] rounded-2xl transition-colors cursor-pointer group">
                  <div>
                    <p className="font-bold text-[#1C1612] text-sm group-hover:text-[#D97230] transition-colors">Pedido #{order.id.slice(0, 6)}</p>
                    <p className="text-xs text-[#B08B8B] mt-1 line-clamp-1 w-32">{order.customer_name}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="font-black text-[#1C1612] text-sm">${order.total_ars?.toLocaleString('es-AR')}</p>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded mt-1.5 inline-block
                      ${order.status === 'confirmed' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-[#34D399]/10 text-[#34D399]' : 
                        order.status === 'processing' ? 'bg-orange-100 text-orange-600' : 
                        order.status === 'pending' ? 'bg-[#1C1612]/5 text-[#1C1612]' : 'bg-red-100 text-red-600'}`}
                    >
                      {order.status === 'processing' ? 'En Armado' : 
                       order.status === 'confirmed' ? 'Listo' :
                       order.status === 'shipped' ? 'Enviado' :
                       order.status === 'delivered' ? 'Entregado' :
                       order.status === 'pending' ? 'Pendiente' : order.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
