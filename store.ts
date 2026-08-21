import { CRMDatabase } from './types';
import { db as firestoreDb } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'templefit_holistic_students_v4';

const DEFAULT_DB: CRMDatabase = {
  students: [
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
      name: 'ElectroDetox Blast (Descanso & Autofagia)',
      category: 'bebidas',
      time: 10,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Infusión antiparasitaria y desintoxicante. Cero azúcares para estimular autofagia en días de reposo.',
      ingredientsText: [
        '1L infusión de clavo de olor y canela',
        '1/2 taza de jugo de pepino colado',
        '2 tallos de apio colados',
        'Zumo de 1 limón fresco',
        '1 cdta jengibre fresco rallado',
        '6 a 8 hojas de menta fresca'
      ],
      steps: [
        'Hervir clavo y canela en 1L de agua durante 5 minutos.',
        'Dejar enfriar y añadir pepino, apio, jengibre y limón.',
        'Machacar hojas de menta y servir en ayunas sin endulzar.'
      ],
      macros: { calories: 35, protein: 1, fat: 0, carbs: 7 },
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-4', quantity: 5 },
        { ingredientId: 'ing-5', quantity: 5 }
      ],
      suggestedPrice: 15
    },
    { 
      id: 'rec-3', 
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
      id: 'rec-4',
      name: 'Bowl del Guerrero de Elías (Pre-Entreno)',
      category: 'desayuno',
      time: 8,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Carga de energía de combustión lenta para sostener el esfuerzo en jaula de calistenia.',
      ingredientsText: [
        '60g avena integral en hojuelas',
        '80g plátano maduro en rodajas',
        '15g semillas de chía',
        '20g nueces o almendras troceadas',
        '10g miel pura de abeja',
        '1g canela en polvo'
      ],
      steps: [
        'Hidratar o cocinar la avena con agua tibia.',
        'Montar con rodajas de plátano, semillas de chía y nueces.',
        'Rociar miel pura y espolvorear canela.'
      ],
      macros: { calories: 430, protein: 12, fat: 16, carbs: 62 },
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-6', quantity: 60 },
        { ingredientId: 'ing-7', quantity: 15 },
        { ingredientId: 'ing-2', quantity: 10 }
      ],
      suggestedPrice: 22
    },
    {
      id: 'rec-5',
      name: 'Infusión Desintoxicante de Daniel',
      category: 'bebidas',
      time: 7,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Infusión anti-inflamatoria de tradición bíblica para depuración hepática.',
      ingredientsText: [
        '300ml agua pura',
        '5g jengibre fresco rallado',
        '2g cúrcuma en polvo',
        '15ml jugo de limón',
        '10g miel pura',
        '1 rama de canela entera'
      ],
      steps: [
        'Hervir el agua con jengibre y canela por 4 minutos.',
        'Apagar, agregar cúrcuma e infusionar 2 minutos.',
        'Colar, añadir zumo de limón y miel pura.'
      ],
      macros: { calories: 55, protein: 0, fat: 0, carbs: 14 },
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-4', quantity: 5 },
        { ingredientId: 'ing-3', quantity: 2 },
        { ingredientId: 'ing-5', quantity: 5 },
        { ingredientId: 'ing-2', quantity: 10 }
      ],
      suggestedPrice: 12
    },
    {
      id: 'rec-6',
      name: 'Pudín de Shake H-Control (Snack Bar)',
      category: 'snack',
      time: 10,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Pudín proteico bajo en calorías sin azúcares refinados formulado para el Reto 21 Días.',
      ingredientsText: [
        '30g Shake H-Control',
        '150ml leche de almendras',
        '15g semillas de chía',
        'Canela al gusto'
      ],
      steps: [
        'Batir el Shake H-Control con la leche de almendras y la chía.',
        'Refrigerar 20 minutos hasta gelificar.',
        'Espolvorear canela y servir frío.'
      ],
      macros: { calories: 180, protein: 22, fat: 4, carbs: 12 },
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-8', quantity: 1 },
        { ingredientId: 'ing-7', quantity: 15 },
        { ingredientId: 'ing-9', quantity: 150 }
      ],
      suggestedPrice: 25
    },
    {
      id: 'rec-7',
      name: 'Panqueques de Plátano con Shake H-Control',
      category: 'snack',
      time: 12,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Panqueque fit de plátano y Shake proteico para desayuno o post-entrenamiento.',
      ingredientsText: [
        '30g Shake H-Control',
        '1 plátano maduro',
        '1 huevo de pastoreo',
        '20g avena en hojuelas',
        'Canela al gusto'
      ],
      steps: [
        'Mezclar plátano triturado, huevo, avena y Shake.',
        'Cocinar en sartén antiadherente 2-3 minutos por lado.',
        'Servir tibio con canela.'
      ],
      macros: { calories: 290, protein: 25, fat: 7, carbs: 32 },
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-8', quantity: 1 },
        { ingredientId: 'ing-6', quantity: 20 }
      ],
      suggestedPrice: 28
    },
    {
      id: 'rec-8',
      name: 'Té de los Profetas (Inmunoestimulante)',
      category: 'bebidas',
      time: 8,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Bálsamo medicinal con clavo, canela, jengibre y menta para blindar el sistema inmune.',
      ingredientsText: [
        '350ml agua hervida',
        '10g jengibre fresco',
        '1 rama de canela',
        '3 clavos de olor',
        '1 cdta cúrcuma',
        '5 hojas de menta fresca',
        '1 cdta miel pura',
        'Zumo de 1/2 limón'
      ],
      steps: [
        'Hervir agua con jengibre, canela y clavos por 5 minutos.',
        'Agregar cúrcuma y menta, reposar 3 minutos tapado.',
        'Colar, añadir miel pura y limón.'
      ],
      macros: { calories: 45, protein: 0, fat: 0, carbs: 11 },
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-4', quantity: 10 },
        { ingredientId: 'ing-5', quantity: 5 },
        { ingredientId: 'ing-10', quantity: 3 },
        { ingredientId: 'ing-3', quantity: 2 },
        { ingredientId: 'ing-2', quantity: 10 }
      ],
      suggestedPrice: 12
    },
    {
      id: 'rec-9',
      name: 'Ensalada del Jardín del Edén (Detox Celular)',
      category: 'almuerzo',
      time: 12,
      difficulty: 'Fácil',
      servings: 1,
      description: 'Nutrición celular viva inspirada en la dieta bíblica original. Regeneración tisular y salud vascular.',
      ingredientsText: [
        '100g hojas de espinaca',
        '1/2 remolacha fresca rallada',
        '1 zanahoria rallada',
        '8 tomates cherry en mitades',
        '1/2 aguacate maduro en cubos',
        '25g nueces picadas',
        '2 cdas aceite de oliva extra virgen',
        '1 diente de ajo rallado',
        'Zumo de 1/2 limón y sal marina'
      ],
      steps: [
        'Disponer la espinaca como base del plato.',
        'Distribuir remolacha, zanahoria, tomates cherry y aguacate.',
        'Preparar aderezo con aceite de oliva, ajo, limón y sal marina.',
        'Verter aderezo y espolvorear nueces.'
      ],
      macros: { calories: 380, protein: 7, fat: 31, carbs: 22 },
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
      crmIngredients: [
        { ingredientId: 'ing-1', quantity: 1 }
      ],
      suggestedPrice: 25
    }
  ],
  mentorshipSessions: [],
  inventory: [
    { id: "inv-eq-1", name: "Jaula de Calistenia Profesional (Barras & Estructuras)", category: "equipamiento", cost: 3500, price: 5000, stock: 2, minStock: 1, size: "3x3m", color: "Negro Táctico" },
    { id: "inv-eq-2", name: "Barra Olímpica de Levantamiento (20 kg)", category: "equipamiento", cost: 800, price: 1200, stock: 4, minStock: 2, size: "2.2m", color: "Acero Cromado" },
    { id: "inv-eq-3", name: "Discos de Pesas Bumper Plates (Set 100 kg)", category: "equipamiento", cost: 1200, price: 1800, stock: 3, minStock: 1, size: "Set 100kg", color: "Negro / Colores" },
    { id: "inv-eq-4", name: "Kettlebells / Pesas Rusas (Set 12/16/24 kg)", category: "equipamiento", cost: 450, price: 700, stock: 6, minStock: 2, size: "Set 3u", color: "Fundición Negra" },
    { id: "inv-eq-5", name: "Anillas de Gimnasia Olímpica en Madera", category: "equipamiento", cost: 150, price: 250, stock: 8, minStock: 3, size: "28mm", color: "Madera Natural" },
    { id: "inv-eq-6", name: "Caja Pliométrica de Saltos (Box Jump 3 en 1)", category: "equipamiento", cost: 250, price: 400, stock: 4, minStock: 2, size: "50/60/75cm", color: "Madera Tratada" },
    { id: "inv-eq-7", name: "Bandas Elásticas de Resistencia Táctica", category: "equipamiento", cost: 60, price: 110, stock: 15, minStock: 5, size: "Set 4 resistencias", color: "Multicolor" },
    { id: "inv-eq-8", name: "Esterillas / Mats de Ejercicio y Suelo", category: "equipamiento", cost: 40, price: 80, stock: 20, minStock: 6, size: "180x60cm", color: "Azul Marino" },
    { id: "inv-eq-9", name: "Cuerdas de Escalada Funcional (6 metros)", category: "equipamiento", cost: 180, price: 300, stock: 3, minStock: 1, size: "6m / 38mm", color: "Cáñamo Táctico" },
    { id: "inv-eq-10", name: "Remadora de Resistencia por Aire", category: "equipamiento", cost: 3200, price: 4500, stock: 2, minStock: 1, size: "Pro", color: "Negro" },
    { id: "inv-eq-11", name: "Bicicleta de Aire / Air Bike de Alta Intensidad", category: "equipamiento", cost: 2800, price: 4000, stock: 2, minStock: 1, size: "Pro", color: "Negro Mate" },
    { id: "inv-eq-12", name: "Sacos de Boxeo Colgantes (Heavy Bag 1.2m)", category: "equipamiento", cost: 350, price: 550, stock: 4, minStock: 2, size: "1.2m / 40kg", color: "Negro / Oro" },
    { id: "inv-eq-13", name: "Manoplas y Focus Mitts de Boxeo Ético", category: "equipamiento", cost: 120, price: 200, stock: 8, minStock: 3, size: "Curvas", color: "Cuero Sintético" },
    { id: "inv-eq-14", name: "Protectores de Cabeza Acolchados de Sparring", category: "equipamiento", cost: 110, price: 180, stock: 8, minStock: 3, size: "Ajustable", color: "Negro" },
    { id: "inv-eq-15", name: "Pecheras y Protectores Corporales", category: "equipamiento", cost: 160, price: 260, stock: 4, minStock: 2, size: "L", color: "Negro" },
    { id: "inv-eq-16", name: "Protectores Bucales de Gel Termoformables", category: "equipamiento", cost: 15, price: 35, stock: 25, minStock: 10, size: "Adulto", color: "Transparente" },
    { id: "inv-eq-17", name: "Sogas de Saltar de Alta Velocidad (Speed Ropes)", category: "equipamiento", cost: 25, price: 50, stock: 20, minStock: 5, size: "3m Ajustable", color: "Acero Negro" },
    { id: "inv-eq-18", name: "Balones Medicinales Wall Balls (6 - 9 kg)", category: "equipamiento", cost: 140, price: 220, stock: 6, minStock: 2, size: "6-9kg", color: "Negro / Verde" },
    { id: "inv-eq-19", name: "Trineo de Empuje Prowler Sled para Crossfit", category: "equipamiento", cost: 800, price: 1300, stock: 1, minStock: 1, size: "Estructura Acero", color: "Negro" },
    { id: "inv-1", name: "Polera Oficial TempleFit (Algodón Vintage)", category: "apparel", cost: 50, price: 100, stock: 24, minStock: 8, size: "L", color: "Azul Marino / Oro" },
    { id: "inv-2", name: "Polera Blanca Escuadrón de Paz (Fase 1)", category: "apparel", cost: 50, price: 100, stock: 20, minStock: 6, size: "M/L", color: "Blanco / Oro" },
    { id: "inv-3", name: "Shorts Deportivos Tácticos Azul Marino (Fase 2)", category: "apparel", cost: 35, price: 70, stock: 18, minStock: 6, size: "M", color: "Azul Marino" },
    { id: "inv-4", name: "Shorts Deportivos Amarillos (Fase 3 Cristo)", category: "apparel", cost: 35, price: 70, stock: 12, minStock: 4, size: "M/L", color: "Amarillo Táctico" },
    { id: "inv-5", name: "Canguro / Hoodie Oficial TempleFit Térmico", category: "apparel", cost: 80, price: 150, stock: 12, minStock: 4, size: "L", color: "Negro / Oro" },
    { id: "inv-6", name: "Guantes de Entrenamiento TempleFit 14-16 oz", category: "apparel", cost: 65, price: 120, stock: 10, minStock: 4, size: "14oz", color: "Azul Marino" },
    { id: "inv-7", name: "Guantes Personalizados Escuadrón de Cristo", category: "apparel", cost: 80, price: 150, stock: 6, minStock: 2, size: "16oz", color: "Oro / Negro" },
    { id: "inv-8", name: "Ginkgo Biloba Neuro-Circulatorio (120 caps)", category: "suplementos", cost: 95, price: 150, stock: 15, minStock: 5, size: "120 caps" },
    { id: "inv-9", name: "Óleo de Coco Extra Virgen (200 ml)", category: "suplementos", cost: 45, price: 75, stock: 20, minStock: 5, size: "200 ml" },
    { id: "inv-10", name: "Colágeno Hidrolizado Articular (100 ml)", category: "suplementos", cost: 60, price: 95, stock: 14, minStock: 4, size: "100 ml" },
    { id: "inv-11", name: "Glutamina Pura Anticatabólica (300 gr)", category: "suplementos", cost: 95, price: 150, stock: 10, minStock: 3, size: "300 gr" },
    { id: "inv-12", name: "Tabletas Omega-3 Pescado Puro (20 u)", category: "suplementos", cost: 5, price: 10, stock: 50, minStock: 15, size: "20 caps" },
    { id: "inv-13", name: "Levadura de Cerveza Nutricional (500 gr)", category: "suplementos", cost: 50, price: 85, stock: 16, minStock: 5, size: "500 gr" },
    { id: "inv-14", name: "Cúrcuma Cupesí Pura en Polvo (250 gr)", category: "suplementos", cost: 18, price: 35, stock: 30, minStock: 10, size: "250 gr" },
    { id: "inv-15", name: "Complejo B12 Neuro-Protector", category: "suplementos", cost: 45, price: 80, stock: 12, minStock: 4, size: "cápsulas" },
    { id: "inv-16", name: "Reumasan Crema Articular y Muscular", category: "suplementos", cost: 8, price: 15, stock: 25, minStock: 8, size: "tubo" },
    { id: "inv-17", name: "Sal Marina Natural Pura (50 gr)", category: "suplementos", cost: 10, price: 20, stock: 40, minStock: 10, size: "50 gr" },
    { id: "inv-18", name: "Citrato de Magnesio Puro (100 gr)", category: "suplementos", cost: 25, price: 45, stock: 15, minStock: 5, size: "100 gr" },
    { id: "inv-19", name: "Cloruro de Potasio Electrolítico (100 gr)", category: "suplementos", cost: 12, price: 25, stock: 20, minStock: 5, size: "100 gr" },
    { id: "inv-20", name: "Semillas de Chía Chiquitana (500 gr)", category: "suplementos", cost: 14, price: 25, stock: 25, minStock: 8, size: "500 gr" },
    { id: "inv-21", name: "Miel Pura de Abeja de Monte (500 gr)", category: "suplementos", cost: 18, price: 30, stock: 30, minStock: 10, size: "500 gr" },
    { id: "inv-22", name: "Shake H-Control Bote Distribuidor (550 gr)", category: "suplementos", cost: 110, price: 180, stock: 12, minStock: 4, size: "550 gr" },
    { id: "inv-23", name: "Pudín Proteico Shake H-Control (Snack)", category: "snack", cost: 12, price: 25, stock: 20, minStock: 5, size: "porción" },
    { id: "inv-24", name: "Panqueques de Plátano con Shake (Snack)", category: "snack", cost: 14, price: 28, stock: 15, minStock: 5, size: "porción" },
    { id: "inv-25", name: "Botellas ElectroHidra Elite-Hydration (1L)", category: "snack", cost: 6, price: 15, stock: 30, minStock: 10, size: "1L" },
    { id: "inv-26", name: "Botellas ElectroDetox Blast (1L)", category: "snack", cost: 5, price: 15, stock: 25, minStock: 8, size: "1L" },
    { id: "inv-27", name: "Vaso Smoothie Cerebral de Salomón (400 ml)", category: "snack", cost: 9, price: 20, stock: 20, minStock: 5, size: "400ml" },
    { id: "inv-28", name: "Bowl del Guerrero de Elías (Plato)", category: "snack", cost: 10, price: 22, stock: 15, minStock: 5, size: "plato" },
    { id: "inv-29", name: "Ensalada del Jardín del Edén (Plato)", category: "snack", cost: 11, price: 25, stock: 12, minStock: 4, size: "plato" },
    { id: "inv-30", name: "Pan sin Levadura Artesanal (Abuela Fit)", category: "snack", cost: 9, price: 18, stock: 20, minStock: 5, size: "unidad" },
    { id: "inv-31", name: "Vianda Almuerzo Saludable Diario (Abuela Fit)", category: "snack", cost: 18, price: 35, stock: 15, minStock: 5, size: "vianda" }
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
      id: "show-1",
      type: "merch",
      title: "Polera Oficial TempleFit (Algodón Vintage)",
      description: "Algodón pesado de alta densidad con corte vintage y distintivo oficial de escuadrón.",
      price: 100,
      imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-2",
      type: "merch",
      title: "Polera Blanca Escuadrón de Paz (Fase 1)",
      description: "Uniforme reglamentario de iniciación. Pureza, paz y superación del estrés.",
      price: 100,
      imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-3",
      type: "merch",
      title: "Shorts Deportivos Tácticos Azul Marino",
      description: "Microfibra transpirable de alto rendimiento para calistenia y sparring de boxeo ético.",
      price: 70,
      imageUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-4",
      type: "merch",
      title: "Shorts Deportivos Amarillos (Fase 3 Cristo)",
      description: "Distintivo de honor de la Brigada de Cristo para atletas en su 12vo mes.",
      price: 70,
      imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-5",
      type: "merch",
      title: "Canguro / Hoodie Oficial TempleFit Térmico",
      description: "Tejido térmico resistente para el amanecer 06:00 AM en el CristoFit Camp.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-6",
      type: "merch",
      title: "Guantes de Entrenamiento TempleFit 14-16 oz",
      description: "Guantes de boxeo ético con acolchado de triple densidad para sparring seguro.",
      price: 120,
      imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-7",
      type: "merch",
      title: "Guantes Personalizados Escuadrón de Cristo",
      description: "Guantes de honor con emblema dorado y grabado de atleta inquebrantable.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-8",
      type: "recipe",
      title: "ElectroHidra \"Elite-Hydration\" (1L)",
      description: "Bebida isotónica natural (280-300 mOsm/kg) con buffer contra el lactato muscular y electrolitos.",
      price: 15,
      imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-9",
      type: "recipe",
      title: "ElectroDetox Blast (Descanso & Autofagia)",
      description: "Infusión desintoxicante y antiparasitaria con clavo, canela y apio. Cero azúcar.",
      price: 15,
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-10",
      type: "recipe",
      title: "Smoothie Cerebral de Salomón",
      description: "Aguacate, espinaca, arándanos, leche de almendras, chía y cúrcuma con piperina (+2000% absorción).",
      price: 20,
      imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-11",
      type: "recipe",
      title: "Bowl del Guerrero de Elías (Pre-Entreno)",
      description: "Avena integral, plátano, chía, nueces tostadas, miel pura de abeja y canela.",
      price: 22,
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-12",
      type: "recipe",
      title: "Infusión Desintoxicante de Daniel",
      description: "Jengibre fresco, cúrcuma, limón, canela y miel para desintoxicación hepática y salud articular.",
      price: 12,
      imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-13",
      type: "recipe",
      title: "Ensalada del Jardín del Edén (Detox Celular)",
      description: "Espinaca tierna, remolacha, zanahoria, tomate cherry, aguacate, nueces y ajo crudo al limón.",
      price: 25,
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-14",
      type: "recipe",
      title: "Pudín Proteico Shake H-Control (Snack Bar)",
      description: "Snack saciante de alta proteína sin azúcares refinados con chía y canela.",
      price: 25,
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-15",
      type: "recipe",
      title: "Panqueques de Plátano con Shake H-Control",
      description: "Panqueques calientes de plátano, avena y Shake proteico para desayuno post-entreno.",
      price: 28,
      imageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-16",
      type: "merch",
      title: "Ginkgo Biloba Neuro-Circulatorio (120 caps)",
      description: "Mejora la circulación cerebral, memoria y concentración para el pilar mental.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-17",
      type: "merch",
      title: "Óleo de Coco Extra Virgen (200 ml)",
      description: "Triglicéridos de cadena media (TCM): energía limpia inmediata para el cerebro y las células.",
      price: 75,
      imageUrl: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-18",
      type: "merch",
      title: "Colágeno Hidrolizado Articular (100 ml)",
      description: "Protección de articulaciones y tendones para absorción de impacto en barras de calistenia.",
      price: 95,
      imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-19",
      type: "merch",
      title: "Glutamina Pura Anticatabólica (300 gr)",
      description: "Reparación de la mucosa digestiva e inmunidad post-entrenamiento de alta exigencia metabólica.",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-20",
      type: "merch",
      title: "Catering Saludable Mensual (Alianza Abuela Fit)",
      description: "Plan de comidas limpias sin azúcares ni ultraprocesados, pan sin levadura y viandas saludables a domicilio.",
      price: 900,
      imageUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-21",
      type: "merch",
      title: "Membresía Reto 21 Días / Gym Funcional (Mes)",
      description: "Acceso integral a entrenamientos de calistenia, crossfit, boxeo ético y CristoFit Camp los sábados.",
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop",
      status: "active"
    },
    {
      id: "show-22",
      type: "merch",
      title: "Formación E.A.G.E. - Atleta Inquebrantable (3 Meses)",
      description: "Capacitación avanzada de liderazgo, neuro-espiritualidad y Manual de Guerra Espiritual completo.",
      price: 1200,
      imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=500&fit=crop",
      status: "active"
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
  }
};

function mergeListById<T extends { id: string }>(custom: T[] | undefined, defaults: T[]): T[] {
  if (!Array.isArray(custom) || custom.length === 0) return defaults;
  const map = new Map<string, T>();
  defaults.forEach(d => map.set(d.id, d));
  custom.forEach(c => {
    if (c && c.id) {
      map.set(c.id, { ...(map.get(c.id) || {}), ...c });
    }
  });
  return Array.from(map.values());
}

export function getCRMDatabase(): CRMDatabase {
  if (typeof window === 'undefined') return DEFAULT_DB;
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DB));
    return DEFAULT_DB;
  }
  
  try {
    const parsed = JSON.parse(saved);
    const merged: CRMDatabase = {
      ...DEFAULT_DB,
      ...parsed,
      recipes: mergeListById(parsed.recipes, DEFAULT_DB.recipes || []),
      inventory: mergeListById(parsed.inventory, DEFAULT_DB.inventory || []),
      ingredients: mergeListById(parsed.ingredients, DEFAULT_DB.ingredients || []),
      showcaseItems: mergeListById(parsed.showcaseItems, DEFAULT_DB.showcaseItems || []),
      sopsList: mergeListById(parsed.sopsList, DEFAULT_DB.sopsList || []),
      marketingTasks: mergeListById(parsed.marketingTasks, DEFAULT_DB.marketingTasks || []),
    };
    return merged;
  } catch (err) {
    console.error("Error al parsear CRMDatabase de localStorage:", err);
    return DEFAULT_DB;
  }
}

export function resetToDefaultDB(): CRMDatabase {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DB));
  }
  return DEFAULT_DB;
}

export function saveCRMDatabase(db: CRMDatabase) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.warn("Storage quota exceeded, keeping in memory:", err);
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
      const merged: CRMDatabase = {
        ...DEFAULT_DB,
        ...data,
        recipes: mergeListById(data.recipes, DEFAULT_DB.recipes || []),
        inventory: mergeListById(data.inventory, DEFAULT_DB.inventory || []),
        ingredients: mergeListById(data.ingredients, DEFAULT_DB.ingredients || []),
        showcaseItems: mergeListById(data.showcaseItems, DEFAULT_DB.showcaseItems || []),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch (e) {
        console.warn("Could not write merged cloud data to localStorage:", e);
      }
      return merged;
    }
  } catch (err) {
    console.warn("No se pudo obtener datos de la nube, usando local:", err);
  }

  return getCRMDatabase();
}
