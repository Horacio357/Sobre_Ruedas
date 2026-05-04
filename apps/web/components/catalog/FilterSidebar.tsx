'use client';

// ============================================================
// SOBRE RUEDAS — Filter Sidebar
// Minimal design, warm palette
// ============================================================

import React from 'react';
import { CATEGORIES, BRANDS, LEVELS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedBrand: string;
  setSelectedBrand: (id: string) => void;
  selectedLevel: string;
  setSelectedLevel: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedLevel,
  setSelectedLevel,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-0 z-[60] bg-white transform transition-transform duration-300 md:relative md:z-0 md:bg-transparent md:translate-x-0 w-full md:w-64 shrink-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full flex flex-col md:h-auto md:sticky md:top-24">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F9EAEA] md:hidden">
          <span className="font-bold text-lg">Filtros</span>
          <button onClick={onClose} className="p-2 -mr-2">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-0 space-y-24">
          {/* Category Filter */}
          <FilterSection title="Categoría">
            <div className="space-y-6">
              <FilterButton
                label="Todos"
                isActive={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
              />
              {CATEGORIES.map((cat) => (
                <FilterButton
                  key={cat.id}
                  label={cat.label}
                  isActive={selectedCategory === cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Level Filter */}
          <FilterSection title="Nivel">
            <div className="space-y-6">
              <FilterButton
                label="Cualquier nivel"
                isActive={selectedLevel === 'all'}
                onClick={() => setSelectedLevel('all')}
              />
              {LEVELS.map((lvl) => (
                <FilterButton
                  key={lvl.id}
                  label={lvl.label}
                  isActive={selectedLevel === lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Brand Filter */}
          <FilterSection title="Marca">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
              <FilterButton
                label="Todas"
                isActive={selectedBrand === 'all'}
                onClick={() => setSelectedBrand('all')}
              />
              {BRANDS.map((brand) => (
                <FilterButton
                  key={brand}
                  label={brand}
                  isActive={selectedBrand === brand}
                  onClick={() => setSelectedBrand(brand)}
                />
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Mobile Footer */}
        <div className="p-6 border-t border-[#F9EAEA] md:hidden">
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Ver productos
          </button>
        </div>
      </div>
    </aside>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1C1612]">
          {title}
        </h3>
        <ChevronDown size={14} className="text-[#B08B8B]" />
      </div>
      {children}
    </div>
  );
}

function FilterButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center px-4 py-4 text-base rounded-2xl transition-all text-left",
        isActive
          ? "bg-[#D97230] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl"
          : "text-[#B08B8B] hover:bg-[#FFF0F0] hover:text-[#1C1612] font-light opacity-60 hover:opacity-100"
      )}
    >
      {label}
    </button>
  );
}
