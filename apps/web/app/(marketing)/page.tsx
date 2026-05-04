// ============================================================
// SOBRE RUEDAS — Homepage
// Estilo Apple: hero fullscreen, secciones animadas con scroll
// ============================================================

import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import ConfiguratorCTA from '@/components/home/ConfiguratorCTA';
import WhyUs from '@/components/home/WhyUs';
import BrandsStrip from '@/components/home/BrandsStrip';
import StickyFeatures from '@/components/home/StickyFeatures';

export const metadata: Metadata = {
  title: 'Patines Artísticos Premium | Sobre Ruedas',
  description:
    'Encontrá los mejores patines artísticos de Argentina. Risport, Edea, Jackson y más. Armá tu setup personalizado o comprá un combo completo.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsStrip />
      <StickyFeatures />
      <FeaturedProducts />
      <ConfiguratorCTA />
      <WhyUs />
    </>
  );
}
