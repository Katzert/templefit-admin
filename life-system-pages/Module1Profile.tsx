import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { InlineEdit } from '../components/ui/inline-edit';
import { FieldLabel } from '../components/ui/field-label';
import { useAuth } from '../context/AuthContext';

import { User, Quote, CalendarDays } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

export function Module1Profile() {
  const { selectedStudent, user } = useAuth();

  
  const [traits, setTraits] = useState("");
  const [admires, setAdmires] = useState("");
  const [purpose, setPurpose] = useState("");

  const profileKey = `templefit_profile_${selectedStudent?.email || 'default'}`;

  // Load profile when selected student changes
  useEffect(() => {
    if (!selectedStudent) return;
    const saved = localStorage.getItem(profileKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTraits(parsed.traits || "");
        setAdmires(parsed.admires || "");
        setPurpose(parsed.purpose || "");
      } catch (e) {
        setTraits("Disciplinado, Resiliente, Líder");
        setAdmires("David Goggins por su fuerza mental.");
        setPurpose("Construir una vida de impacto, guiando a otros a través del ejemplo de fortaleza física, mental y espiritual.");
      }
    } else {
      // Default fallback
      setTraits("Disciplinado, Resiliente, Líder");
      setAdmires("David Goggins por su fuerza mental.");
      setPurpose("Construir una vida de impacto, guiando a otros a través del ejemplo de fortaleza física, mental y espiritual.");
    }
  }, [selectedStudent, profileKey]);

  const handleSave = (field: 'traits' | 'admires' | 'purpose', newValue: string, oldValue: string) => {
    if (!selectedStudent) return;
    const current = { traits, admires, purpose, [field]: newValue };
    
    // Save to localStorage
    localStorage.setItem(profileKey, JSON.stringify(current));
    
    // Update local state
    if (field === 'traits') setTraits(newValue);
    if (field === 'admires') setAdmires(newValue);
    if (field === 'purpose') setPurpose(newValue);

    // Audit log if editor is instructor/admin
    if (user && (user.role === 'instructor' || user.role === 'admin')) {
      log({
        userEmail: user.email,
        userName: user.name,
        role: user.role,
        action: 'update',
        module: 'Perfil & Propósito',
        field: field === 'traits' ? 'Rasgos' : field === 'admires' ? 'Admiración' : 'Propósito Máximo',
        oldValue: oldValue || 'Vacío',
        newValue: newValue || 'Vacío',
        targetUser: selectedStudent.name
      });
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8 pb-12">
      <motion.div variants={item}>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          PERFIL Y <span className="text-temple-gold">PROPÓSITO</span>
        </h2>
        <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest border-l-2 border-temple-gold pl-3">
          El cimiento de tu expansión. Define quién eres y hacia dónde vas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <motion.div variants={item}>
            <Card className="border-t-4 border-t-temple-gold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="text-temple-gold" size={20} />
                  Identidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <FieldLabel
                    label="Mis Rasgos Principales"
                    tooltip="Escribe 3 a 5 cualidades que te definen como persona. Ejemplo: Disciplinado, Perseverante, Creativo."
                  />
                  <InlineEdit 
                    value={traits} 
                    onSave={(val) => handleSave('traits', val, traits)} 
                    multiline 
                    placeholder="Escribe tus rasgos principales aquí..." 
                  />
                </div>
                <div>
                  <FieldLabel
                    label="Persona que Admiro"
                    tooltip="¿Quién es tu modelo a seguir y por qué? Puede ser una figura pública, un familiar, o un mentor."
                  />
                  <InlineEdit 
                    value={admires} 
                    onSave={(val) => handleSave('admires', val, admires)} 
                    multiline 
                    placeholder="¿A quién admiras y por qué?" 
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-temple-navy/90 to-temple-navy-dark border-temple-gold/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Quote className="text-temple-gold" size={20} />
                  El Propósito
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FieldLabel
                  label="Tu Propósito Máximo"
                  tooltip="Define en una o dos oraciones el propósito central de tu vida. ¿Por qué te levantas cada mañana? ¿Qué legado quieres dejar?"
                />
                <InlineEdit
                  value={purpose}
                  onSave={(val) => handleSave('purpose', val, purpose)}
                  multiline
                  className="font-serif text-lg md:text-2xl font-bold leading-relaxed text-temple-gold-bright"
                  placeholder="Declara tu propósito máximo aquí..."
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CalendarDays className="text-temple-gold" size={20} />
                  Cronograma Anual
                </CardTitle>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Visualización de Fases (Gantt) — Planifica tus 4 trimestres del año.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 mt-4">
                  {[
                    { q: 'Q1 - FUNDACIONES', period: 'Ene - Mar', pct: '100%', label: 'Acondicionamiento y Hábitos Base', color: 'bg-temple-navy', border: 'border-temple-gold' },
                    { q: 'Q2 - INTENSIDAD', period: 'Abr - Jun', pct: '70%', label: 'Hipertrofia Mental y Física', color: 'bg-temple-red/20', border: 'border-temple-red' },
                    { q: 'Q3 - EXPANSIÓN', period: 'Jul - Sep', pct: '0%', label: 'Planificación Financiera & Retiros', color: 'bg-white/10', border: 'border-white' },
                    { q: 'Q4 - CONSOLIDACIÓN', period: 'Oct - Dic', pct: '0%', label: 'Cierre de Año & Reflexión', color: 'bg-white/5', border: 'border-white/30' },
                  ].map((quarter, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-black text-white tracking-wider">{quarter.q}</span>
                        <span className="text-temple-gold font-mono font-bold">{quarter.period}</span>
                      </div>
                      <div className="relative h-12 bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center px-4">
                        <div
                          className={`absolute left-0 top-0 bottom-0 ${quarter.color} border-r-2 ${quarter.border} transition-all duration-1000`}
                          style={{ width: quarter.pct }}
                        />
                        <div className="relative z-10 flex justify-between w-full text-xs font-bold">
                          <span className="text-gray-300">{quarter.label}</span>
                          <span className="text-temple-gold font-mono">{quarter.pct}</span>
                        </div>
                      </div>
                    </div>
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
