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
  Share2,
  Copy,
  CheckCircle2
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
  const [isRetentionModalOpen, setIsRetentionModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchToast, setBatchToast] = useState<string | null>(null);

  const squadsList = useMemo(() => {
    return Array.from(new Set(localStudents.map(s => s.escuadronId || 'Paz-Alfa'))).filter(Boolean);
  }, [localStudents]);

  const handleBatchAttendance = (squadId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const db = getCRMDatabase();
    let count = 0;
    db.students = (db.students || []).map(s => {
      if (s.escuadronId === squadId && s.status === 'active') {
        const history = s.attendanceHistory || [];
        if (!history.some(a => a.date === today && a.attended)) {
          history.unshift({ date: today, attended: true, notes: `Sesión grupal ${squadId} (06:00 AM)` });
          s.attendanceHistory = history;
          count++;
        }
      }
      return s;
    });
    saveCRMDatabase(db);
    setLocalStudents(db.students);
    setIsBatchModalOpen(false);
    setBatchToast(`¡Pase de lista completado! ${count} atleta(s) del escuadrón ${squadId} marcados presentes.`);
    setTimeout(() => setBatchToast(null), 3500);
  };

  // Squad WhatsApp Broadcast State
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [selectedBroadcastSquad, setSelectedBroadcastSquad] = useState('Paz-Alfa');
  const [copiedBroadcastIdx, setCopiedBroadcastIdx] = useState<number | null>(null);

  const [newAthlete, setNewAthlete] = useState<Partial<Student>>({
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
    heightM: 1.75,
    birthDate: '1995-01-01',
    isVipProfile: false
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

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAthlete.name) return;

    const student: Student = {
      id: `std-${Date.now()}`,
      name: newAthlete.name,
      phone: newAthlete.phone || '+591',
      email: newAthlete.email || `${newAthlete.name.toLowerCase().replace(/\s+/g, '.')}@templefit.com`,
      instructorAssigned: newAthlete.instructorAssigned || 'Paulo Alberto Gil Cuellar (Head Coach)',
      status: (newAthlete.status as any) || 'active',
      plan: (newAthlete.plan as any) || 'Reto 21 Días',
      startDate: new Date().toISOString().split('T')[0],
      renewalDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      birthDate: newAthlete.birthDate || '1995-01-01',
      heightM: Number(newAthlete.heightM) || 1.75,
      weightKg: Number(newAthlete.weightKg) || 70,
      isVipProfile: Boolean(newAthlete.isVipProfile),
      physicalGoal: newAthlete.physicalGoal || 'Definir objetivo físico',
      workoutLevel: (newAthlete.workoutLevel as any) || 'Principiante',
      currentRoutineExercises: '1. Calistenia funcional básica\n2. Flexiones y dominadas asistidas\n3. Respiración 06:00 AM',
      nutritionPlan: 'Plan Base Anti-inflamatorio + Proteína Limpia',
      currentDiet: 'Alimentación regular con la que ingresa.',
      prescribedDiet: 'Protocolo anti-inflamatorio con ElectroHidra y proteína limpia.',
      allergiesOrRestrictions: 'Ninguna',
      eatingDisordersOrIssues: 'Sin trastornos diagnosticados.',
      neuroticAndStressFactors: 'Manejo de estrés laboral.',
      spiritualIntention: newAthlete.spiritualIntention || 'Fortaleza y devoción diaria',
      mentorshipNotes: 'Atleta ingresado al sistema.',
      escuadronId: newAthlete.escuadronId || 'Alfa-1',
      phase: (newAthlete.phase as any) || '1 - Iniciación',
      attendanceHistory: [{ date: new Date().toISOString().split('T')[0], attended: true, notes: 'Ingreso inicial' }],
      assessments: [{ date: new Date().toISOString().split('T')[0], weightKg: Number(newAthlete.weightKg) || 70, heightM: Number(newAthlete.heightM) || 1.75, imc: Number(((Number(newAthlete.weightKg) || 70) / Math.pow(Number(newAthlete.heightM) || 1.75, 2)).toFixed(1)), notes: 'Evaluación inicial' }],
      hubConsumption: { snackBar: false, merchandise: false, preventiveMedicine: false }
    };
    
    const db = getCRMDatabase();
    db.students = [student, ...(db.students || [])];
    saveCRMDatabase(db);
    
    setLocalStudents(db.students);
    setSelectedStudent(student);
    setIsModalOpen(false);
    onNavigate('profile');
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
                Atletas & Comunidad
              </span>
              <span className="text-xs text-gray-400 font-bold">Total: {localStudents.length} alumnos</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <User className="text-temple-gold" size={26} />
              Directorio de Atletas
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Fichas técnicas, escuadrones asignados y seguimiento de cada alumno.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold hover:bg-temple-gold-bright text-black rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-temple-gold/20 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Plus size={18} /> Nuevo Atleta
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <motion.div variants={item}>
        <Card className="bg-[#0E1424]/90 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardContent className="!p-6">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-white/10 pb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar por nombre, escuadrón, email o teléfono..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold/50 rounded-xl text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Quick Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setStatusFilter('all'); setPhaseFilter('all'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${statusFilter === 'all' && phaseFilter === 'all' ? 'bg-temple-gold text-black shadow-md' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                >
                  Todos ({localStudents.length})
                </button>
                <button
                  type="button"
                  onClick={() => { setStatusFilter('expiring'); setPhaseFilter('all'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${statusFilter === 'expiring' ? 'bg-amber-500 text-black shadow-md font-extrabold' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'}`}
                >
                  <span>⚡ Por Vencer ({localStudents.filter(s => s.status === 'expiring').length})</span>
                </button>

                {localStudents.filter(s => s.status === 'expiring').length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsRetentionModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                  >
                    <MessageSquare size={13} />
                    <span>Notificar Vencimientos ({localStudents.filter(s => s.status === 'expiring').length})</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsBatchModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 bg-temple-gold text-black hover:bg-amber-400 shadow-md font-extrabold"
                  title="Marcar asistencia a un escuadrón completo en 1 toque"
                >
                  <Check size={14} />
                  <span>Pase de Lista Grupal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 bg-emerald-500 text-black hover:bg-emerald-400 shadow-md font-extrabold"
                  title="Generar y copiar comunicados para WhatsApp en 1 toque"
                >
                  <Share2 size={14} />
                  <span>Comunicado WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setStatusFilter('all'); setPhaseFilter('1'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${phaseFilter === '1' ? 'bg-blue-500 text-white shadow-md' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20'}`}
                >
                  Fase 1 Paz ({localStudents.filter(s => s.phase.startsWith('1')).length})
                </button>
                <button
                  type="button"
                  onClick={() => { setStatusFilter('all'); setPhaseFilter('2'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${phaseFilter === '2' ? 'bg-amber-500 text-black shadow-md' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'}`}
                >
                  Fase 2 Gedeón ({localStudents.filter(s => s.phase.startsWith('2')).length})
                </button>
                <button
                  type="button"
                  onClick={() => { setStatusFilter('all'); setPhaseFilter('3'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${phaseFilter === '3' ? 'bg-emerald-500 text-white shadow-md' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'}`}
                >
                  Fase 3 Cristo ({localStudents.filter(s => s.phase.startsWith('3')).length})
                </button>
              </div>
            </div>

            {batchToast && (
              <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                <Check size={16} className="text-emerald-400 shrink-0" />
                <span>{batchToast}</span>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    <th className="pb-3 pl-4 font-black">Atleta & Escuadrón</th>
                    <th className="pb-3 font-black">Plan & Fase</th>
                    <th className="pb-3 font-black">Contacto</th>
                    <th className="pb-3 font-black">Estado</th>
                    <th className="pb-3 text-right pr-4 font-black">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-white/5 transition group">
                      <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-temple-gold/20 to-amber-500/10 border border-temple-gold/30 flex items-center justify-center text-temple-gold font-bold text-xs flex-shrink-0 shadow-md">
                            {student.avatarUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                            ) : (
                              student.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-temple-gold transition">{student.name}</p>
                            <p className="text-[11px] text-gray-400">
                              Escuadrón: <span className="text-temple-gold font-bold">{student.escuadronId || 'Paz-Alfa'}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-gray-200">{student.plan}</p>
                          {student.status === 'active' && ((new Date().getTime() - new Date(student.startDate).getTime()) / (1000 * 3600 * 24)) > 21 && (
                            <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[8px] uppercase font-black px-1.5 py-0.5 rounded-sm" title="Más de 21 días en la fase actual">
                              Revisión 21 Días
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1">{student.phase}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-xs text-gray-300">{student.email}</p>
                        <p className="text-xs text-gray-500">{student.phone}</p>
                      </td>
                      <td className="py-4">
                        {student.status === 'active' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <ShieldCheck size={11} /> ACTIVO
                          </span>
                        )}
                        {student.status === 'expiring' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <CalendarClock size={11} /> POR VENCER
                          </span>
                        )}
                        {student.status === 'inactive' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-red-500/10 text-red-400 border border-red-500/30">
                            INACTIVO
                          </span>
                        )}
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${student.phone?.replace(/[^0-9]/g, '') || '59170000000'}?text=${encodeURIComponent(
                              student.status === 'expiring'
                                ? `Hola ${student.name}, te saluda Paulo de TempleFit. ¿Cómo estás? Te escribo para coordinar la renovación de tu membresía y seguir firmes con tus metas.`
                                : `Hola ${student.name}, te saluda Paulo de TempleFit. ¿Cómo va tu plan de entrenamiento de esta semana?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition"
                            title="Chat WhatsApp"
                          >
                            <MessageSquare size={16} />
                          </a>
                          <button 
                            onClick={() => handleOpenDossier(student)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-temple-gold text-black rounded-lg text-xs font-bold hover:bg-amber-400 transition-all shadow-sm"
                          >
                            <span>Ficha</span> <ArrowRight size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id, student.name)}
                            className="p-2 text-gray-500 hover:text-red-400 transition"
                            title="Eliminar Atleta"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <Search size={32} className="text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400 font-bold">No se encontraron atletas.</p>
                        <p className="text-xs text-gray-500 mt-1">Prueba ajustando los filtros o el texto de búsqueda.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-black/80 border-t-2 border-temple-gold/40 font-black text-white text-xs">
                    <td className="py-4 pl-4 uppercase tracking-wider text-temple-gold font-mono">
                      Total: {filteredStudents.length} Atletas
                    </td>
                    <td className="py-4 text-gray-300 font-mono">
                      {filteredStudents.filter(s => s.phase?.startsWith('1')).length} F1 • {filteredStudents.filter(s => s.phase?.startsWith('2')).length} F2 • {filteredStudents.filter(s => s.phase?.startsWith('3')).length} F3
                    </td>
                    <td className="py-4 text-emerald-400 font-mono">
                      {filteredStudents.filter(s => s.phone).length} WhatsApps
                    </td>
                    <td className="py-4 font-mono">
                      <span className="text-emerald-400">{filteredStudents.filter(s => s.status === 'active').length} Activos</span>
                      {filteredStudents.filter(s => s.status === 'expiring').length > 0 && (
                        <span className="text-amber-400 ml-1.5">({filteredStudents.filter(s => s.status === 'expiring').length} vence)</span>
                      )}
                    </td>
                    <td className="py-4 pr-4 text-right font-mono text-temple-gold font-black">
                      Cuotas: Bs. {(filteredStudents.filter(s => s.status === 'active').length * 200).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

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

        {/* Modal de Retención Rápida por WhatsApp */}
        {isRetentionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0E1424] border border-white/10 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wider text-white">
                      Notificar Próximos Vencimientos
                    </h3>
                    <p className="text-xs text-gray-400">
                      Mensajes cálidos preconfigurados para renovar en 1 toque.
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsRetentionModalOpen(false)} className="text-gray-400 hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {localStudents.filter(s => s.status === 'expiring').map(expiringStudent => {
                  const message = `Hola ${expiringStudent.name}! Te saluda Paulo de TempleFit. Quería felicitarte por tu constancia y disciplina en los entrenamientos. Tu ciclo de membresía cumple el ${expiringStudent.renewalDate}. ¿Te aparto tu lugar en el escuadrón para el siguiente mes?`;
                  const cleanPhone = expiringStudent.phone.replace(/[^0-9]/g, '');

                  return (
                    <div 
                      key={expiringStudent.id}
                      className="p-4 bg-black/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          {expiringStudent.name}
                          <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            Vence: {expiringStudent.renewalDate}
                          </span>
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {expiringStudent.plan} • Escuadrón: {expiringStudent.escuadronId || 'Paz-Alfa'}
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-500 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider hover:bg-emerald-400 transition flex items-center justify-center gap-1.5 shadow-lg shrink-0"
                      >
                        <MessageSquare size={14} />
                        <span>Abrir WhatsApp</span>
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsRetentionModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal de Pase de Lista Grupal */}
        {isBatchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0E1424] border border-white/10 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-temple-gold/20 border border-temple-gold/30 flex items-center justify-center text-temple-gold">
                    <Check size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wider text-white">
                      Pase de Lista Grupal (Hoy)
                    </h3>
                    <p className="text-xs text-gray-400">
                      Marca el 100% de asistencia de un escuadrón en 1 solo clic.
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsBatchModalOpen(false)} className="text-gray-400 hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {squadsList.map(squad => {
                  const squadAthletes = localStudents.filter(s => (s.escuadronId || 'Paz-Alfa') === squad && s.status === 'active');
                  const today = new Date().toISOString().split('T')[0];
                  const alreadyMarked = squadAthletes.filter(s => (s.attendanceHistory || []).some(a => a.date === today && a.attended)).length;

                  return (
                    <div 
                      key={squad}
                      className="p-4 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                          Escuadrón {squad}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {squadAthletes.length} atleta(s) activos • {alreadyMarked} presente(s) hoy
                        </p>
                      </div>

                      <button
                        onClick={() => handleBatchAttendance(squad)}
                        disabled={squadAthletes.length === 0}
                        className="px-4 py-2 bg-temple-gold hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition shadow-md shrink-0 disabled:opacity-40"
                      >
                        Marcar Todo ({squadAthletes.length})
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsBatchModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODAL DE COMUNICADO WHATSAPP POR ESCUADRÓN (ANTI-BURNOUT) */}
        {isBroadcastModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0E1424] border border-white/10 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Share2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wider text-white">
                      Comunicados Rápidos de WhatsApp
                    </h3>
                    <p className="text-xs text-gray-400">
                      Copia mensajes pre-diseñados en 1 toque para enviar al grupo del escuadrón.
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsBroadcastModalOpen(false)} className="text-gray-400 hover:text-white p-1">
                  <X size={20} />
                </button>
              </div>

              {/* Selector de Escuadrón */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {squadsList.map(squad => (
                  <button
                    key={squad}
                    onClick={() => setSelectedBroadcastSquad(squad)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                      selectedBroadcastSquad === squad
                        ? 'bg-temple-gold text-black font-extrabold shadow-md'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Escuadrón {squad}
                  </button>
                ))}
              </div>

              {/* Plantillas de Mensaje */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                {[
                  {
                    title: '🌅 Convocatoria Entrenamiento Mañana (06:00 AM)',
                    body: `¡Familia de Escuadrón ${selectedBroadcastSquad}! 🌅\n\nMañana nos vemos a las 06:00 AM puntuales en el Parque Urbano para nuestra sesión de CristoFit Camp. Recuerden traer su hidratación con ElectroHidra y su toalla.\n\n"Todo lo puedo en Cristo que me fortalece." ¡A darle con todo! 🔥`
                  },
                  {
                    title: '🔥 Recordatorio de Hidratación & Cierre de Radar',
                    body: `¡Atletas de ${selectedBroadcastSquad}! 💧\n\nNo olviden registrar su radar de hábitos diario antes de las 21:00 (sueño 7h, hidratación 3L y devocional). La disciplina en lo secreto se refleja en la fuerza del cuerpo.\n\n¡Cuentan con mi apoyo! - Coach Paulo 🛡️`
                  },
                  {
                    title: '👑 Mentoría Grupal Semanal (30 Min)',
                    body: `¡Atención Escuadrón ${selectedBroadcastSquad}! 👑\n\nHoy tenemos nuestra Mentoría Grupal de 30 minutos enfocada en Liderazgo, Rendimiento y Nutrición Anti-inflamatoria. Conéctense a las 20:00 con libreta en mano.\n\n¡Nos vemos pronto!`
                  }
                ].map((tpl, idx) => (
                  <div key={idx} className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase text-temple-gold tracking-wider">{tpl.title}</h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(tpl.body);
                          setCopiedBroadcastIdx(idx);
                          setTimeout(() => setCopiedBroadcastIdx(null), 2500);
                        }}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition"
                      >
                        {copiedBroadcastIdx === idx ? (
                          <>
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copiar Texto</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed font-sans bg-black/30 p-2.5 rounded-xl border border-white/5">
                      {tpl.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
                >
                  Listo / Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
