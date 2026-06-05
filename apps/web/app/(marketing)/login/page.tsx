'use client';

// ============================================================
// SOBRE RUEDAS — Login
// Diseño minimalista, centrado, estético Apple
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de auth
    setTimeout(() => {
      login(email, email.split('@')[0]);
      router.push('/cuenta');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link href="/" className="inline-block mb-8">
            <img src="/images/logo.png" alt="Sobre Ruedas" className="h-16 w-auto mx-auto brightness-0"  referrerPolicy="no-referrer" />
          </Link>
          <h1 className="text-4xl font-black text-[#1C1612] tracking-tighter mb-2">Bienvenido de nuevo</h1>
          <p className="text-[#9A8A72] font-medium">Ingresa tus credenciales para continuar</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-sm border border-[#EAE3D9]/50"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#9A8A72] block ml-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D8CEBC]" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@email.com"
                  className="w-full pl-16 pr-8 py-5 bg-[#FAF7F2] border-2 border-transparent rounded-2xl text-[#1C1612] font-black placeholder:text-[#D8CEBC]/40 focus:border-[#D97230]/30 focus:bg-white transition-all outline-none text-base shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-[#9A8A72] block ml-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D8CEBC]" size={18} />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-16 pr-8 py-5 bg-[#FAF7F2] border-2 border-transparent rounded-2xl text-[#1C1612] font-black placeholder:text-[#D8CEBC]/40 focus:border-[#D97230]/30 focus:bg-white transition-all outline-none text-base shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-6 text-base font-black uppercase tracking-[0.2em] shadow-2xl disabled:opacity-30 transition-all mt-4"
            >
              {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
              {!isLoading && <ArrowRight size={20} className="ml-2" />}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-[#F5F0EA] text-center">
             <p className="text-sm text-[#9A8A72] font-medium">
               ¿No tienes cuenta?{' '}
               <Link href="/registro" className="text-[#D97230] font-black hover:underline underline-offset-4 transition-all">
                 Crea una aquí
               </Link>
             </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link href="/" className="text-[10px] font-black text-[#9A8A72] uppercase tracking-[0.4em] hover:text-[#1C1612] transition-colors">
            ← Volver a la tienda
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
