'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Database, ShoppingBag, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Module20Recipes } from './Module20Recipes';
import { Module14Inventory } from './Module14Inventory';
import { Module14Showcase } from './Module14Showcase';

interface HubArmeriaProps {
  defaultSubTab?: 'catalog' | 'recipes' | 'inventory';
}

export function HubArmeria({ defaultSubTab = 'catalog' }: HubArmeriaProps) {
  const [subTab, setSubTab] = useState<'catalog' | 'recipes' | 'inventory'>(defaultSubTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Consolidated Sub-Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white p-4 md:p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-temple-gold shadow-lg shadow-amber-500/10">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-temple-navy dark:text-white uppercase tracking-wider">
              Armería & Catálogo TempleFit
            </h2>
            <p className="text-xs text-slate-600 dark:text-gray-400">
              Catálogo visual de productos y precios • Recetario del Snack Bar • Inventario y Stock en Bolivianos
            </p>
          </div>
        </div>

        {/* Pill Selector */}
        <div className="flex bg-slate-100 dark:bg-black/60 p-1.5 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-md">
          <button
            onClick={() => setSubTab('catalog')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'catalog'
                ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Sparkles size={14} />
            <span>1. Catálogo & Fotos</span>
          </button>
          
          <button
            onClick={() => setSubTab('recipes')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'recipes'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <ChefHat size={14} />
            <span>2. Recetas & Menú</span>
          </button>
          
          <button
            onClick={() => setSubTab('inventory')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'inventory'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Database size={14} />
            <span>3. Stock & Costeo</span>
          </button>
        </div>
      </div>

      {/* Render Active Sub-Module */}
      <AnimatePresence mode="wait">
        <motion.div
          key={subTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {subTab === 'catalog' && <Module14Showcase />}
          {subTab === 'recipes' && <Module20Recipes />}
          {subTab === 'inventory' && <Module14Inventory />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
