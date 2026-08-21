'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  AlertCircle, 
  AlertTriangle,
  CheckCircle2, 
  Plus, 
  FileSpreadsheet, 
  ArrowUpDown, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Copy,
  PackageX,
  TrendingDown,
  Info,
  ShoppingCart
} from 'lucide-react';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { InventoryItem } from '../types';

export function Module14Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'snack' | 'apparel' | 'suplementos' | 'equipamiento'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'out_of_stock' | 'low_stock' | 'healthy'>('all');
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

  const getItemStatus = (item: InventoryItem): 'out_of_stock' | 'low_stock' | 'healthy' => {
    if (item.stock === 0) return 'out_of_stock';
    if (item.stock <= item.minStock) return 'low_stock';
    return 'healthy';
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
    const status = getItemStatus(item);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalValue = items.reduce((acc, item) => acc + (item.price * item.stock), 0);
  const outOfStockItems = items.filter(i => i.stock === 0);
  const lowStockItems = items.filter(i => i.stock > 0 && i.stock <= i.minStock);
  const criticalTotal = outOfStockItems.length + lowStockItems.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      
      {/* Header Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">Valor en Almacén</p>
            <p className="text-2xl font-black text-white tabular-nums">Bs. {totalValue.toLocaleString()}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-temple-gold/15 flex items-center justify-center text-temple-gold border border-temple-gold/30">
            <FileSpreadsheet size={20} />
          </div>
        </div>

        {/* Out of Stock Card */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'out_of_stock' ? 'all' : 'out_of_stock')}
          className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-center justify-between shadow-xl ${
            outOfStockItems.length > 0
              ? 'bg-temple-red/10 border-temple-red/40 hover:bg-temple-red/15'
              : 'bg-[#0B0F19] border-white/10'
          }`}
        >
          <div>
            <p className="text-[10px] text-temple-red font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <PackageX size={12} /> Stock Agotado (0)
            </p>
            <p className="text-2xl font-black text-temple-red tabular-nums">{outOfStockItems.length}</p>
            <span className="text-[9px] text-gray-400">Click para filtrar</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-temple-red/20 flex items-center justify-center text-temple-red border border-temple-red/40">
            <PackageX size={20} />
          </div>
        </div>

        {/* Low Stock Card */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'low_stock' ? 'all' : 'low_stock')}
          className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-center justify-between shadow-xl ${
            lowStockItems.length > 0
              ? 'bg-amber-500/10 border-amber-500/40 hover:bg-amber-500/15'
              : 'bg-[#0B0F19] border-white/10'
          }`}
        >
          <div>
            <p className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <AlertTriangle size={12} /> Por Debajo del Mínimo
            </p>
            <p className="text-2xl font-black text-amber-400 tabular-nums">{lowStockItems.length}</p>
            <span className="text-[9px] text-gray-400">Click para filtrar</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/40">
            <TrendingDown size={20} />
          </div>
        </div>

        {/* Total & Add Button */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">Catálogo Total</p>
            <p className="text-2xl font-black text-white tabular-nums">{items.length}</p>
          </div>
          <button 
            onClick={addItem}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-temple-gold text-black rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-temple-gold-bright transition-all shadow-lg shadow-temple-gold/20"
          >
            <Plus size={15} /> Añadir
          </button>
        </div>
      </div>

      {/* Critical Stock Alert Banner */}
      {criticalTotal > 0 && (
        <div className="bg-gradient-to-r from-temple-red/15 via-[#0B0F19] to-amber-500/10 border border-temple-red/30 p-4 md:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-temple-red/20 text-temple-red border border-temple-red/30 flex-shrink-0 mt-0.5">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                Atención: Hay {criticalTotal} artículo{criticalTotal > 1 ? 's' : ''} que requiere{criticalTotal > 1 ? 'n' : ''} reabastecimiento
              </h4>
              <p className="text-xs text-gray-300 mt-1 font-light leading-relaxed">
                {outOfStockItems.length > 0 && (
                  <span className="text-temple-red font-bold">🔴 {outOfStockItems.length} totalmente agotado{outOfStockItems.length > 1 ? 's' : ''} (bloquean ventas). </span>
                )}
                {lowStockItems.length > 0 && (
                  <span className="text-amber-400 font-bold">🟡 {lowStockItems.length} por debajo del stock de seguridad. </span>
                )}
                Recuerda que los insumos perecederos y pedidos del camp se coordinan antes del viernes con 50% de seña.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            {statusFilter !== 'all' ? (
              <button
                onClick={() => setStatusFilter('all')}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
              >
                Ver Todo el Inventario
              </button>
            ) : (
              <button
                onClick={() => setStatusFilter('out_of_stock')}
                className="px-3.5 py-1.5 bg-temple-red hover:bg-opacity-90 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition shadow-md"
              >
                Filtrar Críticos
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0B0F19] p-3.5 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Buscar por nombre de producto o insumo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-temple-gold transition-colors text-white"
          />
        </div>
        
        {/* Category Filters */}
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
                <th className="p-4 text-center">Estado & Advertencia</th>
                <th className="p-4 text-right cursor-pointer hover:text-white" onClick={() => handleSort('stock')}>
                  <div className="flex items-center justify-end gap-1">Stock / Mínimo <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-4 text-right cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end gap-1">Precio Venta <ArrowUpDown size={12}/></div>
                </th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredItems.map(item => {
                  const isEditing = editingId === item.id;
                  const status = getItemStatus(item);
                  const deficit = Math.max(0, item.minStock - item.stock);

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
                        <td className="p-4 text-center">
                          <span className="text-[10px] text-gray-400 italic">Editando...</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <div>
                              <span className="text-[8px] text-gray-500 uppercase block font-bold">Stock Actual</span>
                              <input 
                                type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: Number(e.target.value)})}
                                className="bg-black/60 text-white px-2.5 py-1.5 rounded-xl border border-temple-gold/40 w-16 text-right focus:outline-none text-xs tabular-nums"
                              />
                            </div>
                            <span className="text-gray-500 text-xs mt-3">/</span>
                            <div>
                              <span className="text-[8px] text-gray-500 uppercase block font-bold">Mínimo</span>
                              <input 
                                type="number" value={editForm.minStock} onChange={e => setEditForm({...editForm, minStock: Number(e.target.value)})}
                                className="bg-black/60 text-amber-300 px-2 py-1.5 rounded-xl border border-temple-gold/40 w-16 text-right focus:outline-none text-xs tabular-nums" title="Stock Mínimo"
                              />
                            </div>
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
                            <button onClick={saveEdit} className="p-2 bg-temple-olive text-white rounded-xl hover:bg-opacity-80 font-bold transition shadow-sm"><Save size={15}/></button>
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
                      className={`border-t border-white/5 transition-colors group ${
                        status === 'out_of_stock' 
                          ? 'bg-temple-red/[0.04] hover:bg-temple-red/[0.08]' 
                          : status === 'low_stock' 
                          ? 'bg-amber-500/[0.02] hover:bg-amber-500/[0.06]' 
                          : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Name */}
                      <td className="p-4">
                        <div className="font-bold text-white group-hover:text-temple-gold transition-colors text-xs">
                          {item.name}
                        </div>
                      </td>

                      {/* Category */}
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

                      {/* Status / Clear Warning Badge */}
                      <td className="p-4 text-center">
                        {status === 'out_of_stock' ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-temple-red/20 text-temple-red border border-temple-red/40 text-[10px] font-black uppercase tracking-wider shadow-sm animate-pulse">
                            <PackageX size={12} />
                            <span>AGOTADO (Pedir {deficit || item.minStock} un.)</span>
                          </div>
                        ) : status === 'low_stock' ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                            <AlertTriangle size={12} />
                            <span>BAJO (Faltan {deficit} un.)</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-temple-olive/15 text-temple-olive border border-temple-olive/30 text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle2 size={11} />
                            <span>Stock Óptimo</span>
                          </div>
                        )}
                      </td>

                      {/* Stock Counts */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className={`font-mono font-black text-xs tabular-nums ${
                            status === 'out_of_stock' 
                              ? 'text-temple-red text-sm font-black' 
                              : status === 'low_stock' 
                              ? 'text-amber-400 font-bold' 
                              : 'text-white'
                          }`}>
                            {item.stock}
                          </span>
                          <span className="text-gray-500 text-[10px]">/ mín {item.minStock}</span>
                        </div>
                      </td>

                      {/* Price & Cost */}
                      <td className="p-4 text-right">
                        <div className="font-extrabold text-temple-gold text-xs tabular-nums">Bs. {item.price}</div>
                        <div className="text-[9px] text-gray-500">Costo: Bs. {item.cost}</div>
                      </td>

                      {/* Actions */}
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
              <p className="text-xs font-bold uppercase tracking-wider">No se encontraron artículos con los filtros aplicados.</p>
              <button onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStatusFilter('all'); }} className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs uppercase font-bold transition">Limpiar Filtros</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
