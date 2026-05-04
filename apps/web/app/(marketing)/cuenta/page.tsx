'use client';

// ============================================================
// SOBRE RUEDAS — Cuenta de Usuario (Profile)
// Dashboard minimalista para gestión de perfil y pedidos
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { 
  User as UserIcon, 
  Package, 
  MapPin, 
  LogOut, 
  Settings,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-40 pt-12">
      <div className="container-apple">
        
        {/* Header del Perfil */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-24 h-24 rounded-[2rem] object-cover shadow-2xl border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-[#F5F0EA]">
                 <Settings size={16} className="text-[#9A8A72]" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-4xl font-black text-[#1C1612] tracking-tighter">Hola, {user.name}</h1>
              <p className="text-[#9A8A72] font-medium flex items-center gap-2 mt-1">
                {user.email} 
                <span className="w-1 h-1 rounded-full bg-[#D8CEBC]" />
                {user.role === 'admin' ? (
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#D97230] bg-[#D97230]/5 px-2 py-0.5 rounded-full border border-[#D97230]/10">Administrador</span>
                ) : (
                  <span className="text-[9px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Cliente Elite</span>
                )}
              </p>
            </div>
          </div>
          <button 
            onClick={() => logout()}
            className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-[#EAE3D9] text-[11px] font-black uppercase tracking-widest text-[#9A8A72] hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Cerrar Sesión
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Accesos rápidos */}
          <div className="lg:col-span-4 space-y-6">
             <SectionCard title="Menú de Cuenta">
                <nav className="space-y-2">
                   <MenuLink icon={<Package size={18} />} label="Mis Pedidos" active />
                   <MenuLink icon={<MapPin size={18} />} label="Direcciones" />
                   <MenuLink icon={<UserIcon size={18} />} label="Datos Personales" />
                   {user.role === 'admin' && (
                     <Link href="/admin" className="flex items-center justify-between p-4 rounded-2xl bg-[#D97230]/5 border border-[#D97230]/10 text-[#D97230] group hover:bg-[#D97230]/10 transition-all mt-4">
                        <div className="flex items-center gap-4">
                           <ExternalLink size={18} />
                           <span className="text-[11px] font-black uppercase tracking-widest">Panel Admin</span>
                        </div>
                        <ChevronRight size={16} />
                     </Link>
                   )}
                </nav>
             </SectionCard>

             <div className="bg-[#1C1612] rounded-[2.5rem] p-10 text-white overflow-hidden relative shadow-2xl">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D97230] rounded-full blur-[60px] opacity-20" />
                <h4 className="text-xl font-black mb-4 relative z-10">¿Necesitas ayuda?</h4>
                <p className="text-white/50 text-sm mb-8 leading-relaxed relative z-10">Nuestro equipo de expertos está disponible para asistirte con tus patines.</p>
                <button className="btn-primary w-full py-4 text-[10px] tracking-widest relative z-10">Contactar Soporte</button>
             </div>
          </div>

          {/* Columna Derecha: Contenido Dinámico */}
          <div className="lg:col-span-8 space-y-8">
             <SectionCard title="Pedidos Recientes">
                <div className="space-y-4">
                   {/* Mock de pedidos */}
                   <OrderRow id="SR-49201" date="3 de Mayo, 2024" total="$ 1.140.000" status="En camino" statusColor="text-[#D97230] bg-[#D97230]/5" />
                   <OrderRow id="SR-48150" date="15 de Abril, 2024" total="$ 450.000" status="Entregado" statusColor="text-green-600 bg-green-50" />
                   
                   <div className="pt-6 text-center">
                      <button className="text-[11px] font-black text-[#9A8A72] uppercase tracking-[0.2em] hover:text-[#D97230] transition-colors">Ver historial completo</button>
                   </div>
                </div>
             </SectionCard>

             <SectionCard title="Dirección Predeterminada">
                <div className="flex items-start justify-between p-6 rounded-2xl bg-[#FAF7F2] border border-[#F5F0EA]">
                   <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#D97230] shadow-sm">
                         <MapPin size={20} />
                      </div>
                      <div>
                         <p className="font-black text-[#1C1612] text-lg">Casa Principal</p>
                         <p className="text-sm text-[#9A8A72] mt-1 leading-relaxed">Av. Libertador 4500, Piso 12A<br />C1425 Buenos Aires, Argentina</p>
                      </div>
                   </div>
                   <button className="text-[10px] font-black text-[#D97230] uppercase tracking-widest hover:underline">Cambiar</button>
                </div>
             </SectionCard>
          </div>

        </div>
      </div>
    </main>
  );
}

function SectionCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-sm border border-[#EAE3D9]/50"
    >
      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#9A8A72] mb-10 border-b border-[#F5F0EA] pb-6">{title}</h3>
      {children}
    </motion.section>
  );
}

function MenuLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${active ? 'bg-[#FAF7F2] text-[#1C1612]' : 'text-[#9A8A72] hover:bg-[#FAF7F2] hover:text-[#1C1612]'}`}>
      <div className="flex items-center gap-4">
        <div className={`${active ? 'text-[#D97230]' : 'text-[#D8CEBC]'} group-hover:text-[#D97230] transition-colors`}>
           {icon}
        </div>
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <ChevronRight size={16} className={`${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all`} />
    </button>
  );
}

function OrderRow({ id, date, total, status, statusColor }: any) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-white border border-[#F5F0EA] hover:border-[#D97230]/20 hover:shadow-lg transition-all group gap-4">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] flex items-center justify-center text-[#D8CEBC] group-hover:text-[#D97230] transition-colors">
          <Package size={24} />
        </div>
        <div>
          <p className="font-black text-[#1C1612]">{id}</p>
          <p className="text-[11px] text-[#9A8A72] font-medium mt-0.5">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-right">
          <p className="font-black text-[#1C1612]">{total}</p>
          <p className="text-[9px] text-[#9A8A72] font-black uppercase tracking-widest mt-1">Total abonado</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-transparent transition-colors ${statusColor}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
