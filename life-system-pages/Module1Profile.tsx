'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { InlineEdit } from '../components/ui/inline-edit';
import { FieldLabel } from '../components/ui/field-label';
import { useAuth } from '../context/AuthContext';
import { User, Quote, Activity } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

export function Module1Profile() {
  const { selectedStudent } = useAuth();

  const [traits, setTraits] = useState("");
  const [admires, setAdmires] = useState("");
  const [purpose, setPurpose] = useState("");
  
  // Structured Medical Profile
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const [bloodType, setBloodType] = useState("O+");
  const [allergies, setAllergies] = useState("Ninguna");
  const [routine, setRoutine] = useState("Rutina no asignada");

  const profileKey = `templefit_profile_v3_${selectedStudent?.email || 'default'}`;

  // Load profile when selected student changes
  useEffect(() => {
    if (!selectedStudent) return;
    const saved = localStorage.getItem(profileKey);
    // Backward compatibility for old key
    const oldSaved = localStorage.getItem(`templefit_profile_v2_${selectedStudent?.email || 'default'}`);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTraits(parsed.traits || "Disciplinado, Resiliente, Líder");
        setAdmires(parsed.admires || "David Goggins por su fuerza mental.");
        setPurpose(parsed.purpose || "Construir una vida de impacto.");
        setHeightCm(parsed.heightCm || 170);
        setWeightKg(parsed.weightKg || 70);
        setBloodType(parsed.bloodType || "O+");
        setAllergies(parsed.allergies || "Ninguna");
        setRoutine(parsed.routine || "Rutina no asignada");
      } catch (e) {
        // Fallback
      }
    } else if (oldSaved) {
      try {
        const parsed = JSON.parse(oldSaved);
        setTraits(parsed.traits || "Disciplinado, Resiliente, Líder");
        setAdmires(parsed.admires || "David Goggins por su fuerza mental.");
        setPurpose(parsed.purpose || "Construir una vida de impacto.");
        setHeightCm(parsed.heightCm || 170);
        setWeightKg(parsed.weightKg || 70);
        setBloodType(parsed.bloodType || "O+");
        setAllergies(parsed.allergies || "Ninguna");
        setRoutine(parsed.routine || "Rutina no asignada");
      } catch (e) {}
    } else {
      setTraits("Disciplinado, Resiliente, Líder");
      setAdmires("David Goggins por su fuerza mental.");
      setPurpose("Construir una vida de impacto, guiando a otros a través del ejemplo de fortaleza física, mental y espiritual.");
      setHeightCm(170);
      setWeightKg(70);
      setBloodType("O+");
      setAllergies("Ninguna");
      setRoutine("Rutina no asignada");
    }
  }, [selectedStudent, profileKey]);

  const handleSave = (field: 'traits' | 'admires' | 'purpose' | 'heightCm' | 'weightKg' | 'bloodType' | 'allergies' | 'routine', newValue: any) => {
    if (!selectedStudent) return;
    const current = { traits, admires, purpose, heightCm, weightKg, bloodType, allergies, routine, [field]: newValue };
    
    localStorage.setItem(profileKey, JSON.stringify(current));
    
    if (field === 'traits') setTraits(newValue);
    if (field === 'admires') setAdmires(newValue);
    if (field === 'purpose') setPurpose(newValue);
    if (field === 'heightCm') setHeightCm(newValue);
    if (field === 'weightKg') setWeightKg(newValue);
    if (field === 'bloodType') setBloodType(newValue);
    if (field === 'allergies') setAllergies(newValue);
    if (field === 'routine') setRoutine(newValue);
  };

  const bmi = (weightKg / Math.pow(heightCm / 100, 2)).toFixed(1);
  const getBmiStatus = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: 'Bajo peso', color: 'text-blue-400' };
    if (bmiValue < 25) return { label: 'Saludable', color: 'text-emerald-400' };
    if (bmiValue < 30) return { label: 'Sobrepeso', color: 'text-orange-400' };
    return { label: 'Obesidad', color: 'text-red-400' };
  };
  const bmiStatus = getBmiStatus(Number(bmi));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8 pb-12">
      <motion.div variants={item}>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          FICHA <span className="text-temple-gold">MÉDICA</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest border-l-2 border-temple-gold pl-3">
          Datos Biométricos y Planificación Física del Alumno
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-6">
          <motion.div variants={item}>
            <Card className="border-t-4 border-t-temple-gold h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="text-temple-gold" size={20} />
                  Perfil del Alumno
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <FieldLabel
                    label="Rasgos Principales"
                    tooltip="Cualidades físicas o mentales observadas en el alumno."
                  />
                  <InlineEdit 
                    value={traits} 
                    onSave={(val) => handleSave('traits', val)} 
                    multiline 
                    placeholder="Ej. Disciplinado, perseverante..." 
                  />
                </div>
                <div>
                  <FieldLabel
                    label="Motivación / Referente"
                    tooltip="¿Qué o a quién admira este alumno? Útil para la motivación."
                  />
                  <InlineEdit 
                    value={admires} 
                    onSave={(val) => handleSave('admires', val)} 
                    multiline 
                    placeholder="Ej. David Goggins..." 
                  />
                </div>
                <div>
                  <FieldLabel
                    label="Objetivo Principal"
                    tooltip="¿Cuál es la meta final que busca conseguir?"
                  />
                  <InlineEdit
                    value={purpose}
                    onSave={(val) => handleSave('purpose', val)}
                    multiline
                    className="font-serif text-lg font-bold leading-relaxed text-temple-gold-bright"
                    placeholder="Ej. Bajar 10kg, aumentar masa muscular..."
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="lg:col-span-6">
          <motion.div variants={item} className="h-full">
            <Card className="border-t-4 border-t-temple-red/70 bg-gradient-to-br from-black to-temple-navy-dark/30 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="text-temple-red/70" size={20} />
                  Ficha Biométrica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center items-center gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Peso (kg)</span>
                    <input 
                      type="number" 
                      value={weightKg} 
                      onChange={e => handleSave('weightKg', Number(e.target.value))}
                      className="bg-transparent text-white text-2xl font-black text-center w-full focus:outline-none"
                    />
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center items-center gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Altura (cm)</span>
                    <input 
                      type="number" 
                      value={heightCm} 
                      onChange={e => handleSave('heightCm', Number(e.target.value))}
                      className="bg-transparent text-white text-2xl font-black text-center w-full focus:outline-none"
                    />
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-center items-center gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">IMC</span>
                    <span className="text-white text-2xl font-black text-center w-full">{bmi}</span>
                    <span className={`text-[9px] uppercase tracking-widest font-bold ${bmiStatus.color}`}>{bmiStatus.label}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel label="Tipo de Sangre" />
                    <select 
                      value={bloodType} 
                      onChange={e => handleSave('bloodType', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white font-bold p-3 rounded-xl focus:border-temple-red/50 outline-none"
                    >
                      <option value="O+">O Positivo (O+)</option>
                      <option value="O-">O Negativo (O-)</option>
                      <option value="A+">A Positivo (A+)</option>
                      <option value="A-">A Negativo (A-)</option>
                      <option value="B+">B Positivo (B+)</option>
                      <option value="B-">B Negativo (B-)</option>
                      <option value="AB+">AB Positivo (AB+)</option>
                      <option value="AB-">AB Negativo (AB-)</option>
                    </select>
                  </div>
                  <div>
                    <FieldLabel label="Alergias / Lesiones" />
                    <InlineEdit
                      value={allergies}
                      onSave={(val) => handleSave('allergies', val)}
                      placeholder="Ej. Lesión de rodilla, alergia al maní..."
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel label="Rutina de Fuerza" />
                  <InlineEdit
                    value={routine}
                    onSave={(val) => handleSave('routine', val)}
                    multiline
                    placeholder="Detalla aquí los ejercicios, enfoque y plan de alimentación..."
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
