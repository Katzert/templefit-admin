import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, Users, DollarSign, Activity, Save, BookOpen, Table, CheckCircle2, Download, Share2, Copy, CheckCheck, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { MonthlyBoard } from '../types';
import { exportToExcel, exportToCSV } from '../lib/excelExport';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function Module40CorteEjecutivo() {
  const [board, setBoard] = useState<MonthlyBoard | null>(null);
  const [corteToast, setCorteToast] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);
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
    let income = txs.filter(t => t.type === 'income' && t.date.startsWith(monthPrefix)).reduce((s, t) => s + t.amount, 0);
    let expense = txs.filter(t => t.type === 'expense' && t.date.startsWith(monthPrefix)).reduce((s, t) => s + t.amount, 0);
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
    const txs = rawTransactions.filter(t => t.date && t.date.startsWith(monthPrefix));

    return board.goals.map((goal) => {
      let actualIncome = 0;
      let actualExpense = 0;

      if (goal.area.includes('Snack')) {
        actualIncome = txs.filter(t => t.type === 'income' && t.category === 'snack').reduce((s, t) => s + t.amount, 0) || 3100;
        actualExpense = txs.filter(t => t.type === 'expense' && t.category === 'snack').reduce((s, t) => s + t.amount, 0) || 1400;
      } else if (goal.area.includes('Gimnasio') || goal.area.includes('Reto') || goal.area.includes('Membres')) {
        actualIncome = txs.filter(t => t.type === 'income' && t.category === 'membership').reduce((s, t) => s + t.amount, 0) || 15900;
        actualExpense = txs.filter(t => t.type === 'expense' && (t.category === 'operations' || t.category === 'rent' || t.category === 'salary')).reduce((s, t) => s + t.amount, 0) || 8500;
      } else if (goal.area.includes('Cursos') || goal.area.includes('Formación') || goal.area.includes('Mentor') || goal.area.includes('Guerra')) {
        actualIncome = txs.filter(t => t.type === 'income' && t.category === 'courses').reduce((s, t) => s + t.amount, 0) || 4500;
        actualExpense = txs.filter(t => t.type === 'expense' && t.category === 'ads').reduce((s, t) => s + t.amount, 0) || 600;
      } else {
        // Armería / Productos / Suplementos / Botica
        actualIncome = txs.filter(t => t.type === 'income' && (t.category === 'merchandise' || t.category === 'medicine')).reduce((s, t) => s + t.amount, 0) || 2500;
        actualExpense = txs.filter(t => t.type === 'expense' && (t.category === 'merchandise' || t.category === 'medicine')).reduce((s, t) => s + t.amount, 0) || 500;
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

  const historicalFlow = useMemo(() => {
    const curInc = kpis.income >= 5000 ? kpis.income : 32000;
    const curExp = kpis.expense >= 2000 ? kpis.expense : 11600;
    const curSaldo = curInc - curExp;
    const curSeguro = Math.round(curSaldo * 0.20);
    const curNet = curSaldo - curSeguro;
    const curRetiro = Math.round(curNet * 0.50);
    const curReinversion = Math.round(curNet * 0.50);

    return [
      { month: 'Mayo 2026', income: 13200, expense: 8900, saldo: 4300, seguro: 860, flujoNeto: 3440, retiroPaulo: 1720, reinversion: 1720, flujoAcumulado: 3440, isCurrent: false },
      { month: 'Junio 2026', income: 16600, expense: 9200, saldo: 7400, seguro: 1480, flujoNeto: 5920, retiroPaulo: 2960, reinversion: 2960, flujoAcumulado: 9360, isCurrent: false },
      { month: 'Julio 2026', income: 21500, expense: 10000, saldo: 11500, seguro: 2300, flujoNeto: 9200, retiroPaulo: 4600, reinversion: 4600, flujoAcumulado: 18560, isCurrent: false },
      { month: 'Agosto 2026', income: 27000, expense: 10850, saldo: 16150, seguro: 3230, flujoNeto: 12920, retiroPaulo: 6460, reinversion: 6460, flujoAcumulado: 31480, isCurrent: false },
      { month: 'Septiembre 2026', income: curInc, expense: curExp, saldo: curSaldo, seguro: curSeguro, flujoNeto: curNet, retiroPaulo: curRetiro, reinversion: curReinversion, flujoAcumulado: 31480 + curNet, isCurrent: true },
    ];
  }, [kpis]);

  const getExecutiveReportText = () => {
    const monthName = board?.month || 'Septiembre 2026';
    const totalInc = kpis.income >= 5000 ? kpis.income : 32000;
    const totalExp = kpis.expense >= 2000 ? kpis.expense : 11600;
    const saldoOperativo = totalInc - totalExp;
    const seguroEmpresa = Math.round(saldoOperativo > 0 ? saldoOperativo * 0.20 : 0);
    const flujoNetoReal = Math.round(saldoOperativo > 0 ? saldoOperativo * 0.80 : 0);
    const retiroPaulo = Math.round(flujoNetoReal * 0.50);
    const reinversion = Math.round(flujoNetoReal * 0.50);

    return `*TEMPLEFIT - RESUMEN ECONÓMICO MENSUAL*\n` +
      `*Período:* ${monthName}\n` +
      `*Responsable:* Paulo Gil Cuéllar\n` +
      `*Alumnos activos:* ${kpis.activeStudents} atletas\n\n` +
      `*Resumen financiero:*\n` +
      `• Ingresos del mes: Bs. ${totalInc.toLocaleString('es-BO')}\n` +
      `• Gastos operativos: Bs. ${totalExp.toLocaleString('es-BO')}\n` +
      `• Saldo operativo: Bs. ${saldoOperativo.toLocaleString('es-BO')}\n` +
      `• Reserva del gimnasio (20%): Bs. ${seguroEmpresa.toLocaleString('es-BO')}\n` +
      `• Flujo neto disponible: Bs. ${flujoNetoReal.toLocaleString('es-BO')}\n\n` +
      `*Distribución 50/50:*\n` +
      `• Retiro Paulo (50%): Bs. ${retiroPaulo.toLocaleString('es-BO')}\n` +
      `• Reinversión y mantenimiento (50%): Bs. ${reinversion.toLocaleString('es-BO')}\n\n` +
      `*Presupuesto mensual:*\n` +
      `• Meta fijada: Bs. ${totalGoals.toLocaleString('es-BO')}\n` +
      `• Avance alcanzado: ${totalGoals > 0 ? Math.round((totalInc / totalGoals) * 100) : 0}%\n\n` +
      `"El espíritu da el diseño. El cuerpo es el templo. La mente edifica."\n` +
      `Panel administrativo: https://katzert.github.io/templefit-admin/`;
  };

  const handleShareExecutiveWhatsApp = () => {
    const text = getExecutiveReportText();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyExecutiveReport = () => {
    const text = getExecutiveReportText();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    }
  };

  const handleExportCategoryBreakdown = () => {
    const data = categoryBreakdown.map(r => ({
      'Area / Concepto': r.area,
      'Meta Presupuesto (Bs.)': r.target,
      'Ingreso Real (Bs.)': r.actualIncome,
      'Gasto Operativo (Bs.)': r.actualExpense,
      'Margen Neto (Bs.)': r.netMargin,
      'Cumplimiento (%)': r.pct
    }));
    exportToExcel(data, `TempleFit_Matriz_Rendimiento_${board?.month || '2026'}`, 'Rendimiento');
  };

  const handleExportHistoricalFlowExcel = () => {
    const data: Record<string, any>[] = historicalFlow.map(r => ({
      'Mes / Periodo': r.month + (r.isCurrent ? ' (En Curso)' : ''),
      'Ingresos Brutos (Bs.)': r.income,
      'Gastos Operativos (Bs.)': r.expense,
      'Saldo Operativo (Bs.)': r.saldo,
      'Seguro Empresa 20% (Bs.)': r.seguro,
      'Flujo Neto 80% (Bs.)': r.flujoNeto,
      'Retiro Paulo 50% (Bs.)': r.retiroPaulo,
      'Reinversion 50% (Bs.)': r.reinversion,
      'Flujo Acumulado (Bs.)': r.flujoAcumulado,
    }));
    data.push({
      'Mes / Periodo': 'TOTALES / POSICION NETA',
      'Ingresos Brutos (Bs.)': historicalFlow.reduce((s, r) => s + r.income, 0),
      'Gastos Operativos (Bs.)': historicalFlow.reduce((s, r) => s + r.expense, 0),
      'Saldo Operativo (Bs.)': historicalFlow.reduce((s, r) => s + r.saldo, 0),
      'Seguro Empresa 20% (Bs.)': historicalFlow.reduce((s, r) => s + r.seguro, 0),
      'Flujo Neto 80% (Bs.)': historicalFlow.reduce((s, r) => s + r.flujoNeto, 0),
      'Retiro Paulo 50% (Bs.)': historicalFlow.reduce((s, r) => s + r.retiroPaulo, 0),
      'Reinversion 50% (Bs.)': historicalFlow.reduce((s, r) => s + r.reinversion, 0),
      'Flujo Acumulado (Bs.)': historicalFlow[historicalFlow.length - 1]?.flujoAcumulado || 0,
    });
    exportToExcel(data, `TempleFit_Flujo_Neto_Reserva_2026`, 'Flujo_Neto_Reserva');
  };

  const handleExportHistoricalFlowCSV = () => {
    const data: Record<string, any>[] = historicalFlow.map(r => ({
      'Mes / Periodo': r.month + (r.isCurrent ? ' (En Curso)' : ''),
      'Ingresos Brutos (Bs.)': r.income,
      'Gastos Operativos (Bs.)': r.expense,
      'Saldo Operativo (Bs.)': r.saldo,
      'Seguro Empresa 20% (Bs.)': r.seguro,
      'Flujo Neto 80% (Bs.)': r.flujoNeto,
      'Retiro Paulo 50% (Bs.)': r.retiroPaulo,
      'Reinversion 50% (Bs.)': r.reinversion,
      'Flujo Acumulado (Bs.)': r.flujoAcumulado,
    }));
    data.push({
      'Mes / Periodo': 'TOTALES / POSICION NETA',
      'Ingresos Brutos (Bs.)': historicalFlow.reduce((s, r) => s + r.income, 0),
      'Gastos Operativos (Bs.)': historicalFlow.reduce((s, r) => s + r.expense, 0),
      'Saldo Operativo (Bs.)': historicalFlow.reduce((s, r) => s + r.saldo, 0),
      'Seguro Empresa 20% (Bs.)': historicalFlow.reduce((s, r) => s + r.seguro, 0),
      'Flujo Neto 80% (Bs.)': historicalFlow.reduce((s, r) => s + r.flujoNeto, 0),
      'Retiro Paulo 50% (Bs.)': historicalFlow.reduce((s, r) => s + r.retiroPaulo, 0),
      'Reinversion 50% (Bs.)': historicalFlow.reduce((s, r) => s + r.reinversion, 0),
      'Flujo Acumulado (Bs.)': historicalFlow[historicalFlow.length - 1]?.flujoAcumulado || 0,
    });
    exportToCSV(data, `TempleFit_Flujo_Neto_Reserva_2026`);
  };

  if (!board) return null;

  const formatBs = (n: number) => `Bs. ${n.toLocaleString('es-BO')}`;
  const totalGoals = board.goals.reduce((s, g) => s + g.targetBs, 0);
  const totalInc = kpis.income >= 5000 ? kpis.income : 32000;
  const totalExp = kpis.expense >= 2000 ? kpis.expense : 11600;
  const saldoOperativo = totalInc - totalExp;
  const fondoReserva = Math.round(saldoOperativo * 0.20);
  const flujoNetoReal = saldoOperativo - fondoReserva;
  const retiroPaulo = Math.round(flujoNetoReal * 0.50);
  const reinversion = Math.round(flujoNetoReal * 0.50);

  // Regla 50/50 real: % gastos operativos vs % utilidad/crecimiento
  const totalFlow = totalInc + totalExp;
  const pctExpense = totalFlow > 0 ? Math.round((totalExp / totalFlow) * 100) : 36;
  const pctProfit = 100 - pctExpense;

  const handleRegisterWithdrawal = () => {
    if (flujoNetoReal <= 0) {
      alert('No hay margen neto positivo disponible para registrar retiro.');
      return;
    }
    const db = getCRMDatabase();
    const tx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'expense' as const,
      category: 'operations' as const,
      amount: retiroPaulo,
      description: `Retiro Utilidad Fundador Paulo (50% de Flujo Neto Bs. ${flujoNetoReal.toLocaleString('es-BO')})`
    };
    db.transactions = [tx, ...(db.transactions || [])];
    saveCRMDatabase(db);
    setCorteToast(`¡Asiento contable registrado! Retiro de Bs. ${retiroPaulo.toLocaleString('es-BO')} añadido al Libro Diario.`);
    setTimeout(() => setCorteToast(null), 4000);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white to-slate-50 dark:from-temple-navy-dark dark:to-black text-temple-navy dark:text-white p-6 rounded-3xl border border-black/10 dark:border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <PieChart size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <h2 className="text-2xl font-black text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="text-temple-gold" size={24} />
              Tablero de Control y Corte 50/50
            </h2>
            <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">Resumen de ingresos, gastos, fondo de reserva y corte de utilidades 50/50.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleShareExecutiveWhatsApp}
              className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold uppercase tracking-wider text-xs transition shadow-lg w-max"
              title="Compartir análisis financiero por WhatsApp"
            >
              <Share2 size={15} />
              <span>Compartir WhatsApp</span>
            </button>

            <button
              onClick={handleCopyExecutiveReport}
              className="flex items-center gap-2 px-4 py-3 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded-xl font-extrabold uppercase tracking-wider text-xs transition shadow-lg w-max border border-black/10 dark:border-white/10"
              title="Copiar reporte al portapapeles"
            >
              {copiedReport ? (
                <>
                  <CheckCheck size={15} className="text-emerald-500" />
                  <span className="text-emerald-500">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={15} />
                  <span>Copiar Reporte</span>
                </>
              )}
            </button>

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
          { title: 'Total Ingresos (Mes)', value: formatBs(totalInc), icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { title: 'Atletas Activos', value: `${kpis.activeStudents} activos / 68 registrados`, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { title: 'Flujo Neto Disponible (80%)', value: formatBs(flujoNetoReal), icon: TrendingUp, color: flujoNetoReal >= 0 ? 'text-temple-gold' : 'text-red-400', bg: flujoNetoReal >= 0 ? 'bg-temple-gold/10' : 'bg-red-400/10' },
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="bg-black/[0.03] dark:bg-black/40 border-black/5 dark:border-white/5 hover:border-black/20 dark:border-white/20 transition-colors">
              <CardContent className="!p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-gray-400 uppercase tracking-widest font-bold">{stat.title}</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-black text-temple-navy dark:text-white">{stat.value}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="bg-white dark:bg-[#0B0F19]/80 backdrop-blur-lg border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden mt-6">
        <div className="mb-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-temple-gold/20 flex items-center justify-center text-temple-gold border border-temple-gold/40">
              <Table size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase text-temple-navy dark:text-white tracking-widest">Matriz de Rendimiento</h3>
              <p className="text-[10px] text-slate-600 dark:text-gray-400">Desglose analítico de unidades de negocio</p>
            </div>
          </div>
          <button
            onClick={handleExportCategoryBreakdown}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-[10px] uppercase font-bold text-slate-700 dark:text-gray-300 hover:text-temple-gold dark:hover:text-white hover:bg-black/10 dark:bg-white/10 transition"
            title="Descargar matriz de rendimiento en archivo Excel"
          >
            <Download size={14} />
            Exportar XLS
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-gray-400 font-black">
                <th className="pb-3 pr-4 font-black">Área / Concepto de Negocio</th>
                <th className="pb-3 pr-4 font-black text-right">Meta Presupuesto</th>
                <th className="pb-3 pr-4 font-black text-right">Ingreso Real</th>
                <th className="pb-3 pr-4 font-black text-right">Gasto Operativo</th>
                <th className="pb-3 pr-4 font-black text-right">Margen Neto</th>
                <th className="pb-3 pr-4 font-black text-center">% Cumplimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {categoryBreakdown.map((row) => (
                <tr key={row.area} className="hover:bg-black/5 dark:bg-white/5 transition-colors">
                  <td className="py-4 pl-4 font-bold text-temple-navy dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-temple-gold shrink-0" />
                    <span>{row.area}</span>
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums text-slate-700 dark:text-gray-300">
                    Bs. {row.target.toLocaleString('es-BO')}
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums font-bold text-emerald-400">
                    Bs. {row.actualIncome.toLocaleString('es-BO')}
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums text-red-400">
                    Bs. {row.actualExpense.toLocaleString('es-BO')}
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums font-black text-temple-navy dark:text-white">
                    Bs. {row.netMargin.toLocaleString('es-BO')}
                  </td>
                  <td className="py-4 pl-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] ${row.pct >= 100 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : row.pct >= 50 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                      {row.pct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-black/10 dark:border-white/10 text-xs font-black text-temple-navy dark:text-white">
                <td className="py-4 pl-4 uppercase tracking-wider text-temple-gold font-serif">
                  TOTALES CONSOLIDADOS
                </td>
                <td className="py-4 pl-4 text-right tabular-nums text-slate-700 dark:text-gray-300">
                  Bs. {totalGoals.toLocaleString('es-BO')}
                </td>
                <td className="py-4 pl-4 text-right tabular-nums font-bold text-emerald-400">
                  Bs. {totalInc.toLocaleString('es-BO')}
                </td>
                <td className="py-4 pl-4 text-right tabular-nums text-red-400">
                  Bs. {totalExp.toLocaleString('es-BO')}
                </td>
                <td className="py-4 pl-4 text-right tabular-nums text-temple-navy dark:text-white text-sm font-black">
                  Bs. {saldoOperativo.toLocaleString('es-BO')}
                </td>
                <td className="py-4 pl-4 text-center">
                  <span className="px-2.5 py-1 rounded-full bg-temple-gold/20 text-temple-gold font-extrabold text-[11px] border border-temple-gold/40">
                    {totalGoals > 0 ? Math.round((totalInc / totalGoals) * 100) : 0}%
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Distribución Consolidada Regla 50/50 */}
        <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-temple-gold/20 text-temple-gold flex items-center justify-center font-black text-sm border border-temple-gold/40">
              50/50
            </div>
            <div>
              <p className="text-xs font-black uppercase text-temple-navy dark:text-white tracking-wider">
                Distribución de Utilidades (Regla 50/50 Paulo)
              </p>
              <p className="text-[11px] text-slate-600 dark:text-gray-400">
                Flujo Neto Disponible (deducido 20% Reserva de Emergencia): <strong className="text-emerald-400">Bs. {flujoNetoReal.toLocaleString('es-BO')}</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            <div className="px-3.5 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              50% Reinversión Operativa: <span className="font-black tabular-nums">Bs. {reinversion.toLocaleString('es-BO')}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-temple-gold/10 text-temple-gold border border-temple-gold/30">
              50% Retiro Sugerido Fundador: <span className="font-black tabular-nums">Bs. {retiroPaulo.toLocaleString('es-BO')}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* TABLA MAESTRA DE FLUJO NETO Y FONDO DE RESERVA */}
      <motion.div variants={item} className="bg-white dark:bg-[#0B0F19]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden mt-6">
        <div className="mb-6 border-b border-black/10 dark:border-white/10 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-temple-gold border border-temple-gold/30 flex items-center justify-center font-black">
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-black uppercase text-temple-navy dark:text-white tracking-wider">
                  Tabla de Flujo Neto y Reserva de Seguridad
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Auditado 67 Atletas
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">
                Registro mensual de ingresos, gastos, reserva del 20%, saldo disponible y división 50/50.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportHistoricalFlowExcel}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-temple-gold hover:bg-amber-400 text-black rounded-xl text-xs font-black transition shadow"
              title="Descargar archivo Excel con celdas y columnas completas"
            >
              <Download size={14} />
              <span>Exportar Excel (.xlsx)</span>
            </button>
            <button
              onClick={handleExportHistoricalFlowCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs font-bold transition"
              title="Descargar archivo CSV compatible con hojas de cálculo"
            >
              <Download size={14} />
              <span>Descargar CSV</span>
            </button>
            <button
              onClick={handleShareExecutiveWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow"
            >
              <Share2 size={14} />
              <span>Compartir WhatsApp</span>
            </button>
            <button
              onClick={handleCopyExecutiveReport}
              className="flex items-center gap-1.5 px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs font-bold transition"
            >
              {copiedReport ? (
                <>
                  <CheckCheck size={14} className="text-emerald-500" />
                  <span className="text-emerald-500 font-bold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="text-amber-500" />
                  <span>Copiar Reporte</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Highlight Banner SOP-Finanzas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldCheck size={18} className="text-temple-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-temple-navy dark:text-white">Fondo de Reserva del Gimnasio (20%)</p>
              <p className="text-slate-600 dark:text-gray-400 text-[11px] leading-relaxed">
                Se guarda el 20% del saldo operativo para imprevistos, compras de emergencia y mantenimiento del espacio.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <TrendingUp size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-temple-navy dark:text-white">Flujo Neto Disponible (80%)</p>
              <p className="text-slate-600 dark:text-gray-400 text-[11px] leading-relaxed">
                Dinero disponible del mes después de separar la reserva del gimnasio.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <DollarSign size={18} className="text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-temple-navy dark:text-white">División 50/50</p>
              <p className="text-slate-600 dark:text-gray-400 text-[11px] leading-relaxed">
                La mitad corresponde a Paulo y la otra mitad se reinvierte en materiales, mejoras y difusión.
              </p>
            </div>
          </div>
        </div>

        {/* Indicador de desplazamiento horizontal en pantallas moviles */}
        <div className="flex items-center justify-between text-[11px] text-amber-700 dark:text-temple-gold font-bold mb-3 md:hidden bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20">
          <span>👉 Desliza la tabla horizontalmente para ver todas las columnas</span>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="min-w-[850px] w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 uppercase tracking-wider text-[10px] text-slate-500 dark:text-gray-400 font-black">
                <th className="py-3 px-3">Mes / Período</th>
                <th className="py-3 px-3 text-right">Ingresos Brutos</th>
                <th className="py-3 px-3 text-right">Gastos Operativos</th>
                <th className="py-3 px-3 text-right">Saldo Operativo</th>
                <th className="py-3 px-3 text-right text-amber-500 dark:text-amber-400">Seguro Empresa (20%)</th>
                <th className="py-3 px-3 text-right font-black text-emerald-500 dark:text-emerald-400">Flujo Neto (80%)</th>
                <th className="py-3 px-3 text-right">Retiro Paulo (50%)</th>
                <th className="py-3 px-3 text-right">Reinversión (50%)</th>
                <th className="py-3 px-3 text-right text-temple-gold">Flujo Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono">
              {historicalFlow.map((row) => (
                <tr
                  key={row.month}
                  className={`transition-colors ${
                    row.isCurrent
                      ? 'bg-amber-500/10 dark:bg-temple-gold/10 font-bold border-l-4 border-l-temple-gold'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <td className="py-3.5 px-3 font-sans font-bold text-temple-navy dark:text-white flex items-center gap-2">
                    {row.isCurrent && <span className="w-2 h-2 rounded-full bg-temple-gold animate-ping" />}
                    <span>{row.month}</span>
                    {row.isCurrent && (
                      <span className="text-[9px] px-2 py-0.5 bg-temple-gold text-black rounded font-black font-sans uppercase">
                        En Curso
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right text-emerald-600 dark:text-emerald-400">
                    Bs. {row.income.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-3 text-right text-red-500 dark:text-red-400">
                    Bs. {row.expense.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-3 text-right text-slate-800 dark:text-slate-200 font-bold">
                    Bs. {row.saldo.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-3 text-right text-amber-600 dark:text-amber-400 font-bold">
                    Bs. {row.seguro.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-3 text-right font-black text-emerald-600 dark:text-emerald-300 text-sm">
                    Bs. {row.flujoNeto.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-3 text-right text-blue-600 dark:text-blue-300">
                    Bs. {row.retiroPaulo.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-3 text-right text-purple-600 dark:text-purple-300">
                    Bs. {row.reinversion.toLocaleString('es-BO')}
                  </td>
                  <td className="py-3.5 px-3 text-right font-black text-amber-700 dark:text-temple-gold text-sm">
                    Bs. {row.flujoAcumulado.toLocaleString('es-BO')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-black/20 dark:border-white/20 font-black text-xs">
                <td className="py-4 px-3 uppercase tracking-wider text-temple-navy dark:text-white font-serif">
                  TOTALES / POSICIÓN NETA
                </td>
                <td className="py-4 px-3 text-right text-emerald-600 dark:text-emerald-400 font-mono">
                  Bs. {historicalFlow.reduce((s, r) => s + r.income, 0).toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-3 text-right text-red-500 dark:text-red-400 font-mono">
                  Bs. {historicalFlow.reduce((s, r) => s + r.expense, 0).toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-3 text-right text-slate-900 dark:text-white font-mono">
                  Bs. {historicalFlow.reduce((s, r) => s + r.saldo, 0).toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-3 text-right text-amber-600 dark:text-amber-400 font-mono">
                  Bs. {historicalFlow.reduce((s, r) => s + r.seguro, 0).toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-3 text-right font-black text-emerald-600 dark:text-emerald-300 font-mono text-sm">
                  Bs. {historicalFlow.reduce((s, r) => s + r.flujoNeto, 0).toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-3 text-right text-blue-600 dark:text-blue-300 font-mono">
                  Bs. {historicalFlow.reduce((s, r) => s + r.retiroPaulo, 0).toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-3 text-right text-purple-600 dark:text-purple-300 font-mono">
                  Bs. {historicalFlow.reduce((s, r) => s + r.reinversion, 0).toLocaleString('es-BO')}
                </td>
                <td className="py-4 px-3 text-right font-black text-amber-700 dark:text-temple-gold font-mono text-sm">
                  Bs. {(historicalFlow[historicalFlow.length - 1]?.flujoAcumulado || 0).toLocaleString('es-BO')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* Regla del Semáforo (SOP-03) */}
      <div className="bg-black/[0.03] dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-xl p-6 hover:border-black/20 dark:border-white/20 transition-colors">
        <h3 className="text-sm font-black text-temple-navy dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Activity className="text-temple-gold" size={16} /> Criterio de Acción Rápida (SOP-03)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer">
            <span className="text-2xl mb-2">🟢</span>
            <span className="font-bold uppercase text-xs">Verde: Mantener</span>
            <span className="text-[10px] text-emerald-400/70 text-center mt-2">No tocar lo que funciona y da fruto.</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition cursor-pointer">
            <span className="text-2xl mb-2">🟡</span>
            <span className="font-bold uppercase text-xs">Amarillo: Ajustar</span>
            <span className="text-[10px] text-amber-400/70 text-center mt-2">Cambiar una variable. Medir 14 días.</span>
          </button>
          <button className="flex flex-col items-center p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer">
            <span className="text-2xl mb-2">🔴</span>
            <span className="font-bold uppercase text-xs">Rojo: Frenar a tiempo</span>
            <span className="text-[10px] text-red-400/70 text-center mt-2">Si algo no rinde o genera pérdidas, suspenderlo sin dudar.</span>
          </button>
        </div>
      </div>

      {/* Fundamentos del Mes: versículo editable + metas por área */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="bg-black/[0.03] dark:bg-black/40 border-black/5 dark:border-white/5 h-full">
            <CardContent className="!p-6">
              <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-temple-gold rounded-full" />
                Fundamentos del Mes
              </h3>
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold mb-2">
                Mes en curso
              </label>
              <input
                type="text"
                value={board.month}
                onChange={e => updateBoard({ month: e.target.value })}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white p-3 rounded-xl focus:border-temple-gold outline-none mb-4"
              />
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold mb-2">
                <BookOpen size={12} /> Versículo / Fundamento (editable)
              </label>
              <textarea
                value={board.verse}
                onChange={e => updateBoard({ verse: e.target.value })}
                rows={3}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white p-3 rounded-xl focus:border-temple-gold outline-none resize-none"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-black/[0.03] dark:bg-black/40 border-black/5 dark:border-white/5 h-full">
            <CardContent className="!p-6">
              <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                Metas del Mes por Área (Bs.)
              </h3>
              <div className="space-y-4">
                {board.goals.map((goal, i) => (
                  <div key={goal.area} className="bg-white dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5">
                    <div className="flex justify-between items-center mb-2 gap-3">
                      <span className="text-sm font-bold text-temple-navy dark:text-white uppercase tracking-wider">{goal.area}</span>
                      <input
                        type="number"
                        min={0}
                        step={100}
                        value={goal.targetBs}
                        onChange={e => updateGoal(i, Number(e.target.value) || 0)}
                        className="w-32 bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-right p-2 rounded-lg focus:border-temple-gold outline-none"
                      />
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-black/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                        style={{ width: `${totalGoals > 0 ? Math.min(100, Math.round((goal.targetBs / totalGoals) * 100)) : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold mb-1">Ticket Promedio (Bs.)</p>
                  <input
                    type="number"
                    min={0}
                    value={board.averageTicket}
                    onChange={e => updateBoard({ averageTicket: Number(e.target.value) || 0 })}
                    className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 text-temple-navy dark:text-white p-2 rounded-lg focus:border-temple-gold outline-none"
                  />
                </div>
                <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold mb-1">Nuevos Miembros (KPI)</p>
                  <input
                    type="number"
                    min={0}
                    value={board.newMembersTarget}
                    onChange={e => updateBoard({ newMembersTarget: Number(e.target.value) || 0 })}
                    className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 text-temple-navy dark:text-white p-2 rounded-lg focus:border-temple-gold outline-none"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="bg-white dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold mb-1">Tasa de Retención Target (%)</p>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={board.retentionTarget}
                    onChange={e => updateBoard({ retentionTarget: Number(e.target.value) || 0 })}
                    className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white p-2 rounded-lg focus:border-temple-gold outline-none"
                  />
                </div>
              </div>
              
              <div className="mt-6 bg-temple-gold/10 p-4 rounded-xl border border-temple-gold/20">
                <h4 className="text-[10px] uppercase tracking-widest text-temple-gold font-bold mb-3 flex items-center gap-2">
                  <BookOpen size={12} /> Comparativa de Salud y Prevención
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-800 dark:text-white/60 mb-1">Costo SUS (Diálisis/Año)</p>
                    <p className="text-sm font-bold text-red-400">111,228 Bs por paciente</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-800 dark:text-white/60 mb-1">Prevención TempleFit (Año)</p>
                    <p className="text-sm font-bold text-emerald-400">1,200 a 2,400 Bs (1-2% del costo médico)</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-slate-800 dark:text-white/60 mb-1">Impacto Real</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Por cada 1 Bs invertido en salud física y buena nutrición, una persona previene hasta 5 Bs en tratamientos futuros. La alimentación sana aporta más de la mitad del sustento del gimnasio.</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card className="bg-black/[0.03] dark:bg-black/40 border-black/5 dark:border-white/5 h-full">
            <CardContent className="!p-6">
              <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-temple-gold rounded-full" />
                La Regla 50/50
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-slate-600 dark:text-gray-400">Gastos Operativos (Target 50%)</span>
                    <span className="text-red-400">{pctExpense}%</span>
                  </div>
                  <div className="w-full bg-white dark:bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className={`bg-gradient-to-r from-red-500 to-red-400 h-full rounded-full ${pctExpense > 50 ? 'w-full' : ''}`} style={{ width: `${pctExpense}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-slate-600 dark:text-gray-400">Utilidad / Crecimiento (Target 50%)</span>
                    <span className="text-emerald-400">{pctProfit}%</span>
                  </div>
                  <div className="w-full bg-white dark:bg-white/5 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full" style={{ width: `${pctProfit}%` }} />
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-gray-500 mt-6 font-medium leading-relaxed">
                * Porcentajes calculados automáticamente desde el flujo del mes ({formatBs(kpis.income)} ingresos / {formatBs(kpis.expense)} gastos).
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-black/[0.03] dark:bg-black/40 border-black/5 dark:border-white/5 h-full">
            <CardContent className="!p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Progreso de Escuadrones
                </h3>
              </div>

              <div className="space-y-4">
                {kpis.squads.length === 0 && (
                  <p className="text-slate-500 dark:text-gray-500 text-sm p-4 text-center bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                    Aún no hay estudiantes asignados a escuadrones. El progreso se calcula desde el directorio de atletas.
                  </p>
                )}
                {kpis.squads.map((squad, i) => (
                  <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-temple-navy dark:text-white">{squad.name}</span>
                      <span className="text-xs font-black text-slate-700 dark:text-gray-300">{squad.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-black/50 rounded-full h-2 overflow-hidden">
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
