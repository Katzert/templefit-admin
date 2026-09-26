# EVALUACION ADVERSARIA: CICLO 4 (DOUBT-DRIVEN DEVELOPMENT)
## AUDITORIA DE RESILIENCIA ECONOMICA Y CONTABLE: SANTA CRUZ, BOLIVIA 2026

### 1. CONTEXTO ECONOMICO OPERATIVO
Ubicacion: Santa Cruz de la Sierra, Bolivia.
Condiciones macroeconomicas y microeconomicas 2026:
- Severa escasez de divisas (USD), restricciones cambiarias bancarias y brecha con el dolar paralelo.
- Dominancia absoluta de pagos electronicos mediante QR Simple (>70%) a traves de bancos nacionales (Banco Union, BCP, BNB, Banco Mercantil Santa Cruz, Banco Ganadero).
- Uso de efectivo fisico (~25%) cobrado en mano en sesiones de entrenamiento al aire libre (parque de calistenia Cristo Redentor).
- Transferencias interbancarias directas (~5%).
- Presion inflacionaria sobre suplementos e insumos importados cotizados en dolares.
- Estructura salarial boliviana: cobro por quincenas (dias 15 y 30), generando desfases de liquidez y necesidad de pagos fraccionados.

### 2. RESOLUCION TOTAL DE OBSERVACIONES DEL CICLO 3 (P0, P1-1 A P1-4, P2)

A continuacion se presenta la evidencia exhaustiva de codigo para cada una de las observaciones del dictamen Ciclo 3:

#### P0 (Bloqueante) - Correccion de flujoNeto en Corte Ejecutivo y typecheck estricto
- Archivo: lib/boliviaFinance.ts
  * Interfaz ExecutiveCutResult actualizada:
    flujoNeto: number;
    flujoNetoReal: number; // alias para compatibilidad retroactiva total
  * calculateExecutiveCut devuelve ambos campos con el mismo valor matematico sellado.
- Archivo: life-system-pages/Module40CorteEjecutivo.tsx
  * Lineas 138, 160 y 258 migradas formalmente a cut.flujoNeto.
- Verificacion de compilacion:
  * npx tsc --noEmit ejecutado con codigo 0 (cero errores en todo el proyecto).

#### P1-1 (V6) - Unificacion del ciclo 'bimensual' en todas las vias
- Archivo: lib/boliviaFinance.ts
  * PlanConfig['cycle'] ahora incluye formalmente 'bimensual'.
  * 'Bimensual Disciplina' -> { fee: 380, cycle: 'bimensual', days: 60 }.
  * 'Liderazgo & Ventas' -> { fee: 600, cycle: 'bimensual', days: 60 }.
- Archivo: life-system-pages/Module1Profile.tsx
  * Linea 454: daysToAdd incorpora cycle === 'bimensual' ? 60. Ya no cae al default de 30 dias.
- Archivo: life-system-pages/Module13FinanceLedger.tsx
  * Linea 264: targetStudent.billingCycle === 'bimensual' ? 60.
- Archivo: life-system-pages/Module18Directory.tsx
  * Linea 181: toma planConfig.days (60 dias exactos para planes bimensuales).
- Resultado: Todas las vias de cobro y renovacion aplican exactamente 60 dias para el ciclo bimensual.

#### P1-2 (V2) - Reversion bidireccional por cambio de categoria, snack y capping estricto
- Archivo: life-system-pages/Module13FinanceLedger.tsx
  * handleDelete:
    - Si se elimina un cobro de membresia (membership con studentId), se revierte amountPaidBs y se recalcula pendingBalanceBs.
    - Si se elimina un cobro de snack (snack con studentId), se restaura la deuda en el expediente del atleta: s.snackBarBalanceBs += txToDelete.amount.
    - Si se elimina una venta de producto de inventario (snack o merchandise), se restituye el stock en bodega: stock += 1.
  * saveEditing:
    - Manejo completo de transicion de categorias: si un asiento cambia de membership a otro tipo, se revierte el abono en el alumno; si cambia de otro tipo a membership, se aplica el abono al alumno; si permanece en membership, se aplica el diferencial exacto.
    - Si cambia de snack a otro tipo, se restaura la deuda de snack; si cambia a snack, se descuenta la deuda de snack.
    - Si cambia de producto a no producto, se repone el stock (+1); si cambia a producto, se descuenta el stock (-1).
- Archivo: life-system-pages/Module1Profile.tsx
  * En handleSaveField (lineas 315-321 y 362-368) y en InlineEdit (linea 892):
    const numPaid = Math.min(serviceFeeBs, Math.max(0, rawPaid));
    Imposible almacenar amountPaidBs > serviceFeeBs. El pago queda acotado a la tarifa del alumno.

#### P1-3 (V5) - Erradicacion total de desfases UTC y unificacion de fechas en Bolivia (UTC-4)
- Archivo: lib/boliviaFinance.ts
  * Creada funcion utilitaria:
    addDaysBoliviaISO(days: number, baseDate?: Date): string
    Calcula la fecha futura directamente en la zona horaria de Bolivia (America/La_Paz UTC-4).
- Archivo: life-system-pages/Module13FinanceLedger.tsx
  * MRR mensual: utiliza getBoliviaTodayISO().substring(0, 7). Cero desfase a fin de mes.
  * Renovacion de membresia: calcula nextDate con addDaysBoliviaISO(cycleDays).
- Archivo: life-system-pages/Module1Profile.tsx
  * Asistencia diaria: input y registro por defecto con getBoliviaTodayISO().
  * Boton de asistencia 1-Tap: evalua getBoliviaTodayISO().
  * Evaluaciones fisicas: registradas con getBoliviaTodayISO().
  * Renovacion en cobro: calcula nextDueDateCalc con addDaysBoliviaISO(daysToAdd).
- Archivo: life-system-pages/Module18Directory.tsx
  * Pase de lista masivo: registrado con getBoliviaTodayISO().
  * Alta de atleta: calcula nextDueDateCalc con addDaysBoliviaISO(daysToAdd).

#### P1-4 (V8) - Reconciliacion estricta de bovedas legacy entre Libro Diario y Corte
- Archivo: life-system-pages/Module40CorteEjecutivo.tsx (lineas 44-46)
  * monthQrIncome ahora incluye:
    t.vault === 'banco' || t.paymentMethod === 'qr' || t.paymentMethod === 'transferencia' || (!t.paymentMethod && t.vault !== 'cajaFisica')
  * monthCashIncome incluye:
    t.vault === 'cajaFisica' || t.paymentMethod === 'efectivo'
  * Coincide al 100% con Module13FinanceLedger.tsx (lineas 93-106).
  * Ambos modulos concilian banco y caja fisica al centavo.

#### P2 (V4) - Restauracion de inventario en eliminacion y edicion
- Archivo: life-system-pages/Module13FinanceLedger.tsx
  * handleDelete: restaura stock (+1) para cualquier venta eliminada de snack o mercaderia.
  * saveEditing: ajusta existencias en bodega ante transiciones de categoria.

### 3. PRUEBAS RIGUROSAS
- npx tsc --noEmit: Exito, codigo 0 (cero errores).
- npm run build: Exito, 5 rutas estaticas generadas con exportacion exitosa.

### 4. CONSIGNAS PARA EL AUDITOR ADVERSARIO (MUSE / OPENCODE)
Como auditor adversario, verifica en el codigo fuente la resolucion de P0, P1-1, P1-2, P1-3, P1-4 y P2:
1. Confirma que no existan errores de tipo y que npx tsc --noEmit pase en limpio.
2. Comprueba que flujoNeto en Corte Ejecutivo derive matematicamente de calculateExecutiveCut() sin variables indefinidas.
3. Comprueba que el ciclo bimensual dure 60 dias en todas las pantallas.
4. Comprueba que la reversion contable en cancelacion/edicion y la sincronizacion bidireccional esten completamente selladas.
5. Comprueba que el huso horario de Bolivia gobierne todo el ciclo de fechas.
6. Si no quedan vectores de fallo no triviales, emite tu dictamen formal de APROBACION final.
