// ============================================================
// SOBRE RUEDAS — Layout del grupo (marketing)
// Envuelve todas las páginas públicas con Navbar + Footer + WhatsApp
// ============================================================

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingChatWidget from '@/components/shared/FloatingChatWidget';
import CartDrawer from '@/components/cart/CartDrawer';
import TotalsSync from '@/components/shared/TotalsSync';
import Script from 'next/script';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #srp-chat-btn { display: none !important; }
      `}} />
      <Navbar />
      <CartDrawer />
      <TotalsSync />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingChatWidget />
      <Script 
        src="https://base44.app/api/apps/69cb9fa76ed1f034d87f23b0/files/mp/public/69cb9fa76ed1f034d87f23b0/c95be4e45_widget-chat-sobreruedas.js"
        strategy="lazyOnload"
      />
    </>
  );
}
