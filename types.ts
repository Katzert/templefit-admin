export interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  instructorAssigned: string;
  status: 'active' | 'expiring' | 'inactive';
  plan: 'Reto 21 Días' | 'CristoFit Camp' | 'Coaching 1 a 1' | 'Plan Integral Mensual';
  startDate: string;
  renewalDate: string;
  
  // Pilar 1: CUERPO (Body)
  physicalGoal: string;
  weightKg: number;
  workoutLevel: 'Principiante' | 'Intermedio' | 'Avanzado';
  
  // Pilar 2: MENTE (Alimentación)
  nutritionPlan: string;
  allergiesOrRestrictions: string;
  
  // Pilar 3: ESPÍRITU (Coaching & Fe)
  spiritualIntention: string;
  mentorshipNotes: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: 'membership' | 'snack' | 'merchandise' | 'ads' | 'operations';
  amount: number;
  description: string;
}

export interface DailyLog {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  waterGoalMet: boolean;
  trainingCompleted: boolean;
  readingCompleted: boolean;
}

export interface CRMDatabase {
  students: Student[];
  transactions: Transaction[];
  dailyLogs: DailyLog[];
}
