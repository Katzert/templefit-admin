'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Users, DollarSign, Activity, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function Module40CorteEjecutivo() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-temple-navy-dark to-black p-6 rounded-xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <PieChart size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="text-temple-gold" size={24} />
              Corte Ejecutivo
            </h2>
            <p className="text-sm text-gray-400 mt-1">Lunes 8:00 AM • Regla 50/50 • Evaluaciones Financieras y Operativas.</p>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-temple-gold text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-temple-gold-bright transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] w-max">
            Generar Reporte (PDF)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Ingresos Mensuales', value: '$12,450', diff: '+15%', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { title: 'Nuevos Retos 21D', value: '45', diff: '+5', icon: TrendingUp, color: 'text-temple-gold', bg: 'bg-temple-gold/10' },
          { title: 'Tasa de Retención', value: '92%', diff: '-2%', icon: Activity, color: 'text-red-400', bg: 'bg-red-400/10' },
          { title: 'Miembros Activos', value: '312', diff: '+12', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="bg-black/40 border-white/5 hover:border-white/20 transition-colors">
              <CardContent className="!p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{stat.title}</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                    <span className={`text-[10px] font-bold ${stat.diff.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.diff}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="bg-black/40 border-white/5 h-full">
            <CardContent className="!p-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-temple-gold rounded-full" />
                La Regla 50/50
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-gray-400">Gastos Operativos (Target 50%)</span>
                    <span className="text-red-400">55%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-400 h-full rounded-full w-[55%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-gray-400">Utilidad / Crecimiento (Target 50%)</span>
                    <span className="text-emerald-400">45%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full w-[45%]" />
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-6 font-medium leading-relaxed">
                *Nota: Los gastos operativos están un 5% por encima del objetivo debido a la compra de nuevo inventario para la Armería en el mes actual.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-black/40 border-white/5 h-full">
            <CardContent className="!p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Metas Semanales Escuadrones
                </h3>
                <button className="text-[10px] uppercase font-bold tracking-widest text-temple-gold hover:text-temple-gold-bright transition-colors flex items-center">
                  Ver Detalles <ChevronRight size={12} />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Escuadrón Alfa', progress: 85, color: 'from-blue-500 to-cyan-400' },
                  { name: 'Escuadrón Omega', progress: 92, color: 'from-purple-500 to-pink-500' },
                  { name: 'Escuadrón Delta', progress: 60, color: 'from-amber-500 to-orange-500' }
                ].map((squad, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">{squad.name}</span>
                      <span className="text-xs font-black text-gray-300">{squad.progress}%</span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                      <div className={`bg-gradient-to-r ${squad.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${squad.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

    </motion.div>
  );
}
