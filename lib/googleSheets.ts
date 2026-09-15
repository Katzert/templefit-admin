'use client';

import { CRMDatabase } from '../types';

const SHEETS_URL_KEY = 'templefit_sheets_webhook_url';
const DEFAULT_SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '';

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let isPushing = false;

/**
 * Obtiene la URL del Webhook de Google Apps Script configurada
 */
export function getGoogleSheetsUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_SHEETS_URL;
  try {
    const saved = localStorage.getItem(SHEETS_URL_KEY);
    if (saved && saved.trim() !== '') return saved.trim();
  } catch (e) {}
  return DEFAULT_SHEETS_URL;
}

/**
 * Guarda o actualiza la URL del Webhook de Google Apps Script
 */
export function setGoogleSheetsUrl(url: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (url && url.trim() !== '') {
      localStorage.setItem(SHEETS_URL_KEY, url.trim());
    } else {
      localStorage.removeItem(SHEETS_URL_KEY);
    }
  } catch (e) {}
}

/**
 * Prueba la conectividad con el Webhook de Google Sheets
 */
export async function testGoogleSheetsConnection(url: string): Promise<{ success: boolean; message: string; data?: any }> {
  if (!url || !url.startsWith('https://script.google.com/')) {
    return {
      success: false,
      message: 'La URL debe ser un enlace de Webhook válido que comience con https://script.google.com/'
    };
  }

  try {
    const fetchUrl = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
    const res = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors',
    });

    if (!res.ok) {
      return {
        success: false,
        message: `El servidor de Google respondió con código de estado HTTP ${res.status}.`
      };
    }

    const data = await res.json();
    if (data && data.success !== undefined) {
      return {
        success: true,
        message: data.message || 'Conexión con Google Sheets verificada con éxito.',
        data: data.data || null
      };
    }

    return {
      success: true,
      message: 'Conectado a Google Sheets, pero la respuesta no tenía el formato esperado.',
      data
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Error de conexión: ${err.message || 'No se pudo contactar a Google Apps Script.'}`
    };
  }
}

/**
 * Envía la base de datos completa del CRM a Google Sheets (con debounce de 1.5s)
 */
export function pushToGoogleSheetsDebounced(db: CRMDatabase): void {
  const url = getGoogleSheetsUrl();
  if (!url) return;

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    pushToGoogleSheets(db).catch(err => {
      console.warn('[Google Sheets Sync] Error al sincronizar en segundo plano:', err);
    });
  }, 1500);
}

/**
 * Realiza el envío directo por POST a Google Apps Script
 */
export async function pushToGoogleSheets(db: CRMDatabase): Promise<boolean> {
  const url = getGoogleSheetsUrl();
  if (!url) return false;

  if (isPushing) return false;
  isPushing = true;

  try {
    // Usamos text/plain para evitar el preflight OPTIONS de CORS en Google Apps Script
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(db),
    });

    if (!res.ok) {
      console.warn('[Google Sheets Sync] Falló el guardado en la nube. HTTP Status:', res.status);
      isPushing = false;
      return false;
    }

    const result = await res.json().catch(() => ({ success: true }));
    isPushing = false;
    return !!(result && result.success !== false);
  } catch (err) {
    console.warn('[Google Sheets Sync] Error de red enviando a Google Sheets:', err);
    isPushing = false;
    return false;
  }
}

/**
 * Descarga el último estado desde Google Sheets
 */
export async function pullFromGoogleSheets(): Promise<CRMDatabase | null> {
  const url = getGoogleSheetsUrl();
  if (!url) return null;

  try {
    const fetchUrl = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
    const res = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors',
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (json && json.success && json.data && json.data.students) {
      return json.data as CRMDatabase;
    }
  } catch (err) {
    console.warn('[Google Sheets Sync] Error al descargar de Google Sheets:', err);
  }
  return null;
}
