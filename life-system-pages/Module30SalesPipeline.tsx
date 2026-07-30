'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Kanban, ArrowRight, UserCheck, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

// Kanban mock data
const initialStages = {
  'F1': {
    title: 'F1 - Captación & Prueba',
    color: 'border-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    leads: [
      { id: '1', name: 'Marcos Antezana', phone: '+591 69127691', status: 'En Prueba Gratuita' },
      { id: '2', name: 'Laura Gómez', phone: '+591 71234567', status: 'Cita Agendada' }
    ]
  },
  'F2': {
    title: 'F2 - Retención & Hub',
    color: 'border-temple-gold',
    bgColor: 'bg-temple-gold/10',
    textColor: 'text-temple-gold',
    leads: [
      { id: '3', name: 'Pedro Sánchez', phone: '+591 79876543', status: 'Activo (Escuadrón Alfa)' },
      { id: '4', name: 'Ana Rojas', phone: '+591 60011223', status: 'Alerta - Faltó 3 días' }
    ]
  },
  'F3': {
    title: 'F3 - Ascensión (Mentoría)',
    color: 'border-emerald-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-500',
    leads: [
      { id: '5', name: 'Carlos Díaz', phone: '+591 77788990', status: 'Mentoría + Hábitos' }
    ]
  }
};

export function Module30SalesPipeline() {
  const [stages] = useState(initialStages);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-temple-navy-dark to-black p-6 rounded-xl border border-white/5 shrink-0">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Kanban className="text-temple-gold" size={24} />
            Pipeline F1-F3 (Kanban)
          </h2>
          <p className="text-sm text-gray-400 mt-1">Arrastra prospectos según su evolución en los 3 Pilares del Hub Model.</p>
        </div>
      </div>

      <motion.div variants={item} className="flex-1 overflow-x-auto custom-scrollbar">
        <div className="flex gap-6 h-full min-w-[900px] pb-4">
          {Object.entries(stages).map(([stageId, stage]) => (
            <div key={stageId} className={`flex-1 flex flex-col rounded-2xl border ${stage.color} bg-[#0B0F19] overflow-hidden shadow-2xl`}>
              <div className={`p-4 ${stage.bgColor} border-b ${stage.color} flex items-center justify-between`}>
                <h3 className={`font-black uppercase tracking-wider ${stage.textColor}`}>{stage.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/40 ${stage.textColor}`}>
                  {stage.leads.length}
                </span>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
                {stage.leads.map(lead => (
                  <div key={lead.id} className="bg-black/40 border border-white/5 hover:border-white/20 p-4 rounded-xl cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-all">
                    <h4 className="text-sm font-bold text-white mb-1">{lead.name}</h4>
                    <p className="text-xs text-gray-400 mb-3">{lead.phone}</p>
                    <div className="flex items-center gap-2">
                      {lead.status.includes('Alerta') ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/20 px-2 py-1 rounded-full flex items-center gap-1">
                          <AlertTriangle size={10} /> {lead.status}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300 bg-white/10 px-2 py-1 rounded-full">
                          {lead.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
