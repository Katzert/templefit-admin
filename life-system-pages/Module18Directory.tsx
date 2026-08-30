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
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

interface Module18DirectoryProps {
  onNavigate: (tab: string) => void;
}

export function Module18Directory({ onNavigate }: Module18DirectoryProps) {
  const { students, setSelectedStudent } = useAuth();
  const [localStudents, setLocalStudents] = useState<Student[]>(students);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  
  // Modal state
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
    spiritualIntention: 'Consistencia en devocionales diarios y oración',
    workoutLevel: 'Principiante',
    weightKg: 70,
    heightM: 1.75,
    birthDate: '1995-01-01',
    isVipProfile: false
  });

  // Sync with context if it changes externally
  React.useEffect(() => {
    const db = getCRMDatabase();
    setLocalStudents(db.students || []);
  }, [students]);

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

  const handleOpenDossier = (student: Student) => {
    setSelectedStudent(student);
    onNavigate('profile');
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar el expediente de ${name}?`)) return;
    const db = getCRMDatabase();
    db.students = db.students.filter(s => s.id !== id);
    saveCRMDatabase(db);
    setLocalStudents(db.students);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Users size={140} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Atletas & Comunidad
              </span>
              <span className="text-xs text-slate-600 dark:text-gray-400 font-bold">Total: {localStudents.length} alumnos</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
              <User className="text-temple-gold" size={26} />
              Directorio de Atletas
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 mt-1">
              Fichas técnicas, escuadrones asignados y seguimiento de cada alumno.
            </p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold text-black rounded-xl font-extrabold hover:bg-amber-400 transition-all uppercase tracking-wider text-xs shadow-lg shadow-temple-gold/20 w-max"
          >
            <Plus size={18} /> Nuevo Atleta
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <motion.div variants={item}>
        <Card className="bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl border-black/10 dark:border-white/10 shadow-2xl">
          <CardContent className="!p-6">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-black/10 dark:border-white/10 pb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-3 text-slate-600 dark:text-gray-400" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar por nombre, escuadrón, email o teléfono..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold/50 rounded-xl text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Quick Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setStatusFilter('all'); setPhaseFilter('all'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${statusFilter === 'all' && phaseFilter === 'all' ? 'bg-temple-gold text-black shadow-md' : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-white hover:bg-black/10 dark:bg-white/10'}`}
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
                  <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-gray-400">
                    <th className="pb-3 pl-4 font-black">Atleta & Escuadrón</th>
                    <th className="pb-3 font-black">Plan & Fase</th>
                    <th className="pb-3 font-black">Contacto</th>
                    <th className="pb-3 font-black">Estado</th>
                    <th className="pb-3 text-right pr-4 font-black">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-black/5 dark:bg-white/5 transition group">
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
                            <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-temple-gold transition">{student.name}</p>
                            <p className="text-[11px] text-slate-600 dark:text-gray-400">
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
                        <p className="text-[10px] text-slate-600 dark:text-gray-400 font-semibold mt-1">{student.phase}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-xs text-slate-700 dark:text-gray-300">{student.email}</p>
                        <p className="text-xs text-slate-500 dark:text-gray-500">{student.phone}</p>
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
                            className="p-2 text-slate-500 dark:text-gray-500 hover:text-red-400 transition"
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
                        <p className="text-slate-600 dark:text-gray-400 font-bold">No se encontraron atletas.</p>
                        <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">Prueba ajustando los filtros o el texto de búsqueda.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t border-black/10 dark:border-white/10 font-black text-white text-xs">
                    <td className="py-4 pl-4 uppercase tracking-wider text-temple-gold tabular-nums">
                      Total: {filteredStudents.length} Atletas
                    </td>
                    <td className="py-4 text-slate-700 dark:text-gray-300 tabular-nums">
                      {filteredStudents.filter(s => s.phase?.startsWith('1')).length} F1 • {filteredStudents.filter(s => s.phase?.startsWith('2')).length} F2 • {filteredStudents.filter(s => s.phase?.startsWith('3')).length} F3
                    </td>
                    <td className="py-4 text-emerald-400 tabular-nums">
                      {filteredStudents.filter(s => s.phone).length} WhatsApps
                    </td>
                    <td className="py-4 tabular-nums">
                      <span className="text-emerald-400">{filteredStudents.filter(s => s.status === 'active').length} Activos</span>
                      {filteredStudents.filter(s => s.status === 'expiring').length > 0 && (
                        <span className="text-amber-400 ml-1.5">({filteredStudents.filter(s => s.status === 'expiring').length} vence)</span>
                      )}
                    </td>
                    <td className="py-4 pr-4 text-right tabular-nums text-temple-gold font-black">
                      Cuotas: Bs. {(filteredStudents.filter(s => s.status === 'active').length * 200).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal Añadir Atleta */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white dark:bg-black/8 dark:bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#121826] border border-temple-gold/40 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-temple-gold/10 text-temple-gold border border-temple-gold/30">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider">Nuevo Atleta TempleFit</h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400">Crea el expediente holístico de 3 pilares.</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-600 dark:text-gray-400 hover:text-white transition">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateStudent} className="space-y-4">
                {/* Photo Upload */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white dark:bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-temple-gold font-bold text-lg flex-shrink-0">
                    {newAthlete.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={newAthlete.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{(newAthlete.name || 'TF').substring(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Foto del Atleta (Opcional)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="text-xs text-slate-600 dark:text-gray-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-temple-gold file:text-black hover:file:bg-amber-400 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setNewAthlete({ ...newAthlete, avatarUrl: event.target?.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Nombre Completo *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Juan Pérez"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.name}
                      onChange={e => setNewAthlete({ ...newAthlete, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Celular / WhatsApp *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="+591 70012345"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.phone}
                      onChange={e => setNewAthlete({ ...newAthlete, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Escuadrón Asignado</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Alfa-1, Gedeón-2..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.escuadronId}
                      onChange={e => setNewAthlete({ ...newAthlete, escuadronId: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Fase del Programa</label>
                    <select 
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.phase}
                      onChange={e => setNewAthlete({ ...newAthlete, phase: e.target.value as any })}
                    >
                      <option className="bg-white dark:bg-[#121826]" value="1 - Iniciación">Fase 1 - Escuadrón de Paz</option>
                      <option className="bg-white dark:bg-[#121826]" value="2 - Desarrollo">Fase 2 - Gedeón (21 Días)</option>
                      <option className="bg-white dark:bg-[#121826]" value="3 - Perfeccionamiento">Fase 3 - Escuadrón de Cristo</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Plan de Membresía</label>
                    <select 
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.plan}
                      onChange={e => setNewAthlete({ ...newAthlete, plan: e.target.value as any })}
                    >
                      <option className="bg-white dark:bg-[#121826]" value="Reto 21 Días">Reto 21 Días = ÍNTEGROS</option>
                      <option className="bg-white dark:bg-[#121826]" value="Plan Integral Mensual">Plan Integral Mensual</option>
                      <option className="bg-white dark:bg-[#121826]" value="CristoFit Camp">CristoFit Camp</option>
                      <option className="bg-white dark:bg-[#121826]" value="Coaching 1 a 1">Coaching 1 a 1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Peso Inicial (Kg)</label>
                    <input 
                      type="number" 
                      placeholder="70"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.weightKg}
                      onChange={e => setNewAthlete({ ...newAthlete, weightKg: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Objetivo Físico (Cuerpo)</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Bajar 5kg de grasa, ganar fuerza en calistenia..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                    value={newAthlete.physicalGoal}
                    onChange={e => setNewAthlete({ ...newAthlete, physicalGoal: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Intención Espiritual (Espíritu)</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Hábito de oración matutina y vencer el estrés..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-temple-gold/50"
                    value={newAthlete.spiritualIntention}
                    onChange={e => setNewAthlete({ ...newAthlete, spiritualIntention: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-white uppercase tracking-wider transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-temple-gold text-black rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-amber-400 transition shadow-lg shadow-temple-gold/20 flex items-center gap-2"
                  >
                    <Check size={16} /> Guardar & Abrir Ficha
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Modal de Retención Rápida por WhatsApp */}
        {isRetentionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white dark:bg-black/8 dark:bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0E1424] border border-black/10 dark:border-white/10 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                      Notificar Próximos Vencimientos
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      Mensajes cálidos preconfigurados para renovar en 1 toque.
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsRetentionModalOpen(false)} className="text-slate-600 dark:text-gray-400 hover:text-white p-1">
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
                      className="p-4 bg-slate-50 dark:bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-temple-navy dark:text-white flex items-center gap-2">
                          {expiringStudent.name}
                          <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            Vence: {expiringStudent.renewalDate}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">
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

              <div className="flex justify-end pt-3 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsRetentionModalOpen(false)}
                  className="px-5 py-2.5 bg-black/10 dark:bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal de Pase de Lista Grupal */}
        {isBatchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white dark:bg-black/8 dark:bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0E1424] border border-black/10 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-temple-gold/20 border border-temple-gold/30 flex items-center justify-center text-temple-gold">
                    <Check size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                      Pase de Lista Grupal (Hoy)
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      Marca el 100% de asistencia de un escuadrón en 1 solo clic.
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsBatchModalOpen(false)} className="text-slate-600 dark:text-gray-400 hover:text-white p-1">
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
                      className="p-4 bg-slate-50 dark:bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-temple-navy dark:text-white uppercase tracking-wider">
                          Escuadrón {squad}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">
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

              <div className="flex justify-end pt-3 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsBatchModalOpen(false)}
                  className="px-5 py-2.5 bg-black/10 dark:bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODAL DE COMUNICADO WHATSAPP POR ESCUADRÓN (ANTI-BURNOUT) */}
        {isBroadcastModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white dark:bg-black/8 dark:bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0E1424] border border-black/10 dark:border-white/10 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Share2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                      Comunicados Rápidos de WhatsApp
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      Copia mensajes pre-diseñados en 1 toque para enviar al grupo del escuadrón.
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsBroadcastModalOpen(false)} className="text-slate-600 dark:text-gray-400 hover:text-white p-1">
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
                        : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-white'
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
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase text-temple-gold tracking-wider">{tpl.title}</h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(tpl.body);
                          setCopiedBroadcastIdx(idx);
                          setTimeout(() => setCopiedBroadcastIdx(null), 2500);
                        }}
                        className="px-3 py-1 bg-black/10 dark:bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition"
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
                    <p className="text-xs text-slate-700 dark:text-gray-300 whitespace-pre-line leading-relaxed font-sans bg-black/[0.03] dark:bg-black/30 p-2.5 rounded-xl border border-black/5 dark:border-white/5">
                      {tpl.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-5 py-2.5 bg-black/10 dark:bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
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
