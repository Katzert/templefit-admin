# EVALUACION ADVERSARIA: CICLO 2 (DOUBT-DRIVEN DEVELOPMENT)
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

### 2. REGLAS E INVARIANTES DEL SISTEMA
1. Invariante A (Fondo de Reserva 20%): Todo saldo operativo positivo (Ingresos percibidos menos Gastos operativos) debe aportar exactamente el 20% como reserva de emergencia intocable.
2. Invariante B (Distribucion 50/50 Estricta): El flujo neto restante (80%) se divide exactamente en 50% retiro para el fundador (Paulo Gil) y 50% reinversion para el gimnasio. Formula exacta de conservacion:
   retiroPaulo = Math.floor(flujoNeto * 0.50)
   reinversion = flujoNeto - retiroPaulo
   No se pierde ni un solo centavo de Boliviano por redondeo.
3. Invariante C (Principio de Caja Percibida vs Devengada): Solo el dinero efectivamente percibido (cobrado por QR o efectivo en caja) ingresa al Libro Diario de transacciones y forma parte del calculo de utilidades. Las cuotas por cobrar (deuda de atletas en la calle) se registran como activos exigibles devengados en el expediente del alumno, pero estan ESTRICTAMENTE EXCLUIDAS de la base de retiro de Paulo.
4. Invariante D (Segregacion de Liquidez y Bovedas): Se distingue contablemente el saldo en Boveda Banco (QR / transferencias) del saldo en Boveda Caja Fisica (billetes en parque).
5. Invariante E (Sincronizacion Bidireccional): Al registrar un cobro de membresia (sea total o abono de quincena), se descuenta automaticamente la deuda del atleta y se genera el asiento correspondiente con metodo de pago y boveda de destino.
6. Invariante F (Resiliencia de Suministros): Se prioriza la produccion local (ElectroHidra con sal rosada boliviana, curcuma de los llanos, confeccion textil local) para blindar el margen operativo frente a la devaluacion de insumos importados en USD.
7. Invariante G (Formato Monetario): Toda expresion monetaria utiliza el simbolo "Bs." y formateo con separador de miles boliviano (`toLocaleString('es-BO')`).

### 3. IMPLEMENTACIONES REALIZADAS TRAS EL CICLO 1
1. lib/boliviaFinance.ts:
   - Zona horaria oficial America/La_Paz (UTC-4) con getBoliviaTodayISO().
   - calculateExecutiveCut(): calcula exactamente saldo operativo, 20% reserva, y split 50/50 matematicamente sellado.
   - formatBs(): normalizacion de moneda en Bolivianos.
2. types.ts:
   - paymentMethod: 'qr' | 'efectivo' | 'transferencia'.
   - vault: 'cajaFisica' | 'banco'.
   - studentId: asociacion de la transaccion con el expediente del atleta.
   - origin: 'local' | 'importado'.
   - billingCycle: anadido soporte 'quincenal'.
3. Module18Directory.tsx:
   - Registro de atletas con estado de pago ('pagado', 'parcial', 'pendiente').
   - Seleccion de canal de pago inicial ('qr', 'efectivo', 'transferencia').
   - ELIMINADO el ingreso fantasma: si el atleta queda con saldo pendiente o no paga al momento, solo se registra en su expediente la cuenta por cobrar; a caja solo entra el efectivo o QR realmente abonado.
4. Module13FinanceLedger.tsx:
   - Formulario de nuevo asiento con selector de metodo de pago ('qr', 'efectivo', 'transferencia') y boveda automatica.
   - KPIs de tesoreria segregados: Liquidez Banco (QR) vs Liquidez Caja Fisica (Efectivo).
   - Columna visual en la tabla para identificar canal y boveda.
   - Sincronizacion contable: si una transaccion de ingreso corresponde a membresia de un atleta, actualiza y descuenta la deuda en su expediente de forma atomica.
   - Exportacion a Excel y CSV con columna de metodo de pago.
5. Module1Profile.tsx:
   - Modal especializado de cobro de membresia (isPaymentModalOpen).
   - Opciones rapidas: Saldo Total o Media Quincena.
   - Selector de canal (QR Simple Bolivia, Efectivo Parque, Transferencia Directa).
   - Eliminado el bug de cobrar la cuota completa cuando el alumno ya habia dado un anticipo. El cobro esta estrictamente acotado al saldo pendiente real.
   - Registro automatico de transaccion con metodo, boveda y studentId.
6. Module40CorteEjecutivo.tsx:
   - Panel de control con desglose de tesoreria en 3 columnas:
     * Boveda Banco (QR Simple / Transferencias): Dinero en bancos.
     * Boveda Caja Fisica (Efectivo Parque): Billetes en mano.
     * Cuentas por Cobrar (Deuda de Atletas): Cuotas en la calle, claramente etiquetadas como NO DISTRIBUIBLES.
   - Calculo de retiro de Paulo 50% ejecutado EXCLUSIVAMENTE sobre flujo percibido.
   - Reporte para WhatsApp y portapapeles con desglose completo de tesoreria.
7. Module14Inventory.tsx:
   - Campo de origen ('local' vs 'importado') en tabla y formulario de edicion.
   - Metrica KPI en cabecera: % Resiliencia Local (articulos libres de riesgo por dolarizacion o inflacion de importaciones).
   - Catalogo inicial en store.ts actualizado con tags correspondientes.
8. Compilacion y pruebas:
   - npm run build ejecutado con codigo de salida 0 sin ningun error de TypeScript o empaquetado.

### 4. TAREAS PARA EL AUDITOR ADVERSARIO (MUSE / OPENCODE)
Como auditor adversario implacable, somete la implementacion a un escrutinio riguroso:
1. Revisa los vectores de fallo identificados en el Ciclo 1. ¿Fueron todos mitigados de forma robusta o queda alguna brecha latente?
2. ¿Existe alguna posibilidad de que un operador registre un ingreso fantasma o duplique un ingreso al sincronizar cobros entre el expediente y el libro diario?
3. ¿Puede el calculo de corte 50/50 o la reserva del 20% generar desbalances contables, saldos negativos indebidos o perdida de precision?
4. ¿Esta completamente blindada la distincion entre ingresos percibidos y cuentas devengadas para que Paulo nunca retire dinero no cobrado?
5. ¿Existe algun otro vector de fallo NO TRIVIAL relativo a la economia de Santa Cruz, Bolivia o a la arquitectura contable del sistema?
6. Emite un dictamen final indicando si quedan o no vectores no triviales activos.
