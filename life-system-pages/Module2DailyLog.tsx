import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FieldLabel } from '../components/ui/field-label';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Plus, X, Activity, BrainCircuit, Heart, AlertTriangle, CheckCircle2, Target, Award, Sparkles } from 'lucide-react';

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
  const { selectedStudent, user } = useAuth();

  const [dailyGoals, setDailyGoals] = useState(DEFAULT_DAILY_GOALS);
  const [newGoalText, setNewGoalText] = useState('');
  const [failures, setFailures] = useState<string[]>([]);
  const [newFailure, setNewFailure] = useState('');
  const [blocks, setBlocks] = useState({ morning: false, afternoon: false, evening: false });
  const [sleep, setSleep] = useState<number>(7.5);
  const [water, setWater] = useState<number>(2.5);
  const [workout, setWorkout] = useState<boolean>(false);
  const [mindChecks, setMindChecks] = useState<boolean[]>([false, false, false, false]);
  const [spiritChecks, setSpiritChecks] = useState<boolean[]>([false, false, false]);
  const [showToast, setShowToast] = useState(false);

  const dailyKey = `templefit_daily_${selectedStudent?.email || 'default'}`;

  useEffect(() => {
    if (!selectedStudent) return;
    const saved = localStorage.getItem(dailyKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBlocks(parsed.blocks || { morning: false, afternoon: false, evening: false });
        setFailures(parsed.failures || []);
        setSleep(parsed.sleep !== undefined ? parsed.sleep : 7.5);
        setWater(parsed.water !== undefined ? parsed.water : 2.5);
        setWorkout(!!parsed.workout);
        setMindChecks(parsed.mindChecks || [false, false, false, false]);
        setSpiritChecks(parsed.spiritChecks || [false, false, false]);
        if (parsed.dailyGoals) setDailyGoals(parsed.dailyGoals);
      } catch (e) {
        resetToDefaults();
      }
    } else {
      resetToDefaults();
    }
  }, [selectedStudent, dailyKey]);

  const resetToDefaults = () => {
    setBlocks({ morning: false, afternoon: false, evening: false });
    setFailures(['No leer 10 pág.', 'Comer azúcar']);
    setSleep(7.5);
    setWater(2.5);
    setWorkout(false);
    setMindChecks([false, false, false, false]);
    setSpiritChecks([false, false, false]);
    setDailyGoals(DEFAULT_DAILY_GOALS);
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
      streak: 7
    };
    localStorage.setItem(dailyKey, JSON.stringify(data));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const completedGoalsCount = dailyGoals.filter(g => g.completed).length;
  const completionPercentage = dailyGoals.length > 0 ? Math.round((completedGoalsCount / dailyGoals.length) * 100) : 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8 pb-12 relative font-sans">
      
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
            <span>Progreso del Día Guardado Correctamente</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-temple-gold">Planificador & Fichas de Cumplimiento</span>
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase text-white tracking-tight">
            REGISTRO DE <span className="italic text-temple-gold">OBJETIVOS & HÁBITOS</span>
          </h2>
        </div>
        <div className="text-right">
          <p className="text-2xl md:text-3xl font-black text-white">23 de Julio, 2026</p>
          <p className="text-xs text-temple-gold uppercase tracking-widest font-extrabold">Día 204 del año • Racha: 7 días 🔥</p>
        </div>
      </motion.div>

      {/* 🎯 OBJETIVOS CLAVE DEL DÍA (NUEVO MÓDULO VISUAL DE CUMPLIMIENTO) */}
      <motion.div variants={item}>
        <Card className="bg-gradient-to-r from-black/80 via-[#0E131F] to-black/80 border-temple-gold/30">
          <CardHeader className="!pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-temple-gold/10 border border-temple-gold/30 rounded-2xl text-temple-gold">
                  <Target size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-temple-gold">Scorecard de Victoria</span>
                  <h3 className="text-xl font-bold text-white uppercase">Objetivos Clave del Día ({completedGoalsCount}/{dailyGoals.length})</h3>
                </div>
              </div>

              {/* Completion Progress Badge */}
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="text-right">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Cumplimiento</p>
                  <p className="text-2xl font-black text-temple-gold">{completionPercentage}%</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-temple-gold/40 flex items-center justify-center font-black text-xs text-temple-gold">
                  {completionPercentage === 100 ? '🏆' : `${completionPercentage}%`}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Interactive Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {dailyGoals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    goal.completed
                      ? 'bg-temple-gold/15 border-temple-gold text-white shadow-md'
                      : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                      goal.completed ? 'bg-temple-gold border-temple-gold text-black' : 'border-white/30'
                    }`}>
                      {goal.completed && <span className="text-xs font-black">✓</span>}
                    </div>
                    <span className={`text-xs font-bold ${goal.completed ? 'text-white line-through opacity-90' : 'text-gray-200'}`}>
                      {goal.title}
                    </span>
                  </div>
                  {goal.completed && <span className="text-[10px] uppercase font-extrabold text-temple-gold bg-temple-gold/10 px-2 py-0.5 rounded">Cumplido</span>}
                </div>
              ))}
            </div>

            {/* Add Custom Goal Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                placeholder="Añadir nuevo objetivo del día (Ej: Correr 5K, Meditar 10 min)..."
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold"
              />
              <button
                onClick={addGoal}
                className="px-4 py-2.5 bg-temple-gold text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition"
              >
                Añadir Objetivo
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grid Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* 24h Grid */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="text-temple-gold" />
                    Bloques de Alto Rendimiento
                  </CardTitle>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full">
                    {((blocks.morning ? 6 : 0) + (blocks.afternoon ? 6 : 0) + (blocks.evening ? 6 : 0))} / 18 HRS OBJETIVO
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {[
                    { id: 'morning', label: 'Bloque Mañana', time: '06:00 - 12:00', desc: 'Enfoque & Rutina Matutina', icon: '🌅' },
                    { id: 'afternoon', label: 'Bloque Tarde', time: '12:00 - 18:00', desc: 'Productividad & Fuerza', icon: '☀️' },
                    { id: 'evening', label: 'Bloque Noche', time: '18:00 - 00:00', desc: 'Desconexión & Reflexión', icon: '🌙' }
                  ].map((block) => {
                    const isChecked = blocks[block.id as keyof typeof blocks] || false;
                    return (
                      <div
                        key={block.id}
                        onClick={() => toggleBlock(block.id as any)}
                        className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                          isChecked ? 'bg-temple-gold/15 border-temple-gold text-white' : 'bg-black/40 border-white/10 text-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{block.icon}</span>
                          <div>
                            <p className="text-xs font-bold text-white">{block.label}</p>
                            <p className="text-[10px] text-gray-400">{block.time}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isChecked ? 'bg-temple-gold border-temple-gold text-black' : 'border-white/20'}`}>
                          {isChecked && <span className="text-xs font-bold">✓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Failure Checklist */}
          <motion.div variants={item}>
            <Card className="border-temple-red/30 bg-gradient-to-br from-black/60 to-temple-red/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-temple-red">
                  <AlertTriangle className="text-temple-red" />
                  Checklist de Ajustes & Errores a Corregir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={newFailure}
                      onChange={(e) => setNewFailure(e.target.value)}
                      onKeyDown={addFailure}
                      placeholder="Escribe lo que falló hoy y presiona Enter..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-red"
                    />
                  </div>
                  <div className="space-y-2">
                    {failures.map((failure, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-black/40 border border-white/5 rounded-xl p-3">
                        <span className="text-xs text-gray-300">{failure}</span>
                        <button onClick={() => removeFailure(idx)} className="text-gray-500 hover:text-red-400">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: 3 Pillars Checklists */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity size={18} className="text-temple-gold" />
                  CUERPO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                    <span>Horas de Sueño</span>
                    <span className="text-temple-gold">{sleep} hrs</span>
                  </div>
                  <Slider value={[sleep]} max={12} min={0} step={0.5} onValueChange={(val) => setSleep(val[0])} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                    <span>Agua</span>
                    <span className="text-temple-gold">{water} Litros</span>
                  </div>
                  <Slider value={[water]} max={5} min={0} step={0.1} onValueChange={(val) => setWater(val[0])} />
                </div>
                <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-white">Entrenamiento Cumplido</span>
                  <Switch checked={workout} onCheckedChange={setWorkout} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BrainCircuit size={18} className="text-temple-gold" />
                  MENTE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {DEFAULT_MIND_HABITS.map((habit, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-black/30 rounded-xl border border-white/5">
                    <Checkbox id={`mind-${i}`} checked={mindChecks[i] || false} onCheckedChange={() => toggleMindCheck(i)} />
                    <label htmlFor={`mind-${i}`} className="text-xs font-medium text-gray-300 cursor-pointer">{habit}</label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart size={18} className="text-temple-gold" />
                  ESPÍRITU
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {DEFAULT_SPIRIT_HABITS.map((habit, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-black/30 rounded-xl border border-white/5">
                    <Checkbox id={`spirit-${i}`} checked={spiritChecks[i] || false} onCheckedChange={() => toggleSpiritCheck(i)} />
                    <label htmlFor={`spirit-${i}`} className="text-xs font-medium text-gray-300 cursor-pointer">{habit}</label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Button onClick={handleSave} className="w-full h-12 text-xs font-extrabold uppercase tracking-widest bg-temple-gold text-black hover:bg-amber-400 shadow-lg">
              GUARDAR REGISTRO Y OBJETIVOS
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
