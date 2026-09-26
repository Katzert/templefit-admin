export interface SheetData {
  sheetName: string;
  data: Record<string, any>[];
}

/**
 * Sanea el nombre de la hoja segun reglas estrictas de Excel
 */
function sanitizeSheetName(name: string): string {
  return name.replace(/[:\\/?*\[\]]/g, '').trim().substring(0, 31) || 'Datos';
}

/**
 * Exporta un conjunto de datos tabular a un archivo de Excel nativo (.xlsx) con carga dinamica
 */
export async function exportToExcel(data: Record<string, any>[], fileName: string, sheetName: string = 'Datos') {
  if (typeof window === 'undefined') return;
  if (!data || data.length === 0) {
    console.warn('No hay datos disponibles para exportar.');
    return;
  }

  try {
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    const cleanSheetName = sanitizeSheetName(sheetName);
    XLSX.utils.book_append_sheet(wb, ws, cleanSheetName);

    // Ajuste automatico de ancho de columnas
    const colWidths = Object.keys(data[0] || {}).map(key => {
      const maxValLen = Math.max(
        key.length,
        ...data.slice(0, 100).map(row => String(row[key] ?? '').length)
      );
      return { wch: Math.min(Math.max(maxValLen + 2, 10), 45) };
    });
    ws['!cols'] = colWidths;

    const safeFileName = fileName.replace(/[/\\?%*:|"<>]/g, '_').trim();
    const cleanFileName = safeFileName.endsWith('.xlsx') ? safeFileName : `${safeFileName}.xlsx`;
    XLSX.writeFile(wb, cleanFileName);
  } catch (err) {
    console.error('Error al generar archivo Excel (.xlsx):', err);
  }
}

/**
 * Exporta datos a CSV con BOM UTF-8 y retraso de limpieza de Blob URL para compatibilidad movil
 */
export async function exportToCSV(data: Record<string, any>[], fileName: string) {
  if (typeof window === 'undefined') return;
  if (!data || data.length === 0) {
    console.warn('No hay datos disponibles para exportar.');
    return;
  }

  try {
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws, { FS: ';' });
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeFileName = fileName.replace(/[/\\?%*:|"<>]/g, '_').trim();
    link.setAttribute('href', url);
    link.setAttribute('download', safeFileName.endsWith('.csv') ? safeFileName : `${safeFileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Limpieza segura del Blob URL retrasada para iOS Safari y navegadores moviles
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
      } catch (e) {}
    }, 2000);
  } catch (err) {
    console.error('Error al generar archivo CSV:', err);
  }
}
