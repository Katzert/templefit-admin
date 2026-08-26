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
  CheckCircle2,
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
  
  // New Tx Form State
  const [isAdding, setIsAdding] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [autoMessage, setAutoMessage] = useState<string | null>(null);
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [newTx, setNewTx] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    description: '',
    category: 'membership',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const db = getCRMDatabase();
    setTransactions(db.transactions || []);
    setStudentsList(db.students || []);
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

    const db = getCRMDatabase();

    // 1. Automatización: Descuento de stock en inventario
    let stockAlert = '';
    if (newTx.type === 'income' && (newTx.category === 'snack' || newTx.category === 'merchandise') && db.inventory) {
      const matchIndex = db.inventory.findIndex(inv => 
        newTx.description.toLowerCase().includes(inv.name.toLowerCase()) || 
        inv.name.toLowerCase().includes(newTx.description.toLowerCase())
      );
      if (matchIndex >= 0) {
        const item = db.inventory[matchIndex];
        if (item.stock > 0) {
          db.inventory[matchIndex].stock -= 1;
          stockAlert = ` • Stock de ${item.name} actualizado: ${item.stock} unidades`;
        }
      }
    }

    // 2. Automatización: Auto-renovación de membresía del atleta
    let renewalAlert = '';
    if (newTx.type === 'income' && newTx.category === 'membership' && selectedStudentId && db.students) {
      const sIndex = db.students.findIndex(s => s.id === selectedStudentId);
      if (sIndex >= 0) {
        const nextDate = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
        db.students[sIndex].status = 'active';
        db.students[sIndex].renewalDate = nextDate;
        renewalAlert = ` • Membresía de ${db.students[sIndex].name} renovada hasta ${nextDate}`;
      }
    }

    db.transactions = [tx, ...(db.transactions || [])];
    saveCRMDatabase(db);
    setTransactions(db.transactions);
    setStudentsList(db.students || []);

    setAutoMessage(`Asiento guardado con éxito${stockAlert}${renewalAlert}`);
    setTimeout(() => setAutoMessage(null), 4000);

    setIsAdding(false);
    setSelectedStudentId('');
    setNewTx({ 
      type: 'income', 
      amount: '', 
      description: '', 
      category: 'membership',
      date: new Date().toISOString().split('T')[0]
    });
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
                Caja & Finanzas
              </span>
              <span className="text-xs text-gray-400 font-bold">Total: {transactions.length} registros</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="text-temple-gold" size={26} />
              Libro de Caja Diario (Bs.)
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Control de pagos de membresías, ventas del snack bar y compras operativas.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold hover:bg-temple-gold-bright text-black rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-temple-gold/20 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            {isAdding ? <X size={18} /> : <Plus size={18} />}
            <span>{isAdding ? 'Cerrar Formulario' : 'Nuevo Registro'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Balance Neto', value: formatBs(kpis.netProfit), icon: TrendingUp, color: kpis.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400', bg: kpis.netProfit >= 0 ? 'bg-emerald-400/10' : 'bg-red-400/10' },
          { label: 'Total Ingresos', value: formatBs(kpis.totalIncome), icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Total Gastos', value: formatBs(kpis.totalExpense), icon: ArrowDownRight, color: 'text-red-400', bg: 'bg-red-400/10' },
          { label: 'Membresías del Mes', value: formatBs(kpis.mrr), icon: DollarSign, color: 'text-temple-gold', bg: 'bg-temple-gold/10' },
        ].map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className="bg-[#0E1424]/90 backdrop-blur-xl border-white/10 shadow-lg">
              <CardContent className="!p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${kpi.bg} border border-white/5`}>
                  <kpi.icon className={kpi.color} size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{kpi.label}</p>
                  <p className="text-xl font-black text-white truncate">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
            <Card className="bg-[#121826] border-temple-gold/40 shadow-2xl">
              <CardContent className="!p-6">
                <div className="flex flex-col gap-4 mb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <Plus className="text-temple-gold" size={18} />
                      Registrar Asiento Contable
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-gray-500">Presets de 1-Clic</span>
                  </div>

                  {/* 1-Tap Quick Presets */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '+ Reto 21 Días (Bs. 200)', type: 'income' as const, amount: '200', category: 'membership' as const, desc: 'Membresía Reto 21 Días' },
                      { label: '+ E.A.G.E. (Bs. 1,200)', type: 'income' as const, amount: '1200', category: 'courses' as const, desc: 'Programa Formación E.A.G.E.' },
                      { label: '+ ElectroHidra (Bs. 15)', type: 'income' as const, amount: '15', category: 'snack' as const, desc: 'Venta Bebida ElectroHidra' },
                      { label: '+ Smoothie Salomón (Bs. 20)', type: 'income' as const, amount: '20', category: 'snack' as const, desc: 'Venta Smoothie Cerebral Salomón' },
                      { label: '+ Polera Oficial (Bs. 100)', type: 'income' as const, amount: '100', category: 'merchandise' as const, desc: 'Venta Polera Oficial TempleFit' },
                      { label: '- Insumos Botánicos (Bs. 650)', type: 'expense' as const, amount: '650', category: 'operations' as const, desc: 'Compra insumos botánicos' },
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setNewTx({
                            type: preset.type,
                            amount: preset.amount,
                            category: preset.category,
                            description: preset.desc,
                            date: new Date().toISOString().split('T')[0]
                          });
                        }}
                        className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border transition-all ${
                          preset.type === 'income'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {autoMessage && (
                  <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{autoMessage}</span>
                  </div>
                )}

                <form onSubmit={submitTransaction} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Tipo de Flujo</label>
                    <select
                      value={newTx.type}
                      onChange={e => setNewTx({ ...newTx, type: e.target.value as any })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:border-temple-gold"
                    >
                      <option className="bg-[#121826]" value="income">Ingreso (+)</option>
                      <option className="bg-[#121826]" value="expense">Egreso (-)</option>
                    </select>
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
                      value={newTx.date}
                      onChange={e => setNewTx({ ...newTx, date: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:border-temple-gold"
                    />
                  </div>

                  {newTx.category === 'membership' && newTx.type === 'income' ? (
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-amber-400 mb-1">Atleta (Auto-renovar +30D)</label>
                      <select
                        value={selectedStudentId}
                        onChange={e => {
                          const sId = e.target.value;
                          setSelectedStudentId(sId);
                          const student = studentsList.find(s => s.id === sId);
                          if (student && !newTx.description) {
                            setNewTx(prev => ({ ...prev, description: `Renovación Reto 21 Días - ${student.name}` }));
                          }
                        }}
                        className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-xs font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                      >
                        <option className="bg-[#121826]" value="">Seleccionar atleta...</option>
                        {studentsList.map(s => (
                          <option key={s.id} className="bg-[#121826]" value={s.id}>
                            {s.name} ({s.status === 'expiring' ? '⚡ Por Vencer' : s.status})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}

                  <div className={newTx.category === 'membership' && newTx.type === 'income' ? "sm:col-span-2 lg:col-span-4" : "sm:col-span-2 lg:col-span-4"}>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Concepto / Glosa</label>
                    <input
                      type="text"
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

      {/* Main Table Card */}
      <motion.div variants={item}>
        <Card className="bg-[#0E1424]/90 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardContent className="!p-6">
            {/* Filters Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b border-white/10 pb-6">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-3 text-gray-500" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar por concepto o categoría..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold/50 rounded-xl text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2">
                  <Filter size={14} className="text-temple-gold" />
                  <select 
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value as any)}
                    className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                  >
                    <option className="bg-[#0E1424]" value="todos">Tipo: Todos</option>
                    <option className="bg-[#0E1424]" value="income">Ingresos (+)</option>
                    <option className="bg-[#0E1424]" value="expense">Egresos (-)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2">
                  <select 
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                  >
                    <option className="bg-[#0E1424]" value="todos">Categoría: Todas</option>
                    <option className="bg-[#0E1424]" value="membership">Membresías</option>
                    <option className="bg-[#0E1424]" value="courses">Cursos & Formación</option>
                    <option className="bg-[#0E1424]" value="snack">Snack Bar</option>
                    <option className="bg-[#0E1424]" value="merchandise">Indumentaria</option>
                    <option className="bg-[#0E1424]" value="operations">Operaciones</option>
                    <option className="bg-[#0E1424]" value="rent">Alquiler</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black">
                    <th className="pb-3 pl-4">Fecha</th>
                    <th className="pb-3">Concepto / Glosa</th>
                    <th className="pb-3">Categoría</th>
                    <th className="pb-3 text-right">Monto</th>
                    <th className="pb-3 text-center pr-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredTransactions.map((tx) => {
                    const isEditing = editingId === tx.id;

                    if (isEditing) {
                      return (
                        <tr key={tx.id} className="bg-white/5 border-t border-temple-gold/30">
                          <td className="py-3 pl-4">
                            <input
                              type="date"
                              value={editForm.date}
                              onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                              className="bg-black/50 text-white px-2.5 py-1.5 rounded-lg border border-temple-gold/40 text-xs focus:outline-none"
                            />
                          </td>
                          <td className="py-3">
                            <input
                              type="text"
                              value={editForm.description}
                              onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                              className="w-full bg-black/50 text-white px-2.5 py-1.5 rounded-lg border border-temple-gold/40 text-xs focus:outline-none"
                            />
                          </td>
                          <td className="py-3">
                            <select
                              value={editForm.category}
                              onChange={e => setEditForm({ ...editForm, category: e.target.value as any })}
                              className="bg-black/50 text-white px-2 py-1.5 rounded-lg border border-temple-gold/40 text-xs focus:outline-none"
                            >
                              <option value="membership">Membresía</option>
                              <option value="courses">Cursos</option>
                              <option value="snack">Snack Bar</option>
                              <option value="merchandise">Indumentaria</option>
                              <option value="operations">Operaciones</option>
                              <option value="rent">Alquiler</option>
                            </select>
                          </td>
                          <td className="py-3 text-right">
                            <input
                              type="number"
                              value={editForm.amount}
                              onChange={e => setEditForm({ ...editForm, amount: Number(e.target.value) })}
                              className="w-24 bg-black/50 text-temple-gold font-bold px-2 py-1.5 rounded-lg border border-temple-gold/40 text-xs text-right focus:outline-none"
                            />
                          </td>
                          <td className="py-3 pr-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button onClick={saveEditing} className="p-1.5 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 font-bold transition">
                                <Save size={15} />
                              </button>
                              <button onClick={() => setEditingId(null)} className="p-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
                                <X size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={tx.id} className="hover:bg-white/5 transition group">
                        <td className="py-4 pl-4">
                          <span className="text-xs font-mono font-bold text-gray-300">{tx.date}</span>
                        </td>
                        <td className="py-4">
                          <p className="text-sm font-bold text-white group-hover:text-temple-gold transition">{tx.description}</p>
                        </td>
                        <td className="py-4">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-temple-gold px-2.5 py-1 bg-white/5 rounded-full border border-white/10">
                            {tx.category}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span className={`text-sm font-black inline-flex items-center justify-end gap-1 ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {tx.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {formatBs(tx.amount)}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button 
                              onClick={() => startEditing(tx)} 
                              className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition"
                              title="Editar Asiento"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button 
                              onClick={() => handleDelete(tx.id)} 
                              className="p-2 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-400/10 rounded-lg transition"
                              title="Eliminar Asiento"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-500 text-sm">
                        No se encontraron transacciones registradas con los filtros seleccionados.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-black/90 border-t-2 border-temple-gold/40 font-black text-white text-xs">
                    <td className="py-4 pl-4 uppercase tracking-wider text-temple-gold font-mono">
                      Total: {filteredTransactions.length} Asientos
                    </td>
                    <td className="py-4 text-gray-300 font-bold">
                      Ingresos: <span className="text-emerald-400 font-mono">+{formatBs(filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0))}</span>
                    </td>
                    <td className="py-4 text-gray-300 font-bold">
                      Egresos: <span className="text-red-400 font-mono">-{formatBs(filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}</span>
                    </td>
                    <td className="py-4 text-right font-mono font-black text-sm text-temple-gold">
                      Neto: {formatBs(filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) - filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}
                    </td>
                    <td className="py-4 text-center text-gray-500">-</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
