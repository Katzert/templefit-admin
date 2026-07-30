'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Search, Plus, Filter, ArrowUpRight, ArrowDownRight, Trash2, X, Check } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Transaction } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export function Module13FinanceLedger() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'todos' | 'income' | 'expense'>('todos');
  
  // New Tx Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newTx, setNewTx] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    description: '',
    category: 'operations' as Transaction['category']
  });

  useEffect(() => {
    const db = getCRMDatabase();
    setTransactions(db.transactions || []);
  }, []);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'todos' || t.type === typeFilter;
    return matchesSearch && matchesType;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatBs = (n: number) => `Bs. ${n.toLocaleString('es-BO')}`;

  const handleDelete = (id: string) => {
    if(confirm('¿Eliminar esta transacción?')) {
      const db = getCRMDatabase();
      db.transactions = db.transactions.filter(t => t.id !== id);
      saveCRMDatabase(db);
      setTransactions(db.transactions);
    }
  };

  const submitTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(newTx.amount);
    if (isNaN(amount) || amount <= 0 || !newTx.description) {
      alert('Datos inválidos.');
      return;
    }

    const tx: Transaction = {
      id: 'tx-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      type: newTx.type,
      category: newTx.category,
      amount,
      description: newTx.description
    };

    const db = getCRMDatabase();
    db.transactions = [tx, ...(db.transactions || [])];
    saveCRMDatabase(db);
    setTransactions(db.transactions);
    setIsAdding(false);
    setNewTx({ type: 'income', amount: '', description: '', category: 'operations' });
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-temple-navy-dark to-black p-6 rounded-xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <DollarSign size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="text-temple-gold" size={24} />
              Libro Diario (Caja)
            </h2>
            <p className="text-sm text-gray-400 mt-1">Registro de ingresos y egresos operativos.</p>
          </div>
          
          <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 px-6 py-3 bg-temple-gold text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-temple-gold-bright transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] w-max">
            {isAdding ? <X size={18} /> : <Plus size={18} />}
            {isAdding ? 'Cancelar' : 'Nueva Transacción'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-black/60 border-temple-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              <CardContent className="!p-6">
                <form onSubmit={submitTransaction} className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <button type="button" onClick={() => setNewTx(p => ({ ...p, type: 'income' }))} className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${newTx.type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-white/5 text-gray-500'}`}>Ingreso (+)</button>
                    <button type="button" onClick={() => setNewTx(p => ({ ...p, type: 'expense' }))} className={`flex-1 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${newTx.type === 'expense' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-white/5 text-gray-500'}`}>Egreso (-)</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Monto (Bs.)</label>
                      <input required type="number" step="0.1" value={newTx.amount} onChange={e => setNewTx(p => ({ ...p, amount: e.target.value }))} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl focus:border-temple-gold outline-none" placeholder="0.00" />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Descripción</label>
                      <input required type="text" value={newTx.description} onChange={e => setNewTx(p => ({ ...p, description: e.target.value }))} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl focus:border-temple-gold outline-none" placeholder="Ej. Pago mensualidad, compra de agua..." />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Categoría</label>
                    <select value={newTx.category} onChange={e => setNewTx(p => ({ ...p, category: e.target.value as any }))} className="w-full bg-white/5 border border-white/10 text-white p-3 rounded-xl focus:border-temple-gold outline-none">
                      <option value="operations">Operaciones</option>
                      <option value="membership">Membresías</option>
                      <option value="snack">Snack Bar</option>
                      <option value="merchandise">Ropa / Merch</option>
                      <option value="ads">Marketing / Ads</option>
                    </select>
                  </div>

                  <button type="submit" className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-temple-gold text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-temple-gold-bright transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <Check size={18} />
                    Guardar Transacción
                  </button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item}>
        <Card className="bg-black/40 border-white/5">
          <CardContent className="!p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-3 text-gray-500" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar transacción..." 
                  className="w-full pl-10 py-2 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold/50 rounded-xl"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter size={16} className="text-gray-500 mr-2" />
                <select 
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value as any)}
                  className="bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-lg px-3 py-2 focus:outline-none focus:border-temple-gold"
                >
                  <option value="todos">Todos</option>
                  <option value="income">Ingresos (+)</option>
                  <option value="expense">Egresos (-)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500">
                    <th className="p-3 font-bold">Fecha</th>
                    <th className="p-3 font-bold">Concepto</th>
                    <th className="p-3 font-bold">Categoría</th>
                    <th className="p-3 font-bold text-right">Monto</th>
                    <th className="p-3 font-bold text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <motion.tr variants={item} key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                      <td className="p-3">
                        <span className="text-xs font-bold text-gray-300">{tx.date}</span>
                      </td>
                      <td className="p-3">
                        <p className="text-sm text-white">{tx.description}</p>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 px-2 py-1 bg-white/5 rounded">
                          {tx.category}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span className={`text-sm font-black flex items-center justify-end gap-1 ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {tx.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {formatBs(tx.amount)}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button onClick={() => handleDelete(tx.id)} className="p-2 text-gray-500 hover:text-red-400 transition bg-white/5 rounded-lg hover:bg-red-400/10">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center p-8 text-gray-500 text-sm">
                        No se encontraron transacciones registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
