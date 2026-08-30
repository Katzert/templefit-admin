'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Kanban, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Flame, 
  Sparkles, 
  Award, 
  AlertTriangle,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Student } from '../types';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

interface Module30SalesPipelineProps {
  onNavigate?: (tab: string) => void;
}

export function Module30SalesPipeline({ onNavigate }: Module30SalesPipelineProps) {
  const { setSelectedStudent } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const db = getCRMDatabase();
    setStudents(db.students || []);
  }, []);

  const saveStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    const db = getCRMDatabase();
    db.students = newStudents;
    saveCRMDatabase(db);
  };

  const movePhase = (studentId: string, targetPhase: Student['phase']) => {
    const updated = students.map(s => s.id === studentId ? { ...s, phase: targetPhase } : s);
    saveStudents(updated);
  };

  const f1Students = students.filter(s => s.phase.startsWith('1'));
  const f2Students = students.filter(s => s.phase.startsWith('2'));
  const f3Students = students.filter(s => s.phase.startsWith('3'));

  const stages = [
    {
      id: 'F1',
      title: 'Fase 1: Escuadrón de Paz',
      subtitle: 'Iniciación y acondicionamiento integral',
      phaseKey: '1 - Iniciación' as Student['phase'],
      items: f1Students,
      color: 'border-blue-500/40',
      bgHeader: 'bg-blue-500/10',
      badgeColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      icon: <ShieldCheck size={18} className="text-blue-400" />
    },
    {
      id: 'F2',
      title: 'Fase 2: Escuadrón de Gedeón',
      subtitle: 'Reto 21 Días (Consistencia en hábitos)',
      phaseKey: '2 - Desarrollo' as Student['phase'],
      items: f2Students,
      color: 'border-temple-gold/40',
      bgHeader: 'bg-temple-gold/10',
      badgeColor: 'text-temple-gold bg-temple-gold/20 border-temple-gold/30',
      icon: <Flame size={18} className="text-temple-gold" />
    },
    {
      id: 'F3',
      title: 'Fase 3: Escuadrón de Cristo',
      subtitle: 'Formación avanzada y liderazgo de escuadrón',
      phaseKey: '3 - Perfeccionamiento' as Student['phase'],
      items: f3Students,
      color: 'border-emerald-500/40',
      bgHeader: 'bg-emerald-500/10',
      badgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      icon: <Award size={18} className="text-emerald-400" />
    }
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans flex flex-col min-h-[calc(100vh-140px)]">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 shrink-0 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
              Metodología de 3 Fases
            </span>
            <span className="text-xs text-slate-600 dark:text-gray-400 font-bold">25 Escuadrones de 12 Atletas</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Kanban className="text-temple-gold" size={26} />
            Progresión de Atletas (Fases 1 a 3)
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 mt-1">
            Acompaña y registra el avance de cada alumno según su constancia y nivel de entrenamiento.
          </p>
        </div>
      </div>

      {/* Kanban Board */}
      <motion.div variants={item} className="flex-1 overflow-x-auto custom-scrollbar">
        <div className="flex gap-6 min-w-[1000px] h-full pb-4 items-stretch">
          {stages.map((stage, idx) => (
            <div 
              key={stage.id} 
              className={`flex-1 flex flex-col rounded-3xl border ${stage.color} bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl overflow-hidden shadow-2xl min-h-[500px]`}
            >
              {/* Stage Header */}
              <div className={`p-5 ${stage.bgHeader} border-b border-black/10 dark:border-white/10 flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-white dark:bg-black/40 border border-black/10 dark:border-white/10">
                    {stage.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-temple-navy dark:text-white uppercase tracking-wider">{stage.title}</h3>
                    <p className="text-[10px] text-slate-600 dark:text-gray-400">{stage.subtitle}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${stage.badgeColor}`}>
                  {stage.items.length}
                </span>
              </div>

              {/* Athletes List in this Phase */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
                {stage.items.map(student => (
                  <div 
                    key={student.id} 
                    className="bg-slate-100 dark:bg-white dark:bg-black/50 hover:bg-black/8 dark:bg-black/80 border border-black/10 dark:border-white/10 hover:border-temple-gold/40 p-4 rounded-2xl transition-all shadow-md group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 
                          onClick={() => {
                            setSelectedStudent(student);
                            onNavigate?.('profile');
                          }}
                          className="text-sm font-bold text-white group-hover:text-temple-gold cursor-pointer transition flex items-center gap-1.5"
                        >
                          {student.name}
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-gray-400">
                          Escuadrón: <strong className="text-temple-gold">{student.escuadronId || 'Alfa-1'}</strong>
                        </p>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-slate-600 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md border border-black/10 dark:border-white/10">
                        {student.workoutLevel || 'Nivel Base'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-gray-400 italic line-clamp-2 mb-3 bg-black/5 dark:bg-white/5 p-2 rounded-xl">
                      "{student.spiritualIntention || student.physicalGoal}"
                    </p>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-black/10 dark:border-white/10">
                      <div className="flex items-center gap-1">
                        {idx > 0 && (
                          <button
                            onClick={() => movePhase(student.id, idx === 1 ? '1 - Iniciación' : '2 - Desarrollo')}
                            className="p-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-white rounded-lg transition text-[10px] flex items-center gap-1"
                            title="Retroceder Fase"
                          >
                            <ArrowLeft size={13} />
                          </button>
                        )}
                        {idx < 2 && (
                          <button
                            onClick={() => movePhase(student.id, idx === 0 ? '2 - Desarrollo' : '3 - Perfeccionamiento')}
                            className="px-2.5 py-1 bg-temple-gold/20 hover:bg-temple-gold text-temple-gold hover:text-black font-extrabold rounded-lg transition text-[10px] uppercase flex items-center gap-1 border border-temple-gold/30"
                            title="Promover a Siguiente Fase"
                          >
                            <span>Promover</span>
                            <ArrowRight size={13} />
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          onNavigate?.('profile');
                        }}
                        className="text-[10px] uppercase font-bold text-slate-600 dark:text-gray-400 hover:text-temple-gold flex items-center gap-1 transition"
                      >
                        <span>Ficha</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}

                {stage.items.length === 0 && (
                  <div className="py-12 text-center border-2 border-dashed border-black/5 dark:border-white/5 rounded-2xl">
                    <User size={28} className="text-gray-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 dark:text-gray-500 font-bold">Sin atletas en esta fase</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
