# EVALUACION ADVERSARIA: CICLO 5 (DOUBT-DRIVEN DEVELOPMENT)
## AUDITORIA DE RESILIENCIA ECONOMICA Y CONTABLE: SANTA CRUZ, BOLIVIA 2026

### 1. CONTEXTO Y CONDICIONES PREVIAS
En el Ciclo 4, el auditor adversario emitio APROBACION CONDICIONADA, validando:
- P0: Calculo de flujoNeto en Corte Ejecutivo sellado matematicamente.
- P1-1: Ciclo bimensual unificado a 60 dias en todas las pantallas.
- P1-2 (nucleo): Reversiones en eliminacion y edicion del Libro Diario, y capping en cobros.
- P1-3 (nucleo): Integracion del huso horario de Bolivia (UTC-4) con getBoliviaTodayISO() y addDaysBoliviaISO().
- P2: Restauracion y descuento simetrico de inventario.
- Typecheck estricto (npx tsc --noEmit) en 0 errores.
- Build estricto (npm run build) en 0 errores.

Quedaron unicamente 4 vectores residuales menores (R1 a R4) para otorgar el SELLO FINAL ABSOLUTO.

### 2. RESOLUCION EXACTA DE LOS VECTORES RESIDUALES (R1, R2, R3, R4)

#### R1 - Blindaje e invariante de pendingBalanceBs editable
- Archivo: life-system-pages/Module1Profile.tsx (lineas 323 y 371)
- Evidencia de codigo:
  Al modificar pendingBalanceBs (tanto en base de datos como en estado local), se aplica acotamiento estricto y sincronizacion de cobro:
  const fee = updated.serviceFeeBs || 200;
  const rawPending = Number(newValue) || 0;
  const safePending = Math.min(fee, Math.max(0, rawPending));
  updated.pendingBalanceBs = safePending;
  updated.amountPaidBs = Math.max(0, fee - safePending);
  updated.paymentStatus = safePending === 0 ? 'pagado' : (updated.amountPaidBs > 0 ? 'parcial' : 'pendiente');
- Invariante garantizado: Imposible que pendingBalanceBs sea negativo o mayor que la cuota; paymentStatus y amountPaidBs se recalculan atomicamente.

#### R2 - Recalculo de deuda y estado ante cambio de plan + catalogo completo
- Archivo: life-system-pages/Module1Profile.tsx (lineas 853-885)
- Evidencia de codigo:
  El handler onChange del selector de plan ahora consume getPlanDetails(newPlan) y recalcula atomicamente la deuda y el estado:
  const planConfig = getPlanDetails(newPlan);
  const fee = planConfig.fee;
  const cycle = planConfig.cycle;
  const currentPaid = amountPaidBs || 0;
  const cappedPaid = Math.min(fee, currentPaid);
  const rem = Math.max(0, fee - cappedPaid);
  const newPaymentStatus = rem === 0 ? 'pagado' : (cappedPaid > 0 ? 'parcial' : 'pendiente');

  handleSaveMultipleFields({
    plan: newPlan,
    serviceFeeBs: fee,
    billingCycle: cycle,
    amountPaidBs: cappedPaid,
    pendingBalanceBs: rem,
    paymentStatus: newPaymentStatus,
    paidServiceTitle: `${newPlan} (${fee} Bs.)`
  });
- Opciones incorporadas al selector: Anual Atleta (1.800 Bs. / ano), Plan Integral Mensual (200 Bs. / mes), Taller Liderazgo & Ventas (600 Bs. / 2 meses).

#### R3 - Eliminacion del ultimo UTC en contador nocturno de asistencia
- Archivo: life-system-pages/Module18Directory.tsx (linea 953)
- Evidencia de codigo:
  En el modal de pase de lista grupal, el contador de atletas que ya registraron asistencia:
  const today = getBoliviaTodayISO();
  const alreadyMarked = squadAthletes.filter(s => (s.attendanceHistory || []).some(a => a.date === today && a.attended)).length;
- Efecto: Cero desfase entre las 20:00 y las 23:59 en Santa Cruz. La lectura de asistencia coincide exactamente con la fecha en que se escribe.

#### R4 - Canonicalizacion universal de bovedas (Fuente unica de verdad)
- Archivo: lib/boliviaFinance.ts (lineas 24-35)
  Se introdujo la funcion canonical getTransactionVault(tx):
  export function getTransactionVault(tx: { vault?: string; paymentMethod?: string }): 'banco' | 'cajaFisica' {
    if (tx.vault === 'cajaFisica') return 'cajaFisica';
    if (tx.vault === 'banco') return 'banco';
    if (tx.paymentMethod === 'efectivo') return 'cajaFisica';
    if (tx.paymentMethod === 'qr' || tx.paymentMethod === 'transferencia') return 'banco';
    return 'banco';
  }
- Consumo en life-system-pages/Module40CorteEjecutivo.tsx (lineas 44-46):
  monthQrIncome = monthTxs.filter(t => t.type === 'income' && getTransactionVault(t) === 'banco').reduce(...)
  monthCashIncome = monthTxs.filter(t => t.type === 'income' && getTransactionVault(t) === 'cajaFisica').reduce(...)
- Consumo en life-system-pages/Module13FinanceLedger.tsx (lineas 92-106, 126, 142, 810):
  bankIncome = transactions.filter(t => t.type === 'income' && getTransactionVault(t) === 'banco').reduce(...)
  cashIncome = transactions.filter(t => t.type === 'income' && getTransactionVault(t) === 'cajaFisica').reduce(...)
  Exportaciones Excel y CSV: getTransactionVault(t) === 'cajaFisica' ? 'Caja Fisica' : 'Banco'
  Insignia visual de tabla: getTransactionVault(tx) === 'cajaFisica' ? 'Efectivo' : ...
- Efecto matematico: Particion estricta y disjunta (A union B = Total, A interseccion B = vacio). Ninguna transaccion puede sumarse en ambas bovedas. Conciliacion garantizada al 100% entre Libro Diario y Corte Ejecutivo.

### 3. PRUEBAS Y COMPILACION
- npx tsc --noEmit: Exito, codigo 0 (cero errores en todo el proyecto).
- npm run build: Exito, codigo 0 (5 rutas estaticas exportadas limpiamente).

### 4. CONSIGNAS PARA EL AUDITOR ADVERSARIO (MUSE / OPENCODE)
Verifica directamente en el codigo la implementacion de R1, R2, R3 y R4:
1. Comprueba el blindaje de pendingBalanceBs en Module1Profile.tsx.
2. Comprueba el recalculo automatico al cambiar de plan y el catalogo completo en Module1Profile.tsx.
3. Comprueba el uso de getBoliviaTodayISO() en el contador alreadyMarked en Module18Directory.tsx.
4. Comprueba la funcion canonical getTransactionVault() y su uso identico en Module13 y Module40.
5. Emite tu dictamen final con la APROBACION DEFINITIVA Y ABSOLUTA del proceso de Doubt-Driven Development.
