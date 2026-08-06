import { CRMDatabase } from './types';
import { db as firestoreDb } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'templefit_holistic_students_v3';

const DEFAULT_DB: CRMDatabase = {
  students: [
    {
      id: '1',
      name: 'Carlos Gutiérrez',
      phone: '+59170012345',
      email: 'carlos.g@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Plan Integral Mensual',
      startDate: '2026-07-01',
      renewalDate: '2026-08-01',
      physicalGoal: 'Perder 5kg de grasa y mejorar resistencia física',
      weightKg: 82.5,
      workoutLevel: 'Intermedio',
      nutritionPlan: 'Nutrición Anti-inflamatoria + Proteína Limpia',
      allergiesOrRestrictions: 'Intolerante a la lactosa',
      spiritualIntention: 'Fortalecer el hábito de oración matutina y vencer el estrés',
      mentorshipNotes: 'Demuestra gran compromiso en CristoFit Camp. Trabajar constancia en fines de semana.',
      escuadronId: 'Alfa-1',
      phase: '2 - Desarrollo',
      hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: false }
    },
    {
      id: '2',
      name: 'Mariana Flores',
      phone: '+59178945612',
      email: 'mariana.f@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'expiring',
      plan: 'Reto 21 Días',
      startDate: '2026-07-05',
      renewalDate: '2026-07-26',
      physicalGoal: 'Tonificación muscular y postura',
      weightKg: 61.0,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Plan Detox + Recomposición Corporal',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Renovación de mentalidad y enfoque espiritual diario',
      mentorshipNotes: 'Avance notable en 2 semanas. Recordar renovación de plan antes del viernes.',
      escuadronId: 'Alfa-1',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: false, merchandise: false, preventiveMedicine: false }
    },
    {
      id: '3',
      name: 'José Luis Mamani',
      phone: '+59170123456',
      email: 'jluis.mamani@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Plan Integral Mensual',
      startDate: '2026-06-15',
      renewalDate: '2026-08-15',
      physicalGoal: 'Reducir grasa abdominal y ganar masa muscular',
      weightKg: 88.0,
      workoutLevel: 'Intermedio',
      nutritionPlan: 'Alta Proteína + Déficit Calórico Moderado',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Consistencia en devocional diario y orden en sus finanzas',
      mentorshipNotes: 'Excelente asistencia. Candidato a líder de escuadrón.',
      escuadronId: 'Alfa-1',
      phase: '2 - Desarrollo',
      hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: false }
    },
    {
      id: '4',
      name: 'Daniela Quispe',
      phone: '+59171234567',
      email: 'dani.quispe@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'CristoFit Camp',
      startDate: '2026-07-20',
      renewalDate: '2026-08-20',
      physicalGoal: 'Mejorar condición cardiovascular y disciplina',
      weightKg: 58.5,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Plan Equilibrado + Hidratación 2.1L diarios',
      allergiesOrRestrictions: 'Alergia al maní',
      spiritualIntention: 'Sanidad interior y constancia en la oración',
      mentorshipNotes: 'Se unió por invitación al CristoFit Camp. Muy motivada.',
      escuadronId: 'Alfa-1',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: false }
    },
    {
      id: '5',
      name: 'Miguel Ángel Rojas',
      phone: '+59172345678',
      email: 'miguel.rojas@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Coaching 1 a 1',
      startDate: '2026-05-01',
      renewalDate: '2026-08-01',
      physicalGoal: 'Rendimiento deportivo y prevención de lesiones',
      weightKg: 74.0,
      workoutLevel: 'Avanzado',
      nutritionPlan: 'Nutrición Deportiva + Suplementación guiada',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Liderazgo espiritual en su familia y en el gym',
      mentorshipNotes: 'Atleta referencia. Entrena para competencia regional.',
      escuadronId: 'Omega-2',
      phase: '3 - Perfeccionamiento',
      hubConsumption: { snackBar: true, merchandise: true, preventiveMedicine: true }
    },
    {
      id: '6',
      name: 'Valeria Condori',
      phone: '+59173456789',
      email: 'vale.condori@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'expiring',
      plan: 'Reto 21 Días',
      startDate: '2026-07-10',
      renewalDate: '2026-07-31',
      physicalGoal: 'Tonificar piernas y glúteos',
      weightKg: 63.2,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Plan Detox + Proteína Vegetal',
      allergiesOrRestrictions: 'Intolerancia al gluten',
      spiritualIntention: 'Paz mental y liberación de ansiedad',
      mentorshipNotes: 'Necesita seguimiento para renovar antes de que venza.',
      escuadronId: 'Omega-2',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: false, merchandise: false, preventiveMedicine: false }
    },
    {
      id: '7',
      name: 'Andrés Paredes',
      phone: '+59174567890',
      email: 'andres.paredes@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Plan Integral Mensual',
      startDate: '2026-04-01',
      renewalDate: '2026-08-25',
      physicalGoal: 'Hipertrofia general y fuerza',
      weightKg: 79.8,
      workoutLevel: 'Intermedio',
      nutritionPlan: 'Superávit Controlado + Comidas cada 3h',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Disciplina en lectura bíblica semanal',
      mentorshipNotes: 'Progreso constante en cargas. Buen compañero de equipo.',
      escuadronId: 'Omega-2',
      phase: '2 - Desarrollo',
      hubConsumption: { snackBar: true, merchandise: true, preventiveMedicine: false }
    },
    {
      id: '8',
      name: 'Camila Vargas',
      phone: '+59175678901',
      email: 'camila.vargas@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'CristoFit Camp',
      startDate: '2026-06-01',
      renewalDate: '2026-08-10',
      physicalGoal: 'Bajar 8kg y ganar energía',
      weightKg: 71.4,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Nutrición Anti-inflamatoria + Ayuno intermitente suave',
      allergiesOrRestrictions: 'Alergia a mariscos',
      spiritualIntention: 'Renovación espiritual completa y nuevos hábitos',
      mentorshipNotes: 'Gran cambio de actitud desde que entró al camp.',
      escuadronId: 'Delta-3',
      phase: '2 - Desarrollo',
      hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: true }
    },
    {
      id: '9',
      name: 'Rodrigo Choque',
      phone: '+59176789012',
      email: 'rodrigo.choque@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'active',
      plan: 'Coaching 1 a 1',
      startDate: '2026-03-15',
      renewalDate: '2026-08-18',
      physicalGoal: 'Mejorar movilidad y corregir postura',
      weightKg: 91.3,
      workoutLevel: 'Intermedio',
      nutritionPlan: 'Recomposición Corporal + Hidratación monitoreada',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Fortalecer su rol de mentor en el escuadrón',
      mentorshipNotes: 'Asistió a la ficha de medicina preventiva. Sigue plan de movilidad.',
      escuadronId: 'Delta-3',
      phase: '3 - Perfeccionamiento',
      hubConsumption: { snackBar: false, merchandise: true, preventiveMedicine: true }
    },
    {
      id: '10',
      name: 'Nicole Zambrana',
      phone: '+59177890123',
      email: 'nico.zambrana@gmail.com',
      instructorAssigned: 'Paulo (Head Coach)',
      status: 'expiring',
      plan: 'Reto 21 Días',
      startDate: '2026-07-15',
      renewalDate: '2026-08-05',
      physicalGoal: 'Definición y hábitos sostenibles',
      weightKg: 60.7,
      workoutLevel: 'Principiante',
      nutritionPlan: 'Plan Detox + Snacks saludables del Hub',
      allergiesOrRestrictions: 'Ninguna',
      spiritualIntention: 'Consistencia espiritual y emocional',
      mentorshipNotes: 'Renovación pendiente hoy. Aplicar embudo F2 de recuperación.',
      escuadronId: 'Delta-3',
      phase: '1 - Iniciación',
      hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: false }
    }
  ],
  transactions: [
    {
      id: 'tx-1',
      date: '2026-08-01',
      type: 'income',
      category: 'membership',
      amount: 50,
      description: 'Mensualidad Reto 21 Días - Juan'
    }
  ],
  dailyLogs: [],
  users: [
    {
      id: 'usr-admin',
      name: 'Administrador Maestro',
      email: 'admin@templefit.com',
      password: 'admin',
      role: 'admin',
      avatar: 'AM'
    },
    {
      id: 'usr-instructor',
      name: 'Instructor Coach',
      email: 'instructor@templefit.com',
      password: 'coach',
      role: 'instructor',
      avatar: 'IC'
    }
  ],
  ingredients: [
    { id: 'ing-1', name: 'Proteína Whey (Scoop)', unit: 'scoop', costPerUnit: 8, stock: 50, minStock: 20 },
    { id: 'ing-2', name: 'Leche de Almendras', unit: 'ml', costPerUnit: 0.02, stock: 5000, minStock: 1000 },
    { id: 'ing-3', name: 'Avena', unit: 'gr', costPerUnit: 0.05, stock: 2000, minStock: 500 },
  ],
  recipes: [
    { 
      id: 'rec-1', 
      name: 'Batido Post-Entreno (Ganancia Muscular)',
      category: 'snack',
      time: 5,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Proteína pura de rápida asimilación para reconstruir fibra muscular post-entrenamiento.',
      ingredientsText: [
        '2 scoops de proteína whey',
        '300ml de leche de almendras',
        '50g de avena'
      ],
      steps: [
        'Vierte la leche de almendras en la licuadora.',
        'Añade la proteína y la avena.',
        'Licúa por 30 segundos hasta que esté suave y homogéneo.'
      ],
      macros: { calories: 350, protein: 50, fat: 5, carbs: 35 },
      image: '',
      crmIngredients: [
        { ingredientId: 'ing-1', quantity: 2 },
        { ingredientId: 'ing-2', quantity: 300 },
        { ingredientId: 'ing-3', quantity: 50 }
      ], 
      suggestedPrice: 25 
    }
  ],
  mentorshipSessions: [],
  inventory: [
    { id: 'inv-1', name: 'Agua Vital 600ml', category: 'snack', cost: 3, price: 5, stock: 45, minStock: 24, size: 'N/A' },
    { id: 'inv-2', name: 'Polera TempleFit Oversize', category: 'apparel', cost: 80, price: 150, stock: 2, minStock: 5, size: 'M', color: 'Negro' },
  ],
  leads: [
    { id: 'ld-1', name: 'Roberto Sanchez', phone: '+59178901234', source: 'instagram', status: 'contacted', notes: 'Preguntó por el reto de 21 días', dateAdded: '2026-07-25' },
    { id: 'ld-2', name: 'Camila Reyes', phone: '+59165432198', source: 'whatsapp', status: 'new', notes: 'Vio el anuncio en facebook', dateAdded: '2026-07-26' }
  ],
  weeklyChecklist: {
    Lunes: [
      { id: 'lun-1', task: 'Revisión Cuadro de Mando Ejecutivo (08:00 AM)', done: false },
      { id: 'lun-2', task: 'Análisis de Regla 3-3-3 (Estancamiento)', done: false },
      { id: 'lun-3', task: 'Lanzamiento de Embudo F1 (Nuevos Leads)', done: false },
    ],
    Martes: [
      { id: 'mar-1', task: 'Seguimiento de Asistencia Escuadrones', done: false },
      { id: 'mar-2', task: 'Activación de Embudo F2 Recovery (24h inactivos)', done: false },
      { id: 'mar-3', task: 'Inventario Snack Bar y Suplementos', done: false },
    ],
    Miercoles: [
      { id: 'mie-1', task: 'Planificación Logística Sábado CristoFit', done: false },
      { id: 'mie-2', task: 'Auditoría de NPS (Promotores vs Detractores)', done: false },
      { id: 'mie-3', task: 'Revisión de Casos Médicos (Medicina Preventiva)', done: false },
    ],
    Jueves: [
      { id: 'jue-1', task: 'Confirmación Asistencia Sábado', done: false },
      { id: 'jue-2', task: 'Lanzamiento F3 (Upsell Gym a Snack Bar)', done: false },
      { id: 'jue-3', task: 'Revisión de Equipamiento de Entrenamiento', done: false },
    ],
    Viernes: [
      { id: 'vie-1', task: 'Preparación Catering Sábado (Snack Bar)', done: false },
      { id: 'vie-2', task: 'Envío de Rutinas de Fin de Semana', done: false },
      { id: 'vie-3', task: 'Revisión Contable Semanal', done: false },
    ],
    Sabado: [
      { id: 'sab-1', task: 'Ejecución CristoFit Camp', done: false },
      { id: 'sab-2', task: 'Captura de Hoja de Asistencia', done: false },
      { id: 'sab-3', task: 'Cierre de Ventas y Retención', done: false },
    ]
  },
  marketingTasks: [
    { id: 'mkt-1', month: 'Julio 2026', campaignName: 'Lanzamiento Reto 21 Días', driveLink: 'https://drive.google.com/...', strategy: 'Publicar 3 reels por semana sobre transformación holística' }
  ],
  sopsList: [
    { id: 'sop-1', title: '1. Protocolo de Ventas (WhatsApp)', content: '1. Saludar con energía\n2. Preguntar el objetivo físico\n3. Enviar brochure PDF\n4. Seguimiento a las 24h' },
    { id: 'sop-2', title: '2. Recepción de Alumnos Nuevos', content: '1. Presentación al instructor\n2. Tour del Gym\n3. Entrega de botella de agua' }
  ],
  claimsTickets: [
    { id: 'tck-1', date: '2026-07-28', clientName: 'Andrea D.', issue: 'Cobro duplicado de membresía', status: 'pending', resolution: '' }
  ],
  showcaseItems: [
    {
      id: 'show-1',
      type: 'merch',
      title: 'TempleFit Pro Shirt',
      description: 'Camiseta de alto rendimiento',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      status: 'active'
    },
    {
      id: 'show-2',
      type: 'recipe',
      title: 'Batido Proteico Post-Entreno',
      description: 'Receta alta en proteínas',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=500&h=500&fit=crop',
      status: 'active'
    }
  ],
  monthlyBoard: {
    month: 'Agosto 2026',
    verse: 'No sabéis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros... (1 Corintios 6:19)',
    goals: [
      { area: 'Snack', targetBs: 2000 },
      { area: 'Gimnasio', targetBs: 8000 },
      { area: 'Cursos', targetBs: 3000 },
      { area: 'Productos', targetBs: 1500 }
    ],
    retentionTarget: 90,
    averageTicket: 350,
    newMembersTarget: 10
  },
  recipes: [
    {
      id: "avocado-power-bowl",
      name: "Power Bowl de Aguacate y Huevos",
      category: "desayuno",
      time: 15,
      difficulty: "Fácil",
      servings: 1,
      description: "Arranca tu día con grasas saludables y proteína de alta biodisponibilidad.",
      ingredientsText: [
        "1 aguacate maduro",
        "2 huevos de pastoreo",
        "1 puñado de microgreens",
        "6 tomates cherry",
        "1 cdta de aceite de oliva extra virgen",
        "Sal rosada y pimienta al gusto"
      ],
      steps: [
        "Corta el aguacate por la mitad y retira la semilla.",
        "Calienta el aceite de oliva en sartén a fuego medio-alto.",
        "Fríe los huevos al gusto sin romper la yema.",
        "Monta el bowl: base de aguacate, huevos encima, rodea con tomates.",
        "Sazona con sal rosada y pimienta."
      ],
      macros: { calories: 420, protein: 18, fat: 34, carbs: 8 },
      crmIngredients: [],
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "pollo-grillado-tactical",
      name: "Pollo Grillado Táctico",
      category: "almuerzo",
      time: 25,
      difficulty: "Media",
      servings: 2,
      description: "Proteína magra con vegetales de hoja verde y grasas esenciales.",
      ingredientsText: [
        "2 pechugas de pollo deshuesadas",
        "2 tazas de mix de lechugas verdes",
        "1 aguacate en láminas",
        "1 limón",
        "2 cdas de aceite de oliva",
        "Sal y pimienta"
      ],
      steps: [
        "Sazona las pechugas con sal, pimienta y orégano.",
        "Grilla las pechugas 6-7 minutos por lado.",
        "Corta en láminas y sirve con ensalada verde y limón."
      ],
      macros: { calories: 480, protein: 42, fat: 28, carbs: 6 },
      crmIngredients: [],
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "salmon-omega-force",
      name: "Salmón Omega Force",
      category: "cena",
      time: 20,
      difficulty: "Media",
      servings: 2,
      description: "Omega-3 para recuperación muscular y función cerebral superior.",
      ingredientsText: [
        "2 filetes de salmón (180g c/u)",
        "2 tazas de brócoli en floretes",
        "2 cdas de mantequilla ghee",
        "1 limón"
      ],
      steps: [
        "Hornea el salmón a 200°C por 12-15 minutos.",
        "Cocina al vapor el brócoli por 5 minutos.",
        "Sirve con mantequilla ghee y limón."
      ],
      macros: { calories: 510, protein: 38, fat: 32, carbs: 10 },
      crmIngredients: [],
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "shake-warrior",
      name: "Shake del Guerrero",
      category: "snack",
      time: 5,
      difficulty: "Fácil",
      servings: 1,
      description: "Proteína + grasas saludables en menos de 5 minutos.",
      ingredientsText: [
        "1 scoop de proteína de suero (chocolate)",
        "1 cda de mantequilla de almendras",
        "200ml de leche de almendras sin azúcar",
        "Hielo al gusto"
      ],
      steps: [
        "Licúa todos los ingredientes a máxima potencia por 45 segundos.",
        "Sirve en vaso alto y disfruta."
      ],
      macros: { calories: 320, protein: 30, fat: 16, carbs: 6 },
      crmIngredients: [],
      image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop"
    }
  ]
};

export const getCRMDatabase = (): CRMDatabase => {
  if (typeof window === 'undefined') return DEFAULT_DB;
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DB));
    return DEFAULT_DB;
  }
  try {
    const parsed = JSON.parse(data) as CRMDatabase;
    // Backward compatibility merge
    return {
      ...DEFAULT_DB,
      ...parsed,
      students: parsed.students || DEFAULT_DB.students,
      marketingTasks: parsed.marketingTasks || DEFAULT_DB.marketingTasks,
      sopsList: parsed.sopsList || DEFAULT_DB.sopsList,
      claimsTickets: parsed.claimsTickets || DEFAULT_DB.claimsTickets,
      showcaseItems: parsed.showcaseItems || DEFAULT_DB.showcaseItems,
      inventory: parsed.inventory || DEFAULT_DB.inventory,
      monthlyBoard: parsed.monthlyBoard || DEFAULT_DB.monthlyBoard
    };
  } catch (e) {
    console.error('Error parsing CRM DB:', e);
    return DEFAULT_DB;
  }
};

export const saveCRMDatabase = (dbData: CRMDatabase) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dbData));
    
    // Sync with Firebase in the background
    try {
      const docRef = doc(firestoreDb, 'workspaces', 'templefit-main');
      setDoc(docRef, dbData, { merge: true }).catch(err => console.error("Firebase sync error:", err));
    } catch (e) {
      console.warn("Firebase not configured properly, skipping cloud sync.");
    }
  }
};

export const syncFromCloud = async (): Promise<CRMDatabase | null> => {
  try {
    const docRef = doc(firestoreDb, 'workspaces', 'templefit-main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const cloudData = docSnap.data() as CRMDatabase;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
      }
      return cloudData;
    }
  } catch (e) {
    console.warn("Failed to sync from cloud", e);
  }
  return null;
};
