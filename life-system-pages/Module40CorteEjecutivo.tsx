import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Users, DollarSign, Activity, Save, BookOpen, Table, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { MonthlyBoard } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export function Module40CorteEjecutivo() {
  const [board, setBoard] = useState<MonthlyBoard | null>(null);
  const [corteToast, setCorteToast] = useState<string | null>(null);
  const [kpis, setKpis] = useState({ income: 0, expense: 0, activeStudents: 0, squads: [] as { name: string; progress: number; color: string }[] });
  const [rawTransactions, setRawTransactions] = useState<any[]>([]);

  useEffect(() => {
    const db = getCRMDatabase();
    setBoard(db.monthlyBoard || null);
    setRawTransactions(db.transactions || []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadBoardData = () => {
    const db = getCRMDatabase();
    setBoard(db.monthlyBoard || {
      month: 'Agosto 2026',
      goals: [
        { label: 'Ingresos Totales (Gym + Barra + Textil)', targetBs: 45000, currentBs: 0 },
        { label: 'Retención de Atletas (>85%)', targetBs: 85, currentBs: 92 },
        { label: 'Conversión Onboarding a Barra Nutricional', targetBs: 60, currentBs: 65 },
        { label: 'Fondo de Reserva & Expansión (10%)', targetBs: 4500, currentBs: 0 }
      ],
      squadRankings: []
    });

    // KPIs calculados estrictamente desde el CRM
    const now = new Date();
    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const txs = db.transactions || [];
    const income = txs
      .filter(t => t.type === 'income' && t.date.startsWith(monthPrefix))
      .reduce((s, t) => s + (Number(t.amount) || 0), 0);
    
    const expense = txs
      .filter(t => t.type === 'expense' && t.date.startsWith(monthPrefix))
      .reduce((s, t) => s + (Number(t.amount) || 0), 0);
    
    const students = db.students || [];
    const activeStudents = students.filter(s => s.status === 'active').length;

    // Escuadrones reales
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
      progress: Math.round(d.phaseSum / (d.total || 1)),
      color: colors[i % colors.length]
    }));

    setKpis({ income, expense, activeStudents, squads });
  };

  const updateGoal = (idx: number, value: number) => {
    if (!board) return;
    const updatedGoals = board.goals.map((g, i) => i === idx ? { ...g, targetBs: Math.max(0, Number(value) || 0) } : g);
    const nextBoard = { ...board, goals: updatedGoals };
    setBoard(nextBoard);
    const db = getCRMDatabase();
    db.monthlyBoard = nextBoard;
    saveCRMDatabase(db);
    showToast('Meta actualizada');
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

  const formatBs = (n: number) => `Bs. ${Number(n || 0).toLocaleString('es-BO')}`;
  
  // Regla 50/50 del Cuaderno Oficial:
  const grossIncome = kpis.income;
  const operatingCosts = kpis.expense;
  const netOperatingProfit = Math.max(0, grossIncome - operatingCosts);
  const reserveFund = Math.round(netOperatingProfit * 0.10); // 10% fondo de reserva
  const distributableProfit = netOperatingProfit - reserveFund;
  const partnerShare50 = Math.round(distributableProfit * 0.50); // 50% cada socio

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
          <PieChart size={140} className="text-white" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Socio 1: Paulo Head Coach */}
          <div className="bg-[#0E1424] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Socio Operador</span>
              <span className="px-2 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black">50%</span>
            </div>
            <h4 className="text-base font-bold text-white">Paulo (Head Coach & Dirección)</h4>
            <div className="pt-2 border-t border-white/5">
              <p className="text-2xl font-black text-temple-gold tabular-nums">{formatBs(partnerShare50)}</p>
              <p className="text-[10px] text-gray-500 mt-1">Operaciones, entrenamientos y neuro-ventas</p>
            </div>
          </div>

          {/* Socio 2: Socio Inversor */}
          <div className="bg-[#0E1424] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Socio Inversor</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px] font-black">50%</span>
            </div>
            <h4 className="text-base font-bold text-white">Socio Capital & Infraestructura</h4>
            <div className="pt-2 border-t border-white/5">
              <p className="text-2xl font-black text-blue-400 tabular-nums">{formatBs(partnerShare50)}</p>
              <p className="text-[10px] text-gray-500 mt-1">Capital de trabajo y expansión del hub</p>
            </div>
          </div>

          {/* Fondo de Reserva */}
          <div className="bg-[#0E1424] border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">Caja de Reserva</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black">10%</span>
            </div>
            <h4 className="text-base font-bold text-white">Fondo de Reinversión & Camp</h4>
            <div className="pt-2 border-t border-white/5">
              <p className="text-2xl font-black text-emerald-400 tabular-nums">{formatBs(reserveFund)}</p>
              <p className="text-[10px] text-gray-500 mt-1">Mantenimiento de jaula y reservas de snack bar</p>
            </div>
          </div>
        </div>
      </div>

      {/* METAS DEL MES EDITABLES */}
      <div className="bg-[#0B0F19] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-5">
        <div className="border-b border-white/10 pb-3">
          <h3 className="text-lg font-serif font-black uppercase text-white">
            Metas y Objetivos del Mes
          </h3>
          <p className="text-xs text-gray-400">Puedes editar las metas directamente en cada casilla</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {board.goals.map((g, idx) => (
            <div key={idx} className="bg-[#0E1424] border border-white/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">{g.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Meta:</span>
                  <input
                    type="number"
                    value={g.targetBs}
                    onChange={e => updateGoal(idx, Number(e.target.value))}
                    className="w-24 bg-black/60 border border-temple-gold/40 rounded-lg px-2 py-1 text-xs text-temple-gold font-bold text-right focus:outline-none tabular-nums"
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
    </motion.div>
  );
}
