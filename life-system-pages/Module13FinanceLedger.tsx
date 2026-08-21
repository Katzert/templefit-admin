'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Search, 
  Plus, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Check, 
  TrendingUp, 
  Calendar,
  Layers,
  PieChart,
  FileSpreadsheet
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Transaction } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };

export function Module13FinanceLedger() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'todos' | 'income' | 'expense'>('todos');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Modal State (Add or Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [txForm, setTxForm] = useState<{
    type: 'income' | 'expense';
    amount: string | number;
    description: string;
    category: Transaction['category'];
    date: string;
  }>({
    type: 'income',
    amount: '',
    description: '',
    category: 'membership',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadTransactions = () => {
    const db = getCRMDatabase();
    setTransactions(db.transactions || []);
  };

  const saveToDb = (newTxs: Transaction[], msg?: string) => {
    const db = getCRMDatabase();
    db.transactions = newTxs;
    saveCRMDatabase(db);
    setTransactions(newTxs);
    if (msg) showToast(msg);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'todos' || t.type === typeFilter;
      const matchesCategory = categoryFilter === 'todos' || t.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, typeFilter, categoryFilter]);

  // Cálculos matemáticos numéricos estrictos
  const kpis = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((s, t) => s + (Number(t.amount) || 0), 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((s, t) => s + (Number(t.amount) || 0), 0);
    
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    const monthIncome = transactions
      .filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
      .reduce((s, t) => s + (Number(t.amount) || 0), 0);

    const monthExpense = transactions
      .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
      .reduce((s, t) => s + (Number(t.amount) || 0), 0);

    const netProfit = totalIncome - totalExpense;
    const margin = totalIncome > 0 ? Math.round((netProfit / totalIncome) * 100) : 0;

    return {
      totalIncome,
      totalExpense,
      netProfit,
      monthIncome,
      monthExpense,
      margin
    };
  }, [transactions]);

  const formatBs = (n: number) => `Bs. ${Number(n || 0).toLocaleString('es-BO')}`;

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar esta transacción del libro contable?')) {
      saveToDb(transactions.filter(t => t.id !== id), 'Transacción eliminada');
    }
  };

  const handleOpenAddModal = () => {
    setEditingTxId(null);
    setTxForm({
      type: 'income',
      amount: '',
      description: '',
      category: 'membership',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (tx: Transaction) => {
    setEditingTxId(tx.id);
    setTxForm({
      type: tx.type,
      amount: Number(tx.amount) || 0,
      description: tx.description,
      category: tx.category,
      date: tx.date
    });
    setIsModalOpen(true);
  };

  const submitTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const validAmount = Math.max(0, Number(txForm.amount) || 0);
    if (validAmount <= 0 || !txForm.description.trim()) {
      alert('Por favor ingresa un monto válido mayor a 0 y una descripción.');
      return;
    }

    if (editingTxId) {
      // Edit existing
      const updated = transactions.map(t => {
        if (t.id === editingTxId) {
          return {
            ...t,
            type: txForm.type,
            amount: validAmount,
            description: txForm.description.trim(),
            category: txForm.category,
            date: txForm.date || new Date().toISOString().split('T')[0]
          };
        }
        return t;
      });
      saveToDb(updated, '¡Asiento contable modificado con éxito!');
    } else {
      // Create new
      const tx: Transaction = {
        id: 'tx-' + Date.now(),
        date: txForm.date || new Date().toISOString().split('T')[0],
        type: txForm.type,
        category: txForm.category,
        amount: validAmount,
        description: txForm.description.trim()
      };
      saveToDb([tx, ...transactions], '¡Nuevo asiento contable registrado!');
    }

    setIsModalOpen(false);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'membership': return 'Membresías Gym';
      case 'snack_bar': return 'Snack Bar & Té';
      case 'merchandise': return 'Textil & Ropa';
      case 'course': return 'Neuro-Ventas & Cursos';
      case 'equipment': return 'Equipamiento';
      case 'rent': return 'Alquiler Local';
      case 'salaries': return 'Honorarios & Sueldos';
      case 'supplies': return 'Materia Prima / Insumos';
      default: return 'Otros Gastos';
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0E1424] via-[#0B0F19] to-black p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <DollarSign size={140} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Contabilidad & Caja 2026
              </span>
              <span className="text-xs text-gray-400 font-bold">{transactions.length} Registros</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="text-temple-gold" size={26} />
              Libro Diario Financiero (Bs.)
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Flujo de caja real: Control de cobros de membresías, ventas de barra nutricional y costos operativos.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold hover:bg-temple-gold-bright text-black rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-temple-gold/20 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Plus size={16} /> Registrar Asiento
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Ingresos Totales */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <ArrowUpRight size={13} className="text-emerald-400" /> Ingresos Acumulados
            </p>
            <p className="text-2xl font-black text-emerald-400 tabular-nums">{formatBs(kpis.totalIncome)}</p>
            <span className="text-[10px] text-gray-500">Este mes: {formatBs(kpis.monthIncome)}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
            <ArrowUpRight size={22} />
          </div>
        </div>

        {/* Egresos Totales */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <ArrowDownRight size={13} className="text-temple-red" /> Egresos / Costos
            </p>
            <p className="text-2xl font-black text-temple-red tabular-nums">{formatBs(kpis.totalExpense)}</p>
            <span className="text-[10px] text-gray-500">Este mes: {formatBs(kpis.monthExpense)}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-temple-red/15 flex items-center justify-center text-temple-red border border-temple-red/30">
            <ArrowDownRight size={22} />
          </div>
        </div>

        {/* Utilidad Neta */}
        <div className={`border p-5 rounded-2xl flex items-center justify-between shadow-xl ${
          kpis.netProfit >= 0 ? 'bg-[#0B0F19] border-temple-gold/40' : 'bg-temple-red/10 border-temple-red/50'
        }`}>
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <TrendingUp size={13} className="text-temple-gold" /> Utilidad Neta en Caja
            </p>
            <p className={`text-2xl font-black tabular-nums ${kpis.netProfit >= 0 ? 'text-temple-gold' : 'text-temple-red'}`}>
              {formatBs(kpis.netProfit)}
            </p>
            <span className="text-[10px] text-gray-400 font-bold">Margen: {kpis.margin}%</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-temple-gold/15 flex items-center justify-center text-temple-gold border border-temple-gold/30">
            <DollarSign size={22} />
          </div>
        </div>

        {/* Total Registros & Añadir */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">Estado de Caja</p>
            <p className="text-2xl font-black text-white tabular-nums">
              {kpis.netProfit >= 0 ? '🟢 Saludable' : '🔴 Déficit'}
            </p>
            <span className="text-[10px] text-gray-500">Libro balanceado</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-300 border border-white/10">
            <FileSpreadsheet size={22} />
          </div>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0B0F19] p-3.5 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Buscar por concepto o categoría..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-temple-gold transition-colors text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
          {/* Tipo */}
          <div className="flex bg-black/60 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setTypeFilter('todos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${typeFilter === 'todos' ? 'bg-temple-gold text-black' : 'text-gray-400'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setTypeFilter('income')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${typeFilter === 'income' ? 'bg-emerald-500 text-black font-extrabold' : 'text-gray-400'}`}
            >
              Ingresos
            </button>
            <button
              onClick={() => setTypeFilter('expense')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${typeFilter === 'expense' ? 'bg-temple-red text-white font-extrabold' : 'text-gray-400'}`}
            >
              Egresos
            </button>
          </div>

          {/* Categoría */}
          <select 
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-gray-300 focus:outline-none focus:border-temple-gold"
          >
            <option value="todos">Categoría: Todas</option>
            <option value="membership">Membresías</option>
            <option value="snack_bar">Snack Bar & Té</option>
            <option value="merchandise">Textil & Ropa</option>
            <option value="course">Neuro-Ventas</option>
            <option value="equipment">Equipamiento</option>
            <option value="rent">Alquiler</option>
            <option value="salaries">Honorarios</option>
            <option value="supplies">Materia Prima</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#0B0F19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/60 text-[10px] uppercase tracking-widest text-gray-400 border-b border-white/10">
                <th className="p-4">Fecha</th>
                <th className="p-4">Concepto / Descripción</th>
                <th className="p-4">Categoría</th>
                <th className="p-4 text-center">Tipo</th>
                <th className="p-4 text-right">Monto (Bs.)</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTransactions.map(t => {
                  const isIncome = t.type === 'income';

                  return (
                    <motion.tr 
                      key={t.id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-white/5 hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-4">
                        <div className="font-mono text-xs text-gray-300 flex items-center gap-1.5">
                          <Calendar size={13} className="text-gray-500" />
                          <span>{t.date}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white text-xs group-hover:text-temple-gold transition-colors">
                          {t.description}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300">
                          {getCategoryLabel(t.category)}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          isIncome 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-temple-red/20 text-red-300 border border-temple-red/40'
                        }`}>
                          {isIncome ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                          <span>{isIncome ? 'Ingreso' : 'Egreso'}</span>
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <span className={`font-mono font-black text-sm tabular-nums ${
                          isIncome ? 'text-emerald-400' : 'text-temple-red'
                        }`}>
                          {isIncome ? '+' : '-'}{formatBs(Number(t.amount) || 0)}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(t)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-temple-gold/20 text-gray-300 hover:text-temple-gold border border-white/10 transition"
                            title="Editar Asiento"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(t.id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-temple-red/20 text-gray-400 hover:text-temple-red border border-white/10 transition"
                            title="Eliminar"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <DollarSign size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-wider">No se encontraron asientos con los filtros actuales.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL REGISTRAR / EDITAR ASIENTO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B0F19] border border-temple-gold/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-temple-gold/20 text-temple-gold flex items-center justify-center border border-temple-gold/40 font-bold">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-black uppercase text-white">
                      {editingTxId ? 'Editar Asiento Contable' : 'Nuevo Asiento de Caja'}
                    </h3>
                    <p className="text-[10px] text-gray-400">Registra entradas y salidas financieras</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={submitTransaction} className="space-y-4">
                
                {/* Tipo (Ingreso vs Egreso) */}
                <div className="grid grid-cols-2 gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setTxForm({ ...txForm, type: 'income' })}
                    className={`py-2 rounded-lg text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                      txForm.type === 'income' ? 'bg-emerald-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ArrowUpRight size={14} />
                    <span>Ingreso (+)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTxForm({ ...txForm, type: 'expense' })}
                    className={`py-2 rounded-lg text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                      txForm.type === 'expense' ? 'bg-temple-red text-white shadow-md' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ArrowDownRight size={14} />
                    <span>Egreso (-)</span>
                  </button>
                </div>

                {/* Monto y Fecha */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-temple-gold font-extrabold uppercase tracking-wider block mb-1">Monto (Bs.) *</label>
                    <input
                      type="number"
                      step="any"
                      min="0.1"
                      required
                      placeholder="0.00"
                      value={txForm.amount}
                      onChange={e => setTxForm({ ...txForm, amount: e.target.value })}
                      className="w-full bg-black/60 border border-temple-gold/50 rounded-xl px-3.5 py-2.5 text-xs text-temple-gold font-black focus:outline-none focus:border-temple-gold tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Fecha</label>
                    <input
                      type="date"
                      required
                      value={txForm.date}
                      onChange={e => setTxForm({ ...txForm, date: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-temple-gold"
                    />
                  </div>
                </div>

                {/* Concepto / Descripción */}
                <div>
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Concepto / Glosa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Cobro Reto 21 Días - Carlos Gutiérrez"
                    value={txForm.description}
                    onChange={e => setTxForm({ ...txForm, description: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-temple-gold font-bold"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Categoría Operativa</label>
                  <select
                    value={txForm.category}
                    onChange={e => setTxForm({ ...txForm, category: e.target.value as any })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-temple-gold"
                  >
                    <option value="membership">🥋 Membresías Gym & Retos</option>
                    <option value="snack_bar">🍵 Snack Bar de Té & Bebidas</option>
                    <option value="merchandise">👕 Textil & Ropa Oficial</option>
                    <option value="course">🧠 Neuro-Ventas & Cursos</option>
                    <option value="equipment">🏋️ Equipamiento Gym</option>
                    <option value="rent">🏢 Alquiler de Local</option>
                    <option value="salaries">💼 Honorarios & Sueldos</option>
                    <option value="supplies">📦 Materia Prima & Insumos</option>
                    <option value="other">📑 Otros Gastos</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-temple-gold hover:bg-temple-gold-bright text-black rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg shadow-temple-gold/20 flex items-center gap-1.5"
                  >
                    <Save size={14} />
                    <span>Guardar Asiento</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
