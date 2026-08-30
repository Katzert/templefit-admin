'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, FileText, PieChart, TrendingUp } from 'lucide-react';
import { Module13FinanceLedger } from './Module13FinanceLedger';
import { Module40CorteEjecutivo } from './Module40CorteEjecutivo';

interface HubFinancesProps {
  defaultSubTab?: 'ledger' | 'corte';
}

export function HubFinances({ defaultSubTab = 'ledger' }: HubFinancesProps) {
  const [subTab, setSubTab] = useState<'ledger' | 'corte'>(defaultSubTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Consolidated Sub-Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white p-4 md:p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <DollarSign size={22} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-temple-navy dark:text-white uppercase tracking-wider">
              Finanzas & Corte 50/50
            </h2>
            <p className="text-xs text-slate-600 dark:text-gray-400">
              Libro diario de ingresos/gastos y balance ejecutivo semanal bajo la regla del semáforo
            </p>
          </div>
        </div>

        {/* Pill Selector */}
        <div className="flex bg-white dark:bg-black/5 dark:bg-black/60 p-1.5 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-md">
          <button
            onClick={() => setSubTab('ledger')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'ledger'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <FileText size={15} />
            <span>1. Libro Diario</span>
          </button>
          
          <button
            onClick={() => setSubTab('corte')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'corte'
                ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <PieChart size={15} />
            <span>2. Corte 50/50 & Semáforo</span>
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
          {subTab === 'ledger' ? <Module13FinanceLedger /> : <Module40CorteEjecutivo />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
