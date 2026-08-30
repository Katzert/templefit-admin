import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  BrainCircuit, 
  Heart, 
  AlertOctagon, 
  CheckCircle2, 
  Zap, 
  Trophy, 
  Target, 
  Droplet, 
  Moon, 
  Dumbbell, 
  Apple, 
  BookOpen, 
  Flame, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Edit3,
  Save,
  Check,
  ShieldCheck,
  ListChecks
} from 'lucide-react';
import confetti from 'canvas-confetti';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

export type MacroStatus = 'green' | 'yellow' | 'red';

export interface MicroRoutinesState {
  water: boolean;
  sleep: boolean;
  workout: boolean;
  nutrition: boolean;
  mind: boolean;
  spirit: boolean;
}

export interface MacroDayRecord {
  date: string; // 'YYYY-MM-DD'
  day: number;
  month: number; // 0-11
  year: number;
  status: MacroStatus;
  pillars: { body: boolean; mind: boolean; spirit: boolean };
  microRoutines: MicroRoutinesState;
  primaryVictory: string;
  primaryAdjustment: string;
  updatedAt: string;
}

type EvaluationType = 'daily' | 'monthly' | 'admin-habits';

const defaultAdminHabits = [
  'Reunión de alineación semanal.',
  'Registro diario de prospectos.',
  'Mentoría grupal de 30 min.',
  'Validación de asistencia técnica.',
  'Auditoría de progreso de atletas.',
  'Checklist de protocolo de premiación.',
  'Análisis de conversión post-evento.',
  'Reporte de rentabilidad mensual.',
  'Planificación estratégica regional.',
  'Coordinación con líderes locales.',
  'Revisión de cumplimiento de objetivos.',
  'Proyección estratégica a largo plazo.'
];

const defaultActionPlans = [
  { phase: 'Mes 1 - Cimentación', plan: 'Firma de roles y setup tecnológico. Registro de responsabilidades y contratos.' },
  { phase: 'Mes 2 - Captación', plan: 'Embudo de ventas y citas con medios. Ventas Reto 21 Días y entrevistas.' },
  { phase: 'Mes 3 - Inicio CAMP (A)', plan: 'Capacitación teórica y práctica inicial. NeuroEntrenamiento y Discipulado (1-30).' },
  { phase: 'Mes 4 - Inicio CAMP (B)', plan: 'Campaña de expectativa masiva. Discipulado (31-60) y transición Parque Urbano.' },
  { phase: 'Mes 5 - Consolidación', plan: 'Refuerzo de ventas y permanencia. Práctica supervisada y Discipulado (61-90).' },
  { phase: 'Mes 6 - Multiplicación (A)', plan: 'Ejecución de primer gran evento masivo c/tarima, Premiación (Copa/Corona).' },
  { phase: 'Mes 7 - Multiplicación (B)', plan: 'Ajuste de logística según resultados previos y segundo evento masivo.' },
  { phase: 'Mes 8 - Multiplicación (C)', plan: 'Consolidación de marca en la ciudad y lanzamiento de iniciativas.' },
  { phase: 'Mes 9 - Expansión (A)', plan: 'Mapeo y apertura de nuevos puntos en nuevas zonas y atracción masiva.' },
  { phase: 'Mes 10 - Expansión (B)', plan: 'Formalización de alianzas estratégicas regionales y consolidación.' },
  { phase: 'Mes 11 - Proyección', plan: 'Análisis integral del rendimiento anual, auditoría de KPIs y sumatoria de logros.' },
  { phase: 'Mes 12 - Consolidación', plan: 'Plan Año 2, Movimiento Consolidado, lanzamiento de servicios futuros y celebración.' }
];

const microItems = [
  { key: 'water' as const, label: 'Hidratación 3L', icon: Droplet },
  { key: 'sleep' as const, label: 'Sueño 7h+', icon: Moon },
  { key: 'workout' as const, label: 'Entrenamiento', icon: Dumbbell },
  { key: 'nutrition' as const, label: 'Nutrición', icon: Apple },
  { key: 'mind' as const, label: 'Lectura / Journal', icon: BookOpen },
  { key: 'spirit' as const, label: 'Fe / Gratitud', icon: Flame },
];

function formatDateKey(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function getTodayKey(): string {
  const now = new Date();
  return formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

// Pseudo-random deterministic generator for consistent mock history per student and date
function deterministicSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateInitialHistoryForStudent(studentEmail: string, year: number, month: number): Record<string, MacroDayRecord> {
  const records: Record<string, MacroDayRecord> = {};
  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const isPastOrToday = (year < today.getFullYear()) || 
      (year === today.getFullYear() && month < today.getMonth()) || 
      (year === today.getFullYear() && month === today.getMonth() && d <= today.getDate());

    if (!isPastOrToday) continue;

    const dateKey = formatDateKey(year, month, d);
    const seed = deterministicSeed(`${studentEmail}_${dateKey}`);
    const statusScore = seed % 10;
    
    let status: MacroStatus = 'green';
    if (statusScore === 0 || statusScore === 1) status = 'red';
    else if (statusScore === 2 || statusScore === 3) status = 'yellow';

    const hasWater = (seed % 3) !== 0;
    const hasSleep = status === 'green' || (seed % 4) === 0;
    const hasWorkout = status !== 'red';
    const hasNutrition = (seed % 2) === 0;
    const hasMind = (seed % 3) !== 1;
    const hasSpirit = true;

    records[dateKey] = {
      date: dateKey,
      day: d,
      month,
      year,
      status,
      pillars: {
        body: status !== 'red',
        mind: status === 'green' || (seed % 2 === 0),
        spirit: true
      },
      microRoutines: {
        water: hasWater,
        sleep: hasSleep,
        workout: hasWorkout,
        nutrition: hasNutrition,
        mind: hasMind,
        spirit: hasSpirit
      },
      primaryVictory: status === 'green' 
        ? 'Cumplió todas las metas del día, excelente energía y enfoque en el entrenamiento.'
        : status === 'yellow'
        ? 'Se mantuvo hidratado y cumplió con la lectura matutina.'
        : 'Completó el devocional matutino a pesar del cansancio.',
      primaryAdjustment: status === 'red'
        ? 'Déficit severo de sueño por jornada laboral, ajustar hora de apagado de pantallas a las 22:00.'
        : status === 'yellow'
        ? 'Mejorar el timing de las comidas para evitar saltarse la proteína post-entreno.'
        : 'Mantener la consistencia y preparar las viandas la noche anterior.',
      updatedAt: new Date(year, month, d, 21, 0, 0).toISOString()
    };
  }

  return records;
}

export function Module2DailyLog() {
  const { selectedStudent } = useAuth();
  const studentEmail = selectedStudent?.email || 'default';
  const storageKey = `templefit_macro_records_${studentEmail}`;

  // Tabs
  const [evaluationType, setEvaluationType] = useState<EvaluationType>('daily');

  // Month navigation
  const [viewingMonth, setViewingMonth] = useState(new Date());

  // Persistent records store
  const [macroRecords, setMacroRecords] = useState<Record<string, MacroDayRecord>>({});

  // Daily Form State (for Today)
  const todayKey = getTodayKey();
  const [globalStatus, setGlobalStatus] = useState<MacroStatus | null>(null);
  const [pillars, setPillars] = useState({ body: true, mind: true, spirit: true });
  const [microRoutines, setMicroRoutines] = useState<MicroRoutinesState>({
    water: false,
    sleep: false,
    workout: false,
    nutrition: false,
    mind: false,
    spirit: false
  });
  const [primaryVictory, setPrimaryVictory] = useState('');
  const [primaryAdjustment, setPrimaryAdjustment] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Registro Guardado Exitosamente');

  // Admin Quality Habits and Action Plans State
  const [adminHabits, setAdminHabits] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem('templefit_admin_quality_habits');
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });

  const [actionPlans, setActionPlans] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem('templefit_admin_action_plans');
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });

  const toggleAdminHabit = (habitText: string) => {
    const updated = { ...adminHabits, [habitText]: !adminHabits[habitText] };
    setAdminHabits(updated);
    localStorage.setItem('templefit_admin_quality_habits', JSON.stringify(updated));
  };

  const toggleActionPlan = (planKey: string) => {
    const updated = { ...actionPlans, [planKey]: !actionPlans[planKey] };
    setActionPlans(updated);
    localStorage.setItem('templefit_admin_action_plans', JSON.stringify(updated));
  };

  // Historical Inspector / Editor
  const [selectedHistoricalDay, setSelectedHistoricalDay] = useState<MacroDayRecord | null>(null);
  const [isEditingHistorical, setIsEditingHistorical] = useState(false);
  const [editedHistoricalRecord, setEditedHistoricalRecord] = useState<MacroDayRecord | null>(null);

  // Load / Initialize student records from localStorage
  useEffect(() => {
    if (!studentEmail) return;

    const saved = localStorage.getItem(storageKey);
    let currentMap: Record<string, MacroDayRecord> = {};

    if (saved) {
      try {
        currentMap = JSON.parse(saved);
      } catch (err) {
        console.error("Error parsing macro records:", err);
      }
    }

    // If empty or missing current month history, seed deterministic baseline
    const year = viewingMonth.getFullYear();
    const month = viewingMonth.getMonth();
    const seedMap = generateInitialHistoryForStudent(studentEmail, year, month);

    // Merge keeping existing user saves
    const merged = { ...seedMap, ...currentMap };
    
    // Save to ensure stability
    localStorage.setItem(storageKey, JSON.stringify(merged));
    setMacroRecords(merged);

    // Initialize Today's form if record exists
    if (merged[todayKey]) {
      const rec = merged[todayKey];
      setGlobalStatus(rec.status);
      setPillars(rec.pillars);
      setMicroRoutines(rec.microRoutines);
      setPrimaryVictory(rec.primaryVictory);
      setPrimaryAdjustment(rec.primaryAdjustment);
    } else {
      // Default empty for today
      setGlobalStatus(null);
      setPillars({ body: true, mind: true, spirit: true });
      setMicroRoutines({ water: false, sleep: false, workout: false, nutrition: false, mind: false, spirit: false });
      setPrimaryVictory('');
      setPrimaryAdjustment('');
    }
  }, [studentEmail, storageKey, todayKey]);

  // When changing month, ensure historical seeds exist for that month if never loaded
  useEffect(() => {
    const year = viewingMonth.getFullYear();
    const month = viewingMonth.getMonth();
    const dateKeyPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    
    // Check if we have any records for this month
    const hasMonthData = Object.keys(macroRecords).some(k => k.startsWith(dateKeyPrefix));
    if (!hasMonthData) {
      const monthSeed = generateInitialHistoryForStudent(studentEmail, year, month);
      const updated = { ...monthSeed, ...macroRecords };
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setMacroRecords(updated);
    }
  }, [viewingMonth, studentEmail, storageKey, macroRecords]);

  // Save Today's Log
  const handleSaveToday = () => {
    if (!selectedStudent || !globalStatus) return;

    if (globalStatus === 'green') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B']
      });
    }

    const now = new Date();
    const newRecord: MacroDayRecord = {
      date: todayKey,
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      status: globalStatus,
      pillars,
      microRoutines,
      primaryVictory,
      primaryAdjustment,
      updatedAt: now.toISOString()
    };

    const updated = { ...macroRecords, [todayKey]: newRecord };
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setMacroRecords(updated);

    setToastMessage('Radar de Hoy Guardado Exitosamente');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Save Historical Edit
  const handleSaveHistoricalEdit = () => {
    if (!editedHistoricalRecord) return;

    const dateKey = editedHistoricalRecord.date;
    const updated = {
      ...macroRecords,
      [dateKey]: {
        ...editedHistoricalRecord,
        updatedAt: new Date().toISOString()
      }
    };

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setMacroRecords(updated);
    setSelectedHistoricalDay(updated[dateKey]);
    setIsEditingHistorical(false);

    // If we just edited today's date from the historical modal, sync today's state
    if (dateKey === todayKey) {
      setGlobalStatus(editedHistoricalRecord.status);
      setPillars(editedHistoricalRecord.pillars);
      setMicroRoutines(editedHistoricalRecord.microRoutines);
      setPrimaryVictory(editedHistoricalRecord.primaryVictory);
      setPrimaryAdjustment(editedHistoricalRecord.primaryAdjustment);
    }

    setToastMessage(`Corrección del Día ${editedHistoricalRecord.day} Guardada`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const togglePillar = (key: keyof typeof pillars) => {
    setPillars(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMicro = (key: keyof typeof microRoutines) => {
    setMicroRoutines(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getStatusColor = (status: MacroStatus | null) => {
    if (status === 'green') return 'from-emerald-500/15 via-white to-emerald-500/5 dark:from-emerald-900/40 dark:via-[#0a1128] dark:to-black text-temple-navy dark:text-white border-emerald-500/30';
    if (status === 'yellow') return 'from-amber-500/15 via-white to-amber-500/5 dark:from-amber-900/40 dark:via-[#0a1128] dark:to-black text-temple-navy dark:text-white border-amber-500/30';
    if (status === 'red') return 'from-red-500/10 via-white to-red-500/5 dark:from-red-900/40 dark:via-[#0a1128] dark:to-black text-temple-navy dark:text-white border-red-500/30';
    return 'from-white via-slate-50 to-white dark:from-[#0a1128] dark:via-black dark:to-black text-temple-navy dark:text-white border-black/10 dark:border-white/10';
  };

  const getStatusText = (status: MacroStatus | null) => {
    if (status === 'green') return 'ÓPTIMO / AVANZANDO';
    if (status === 'yellow') return 'PRECAUCIÓN / ESTANCADO';
    if (status === 'red') return 'ALERTA / EN RIESGO';
    return 'SELECCIONA EL ESTADO DEL ATLETA';
  };

  // Month navigation handlers
  const handlePrevMonth = () => {
    setViewingMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedHistoricalDay(null);
    setIsEditingHistorical(false);
  };

  const handleNextMonth = () => {
    setViewingMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedHistoricalDay(null);
    setIsEditingHistorical(false);
  };

  const formatMonthYear = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date).toUpperCase();
  };

  // Calendar Grid Calculations
  const year = viewingMonth.getFullYear();
  const month = viewingMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Starting day of the week (Monday = 0, Sunday = 6)
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

  // Monthly stats
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthRecords = useMemo(() => {
    return Object.values(macroRecords).filter(r => r.date.startsWith(monthPrefix));
  }, [macroRecords, monthPrefix]);

  const greenDays = monthRecords.filter(d => d.status === 'green').length;
  const redDays = monthRecords.filter(d => d.status === 'red').length;
  const recordedDaysCount = monthRecords.length;
  const disciplineRatio = recordedDaysCount > 0 ? Math.round((greenDays / recordedDaysCount) * 100) : 0;

  const handleSelectDay = (dayNum: number) => {
    const dateKey = formatDateKey(year, month, dayNum);
    let record = macroRecords[dateKey];

    if (!record) {
      // Create empty draft for this day
      record = {
        date: dateKey,
        day: dayNum,
        month,
        year,
        status: 'green',
        pillars: { body: true, mind: true, spirit: true },
        microRoutines: { water: false, sleep: false, workout: false, nutrition: false, mind: false, spirit: false },
        primaryVictory: '',
        primaryAdjustment: '',
        updatedAt: new Date().toISOString()
      };
    }

    setSelectedHistoricalDay(record);
    setEditedHistoricalRecord(record);
    setIsEditingHistorical(false);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-16 max-w-6xl mx-auto font-sans relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-black font-black uppercase tracking-widest text-xs py-4 px-6 rounded-2xl flex items-center gap-3 shadow-2xl border-2 border-black/20 dark:border-white/20"
          >
            <CheckCircle2 size={20} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Visual Dinámico */}
      <motion.div variants={item} className={`flex flex-col gap-6 bg-gradient-to-br ${getStatusColor(globalStatus)} p-8 rounded-[2rem] border transition-colors duration-700 shadow-2xl relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap size={200} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-black/10 dark:bg-white/10 text-white border border-black/20 dark:border-white/20 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                Radar de Cierre
              </span>
              
              <div className="flex flex-wrap bg-white dark:bg-black/5 dark:bg-black/60 p-1.5 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-md gap-1">
                <button 
                  onClick={() => setEvaluationType('daily')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${evaluationType === 'daily' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white'}`}
                >
                  <Clock size={12} /> 1. Diario Atleta
                </button>
                <button 
                  onClick={() => setEvaluationType('monthly')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${evaluationType === 'monthly' ? 'bg-temple-gold text-black font-extrabold shadow-sm' : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white'}`}
                >
                  <Calendar size={12} /> 2. Calendario Mes
                </button>
                <button 
                  onClick={() => setEvaluationType('admin-habits')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${evaluationType === 'admin-habits' ? 'bg-emerald-500 text-black font-extrabold shadow-sm' : 'text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white'}`}
                >
                  <ShieldCheck size={12} /> 3. Hábitos de Calidad (Admin)
                </button>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-temple-navy dark:text-white uppercase tracking-tighter flex items-center gap-3">
              {selectedStudent?.name || 'Atleta No Seleccionado'}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 mt-2 font-medium">
              {evaluationType === 'daily' 
                ? `Registro diario • ${new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}`
                : `Calendario de cumplimiento • ${formatMonthYear(viewingMonth)}`
              }
            </p>
          </div>

          {evaluationType === 'daily' && (
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-gray-500">Estado Global (Hoy)</span>
              <div className="bg-white dark:bg-black/5 dark:bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-black/10 dark:border-white/10 flex gap-2">
                <button 
                  onClick={() => setGlobalStatus('green')}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${globalStatus === 'green' ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-110' : 'bg-black/5 dark:bg-white/5 text-emerald-500/50 hover:bg-emerald-500/20'}`}
                >
                  <CheckCircle2 size={24} />
                </button>
                <button 
                  onClick={() => setGlobalStatus('yellow')}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${globalStatus === 'yellow' ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110' : 'bg-black/5 dark:bg-white/5 text-amber-500/50 hover:bg-amber-500/20'}`}
                >
                  <AlertOctagon size={24} />
                </button>
                <button 
                  onClick={() => setGlobalStatus('red')}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${globalStatus === 'red' ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-110' : 'bg-black/5 dark:bg-white/5 text-red-500/50 hover:bg-red-500/20'}`}
                >
                  <Zap size={24} />
                </button>
              </div>
              <p className={`text-xs font-black uppercase tracking-widest mt-1 ${globalStatus === 'green' ? 'text-emerald-500' : globalStatus === 'yellow' ? 'text-amber-500' : globalStatus === 'red' ? 'text-red-500' : 'text-gray-600'}`}>
                {getStatusText(globalStatus)}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Conditional Rendering: Daily Form vs Monthly Analytics */}
      <AnimatePresence mode="wait">
        {evaluationType === 'daily' ? (
          <motion.div 
            key="daily-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Micro-Registro Táctico */}
            <motion.div variants={item} className="bg-slate-50 dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs font-black text-slate-600 dark:text-gray-400 uppercase tracking-widest px-2">Auditoría de Rutina Diaria (Micro-Registro)</h3>
                <span className="text-[10px] font-bold text-temple-gold uppercase tracking-wider bg-temple-gold/10 px-3 py-1 rounded-full">
                  {Object.values(microRoutines).filter(Boolean).length} / 6 Cumplidos
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {microItems.map((itemDef) => {
                  const isChecked = microRoutines[itemDef.key];
                  const Icon = itemDef.icon;
                  return (
                    <button
                      key={itemDef.key}
                      onClick={() => toggleMicro(itemDef.key)}
                      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                        isChecked 
                          ? 'bg-temple-gold/20 border-temple-gold/50 text-temple-gold shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                          : 'bg-white dark:bg-[#0B0F19]/50 border-black/5 dark:border-white/5 text-slate-500 dark:text-gray-500 hover:bg-black/5 dark:bg-white/5 hover:border-black/20 dark:border-white/20'
                      }`}
                    >
                      <div className={`p-2 rounded-xl ${isChecked ? 'bg-temple-gold/20' : 'bg-slate-100 dark:bg-black/50'}`}>
                        <Icon size={20} className={isChecked ? 'text-temple-gold' : 'text-gray-600'} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-center leading-tight">
                        {itemDef.label}
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isChecked ? 'border-temple-gold bg-temple-gold' : 'border-gray-700 bg-transparent'
                      }`}>
                        {isChecked && <CheckCircle2 size={10} className="text-black" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Grid de 2 Columnas: Pilares y Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Columna Izquierda: Los 3 Pilares (4 columnas en LG) */}
              <motion.div variants={item} className="lg:col-span-4 flex flex-col gap-4">
                <h3 className="text-xs font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-2">Pilares Estructurales (S/N)</h3>
                
                {/* Pilar: Cuerpo */}
                <button 
                  onClick={() => togglePillar('body')}
                  className={`w-full p-5 rounded-[1.5rem] border flex items-center justify-between transition-all duration-300 ${pillars.body ? 'bg-gradient-to-r from-white to-slate-50 dark:from-[#0a1128] dark:to-black text-temple-navy dark:text-white border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${pillars.body ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      <Activity size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Cuerpo</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${pillars.body ? 'text-emerald-500' : 'text-red-400'}`}>
                        {pillars.body ? 'En Orden' : 'Requiere Ajuste'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${pillars.body ? 'border-emerald-500 bg-emerald-500' : 'border-red-500/30 bg-transparent'}`}>
                    {pillars.body && <CheckCircle2 size={14} className="text-black" />}
                  </div>
                </button>

                {/* Pilar: Mente */}
                <button 
                  onClick={() => togglePillar('mind')}
                  className={`w-full p-5 rounded-[1.5rem] border flex items-center justify-between transition-all duration-300 ${pillars.mind ? 'bg-gradient-to-r from-white to-slate-50 dark:from-[#0a1128] dark:to-black text-temple-navy dark:text-white border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${pillars.mind ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      <BrainCircuit size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Mente</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${pillars.mind ? 'text-emerald-500' : 'text-red-400'}`}>
                        {pillars.mind ? 'En Orden' : 'Requiere Ajuste'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${pillars.mind ? 'border-emerald-500 bg-emerald-500' : 'border-red-500/30 bg-transparent'}`}>
                    {pillars.mind && <CheckCircle2 size={14} className="text-black" />}
                  </div>
                </button>

                {/* Pilar: Espíritu */}
                <button 
                  onClick={() => togglePillar('spirit')}
                  className={`w-full p-5 rounded-[1.5rem] border flex items-center justify-between transition-all duration-300 ${pillars.spirit ? 'bg-gradient-to-r from-white to-slate-50 dark:from-[#0a1128] dark:to-black text-temple-navy dark:text-white border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${pillars.spirit ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                      <Heart size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Espíritu</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${pillars.spirit ? 'text-emerald-500' : 'text-red-400'}`}>
                        {pillars.spirit ? 'En Orden' : 'Requiere Ajuste'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${pillars.spirit ? 'border-emerald-500 bg-emerald-500' : 'border-red-500/30 bg-transparent'}`}>
                    {pillars.spirit && <CheckCircle2 size={14} className="text-black" />}
                  </div>
                </button>
              </motion.div>

              {/* Columna Derecha: Inteligencia (8 columnas en LG) */}
              <motion.div variants={item} className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="text-xs font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-2">Síntesis Operativa (Hoy)</h3>
                
                <div className="bg-white dark:bg-[#0B0F19]/90 border border-black/10 dark:border-white/10 rounded-[2rem] p-8 flex flex-col gap-8 h-full shadow-2xl">
                  
                  {/* Victoria */}
                  <div className="flex gap-6 relative group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                      <Trophy size={24} />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-emerald-500 block mb-2">Victoria / Refuerzo Positivo</label>
                      <textarea
                        value={primaryVictory}
                        onChange={(e) => setPrimaryVictory(e.target.value)}
                        placeholder="¿Qué hizo bien hoy? Una frase de elogio directo..."
                        className="w-full bg-transparent text-white text-lg font-medium focus:outline-none resize-none placeholder-white/20 min-h-[60px]"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full"></div>

                  {/* Ajuste */}
                  <div className="flex gap-6 relative group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                      <Target size={24} />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-500 block mb-2">El Foco Único de Corrección</label>
                      <textarea
                        value={primaryAdjustment}
                        onChange={(e) => setPrimaryAdjustment(e.target.value)}
                        placeholder="El ajuste o punto que necesita mejorar..."
                        className="w-full bg-transparent text-slate-700 dark:text-gray-300 text-lg font-medium focus:outline-none resize-none placeholder-white/20 min-h-[60px]"
                        rows={2}
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>

            {/* Botón de Guardado */}
            <motion.div variants={item} className="flex justify-end pt-4">
              <Button 
                onClick={handleSaveToday} 
                disabled={!globalStatus}
                className={`h-16 px-10 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all ${!globalStatus ? 'bg-black/5 dark:bg-white/5 text-slate-500 dark:text-gray-500' : 'bg-temple-gold text-black hover:bg-amber-400 hover:scale-105 shadow-[0_10px_40px_rgba(255,215,0,0.2)]'}`}
              >
                Guardar Radar de Cierre
              </Button>
            </motion.div>
          </motion.div>
        ) : evaluationType === 'monthly' ? (
          <motion.div 
            key="monthly-calendar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Dashboard Analítico Mensual & Month Navigator */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-full px-6 py-3 shadow-xl w-fit mx-auto">
              <button onClick={handlePrevMonth} className="text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white p-1 rounded-full transition-colors">
                <ChevronLeft size={22} />
              </button>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-temple-gold min-w-[220px] text-center">
                {formatMonthYear(viewingMonth)}
              </span>
              <button onClick={handleNextMonth} className="text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white p-1 rounded-full transition-colors">
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* KPIs Consolidados */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <h3 className="text-xs font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-2">Métricas de Consistencia</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-950/30 border border-emerald-500/20 p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg">
                    <span className="text-3xl font-black text-emerald-400">{greenDays}</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-500/70 mt-1">Días Óptimos</span>
                  </div>
                  <div className="bg-red-950/30 border border-red-500/20 p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg">
                    <span className="text-3xl font-black text-red-400">{redDays}</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-red-500/70 mt-1">Días en Riesgo</span>
                  </div>
                  <div className="bg-amber-950/30 border border-amber-500/20 p-5 rounded-3xl flex flex-col items-center justify-center text-center col-span-2 shadow-lg">
                    <span className="text-4xl font-black text-amber-400">{disciplineRatio}%</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500/70 mt-1">Ratio de Disciplina Mensual ({recordedDaysCount} días evaluados)</span>
                  </div>
                </div>

                {/* Day Inspector Panel (Modal Flotante Integrado) */}
                <AnimatePresence>
                  {selectedHistoricalDay && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="mt-2"
                    >
                      <div className="bg-white dark:bg-[#0E1424] border border-temple-gold/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                        
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-temple-gold block">
                              Día {selectedHistoricalDay.day} de {new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date(selectedHistoricalDay.year, selectedHistoricalDay.month, 1))}
                            </span>
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider ${selectedHistoricalDay.status === 'green' ? 'text-emerald-400' : selectedHistoricalDay.status === 'yellow' ? 'text-amber-400' : 'text-red-400'}`}>
                              {getStatusText(selectedHistoricalDay.status)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {!isEditingHistorical ? (
                              <button 
                                onClick={() => {
                                  setEditedHistoricalRecord({ ...selectedHistoricalDay });
                                  setIsEditingHistorical(true);
                                }} 
                                className="flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-temple-gold bg-temple-gold/10 px-3 py-1.5 rounded-xl border border-temple-gold/30 hover:bg-temple-gold/20 transition-all"
                              >
                                <Edit3 size={12} /> Editar
                              </button>
                            ) : (
                              <button 
                                onClick={() => setIsEditingHistorical(false)} 
                                className="text-[10px] uppercase font-bold text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white px-2 py-1"
                              >
                                Cancelar
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setSelectedHistoricalDay(null);
                                setIsEditingHistorical(false);
                              }} 
                              className="text-slate-600 dark:text-gray-400 hover:text-temple-gold dark:hover:text-white p-1 rounded-lg hover:bg-black/5 dark:bg-white/5"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Modal Content */}
                        <div className="space-y-4 pt-4">
                          
                          {/* Status Selector in Edit Mode */}
                          {isEditingHistorical && editedHistoricalRecord && (
                            <div>
                              <label className="text-[9px] uppercase tracking-widest text-slate-600 dark:text-gray-400 font-bold block mb-2">Estado del Día</label>
                              <div className="grid grid-cols-3 gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditedHistoricalRecord({ ...editedHistoricalRecord, status: 'green' })}
                                  className={`p-2 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition-all ${editedHistoricalRecord.status === 'green' ? 'bg-emerald-500 text-black shadow-md' : 'bg-black/5 dark:bg-white/5 text-emerald-400 hover:bg-emerald-500/20'}`}
                                >
                                  <CheckCircle2 size={12} /> Óptimo
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditedHistoricalRecord({ ...editedHistoricalRecord, status: 'yellow' })}
                                  className={`p-2 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition-all ${editedHistoricalRecord.status === 'yellow' ? 'bg-amber-500 text-black shadow-md' : 'bg-black/5 dark:bg-white/5 text-amber-400 hover:bg-amber-500/20'}`}
                                >
                                  <AlertOctagon size={12} /> Precaución
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditedHistoricalRecord({ ...editedHistoricalRecord, status: 'red' })}
                                  className={`p-2 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition-all ${editedHistoricalRecord.status === 'red' ? 'bg-red-500 text-white shadow-md' : 'bg-black/5 dark:bg-white/5 text-red-400 hover:bg-red-500/20'}`}
                                >
                                  <Zap size={12} /> Alerta
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Victoria */}
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold block mb-1">Victoria / Elogio</span>
                            {isEditingHistorical && editedHistoricalRecord ? (
                              <textarea
                                value={editedHistoricalRecord.primaryVictory}
                                onChange={(e) => setEditedHistoricalRecord({ ...editedHistoricalRecord, primaryVictory: e.target.value })}
                                placeholder="Victoria o acierto de este día..."
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-temple-gold/50 transition-colors resize-none"
                                rows={2}
                              />
                            ) : (
                              <p className="text-xs text-gray-200 font-medium leading-relaxed bg-slate-50 dark:bg-black/40 p-3 rounded-xl border border-black/5 dark:border-white/5">
                                {selectedHistoricalDay.primaryVictory || 'Sin registro de victoria.'}
                              </p>
                            )}
                          </div>
                          
                          {/* Ajuste */}
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-amber-500 font-bold block mb-1">Foco de Corrección</span>
                            {isEditingHistorical && editedHistoricalRecord ? (
                              <textarea
                                value={editedHistoricalRecord.primaryAdjustment}
                                onChange={(e) => setEditedHistoricalRecord({ ...editedHistoricalRecord, primaryAdjustment: e.target.value })}
                                placeholder="Ajuste para este día..."
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-temple-gold/50 transition-colors resize-none"
                                rows={2}
                              />
                            ) : (
                              <p className="text-xs text-gray-200 font-medium leading-relaxed bg-slate-50 dark:bg-black/40 p-3 rounded-xl border border-black/5 dark:border-white/5">
                                {selectedHistoricalDay.primaryAdjustment || 'Sin registro de ajuste.'}
                              </p>
                            )}
                          </div>
                          
                          {/* Micro-Routines Status */}
                          <div className="pt-2 border-t border-black/10 dark:border-white/10">
                            <span className="text-[9px] uppercase tracking-widest text-slate-600 dark:text-gray-400 font-bold block mb-2">Micro-Rutinas Realizadas</span>
                            <div className="grid grid-cols-3 gap-2">
                              {microItems.map((m) => {
                                const currentMicro = isEditingHistorical && editedHistoricalRecord
                                  ? editedHistoricalRecord.microRoutines
                                  : selectedHistoricalDay.microRoutines;
                                
                                const isOk = currentMicro?.[m.key] || false;
                                const Icon = m.icon;

                                return (
                                  <button 
                                    key={m.key} 
                                    type="button" 
                                    onClick={() => {
                                      if (isEditingHistorical && editedHistoricalRecord) {
                                        setEditedHistoricalRecord({
                                          ...editedHistoricalRecord,
                                          microRoutines: {
                                            ...editedHistoricalRecord.microRoutines,
                                            [m.key]: !isOk
                                          }
                                        });
                                      }
                                    }}
                                    disabled={!isEditingHistorical}
                                    className={`flex items-center justify-center gap-1.5 p-2 rounded-xl border transition-all text-left ${isOk ? 'bg-temple-gold/20 border-temple-gold/50 text-temple-gold' : 'bg-slate-100 dark:bg-black/50 border-black/5 dark:border-white/5 text-gray-600'} ${isEditingHistorical ? 'cursor-pointer hover:border-black/20 dark:border-white/20' : 'cursor-default'}`}
                                  >
                                    <Icon size={12} className={isOk ? 'text-temple-gold' : 'text-gray-600'} />
                                    <span className="text-[8px] font-black uppercase tracking-wider truncate">
                                      {m.label.split(' ')[0]}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Save Edit Button */}
                          {isEditingHistorical && (
                            <div className="pt-3">
                              <Button 
                                onClick={handleSaveHistoricalEdit}
                                className="w-full bg-temple-gold text-black hover:bg-amber-400 text-xs font-black uppercase tracking-widest h-11 rounded-xl shadow-lg flex items-center justify-center gap-2"
                              >
                                <Save size={14} /> Guardar Corrección
                              </Button>
                            </div>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Calendario Mensual */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <h3 className="text-xs font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-2">Calendario Mensual de Hábitos</h3>
                <div className="bg-white dark:bg-[#0B0F19]/90 border border-black/10 dark:border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl">
                  
                  {/* Días de la Semana */}
                  <div className="grid grid-cols-7 gap-2 md:gap-3 mb-4">
                    {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map((dayHeader, i) => (
                      <div key={i} className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-500">{dayHeader}</div>
                    ))}
                  </div>

                  {/* Celdas del Calendario */}
                  <div className="grid grid-cols-7 gap-2 md:gap-3">
                    
                    {/* Espaciadores para el primer día de la semana */}
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square rounded-xl md:rounded-2xl bg-transparent opacity-0 pointer-events-none" />
                    ))}

                    {/* Días del Mes */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const dateKey = formatDateKey(year, month, dayNum);
                      const rec = macroRecords[dateKey];

                      const isSelected = selectedHistoricalDay?.day === dayNum && selectedHistoricalDay?.month === month && selectedHistoricalDay?.year === year;
                      const isToday = dayNum === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

                      let statusClass = 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-600 hover:bg-black/10 dark:bg-white/10 hover:border-black/20 dark:border-white/20'; // no record
                      if (rec?.status === 'green') statusClass = 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)] border-transparent hover:scale-105';
                      if (rec?.status === 'yellow') statusClass = 'bg-amber-500 text-black border-transparent hover:scale-105';
                      if (rec?.status === 'red') statusClass = 'bg-red-500 text-white border-transparent hover:scale-105';

                      return (
                        <button 
                          key={`day-${dayNum}`} 
                          onClick={() => handleSelectDay(dayNum)}
                          className={`aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-center text-sm md:text-lg font-black transition-all cursor-pointer relative ${statusClass} ${isSelected ? 'ring-4 ring-temple-gold ring-offset-4 ring-offset-[#0B0F19] scale-105' : ''}`}
                        >
                          <span>{dayNum}</span>
                          {isToday && (
                            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Leyenda del Calendario */}
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span>Óptimo / 100%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                      <span>Precaución</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                      <span>Alerta / Riesgo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white dark:bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20" />
                      <span>Sin Registro</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="admin-habits-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* 12 Hábitos de Calidad del Administrador */}
            <div className="bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-temple-gold shadow-md">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider">
                      12 Hábitos de Calidad del Administrador
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400">
                      Rutina estandarizada de excelencia operativa, liderazgo y control de gestión
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-black/5 dark:bg-black/60 px-4 py-2 rounded-2xl border border-black/10 dark:border-white/10">
                  <span className="text-xs font-black text-temple-gold">
                    {defaultAdminHabits.filter(h => adminHabits[h]).length} / 12
                  </span>
                  <span className="text-[10px] text-slate-600 dark:text-gray-400 font-bold uppercase tracking-wider">Cumplidos</span>
                </div>
              </div>

              {/* Grid of 12 Habits */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {defaultAdminHabits.map((habit, idx) => {
                  const isChecked = !!adminHabits[habit];
                  return (
                    <button
                      key={habit}
                      type="button"
                      onClick={() => toggleAdminHabit(habit)}
                      className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 group cursor-pointer ${
                        isChecked 
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-md' 
                          : 'bg-slate-50 dark:bg-black/40 border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:bg-black/5 dark:bg-white/5 hover:border-black/20 dark:border-white/20'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked 
                          ? 'bg-emerald-500 border-emerald-400 text-black shadow-sm' 
                          : 'border-black/20 dark:border-white/20 group-hover:border-white/40 bg-black/5 dark:bg-white/5'
                      }`}>
                        {isChecked && <Check size={14} className="stroke-[3]" />}
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-temple-gold block mb-0.5">
                          Hábito {String(idx + 1).padStart(2, '0')}
                        </span>
                        <p className={`text-xs font-bold leading-relaxed ${isChecked ? 'line-through text-slate-600 dark:text-gray-400' : 'text-white'}`}>
                          {habit}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Planes de Acción Estándar (Mes 1 a Mes 12) */}
            <div className="bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md">
                  <ListChecks size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider">
                    Planes de Acción Estándar
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-gray-400">
                    Checklist táctico de implementación por fase y preparación de responsables
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {defaultActionPlans.map((planItem) => {
                  const isChecked = !!actionPlans[planItem.phase];
                  return (
                    <div 
                      key={planItem.phase}
                      onClick={() => toggleActionPlan(planItem.phase)}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isChecked 
                          ? 'bg-blue-500/10 border-blue-500/40 text-white' 
                          : 'bg-slate-50 dark:bg-black/40 border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:bg-black/5 dark:bg-white/5 hover:border-black/20 dark:border-white/20'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked 
                          ? 'bg-blue-500 border-blue-400 text-white' 
                          : 'border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5'
                      }`}>
                        {isChecked && <Check size={14} className="stroke-[3]" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-temple-gold tracking-wider">
                          {planItem.phase}
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-gray-300 mt-1 leading-relaxed">
                          {planItem.plan}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
