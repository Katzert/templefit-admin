'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Users, DollarSign, Activity, Save, BookOpen } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { MonthlyBoard } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function Module40CorteEjecutivo() {
  const [board, setBoard] = useState<MonthlyBoard | null>(null);
  const [kpis, setKpis] = useState({ income: 0, expense: 0, activeStudents: 0, squads: [] as { name: string; progress: number; color: string }[] });

  useEffect(() => {
    const db = getCRMDatabase();
    setBoard(db.monthlyBoard || null);

    // --- KPIs reales calculados desde el CRM (no hardcodeados) ---
    const now = new Date();
    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const txs = db.transactions || [];
    const income = txs.filter(t => t.type === 'income' && t.date.startsWith(monthPrefix)).reduce((s, t) => s + t.amount, 0);
    const expense = txs.filter(t => t.type === 'expense' && t.date.startsWith(monthPrefix)).reduce((s, t) => s + t.amount, 0);
    const students = db.students || [];
    const activeStudents = students.filter(s => s.status === 'active').length;

    // Escuadrones: agrupación real desde estudiantes, progreso = promedio de fase
    const squadMap = new Map<string, { total: number; phaseSum: number }>();
    students.forEach(s => {
      const cur = squadMap.get(s.escuadronId) || { total: 0, phaseSum: 0 };
      cur.total += 1;
      cur.phaseSum += s.phase.startsWith('1') ? 33 : s.phase.startsWith('2') ? 66 : 100;
      squadMap.set(s.escuadronId, cur);
    });
    const colors = ['from-blue-500 to-cyan-400', 'from-purple-500 to-pink-500', 'from-amber-500 to-orange-500', 'from-emerald-500 to-teal-400'];
    const squads = Array.from(squadMap.entries()).map(([name, d], i) => ({
      name,
      progress: Math.round(d.phaseSum / d.total),
      color: colors[i % colors.length]
    }));

    setKpis({ income, expense, activeStudents, squads });
  }, []);

  const updateBoard = (patch: Partial<MonthlyBoard>) => {
    if (!board) return;
    const next = { ...board, ...patch };
    setBoard(next);
    const db = getCRMDatabase();
    db.monthlyBoard = next;
    saveCRMDatabase(db);
  };

  const updateGoal = (idx: number, value: number) => {
    if (!board) return;
    updateBoard({ goals: board.goals.map((g, i) => (i === idx ? { ...g, targetBs: value } : g)) });
  };

  if (!board) return null;

  const formatBs = (n: number) => `Bs. ${n.toLocaleString('es-BO')}`;
  const totalGoals = board.goals.reduce((s, g) => s + g.targetBs, 0);
  const net = kpis.income - kpis.expense;
  // Regla 50/50 real: % gastos operativos vs % utilidad/crecimiento
  const totalFlow = kpis.income + kpis.expense;
  const pctExpense = totalFlow > 0 ? Math.round((kpis.expense / totalFlow) * 100) : 50;
  const pctProfit = 100 - pctExpense;

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
          
          <button
            onClick={() => saveCRMDatabase(getCRMDatabase())}
            className="flex items-center gap-2 px-6 py-3 bg-temple-gold text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-temple-gold-bright transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] w-max"
          >
            <Save size={16} /> Guardar Tablero
          </button>
        </div>
      </div>

      {/* KPIs del mes calculados desde transacciones reales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Ingresos del Mes', value: formatBs(kpis.income), icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { title: 'Utilidad Neta', value: formatBs(net), icon: TrendingUp, color: net >= 0 ? 'text-temple-gold' : 'text-red-400', bg: net >= 0 ? 'bg-temple-gold/10' : 'bg-red-400/10' },
          { title: 'Tasa de Retención (Target)', value: `${board.retentionTarget}%`, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { title: 'Miembros Activos', value: `${kpis.activeStudents}`, icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
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
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Fundamentos del Mes: versículo editable + metas por área */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="bg-black/40 border-white/5 h-full">
            <CardContent className="!p-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-temple-gold rounded-full" />
                Fundamentos del Mes
              </h3>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">
                Mes en curso
              </label>
              <input
                type="text"
                value={board.month}
                onChange={e => updateBoard({ month: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl focus:border-temple-gold outline-none mb-4"
              />
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">
                <BookOpen size={12} /> Versículo / Fundamento (editable)
              </label>
              <textarea
                value={board.verse}
                onChange={e => updateBoard({ verse: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl focus:border-temple-gold outline-none resize-none"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-black/40 border-white/5 h-full">
            <CardContent className="!p-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                Metas del Mes por Área (Bs.)
              </h3>
              <div className="space-y-4">
                {board.goals.map((goal, i) => (
                  <div key={goal.area} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-2 gap-3">
                      <span className="text-sm font-bold text-white uppercase tracking-wider">{goal.area}</span>
                      <input
                        type="number"
                        min={0}
                        step={100}
                        value={goal.targetBs}
                        onChange={e => updateGoal(i, Number(e.target.value) || 0)}
                        className="w-32 bg-black/50 border border-white/10 text-white text-right p-2 rounded-lg focus:border-temple-gold outline-none"
                      />
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                        style={{ width: `${totalGoals > 0 ? Math.min(100, Math.round((goal.targetBs / totalGoals) * 100)) : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Ticket Promedio (Bs.)</p>
                  <input
                    type="number"
                    min={0}
                    value={board.averageTicket}
                    onChange={e => updateBoard({ averageTicket: Number(e.target.value) || 0 })}
                    className="w-full bg-black/50 border border-white/10 text-white p-2 rounded-lg focus:border-temple-gold outline-none"
                  />
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Nuevos Miembros (KPI)</p>
                  <input
                    type="number"
                    min={0}
                    value={board.newMembersTarget}
                    onChange={e => updateBoard({ newMembersTarget: Number(e.target.value) || 0 })}
                    className="w-full bg-black/50 border border-white/10 text-white p-2 rounded-lg focus:border-temple-gold outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
                    <span className="text-red-400">{pctExpense}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className={`bg-gradient-to-r from-red-500 to-red-400 h-full rounded-full ${pctExpense > 50 ? 'w-full' : ''}`} style={{ width: `${pctExpense}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-gray-400">Utilidad / Crecimiento (Target 50%)</span>
                    <span className="text-emerald-400">{pctProfit}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full" style={{ width: `${pctProfit}%` }} />
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-6 font-medium leading-relaxed">
                * Porcentajes calculados automáticamente desde el flujo del mes ({formatBs(kpis.income)} ingresos / {formatBs(kpis.expense)} gastos).
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
                  Progreso de Escuadrones
                </h3>
              </div>

              <div className="space-y-4">
                {kpis.squads.length === 0 && (
                  <p className="text-gray-500 text-sm p-4 text-center bg-white/5 rounded-xl border border-white/5">
                    Aún no hay estudiantes asignados a escuadrones. El progreso se calcula desde el directorio de atletas.
                  </p>
                )}
                {kpis.squads.map((squad, i) => (
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
