import { CRMDatabase } from './types';

const STORAGE_KEY = 'templefit_holistic_crm_v1';

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
  dailyLogs: []
};

export const getCRMDatabase = (): CRMDatabase => {
  if (typeof window === 'undefined') return DEFAULT_DB;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // First load, save defaults
      saveCRMDatabase(DEFAULT_DB);
      return DEFAULT_DB;
    }
    return JSON.parse(data) as CRMDatabase;
  } catch (e) {
    console.error('Error loading CRM Database, falling back to default', e);
    return DEFAULT_DB;
  }
};

export const saveCRMDatabase = (db: CRMDatabase): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Error saving CRM Database', e);
  }
};
