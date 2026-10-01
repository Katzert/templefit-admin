Auditoría adversaria en curso  -  verifico si el sistema realmente blinda la caja.
Ya mapeé los flujos de caja, bóvedas y cortes  -  ahora cierro la verificación del último invariante.
# Dictamen Adversario  -  Ciclo 2: NO APROBADO. Quedan vectores no triviales activos

Verifiqué implementación real en `lib/boliviaFinance.ts`, `types.ts`, `Module18Directory.tsx`, `Module13FinanceLedger.tsx`, `Module1Profile.tsx`, `Module40CorteEjecutivo.tsx`, `Module14Inventory.tsx`.

## 1. ¿Vectores del Ciclo 1 mitigados?

Parcialmente. Lo que sí se corrigió:

- Alta con `pendiente` ya no genera asiento (`Module18Directory.tsx:256-269`  -  solo `if (amountPaid > 0)`).
- Cobro en `Module1Profile.tsx:423` acota con `Math.min` al saldo pendiente. Correcto.
- Snack-consumo ya no duplica ingreso (`Module1Profile.tsx:487-494` solo acumula saldo).

Lo que **no** quedó robusto: la mitigación es unidireccional y por convención, no por invariante forzado.

## 2. ¿Ingreso fantasma / duplicado todavía posible? SÍ

**V1  -  Doble vía sin idempotencia + sobrepago en Libro Diario.** `Module1Profile:handleExecutePayment` capa con `Math.min`, pero `Module13FinanceLedger.tsx:210-234` hace `currentPaid = amountPaidBs + amount` **sin capa**. Un mismo abono cobrado en expediente y luego cargado manual en Libro con `studentId` suma dos veces y puede dejar `amountPaidBs = 400` contra `fee = 200`, con `remaining = 0`. No hay clave de idempotencia ni validación `amount <= pending`.

**V2  -  Edición/eliminación huérfana rompe Inv E.** `Module13FinanceLedger.tsx:149-153` (`handleDelete`) y `160-167` (`saveEditing`) tocan solo `transactions`, jamás revierten `students.amountPaidBs/pendingBalanceBs`. Editar un ingreso `200 → 20` o borrarlo deja la deuda descontada para siempre: caja y expediente divergen. Inverso: `Module1Profile.tsx:275-366` (`handleSaveField`/`handleSaveMultipleFields`) permite editar manual `amountPaidBs`, `pendingBalanceBs`, `paymentStatus` sin asiento. Inv E exige sincronización bidireccional atómica; solo existe en una dirección (creación).

**V3  -  Asiento snack sin bóveda.** `Module1Profile.tsx:521-528` crea tx `snack` sin `paymentMethod` ni `vault`. Cae en la inferencia por defecto a `cajaFisica` aunque se pagó por QR.

**V4  -  Descuento de stock frágil.** `Module13FinanceLedger.tsx:194-205`: match por `includes` de substring + `stock -= 1` fijo, sin cantidad ni SKU. Descripción que no contenga el nombre no descuenta; descripción ambigua descuenta el producto equivocado.

## 3. ¿Corte 50/50 y reserva 20% con desbalances? SÍ, por duplicación de lógica

`calculateExecutiveCut()` en `lib/boliviaFinance.ts:61-81` es matemáticamente correcta y conservativa (`floor` + resto). **Pero jamás se usa.** Grep confirma cero importaciones; `Module40CorteEjecutivo.tsx` duplica la fórmula en 4 lugares (`129-136`, `147-155`, `264-268`, tabla histórica `139-144`). Deriva garantizada.

Divergencias concretas:

- `categoryBreakdown` (`Module40:115`): `founderShare = Math.round(netMargin*0.5)` por área. Suma de redondeos por área ≠ `floor` global. Si alguien suma esa columna, retira de más/menos vs. el corte oficial.
- Tfoot del Libro (`Module13:755`): `Neto = income - expense` **incluyendo** `withdrawal`, mientras KPIs (`82-84`) y Módulo 40 (`38`) lo excluyen. Tras registrar el retiro, el Libro muestra un neto y el Corte otro.
- Guardia anti-doble-retiro frágil por timezone: `alreadyWithdrawn`/`exists` (`Module40:275-294`) comparan `monthKey` local contra `tx.date` generado con `now.toISOString()` (UTC). Cobro 30-sep 21:00 Bolivia = 01-oct UTC: el retiro queda fechado en otro mes y el guardia no lo detecta → **doble retiro en borde de mes**. Misma causa: mes corriente con `new Date()` local vs. fechas UTC en snack/renewal/asistencia.

Negativos bien manejados (`retiro = 0` si `flujo <= 0`), sin pérdida de centavos por el esquema `floor+resto`. No es el problema; el problema es la lógica clonada.

## 4. ¿Blindada la distinción percibido vs. devengado? NO  -  vector más grave

`Module40CorteEjecutivo.tsx` contiene **ingreso fantasma por defecto**:

- `39-40`: `income = 32000, expense = 11600` si no hay txs.
- `66-67`: `banco = 22400, caja = 9600` ficticios.
- `99-110`: `|| 3100`, `|| 15900`, `|| 4500`, `|| 2500` en matriz por área.
- `130-131`: `curInc/curExp` con fallback a `32000/11600`.
- `147-155` (`getExecutiveReportText`): el reporte WhatsApp/portapapeles usa esos fallbacks.

Consecuencia: con DB vacía o mes sin movimientos, el panel sugiere y permite registrar un **retiro Paulo de ~Bs. 8.000 sobre Bs. 32.000 inexistentes**. Viola frontalmente Inv C. El cartel "No Distribuible" en cuentas por cobrar es solo visual; la base de cálculo sí está contaminada por defaults.

## 5. Otros vectores no triviales

**V5  -  Timezone dual.** `getBoliviaTodayISO()` solo se usa en altas y cobros membresía. Todo lo demás (`Module40:34,275`, `Module13:86-90`, snack `Module1:504`, renewal `431`, batch `Module18:57`) usa `new Date()` local o `toISOString()` UTC. Cobros/asistencias 20:00-23:59 en Santa Cruz quedan fechados al día/mes siguiente, MRR y corte mensual se desplazan.

**V6  -  `billingCycle` fuera del contrato.** `Module1Profile:829,959` asigna `cycle = 'bimensual'`, valor que **no existe** en `types.ts:31` (`mensual|quincenal|trimestral|...`). El cálculo de `daysToAdd` cae al default 30 días. `Module18` vía `getPlanDetails` trata Bimensual como `mensual/60 días`. Misma plan, dos renovaciones distintas.

**V7  -  `serviceFeeBs` mutable recalcula deuda retroactiva.** Al ser editable, bajar el fee tras abonos marca `pagado` con menos caja; subirlo fabrica deuda sin asiento. `pendingBalanceBs` es derivado pero almacenado y editable: invariante frágil.

**V8  -  Bóveda por inferencia.** `Module40:45-46` y `Module13:93-106`: legacy sin campos cae a caja por defecto. Arqueo Banco vs. extracto (BCP/Unión/BNB) no cuadra por construcción.

**V9  -  KPI Resiliencia inflado.** `Module14Inventory.tsx:85`: `origin === 'local' || !origin` cuenta como local. Todo ítem sin clasificar infla el % libre de riesgo USD. Debe ser `=== 'local'` estricto + estado `sin clasificar`.

## 6. Dictamen final

**Quedan 9 vectores no triviales activos (V1-V9).** Los Ciclo-1 fueron mitigados solo en el camino feliz; persisten: duplicación por doble vía, edición/eliminación huérfana, retiro sobre datos ficticios por fallbacks, guardia mensual burlable por UTC, bóveda inferida, timezone dual, ciclo `bimensual` fantasma, fee mutable y KPI de resiliencia inflado.

**Condición para Ciclo 3:** eliminar todos los fallbacks numéricos (`0` si no hay datos, jamás `32000`), usar `calculateExecutiveCut()` como única fuente, forzar `getBoliviaTodayISO()` en toda fecha, capar `Module13` con `Math.min(amount, pending)`, revertir expediente en edit/delete o prohibirlos para `membership`, exigir `paymentMethod+vault` en todo tx, y tipar `billingCycle` sin `bimensual` o añadirlo al contrato con sus días.
