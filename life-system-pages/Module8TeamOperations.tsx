import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { FieldLabel } from '../components/ui/field-label';
import { ClipboardList, Users, Target, ShieldAlert, Crosshair, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface ScheduleEntry {
  id: string;
  time: string;
  activity: string;
  instructorFocus: string;
  commercialFocus: string;
  product: string;
  notes: string;
}

interface DailyDirective {
  date: string;
  foundation: string;
  commercialFocus: string;
  mainObjective: string;
  highlightedProduct: string;
}

const DEFAULT_SCHEDULE: ScheduleEntry[] = [
  { id: '1', time: '06:00 - 07:00', activity: 'Apertura', instructorFocus: 'Revisar equipos. Preparar música.', commercialFocus: 'Recepción positiva', product: '', notes: '' },
  { id: '2', time: '07:00 - 09:00', activity: 'Clase Matutina', instructorFocus: 'Ficha técnica del alumno con su Rutina: Alta, media o baja intensidad. Foco: Saludar x nombre.', commercialFocus: 'Cross-sell Reto 21 Días', product: 'Reto 21 Días', notes: '' },
  { id: '3', time: '09:00 - 10:00', activity: 'Clase Funcional', instructorFocus: "Rutina: Peso corporal. Foco: 'cuerpo-templo'.", commercialFocus: 'Renovaciones', product: 'Suscripción', notes: '' },
  { id: '4', time: '10:00 - 11:00', activity: 'Clase Técnica', instructorFocus: 'Rutina: Técnica. Foco: Energía alta.', commercialFocus: 'Merchandising', product: 'Camiseta Oficial', notes: '' },
  { id: '5', time: '11:00 - 12:00', activity: 'Marketing', instructorFocus: 'Grabar contenido para redes.', commercialFocus: 'Captación leads', product: '', notes: '' },
  { id: '6', time: '12:00 - 14:00', activity: 'Pausa', instructorFocus: 'Descanso staff.', commercialFocus: '', product: '', notes: '' },
  { id: '7', time: '14:00 - 15:00', activity: 'Admin / Ops', instructorFocus: 'Planificar clases. Formación.', commercialFocus: 'Follow-up prospectos', product: '', notes: '' },
  { id: '8', time: '15:00 - 16:00', activity: 'Preparación', instructorFocus: 'Preparar equipos.', commercialFocus: '', product: '', notes: '' },
  { id: '9', time: '16:00 - 19:00', activity: 'Clases Tarde', instructorFocus: 'Foco: Comunidad y energía.', commercialFocus: 'Up-sell Suplementos', product: 'Proteína', notes: '' },
  { id: '10', time: '19:00 - 21:00', activity: 'Clases Noche', instructorFocus: 'Foco: Motivación final. Recordar eventos.', commercialFocus: 'Eventos Especiales', product: 'Ticket Sábado', notes: '' },
  { id: '11', time: '21:00 - 22:00', activity: 'Cierre', instructorFocus: 'Reportar equipos dañados.', commercialFocus: '', product: '', notes: '' },
];

export function Module8TeamOperations() {
  const { user } = useAuth();
  
  const directiveKey = 'templefit_daily_directive_v1';
  const scheduleKey = 'templefit_daily_schedule_v1';

  const [directive, setDirective] = useState<DailyDirective>({
    date: new Date().toISOString().split('T')[0],
    foundation: 'Disciplina y Excelencia Técnica',
    commercialFocus: 'Retención y Cross-selling',
    mainObjective: 'Lograr 5 renovaciones adelantadas',
    highlightedProduct: 'Reto 21 Días',
  });
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

  useEffect(() => {
    const savedDir = localStorage.getItem(directiveKey);
    if (savedDir) {
      try { setDirective(JSON.parse(savedDir)); } catch (e) {}
    }

    const savedSched = localStorage.getItem(scheduleKey);
    if (savedSched) {
      try { setSchedule(JSON.parse(savedSched)); } catch (e) {}
    } else {
      setSchedule(DEFAULT_SCHEDULE);
    }
  }, []);

  const updateDirective = (field: keyof DailyDirective, value: string) => {
    const updated = { ...directive, [field]: value };
    setDirective(updated);
    localStorage.setItem(directiveKey, JSON.stringify(updated));
  };

  const updateSchedule = (id: string, field: keyof ScheduleEntry, value: string) => {
    const updated = schedule.map(s => s.id === id ? { ...s, [field]: value } : s);
    setSchedule(updated);
    localStorage.setItem(scheduleKey, JSON.stringify(updated));
  };

  // Only Instructors and Admins
  if (user?.role !== 'admin' && user?.role !== 'instructor') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <ShieldAlert size={48} className="text-temple-red mb-4 opacity-50" />
        <h2 className="text-xl font-bold uppercase text-white mb-2">Acceso Restringido</h2>
        <p className="text-gray-500 text-sm">Este módulo es exclusivo para el Staff de TempleFit.</p>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <motion.div variants={item}>
        <h1 className="text-3xl md:text-5xl font-serif font-black uppercase text-white">
          LIBRO OPERATIVO <span className="text-temple-gold italic">DIARIO</span>
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-xl">
          Directivas y enfoque del equipo. Organización por franjas horarias y objetivos comerciales.
        </p>
      </motion.div>

      {/* Directiva Diaria */}
      <motion.div variants={item}>
        <Card className="border-t-4 border-t-temple-gold bg-black/40">
          <CardContent className="!p-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Target className="text-temple-gold" size={20} />
              Directiva Diaria del Equipo
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div>
                <FieldLabel>Fecha Operativa</FieldLabel>
                <input
                  type="date"
                  value={directive.date}
                  onChange={(e) => updateDirective('date', e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-temple-gold"
                />
              </div>
              <div className="lg:col-span-2">
                <FieldLabel>Fundamento del Día</FieldLabel>
                <input
                  type="text"
                  value={directive.foundation}
                  onChange={(e) => updateDirective('foundation', e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-temple-gold"
                />
              </div>
              <div className="lg:col-span-2">
                <FieldLabel>Objetivo Principal del Día</FieldLabel>
                <div className="relative">
                  <Crosshair className="absolute left-3 top-1/2 -translate-y-1/2 text-temple-red opacity-70" size={16} />
                  <input
                    type="text"
                    value={directive.mainObjective}
                    onChange={(e) => updateDirective('mainObjective', e.target.value)}
                    className="w-full bg-black/30 border border-temple-red/30 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-temple-red"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <FieldLabel>Foco Comercial</FieldLabel>
                <input
                  type="text"
                  value={directive.commercialFocus}
                  onChange={(e) => updateDirective('commercialFocus', e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-temple-gold"
                />
              </div>
              <div className="lg:col-span-3">
                <FieldLabel>Producto / Oferta Destacada</FieldLabel>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-temple-gold opacity-70" size={16} />
                  <input
                    type="text"
                    value={directive.highlightedProduct}
                    onChange={(e) => updateDirective('highlightedProduct', e.target.value)}
                    className="w-full bg-black/30 border border-temple-gold/30 rounded-lg py-2 pl-9 pr-3 text-sm text-temple-gold font-bold focus:outline-none focus:border-temple-gold"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabla de Horarios */}
      <motion.div variants={item}>
        <Card>
          <CardContent className="!p-0 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ClipboardList className="text-temple-gold" size={20} />
                Desglose Operativo por Horario
              </h3>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/40">
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[120px]">Franja Horaria</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[150px]">Actividad Principal</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[300px]">Enfoque del Instructor</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[180px]">Foco Comercial</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 w-[150px]">Prod. Destacado</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 min-w-[150px]">Notas Operativas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((row) => (
                    <TableRow key={row.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                      <TableCell className="align-top font-bold text-temple-gold text-xs">{row.time}</TableCell>
                      <TableCell className="align-top">
                        <input
                          type="text"
                          value={row.activity}
                          onChange={(e) => updateSchedule(row.id, 'activity', e.target.value)}
                          className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-white"
                        />
                      </TableCell>
                      <TableCell className="align-top">
                        <textarea
                          value={row.instructorFocus}
                          onChange={(e) => updateSchedule(row.id, 'instructorFocus', e.target.value)}
                          rows={2}
                          className="w-full bg-transparent border border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-gray-300 resize-none p-1 rounded"
                        />
                      </TableCell>
                      <TableCell className="align-top">
                        <input
                          type="text"
                          value={row.commercialFocus}
                          onChange={(e) => updateSchedule(row.id, 'commercialFocus', e.target.value)}
                          className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-gray-400"
                        />
                      </TableCell>
                      <TableCell className="align-top">
                        <input
                          type="text"
                          value={row.product}
                          onChange={(e) => updateSchedule(row.id, 'product', e.target.value)}
                          className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-temple-gold/80 italic"
                        />
                      </TableCell>
                      <TableCell className="align-top">
                        <input
                          type="text"
                          value={row.notes}
                          onChange={(e) => updateSchedule(row.id, 'notes', e.target.value)}
                          className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-gray-500"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
