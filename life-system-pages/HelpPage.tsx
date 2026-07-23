import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { HelpCircle, ChevronDown, CheckCircle2, Shield, Award, UserCheck, AlertTriangle, Sparkles, BookOpen, ArrowRight, Circle, CheckCircle } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

export function HelpPage() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const role = user?.role || 'alumno';

  const roleContent = {
    alumno: {
      badge: "Perfil Atleta",
      badgeColor: "from-temple-gold/20 to-temple-gold/5 text-temple-gold border-temple-gold/30",
      title: "Tu Ruta de Transformación",
      intro: "Bienvenido a tu cuartel general. Como Alumno, el sistema evalúa tu disciplina física, mental y espiritual. Aquí aprenderás a dominar tus herramientas diarias.",
      steps: [
        {
          title: "Bitácora Diaria",
          subtitle: "Mente, Cuerpo y Espíritu",
          desc: "Cada noche ingresa a 'Registro Diario'. Registra tus horas de sueño, tu hidratación y marca tus 'Bloques de Alto Rendimiento' (Mañana, Tarde y Noche). Asegúrate de realizar tu checklist mental y espiritual.",
          instruction: "⚠️ Vía Negativa (Checklist de Fallos): Sé radicalmente honesto. Escribe los hábitos negativos en los que caíste hoy (ej: comer azúcar, procrastinar). Reconocer tus errores es el primer paso al éxito.",
          icon: <BookOpen className="w-6 h-6 text-temple-gold" />,
          imageGradient: "from-blue-500/20 to-purple-500/20"
        },
        {
          title: "Tracker de Hábitos",
          subtitle: "Construyendo la Vía Positiva",
          desc: "En 'Tracker Hábitos' verás tu calendario mensual de 31 días. Marca el día como completado solo si lograste hacer tus hábitos positivos (Hacer Más) y evitaste tus hábitos negativos (Hacer Menos).",
          instruction: "🔥 Racha de Victorias: Mantén la consistencia para elevar tu racha y ver subir tu barra de progreso mensual. No rompas la cadena.",
          icon: <Award className="w-6 h-6 text-temple-gold" />,
          imageGradient: "from-green-500/20 to-emerald-500/20"
        },
        {
          title: "Ficha Técnica Deportiva",
          subtitle: "Tu Plan de Batalla",
          desc: "Accede a 'Ficha Técnica'. Aquí puedes ver tu plan de entrenamiento personalizado en Calistenia, Boxeo, CrossFit o Ejercicio Funcional Terapéutico, además de tus notas de salud y lesiones.",
          instruction: "🔒 Vista Protegida: No puedes modificar esta sección. Si requieres cambios de peso, altura o rutina, comunícate con tu Instructor en persona.",
          icon: <Shield className="w-6 h-6 text-temple-gold" />,
          imageGradient: "from-orange-500/20 to-red-500/20"
        },
        {
          title: "Auditoría de Rendimiento",
          subtitle: "El Radar de la Verdad",
          desc: "Al final de la semana, ve a 'Auditoría Mensual'. Aquí verás tu gráfico de radar que evalúa visualmente el balance entre tu Cuerpo, Mente y Espíritu, además de tus principales distractores.",
          instruction: "📊 Rueda del Rendimiento: Busca un gráfico balanceado. Los picos y valles te dirán de inmediato qué área de tu vida necesita atención urgente.",
          icon: <Sparkles className="w-6 h-6 text-temple-gold" />,
          imageGradient: "from-indigo-500/20 to-cyan-500/20"
        }
      ],
      faqs: [
        {
          question: "¿Cómo se calculan mis horas productivas diarias?",
          answer: "El día se divide en 3 bloques productivos (Mañana, Tarde, Noche). Cada bloque activado representa 6 horas de enfoque activo, sumando un objetivo ideal de 18 horas productivas diarias (dejando 6 horas para el descanso)."
        },
        {
          question: "¿Por qué no puedo editar mis ejercicios en la Ficha Técnica?",
          answer: "Por seguridad deportiva y metodológica, la prescripción de rutinas está a cargo exclusivo de instructores capacitados. Esto asegura que no cargues más peso o volumen del adecuado para tus lesiones o condición física."
        },
        {
          question: "¿Qué pasa si olvido registrar un día?",
          answer: "La consistencia es clave. Te recomendamos registrar tu bitácora al final del día. Si olvidas un día, tu racha se reiniciará a cero. ¡La disciplina no se toma vacaciones!"
        }
      ],
      checklist: [
        { id: 'c1', text: 'Completar perfil y propósito de vida en Configuración.' },
        { id: 'c2', text: 'Registrar tu primera Bitácora Diaria.' },
        { id: 'c3', text: 'Revisar la Ficha Técnica asignada por el coach.' },
        { id: 'c4', text: 'Visualizar el gráfico de radar en Auditoría.' }
      ]
    },
    instructor: {
      badge: "Perfil Coach",
      badgeColor: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30",
      title: "Manual de Gestión Metodológica",
      intro: "Tu rol es guiar, prescribir y evaluar la transformación. Tienes el control metodológico de las rutinas de CrossFit, Calistenia, Boxeo y Terapia Funcional de los atletas.",
      steps: [
        {
          title: "Selección del Alumno (CRÍTICO)",
          subtitle: "Enfocando el Objetivo",
          desc: "Antes de realizar cualquier acción o evaluación, debes seleccionar al alumno que vas a evaluar en el selector 'Alumno en Foco' que aparece en la barra lateral izquierda (Sidebar).",
          instruction: "💡 Consejo Pro: Toda la información que edites, leas o analices se limitará exclusivamente al expediente del alumno que tengas en foco.",
          icon: <UserCheck className="w-6 h-6 text-blue-400" />,
          imageGradient: "from-blue-500/20 to-indigo-500/20"
        },
        {
          title: "Prescripción de Rutinas",
          subtitle: "Diseñando el Entrenamiento",
          desc: "Entra a 'Ficha Técnica'. Como instructor, tienes campos editables. Puedes hacer clic en cualquiera de las cajas de texto de las disciplinas para prescribir rutinas.",
          instruction: "✍️ Edición en Vivo: Escribe el plan de entrenamiento, haz clic fuera del campo y los cambios se guardarán automáticamente en tiempo real.",
          icon: <BookOpen className="w-6 h-6 text-blue-400" />,
          imageGradient: "from-cyan-500/20 to-blue-500/20"
        },
        {
          title: "Libro Operativo Diario (LOD)",
          subtitle: "La Brújula del Equipo",
          desc: "Ingresa a 'Libro Operativo'. Esta es tu herramienta de gestión comercial y de entrenamientos. Registra el Fundamento del Día, el Objetivo Principal y detalla las actividades en cada franja horaria.",
          instruction: "💼 Foco Comercial: Asegúrate de alinear a tu equipo sobre qué producto destacar (ej. Reto de 21 Días, Suplementos) en cada hora pico.",
          icon: <Award className="w-6 h-6 text-blue-400" />,
          imageGradient: "from-purple-500/20 to-pink-500/20"
        },
        {
          title: "Registro de Seguridad",
          subtitle: "Auditoría de Modificaciones",
          desc: "Cada vez que actualices el peso de un alumno, edites una rutina o modifiques una métrica, el sistema registrará una entrada inmutable en 'Registro de Cambios'.",
          instruction: "🔒 Transparencia Total: Este registro no se puede borrar y sirve para mantener un historial clínico y técnico impecable.",
          icon: <Shield className="w-6 h-6 text-blue-400" />,
          imageGradient: "from-slate-500/20 to-gray-500/20"
        }
      ],
      faqs: [
        {
          question: "¿Cómo calculo el IMC del alumno?",
          answer: "Ve a 'Ficha Técnica' y edita el peso o la estatura del alumno. El sistema recalcula el IMC de forma automática al instante aplicando la fórmula internacional (Peso / Altura²)."
        },
        {
          question: "¿Cómo veo el progreso histórico de mi alumno?",
          answer: "Puedes navegar a la pestaña 'Auditoría Mensual' teniendo al alumno seleccionado en foco. Allí verás el estado actual de su radar de desempeño y distractores."
        },
        {
          question: "¿Qué debo escribir en el Foco Comercial del Libro Operativo?",
          answer: "Debes detallar qué producto o servicio promover durante esa hora (ej: 'Venta de Proteína Whey', 'Promoción de Franquicias', 'Inscripción al Reto 21 Días')."
        }
      ],
      checklist: [
        { id: 'i1', text: 'Seleccionar un alumno en el menú lateral.' },
        { id: 'i2', text: 'Actualizar peso y estatura de un alumno.' },
        { id: 'i3', text: 'Escribir la rutina deportiva de un atleta.' },
        { id: 'i4', text: 'Registrar la directiva en el Libro Operativo.' }
      ]
    },
    admin: {
      badge: "Perfil Dirección",
      badgeColor: "from-temple-red/20 to-temple-red/5 text-temple-red border-temple-red/30",
      title: "Control Estratégico",
      intro: "Eres el responsable del éxito operativo, comercial y de marca. Tienes acceso completo a la configuración de la franquicia, finanzas y auditoría del personal.",
      steps: [
        {
          title: "Gestión de Usuarios",
          subtitle: "Altas, Bajas y Roles",
          desc: "Ingresa a 'Configuración'. Aquí puedes ver la lista de todos los usuarios registrados en tu franquicia, su estado (activo/inactivo) y su último acceso.",
          instruction: "👑 Cambios de Rol: Haz clic en el botón de rol del usuario para ascenderlo o cambiar su rol cíclicamente (Alumno -> Instructor -> Admin).",
          icon: <UserCheck className="w-6 h-6 text-temple-red" />,
          imageGradient: "from-temple-red/20 to-orange-500/20"
        },
        {
          title: "Dashboard Financiero",
          subtitle: "Salud Económica",
          desc: "Accede a 'Dashboard Financiero'. Evalúa las gráficas de ingresos mensuales, la relación de gastos operativos e impuestos, y el porcentaje neto de rentabilidad.",
          instruction: "💵 Toma de Decisiones: Utiliza el gráfico de barras para controlar el flujo de caja y anticipar decisiones de inversión en la franquicia.",
          icon: <Award className="w-6 h-6 text-temple-red" />,
          imageGradient: "from-green-500/20 to-emerald-500/20"
        },
        {
          title: "Redes Sociales",
          subtitle: "Calendario Editorial",
          desc: "Ve a 'Redes Sociales'. Esta herramienta te permite organizar 12 meses de contenido publicitario. Planifica fecha, hora, copy detallado para redes y hashtags.",
          instruction: "📱 Estrategia Digital: Diseña copys enfocados a potenciar habilidades blandas, invitar a pruebas y promocionar franquicias.",
          icon: <Sparkles className="w-6 h-6 text-temple-red" />,
          imageGradient: "from-blue-500/20 to-cyan-500/20"
        },
        {
          title: "Auditoría de Operaciones",
          subtitle: "Control de Calidad",
          desc: "Monitorea el 'Registro de Cambios' global. Asegura que los entrenadores cumplan con las cargas técnicas y que no se modifiquen los históricos de forma inadecuada.",
          instruction: "🔍 Supervisión Activa: Revisa las firmas digitales y fechas de modificación para mantener el estándar premium de la marca.",
          icon: <Shield className="w-6 h-6 text-temple-red" />,
          imageGradient: "from-slate-500/20 to-black/20"
        }
      ],
      faqs: [
        {
          question: "¿Cómo suspendo temporalmente el acceso de un usuario?",
          answer: "En la pestaña 'Configuración', ubica al usuario en la tabla y haz clic sobre su botón de estado ('activo'). Cambiará a 'inactivo' y su acceso quedará bloqueado de inmediato."
        },
        {
          question: "¿Cómo edito los gastos mensuales en el Dashboard Financiero?",
          answer: "Las métricas financieras se consolidan del sistema de caja. Actualmente en esta versión se renderizan de forma analítica para visualización comercial del negocio."
        },
        {
          question: "¿Cómo audito el último ingreso de un instructor?",
          answer: "Ve a la pestaña 'Configuración' y revisa la columna 'Último Acceso'. Ahí verás el registro exacto de fecha y hora en el que cada usuario inició sesión."
        }
      ],
      checklist: [
        { id: 'a1', text: 'Revisar último acceso del personal en Configuración.' },
        { id: 'a2', text: 'Analizar la rentabilidad en el Dashboard Financiero.' },
        { id: 'a3', text: 'Revisar la planeación de Redes Sociales.' },
        { id: 'a4', text: 'Auditar el Registro de Cambios global.' }
      ]
    }
  };

  const content = roleContent[role as keyof typeof roleContent] || roleContent.alumno;

  // Interactive Checklist State
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveStep(0);
    setOpenFaq(null);
    const initialChecklist = roleContent[role as keyof typeof roleContent]?.checklist || [];
    const initialState: Record<string, boolean> = {};
    initialChecklist.forEach(item => {
      initialState[item.id] = false;
    });
    setChecklistState(initialState);
  }, [role]);

  const toggleCheck = (id: string) => {
    setChecklistState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedTasks = Object.values(checklistState).filter(Boolean).length;
  const totalTasks = Object.keys(checklistState).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-10 pb-16">
      
      {/* Hero Section */}
      <motion.div variants={item} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black to-zinc-900 border border-white/10 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${content.badgeColor.replace('text-', 'from-').replace('border-', 'to-')}`}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className={`inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r ${content.badgeColor} border text-xs font-bold uppercase tracking-widest mb-4 items-center gap-2 shadow-lg`}>
              <Sparkles size={14} className="animate-pulse" />
              {content.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black uppercase text-white tracking-tighter mb-4 leading-none">
              Centro de <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Entrenamiento</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              {content.intro}
            </p>
          </div>
          
          {/* Gamified Progress Ring */}
          <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-white/10" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" cy="50" r="40" 
                  className={`stroke-current transition-all duration-1000 ease-out ${progressPercent === 100 ? 'text-green-500' : 'text-temple-gold'}`}
                  strokeWidth="8" fill="none" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * progressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-white">{progressPercent}%</span>
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-3 font-bold">Onboarding</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Journey */}
        <div className="lg:col-span-8 space-y-8">
          
          <motion.div variants={item}>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-temple-gold w-6 h-6" />
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">
                {content.title}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Stepper Navigation */}
              <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
                {content.steps.map((s, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all shrink-0 md:shrink border ${
                        isActive 
                          ? 'bg-white/10 border-white/20 shadow-lg' 
                          : 'bg-black/20 border-transparent hover:bg-white/5'
                      }`}
                    >
                      {isActive && (
                        <motion.div layoutId="activeStep" className="absolute inset-0 border-2 border-temple-gold rounded-2xl pointer-events-none" />
                      )}
                      <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-temple-gold/20' : 'bg-white/5'}`}>
                        {s.icon}
                      </div>
                      <div className="hidden md:block z-10">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">Paso {idx + 1}</div>
                        <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>{s.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step Detail Card */}
              <div className="w-full md:w-2/3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="h-full border-white/10 bg-gradient-to-br from-black to-zinc-900/80 overflow-hidden relative group">
                      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${content.steps[activeStep].imageGradient} rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`}></div>
                      <CardContent className="p-8 relative z-10 flex flex-col h-full">
                        <div className="mb-6">
                          <h3 className="text-xs text-temple-gold uppercase tracking-widest font-bold mb-2">
                            {content.steps[activeStep].subtitle}
                          </h3>
                          <h2 className="text-3xl font-serif font-black text-white">
                            {content.steps[activeStep].title}
                          </h2>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
                          {content.steps[activeStep].desc}
                        </p>
                        
                        <div className="mt-auto bg-black/40 backdrop-blur-sm border border-white/10 p-5 rounded-2xl">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 text-temple-gold animate-pulse shrink-0">
                              <AlertTriangle size={18} />
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed font-medium">
                              {content.steps[activeStep].instruction}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* FAQs Section */}
          <motion.div variants={item} className="pt-6">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="text-temple-gold w-6 h-6" />
              <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">
                Preguntas Frecuentes
              </h2>
            </div>
            <div className="grid gap-3">
              {content.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white/5 border-white/20' : 'bg-black/20 border-white/5 hover:border-white/10'}`}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left p-5 text-sm font-bold text-white transition"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <div className={`p-1.5 rounded-full transition-colors ${isOpen ? 'bg-temple-gold/20 text-temple-gold' : 'bg-white/5 text-gray-400'}`}>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          <div className="px-5 pb-5 pt-1">
                            <p className="text-sm text-gray-400 leading-relaxed pl-4 border-l-2 border-temple-gold/50">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Gamified Checklist & Rules */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Checklist Card */}
          <motion.div variants={item}>
            <Card className="border-white/10 bg-gradient-to-b from-zinc-900 to-black overflow-hidden relative shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 text-green-400 rounded-xl">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">Onboarding</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Misiones Disponibles</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {content.checklist.map((item) => {
                    const isChecked = checklistState[item.id];
                    return (
                      <button 
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                          isChecked 
                            ? 'bg-green-500/10 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                            : 'bg-black/40 border-white/5 hover:border-white/10 hover:bg-white/5'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5 relative w-5 h-5">
                          <Circle size={18} className={`absolute transition-colors ${isChecked ? 'text-green-500 opacity-0' : 'text-gray-500 group-hover:text-gray-300'}`} />
                          <CheckCircle size={18} className={`absolute text-green-500 transition-all duration-300 ${isChecked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                        </div>
                        <span className={`text-xs font-medium leading-relaxed transition-all duration-300 ${isChecked ? 'text-green-400' : 'text-gray-300'}`}>
                          {item.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {progressPercent === 100 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-center"
                  >
                    <span className="text-2xl mb-2 block">🎉</span>
                    <p className="text-xs font-bold text-green-400 uppercase tracking-widest">¡Onboarding Completado!</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Rules Card */}
          <motion.div variants={item}>
            <Card className="border-white/10 bg-black overflow-hidden relative shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-temple-red to-orange-500"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-temple-red/20 text-temple-red rounded-xl">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">Seguridad</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Normas del Sistema</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs text-gray-400">
                  <li className="flex gap-3">
                    <ArrowRight size={14} className="text-temple-red shrink-0 mt-0.5" />
                    <p className="leading-relaxed"><strong className="text-white">Transparencia Radical:</strong> El registro no pretende juzgarte, sino darte claridad objetiva. Escribe la verdad.</p>
                  </li>
                  <li className="flex gap-3">
                    <ArrowRight size={14} className="text-temple-red shrink-0 mt-0.5" />
                    <p className="leading-relaxed"><strong className="text-white">Uso Personal:</strong> Tu cuenta tiene logs de auditoría asociados. Prestar tu cuenta compromete el sistema.</p>
                  </li>
                  <li className="flex gap-3">
                    <ArrowRight size={14} className="text-temple-red shrink-0 mt-0.5" />
                    <p className="leading-relaxed"><strong className="text-white">Soporte Técnico:</strong> Para dudas sobre rutinas, utiliza la caja de texto en tu ficha técnica.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
