import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Users, Ticket } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F5F1EB] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 md:w-56 lg:w-64 bg-white border-r border-[#1C1612]/5 flex flex-col shrink-0 transition-all duration-300">
        <div className="p-4 md:p-6 border-b border-[#1C1612]/5 h-[72px] flex items-center justify-center md:justify-start">
          <Link href="/admin">
            <h2 className="hidden md:block text-base font-black tracking-tighter text-[#1C1612] uppercase truncate">
              SR Admin<span className="text-[#D97230]">.</span>
            </h2>
            <h2 className="block md:hidden text-sm font-black tracking-tighter text-[#1C1612] uppercase">
              SR<span className="text-[#D97230]">.</span>
            </h2>
          </Link>
        </div>
        
        <nav className="flex-1 p-2 md:p-4 space-y-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center justify-center md:justify-start gap-3 p-3 md:px-4 md:py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm" title="Dashboard">
            <LayoutDashboard size={18} className="text-[#D97230] shrink-0" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center justify-center md:justify-start gap-3 p-3 md:px-4 md:py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm" title="Productos">
            <Package size={18} className="text-[#B08B8B] shrink-0" />
            <span className="hidden md:inline">Productos</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center justify-center md:justify-start gap-3 p-3 md:px-4 md:py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm" title="Pedidos">
            <ShoppingCart size={18} className="text-[#B08B8B] shrink-0" />
            <span className="hidden md:inline">Pedidos</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center justify-center md:justify-start gap-3 p-3 md:px-4 md:py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm" title="Clientes">
            <Users size={18} className="text-[#B08B8B] shrink-0" />
            <span className="hidden md:inline">Clientes</span>
          </Link>
          <Link href="/admin/coupons" className="flex items-center justify-center md:justify-start gap-3 p-3 md:px-4 md:py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm" title="Cupones">
            <Ticket size={18} className="text-[#B08B8B] shrink-0" />
            <span className="hidden md:inline">Cupones</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center justify-center md:justify-start gap-3 p-3 md:px-4 md:py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm mt-8" title="Configuración">
            <Settings size={18} className="text-[#B08B8B] shrink-0" />
            <span className="hidden md:inline">Configuración</span>
          </Link>
        </nav>
        
        <div className="p-2 md:p-4 border-t border-[#1C1612]/5">
          <button className="w-full flex items-center justify-center md:justify-start gap-3 p-3 md:px-4 md:py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-bold text-sm" title="Cerrar Sesión">
            <LogOut size={18} className="shrink-0" />
            <span className="hidden md:inline">Salir</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
