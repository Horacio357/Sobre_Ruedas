'use client';

// ============================================================
// SOBRE RUEDAS — Catálogo de Patines
// Diseño minimalista Apple-inspired, paleta warm
// ============================================================

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Search, LayoutGrid, List } from 'lucide-react';
import { PRODUCTS } from '@/lib/mock-data';
import ProductCard from '@/components/catalog/ProductCard';
import FilterSidebar from '@/components/catalog/FilterSidebar';
import { cn } from '@/lib/utils';

export default function PatinesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      const matchLevel = selectedLevel === 'all' || product.level === selectedLevel;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchBrand && matchLevel && matchSearch;
    });
  }, [selectedCategory, selectedBrand, selectedLevel, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFF9F9]">
      {/* Hero Header — Replicating Hero Aesthetics */}
      <section className="pt-48 pb-32">
        <div className="container-apple">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center space-y-10"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D97230] mb-4 block">
              Colección Profesional
            </span>
            <h1 className="text-[#1C1612] text-[clamp(3.5rem,12vw,7rem)] font-extralight leading-[1.05] tracking-tighter">
              Catálogo de
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97230] to-[#C4972A]">Excelencia.</span>
            </h1>
            <p className="text-[#B08B8B] text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto opacity-80">
              Equipamiento técnico para patinadores que buscan superar sus límites. Desde la iniciación hasta el alto rendimiento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar — More whitespace and minimal */}
      <section className="sticky top-[52px] z-30 bg-[#FFF9F9]/80 backdrop-blur-xl py-10">
        <div className="container-apple">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            {/* Search */}
            <div className="relative flex-1 max-w-2xl mx-auto md:mx-0">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#B08B8B] opacity-50" size={20} />
              <input
                type="text"
                placeholder="Buscar modelo, marca o nivel..."
                className="w-full pl-16 pr-6 py-5 bg-white border border-[#F9EAEA] rounded-full text-base focus:shadow-2xl focus:border-[#D97230]/30 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center gap-10">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#1C1612] hover:text-[#D97230] transition-colors"
              >
                <SlidersHorizontal size={18} strokeWidth={1.5} />
                Filtrar Selección
              </button>

              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#B08B8B]">
                {filteredProducts.length} Productos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-48 pt-20">
        <div className="container-apple">
          <div className="flex flex-col gap-32">
            {/* Sidebar */}
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            {/* Grid with Extreme Gaps */}
            <div className="w-full">
              <AnimatePresence mode="popLayout">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32"
                  >
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-[#F5F0EA] rounded-full flex items-center justify-center mb-6">
                      <Search size={32} className="text-[#9A8A72]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1C1612] mb-2">No encontramos resultados</h3>
                    <p className="text-[#6B5E4A] max-w-sm">
                      Prueba ajustando los filtros o realizando una nueva búsqueda.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedBrand('all');
                        setSelectedLevel('all');
                        setSearchQuery('');
                      }}
                      className="mt-6 text-[#D97230] font-bold hover:underline"
                    >
                      Limpiar todos los filtros
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
