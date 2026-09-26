// Utilidades financieras y de fecha adaptadas a la realidad de Santa Cruz, Bolivia (UTC-4)

export function getBoliviaTodayISO(date: Date = new Date()): string {
  // Santa Cruz de la Sierra esta en huso horario UTC-4 todo el ano (sin cambio de hora estival)
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const boliviaTime = new Date(utc - (4 * 3600000));
  const y = boliviaTime.getFullYear();
  const m = String(boliviaTime.getMonth() + 1).padStart(2, '0');
  const d = String(boliviaTime.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDaysBoliviaISO(days: number, baseDate?: Date): string {
  const now = baseDate || new Date();
  const future = new Date(now.getTime() + (days * 86400000));
  return getBoliviaTodayISO(future);
}

export function formatBs(amount: number): string {
  const safe = isNaN(amount) ? 0 : amount;
  return `Bs. ${safe.toLocaleString('es-BO')}`;
}

export function getTransactionVault(tx: { vault?: string; paymentMethod?: string }): 'banco' | 'cajaFisica' {
  // Si tiene boveda explicita, esa es la fuente de verdad primaria
  if (tx.vault === 'cajaFisica') return 'cajaFisica';
  if (tx.vault === 'banco') return 'banco';
  
  // Si no tiene boveda, inferir por metodo de pago
  if (tx.paymentMethod === 'efectivo') return 'cajaFisica';
  if (tx.paymentMethod === 'qr' || tx.paymentMethod === 'transferencia') return 'banco';
  
  // Default legacy sin metodo ni boveda: banco (QR >70% en Santa Cruz)
  return 'banco';
}

export interface PlanConfig {
  fee: number;
  cycle: 'mensual' | 'quincenal' | 'bimensual' | 'trimestral' | 'semestral' | 'anual' | 'sesion';
  days: number;
}

export function getPlanDetails(plan: string): PlanConfig {
  switch (plan) {
    case 'Reto 21 Días':
    case 'Membresía Mensual':
    case 'Plan Integral Mensual':
      return { fee: 200, cycle: 'mensual', days: 30 };
    case 'Bimensual Disciplina':
      return { fee: 380, cycle: 'bimensual', days: 60 };
    case 'Trimestral Atleta':
      return { fee: 500, cycle: 'trimestral', days: 90 };
    case 'Semestral Atleta':
      return { fee: 950, cycle: 'semestral', days: 180 };
    case 'Anual Atleta':
      return { fee: 1800, cycle: 'anual', days: 365 };
    case 'Coaching 1 a 1':
      return { fee: 450, cycle: 'mensual', days: 30 };
    case 'CristoFit Camp':
      return { fee: 150, cycle: 'mensual', days: 30 };
    case 'Formación E.A.G.E.':
      return { fee: 1200, cycle: 'trimestral', days: 90 };
    case 'Liderazgo & Ventas':
      return { fee: 600, cycle: 'bimensual', days: 60 };
    case 'Pase Diario':
      return { fee: 25, cycle: 'sesion', days: 1 };
    default:
      return { fee: 200, cycle: 'mensual', days: 30 };
  }
}

export interface ExecutiveCutResult {
  saldoOperativo: number;
  fondoReserva: number;
  flujoNeto: number;
  flujoNetoReal: number;
  retiroPaulo: number;
  reinversion: number;
}

export function calculateExecutiveCut(income: number, expense: number): ExecutiveCutResult {
  const safeInc = Number(income) || 0;
  const safeExp = Number(expense) || 0;
  const saldoOperativo = safeInc - safeExp;
  
  // Reserva del 20%: solo si hay saldo positivo, exactamente redondeado
  const fondoReserva = saldoOperativo > 0 ? Math.round(saldoOperativo * 0.20) : 0;
  const flujoNeto = saldoOperativo > 0 ? saldoOperativo - fondoReserva : saldoOperativo;
  
  // Reparto 50/50 exacto: retiroPaulo toma el piso, reinversion toma el resto para que la suma sea exacta
  const retiroPaulo = flujoNeto > 0 ? Math.floor(flujoNeto * 0.50) : 0;
  const reinversion = flujoNeto > 0 ? flujoNeto - retiroPaulo : 0;

  return {
    saldoOperativo,
    fondoReserva,
    flujoNeto,
    flujoNetoReal: flujoNeto,
    retiroPaulo,
    reinversion
  };
}
