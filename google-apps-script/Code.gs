/**
 * ==============================================================================
 * TEMPLEFIT - GOOGLE APPS SCRIPT WEBHOOK DE SINCRONIZACIÓN EN LA NUBE
 * ==============================================================================
 * Este script se vincula a tu hoja de cálculo en Google Drive y funciona como
 * la base de datos en la nube para TempleFit Admin CRM.
 * 
 * Pestañas que crea y gestiona automáticamente:
 * 1. 👥 ATLETAS: Lista clara de los 67+ atletas, planes, estados y saldos en Bs.
 * 2. 💰 FINANZAS: Registro cronológico de ingresos, cuotas y egresos.
 * 3. 📦 INVENTARIO: Control de stock de snack bar, bebidas y suplementos.
 * 4. 💾 RESPALDO_JSON: Copia técnica completa para restaurar el CRM sin pérdidas.
 * ==============================================================================
 */

// Configuración de nombres de pestañas
var SHEET_STUDENTS = "👥 ATLETAS";
var SHEET_FINANCES = "💰 FINANZAS";
var SHEET_INVENTORY = "📦 INVENTARIO";
var SHEET_BACKUP = "💾 RESPALDO_JSON";

/**
 * Endpoint GET: Permite al CRM descargar el último estado guardado al iniciar sesión
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var backupSheet = ss.getSheetByName(SHEET_BACKUP);
    
    if (!backupSheet) {
      return createJsonResponse({
        success: false,
        message: "No hay respaldo previo. La hoja de cálculo es nueva.",
        data: null
      });
    }

    // Leemos el JSON guardado en la celda A2
    var jsonRaw = backupSheet.getRange("A2").getValue();
    if (!jsonRaw || jsonRaw.toString().trim() === "") {
      return createJsonResponse({
        success: false,
        message: "El respaldo técnico está vacío.",
        data: null
      });
    }

    var parsedData = JSON.parse(jsonRaw);
    return createJsonResponse({
      success: true,
      timestamp: backupSheet.getRange("B2").getValue(),
      data: parsedData
    });
  } catch (err) {
    return createJsonResponse({
      success: false,
      error: err.toString()
    });
  }
}

/**
 * Endpoint POST: Recibe la base de datos del CRM, actualiza las pestañas visuales y guarda el respaldo
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, error: "No se recibieron datos en el cuerpo de la petición." });
    }

    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = new Date().toLocaleString("es-BO", { timeZone: "America/La_Paz" });

    // 1. Guardar Snapshot Técnico en RESPALDO_JSON
    saveTechnicalBackup(ss, payload, timestamp);

    // 2. Actualizar pestaña visual de ATLETAS
    if (payload.students && payload.students.length > 0) {
      updateStudentsSheet(ss, payload.students);
    }

    // 3. Actualizar pestaña visual de FINANZAS
    if (payload.transactions && payload.transactions.length > 0) {
      updateFinancesSheet(ss, payload.transactions);
    }

    // 4. Actualizar pestaña visual de INVENTARIO
    if (payload.inventory && payload.inventory.length > 0) {
      updateInventorySheet(ss, payload.inventory);
    }

    return createJsonResponse({
      success: true,
      message: "TempleFit CRM sincronizado con éxito en Google Sheets.",
      timestamp: timestamp,
      athletesCount: payload.students ? payload.students.length : 0,
      transactionsCount: payload.transactions ? payload.transactions.length : 0
    });
  } catch (err) {
    return createJsonResponse({
      success: false,
      error: err.toString()
    });
  }
}

/**
 * Guarda el JSON íntegro para que el CRM pueda recuperarlo sin pérdida de campos
 */
function saveTechnicalBackup(ss, payload, timestamp) {
  var sheet = getOrCreateSheet(ss, SHEET_BACKUP, "#4A5568");
  sheet.clearContents();
  
  sheet.getRange("A1:C1").setValues([["DATOS_JSON_CRUDO", "ULTIMA_ACTUALIZACION", "VERSION_ESQUEMA"]]);
  sheet.getRange("A1:C1").setBackground("#1A202C").setFontColor("#ECC94B").setFontWeight("bold");
  
  sheet.getRange("A2").setValue(JSON.stringify(payload));
  sheet.getRange("B2").setValue(timestamp);
  sheet.getRange("C2").setValue("v5");
}

/**
 * Formatea y actualiza la lista visual de Atletas para Paulo
 */
function updateStudentsSheet(ss, students) {
  var sheet = getOrCreateSheet(ss, SHEET_STUDENTS, "#D69E2E");
  sheet.clear();

  var headers = [
    "ID",
    "Nombre del Atleta",
    "Teléfono / WhatsApp",
    "Plan Actual",
    "Estado",
    "Cuota Mensual (Bs)",
    "Monto Pagado (Bs)",
    "Saldo Pendiente (Bs)",
    "Estado Pago",
    "Próximo Vencimiento",
    "Escuadrón",
    "Fase",
    "Coach Asignado"
  ];

  var rows = [];
  for (var i = 0; i < students.length; i++) {
    var s = students[i];
    rows.push([
      s.id || "",
      s.name || "",
      s.phone || "",
      s.plan || "",
      s.status === "active" ? "ACTIVO" : "INACTIVO",
      s.serviceFeeBs || 0,
      s.amountPaidBs || 0,
      s.pendingBalanceBs || 0,
      (s.paymentStatus || "pendiente").toUpperCase(),
      s.nextDueDate || "",
      s.escuadronId || "",
      s.phase || "",
      s.instructorAssigned || "Paulo Alberto Gil Cuellar (Head Coach)"
    ]);
  }

  // Escribir cabecera
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#0F172A").setFontColor("#F8FAFC").setFontWeight("bold").setFontSize(10);
  headerRange.setHorizontalAlignment("center");

  if (rows.length > 0) {
    var dataRange = sheet.getRange(2, 1, rows.length, headers.length);
    dataRange.setValues(rows);
    dataRange.setFontSize(9);

    // Formato de moneda para columnas F, G, H (Cuota, Pagado, Pendiente)
    sheet.getRange(2, 6, rows.length, 3).setNumberFormat('"Bs" #,##0.00');
    
    // Alineación central para Estado, Pagos y Fechas
    sheet.getRange(2, 5, rows.length, 1).setHorizontalAlignment("center");
    sheet.getRange(2, 9, rows.length, 2).setHorizontalAlignment("center");
  }

  sheet.setFrozenRows(1);
  for (var c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }
}

/**
 * Formatea y actualiza el libro contable de Finanzas
 */
function updateFinancesSheet(ss, transactions) {
  var sheet = getOrCreateSheet(ss, SHEET_FINANCES, "#38A169");
  sheet.clear();

  var headers = [
    "ID Transacción",
    "Fecha",
    "Tipo",
    "Categoría",
    "Monto (Bs)",
    "Método de Pago",
    "ID Alumno",
    "Detalle / Concepto"
  ];

  var rows = [];
  for (var i = 0; i < transactions.length; i++) {
    var t = transactions[i];
    rows.push([
      t.id || "",
      t.date || "",
      (t.type || "").toUpperCase(),
      t.category || "",
      t.amount || 0,
      t.method || "Efectivo",
      t.studentId || "General",
      t.description || ""
    ]);
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#064E3B").setFontColor("#ECFDF5").setFontWeight("bold").setFontSize(10);
  headerRange.setHorizontalAlignment("center");

  if (rows.length > 0) {
    var dataRange = sheet.getRange(2, 1, rows.length, headers.length);
    dataRange.setValues(rows);
    dataRange.setFontSize(9);

    // Formato de moneda en Columna E (Monto)
    sheet.getRange(2, 5, rows.length, 1).setNumberFormat('"Bs" #,##0.00');
    sheet.getRange(2, 2, rows.length, 2).setHorizontalAlignment("center");
  }

  sheet.setFrozenRows(1);
  for (var c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }
}

/**
 * Formatea y actualiza el inventario de Snack Bar y Productos
 */
function updateInventorySheet(ss, inventory) {
  var sheet = getOrCreateSheet(ss, SHEET_INVENTORY, "#3182CE");
  sheet.clear();

  var headers = [
    "ID Producto",
    "Nombre del Producto",
    "Categoría",
    "Costo Unitario (Bs)",
    "Precio de Venta (Bs)",
    "Stock Actual",
    "Stock Mínimo",
    "Estado de Stock"
  ];

  var rows = [];
  for (var i = 0; i < inventory.length; i++) {
    var p = inventory[i];
    var status = (p.stock <= p.minStock) ? "⚠️ STOCK BAJO" : "✅ ÓPTIMO";
    rows.push([
      p.id || "",
      p.name || "",
      (p.category || "").toUpperCase(),
      p.cost || 0,
      p.price || 0,
      p.stock || 0,
      p.minStock || 0,
      status
    ]);
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#1E3A8A").setFontColor("#EFF6FF").setFontWeight("bold").setFontSize(10);
  headerRange.setHorizontalAlignment("center");

  if (rows.length > 0) {
    var dataRange = sheet.getRange(2, 1, rows.length, headers.length);
    dataRange.setValues(rows);
    dataRange.setFontSize(9);

    sheet.getRange(2, 4, rows.length, 2).setNumberFormat('"Bs" #,##0.00');
    sheet.getRange(2, 6, rows.length, 3).setHorizontalAlignment("center");
  }

  sheet.setFrozenRows(1);
  for (var c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }
}

/**
 * Helper para obtener o crear una pestaña con un color de etiqueta distintivo
 */
function getOrCreateSheet(ss, name, tabColor) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (tabColor) {
    sheet.setTabColor(tabColor);
  }
  return sheet;
}

/**
 * Helper para retornar respuesta JSON limpia compatible con CORS
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
