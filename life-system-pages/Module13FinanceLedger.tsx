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
  Calendar 
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Transaction } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function Module13FinanceLedger() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'todos' | 'income' | 'expense'>('todos');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  
  // New Tx Form State
  const [isAdding, setIsAdding] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [autoMessage, setAutoMessage] = useState<string | null>(null);
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [newTx, setNewTx] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    description: '',
    category: 'membership' as Transaction['category'],
    date: new Date().toISOString().split('T')[0]
  });

  // Inline Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Transaction>>({});

  useEffect(() => {
    const db = getCRMDatabase();
    setTransactions(db.transactions || []);
    setStudentsList(db.students || []);
  }, []);

  const saveToDb = (newTxs: Transaction[]) => {
    const db = getCRMDatabase();
    db.transactions = newTxs;
    saveCRMDatabase(db);
    setTransactions(newTxs);
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

  // --- KPIs financieros calculados desde transacciones reales (no hardcodeados) ---
  const kpis = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const mrr = transactions
      .filter(t => t.type === 'income' && t.category === 'membership' && t.date.startsWith(currentMonth))
      .reduce((s, t) => s + t.amount, 0);
    return {
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
      mrr,
    };
  }, [transactions]);

  const formatBs = (n: number) => `Bs. ${n.toLocaleString('es-BO')}`;

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar esta transacción del libro diario?')) {
      saveToDb(transactions.filter(t => t.id !== id));
    }
  };

  const startEditing = (tx: Transaction) => {
    setEditingId(tx.id);
    setEditForm(tx);
  };

  const saveEditing = () => {
    if (!editingId || !editForm.description || Number(editForm.amount) <= 0) return;
    const updated = transactions.map(t => 
      t.id === editingId ? { ...t, ...editForm, amount: Number(editForm.amount) } as Transaction : t
    );
    saveToDb(updated);
    setEditingId(null);
  };

  const submitTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(newTx.amount);
    if (isNaN(amount) || amount <= 0 || !newTx.description) {
      alert('Por favor ingresa un monto válido y una descripción.');
      return;
    }

    const tx: Transaction = {
      id: 'tx-' + Date.now(),
      date: newTx.date || new Date().toISOString().split('T')[0],
      type: newTx.type,
      category: newTx.category,
      amount,
      description: newTx.description
    };

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
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-temple-navy dark:text-white p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <DollarSign size={140} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Caja & Finanzas
              </span>
              <span className="text-xs text-slate-600 dark:text-gray-400 font-bold">Total: {transactions.length} registros</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-temple-navy dark:text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="text-temple-gold" size={26} />
              Libro de Caja Diario (Bs.)
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 mt-1">
              Control de pagos de membresías, ventas del snack bar y compras operativas.
            </p>
          </div>
          
          <button 
            onClick={() => setIsAdding(!isAdding)} 
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold text-black rounded-xl font-extrabold hover:bg-amber-400 transition-all uppercase tracking-wider text-xs shadow-lg shadow-temple-gold/20 w-max"
          >
            {isAdding ? <X size={18} /> : <Plus size={18} />}
            <span>{isAdding ? 'Cerrar Formulario' : 'Nuevo Registro'}</span>
          </button>
        </div>
      </div>

      {/* KPIs financieros calculados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Balance Neto', value: formatBs(kpis.netProfit), icon: TrendingUp, color: kpis.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400', bg: kpis.netProfit >= 0 ? 'bg-emerald-400/10' : 'bg-red-400/10' },
          { label: 'Total Ingresos', value: formatBs(kpis.totalIncome), icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Total Gastos', value: formatBs(kpis.totalExpense), icon: ArrowDownRight, color: 'text-red-400', bg: 'bg-red-400/10' },
          { label: 'Membresías del Mes', value: formatBs(kpis.mrr), icon: DollarSign, color: 'text-temple-gold', bg: 'bg-temple-gold/10' },
        ].map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className="bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl border-black/10 dark:border-white/10 shadow-lg">
              <CardContent className="!p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${kpi.bg} border border-black/5 dark:border-white/5`}>
                  <kpi.icon className={kpi.color} size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-600 dark:text-gray-400 uppercase tracking-widest font-bold">{kpi.label}</p>
                  <p className="text-xl font-black text-slate-800 dark:text-temple-navy dark:text-white truncate">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* New Transaction Form Modal / Drawer */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-white dark:bg-[#121826] border-temple-gold/40 shadow-2xl">
              <CardContent className="!p-6">
                <div className="flex flex-col gap-4 mb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-black text-temple-navy dark:text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Plus className="text-temple-gold" size={18} />
                      Registrar Asiento Contable
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-500">Presets de 1-Clic</span>
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
                    <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-gray-400 mb-1">Tipo de Flujo</label>
                    <select
                      value={newTx.type}
                      onChange={e => setNewTx({ ...newTx, type: e.target.value as any })}
                      className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl p-2.5 text-xs font-bold text-temple-navy dark:text-temple-navy dark:text-white focus:outline-none focus:border-temple-gold"
                    >
                      <option className="bg-white dark:bg-[#121826]" value="income">Ingreso (+)</option>
                      <option className="bg-white dark:bg-[#121826]" value="expense">Egreso (-)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-gray-400 mb-1">Categoría</label>
                    <select
                      value={newTx.category}
                      onChange={e => setNewTx({ ...newTx, category: e.target.value as any })}
                      className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl p-2.5 text-xs font-bold text-temple-navy dark:text-temple-navy dark:text-white focus:outline-none focus:border-temple-gold"
                    >
                      <option className="bg-white dark:bg-[#121826]" value="membership">Membresía / Reto 21 Días</option>
                      <option className="bg-white dark:bg-[#121826]" value="courses">Cursos / E.A.G.E. / Neuro-Ventas</option>
                      <option className="bg-white dark:bg-[#121826]" value="snack">Snack Bar / Bebidas</option>
                      <option className="bg-white dark:bg-[#121826]" value="merchandise">Indumentaria / Armería</option>
                      <option className="bg-white dark:bg-[#121826]" value="medicine">Salud / Masajes</option>
                      <option className="bg-white dark:bg-[#121826]" value="operations">Insumos & Operaciones</option>
                      <option className="bg-white dark:bg-[#121826]" value="rent">Alquiler / Espacio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-gray-400 mb-1">Monto en Bolivianos (Bs.)</label>
                    <input
                      type="number"
                      required
                      placeholder="Ej. 200"
                      value={newTx.amount}
                      onChange={e => setNewTx({ ...newTx, amount: e.target.value })}
                      className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl p-2.5 text-xs font-bold text-temple-navy dark:text-temple-navy dark:text-white focus:outline-none focus:border-temple-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-gray-400 mb-1">Fecha</label>
                    <input
                      type="date"
                      value={newTx.date}
                      onChange={e => setNewTx({ ...newTx, date: e.target.value })}
                      className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl p-2.5 text-xs font-bold text-temple-navy dark:text-temple-navy dark:text-white focus:outline-none focus:border-temple-gold"
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
                        <option className="bg-white dark:bg-[#121826]" value="">Seleccionar atleta...</option>
                        {studentsList.map(s => (
                          <option key={s.id} className="bg-white dark:bg-[#121826]" value={s.id}>
                            {s.name} ({s.status === 'expiring' ? '⚡ Por Vencer' : s.status})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}

                  <div className={newTx.category === 'membership' && newTx.type === 'income' ? "sm:col-span-2 lg:col-span-4" : "sm:col-span-2 lg:col-span-4"}>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 dark:text-gray-400 mb-1">Concepto / Glosa</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Membresía Reto 21 Días - Juan Pérez"
                      value={newTx.description}
                      onChange={e => setNewTx({ ...newTx, description: e.target.value })}
                      className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl p-2.5 text-xs text-temple-navy dark:text-white focus:outline-none focus:border-temple-gold"
                    />
                  </div>

                  <div className="flex items-end lg:col-span-1">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-temple-gold text-black rounded-xl font-extrabold uppercase tracking-wider text-xs hover:bg-amber-400 transition shadow-md"
                    >
                      Guardar Asiento
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Table Card */}
      <motion.div variants={item}>
        <Card className="bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl border-black/10 dark:border-white/10 shadow-2xl">
          <CardContent className="!p-6">
            {/* Filters Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b border-black/10 dark:border-white/10 pb-6">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-3 text-slate-500 dark:text-gray-500" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar por concepto o categoría..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black/[0.03] dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-temple-navy dark:text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold/50 rounded-xl text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-black/[0.03] dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2">
                  <Filter size={14} className="text-temple-gold" />
                  <select 
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value as any)}
                    className="bg-transparent text-xs font-bold text-temple-navy dark:text-temple-navy dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option className="bg-white dark:bg-[#0E1424]" value="todos">Tipo: Todos</option>
                    <option className="bg-white dark:bg-[#0E1424]" value="income">Ingresos (+)</option>
                    <option className="bg-white dark:bg-[#0E1424]" value="expense">Egresos (-)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-black/[0.03] dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2">
                  <select 
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="bg-transparent text-xs font-bold text-temple-navy dark:text-temple-navy dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option className="bg-white dark:bg-[#0E1424]" value="todos">Categoría: Todas</option>
                    <option className="bg-white dark:bg-[#0E1424]" value="membership">Membresías</option>
                    <option className="bg-white dark:bg-[#0E1424]" value="courses">Cursos & Formación</option>
                    <option className="bg-white dark:bg-[#0E1424]" value="snack">Snack Bar</option>
                    <option className="bg-white dark:bg-[#0E1424]" value="merchandise">Indumentaria</option>
                    <option className="bg-white dark:bg-[#0E1424]" value="operations">Operaciones</option>
                    <option className="bg-white dark:bg-[#0E1424]" value="rent">Alquiler</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-gray-400 font-black">
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
                        <tr key={tx.id} className="bg-black/5 dark:bg-white/5 border-t border-temple-gold/30">
                          <td className="py-3 pl-4">
                            <input
                              type="date"
                              value={editForm.date}
                              onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                              className="bg-slate-100 dark:bg-black/50 text-white px-2.5 py-1.5 rounded-lg border border-temple-gold/40 text-xs focus:outline-none"
                            />
                          </td>
                          <td className="py-3">
                            <input
                              type="text"
                              value={editForm.description}
                              onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                              className="w-full bg-slate-100 dark:bg-black/50 text-white px-2.5 py-1.5 rounded-lg border border-temple-gold/40 text-xs focus:outline-none"
                            />
                          </td>
                          <td className="py-3">
                            <select
                              value={editForm.category}
                              onChange={e => setEditForm({ ...editForm, category: e.target.value as any })}
                              className="bg-slate-100 dark:bg-black/50 text-white px-2 py-1.5 rounded-lg border border-temple-gold/40 text-xs focus:outline-none"
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
                              className="w-24 bg-slate-100 dark:bg-black/50 text-temple-gold font-bold px-2 py-1.5 rounded-lg border border-temple-gold/40 text-xs text-right focus:outline-none"
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
                      <tr key={tx.id} className="hover:bg-black/5 dark:bg-white/5 transition group">
                        <td className="py-4 pl-4">
                          <span className="text-xs tabular-nums font-bold text-slate-700 dark:text-gray-300">{tx.date}</span>
                        </td>
                        <td className="py-4">
                          <p className="text-sm font-bold text-slate-800 dark:text-temple-navy dark:text-white group-hover:text-temple-gold transition">{tx.description}</p>
                        </td>
                        <td className="py-4">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-temple-gold px-2.5 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 dark:border-white/10">
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
                              className="p-2 text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 rounded-lg transition"
                              title="Editar Asiento"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button 
                              onClick={() => handleDelete(tx.id)} 
                              className="p-2 text-slate-600 dark:text-gray-400 hover:text-red-400 bg-black/5 dark:bg-white/5 hover:bg-red-400/10 rounded-lg transition"
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
                      <td colSpan={5} className="text-center py-12 text-slate-500 dark:text-gray-500 text-sm">
                        No se encontraron transacciones registradas con los filtros seleccionados.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t border-black/10 dark:border-white/10 font-black text-temple-navy dark:text-temple-navy dark:text-white text-xs">
                    <td className="py-4 pl-4 uppercase tracking-wider text-temple-gold tabular-nums">
                      Total: {filteredTransactions.length} Asientos
                    </td>
                    <td className="py-4 text-slate-700 dark:text-gray-300 font-bold">
                      Ingresos: <span className="text-emerald-400 tabular-nums">+{formatBs(filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0))}</span>
                    </td>
                    <td className="py-4 text-slate-700 dark:text-gray-300 font-bold">
                      Egresos: <span className="text-red-400 tabular-nums">-{formatBs(filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}</span>
                    </td>
                    <td className="py-4 text-right tabular-nums font-black text-sm text-temple-gold">
                      Neto: {formatBs(filteredTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0) - filteredTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}
                    </td>
                    <td className="py-4 text-center text-slate-500 dark:text-gray-500">-</td>
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
