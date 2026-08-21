'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Utensils, ShoppingBag, Plus, Save, Trash2, Eye, EyeOff, Upload, Copy, Search, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { ShowcaseItem } from '../types';

export function Module14Showcase() {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxWidth = 800;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.8);
          updateItem(id, 'imageUrl', compressed);
        } else {
          updateItem(id, 'imageUrl', event.target?.result as string);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const filteredItems = items.filter(i => {
    if (!i) return false;
    const matchesSearch = (i.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (i.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                          (activeFilter === 'recipe' && i.type === 'recipe') ||
                          (activeFilter === 'merch' && i.type === 'merch');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-br from-[#0a1128] via-black to-black p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ImageIcon size={180} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 text-[10px] font-black uppercase tracking-[0.2em]">
              Multimedia & Vitrina Tienda
            </span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Catálogo & Plantillas de Tienda
          </h2>
          <p className="text-gray-400 text-sm mt-1 max-w-xl">
            Edita fotos, precios, textos y usa cualquier producto o receta como plantilla para crear nuevos lanzamientos.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => addItem('merch')}
            className="px-5 py-3 rounded-2xl bg-temple-gold text-black font-black text-xs uppercase tracking-wider hover:bg-amber-400 transition flex items-center gap-2 shadow-lg shadow-temple-gold/20"
          >
            <Plus size={16} /> + Producto Tienda
          </button>
          <button
            onClick={() => addItem('recipe')}
            className="px-5 py-3 rounded-2xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition flex items-center gap-2 border border-white/10"
          >
            <Plus size={16} /> + Receta Vitrina
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar producto o receta en vitrina..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-temple-gold transition-colors text-white" 
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeFilter === 'all' ? 'bg-temple-gold text-black font-black' : 'bg-black/50 text-gray-400 border border-white/10'}`}
          >
            Todo el Catálogo ({items.length})
          </button>
          <button
            onClick={() => setActiveFilter('merch')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeFilter === 'merch' ? 'bg-temple-gold text-black font-black' : 'bg-black/50 text-gray-400 border border-white/10'}`}
          >
            Productos & Membresías ({items.filter(i => i.type === 'merch').length})
          </button>
          <button
            onClick={() => setActiveFilter('recipe')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeFilter === 'recipe' ? 'bg-temple-gold text-black font-black' : 'bg-black/50 text-gray-400 border border-white/10'}`}
          >
            Recetas Vitrina ({items.filter(i => i.type === 'recipe').length})
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map(itemData => (
            <div key={itemData.id} className="group">
              <Card className="bg-[#0B0F19] border-white/10 hover:border-temple-gold/40 transition-all rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between">
                
                {/* Media Header */}
                <div className="h-52 relative overflow-hidden bg-black flex flex-col items-center justify-center">
                  <img 
                    src={itemData.imageUrl} 
                    alt={itemData.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity duration-300" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop'; }} 
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[itemData.id]?.click()}
                      className="px-4 py-2 bg-temple-gold text-black rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-400 transition shadow-lg"
                    >
                      <Upload size={14} /> Cambiar Foto
                    </button>
                    <input 
                      type="file"
                      ref={el => { fileInputRefs.current[itemData.id] = el; }}
                      onChange={e => {
                        if (e.target.files?.[0]) handleFileUpload(itemData.id, e.target.files[0]);
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                    <input 
                      value={itemData.imageUrl}
                      onChange={e => updateItem(itemData.id, 'imageUrl', e.target.value)}
                      className="w-full bg-black/80 text-white text-[11px] font-mono px-3 py-1.5 rounded-xl border border-white/20 focus:outline-none focus:border-temple-gold text-center"
                      placeholder="o pega URL de la foto..."
                    />
                  </div>

                  {/* Status Badge */}
                  <button 
                    onClick={() => updateItem(itemData.id, 'status', itemData.status === 'active' ? 'draft' : 'active')}
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 backdrop-blur-md ${itemData.status === 'active' ? 'bg-emerald-500/80 text-white' : 'bg-black/80 text-gray-400 border border-white/20'}`}
                  >
                    {itemData.status === 'active' ? <Eye size={12}/> : <EyeOff size={12}/>}
                    {itemData.status === 'active' ? 'Público' : 'Borrador'}
                  </button>

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 text-[9px] font-bold uppercase tracking-widest text-white border border-white/10 flex items-center gap-1 backdrop-blur-md">
                    {itemData.type === 'merch' ? <ShoppingBag size={12} className="text-temple-gold"/> : <Utensils size={12} className="text-emerald-500"/>}
                    {itemData.type === 'merch' ? 'Tienda' : 'Receta'}
                  </div>
                </div>

                <CardContent className="!p-5 flex flex-col gap-3 bg-gradient-to-b from-[#0E1424] to-[#07090E]">
                  <input 
                    value={itemData.title} 
                    onChange={e => updateItem(itemData.id, 'title', e.target.value)}
                    className="bg-transparent text-white font-black text-base focus:outline-none w-full border-b border-transparent focus:border-temple-gold/40 pb-1"
                    placeholder="Título del producto..."
                  />
                  
                  <textarea
                    value={itemData.description}
                    onChange={e => updateItem(itemData.id, 'description', e.target.value)}
                    className="w-full bg-transparent text-gray-400 text-xs min-h-[50px] focus:outline-none resize-none leading-relaxed"
                    placeholder="Descripción para la página web..."
                  />

                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Bs.</span>
                      <input 
                        type="number"
                        value={itemData.price} 
                        onChange={e => updateItem(itemData.id, 'price', Number(e.target.value))}
                        className="bg-white/5 text-temple-gold font-black text-sm focus:outline-none w-24 px-2.5 py-1 rounded-xl border border-white/10 focus:border-temple-gold/40"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => duplicateItem(itemData)} 
                        className="text-temple-gold hover:text-amber-300 transition-colors p-2 rounded-xl hover:bg-white/5 flex items-center gap-1 text-[10px] font-bold uppercase"
                        title="Duplicar como plantilla"
                      >
                        <Copy size={14} /> Plantilla
                      </button>
                      <button 
                        onClick={() => deleteItem(itemData.id)} 
                        className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-white/5"
                        title="Eliminar de Vitrina"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 border border-dashed border-white/10 rounded-3xl">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-bold">No hay elementos en esta categoría.</p>
          </div>
        )}
      </div>

    </div>
  );
}
