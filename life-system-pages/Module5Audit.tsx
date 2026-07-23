import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { InlineEdit } from '../components/ui/inline-edit';
import { FieldLabel } from '../components/ui/field-label';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useAudit } from '../context/AuditContext';
import { Target, Trophy, Flame, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

interface AuditScores {
  training: number;
  nutrition: number;
  rest: number;
  hydration: number;
  mindset: number;
  consistency: number;
}

const DEFAULT_SCORES: AuditScores = {
  training: 90,
  nutrition: 80,
  rest: 85,
  hydration: 95,
  mindset: 75,
  consistency: 85
};

export function Module5Audit() {
  const { selectedStudent, user } = useAuth();
  const { log } = useAudit();

  const [achievements, setAchievements] = useState("");
  const [distractions, setDistractions] = useState("");
  const [scores, setScores] = useState<AuditScores>(DEFAULT_SCORES);
  
  const [showToast, setShowToast] = useState(false);

  const auditKey = `templefit_monthly_audit_${selectedStudent?.email || 'default'}`;

  // Load active student audit data
  useEffect(() => {
    if (!selectedStudent) return;
    const saved = localStorage.getItem(auditKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAchievements(parsed.achievements || "");
        setDistractions(parsed.distractions || "");
        setScores(parsed.scores || DEFAULT_SCORES);
      } catch (e) {
        resetDefaults();
      }
    } else {
      resetDefaults();
    }
  }, [selectedStudent, auditKey]);

  const resetDefaults = () => {
    setAchievements("- Entrenamientos completados al 100% de intensidad.\n- Dieta limpia sin comidas trampa.\n- Consumo de agua de 3L diario promedio.");
    setDistractions("- Trasnochar los fines de semana afectando la recuperación.\n- Omitir estiramientos post-entrenamiento.\n- Distracción con el móvil durante los descansos.");
    setScores(DEFAULT_SCORES);
  };

  const handleSliderChange = (field: keyof AuditScores, val: number) => {
    setScores(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    if (!selectedStudent) return;
    const data = {
      achievements,
      distractions,
      scores
    };
    localStorage.setItem(auditKey, JSON.stringify(data));

    // Audit log if editor is instructor/admin
    if (user && (user.role === 'instructor' || user.role === 'admin')) {
      log({
        userEmail: user.email,
        userName: user.name,
        role: user.role,
        action: 'update',
        module: 'Auditoría Mensual',
        field: 'Rueda del Rendimiento',
        oldValue: 'Puntajes anteriores',
        newValue: `Entr: ${scores.training}%, Nutr: ${scores.nutrition}%, Desc: ${scores.rest}%, Hidr: ${scores.hydration}%, Ment: ${scores.mindset}%, Cons: ${scores.consistency}%`,
        targetUser: selectedStudent.name
      });
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const radarData = [
    { subject: 'Entrenamiento', A: scores.training, fullMark: 100 },
    { subject: 'Nutrición', A: scores.nutrition, fullMark: 100 },
    { subject: 'Descanso', A: scores.rest, fullMark: 100 },
    { subject: 'Hidratación', A: scores.hydration, fullMark: 100 },
    { subject: 'Mentalidad', A: scores.mindset, fullMark: 100 },
    { subject: 'Consistencia', A: scores.consistency, fullMark: 100 },
  ];

  const canEdit = user && (user.role === 'instructor' || user.role === 'admin');

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-6 md:space-y-8 pb-12 relative"
    >
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
            <span>Auditoría guardada con éxito</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item}>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          AUDITORÍA <span className="text-temple-gold">MENSUAL</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400 mt-1 uppercase tracking-widest border-l-2 border-temple-gold pl-3">
          El balance de la guerra. Analiza tu rueda del rendimiento deportivo de {selectedStudent?.name}.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar Chart Section */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="text-temple-gold" size={20} />
                  La Rueda del Rendimiento
                </CardTitle>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Evaluación de las 6 dimensiones de rendimiento físico y hábitos.</p>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 'bold' }} 
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: 'rgba(197,160,89,0.8)', fontSize: 9 }}
                        tickCount={6}
                      />
                      <Radar
                        name="Puntaje"
                        dataKey="A"
                        stroke="#C5A059"
                        strokeWidth={3}
                        fill="#C5A059"
                        fillOpacity={0.25}
                        isAnimationActive={true}
                        animationDuration={800}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,22,48,0.9)', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '8px' }}
                        itemStyle={{ color: '#C5A059', fontWeight: 'bold' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dimension Sliders (Only visible to Instructors/Admins) */}
          {canEdit && (
            <motion.div variants={item}>
              <Card className="border-temple-gold/20 bg-black/30">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-temple-gold">
                    Ajustar Evaluaciones (Exclusivo Coach)
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Entrenamiento', field: 'training' },
                    { label: 'Nutrición', field: 'nutrition' },
                    { label: 'Descanso', field: 'rest' },
                    { label: 'Hidratación', field: 'hydration' },
                    { label: 'Mentalidad', field: 'mindset' },
                    { label: 'Consistencia', field: 'consistency' }
                  ].map((dim) => (
                    <div key={dim.field} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-300">{dim.label}</span>
                        <span className="font-black text-temple-gold">{scores[dim.field as keyof AuditScores]}%</span>
                      </div>
                      <Slider 
                        value={[scores[dim.field as keyof AuditScores]]}
                        max={100}
                        min={0}
                        step={5}
                        onValueChange={(val) => handleSliderChange(dim.field as keyof AuditScores, val[0])}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Column: Achievements & Distractions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div variants={item}>
              <Card className="border-t-4 border-t-temple-gold bg-gradient-to-br from-black/60 to-temple-gold/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-temple-gold-bright">
                    <Trophy size={20} />
                    Logros Destacados
                  </CardTitle>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Victorias que forjan tu imperio.</p>
                </CardHeader>
                <CardContent>
                  <FieldLabel 
                    label="Lista de victorias" 
                    tooltip="Haz doble clic para editar. Registra tus mayores logros de este mes: nuevos hábitos consolidados, récords personales de fuerza, metas alimenticias cumplidas, etc."
                  />
                  <InlineEdit 
                    value={achievements} 
                    onSave={(val) => {
                      setAchievements(val);
                      if (!selectedStudent) return;
                      const data = { achievements: val, distractions, scores };
                      localStorage.setItem(auditKey, JSON.stringify(data));
                    }} 
                    multiline
                    className="text-white text-base leading-relaxed h-28 mt-2"
                    placeholder="Enumera aquí tus victorias del mes..."
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Distractions */}
            <motion.div variants={item}>
              <Card className="border-t-4 border-t-temple-red bg-gradient-to-br from-black/60 to-temple-red/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl text-temple-red">
                    <Flame size={20} />
                    Fugas de Energía (Distracciones)
                  </CardTitle>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">El enemigo interior. Reconócelo.</p>
                </CardHeader>
                <CardContent>
                  <FieldLabel 
                    label="Fugas a corregir" 
                    tooltip="Haz doble clic para editar. Registra las distracciones, fallos repetitivos, o debilidades que te impiden mantener el enfoque total en tu propósito. Identificarlos es el primer paso para corregirlos."
                  />
                  <InlineEdit 
                    value={distractions} 
                    onSave={(val) => {
                      setDistractions(val);
                      if (!selectedStudent) return;
                      const data = { achievements, distractions: val, scores };
                      localStorage.setItem(auditKey, JSON.stringify(data));
                    }} 
                    multiline
                    className="text-gray-300 text-base leading-relaxed h-28 mt-2"
                    placeholder="¿Qué te alejó de tu propósito este mes?"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={item} className="pt-4">
            <Button onClick={handleSave} className="w-full h-14 text-base">
              GUARDAR AUDITORÍA MENSUAL
            </Button>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
