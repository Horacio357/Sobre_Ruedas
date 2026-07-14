import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F5F1EB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#1C1612]/5 flex flex-col">
        <div className="p-6 border-b border-[#1C1612]/5">
          <Link href="/admin">
            <h2 className="text-xl font-black tracking-tighter text-[#1C1612] uppercase">
              SR Admin<span className="text-[#D97230]">.</span>
            </h2>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm">
            <LayoutDashboard size={18} className="text-[#D97230]" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm">
            <Package size={18} className="text-[#B08B8B]" />
            Productos
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#1C1612] hover:bg-[#F9EAEA] transition-colors font-bold text-sm">
            <ShoppingCart size={18} className="text-[#B08B8B]" />
            Pedidos
          </Link>
        </nav>

        <div className="p-4 border-t border-[#1C1612]/5 space-y-2">
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#B08B8B] hover:text-[#1C1612] transition-colors font-bold text-sm">
            <Settings size={18} />
            Configuración
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#B08B8B] hover:text-red-500 transition-colors font-bold text-sm">
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
