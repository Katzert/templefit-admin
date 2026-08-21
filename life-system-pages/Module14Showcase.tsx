'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Utensils, ShoppingBag, Plus, Trash2, Eye, EyeOff, Upload, Copy, Search, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase, resetToDefaultDB } from '../store';
import { ShowcaseItem } from '../types';

export function Module14Showcase() {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const resetCatalog = () => {
    if (confirm('¿Restablecer el catálogo con los 22 productos y recetas oficiales de fábrica?')) {
      const freshDb = resetToDefaultDB();
      setItems(freshDb.showcaseItems || []);
    }
  };

  const addItem = (type: 'recipe' | 'merch') => {
    const newItem: ShowcaseItem = {
      id: `show-${Date.now()}`,
      type,
      title: type === 'recipe' ? 'Nueva Receta Pública' : 'Nuevo Producto / Membresía',
      description: 'Añade una descripción llamativa para la web...',
      price: type === 'merch' ? 100 : 15,
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=500&fit=crop',
      status: 'active'
    };
    saveToDb([newItem, ...items]);
  };

  const duplicateItem = (item: ShowcaseItem) => {
    const duplicated: ShowcaseItem = {
      ...item,
      id: `show-${Date.now()}`,
      title: `${item.title} (Nueva Plantilla)`
    };
    saveToDb([duplicated, ...items]);
  };

  const updateItem = (id: string, field: keyof ShowcaseItem, value: any) => {
    const updated = items.map(t => t.id === id ? { ...t, [field]: value } : t);
    saveToDb(updated);
  };

  const deleteItem = (id: string) => {
    if (!confirm('¿Eliminar este elemento de la vitrina?')) return;
    saveToDb(items.filter(t => t.id !== id));
  };

  const handleFileUpload = (id: string, file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 500;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.7);
          updateItem(id, 'imageUrl', compressed);
        } else {
          updateItem(id, 'imageUrl', event.target?.result as string);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const filteredItems = items.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#0B0F19] p-7 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ImageIcon size={180} />
        </div>
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-temple-gold/10 text-temple-gold border border-temple-gold/30 text-[10px] font-extrabold uppercase tracking-[0.2em]">
              Armería Oficial & Vitrina Pública
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-tight">
            Catálogo & Plantillas de Tienda
          </h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl font-light leading-relaxed">
            Edita fotos, precios e inventario para la web pública. Usa cualquier producto como plantilla para nuevos lanzamientos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={resetCatalog}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 border border-white/10"
            title="Recargar catálogo inicial"
          >
            <RefreshCw size={14} /> Restaurar Catálogo
          </button>
          <button
            onClick={() => addItem('merch')}
            className="px-4 py-2.5 rounded-xl bg-temple-gold text-black font-extrabold text-xs uppercase tracking-wider hover:bg-temple-gold-bright transition flex items-center gap-1.5 shadow-lg shadow-temple-gold/15"
          >
            <Plus size={15} /> + Producto
          </button>
          <button
            onClick={() => addItem('recipe')}
            className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition flex items-center gap-1.5 border border-white/10"
          >
            <Plus size={15} /> + Receta
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0B0F19] p-3.5 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Buscar producto o receta en vitrina..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-temple-gold transition-colors text-white" 
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${activeFilter === 'all' ? 'bg-temple-gold text-black font-black' : 'bg-black/40 text-gray-400 border border-white/5'}`}
          >
            Todo ({items.length})
          </button>
          <button
            onClick={() => setActiveFilter('merch')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${activeFilter === 'merch' ? 'bg-temple-gold text-black font-black' : 'bg-black/40 text-gray-400 border border-white/5'}`}
          >
            Productos ({items.filter(i => i.type === 'merch').length})
          </button>
          <button
            onClick={() => setActiveFilter('recipe')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${activeFilter === 'recipe' ? 'bg-temple-gold text-black font-black' : 'bg-black/40 text-gray-400 border border-white/5'}`}
          >
            Recetas ({items.filter(i => i.type === 'recipe').length})
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map(itemData => (
            <div key={itemData.id} className="group">
              <Card className="bg-[#0B0F19] border-white/10 hover:border-temple-gold/40 transition-all rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                
                {/* Media Header with 16:10 Ratio */}
                <div className="aspect-[16/10] relative overflow-hidden bg-black flex flex-col items-center justify-center">
                  <img 
                    src={itemData.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop'} 
                    alt={itemData.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop'; }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-black/40 pointer-events-none" />

                  {/* Status Badge */}
                  <button 
                    type="button"
                    onClick={() => updateItem(itemData.id, 'status', itemData.status === 'active' ? 'draft' : 'active')}
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 backdrop-blur-md z-10 ${itemData.status === 'active' ? 'bg-temple-olive text-white' : 'bg-black/80 text-gray-400 border border-white/20'}`}
                  >
                    {itemData.status === 'active' ? <Eye size={12}/> : <EyeOff size={12}/>}
                    {itemData.status === 'active' ? 'Público' : 'Borrador'}
                  </button>

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 text-[9px] font-black uppercase tracking-widest text-temple-gold border border-white/10 flex items-center gap-1 backdrop-blur-md z-10">
                    {itemData.type === 'merch' ? <ShoppingBag size={12} className="text-temple-gold"/> : <Utensils size={12} className="text-temple-olive"/>}
                    {itemData.type === 'merch' ? 'Tienda' : 'Receta'}
                  </div>
                </div>

                {/* Direct Visible Photo Controls */}
                <div className="p-2.5 bg-black/40 border-y border-white/5 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label 
                      htmlFor={`file-input-${itemData.id}`}
                      className="cursor-pointer px-3 py-1.5 bg-temple-gold/15 hover:bg-temple-gold text-temple-gold hover:text-black rounded-lg text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition border border-temple-gold/30"
                    >
                      <Upload size={12} /> Subir Foto
                    </label>
                    <input 
                      id={`file-input-${itemData.id}`}
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(itemData.id, e.target.files[0]);
                        }
                      }} 
                      className="hidden"
                    />
                    <input 
                      type="text"
                      value={itemData.imageUrl || ''}
                      onChange={(e) => updateItem(itemData.id, 'imageUrl', e.target.value)}
                      placeholder="o pega URL de la foto..."
                      className="flex-1 bg-black/60 text-white text-[10px] px-2.5 py-1.5 rounded-lg border border-white/10 focus:outline-none focus:border-temple-gold font-mono"
                    />
                  </div>
                </div>

                <CardContent className="!p-5 flex flex-col gap-3 bg-[#0E1424]">
                  <div>
                    <label className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest block mb-1">Título del Producto / Receta</label>
                    <input 
                      value={itemData.title} 
                      onChange={e => updateItem(itemData.id, 'title', e.target.value)}
                      className="bg-black/40 text-white font-bold text-sm focus:outline-none w-full border border-white/10 rounded-xl px-3 py-2 focus:border-temple-gold"
                      placeholder="Título del elemento..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest block mb-1">Descripción</label>
                    <textarea
                      value={itemData.description}
                      onChange={e => updateItem(itemData.id, 'description', e.target.value)}
                      className="w-full bg-black/40 text-gray-300 text-xs min-h-[55px] focus:outline-none rounded-xl p-2.5 border border-white/10 focus:border-temple-gold resize-none leading-relaxed"
                      placeholder="Descripción para la tienda pública..."
                    />
                  </div>

                  <div className="flex items-center justify-between mt-1 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Bs.</span>
                      <input 
                        type="number"
                        value={itemData.price} 
                        onChange={e => updateItem(itemData.id, 'price', Number(e.target.value))}
                        className="bg-white/5 text-temple-gold font-black text-sm focus:outline-none w-24 px-2.5 py-1.5 rounded-xl border border-white/10 focus:border-temple-gold/40 tabular-nums"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        type="button"
                        onClick={() => duplicateItem(itemData)} 
                        className="text-temple-gold hover:text-temple-gold-bright transition-colors p-2 rounded-xl hover:bg-white/5 flex items-center gap-1 text-[10px] font-extrabold uppercase"
                        title="Duplicar como plantilla"
                      >
                        <Copy size={13} /> Plantilla
                      </button>
                      <button 
                        type="button"
                        onClick={() => deleteItem(itemData.id)} 
                        className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-white/5"
                        title="Eliminar de Vitrina"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
            <ImageIcon size={40} className="mx-auto mb-3 opacity-30 text-temple-gold" />
            <p className="font-bold text-sm">No hay elementos en esta categoría.</p>
          </div>
        )}
      </div>

    </div>
  );
}
