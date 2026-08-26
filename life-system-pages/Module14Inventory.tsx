'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  AlertCircle, 
  AlertTriangle,
  CheckCircle2, 
  Plus, 
  Minus,
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
  DollarSign,
  Package,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { InventoryItem, ShowcaseItem } from '../types';

export function Module14Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'snack' | 'apparel' | 'suplementos' | 'equipamiento'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'out_of_stock' | 'low_stock' | 'healthy'>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof InventoryItem, direction: 'asc' | 'desc' } | null>(null);
  
  // Modal de edición
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadDatabase();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadDatabase = () => {
    const db = getCRMDatabase();
    setItems(db.inventory || []);
  };

  const saveToDb = (newItems: InventoryItem[], msg?: string) => {
    const db = getCRMDatabase();
    db.inventory = newItems;
    saveCRMDatabase(db);
    setItems(newItems);
    if (msg) showToast(msg);
  };

  const handleSort = (key: keyof InventoryItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Cálculo matemático estricto del estado de stock
  const getItemStatus = (item: InventoryItem): 'out_of_stock' | 'low_stock' | 'healthy' => {
    const stock = Number(item.stock);
    const minStock = Number(item.minStock);

    if (isNaN(stock) || stock <= 0) return 'out_of_stock';
    // Solo es stock bajo si existe un mínimo definido mayor a 0 y el stock es ESTRICTAMENTE MENOR que el mínimo
    if (!isNaN(minStock) && minStock > 0 && stock < minStock) return 'low_stock';
    return 'healthy';
  };

  const handleQuickStockChange = (id: string, delta: number) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const currentStock = Number(item.stock) || 0;
        const newStock = Math.max(0, currentStock + delta);
        return { ...item, stock: newStock };
      }
      return item;
    });
    saveToDb(updated, delta > 0 ? 'Stock aumentado +1' : 'Stock reducido -1');
  };

  const handleQuickPriceChange = (id: string, newPrice: number) => {
    const validPrice = Math.max(0, Number(newPrice) || 0);
    const updated = items.map(item => {
      if (item.id === id) {
        return { ...item, price: validPrice };
      }
      return item;
    });
    saveToDb(updated, `Precio actualizado a Bs. ${validPrice}`);
  };

  const addItem = () => {
    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      name: 'Nuevo Producto / Insumo',
      category: 'suplementos',
      cost: 10,
      price: 25,
      stock: 10,
      minStock: 5
    };
    saveToDb([newItem, ...items], 'Nuevo artículo añadido al inventario');
    setEditingItem(newItem);
  };

  const duplicateItem = (item: InventoryItem) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}`,
      name: `${item.name} (Copia)`,
      stock: Number(item.stock) || 0
    };
    saveToDb([newItem, ...items], 'Plantilla duplicada con éxito');
    setEditingItem(newItem);
  };

  const deleteItem = (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este artículo del inventario?')) return;
    saveToDb(items.filter(i => i.id !== id), 'Artículo eliminado');
  };

  const saveModalEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const sanitizedItem: InventoryItem = {
      ...editingItem,
      name: String(editingItem.name).trim() || 'Artículo sin nombre',
      category: editingItem.category || 'suplementos',
      stock: Math.max(0, Number(editingItem.stock) || 0),
      minStock: Math.max(0, Number(editingItem.minStock) || 0),
      price: Math.max(0, Number(editingItem.price) || 0),
      cost: Math.max(0, Number(editingItem.cost) || 0),
    };

    const updated = items.map(i => i.id === sanitizedItem.id ? sanitizedItem : i);
    
    // Sincronizar también con Vitrina si tiene el mismo nombre
    const db = getCRMDatabase();
    if (db.showcaseItems) {
      db.showcaseItems = db.showcaseItems.map(sc => {
        if (sc.title.toLowerCase().trim() === sanitizedItem.name.toLowerCase().trim()) {
          return { ...sc, price: sanitizedItem.price };
        }
        return sc;
      });
    }

    saveToDb(updated, '¡Precios y niveles de inventario guardados!');
    setEditingItem(null);
  };

  // Filtrado y ordenamiento
  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const valA = Number(a[key]) || a[key]!;
    const valB = Number(b[key]) || b[key]!;
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredItems = sortedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const status = getItemStatus(item);
    const matchesStatus = statusFilter === 'all' || status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalValue = items.reduce((acc, item) => acc + ((Number(item.price) || 0) * (Number(item.stock) || 0)), 0);
  const outOfStockItems = items.filter(i => getItemStatus(i) === 'out_of_stock');
  const lowStockItems = items.filter(i => getItemStatus(i) === 'low_stock');
  const healthyItems = items.filter(i => getItemStatus(i) === 'healthy');
  const criticalTotal = outOfStockItems.length + lowStockItems.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      
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

      {/* Header Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Valor Total */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider mb-1">Valor en Almacén</p>
            <p className="text-2xl font-black text-white tabular-nums">Bs. {totalValue.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 mt-1">{items.length} artículos totales</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-temple-gold/15 flex items-center justify-center text-temple-gold border border-temple-gold/30">
            <FileSpreadsheet size={22} />
          </div>
        </div>

        {/* Agotados (0) */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'out_of_stock' ? 'all' : 'out_of_stock')}
          className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-center justify-between shadow-xl ${
            outOfStockItems.length > 0
              ? 'bg-temple-red/15 border-temple-red/50 hover:bg-temple-red/20 ring-1 ring-temple-red/30'
              : 'bg-[#0B0F19] border-white/10'
          }`}
        >
          <div>
            <p className="text-[10px] text-temple-red font-black uppercase tracking-wider mb-1 flex items-center gap-1">
              <PackageX size={13} /> Stock Agotado (0)
            </p>
            <p className="text-2xl font-black text-temple-red tabular-nums">{outOfStockItems.length}</p>
            <span className="text-[9px] text-gray-400 font-medium">Click para ver agotados</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-temple-red/25 flex items-center justify-center text-temple-red border border-temple-red/40">
            <PackageX size={22} />
          </div>
        </div>

        {/* Bajo Mínimo */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'low_stock' ? 'all' : 'low_stock')}
          className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-center justify-between shadow-xl ${
            lowStockItems.length > 0
              ? 'bg-amber-500/10 border-amber-500/40 hover:bg-amber-500/15'
              : 'bg-[#0B0F19] border-white/10'
          }`}
        >
          <div>
            <p className="text-[10px] text-amber-400 font-black uppercase tracking-wider mb-1 flex items-center gap-1">
              <AlertTriangle size={13} /> Bajo Nivel Seguro
            </p>
            <p className="text-2xl font-black text-amber-400 tabular-nums">{lowStockItems.length}</p>
            <span className="text-[9px] text-gray-400 font-medium">Click para filtrar</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/40">
            <TrendingDown size={22} />
          </div>
        </div>

        {/* Stock Saludable & Botón Añadir */}
        <div className="bg-[#0B0F19] border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-xl">
          <div>
            <p className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
              <CheckCircle2 size={12} /> Stock Óptimo
            </p>
            <p className="text-2xl font-black text-white tabular-nums">{healthyItems.length}</p>
            <span className="text-[9px] text-gray-500">En rango seguro</span>
          </div>
          <button 
            onClick={addItem}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-temple-gold text-black rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-temple-gold-bright transition-all shadow-lg shadow-temple-gold/20"
          >
            <Plus size={15} /> Añadir
          </button>
        </div>
      </div>

      {/* Banner de Advertencia Inteligente */}
      {criticalTotal > 0 && statusFilter === 'all' && (
        <div className="bg-gradient-to-r from-temple-red/15 via-[#0B0F19] to-amber-500/10 border border-temple-red/30 p-4 md:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-temple-red/20 text-temple-red border border-temple-red/30 flex-shrink-0 mt-0.5">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                Atención: Hay {criticalTotal} producto{criticalTotal > 1 ? 's' : ''} que necesita{criticalTotal > 1 ? 'n' : ''} reabastecimiento
              </h4>
              <p className="text-xs text-gray-300 mt-1 font-light leading-relaxed">
                {outOfStockItems.length > 0 && (
                  <span className="text-temple-red font-bold">🔴 {outOfStockItems.length} totalmente agotado{outOfStockItems.length > 1 ? 's' : ''} (stock = 0). </span>
                )}
                {lowStockItems.length > 0 && (
                  <span className="text-amber-400 font-bold">🟡 {lowStockItems.length} con inventario inferior a su mínimo fijado. </span>
                )}
                Los productos con stock igual o superior a su mínimo están en estado óptimo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
            <button
              onClick={() => setStatusFilter('out_of_stock')}
              className="px-3.5 py-1.5 bg-temple-red hover:bg-opacity-90 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition shadow-md"
            >
              Ver Críticos
            </button>
          </div>
        </div>
      )}

      {/* Active Filter Pill */}
      {statusFilter !== 'all' && (
        <div className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs">
          <span className="text-gray-300 font-bold">
            Filtro Activo: <span className="text-temple-gold uppercase">{statusFilter === 'out_of_stock' ? '🔴 Solo Agotados (0)' : statusFilter === 'low_stock' ? '🟡 Solo Bajo Mínimo' : '🟢 Solo Óptimos'}</span>
          </span>
          <button 
            onClick={() => setStatusFilter('all')}
            className="text-xs text-temple-gold hover:underline font-extrabold uppercase"
          >
            Quitar Filtro (Ver Todos)
          </button>
        </div>
      )}

      {/* Search and Category Filters */}
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

      {/* Advanced Symmetric Excel-Style Data Table */}
      <div className="bg-[#0E1424]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="bg-black/60 border-y border-white/10 text-[10px] uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-4 font-black cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1.5">Ítem / Artículo <ArrowUpDown size={12}/></div>
                </th>
                <th className="py-3.5 px-4 font-black cursor-pointer hover:text-white" onClick={() => handleSort('category')}>
                  <div className="flex items-center gap-1.5">Categoría <ArrowUpDown size={12}/></div>
                </th>
                <th className="py-3.5 px-4 text-right font-black cursor-pointer hover:text-white" onClick={() => handleSort('stock')}>
                  <div className="flex items-center justify-end gap-1.5">Stock Actual <ArrowUpDown size={12}/></div>
                </th>
                <th className="py-3.5 px-4 text-right font-black">Stock Mín.</th>
                <th className="py-3.5 px-4 text-right font-black">Costo Unit.</th>
                <th className="py-3.5 px-4 text-right font-black cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
                  <div className="flex items-center justify-end gap-1.5">Precio Venta <ArrowUpDown size={12}/></div>
                </th>
                <th className="py-3.5 px-4 text-right font-black text-emerald-400">Margen Unit.</th>
                <th className="py-3.5 px-4 text-right font-black text-temple-gold">Valor en Stock</th>
                <th className="py-3.5 px-4 text-center font-black">Estado</th>
                <th className="py-3.5 px-4 text-center font-black">Acciones</th>
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
                      <motion.tr key={item.id} layout className="bg-white/5 border-t border-white/10">
                        <td className="p-3">
                          <input 
                            value={editForm.name} 
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                            className="bg-black/50 text-white px-3 py-1.5 rounded-xl border border-temple-gold/30 w-full focus:outline-none text-xs font-bold"
                          />
                        </td>
                        <td className="p-3">
                          <select 
                            value={editForm.category}
                            onChange={e => setEditForm({...editForm, category: e.target.value as any})}
                            className="bg-black/50 text-white px-2.5 py-1.5 rounded-xl border border-temple-gold/30 focus:outline-none text-xs font-bold"
                          >
                            <option value="suplementos">Botica & Suplementos</option>
                            <option value="apparel">Textil & Ropa</option>
                            <option value="snack">Snack / Bebida</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <input 
                            type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: Number(e.target.value)})}
                            className="bg-black/50 text-white px-2 py-1.5 rounded-xl border border-temple-gold/30 w-20 text-right focus:outline-none font-mono text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="number" value={editForm.minStock} onChange={e => setEditForm({...editForm, minStock: Number(e.target.value)})}
                            className="bg-black/50 text-red-300 px-2 py-1.5 rounded-xl border border-temple-gold/30 w-16 text-right focus:outline-none font-mono text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="number" value={editForm.cost} onChange={e => setEditForm({...editForm, cost: Number(e.target.value)})}
                            className="bg-black/50 text-gray-300 px-2 py-1.5 rounded-xl border border-temple-gold/30 w-20 text-right focus:outline-none font-mono text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input 
                            type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                            className="bg-black/50 text-temple-gold px-2 py-1.5 rounded-xl border border-temple-gold/30 w-20 text-right focus:outline-none font-mono text-xs font-bold"
                          />
                        </td>
                        <td className="p-3 text-right font-mono text-emerald-400 font-bold text-xs">
                          Bs. {((editForm.price || 0) - (editForm.cost || 0)).toFixed(0)}
                        </td>
                        <td className="p-3 text-right font-mono text-temple-gold font-bold text-xs">
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
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-bold text-white group-hover:text-temple-gold transition-colors">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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
                      <td className="py-3.5 px-4 text-right font-mono font-black text-white">
                        {item.stock}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-gray-400">
                        {item.minStock}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-gray-300">
                        Bs. {item.cost || 0}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-temple-gold">
                        Bs. {item.price}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                        +Bs. {unitMargin}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-white">
                        Bs. {totalStockValue.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
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
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEditing(item)} className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors" title="Editar"><Edit3 size={14}/></button>
                          <button onClick={() => deleteItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors" title="Eliminar"><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
            {/* Totales Consolidados (Footer Excel) */}
            <tfoot>
              <tr className="bg-black/80 border-t-2 border-temple-gold/40 font-black text-white text-xs">
                <td className="py-4 px-4 uppercase tracking-wider text-temple-gold font-mono" colSpan={2}>
                  Totales ({filteredItems.length} ítems)
                </td>
                <td className="py-4 px-4 text-right font-mono text-white">
                  {filteredItems.reduce((sum, i) => sum + i.stock, 0)} uds
                </td>
                <td className="py-4 px-4 text-right font-mono text-gray-500">-</td>
                <td className="py-4 px-4 text-right font-mono text-gray-300">
                  Bs. {filteredItems.reduce((sum, i) => sum + ((i.cost || 0) * i.stock), 0).toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right font-mono text-gray-500">-</td>
                <td className="py-4 px-4 text-right font-mono text-emerald-400 font-bold">
                  +Bs. {(filteredItems.reduce((sum, i) => sum + (i.price * i.stock), 0) - filteredItems.reduce((sum, i) => sum + ((i.cost || 0) * i.stock), 0)).toLocaleString()}
                </td>
                <td className="py-4 px-4 text-right font-mono text-temple-gold text-sm font-black">
                  Bs. {filteredItems.reduce((sum, i) => sum + (i.price * i.stock), 0).toLocaleString()}
                </td>
                <td className="py-4 px-4 text-center font-mono text-[10px] text-emerald-400 uppercase font-black">
                  Auditado
                </td>
                <td className="py-4 px-4 text-center text-gray-500">-</td>
              </tr>
            </tfoot>
          </table>
          
          {filteredItems.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Search size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-wider">No se encontraron artículos con los filtros aplicados.</p>
              <button 
                onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStatusFilter('all'); }} 
                className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs uppercase font-bold transition"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL DIALOG */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B0F19] border border-temple-gold/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-temple-gold/20 text-temple-gold flex items-center justify-center border border-temple-gold/40 font-bold">
                    <Package size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-black uppercase text-white">Editar Artículo de Inventario</h3>
                    <p className="text-[10px] text-gray-400">Actualiza precios, costos y umbrales de stock</p>
                  </div>
                </div>
                <button 
                  onClick={() => setEditingItem(null)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={saveModalEdit} className="space-y-4">
                
                {/* Nombre */}
                <div>
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">
                    Nombre del Artículo / Insumo
                  </label>
                  <input 
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-temple-gold font-bold"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">
                    Categoría de Familia
                  </label>
                  <select 
                    value={editingItem.category}
                    onChange={e => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-temple-gold"
                  >
                    <option value="suplementos">🌿 Botica & Suplementos</option>
                    <option value="apparel">👕 Textil & Ropa</option>
                    <option value="snack">🍵 Snack Bar & Nutrición</option>
                    <option value="equipamiento">🏋️ Equipamiento & Gym</option>
                  </select>
                </div>

                {/* Precios (Venta y Costo) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-temple-gold font-extrabold uppercase tracking-wider block mb-1">
                      Precio de Venta (Bs.)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Bs.</span>
                      <input 
                        type="number"
                        step="any"
                        required
                        value={editingItem.price}
                        onChange={e => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-black/60 border border-temple-gold/50 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-temple-gold font-black focus:outline-none focus:border-temple-gold tabular-nums"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">
                      Costo Unitario (Bs.)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Bs.</span>
                      <input 
                        type="number"
                        step="any"
                        value={editingItem.cost}
                        onChange={e => setEditingItem({ ...editingItem, cost: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-temple-gold tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock Actual y Mínimo */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-300 font-extrabold uppercase tracking-wider block mb-1">
                      Stock Físico Actual
                    </label>
                    <input 
                      type="number"
                      min="0"
                      required
                      value={editingItem.stock}
                      onChange={e => setEditingItem({ ...editingItem, stock: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-temple-gold font-mono font-bold tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block mb-1">
                      Stock Mínimo Seguro (Alerta)
                    </label>
                    <input 
                      type="number"
                      min="0"
                      required
                      value={editingItem.minStock}
                      onChange={e => setEditingItem({ ...editingItem, minStock: parseInt(e.target.value, 10) || 0 })}
                      className="w-full bg-black/60 border border-amber-500/50 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 focus:outline-none focus:border-amber-400 font-mono font-bold tabular-nums"
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-[11px] text-gray-300 flex items-center gap-2">
                  <Info size={14} className="text-temple-gold flex-shrink-0" />
                  <span>
                    Si el stock es mayor o igual a <strong>{editingItem.minStock || 0}</strong>, el sistema lo marcará como <strong>Óptimo</strong>.
                  </span>
                </div>

                {/* Botones de Acción */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-temple-gold hover:bg-temple-gold-bright text-black rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg shadow-temple-gold/20 flex items-center gap-1.5"
                  >
                    <Save size={14} />
                    <span>Guardar Cambios</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
