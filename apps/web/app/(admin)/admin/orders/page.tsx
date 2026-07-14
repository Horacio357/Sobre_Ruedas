import React from 'react';

export default function AdminOrders() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#1C1612] tracking-tighter">Pedidos</h1>
          <p className="text-[#B08B8B] mt-1 font-medium">Gestiona las compras de tus clientes</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#1C1612]/5 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-[#1C1612] font-bold mb-2">Próximamente</p>
          <p className="text-sm text-[#B08B8B]">Esta sección se llenará de pedidos una vez conectada la pasarela de pago.</p>
        </div>
      </div>
    </div>
  );
}
