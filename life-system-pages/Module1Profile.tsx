import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { InlineEdit } from '../components/ui/inline-edit';
import { FieldLabel } from '../components/ui/field-label';
import { useAuth } from '../context/AuthContext';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Student, AttendanceRecord, ProgressAssessment } from '../types';
import { 
  User, 
  Activity, 
  ArrowLeft, 
  ShieldCheck, 
  Heart, 
  BrainCircuit, 
  Flame, 
  Scale, 
  Phone, 
  Mail, 
  Calendar,
  Save,
  CheckCircle2,
  Edit3,
  Camera,
  Utensils,
  AlertTriangle,
  Sparkles,
  ClipboardList,
  Plus,
  Trash2,
  Award,
  Crown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface Module1ProfileProps {
  onNavigate?: (tab: string) => void;
}

export function Module1Profile({ onNavigate }: Module1ProfileProps) {
  const { selectedStudent, setSelectedStudent } = useAuth();
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'biometrics' | 'nutrition' | 'spirit' | 'assessments'>('biometrics');

  // Student Identity Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [escuadronId, setEscuadronId] = useState("Paz-Alfa");
  const [phase, setPhase] = useState<Student['phase']>("1 - Iniciación");
  const [plan, setPlan] = useState<Student['plan']>("Reto 21 Días");
  const [status, setStatus] = useState<Student['status']>("active");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("1995-01-01");
  const [isVipProfile, setIsVipProfile] = useState<boolean>(false);

  // Biometrics & Body (Pilar 1)
  const [heightM, setHeightM] = useState<number>(1.75);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [bloodType, setBloodType] = useState<string>("O+");
  const [currentRoutineExercises, setCurrentRoutineExercises] = useState<string>("");
  const [workoutLevel, setWorkoutLevel] = useState<Student['workoutLevel']>("Intermedio");

  // Nutrition & Clinical / Psychology (Pilar 2)
  const [currentDiet, setCurrentDiet] = useState<string>("");
  const [prescribedDiet, setPrescribedDiet] = useState<string>("");
  const [allergies, setAllergies] = useState<string>("Ninguna");
  const [eatingDisordersOrIssues, setEatingDisordersOrIssues] = useState<string>("");
  const [neuroticAndStressFactors, setNeuroticAndStressFactors] = useState<string>("");

  // Spirit & Mentorship (Pilar 3)
  const [purpose, setPurpose] = useState<string>("");
  const [traits, setTraits] = useState<string>("");
  const [mentorshipNotes, setMentorshipNotes] = useState<string>("");

  // Attendance & Assessments
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [assessments, setAssessments] = useState<ProgressAssessment[]>([]);

  // Calculate age from birthDate
  const age = useMemo(() => {
    if (!birthDate) return 30;
    const diffMs = Date.now() - new Date(birthDate).getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }, [birthDate]);

  // Dynamic IMC calculation
  const imc = useMemo(() => {
    const h = heightM > 3 ? heightM / 100 : (heightM || 1.75); // normalize cm to meters if needed
    if (!h || h <= 0) return 22.0;
    const calc = weightKg / (h * h);
    return Number(calc.toFixed(1));
  }, [weightKg, heightM]);

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Bajo Peso', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
    if (val < 25) return { label: 'Peso Saludable / Óptimo', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (val < 30) return { label: 'Sobrepeso Leve', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { label: 'Recomposición Requerida (Obesidad)', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' };
  };

  const bmiCategory = getBmiCategory(imc);

  // Load all students
  useEffect(() => {
    const db = getCRMDatabase();
    setAllStudents(db.students || []);
    if (!selectedStudent && db.students && db.students.length > 0) {
      setSelectedStudent(db.students[0]);
    }
  }, [selectedStudent, setSelectedStudent]);

  // Load active student profile
  useEffect(() => {
    if (!selectedStudent) return;
    
    setName(selectedStudent.name || "");
    setPhone(selectedStudent.phone || "");
    setEmail(selectedStudent.email || "");
    setEscuadronId(selectedStudent.escuadronId || "Paz-Alfa");
    setPhase(selectedStudent.phase || "1 - Iniciación");
    setPlan(selectedStudent.plan || "Reto 21 Días");
    setStatus(selectedStudent.status || "active");
    setAvatarUrl(selectedStudent.avatarUrl || "");
    setBirthDate(selectedStudent.birthDate || "1995-01-01");
    setIsVipProfile(!!selectedStudent.isVipProfile);

    setHeightM(selectedStudent.heightM || 1.75);
    setWeightKg(selectedStudent.weightKg || 75);
    setWorkoutLevel(selectedStudent.workoutLevel || "Intermedio");
    setCurrentRoutineExercises(selectedStudent.currentRoutineExercises || "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Cardio funcional 06:00 AM");

    setCurrentDiet(selectedStudent.currentDiet || "Alimentación irregular, café sin desayuno y cenas altas en carbohidratos.");
    setPrescribedDiet(selectedStudent.prescribedDiet || selectedStudent.nutritionPlan || "Desayuno con ElectroHidra + Bowl de Elías. Almuerzo anti-inflamatorio y cena ligera 19:30.");
    setAllergies(selectedStudent.allergiesOrRestrictions || "Ninguna");
    setEatingDisordersOrIssues(selectedStudent.eatingDisordersOrIssues || "Sin trastornos diagnosticados; tendencia a picar por ansiedad.");
    setNeuroticAndStressFactors(selectedStudent.neuroticAndStressFactors || "Tensión laboral por jornadas largas; insomnio ocasional.");

    setPurpose(selectedStudent.spiritualIntention || selectedStudent.physicalGoal || "Fortalecer cuerpo, mente y espíritu con disciplina diaria.");
    setTraits(selectedStudent.physicalGoal || "Disciplinado, perseverante, enfocado en liderar su escuadrón.");
    setMentorshipNotes(selectedStudent.mentorshipNotes || "Excelente compromiso en CristoFit Camp.");

    setAttendanceHistory(selectedStudent.attendanceHistory || [
      { date: '2026-08-20', attended: true, notes: 'Sesión CristoFit Camp - 100%' },
      { date: '2026-08-22', attended: true, notes: 'Reto 21 Días - Evaluación' },
      { date: '2026-08-25', attended: true, notes: 'Calistenia y respiración' }
    ]);

    setAssessments(selectedStudent.assessments || [
      { date: '2026-08-01', weightKg: selectedStudent.weightKg || 75, heightM: selectedStudent.heightM || 1.75, imc: 24.5, notes: 'Ingreso inicial' }
    ]);
  }, [selectedStudent]);

  const handleSaveField = (field: string, newValue: any) => {
    if (!selectedStudent) return;

    const db = getCRMDatabase();
    let updatedActiveStudent: Student = { ...selectedStudent };

    const updatedStudents = db.students.map(s => {
      if (s.id === selectedStudent.id) {
        const updated: Student = { ...s };
        if (field === 'name') updated.name = String(newValue);
        if (field === 'phone') updated.phone = String(newValue);
        if (field === 'email') updated.email = String(newValue);
        if (field === 'escuadronId') updated.escuadronId = String(newValue);
        if (field === 'phase') updated.phase = newValue;
        if (field === 'plan') updated.plan = newValue;
        if (field === 'status') updated.status = newValue;
        if (field === 'avatarUrl') updated.avatarUrl = String(newValue);
        if (field === 'birthDate') updated.birthDate = String(newValue);
        if (field === 'isVipProfile') updated.isVipProfile = Boolean(newValue);
        if (field === 'heightM') updated.heightM = Number(newValue);
        if (field === 'weightKg') updated.weightKg = Number(newValue);
        if (field === 'workoutLevel') updated.workoutLevel = newValue;
        if (field === 'currentRoutineExercises') updated.currentRoutineExercises = String(newValue);
        if (field === 'currentDiet') updated.currentDiet = String(newValue);
        if (field === 'prescribedDiet') updated.prescribedDiet = String(newValue);
        if (field === 'allergies') updated.allergiesOrRestrictions = String(newValue);
        if (field === 'eatingDisordersOrIssues') updated.eatingDisordersOrIssues = String(newValue);
        if (field === 'neuroticAndStressFactors') updated.neuroticAndStressFactors = String(newValue);
        if (field === 'purpose') updated.spiritualIntention = String(newValue);
        if (field === 'mentorshipNotes') updated.mentorshipNotes = String(newValue);
        if (field === 'attendanceHistory') updated.attendanceHistory = newValue;
        if (field === 'assessments') updated.assessments = newValue;

        updatedActiveStudent = updated;
        return updated;
      }
      return s;
    });

    db.students = updatedStudents;
    saveCRMDatabase(db);
    setSelectedStudent(updatedActiveStudent);
    setAllStudents(updatedStudents);

    // Update local state
    if (field === 'name') setName(newValue);
    if (field === 'phone') setPhone(newValue);
    if (field === 'email') setEmail(newValue);
    if (field === 'escuadronId') setEscuadronId(newValue);
    if (field === 'phase') setPhase(newValue);
    if (field === 'plan') setPlan(newValue);
    if (field === 'status') setStatus(newValue);
    if (field === 'avatarUrl') setAvatarUrl(newValue);
    if (field === 'birthDate') setBirthDate(newValue);
    if (field === 'isVipProfile') setIsVipProfile(newValue);
    if (field === 'heightM') setHeightM(Number(newValue));
    if (field === 'weightKg') setWeightKg(Number(newValue));
    if (field === 'workoutLevel') setWorkoutLevel(newValue);
    if (field === 'currentRoutineExercises') setCurrentRoutineExercises(newValue);
    if (field === 'currentDiet') setCurrentDiet(newValue);
    if (field === 'prescribedDiet') setPrescribedDiet(newValue);
    if (field === 'allergies') setAllergies(newValue);
    if (field === 'eatingDisordersOrIssues') setEatingDisordersOrIssues(newValue);
    if (field === 'neuroticAndStressFactors') setNeuroticAndStressFactors(newValue);
    if (field === 'purpose') setPurpose(newValue);
    if (field === 'mentorshipNotes') setMentorshipNotes(newValue);
    if (field === 'attendanceHistory') setAttendanceHistory(newValue);
    if (field === 'assessments') setAssessments(newValue);

    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const handleAddAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    const newRecord: AttendanceRecord = {
      date: today,
      attended: true,
      notes: 'Sesión completada en CristoFit Camp'
    };
    const updated = [newRecord, ...attendanceHistory];
    handleSaveField('attendanceHistory', updated);
  };

  const handleAddAssessment = () => {
    const today = new Date().toISOString().split('T')[0];
    const newAssessment: ProgressAssessment = {
      date: today,
      weightKg,
      heightM,
      imc,
      notes: 'Valoración física de control'
    };
    const updated = [newAssessment, ...assessments];
    handleSaveField('assessments', updated);
  };

  if (!selectedStudent) {
    return (
      <div className="text-center py-16 font-sans">
        <User size={48} className="text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-temple-navy dark:text-white mb-2">No hay ningún atleta seleccionado</h3>
        <p className="text-sm text-slate-600 dark:text-gray-400 mb-6">Selecciona un atleta desde el Directorio para abrir su expediente.</p>
        <button
          onClick={() => onNavigate?.('directory')}
          className="px-6 py-2.5 bg-temple-gold text-black rounded-xl font-bold uppercase text-xs hover:bg-amber-400 transition shadow-lg shadow-temple-gold/20"
        >
          Ir al Directorio
        </button>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-16 font-sans relative max-w-7xl mx-auto">
      {/* Toast */}
      {showSavedToast && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl border border-black/20 dark:border-white/20"
        >
          <CheckCircle2 size={16} />
          <span>Ficha Técnica Guardada</span>
        </motion.div>
      )}

      {/* Header Banner & Athlete Info */}
      <motion.div variants={item} className="bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5">
            <button
              onClick={() => onNavigate?.('directory')}
              className="p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 rounded-2xl text-temple-gold border border-black/10 dark:border-white/10 transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
              title="Volver al Directorio"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Directorio</span>
            </button>

            {/* Avatar Upload Container */}
            <div className="relative group cursor-pointer">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        handleSaveField('avatarUrl', base64);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-temple-gold/20 to-amber-500/10 border-2 border-temple-gold/40 flex items-center justify-center text-temple-gold font-black text-2xl relative shadow-xl">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{(name || 'TF').substring(0, 2).toUpperCase()}</span>
                  )}
                  <div className="absolute inset-0 bg-white dark:bg-black/5 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={20} className="text-temple-gold" />
                  </div>
                </div>
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-temple-gold">
                  Ficha Técnica & Expediente 360°
                </span>
                {isVipProfile && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase">
                    <Crown size={12} /> Perfil VIP
                  </span>
                )}
              </div>
              <InlineEdit
                value={name}
                onSave={(val) => handleSaveField('name', val)}
                className="text-2xl md:text-3xl font-serif font-black uppercase text-slate-900 dark:text-white tracking-tight"
                placeholder="Nombre del Atleta"
              />
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Phone size={13} className="text-temple-gold" />
                  <InlineEdit value={phone} onSave={(val) => handleSaveField('phone', val)} placeholder="+591 70000000" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail size={13} className="text-temple-gold" />
                  <InlineEdit value={email} onSave={(val) => handleSaveField('email', val)} placeholder="correo@templefit.com" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Athlete Switcher & Attendance 1-Tap */}
          <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-black/5 dark:bg-black/60 border border-black/10 dark:border-white/10 p-2 rounded-2xl backdrop-blur-md">
            {/* Prev / Next buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const idx = allStudents.findIndex(s => s.id === selectedStudent.id);
                  if (idx > 0) setSelectedStudent(allStudents[idx - 1]);
                  else if (allStudents.length > 0) setSelectedStudent(allStudents[allStudents.length - 1]);
                }}
                className="p-2 hover:bg-black/10 dark:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white rounded-xl transition"
                title="Atleta Anterior"
              >
                <ChevronLeft size={16} />
              </button>

              <select
                value={selectedStudent.id}
                onChange={(e) => {
                  const std = allStudents.find(s => s.id === e.target.value);
                  if (std) setSelectedStudent(std);
                }}
                className="bg-white dark:bg-[#121826] text-temple-navy dark:text-white text-xs font-bold px-2.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 focus:outline-none focus:border-temple-gold/50 cursor-pointer max-w-[180px] truncate"
              >
                {allStudents.map(s => (
                  <option key={s.id} value={s.id} className="bg-white dark:bg-[#121826] text-white">
                    {s.name} {s.isVipProfile ? '⭐' : ''} ({s.escuadronId || 'Paz-Alfa'})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  const idx = allStudents.findIndex(s => s.id === selectedStudent.id);
                  if (idx < allStudents.length - 1) setSelectedStudent(allStudents[idx + 1]);
                  else if (allStudents.length > 0) setSelectedStudent(allStudents[0]);
                }}
                className="p-2 hover:bg-black/10 dark:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white rounded-xl transition"
                title="Siguiente Atleta"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Persistent 1-Tap Attendance Button */}
            {attendanceHistory.some(a => a.date === new Date().toISOString().split('T')[0] && a.attended) ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-extrabold uppercase">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="hidden sm:inline">Presente Hoy</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleAddAttendance}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition shadow-md shadow-emerald-500/20"
              >
                <Plus size={14} />
                <span>Marcar Asistencia Hoy</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Snapshot Bar */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 rounded-2xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500">Escuadrón Asignado</p>
          <InlineEdit 
            value={escuadronId} 
            onSave={(val) => handleSaveField('escuadronId', val)} 
            className="text-base font-black text-temple-gold mt-1"
            placeholder="Ej. Gedeón-1" 
          />
        </div>

        <div className="p-4 bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 rounded-2xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500">Fase del Programa</p>
          <select
            value={phase}
            onChange={(e) => handleSaveField('phase', e.target.value as any)}
            className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1 text-xs font-black text-temple-navy dark:text-white focus:outline-none focus:border-temple-gold cursor-pointer mt-1"
          >
            <option className="bg-white dark:bg-[#121826]" value="1 - Iniciación">Fase 1 - Escuadrón de Paz</option>
            <option className="bg-white dark:bg-[#121826]" value="2 - Desarrollo">Fase 2 - Gedeón (21 Días)</option>
            <option className="bg-white dark:bg-[#121826]" value="3 - Perfeccionamiento">Fase 3 - Escuadrón de Cristo</option>
          </select>
        </div>

        <div className="p-4 bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 rounded-2xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500">Plan de Membresía</p>
          <select
            value={plan}
            onChange={(e) => handleSaveField('plan', e.target.value as any)}
            className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1 text-xs font-black text-temple-navy dark:text-white focus:outline-none focus:border-temple-gold cursor-pointer mt-1"
          >
            <option className="bg-white dark:bg-[#121826]" value="Reto 21 Días">Reto 21 Días = ÍNTEGROS</option>
            <option className="bg-white dark:bg-[#121826]" value="Plan Integral Mensual">Plan Integral Mensual</option>
            <option className="bg-white dark:bg-[#121826]" value="CristoFit Camp">CristoFit Camp</option>
            <option className="bg-white dark:bg-[#121826]" value="Coaching 1 a 1">Coaching 1 a 1</option>
          </select>
        </div>

        <div className="p-4 bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 rounded-2xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500">Estado de Membresía</p>
          <select
            value={status}
            onChange={(e) => handleSaveField('status', e.target.value as any)}
            className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-2.5 py-1 text-xs font-black text-emerald-400 focus:outline-none focus:border-temple-gold cursor-pointer uppercase mt-1"
          >
            <option className="bg-white dark:bg-[#121826] text-emerald-400" value="active">Activo</option>
            <option className="bg-white dark:bg-[#121826] text-amber-400" value="expiring">Por Vencer</option>
            <option className="bg-white dark:bg-[#121826] text-red-400" value="inactive">Inactivo</option>
          </select>
        </div>
      </motion.div>

      {/* 1-TAP PRESET TEMPLATES BAR (ANTI-BURNOUT) */}
      <motion.div variants={item} className="bg-black/5 dark:bg-black/60 border border-black/10 dark:border-white/10 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-temple-gold shrink-0" />
          <span className="text-xs font-black uppercase tracking-wider text-white">Plantillas Rápidas (1 Toque):</span>
          <span className="text-[10px] text-slate-600 dark:text-gray-400 hidden md:inline">Autocompleta rutina y nutrición al instante</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              handleSaveField('phase', '1 - Iniciación');
              handleSaveField('workoutLevel', 'Principiante');
              handleSaveField('currentRoutineExercises', '1. Calistenia básica y movilidad articular (06:00 AM)\n2. Sentadillas con peso corporal (4x15)\n3. Flexiones inclinadas y planchas (4x30s)\n4. Respiración diafragmática y caminata');
              handleSaveField('prescribedDiet', 'Desayuno con ElectroHidra. Almuerzo anti-inflamatorio con proteína limpia y ensaladas verdes. Cena ligera antes de las 19:30.');
              handleSaveField('purpose', 'Cimentar el hábito de entrenamiento matutino y disciplina básica.');
            }}
            className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-extrabold uppercase tracking-wider transition"
          >
            ⚡ Plantilla Fase 1 (Paz)
          </button>
          <button
            type="button"
            onClick={() => {
              handleSaveField('phase', '2 - Desarrollo');
              handleSaveField('workoutLevel', 'Intermedio');
              handleSaveField('currentRoutineExercises', '1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Circuito de fuerza funcional CristoFit Camp (06:00 AM)');
              handleSaveField('prescribedDiet', 'Desayuno Bowl de Elías + ElectroHidra. Hidratación 3L diarios. Suplementación con Glutamina post-entreno y Omega-3.');
              handleSaveField('purpose', 'Superar el Reto 21 Días = ÍNTEGROS y consolidar transformación física.');
            }}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-extrabold uppercase tracking-wider transition"
          >
            ⚡ Plantilla Fase 2 (Reto 21D)
          </button>
          <button
            type="button"
            onClick={() => {
              handleSaveField('phase', '3 - Perfeccionamiento');
              handleSaveField('workoutLevel', 'Avanzado');
              handleSaveField('currentRoutineExercises', '1. Muscle-up y transiciones en anillas (4x5)\n2. Pistols y sentadillas pesadas (4x8)\n3. Fondos lastrados y dominadas con peso\n4. Liderazgo de escuadrón y cardio táctico');
              handleSaveField('prescribedDiet', 'Nutrición de alta densidad nutricional. Ayuno intermitente 16/8 y reposición isotónica completa.');
              handleSaveField('purpose', 'Liderazgo en el Escuadrón de Cristo y servicio en la comunidad (E.A.G.E.).');
            }}
            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-extrabold uppercase tracking-wider transition"
          >
            ⚡ Plantilla Fase 3 (Cristo)
          </button>
        </div>
      </motion.div>

      {/* Sub-Tabs Selector */}
      <div className="flex flex-wrap gap-2 bg-white dark:bg-black/5 dark:bg-black/60 p-2 rounded-2xl border border-black/10 dark:border-white/10">
        {[
          { id: 'biometrics', label: '1. Biometría, IMC & Rutina', icon: <Scale size={15} /> },
          { id: 'nutrition', label: '2. Nutrición & Salud Mental', icon: <Utensils size={15} /> },
          { id: 'spirit', label: '3. Propósito & Mentoría', icon: <BrainCircuit size={15} /> },
          { id: 'assessments', label: '4. Asistencias & Valoraciones', icon: <ClipboardList size={15} /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === t.id
                ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white hover:bg-black/5 dark:bg-white/5'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <AnimatePresence mode="wait">
        {/* TAB 1: BIOMETRÍA & IMC */}
        {activeTab === 'biometrics' && (
          <motion.div
            key="biometrics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* IMC Score Card & Antropometría */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-temple-gold/30 bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                    <Scale className="text-temple-gold" size={18} />
                    Cálculo Antropométrico & IMC
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dynamic IMC Score Box */}
                  <div className={`p-5 rounded-2xl border ${bmiCategory.bg} flex flex-col gap-2`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-gray-400">
                        Índice de Masa Corporal (IMC)
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${bmiCategory.color}`}>
                        {bmiCategory.label}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black text-temple-navy dark:text-white">{imc}</span>
                      <span className="text-xs text-slate-600 dark:text-gray-400 font-medium">kg/m² (Cálculo automático)</span>
                    </div>
                    <div className="w-full bg-white dark:bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden mt-1">
                      <div 
                        className={`h-full transition-all duration-500 ${imc < 18.5 ? 'bg-blue-400' : imc < 25 ? 'bg-emerald-400' : imc < 30 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.min(Math.max(((imc - 15) / 25) * 100, 5), 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel label="Peso Actual (kg)" tooltip="Peso corporal en kilogramos" />
                      <InlineEdit 
                        value={String(weightKg)} 
                        onSave={(val) => handleSaveField('weightKg', Number(val) || 75)} 
                        placeholder="75" 
                      />
                    </div>
                    <div>
                      <FieldLabel label="Altura (metros)" tooltip="Ejemplo: 1.75 para 1 metro y 75 cm" />
                      <InlineEdit 
                        value={String(heightM)} 
                        onSave={(val) => handleSaveField('heightM', Number(val) || 1.75)} 
                        placeholder="1.75" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel label="Fecha de Nacimiento" tooltip="Usado para calcular edad y metabolismo" />
                      <InlineEdit 
                        value={birthDate} 
                        onSave={(val) => handleSaveField('birthDate', val)} 
                        placeholder="AAAA-MM-DD" 
                      />
                      <span className="text-[10px] text-slate-500 dark:text-gray-500 font-bold mt-1 block">Edad estimada: {age} años</span>
                    </div>
                    <div>
                      <FieldLabel label="Nivel de Entrenamiento" />
                      <select
                        value={workoutLevel}
                        onChange={(e) => handleSaveField('workoutLevel', e.target.value as any)}
                        className="w-full bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-black text-temple-navy dark:text-white focus:outline-none focus:border-temple-gold cursor-pointer"
                      >
                        <option className="bg-white dark:bg-[#121826]" value="Principiante">Principiante</option>
                        <option className="bg-white dark:bg-[#121826]" value="Intermedio">Intermedio</option>
                        <option className="bg-white dark:bg-[#121826]" value="Avanzado">Avanzado</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ejercicios y Rutina Actual con Ejemplos */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="border-black/10 dark:border-white/10 bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl shadow-2xl h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                    <Activity className="text-red-400" size={18} />
                    Ficha Técnica de Ejercicios y Rutina Actual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <FieldLabel 
                      label="Rutina Actual & Ejemplos Prescritos" 
                      tooltip="Lista de ejercicios con series, repeticiones y tempos asignados para este ciclo."
                    />
                    <InlineEdit
                      value={currentRoutineExercises}
                      onSave={(val) => handleSaveField('currentRoutineExercises', val)}
                      multiline
                      className="tabular-nums text-xs leading-relaxed text-gray-200 bg-slate-50 dark:bg-black/40 p-4 rounded-xl border border-black/10 dark:border-white/10"
                      placeholder="1. Dominadas estrictas (4x8)..."
                    />
                  </div>

                  <div className="p-4 bg-white dark:bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 text-xs space-y-2">
                    <span className="font-bold text-temple-gold uppercase text-[10px] tracking-wider block">
                      💡 Estructura Recomendada de Rutina
                    </span>
                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                      Incluye: Calentamiento articular → Ejercicio compuesto principal → Calistenia o fuerza → Cardio funcional → Respiración final.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* TAB 2: NUTRICIÓN & SALUD MENTAL */}
        {activeTab === 'nutrition' && (
          <motion.div
            key="nutrition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Comparativa Nutricional: Actual vs Programada */}
            <div className="lg:col-span-6 space-y-6">
              <Card className="border-black/10 dark:border-white/10 bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                    <Utensils className="text-emerald-400" size={18} />
                    Plan Nutricional Dual (Actual vs Programado)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <FieldLabel 
                      label="Alimentación Actual (Cómo llega el atleta)" 
                      tooltip="Hábitos alimenticios reales con los que ingresa al programa."
                    />
                    <InlineEdit
                      value={currentDiet}
                      onSave={(val) => handleSaveField('currentDiet', val)}
                      multiline
                      className="text-xs text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-black/40 p-3 rounded-xl border border-black/10 dark:border-white/10"
                      placeholder="Ej. Café en ayunas, comida rápida al mediodía y cenas copiosas..."
                    />
                  </div>

                  <div>
                    <FieldLabel 
                      label="Alimentación Programada (Protocolo TempleFit)" 
                      tooltip="Plan nutricional prescrito: horarios, hidratación ElectroHidra y comidas anti-inflamatorias."
                    />
                    <InlineEdit
                      value={prescribedDiet}
                      onSave={(val) => handleSaveField('prescribedDiet', val)}
                      multiline
                      className="text-xs font-bold text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30"
                      placeholder="Ej. Desayuno con avena y chía, almuerzo con proteína limpia y cena ligera..."
                    />
                  </div>

                  <div>
                    <FieldLabel label="Alergias o Restricciones Médicas" />
                    <InlineEdit
                      value={allergies}
                      onSave={(val) => handleSaveField('allergies', val)}
                      placeholder="Ej. Intolerante a lactosa, celiaquía o mariscos..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trastornos Alimenticios y Factores Neuróticos / Estrés */}
            <div className="lg:col-span-6 space-y-6">
              <Card className="border-amber-500/30 bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                    <AlertTriangle className="text-amber-400" size={18} />
                    Factores Clínicos & Salud Mental
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <FieldLabel 
                      label="Trastornos o Enfermedades Alimenticias" 
                      tooltip="Historial de atracones por ansiedad, problemas digestivos, gastritis o restricciones severas."
                    />
                    <InlineEdit
                      value={eatingDisordersOrIssues}
                      onSave={(val) => handleSaveField('eatingDisordersOrIssues', val)}
                      multiline
                      className="text-xs text-amber-200 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30"
                      placeholder="Ej. Picar compulsivamente en la noche o gastritis por estrés..."
                    />
                  </div>

                  <div>
                    <FieldLabel 
                      label="Factores Neuróticos, Estrés & Ansiedad" 
                      tooltip="Niveles de cortisol, insomnio, sobrepensamiento o sobrecarga laboral."
                    />
                    <InlineEdit
                      value={neuroticAndStressFactors}
                      onSave={(val) => handleSaveField('neuroticAndStressFactors', val)}
                      multiline
                      className="text-xs text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-black/40 p-3 rounded-xl border border-black/10 dark:border-white/10"
                      placeholder="Ej. Insomnio leve, tensión muscular en cuello por jornada laboral..."
                    />
                  </div>

                  <div className="p-3 bg-white dark:bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 text-[11px] text-slate-600 dark:text-gray-400">
                    <span className="font-bold text-temple-navy dark:text-white block mb-1">Enfoque Preventivo de Paulo:</span>
                    Cada factor de estrés se aborda con respiración diafragmática 06:00 AM y orden de descanso nocturno.
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* TAB 3: PROPÓSITO & MENTORÍA */}
        {activeTab === 'spirit' && (
          <motion.div
            key="spirit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-12 space-y-6">
              <Card className="border-temple-gold/30 bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                    <BrainCircuit className="text-temple-gold" size={18} />
                    Pilar Espíritu & Liderazgo (Coaching & Fe)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <FieldLabel 
                      label="Propósito & Intención Espiritual" 
                      tooltip="Objetivo profundo del atleta: paz mental, liderazgo o consistencia devocional."
                    />
                    <InlineEdit
                      value={purpose}
                      onSave={(val) => handleSaveField('purpose', val)}
                      multiline
                      className="font-serif text-sm md:text-base font-bold leading-relaxed text-temple-gold"
                      placeholder="Ej. Consistencia en devocionales 06:00 AM y dominio propio..."
                    />
                  </div>

                  <div>
                    <FieldLabel 
                      label="Rasgos de Carácter & Fortalezas Observadas" 
                      tooltip="Cualidades de disciplina y liderazgo detectadas por el Head Coach."
                    />
                    <InlineEdit
                      value={traits}
                      onSave={(val) => handleSaveField('traits', val)}
                      multiline
                      placeholder="Ej. Resiliente, líder nato de escuadrón, enfocado..."
                    />
                  </div>

                  <div>
                    <FieldLabel 
                      label="Notas de Mentoría & Seguimiento de Paulo" 
                      tooltip="Bitácora de mentoría 1 a 1 y acuerdos de disciplina."
                    />
                    <InlineEdit
                      value={mentorshipNotes}
                      onSave={(val) => handleSaveField('mentorshipNotes', val)}
                      multiline
                      placeholder="Ej. Cumplió con el reto de hidratación y demostró compromiso..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* TAB 4: ASISTENCIAS & VALORACIONES EN FORMATO TABLA EXCEL SIMÉTRICA */}
        {activeTab === 'assessments' && (
          <motion.div
            key="assessments"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Tabla 1: Registro de Asistencias (Excel Style) */}
            <div className="bg-white dark:bg-[#0B0F19]/80 backdrop-blur-lg border border-black/5 dark:border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-temple-gold">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-temple-navy dark:text-white tracking-wider">
                      Libro de Asistencias ({attendanceHistory.length} registros)
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-gray-400">Control de asistencia cronológico por sesión</p>
                  </div>
                </div>

                <button
                  onClick={handleAddAttendance}
                  className="px-4 py-2 bg-temple-gold text-black rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 hover:bg-amber-400 transition shadow-md self-start sm:self-auto"
                >
                  <Plus size={14} />
                  <span>+ Marcar Asistencia Hoy</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-gray-400 font-black">
                      <th className="pb-3 pr-4 font-black w-32">Fecha</th>
                      <th className="pb-3 pr-4 font-black">Detalle de Sesión & Notas</th>
                      <th className="pb-3 pr-4 font-black w-36 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {attendanceHistory.map((att, idx) => (
                      <tr key={idx} className="hover:bg-black/5 dark:bg-white/5 transition-colors">
                        <td className="py-4 pl-4 tabular-nums font-bold text-temple-gold whitespace-nowrap">
                          {att.date}
                        </td>
                        <td className="py-4 pl-4 text-slate-700 dark:text-gray-300 font-medium">
                          {att.notes || 'Sesión CristoFit Camp'}
                        </td>
                        <td className="py-4 pl-4 text-center whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                            <CheckCircle2 size={12} /> Presente
                          </span>
                        </td>
                      </tr>
                    ))}
                    {attendanceHistory.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-slate-500 dark:text-gray-500 font-medium">
                          Sin sesiones registradas aún. Haz clic en "+ Marcar Asistencia Hoy".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabla 2: Valoraciones Antropométricas & IMC (Excel Style) */}
            <div className="bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-temple-navy dark:text-white tracking-wider">
                      Matriz Antropométrica & Evolución IMC
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-gray-400">Historial simétrico de mediciones corporales</p>
                  </div>
                </div>

                <button
                  onClick={handleAddAssessment}
                  className="px-4 py-2 bg-emerald-500 text-black rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 hover:bg-emerald-400 transition shadow-md self-start sm:self-auto"
                >
                  <Plus size={14} />
                  <span>+ Nueva Valoración</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans text-xs">
                  <thead>
                    <tr className="border-b border-black/10 dark:border-white/10 text-[10px] uppercase tracking-wider text-slate-600 dark:text-gray-400 font-black">
                      <th className="pb-3 pr-4 font-black w-28">Fecha</th>
                      <th className="pb-3 pr-4 font-black w-28 text-right">Peso</th>
                      <th className="pb-3 pr-4 font-black w-24 text-right">Talla</th>
                      <th className="pb-3 pr-4 font-black w-24 text-right">IMC</th>
                      <th className="pb-3 pr-4 font-black w-36 text-center">Diagnóstico</th>
                      <th className="pb-3 pr-4 font-black">Observaciones & Progreso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {assessments.map((ass, idx) => (
                      <tr key={idx} className="hover:bg-black/5 dark:bg-white/5 transition-colors">
                        <td className="py-4 pl-4 tabular-nums font-bold text-temple-gold whitespace-nowrap">
                          {ass.date}
                        </td>
                        <td className="py-4 pl-4 tabular-nums font-black text-temple-navy dark:text-white text-right whitespace-nowrap">
                          {ass.weightKg} kg
                        </td>
                        <td className="py-4 pl-4 tabular-nums text-slate-700 dark:text-gray-300 text-right whitespace-nowrap">
                          {ass.heightM} m
                        </td>
                        <td className="py-4 pl-4 tabular-nums font-black text-emerald-400 text-right whitespace-nowrap">
                          {ass.imc}
                        </td>
                        <td className="py-4 pl-4 text-center whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            ass.imc < 18.5 ? 'bg-blue-500/20 text-blue-400' :
                            ass.imc < 25 ? 'bg-emerald-500/20 text-emerald-400' :
                            ass.imc < 30 ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {ass.imc < 18.5 ? 'Bajo Peso' : ass.imc < 25 ? 'Normopeso' : ass.imc < 30 ? 'Sobrepeso' : 'Obesidad'}
                          </span>
                        </td>
                        <td className="py-4 pl-4 text-slate-700 dark:text-gray-300 font-medium">
                          {ass.notes || 'Evaluación periódica'}
                        </td>
                      </tr>
                    ))}
                    {assessments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500 dark:text-gray-500 font-medium">
                          Sin valoraciones registradas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

