export interface AttendanceRecord {
  date: string;
  attended: boolean;
  notes?: string;
}

export interface ProgressAssessment {
  date: string;
  weightKg: number;
  heightM: number;
  imc: number;
  bodyFatPct?: number;
  notes: string;
}

export interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  instructorAssigned: string;
  status: 'active' | 'expiring' | 'inactive';
  plan: 'Reto 21 Días' | 'CristoFit Camp' | 'Coaching 1 a 1' | 'Plan Integral Mensual' | 'Formación E.A.G.E. (Guerra Espiritual)' | 'Neuro-Entrenamiento en Ventas (Completo)';
  startDate: string;
  renewalDate: string;
  birthDate?: string;
  
  // Pilar 1: CUERPO (Biometría & Antropometría)
  physicalGoal: string;
  weightKg: number;
  heightM?: number; // Altura en metros (ej. 1.75)
  workoutLevel: 'Principiante' | 'Intermedio' | 'Avanzado';
  currentRoutineExercises?: string; // Ejercicios y rutina actual con ejemplos
  
  // Pilar 2: MENTE & NUTRICIÓN (Clínica y Hábitos)
  nutritionPlan: string;
  currentDiet?: string; // Alimentación actual con la que llega
  prescribedDiet?: string; // Alimentación programada TempleFit
  allergiesOrRestrictions: string;
  eatingDisordersOrIssues?: string; // Trastornos alimenticios, intolerancias o atracones
  neuroticAndStressFactors?: string; // Factores neuróticos, estrés crónico, ansiedad o insomnio
  
  // Pilar 3: ESPÍRITU (Coaching & Fe)
  spiritualIntention: string;
  mentorshipNotes: string;
  medicalProfile?: MedicalProfile;
  medicalAndRoutineNotes?: string; // Legacy string format
  
  // Historial de Seguimiento
  attendanceHistory?: AttendanceRecord[];
  assessments?: ProgressAssessment[];
  
  // Operational Framework
  escuadronId: string; // Máximo 12 atletas
  phase: '1 - Iniciación' | '2 - Desarrollo' | '3 - Perfeccionamiento';
  isVipProfile?: boolean; // Para Antonio Eid y atletas VIP
  
  // Hub Model Consumption
  hubConsumption: {
    snackBar: boolean;
    merchandise: boolean;
    preventiveMedicine: boolean;
  };
  avatarUrl?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: 'membership' | 'snack' | 'merchandise' | 'medicine' | 'courses' | 'ads' | 'operations' | 'rent';
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

export type UserRole = 'instructor' | 'admin';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional for security, but we store it locally for now
  role: UserRole;
  avatar: string;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  costPerUnit: number;
  stock: number;
  minStock: number;
}

export interface Recipe {
  id: string;
  name: string;
  category?: string;
  time?: number;
  difficulty?: string;
  servings?: number;
  description?: string;
  ingredientsText?: string[]; // for public display
  steps?: string[];
  macros?: { calories: number; protein: number; fat: number; carbs: number };
  image?: string; // Base64 or URL
  crmIngredients: { ingredientId: string; quantity: number }[]; // internal link for costs
  suggestedPrice: number;
}

export interface MentorshipSession {
  id: string;
  studentId: string;
  date: string;
  type: 'Mentoría Espiritual' | 'Psicología' | 'Coaching';
  emotionalState: string;
  clinicalNotes: string;
  actionItems: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'snack' | 'apparel' | 'suplementos';
  cost: number;
  price: number;
  stock: number;
  minStock: number;
  size?: 'S' | 'M' | 'L' | 'XL' | 'N/A' | string;
  color?: string;
  imageUrl?: string;
}

export interface CRMDatabase {
  students: Student[];
  transactions: Transaction[];
  dailyLogs: DailyLog[];
  users: SystemUser[];
  ingredients?: Ingredient[];
  recipes?: Recipe[];
  mentorshipSessions?: MentorshipSession[];
  inventory?: InventoryItem[];
  leads?: Lead[];
  weeklyChecklist?: WeeklyChecklist;
  marketingStrategy?: string;
  sopsContent?: string;
  claimsHelp?: string;
  
  marketingTasks?: MarketingTask[];
  sopsList?: SOPItem[];
  claimsTickets?: ClaimTicket[];
  
  showcaseItems?: ShowcaseItem[];
  monthlyBoard?: MonthlyBoard;
  contentPosts?: ContentPost[];
}

export interface ContentPost {
  id: string;
  monthIndex: 1 | 2 | 3; // Mes 1, Mes 2, Mes 3 (Replicable a 90 días)
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  pillar: 'CristoFit Camp' | 'Hábitos 3 Áreas' | 'Consumo Consciente & Snack' | 'Storytelling & Testimonios' | 'Llamadas a la Acción (CTA)' | 'Lives & Retos';
  title: string;
  hookAndStory: string;
  callToAction: string;
  mediaUrl?: string; // Link a imagen o documento
  driveDocLink?: string; // Link a Google Drive / PDF
  status: 'draft' | 'scheduled' | 'published';
  targetAudience?: string; // ej. General, Antonio Eid / VIP, Nuevos Prospectos
}

export interface MedicalProfile {
  heightCm: number;
  bloodType: string;
  allergiesOrConditions: string;
  currentRoutine: string;
}

export interface SOPItem {
  id: string;
  title: string;
  content?: string;
  step1?: string;
  step2?: string;
  step3?: string;
}

export interface MarketingTask {
  id: string;
  month: string;
  campaignName: string;
  driveLink: string;
  strategy: string;
}

export interface ClaimTicket {
  id: string;
  date: string;
  clientName: string;
  issue: string;
  status: 'pending' | 'resolved';
  resolution: string;
}

export interface ShowcaseItem {
  id: string;
  type: 'recipe' | 'merch';
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  status: 'active' | 'draft';
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  source: 'instagram' | 'whatsapp' | 'referral' | 'walk-in';
  status: 'new' | 'contacted' | 'appointment_set' | 'trial' | 'enrolled' | 'lost';
  notes: string;
  dateAdded: string;
}

export type DayTask = {
  id: string;
  task: string;
  done: boolean;
};

export type WeeklyChecklist = Record<string, DayTask[]>;

export interface MonthlyGoal {
  area: 'Snack' | 'Gimnasio' | 'Cursos' | 'Productos' | 'Gimnasio & Reto 21 Días' | 'Snack Bar & Bebidas' | 'Formación E.A.G.E. & Cursos' | 'Armería & Suplementos' | string;
  targetBs: number;
}

export interface MonthlyBoard {
  month: string; // ej. 'Agosto 2026'
  verse: string; // Fundamento del Mes (Versículo / Enfoque)
  goals: MonthlyGoal[]; // Metas por área
  retentionTarget: number; // % Retención objetivo
  averageTicket: number; // Ticket promedio objetivo
  newMembersTarget: number; // KPI Nuevos Miembros
  notes?: string; // Notas adicionales / Información de AI
}
