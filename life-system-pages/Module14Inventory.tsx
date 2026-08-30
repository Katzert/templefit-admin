'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, AlertCircle, Plus, FileSpreadsheet, ArrowUpDown, Trash2, Edit3, Save, X } from 'lucide-react';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { InventoryItem } from '../types';

export function Module14Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'snack' | 'apparel' | 'suplementos'>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof InventoryItem, direction: 'asc' | 'desc' } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<InventoryItem>>({});

  useEffect(() => {
    const db = getCRMDatabase();
    setItems(db.inventory || []);
  }, []);

  const saveToDb = (newItems: InventoryItem[]) => {
    const db = getCRMDatabase();
    db.inventory = newItems;
    saveCRMDatabase(db);
    setItems(newItems);
  };

  const handleSort = (key: keyof InventoryItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const addItem = () => {
    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      name: 'Nuevo Artículo',
      category: 'suplementos',
      cost: 0,
      price: 0,
      stock: 0,
      minStock: 10
    };
    saveToDb([newItem, ...items]);
    startEditing(newItem);
  };

  const deleteItem = (id: string) => {
    if (!confirm('¿Eliminar este artículo del inventario?')) return;
    saveToDb(items.filter(i => i.id !== id));
  };

  const startEditing = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const saveEdit = () => {
    if (!editingId) return;
    const updated = items.map(i => i.id === editingId ? { ...i, ...editForm } as InventoryItem : i);
    saveToDb(updated);
    setEditingId(null);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key]! < b[key]!) return direction === 'asc' ? -1 : 1;
    if (a[key]! > b[key]!) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredItems = sortedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalValue = items.reduce((acc, item) => acc + (item.price * item.stock), 0);
  const lowStockCount = items.filter(i => i.stock <= i.minStock).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Valor Total Inventario</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">Bs. {totalValue.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-temple-gold/20 flex items-center justify-center text-temple-gold">
            <FileSpreadsheet size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Stock Bajo / Crítico</p>
            <p className={`text-2xl font-black ${lowStockCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{lowStockCount} artículos</p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${lowStockCount > 0 ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
            <AlertCircle size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 rounded-2xl flex items-center justify-between md:col-start-3">
          <button 
            onClick={addItem}
            className="w-full h-full flex items-center justify-center gap-2 bg-temple-gold text-black rounded-xl font-bold uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg"
          >
            <Plus size={20} /> Añadir Ítem
          </button>
        </div>
      </div>

      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-black/10 dark:border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold transition-colors text-white"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          {(['all', 'suplementos', 'apparel', 'snack'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${categoryFilter === cat ? 'bg-temple-gold text-black font-black' : 'bg-slate-100 dark:bg-black/50 text-slate-600 dark:text-gray-400 border border-black/10 dark:border-white/10 hover:border-white/30'}`}
            >
              {cat === 'all' ? 'Todos' : cat === 'suplementos' ? 'Botica & Suplementos' : cat === 'apparel' ? 'Textil & Ropa' : 'Snacks & Bebidas'}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Symmetric Excel-Style Data Table */}
      <div className="bg-white dark:bg-[#0B0F19]/80 backdrop-blur-lg border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-gray-400 font-black">
                <th className="pb-3 pr-4 font-black cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1.5">Ítem / Artículo <ArrowUpDown size={12}/></div>
                </th>
                <th className="pb-3 pr-4 font-black cursor-pointer hover:text-white" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-1.5">Categoría <ArrowUpDown size={12}/></div>
                </th>
                <th className="pb-3 pr-4 text-right font-black cursor-pointer hover:text-white" onClick={() => handleSort('stock')}>
                  <div className="flex items-center justify-end gap-1.5">Stock Actual <ArrowUpDown size={12}/></div>
                </th>
                <th className="pb-3 pr-4 text-right font-black">Stock Mín.</th>
                <th className="pb-3 pr-4 text-right font-black">Costo Unit.</th>
                <th className="pb-3 pr-4 text-right font-black cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end gap-1.5">Precio Venta <ArrowUpDown size={12}/></div>
                </th>
                <th className="pb-3 pr-4 text-right font-black text-emerald-400">Margen Unit.</th>
                <th className="pb-3 pr-4 text-right font-black text-temple-gold">Valor en Stock</th>
                <th className="pb-3 pr-4 text-center font-black">Estado</th>
                <th className="pb-3 pr-4 text-center font-black">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredItems.map(item => {
                  const isEditing = editingId === item.id;
                  const isLowStock = item.stock <= item.minStock;
                  const unitMargin = (item.price || 0) - (item.cost || 0);
                  const totalStockValue = (item.price || 0) * (item.stock || 0);

                  if (isEditing) {
                    return (
                      <motion.tr key={item.id} layout className="bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10">
                        <td className="p-3">
                          <input 
                            value={editForm.name} 
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                            className="bg-slate-100 dark:bg-black/50 text-white px-3 py-1.5 rounded-xl border border-temple-gold/30 w-full focus:outline-none text-xs font-bold"
                          />
                        </td>
                        <td className="p-3">
                          <select 
                            value={editForm.category}
                            onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                            className="bg-slate-100 dark:bg-black/50 text-white px-2.5 py-1.5 rounded-xl border border-temple-gold/30 focus:outline-none text-xs font-bold"
                          >
                            <option value="suplementos">Botica & Suplementos</option>
                            <option value="apparel">Textil & Ropa</option>
                            <option value="snack">Snack / Bebida</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <input 
                            type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: Number(e.target.value)})}
                            className="bg-slate-100 dark:bg-black/50 text-white px-2 py-1.5 rounded-xl border border-temple-gold/30 w-20 text-right focus:outline-none tabular-nums text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="number" value={editForm.minStock} onChange={e => setEditForm({...editForm, minStock: Number(e.target.value)})}
                            className="bg-slate-100 dark:bg-black/50 text-red-300 px-2 py-1.5 rounded-xl border border-temple-gold/30 w-16 text-right focus:outline-none tabular-nums text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="number" value={editForm.cost} onChange={e => setEditForm({...editForm, cost: Number(e.target.value)})}
                            className="bg-slate-100 dark:bg-black/50 text-slate-700 dark:text-gray-300 px-2 py-1.5 rounded-xl border border-temple-gold/30 w-20 text-right focus:outline-none tabular-nums text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                            className="bg-slate-100 dark:bg-black/50 text-temple-gold px-2 py-1.5 rounded-xl border border-temple-gold/30 w-20 text-right focus:outline-none tabular-nums text-xs font-bold"
                          />
                        </td>
                        <td className="p-3 text-right tabular-nums text-emerald-400 font-bold text-xs">
                          Bs. {((editForm.price || 0) - (editForm.cost || 0)).toFixed(0)}
                        </td>
                        <td className="p-3 text-right tabular-nums text-temple-gold font-bold text-xs">
                          Bs. {((editForm.price || 0) * (editForm.stock || 0)).toLocaleString()}
                        </td>
                        <td className="p-3 text-center">
                          <span className="text-[10px] text-amber-400 uppercase font-black">Editando</span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button onClick={saveEdit} className="p-1.5 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 font-bold transition shadow-sm"><Save size={14}/></button>
                            <button onClick={() => setEditingId(null)} className="p-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"><X size={14}/></button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  }

                  return (
                    <motion.tr 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-black/5 dark:bg-white/5 transition-colors group"
                    >
                      <td className="py-4 pl-4 font-bold text-white group-hover:text-temple-gold transition-colors">
                        {item.name}
                      </td>
                      <td className="py-4 pl-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.category === 'snack' 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                            : item.category === 'suplementos'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 pl-4 text-right tabular-nums font-black text-white">
                        {item.stock}
                      </td>
                      <td className="py-4 pl-4 text-right tabular-nums text-slate-600 dark:text-gray-400">
                        {item.minStock}
                      </td>
                      <td className="py-4 pl-4 text-right tabular-nums text-slate-700 dark:text-gray-300">
                        Bs. {item.cost || 0}
                      </td>
                      <td className="py-4 pl-4 text-right tabular-nums font-bold text-temple-gold">
                        Bs. {item.price}
                      </td>
                      <td className="py-4 pl-4 text-right tabular-nums font-bold text-emerald-400">
                        +Bs. {unitMargin}
                      </td>
                      <td className="py-4 pl-4 text-right tabular-nums font-black text-white">
                        Bs. {totalStockValue.toLocaleString()}
                      </td>
                      <td className="py-4 pl-4 text-center whitespace-nowrap">
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase font-black text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">
                            <AlertCircle size={10} /> Crítico
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            Óptimo
                          </span>
                        )}
                      </td>
                      <td className="py-4 pl-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEditing(item)} className="p-1.5 text-slate-600 dark:text-gray-400 hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 rounded-lg transition-colors" title="Editar"><Edit3 size={14}/></button>
                          <button onClick={() => deleteItem(item.id)} className="p-1.5 text-slate-600 dark:text-gray-400 hover:text-red-400 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors" title="Eliminar"><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
            {/* Totales Consolidados (Footer Excel) */}
            <tfoot>
              <tr className="border-t border-black/10 dark:border-white/10 font-black text-white text-xs">
                <td className="py-4 pl-4 uppercase tracking-wider text-temple-gold tabular-nums" colSpan={2}>
                  Totales ({filteredItems.length} ítems)
                </td>
                <td className="py-4 pl-4 text-right tabular-nums text-white">
                  {filteredItems.reduce((sum, i) => sum + i.stock, 0)} uds
                </td>
                <td className="py-4 pl-4 text-right tabular-nums text-slate-500 dark:text-gray-500">-</td>
                <td className="py-4 pl-4 text-right tabular-nums text-slate-700 dark:text-gray-300">
                  Bs. {filteredItems.reduce((sum, i) => sum + ((i.cost || 0) * i.stock), 0).toLocaleString()}
                </td>
                <td className="py-4 pl-4 text-right tabular-nums text-slate-500 dark:text-gray-500">-</td>
                <td className="py-4 pl-4 text-right tabular-nums text-emerald-400 font-bold">
                  +Bs. {(filteredItems.reduce((sum, i) => sum + (i.price * i.stock), 0) - filteredItems.reduce((sum, i) => sum + ((i.cost || 0) * i.stock), 0)).toLocaleString()}
                </td>
                <td className="py-4 pl-4 text-right tabular-nums text-temple-gold text-sm font-black">
                  Bs. {filteredItems.reduce((sum, i) => sum + (i.price * i.stock), 0).toLocaleString()}
                </td>
                <td className="py-4 pl-4 text-center tabular-nums text-[10px] text-emerald-400 uppercase font-black">
                  Auditado
                </td>
                <td className="py-4 pl-4 text-center text-slate-500 dark:text-gray-500">-</td>
              </tr>
            </tfoot>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="p-12 text-center text-slate-500 dark:text-gray-500">
              <Search size={32} className="mx-auto mb-4 opacity-20" />
              <p>No se encontraron artículos en el inventario.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
