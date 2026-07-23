import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { InlineEdit } from '../components/ui/inline-edit';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Switch } from '../components/ui/switch';
import { FieldLabel } from '../components/ui/field-label';
import { Search, Flame, ShieldAlert, Activity, UserCog } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudit } from '../context/AuditContext';
import { Stethoscope, Dumbbell, Ruler } from 'lucide-react';
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

interface BiomData {
  id: number;
  week: string;
  weight: number;
  bodyFat: number;
  fatigue: string;
  notes: string;
}

const DEFAULT_BIOM_DATA: BiomData[] = [
  { id: 1, week: 'Semana 1', weight: 80.5, bodyFat: 18.2, fatigue: 'Baja', notes: 'Adaptación inicial OK.' },
  { id: 2, week: 'Semana 2', weight: 79.8, bodyFat: 17.9, fatigue: 'Media', notes: 'Ligera molestia en lumbar.' },
  { id: 3, week: 'Semana 3', weight: 79.1, bodyFat: 17.5, fatigue: 'Alta', notes: 'Pico de volumen.' },
  { id: 4, week: 'Semana 4', weight: 78.5, bodyFat: 17.0, fatigue: 'Baja', notes: 'Descarga.' },
];

export function Module4TechnicalSheet() {
  const { user, selectedStudent } = useAuth();
  const { log } = useAudit();
  const [isInstructorMode, setIsInstructorMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<BiomData[]>([]);
  
  const [routines, setRoutines] = useState({
    calistenia: 'Rutina Base: Muscle ups 3x5, Front Lever 3x10s',
    boxeo: 'Trabajo de saco 5 rounds, Sparring técnico 3 rounds',
    crossfit: 'WOD Cindy: 20 min AMRAP',
    funcional: 'Movilidad articular 15 min, fortalecimiento core'
  });
  const [therapeuticNotes, setTherapeuticNotes] = useState('Ninguna lesión activa. Precaución en rodilla derecha al hacer sentadilla profunda.');
  const [heightCm, setHeightCm] = useState(175);

  const techKey = `templefit_technical_${selectedStudent?.email || 'default'}`;
  const routinesKey = `templefit_routines_${selectedStudent?.email || 'default'}`;
  const therapeuticKey = `templefit_therapeutic_${selectedStudent?.email || 'default'}`;
  const heightKey = `templefit_height_${selectedStudent?.email || 'default'}`;

  // Load data when active student changes
  useEffect(() => {
    if (!selectedStudent) return;
    const saved = localStorage.getItem(techKey);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        setData(DEFAULT_BIOM_DATA);
      }
    } else {
      setData(DEFAULT_BIOM_DATA);
    }
    
    const savedRoutines = localStorage.getItem(routinesKey);
    if (savedRoutines) { try { setRoutines(JSON.parse(savedRoutines)); } catch(e) {} }
    
    const savedTherapeutic = localStorage.getItem(therapeuticKey);
    if (savedTherapeutic) setTherapeuticNotes(savedTherapeutic);

    const savedHeight = localStorage.getItem(heightKey);
    if (savedHeight) { try { setHeightCm(parseInt(savedHeight, 10)); } catch(e) {} }

    // Turn off instructor mode automatically when switching students
    setIsInstructorMode(false);
  }, [selectedStudent, techKey, routinesKey, therapeuticKey, heightKey]);

  const filteredData = data.filter(row => 
    row.week.toLowerCase().includes(searchTerm.toLowerCase()) || 
    row.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (id: number, field: keyof BiomData, value: string) => {
    if (!selectedStudent) return;
    const row = data.find(r => r.id === id);
    if (!row) return;

    const oldValue = row[field].toString();
    const newValue = value;

    if (oldValue === newValue) return;

    const updatedData = data.map(r => 
      r.id === id ? { ...r, [field]: field === 'weight' || field === 'bodyFat' ? parseFloat(value) || 0 : value } : r
    );

    setData(updatedData);
    localStorage.setItem(techKey, JSON.stringify(updatedData));

    // Audit log entry
    if (user && (user.role === 'instructor' || user.role === 'admin')) {
      log({
        userEmail: user.email,
        userName: user.name,
        role: user.role,
        action: 'update',
        module: 'Ficha Técnica',
        field: `${row.week} - ${field === 'weight' ? 'Peso' : field === 'bodyFat' ? 'Grasa' : 'Notas'}`,
        oldValue: oldValue + (field === 'weight' ? ' kg' : field === 'bodyFat' ? '%' : ''),
        newValue: newValue + (field === 'weight' ? ' kg' : field === 'bodyFat' ? '%' : ''),
        targetUser: selectedStudent.name
      });
    }
  };

  const handleUpdateRoutine = (discipline: keyof typeof routines, value: string) => {
    const updated = { ...routines, [discipline]: value };
    setRoutines(updated);
    localStorage.setItem(routinesKey, JSON.stringify(updated));
    if (user && (user.role === 'instructor' || user.role === 'admin') && selectedStudent) {
      log({ userEmail: user.email, userName: user.name, role: user.role, action: 'update', module: 'Rutinas', field: discipline, oldValue: '...', newValue: 'Actualizado', targetUser: selectedStudent.name });
    }
  };

  const handleUpdateTherapeutic = (value: string) => {
    setTherapeuticNotes(value);
    localStorage.setItem(therapeuticKey, value);
    if (user && (user.role === 'instructor' || user.role === 'admin') && selectedStudent) {
      log({ userEmail: user.email, userName: user.name, role: user.role, action: 'update', module: 'Ficha Terapéutica', field: 'Notas Médicas', oldValue: '...', newValue: 'Actualizado', targetUser: selectedStudent.name });
    }
  };

  // Get current status from the last week of data
  const currentWeight = data.length > 0 ? data[data.length - 1].weight : 0;
  const currentBodyFat = data.length > 0 ? data[data.length - 1].bodyFat : 0;
  const currentFatigue = data.length > 0 ? data[data.length - 1].fatigue : 'Baja';

  // Calculate IMC (BMI)
  const heightM = heightCm / 100;
  const imc = heightM > 0 ? (currentWeight / (heightM * heightM)).toFixed(1) : '0';

  const canEdit = user && (user.role === 'instructor' || user.role === 'admin');

  const handleUpdateHeight = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setHeightCm(num);
      localStorage.setItem(heightKey, num.toString());
    }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-6 md:space-y-8 pb-12"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            FICHA <span className="text-temple-gold">TÉCNICA</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 mt-1 uppercase tracking-widest border-l-2 border-temple-gold pl-3">
            Métricas puras. Datos biométricos y de rendimiento de {selectedStudent?.name || 'Guerrero'}.
          </p>
        </div>
        
        {/* Instructor Toggle (Only visible to Instructors/Admins) */}
        {canEdit && (
          <div className="flex items-center space-x-3 bg-black/40 p-3 rounded-lg border border-white/5">
            <UserCog size={20} className={isInstructorMode ? "text-temple-gold" : "text-gray-500"} />
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300 block">Modo Instructor</span>
              <span className="text-[10px] text-gray-500 block">Habilita edición en tabla</span>
            </div>
            <Switch checked={isInstructorMode} onCheckedChange={setIsInstructorMode} />
          </div>
        )}
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-temple-navy-dark to-temple-navy border-t-4 border-t-temple-gold">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <FieldLabel label="Peso Actual" tooltip="El último peso corporal registrado en kilogramos." />
                  </div>
                  <h3 className="text-3xl font-black text-white mt-1">{currentWeight} <span className="text-lg text-temple-gold">kg</span></h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <Ruler size={14} className="text-temple-gold" />
                    <span>Altura:</span>
                    {isInstructorMode && canEdit ? (
                      <InlineEdit value={heightCm.toString()} onSave={handleUpdateHeight} className="w-12 bg-black/40 border border-white/10 rounded px-1" />
                    ) : (
                      <span>{heightCm}</span>
                    )}
                    <span>cm</span>
                  </div>
                </div>
                <Activity className="text-temple-gold opacity-50" size={40} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-temple-navy-dark to-temple-navy border-t-4 border-t-temple-gold-bright">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <FieldLabel label="% Grasa e IMC" tooltip="Porcentaje de grasa corporal estimado y el Índice de Masa Corporal (IMC)." />
                  <h3 className="text-3xl font-black text-white mt-1">{currentBodyFat} <span className="text-lg text-temple-gold-bright">%</span></h3>
                  <div className="mt-2 text-xs font-bold uppercase tracking-widest text-white/60">
                    IMC: <span className="text-temple-gold-bright">{imc}</span>
                  </div>
                </div>
                <Flame className="text-temple-gold-bright opacity-50" size={40} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-temple-navy-dark to-temple-navy border-t-4 border-t-temple-red">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <FieldLabel label="Fatiga Central" tooltip="Estado del sistema nervioso según los índices de carga física acumulada." />
                  <h3 className="text-3xl font-black text-white uppercase mt-1">{currentFatigue}</h3>
                </div>
                <ShieldAlert className="text-temple-red opacity-50" size={40} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Table */}
      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="text-temple-gold" size={20} />
                Evolución Biométrica
              </CardTitle>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Seguimiento por semana con ajustes del coach.</p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Filtrar por semana o notas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold focus:ring-1 focus:ring-temple-gold transition-all"
              />
            </div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={isInstructorMode ? 'edit' : 'view'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Semana</TableHead>
                      <TableHead>Peso (kg)</TableHead>
                      <TableHead>% Grasa</TableHead>
                      <TableHead>Fatiga</TableHead>
                      <TableHead className="w-1/3">Notas / Ajustes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">No se encontraron registros.</TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className="font-bold">{row.week}</TableCell>
                          <TableCell>
                            {isInstructorMode && canEdit ? (
                              <InlineEdit 
                                value={row.weight.toString()} 
                                onSave={(val) => handleUpdate(row.id, 'weight', val)} 
                                className="w-20"
                                placeholder="Ingresa peso..."
                              />
                            ) : (
                              <span className="text-temple-gold font-bold">{row.weight} kg</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isInstructorMode && canEdit ? (
                              <InlineEdit 
                                value={row.bodyFat.toString()} 
                                onSave={(val) => handleUpdate(row.id, 'bodyFat', val)} 
                                className="w-20"
                                placeholder="Ingresa grasa..."
                              />
                            ) : (
                              <span>{row.bodyFat}%</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isInstructorMode && canEdit ? (
                              <select 
                                value={row.fatigue}
                                onChange={(e) => handleUpdate(row.id, 'fatigue', e.target.value)}
                                className="bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-white"
                              >
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                              </select>
                            ) : (
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                row.fatigue === 'Alta' ? 'bg-temple-red/20 text-temple-red border border-temple-red/30' : 
                                row.fatigue === 'Media' ? 'bg-temple-gold/20 text-temple-gold-bright border border-temple-gold/30' :
                                'bg-green-500/10 text-green-400 border border-green-500/30'
                              }`}>
                                {row.fatigue}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {isInstructorMode && canEdit ? (
                              <InlineEdit 
                                value={row.notes} 
                                onSave={(val) => handleUpdate(row.id, 'notes', val)} 
                                multiline
                                placeholder="Agrega notas de entrenamiento..."
                              />
                            ) : (
                              <span className="text-gray-400">{row.notes}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rutinas y Ficha Terapéutica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div variants={item}>
          <Card className="h-full border-t-4 border-t-temple-gold">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="text-temple-gold" size={20} />
                Rutinas de Ejercicios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <FieldLabel label="Calistenia" />
                <InlineEdit 
                  value={routines.calistenia} 
                  onSave={(val) => handleUpdateRoutine('calistenia', val)} 
                  multiline disabled={!isInstructorMode || !canEdit}
                  placeholder="Rutina de calistenia..." 
                />
              </div>
              <div className="pt-2 border-t border-white/5">
                <FieldLabel label="Boxeo / Kickboxing" />
                <InlineEdit 
                  value={routines.boxeo} 
                  onSave={(val) => handleUpdateRoutine('boxeo', val)} 
                  multiline disabled={!isInstructorMode || !canEdit}
                  placeholder="Rutina de deportes de contacto..." 
                />
              </div>
              <div className="pt-2 border-t border-white/5">
                <FieldLabel label="CrossFit" />
                <InlineEdit 
                  value={routines.crossfit} 
                  onSave={(val) => handleUpdateRoutine('crossfit', val)} 
                  multiline disabled={!isInstructorMode || !canEdit}
                  placeholder="WODs de CrossFit..." 
                />
              </div>
              <div className="pt-2 border-t border-white/5">
                <FieldLabel label="Ejercicio Funcional Terapéutico" />
                <InlineEdit 
                  value={routines.funcional} 
                  onSave={(val) => handleUpdateRoutine('funcional', val)} 
                  multiline disabled={!isInstructorMode || !canEdit}
                  placeholder="Movilidad y función..." 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full border-t-4 border-t-temple-red bg-gradient-to-b from-temple-red/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-temple-red">
                <Stethoscope size={20} />
                Ficha Técnica Terapéutica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FieldLabel 
                label="Diagnóstico / Precauciones / Rehabilitación" 
                tooltip="Información confidencial de lesiones, dolores o consideraciones médicas del atleta."
              />
              <div className="bg-black/30 p-4 rounded-xl border border-temple-red/20 mt-2 min-h-[150px]">
                <InlineEdit 
                  value={therapeuticNotes} 
                  onSave={handleUpdateTherapeutic} 
                  multiline disabled={!isInstructorMode || !canEdit}
                  placeholder="Registra lesiones o precauciones..." 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

    </motion.div>
  );
}
