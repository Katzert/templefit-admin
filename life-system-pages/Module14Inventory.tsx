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
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Valor Total Inventario</p>
            <p className="text-2xl font-black text-white">Bs. {totalValue.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-temple-gold/20 flex items-center justify-center text-temple-gold">
            <FileSpreadsheet size={24} />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Stock Bajo / Crítico</p>
            <p className={`text-2xl font-black ${lowStockCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{lowStockCount} artículos</p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${lowStockCount > 0 ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
            <AlertCircle size={24} />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between md:col-start-3">
          <button 
            onClick={addItem}
            className="w-full h-full flex items-center justify-center gap-2 bg-temple-gold text-black rounded-xl font-bold uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg"
          >
            <Plus size={20} /> Añadir Ítem
          </button>
        </div>
      </div>

      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold transition-colors text-white"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          {(['all', 'suplementos', 'apparel', 'snack'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${categoryFilter === cat ? 'bg-temple-gold text-black font-black' : 'bg-black/50 text-gray-400 border border-white/10 hover:border-white/30'}`}
            >
              {cat === 'all' ? 'Todos' : cat === 'suplementos' ? 'Botica & Suplementos' : cat === 'apparel' ? 'Textil & Ropa' : 'Snacks & Bebidas'}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Data Table */}
      <div className="bg-[#121826] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 text-[10px] uppercase tracking-widest text-gray-400">
                <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Artículo <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-4 cursor-pointer hover:text-white" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-1">Categoría <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-4 text-right cursor-pointer hover:text-white" onClick={() => handleSort('stock')}>
                  <div className="flex items-center justify-end gap-1">Stock <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-4 text-right cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end gap-1">Precio <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredItems.map(item => {
                  const isEditing = editingId === item.id;
                  const isLowStock = item.stock <= item.minStock;

                  if (isEditing) {
                    return (
                      <motion.tr key={item.id} layout className="border-t border-white/5 bg-white/5">
                        <td className="p-4">
                          <input 
                            value={editForm.name} 
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                            className="bg-black/50 text-white px-3 py-1.5 rounded border border-temple-gold/30 w-full focus:outline-none"
                          />
                        </td>
                        <td className="p-4">
                          <select 
                            value={editForm.category}
                            onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                            className="bg-black/50 text-white px-3 py-1.5 rounded-xl border border-temple-gold/30 focus:outline-none text-xs"
                          >
                            <option value="suplementos">Botica & Suplementos</option>
                            <option value="apparel">Textil & Ropa</option>
                            <option value="snack">Snack / Bebida</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <input 
                              type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: Number(e.target.value)})}
                              className="bg-black/50 text-white px-3 py-1.5 rounded border border-temple-gold/30 w-16 text-right focus:outline-none"
                            />
                            <span className="text-gray-500 text-xs">/</span>
                            <input 
                              type="number" value={editForm.minStock} onChange={e => setEditForm({...editForm, minStock: Number(e.target.value)})}
                              className="bg-black/50 text-red-300 px-2 py-1.5 rounded border border-temple-gold/30 w-16 text-right focus:outline-none" title="Stock Mínimo"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <input 
                            type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                            className="bg-black/50 text-temple-gold px-3 py-1.5 rounded border border-temple-gold/30 w-24 text-right focus:outline-none font-bold"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={saveEdit} className="p-1.5 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 font-bold transition"><Save size={16}/></button>
                            <button onClick={() => setEditingId(null)} className="p-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"><X size={16}/></button>
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
                      className="border-t border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="font-bold text-white group-hover:text-temple-gold transition-colors flex items-center gap-2">
                          {item.name}
                          {isLowStock && (
                            <span className="flex items-center gap-1 text-[9px] uppercase font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                              <AlertCircle size={10} /> Crítico
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.category === 'snack' 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                            : item.category === 'suplementos'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-mono font-bold text-white">{item.stock}</div>
                        <div className="text-[10px] text-gray-500">Min: {item.minStock}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-bold text-temple-gold">Bs. {item.price}</div>
                        <div className="text-[10px] text-gray-500">Costo: Bs. {item.cost}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEditing(item)} className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Edit3 size={16}/></button>
                          <button onClick={() => deleteItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Search size={32} className="mx-auto mb-4 opacity-20" />
              <p>No se encontraron artículos en el inventario.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
