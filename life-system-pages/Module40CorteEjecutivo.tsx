'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Save, 
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Award,
  Check,
  Percent,
  Layers
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { MonthlyBoard } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

export function Module40CorteEjecutivo() {
  const [board, setBoard] = useState<MonthlyBoard | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [kpis, setKpis] = useState({ 
    income: 0, 
    expense: 0, 
    activeStudents: 0, 
    squads: [] as { name: string; progress: number; color: string }[] 
  });

  useEffect(() => {
    loadBoardData();
  }, []);

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

  if (!board) return null;

  const formatBs = (n: number) => `Bs. ${Number(n || 0).toLocaleString('es-BO')}`;
  
  // Regla 50/50 del Cuaderno Oficial:
  const grossIncome = kpis.income;
  const operatingCosts = kpis.expense;
  const netOperatingProfit = Math.max(0, grossIncome - operatingCosts);
  const reserveFund = Math.round(netOperatingProfit * 0.10); // 10% fondo de reserva
  const distributableProfit = netOperatingProfit - reserveFund;
  const partnerShare50 = Math.round(distributableProfit * 0.50); // 50% cada socio

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-temple-gold text-black px-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-black/20"
          >
            <Check size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0E1424] via-[#0B0F19] to-black p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl shrink-0">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <PieChart size={140} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Comité Ejecutivo
              </span>
              <span className="text-xs text-gray-400 font-bold">Lunes 08:00 AM</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="text-temple-gold" size={26} />
              Corte Ejecutivo & Balances 50/50
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              División de utilidades netas entre socios, deducción de costos operativos y fondo de reserva (10%).
            </p>
          </div>

          <button
            onClick={() => {
              saveCRMDatabase(getCRMDatabase());
              showToast('¡Tablero ejecutivo consolidado!');
            }}
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold hover:bg-temple-gold-bright text-black rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-temple-gold/20 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Save size={16} /> Consolidar Tablero
          </button>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Ingresos Brutos */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <ArrowUpRight size={13} className="text-emerald-400" /> Ingreso Bruto Mensual
            </p>
            <p className="text-2xl font-black text-emerald-400 tabular-nums">{formatBs(grossIncome)}</p>
            <span className="text-[10px] text-gray-500">Membresías + Barra + Textil</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
            <DollarSign size={22} />
          </div>
        </div>

        {/* Costos Operativos */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <ArrowDownRight size={13} className="text-temple-red" /> Gastos Operativos
            </p>
            <p className="text-2xl font-black text-temple-red tabular-nums">{formatBs(operatingCosts)}</p>
            <span className="text-[10px] text-gray-500">Alquiler, sueldos e insumos</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-temple-red/15 flex items-center justify-center text-temple-red border border-temple-red/30">
            <Layers size={22} />
          </div>
        </div>

        {/* Utilidad Neta */}
        <div className="bg-[#0B0F19] border border-temple-gold/40 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <TrendingUp size={13} className="text-temple-gold" /> Margen Neto Real
            </p>
            <p className="text-2xl font-black text-temple-gold tabular-nums">{formatBs(netOperatingProfit)}</p>
            <span className="text-[10px] text-gray-400 font-bold">Previo a repartición</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-temple-gold/15 flex items-center justify-center text-temple-gold border border-temple-gold/30">
            <Award size={22} />
          </div>
        </div>

        {/* Atletas Activos */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Users size={13} className="text-blue-400" /> Atletas en Escuadrón
            </p>
            <p className="text-2xl font-black text-white tabular-nums">{kpis.activeStudents}</p>
            <span className="text-[10px] text-gray-500">Activos en sistema</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 border border-blue-500/30">
            <Users size={22} />
          </div>
        </div>
      </div>

      {/* PARTNERSHIP 50/50 PROFIT SHARING CARD */}
      <div className="bg-[#0B0F19] border border-temple-gold/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-temple-gold block mb-1">
              Acuerdo de Socios Fundadores
            </span>
            <h3 className="text-xl font-serif font-black uppercase text-white">
              Reparto 50/50 de Utilidad Neta (Modelo Karpathy Vault)
            </h3>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
            Base Repartible: <strong className="text-temple-gold">{formatBs(distributableProfit)}</strong>
          </div>
        </div>

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
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
