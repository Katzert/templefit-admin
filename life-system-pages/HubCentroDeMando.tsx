import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Activity, BookOpen, Share2 } from 'lucide-react';
import { HomePage } from './HomePage';
import { Module2DailyLog } from './Module2DailyLog';
import { Module19SOPs } from './Module19SOPs';
import { ContentMarketingHub } from './ContentMarketingHub';

interface HubCentroDeMandoProps {
  onNavigate?: (tab: string) => void;
  defaultSubTab?: 'home' | 'daily' | 'sops' | 'content';
}

export function HubCentroDeMando({ onNavigate, defaultSubTab = 'home' }: HubCentroDeMandoProps) {
  const [subTab, setSubTab] = useState<'home' | 'daily' | 'sops' | 'content'>(defaultSubTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Consolidated Sub-Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white p-4 md:p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-temple-gold/10 border border-temple-gold/30 flex items-center justify-center text-temple-gold shadow-lg shadow-temple-gold/10">
            <Home size={22} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-temple-navy dark:text-white uppercase tracking-wider">
              Centro de Mando
            </h2>
            <p className="text-xs text-slate-600 dark:text-gray-400">
              Panel de Paulo • Resumen Diario, Radar de Atletas, SOPs y Contenidos de Redes (90 Días)
            </p>
          </div>
        </div>

        {/* Pill Selector */}
        <div className="flex flex-wrap bg-white dark:bg-black/5 dark:bg-black/60 p-1.5 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-md gap-1">
          <button
            onClick={() => setSubTab('home')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'home'
                ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <Home size={14} />
            <span>1. Resumen</span>
          </button>
          
          <button
            onClick={() => setSubTab('daily')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'daily'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <Activity size={14} />
            <span>2. Radar</span>
          </button>

          <button
            onClick={() => setSubTab('sops')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'sops'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <BookOpen size={14} />
            <span>3. SOPs</span>
          </button>

          <button
            onClick={() => setSubTab('content')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'content'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <Share2 size={14} />
            <span>4. Redes 90D</span>
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
          {subTab === 'home' && <HomePage onNavigate={onNavigate} />}
          {subTab === 'daily' && <Module2DailyLog />}
          {subTab === 'sops' && <Module19SOPs />}
          {subTab === 'content' && <ContentMarketingHub />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
