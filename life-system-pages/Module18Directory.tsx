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
  Trash2 
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
    weightKg: 70
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
      instructorAssigned: newAthlete.instructorAssigned || 'Paulo (Head Coach)',
      status: (newAthlete.status as any) || 'active',
      plan: (newAthlete.plan as any) || 'Reto 21 Días',
      startDate: new Date().toISOString().split('T')[0],
      renewalDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      physicalGoal: newAthlete.physicalGoal || 'Definir objetivo físico',
      weightKg: Number(newAthlete.weightKg) || 70,
      workoutLevel: (newAthlete.workoutLevel as any) || 'Principiante',
      nutritionPlan: 'Plan Base Anti-inflamatorio + Proteína Limpia',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: newAthlete.spiritualIntention || 'Fortaleza y devoción diaria',
      mentorshipNotes: 'Atleta ingresado al sistema.',
      escuadronId: newAthlete.escuadronId || 'Alfa-1',
      phase: (newAthlete.phase as any) || '1 - Iniciación',
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0E1424] via-[#0B0F19] to-black p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Users size={140} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Directorio Maestro
              </span>
              <span className="text-xs text-gray-400 font-bold">Total: {localStudents.length} Atletas</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <User className="text-temple-gold" size={26} />
              Comunidad & Expedientes
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Gestión holística de los 3 pilares (Cuerpo, Mente, Espíritu) por Escuadrón.
            </p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-temple-gold text-black rounded-xl font-extrabold hover:bg-amber-400 transition-all uppercase tracking-wider text-xs shadow-lg shadow-temple-gold/20 w-max"
          >
            <Plus size={18} /> Añadir Atleta
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
              
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2">
                  <Filter size={14} className="text-temple-gold" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                  >
                    <option className="bg-[#0E1424] text-white" value="all">Estado: Todos</option>
                    <option className="bg-[#0E1424] text-white" value="active">Activos</option>
                    <option className="bg-[#0E1424] text-white" value="expiring">Por Vencer</option>
                    <option className="bg-[#0E1424] text-white" value="inactive">Inactivos</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2">
                  <Dumbbell size={14} className="text-temple-gold" />
                  <select 
                    value={phaseFilter}
                    onChange={(e) => setPhaseFilter(e.target.value)}
                    className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                  >
                    <option className="bg-[#0E1424] text-white" value="all">Fase: Todas</option>
                    <option className="bg-[#0E1424] text-white" value="1">Fase 1 - Escuadrón de Paz</option>
                    <option className="bg-[#0E1424] text-white" value="2">Fase 2 - Gedeón (21 Días)</option>
                    <option className="bg-[#0E1424] text-white" value="3">Fase 3 - Escuadrón de Cristo</option>
                  </select>
                </div>
              </div>
            </div>

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
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-temple-gold/20 to-amber-500/10 border border-temple-gold/30 flex items-center justify-center text-temple-gold font-bold text-xs flex-shrink-0 shadow-md">
                            {student.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-temple-gold transition">{student.name}</p>
                            <p className="text-[11px] text-gray-400">
                              Escuadrón: <span className="text-temple-gold font-bold">{student.escuadronId || 'Alfa-1'}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-xs font-bold text-gray-200">{student.plan}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{student.phase}</p>
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
                              `¡Hola ${student.name}! 👋 Te escribo de TempleFit. ¿Cómo va tu plan de entrenamiento hoy?`
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
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal Añadir Atleta */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#121826] border border-temple-gold/40 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-temple-gold/10 text-temple-gold border border-temple-gold/30">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-wider">Nuevo Atleta TempleFit</h3>
                    <p className="text-xs text-gray-400">Crea el expediente holístico de 3 pilares.</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateStudent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Nombre Completo *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. Juan Pérez"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.name}
                      onChange={e => setNewAthlete({ ...newAthlete, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Celular / WhatsApp *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="+591 70012345"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.phone}
                      onChange={e => setNewAthlete({ ...newAthlete, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Escuadrón Asignado</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Alfa-1, Gedeón-2..."
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.escuadronId}
                      onChange={e => setNewAthlete({ ...newAthlete, escuadronId: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Fase del Programa</label>
                    <select 
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.phase}
                      onChange={e => setNewAthlete({ ...newAthlete, phase: e.target.value as any })}
                    >
                      <option className="bg-[#121826]" value="1 - Iniciación">Fase 1 - Escuadrón de Paz</option>
                      <option className="bg-[#121826]" value="2 - Desarrollo">Fase 2 - Gedeón (21 Días)</option>
                      <option className="bg-[#121826]" value="3 - Perfeccionamiento">Fase 3 - Escuadrón de Cristo</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Plan de Membresía</label>
                    <select 
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.plan}
                      onChange={e => setNewAthlete({ ...newAthlete, plan: e.target.value as any })}
                    >
                      <option className="bg-[#121826]" value="Reto 21 Días">Reto 21 Días = ÍNTEGROS</option>
                      <option className="bg-[#121826]" value="Plan Integral Mensual">Plan Integral Mensual</option>
                      <option className="bg-[#121826]" value="CristoFit Camp">CristoFit Camp</option>
                      <option className="bg-[#121826]" value="Coaching 1 a 1">Coaching 1 a 1</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Peso Inicial (Kg)</label>
                    <input 
                      type="number" 
                      placeholder="70"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-temple-gold/50"
                      value={newAthlete.weightKg}
                      onChange={e => setNewAthlete({ ...newAthlete, weightKg: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Objetivo Físico (Cuerpo)</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Bajar 5kg de grasa, ganar fuerza en calistenia..."
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-temple-gold/50"
                    value={newAthlete.physicalGoal}
                    onChange={e => setNewAthlete({ ...newAthlete, physicalGoal: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Intención Espiritual (Espíritu)</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Hábito de oración matutina y vencer el estrés..."
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-temple-gold/50"
                    value={newAthlete.spiritualIntention}
                    onChange={e => setNewAthlete({ ...newAthlete, spiritualIntention: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition"
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
      </AnimatePresence>
    </motion.div>
  );
}
