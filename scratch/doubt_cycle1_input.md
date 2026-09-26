Adversarial review. Find what is wrong with this artifact.
Assume the author is overconfident. Look for:
- Unstated assumptions
- Edge cases not handled
- Hidden coupling or shared state
- Ways the contract could be violated
- Existing conventions this might break
- Failure modes under unexpected input

Do NOT validate. Do NOT summarize. Find issues, or state explicitly that you cannot find any after thorough examination.

CONTRACT:
1. Operational Reality (Santa Cruz de la Sierra, Bolivia, 2026 economic context):
   - Severe USD scarcity, parallel FX spreads, high inflation on imported fitness goods.
   - Payment modalities: Dominance of QR Simple (mobile interbank payments via ASOBAN/Banco Ganadero/BNB/BCP/Banco Union) accounting for >70% of retail transactions; Cash (Efectivo en mano at outdoor venues like Parque Urbano) accounting for ~25%; Direct bank transfer accounting for ~5%.
   - Cashflow dynamics: Tight athlete liquidity, bi-weekly salary schedules (quincenas on the 10th-15th and end of month). High frequency of partial payments (e.g. paying 100 Bs. upon registration, 100 Bs. on the 15th).
2. Financial and Business Invariants:
   - Currency: Bolivianos (Bs.) formatted with toLocaleString('es-BO').
   - Invariant A (Fondo de Reserva): Exactly 20% of net operating profit (Ingresos reales percibidos - Gastos operativos) must be allocated to the Reserve Fund before any partner distributions.
   - Invariant B (Distribucion 50/50): Exactly 50% Founder withdrawal (Paulo Gil Cuellar) and 50% Reinvestment/Maintenance on net available profit (after deducting the 20% reserve).
   - Invariant C (Percibido vs Devengado): Uncollected student debt (cuentas por cobrar, saldos pendientes) must NEVER be recorded as liquid ledger income or distributed as profit. Only money actually collected in cash or QR can enter the cash ledger and profit split.
   - Invariant D (Liquidity Segregation): Cash on hand (Caja Fisica / Efectivo) and Bank Liquidity (Banco / QR / Transferencia) must be tracked and reconcilable so coaches do not mistake cash in hand for bank funds or vice versa.
   - Invariant E (Bi-directional Sync): When a student pays a fee or partial installment, the student balance (amountPaidBs, pendingBalanceBs, paymentStatus) and the cash ledger (transactions) must remain strictly synchronized.
   - Invariant F (Local Resilience): The inventory and snack bar must resist imported inflation by prioritizing local raw inputs (e.g. ElectroHidra made with Sal de Colchani, local honey, bicarbonate) over dollar-indexed imported supplements.

ARTIFACT:
Below are the core TypeScript types and implementation excerpts currently governing finance, billing, and inventory in the TempleFit CRM:

```typescript
// 1. types.ts excerpt
export interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'expiring' | 'inactive';
  plan: 'Reto 21 Días' | 'Membresía Mensual' | 'Trimestral Atleta' | 'Semestral Atleta' | 'Anual Atleta' | 'CristoFit Camp' | 'Coaching 1 a 1' | 'Plan Integral Mensual' | 'Pase Diario' | 'Formación E.A.G.E.' | 'Liderazgo & Ventas';
  serviceFeeBs?: number;
  paidServiceTitle?: string;
  billingCycle?: 'mensual' | 'trimestral' | 'semestral' | 'anual' | 'sesion';
  paymentStatus?: 'pagado' | 'pendiente' | 'parcial';
  amountPaidBs?: number;
  pendingBalanceBs?: number;
  lastPaymentDate?: string;
  nextDueDate?: string;
  startDate: string;
  renewalDate: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: 'membership' | 'snack' | 'merchandise' | 'medicine' | 'courses' | 'ads' | 'operations' | 'rent' | 'withdrawal';
  amount: number;
  description: string;
  studentId?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'snack' | 'apparel' | 'suplementos';
  cost: number;
  price: number;
  stock: number;
  minStock: number;
}
```

```typescript
// 2. Module18Directory.tsx (Student registration and initial billing)
const handleCreateStudent = (e: React.FormEvent) => {
  e.preventDefault();
  if (!newAthlete.name) return;

  const chosenPlan = (newAthlete.plan as any) || 'Reto 21 Días';
  let fee = 200;
  let cycle: 'mensual' | 'trimestral' | 'semestral' | 'sesion' = 'mensual';
  if (chosenPlan === 'Reto 21 Días' || chosenPlan === 'Membresía Mensual') { fee = 200; cycle = 'mensual'; }

  const today = new Date().toISOString().split('T')[0];
  const nextDueDateCalc = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const student: Student = {
    id: `std-${Date.now()}`,
    name: newAthlete.name,
    phone: newAthlete.phone || '+591',
    email: cleanEmail,
    instructorAssigned: 'Paulo Alberto Gil Cuellar (Head Coach)',
    status: 'active',
    plan: chosenPlan,
    serviceFeeBs: fee,
    paidServiceTitle: `${chosenPlan} (${fee} Bs.)`,
    billingCycle: cycle,
    amountPaidBs: fee,
    pendingBalanceBs: 0,
    paymentStatus: 'pagado',
    lastPaymentDate: today,
    nextDueDate: nextDueDateCalc,
    startDate: today,
    renewalDate: nextDueDateCalc,
    ...
  };
  
  const db = getCRMDatabase();
  db.students = [student, ...(db.students || [])];

  // Registrar asiento de cobro inicial en caja
  const initialTx = {
    id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    date: today,
    type: 'income' as const,
    category: 'membership' as const,
    amount: fee,
    description: `Inscripción ${chosenPlan} (${fee} Bs.) - ${student.name}`
  };
  db.transactions = [initialTx, ...(db.transactions || [])];
  saveCRMDatabase(db);
};
```

```typescript
// 3. Module13FinanceLedger.tsx (Ledger submission and student renewal)
const submitTransaction = (e: React.FormEvent) => {
  e.preventDefault();
  const amount = Number(newTx.amount);
  if (isNaN(amount) || amount <= 0 || !newTx.description) {
    alert('Por favor ingresa un monto válido y una descripción.');
    return;
  }

  const tx: Transaction = {
    id: 'tx-' + Date.now(),
    date: newTx.date || new Date().toISOString().split('T')[0],
    type: newTx.type,
    category: newTx.category,
    amount,
    description: newTx.description
  };

  const db = getCRMDatabase();

  // Automatizacion: Auto-renovacion de membresia del atleta
  if (newTx.type === 'income' && newTx.category === 'membership' && selectedStudentId && db.students) {
    const sIndex = db.students.findIndex(s => s.id === selectedStudentId);
    if (sIndex >= 0) {
      const nextDate = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
      db.students[sIndex].status = 'active';
      db.students[sIndex].renewalDate = nextDate;
    }
  }

  db.transactions = [tx, ...(db.transactions || [])];
  saveCRMDatabase(db);
};
```

```typescript
// 4. Module1Profile.tsx (Recording payment in athlete profile)
const handleRecordFullPayment = () => {
  if (!selectedStudent) return;
  const currentPending = selectedStudent.pendingBalanceBs !== undefined ? selectedStudent.pendingBalanceBs : pendingBalanceBs;
  if (currentPending <= 0 && paymentStatus === 'pagado') return;

  const fee = selectedStudent.serviceFeeBs || serviceFeeBs || 200;
  const today = new Date().toISOString().split('T')[0];
  const nextDueDateCalc = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const db = getCRMDatabase();
  const updatedStudents = (db.students || []).map(s => {
    if (s.id === selectedStudent.id) {
      return {
        ...s,
        amountPaidBs: fee,
        pendingBalanceBs: 0,
        paymentStatus: 'pagado',
        lastPaymentDate: today,
        nextDueDate: nextDueDateCalc,
        status: 'active'
      };
    }
    return s;
  });

  const newTx = {
    id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    date: today,
    type: 'income' as const,
    category: 'membership' as const,
    amount: fee,
    description: `Cobro cuota: ${plan} (${fee} Bs.) - ${name}`
  };

  db.students = updatedStudents;
  db.transactions = [newTx, ...(db.transactions || [])];
  saveCRMDatabase(db);
};
```

```typescript
// 5. Module40CorteEjecutivo.tsx (Calculation of 20% Reserve and 50/50 Profit Split)
const monthIncome = monthTxs.filter(t => t.type === 'income').reduce((s, t) => s + (Number(t.amount) || 0), 0);
const monthExpense = monthTxs.filter(t => t.type === 'expense' && t.category !== 'withdrawal').reduce((s, t) => s + (Number(t.amount) || 0), 0);

const saldoOperativo = totalInc - totalExp;
const seguroEmpresa = saldoOperativo > 0 ? Math.round(saldoOperativo * 0.20) : 0;
const flujoNetoReal = saldoOperativo > 0 ? saldoOperativo - seguroEmpresa : saldoOperativo;
const retiroPaulo = flujoNetoReal > 0 ? Math.floor(flujoNetoReal * 0.50) : 0;
const reinversion = flujoNetoReal > 0 ? flujoNetoReal - retiroPaulo : 0;
```
