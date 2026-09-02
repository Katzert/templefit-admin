'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Phone, 
  ArrowRight, 
  UserCheck, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Trash2, 
  Sparkles,
  Edit3,
  X,
  Check,
  Save
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Lead, Student } from '../types';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

type LocalLeadStatus = Lead['status'];

interface Module12LeadsPipelineProps {
  onNavigate?: (tab: string) => void;
}

export function Module12LeadsPipeline({ onNavigate }: Module12LeadsPipelineProps) {
  const { setSelectedStudent } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LocalLeadStatus | 'todos'>('todos');
  
  // Modal State (Add or Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '+591 ',
    source: 'instagram' as Lead['source'],
    notes: '',
    status: 'new' as LocalLeadStatus
  });

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

  const isSaturday = new Date().getDay() === 6;

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'todos' || l.status === statusFilter;
    
    // Regla de 14 días (Costo Hundido)
    const leadDate = new Date(l.dateAdded);
    const daysSinceAdded = (new Date().getTime() - leadDate.getTime()) / (1000 * 3600 * 24);
    const isStale = (l.status === 'new' || l.status === 'contacted' || l.status === 'trial') && daysSinceAdded > 14;
    const isVisible = searchTerm ? true : !isStale; // Ocultar por defecto si es viejo, a menos que se busque

    return matchesSearch && matchesStatus && isVisible;
  });

  const getStatusBadge = (status: LocalLeadStatus) => {
    switch(status) {
      case 'new': return <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><Clock size={12} /> Nuevo</span>;
      case 'contacted': return <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><Phone size={12} /> Contactado</span>;
      case 'appointment_set': return <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><Clock size={12} /> Cita Agendada</span>;
      case 'trial': return <span className="px-2.5 py-1 bg-temple-gold/20 text-temple-gold border border-temple-gold/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><ArrowRight size={12} /> En Prueba (F1)</span>;
      case 'enrolled': return <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><UserCheck size={12} /> Inscrito (F1)</span>;
      case 'lost': return <span className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 w-max"><XCircle size={12} /> Perdido</span>;
    }
  };

  const handleOpenAddModal = () => {
    setEditingLeadId(null);
    setLeadForm({ name: '', phone: '+591 ', source: 'instagram', notes: '', status: 'new' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead: Lead) => {
    setEditingLeadId(lead.id);
    setLeadForm({
      name: lead.name,
      phone: lead.phone,
      source: lead.source,
      notes: lead.notes,
      status: lead.status
    });
    setIsModalOpen(true);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name) return;

    if (editingLeadId) {
      const updated = leads.map(l => l.id === editingLeadId ? {
        ...l,
        name: leadForm.name,
        phone: leadForm.phone,
        source: leadForm.source,
        notes: leadForm.notes,
        status: leadForm.status
      } : l);
      saveLeads(updated);
    } else {
      const lead: Lead = {
        id: 'ld-' + Date.now(),
        name: leadForm.name,
        phone: leadForm.phone,
        source: leadForm.source,
        status: leadForm.status,
        dateAdded: new Date().toISOString().split('T')[0],
        notes: leadForm.notes || 'Prospecto captado por canales digitales'
      };
      saveLeads([lead, ...leads]);
    }

    setIsModalOpen(false);
    setEditingLeadId(null);
    setLeadForm({ name: '', phone: '+591 ', source: 'instagram', notes: '', status: 'new' });
  };

  const updateLeadStatus = (id: string, newStatus: LocalLeadStatus) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    saveLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    if (!confirm('¿Eliminar este prospecto del CRM?')) return;
    saveLeads(leads.filter(l => l.id !== id));
  };

  // Convert Lead to Official Athlete
  const handleConvertToAthlete = (lead: Lead) => {
    const db = getCRMDatabase();
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      name: lead.name,
      phone: lead.phone,
      email: `${lead.name.toLowerCase().replace(/\s+/g, '.')}@templefit.com`,
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Reto 21 Días',
      startDate: new Date().toISOString().split('T')[0],
      renewalDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      physicalGoal: 'Ganar disciplina y acondicionamiento inicial',
      weightKg: 70,
      workoutLevel: 'Principiante',
      nutritionPlan: 'ElectroHidra + Nutrición Anti-inflamatoria',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Inicio de hábitos y devocional 06:00 AM',
      mentorshipNotes: `Convertido desde CRM Prospectos (${lead.source}). Notas: ${lead.notes}`,
      escuadronId: 'Paz-Alfa',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: false, merchandise: false, preventiveMedicine: false }
    };

    db.students = [newStudent, ...(db.students || [])];
    
    // Auto-generar asiento contable de inscripción en caja (Bs. 200)
    const initialTx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: 'income' as const,
      category: 'membership' as const,
      amount: 200,
      description: `Inscripción Reto 21 Días - ${lead.name}`
    };
    db.transactions = [initialTx, ...(db.transactions || [])];

    // Update lead status to enrolled
    db.leads = leads.map(l => l.id === lead.id ? { ...l, status: 'enrolled' as const } : l);
    saveCRMDatabase(db);
    setLeads(db.leads);

    setSelectedStudent(newStudent);
    onNavigate?.('profile');
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-temple-navy dark:text-white p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Users size={140} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Contactos & Prospectos
              </span>
              <span className="text-xs text-slate-600 dark:text-gray-400 font-bold">Total: {leads.length} personas</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-temple-navy dark:text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="text-temple-gold" size={26} />
              Seguimiento de Prospectos
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 mt-1">
              Registro y coordinación con personas interesadas en sumarse a los entrenamientos.
            </p>
          </div>
          
          <button 
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold text-black rounded-xl font-extrabold hover:bg-amber-400 transition-all uppercase tracking-wider text-xs shadow-lg shadow-temple-gold/20 w-max"
          >
            <Plus size={18} /> Nuevo Prospecto
          </button>
        </div>
      </div>

      {isSaturday && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center justify-center gap-3">
          <XCircle className="text-red-400" size={20} />
          <p className="text-sm font-bold text-red-400 uppercase tracking-wider">
            Día Comunitario: Prohibido Vender. Acciones comerciales bloqueadas hoy Sábado.
          </p>
        </div>
      )}

      {/* Main Content Card */}
      <motion.div variants={item}>
        <Card className="bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl border-black/10 dark:border-white/10 shadow-2xl">
          <CardContent className="!p-6">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-black/10 dark:border-white/10 pb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-3 text-slate-600 dark:text-gray-400" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar prospecto por nombre o teléfono..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-black/[0.03] dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-temple-navy dark:text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold/50 rounded-xl text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 bg-black/[0.03] dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2">
                <Filter size={14} className="text-temple-gold" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-temple-navy dark:text-temple-navy dark:text-white focus:outline-none cursor-pointer"
                >
                  <option className="bg-white dark:bg-[#0E1424] text-white" value="todos">Estado: Todos</option>
                  <option className="bg-white dark:bg-[#0E1424] text-white" value="new">Nuevos</option>
                  <option className="bg-white dark:bg-[#0E1424] text-white" value="contacted">Contactados</option>
                  <option className="bg-white dark:bg-[#0E1424] text-white" value="appointment_set">Cita Agendada</option>
                  <option className="bg-white dark:bg-[#0E1424] text-white" value="trial">En Prueba (F1)</option>
                  <option className="bg-white dark:bg-[#0E1424] text-white" value="enrolled">Inscritos (F1)</option>
                  <option className="bg-white dark:bg-[#0E1424] text-white" value="lost">Perdidos</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-gray-400">
                    <th className="pb-3 pl-4 font-black">Prospecto</th>
                    <th className="pb-3 font-black">Origen & Fecha</th>
                    <th className="pb-3 font-black">Estado del Embudo</th>
                    <th className="pb-3 font-black">Notas / Seguimiento</th>
                    <th className="pb-3 text-right pr-4 font-black">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-black/5 dark:bg-white/5 transition group">
                      <td className="py-4 pl-4">
                        <p className="text-sm font-bold text-slate-800 dark:text-temple-navy dark:text-white group-hover:text-temple-gold transition">{lead.name}</p>
                        <p className="text-xs text-slate-600 dark:text-gray-400 tabular-nums">{lead.phone}</p>
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[10px] uppercase font-bold text-temple-gold">
                          {lead.source}
                        </span>
                        <p className="text-[10px] text-slate-500 dark:text-gray-500 mt-1">{lead.dateAdded}</p>
                      </td>
                      <td className="py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LocalLeadStatus)}
                          className="bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 text-xs font-bold text-temple-navy dark:text-temple-navy dark:text-white rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-temple-gold/50 cursor-pointer"
                        >
                          <option className="bg-white dark:bg-[#121826]" value="new">Nuevo</option>
                          <option className="bg-white dark:bg-[#121826]" value="contacted">Contactado</option>
                          <option className="bg-white dark:bg-[#121826]" value="appointment_set">Cita Agendada</option>
                          <option className="bg-white dark:bg-[#121826]" value="trial">En Prueba (F1)</option>
                          <option className="bg-white dark:bg-[#121826]" value="enrolled">Inscrito (F1)</option>
                          <option className="bg-white dark:bg-[#121826]" value="lost">Perdido</option>
                        </select>
                      </td>
                      <td className="py-4 max-w-xs">
                        <p className="text-xs text-slate-700 dark:text-gray-300 truncate" title={lead.notes}>{lead.notes}</p>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isSaturday ? (
                            <span className="text-[10px] text-red-400/50 uppercase font-bold px-2" title="Bloqueado por Sábado">Bloqueado</span>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="text-[8px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-widest mb-1">
                                {lead.status === 'new' ? 'Mañana' : lead.status === 'contacted' ? 'Tarde' : 'Noche'}
                              </span>
                              <a
                                href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '') || '59170000000'}?text=${encodeURIComponent(
                                  `Hola ${lead.name}, te saluda Paulo de TempleFit. ¿Cómo estás? Te escribo para coordinar tu clase de prueba este sábado a las 6:00 AM.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition"
                                title="Chat WhatsApp"
                              >
                                <MessageSquare size={15} />
                              </a>
                            </div>
                          )}

                          <button
                            onClick={() => handleOpenEditModal(lead)}
                            className="p-2 text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 rounded-lg transition"
                            title="Editar Prospecto"
                          >
                            <Edit3 size={15} />
                          </button>

                          <button
                            onClick={() => handleConvertToAthlete(lead)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-temple-gold text-black rounded-lg text-xs font-bold hover:bg-amber-400 transition shadow-sm"
                            title="Convertir a Atleta Oficial con Ficha"
                          >
                            <Sparkles size={13} />
                            <span>Crear Atleta</span>
                          </button>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 text-slate-500 dark:text-gray-500 hover:text-red-400 transition"
                            title="Eliminar Lead"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <Users size={32} className="text-gray-600 mx-auto mb-3" />
                        <p className="text-slate-600 dark:text-gray-400 font-bold">No hay prospectos en esta vista.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t border-black/10 dark:border-white/10 font-black text-temple-navy dark:text-temple-navy dark:text-white text-xs">
                    <td className="py-4 pl-4 uppercase tracking-wider text-temple-gold tabular-nums">
                      Total: {filteredLeads.length} Prospectos
                    </td>
                    <td className="py-4 text-slate-700 dark:text-gray-300 tabular-nums text-[11px]">
                      {filteredLeads.filter(l => l.source === 'instagram').length} IG • {filteredLeads.filter(l => l.source === 'whatsapp').length} WA • {filteredLeads.filter(l => l.source === 'referral').length} Ref
                    </td>
                    <td className="py-4 tabular-nums text-emerald-400">
                      {filteredLeads.filter(l => l.status === 'enrolled').length} Inscritos ({filteredLeads.length > 0 ? Math.round((filteredLeads.filter(l => l.status === 'enrolled').length / filteredLeads.length) * 100) : 0}% Conv.)
                    </td>
                    <td className="py-4 tabular-nums text-temple-gold font-bold">
                      Reto 21D: Bs. {(filteredLeads.filter(l => l.status === 'enrolled').length * 200).toLocaleString()}
                    </td>
                    <td className="py-4 pr-4 text-right text-slate-600 dark:text-gray-400 text-[10px] uppercase font-bold">
                      Control F1 a F3
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal Nuevo / Editar Prospecto */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#121826] border border-temple-gold/40 rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-temple-gold/10 text-temple-gold border border-temple-gold/30">
                    {editingLeadId ? <Edit3 size={18} /> : <Plus size={18} />}
                  </div>
                  <h3 id="lead-modal-title" className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider">
                    {editingLeadId ? 'Editar Prospecto' : 'Nuevo Prospecto'}
                  </h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="p-1.5 text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white transition rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
                  aria-label="Cerrar modal de prospecto"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div>
                  <label htmlFor="lead-fullname" className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Nombre Completo *</label>
                  <input 
                    id="lead-fullname"
                    type="text" 
                    required
                    aria-required="true"
                    autoComplete="name"
                    placeholder="Ej. Andrés Morales"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                    value={leadForm.name}
                    onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="lead-phone" className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Celular / WhatsApp *</label>
                  <input 
                    id="lead-phone"
                    type="tel" 
                    required
                    aria-required="true"
                    autoComplete="tel"
                    placeholder="+591 71234567"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                    value={leadForm.phone}
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="lead-source" className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Canal de Origen</label>
                    <select 
                      id="lead-source"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-temple-gold/50 cursor-pointer"
                      value={leadForm.source}
                      onChange={e => setLeadForm({ ...leadForm, source: e.target.value as any })}
                    >
                      <option className="bg-white dark:bg-[#121826]" value="instagram">Instagram</option>
                      <option className="bg-white dark:bg-[#121826]" value="whatsapp">WhatsApp Directo</option>
                      <option className="bg-white dark:bg-[#121826]" value="referral">Recomendación</option>
                      <option className="bg-white dark:bg-[#121826]" value="walk-in">Visita Presencial</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="lead-status" className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Estado</label>
                    <select 
                      id="lead-status"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-temple-gold/50 cursor-pointer"
                      value={leadForm.status}
                      onChange={e => setLeadForm({ ...leadForm, status: e.target.value as any })}
                    >
                      <option className="bg-white dark:bg-[#121826]" value="new">Nuevo</option>
                      <option className="bg-white dark:bg-[#121826]" value="contacted">Contactado</option>
                      <option className="bg-white dark:bg-[#121826]" value="appointment_set">Cita Agendada</option>
                      <option className="bg-white dark:bg-[#121826]" value="trial">En Prueba (F1)</option>
                      <option className="bg-white dark:bg-[#121826]" value="enrolled">Inscrito (F1)</option>
                      <option className="bg-white dark:bg-[#121826]" value="lost">Perdido</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-notes" className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Notas / Objetivo</label>
                  <textarea 
                    id="lead-notes"
                    rows={2}
                    placeholder="Interesado en Reto 21 Días, Crossfit o Neuro-Ventas..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                    value={leadForm.notes}
                    onChange={e => setLeadForm({ ...leadForm, notes: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white uppercase tracking-wider transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-temple-gold text-black rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-amber-400 transition shadow-lg shadow-temple-gold/20 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <Check size={16} /> Guardar Cambios
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
