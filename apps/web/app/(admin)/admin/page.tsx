"use client";
import React, { useState } from 'react';
import { TrendingUp, Users, ShoppingBag, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Datos de muestra iniciales (vacíos)
const emptyData = [
  { name: '1 Jul', ventas: 0 },
  { name: '5 Jul', ventas: 0 },
  { name: '10 Jul', ventas: 0 },
  { name: '15 Jul', ventas: 0 },
  { name: '20 Jul', ventas: 0 },
  { name: '25 Jul', ventas: 0 },
  { name: '30 Jul', ventas: 0 },
];

// Datos de muestra realistas
const sampleData = [
  { name: '1 Jul', ventas: 4000 },
  { name: '5 Jul', ventas: 3000 },
  { name: '10 Jul', ventas: 8000 },
  { name: '15 Jul', ventas: 2780 },
  { name: '20 Jul', ventas: 9890 },
  { name: '25 Jul', ventas: 5390 },
  { name: '30 Jul', ventas: 11490 },
];

export default function AdminDashboard() {
  const [hasData, setHasData] = useState(false);
  const data = hasData ? sampleData : emptyData;

  const ingresos = hasData ? "$44,550" : "$0";
  const pedidos = hasData ? "142" : "0";
  const clientes = hasData ? "38" : "0";
  const alertas = hasData ? "3" : "0";

  return (
    <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#1C1612] tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#B08B8B] mt-2 font-medium">Resumen del rendimiento de Sobre Ruedas</p>
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

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 flex flex-col items-center justify-center text-center gap-4 min-h-[180px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#D97230]/10 flex items-center justify-center text-[#D97230]">
              <TrendingUp size={24} />
            </div>
            <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Ingresos</p>
          </div>
          <h3 className="text-3xl font-black text-[#1C1612] tracking-tighter">{ingresos}</h3>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 flex flex-col items-center justify-center text-center gap-4 min-h-[180px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#34D399]/10 flex items-center justify-center text-[#34D399]">
              <ShoppingBag size={24} />
            </div>
            <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Pedidos</p>
          </div>
          <h3 className="text-3xl font-black text-[#1C1612] tracking-tighter">{pedidos}</h3>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 flex flex-col items-center justify-center text-center gap-4 min-h-[180px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
              <Users size={24} />
            </div>
            <p className="text-xs font-bold text-[#B08B8B] uppercase tracking-widest">Clientes</p>
          </div>
          <h3 className="text-3xl font-black text-[#1C1612] tracking-tighter">{clientes}</h3>
        </div>

        <div className="bg-[#1C1612] p-8 rounded-[2rem] shadow-sm border border-[#1C1612]/5 text-white flex flex-col items-center justify-center text-center gap-4 min-h-[180px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <AlertCircle size={24} />
            </div>
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Bajo Stock</p>
          </div>
          <h3 className="text-3xl font-black text-white tracking-tighter">{alertas}</h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-[#1C1612]/5 min-h-[450px]">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-xl font-black text-[#1C1612] tracking-tight">Gráfico de Ventas</h3>
            <p className="text-sm text-[#B08B8B] mt-2">Rendimiento de los últimos 30 días</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                  formatter={(value: any) => [`$${value}`, 'Ventas']}
                />
                <Area type="monotone" dataKey="ventas" stroke="#D97230" strokeWidth={4} fillOpacity={1} fill="url(#colorVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#1C1612]/5 min-h-[450px]">
          <h3 className="text-xl font-black text-[#1C1612] tracking-tight mb-8 text-center md:text-left">Últimos Pedidos</h3>
          {!hasData ? (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-sm text-[#B08B8B] text-center px-4 leading-relaxed">Todavía no tienes pedidos recientes.<br/>¡Genera datos de muestra!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-[#F5F1EB] rounded-2xl transition-colors cursor-pointer">
                  <div>
                    <p className="font-bold text-[#1C1612] text-sm">Pedido #{1000 + i}</p>
                    <p className="text-xs text-[#B08B8B] mt-1">Hace {i * 2} horas</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="font-black text-[#1C1612] text-sm">${(145000 * (1.2 - i*0.1)).toFixed(0)}</p>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#34D399] bg-[#34D399]/10 px-2 py-1 rounded mt-1.5 inline-block">Pagado</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
