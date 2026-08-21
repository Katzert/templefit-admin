'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertCircle, Plus, FileSpreadsheet, ArrowUpDown, Trash2, Edit3, Save, X, Copy } from 'lucide-react';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { InventoryItem } from '../types';

export function Module14Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'snack' | 'apparel' | 'suplementos' | 'equipamiento'>('all');
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

  const duplicateItem = (item: InventoryItem) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}`,
      name: `${item.name} (Copia)`,
      stock: 0
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
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      
      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-1">Valor Total Inventario</p>
            <p className="text-2xl font-black text-white tabular-nums">Bs. {totalValue.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-temple-gold/15 flex items-center justify-center text-temple-gold border border-temple-gold/30">
            <FileSpreadsheet size={22} />
          </div>
        </div>
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-1">Stock Bajo / Crítico</p>
            <p className="text-2xl font-black text-temple-red tabular-nums">{lowStockCount}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-temple-red/15 flex items-center justify-center text-temple-red border border-temple-red/30">
            <AlertCircle size={22} />
          </div>
        </div>
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wider mb-1">Total Referencias</p>
            <p className="text-2xl font-black text-white tabular-nums">{items.length}</p>
          </div>
          <button 
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2.5 bg-temple-gold text-black rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-temple-gold-bright transition-all shadow-lg shadow-temple-gold/20"
          >
            <Plus size={15} /> Añadir
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0B0F19] p-3.5 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Buscar artículo en almacén..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-temple-gold transition-colors text-white"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          {(['all', 'suplementos', 'apparel', 'snack', 'equipamiento'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${categoryFilter === cat ? 'bg-temple-gold text-black font-black' : 'bg-black/40 text-gray-400 border border-white/5 hover:border-white/20'}`}
            >
              {cat === 'all' ? 'Todos' : cat === 'suplementos' ? 'Botica & Suplementos' : cat === 'apparel' ? 'Textil & Ropa' : cat === 'snack' ? 'Snack Bar' : 'Equipamiento'}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Data Table */}
      <div className="bg-[#0B0F19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/60 text-[10px] uppercase tracking-widest text-gray-400 border-b border-white/10">
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
                            className="bg-black/60 text-white px-3 py-1.5 rounded-xl border border-temple-gold/40 w-full focus:outline-none text-xs"
                          />
                        </td>
                        <td className="p-4">
                          <select 
                            value={editForm.category}
                            onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                            className="bg-black/60 text-white px-3 py-1.5 rounded-xl border border-temple-gold/40 focus:outline-none text-xs"
                          >
                            <option value="suplementos">Botica & Suplementos</option>
                            <option value="apparel">Textil & Ropa</option>
                            <option value="snack">Snack / Bebida</option>
                            <option value="equipamiento">Equipamiento & Gym</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <input 
                              type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: Number(e.target.value)})}
                              className="bg-black/60 text-white px-2.5 py-1.5 rounded-xl border border-temple-gold/40 w-16 text-right focus:outline-none text-xs tabular-nums"
                            />
                            <span className="text-gray-500 text-xs">/</span>
                            <input 
                              type="number" value={editForm.minStock} onChange={e => setEditForm({...editForm, minStock: Number(e.target.value)})}
                              className="bg-black/60 text-red-300 px-2 py-1.5 rounded-xl border border-temple-gold/40 w-16 text-right focus:outline-none text-xs tabular-nums" title="Stock Mínimo"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <input 
                            type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                            className="bg-black/60 text-temple-gold px-3 py-1.5 rounded-xl border border-temple-gold/40 w-24 text-right focus:outline-none font-bold text-xs tabular-nums"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={saveEdit} className="p-2 bg-temple-olive text-white rounded-xl hover:bg-opacity-80 font-bold transition"><Save size={15}/></button>
                            <button onClick={() => setEditingId(null)} className="p-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition"><X size={15}/></button>
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
                      className="border-t border-white/5 hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="p-4">
                        <div className="font-bold text-white group-hover:text-temple-gold transition-colors flex items-center gap-2 text-xs">
                          {item.name}
                          {isLowStock && (
                            <span className="flex items-center gap-1 text-[9px] uppercase font-black text-temple-red bg-temple-red/10 px-2 py-0.5 rounded-full border border-temple-red/20">
                              <AlertCircle size={10} /> Crítico
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          item.category === 'snack' 
                            ? 'bg-temple-terracota/20 text-temple-terracota border border-temple-terracota/30' 
                            : item.category === 'suplementos'
                            ? 'bg-temple-olive/20 text-temple-olive border border-temple-olive/30'
                            : item.category === 'equipamiento'
                            ? 'bg-temple-anthracite text-gray-300 border border-white/15'
                            : 'bg-[#002147] text-white border border-white/10'
                        }`}>
                          {item.category === 'suplementos' ? 'Botica' : item.category === 'apparel' ? 'Textil' : item.category === 'snack' ? 'Snack Bar' : 'Equipo'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-mono font-bold text-white text-xs tabular-nums">{item.stock}</div>
                        <div className="text-[10px] text-gray-500">Mín: {item.minStock}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-extrabold text-temple-gold text-xs tabular-nums">Bs. {item.price}</div>
                        <div className="text-[10px] text-gray-500">Costo: Bs. {item.cost}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button onClick={() => startEditing(item)} className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors" title="Editar"><Edit3 size={14}/></button>
                          <button onClick={() => duplicateItem(item)} className="p-2 text-temple-gold hover:text-temple-gold-bright bg-white/5 hover:bg-temple-gold/15 rounded-xl transition-colors" title="Duplicar como plantilla"><Copy size={14}/></button>
                          <button onClick={() => deleteItem(item.id)} className="p-2 text-gray-400 hover:text-temple-red bg-white/5 hover:bg-temple-red/10 rounded-xl transition-colors" title="Eliminar"><Trash2 size={14}/></button>
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
              <Search size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-wider">No se encontraron artículos en el inventario.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
