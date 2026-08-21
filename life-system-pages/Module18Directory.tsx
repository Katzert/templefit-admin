'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Users, 
  Filter, 
  ArrowRight, 
  ShieldCheck, 
  Dumbbell, 
  CalendarClock, 
  Plus, 
  MessageSquare, 
  X, 
  Check, 
  Trash2,
  Edit3,
  Save,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Flame,
  Award,
  Phone
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Student } from '../types';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };

interface Module18DirectoryProps {
  onNavigate: (tab: string) => void;
}

export function Module18Directory({ onNavigate }: Module18DirectoryProps) {
  const { students, setSelectedStudent } = useAuth();
  const [localStudents, setLocalStudents] = useState<Student[]>(students);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Modal state (Add or Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [athleteForm, setAthleteForm] = useState<Partial<Student>>({
    name: '',
    phone: '+591 ',
    email: '',
    instructorAssigned: 'Paulo (Head Coach)',
    status: 'active',
    plan: 'Reto 21 Días',
    escuadronId: 'Alfa-1',
    phase: '1 - Iniciación',
    physicalGoal: 'Ganar fuerza y reducir grasa',
    spiritualIntention: 'Consistencia en devocionales diarios y oración 06:00 AM',
    workoutLevel: 'Principiante',
    weightKg: 70,
    renewalDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]
  });

  React.useEffect(() => {
    loadStudents();
  }, [students]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadStudents = () => {
    const db = getCRMDatabase();
    setLocalStudents(db.students || []);
  };

  const saveStudents = (newStudents: Student[], msg?: string) => {
    setLocalStudents(newStudents);
    const db = getCRMDatabase();
    db.students = newStudents;
    saveCRMDatabase(db);
    if (msg) showToast(msg);
  };

  // Cálculo de diagnóstico de renovación
  const getRenewalStatus = (renewalDateStr?: string) => {
    if (!renewalDateStr) return { status: 'unknown', text: 'Sin fecha', days: 0, color: 'text-gray-400' };
    const renewal = new Date(renewalDateStr);
    const now = new Date();
    // Comparar a nivel de días
    const diffTime = renewal.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { 
        status: 'expired', 
        text: `Venció hace ${Math.abs(diffDays)}d`, 
        days: diffDays, 
        badge: 'bg-temple-red/20 text-temple-red border-temple-red/40',
        icon: <AlertTriangle size={12} />
      };
    } else if (diffDays <= 5) {
      return { 
        status: 'expiring', 
        text: `Vence en ${diffDays}d`, 
        days: diffDays, 
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        icon: <Clock size={12} />
      };
    } else {
      return { 
        status: 'active', 
        text: `Activo (${diffDays}d)`, 
        days: diffDays, 
        badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        icon: <CheckCircle2 size={12} />
      };
    }
  };

  const filteredStudents = useMemo(() => {
    return localStudents.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm) ||
        student.escuadronId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesPhase = phaseFilter === 'all' || student.phase.startsWith(phaseFilter);

      return matchesSearch && matchesStatus && matchesPhase;
    });
  }, [localStudents, searchTerm, statusFilter, phaseFilter]);

  const handleOpenAddModal = () => {
    setEditingStudentId(null);
    setAthleteForm({
      name: '',
      phone: '+591 ',
      email: '',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Reto 21 Días',
      escuadronId: 'Alfa-1',
      phase: '1 - Iniciación',
      physicalGoal: 'Ganar fuerza y reducir grasa',
      spiritualIntention: 'Consistencia en devocionales diarios y oración',
      workoutLevel: 'Principiante',
      weightKg: 70,
      renewalDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setEditingStudentId(student.id);
    setAthleteForm({
      ...student,
      weightKg: Number(student.weightKg) || 70,
    });
    setIsModalOpen(true);
  };

  const handleSubmitAthlete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteForm.name) return;

    if (editingStudentId) {
      // Edit existing
      const updated = localStudents.map(s => {
        if (s.id === editingStudentId) {
          return {
            ...s,
            ...athleteForm,
            name: athleteForm.name!.trim(),
            weightKg: Number(athleteForm.weightKg) || s.weightKg,
            phase: athleteForm.phase as Student['phase'],
            status: athleteForm.status as Student['status'],
          } as Student;
        }
        return s;
      });
      saveStudents(updated, '¡Ficha de atleta actualizada correctamente!');
    } else {
      // Create new
      const student: Student = {
        id: `std-${Date.now()}`,
        name: athleteForm.name!.trim(),
        phone: athleteForm.phone || '+591',
        email: athleteForm.email || `${athleteForm.name!.toLowerCase().replace(/\s+/g, '.')}@templefit.com`,
        instructorAssigned: athleteForm.instructorAssigned || 'Paulo (Head Coach)',
        status: (athleteForm.status as any) || 'active',
        plan: (athleteForm.plan as any) || 'Reto 21 Días',
        startDate: new Date().toISOString().split('T')[0],
        renewalDate: athleteForm.renewalDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        physicalGoal: athleteForm.physicalGoal || 'Definir objetivo físico',
        weightKg: Number(athleteForm.weightKg) || 70,
        workoutLevel: (athleteForm.workoutLevel as any) || 'Principiante',
        nutritionPlan: 'Plan Base Anti-inflamatorio + Proteína Limpia',
        allergiesOrRestrictions: 'Ninguna',
        spiritualIntention: athleteForm.spiritualIntention || 'Fortaleza y devoción diaria',
        mentorshipNotes: 'Atleta ingresado al sistema.',
        escuadronId: athleteForm.escuadronId || 'Alfa-1',
        phase: (athleteForm.phase as any) || '1 - Iniciación',
        hubConsumption: { snackBar: false, merchandise: false, preventiveMedicine: false }
      };
      saveStudents([student, ...localStudents], '¡Nuevo atleta inscrito en el directorio!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`¿Eliminar la ficha de ${name} del sistema?`)) {
      saveStudents(localStudents.filter(s => s.id !== id), 'Atleta eliminado del directorio');
    }
  };

  const handleSendWhatsApp = (student: Student) => {
    const ren = getRenewalStatus(student.renewalDate);
    const cleanPhone = student.phone?.replace(/[^0-9]/g, '');
    let msg = `¡Hola ${student.name}! Te saluda el Head Coach Paulo de TempleFit.`;
    if (ren.status === 'expired') {
      msg = `¡Hola ${student.name}! Te escribimos de TempleFit para recordarte que tu membresía venció. ¿Coordinamos tu renovación para mantener la racha de tu escuadrón?`;
    } else if (ren.status === 'expiring') {
      msg = `¡Hola ${student.name}! Recordatorio de TempleFit: tu ciclo de entrenamiento vence en ${ren.days} días. ¡Asegura tu cupo en tu escuadrón!`;
    }
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans">
      
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

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0E1424] via-[#0B0F19] to-black p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Users size={140} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Directorio Oficial 2026
              </span>
              <span className="text-xs text-gray-400 font-bold">Total: {localStudents.length} Atletas</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="text-temple-gold" size={26} />
              Expedientes & Escuadrones
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Fichas holísticas integradas: Métricas físicas, renovación de membresías, asignación de escuadrones y fases.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold hover:bg-temple-gold-bright text-black rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-temple-gold/20 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Plus size={16} /> Inscribir Atleta
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0B0F19] p-3.5 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o escuadrón..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-temple-gold transition-colors text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-gray-300 focus:outline-none focus:border-temple-gold"
          >
            <option value="all">Estado: Todos</option>
            <option value="active">Activo</option>
            <option value="expiring">Por Vencer</option>
            <option value="paused">Pausado</option>
            <option value="graduated">Graduado</option>
          </select>

          {/* Phase Filter */}
          <select 
            value={phaseFilter}
            onChange={e => setPhaseFilter(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-gray-300 focus:outline-none focus:border-temple-gold"
          >
            <option value="all">Fase: Todas</option>
            <option value="1">Fase 1: Paz (Bronce)</option>
            <option value="2">Fase 2: Salvación (Plata)</option>
            <option value="3">Fase 3: Cristo (Oro)</option>
          </select>
        </div>
      </div>

      {/* Athlete Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredStudents.map(student => {
            const ren = getRenewalStatus(student.renewalDate);
            const phaseNum = student.phase.charAt(0);

            return (
              <motion.div
                key={student.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0B0F19] border border-white/10 hover:border-temple-gold/40 transition-all rounded-2xl p-5 flex flex-col justify-between shadow-xl group relative overflow-hidden"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-temple-gold/20 to-black border border-temple-gold/40 flex items-center justify-center font-serif font-black text-temple-gold text-base shrink-0 group-hover:scale-105 transition-transform">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white text-sm group-hover:text-temple-gold transition-colors">
                          {student.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                          <Phone size={10} /> {student.phone || 'Sin celular'}
                        </span>
                      </div>
                    </div>

                    {/* Phase Badge */}
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                      phaseNum === '1' 
                        ? 'bg-[#CD7F32]/10 text-[#CD7F32] border-[#CD7F32]/30'
                        : phaseNum === '2'
                        ? 'bg-[#C0C8D0]/10 text-[#C0C8D0] border-[#C0C8D0]/30'
                        : 'bg-temple-gold/20 text-temple-gold border-temple-gold/40'
                    }`}>
                      {phaseNum === '1' ? 'F1 Paz' : phaseNum === '2' ? 'F2 Gedeón' : 'F3 Cristo'}
                    </span>
                  </div>

                  {/* Physical & Squad Metrics */}
                  <div className="grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-xl border border-white/5 my-3 text-[11px]">
                    <div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase block">Escuadrón</span>
                      <span className="font-extrabold text-gray-200">{student.escuadronId || 'Sin asignar'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase block">Peso & Nivel</span>
                      <span className="font-extrabold text-temple-gold tabular-nums">{student.weightKg || 70} kg • {student.workoutLevel || 'Medio'}</span>
                    </div>
                  </div>

                  {/* Spiritual Intention & Goal */}
                  <p className="text-xs text-gray-400 italic line-clamp-2 mb-3 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                    "{student.physicalGoal || 'Plan de transformación física y mental'}"
                  </p>
                </div>

                {/* Footer Controls & Renewal Status */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${ren.badge}`}>
                    {ren.icon}
                    <span>{ren.text}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleSendWhatsApp(student)}
                      className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition"
                      title="Enviar WhatsApp de Seguimiento / Renovación"
                    >
                      <MessageSquare size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(student)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-temple-gold/20 text-gray-300 hover:text-temple-gold border border-white/10 transition"
                      title="Editar Ficha del Atleta"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStudent(student);
                        onNavigate('profile');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-temple-gold text-black font-extrabold text-[10px] uppercase tracking-wider hover:bg-temple-gold-bright transition shadow-sm"
                    >
                      Ficha
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(student.id, student.name)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-temple-red/20 text-gray-400 hover:text-temple-red border border-white/10 transition"
                      title="Eliminar del Directorio"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredStudents.length === 0 && (
        <div className="bg-[#0B0F19] border border-white/10 rounded-2xl p-12 text-center text-gray-500">
          <Users size={36} className="mx-auto mb-3 opacity-20" />
          <p className="text-xs font-bold uppercase tracking-wider">No se encontraron atletas con los filtros aplicados.</p>
          <button
            onClick={() => { setSearchTerm(''); setStatusFilter('all'); setPhaseFilter('all'); }}
            className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs uppercase font-bold transition"
          >
            Limpiar Filtros
          </button>
        </div>
      )}

      {/* MODAL EDITAR / INSCRIBIR ATLETA */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0B0F19] border border-temple-gold/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-temple-gold/20 text-temple-gold flex items-center justify-center border border-temple-gold/40 font-bold">
                    <User size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-black uppercase text-white">
                      {editingStudentId ? 'Editar Expediente de Atleta' : 'Inscribir Nuevo Atleta'}
                    </h3>
                    <p className="text-[10px] text-gray-400">Actualiza datos físicos, escuadrón y fechas de renovación</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmitAthlete} className="space-y-4">
                
                {/* Nombre y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={athleteForm.name || ''}
                      onChange={e => setAthleteForm({ ...athleteForm, name: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">WhatsApp / Celular *</label>
                    <input
                      type="text"
                      required
                      value={athleteForm.phone || ''}
                      onChange={e => setAthleteForm({ ...athleteForm, phone: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold"
                    />
                  </div>
                </div>

                {/* Fase y Escuadrón */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Fase Metodológica</label>
                    <select
                      value={athleteForm.phase}
                      onChange={e => setAthleteForm({ ...athleteForm, phase: e.target.value as any })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold"
                    >
                      <option value="1 - Iniciación">Fase 1: Brigada de Paz (Bronce)</option>
                      <option value="2 - Desarrollo">Fase 2: Brigada de Salvación (Plata)</option>
                      <option value="3 - Perfeccionamiento">Fase 3: Brigada de Cristo (Oro)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Escuadrón Asignado</label>
                    <input
                      type="text"
                      value={athleteForm.escuadronId || ''}
                      onChange={e => setAthleteForm({ ...athleteForm, escuadronId: e.target.value })}
                      placeholder="Ej. Alfa-1, Gedeón-2..."
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold font-bold"
                    />
                  </div>
                </div>

                {/* Estado y Fecha Renovación */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Estado de Membresía</label>
                    <select
                      value={athleteForm.status}
                      onChange={e => setAthleteForm({ ...athleteForm, status: e.target.value as any })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold"
                    >
                      <option value="active">🟢 Activo</option>
                      <option value="expiring">🟡 Por Vencer</option>
                      <option value="paused">⚪ Pausado</option>
                      <option value="graduated">🏆 Graduado</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block mb-1">Fecha de Renovación</label>
                    <input
                      type="date"
                      value={athleteForm.renewalDate || ''}
                      onChange={e => setAthleteForm({ ...athleteForm, renewalDate: e.target.value })}
                      className="w-full bg-black/60 border border-amber-500/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Peso y Nivel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Peso Corporal (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={athleteForm.weightKg || 70}
                      onChange={e => setAthleteForm({ ...athleteForm, weightKg: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Nivel Físico</label>
                    <select
                      value={athleteForm.workoutLevel}
                      onChange={e => setAthleteForm({ ...athleteForm, workoutLevel: e.target.value as any })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold"
                    >
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado / Atleta Pro</option>
                    </select>
                  </div>
                </div>

                {/* Objetivo Físico & Intención Espiritual */}
                <div>
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Meta Física</label>
                  <input
                    type="text"
                    value={athleteForm.physicalGoal || ''}
                    onChange={e => setAthleteForm({ ...athleteForm, physicalGoal: e.target.value })}
                    placeholder="Ej. Bajar grasa corporal y dominar dominadas..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block mb-1">Intención Espiritual / Hábitos</label>
                  <input
                    type="text"
                    value={athleteForm.spiritualIntention || ''}
                    onChange={e => setAthleteForm({ ...athleteForm, spiritualIntention: e.target.value })}
                    placeholder="Ej. Oración 06:00 AM y lectura bíblica diaria..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-temple-gold"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-temple-gold hover:bg-temple-gold-bright text-black rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg shadow-temple-gold/20 flex items-center gap-1.5"
                  >
                    <Save size={14} />
                    <span>Guardar Atleta</span>
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
