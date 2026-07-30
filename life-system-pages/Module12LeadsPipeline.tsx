'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus, Filter, Phone, ArrowRight, UserCheck, XCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Lead } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

type LocalLeadStatus = Lead['status'];

export function Module12LeadsPipeline() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LocalLeadStatus | 'todos'>('todos');

  useEffect(() => {
    const db = getCRMDatabase();
    setLeads(db.leads || []);
  }, []);

  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    const db = getCRMDatabase();
    db.leads = newLeads;
    saveCRMDatabase(db);
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'todos' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: LocalLeadStatus) => {
    switch(status) {
      case 'new': return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><Clock size={12} /> Nuevo</span>;
      case 'contacted': return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><Phone size={12} /> Contactado</span>;
      case 'appointment_set': return <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><Clock size={12} /> Cita Agendada</span>;
      case 'trial': return <span className="px-2 py-1 bg-temple-gold/20 text-temple-gold border border-temple-gold/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><ArrowRight size={12} /> En Prueba (F1)</span>;
      case 'enrolled': return <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><UserCheck size={12} /> Inscrito (F1)</span>;
      case 'lost': return <span className="px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><XCircle size={12} /> Perdido (F2)</span>;
    }
  };

  const addLead = () => {
    const name = prompt('Nombre del prospecto:');
    if (!name) return;
    const phone = prompt('Celular:');
    if (!phone) return;

    const newLead: Lead = {
      id: 'ld-' + Date.now(),
      name,
      phone,
      source: 'instagram',
      status: 'new',
      dateAdded: new Date().toISOString().split('T')[0],
      notes: 'Lead creado manualmente'
    };

    saveLeads([newLead, ...leads]);
  };

  const updateLeadStatus = (id: string, newStatus: LocalLeadStatus) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    saveLeads(updated);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-temple-navy-dark to-black p-6 rounded-xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Users size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="text-temple-gold" size={24} />
              Pipeline de Prospectos
            </h2>
            <p className="text-sm text-gray-400 mt-1">Gestión de leads desde el primer contacto hasta la inscripción.</p>
          </div>
          
          <button onClick={addLead} className="flex items-center gap-2 px-6 py-3 bg-temple-gold text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-temple-gold-bright transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] w-max">
            <Plus size={18} />
            Nuevo Prospecto
          </button>
        </div>
      </div>

      <motion.div variants={item}>
        <Card className="bg-black/40 border-white/5">
          <CardContent className="!p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 text-gray-500" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar prospecto por nombre o teléfono..." 
                  className="w-full pl-10 py-2.5 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold/50 rounded-xl"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-[#121826] border border-white/10 rounded-xl px-3 py-2">
                  <Filter size={14} className="text-gray-400" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-transparent text-sm text-white focus:outline-none"
                  >
                    <option className="bg-[#121826] text-white" value="todos">Todos los Estados</option>
                    <option className="bg-[#121826] text-white" value="new">Nuevos</option>
                    <option className="bg-[#121826] text-white" value="contacted">Contactados</option>
                    <option className="bg-[#121826] text-white" value="trial">En Prueba</option>
                    <option className="bg-[#121826] text-white" value="enrolled">Inscritos</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                    <th className="pb-3 pl-4">Prospecto</th>
                    <th className="pb-3">Contacto</th>
                    <th className="pb-3">Origen</th>
                    <th className="pb-3">Estado</th>
                    <th className="pb-3 text-right pr-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <motion.tr variants={item} key={lead.id} className="hover:bg-white/5 transition group">
                      <td className="py-4 pl-4">
                        <p className="text-sm font-bold text-white">{lead.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Ingresó: {lead.dateAdded}</p>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Phone size={14} className="text-temple-gold" />
                          {lead.phone}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-xs text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                          {lead.source}
                        </span>
                      </td>
                      <td className="py-4">
                        {getStatusBadge(lead.status)}
                        <p className="text-[10px] text-gray-500 mt-2 line-clamp-1 max-w-[150px]" title={lead.notes}>{lead.notes}</p>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {lead.status === 'new' && (
                            <button onClick={() => updateLeadStatus(lead.id, 'contacted')} className="px-3 py-1 bg-white/5 hover:bg-temple-gold hover:text-black border border-white/10 hover:border-temple-gold text-xs font-bold uppercase tracking-wider text-gray-300 rounded transition-all">
                              Contactado
                            </button>
                          )}
                          {lead.status === 'contacted' && (
                            <button onClick={() => updateLeadStatus(lead.id, 'trial')} className="px-3 py-1 bg-white/5 hover:bg-temple-gold hover:text-black border border-white/10 hover:border-temple-gold text-xs font-bold uppercase tracking-wider text-gray-300 rounded transition-all">
                              A Prueba
                            </button>
                          )}
                          {lead.status === 'trial' && (
                            <button onClick={() => updateLeadStatus(lead.id, 'enrolled')} className="px-3 py-1 bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 hover:border-emerald-500 text-xs font-bold uppercase tracking-wider text-gray-300 rounded transition-all">
                              Inscribir
                            </button>
                          )}
                          {lead.status !== 'lost' && lead.status !== 'enrolled' && (
                            <button onClick={() => updateLeadStatus(lead.id, 'lost')} className="px-3 py-1 bg-white/5 hover:bg-red-500 hover:text-white border border-white/10 hover:border-red-500 text-xs font-bold uppercase tracking-wider text-gray-300 rounded transition-all">
                              Perdido
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-500 text-sm">
                        No se encontraron prospectos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
