'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Database, ShoppingBag } from 'lucide-react';
import { Module20Recipes } from './Module20Recipes';
import { Module14Inventory } from './Module14Inventory';

interface HubArmeriaProps {
  defaultSubTab?: 'recipes' | 'inventory';
}

export function HubArmeria({ defaultSubTab = 'recipes' }: HubArmeriaProps) {
  const [subTab, setSubTab] = useState<'recipes' | 'inventory'>(defaultSubTab);

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
              Armería & Snack Bar
            </h2>
            <p className="text-xs text-slate-600 dark:text-gray-400">
              Recetario y costeo del Snack Bar • Control de Stock de Insumos y Poleras
            </p>
          </div>
        </div>

        {/* Pill Selector */}
        <div className="flex bg-white dark:bg-black/5 dark:bg-black/60 p-1.5 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-md">
          <button
            onClick={() => setSubTab('recipes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'recipes'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <ChefHat size={15} />
            <span>1. Snack Bar & Recetas</span>
          </button>
          
          <button
            onClick={() => setSubTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'inventory'
                ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <Database size={15} />
            <span>2. Stock & Armería</span>
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
          {subTab === 'recipes' && <Module20Recipes />}
          {subTab === 'inventory' && <Module14Inventory />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
