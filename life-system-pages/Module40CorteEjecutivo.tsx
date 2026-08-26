import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Users, DollarSign, Activity, Save, BookOpen, Table, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { MonthlyBoard } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function Module40CorteEjecutivo() {
  const [board, setBoard] = useState<MonthlyBoard | null>(null);
  const [corteToast, setCorteToast] = useState<string | null>(null);
  const [kpis, setKpis] = useState({ income: 0, expense: 0, activeStudents: 0, squads: [] as { name: string; progress: number; color: string }[] });
  const [rawTransactions, setRawTransactions] = useState<any[]>([]);

  useEffect(() => {
    const db = getCRMDatabase();
    setBoard(db.monthlyBoard || null);
    setRawTransactions(db.transactions || []);

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

  const categoryBreakdown = useMemo(() => {
    if (!board) return [];
    const now = new Date();
    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const txs = rawTransactions.filter(t => t.date.startsWith(monthPrefix));

    return board.goals.map((goal) => {
      let actualIncome = 0;
      let actualExpense = 0;

      if (goal.area.includes('Snack')) {
        actualIncome = txs.filter(t => t.type === 'income' && (t.category === 'snack' || t.description?.toLowerCase().includes('snack') || t.description?.toLowerCase().includes('electro'))).reduce((s, t) => s + t.amount, 0);
        actualExpense = txs.filter(t => t.type === 'expense' && (t.category === 'snack' || t.description?.toLowerCase().includes('snack') || t.description?.toLowerCase().includes('insumo') || t.description?.toLowerCase().includes('botánico'))).reduce((s, t) => s + t.amount, 0);
      } else if (goal.area.includes('Gimnasio') || goal.area.includes('Reto') || goal.area.includes('Membres')) {
        actualIncome = txs.filter(t => t.type === 'income' && (t.category === 'membership' || t.description?.toLowerCase().includes('membres') || t.description?.toLowerCase().includes('reto') || t.description?.toLowerCase().includes('camp'))).reduce((s, t) => s + t.amount, 0);
        actualExpense = txs.filter(t => t.type === 'expense' && (t.category === 'operations' || t.category === 'rent' || t.description?.toLowerCase().includes('alquiler') || t.description?.toLowerCase().includes('parque') || t.description?.toLowerCase().includes('espacio'))).reduce((s, t) => s + t.amount, 0);
      } else if (goal.area.includes('Cursos') || goal.area.includes('Formación') || goal.area.includes('Mentor') || goal.area.includes('Guerra')) {
        actualIncome = txs.filter(t => t.type === 'income' && (t.category === 'courses' || t.description?.toLowerCase().includes('curso') || t.description?.toLowerCase().includes('neuro') || t.description?.toLowerCase().includes('guerra') || t.description?.toLowerCase().includes('e.a.g.e'))).reduce((s, t) => s + t.amount, 0);
        actualExpense = txs.filter(t => t.type === 'expense' && (t.category === 'ads' || t.description?.toLowerCase().includes('publicidad') || t.description?.toLowerCase().includes('marketing'))).reduce((s, t) => s + t.amount, 0);
      } else {
        // Armería / Productos / Suplementos / Botica
        actualIncome = txs.filter(t => t.type === 'income' && (t.category === 'merchandise' || t.category === 'medicine' || t.description?.toLowerCase().includes('polera') || t.description?.toLowerCase().includes('short') || t.description?.toLowerCase().includes('canguro') || t.description?.toLowerCase().includes('indumentaria') || t.description?.toLowerCase().includes('suplemento'))).reduce((s, t) => s + t.amount, 0);
        actualExpense = txs.filter(t => t.type === 'expense' && (t.description?.toLowerCase().includes('inventario') || t.description?.toLowerCase().includes('textil') || t.description?.toLowerCase().includes('ropa'))).reduce((s, t) => s + t.amount, 0);
      }

      const netMargin = actualIncome - actualExpense;
      const pct = goal.targetBs > 0 ? Math.round((actualIncome / goal.targetBs) * 100) : 0;
      const founderShare = Math.max(0, Math.round(netMargin * 0.5));

      return {
        area: goal.area,
        target: goal.targetBs,
        actualIncome,
        actualExpense,
        netMargin,
        pct,
        founderShare
      };
    });
  }, [board, rawTransactions]);

  if (!board) return null;

  const formatBs = (n: number) => `Bs. ${n.toLocaleString('es-BO')}`;
  const totalGoals = board.goals.reduce((s, g) => s + g.targetBs, 0);
  const net = kpis.income - kpis.expense;
  // Regla 50/50 real: % gastos operativos vs % utilidad/crecimiento
  const totalFlow = kpis.income + kpis.expense;
  const pctExpense = totalFlow > 0 ? Math.round((kpis.expense / totalFlow) * 100) : 50;
  const pctProfit = 100 - pctExpense;

  const handleRegisterWithdrawal = () => {
    if (net <= 0) {
      alert('No hay margen neto positivo disponible para registrar retiro.');
      return;
    }
    const retiroAmount = Math.round(net * 0.5);
    const db = getCRMDatabase();
    const tx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'expense' as const,
      category: 'operations' as const,
      amount: retiroAmount,
      description: `Retiro Utilidad Fundador Paulo (50% de Bs. ${net.toLocaleString('es-BO')})`
    };
    db.transactions = [tx, ...(db.transactions || [])];
    saveCRMDatabase(db);
    setCorteToast(`¡Asiento contable registrado! Egreso de Bs. ${retiroAmount.toLocaleString('es-BO')} añadido al Libro Diario.`);
    setTimeout(() => setCorteToast(null), 4000);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-temple-navy-dark to-black p-6 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <PieChart size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="text-temple-gold" size={24} />
              Tablero de Control y Corte 50/50
            </h2>
            <p className="text-sm text-gray-400 mt-1">Dashboard ejecutivo simétrico estandarizado • Flujo de caja, rentabilidad y corte 50/50.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRegisterWithdrawal}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-500 text-black rounded-xl font-extrabold uppercase tracking-wider text-xs hover:bg-emerald-400 transition shadow-lg w-max"
            >
              <span>📥 Registrar Retiro (50%)</span>
            </button>

            <button
              onClick={() => saveCRMDatabase(getCRMDatabase())}
              className="flex items-center gap-2 px-5 py-3 bg-temple-gold text-black rounded-xl font-extrabold uppercase tracking-wider text-xs hover:bg-amber-400 transition shadow-lg w-max"
            >
              <Save size={16} /> Guardar Tablero
            </button>
          </div>
        </div>
      </div>

      {corteToast && (
        <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-bold flex items-center gap-2">
          <span>{corteToast}</span>
        </div>
      )}

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Total Ingresos', value: formatBs(kpis.income), icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { title: 'Atletas Activos', value: `${kpis.activeStudents}`, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { title: 'Balance Neto', value: formatBs(net), icon: TrendingUp, color: net >= 0 ? 'text-temple-gold' : 'text-red-400', bg: net >= 0 ? 'bg-temple-gold/10' : 'bg-red-400/10' },
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

      {/* TABLERO DE CONTROL SIMÉTRICO - FORMATO EXCEL EJECUTIVO */}
      <motion.div variants={item} className="bg-[#0E1424]/90 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
              <Table size={20} />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-black text-white uppercase tracking-wider">
                Tablero de Control Simétrico • Rentabilidad P&L
              </h3>
              <p className="text-xs text-gray-400">
                Formato estandarizado de medición: Presupuesto vs. Cobrado Real vs. Gastos y Retiro 50%
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-xl text-xs font-mono text-temple-gold font-bold self-start sm:self-auto">
            Período: {board.month}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="bg-black/60 border-y border-white/10 text-[11px] uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-4 font-black">Área / Concepto de Negocio</th>
                <th className="py-3.5 px-4 font-black text-right">Meta Presupuesto</th>
                <th className="py-3.5 px-4 font-black text-right">Ingreso Real</th>
                <th className="py-3.5 px-4 font-black text-right">Gasto Operativo</th>
                <th className="py-3.5 px-4 font-black text-right">Margen Neto</th>
                <th className="py-3.5 px-4 font-black text-center">% Cumplimiento</th>
                <th className="py-3.5 px-4 font-black text-right">Retiro Fundador (50%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {categoryBreakdown.map((row) => (
                <tr key={row.area} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-temple-gold shrink-0" />
                    <span>{row.area}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-gray-300">
                    Bs. {row.target.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                    Bs. {row.actualIncome.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-red-400">
                    Bs. {row.actualExpense.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-white">
                    Bs. {row.netMargin.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] ${row.pct >= 100 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : row.pct >= 50 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                      {row.pct}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-temple-gold">
                    Bs. {row.founderShare.toLocaleString('es-BO')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-black/90 border-t-2 border-temple-gold/50 text-xs font-black text-white">
                <td className="py-4 px-4 uppercase tracking-wider text-temple-gold font-serif">
                  TOTALES CONSOLIDADOS
                </td>
                <td className="py-4 px-4 text-right font-mono text-gray-300">
                  Bs. {totalGoals.toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-4 text-right font-mono font-bold text-emerald-400">
                  Bs. {kpis.income.toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-4 text-right font-mono text-red-400">
                  Bs. {kpis.expense.toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-4 text-right font-mono text-white text-sm font-black">
                  Bs. {net.toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2.5 py-1 rounded-full bg-temple-gold/20 text-temple-gold font-extrabold text-[11px] border border-temple-gold/40">
                    {totalGoals > 0 ? Math.round((kpis.income / totalGoals) * 100) : 0}%
                  </span>
                </td>
                <td className="py-4 px-4 text-right font-mono text-temple-gold text-sm font-black">
                  Bs. {Math.max(0, Math.round(net * 0.5)).toLocaleString('es-BO')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* Regla del Semáforo (SOP-03) */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-6 hover:border-white/20 transition-colors">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Activity className="text-temple-gold" size={16} /> Regla del Semáforo (SOP-03)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer">
            <span className="text-2xl mb-2">🟢</span>
            <span className="font-bold uppercase text-xs">Verde: Replicar</span>
            <span className="text-[10px] text-emerald-400/70 text-center mt-2">No tocar lo que da fruto.</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition cursor-pointer">
            <span className="text-2xl mb-2">🟡</span>
            <span className="font-bold uppercase text-xs">Amarillo: Ajustar</span>
            <span className="text-[10px] text-amber-400/70 text-center mt-2">Cambiar una variable. Medir 14 días.</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer">
            <span className="text-2xl mb-2">🔴</span>
            <span className="font-bold uppercase text-xs">Rojo: Cortar Inmediato</span>
            <span className="text-[10px] text-red-400/70 text-center mt-2">Falacia de costo hundido. Acción correctiva.</span>
          </button>
        </div>
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
              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Tasa de Retención Target (%)</p>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={board.retentionTarget}
                    onChange={e => updateBoard({ retentionTarget: Number(e.target.value) || 0 })}
                    className="w-full bg-black/50 border border-white/10 text-white p-2 rounded-lg focus:border-temple-gold outline-none"
                  />
                </div>
              </div>
              
              <div className="mt-6 bg-temple-gold/10 p-4 rounded-xl border border-temple-gold/20">
                <h4 className="text-[10px] uppercase tracking-widest text-temple-gold font-bold mb-3 flex items-center gap-2">
                  <BookOpen size={12} /> Inteligencia Ejecutiva
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/60 mb-1">Costo SUS (Diálisis/Año)</p>
                    <p className="text-sm font-bold text-red-400">111,228 Bs / paciente</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 mb-1">Prevención TempleFit (Año)</p>
                    <p className="text-sm font-bold text-emerald-400">1,200 - 2,400 Bs (1-2% del costo)</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-white/60 mb-1">Impacto Social y ROI</p>
                    <p className="text-sm font-bold text-white">Por cada 1 Bs invertido en prevención, la sociedad ahorra de 3 a 5 Bs. El motor alimentario representa 57% del sustento del modelo.</p>
                  </div>
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
