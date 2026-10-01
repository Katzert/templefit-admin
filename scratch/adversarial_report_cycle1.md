Revisión adversaria  -  Artifact vs CONTRACT. No valido. Solo fallos:

**Invariant C (Percibido vs Devengado)  -  VIOLADO directamente:**
1. `Module18Directory.tsx:96-98,110-118`  -  Asume cobro total al registrar: `amountPaidBs: fee, pendingBalanceBs: 0, paymentStatus: 'pagado'` + crea `initialTx amount: fee` sin verificar si se cobró. Con la realidad descrita (100 Bs. al inscribir + 100 Bs. el 15) esto registra deuda no cobrada como ingreso líquido y la pone disponible para el split. Violación literal de C.
2. `Module1Profile.tsx:175,191`  -  `handleRecordFullPayment` siempre asienta `amount: fee` (default 200), no `currentPending`. Si el saldo pendiente era 50, infla ingreso en 150. Si era 0 pero el guard falló, crea ingreso fantasma.
3. Ningún punto de entrada distingue promesa/deuda de cobro real. No hay campo `receivable` vs `cash`. Todo `income` va al mismo pozo que luego `Module40` reparte.

**Invariant E (Sync bidireccional)  -  ROTO en los 3 escritores:**
4. `Transaction` tiene `studentId?` opcional y `Module18:110-118` y `Module13:133-140` y `Module1:186-193`  -  dos de tres no lo setean (`initialTx` y `tx` sin `studentId`). Ingreso huérfano, imposible reconciliar estudiante<->libro.
5. `Module13:145-152`  -  Auto-renovación solo toca `status` y `renewalDate`. No toca `amountPaidBs, pendingBalanceBs, paymentStatus, lastPaymentDate, serviceFeeBs`. El ledger avanza, el estudiante no. Divergencia garantizada.
6. `Module1:171-182`  -  Sobrescribe `amountPaidBs: fee` en vez de acumular. Destruye historial de parciales. No hay array de cuotas/abonos, el tipo `Student` solo soporta un escalar, incompatible con pagos en quincenas.
7. `Module13` permite crear `income/membership` sin `selectedStudentId`  -  crea ingreso sin contraparte. `Module18` crea estudiante + tx en dos pasos con `read-modify-write` sobre `getCRMDatabase()` sin transacción: si falla `save`, quedan a medias.

**Invariant D (Segregación liquidez)  -  IMPOSIBLE con este schema:**
8. `Transaction` no tiene `paymentMethod: 'QR'|'efectivo'|'transferencia' | 'banco'` ni `vault: 'cajaFisica'|'banco'` ni `location`. Con 70% QR / 25% efectivo en Parque Urbano / 5% transferencia, el coach no puede distinguir caja en mano de banco. El tipo lo hace inexpresable.
9. Ningún `submit` pide método de pago. Todo el efectivo y QR caen al mismo `amount`. Reconciliación caja vs banco no existe.

**Invariant A + B (20% reserva, 50/50)  -  Cálculo incorrecto y no enforced:**
10. `Module40:203-204` calcula `monthIncome/monthExpense` pero `206` usa `totalInc/totalExp`  -  variables distintas. Si `total` es histórico acumulado, la reserva del mes se calcula sobre base equivocada. Si son alias, código muerto que confunde.
11. `207: Math.round(saldo*0.20)` + `209: Math.floor(flujo*0.50)`  -  redondeo mixto rompe "Exactamente 20%" y "Exactamente 50/50". `round` vs `floor` pierde/gana 1 Bs. por redondeo. `reinversion = flujo - retiro` oculta el error pero ya no es 50/50 exacto.
12. Es solo display. Nada impide retirar antes de reservar, ni crea asientos de `reserve/withdrawal`. `expense && category !== 'withdrawal'` excluye retiros del gasto pero no evita doble reparto si se ejecuta el corte dos veces.
13. Base contaminada: como C ya está violado, el 20%/50% se reparte sobre deuda no cobrada.

**Invariant F (Resiliencia local)  -  No modelado:**
14. `InventoryItem:60-68` solo `cost/price/stock/minStock` + `category: snack|apparel|suplementos`. Sin `origin: local|importado`, sin `insumos`, sin `unidad`, sin `indexadoUSD: boolean`. No se puede priorizar Sal de Colchani/miel/bicarbonato vs suplemento importado. `cost/price` como `number` sin moneda ni fecha ignora inflación FX.

**Realidad operativa Santa Cruz 2026  -  Supuestos falsos:**
15. `Module18:78-80`  -  `fee=200, cycle='mensual'` por defecto. Solo matchea 2 de 11 planes. `Trimestral, Semestral, Anual, CristoFit Camp, Coaching 1a1, Pase Diario, Formación E.A.G.E., Liderazgo & Ventas` caen todos a `200 mensual`. Tarificación falsa.
16. `billingCycle?: mensual|trimestral|semestral|anual|sesion`  -  falta `quincenal/parcial`. El tipo no admite el flujo dominante descrito.
17. Vencimientos siempre `Date.now()+30d` (`Module18:83, Module13:148, Module1:168`). Ignora quincenas (10-15 y fin de mes) y ciclos trimestral/semestral/anual/sesión. Renovar un `Anual` a +30 días lo marca vencido falsamente; renovar un `Pase Diario` a +30 días lo regala.
18. Fechas con `new Date().toISOString().split('T')[0]`  -  UTC, no America/La_Paz (UTC-4). Cobro nocturno en SCZ cambia de día. Rompe cortes de quincena y `toLocaleString('es-BO')` nunca se aplica en el artifact.
19. `phone: newAthlete.phone || '+591'`  -  teléfono placeholder válido. `if (!newAthlete.name) return`  -  sin trim, sin duplicados, sin email requerido. Permite `std-Date.now()` duplicados en doble-click.

**Acoplamiento oculto / estado compartido / modos de fallo:**
20. `instructorAssigned` seteado en `Module18:90` pero no existe en `interface Student`  -  divergencia tipo vs runtime. Compila solo por `...` o `any`.
21. `Module1:163,192`  -  usa `pendingBalanceBs, paymentStatus, plan, name, serviceFeeBs` del closure local, no de `selectedStudent`/db. Si el perfil cambió de alumno, asienta el cobro con nombre/plan del alumno anterior.
22. Guard `Module1:164`: `currentPending <=0 && paymentStatus==='pagado'` mezcla `selectedStudent.pending` con `paymentStatus` local. Estado rancio permite doble cobro o bloqueo.
23. IDs `tx-${Date.now()}` y `std-${Date.now()}` colisionan en creación rápida; `Math.random().substring` no es unicidad. Sin idempotencia: doble submit = doble ingreso + doble renovación.
24. `submitTransaction:127` valida `amount<=0` pero no tope, no NaN de `Number('')`, no sobrepago, no monto parcial vs saldo. Acepta `999999` como membresía y renueva igual.
25. `getCRMDatabase()/saveCRMDatabase()` + `db.transactions=[tx,...]` es read-modify-write global sin lock. Dos pestañas/coaches (caja física + QR) pierden escrituras.
