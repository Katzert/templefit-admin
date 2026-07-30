'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Megaphone, FileText, HelpCircle, Save, Plus, ChevronDown, ChevronRight, CheckCircle2, Clock, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { MarketingTask, SOPItem, ClaimTicket } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

type Tab = 'marketing' | 'sops' | 'claims';

export function Module19SOPs() {
  const [activeTab, setActiveTab] = useState<Tab>('sops');
  
  const [marketingTasks, setMarketingTasks] = useState<MarketingTask[]>([]);
  const [sopsList, setSopsList] = useState<SOPItem[]>([]);
  const [claimsTickets, setClaimsTickets] = useState<ClaimTicket[]>([]);
  
  const [expandedSop, setExpandedSop] = useState<string | null>(null);

  useEffect(() => {
    const db = getCRMDatabase();
    setMarketingTasks(db.marketingTasks || []);
    setSopsList(db.sopsList || []);
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
      month: 'Nuevo Mes',
      campaignName: 'Nueva Campaña',
      driveLink: '',
      strategy: 'Estrategia de contenidos...'
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
      title: 'Nuevo Procedimiento',
      content: 'Paso 1...\nPaso 2...'
    };
    saveToDb(undefined, [...sopsList, newSop], undefined);
  };

  const updateSop = (id: string, field: keyof SOPItem, value: string) => {
    const updated = sopsList.map(t => t.id === id ? { ...t, [field]: value } : t);
    saveToDb(undefined, updated, undefined);
  };

  const addClaim = () => {
    const newClaim: ClaimTicket = {
      id: 'tck-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      clientName: 'Nombre del cliente',
      issue: 'Descripción del reclamo',
      status: 'pending',
      resolution: ''
    };
    saveToDb(undefined, undefined, [newClaim, ...claimsTickets]);
  };

  const updateClaim = (id: string, field: keyof ClaimTicket, value: string) => {
    const updated = claimsTickets.map(t => t.id === id ? { ...t, [field]: value } : t);
    saveToDb(undefined, undefined, updated);
  };

  const deleteItem = (type: Tab, id: string) => {
    if (!confirm('¿Eliminar este elemento?')) return;
    if (type === 'marketing') saveToDb(marketingTasks.filter(t => t.id !== id), undefined, undefined);
    if (type === 'sops') saveToDb(undefined, sopsList.filter(t => t.id !== id), undefined);
    if (type === 'claims') saveToDb(undefined, undefined, claimsTickets.filter(t => t.id !== id));
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-gradient-to-br from-temple-navy-dark via-black to-black p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BookOpen size={180} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <BookOpen className="text-temple-gold" size={32} />
            SOPs & Estrategia
          </h2>
          <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest">
            Centro de Comando Operativo, Marketing y Soporte
          </p>
        </div>
        
        {/* Tabs */}
        <div className="relative z-10 flex bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto overflow-x-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab('sops')}
            className={`flex-1 md:flex-none flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'sops' ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <FileText size={16} /> SOPs
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`flex-1 md:flex-none flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'marketing' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Megaphone size={16} /> Marketing
          </button>
          <button 
            onClick={() => setActiveTab('claims')}
            className={`flex-1 md:flex-none flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'claims' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <HelpCircle size={16} /> Reclamos
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* SOPS TAB */}
        {activeTab === 'sops' && (
          <motion.div key="sops" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">Procedimientos Operativos</h3>
              <button onClick={addSop} className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-colors">
                <Plus size={16} /> Añadir SOP
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {sopsList.map((sop) => (
                <div key={sop.id} className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden transition-all hover:bg-white/[0.05]">
                  <div 
                    onClick={() => setExpandedSop(expandedSop === sop.id ? null : sop.id)}
                    className="p-4 flex items-center justify-between cursor-pointer select-none"
                  >
                    <input 
                      value={sop.title} 
                      onChange={e => updateSop(sop.id, 'title', e.target.value)}
                      onClick={e => e.stopPropagation()}
                      className="bg-transparent text-white font-bold text-lg focus:outline-none w-full"
                    />
                    <div className="flex items-center gap-4">
                      {expandedSop === sop.id ? <ChevronDown size={20} className="text-temple-gold" /> : <ChevronRight size={20} className="text-gray-500" />}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSop === sop.id && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="p-4 border-t border-white/5 bg-black/20">
                          <textarea
                            value={sop.content}
                            onChange={e => updateSop(sop.id, 'content', e.target.value)}
                            className="w-full bg-transparent text-gray-300 min-h-[200px] focus:outline-none resize-none leading-relaxed"
                            placeholder="Escribe el procedimiento paso a paso..."
                          />
                          <div className="flex justify-end mt-4">
                            <button onClick={() => deleteItem('sops', sop.id)} className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest">
                              Eliminar SOP
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {sopsList.length === 0 && <p className="text-gray-500 text-sm p-4 text-center">No hay procedimientos definidos.</p>}
            </div>
          </motion.div>
        )}

        {/* MARKETING TAB */}
        {activeTab === 'marketing' && (
          <motion.div key="mkt" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">Campañas & Redes</h3>
              <button onClick={addMarketingTask} className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-500/30 transition-colors border border-blue-500/50">
                <Plus size={16} /> Añadir Campaña
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketingTasks.map((task) => (
                <Card key={task.id} className="bg-black/40 border-white/5 border-l-4 border-l-blue-500">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <input 
                        value={task.month} 
                        onChange={e => updateMarketingTask(task.id, 'month', e.target.value)}
                        className="bg-transparent text-blue-400 font-black uppercase tracking-widest text-xs focus:outline-none w-1/2"
                      />
                      <button onClick={() => deleteItem('marketing', task.id)} className="text-gray-500 hover:text-red-400"><Save size={14} className="opacity-0"/>Eliminar</button>
                    </div>
                    
                    <input 
                      value={task.campaignName} 
                      onChange={e => updateMarketingTask(task.id, 'campaignName', e.target.value)}
                      className="bg-transparent text-white font-bold text-xl focus:outline-none w-full"
                      placeholder="Nombre de Campaña"
                    />
                    
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                      <LinkIcon size={14} className="text-gray-400" />
                      <input 
                        value={task.driveLink} 
                        onChange={e => updateMarketingTask(task.id, 'driveLink', e.target.value)}
                        className="bg-transparent text-blue-300 text-sm focus:outline-none w-full"
                        placeholder="Link de Drive / Canva"
                      />
                    </div>

                    <textarea
                      value={task.strategy}
                      onChange={e => updateMarketingTask(task.id, 'strategy', e.target.value)}
                      className="w-full bg-transparent text-gray-400 text-sm min-h-[100px] focus:outline-none resize-none leading-relaxed mt-2"
                      placeholder="Describe la estrategia de contenidos..."
                    />
                  </CardContent>
                </Card>
              ))}
              {marketingTasks.length === 0 && <p className="text-gray-500 text-sm p-4 col-span-2 text-center">No hay campañas registradas.</p>}
            </div>
          </motion.div>
        )}

        {/* CLAIMS TAB */}
        {activeTab === 'claims' && (
          <motion.div key="claims" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">Help Desk & Reclamos</h3>
              <button onClick={addClaim} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-500/30 transition-colors border border-red-500/50">
                <Plus size={16} /> Nuevo Ticket
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {claimsTickets.map((ticket) => (
                <div key={ticket.id} className={`p-5 rounded-xl border flex flex-col md:flex-row gap-4 transition-all ${ticket.status === 'resolved' ? 'bg-emerald-900/10 border-emerald-500/20 opacity-70' : 'bg-red-900/10 border-red-500/30'}`}>
                  
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300 font-mono">{ticket.date}</span>
                      <select 
                        value={ticket.status}
                        onChange={e => updateClaim(ticket.id, 'status', e.target.value)}
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded outline-none ${ticket.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="resolved">Resuelto</option>
                      </select>
                    </div>
                    
                    <input 
                      value={ticket.clientName} 
                      onChange={e => updateClaim(ticket.id, 'clientName', e.target.value)}
                      className="bg-transparent text-white font-bold text-lg focus:outline-none w-full mt-1"
                      placeholder="Nombre del Cliente"
                    />
                    
                    <input 
                      value={ticket.issue} 
                      onChange={e => updateClaim(ticket.id, 'issue', e.target.value)}
                      className="bg-transparent text-gray-300 text-sm focus:outline-none w-full"
                      placeholder="¿Cuál es el problema?"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-4">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} /> Resolución
                    </span>
                    <textarea
                      value={ticket.resolution}
                      onChange={e => updateClaim(ticket.id, 'resolution', e.target.value)}
                      className="w-full bg-white/5 rounded-lg p-3 text-gray-300 text-sm h-full min-h-[80px] focus:outline-none resize-none border border-white/5 focus:border-white/20"
                      placeholder="¿Cómo se solucionó o solucionará?"
                    />
                  </div>

                  <div className="flex items-start">
                    <button onClick={() => deleteItem('claims', ticket.id)} className="p-2 text-gray-500 hover:text-red-400 transition bg-white/5 rounded-lg">
                      <Plus size={16} className="rotate-45" />
                    </button>
                  </div>

                </div>
              ))}
              {claimsTickets.length === 0 && <p className="text-gray-500 text-sm p-4 text-center">No hay tickets activos.</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
