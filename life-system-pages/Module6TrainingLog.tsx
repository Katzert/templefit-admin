import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { FieldLabel } from '../components/ui/field-label';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, UserCheck, Activity, MessageSquare, Plus, Save } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface TrainingLog {
  id: string;
  date: string;
  instructorName: string;
  discipline: string;
  feedback: string;
}

const DISCIPLINES = [
  'Boxeo',
  'Kickboxing',
  'Crossfit',
  'Calistenia',
  'Ejercicio Funcional Terapéutico'
];

const PRESET_FEEDBACKS = [
  'Seguir mejorando técnica.',
  'Rendimiento bueno, mejorando técnica.',
  'Excelente energía, enfocar en respiración.',
  'Buena fuerza, cuidar postura en peso libre.'
];

export function Module6TrainingLog() {
  const { user, selectedStudent } = useAuth();
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [newLog, setNewLog] = useState<Partial<TrainingLog>>({
    date: new Date().toISOString().split('T')[0],
    instructorName: user?.role === 'instructor' || user?.role === 'admin' ? user.name : '',
    discipline: DISCIPLINES[0],
    feedback: PRESET_FEEDBACKS[0],
  });

  const isInstructor = user?.role === 'instructor' || user?.role === 'admin';
  const logKey = `templefit_training_log_${selectedStudent?.email || 'default'}`;

  useEffect(() => {
    if (!selectedStudent) return;
    const saved = localStorage.getItem(logKey);
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        setLogs([]);
      }
    } else {
      setLogs([]);
    }
  }, [selectedStudent, logKey]);

  const saveLogs = (updatedLogs: TrainingLog[]) => {
    setLogs(updatedLogs);
    localStorage.setItem(logKey, JSON.stringify(updatedLogs));
  };

  const handleAddLog = () => {
    if (!newLog.date || !newLog.discipline || !newLog.feedback) return;
    
    const entry: TrainingLog = {
      id: Date.now().toString(),
      date: newLog.date,
      instructorName: newLog.instructorName || 'Instructor Designado',
      discipline: newLog.discipline,
      feedback: newLog.feedback,
    };

    saveLogs([entry, ...logs]);
    
    // Reset form
    setNewLog({
      ...newLog,
      feedback: PRESET_FEEDBACKS[0],
    });
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <motion.div variants={item}>
        <h1 className="text-3xl md:text-5xl font-serif font-black uppercase text-white">
          REGISTRO <span className="text-temple-gold italic">ENTRENAMIENTO</span>
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-xl">
          Historial cronológico de clases asistidas, rendimiento y feedback directo del instructor.
        </p>
      </motion.div>

      {/* Info Card */}
      <motion.div variants={item}>
        <Card className="border-t-4 border-t-temple-gold bg-black/40">
          <CardContent className="!p-6 flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-3 text-gray-300">
              <User size={20} className="text-temple-gold" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Atleta</p>
                <p className="text-sm font-bold">{selectedStudent?.name || 'Seleccione un alumno'}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3 text-gray-300">
              <Activity size={20} className="text-temple-gold" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Total Clases</p>
                <p className="text-sm font-bold">{logs.length} sesiones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add New Log Form (Instructor Only) */}
      {isInstructor && selectedStudent && (
        <motion.div variants={item}>
          <Card>
            <CardContent>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Plus className="text-temple-gold" size={20} />
                Nuevo Registro
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <FieldLabel>Fecha</FieldLabel>
                  <input
                    type="date"
                    value={newLog.date}
                    onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-temple-gold"
                  />
                </div>
                <div>
                  <FieldLabel>Instructor</FieldLabel>
                  <input
                    type="text"
                    value={newLog.instructorName}
                    onChange={(e) => setNewLog({ ...newLog, instructorName: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-temple-gold"
                    placeholder="Nombre del instructor"
                  />
                </div>
                <div>
                  <FieldLabel>Disciplina</FieldLabel>
                  <select
                    value={newLog.discipline}
                    onChange={(e) => setNewLog({ ...newLog, discipline: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-temple-gold"
                  >
                    {DISCIPLINES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <FieldLabel>Feedback Rápido</FieldLabel>
                  <select
                    value={PRESET_FEEDBACKS.includes(newLog.feedback || '') ? newLog.feedback : 'custom'}
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        setNewLog({ ...newLog, feedback: e.target.value });
                      }
                    }}
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-temple-gold"
                  >
                    {PRESET_FEEDBACKS.map(f => <option key={f} value={f}>{f}</option>)}
                    <option value="custom">Personalizado...</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <FieldLabel>Notas de Rendimiento</FieldLabel>
                <textarea
                  value={newLog.feedback}
                  onChange={(e) => setNewLog({ ...newLog, feedback: e.target.value })}
                  rows={2}
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-temple-gold resize-none"
                  placeholder="Ej: Rendimiento bueno, mejorando técnica."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddLog}
                  className="flex items-center gap-2 px-6 py-2 bg-temple-gold text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-temple-gold-bright transition-all"
                >
                  <Save size={16} />
                  Guardar Registro
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* History Table */}
      <motion.div variants={item}>
        <Card>
          <CardContent className="!p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/40">
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[120px]">
                      <div className="flex items-center gap-2"><Calendar size={12} /> Fecha</div>
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[150px]">
                      <div className="flex items-center gap-2"><UserCheck size={12} /> Instructor</div>
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[150px]">
                      <div className="flex items-center gap-2"><Activity size={12} /> Disciplina</div>
                    </TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      <div className="flex items-center gap-2"><MessageSquare size={12} /> Notas de Rendimiento</div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length === 0 ? (
                    <TableRow className="border-white/5">
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500 text-sm">
                        No hay registros de entrenamiento para este atleta.
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow key={log.id} className="border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="text-xs font-medium text-gray-300">
                          {new Date(log.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </TableCell>
                        <TableCell className="text-xs text-gray-400">{log.instructorName}</TableCell>
                        <TableCell>
                          <span className="px-2.5 py-1 rounded-full bg-temple-gold/10 text-temple-gold text-[10px] font-bold uppercase tracking-wider border border-temple-gold/20">
                            {log.discipline}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-300">{log.feedback}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
