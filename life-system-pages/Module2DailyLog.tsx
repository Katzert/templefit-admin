import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FieldLabel } from '../components/ui/field-label';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';

import { Plus, X, Activity, BrainCircuit, Heart, AlertTriangle, CheckCircle2 } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

const DEFAULT_MIND_HABITS = ['Lectura 10 pág.', 'Journaling', 'Visualización', 'No Redes Sociales (1h despertarse)'];
const DEFAULT_SPIRIT_HABITS = ['Oración / Meditación', 'Gratitud (3 cosas)', 'Conexión familiar'];

export function Module2DailyLog() {
  const { selectedStudent, user } = useAuth();


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

  // Load data for the active student
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
      spiritChecks
    };
    localStorage.setItem(dailyKey, JSON.stringify(data));

    // Audit log if editor is instructor/admin
    if (user && (user.role === 'instructor' || user.role === 'admin')) {
      log({
        userEmail: user.email,
        userName: user.name,
        role: user.role,
        action: 'update',
        module: 'Registro Diario',
        field: 'Ficha Completa',
        oldValue: 'Valores anteriores',
        newValue: `S: ${sleep}h, W: ${water}L, Ex: ${workout ? 'Sí' : 'No'}`,
        targetUser: selectedStudent.name
      });
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const totalProductiveHours = (blocks.morning ? 6 : 0) + (blocks.afternoon ? 6 : 0) + (blocks.evening ? 6 : 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8 pb-12 relative">
      
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
            <span>Registro guardado con éxito</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            REGISTRO <span className="text-temple-gold">DIARIO</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest border-l-2 border-temple-gold pl-3">
            Domina tus 24 horas. Registra cada momento productivo.
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl md:text-3xl font-black text-white">14 de Nov, 2026</p>
          <p className="text-xs text-temple-gold uppercase tracking-widest font-bold">Día 318 del año</p>
        </div>
      </motion.div>

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
                    {totalProductiveHours} / 18 HRS OBJETIVO
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <FieldLabel
                  label="Productividad por Bloques"
                  tooltip="Marca cada bloque del día en el que te mantuviste enfocado y productivo en tus metas (trabajo, entrenamiento, desarrollo personal)."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {[
                    { id: 'morning', label: 'Bloque Mañana', time: '06:00 - 12:00', desc: 'Enfoque & Rutina Matutina', icon: '🌅' },
                    { id: 'afternoon', label: 'Bloque Tarde', time: '12:00 - 18:00', desc: 'Productividad & Fuerza', icon: '☀️' },
                    { id: 'evening', label: 'Bloque Noche', time: '18:00 - 00:00', desc: 'Desconexión & Reflexión', icon: '🌙' }
                  ].map((block) => {
                    const isChecked = blocks[block.id as keyof typeof blocks] || false;
                    return (
                      <motion.div
                        key={block.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleBlock(block.id as any)}
                        className={`
                          relative cursor-pointer p-5 rounded-2xl border flex items-center gap-4 transition-all duration-300
                          ${isChecked
                            ? 'bg-temple-gold/10 border-temple-gold text-white shadow-[0_0_15px_rgba(197,160,89,0.25)]'
                            : 'bg-black/40 border-white/10 text-gray-500 hover:border-temple-gold/50 hover:text-white'}
                        `}
                      >
                        <div className="text-3xl shrink-0">{block.icon}</div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-sm text-white">{block.label}</h4>
                          <span className="text-[10px] font-mono block text-temple-gold mt-0.5">{block.time}</span>
                          <span className="text-[11px] text-gray-400 block truncate mt-1">{block.desc}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isChecked ? 'border-temple-gold bg-temple-gold' : 'border-white/20'
                        }`}>
                          {isChecked && <span className="text-[10px] text-black font-black">✓</span>}
                        </div>
                      </motion.div>
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
                  Checklist de Fallos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FieldLabel
                  label="Reconoce tus errores del día"
                  tooltip="Escribe cada fallo, tentación o error que cometiste hoy. Ser honesto aquí te ayuda a ajustar tu estrategia. Presiona Enter para agregar."
                />
                <div className="space-y-4 mt-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={newFailure}
                      onChange={(e) => setNewFailure(e.target.value)}
                      onKeyDown={addFailure}
                      placeholder="Ej: No entrené hoy, Comí fuera de plan..."
                      className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-temple-red focus:ring-1 focus:ring-temple-red transition-all"
                    />
                    <div className="absolute right-3 top-3 text-gray-500"><Plus size={18} /></div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <AnimatePresence>
                      {failures.map((failure, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center justify-between bg-black/40 border border-white/5 rounded-lg p-3 group hover:border-temple-red/50 transition-colors"
                        >
                          <span className="text-sm text-gray-300 font-medium">{failure}</span>
                          <button onClick={() => removeFailure(idx)} className="text-gray-500 hover:text-temple-red opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: Holistic Blocks */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity size={20} className="text-temple-gold" />
                  CUERPO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <FieldLabel label="Horas de Sueño" tooltip="¿Cuántas horas dormiste anoche? El rango ideal es entre 7 y 9 horas." />
                  <div className="flex justify-between items-center text-sm font-bold text-gray-300">
                    <span className="text-temple-gold">{sleep} hrs</span>
                  </div>
                  <Slider value={[sleep]} max={12} min={0} step={0.5} onValueChange={(val) => setSleep(val[0])} />
                </div>
                <div className="space-y-3">
                  <FieldLabel label="Agua (Litros)" tooltip="¿Cuántos litros de agua bebiste hoy? El mínimo recomendado es 2.5L para hombres activos." />
                  <div className="flex justify-between items-center text-sm font-bold text-gray-300">
                    <span className="text-temple-gold">{water} L</span>
                  </div>
                  <Slider value={[water]} max={5} min={0} step={0.1} onValueChange={(val) => setWater(val[0])} />
                </div>
                <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/5">
                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-300">Entrenamiento</span>
                    <p className="text-[10px] text-gray-500">¿Completaste tu sesión de hoy?</p>
                  </div>
                  <Switch checked={workout} onCheckedChange={setWorkout} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BrainCircuit size={20} className="text-temple-gold" />
                  MENTE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldLabel label="Hábitos mentales" tooltip="Marca cada hábito mental que completaste hoy. Estos fortalecen tu disciplina cognitiva." />
                {DEFAULT_MIND_HABITS.map((habit, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg border border-white/5 hover:border-temple-gold/30 transition-colors">
                    <Checkbox id={`mind-${i}`} checked={mindChecks[i] || false} onCheckedChange={() => toggleMindCheck(i)} />
                    <label htmlFor={`mind-${i}`} className="text-sm font-medium text-gray-300 cursor-pointer">{habit}</label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart size={20} className="text-temple-gold" />
                  ESPÍRITU
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldLabel label="Hábitos espirituales" tooltip="Marca los hábitos que alimentan tu conexión interior y tus relaciones más importantes." />
                {DEFAULT_SPIRIT_HABITS.map((habit, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-black/30 rounded-lg border border-white/5 hover:border-temple-gold/30 transition-colors">
                    <Checkbox id={`spirit-${i}`} checked={spiritChecks[i] || false} onCheckedChange={() => toggleSpiritCheck(i)} />
                    <label htmlFor={`spirit-${i}`} className="text-sm font-medium text-gray-300 cursor-pointer">{habit}</label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Button onClick={handleSave} className="w-full h-14 text-base">GUARDAR REGISTRO DIARIO</Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
