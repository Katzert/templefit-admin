'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  FileText, 
  PieChart, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Download, 
  Share2, 
  Copy, 
  CheckCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Table 
} from 'lucide-react';
import { Module13FinanceLedger } from './Module13FinanceLedger';
import { Module40CorteEjecutivo } from './Module40CorteEjecutivo';
import { exportToExcel, exportToCSV } from '../lib/excelExport';

type SubTabKey = 'diario' | 'semanal' | 'mensual' | 'anual';

interface HubFinancesProps {
  defaultSubTab?: 'diario' | 'semanal' | 'mensual' | 'anual' | 'ledger' | 'corte';
}

export function HubFinances({ defaultSubTab = 'diario' }: HubFinancesProps) {
  // Normalize incoming props
  const initialTab: SubTabKey = 
    defaultSubTab === 'ledger' ? 'diario' : 
    defaultSubTab === 'corte' ? 'mensual' : 
    (defaultSubTab as SubTabKey) || 'diario';

  const [subTab, setSubTab] = useState<SubTabKey>(initialTab);
  const [copiedReport, setCopiedReport] = useState(false);

  // Datos para corte semanal
  const weeklyMetrics = {
    period: 'Semana Actual • 15 al 20 de Septiembre 2026',
    income: 8000,
    expense: 2900,
    saldo: 5100,
    reserva20: 1020,
    flujoNeto80: 4080,
    retiroPaulo50: 2040,
    reinversion50: 2040,
    breakdown: [
      { unit: 'Membresías Semanales & Reto 21 Días', income: 3975, expense: 1200, net: 2775 },
      { unit: 'CristoFit Camp (Sábado)', income: 1500, expense: 550, net: 950 },
      { unit: 'Snack Bar & ElectroHidra', income: 775, expense: 350, net: 425 },
      { unit: 'Formación E.A.G.E. & Cursos', income: 1125, expense: 150, net: 975 },
      { unit: 'Armería & Suplementación', income: 625, expense: 125, net: 500 }
    ]
  };

  // Datos para resumen anual y proyecciones
  const annualHistoricalFlow = [
    { month: 'Mayo 2026', income: 13200, expense: 8900, saldo: 4300, seguro: 860, flujoNeto: 3440, retiroPaulo: 1720, reinversion: 1720, flujoAcumulado: 3440 },
    { month: 'Junio 2026', income: 16600, expense: 9200, saldo: 7400, seguro: 1480, flujoNeto: 5920, retiroPaulo: 2960, reinversion: 2960, flujoAcumulado: 9360 },
    { month: 'Julio 2026', income: 21500, expense: 10000, saldo: 11500, seguro: 2300, flujoNeto: 9200, retiroPaulo: 4600, reinversion: 4600, flujoAcumulado: 18560 },
    { month: 'Agosto 2026', income: 27000, expense: 10850, saldo: 16150, seguro: 3230, flujoNeto: 12920, retiroPaulo: 6460, reinversion: 6460, flujoAcumulado: 31480 },
    { month: 'Septiembre 2026 (En Curso)', income: 32000, expense: 11600, saldo: 20400, seguro: 4080, flujoNeto: 16320, retiroPaulo: 8160, reinversion: 8160, flujoAcumulado: 47800 },
  ];

  const annualTotals = {
    income: 110300,
    expense: 50550,
    saldo: 59750,
    reserva20: 11950,
    flujoNeto80: 47800,
    retiroPaulo50: 23900,
    reinversion50: 23900
  };

  const handleExportWeeklyExcel = () => {
    const data = weeklyMetrics.breakdown.map(b => ({
      'Unidad de Negocio': b.unit,
      'Ingreso Semanal (Bs.)': b.income,
      'Gasto Operativo (Bs.)': b.expense,
      'Saldo Operativo (Bs.)': b.net,
      'Reserva 20% (Bs.)': Math.round(b.net * 0.20),
      'Flujo Neto 80% (Bs.)': Math.round(b.net * 0.80),
      'Retiro Paulo 50% (Bs.)': Math.round(b.net * 0.40),
      'Reinversion 50% (Bs.)': Math.round(b.net * 0.40),
    }));
    data.push({
      'Unidad de Negocio': 'TOTALES CORTE SEMANAL',
      'Ingreso Semanal (Bs.)': weeklyMetrics.income,
      'Gasto Operativo (Bs.)': weeklyMetrics.expense,
      'Saldo Operativo (Bs.)': weeklyMetrics.saldo,
      'Reserva 20% (Bs.)': weeklyMetrics.reserva20,
      'Flujo Neto 80% (Bs.)': weeklyMetrics.flujoNeto80,
      'Retiro Paulo 50% (Bs.)': weeklyMetrics.retiroPaulo50,
      'Reinversion 50% (Bs.)': weeklyMetrics.reinversion50,
    });
    exportToExcel(data, 'TempleFit_Corte_Semanal', 'Corte_Semanal');
  };

  const handleExportWeeklyCSV = () => {
    const data = weeklyMetrics.breakdown.map(b => ({
      'Unidad de Negocio': b.unit,
      'Ingreso Semanal (Bs.)': b.income,
      'Gasto Operativo (Bs.)': b.expense,
      'Saldo Operativo (Bs.)': b.net,
      'Reserva 20% (Bs.)': Math.round(b.net * 0.20),
      'Flujo Neto 80% (Bs.)': Math.round(b.net * 0.80),
      'Retiro Paulo 50% (Bs.)': Math.round(b.net * 0.40),
      'Reinversion 50% (Bs.)': Math.round(b.net * 0.40),
    }));
    exportToCSV(data, 'TempleFit_Corte_Semanal');
  };

  const handleShareWeeklyWhatsApp = () => {
    const text = `*TEMPLEFIT - CORTE FINANCIERO SEMANAL*\n` +
      `*Período:* ${weeklyMetrics.period}\n` +
      `*Responsable:* Paulo Gil Cuéllar\n\n` +
      `*Resumen Operativo Semanal:*\n` +
      `• Ingresos de la semana: Bs. ${weeklyMetrics.income.toLocaleString('es-BO')}\n` +
      `• Gastos operativos: Bs. ${weeklyMetrics.expense.toLocaleString('es-BO')}\n` +
      `• Saldo operativo: Bs. ${weeklyMetrics.saldo.toLocaleString('es-BO')}\n` +
      `• Fondo de reserva (20%): Bs. ${weeklyMetrics.reserva20.toLocaleString('es-BO')}\n` +
      `• Flujo neto disponible (80%): Bs. ${weeklyMetrics.flujoNeto80.toLocaleString('es-BO')}\n\n` +
      `*Distribución 50/50 Semanal:*\n` +
      `• Retiro sugerido Paulo (50%): Bs. ${weeklyMetrics.retiroPaulo50.toLocaleString('es-BO')}\n` +
      `• Reinversión operativa (50%): Bs. ${weeklyMetrics.reinversion50.toLocaleString('es-BO')}\n\n` +
      `Control financiero verificado TempleFit.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleExportAnnualExcel = () => {
    const data = annualHistoricalFlow.map(r => ({
      'Mes / Periodo': r.month,
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
      'Mes / Periodo': 'TOTALES ACUMULADOS 2026',
      'Ingresos Brutos (Bs.)': annualTotals.income,
      'Gastos Operativos (Bs.)': annualTotals.expense,
      'Saldo Operativo (Bs.)': annualTotals.saldo,
      'Seguro Empresa 20% (Bs.)': annualTotals.reserva20,
      'Flujo Neto 80% (Bs.)': annualTotals.flujoNeto80,
      'Retiro Paulo 50% (Bs.)': annualTotals.retiroPaulo50,
      'Reinversion 50% (Bs.)': annualTotals.reinversion50,
      'Flujo Acumulado (Bs.)': annualTotals.flujoNeto80,
    });
    exportToExcel(data, 'TempleFit_Estados_Financieros_Anuales_2026', 'Finanzas_Anual');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Top Consolidated Navigation Hub */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white p-5 md:p-7 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 shrink-0">
            <DollarSign size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Área Administrativa Central
              </span>
              <span className="text-[11px] text-slate-500 dark:text-gray-400 font-bold">
                Caja, Cortes & Regla 50/50
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-temple-navy dark:text-white uppercase tracking-wider">
              Finanzas & Caja Central
            </h2>
            <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">
              Gestión unificada: Libro diario, corte semanal, balance mensual con regla 50/50 y visión anual acumulada.
            </p>
          </div>
        </div>

        {/* 4-Pill Sub-Navigation */}
        <div className="flex flex-wrap bg-slate-100 dark:bg-black/60 p-1.5 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-md gap-1">
          <button
            onClick={() => setSubTab('diario')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'diario'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-extrabold'
                : 'text-slate-700 dark:text-gray-300 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <FileText size={14} />
            <span>1. Diario (Libro)</span>
          </button>

          <button
            onClick={() => setSubTab('semanal')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'semanal'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 font-extrabold'
                : 'text-slate-700 dark:text-gray-300 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <Calendar size={14} />
            <span>2. Semanal (Corte)</span>
          </button>
          
          <button
            onClick={() => setSubTab('mensual')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'mensual'
                ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                : 'text-slate-700 dark:text-gray-300 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <PieChart size={14} />
            <span>3. Mensual (50/50)</span>
          </button>

          <button
            onClick={() => setSubTab('anual')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              subTab === 'anual'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 font-extrabold'
                : 'text-slate-700 dark:text-gray-300 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            <TrendingUp size={14} />
            <span>4. Anual & Fondos</span>
          </button>
        </div>
      </div>

      {/* Render Active View */}
      <AnimatePresence mode="wait">
        {subTab === 'diario' && (
          <motion.div
            key="tab-diario"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Module13FinanceLedger />
          </motion.div>
        )}

        {subTab === 'semanal' && (
          <motion.div
            key="tab-semanal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header del Corte Semanal */}
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      Cierre de Ciclo Semanal
                    </span>
                    <h3 className="text-xl font-black uppercase text-temple-navy dark:text-white tracking-wider mt-1">
                      Corte Semanal & Conciliación de Caja
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      {weeklyMetrics.period}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportWeeklyExcel}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-temple-gold hover:bg-amber-400 text-black rounded-xl text-xs font-black transition shadow"
                    title="Exportar corte semanal en formato Excel"
                  >
                    <Download size={14} />
                    <span>Exportar Excel (.xlsx)</span>
                  </button>
                  <button
                    onClick={handleExportWeeklyCSV}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-black/10 dark:border-white/10 rounded-xl text-xs font-bold transition"
                  >
                    <Download size={14} />
                    <span>Descargar CSV</span>
                  </button>
                  <button
                    onClick={handleShareWeeklyWhatsApp}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow"
                  >
                    <Share2 size={14} />
                    <span>Compartir WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* KPIs Semanales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-6">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Ingresos Semanales</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">Bs. {weeklyMetrics.income.toLocaleString('es-BO')}</p>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400">Cobros 7 días</span>
                </div>

                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <p className="text-[10px] font-black uppercase tracking-wider text-red-600 dark:text-red-400">Gastos Semanales</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">Bs. {weeklyMetrics.expense.toLocaleString('es-BO')}</p>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400">Insumos y logística</span>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Saldo Operativo</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">Bs. {weeklyMetrics.saldo.toLocaleString('es-BO')}</p>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400">Margen bruto semana</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-temple-gold">Reserva Semana (20%)</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">Bs. {weeklyMetrics.reserva20.toLocaleString('es-BO')}</p>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400">Fondo de emergencia</span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <p className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">Flujo Neto Semanal (80%)</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">Bs. {weeklyMetrics.flujoNeto80.toLocaleString('es-BO')}</p>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400">Monto divisible</span>
                </div>
              </div>

              {/* Distribución 50/50 Semanal */}
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-temple-gold/15 via-amber-500/10 to-blue-500/15 border border-temple-gold/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-temple-gold text-black font-black text-base flex items-center justify-center shadow-md">
                    50/50
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-temple-navy dark:text-white tracking-wide">
                      Distribución Semanal de Utilidades (Regla Paulo)
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      Calculado sobre el Flujo Neto disponible de Bs. {weeklyMetrics.flujoNeto80.toLocaleString('es-BO')} (tras separar el 20% de reserva).
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-xs font-bold">
                    <span>50% Reinversión Semanal: </span>
                    <strong className="text-sm font-black">Bs. {weeklyMetrics.reinversion50.toLocaleString('es-BO')}</strong>
                  </div>
                  <div className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-temple-gold/20 text-slate-900 dark:text-temple-gold border border-temple-gold/40 text-xs font-bold">
                    <span>50% Retiro Paulo Semanal: </span>
                    <strong className="text-sm font-black">Bs. {weeklyMetrics.retiroPaulo50.toLocaleString('es-BO')}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de Desglose por Unidades Semanales */}
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <Table size={18} className="text-temple-gold" />
                  <h4 className="text-sm font-black uppercase text-temple-navy dark:text-white tracking-wider">
                    Desglose Semanal por Línea de Negocio
                  </h4>
                </div>
                <span className="text-xs text-slate-500 dark:text-gray-400 font-bold">
                  Sábado de Camp incluido
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-wider text-slate-500 dark:text-gray-400 font-black">
                      <th className="py-3 px-3">Unidad de Negocio</th>
                      <th className="py-3 px-3 text-right">Ingreso Semanal</th>
                      <th className="py-3 px-3 text-right">Gasto Operativo</th>
                      <th className="py-3 px-3 text-right">Saldo Neto</th>
                      <th className="py-3 px-3 text-right">Retiro Paulo (50%)</th>
                      <th className="py-3 px-3 text-right">Reinversión (50%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {weeklyMetrics.breakdown.map((row, idx) => (
                      <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition">
                        <td className="py-3 px-3 font-bold text-slate-800 dark:text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-temple-gold" />
                          <span>{row.unit}</span>
                        </td>
                        <td className="py-3 px-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                          Bs. {row.income.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right text-red-500 dark:text-red-400 font-medium">
                          Bs. {row.expense.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right font-black text-slate-900 dark:text-white">
                          Bs. {row.net.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-temple-gold">
                          Bs. {Math.round(row.net * 0.4).toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-blue-500">
                          Bs. {Math.round(row.net * 0.4).toLocaleString('es-BO')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-black/10 dark:border-white/10 font-black text-xs">
                      <td className="py-3.5 px-3 uppercase text-temple-gold font-bold">TOTALES SEMANA</td>
                      <td className="py-3.5 px-3 text-right font-black text-emerald-600 dark:text-emerald-400">Bs. {weeklyMetrics.income.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-red-500 dark:text-red-400">Bs. {weeklyMetrics.expense.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-slate-900 dark:text-white">Bs. {weeklyMetrics.saldo.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-temple-gold">Bs. {weeklyMetrics.retiroPaulo50.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-blue-500">Bs. {weeklyMetrics.reinversion50.toLocaleString('es-BO')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {subTab === 'mensual' && (
          <motion.div
            key="tab-mensual"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Module40CorteEjecutivo />
          </motion.div>
        )}

        {subTab === 'anual' && (
          <motion.div
            key="tab-anual"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Resumen Anual Consolidado 2026 */}
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      Ejercicio Fiscal 2026
                    </span>
                    <h3 className="text-xl font-black uppercase text-temple-navy dark:text-white tracking-wider mt-1">
                      Flujo Acumulado Anual & Fondos de Crecimiento
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      Historial contable acumulado de Mayo a Septiembre 2026 y proyecciones hacia la meta de 300 atletas.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportAnnualExcel}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-temple-gold hover:bg-amber-400 text-black rounded-xl text-xs font-black transition shadow"
                  >
                    <Download size={14} />
                    <span>Exportar Historial (.xlsx)</span>
                  </button>
                </div>
              </div>

              {/* Tarjetas de Fondos Estratégicos Acumulados */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck size={16} className="text-temple-gold" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-temple-gold">
                      Fondo Reserva Acumulado (20%)
                    </span>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    Bs. {annualTotals.reserva20.toLocaleString('es-BO')}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
                    Capital de seguridad intocable para emergencias.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={16} className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Reinversión Acumulada (50%)
                    </span>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    Bs. {annualTotals.reinversion50.toLocaleString('es-BO')}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
                    Jaulas de calistenia, insumos y expansión del centro.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign size={16} className="text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Utilidad Retirada Paulo (50%)
                    </span>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    Bs. {annualTotals.retiroPaulo50.toLocaleString('es-BO')}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
                    Remuneración y utilidades acumuladas del fundador.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-purple-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Flujo Neto Total 2026
                    </span>
                  </div>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    Bs. {annualTotals.flujoNeto80.toLocaleString('es-BO')}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">
                    Rendimiento financiero neto del gimnasio.
                  </p>
                </div>
              </div>
            </div>

            {/* Tabla Histórica de Meses */}
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <Table size={18} className="text-temple-gold" />
                  <h4 className="text-sm font-black uppercase text-temple-navy dark:text-white tracking-wider">
                    Historial Mensual Consolidado 2026
                  </h4>
                </div>
                <span className="text-xs text-slate-500 dark:text-gray-400 font-bold">
                  Auditado con 68 Atletas
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-wider text-slate-500 dark:text-gray-400 font-black">
                      <th className="py-3 px-3">Mes / Período</th>
                      <th className="py-3 px-3 text-right">Ingresos Brutos</th>
                      <th className="py-3 px-3 text-right">Gastos Operativos</th>
                      <th className="py-3 px-3 text-right">Saldo Operativo</th>
                      <th className="py-3 px-3 text-right">Seguro 20%</th>
                      <th className="py-3 px-3 text-right">Flujo Neto 80%</th>
                      <th className="py-3 px-3 text-right">Retiro Paulo 50%</th>
                      <th className="py-3 px-3 text-right">Reinversión 50%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {annualHistoricalFlow.map((row, idx) => (
                      <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition">
                        <td className="py-3 px-3 font-bold text-slate-800 dark:text-white">
                          {row.month}
                        </td>
                        <td className="py-3 px-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                          Bs. {row.income.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right text-red-500 dark:text-red-400 font-medium">
                          Bs. {row.expense.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-slate-900 dark:text-white">
                          Bs. {row.saldo.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-amber-600 dark:text-amber-400">
                          Bs. {row.seguro.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right font-black text-emerald-600 dark:text-emerald-300">
                          Bs. {row.flujoNeto.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right font-black text-temple-gold">
                          Bs. {row.retiroPaulo.toLocaleString('es-BO')}
                        </td>
                        <td className="py-3 px-3 text-right font-black text-blue-500">
                          Bs. {row.reinversion.toLocaleString('es-BO')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-black/10 dark:border-white/10 font-black text-xs">
                      <td className="py-3.5 px-3 uppercase text-temple-gold font-bold">TOTALES 2026</td>
                      <td className="py-3.5 px-3 text-right font-black text-emerald-600 dark:text-emerald-400">Bs. {annualTotals.income.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-red-500 dark:text-red-400">Bs. {annualTotals.expense.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-slate-900 dark:text-white">Bs. {annualTotals.saldo.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-amber-600 dark:text-amber-400">Bs. {annualTotals.reserva20.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-emerald-600 dark:text-emerald-300">Bs. {annualTotals.flujoNeto80.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-temple-gold">Bs. {annualTotals.retiroPaulo50.toLocaleString('es-BO')}</td>
                      <td className="py-3.5 px-3 text-right font-black text-blue-500">Bs. {annualTotals.reinversion50.toLocaleString('es-BO')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Proyección Estratégica Hacia 300 Atletas */}
            <div className="bg-white dark:bg-[#0B0F19]/90 border border-temple-gold/30 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-black/10 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-temple-gold/20 text-temple-gold flex items-center justify-center border border-temple-gold/30">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase text-temple-navy dark:text-white tracking-wider">
                    Hoja de Ruta y Escalamiento a 300 Atletas
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-gray-400">
                    Proyección de ingresos, reserva y reparto 50/50 según el crecimiento de la comunidad TempleFit.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-temple-gold">Etapa 1 (Actual)</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-gray-300">68 Atletas</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">Bs. 32,000 / mes</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 mt-1">Flujo Neto: Bs. 16,320</p>
                  <p className="text-[10px] font-bold text-temple-gold">Retiro 50%: Bs. 8,160 / mes</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">Etapa 2 (Consolidación)</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-gray-300">100 Atletas</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">Bs. 48,000 / mes</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 mt-1">Flujo Neto: Bs. 24,000</p>
                  <p className="text-[10px] font-bold text-temple-gold">Retiro 50%: Bs. 12,000 / mes</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Etapa 3 (Expansión)</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-gray-300">200 Atletas</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">Bs. 96,000 / mes</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 mt-1">Flujo Neto: Bs. 52,000</p>
                  <p className="text-[10px] font-bold text-temple-gold">Retiro 50%: Bs. 26,000 / mes</p>
                </div>

                <div className="p-4 rounded-2xl bg-temple-gold/10 border border-temple-gold/40">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-temple-gold">Meta Cumbre</span>
                    <span className="text-xs font-black text-temple-gold">300 Atletas</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">Bs. 144,000 / mes</p>
                  <p className="text-[10px] text-slate-600 dark:text-gray-400 mt-1">Flujo Neto: Bs. 80,000</p>
                  <p className="text-[10px] font-black text-temple-gold">Retiro 50%: Bs. 40,000 / mes</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
