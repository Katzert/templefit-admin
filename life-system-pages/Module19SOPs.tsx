'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Megaphone, FileText, HelpCircle, Save, Plus, ChevronDown, ChevronRight, CheckCircle2, AlertOctagon, ArrowRight, Zap, Target, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { MarketingTask, SOPItem, ClaimTicket } from '../types';
import confetti from 'canvas-confetti';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

type Tab = 'marketing' | 'playbooks' | 'claims';

export function Module19SOPs() {
  const [activeTab, setActiveTab] = useState<Tab>('playbooks');
  
  const [marketingTasks, setMarketingTasks] = useState<MarketingTask[]>([]);
  const [sopsList, setSopsList] = useState<SOPItem[]>([]);
  const [claimsTickets, setClaimsTickets] = useState<ClaimTicket[]>([]);
  
  const [expandedSop, setExpandedSop] = useState<string | null>(null);

  useEffect(() => {
    const db = getCRMDatabase();
    setMarketingTasks(db.marketingTasks || []);
    
    // Migrate old SOPs to new 3-step format without losing data
    const loadedSops = (db.sopsList || []).map(sop => {
      if (sop.content && !sop.step1 && !sop.step2 && !sop.step3) {
        const lines = sop.content.split('\n').filter(l => l.trim().length > 0);
        let s1 = '', s2 = '', s3 = '';
        
        if (lines.length === 0) {
           s1 = sop.content;
        } else if (lines.length === 1) {
           s1 = lines[0];
        } else if (lines.length === 2) {
           s1 = lines[0];
           s2 = lines[1];
        } else {
           const third = Math.ceil(lines.length / 3);
           s1 = lines.slice(0, third).join('\n');
           s2 = lines.slice(third, third * 2).join('\n');
           s3 = lines.slice(third * 2).join('\n');
        }

        return {
          ...sop,
          step1: s1,
          step2: s2,
          step3: s3,
          content: undefined
        };
      }
      return sop;
    });
    setSopsList(loadedSops);
    setClaimsTickets(db.claimsTickets || []);
  }, []);

  const saveToDb = (newMkt?: MarketingTask[], newSops?: SOPItem[], newClaims?: ClaimTicket[]) => {
    const db = getCRMDatabase();
    if (newMkt) { db.marketingTasks = newMkt; setMarketingTasks(newMkt); }
    if (newSops) { db.sopsList = newSops; setSopsList(newSops); }
    if (newClaims) { db.claimsTickets = newClaims; setClaimsTickets(newClaims); }
    saveCRMDatabase(db);
  };

  const addMarketingTask = () => {
    const newTask: MarketingTask = {
      id: 'mkt-' + Date.now(),
      month: 'Objetivo Principal',
      campaignName: 'Nombre de la Iniciativa',
      driveLink: '', // Keeping it in object to avoid breaking TS, but not showing it
      strategy: '¿Qué queremos lograr?'
    };
    saveToDb([...marketingTasks, newTask], undefined, undefined);
  };

  const updateMarketingTask = (id: string, field: keyof MarketingTask, value: string) => {
    const updated = marketingTasks.map(t => t.id === id ? { ...t, [field]: value } : t);
    saveToDb(updated, undefined, undefined);
  };

  const addSop = () => {
    const newSop: SOPItem = {
      id: 'sop-' + Date.now(),
      title: 'Nuevo Playbook de Combate',
      step1: '¿Qué hacer primero?',
      step2: '¿Qué hacer después?',
      step3: '¿Cómo cerrar la situación?'
    };
    saveToDb(undefined, [newSop, ...sopsList], undefined);
  };

  const updateSop = (id: string, field: keyof SOPItem, value: string) => {
    const updated = sopsList.map(t => t.id === id ? { ...t, [field]: value } : t);
    saveToDb(undefined, updated, undefined);
  };

  const addClaim = () => {
    const newClaim: ClaimTicket = {
      id: 'tck-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      clientName: 'Atleta',
      issue: 'Motivo del reporte',
      status: 'pending',
      resolution: ''
    };
    saveToDb(undefined, undefined, [newClaim, ...claimsTickets]);
  };

  const resolveClaim = (id: string) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#F59E0B']
    });
    const updated = claimsTickets.map(t => t.id === id ? { ...t, status: 'resolved' as const } : t);
    saveToDb(undefined, undefined, updated);
  };

  const deleteItem = (type: Tab, id: string) => {
    if (!confirm('¿Eliminar definitivamente?')) return;
    if (type === 'marketing') saveToDb(marketingTasks.filter(t => t.id !== id), undefined, undefined);
    if (type === 'playbooks') saveToDb(undefined, sopsList.filter(t => t.id !== id), undefined);
    if (type === 'claims') saveToDb(undefined, undefined, claimsTickets.filter(t => t.id !== id));
  };

  const pendingClaims = claimsTickets.filter(t => t.status === 'pending');
  const resolvedClaims = claimsTickets.filter(t => t.status === 'resolved');

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 max-w-7xl mx-auto font-sans">
      
      {/* Header Visual */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-br from-white via-slate-50 to-white dark:from-[#0a1128] dark:via-black dark:to-black text-temple-navy dark:text-white p-8 rounded-3xl border border-black/10 dark:border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Zap size={180} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
              Operaciones & Soporte
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-temple-navy dark:text-white uppercase tracking-tighter flex items-center gap-3">
            <Zap className="text-temple-gold" size={32} />
            Guías Operativas & SOPs
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 mt-1">
            Protocolos en 3 pasos, campañas activas y atención de consultas de atletas.
          </p>
        </div>
        
        {/* Modern Tabs */}
        <div className="relative z-10 flex bg-white dark:bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/10 dark:border-white/10 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('playbooks')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'playbooks' ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20' : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'}`}
          >
            <AlertOctagon size={16} /> Protocolos
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'marketing' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'}`}
          >
            <Target size={16} /> Campañas
          </button>
          <button 
            onClick={() => setActiveTab('claims')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'claims' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'}`}
          >
            <HelpCircle size={16} /> {pendingClaims.length > 0 && <span className="bg-white text-red-500 px-1.5 rounded-full text-[10px]">{pendingClaims.length}</span>} Consultas
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* PLAYBOOKS TAB (Rule of 3) */}
        {activeTab === 'playbooks' && (
          <motion.div key="playbooks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5">
              <div>
                <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider">Protocolos en 3 Pasos</h3>
                <p className="text-xs text-slate-600 dark:text-gray-400">Guías directas y sin rodeos para resolver cualquier situación en el gimnasio o campamento.</p>
              </div>
              <button onClick={addSop} className="flex items-center gap-2 px-5 py-2.5 bg-temple-gold text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition shadow-lg shadow-temple-gold/20">
                <Plus size={16} /> Nuevo Protocolo
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sopsList.map((sop) => (
                <Card key={sop.id} className="bg-white dark:bg-[#0E1424] border-black/10 dark:border-white/10 shadow-xl overflow-hidden hover:border-temple-gold/30 transition-all group">
                  <div className="bg-gradient-to-r from-black/60 to-transparent p-5 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
                    <input 
                      value={sop.title} 
                      onChange={e => updateSop(sop.id, 'title', e.target.value)}
                      className="bg-transparent text-temple-gold font-black text-xl focus:outline-none w-full uppercase tracking-tighter"
                      placeholder="TÍTULO DEL PROTOCOLO"
                    />
                    <button onClick={() => deleteItem('playbooks', sop.id)} className="text-gray-600 hover:text-red-500 transition-colors ml-4" title="Destruir Playbook">
                      <Save size={18} className="opacity-0 w-0" /> {/* Hack to keep spacing */}
                      Eliminar
                    </button>
                  </div>
                  
                  <CardContent className="p-0">
                    <div className="flex flex-col divide-y divide-white/5">
                      {/* Step 1 */}
                      <div className="flex items-start p-5 gap-4 group/step hover:bg-white dark:bg-black/[0.02] dark:bg-white/[0.02] transition">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-black/5 dark:bg-white/5 text-slate-500 dark:text-gray-500 font-black flex items-center justify-center flex-shrink-0 group-hover/step:bg-temple-gold/20 group-hover/step:text-temple-gold transition">1</div>
                        <textarea
                          value={sop.step1 || ''}
                          onChange={e => updateSop(sop.id, 'step1', e.target.value)}
                          className="w-full bg-transparent text-slate-900 dark:text-white focus:outline-none resize-y font-medium mt-1 leading-relaxed min-h-[80px]"
                          placeholder="Paso 1: Acción Inmediata"
                        />
                      </div>
                      {/* Step 2 */}
                      <div className="flex items-start p-5 gap-4 group/step hover:bg-white dark:bg-black/[0.02] dark:bg-white/[0.02] transition">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-black/5 dark:bg-white/5 text-slate-500 dark:text-gray-500 font-black flex items-center justify-center flex-shrink-0 group-hover/step:bg-temple-gold/20 group-hover/step:text-temple-gold transition">2</div>
                        <textarea
                          value={sop.step2 || ''}
                          onChange={e => updateSop(sop.id, 'step2', e.target.value)}
                          className="w-full bg-transparent text-slate-900 dark:text-white focus:outline-none resize-y font-medium mt-1 leading-relaxed min-h-[80px]"
                          placeholder="Paso 2: Resolución"
                        />
                      </div>
                      {/* Step 3 */}
                      <div className="flex items-start p-5 gap-4 group/step hover:bg-white dark:bg-black/[0.02] dark:bg-white/[0.02] transition">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-black/5 dark:bg-white/5 text-slate-500 dark:text-gray-500 font-black flex items-center justify-center flex-shrink-0 group-hover/step:bg-temple-gold/20 group-hover/step:text-temple-gold transition">3</div>
                        <textarea
                          value={sop.step3 || ''}
                          onChange={e => updateSop(sop.id, 'step3', e.target.value)}
                          className="w-full bg-transparent text-slate-900 dark:text-white focus:outline-none resize-y font-medium mt-1 leading-relaxed min-h-[80px]"
                          placeholder="Paso 3: Cierre o Seguimiento"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {sopsList.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500 dark:text-gray-500 border border-dashed border-black/10 dark:border-white/10 rounded-3xl">
                  <AlertOctagon size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="font-bold">No hay protocolos de combate activos.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* MARKETING TAB (Visual Posters) */}
        {activeTab === 'marketing' && (
          <motion.div key="marketing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5">
              <div>
                <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider">Iniciativas de Crecimiento</h3>
                <p className="text-xs text-slate-600 dark:text-gray-400">Las grandes apuestas del mes.</p>
              </div>
              <button onClick={addMarketingTask} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition shadow-lg shadow-blue-500/20">
                <Plus size={16} /> Nueva Iniciativa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketingTasks.map((task) => (
                <div key={task.id} className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-[#0a1128] dark:to-black text-temple-navy dark:text-white border border-black/10 dark:border-white/10 shadow-2xl hover:border-blue-500/40 hover:shadow-blue-900/20 transition-all duration-300 flex flex-col">
                  {/* Banner superior */}
                  <div className="min-h-[160px] h-auto bg-gradient-to-t from-black/80 to-blue-900/20 relative p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start relative z-20">
                      <div className="bg-blue-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-blue-500/30">
                        <input 
                          value={task.month} 
                          onChange={e => updateMarketingTask(task.id, 'month', e.target.value)}
                          className="bg-transparent text-blue-400 font-black uppercase tracking-widest text-[10px] focus:outline-none w-28"
                          placeholder="Mes / Fase"
                        />
                      </div>
                      <button 
                        onClick={() => deleteItem('marketing', task.id)} 
                        className="text-gray-600 hover:text-red-500 transition-colors bg-black/5 dark:bg-white/5 hover:bg-red-500/10 p-2 rounded-xl backdrop-blur-md" 
                        title="Eliminar Iniciativa"
                      >
                        <Plus size={16} className="rotate-45" />
                      </button>
                    </div>
                    
                    <Target className="absolute right-[-20px] bottom-[-20px] text-blue-500/5 rotate-12" size={120} />
                    
                    <textarea 
                      value={task.campaignName} 
                      onChange={e => updateMarketingTask(task.id, 'campaignName', e.target.value)}
                      className="bg-transparent text-slate-900 dark:text-white font-black text-3xl md:text-4xl focus:outline-none w-full relative z-10 leading-[1.1] placeholder-white/20 resize-none overflow-hidden mt-4"
                      rows={2}
                      placeholder="ESCRIBE TU TITULAR..."
                    />
                  </div>
                  
                  {/* Cuerpo */}
                  <div className="p-6 flex-1 flex flex-col bg-slate-50 dark:bg-white dark:bg-black/40">
                    <label className="text-[10px] text-slate-500 dark:text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Megaphone size={12} className="text-blue-500" /> Estrategia de Combate
                    </label>
                    <textarea
                      value={task.strategy}
                      onChange={e => updateMarketingTask(task.id, 'strategy', e.target.value)}
                      className="w-full bg-transparent text-slate-700 dark:text-gray-300 text-sm min-h-[120px] focus:outline-none resize-y leading-relaxed"
                      placeholder="Anota la premisa principal, el gancho o la estrategia de esta campaña..."
                    />
                  </div>
                </div>
              ))}
              {marketingTasks.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500 dark:text-gray-500 border border-dashed border-black/10 dark:border-white/10 rounded-3xl">
                  <Target size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="font-bold">No hay iniciativas de marketing.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CLAIMS TAB (Tinder-Style One Click) */}
        {activeTab === 'claims' && (
          <motion.div key="claims" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex justify-between items-center bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
              <div>
                <h3 className="text-lg font-black text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertOctagon size={20} /> Fuego Cruzado (Reclamos)
                </h3>
                <p className="text-xs text-slate-600 dark:text-gray-400">La regla es simple: Lee, soluciona en la vida real, y dale al botón verde.</p>
              </div>
              <button onClick={addClaim} className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition shadow-lg shadow-red-500/20">
                <Plus size={16} /> Reportar Fuego
              </button>
            </div>

            {pendingClaims.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {pendingClaims.map((ticket) => (
                    <motion.div key={ticket.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, x: -100 }} className="bg-gradient-to-r from-red-900/30 to-[#FBF9F5] dark:to-[#0a1128] border-l-4 border-l-red-500 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                        <AlertOctagon size={100} className="text-red-500" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col flex-1 gap-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] bg-red-500/20 text-red-400 px-2.5 py-1 rounded-full font-black uppercase tracking-widest">{ticket.date}</span>
                          <button onClick={() => deleteItem('claims', ticket.id)} className="text-gray-600 hover:text-red-400 transition" title="Borrar Error">
                            <Plus size={18} className="rotate-45" />
                          </button>
                        </div>
                        
                        <div>
                          <label className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold">Atleta / Involucrado</label>
                          <input 
                            value={ticket.clientName} 
                            onChange={e => {
                              const updated = claimsTickets.map(t => t.id === ticket.id ? { ...t, clientName: e.target.value } : t);
                              saveToDb(undefined, undefined, updated);
                            }}
                            className="bg-transparent text-slate-900 dark:text-white font-black text-xl focus:outline-none w-full border-b border-transparent focus:border-red-500/50 pb-1 placeholder-white/20"
                            placeholder="Nombre..."
                          />
                        </div>
                        
                        <div className="flex-1">
                          <label className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-gray-500 font-bold">Descripción del Fuego</label>
                          <textarea 
                            value={ticket.issue} 
                            onChange={e => {
                              const updated = claimsTickets.map(t => t.id === ticket.id ? { ...t, issue: e.target.value } : t);
                              saveToDb(undefined, undefined, updated);
                            }}
                            className="bg-transparent text-slate-700 dark:text-gray-300 text-sm focus:outline-none w-full min-h-[60px] resize-y mt-1 leading-relaxed"
                            placeholder="¿Qué pasó? Breve y al punto."
                          />
                        </div>
                        
                        <button 
                          onClick={() => resolveClaim(ticket.id)}
                          className="mt-4 w-full py-4 bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 size={20} /> Marcar como Resuelto
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-12 text-center text-emerald-500 border border-dashed border-emerald-500/20 bg-emerald-900/10 rounded-3xl">
                <CheckCircle2 size={48} className="mx-auto mb-4 opacity-50" />
                <p className="font-black text-xl uppercase tracking-widest">Cero Fuego</p>
                <p className="text-sm text-emerald-500/70 mt-2">Todo en paz. Buen trabajo, Head Coach.</p>
              </div>
            )}

            {/* Historial Resuelto */}
            {resolvedClaims.length > 0 && (
              <div className="mt-12">
                <h4 className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle2 size={14} /> Historial Resuelto (Últimos {resolvedClaims.length})
                </h4>
                <div className="flex flex-col gap-2 opacity-60">
                  {resolvedClaims.map(ticket => (
                    <div key={ticket.id} className="bg-white dark:bg-black/5 dark:bg-white/5 rounded-xl p-4 flex items-center justify-between border border-black/5 dark:border-white/5">
                      <div>
                        <span className="text-emerald-400 font-bold mr-3 line-through">{ticket.clientName}</span>
                        <span className="text-slate-600 dark:text-gray-400 text-sm">{ticket.issue}</span>
                      </div>
                      <button onClick={() => deleteItem('claims', ticket.id)} className="text-gray-600 hover:text-red-500 ml-4"><Plus className="rotate-45" size={16}/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
