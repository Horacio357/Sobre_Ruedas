// ============================================================
// SOBRE RUEDAS — Root Layout (Next.js App Router)
// ============================================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Sobre Ruedas',
    default: 'Sobre Ruedas — Patines Artísticos Premium',
  },
  description:
    'Tienda especializada en patines artísticos. Encontrá tu bota, plancha y ruedas ideales, o armá tu setup personalizado con nuestro configurador interactivo.',
  keywords: [
    'patines artísticos', 'patines sobre ruedas', 'botas de patinaje',
    'planchas patines', 'ruedas patinaje', 'patines Argentina',
    'Risport', 'Edea', 'Jackson', 'patinaje artístico',
  ],
  authors: [{ name: 'Sobre Ruedas' }],
  creator: 'Sobre Ruedas',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://sobreruedas.com.ar',
    siteName: 'Sobre Ruedas',
    title: 'Sobre Ruedas — Patines Artísticos Premium',
    description: 'Tu tienda especializada en patines artísticos en Argentina.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Sobre Ruedas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Ruedas — Patines Artísticos Premium',
    description: 'Tu tienda especializada en patines artísticos en Argentina.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body className="bg-white text-sr-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
