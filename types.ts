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
  medicalProfile?: MedicalProfile;
  medicalAndRoutineNotes?: string; // Legacy string format
  // Operational Framework
  escuadronId: string; // Máximo 12 atletas
  phase: '1 - Iniciación' | '2 - Desarrollo' | '3 - Perfeccionamiento';
  
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
  category: 'snack' | 'apparel' | 'suplementos' | 'equipamiento' | string;
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
  content: string;
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
  type: 'recipe' | 'merch' | 'suplemento' | 'servicio' | string;
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
  area: 'Snack' | 'Gimnasio' | 'Cursos' | 'Productos';
  targetBs: number;
}

export interface MonthlyBoard {
  month: string; // ej. 'Agosto 2026'
  verse: string; // Fundamento del Mes (Versículo / Enfoque)
  goals: MonthlyGoal[]; // Metas por área
  retentionTarget: number; // % Retención objetivo
  averageTicket: number; // Ticket promedio objetivo
  newMembersTarget: number; // KPI Nuevos Miembros
}
