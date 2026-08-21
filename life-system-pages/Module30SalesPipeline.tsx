'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Flame, 
  Award, 
  ChevronRight,
  MessageSquare,
  Users,
  Search,
  Check
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Student } from '../types';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };

interface Module30SalesPipelineProps {
  onNavigate?: (tab: string) => void;
}

export function Module30SalesPipeline({ onNavigate }: Module30SalesPipelineProps) {
  const { setSelectedStudent } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadStudents = () => {
    const db = getCRMDatabase();
    setStudents(db.students || []);
  };

  const saveStudents = (newStudents: Student[], msg?: string) => {
    setStudents(newStudents);
    const db = getCRMDatabase();
    db.students = newStudents;
    saveCRMDatabase(db);
    if (msg) showToast(msg);
  };

  const movePhase = (studentId: string, targetPhase: Student['phase']) => {
    const student = students.find(s => s.id === studentId);
    const updated = students.map(s => s.id === studentId ? { ...s, phase: targetPhase } : s);
    saveStudents(updated, `¡${student?.name || 'Atleta'} promovido a ${targetPhase}!`);
  };

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.escuadronId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const f1Students = filtered.filter(s => s.phase.startsWith('1'));
  const f2Students = filtered.filter(s => s.phase.startsWith('2'));
  const f3Students = filtered.filter(s => s.phase.startsWith('3'));

  const stages = [
    {
      id: 'F1',
      title: 'Fase 1: Brigada de Paz',
      subtitle: 'Meses 1-3 • Purificación & Bronce',
      phaseKey: '1 - Iniciación' as Student['phase'],
      items: f1Students,
      color: 'border-[#CD7F32]/40',
      bgHeader: 'bg-[#CD7F32]/10',
      badgeColor: 'text-[#CD7F32] bg-[#CD7F32]/15 border-[#CD7F32]/40',
      icon: <ShieldCheck size={18} className="text-[#CD7F32]" />
    },
    {
      id: 'F2',
      title: 'Fase 2: Brigada de Salvación',
      subtitle: 'Meses 4-8 • Reto 21 Días & Plata',
      phaseKey: '2 - Desarrollo' as Student['phase'],
      items: f2Students,
      color: 'border-[#C0C8D0]/40',
      bgHeader: 'bg-[#002147]/60',
      badgeColor: 'text-[#C0C8D0] bg-[#C0C8D0]/15 border-[#C0C8D0]/40',
      icon: <Flame size={18} className="text-[#C0C8D0]" />
    },
    {
      id: 'F3',
      title: 'Fase 3: Brigada de Cristo',
      subtitle: 'Meses 9-12 • Madurez & Corona de Oro',
      phaseKey: '3 - Perfeccionamiento' as Student['phase'],
      items: f3Students,
      color: 'border-temple-gold/50',
      bgHeader: 'bg-temple-gold/15',
      badgeColor: 'text-temple-gold bg-temple-gold/20 border-temple-gold/40',
      icon: <Award size={18} className="text-temple-gold" />
    }
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12 font-sans flex flex-col min-h-[calc(100vh-140px)]">
      
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0E1424] via-[#0B0F19] to-black p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
              Metodología Oficial de 3 Fases
            </span>
            <span className="text-xs text-gray-400 font-bold">25 Escuadrones Tácticos</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-tight">
            Pipeline de Progresión & Madurez
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Transición guiada: Desde Fase 1 (Iniciación / Bronce) hasta Fase 3 (Liderazgo / Corona de Oro).
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Buscar atleta en fases..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-temple-gold transition-colors text-white"
          />
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-start">
        {stages.map((stage, idx) => (
          <div 
            key={stage.id}
            className={`flex flex-col bg-[#0B0F19] rounded-2xl border ${stage.color} overflow-hidden shadow-xl min-h-[500px]`}
          >
            {/* Stage Column Header */}
            <div className={`p-4 ${stage.bgHeader} border-b border-white/10 flex items-center justify-between`}>
              <div className="flex items-center gap-2.5">
                {stage.icon}
                <div>
                  <h3 className="font-serif font-bold text-white text-xs uppercase tracking-wider">
                    {stage.title}
                  </h3>
                  <span className="text-[9px] text-gray-400 font-bold block">{stage.subtitle}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${stage.badgeColor}`}>
                {stage.items.length}
              </span>
            </div>

            {/* Stage Items List */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[650px] custom-scrollbar">
              {stage.items.map(student => (
                <motion.div
                  key={student.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#0E1424] hover:bg-[#12192c] border border-white/10 hover:border-temple-gold/40 p-4 rounded-xl transition-all shadow-lg group space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-serif font-bold text-temple-gold text-xs group-hover:scale-105 transition-transform">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 
                          onClick={() => {
                            setSelectedStudent(student);
                            if (onNavigate) onNavigate('directory');
                          }}
                          className="font-bold text-xs text-white group-hover:text-temple-gold transition-colors cursor-pointer"
                          title="Ver en Directorio"
                        >
                          {student.name}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono block">{student.phone || 'Sin celular'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2 bg-black/40 rounded-lg border border-white/5 text-[10px]">
                    <div>
                      <span className="text-gray-500 block text-[8px] uppercase font-bold">Escuadrón</span>
                      <span className="font-bold text-gray-300">{student.escuadronId || 'Alfa-1'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[8px] uppercase font-bold">Peso</span>
                      <span className="font-bold text-temple-gold">{student.weightKg || 70} kg</span>
                    </div>
                  </div>

                  {/* Stage Transition Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <div>
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => movePhase(student.id, stages[idx - 1].phaseKey)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition flex items-center gap-1 text-[10px] uppercase font-bold"
                          title="Retroceder a Fase Anterior"
                        >
                          <ArrowLeft size={12} />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          const text = encodeURIComponent(`¡Hola ${student.name}! Te escribo del Templo TempleFit respecto a tu avance en la ${stage.title}.`);
                          window.open(`https://wa.me/${student.phone?.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition"
                        title="Enviar WhatsApp"
                      >
                        <MessageSquare size={13} />
                      </button>

                      {idx < stages.length - 1 && (
                        <button
                          type="button"
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
