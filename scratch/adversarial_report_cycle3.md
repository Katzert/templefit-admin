Auditoría adversarial Ciclo 3 en curso  -  verificando blindajes V1-V9 contra la evidencia de código.
He detectado fisuras críticas bajo las mitigaciones declaradas  -  ejecuto verificación técnica final antes del dictamen.
# DICTAMEN ADVERSARIO CICLO 3: **RECHAZADO  -  NO APROBACIÓN**

Actúo como auditor adversario (Muse/OpenCode). Verifiqué evidencia de código contra invariantes A-G. **El cierre del Doubt-Driven Development queda DENEGADO.** Existe al menos 1 vector P0 que rompe compilación y caja, más 4 vectores P1 no triviales remanentes.

## P0  -  Bloqueante: Corte Ejecutivo roto (`flujoNetoReal` inexistente)

`lib/boliviaFinance.ts:53-60` define `ExecutiveCutResult { ..., flujoNeto, ... }`. No existe `flujoNetoReal`.

`life-system-pages/Module40CorteEjecutivo.tsx` lo usa en 4 sitios:

- `138`: `flujoNeto: cut.flujoNetoReal`
- `160`: `cut.flujoNetoReal.toLocaleString`
- `258`: `executiveCut.flujoNetoReal`
- `138,239` en `historicalFlow` mes en curso

Verificación ejecutada:

```
npx tsc --noEmit
error TS2551: Property 'flujoNetoReal' does not exist on type 'ExecutiveCutResult' (x4, líneas 138,160,258)
```

Consecuencias:

1. La afirmación `§4 npm run build ÉXITO` es **falsa**. El build estricto falla.
2. En runtime `flujoNetoReal === undefined` → `undefined.toLocaleString('es-BO')` en `160,258,547` lanza `TypeError` y deja en `Bs. undefined` el retiro 50%, flujo neto y reporte WhatsApp. Compromete directamente Invariantes A y B.
3. La "erradicación de fallbacks ficticios" queda invalidada: el mes en curso de `historicalFlow` computa sobre `undefined`.

**Fix exigido:** renombrar todo a `flujoNeto` o extender la interfaz. Re-ejecutar `tsc --noEmit && npm run build`.

## P1-1  -  V6 no cerrado: `bimensual` diverge entre vías

- `types.ts:31` OK: incluye `'quincenal'|'bimensual'`.
- `lib/boliviaFinance.ts:20` **omite** `'bimensual'` en `PlanConfig['cycle']`, y `30-31`: `'Bimensual Disciplina' → { cycle:'mensual', days:60 }`  -  incoherente tipo vs días.
- `Module13FinanceLedger.tsx:264` sí mapea `bimensual→60`.
- `Module1Profile.tsx:454`: `quincenal?15 : trimestral?90 : semestral?180 : sesion?1 : 30`  -  **`bimensual` cae a 30**. Renovación anticipada 30 días, cobro indebido y breach de contrato.
- `Module18Directory.tsx:181` usa `planConfig.days` (60)  -  diverge de Module1 según vía de cobro.

Viola Invariante E (sincronización homogénea).

## P1-2  -  V2 no cerrado: huérfanos por cambio de categoría + snack sin reversión + `amountPaid` sin cap

1. **Cambio de categoría huérfano:** `Module13:189` solo ajusta expediente si `oldTx.category==='membership'`. Pero el editor `687-700` permite cambiar `membership→snack/operations`. Si se cambia, el abono queda en `student.amountPaidBs` sin asiento respaldo. Sin reversión.
2. **Borrado snack sin reversión:** `Module13:149-166` solo revierte `membership`. `Module1Profile:546-556` crea `tx snack con studentId`. Borrarlo no hace `snackBarBalanceBs += amount`  -  saldo artificialmente bajo, el atleta conserva el pago sin caja.
3. **`amountPaidBs` editable sin cap:** `Module1Profile:315-321` (`handleSaveField`) y `889-899` (InlineEdit) hacen `pending=max(0,fee-newPaid)` pero no `newPaid=min(fee,newPaid)`. Permite `paid=1000 > fee=200`, estado `pagado` con pagado inflado. `saveEditing:195` en Ledger sí capea  -  inconsistente.

## P1-3  -  V5 no cerrado: persiste `UTC` fuera del guard

Afirmación "toda fecha usa `getBoliviaTodayISO()`" falsa:

- `Module13:86-87`: `MRR` usa `new Date().getFullYear()/getMonth()` local navegador  -  en Vercel UTC corre al mes siguiente 21:00-23:59 Santa Cruz.
- `Module13:265`, `Module1Profile:455`, `Module18:184`: `new Date(Date.now()+days*...).toISOString().split('T')[0]` para `renewalDate/nextDueDate`  -  base UTC, off-by-one en borde.
- `Module1Profile:152,571,597,763,1505`, `Module12:177,202`, `Module19:105`: asistencias/leads con `toISOString` UTC.

Solo el guard anti-doble-retiro en `Module40:267,278` usa Bolivia. El resto del dominio fecha sigue dual.

## P1-4  -  V8 inconsistente: legados clasifican opuesto

- `Module13:94,97`: legacy `!paymentMethod → banco`.
- `Module40:44-45`: legacy `!vault && !paymentMethod → cajaFisica` (`monthCashIncome`).
- Mismo asiento suma a Banco en Libro y a Caja en Corte. Segregación Invariante D no reconcilia. Falta migración de legados o default único.

## P2  -  V4 parcial

`Module13:223-237` decrementa 1 unidad con check `stock>0`  -  OK creación. Pero `handleDelete/saveEditing` no restauran stock. Borrar venta deja inventario permanentemente -1.

## Veredicto

- V1, V3, V7, V9: **aceptados** (cap `Math.min` en `Module13:253`, vault explícito en `Module1:529,557`, recalc `353-370`, filtro `origin==='local'` en `Module14:85`).
- V2, V5, V6, V8: **parcialmente mitigados, no cerrados**.
- Mitigación crítica adicional: **rechazada** por P0  -  el Corte deriva de `undefined`, no del CRM real.

**No se emite aprobación. Se exige Ciclo 4** con: renombrar `flujoNetoReal→flujoNeto`, unificar `daysToAdd` + `PlanConfig` con `bimensual`, reversión por cambio de categoría y de snack, cap `amountPaid≤fee`, unificar fechas a `getBoliviaTodayISO()`, default único de bóveda legacy, y `tsc --noEmit` limpio como prueba.
