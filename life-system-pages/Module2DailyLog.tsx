import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Plus, X, Activity, BrainCircuit, Heart, AlertTriangle, CheckCircle2, Target, Award, Sparkles, BookOpen, Flame } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

const DEFAULT_MIND_HABITS = ['Lectura 10 pág.', 'Journaling', 'Visualización', 'No Redes Sociales (1h despertarse)'];
const DEFAULT_SPIRIT_HABITS = ['Oración / Meditación', 'Gratitud (3 cosas)', 'Conexión familiar'];
const DEFAULT_DAILY_GOALS = [
  { id: '1', title: 'Completar Sesión de Entrenamiento Híbrido', completed: true },
  { id: '2', title: 'Alcanzar Meta de 3 Litros de Agua', completed: true },
  { id: '3', title: 'Cumplir Plan Nutricional Bio-optimizado', completed: true },
  { id: '4', title: '15 Minutos de Lectura & Mentoría Mente', completed: false },
  { id: '5', title: 'Oración Matutina / Reflexión Espiritual', completed: true }
];

export function Module2DailyLog() {
  const { selectedStudent } = useAuth();

  const [dailyGoals, setDailyGoals] = useState(DEFAULT_DAILY_GOALS);
  const [newGoalText, setNewGoalText] = useState('');
  const [failures, setFailures] = useState<string[]>(['No leer 10 pág.', 'Comer azúcar fuera de plan']);
  const [newFailure, setNewFailure] = useState('');
  const [dailyReflection, setDailyReflection] = useState('Hoy me mantuve enfocado en el bloque mañana. Logré mantener la disciplina en la alimentación y asistí a la mentoría.');
  const [blocks, setBlocks] = useState({ morning: true, afternoon: true, evening: false });
  const [sleep, setSleep] = useState<number>(7.5);
  const [water, setWater] = useState<number>(2.8);
  const [workout, setWorkout] = useState<boolean>(true);
  const [mindChecks, setMindChecks] = useState<boolean[]>([true, true, false, true]);
  const [spiritChecks, setSpiritChecks] = useState<boolean[]>([true, true, true]);
  const [showToast, setShowToast] = useState(false);

  const dailyKey = `templefit_daily_${selectedStudent?.email || 'default'}`;

  useEffect(() => {
    if (!selectedStudent) return;
    const saved = localStorage.getItem(dailyKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBlocks(parsed.blocks || { morning: true, afternoon: true, evening: false });
        setFailures(parsed.failures || []);
        setSleep(parsed.sleep !== undefined ? parsed.sleep : 7.5);
        setWater(parsed.water !== undefined ? parsed.water : 2.8);
        setWorkout(parsed.workout !== undefined ? !!parsed.workout : true);
        setMindChecks(parsed.mindChecks || [true, true, false, true]);
        setSpiritChecks(parsed.spiritChecks || [true, true, true]);
        if (parsed.dailyGoals) setDailyGoals(parsed.dailyGoals);
        if (parsed.dailyReflection) setDailyReflection(parsed.dailyReflection);
      } catch (e) {
        resetToDefaults();
      }
    }
  }, [selectedStudent, dailyKey]);

  const resetToDefaults = () => {
    setBlocks({ morning: true, afternoon: true, evening: false });
    setFailures(['No leer 10 pág.', 'Comer azúcar fuera de plan']);
    setSleep(7.5);
    setWater(2.8);
    setWorkout(true);
    setMindChecks([true, true, false, true]);
    setSpiritChecks([true, true, true]);
    setDailyGoals(DEFAULT_DAILY_GOALS);
    setDailyReflection('');
  };

  const toggleGoal = (id: string) => {
    setDailyGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const addGoal = () => {
    if (!newGoalText.trim()) return;
    const newG = { id: Date.now().toString(), title: newGoalText.trim(), completed: false };
    setDailyGoals([...dailyGoals, newG]);
    setNewGoalText('');
  };

  const toggleBlock = (b: 'morning' | 'afternoon' | 'evening') => {
    setBlocks(prev => ({ ...prev, [b]: !prev[b] }));
  };

  const addFailure = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newFailure.trim() !== '') {
      setFailures([...failures, newFailure.trim()]);
      setNewFailure('');
    }
  };

  const removeFailure = (index: number) => setFailures(failures.filter((_, i) => i !== index));

  const toggleMindCheck = (index: number) => {
    const updated = [...mindChecks];
    updated[index] = !updated[index];
    setMindChecks(updated);
  };

  const toggleSpiritCheck = (index: number) => {
    const updated = [...spiritChecks];
    updated[index] = !updated[index];
    setSpiritChecks(updated);
  };

  const handleSave = () => {
    if (!selectedStudent) return;
    const data = {
      blocks,
      failures,
      sleep,
      water,
      workout,
      mindChecks,
      spiritChecks,
      dailyGoals,
      dailyReflection,
      streak: 7
    };
    localStorage.setItem(dailyKey, JSON.stringify(data));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const completedGoalsCount = dailyGoals.filter(g => g.completed).length;
  const completionPercentage = dailyGoals.length > 0 ? Math.round((completedGoalsCount / dailyGoals.length) * 100) : 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8 pb-16 relative font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-black font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl flex items-center gap-2.5 shadow-2xl border border-[#20BA5A]"
          >
            <CheckCircle2 size={16} />
            <span>Registro y Objetivos Guardados Correctamente</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-temple-gold">Módulo de Seguimiento Integral</span>
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase text-white tracking-tight">
            HÁBITOS & <span className="italic text-temple-gold">MI DÍA</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xl md:text-2xl font-black text-white">23 de Julio, 2026</p>
            <p className="text-[10px] text-temple-gold uppercase tracking-widest font-extrabold">Racha Actual: 7 Días Seguidos 🔥</p>
          </div>
          <Button onClick={handleSave} className="bg-temple-gold text-black hover:bg-amber-400 font-extrabold text-xs uppercase tracking-widest px-6 h-12 rounded-xl shadow-lg">
            Guardar Cambios
          </Button>
        </div>
      </motion.div>

      {/* 🎯 OBJETIVOS CLAVE DEL DÍA (SCORECARD FULL-WIDTH) */}
      <motion.div variants={item}>
        <Card className="bg-gradient-to-r from-[#0B0F19] via-[#0E1424] to-[#0B0F19] border-temple-gold/30 shadow-2xl">
          <CardHeader className="!pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-temple-gold/10 border border-temple-gold/30 rounded-2xl text-temple-gold">
                  <Target size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-temple-gold">Scorecard de Cumplimiento</span>
                  <h3 className="text-xl font-bold text-white uppercase">Objetivos Clave del Día ({completedGoalsCount}/{dailyGoals.length})</h3>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/10">
                <div className="text-right">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Progreso Diario</p>
                  <p className="text-2xl font-black text-temple-gold">{completionPercentage}%</p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-temple-gold/40 flex items-center justify-center font-black text-xs text-temple-gold bg-temple-gold/10">
                  {completionPercentage === 100 ? '🏆' : `${completionPercentage}%`}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {dailyGoals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    goal.completed
                      ? 'bg-temple-gold/15 border-temple-gold/50 text-white shadow-sm'
                      : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center flex-shrink-0 transition ${
                      goal.completed ? 'bg-temple-gold border-temple-gold text-black' : 'border-white/30'
                    }`}>
                      {goal.completed && <span className="text-xs font-black">✓</span>}
                    </div>
                    <span className={`text-xs font-bold truncate ${goal.completed ? 'text-white line-through opacity-90' : 'text-gray-200'}`}>
                      {goal.title}
                    </span>
                  </div>
                  {goal.completed && <span className="text-[9px] uppercase font-extrabold text-temple-gold bg-temple-gold/10 px-2 py-0.5 rounded flex-shrink-0 ml-2">Hecho</span>}
                </div>
              ))}
            </div>

            {/* Custom Goal Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                placeholder="Añadir nuevo objetivo del día..."
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold"
              />
              <button
                onClick={addGoal}
                className="px-4 py-2.5 bg-temple-gold text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition flex items-center gap-1"
              >
                <Plus size={14} /> Añadir
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 🏛️ LAS 3 DIMENSIONES (GRID 3 COLUMNAS SIMÉTRICO) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pilar 1: CUERPO */}
        <motion.div variants={item}>
          <Card className="h-full bg-[#0B0F19]/90 border-white/10 flex flex-col justify-between">
            <CardHeader className="!pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity size={20} className="text-temple-gold" />
                CUERPO (Físico & Salud)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 flex-1">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                  <span>Horas de Sueño</span>
                  <span className="text-temple-gold">{sleep} hrs</span>
                </div>
                <Slider value={[sleep]} max={12} min={0} step={0.5} onValueChange={(val) => setSleep(val[0])} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                  <span>Hidratación (Agua)</span>
                  <span className="text-temple-gold">{water} Litros</span>
                </div>
                <Slider value={[water]} max={5} min={0} step={0.1} onValueChange={(val) => setWater(val[0])} />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">Entrenamiento Híbrido</span>
                  <span className="text-[10px] text-gray-400">¿Completaste tu sesión de hoy?</span>
                </div>
                <Switch checked={workout} onCheckedChange={setWorkout} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pilar 2: MENTE */}
        <motion.div variants={item}>
          <Card className="h-full bg-[#0B0F19]/90 border-white/10 flex flex-col justify-between">
            <CardHeader className="!pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BrainCircuit size={20} className="text-temple-gold" />
                MENTE (Disciplina & Enfoque)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              {DEFAULT_MIND_HABITS.map((habit, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-black/40 rounded-xl border border-white/10 hover:border-temple-gold/30 transition">
                  <Checkbox id={`mind-${i}`} checked={mindChecks[i] || false} onCheckedChange={() => toggleMindCheck(i)} />
                  <label htmlFor={`mind-${i}`} className="text-xs font-medium text-gray-200 cursor-pointer">{habit}</label>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pilar 3: ESPÍRITU */}
        <motion.div variants={item}>
          <Card className="h-full bg-[#0B0F19]/90 border-white/10 flex flex-col justify-between">
            <CardHeader className="!pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart size={20} className="text-temple-gold" />
                ESPÍRITU (Fe & Propósito)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              {DEFAULT_SPIRIT_HABITS.map((habit, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-black/40 rounded-xl border border-white/10 hover:border-temple-gold/30 transition">
                  <Checkbox id={`spirit-${i}`} checked={spiritChecks[i] || false} onCheckedChange={() => toggleSpiritCheck(i)} />
                  <label htmlFor={`spirit-${i}`} className="text-xs font-medium text-gray-200 cursor-pointer">{habit}</label>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* ⚡ BLOQUES DE RENDIMIENTO & CHECKLIST DE ERRORES (EQUILIBRIO 2 COLUMNAS PERFECTO) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bloques de Alto Rendimiento */}
        <motion.div variants={item}>
          <Card className="h-full bg-[#0B0F19]/90 border-white/10 flex flex-col justify-between">
            <CardHeader className="!pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Flame className="text-temple-gold" size={20} />
                  Bloques de Alto Rendimiento (24h)
                </CardTitle>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-temple-gold bg-temple-gold/10 px-2.5 py-1 rounded-full border border-temple-gold/30">
                  {((blocks.morning ? 6 : 0) + (blocks.afternoon ? 6 : 0) + (blocks.evening ? 6 : 0))} / 18 HRS
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              {[
                { id: 'morning', label: 'Bloque Mañana', time: '06:00 - 12:00', desc: 'Enfoque Matutino & Rutina de Fuerza', icon: '🌅' },
                { id: 'afternoon', label: 'Bloque Tarde', time: '12:00 - 18:00', desc: 'Productividad & Nutrición Bio-optimizada', icon: '☀️' },
                { id: 'evening', label: 'Bloque Noche', time: '18:00 - 00:00', desc: 'Desconexión, Lectura & Reflexión', icon: '🌙' }
              ].map((block) => {
                const isChecked = blocks[block.id as keyof typeof blocks] || false;
                return (
                  <div
                    key={block.id}
                    onClick={() => toggleBlock(block.id as any)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                      isChecked ? 'bg-temple-gold/15 border-temple-gold text-white' : 'bg-black/40 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{block.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-white">{block.label}</p>
                        <p className="text-[10px] text-gray-400">{block.time} • {block.desc}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isChecked ? 'bg-temple-gold border-temple-gold text-black' : 'border-white/20'}`}>
                      {isChecked && <span className="text-xs font-black">✓</span>}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Checklist de Ajustes + Diario / Reflexión (RELLENA EL ESPACIO ANTERIORMENTE VACÍO) */}
        <motion.div variants={item}>
          <Card className="h-full bg-[#0B0F19]/90 border-white/10 flex flex-col justify-between">
            <CardHeader className="!pb-2">
              <CardTitle className="flex items-center gap-2 text-base text-white">
                <AlertTriangle className="text-temple-red" size={20} />
                Ajustes & Reflexión del Día
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {/* Error/Adjustment input */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Reconoce tus errores a corregir</span>
                <input
                  type="text"
                  value={newFailure}
                  onChange={(e) => setNewFailure(e.target.value)}
                  onKeyDown={addFailure}
                  placeholder="Escribe un fallo a corregir y presiona Enter..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-red"
                />
                <div className="space-y-1.5 pt-1">
                  {failures.map((failure, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-black/40 border border-white/5 rounded-lg p-2 text-xs">
                      <span className="text-gray-300">{failure}</span>
                      <button onClick={() => removeFailure(idx)} className="text-gray-500 hover:text-red-400">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reflection text area */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-temple-gold">Reflexión / Diario de Victorias del Día</span>
                <textarea
                  value={dailyReflection}
                  onChange={(e) => setDailyReflection(e.target.value)}
                  placeholder="Escribe tus reflexiones, lecciones o aprendizajes de hoy..."
                  rows={3}
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>

    </motion.div>
  );
}
