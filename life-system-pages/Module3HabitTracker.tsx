import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { InlineEdit } from '../components/ui/inline-edit';
import { FieldLabel } from '../components/ui/field-label';
import { useAuth } from '../context/AuthContext';
import { useAudit } from '../context/AuditContext';
import { CheckCircle, ArrowUpCircle, ArrowDownCircle, CalendarDays } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

export function Module3HabitTracker() {
  const { selectedStudent, user } = useAuth();
  const { log } = useAudit();

  const [doMore, setDoMore] = useState("");
  const [doLess, setDoLess] = useState("");
  const [habitsToDevelop, setHabitsToDevelop] = useState("");
  const [days, setDays] = useState<Record<number, boolean>>({});

  const habitsKey = `templefit_habits_${selectedStudent?.email || 'default'}`;

  // Load active student data
  useEffect(() => {
    if (!selectedStudent) return;
    const saved = localStorage.getItem(habitsKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDoMore(parsed.doMore || "");
        setDoLess(parsed.doLess || "");
        setHabitsToDevelop(parsed.habitsToDevelop || "");
        setDays(parsed.days || {});
      } catch (e) {
        resetDefaults();
      }
    } else {
      resetDefaults();
    }
  }, [selectedStudent, habitsKey]);

  const resetDefaults = () => {
    setDoMore("Entrenar 5x/semana, leer 20 pág./día, meditar 10 min/mañana, preparar comida sana.");
    setDoLess("Redes sociales después de las 9pm, comida procesada, trasnochar, quejarse.");
    setHabitsToDevelop("- Despertar 5:00 AM sin posponer alarma\n- Beber 1L de agua al despertar\n- Escribir 3 gratitudes diarias");
    setDays({});
  };

  const toggleDay = (d: number) => {
    if (!selectedStudent) return;
    const updatedDays = { ...days, [d]: !days[d] };
    setDays(updatedDays);

    const data = { doMore, doLess, habitsToDevelop, days: updatedDays };
    localStorage.setItem(habitsKey, JSON.stringify(data));

    // Audit log if editor is instructor/admin
    if (user && (user.role === 'instructor' || user.role === 'admin')) {
      log({
        userEmail: user.email,
        userName: user.name,
        role: user.role,
        action: 'update',
        module: 'Tracker de Hábitos',
        field: `Día ${d + 1}`,
        oldValue: days[d] ? 'Completado' : 'Pendiente',
        newValue: !days[d] ? 'Completado' : 'Pendiente',
        targetUser: selectedStudent.name
      });
    }
  };

  const handleSaveText = (field: 'doMore' | 'doLess' | 'habitsToDevelop', newValue: string, oldValue: string) => {
    if (!selectedStudent) return;
    const data = {
      doMore: field === 'doMore' ? newValue : doMore,
      doLess: field === 'doLess' ? newValue : doLess,
      habitsToDevelop: field === 'habitsToDevelop' ? newValue : habitsToDevelop,
      days
    };
    localStorage.setItem(habitsKey, JSON.stringify(data));

    if (field === 'doMore') setDoMore(newValue);
    if (field === 'doLess') setDoLess(newValue);
    if (field === 'habitsToDevelop') setHabitsToDevelop(newValue);

    // Audit log if editor is instructor/admin
    if (user && (user.role === 'instructor' || user.role === 'admin')) {
      log({
        userEmail: user.email,
        userName: user.name,
        role: user.role,
        action: 'update',
        module: 'Tracker de Hábitos',
        field: field === 'doMore' ? 'Hacer Más' : field === 'doLess' ? 'Hacer Menos' : 'Hábitos a Desarrollar',
        oldValue: oldValue || 'Vacío',
        newValue: newValue || 'Vacío',
        targetUser: selectedStudent.name
      });
    }
  };

  const completedDays = Object.values(days).filter(Boolean).length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8 pb-12">
      <motion.div variants={item}>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          TRACKER DE <span className="text-temple-gold">HÁBITOS</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest border-l-2 border-temple-gold pl-3">
          31 días de consistencia absoluta. Cada victoria cuenta.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <motion.div variants={item}>
            <Card className="border-t-4 border-t-temple-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpCircle size={22} className="text-temple-green" />
                  Hacer MÁS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FieldLabel
                  label="Acciones positivas"
                  tooltip="Escribe las acciones concretas que quieres hacer MÁS este mes. Sé específico: no digas 'entrenar' sino 'entrenar fuerza 5 veces por semana a las 6am'."
                />
                <InlineEdit 
                  value={doMore} 
                  onSave={(val) => handleSaveText('doMore', val, doMore)} 
                  multiline 
                  placeholder="¿Qué acciones positivas vas a reforzar este mes?" 
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-t-4 border-t-temple-red">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownCircle size={22} className="text-temple-red" />
                  Hacer MENOS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FieldLabel
                  label="Acciones a eliminar"
                  tooltip="Escribe los comportamientos que quieres reducir o eliminar este mes. Estas son las 'fugas de energía' que sabotean tu progreso."
                />
                <InlineEdit 
                  value={doLess} 
                  onSave={(val) => handleSaveText('doLess', val, doLess)} 
                  multiline 
                  placeholder="¿Qué comportamientos tóxicos vas a eliminar?" 
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-t-4 border-t-temple-gold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle size={22} className="text-temple-gold" />
                  Hábitos a Desarrollar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FieldLabel
                  label="Nuevos hábitos"
                  tooltip="Lista los hábitos específicos que estás construyendo activamente este mes."
                />
                <InlineEdit 
                  value={habitsToDevelop} 
                  onSave={(val) => handleSaveText('habitsToDevelop', val, habitsToDevelop)} 
                  multiline 
                  placeholder="Ej: - Despertar 5:00 AM" 
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="!p-5 text-center bg-gradient-to-br from-temple-gold/5 to-transparent border-temple-gold/30">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Victorias del Mes</p>
              <p className="text-5xl font-black text-temple-gold">{completedDays}</p>
              <p className="text-xs text-gray-400">de 31 días</p>
              <div className="w-full bg-black/30 rounded-full h-3 mt-3 border border-white/5 overflow-hidden">
                <motion.div
                  className="bg-temple-gold h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedDays / 31) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="text-temple-gold" size={20} />
                  Matriz de Victoria — 31 Días
                </CardTitle>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                  Haz clic en cada día que cumpliste tu compromiso.
                </p>
              </CardHeader>
              <CardContent>
                <FieldLabel
                  label="Días de cumplimiento"
                  tooltip="Marca cada día en que cumpliste con TODOS los hábitos definidos arriba (Hacer Más) y NO caíste en ninguno de los hábitos negativos (Hacer Menos). Sé honesto contigo mismo."
                />
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 md:gap-3 mt-2">
                  {Array.from({ length: 31 }).map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleDay(i)}
                      className={`
                        relative cursor-pointer aspect-square rounded-xl border flex flex-col items-center justify-center transition-all duration-300
                        ${days[i]
                          ? 'bg-temple-green border-temple-green text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-black/40 border-white/10 text-gray-500 hover:border-temple-gold/50 hover:text-white'}
                      `}
                    >
                      <span className="text-base font-black">{i + 1}</span>
                      <span className="text-[8px] uppercase tracking-widest opacity-80 mt-0.5">DÍA</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
