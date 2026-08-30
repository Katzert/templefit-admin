'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit3, X, Save, ChefHat, Upload, Image as ImageIcon, Table, LayoutGrid, Flame } from 'lucide-react';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Recipe } from '../types';

export function Module20Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
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
    const db = getCRMDatabase();
    setRecipes(db.recipes || []);
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
    
    // Cleanup empty text fields
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
      name: '', category: 'desayuno', time: 15, difficulty: 'Fácil', servings: 1,
      description: '', ingredientsText: [''], steps: [''],
      macros: { calories: 0, protein: 0, fat: 0, carbs: 0 },
      suggestedPrice: 0, crmIngredients: [], image: ''
    });
  };

  const filteredRecipes = recipes.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (recipe: Recipe) => {
    setNewRecipe(recipe);
    setEditingId(recipe.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white to-slate-50 dark:from-temple-navy-dark dark:to-black text-temple-navy dark:text-white p-6 rounded-xl border border-black/5 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ChefHat size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <h2 className="text-2xl font-black text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
              <ChefHat className="text-temple-gold" size={24} />
              Gestión de Recetas
            </h2>
            <p className="text-sm text-slate-600 dark:text-gray-400 mt-1">Sincronizado con la Web Pública</p>
          </div>
          
          <button 
            onClick={() => { setIsAdding(!isAdding); setEditingId(null); resetForm(); }} 
            className="flex items-center gap-2 px-6 py-3 bg-temple-gold text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-temple-gold-bright transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] w-max"
          >
            {isAdding ? <X size={18} /> : <Plus size={18} />}
            {isAdding ? 'Cancelar' : 'Nueva Receta'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="text-red-400 font-bold uppercase tracking-widest text-xs">Regla de Oro de Producción</h4>
            <p className="text-slate-700 dark:text-gray-300 text-sm">Producción sujeta a pedido mínimo de 5 unidades con 50% de seña antes del viernes.</p>
          </div>
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
            <div className="bg-white dark:bg-[#0B0F19] border border-temple-gold/20 rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-bold text-temple-gold uppercase tracking-widest mb-4 flex items-center gap-2">
                {editingId ? <Edit3 size={16} /> : <Plus size={16} />} 
                {editingId ? 'Editar Receta' : 'Crear Nueva Receta Pública'}
              </h3>
              <form onSubmit={submitRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Image Upload Area */}
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-2 block">Foto del Platillo (Click para subir)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-48 border-2 border-dashed border-black/20 dark:border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-temple-gold/50 transition bg-slate-50 dark:bg-black/40 overflow-hidden relative"
                  >
                    {newRecipe.image ? (
                      <img src={newRecipe.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-slate-500 dark:text-gray-500">
                        <Upload size={32} className="mx-auto mb-2" />
                        <span className="text-xs uppercase font-bold tracking-widest">Subir Imagen</span>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </div>
                </div>

                {/* Basics */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Nombre</label>
                    <input type="text" value={newRecipe.name} onChange={e => setNewRecipe({ ...newRecipe, name: e.target.value })} required className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm text-slate-900 dark:text-white focus:border-temple-gold outline-none" placeholder="Ej. Batido de Proteína" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Descripción Breve</label>
                    <textarea value={newRecipe.description} onChange={e => setNewRecipe({ ...newRecipe, description: e.target.value })} required rows={2} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm text-slate-900 dark:text-white focus:border-temple-gold outline-none" placeholder="El desayuno oficial del Reto 21 Días..." />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Categoría</label>
                      <select value={newRecipe.category} onChange={e => setNewRecipe({ ...newRecipe, category: e.target.value })} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-temple-gold outline-none">
                        <option value="desayuno">Desayuno</option>
                        <option value="almuerzo">Almuerzo</option>
                        <option value="cena">Cena</option>
                        <option value="snack">Snack / Batido</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Dificultad</label>
                      <select value={newRecipe.difficulty} onChange={e => setNewRecipe({ ...newRecipe, difficulty: e.target.value })} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-temple-gold outline-none">
                        <option value="Fácil">Fácil</option>
                        <option value="Media">Media</option>
                        <option value="Difícil">Difícil</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Tiempo (Min)</label>
                      <input type="number" value={newRecipe.time} onChange={e => setNewRecipe({ ...newRecipe, time: Number(e.target.value) })} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-temple-gold outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Porciones</label>
                      <input type="number" value={newRecipe.servings} onChange={e => setNewRecipe({ ...newRecipe, servings: Number(e.target.value) })} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-temple-gold outline-none" />
                    </div>
                  </div>
                </div>

                {/* Macros & Lists */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Macros</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <input type="number" placeholder="Kcal" value={newRecipe.macros?.calories || ''} onChange={e => setNewRecipe({ ...newRecipe, macros: { ...newRecipe.macros!, calories: Number(e.target.value) }})} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-center text-white outline-none" />
                      <input type="number" placeholder="Prot(g)" value={newRecipe.macros?.protein || ''} onChange={e => setNewRecipe({ ...newRecipe, macros: { ...newRecipe.macros!, protein: Number(e.target.value) }})} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-center text-white outline-none" />
                      <input type="number" placeholder="Gras(g)" value={newRecipe.macros?.fat || ''} onChange={e => setNewRecipe({ ...newRecipe, macros: { ...newRecipe.macros!, fat: Number(e.target.value) }})} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-center text-white outline-none" />
                      <input type="number" placeholder="Carb(g)" value={newRecipe.macros?.carbs || ''} onChange={e => setNewRecipe({ ...newRecipe, macros: { ...newRecipe.macros!, carbs: Number(e.target.value) }})} className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-xs text-center text-white outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Ingredientes (1 por línea)</label>
                    <textarea 
                      value={newRecipe.ingredientsText?.join('\n')} 
                      onChange={e => setNewRecipe({ ...newRecipe, ingredientsText: e.target.value.split('\n') })} 
                      rows={4} 
                      className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm text-slate-900 dark:text-white focus:border-temple-gold outline-none" 
                      placeholder="2 huevos\n1 aguacate..." 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1 block">Pasos de Preparación (1 por línea)</label>
                    <textarea 
                      value={newRecipe.steps?.join('\n')} 
                      onChange={e => setNewRecipe({ ...newRecipe, steps: e.target.value.split('\n') })} 
                      rows={4} 
                      className="w-full bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg p-2.5 text-sm text-slate-900 dark:text-white focus:border-temple-gold outline-none" 
                      placeholder="1. Batir los huevos\n2. Cocinar a fuego lento..." 
                    />
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 pt-4 border-t border-black/10 dark:border-white/10 mt-2">
                  <button type="submit" className="flex items-center justify-center gap-2 w-full py-4 bg-temple-gold text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-amber-400 transition shadow-lg shadow-temple-gold/20">
                    <Save size={18} /> Publicar Receta en Web
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-500" size={18} />
          <input type="text" placeholder="Buscar receta o ingrediente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white dark:bg-[#0B0F19] border border-black/10 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold transition-colors" />
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-white dark:bg-black/5 dark:bg-black/60 p-1 rounded-2xl border border-black/10 dark:border-white/10 shrink-0">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              viewMode === 'table'
                ? 'bg-temple-gold text-black font-extrabold shadow-md'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white'
            }`}
          >
            <Table size={14} />
            <span>Tabla Costeo (Excel)</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              viewMode === 'cards'
                ? 'bg-temple-gold text-black font-extrabold shadow-md'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white'
            }`}
          >
            <LayoutGrid size={14} />
            <span>Tarjetas</span>
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        /* SYMMETRIC EXCEL-STYLE RECIPES & MACROS TABLE */
        <div className="bg-white dark:bg-[#0B0F19]/80 backdrop-blur-lg border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-gray-400 font-black">
                  <th className="pb-3 pr-4 font-black">Receta / Ítem</th>
                  <th className="pb-3 pr-4 font-black">Categoría</th>
                  <th className="pb-3 pr-4 font-black text-center">Tiempo</th>
                  <th className="pb-3 pr-4 font-black text-right">Kcal</th>
                  <th className="pb-3 pr-4 font-black text-right text-emerald-400">Proteína</th>
                  <th className="pb-3 pr-4 font-black text-right text-amber-400">Grasas</th>
                  <th className="pb-3 pr-4 font-black text-right text-blue-400">Carbos</th>
                  <th className="pb-3 pr-4 font-black text-right text-temple-gold">Precio Sugerido</th>
                  <th className="pb-3 pr-4 font-black text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRecipes.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-black/5 dark:bg-white/5 transition-colors group">
                    <td className="py-4 pl-4 font-bold text-temple-navy dark:text-temple-navy dark:text-white group-hover:text-temple-gold transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-white dark:bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shrink-0 flex items-center justify-center">
                          {recipe.image ? (
                            <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                          ) : (
                            <ChefHat size={14} className="text-slate-500 dark:text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">{recipe.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-gray-500">{recipe.servings || 1} porción</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] uppercase font-bold text-temple-gold">
                        {recipe.category}
                      </span>
                    </td>
                    <td className="py-4 pl-4 text-center tabular-nums text-slate-700 dark:text-gray-300">
                      {recipe.time || 15}m
                    </td>
                    <td className="py-4 pl-4 text-right tabular-nums font-black text-temple-navy dark:text-white">
                      {recipe.macros?.calories || 0} kcal
                    </td>
                    <td className="py-4 pl-4 text-right tabular-nums font-bold text-emerald-400">
                      {recipe.macros?.protein || 0}g
                    </td>
                    <td className="py-4 pl-4 text-right tabular-nums font-bold text-amber-400">
                      {recipe.macros?.fat || 0}g
                    </td>
                    <td className="py-4 pl-4 text-right tabular-nums font-bold text-blue-400">
                      {recipe.macros?.carbs || 0}g
                    </td>
                    <td className="py-4 pl-4 text-right tabular-nums font-black text-temple-gold">
                      Bs. {recipe.suggestedPrice || 25}
                    </td>
                    <td className="py-4 pl-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(recipe)} className="p-1.5 text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 rounded-lg transition" title="Editar"><Edit3 size={14}/></button>
                        <button onClick={() => deleteRecipe(recipe.id)} className="p-1.5 text-slate-600 dark:text-gray-400 hover:text-red-400 bg-black/5 dark:bg-white/5 hover:bg-red-500/10 rounded-lg transition" title="Eliminar"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-black/10 dark:border-white/10 font-black text-temple-navy dark:text-white text-xs">
                  <td className="py-4 pl-4 uppercase tracking-wider text-temple-gold" colSpan={3}>
                    Promedios del Menú ({filteredRecipes.length} recetas)
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums text-temple-navy dark:text-white">
                    {filteredRecipes.length > 0 ? Math.round(filteredRecipes.reduce((sum, r) => sum + (r.macros?.calories || 0), 0) / filteredRecipes.length) : 0} kcal
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums text-emerald-400">
                    {filteredRecipes.length > 0 ? (filteredRecipes.reduce((sum, r) => sum + (r.macros?.protein || 0), 0) / filteredRecipes.length).toFixed(1) : 0}g
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums text-amber-400">
                    {filteredRecipes.length > 0 ? (filteredRecipes.reduce((sum, r) => sum + (r.macros?.fat || 0), 0) / filteredRecipes.length).toFixed(1) : 0}g
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums text-blue-400">
                    {filteredRecipes.length > 0 ? (filteredRecipes.reduce((sum, r) => sum + (r.macros?.carbs || 0), 0) / filteredRecipes.length).toFixed(1) : 0}g
                  </td>
                  <td className="py-4 pl-4 text-right tabular-nums text-temple-gold text-sm font-black">
                    Bs. {filteredRecipes.length > 0 ? Math.round(filteredRecipes.reduce((sum, r) => sum + (r.suggestedPrice || 25), 0) / filteredRecipes.length) : 0}
                  </td>
                  <td className="py-4 pl-4 text-center">-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        /* CARDS GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white dark:bg-[#0B0F19] border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden hover:border-temple-gold/30 transition-colors flex flex-col group">
              <div className="h-40 bg-slate-100 dark:bg-white dark:bg-black relative overflow-hidden">
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-700 bg-white dark:bg-black/5 dark:bg-white/5">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Sin Imagen</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white dark:bg-black/5 dark:bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-black/10 dark:border-white/10 text-[9px] font-bold text-temple-gold uppercase">
                  {recipe.category}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-temple-navy dark:text-white mb-2">{recipe.name}</h3>
                <div className="grid grid-cols-3 gap-2 mb-4 border-b border-black/10 dark:border-white/10 pb-4">
                  <div className="text-center bg-white dark:bg-black/5 dark:bg-white/5 rounded-lg py-2">
                    <span className="block text-[9px] uppercase tracking-widest text-slate-500 dark:text-gray-500">Kcal</span>
                    <span className="font-bold text-xs text-white">{recipe.macros?.calories || 0}</span>
                  </div>
                  <div className="text-center bg-white dark:bg-black/5 dark:bg-white/5 rounded-lg py-2">
                    <span className="block text-[9px] uppercase tracking-widest text-slate-500 dark:text-gray-500">Prot</span>
                    <span className="font-bold text-xs text-white">{recipe.macros?.protein || 0}g</span>
                  </div>
                  <div className="text-center bg-white dark:bg-black/5 dark:bg-white/5 rounded-lg py-2">
                    <span className="block text-[9px] uppercase tracking-widest text-slate-500 dark:text-gray-500">Tiempo</span>
                    <span className="font-bold text-xs text-white">{recipe.time || 0}m</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-2 flex justify-between gap-2">
                  <button onClick={() => startEdit(recipe)} className="flex-1 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 text-[10px] font-bold uppercase tracking-widest text-white rounded-lg transition-colors border border-black/5 dark:border-white/5">
                    Editar
                  </button>
                  <button onClick={() => deleteRecipe(recipe.id)} className="px-3 py-2 bg-temple-red/10 hover:bg-temple-red/20 text-temple-red rounded-lg transition-colors border border-temple-red/20">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredRecipes.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 dark:text-gray-500 border border-dashed border-black/10 dark:border-white/10 rounded-2xl">
              <ChefHat size={32} className="mx-auto mb-2 opacity-50" />
              <p>No se encontraron recetas.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
