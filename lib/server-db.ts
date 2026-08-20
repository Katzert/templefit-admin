import fs from 'fs';
import path from 'path';
import { CRMDatabase, Student, Lead, Transaction, InventoryItem, Recipe } from '../types';

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'crm-db.json');

const INITIAL_DB: CRMDatabase = {
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
      description: 'Bebida isotónica 280-300 mOsm/kg con buffer contra el lactato muscular y electrolitos esenciales.',
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
        'Disolver los minerales en el agua filtrada.',
        'Añadir la miel pura y mezclar vigorosamente.',
        'Incorporar el jugo de limón fresco al final y servir frío.'
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
      description: 'Potenciador cognitivo con cúrcuma activada por piperina (+2000% absorción) para salud cerebral.',
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
        'Licuar por 60 segundos hasta consistencia cremosa y homogénea.'
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
    }
  ],
  mentorshipSessions: [],
  inventory: [
    { id: 'inv-1', name: 'Polera Oficial TempleFit (Algodón Vintage)', category: 'apparel', cost: 50, price: 100, stock: 24, minStock: 8, size: 'L', color: 'Azul Marino / Oro' },
    { id: 'inv-2', name: 'Shorts Deportivos Tácticos', category: 'apparel', cost: 35, price: 70, stock: 18, minStock: 6, size: 'M', color: 'Azul Marino' },
    { id: 'inv-3', name: 'Canguro / Hoodie Oficial TempleFit', category: 'apparel', cost: 80, price: 150, stock: 12, minStock: 4, size: 'L', color: 'Negro / Oro' },
    { id: 'inv-4', name: 'Ginkgo Biloba Neuro-Circulatorio (120 caps)', category: 'suplementos', cost: 95, price: 150, stock: 15, minStock: 5, size: '120 caps' },
    { id: 'inv-5', name: 'Óleo de Coco Extra Virgen (200 ml)', category: 'suplementos', cost: 45, price: 75, stock: 20, minStock: 5, size: '200 ml' },
    { id: 'inv-6', name: 'Colágeno Hidrolizado Articular (100 ml)', category: 'suplementos', cost: 60, price: 95, stock: 14, minStock: 4, size: '100 ml' },
    { id: 'inv-7', name: 'Glutamina Pura Anticatabólica (300 gr)', category: 'suplementos', cost: 95, price: 150, stock: 10, minStock: 3, size: '300 gr' },
    { id: 'inv-8', name: 'Tabletas Omega-3 Pescado Puro (20 u)', category: 'suplementos', cost: 5, price: 10, stock: 50, minStock: 15, size: '20 caps' },
    { id: 'inv-9', name: 'Levadura de Cerveza Nutricional (500 gr)', category: 'suplementos', cost: 50, price: 85, stock: 16, minStock: 5, size: '500 gr' },
    { id: 'inv-10', name: 'Cúrcuma Cupesí Pura en Polvo (250 gr)', category: 'suplementos', cost: 18, price: 35, stock: 30, minStock: 10, size: '250 gr' },
    { id: 'inv-11', name: 'Complejo B12 Neuro-Protector', category: 'suplementos', cost: 45, price: 80, stock: 12, minStock: 4, size: 'cápsulas' },
    { id: 'inv-12', name: 'Reumasan Crema Articular y Muscular', category: 'suplementos', cost: 8, price: 15, stock: 25, minStock: 8, size: 'tubo' },
    { id: 'inv-13', name: 'Sal Marina Natural Pura (50 gr)', category: 'suplementos', cost: 10, price: 20, stock: 40, minStock: 10, size: '50 gr' },
    { id: 'inv-14', name: 'Pudín Proteico Shake H-Control (Snack)', category: 'snack', cost: 12, price: 25, stock: 20, minStock: 5, size: 'porción' },
    { id: 'inv-15', name: 'Panqueques de Plátano con Shake (Snack)', category: 'snack', cost: 14, price: 28, stock: 15, minStock: 5, size: 'porción' }
  ],
  leads: [
    { id: 'ld-1', name: 'Samuel Ortiz', phone: '+59178901234', source: 'instagram', status: 'appointment_set', notes: 'Agendado para clase de prueba sábado 06:00 AM en CristoFit Camp', dateAdded: '2026-08-10' },
    { id: 'ld-2', name: 'Valeria Justiniano', phone: '+59165432198', source: 'whatsapp', status: 'trial', notes: 'En semana de prueba gratuita (Escuadrón Paz). Muy interesada en nutrición.', dateAdded: '2026-08-12' },
    { id: 'ld-3', name: 'Carlos Medina', phone: '+59170098765', source: 'walk-in', status: 'contacted', notes: 'Consultó por Neuro-Entrenamiento en Ventas y horario nocturno', dateAdded: '2026-08-14' },
    { id: 'ld-4', name: 'Laura Torrez', phone: '+59171122334', source: 'referral', status: 'new', notes: 'Recomendada por Carlos Gutiérrez. Quiere unirse al Reto 21 Días.', dateAdded: '2026-08-16' }
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
    newMembersTarget: 20
  }
};

export function getServerDatabase(): CRMDatabase {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(DB_FILE_PATH)) {
      const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      return JSON.parse(content) as CRMDatabase;
    }
    // Initialize file with default database
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    return INITIAL_DB;
  } catch (error) {
    console.error('Error reading server CRM database:', error);
    return INITIAL_DB;
  }
}

export function saveServerDatabase(db: CRMDatabase): void {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving server CRM database:', error);
    throw error;
  }
}
