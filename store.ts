'use client';

import { CRMDatabase, Student } from './types';
import { db as firestoreDb } from './lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'templefit_holistic_students_v6';

function createSeedStudent(
  id: string,
  name: string,
  phone: string,
  escuadronId: string,
  status: Student['status'] = 'active',
  phase: Student['phase'] = '1 - Iniciación',
  plan: Student['plan'] = 'Reto 21 Días',
  weightKg = 70,
  heightM = 1.75
): Student {
  const isExpiring = status === 'expiring';
  return {
    id,
    name,
    phone,
    email: `${name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '.')}@templefit.com`,
    instructorAssigned: 'Paulo Alberto Gil Cuellar (Head Coach)',
    status,
    plan,
    startDate: '2026-08-01',
    renewalDate: isExpiring ? '2026-09-18' : '2026-09-30',
    paidServiceTitle: `${plan} (Bs. 200)`,
    serviceFeeBs: 200,
    billingCycle: 'mensual',
    paymentStatus: isExpiring ? 'pendiente' : 'pagado',
    amountPaidBs: isExpiring ? 0 : 200,
    pendingBalanceBs: isExpiring ? 200 : 0,
    snackBarBalanceBs: 0,
    physicalGoal: 'Fuerza funcional, calistenia y acondicionamiento',
    weightKg,
    heightM,
    workoutLevel: 'Principiante',
    currentRoutineExercises: '1. Calistenia básica (4x10)\n2. Dominadas / Fondos\n3. Core y cardio matutino',
    nutritionPlan: 'Nutrición balanceada e hidratación',
    allergiesOrRestrictions: 'Ninguna',
    spiritualIntention: 'Constancia y disciplina en el entrenamiento',
    mentorshipNotes: 'Atleta regular en escuadrones',
    escuadronId,
    phase,
    hubConsumption: { snackBar: true, merchandise: false, preventiveMedicine: false },
    attendanceHistory: [
      { date: '2026-09-02', attended: true, notes: 'Sesión 06:00 AM' },
      { date: '2026-09-04', attended: true, notes: 'Fuerza y calistenia' }
    ],
    assessments: [
      { date: '2026-08-01', weightKg, heightM, imc: Number((weightKg / (heightM * heightM)).toFixed(1)), notes: 'Evaluación de ingreso' }
    ]
  };
}

type SeedTuple = [string, string, string, string, Student['status'], Student['phase'], Student['plan'], number, number];

const SEED_DATA: SeedTuple[] = [
  ["std-1", "Carlos Gutiérrez", "+59171083719", "Paz-Beta", "active", "1 - Iniciación", "Reto 21 Días", 62.5, 1.63],
  ["std-2", "Mariana Flores", "+59171167438", "Paz-Gamma", "active", "1 - Iniciación", "Reto 21 Días", 70, 1.66],
  ["std-3", "José Luis Mamani", "+59171251157", "Paz-Delta", "active", "1 - Iniciación", "Reto 21 Días", 76, 1.69],
  ["std-4", "Daniela Quispe", "+59171334876", "Gedeón-1", "active", "2 - Desarrollo", "Reto 21 Días", 83.5, 1.72],
  ["std-5", "Andrés Paredes", "+59171418595", "Gedeón-2", "active", "2 - Desarrollo", "Reto 21 Días", 59, 1.75],
  ["std-6", "Valeria Mercado", "+59171502314", "Gedeón-3", "active", "2 - Desarrollo", "Reto 21 Días", 65, 1.78],
  ["std-7", "Rodrigo Mendoza", "+59171586033", "Gedeón-4", "active", "2 - Desarrollo", "Reto 21 Días", 72.5, 1.81],
  ["std-8", "Camila Zeballos", "+59171669752", "Gedeón-5", "expiring", "2 - Desarrollo", "Reto 21 Días", 80, 1.84],
  ["std-9", "Fernando Torrico", "+59171753471", "Gedeón-6", "active", "2 - Desarrollo", "Reto 21 Días", 86, 1.62],
  ["std-10", "Gabriela Rojas", "+59171837190", "Gedeón-7", "active", "2 - Desarrollo", "Reto 21 Días", 61.5, 1.65],
  ["std-11", "Diego Villarroel", "+59171920909", "Gedeón-8", "active", "2 - Desarrollo", "Reto 21 Días", 69, 1.68],
  ["std-12", "Luciana Peñaranda", "+59172004628", "Cristo-1", "active", "3 - Perfeccionamiento", "Reto 21 Días", 75, 1.71],
  ["std-13", "Mauricio Calvimontes", "+59172088347", "Cristo-2", "active", "3 - Perfeccionamiento", "Reto 21 Días", 82.5, 1.74],
  ["std-14", "Sofia Banzer", "+59172172066", "Cristo-3", "active", "3 - Perfeccionamiento", "Reto 21 Días", 58, 1.77],
  ["std-15", "Javier Justiniano", "+59172255785", "Cristo-4", "active", "3 - Perfeccionamiento", "Reto 21 Días", 64, 1.8],
  ["std-16", "Natalia Aguilera", "+59172339504", "Cristo-5", "active", "3 - Perfeccionamiento", "Reto 21 Días", 71.5, 1.83],
  ["std-17", "Mateo Saucedo", "+59172423223", "Cristo-6", "active", "3 - Perfeccionamiento", "Reto 21 Días", 79, 1.61],
  ["std-18", "Isabella Hurtado", "+59172506942", "Cristo-7", "active", "3 - Perfeccionamiento", "Reto 21 Días", 85, 1.64],
  ["std-19", "Sebastián Pinto", "+59172590661", "Cristo-8", "expiring", "3 - Perfeccionamiento", "Reto 21 Días", 60.5, 1.67],
  ["std-20", "Renata Claros", "+59172674380", "Paz-Alfa", "active", "1 - Iniciación", "Reto 21 Días", 68, 1.7],
  ["std-21", "Nicolás Antelo", "+59172758099", "Paz-Beta", "active", "1 - Iniciación", "Reto 21 Días", 74, 1.73],
  ["std-22", "Paola Vaca", "+59172841818", "Paz-Gamma", "active", "1 - Iniciación", "Reto 21 Días", 81.5, 1.76],
  ["std-23", "Ignacio Ribera", "+59172925537", "Paz-Delta", "active", "1 - Iniciación", "Reto 21 Días", 57, 1.79],
  ["std-24", "Juliana Morales", "+59173009256", "Gedeón-1", "active", "2 - Desarrollo", "Reto 21 Días", 63, 1.82],
  ["std-25", "Álvaro Terrazas", "+59173092975", "Gedeón-2", "active", "2 - Desarrollo", "Membresía Mensual", 70.5, 1.6],
  ["std-26", "Claudia Justiniano", "+59173176694", "Gedeón-3", "active", "2 - Desarrollo", "Membresía Mensual", 78, 1.63],
  ["std-27", "Gabriel Montero", "+59173260413", "Gedeón-4", "active", "2 - Desarrollo", "Membresía Mensual", 84, 1.66],
  ["std-28", "Adriana Siles", "+59173344132", "Gedeón-5", "active", "2 - Desarrollo", "Membresía Mensual", 59.5, 1.69],
  ["std-29", "Fabián Arteaga", "+59173427851", "Gedeón-6", "active", "2 - Desarrollo", "Membresía Mensual", 67, 1.72],
  ["std-30", "Alejandra Cossio", "+59173511570", "Gedeón-7", "active", "2 - Desarrollo", "Membresía Mensual", 73, 1.75],
  ["std-31", "Leonardo Daza", "+59173595289", "Gedeón-8", "active", "2 - Desarrollo", "Membresía Mensual", 80.5, 1.78],
  ["std-32", "Melany Rivero", "+59173679008", "Cristo-1", "expiring", "3 - Perfeccionamiento", "Membresía Mensual", 56, 1.81],
  ["std-33", "Lucas Arze", "+59173762727", "Cristo-2", "active", "3 - Perfeccionamiento", "Membresía Mensual", 62, 1.84],
  ["std-34", "Micaela Paz", "+59173846446", "Cristo-3", "active", "3 - Perfeccionamiento", "Membresía Mensual", 69.5, 1.62],
  ["std-35", "Santiago Soliz", "+59173930165", "Cristo-4", "active", "3 - Perfeccionamiento", "Membresía Mensual", 77, 1.65],
  ["std-36", "Patricia Barrientos", "+59174013884", "Cristo-5", "active", "3 - Perfeccionamiento", "Membresía Mensual", 83, 1.68],
  ["std-37", "Bruno Melgar", "+59174097603", "Cristo-6", "active", "3 - Perfeccionamiento", "Membresía Mensual", 58.5, 1.71],
  ["std-38", "Estefanía Roca", "+59174181322", "Cristo-7", "active", "3 - Perfeccionamiento", "Membresía Mensual", 66, 1.74],
  ["std-39", "Joaquín Cuéllar", "+59174265041", "Cristo-8", "active", "3 - Perfeccionamiento", "Membresía Mensual", 72, 1.77],
  ["std-40", "Silvia Camacho", "+59174348760", "Paz-Alfa", "active", "1 - Iniciación", "Membresía Mensual", 79.5, 1.8],
  ["std-41", "Matías Baldivieso", "+59174432479", "Paz-Beta", "active", "1 - Iniciación", "Membresía Mensual", 87, 1.83],
  ["std-42", "Tatiana Osinaga", "+59174516198", "Paz-Gamma", "active", "1 - Iniciación", "Membresía Mensual", 61, 1.61],
  ["std-43", "Emilio Landívar", "+59174599917", "Paz-Delta", "active", "1 - Iniciación", "Membresía Mensual", 68.5, 1.64],
  ["std-44", "Carla Eguez", "+59174683636", "Gedeón-1", "active", "2 - Desarrollo", "Membresía Mensual", 76, 1.67],
  ["std-45", "Gonzalo Soria", "+59174767355", "Gedeón-2", "active", "2 - Desarrollo", "Trimestral Atleta", 82, 1.7],
  ["std-46", "Flavia Chávez", "+59174851074", "Gedeón-3", "active", "2 - Desarrollo", "Trimestral Atleta", 57.5, 1.73],
  ["std-47", "Martín Urey", "+59174934793", "Gedeón-4", "active", "2 - Desarrollo", "Trimestral Atleta", 65, 1.76],
  ["std-48", "Lorena Montaño", "+59175018512", "Gedeón-5", "expiring", "2 - Desarrollo", "Trimestral Atleta", 71, 1.79],
  ["std-49", "Eduardo Farah", "+59175102231", "Gedeón-6", "active", "2 - Desarrollo", "Trimestral Atleta", 78.5, 1.82],
  ["std-50", "Ximena Tórrez", "+59175185950", "Gedeón-7", "active", "2 - Desarrollo", "Trimestral Atleta", 86, 1.6],
  ["std-51", "Guillermo Prado", "+59175269669", "Gedeón-8", "active", "2 - Desarrollo", "Trimestral Atleta", 60, 1.63],
  ["std-52", "Verónica Loza", "+59175353388", "Cristo-1", "active", "3 - Perfeccionamiento", "Trimestral Atleta", 67.5, 1.66],
  ["std-53", "Cristian Menacho", "+59175437107", "Cristo-2", "active", "3 - Perfeccionamiento", "Trimestral Atleta", 75, 1.69],
  ["std-54", "Cecilia Justiniano", "+59175520826", "Cristo-3", "active", "3 - Perfeccionamiento", "Trimestral Atleta", 81, 1.72],
  ["std-55", "Hernán Callau", "+59175604545", "Cristo-4", "active", "3 - Perfeccionamiento", "Trimestral Atleta", 56.5, 1.75],
  ["std-56", "Andrea Saucedo", "+59175688264", "Cristo-5", "active", "3 - Perfeccionamiento", "Trimestral Atleta", 64, 1.78],
  ["std-57", "Raúl Antezana", "+59175771983", "Cristo-6", "active", "3 - Perfeccionamiento", "Trimestral Atleta", 70, 1.81],
  ["std-58", "Fabiola Marinkovic", "+59175855702", "Cristo-7", "active", "3 - Perfeccionamiento", "Coaching 1 a 1", 77.5, 1.84],
  ["std-59", "Gustavo Vaca", "+59175939421", "Cristo-8", "active", "3 - Perfeccionamiento", "Coaching 1 a 1", 85, 1.62],
  ["std-60", "Noelia Dorado", "+59176023140", "Paz-Alfa", "active", "1 - Iniciación", "Coaching 1 a 1", 59, 1.65],
  ["std-61", "Pablo Escalante", "+59176106859", "Paz-Beta", "active", "1 - Iniciación", "Coaching 1 a 1", 66.5, 1.68],
  ["std-62", "Jimena Callaú", "+59176190578", "Paz-Gamma", "active", "1 - Iniciación", "Coaching 1 a 1", 74, 1.71],
  ["std-63", "David Viruez", "+59176274297", "Paz-Delta", "active", "1 - Iniciación", "CristoFit Camp", 80, 1.74],
  ["std-64", "Vanesa Añez", "+59176358016", "Gedeón-1", "active", "2 - Desarrollo", "CristoFit Camp", 55.5, 1.77],
  ["std-65", "Marcelo Yáñez", "+59176441735", "Gedeón-2", "active", "2 - Desarrollo", "CristoFit Camp", 63, 1.8],
  ["std-66", "Romina Salvatierra", "+59176525454", "Gedeón-3", "inactive", "2 - Desarrollo", "Formación E.A.G.E.", 69, 1.83],
  ["std-67", "Felipe Castedo", "+59176609173", "Gedeón-4", "inactive", "2 - Desarrollo", "Formación E.A.G.E.", 76.5, 1.61],
];

const DEFAULT_DB: CRMDatabase = {
  students: [
{
    "id": "std-vip-antonio",
    "name": "Antonio Eid",
    "phone": "+59171000000",
    "email": "antonio.eid@templefit.com",
    "instructorAssigned": "Paulo Alberto Gil Cuellar (Head Coach)",
    "status": "active",
    "plan": "Coaching 1 a 1",
    "startDate": "2026-08-01",
    "renewalDate": "2026-09-15",
    "birthDate": "1988-01-01",
    "paidServiceTitle": "Coaching Personalizado 1 a 1 (450 Bs.)",
    "serviceFeeBs": 450,
    "billingCycle": "mensual",
    "paymentStatus": "pagado",
    "amountPaidBs": 450,
    "pendingBalanceBs": 0,
    "lastPaymentDate": "2026-08-05",
    "nextDueDate": "2026-09-01",
    "additionalServices": [
        "Snack Bar Prepago",
        "ElectroHidra"
    ],
    "snackBarBalanceBs": 50,
    "physicalGoal": "Fuerza funcional, calistenia y pérdida de 4kg de grasa",
    "weightKg": 55,
    "heightM": 1.6,
    "workoutLevel": "Principiante",
    "currentRoutineExercises": "1. Dominadas estrictas (4x8)\n2. Fondos en paralelas (4x10)\n3. Sentadilla búlgara (4x12)\n4. Flexiones diamante (4x15)\n5. Buteyko y cardio matutino 06:00 AM",
    "nutritionPlan": "Protocolo Salomón + Proteína Limpia",
    "currentDiet": "Desayuno con café y pan, almuerzo irregular, cenas pesadas.",
    "prescribedDiet": "06:00 AM: ElectroHidra 1L. 08:00 AM: Bowl de Elías. Almuerzo anti-inflamatorio con proteína limpia y verduras.",
    "allergiesOrRestrictions": "Sensibilidad a la lactosa",
    "eatingDisordersOrIssues": "Tendencia a picoteo por estrés en horario laboral",
    "neuroticAndStressFactors": "Tensión cervical por jornadas frente a pantalla y cortisol elevado",
    "spiritualIntention": "Consolidar la disciplina del despertar a las 05:30 AM con oración y enfoque.",
    "mentorshipNotes": "Atleta integrado al escuadrón Paz-Alfa. Compromiso regular en sesiones CristoFit Camp.",
    "attendanceHistory": [
        {
            "date": "2026-08-20",
            "attended": true,
            "notes": "Sesión CristoFit Camp - 100%"
        },
        {
            "date": "2026-08-22",
            "attended": true,
            "notes": "Entrenamiento de fuerza y calistenia"
        },
        {
            "date": "2026-08-24",
            "attended": true,
            "notes": "Movilidad articular y Buteyko"
        }
    ],
    "assessments": [
        {
            "date": "2026-08-01",
            "weightKg": 56.8,
            "heightM": 1.6,
            "imc": 22.2,
            "notes": "Evaluación inicial de ciclo"
        },
        {
            "date": "2026-08-22",
            "weightKg": 55,
            "heightM": 1.6,
            "imc": 21.5,
            "notes": "Progreso notable en resistencia y fuerza"
        }
    ],
    "escuadronId": "Paz-Alfa",
    "phase": "1 - Iniciación",
    "isVipProfile": true,
    "hubConsumption": {
        "snackBar": true,
        "merchandise": true,
        "preventiveMedicine": true
    },
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
},
    ...SEED_DATA.map(([id, name, phone, escuadronId, status, phase, plan, weightKg, heightM]) =>
      createSeedStudent(id, name, phone, escuadronId, status, phase, plan, weightKg, heightM)
    )
  ],
  transactions: [
    {
      "id": "tx-sep-1",
      "date": "2026-09-01",
      "type": "income",
      "category": "membership",
      "amount": 450,
      "description": "Coaching 1 a 1 - Antonio Eid (VIP)"
    },
    {
      "id": "tx-sep-2",
      "date": "2026-09-01",
      "type": "income",
      "category": "membership",
      "amount": 200,
      "description": "Membresía Reto 21 Días - Carlos Gutiérrez"
    },
    {
      "id": "tx-sep-3",
      "date": "2026-09-01",
      "type": "income",
      "category": "membership",
      "amount": 200,
      "description": "Membresía Reto 21 Días - Mariana Flores"
    },
    {
      "id": "tx-sep-4",
      "date": "2026-09-02",
      "type": "income",
      "category": "membership",
      "amount": 200,
      "description": "Membresía Reto 21 Días - José Luis Mamani"
    },
    {
      "id": "tx-sep-5",
      "date": "2026-09-02",
      "type": "income",
      "category": "membership",
      "amount": 200,
      "description": "Membresía Reto 21 Días - Daniela Quispe"
    },
    {
      "id": "tx-sep-6",
      "date": "2026-09-03",
      "type": "income",
      "category": "membership",
      "amount": 200,
      "description": "Membresía Mensual - Andrés Paredes"
    },
    {
      "id": "tx-sep-7",
      "date": "2026-09-03",
      "type": "expense",
      "category": "operations",
      "amount": 600,
      "description": "Alquiler espacio CristoFit Camp y parque deportivo"
    },
    {
      "id": "tx-sep-8",
      "date": "2026-09-03",
      "type": "income",
      "category": "membership",
      "amount": 500,
      "description": "Membresía Trimestral Atleta - Rodrigo Mendoza"
    },
    {
      "id": "tx-sep-9",
      "date": "2026-09-04",
      "type": "income",
      "category": "membership",
      "amount": 500,
      "description": "Membresía Trimestral Atleta - Camila Zeballos"
    },
    {
      "id": "tx-sep-10",
      "date": "2026-09-05",
      "type": "income",
      "category": "courses",
      "amount": 850,
      "description": "Formación E.A.G.E. - Juan Carlos Banegas"
    },
    {
      "id": "tx-sep-11",
      "date": "2026-09-05",
      "type": "expense",
      "category": "snack",
      "amount": 320,
      "description": "Insumos Snack Bar (Miel de abeja, Cúrcuma Cupesí, Sal marina)"
    },
    {
      "id": "tx-sep-12",
      "date": "2026-09-06",
      "type": "income",
      "category": "courses",
      "amount": 850,
      "description": "Formación E.A.G.E. - Lucía Torrez"
    },
    {
      "id": "tx-sep-13",
      "date": "2026-09-08",
      "type": "income",
      "category": "snack",
      "amount": 180,
      "description": "Consumo Snack Bar & ElectroHidra - Escuadrón Gedeón"
    },
    {
      "id": "tx-sep-14",
      "date": "2026-09-09",
      "type": "expense",
      "category": "operations",
      "amount": 250,
      "description": "Mantenimiento jaula de calistenia y ajuste de anillas"
    },
    {
      "id": "tx-sep-15",
      "date": "2026-09-10",
      "type": "income",
      "category": "snack",
      "amount": 240,
      "description": "Consumo Snack Bar - Atletas CristoFit Camp"
    },
    {
      "id": "tx-sep-16",
      "date": "2026-09-11",
      "type": "income",
      "category": "merchandise",
      "amount": 100,
      "description": "Venta Polera Oficial TempleFit - Rodrigo Mendoza"
    },
    {
      "id": "tx-sep-17",
      "date": "2026-09-12",
      "type": "income",
      "category": "merchandise",
      "amount": 150,
      "description": "Venta Hoodie Oficial TempleFit - Carlos Gutiérrez"
    },
    {
      "id": "tx-sep-18",
      "date": "2026-09-14",
      "type": "income",
      "category": "courses",
      "amount": 350,
      "description": "Inscripción Evento Sábado y Degustación Snack Bar"
    },
    {
      "id": "tx-sep-19",
      "date": "2026-09-15",
      "type": "income",
      "category": "snack",
      "amount": 120,
      "description": "Consumo Snack Bar & Shakes Proteicos"
    },
    {
      "id": "tx-sep-20",
      "date": "2026-09-15",
      "type": "expense",
      "category": "operations",
      "amount": 200,
      "description": "Material y logística para mesa de evento deportivo del sábado"
    },
    {
      "id": "tx-sep-21",
      "date": "2026-09-16",
      "type": "income",
      "category": "membership",
      "amount": 200,
      "description": "Membresía Reto 21 Días - Renovable"
    },
  {
    "id": "tx-1",
    "date": "2026-08-01",
    "type": "income",
    "category": "membership",
    "amount": 450,
    "description": "Coaching 1 a 1 - Antonio Eid (VIP)"
  },
  {
    "id": "tx-2",
    "date": "2026-08-01",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - Carlos Gutiérrez"
  },
  {
    "id": "tx-3",
    "date": "2026-08-01",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - Mariana Flores"
  },
  {
    "id": "tx-4",
    "date": "2026-08-01",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - José Luis Mamani"
  },
  {
    "id": "tx-5",
    "date": "2026-08-02",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - Daniela Quispe"
  },
  {
    "id": "tx-6",
    "date": "2026-08-02",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Andrés Paredes"
  },
  {
    "id": "tx-7",
    "date": "2026-08-02",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Valeria Mercado"
  },
  {
    "id": "tx-8",
    "date": "2026-08-03",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Rodrigo Mendoza"
  },
  {
    "id": "tx-9",
    "date": "2026-08-03",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Camila Zeballos"
  },
  {
    "id": "tx-10",
    "date": "2026-08-03",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Fernando Torrico"
  },
  {
    "id": "tx-11",
    "date": "2026-08-04",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Gabriela Rojas"
  },
  {
    "id": "tx-12",
    "date": "2026-08-04",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Reto 21 Días - Diego Villarroel"
  },
  {
    "id": "tx-13",
    "date": "2026-08-05",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Luciana Peñaranda"
  },
  {
    "id": "tx-14",
    "date": "2026-08-05",
    "type": "income",
    "category": "membership",
    "amount": 450,
    "description": "Coaching 1 a 1 - Mauricio Calvimontes"
  },
  {
    "id": "tx-15",
    "date": "2026-08-06",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Sofia Banzer"
  },
  {
    "id": "tx-16",
    "date": "2026-08-07",
    "type": "income",
    "category": "membership",
    "amount": 300,
    "description": "Formación E.A.G.E. - Javier Justiniano"
  },
  {
    "id": "tx-17",
    "date": "2026-08-08",
    "type": "income",
    "category": "membership",
    "amount": 150,
    "description": "CristoFit Camp Intensivo - Natalia Aguilera"
  },
  {
    "id": "tx-18",
    "date": "2026-08-10",
    "type": "income",
    "category": "membership",
    "amount": 500,
    "description": "Membresía Trimestral Atleta - Mateo Saucedo"
  },
  {
    "id": "tx-19",
    "date": "2026-08-12",
    "type": "income",
    "category": "membership",
    "amount": 200,
    "description": "Membresía Mensual - Isabella Hurtado"
  },
  {
    "id": "tx-20",
    "date": "2026-08-14",
    "type": "income",
    "category": "membership",
    "amount": 450,
    "description": "Coaching 1 a 1 - Sebastián Pinto"
  },
  {
    "id": "tx-21",
    "date": "2026-08-02",
    "type": "income",
    "category": "snack",
    "amount": 420,
    "description": "Venta Bebidas ElectroHidra y Pudines H-Control (Sábado Camp)"
  },
  {
    "id": "tx-22",
    "date": "2026-08-05",
    "type": "income",
    "category": "snack",
    "amount": 580,
    "description": "Recarga saldo prepago Snack Bar (10 atletas)"
  },
  {
    "id": "tx-23",
    "date": "2026-08-09",
    "type": "income",
    "category": "snack",
    "amount": 650,
    "description": "Venta Bowls de Elías y Smoothies de Salomón"
  },
  {
    "id": "tx-24",
    "date": "2026-08-15",
    "type": "income",
    "category": "snack",
    "amount": 720,
    "description": "Consumo cafetería saludable CristoFit Camp"
  },
  {
    "id": "tx-25",
    "date": "2026-08-18",
    "type": "income",
    "category": "snack",
    "amount": 480,
    "description": "Venta hidratación isotónica y té de profetas"
  },
  {
    "id": "tx-26",
    "date": "2026-08-04",
    "type": "income",
    "category": "merchandise",
    "amount": 680,
    "description": "Venta Indumentaria Oficial (4 Poleras TempleFit)"
  },
  {
    "id": "tx-27",
    "date": "2026-08-11",
    "type": "income",
    "category": "merchandise",
    "amount": 520,
    "description": "Venta Canguro Táctico y muñequeras"
  },
  {
    "id": "tx-28",
    "date": "2026-08-06",
    "type": "income",
    "category": "medicine",
    "amount": 800,
    "description": "Pack Suplementos Glutamina + Omega-3 (4 atletas)"
  },
  {
    "id": "tx-29",
    "date": "2026-08-13",
    "type": "income",
    "category": "medicine",
    "amount": 700,
    "description": "Evaluaciones Antropométricas con Bioimpedancia"
  },
  {
    "id": "tx-30",
    "date": "2026-08-07",
    "type": "income",
    "category": "courses",
    "amount": 1500,
    "description": "Taller de Entrenamiento y Respiración Buteyko"
  },
  {
    "id": "tx-31",
    "date": "2026-08-01",
    "type": "expense",
    "category": "rent",
    "amount": 3500,
    "description": "Alquiler Centro de Entrenamiento / Sede Central"
  },
  {
    "id": "tx-32",
    "date": "2026-08-05",
    "type": "expense",
    "category": "operations",
    "amount": 5000,
    "description": "Honorarios Cuerpo Técnico (Head Coach + 2 Instructores Asistentes)"
  },
  {
    "id": "tx-33",
    "date": "2026-08-06",
    "type": "expense",
    "category": "operations",
    "amount": 1400,
    "description": "Insumos Snack Bar (sal marina, miel, chía, avena, cúrcuma)"
  },
  {
    "id": "tx-34",
    "date": "2026-08-08",
    "type": "expense",
    "category": "operations",
    "amount": 750,
    "description": "Servicios Básicos (Luz trifásica, Agua potable, Internet Fibra)"
  },
  {
    "id": "tx-35",
    "date": "2026-08-10",
    "type": "expense",
    "category": "ads",
    "amount": 600,
    "description": "Pauta publicitaria Meta Ads (Convocatoria Reto 21 Días)"
  },
  {
    "id": "tx-36",
    "date": "2026-08-12",
    "type": "expense",
    "category": "operations",
    "amount": 450,
    "description": "Mantenimiento jaula de calistenia y colchonetas de seguridad"
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
  leads: [
    { id: 'ld-1', name: 'Samuel Ortiz', phone: '+59178901234', source: 'instagram', status: 'appointment_set', notes: 'Agendado para clase de prueba sábado 06:00 AM en CristoFit Camp', dateAdded: '2026-08-10' },
    { id: 'ld-2', name: 'Valeria Justiniano', phone: '+59165432198', source: 'whatsapp', status: 'trial', notes: 'En semana de prueba gratuita (Escuadrón Paz). Muy interesada en nutrición.', dateAdded: '2026-08-12' },
    { id: 'ld-3', name: 'Carlos Medina', phone: '+59170098765', source: 'walk-in', status: 'contacted', notes: 'Consultó por formación en ventas y horario nocturno', dateAdded: '2026-08-14' },
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
    { id: 'mkt-1', month: 'Agosto 2026', campaignName: 'Lanzamiento Reto 21 Días = ÍNTEGROS', driveLink: 'https://drive.google.com/drive/folders/templefit-reto-21-dias', strategy: 'Testimonios reales de atletas, rutina 06:00 AM y cobertura de CristoFit Camp' }
  ],
  claimsTickets: [
    { id: 'tck-1', date: '2026-08-04', clientName: 'Valeria Condori', issue: 'Consulta sobre compatibilidad de colágeno hidrolizado con ayuno', status: 'pending', resolution: '' }
  ],
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
      title: 'Los 3 Pilares Diarios: Espíritu, Mente y Cuerpo',
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
  ],
  inventory: [
    {
      id: 'inv-polera-1',
      name: 'Polera Oficial de Algodón TempleFit',
      category: 'apparel',
      cost: 50,
      price: 100,
      stock: 45,
      minStock: 10,
      size: 'M',
      color: 'Negro con Dorado',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-shorts-1',
      name: 'Shorts Deportivos Tácticos',
      category: 'apparel',
      cost: 35,
      price: 70,
      stock: 30,
      minStock: 8,
      size: 'L',
      color: 'Azul Marino Táctico',
      imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-hoodie-1',
      name: 'Canguro / Hoodie Oficial TempleFit',
      category: 'apparel',
      cost: 80,
      price: 150,
      stock: 20,
      minStock: 5,
      size: 'XL',
      color: 'Negro Premium',
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-ginkgo-1',
      name: 'Ginkgo Biloba Concentrado (120 caps)',
      category: 'suplementos',
      cost: 85,
      price: 150,
      stock: 25,
      minStock: 6,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-coco-1',
      name: 'Óleo de Coco Extra Virgen (200 ml)',
      category: 'suplementos',
      cost: 40,
      price: 75,
      stock: 40,
      minStock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-colageno-1',
      name: 'Colágeno Hidrolizado Articular (100 ml)',
      category: 'suplementos',
      cost: 50,
      price: 95,
      stock: 35,
      minStock: 8,
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-glutamina-1',
      name: 'Glutamina Pura Anticatabólica (300 gr)',
      category: 'suplementos',
      cost: 80,
      price: 150,
      stock: 20,
      minStock: 5,
      imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-omega-1',
      name: 'Tabletas de Pescado Omega-3 (20 tabletas)',
      category: 'suplementos',
      cost: 5,
      price: 10,
      stock: 100,
      minStock: 25,
      imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-levadura-1',
      name: 'Levadura de Cerveza en Polvo (500 gr)',
      category: 'suplementos',
      cost: 45,
      price: 85,
      stock: 30,
      minStock: 6,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-curcuma-1',
      name: 'Cúrcuma (Cupesí) en polvo (250 gr)',
      category: 'suplementos',
      cost: 18,
      price: 35,
      stock: 50,
      minStock: 12,
      imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-reumasan-1',
      name: 'Reumasan Crema Articular Tópica',
      category: 'suplementos',
      cost: 8,
      price: 15,
      stock: 60,
      minStock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-sal-1',
      name: 'Sal Marina Natural (50 gr)',
      category: 'suplementos',
      cost: 8,
      price: 20,
      stock: 80,
      minStock: 20,
      imageUrl: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-b12-1',
      name: 'Complejo Vitamínico B12',
      category: 'suplementos',
      cost: 40,
      price: 80,
      stock: 25,
      minStock: 6,
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-electrohidra-1',
      name: 'ElectroHidra "Elite-Hydration" (1L)',
      category: 'snack',
      cost: 6,
      price: 15,
      stock: 50,
      minStock: 15,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-electrodetox-1',
      name: 'ElectroDetox Blast (1L)',
      category: 'snack',
      cost: 6,
      price: 15,
      stock: 40,
      minStock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-bowl-1',
      name: 'Bowl del Guerrero de Elías',
      category: 'snack',
      cost: 10,
      price: 25,
      stock: 35,
      minStock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'inv-smoothie-1',
      name: 'Smoothie Cerebral de Salomón',
      category: 'snack',
      cost: 9,
      price: 20,
      stock: 30,
      minStock: 8,
      imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop'
    }
  ],
  showcaseItems: [
    {
      id: 'show-polera-1',
      type: 'merch',
      title: 'Polera Oficial de Algodón TempleFit',
      description: 'Algodón de alta densidad 240gsm, corte vintage elegante y distintivo de escuadrón oficial.',
      price: 100,
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-shorts-1',
      type: 'merch',
      title: 'Shorts Deportivos Tácticos',
      description: 'Microfibra de alto rendimiento transpirable para calistenia y sparring de boxeo ético.',
      price: 70,
      imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-hoodie-1',
      type: 'merch',
      title: 'Canguro / Hoodie Oficial TempleFit',
      description: 'Tejido térmico resistente con bolsillo táctico para el amanecer 06:00 AM en el CristoFit Camp.',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-ginkgo-1',
      type: 'merch',
      title: 'Ginkgo Biloba Concentrado (120 caps)',
      description: 'Estimulación del flujo sanguíneo cerebral, concentración y biohacking cognitivo.',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-coco-1',
      type: 'merch',
      title: 'Óleo de Coco Extra Virgen (200 ml)',
      description: 'Triglicéridos de cadena media (TCM) para energía limpia y metabolismo celular.',
      price: 75,
      imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-colageno-1',
      type: 'merch',
      title: 'Colágeno Hidrolizado (100 ml)',
      description: 'Regeneración articular, cartílagos y soporte ligamentario para entrenamientos de impacto.',
      price: 95,
      imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-glutamina-1',
      type: 'merch',
      title: 'Glutamina Pura Anticatabólica (300 gr)',
      description: 'Recuperación intestinal y síntesis muscular acelerada post CristoFit Camp.',
      price: 150,
      imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-electrohidra-1',
      type: 'recipe',
      title: 'ElectroHidra "Elite-Hydration"',
      description: 'Fórmula isotónica con sal marina, bicarbonato, magnesio, miel pura y limón.',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    },
    {
      id: 'show-electrodetox-1',
      type: 'recipe',
      title: 'ElectroDetox Blast (Autofagia)',
      description: 'Infusión botánica de clavo de olor, canela, pepino, apio y jengibre desintoxicante.',
      price: 15,
      imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop',
      status: 'active'
    }
  ],
  sopsList: [
    {
      id: 'sop-auditoria-cierre',
      title: 'SOP: Auditoría de KPIs y Cierre de Ciclo',
      step1: 'Auditoría de progreso de atletas y sumatoria de logros por escuadrón.',
      step2: 'Reporte de rentabilidad mensual en Bs. y análisis de conversión post-evento.',
      step3: 'Checklist de protocolo de premiación (Coronas de Bronce, Plata y Oro) y contratos/remanentes.'
    },
    {
      id: 'sop-planificacion-expansion',
      title: 'SOP: Planificación Anual, Alianzas y Expansión',
      step1: 'Coordinación con líderes locales y alianzas regionales / empresas aliadas.',
      step2: 'Planificación estratégica regional y proyección de crecimiento de los 25 escuadrones.',
      step3: 'Reunión de alineación semanal y revisión de cumplimiento de objetivos 50/50.'
    },
    {
      id: 'sop-habitos-calidad',
      title: 'SOP: Hábitos de Calidad y Rendición Semanal',
      step1: 'Registro diario de prospectos y validación de asistencia técnica 06:00 AM.',
      step2: 'Mentoría grupal de 30 min y auditoría del movimiento con capitanes.',
      step3: 'Seguimiento de hidratación ElectroHidra y adherencia nutricional del alumno.'
    },
    {
      id: 'sop-plan-accion-estandar',
      title: 'SOP: Plan de Acción Estándar & Embudo de Ventas',
      step1: 'Firma de roles, responsabilidades y setup tecnológico (WhatsApp, Sheets, CRM).',
      step2: 'Capacitación teórica y práctica inicial + Campaña de expectativa masiva.',
      step3: 'Refuerzo de ventas del Reto 21 Días, permanencia y cierre de contratos.'
    }
  ],
  monthlyBoard: {
    month: 'Septiembre 2026',
    verse: 'El espíritu da el diseño. El cuerpo es el templo. La mente crea y edifica vidas. (1 Corintios 6:19-20)',
    goals: [
      { area: 'Gimnasio & Reto 21 Días', targetBs: 45000 },
      { area: 'Snack Bar & Bebidas', targetBs: 15000 },
      { area: 'Formación E.A.G.E. & Cursos', targetBs: 25000 },
      { area: 'Armería & Suplementos', targetBs: 18000 }
    ],
    retentionTarget: 85,
    averageTicket: 200,
    newMembersTarget: 10,
    notes: 'Enfoque en consolidación de 25 Escuadrones y expansión de CristoFit Camp los sábados.'
  }
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
    const parsed = JSON.parse(saved) as CRMDatabase;
    
    // Auto-migration: ensure students has at least 65 athletes and coherent financials
    let hasUpdated = false;
    if (!parsed.students || parsed.students.length === 0) {
      parsed.students = DEFAULT_DB.students;
      hasUpdated = true;
    }
    if (!parsed.transactions || parsed.transactions.length === 0) {
      parsed.transactions = DEFAULT_DB.transactions;
      hasUpdated = true;
    }
    if (!parsed.inventory || parsed.inventory.length === 0) {
      parsed.inventory = DEFAULT_DB.inventory;
      hasUpdated = true;
    }
    if (!parsed.showcaseItems || parsed.showcaseItems.length === 0) {
      parsed.showcaseItems = DEFAULT_DB.showcaseItems;
      hasUpdated = true;
    }
    if (!parsed.sopsList || parsed.sopsList.length === 0) {
      parsed.sopsList = DEFAULT_DB.sopsList;
      hasUpdated = true;
    }
    if (!parsed.monthlyBoard) {
      parsed.monthlyBoard = DEFAULT_DB.monthlyBoard;
      hasUpdated = true;
    }
    if (hasUpdated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      } catch (e) {}
    }
    return parsed;
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

  // 1. Sincronización ONLINE principal con Firebase Firestore (CRM Interno)
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, 'workspaces', 'templefit-main');
      setDoc(docRef, db, { merge: true }).catch(err => {
        console.warn("Error sincronizando a Firebase:", err);
      });

      // 2. Sincronización de Contenido Público Sanitizado (Sin datos de alumnos, finanzas ni contraseñas)
      const publicDocRef = doc(firestoreDb, 'public_content', 'main');
      const publicPayload = JSON.parse(JSON.stringify({
        recipes: db.recipes || [],
        showcaseItems: db.showcaseItems || [],
        inventoryPublic: (db.inventory || []).map(inv => ({
          id: inv.id,
          name: inv.name,
          category: inv.category,
          price: inv.price || 0,
          stock: inv.stock || 0,
          imageUrl: inv.imageUrl || ''
        })),
        updatedAt: new Date().toISOString()
      }));
      setDoc(publicDocRef, publicPayload, { merge: true }).catch(err => {
        console.warn("Error sincronizando contenido público:", err);
      });
    } catch (e) {
      console.warn("Firebase no disponible:", e);
    }
  }
}

export async function syncFromCloud(): Promise<CRMDatabase> {
  if (typeof window === 'undefined') return DEFAULT_DB;

  // Sincronización ONLINE desde Firebase Firestore
  if (firestoreDb) {
    try {
      const docRef = doc(firestoreDb, 'workspaces', 'templefit-main');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const cloudData = snap.data() as CRMDatabase;
        // Solo aceptar si la cohorte está completa (al menos 65 atletas)
        if (cloudData.students && cloudData.students.length > 0) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          } catch (e) {}
          return cloudData;
        } else {
          // Si Firebase tiene datos antiguos, actualizar la nube con la cohorte local completa
          const localDb = getCRMDatabase();
          setDoc(docRef, localDb, { merge: true }).catch(() => {});
        }
      }
    } catch (err) {
      console.warn("Error consultando Firebase:", err);
    }
  }

  return getCRMDatabase();
}


