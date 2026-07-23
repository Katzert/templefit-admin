import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  Users, UserCheck, HeartHandshake, Utensils, Dumbbell, Sparkles, 
  MessageCircle, Plus, Search, Filter, CheckCircle2, AlertCircle, Clock, Save, Edit3, Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

export interface HolisticStudent {
  id: string;
  name: string;
  phone: string;
  email: string;
  instructorAssigned: string;
  status: 'active' | 'expiring' | 'inactive';
  plan: 'Reto 21 Días' | 'CristoFit Camp' | 'Coaching 1 a 1' | 'Plan Integral Mensual';
  startDate: string;
  renewalDate: string;
  
  // Pilar 1: CUERPO (Body)
  physicalGoal: string;
  weightKg: number;
  workoutLevel: 'Principiante' | 'Intermedio' | 'Avanzado';
  
  // Pilar 2: MENTE (Alimentación)
  nutritionPlan: string;
  allergiesOrRestrictions: string;
  
  // Pilar 3: ESPÍRITU (Coaching & Fe)
  spiritualIntention: string;
  mentorshipNotes: string;
}

const DEFAULT_STUDENTS: HolisticStudent[] = [
  {
    id: '1',
    name: 'Carlos Gutiérrez',
    phone: '+59170012345',
    email: 'carlos.g@gmail.com',
    instructorAssigned: 'Paulo (Head Coach)',
    status: 'active',
    plan: 'Plan Integral Mensual',
    startDate: '2026-07-01',
    renewalDate: '2026-08-01',
    physicalGoal: 'Perder 5kg de grasa y mejorar resistencia física',
    weightKg: 82.5,
    workoutLevel: 'Intermedio',
    nutritionPlan: 'Nutrición Anti-inflamatoria + Proteína Limpia',
    allergiesOrRestrictions: 'Intolerante a la lactosa',
    spiritualIntention: 'Fortalecer el hábito de oración matutina y vencer el estrés',
    mentorshipNotes: 'Demuestra gran compromiso en CristoFit Camp. Trabajar constancia en fines de semana.'
  },
  {
    id: '2',
    name: 'Mariana Flores',
    phone: '+59178945612',
    email: 'mariana.f@gmail.com',
    instructorAssigned: 'Paulo (Head Coach)',
    status: 'expiring',
    plan: 'Reto 21 Días',
    startDate: '2026-07-05',
    renewalDate: '2026-07-26',
    physicalGoal: 'Tonificación muscular y postura',
    weightKg: 61.0,
    workoutLevel: 'Principiante',
    nutritionPlan: 'Plan Detox + Recomposición Corporal',
    allergiesOrRestrictions: 'Ninguna',
    spiritualIntention: 'Renovación de mentalidad y enfoque espiritual diario',
    mentorshipNotes: 'Avance notable en 2 semanas. Recordar renovación de plan antes del viernes.'
  },
  {
    id: '3',
    name: 'Roberto Vaca',
    phone: '+59176543210',
    email: 'roberto.vaca@hotmail.com',
    instructorAssigned: 'Equipo TempleFit',
    status: 'active',
    plan: 'CristoFit Camp',
    startDate: '2026-06-15',
    renewalDate: '2026-08-15',
    physicalGoal: 'Aumentar masa magra y energía vital',
    weightKg: 76.0,
    workoutLevel: 'Avanzado',
    nutritionPlan: 'Hipertrofia Funcional',
    allergiesOrRestrictions: 'Evitar exceso de sodio',
    spiritualIntention: 'Liderazgo familiar con ejemplo de disciplina',
    mentorshipNotes: 'Asiste puntualmente los sábados a las 7am.'
  },
  {
    id: '4',
    name: 'Sofía Mendizábal',
    phone: '+59171239876',
    email: 'sofia.m@gmail.com',
    instructorAssigned: 'Paulo (Head Coach)',
    status: 'active',
    plan: 'Coaching 1 a 1',
    startDate: '2026-07-10',
    renewalDate: '2026-08-10',
    physicalGoal: 'Rehabilitación de hombro y fortalecimiento de core',
    weightKg: 58.5,
    workoutLevel: 'Intermedio',
    nutritionPlan: 'Proteína Bio-optimizada y Suplementación limpia',
    allergiesOrRestrictions: 'Sensible al gluten',
    spiritualIntention: 'Paz mental en la toma de decisiones ejecutivas',
    mentorshipNotes: 'Sesiones personalizadas los martes y jueves a las 18:00.'
  },
  {
    id: '5',
    name: 'Diego Roca',
    phone: '+59174561230',
    email: 'diego.roca@gmail.com',
    instructorAssigned: 'Equipo TempleFit',
    status: 'expiring',
    plan: 'Reto 21 Días',
    startDate: '2026-07-03',
    renewalDate: '2026-07-24',
    physicalGoal: 'Reducir porcentaje de grasa corporal y mejorar cardio',
    weightKg: 89.0,
    workoutLevel: 'Principiante',
    nutritionPlan: 'Déficit Calórico Estructurado',
    allergiesOrRestrictions: 'Ninguna',
    spiritualIntention: 'Construir carácter inquebrantable y eliminar procrastinación',
    mentorshipNotes: 'Contactar por WhatsApp para agendar renovación de ciclo.'
  }
];

export function Module8TeamOperations() {
  const { user } = useAuth();
  const [students, setStudents] = useState<HolisticStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expiring' | 'inactive'>('all');
  const [selectedStudent, setSelectedStudent] = useState<HolisticStudent | null>(null);

  const studentsKey = 'templefit_holistic_students_v3';

  useEffect(() => {
    const saved = localStorage.getItem(studentsKey);
    if (saved) {
      try { setStudents(JSON.parse(saved)); } catch (e) { setStudents(DEFAULT_STUDENTS); }
    } else {
      setStudents(DEFAULT_STUDENTS);
    }
  }, []);

  const saveStudents = (newStudents: HolisticStudent[]) => {
    setStudents(newStudents);
    localStorage.setItem(studentsKey, JSON.stringify(newStudents));
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sendWhatsAppReminder = (student: HolisticStudent) => {
    const message = `¡Hola ${student.name}! 💪 Espero que estés teniendo una excelente semana. Te escribo desde TempleFit para recordarte que tu plan (${student.plan}) está próximo a renovar el ${student.renewalDate}. ¿Sigues listo para continuar tu transformación en cuerpo, mente y espíritu? ¡Confirmame para reservar tu cupo! 🙏⚡`;
    const cleanPhone = student.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const updateStudentField = (id: string, field: keyof HolisticStudent, value: any) => {
    const updated = students.map(s => s.id === id ? { ...s, [field]: value } : s);
    saveStudents(updated);
    if (selectedStudent?.id === id) {
      setSelectedStudent({ ...selectedStudent, [field]: value });
    }
  };

  const addStudent = () => {
    const newStudent: HolisticStudent = {
      id: Date.now().toString(),
      name: 'Nuevo Alumno',
      phone: '+591',
      email: '',
      instructorAssigned: 'Paulo (Head Coach)',
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
      mentorshipNotes: 'Notas iniciales de evaluación.'
    };
    saveStudents([newStudent, ...students]);
    setSelectedStudent(newStudent);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-16 font-sans">
      
      {/* Header CRM */}
      <motion.div variants={item} className="border-b border-white/10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-temple-gold/10 border border-temple-gold/30 rounded-xl text-temple-gold">
              <Users size={24} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-temple-gold">Módulo de CRM Integral</span>
              <h1 className="text-3xl md:text-4xl font-serif font-black uppercase text-white tracking-tight">
                GESTIÓN DE ALUMNOS <span className="text-temple-gold italic">& COACHING</span>
              </h1>
            </div>
          </div>

          <button
            onClick={addStudent}
            className="flex items-center gap-2 px-4 py-2.5 bg-temple-gold text-black font-bold uppercase tracking-widest text-[11px] rounded-xl hover:bg-temple-gold-bright transition-all shadow-lg self-start md:self-auto"
          >
            <Plus size={16} /> Registrar Nuevo Alumno
          </button>
        </div>
        <p className="text-xs text-gray-400 max-w-2xl mt-2">
          Seguimiento completo en las 3 dimensiones (Cuerpo, Mente y Espíritu), control de renovaciones y contacto directo por WhatsApp.
        </p>
      </motion.div>

      {/* Tarjetas resumen de métricas CRM */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl">
            <UserCheck size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Alumnos Activos</p>
            <h3 className="text-2xl font-black text-white">{students.filter(s => s.status === 'active').length}</h3>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Por Renovar (Esta semana)</p>
            <h3 className="text-2xl font-black text-amber-400">{students.filter(s => s.status === 'expiring').length}</h3>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-temple-gold/10 text-temple-gold border border-temple-gold/20 rounded-xl">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Programas de Coaching</p>
            <h3 className="text-2xl font-black text-white">4 Activos</h3>
          </div>
        </div>
      </motion.div>

      {/* Lista de Alumnos e Interfaz CRM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Columna Izquierda: Tabla de Alumnos */}
        <motion.div variants={item} className="lg:col-span-7 space-y-4">
          <Card className="bg-black/40 border-white/10">
            <CardContent className="!p-4 space-y-4">
              
              {/* Buscador y Filtros */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o teléfono..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold"
                  />
                </div>

                <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10 w-full sm:w-auto">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'active', label: 'Activos' },
                    { id: 'expiring', label: 'Por Renovar' },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setStatusFilter(f.id as any)}
                      className={`px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-[9px] transition-all flex-1 sm:flex-none ${
                        statusFilter === f.id ? 'bg-temple-gold text-black shadow-md' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabla de Alumnos */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-black/60">
                    <TableRow className="hover:bg-transparent border-white/5">
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Alumno</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Programa / Estado</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Renovación</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length === 0 ? (
                      <TableRow className="border-white/5">
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500 text-xs">
                          No se encontraron alumnos con los criterios seleccionados.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map((s) => (
                        <TableRow 
                          key={s.id} 
                          onClick={() => setSelectedStudent(s)}
                          className={`border-white/5 cursor-pointer transition-colors ${
                            selectedStudent?.id === s.id ? 'bg-temple-gold/10 border-l-2 border-l-temple-gold' : 'hover:bg-white/5'
                          }`}
                        >
                          <TableCell className="align-top">
                            <p className="text-xs font-bold text-white mb-0.5">{s.name}</p>
                            <p className="text-[10px] text-gray-400">{s.phone}</p>
                          </TableCell>
                          <TableCell className="align-top">
                            <span className="text-[10px] font-bold text-temple-gold block mb-1">{s.plan}</span>
                            <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              s.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              s.status === 'expiring' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {s.status === 'active' ? 'Activo' : s.status === 'expiring' ? 'Vence pronto' : 'Inactivo'}
                            </span>
                          </TableCell>
                          <TableCell className="align-top text-xs text-gray-300 font-mono">
                            {s.renewalDate}
                          </TableCell>
                          <TableCell className="align-top text-right">
                            <button
                              onClick={(e) => { e.stopPropagation(); sendWhatsAppReminder(s); }}
                              className="p-2 bg-green-500/10 hover:bg-green-500 hover:text-black text-green-400 rounded-lg transition-all border border-green-500/20 inline-flex items-center gap-1 text-[10px] font-bold"
                              title="Enviar Recordatorio por WhatsApp"
                            >
                              <MessageCircle size={14} /> WhatsApp
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

            </CardContent>
          </Card>
        </motion.div>

        {/* Columna Derecha: Ficha Integral del Alumno Seleccionado (Cuerpo, Mente, Espíritu) */}
        <motion.div variants={item} className="lg:col-span-5">
          {selectedStudent ? (
            <Card className="bg-black/40 border-white/10 sticky top-6">
              <CardContent className="!p-6 space-y-6">
                
                {/* Header Alumno */}
                <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-temple-gold">Ficha Integral de Evaluación</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{selectedStudent.name}</h3>
                    <p className="text-xs text-gray-400">{selectedStudent.phone} • {selectedStudent.email || 'Sin email registrado'}</p>
                  </div>
                  <button
                    onClick={() => sendWhatsAppReminder(selectedStudent)}
                    className="px-3 py-1.5 bg-green-500 text-black font-bold uppercase tracking-widest text-[9px] rounded-lg hover:bg-green-400 transition-all flex items-center gap-1 shadow-md"
                  >
                    <MessageCircle size={12} /> WhatsApp
                  </button>
                </div>

                {/* Pilar 1: CUERPO */}
                <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <Dumbbell className="text-temple-gold" size={16} />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pilar 1: Cuerpo (Entrenamiento)</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block font-bold">Nivel</span>
                      <select
                        value={selectedStudent.workoutLevel}
                        onChange={(e) => updateStudentField(selectedStudent.id, 'workoutLevel', e.target.value)}
                        className="bg-black/60 border border-white/10 text-white rounded-lg p-1.5 text-xs w-full focus:outline-none focus:border-temple-gold"
                      >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block font-bold">Peso (Kg)</span>
                      <input
                        type="number"
                        step="0.1"
                        value={selectedStudent.weightKg}
                        onChange={(e) => updateStudentField(selectedStudent.id, 'weightKg', parseFloat(e.target.value))}
                        className="bg-black/60 border border-white/10 text-white rounded-lg p-1.5 text-xs w-full focus:outline-none focus:border-temple-gold font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-bold mb-1">Objetivo Físico</span>
                    <input
                      type="text"
                      value={selectedStudent.physicalGoal}
                      onChange={(e) => updateStudentField(selectedStudent.id, 'physicalGoal', e.target.value)}
                      className="bg-black/60 border border-white/10 text-gray-200 rounded-lg p-2 text-xs w-full focus:outline-none focus:border-temple-gold"
                    />
                  </div>
                </div>

                {/* Pilar 2: MENTE (Alimentación) */}
                <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <Utensils className="text-temple-gold-bright" size={16} />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pilar 2: Mente & Nutrición</h4>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-bold mb-1">Plan Nutricional Asignado</span>
                    <input
                      type="text"
                      value={selectedStudent.nutritionPlan}
                      onChange={(e) => updateStudentField(selectedStudent.id, 'nutritionPlan', e.target.value)}
                      className="bg-black/60 border border-white/10 text-gray-200 rounded-lg p-2 text-xs w-full focus:outline-none focus:border-temple-gold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-bold mb-1">Alergias o Restricciones</span>
                    <input
                      type="text"
                      value={selectedStudent.allergiesOrRestrictions}
                      onChange={(e) => updateStudentField(selectedStudent.id, 'allergiesOrRestrictions', e.target.value)}
                      className="bg-black/60 border border-white/10 text-gray-200 rounded-lg p-2 text-xs w-full focus:outline-none focus:border-temple-gold"
                    />
                  </div>
                </div>

                {/* Pilar 3: ESPÍRITU (Coaching & Fe) */}
                <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <HeartHandshake className="text-temple-green" size={16} />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pilar 3: Espíritu & Enfoque</h4>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-bold mb-1">Propósito Espiritual / Oración</span>
                    <input
                      type="text"
                      value={selectedStudent.spiritualIntention}
                      onChange={(e) => updateStudentField(selectedStudent.id, 'spiritualIntention', e.target.value)}
                      className="bg-black/60 border border-white/10 text-gray-200 rounded-lg p-2 text-xs w-full focus:outline-none focus:border-temple-gold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block font-bold mb-1">Notas de Mentoria y Coaching 1 a 1</span>
                    <textarea
                      value={selectedStudent.mentorshipNotes}
                      onChange={(e) => updateStudentField(selectedStudent.id, 'mentorshipNotes', e.target.value)}
                      className="bg-black/60 border border-white/10 text-gray-200 rounded-lg p-2 text-xs w-full focus:outline-none focus:border-temple-gold h-20 resize-y"
                    />
                  </div>
                </div>

              </CardContent>
            </Card>
          ) : (
            <div className="bg-black/40 border border-white/10 rounded-2xl p-12 text-center text-gray-500 space-y-3">
              <Users size={36} className="mx-auto text-gray-600" />
              <p className="text-xs font-bold uppercase tracking-widest">Selecciona un alumno de la lista</p>
              <p className="text-[11px] text-gray-600">Haz clic en cualquier alumno para evaluar sus 3 pilares (Cuerpo, Mente y Espíritu).</p>
            </div>
          )}
        </motion.div>

      </div>

    </motion.div>
  );
}
