'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Kanban, Briefcase, UserPlus } from 'lucide-react';
import { Module12LeadsPipeline } from './Module12LeadsPipeline';
import { Module30SalesPipeline } from './Module30SalesPipeline';

interface HubPipelineProps {
  onNavigate?: (tab: string) => void;
  defaultSubTab?: 'leads' | 'phases';
}

export function HubPipeline({ onNavigate, defaultSubTab = 'leads' }: HubPipelineProps) {
  const [subTab, setSubTab] = useState<'leads' | 'phases'>(defaultSubTab);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Top Consolidated Sub-Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#0E1424] via-[#0B0F19] to-black p-4 md:p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-temple-gold/10 border border-temple-gold/30 flex items-center justify-center text-temple-gold shadow-lg shadow-temple-gold/10">
            <Briefcase size={22} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
              Embudo Comercial Maestro
            </h2>
            <p className="text-xs text-gray-400">
              Captación de nuevos prospectos y progresión de fases F1 $\to$ F3
            </p>
          </div>
        </div>

        {/* Pill Selector */}
        <div className="flex bg-black/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setSubTab('leads')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'leads'
                ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserPlus size={15} />
            <span>1. Captación (Leads)</span>
          </button>
          
          <button
            onClick={() => setSubTab('phases')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'phases'
                ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Kanban size={15} />
            <span>2. Fases F1-F3 (Atletas)</span>
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
          {subTab === 'leads' ? (
            <Module12LeadsPipeline onNavigate={onNavigate} />
          ) : (
            <Module30SalesPipeline onNavigate={onNavigate} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
