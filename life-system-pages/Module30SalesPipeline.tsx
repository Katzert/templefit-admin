'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Flame, 
  Award, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Student } from '../types';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

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
      title: 'Fase 1: Brigada de Paz',
      subtitle: 'Meses 1-3 • Purificación & Bronce',
      phaseKey: '1 - Iniciación' as Student['phase'],
      items: f1Students,
      color: 'border-white/20',
      bgHeader: 'bg-white/5',
      badgeColor: 'text-[#CD7F32] bg-[#CD7F32]/10 border-[#CD7F32]/30',
      icon: <ShieldCheck size={18} className="text-[#CD7F32]" />
    },
    {
      id: 'F2',
      title: 'Fase 2: Brigada de Salvación',
      subtitle: 'Meses 4-8 • Reto 21 Días & Plata',
      phaseKey: '2 - Desarrollo' as Student['phase'],
      items: f2Students,
      color: 'border-[#002147]',
      bgHeader: 'bg-[#002147]/50',
      badgeColor: 'text-[#C0C8D0] bg-[#C0C8D0]/10 border-[#C0C8D0]/30',
      icon: <Flame size={18} className="text-[#C0C8D0]" />
    },
    {
      id: 'F3',
      title: 'Fase 3: Brigada de Cristo',
      titleHighlight: 'Oro',
      subtitle: 'Meses 9-12 • Madurez & Corona de Oro',
      phaseKey: '3 - Perfeccionamiento' as Student['phase'],
      items: f3Students,
      color: 'border-temple-gold/40',
      bgHeader: 'bg-temple-gold/10',
      badgeColor: 'text-temple-gold bg-temple-gold/20 border-temple-gold/40',
      icon: <Award size={18} className="text-temple-gold" />
    }
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans flex flex-col min-h-[calc(100vh-140px)]">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B0F19] p-6 md:p-7 rounded-2xl border border-white/10 shrink-0 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/15 text-temple-gold border border-temple-gold/30 text-[10px] font-extrabold uppercase tracking-[0.2em]">
              Metodología Oficial de 3 Fases
            </span>
            <span className="text-xs text-gray-400 font-bold">25 Escuadrones de 12 Atletas</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-tight">
            Pipeline de Fases & Escuadrones
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1 font-light">
            Seguimiento de progresión según el manual: Paz (Bronce) ➔ Salvación (Plata) ➔ Cristo (Oro).
          </p>
        </div>

        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/10 text-xs text-gray-300">
          <span className="w-2 h-2 rounded-full bg-temple-gold animate-pulse" />
          <span>Total Atletas Activos: <strong className="text-white font-extrabold tabular-nums">{students.length}</strong></span>
        </div>
      </div>

      {/* 3 Columns Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-start">
        {stages.map((stage, idx) => (
          <div key={stage.id} className={`flex flex-col rounded-2xl bg-[#0B0F19] border ${stage.color} overflow-hidden shadow-xl min-h-[550px]`}>
            
            {/* Stage Header */}
            <div className={`p-4 border-b border-white/10 ${stage.bgHeader} flex items-center justify-between`}>
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                  {stage.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-white uppercase tracking-wide">{stage.title}</h3>
                  <p className="text-[10px] text-gray-400 font-light">{stage.subtitle}</p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border tabular-nums ${stage.badgeColor}`}>
                {stage.items.length}
              </span>
            </div>

            {/* Stage Body / Cards List */}
            <div className="p-3.5 space-y-3 flex-1 overflow-y-auto custom-scrollbar max-h-[620px]">
              {stage.items.map((student) => (
                <motion.div 
                  key={student.id} 
                  variants={item}
                  className="bg-[#0E1424] border border-white/10 hover:border-temple-gold/40 rounded-xl p-4 transition-all duration-200 group shadow-md flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-temple-gold font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h4 
                            onClick={() => {
                              setSelectedStudent(student);
                              if (onNavigate) onNavigate('18-student-directory');
                            }}
                            className="font-bold text-xs text-white group-hover:text-temple-gold transition-colors cursor-pointer"
                          >
                            {student.name}
                          </h4>
                          <span className="text-[10px] text-gray-500 font-mono block">Tel: {student.phone || 'Sin registrar'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 p-2 bg-black/40 rounded-lg border border-white/5 text-[10px]">
                      <div>
                        <span className="text-gray-500 block text-[9px] uppercase font-bold">Escuadrón</span>
                        <span className="font-bold text-gray-300">#{(student.id.charCodeAt(student.id.length - 1) % 25) + 1}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px] uppercase font-bold">Asistencia</span>
                        <span className="font-bold text-temple-gold">{student.attendanceRate || 95}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Stage Transition Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <div>
                      {idx > 0 && (
                        <button
                          onClick={() => movePhase(student.id, stages[idx - 1].phaseKey)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition flex items-center gap-1 text-[10px] uppercase font-bold"
                          title="Mover a fase anterior"
                        >
                          <ArrowLeft size={12} />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          const text = encodeURIComponent(`¡Hola ${student.name}! Te escribo del Templo TempleFit respecto a tu avance en la ${stage.title}.`);
                          window.open(`https://wa.me/${student.phone?.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-temple-gold transition"
                        title="Enviar WhatsApp"
                      >
                        <MessageSquare size={13} />
                      </button>

                      {idx < stages.length - 1 && (
                        <button
                          onClick={() => movePhase(student.id, stages[idx + 1].phaseKey)}
                          className="px-2.5 py-1 rounded-lg bg-temple-gold hover:bg-temple-gold-bright text-black font-extrabold transition flex items-center gap-1 text-[10px] uppercase shadow-sm"
                          title="Promover a la siguiente Fase"
                        >
                          <span>Avanzar</span>
                          <ArrowRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {stage.items.length === 0 && (
                <div className="p-8 text-center text-gray-500 border border-dashed border-white/5 rounded-xl">
                  <User size={24} className="mx-auto mb-2 opacity-20" />
                  <p className="text-xs uppercase font-bold">Sin atletas en esta fase</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
