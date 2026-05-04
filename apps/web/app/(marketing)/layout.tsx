// ============================================================
// SOBRE RUEDAS — Layout del grupo (marketing)
// Envuelve todas las páginas públicas con Navbar + Footer + WhatsApp
// ============================================================

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import CartDrawer from '@/components/cart/CartDrawer';
import TotalsSync from '@/components/shared/TotalsSync';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <TotalsSync />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
