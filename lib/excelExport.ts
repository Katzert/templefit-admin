import * as XLSX from 'xlsx';

export interface SheetData {
  sheetName: string;
  data: Record<string, any>[];
}

/**
 * Exporta un conjunto de datos tabular a un archivo de Excel nativo (.xlsx)
 */
export function exportToExcel(data: Record<string, any>[], fileName: string, sheetName: string = 'Datos') {
  if (!data || data.length === 0) {
    alert('No hay datos disponibles para exportar.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31)); // Excel max sheet name 31 chars

  // Ajuste automático de ancho de columnas
  const colWidths = Object.keys(data[0] || {}).map(key => {
    const maxValLen = Math.max(
      key.length,
      ...data.map(row => String(row[key] ?? '').length)
    );
    return { wch: Math.min(Math.max(maxValLen + 2, 10), 50) };
  });
  ws['!cols'] = colWidths;

  const cleanFileName = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
  XLSX.writeFile(wb, cleanFileName);
}

/**
 * Exporta múltiples hojas en un solo libro de Excel (.xlsx)
 */
export function exportWorkbookToExcel(sheets: SheetData[], fileName: string) {
  if (!sheets || sheets.length === 0) {
    alert('No hay hojas disponibles para exportar.');
    return;
  }

  const wb = XLSX.utils.book_new();

  sheets.forEach(({ sheetName, data }) => {
    if (data && data.length > 0) {
      const ws = XLSX.utils.json_to_sheet(data);
      const colWidths = Object.keys(data[0] || {}).map(key => {
        const maxValLen = Math.max(
          key.length,
          ...data.map(row => String(row[key] ?? '').length)
        );
        return { wch: Math.min(Math.max(maxValLen + 2, 10), 50) };
      });
      ws['!cols'] = colWidths;
      XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31));
    }
  });

  const cleanFileName = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
  XLSX.writeFile(wb, cleanFileName);
}

/**
 * Exporta datos a CSV con BOM UTF-8 para compatibilidad directa con Excel en español
 */
export function exportToCSV(data: Record<string, any>[], fileName: string) {
  if (!data || data.length === 0) {
    alert('No hay datos disponibles para exportar.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws, { FS: ';' }); // Usar ';' como separador decimal/columna estándar en Excel español/latino
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName.endsWith('.csv') ? fileName : `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
