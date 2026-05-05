'use client';

// ============================================================
// SOBRE RUEDAS — Navbar (Apple Premium Style)
// Rediseño de Espacios: Aire Máximo y Tipografía Limpia
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User as UserIcon } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';

const NAV_LINKS = [
  { label: 'Patines', href: '/patines' },
  { label: 'Armá el tuyo', href: '/arma-el-tuyo', accent: true },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Ayuda', href: '/guia' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const cartStore = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const itemCount = cartStore.items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Barra Superior (Anuncios) ────────────────────────── */}
      <div className="bg-[#1C1612] text-white text-[10px] font-black uppercase tracking-[0.3em] py-3 hidden md:block">
        <div className="container-apple flex items-center justify-between">
          <span>🚚 Envíos a todo el mundo</span>
          <Link href="/outlet" className="hover:text-[#D97230] transition-colors">Descubre el Outlet</Link>
          <span>🎧 Soporte Personalizado</span>
        </div>
      </div>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/90 backdrop-blur-2xl border-b border-[#EAE3D9] py-4'
            : 'bg-[#FAF7F2] py-8 md:py-12'
        )}
      >
        <div className="container-apple">
          {/* Logo y Acciones Primarias */}
          <div className="flex items-center justify-between gap-12 mb-8 md:mb-10">
            
            {/* Buscador (Izq) */}
            <div className="hidden md:flex flex-1 items-center gap-4 text-[#9A8A72] group">
              <Search size={20} strokeWidth={1.5} />
              <span className="text-sm font-medium tracking-tight group-hover:text-[#1C1612] transition-colors cursor-pointer">
                Buscar equipo...
              </span>
            </div>

            {/* Logo Central */}
            <Link href="/" className="shrink-0">
              <Logo className="h-10 md:h-14 w-auto transition-transform duration-500 hover:scale-105" />
            </Link>

            {/* Carrito y Mobile Menu (Der) */}
            <div className="flex flex-1 justify-end items-center gap-8">
              <button 
                onClick={() => cartStore.toggleCart()}
                className="relative p-2 text-[#1C1612] hover:text-[#D97230] transition-all"
              >
                <ShoppingBag size={24} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-[#D97230] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link 
                href={isAuthenticated ? "/cuenta" : "/login"}
                className="hidden md:flex items-center gap-3 p-2 text-[#1C1612] hover:text-[#D97230] transition-all group"
              >
                <div className="text-right hidden lg:block">
                   <p className="text-[9px] font-black uppercase tracking-widest text-[#9A8A72] leading-none mb-1">
                     {isAuthenticated ? 'Hola,' : 'Ingresar'}
                   </p>
                   <p className="text-[11px] font-black text-[#1C1612] leading-none group-hover:text-[#D97230] transition-colors">
                     {isAuthenticated ? user?.name : 'Mi Cuenta'}
                   </p>
                </div>
                <UserIcon size={22} strokeWidth={1.5} />
              </Link>

              <button 
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden p-2 text-[#1C1612]"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Links de Navegación (Desktop) */}
          <div className="hidden md:block">
            <ul className="flex items-center justify-center gap-14">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 relative py-2 block',
                        isActive 
                          ? 'text-[#D97230]' 
                          : link.accent 
                          ? 'text-[#D97230] hover:text-[#B85C20]' 
                          : 'text-[#1C1612]/60 hover:text-[#1C1612]'
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div 
                          layoutId="nav-line"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D97230] rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Menú Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col p-12 md:hidden"
          >
            <div className="flex justify-end mb-20">
              <button onClick={() => setIsMobileOpen(false)} className="p-4 text-[#1C1612]">
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>
            <motion.ul 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
              }}
              className="space-y-16 flex-1 flex flex-col justify-center pb-32"
            >
              {NAV_LINKS.map((link) => (
                <motion.li 
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-medium text-[#1C1612] tracking-tight hover:text-[#D97230] transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="pt-12 border-t border-[#F5F0EA] mt-12"
              >
                <Link
                  href={isAuthenticated ? "/cuenta" : "/login"}
                  className="text-4xl font-medium text-[#D97230] tracking-tight flex items-center justify-between"
                >
                  {isAuthenticated ? 'Mi Cuenta' : 'Ingresar'}
                  <UserIcon size={32} strokeWidth={1.5} />
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
