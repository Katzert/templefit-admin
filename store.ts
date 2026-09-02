'use client';

import { CRMDatabase } from './types';
import { db as firestoreDb } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'templefit_holistic_students_v3';

const DEFAULT_DB: CRMDatabase = {
  students: [
    {
      id: 'std-vip-antonio',
      name: 'Antonio Eid',
      phone: '+59178099887',
      email: 'antonio.eid@templefit.com',
      instructorAssigned: 'Paulo Alberto Gil Cuellar (Head Coach)',
      status: 'active',
      plan: 'Coaching 1 a 1',
      startDate: '2026-08-01',
      renewalDate: '2026-09-01',
      birthDate: '1992-05-18',
      
      // Pilar 1: CUERPO
      physicalGoal: 'Hipertrofia funcional, potencia en calistenia y composición corporal óptima',
      weightKg: 79.5,
      heightM: 1.78,
      workoutLevel: 'Avanzado',
      currentRoutineExercises: '1. Dominadas estrictas lastradas (4x8)\n2. Fondos en paralelas olímpicas (4x10)\n3. Sentadilla búlgara con tempo 3-0-1 (4x12)\n4. Flexiones diamante explosivas (4x15)\n5. Protocolo de respiración Buteyko y cardio funcional 06:00 AM',
      
      // Pilar 2: MENTE & NUTRICIÓN
      nutritionPlan: 'Protocolo Salomón + Proteína Limpia y Superávit Controlado',
      currentDiet: 'Alimentación irregular por trabajo, exceso de café sin desayuno y cenas altas en carbohidratos después de las 21:00.',
      prescribedDiet: '06:00 AM: Hidratación con ElectroHidra (1L).\n08:00 AM: Bowl de Elías con avena, chía y miel pura.\n13:00 PM: Proteína limpia + vegetales al vapor y grasas buenas.\n19:30 PM: Cena digestiva ligera (Catering Abuela Fit) + infusión relajante.',
      allergiesOrRestrictions: 'Sensibilidad a lácteos enteros y comida frita irritante',
      eatingDisordersOrIssues: 'Tendencia a picar por estrés nocturno y digestión lenta por comidas a destiempo.',
      neuroticAndStressFactors: 'Picos de cortisol laboral, tensión cervical por pantalla e insomnio ocasional.',
      
      // Pilar 3: ESPÍRITU
      spiritualIntention: 'Liderazgo con propósito, serenidad mental y disciplina innegociable en el Reto 21 Días',
      mentorshipNotes: 'Atleta con altísima capacidad de enfoque. La clave es el orden en sus horas de sueño y la hidratación matutina.',
      
      // Seguimiento
      attendanceHistory: [
        { date: '2026-08-20', attended: true, notes: 'Sesión CristoFit Camp - Cumplió 100%' },
        { date: '2026-08-21', attended: true, notes: 'Fuerza tren superior' },
        { date: '2026-08-22', attended: true, notes: 'Evaluación Reto 21 Días' },
        { date: '2026-08-24', attended: true, notes: 'Calistenia y movilidad' },
        { date: '2026-08-25', attended: true, notes: 'Respiración y fondos' }
      ],
      assessments: [
        { date: '2026-08-01', weightKg: 82.0, heightM: 1.78, imc: 25.9, notes: 'Evaluación inicial de ingreso' },
        { date: '2026-08-22', weightKg: 79.5, heightM: 1.78, imc: 25.1, notes: 'Bajó 2.5kg de grasa y mejoró resistencia' }
      ],
      
      escuadronId: 'Cristo-1',
      phase: '3 - Perfeccionamiento',
      isVipProfile: true,
      hubConsumption: { snackBar: true, merchandise: true, preventiveMedicine: true },
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
    },
    {
      id: 'std-1',
      name: 'Carlos Gutiérrez',
      phone: '+59170012345',
      email: 'carlos.g@templefit.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Reto 21 Días',
      startDate: '2026-08-01',
      renewalDate: '2026-08-22',
      physicalGoal: 'Perder 5kg de grasa y ganar potencia en calistenia',
      weightKg: 81.5,
      workoutLevel: 'Intermedio',
      nutritionPlan: 'ElectroHidra + Nutrición Anti-inflamatoria',
      allergiesOrRestrictions: 'Intolerante a la lactosa',
      spiritualIntention: 'Consistencia en la oración 06:00 AM y control del estrés',
      mentorshipNotes: 'Excelente disciplina en CristoFit Camp. Superó récord en barras paralelas.',
      escuadronId: 'Gedeón-1',
      phase: '2 - Desarrollo',
      hubConsumption: { snackBar: true, merchandise: true, preventiveMedicine: false }
    },
    {
      id: 'std-2',
      name: 'Mariana Flores',
      phone: '+59178945612',
      email: 'mariana.f@templefit.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Reto 21 Días',
      startDate: '2026-08-05',
      renewalDate: '2026-08-26',
      physicalGoal: 'Tonificación muscular, postura y flexibilidad',
      weightKg: 59.5,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Smoothie de Salomón + Plan Detox sin azúcar',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Renovación de mentalidad y lectura de NeuroBiblia',
      mentorshipNotes: 'Notable mejoría en niveles de energía matutina. Integrada a su escuadrón.',
      escuadronId: 'Paz-Alfa',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: false }
    },
    {
      id: 'std-3',
      name: 'José Luis Mamani',
      phone: '+59170123456',
      email: 'jluis.mamani@templefit.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Formación E.A.G.E. (Guerra Espiritual)',
      startDate: '2026-07-15',
      renewalDate: '2026-08-15',
      physicalGoal: 'Fuerza extrema, calistenia avanzada y combate ético',
      weightKg: 78.0,
      workoutLevel: 'Avanzado',
      nutritionPlan: 'Bowl de Elías + Suplementación con Glutamina',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Capitán de Escuadrón y formador de nuevos atletas',
      mentorshipNotes: 'Capitán del Escuadrón Cristo-1. Lidera las brigadas de servicio Palabra y Pan.',
      escuadronId: 'Cristo-1',
      phase: '3 - Perfeccionamiento',
      hubConsumption: { snackBar: true, merchandise: true, preventiveMedicine: true }
    },
    {
      id: 'std-4',
      name: 'Daniela Quispe',
      phone: '+59171234567',
      email: 'dani.quispe@templefit.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Reto 21 Días',
      startDate: '2026-08-01',
      renewalDate: '2026-08-22',
      physicalGoal: 'Resistencia cardiovascular y hábitos matutinos',
      weightKg: 57.0,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Infusión de Daniel + Hidratación 2.8L',
      allergiesOrRestrictions: 'Alergia al maní',
      spiritualIntention: 'Paz espiritual, vencer la ansiedad y devocional diario',
      mentorshipNotes: 'Asistió puntual al CristoFit Camp del sábado. Muy comprometida.',
      escuadronId: 'Paz-Alfa',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: false }
    },
    {
      id: 'std-5',
      name: 'Miguel Ángel Rojas',
      phone: '+59172345678',
      email: 'miguel.rojas@templefit.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Formación E.A.G.E. (Guerra Espiritual)',
      startDate: '2026-06-01',
      renewalDate: '2026-08-30',
      physicalGoal: 'Atleta de Alto Rendimiento y prevención de lesiones',
      weightKg: 75.0,
      workoutLevel: 'Avanzado',
      nutritionPlan: 'Nutrición Metabólica + Ginkgo Biloba + Omega-3',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Liderazgo ético en su empresa y mentoría en escuadrón',
      mentorshipNotes: 'Completó 210 horas académicas del ciclo 1. Excelente testimonio.',
      escuadronId: 'Cristo-1',
      phase: '3 - Perfeccionamiento',
      hubConsumption: { snackBar: true, merchandise: true, preventiveMedicine: true }
    },
    {
      id: 'std-6',
      name: 'Valeria Condori',
      phone: '+59173456789',
      email: 'vale.condori@templefit.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'expiring',
      plan: 'Reto 21 Días',
      startDate: '2026-07-20',
      renewalDate: '2026-08-10',
      physicalGoal: 'Reducir grasa corporal y mejorar digestión',
      weightKg: 62.0,
      workoutLevel: 'Principiante',
      nutritionPlan: 'ElectroDetox Blast + Pan sin levadura (Abuela Fit)',
      allergiesOrRestrictions: 'Intolerancia al gluten',
      spiritualIntention: 'Vencer el insomnio y alinear ritmo circadiano (22:00 a 06:00)',
      mentorshipNotes: 'Membresía por vencer en 3 días. Enviar mensaje de renovación cordial vía WhatsApp.',
      escuadronId: 'Gedeón-2',
      phase: '2 - Desarrollo',
      hubConsumption: { snackBar: false, merchandise: false, preventiveMedicine: false }
    },
    {
      id: 'std-7',
      name: 'Andrés Paredes',
      phone: '+59174567890',
      email: 'andres.paredes@templefit.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Neuro-Entrenamiento en Ventas (Completo)',
      startDate: '2026-07-25',
      renewalDate: '2026-08-25',
      physicalGoal: 'Acondicionamiento físico de atleta comercial',
      weightKg: 80.0,
      workoutLevel: 'Intermedio',
      nutritionPlan: 'Superávit limpio + Alimentos Neuro-cognitivos',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Integrar principios bíblicos en negociaciones y ventas',
      mentorshipNotes: 'Módulo 02 (Respiración Buteyko) completado con éxito.',
      escuadronId: 'Gedeón-2',
      phase: '2 - Desarrollo',
      hubConsumption: { snackBar: true, merchandise: true, preventiveMedicine: false }
    },
    {
      id: 'std-8',
      name: 'Camila Vargas',
      phone: '+59175678901',
      email: 'camila.vargas@templefit.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Reto 21 Días',
      startDate: '2026-08-01',
      renewalDate: '2026-08-22',
      physicalGoal: 'Bajar 6kg de grasa y ganar energía vital',
      weightKg: 68.0,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Catering Saludable Abuela Fit + Hidratación activa',
      allergiesOrRestrictions: 'Alergia a mariscos',
      spiritualIntention: 'Disciplina diaria de oración y enfoque',
      mentorshipNotes: 'Excelente progreso en los primeros 10 días de reto.',
      escuadronId: 'Paz-Beta',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: true }
    }
  ],
  transactions: [
    {
      id: 'tx-1',
      date: '2026-08-01',
      type: 'income',
      category: 'membership',
      amount: 200,
      description: 'Membresía Reto 21 Días - Carlos Gutiérrez'
    },
    {
      id: 'tx-2',
      date: '2026-08-01',
      type: 'income',
      category: 'membership',
      amount: 1200,
      description: 'Programa E.A.G.E. Guerra Espiritual - José Luis Mamani'
    },
    {
      id: 'tx-3',
      date: '2026-08-02',
      type: 'income',
      category: 'membership',
      amount: 200,
      description: 'Membresía Reto 21 Días - Daniela Quispe'
    },
    {
      id: 'tx-4',
      date: '2026-08-03',
      type: 'income',
      category: 'snack',
      amount: 350,
      description: 'Venta Bebidas ElectroHidra y Pudines H-Control (Sábado Camp)'
    },
    {
      id: 'tx-5',
      date: '2026-08-04',
      type: 'income',
      category: 'merchandise',
      amount: 470,
      description: 'Venta Indumentaria (2 Poleras + 1 Shorts + 1 Canguro)'
    },
    {
      id: 'tx-6',
      date: '2026-08-05',
      type: 'income',
      category: 'courses',
      amount: 1200,
      description: 'Neuro-Entrenamiento de Impacto en Ventas - Andrés Paredes'
    },
    {
      id: 'tx-7',
      date: '2026-08-06',
      type: 'expense',
      category: 'operations',
      amount: 650,
      description: 'Compra de insumos botánicos (jengibre, cúrcuma, miel, sal marina, chía)'
    },
    {
      id: 'tx-8',
      date: '2026-08-07',
      type: 'expense',
      category: 'rent',
      amount: 1500,
      description: 'Aporte de espacio físico / Centro de Entrenamiento'
    }
  ],
  dailyLogs: [],
  users: [
    {
      id: 'usr-admin',
      name: 'Paulo Alberto Gil Cuellar (Head Coach)',
      email: 'admin@templefit.com',
      password: 'admin',
      role: 'admin',
      avatar: 'PG'
    },
    {
      id: 'usr-instructor',
      name: 'Capitán de Escuadrón',
      email: 'instructor@templefit.com',
      password: 'coach',
      role: 'instructor',
      avatar: 'CE'
    }
  ],
  ingredients: [
    { id: 'ing-1', name: 'Sal Marina Natural Pura', unit: 'gr', costPerUnit: 0.04, stock: 2500, minStock: 500 },
    { id: 'ing-2', name: 'Miel Pura de Abeja', unit: 'gr', costPerUnit: 0.06, stock: 5000, minStock: 1000 },
    { id: 'ing-3', name: 'Cúrcuma en Polvo (Cupesí)', unit: 'gr', costPerUnit: 0.14, stock: 1500, minStock: 300 },
    { id: 'ing-4', name: 'Jengibre Fresco Rallado', unit: 'gr', costPerUnit: 0.03, stock: 3000, minStock: 500 },
    { id: 'ing-5', name: 'Canela en Rama', unit: 'gr', costPerUnit: 0.08, stock: 1000, minStock: 200 },
    { id: 'ing-6', name: 'Avena Integral en Hojuelas', unit: 'gr', costPerUnit: 0.02, stock: 10000, minStock: 2000 },
    { id: 'ing-7', name: 'Semillas de Chía', unit: 'gr', costPerUnit: 0.05, stock: 4000, minStock: 1000 },
    { id: 'ing-8', name: 'Shake H-Control (Porción)', unit: 'unidad', costPerUnit: 7.5, stock: 45, minStock: 15 },
    { id: 'ing-9', name: 'Leche de Almendras sin azúcar', unit: 'ml', costPerUnit: 0.02, stock: 6000, minStock: 1500 }
  ],
  recipes: [
    { 
      id: 'rec-1', 
      name: 'ElectroHidra "Elite-Hydration" (Isotónica)',
      category: 'bebidas',
      time: 5,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Bebida isotónica 280-300 mOsm/kg con buffer contra el lactato muscular.',
      ingredientsText: [
        '1L agua filtrada',
        '1.2g sal marina natural',
        '0.6g bicarbonato de sodio',
        '0.6g cloruro de potasio',
        '100mg citrato de magnesio',
        '60g miel pura de abeja',
        '30ml jugo de limón fresco'
      ],
      steps: [
        'Disolver los minerales en el agua.',
        'Añadir la miel pura y mezclar.',
        'Incorporar el jugo de limón y servir fresco.'
      ],
      macros: { calories: 190, protein: 0, fat: 0, carbs: 48 },
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-1', quantity: 1.2 },
        { ingredientId: 'ing-2', quantity: 60 }
      ], 
      suggestedPrice: 15 
    },
    { 
      id: 'rec-2', 
      name: 'Smoothie Cerebral de Salomón',
      category: 'bebidas',
      time: 5,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Potenciador cognitivo con cúrcuma activada por piperina (+2000% absorción).',
      ingredientsText: [
        '60g aguacate maduro',
        '50g espinaca fresca',
        '60g arándanos',
        '150ml leche de almendras',
        '15g semillas de chía',
        '2g cúrcuma Cupesí + pizca de pimienta negra'
      ],
      steps: [
        'Colocar todos los ingredientes en licuadora.',
        'Licuar por 60 segundos hasta consistencia cremosa.'
      ],
      macros: { calories: 260, protein: 6, fat: 18, carbs: 19 },
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-3', quantity: 2 },
        { ingredientId: 'ing-7', quantity: 15 },
        { ingredientId: 'ing-9', quantity: 150 }
      ], 
      suggestedPrice: 20 
    },
    { 
      id: 'rec-3', 
      name: 'Pudín de Shake H-Control (Snack Bar)',
      category: 'snack',
      time: 10,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Pudín proteico bajo en calorías sin azúcares refinados formulado para el Reto 21 Días.',
      ingredientsText: [
        '30g Shake H-Control',
        '150ml agua o leche vegetal',
        '10g chía',
        'Canela al gusto'
      ],
      steps: [
        'Batir el Shake H-Control con el líquido y la chía.',
        'Refrigerar 20 minutos hasta gelificar.',
        'Espolvorear canela y servir frío.'
      ],
      macros: { calories: 180, protein: 22, fat: 4, carbs: 12 },
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-8', quantity: 1 },
        { ingredientId: 'ing-7', quantity: 10 }
      ], 
      suggestedPrice: 25 
    }
  ],
  mentorshipSessions: [],
  inventory: [
    { id: 'inv-1', name: 'Polera Oficial TempleFit (Algodón Vintage)', category: 'apparel', cost: 50, price: 100, stock: 24, minStock: 8, size: 'L', color: 'Azul Marino / Oro' },
    { id: 'inv-2', name: 'Shorts Deportivos Tácticos', category: 'apparel', cost: 35, price: 70, stock: 18, minStock: 6, size: 'M', color: 'Azul Marino' },
    { id: 'inv-3', name: 'Canguro / Hoodie Oficial TempleFit', category: 'apparel', cost: 80, price: 150, stock: 12, minStock: 4, size: 'L', color: 'Negro / Oro' },
    { id: 'inv-4', name: 'Ginkgo Biloba Neuro-Circulatorio (120 caps)', category: 'suplementos', cost: 95, price: 150, stock: 15, minStock: 5, size: '120 caps' },
    { id: 'inv-5', name: 'Óleo de Coco Extra Virgen (200 ml)', category: 'suplementos', cost: 45, price: 75, stock: 20, minStock: 5, size: '200 ml' },
    { id: 'inv-6', name: 'Colágeno Hidrolizado Articular', category: 'suplementos', cost: 60, price: 95, stock: 14, minStock: 4, size: '100 ml' },
    { id: 'inv-7', name: 'Glutamina Pura Anticatabólica (300 gr)', category: 'suplementos', cost: 95, price: 150, stock: 10, minStock: 3, size: '300 gr' },
    { id: 'inv-8', name: 'Tabletas Omega-3 Pescado Puro', category: 'suplementos', cost: 5, price: 10, stock: 50, minStock: 15, size: '20 tabletas' },
    { id: 'inv-9', name: 'Cúrcuma Cupesí Pura en Polvo', category: 'suplementos', cost: 18, price: 35, stock: 30, minStock: 10, size: '250 gr' }
  ],
  leads: [
    { id: 'ld-1', name: 'Samuel Ortiz', phone: '+59178901234', source: 'instagram', status: 'appointment_set', notes: 'Agendado para clase de prueba sábado 06:00 AM en CristoFit Camp', dateAdded: '2026-08-10' },
    { id: 'ld-2', name: 'Valeria Justiniano', phone: '+59165432198', source: 'whatsapp', status: 'trial', notes: 'En semana de prueba gratuita (Escuadrón Paz). Muy interesada en nutrición.', dateAdded: '2026-08-12' },
    { id: 'ld-3', name: 'Carlos Medina', phone: '+59170098765', source: 'walk-in', status: 'contacted', notes: 'Consultó por Neuro-Entrenamiento en Ventas y horario nocturno', dateAdded: '2026-08-14' },
    { id: 'ld-4', name: 'Laura Torrez', phone: '+59171122334', source: 'referral', status: 'new', notes: 'Recomendada por Carlos Gutiérrez. Quiere unirse al Reto 21 Días.', dateAdded: '2026-08-16' }
  ],
  weeklyChecklist: {
    Lunes: [
      { id: 'lun-1', task: 'Revisión Cuadro de Mando Ejecutivo / Semáforo (08:00 AM)', done: false },
      { id: 'lun-2', task: 'Análisis de Regla del Semáforo (Ingresos, Vidas, Margen)', done: false },
      { id: 'lun-3', task: 'Lanzamiento de Embudo F1 (Nuevos Leads)', done: false },
    ],
    Martes: [
      { id: 'mar-1', task: 'Seguimiento de Asistencia a Escuadrones (Regla de los 12)', done: false },
      { id: 'mar-2', task: 'Activación de Embudo F2 Recovery (24h inactivos)', done: false },
      { id: 'mar-3', task: 'Inventario Snack Bar y Suplementos Botánicos', done: false },
    ],
    Miercoles: [
      { id: 'mie-1', task: 'Planificación Logística Sábado CristoFit Camp (06:00 AM)', done: false },
      { id: 'mie-2', task: 'Coordinación brigadas Palabra y Pan / Ciudad sin Basura', done: false },
      { id: 'mie-3', task: 'Revisión de Casos de Medicina Preventiva y Buteyko', done: false },
    ],
    Jueves: [
      { id: 'jue-1', task: 'Confirmación Asistencia al CristoFit Camp', done: false },
      { id: 'jue-2', task: 'Cierre de pedidos Snack Bar con 50% de seña (Regla No Stock)', done: false },
      { id: 'jue-3', task: 'Revisión de Barras de Calistenia y Equipamiento', done: false },
    ],
    Viernes: [
      { id: 'vie-1', task: 'Producción de Alimentos y Panadería Abuela Fit', done: false },
      { id: 'vie-2', task: 'Show Fit y Taller de Capacitación en Salud Preventiva (18:00)', done: false },
      { id: 'vie-3', task: 'Corte y Conciliación Financiera Semanal', done: false },
    ],
    Sabado: [
      { id: 'sab-1', task: 'Ejecución CristoFit Camp (06:00 AM a 09:30 AM)', done: false },
      { id: 'sab-2', task: 'Evaluación del Reto 21 Días y Servicio Comunitario (11:00 AM)', done: false },
      { id: 'sab-3', task: 'Degustación Snack Bar, Testimonios y Cierre de Nuevos Atletas', done: false },
    ]
  },
  marketingTasks: [
    { id: 'mkt-1', month: 'Agosto 2026', campaignName: 'Lanzamiento Reto 21 Días = ÍNTEGROS', driveLink: 'https://drive.google.com/...', strategy: 'Testimonios reales de atletas, rutina 06:00 AM y cobertura de CristoFit Camp' }
  ],
  sopsList: [
    { 
      id: 'sop-1', 
      title: 'SOP-01: Protocolo Sábado CristoFit Camp', 
      content: '06:00-09:30 Entrenamiento físico matutino al aire libre.\n10:00-11:00 Evaluación biométrica Reto 21 Días.\n11:00-13:00 Servicio solidario (Palabra y Pan / Ciudad sin Basura).\n17:30-18:00 Degustación Snack Bar y testimonios.\n18:00-21:00 Show Fit y cierre de inscripciones.' 
    },
    { 
      id: 'sop-2', 
      title: 'SOP-02: La Regla de los 12 Atletas y Escuadrones', 
      content: '1. Capacidad estricta de 12 atletas por escuadrón.\n2. Cada escuadrón cuenta con un Capitán asignado.\n3. Si un atleta falta 3 días seguidos, el escuadrón activa visita de respaldo.\n4. Progresión de fases: Paz (Bronce) -> Salvación/Gedeón (Plata) -> Cristo (Oro).' 
    },
    { 
      id: 'sop-3', 
      title: 'SOP-03: Regla de Decisión del Semáforo', 
      content: 'Lunes a las 08:00 AM se evalúan 3 números en el Dashboard:\n- VERDE: Replicar lo que funciona. No tocar lo que da fruto.\n- AMARILLO: Ajustar una sola variable a la vez y monitorear 7 días.\n- ROJO: Reunión de emergencia y acción correctiva inmediata.' 
    },
    { 
      id: 'sop-4', 
      title: 'SOP-04: Protocolo de Pedidos y Regla de No Stock', 
      content: '1. Prohibido acumular stock perecedero en exceso.\n2. Todo pedido de viandas, catering y snacks requiere 50% de seña antes del viernes.\n3. Producción concentrada los viernes.\n4. Entrega presencial los sábados en CristoFit Camp.' 
    },
    { 
      id: 'sop-5', 
      title: 'SOP-05: Protocolo Anti-MLM en Productos Nutricionales', 
      content: '1. Los productos nutricionales se comercializan exclusivamente por su valor nutricional de uso como consumidor.\n2. Prohibido cualquier lenguaje de redes, afiliaciones o negocios multinivel.\n3. Enfoque 100% en salud, energía y recuperación del atleta.' 
    },
    { 
      id: 'sop-6', 
      title: 'SOP-06: Los 9 Alimentos Prohibidos en Convalecencia', 
      content: 'Si un atleta cursa con enfermedad o inflamación aguda, se restringen 9 alimentos:\n1. Café\n2. Zumo de naranja procesado\n3. Dulces y azúcares refinados\n4. Sodas y gaseosas\n5. Patatas fritas\n6. Alcohol\n7. Leche de vaca\n8. Comidas fritas\n9. Platos picantes irritantes.' 
    }
  ],
  claimsTickets: [
    { id: 'tck-1', date: '2026-08-04', clientName: 'Valeria Condori', issue: 'Consulta sobre compatibilidad de colágeno hidrolizado con ayuno', status: 'pending', resolution: '' }
  ],
  showcaseItems: [
    {
      id: 'show-1',
      type: 'merch',
      title: 'Polera Oficial TempleFit (Algodón Vintage)',
      description: 'Algodón pesado de alta densidad con distintivo de escuadrón',
      price: 100,
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&h=500&fit=crop',
      status: 'active'
    },
    {
      id: 'show-2',
      type: 'recipe',
      title: 'ElectroHidra "Elite-Hydration"',
      description: 'Bebida isotónica con buffer contra lactato y electrolitos puros',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=500&fit=crop',
      status: 'active'
    }
  ],
  monthlyBoard: {
    month: 'Agosto 2026',
    verse: 'El espíritu da el diseño. El cuerpo es el templo. La mente crea y edifica vidas. (1 Corintios 6:19-20)',
    goals: [
      { area: 'Gimnasio & Reto 21 Días', targetBs: 8000 },
      { area: 'Snack Bar & Bebidas', targetBs: 3500 },
      { area: 'Formación E.A.G.E. & Cursos', targetBs: 6000 },
      { area: 'Armería & Suplementos', targetBs: 2500 }
    ],
    retentionTarget: 95,
    averageTicket: 250,
    newMembersTarget: 25
  },
  contentPosts: [
    {
      id: 'post-1',
      monthIndex: 1,
      dayOfWeek: 'Lunes',
      pillar: 'Storytelling & Testimonios',
      title: 'Historia de Transformación: De la Ansiedad a la Disciplina de Acero',
      hookAndStory: 'No es solo sudar en un gimnasio; es recuperar la paz mental a las 06:00 AM. Cuando ordenas tu templo, ordenas tu vida entera.',
      callToAction: 'Comenta "RETO21" y te enviamos el plan de inicio para este sábado.',
      driveDocLink: 'https://docs.google.com/document/d/templefit-storytelling-guion-1',
      status: 'scheduled',
      targetAudience: 'Nuevos Prospectos & Comunidad'
    },
    {
      id: 'post-2',
      monthIndex: 1,
      dayOfWeek: 'Miércoles',
      pillar: 'Hábitos 3 Áreas',
      title: 'El Trípode Inquebrantable: Espíritu, Mente y Cuerpo',
      hookAndStory: 'Si entrenas el cuerpo pero descuidas tus pensamientos y tu nutrición, vives en conflicto constante. Conoce el método de 3 pilares.',
      callToAction: 'Guarda esta guía práctica y aplícala mañana a primera hora.',
      driveDocLink: 'https://docs.google.com/document/d/templefit-habitos-tripode',
      status: 'scheduled',
      targetAudience: 'Atletas Activos'
    },
    {
      id: 'post-3',
      monthIndex: 1,
      dayOfWeek: 'Viernes',
      pillar: 'Consumo Consciente & Snack',
      title: 'Por qué eliminamos el azúcar refinado en el Snack Bar',
      hookAndStory: 'El combustible de un atleta debe desinflamar, no aletargar. Te mostramos cómo preparamos la ElectroHidra con minerales puros.',
      callToAction: 'Pide tu ElectroHidra este sábado en el CristoFit Camp.',
      driveDocLink: 'https://docs.google.com/document/d/templefit-recetario-snack',
      status: 'scheduled',
      targetAudience: 'Comunidad General'
    },
    {
      id: 'post-4',
      monthIndex: 1,
      dayOfWeek: 'Sábado',
      pillar: 'CristoFit Camp',
      title: 'Cobertura en Vivo: CristoFit Camp al Aire Libre',
      hookAndStory: 'Entrenamiento funcional, calistenia, hermandad y servicio comunitario "Palabra y Pan". Santa Cruz se levanta con propósito.',
      callToAction: 'Etiqueta a tu compañero de escuadrón que no faltó hoy.',
      driveDocLink: 'https://drive.google.com/drive/folders/templefit-camp-fotos',
      status: 'scheduled',
      targetAudience: 'Comunidad & Escuadrones'
    },
    {
      id: 'post-5',
      monthIndex: 1,
      dayOfWeek: 'Martes',
      pillar: 'Lives & Retos',
      title: 'Sesión Táctica VIP: Optimización de Hábitos para Alta Dirección',
      hookAndStory: 'Cómo los líderes y empresarios integran calistenia, ayuno consciente y respiración para rendir al 100% sin burnout.',
      callToAction: 'Exclusivo para miembros del programa de coaching 1 a 1.',
      driveDocLink: 'https://docs.google.com/document/d/templefit-vip-antonio-eid',
      status: 'draft',
      targetAudience: 'Antonio Eid / Atletas VIP'
    }
  ]
};

export function getCRMDatabase(): CRMDatabase {
  if (typeof window === 'undefined') return DEFAULT_DB;
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DB));
      } catch (e) {}
      return DEFAULT_DB;
    }
    return JSON.parse(saved);
  } catch (err) {
    console.error("Error al parsear CRMDatabase de localStorage:", err);
    return DEFAULT_DB;
  }
}

export function saveCRMDatabase(db: CRMDatabase) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.warn("No se pudo persistir en localStorage:", e);
  }

  // Sync back to cloud in background
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, 'workspaces', 'templefit-main');
      setDoc(docRef, db, { merge: true }).catch(err => {
        console.warn("Error sincronizando a Firebase:", err);
      });
    } catch (e) {
      console.warn("Firebase no disponible:", e);
    }
  }
}

export async function syncFromCloud(): Promise<CRMDatabase> {
  if (typeof window === 'undefined') return DEFAULT_DB;

  if (!firestoreDb) return getCRMDatabase();

  try {
    const docRef = doc(firestoreDb, 'workspaces', 'templefit-main');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as CRMDatabase;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {}
      return data;
    }
  } catch (err) {
    console.warn("No se pudo obtener datos de la nube, usando local:", err);
  }

  return getCRMDatabase();
}
