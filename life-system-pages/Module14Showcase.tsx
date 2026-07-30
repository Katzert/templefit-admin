'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Utensils, ShoppingBag, Plus, Save, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { ShowcaseItem } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } };

export function Module14Showcase() {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'recipe' | 'merch'>('all');

  useEffect(() => {
    const db = getCRMDatabase();
    setItems(db.showcaseItems || []);
  }, []);

  const saveToDb = (newItems: ShowcaseItem[]) => {
    const db = getCRMDatabase();
    db.showcaseItems = newItems;
    saveCRMDatabase(db);
    setItems(newItems);
  };

  const addItem = (type: 'recipe' | 'merch') => {
    const newItem: ShowcaseItem = {
      id: `show-${Date.now()}`,
      type,
      title: type === 'recipe' ? 'Nueva Receta' : 'Nuevo Producto',
      description: 'Añade una descripción llamativa...',
      price: type === 'merch' ? 100 : 0,
      imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&h=500&fit=crop',
      status: 'active'
    };
    saveToDb([newItem, ...items]);
  };

  const updateItem = (id: string, field: keyof ShowcaseItem, value: any) => {
    const updated = items.map(t => t.id === id ? { ...t, [field]: value } : t);
    saveToDb(updated);
  };

  const deleteItem = (id: string) => {
    if (!confirm('¿Eliminar este elemento de la vitrina?')) return;
    saveToDb(items.filter(t => t.id !== id));
  };

  const filteredItems = items.filter(i => activeFilter === 'all' || i.type === activeFilter);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-br from-[#0a1128] via-black to-black p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ImageIcon size={180} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <ImageIcon className="text-pink-500" size={32} />
            Vitrina Pública
          </h2>
          <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest">
            Gestor de Imágenes, Recetas y Merchandising para la Web
          </p>
        </div>
        
        {/* Filters */}
        <div className="relative z-10 flex bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Todo
          </button>
          <button 
            onClick={() => setActiveFilter('merch')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === 'merch' ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <ShoppingBag size={14} /> Merch
          </button>
          <button 
            onClick={() => setActiveFilter('recipe')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === 'recipe' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Utensils size={14} /> Recetas
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={() => addItem('merch')} className="flex items-center gap-2 px-4 py-2 bg-temple-gold/20 text-temple-gold rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-temple-gold/30 transition-colors border border-temple-gold/50">
          <Plus size={16} /> Añadir Merch
        </button>
        <button onClick={() => addItem('recipe')} className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-500/30 transition-colors border border-emerald-500/50">
          <Plus size={16} /> Añadir Receta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map(itemData => (
            <motion.div key={itemData.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Card className={`group relative overflow-hidden border-2 transition-all hover:border-white/20 ${itemData.status === 'draft' ? 'border-white/5 opacity-60 hover:opacity-100' : (itemData.type === 'merch' ? 'border-temple-gold/20' : 'border-emerald-500/20')}`}>
                
                {/* Image Preview Area */}
                <div className="h-48 relative overflow-hidden bg-black flex flex-col items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={itemData.imageUrl} alt={itemData.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop'; }} />
                  
                  {/* Overlay URL Input (appears on hover or focus-within) */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <input 
                      value={itemData.imageUrl}
                      onChange={e => updateItem(itemData.id, 'imageUrl', e.target.value)}
                      className="w-full bg-black/80 text-white text-xs font-mono p-2 rounded border border-white/20 focus:outline-none focus:border-white/50 text-center"
                      placeholder="URL de la imagen (Unsplash, Drive, etc.)"
                    />
                  </div>

                  {/* Status Badge */}
                  <button 
                    onClick={() => updateItem(itemData.id, 'status', itemData.status === 'active' ? 'draft' : 'active')}
                    className={`absolute top-3 left-3 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 backdrop-blur-md ${itemData.status === 'active' ? 'bg-emerald-500/80 text-white' : 'bg-black/80 text-gray-400 border border-white/20'}`}
                  >
                    {itemData.status === 'active' ? <Eye size={12}/> : <EyeOff size={12}/>}
                    {itemData.status === 'active' ? 'Público' : 'Oculto'}
                  </button>

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 text-[9px] font-bold uppercase tracking-widest text-white border border-white/10 flex items-center gap-1 backdrop-blur-md">
                    {itemData.type === 'merch' ? <ShoppingBag size={12} className="text-temple-gold"/> : <Utensils size={12} className="text-emerald-500"/>}
                    {itemData.type === 'merch' ? 'Tienda' : 'Receta'}
                  </div>
                </div>

                <CardContent className="p-5 flex flex-col gap-3 bg-gradient-to-b from-white/5 to-transparent">
                  <input 
                    value={itemData.title} 
                    onChange={e => updateItem(itemData.id, 'title', e.target.value)}
                    className="bg-transparent text-white font-black text-xl focus:outline-none w-full border-b border-transparent focus:border-white/20 pb-1"
                    placeholder="Título del elemento"
                  />
                  
                  <textarea
                    value={itemData.description}
                    onChange={e => updateItem(itemData.id, 'description', e.target.value)}
                    className="w-full bg-transparent text-gray-400 text-sm min-h-[60px] focus:outline-none resize-none leading-relaxed"
                    placeholder="Descripción para la página web..."
                  />

                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Bs.</span>
                      <input 
                        type="number"
                        value={itemData.price} 
                        onChange={e => updateItem(itemData.id, 'price', Number(e.target.value))}
                        className="bg-white/5 text-temple-gold font-black text-lg focus:outline-none w-24 px-2 py-1 rounded border border-white/5 focus:border-temple-gold/30"
                      />
                    </div>
                    <button onClick={() => deleteItem(itemData.id)} className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-white/5">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p>No hay elementos en esta categoría.</p>
          </div>
        )}
      </div>

    </motion.div>
  );
}
