'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { InlineEdit } from '../components/ui/inline-edit';
import { FieldLabel } from '../components/ui/field-label';
import { useAuth } from '../context/AuthContext';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { Student } from '../types';
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
  Edit3
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

  // Student Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [escuadronId, setEscuadronId] = useState("Paz-Alfa");
  const [phase, setPhase] = useState<Student['phase']>("1 - Iniciación");
  const [plan, setPlan] = useState<Student['plan']>("Reto 21 Días");
  const [status, setStatus] = useState<Student['status']>("active");

  const [traits, setTraits] = useState("");
  const [admires, setAdmires] = useState("");
  const [purpose, setPurpose] = useState("");
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const [bloodType, setBloodType] = useState("O+");
  const [allergies, setAllergies] = useState("Ninguna");
  const [routine, setRoutine] = useState("Rutina no asignada");
  const [paymentMethod, setPaymentMethod] = useState("QR / Efectivo");
  const [sessions, setSessions] = useState("Lunes a Viernes (06:00 AM)");
  const [nutritionPlan, setNutritionPlan] = useState("Plan Base Anti-inflamatorio");
  const [mentorshipNotes, setMentorshipNotes] = useState("");

  const profileKey = `templefit_profile_v3_${selectedStudent?.email || 'default'}`;

  // Load all students for the quick switcher
  useEffect(() => {
    const db = getCRMDatabase();
    setAllStudents(db.students || []);
    if (!selectedStudent && db.students && db.students.length > 0) {
      setSelectedStudent(db.students[0]);
    }
  }, [selectedStudent, setSelectedStudent]);

  // Load profile when selected student changes
  useEffect(() => {
    if (!selectedStudent) return;
    
    setName(selectedStudent.name || "");
    setPhone(selectedStudent.phone || "");
    setEmail(selectedStudent.email || "");
    setEscuadronId(selectedStudent.escuadronId || "Paz-Alfa");
    setPhase(selectedStudent.phase || "1 - Iniciación");
    setPlan(selectedStudent.plan || "Reto 21 Días");
    setStatus(selectedStudent.status || "active");

    setWeightKg(selectedStudent.weightKg || 70);
    setNutritionPlan(selectedStudent.nutritionPlan || "ElectroHidra + Nutrición Anti-inflamatoria");
    setAllergies(selectedStudent.allergiesOrRestrictions || "Ninguna");
    setPurpose(selectedStudent.spiritualIntention || selectedStudent.physicalGoal || "Fortalecer cuerpo, mente y espíritu.");
    setMentorshipNotes(selectedStudent.mentorshipNotes || "");

    const saved = localStorage.getItem(profileKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTraits(parsed.traits || "Disciplinado, Resiliente, Líder de Escuadrón");
        setAdmires(parsed.admires || "David Goggins / Héroes Bíblicos");
        setHeightCm(parsed.heightCm || 170);
        setBloodType(parsed.bloodType || "O+");
        setRoutine(parsed.routine || selectedStudent.plan || "Calistenia + Crossfit + Combate Ético");
        setPaymentMethod(parsed.paymentMethod || "QR / Transferencia");
        setSessions(parsed.sessions || "Lunes a Viernes (06:00 AM)");
      } catch (e) {
        // Fallback
      }
    } else {
      setTraits("Disciplinado, Resiliente, Líder de Escuadrón");
      setAdmires("David Goggins / Héroes Bíblicos");
      setHeightCm(170);
      setBloodType("O+");
      setRoutine("Calistenia + Crossfit + Combate Ético");
      setPaymentMethod("QR / Transferencia");
      setSessions("Lunes a Viernes (06:00 AM)");
    }
  }, [selectedStudent, profileKey]);

  const handleSaveField = (field: string, newValue: any) => {
    if (!selectedStudent) return;

    // Save in student-specific profile
    const currentLocal = { 
      traits, admires, purpose, heightCm, weightKg, bloodType, allergies, 
      routine, paymentMethod, sessions, nutritionPlan, mentorshipNotes, [field]: newValue 
    };
    localStorage.setItem(profileKey, JSON.stringify(currentLocal));

    // Also update root student database
    const db = getCRMDatabase();
    let updatedActiveStudent = { ...selectedStudent };

    const updatedStudents = db.students.map(s => {
      if (s.id === selectedStudent.id) {
        const updated = { ...s };
        if (field === 'name') updated.name = String(newValue);
        if (field === 'phone') updated.phone = String(newValue);
        if (field === 'email') updated.email = String(newValue);
        if (field === 'escuadronId') updated.escuadronId = String(newValue);
        if (field === 'phase') updated.phase = newValue;
        if (field === 'plan') updated.plan = newValue;
        if (field === 'status') updated.status = newValue;
        if (field === 'weightKg') updated.weightKg = Number(newValue);
        if (field === 'nutritionPlan') updated.nutritionPlan = String(newValue);
        if (field === 'allergies') updated.allergiesOrRestrictions = String(newValue);
        if (field === 'purpose') updated.spiritualIntention = String(newValue);
        if (field === 'mentorshipNotes') updated.mentorshipNotes = String(newValue);
        
        updatedActiveStudent = updated;
        return updated;
      }
      return s;
    });

    db.students = updatedStudents;
    saveCRMDatabase(db);
    setSelectedStudent(updatedActiveStudent);
    setAllStudents(updatedStudents);

    // Update component state
    if (field === 'name') setName(newValue);
    if (field === 'phone') setPhone(newValue);
    if (field === 'email') setEmail(newValue);
    if (field === 'escuadronId') setEscuadronId(newValue);
    if (field === 'phase') setPhase(newValue);
    if (field === 'plan') setPlan(newValue);
    if (field === 'status') setStatus(newValue);
    if (field === 'traits') setTraits(newValue);
    if (field === 'admires') setAdmires(newValue);
    if (field === 'purpose') setPurpose(newValue);
    if (field === 'heightCm') setHeightCm(Number(newValue));
    if (field === 'weightKg') setWeightKg(Number(newValue));
    if (field === 'bloodType') setBloodType(newValue);
    if (field === 'allergies') setAllergies(newValue);
    if (field === 'routine') setRoutine(newValue);
    if (field === 'paymentMethod') setPaymentMethod(newValue);
    if (field === 'sessions') setSessions(newValue);
    if (field === 'nutritionPlan') setNutritionPlan(newValue);
    if (field === 'mentorshipNotes') setMentorshipNotes(newValue);

    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const bmi = (weightKg / Math.pow((heightCm || 170) / 100, 2)).toFixed(1);
  const getBmiStatus = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: 'Bajo peso', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (bmiValue < 25) return { label: 'Saludable / Óptimo', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (bmiValue < 30) return { label: 'Sobrepeso Leve', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    return { label: 'Recomposición Requerida', color: 'text-red-400', bg: 'bg-red-500/20' };
  };
  const bmiStatus = getBmiStatus(Number(bmi));

  if (!selectedStudent) {
    return (
      <div className="text-center py-16">
        <User size={48} className="text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No hay ningún atleta seleccionado</h3>
        <p className="text-sm text-gray-400 mb-6">Selecciona un atleta desde el Directorio para abrir su expediente.</p>
        <button
          onClick={() => onNavigate?.('directory')}
          className="px-6 py-2.5 bg-temple-gold text-black rounded-xl font-bold uppercase text-xs hover:bg-amber-400 transition"
        >
          Ir al Directorio
        </button>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8 pb-12 font-sans relative">
      {/* Toast */}
      {showSavedToast && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl"
        >
          <CheckCircle2 size={16} />
          <span>Ficha Sincronizada</span>
        </motion.div>
      )}

      {/* Header & Quick Switcher */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate?.('directory')}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-temple-gold border border-white/10 transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Directorio</span>
          </button>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-temple-gold">
              Expediente Holístico de 3 Pilares
            </span>
            <div className="flex items-center gap-2">
              <InlineEdit
                value={name}
                onSave={(val) => handleSaveField('name', val)}
                className="text-2xl md:text-4xl font-serif font-black uppercase text-white tracking-tight"
                placeholder="Nombre del Atleta"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-gray-400">
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

        {/* Quick Athlete Switcher */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 p-2 rounded-2xl">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-2">Cambiar Atleta:</span>
          <select
            value={selectedStudent.id}
            onChange={(e) => {
              const std = allStudents.find(s => s.id === e.target.value);
              if (std) setSelectedStudent(std);
            }}
            className="bg-[#121826] text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-temple-gold/50 cursor-pointer max-w-[200px] truncate"
          >
            {allStudents.map(s => (
              <option key={s.id} value={s.id} className="bg-[#121826] text-white">
                {s.name} ({s.escuadronId || 'Paz-Alfa'})
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Athlete Snapshot Bar (Fully Editable Dropdowns) */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-[#0E1424]/90 border border-white/10 rounded-2xl space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Escuadrón Asignado</p>
          <InlineEdit 
            value={escuadronId} 
            onSave={(val) => handleSaveField('escuadronId', val)} 
            className="text-base font-black text-temple-gold"
            placeholder="Ej. Gedeón-1" 
          />
        </div>

        <div className="p-4 bg-[#0E1424]/90 border border-white/10 rounded-2xl space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Fase del Programa</p>
          <select
            value={phase}
            onChange={(e) => handleSaveField('phase', e.target.value as any)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1 text-xs font-black text-white focus:outline-none focus:border-temple-gold cursor-pointer"
          >
            <option className="bg-[#121826]" value="1 - Iniciación">Fase 1 - Escuadrón de Paz</option>
            <option className="bg-[#121826]" value="2 - Desarrollo">Fase 2 - Gedeón (21 Días)</option>
            <option className="bg-[#121826]" value="3 - Perfeccionamiento">Fase 3 - Escuadrón de Cristo</option>
          </select>
        </div>

        <div className="p-4 bg-[#0E1424]/90 border border-white/10 rounded-2xl space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Plan de Membresía</p>
          <select
            value={plan}
            onChange={(e) => handleSaveField('plan', e.target.value as any)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1 text-xs font-black text-white focus:outline-none focus:border-temple-gold cursor-pointer"
          >
            <option className="bg-[#121826]" value="Reto 21 Días">Reto 21 Días = ÍNTEGROS</option>
            <option className="bg-[#121826]" value="Plan Integral Mensual">Plan Integral Mensual</option>
            <option className="bg-[#121826]" value="CristoFit Camp">CristoFit Camp</option>
            <option className="bg-[#121826]" value="Coaching 1 a 1">Coaching 1 a 1</option>
          </select>
        </div>

        <div className="p-4 bg-[#0E1424]/90 border border-white/10 rounded-2xl space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Estado de Membresía</p>
          <select
            value={status}
            onChange={(e) => handleSaveField('status', e.target.value as any)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1 text-xs font-black text-emerald-400 focus:outline-none focus:border-temple-gold cursor-pointer uppercase"
          >
            <option className="bg-[#121826] text-emerald-400" value="active">Activo</option>
            <option className="bg-[#121826] text-amber-400" value="expiring">Por Vencer</option>
            <option className="bg-[#121826] text-red-400" value="inactive">Inactivo</option>
          </select>
        </div>
      </motion.div>

      {/* Main 2-Column Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mente & Espíritu */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div variants={item}>
            <Card className="border-temple-gold/30 bg-[#0E1424]/90 backdrop-blur-xl h-full shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2.5 text-lg font-black uppercase tracking-wider text-white">
                  <BrainCircuit className="text-temple-gold" size={20} />
                  Pilar Mente & Espíritu (Coaching & Fe)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <FieldLabel
                    label="Propósito & Intención Espiritual"
                    tooltip="Objetivo devocional, oración 06:00 AM o mental del atleta."
                  />
                  <InlineEdit
                    value={purpose}
                    onSave={(val) => handleSaveField('purpose', val)}
                    multiline
                    className="font-serif text-sm md:text-base font-bold leading-relaxed text-temple-gold"
                    placeholder="Ej. Consistencia en devocionales y oración matutina..."
                  />
                </div>

                <div>
                  <FieldLabel
                    label="Rasgos y Fortalezas Observadas"
                    tooltip="Cualidades de carácter, disciplina o liderazgo observadas por el coach."
                  />
                  <InlineEdit 
                    value={traits} 
                    onSave={(val) => handleSaveField('traits', val)} 
                    multiline 
                    placeholder="Ej. Disciplinado, perseverante, buen líder de equipo..." 
                  />
                </div>

                <div>
                  <FieldLabel
                    label="Notas de Mentoría & Seguimiento"
                    tooltip="Bitácora de progreso, recomendaciones o puntos a reforzar."
                  />
                  <InlineEdit 
                    value={mentorshipNotes} 
                    onSave={(val) => handleSaveField('mentorshipNotes', val)} 
                    multiline 
                    placeholder="Ej. Excelente asistencia a CristoFit Camp. Seguir monitoreando..." 
                  />
                </div>

                <div className="pt-2 border-t border-white/10">
                  <FieldLabel label="Alimentación / Nutrición Preventiva (Alianza AbuelaFit)" />
                  <InlineEdit 
                    value={nutritionPlan} 
                    onSave={(val) => handleSaveField('nutritionPlan', val)} 
                    placeholder="Ej. ElectroHidra + Nutrición Anti-inflamatoria..." 
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: Cuerpo & Biometría */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div variants={item}>
            <Card className="border-white/10 bg-[#0E1424]/90 backdrop-blur-xl h-full shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2.5 text-lg font-black uppercase tracking-wider text-white">
                  <Activity className="text-red-400" size={20} />
                  Pilar Cuerpo & Ficha Biométrica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* IMC Score Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Índice Masa Corporal (IMC)</span>
                    <p className="text-3xl font-black text-white">{bmi}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${bmiStatus.bg} ${bmiStatus.color}`}>
                    {bmiStatus.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel label="Peso (Kg)" />
                    <InlineEdit 
                      value={String(weightKg)} 
                      onSave={(val) => handleSaveField('weightKg', Number(val) || 70)} 
                      placeholder="70" 
                    />
                  </div>
                  <div>
                    <FieldLabel label="Altura (cm)" />
                    <InlineEdit 
                      value={String(heightCm)} 
                      onSave={(val) => handleSaveField('heightCm', Number(val) || 170)} 
                      placeholder="170" 
                    />
                  </div>
                  <div>
                    <FieldLabel label="Grupo Sanguíneo" />
                    <InlineEdit 
                      value={bloodType} 
                      onSave={(val) => handleSaveField('bloodType', val)} 
                      placeholder="O+" 
                    />
                  </div>
                  <div>
                    <FieldLabel label="Alergias o Restricciones" />
                    <InlineEdit 
                      value={allergies} 
                      onSave={(val) => handleSaveField('allergies', val)} 
                      placeholder="Ninguna" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div>
                    <FieldLabel label="Forma de Pago Registrada" />
                    <InlineEdit 
                      value={paymentMethod} 
                      onSave={(val) => handleSaveField('paymentMethod', val)} 
                      placeholder="QR / Efectivo / Transferencia" 
                    />
                  </div>
                  <div>
                    <FieldLabel label="Frecuencia y Horario" />
                    <InlineEdit 
                      value={sessions} 
                      onSave={(val) => handleSaveField('sessions', val)} 
                      placeholder="Lunes a Viernes (06:00 AM)" 
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel label="Rutina de Entrenamiento Asignada" />
                  <InlineEdit 
                    value={routine} 
                    onSave={(val) => handleSaveField('routine', val)} 
                    placeholder="Ej. Calistenia + Crossfit + Combate Ético" 
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
