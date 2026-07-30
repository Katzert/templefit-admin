'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Users, Filter, ArrowRight, ShieldCheck, Dumbbell, CalendarClock, Plus } from 'lucide-react';
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
  
  // Sync with context if it changes externally
  React.useEffect(() => {
    setLocalStudents(students);
  }, [students]);

  const filteredStudents = useMemo(() => {
    return localStudents.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesPhase = phaseFilter === 'all' || student.phase.startsWith(phaseFilter);

      return matchesSearch && matchesStatus && matchesPhase;
    });
  }, [localStudents, searchTerm, statusFilter, phaseFilter]);

  const addStudent = () => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: 'Nuevo Atleta',
      phone: '+591',
      email: '',
      instructorAssigned: 'Sin Asignar',
      status: 'active',
      plan: 'Reto 21 Días',
      startDate: new Date().toISOString().split('T')[0],
      renewalDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      physicalGoal: 'Definir objetivo físico',
      weightKg: 70,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Plan Nutricional Base',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Definir propósito espiritual',
      mentorshipNotes: 'Notas iniciales de evaluación.',
      escuadronId: 'Nuevo Escuadrón',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: false, merchandise: false, preventiveMedicine: false }
    };
    
    const db = getCRMDatabase();
    db.students = [newStudent, ...db.students];
    saveCRMDatabase(db);
    
    // Also update locally to reflect immediately
    setLocalStudents([newStudent, ...localStudents]);
    setSelectedStudent(newStudent);
    onNavigate('team-ops');
  };

  const handleOpenDossier = (student: any) => {
    setSelectedStudent(student);
    onNavigate('team-ops');
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-temple-navy/90 to-black p-6 rounded-xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Users size={120} className="text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <User className="text-temple-gold" size={24} />
              Directorio de Atletas
            </h2>
            <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
              Vista maestra de la comunidad TempleFit. Gestiona expedientes y progreso.
            </p>
          </div>
          
          <button 
            onClick={addStudent}
            className="flex items-center gap-2 px-4 py-2.5 bg-temple-gold text-black rounded-xl font-bold hover:bg-white transition uppercase tracking-wider text-sm w-max"
          >
            <Plus size={18} /> Añadir Atleta
          </button>
        </div>
      </div>

      <motion.div variants={item}>
        <Card className="bg-black/40 border-white/5">
          <CardContent className="!p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-white/10 pb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 text-gray-500" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar por nombre, correo o teléfono..." 
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
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent text-sm text-white focus:outline-none"
                  >
                    <option className="bg-[#121826] text-white" value="all">Estado: Todos</option>
                    <option className="bg-[#121826] text-white" value="active">Activos</option>
                    <option className="bg-[#121826] text-white" value="expiring">Por Vencer</option>
                    <option className="bg-[#121826] text-white" value="inactive">Inactivos</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2 bg-[#121826] border border-white/10 rounded-xl px-3 py-2">
                  <Dumbbell size={14} className="text-gray-400" />
                  <select 
                    value={phaseFilter}
                    onChange={(e) => setPhaseFilter(e.target.value)}
                    className="bg-transparent text-sm text-white focus:outline-none"
                  >
                    <option className="bg-[#121826] text-white" value="all">Fase: Todas</option>
                    <option className="bg-[#121826] text-white" value="1">1 - Iniciación</option>
                    <option className="bg-[#121826] text-white" value="2">2 - Desarrollo</option>
                    <option className="bg-[#121826] text-white" value="3">3 - Perfeccionamiento</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                    <th className="pb-3 pl-4 font-bold">Atleta</th>
                    <th className="pb-3 font-bold">Plan & Fase</th>
                    <th className="pb-3 font-bold">Contacto</th>
                    <th className="pb-3 font-bold">Estado</th>
                    <th className="pb-3 text-right pr-4 font-bold">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-white/5 transition group">
                      <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-temple-gold/20 flex items-center justify-center text-temple-gold flex-shrink-0">
                            {student.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{student.name}</p>
                            <p className="text-[10px] text-gray-400">Escuadrón: <span className="text-temple-gold">{student.escuadronId}</span></p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-sm text-gray-300">{student.plan}</p>
                        <p className="text-[10px] text-gray-500">{student.phase}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-xs text-gray-300">{student.email}</p>
                        <p className="text-xs text-gray-500">{student.phone}</p>
                      </td>
                      <td className="py-4">
                        {student.status === 'active' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                            <ShieldCheck size={10} /> ACTIVO
                          </span>
                        )}
                        {student.status === 'expiring' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <CalendarClock size={10} /> POR VENCER
                          </span>
                        )}
                        {student.status === 'inactive' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                            INACTIVO
                          </span>
                        )}
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <button 
                          onClick={() => handleOpenDossier(student)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-temple-gold/10 text-temple-gold border border-temple-gold/30 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-temple-gold hover:text-black transition-all opacity-0 group-hover:opacity-100"
                        >
                          Expediente <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <Search size={32} className="text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400 font-bold">No se encontraron atletas.</p>
                        <p className="text-xs text-gray-500 mt-1">Prueba ajustando los filtros de búsqueda.</p>
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
