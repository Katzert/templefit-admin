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
      inventory: parsed.inventory || DEFAULT_DB.inventory
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
