'use client';

// ============================================================
// SOBRE RUEDAS — Footer
// Diseño minimalista dark con columnas de links y métodos de pago
// ============================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const FOOTER_LINKS = {
  tienda: [
    { label: 'Catálogo de Patines', href: '/patines' },
    { label: 'Armá el tuyo', href: '/arma-el-tuyo' },
    { label: 'Componentes', href: '/componentes' },
    { label: 'Outlet', href: '/outlet' },
  ],
  ayuda: [
    { label: 'Guía de Talles', href: '/guia#calculadora' },
    { label: 'Cómo elegir patines', href: '/guia#como-elegir' },
    { label: 'Mantenimiento', href: '/guia#mantenimiento' },
    { label: 'Contacto', href: '/contacto' },
  ],
  empresa: [
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Envíos', href: '/envios' },
    { label: 'Devoluciones', href: '/devoluciones' },
    { label: 'Términos y Condiciones', href: '/terminos' },
  ],
};

const PAYMENT_METHODS = [
  { id: 'mp', name: 'Mercado Pago' },
  { id: 'modo', name: 'MODO' },
  { id: 'pp', name: 'PayPal' },
  { id: 'payway', name: 'Payway' },
  { id: 'gocuotas', name: 'GO Cuotas' }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1612] text-[#B8A98E]" role="contentinfo">
      {/* Newsletter */}
      <div className="border-b border-white/[0.06]">
        <div className="container-apple py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-white text-xl font-bold tracking-tight mb-1">
                Novedades y ofertas exclusivas
              </h3>
              <p className="text-[#9A8A72] text-sm">Suscribite y recibí descuentos antes que nadie.</p>
            </div>
            <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                id="newsletter-email"
                type="email"
                placeholder="tu@email.com"
                required
                className="flex-1 md:w-64 px-4 py-2.5 rounded bg-white/[0.07] border border-white/[0.10] text-white placeholder-[#6B5E4A] text-sm focus:outline-none focus:border-[#D97230] transition-colors"
              />
              <button type="submit" className="btn-primary text-sm px-5 py-2.5 shrink-0">
                Suscribirme
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Links grid */}
      <div className="container-apple py-20 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 lg:gap-24"
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
            <Link href="/" className="flex flex-col items-start gap-0 w-fit group mb-8">
              <Logo className="h-16 w-auto" variant="light" />
            </Link>
            <p className="text-sm text-[#9A8A72] leading-relaxed mb-14">
              Tu tienda especializada en patines artísticos. Expertos en equipamiento de competición y disfrute.
            </p>
            <ul className="space-y-8 text-sm">
              <li className="flex items-center gap-2 text-[#9A8A72]">
                <MapPin size={14} className="text-[#D97230] shrink-0" />
                <span>Buenos Aires, Argentina</span>
              </li>
              <li>
                <a href="tel:+541112345678" className="flex items-center gap-2 text-[#9A8A72] hover:text-white transition-colors">
                  <Phone size={14} className="text-[#D97230] shrink-0" />
                  <span>+54 11 1234-5678</span>
                </a>
              </li>
              <li>
                <a href="mailto:hola@sobreruedas.com.ar" className="flex items-center gap-2 text-[#9A8A72] hover:text-white transition-colors">
                  <Mail size={14} className="text-[#D97230] shrink-0" />
                  <span>hola@sobreruedas.com.ar</span>
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-16">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://instagram.com/sobreruedas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Sobre Ruedas"
                className="w-10 h-10 rounded bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-[#9A8A72] hover:text-[#D97230] hover:bg-white/[0.10] hover:border-[#D97230]/30 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="https://facebook.com/sobreruedas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Sobre Ruedas"
                className="w-10 h-10 rounded bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-[#9A8A72] hover:text-[#D97230] hover:bg-white/[0.10] hover:border-[#D97230]/30 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://tiktok.com/@sobreruedas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Sobre Ruedas"
                className="w-10 h-10 rounded bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-[#9A8A72] hover:text-[#D97230] hover:bg-white/[0.10] hover:border-[#D97230]/30 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-3v5.71A4 4 0 0 1 9 12Z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="https://youtube.com/@sobreruedas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube de Sobre Ruedas"
                className="w-10 h-10 rounded bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-[#9A8A72] hover:text-[#D97230] hover:bg-white/[0.10] hover:border-[#D97230]/30 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Link columns */}
          {(['tienda', 'ayuda', 'empresa'] as const).map((section) => (
            <motion.div key={section} variants={itemVariants}>
              <h4 className="text-white font-semibold text-sm mb-16 tracking-tight capitalize">
                {section === 'empresa' ? 'Empresa' : section === 'ayuda' ? 'Ayuda' : 'Tienda'}
              </h4>
              <ul className="space-y-8">
                {FOOTER_LINKS[section].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[#9A8A72] hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] mt-12">
        <div className="container-apple py-14 flex flex-col sm:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-xs text-[#6B5E4A]">
              © {year} Sobre Ruedas. Todos los derechos reservados.
            </p>
            <p className="text-[10px] text-[#4A4235] uppercase tracking-widest font-black">
              Diseñado con excelencia técnica
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4" aria-label="Métodos de pago aceptados">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method.id}
                title={method.name}
                className="h-9 px-4 bg-white/[0.03] border border-white/[0.06] rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-colors group"
              >
                <span className="text-[10px] font-black text-[#9A8A72] tracking-[0.2em] uppercase group-hover:text-[#D97230] transition-colors">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
