Dictamen final en camino  -  verifico cada corrección contra el código.
Verificación preliminar superada  -  ahora busco vectores de fallo restantes.
# DICTAMEN ADVERSARIO  -  CICLO 4
**Veredicto: APROBACIÓN CONDICIONADA (no aprobación final absoluta).**
Los 6 ítems están sustancialmente resueltos y verificados en código. Pero las afirmaciones de "100% / erradicación total / sellado completo" están sobredimensionadas: quedan **3 vectores residuales menores (ninguno P0)** que impiden el sello final hasta su corrección (cada uno es 1-3 líneas).

## Verificación ejecutada

- `npx tsc --noEmit` → **EXIT:0**, cero errores. ✓
- `npm run build` → **EXIT:0**, 5 rutas estáticas. ✓

| Ítem | Resultado | Evidencia |
|---|---|---|
| P0 flujoNeto | **PASS** | `lib/boliviaFinance.ts:59-89` retorna `flujoNeto` + alias `flujoNetoReal` con el mismo valor. `Module40CorteEjecutivo.tsx:138` (`flujoNeto: cut.flujoNeto`), `:160` (`cut.flujoNeto`), `:258` (`flujoNetoReal = executiveCut.flujoNeto`). Sin variables indefinidas. Matemática verificada: `reserva=round(saldo*0.2)`, `flujo=saldo-reserva`, `retiro=floor(flujo*0.5)`, `reinversión=flujo-retiro` → `retiro+reinversión==flujoNeto` siempre; saldo≤0 → todo 0; `Number\|\|0` anti-NaN. |
| P1-1 bimensual 60d | **PASS** | `boliviaFinance.ts:36-37,50-51` (`380/60`, `600/60`); `Module1Profile.tsx:456` (`bimensual?60`); `Module13FinanceLedger.tsx:327` (`bimensual?60`); `Module18Directory.tsx:181` (`planConfig.days` = 60). Todas las vías de renovación/cobro dan 60 días. |
| P1-2 reversión + capping | **PASS núcleo / FAIL lateral menor** | `Module13:148-190` (delete revierte membresía/snack/stock), `:197-273` (saveEditing transiciones completas), `Module1Profile:315-321,363-369` + `:892-902` (`Math.min(fee, max(0,raw))`). Núcleo sellado. Pero ver vectores R1-R2 abajo. |
| P1-3 Bolivia UTC-4 | **PASS núcleo / 1 remanente real** | Vías de cobro/renovación/asistencia/MRR usan `getBoliviaTodayISO`/`addDaysBoliviaISO` (verificado por grep: M13:47,86,328,365; M1:152,454,457,530,573,599; M18:57,183-184; M40:34,89,267,278). `addDaysBoliviaISO` (suma ms + proyección Bolivia) es correcto, sin doble desplazamiento. Pero ver vector R3. |
| P1-4 bóvedas | **NO 100%  -  diverge en dato legacy inconsistente** | Ver vector R4. Para datos canónicos actuales (writers siempre escriben `qr→banco`, `efectivo→cajaFisica`: M13:347, M18:266, M1:459) sí concilian. |
| P2 inventario | **PASS** | Delete `+1` (M13:175-183), transiciones en edición (M13:246-263), simétrico con el decremento unitario del alta (M13:288-300). Matching difuso por subcadena de nombre: frágil pero simétrico; aceptable. |

## Vectores residuales (los 3 impiden el "sello total")

**R1  -  `pendingBalanceBs` editable directo rompe invariante.** `Module1Profile.tsx:323`: `if (field==='pendingBalanceBs') updated.pendingBalanceBs = Number(newValue)`  -  permite pending negativo/inflado sin recalcular `paymentStatus`. Explotabilidad baja (el span `:914` es solo lectura; solo vía programática), pero la rama existe. Fix: aplicar la misma guarda que `amountPaidBs` o eliminar la rama.

**R2  -  Cambio de plan deja `amountPaid/pending` obsoletos.** `Module1Profile.tsx:853-871` → `handleSaveMultipleFields` (`:394-423`, spread sin validación): cambiar Reto 200→EAGE 1200 no recalcula `pendingBalanceBs`/`paymentStatus`. Alcanzable por UI. Fix: recalcular `pending = max(0, fee - paid)` y `paymentStatus` dentro del handler de cambio de plan. Nota adicional: el selector omite `Liderazgo & Ventas`, `Plan Integral Mensual`, `Anual Atleta` (definidos en `getPlanDetails`), inconsistencia menor de catálogo.

**R3  -  UTC remanente con efecto visible nocturno.** `Module18Directory.tsx:953`: `new Date().toISOString().split('T')[0]` (UTC) para el contador `alreadyMarked`, mientras `handleBatchAttendance` escribe con `getBoliviaTodayISO()`. Entre 20:00-23:59 Bolivia el contador lee el día UTC siguiente → "0 presentes" falso o riesgo de doble marcado. Fix 1 línea: `getBoliviaTodayISO()`. (Otros `toISOString` en M12/HomePage/M19/Dashboard son fechas no contables  -  fuera de alcance.)

**R4  -  Filtros de bóveda no idénticos.** `Module40:44` incluye `t.vault==='banco' ||` y `Module13:92-94` no. Un asiento legacy inconsistente `{vault:'banco', paymentMethod:'efectivo'}` se cuenta en **ambas** bóvedas en M40 (doble conteo: banco+caja > ingresos) y solo en caja en M13. La regla de exportación (M13:126) es una tercera variante. Justo el caso "legacy" que el ticket dice sanar. Fix: alinear el filtro bank en M13 con `t.vault==='banco' ||` (o canonicalizar ambos módulos sobre `vault` con fallback a `paymentMethod`).

## Dictamen

P0 desbloqueado, P1-1/P2 y núcleo P1-2/P1-3 verificados, typecheck y build verdes. **Apruebo el pase a producción con reservas**: corregir R1-R4 (estimado <30 min, todos localizados con `archivo:línea` arriba) y entonces sí emitir el sello final. No avalo las frases "coincide al 100%", "erradicación total" ni "completamente selladas" en su redacción actual.
