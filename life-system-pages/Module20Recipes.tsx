'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit3, X, Save, ChefHat, Upload, Copy } from 'lucide-react';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Recipe } from '../types';

export function Module20Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'bebidas' | 'desayuno' | 'almuerzo' | 'snack'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    name: '',
    category: 'desayuno',
    time: 15,
    difficulty: 'Fácil',
    servings: 1,
    description: '',
    ingredientsText: [''],
    steps: [''],
    macros: { calories: 0, protein: 0, fat: 0, carbs: 0 },
    suggestedPrice: 0,
    crmIngredients: [],
    image: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = () => {
      const db = getCRMDatabase();
      setRecipes(db.recipes || []);
    };
    load();
  }, []);

  const saveToDb = (newRecipes: Recipe[]) => {
    const db = getCRMDatabase();
    db.recipes = newRecipes;
    saveCRMDatabase(db);
    setRecipes(newRecipes);
  };

  const deleteRecipe = (id: string) => {
    if (!confirm('¿Eliminar esta receta del catálogo?')) return;
    saveToDb(recipes.filter(r => r.id !== id));
  };

  const duplicateRecipe = (recipe: Recipe) => {
    const duplicated: Partial<Recipe> = {
      ...recipe,
      name: `${recipe.name} (Nueva Variante)`,
      id: undefined
    };
    setNewRecipe(duplicated);
    setEditingId(null);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRecipe({ ...newRecipe, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipe.name) return;
    
    const cleanedIngredientsText = newRecipe.ingredientsText?.filter(i => i.trim() !== '') || [];
    const cleanedSteps = newRecipe.steps?.filter(s => s.trim() !== '') || [];
    
    const recipe: Recipe = {
      id: editingId || `rec-${Date.now()}`,
      name: newRecipe.name,
      category: newRecipe.category || 'desayuno',
      time: newRecipe.time || 15,
      difficulty: newRecipe.difficulty || 'Fácil',
      servings: newRecipe.servings || 1,
      description: newRecipe.description || '',
      ingredientsText: cleanedIngredientsText,
      steps: cleanedSteps,
      macros: newRecipe.macros || { calories: 0, protein: 0, fat: 0, carbs: 0 },
      suggestedPrice: newRecipe.suggestedPrice || 0,
      crmIngredients: newRecipe.crmIngredients || [],
      image: newRecipe.image || ''
    };
    
    if (editingId) {
      saveToDb(recipes.map(r => r.id === editingId ? recipe : r));
    } else {
      saveToDb([recipe, ...recipes]);
    }
    
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setNewRecipe({
      name: '',
      category: 'desayuno',
      time: 15,
      difficulty: 'Fácil',
      servings: 1,
      description: '',
      ingredientsText: [''],
      steps: [''],
      macros: { calories: 0, protein: 0, fat: 0, carbs: 0 },
      suggestedPrice: 0,
      crmIngredients: [],
      image: ''
    });
  };

  const startEdit = (recipe: Recipe) => {
    setNewRecipe(recipe);
    setEditingId(recipe.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredRecipes = recipes.filter(r => {
    const matchesCategory = categoryFilter === 'all' || r.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B0F19] p-7 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ChefHat size={140} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-temple-olive/20 text-temple-olive border border-temple-olive/40 text-[10px] font-extrabold uppercase tracking-[0.2em]">
                Nutrición Celular & Botica
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-tight flex items-center gap-2">
              Gestión de Recetas & Nutrición
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1 font-light">Catálogo oficial sincronizado con la Web Pública ({recipes.length} recetas editables)</p>
          </div>
          
          <button 
            onClick={() => { setIsAdding(!isAdding); setEditingId(null); resetForm(); }} 
            className="flex items-center gap-2 px-5 py-2.5 bg-temple-gold text-black rounded-xl font-extrabold uppercase tracking-wider text-xs hover:bg-temple-gold-bright transition shadow-lg shadow-temple-gold/15 w-max"
          >
            {isAdding ? <X size={16} /> : <Plus size={16} />}
            {isAdding ? 'Cancelar' : 'Nueva Receta'}
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
            <div className="bg-[#0B0F19] border border-temple-gold/30 rounded-2xl p-6 mb-6 shadow-2xl">
              <h3 className="text-sm font-bold text-temple-gold uppercase tracking-widest mb-4 flex items-center gap-2">
                {editingId ? <Edit3 size={16} /> : <Plus size={16} />} 
                {editingId ? 'Editar Receta' : 'Crear Receta (O usando plantilla seleccionada)'}
              </h3>
              <form onSubmit={submitRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Image Upload Area */}
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2 block">Foto del Platillo</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-[16/9] border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-temple-gold/50 transition bg-black/40 overflow-hidden relative max-h-56"
                  >
                    {newRecipe.image ? (
                      <img src={newRecipe.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4 text-gray-500">
                        <Upload size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-xs uppercase font-bold tracking-wider">Haz clic para subir foto</p>
                      </div>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="O pega aquí la URL de la imagen..." 
                    value={newRecipe.image || ''} 
                    onChange={e => setNewRecipe({ ...newRecipe, image: e.target.value })}
                    className="w-full mt-2 bg-black border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-temple-gold font-mono"
                  />
                </div>

                {/* Basic Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1 block">Nombre de la Receta</label>
                    <input type="text" required value={newRecipe.name} onChange={e => setNewRecipe({ ...newRecipe, name: e.target.value })} className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-temple-gold outline-none" placeholder="Ej. ElectroHidra Elite..." />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1 block">Descripción Terapéutica</label>
                    <textarea value={newRecipe.description} onChange={e => setNewRecipe({ ...newRecipe, description: e.target.value })} rows={3} className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:border-temple-gold outline-none resize-none" placeholder="Beneficios metabólicos y recuperación..." />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1 block">Categoría</label>
                      <select 
                        value={newRecipe.category} 
                        onChange={e => setNewRecipe({ ...newRecipe, category: e.target.value as any })}
                        className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:border-temple-gold outline-none"
                      >
                        <option value="bebidas">Bebidas</option>
                        <option value="desayuno">Desayunos</option>
                        <option value="almuerzo">Almuerzos</option>
                        <option value="snack">Snack Bar</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1 block">Tiempo (Min)</label>
                      <input type="number" value={newRecipe.time} onChange={e => setNewRecipe({ ...newRecipe, time: Number(e.target.value) })} className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:border-temple-gold outline-none tabular-nums" />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1 block">Porciones</label>
                      <input type="number" value={newRecipe.servings} onChange={e => setNewRecipe({ ...newRecipe, servings: Number(e.target.value) })} className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:border-temple-gold outline-none tabular-nums" />
                    </div>
                  </div>
                </div>

                {/* Macros */}
                <div className="space-y-4">
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1 block">Información Nutricional (Macros)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Calorías (Kcal)</span>
                      <input type="number" value={newRecipe.macros?.calories || 0} onChange={e => setNewRecipe({ ...newRecipe, macros: { ...newRecipe.macros!, calories: Number(e.target.value) } })} className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:border-temple-gold outline-none tabular-nums" />
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Proteína (g)</span>
                      <input type="number" value={newRecipe.macros?.protein || 0} onChange={e => setNewRecipe({ ...newRecipe, macros: { ...newRecipe.macros!, protein: Number(e.target.value) } })} className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:border-temple-gold outline-none tabular-nums" />
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Grasas (g)</span>
                      <input type="number" value={newRecipe.macros?.fat || 0} onChange={e => setNewRecipe({ ...newRecipe, macros: { ...newRecipe.macros!, fat: Number(e.target.value) } })} className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:border-temple-gold outline-none tabular-nums" />
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Carbohidratos (g)</span>
                      <input type="number" value={newRecipe.macros?.carbs || 0} onChange={e => setNewRecipe({ ...newRecipe, macros: { ...newRecipe.macros!, carbs: Number(e.target.value) } })} className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-xs text-white focus:border-temple-gold outline-none tabular-nums" />
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end gap-3 border-t border-white/10 pt-4">
                  <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-4 py-2 bg-white/10 rounded-xl text-xs uppercase font-bold text-gray-300 hover:bg-white/20 transition">Cancelar</button>
                  <button type="submit" className="px-6 py-2 bg-temple-gold text-black font-extrabold text-xs uppercase rounded-xl hover:bg-temple-gold-bright transition shadow-lg shadow-temple-gold/15 flex items-center gap-1.5"><Save size={14} /> Guardar Receta</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0B0F19] p-3.5 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Buscar recetas por nombre o beneficio..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-temple-gold transition-colors text-white" 
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          {(['all', 'bebidas', 'desayuno', 'almuerzo', 'snack'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                categoryFilter === cat 
                  ? 'bg-temple-gold text-black font-black' 
                  : 'bg-black/40 text-gray-400 border border-white/5'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat === 'bebidas' ? 'Bebidas' : cat === 'desayuno' ? 'Desayunos' : cat === 'almuerzo' ? 'Almuerzos' : 'Snack Bar'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-[#0B0F19] border border-white/10 rounded-2xl overflow-hidden hover:border-temple-gold/30 transition-all duration-200 flex flex-col group shadow-xl hover:-translate-y-1">
            <div className="aspect-[16/10] bg-black relative overflow-hidden">
              <img 
                src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'} 
                alt={recipe.name} 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-extrabold text-temple-gold uppercase tracking-widest shadow-lg">
                {recipe.category}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1 justify-between bg-[#0E1424]">
              <div>
                <h3 className="font-bold text-base text-white mb-1.5 line-clamp-1 group-hover:text-temple-gold transition-colors">{recipe.name}</h3>
                <p className="text-xs text-gray-400 mb-3.5 line-clamp-2 leading-relaxed font-light">{recipe.description}</p>
                <div className="grid grid-cols-3 gap-2 mb-3.5 border-b border-white/10 pb-3">
                  <div className="text-center bg-black/40 rounded-xl py-1.5 border border-white/5">
                    <span className="block text-[8px] uppercase tracking-widest text-gray-500 font-extrabold">Kcal</span>
                    <span className="font-bold text-xs text-white tabular-nums">{recipe.macros?.calories || 0}</span>
                  </div>
                  <div className="text-center bg-black/40 rounded-xl py-1.5 border border-white/5">
                    <span className="block text-[8px] uppercase tracking-widest text-gray-500 font-extrabold">Prot</span>
                    <span className="font-bold text-xs text-temple-gold tabular-nums">{recipe.macros?.protein || 0}g</span>
                  </div>
                  <div className="text-center bg-black/40 rounded-xl py-1.5 border border-white/5">
                    <span className="block text-[8px] uppercase tracking-widest text-gray-500 font-extrabold">Tiempo</span>
                    <span className="font-bold text-xs text-gray-300 tabular-nums">{recipe.time || 0}m</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-1 flex gap-2">
                <button onClick={() => startEdit(recipe)} className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-[10px] font-extrabold uppercase tracking-widest text-white rounded-xl transition border border-white/10 flex items-center justify-center gap-1.5">
                  <Edit3 size={12} /> Editar
                </button>
                <button onClick={() => duplicateRecipe(recipe)} className="flex-1 py-2 bg-temple-gold/15 hover:bg-temple-gold/25 text-[10px] font-extrabold uppercase tracking-widest text-temple-gold rounded-xl transition border border-temple-gold/30 flex items-center justify-center gap-1.5" title="Duplicar como plantilla para nueva receta">
                  <Copy size={12} /> Plantilla
                </button>
                <button onClick={() => deleteRecipe(recipe.id)} className="px-3 py-2 bg-temple-red/10 hover:bg-temple-red/20 text-temple-red rounded-xl transition border border-temple-red/20" title="Eliminar">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredRecipes.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
            <ChefHat size={40} className="mx-auto mb-3 opacity-30 text-temple-gold" />
            <p className="text-xs uppercase font-bold tracking-wider">No se encontraron recetas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
