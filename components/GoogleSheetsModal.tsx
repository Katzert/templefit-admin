'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sheet, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink, 
  Copy, 
  Check, 
  UploadCloud,
  FileSpreadsheet
} from 'lucide-react';
import { 
  getGoogleSheetsUrl, 
  setGoogleSheetsUrl, 
  testGoogleSheetsConnection, 
  pushToGoogleSheets 
} from '../lib/googleSheets';
import { getCRMDatabase } from '../store';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GoogleSheetsModal({ isOpen, onClose }: GoogleSheetsModalProps) {
  const [url, setUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'guide'>('config');

  useEffect(() => {
    if (isOpen) {
      setUrl(getGoogleSheetsUrl());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveAndTest = async () => {
    const trimmed = url.trim();
    setIsTesting(true);
    setTestResult(null);

    setGoogleSheetsUrl(trimmed);

    if (!trimmed) {
      setIsTesting(false);
      setTestResult({
        success: true,
        message: 'Modo local activo (sin sincronización con Google Sheets).'
      });
      return;
    }

    const res = await testGoogleSheetsConnection(trimmed);
    setIsTesting(false);
    setTestResult(res);
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    try {
      const db = getCRMDatabase();
      const ok = await pushToGoogleSheets(db);
      if (ok) {
        setTestResult({
          success: true,
          message: '¡Datos de los 67 atletas, finanzas e inventario enviados exitosamente a Google Sheets!'
        });
      } else {
        setTestResult({
          success: false,
          message: 'No se pudo completar el envío. Verifica que la URL del script sea correcta.'
        });
      }
    } catch (e: any) {
      setTestResult({
        success: false,
        message: `Error al sincronizar: ${e.message}`
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopyInstructions = () => {
    const guideText = `INSTRUCCIONES PARA CONECTAR GOOGLE SHEETS CON TEMPLEFIT CRM:
1. Crea una hoja de cálculo nueva en tu Google Drive con el nombre "TempleFit CRM Maestro".
2. En el menú superior de la hoja, haz clic en: Extensiones > Apps Script.
3. Borra todo lo que esté en el editor y pega el contenido del archivo Code.gs (disponible en tu proyecto templefit-admin/google-apps-script/Code.gs).
4. Haz clic en "Implementar" (botón azul arriba a la derecha) > "Nueva implementación".
5. Selecciona el tipo: "Aplicación web" (ícono de engranaje).
6. Configuración obligatoria:
   - Descripción: TempleFit Sync Webhook
   - Ejecutar como: "Yo" (tu cuenta de Google)
   - Quién tiene acceso: "Cualquier persona" (Anyone)
7. Haz clic en "Implementar", autoriza los permisos de tu cuenta de Google y copia la "URL de la aplicación web".
8. Pega esa URL en el panel de TempleFit y haz clic en "Probar y Guardar".`;

    navigator.clipboard.writeText(guideText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white dark:bg-[#0B0F19] border-2 border-temple-gold/40 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 sm:p-7 shadow-2xl relative space-y-6 text-slate-900 dark:text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider text-temple-navy dark:text-white">
                Sincronización con Google Sheets
              </h2>
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Respaldo en la nube legible para Paulo en su propio Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
            aria-label="Cerrar modal de Google Sheets"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'config'
                ? 'border-temple-gold text-amber-900 dark:text-temple-gold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Conexión Webhook
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 px-3 border-b-2 transition ${
              activeTab === 'guide'
                ? 'border-temple-gold text-amber-900 dark:text-temple-gold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Guía Paso a Paso (3 minutos)
          </button>
        </div>

        {/* Tab 1: Config */}
        {activeTab === 'config' && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-gray-300 mb-2">
                URL del Webhook de Google Apps Script:
              </label>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-2xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-temple-gold"
              />
              <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                Pega aquí la URL generada al publicar tu Google Apps Script como Aplicación Web.
              </p>
            </div>

            {/* Test Result Message */}
            {testResult && (
              <div
                className={`p-4 rounded-2xl text-xs flex items-start gap-3 border ${
                  testResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{testResult.success ? 'Listo' : 'Atención'}</p>
                  <p className="mt-0.5">{testResult.message}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleSaveAndTest}
                disabled={isTesting || isSyncing}
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isTesting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Probar & Guardar Enlace</span>
                  </>
                )}
              </button>

              {url && (
                <button
                  onClick={handleSyncNow}
                  disabled={isTesting || isSyncing}
                  className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-temple-gold to-amber-600 text-black font-black text-xs uppercase tracking-wider shadow-md hover:scale-102 active:scale-98 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Sincronizando...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={16} />
                      <span>Sincronizar Todo Ahora</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px] text-slate-600 dark:text-gray-400 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Pestaña de 67 atletas con cuotas en Bs.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Libro contable y transacciones</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Control de inventario de Snack Bar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Sin expiración de 30 días</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Step-by-step Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
              <p className="font-bold mb-1">¿Cómo configurar la hoja de Google Drive en 3 pasos?</p>
              <p className="text-[11px]">
                Solo se hace una única vez. Todo queda alojado en la cuenta de Google de Paulo sin costos.
              </p>
            </div>

            <ol className="space-y-3 list-decimal list-inside text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
              <li>
                Abre <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-temple-gold underline font-bold inline-flex items-center gap-1">Google Sheets <ExternalLink size={12} /></a> y titúlala: <strong>&quot;TempleFit CRM Maestro&quot;</strong>.
              </li>
              <li>
                Ve al menú: <strong>Extensiones &gt; Apps Script</strong>. Borra el código que aparezca y pega el contenido del archivo <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">Code.gs</code>.
              </li>
              <li>
                Arriba a la derecha, haz clic en el botón azul <strong>Implementar &gt; Nueva implementación</strong>:
                <ul className="list-disc list-inside pl-4 mt-1 space-y-1 text-[11px] text-slate-600 dark:text-gray-400">
                  <li>Tipo: Selecciona <strong>Aplicación web</strong> (ícono de tuerca).</li>
                  <li>Ejecutar como: <strong>Yo</strong> (tu cuenta).</li>
                  <li>Quién tiene acceso: <strong>Cualquier persona</strong> (*Anyone*).</li>
                </ul>
              </li>
              <li>
                Pulsa <strong>Implementar</strong>, autoriza los permisos y copia la <strong>URL de la aplicación web</strong> generada.
              </li>
              <li>
                Regresa a la pestaña <em>&quot;Conexión Webhook&quot;</em> de esta ventana, pega la URL y pulsa <strong>Probar &amp; Guardar</strong>.
              </li>
            </ol>

            <div className="pt-2">
              <button
                onClick={handleCopyInstructions}
                className="w-full py-2.5 px-4 rounded-xl border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                {copiedScript ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                <span>{copiedScript ? '¡Instrucciones Copiadas!' : 'Copiar Guía Completa al Portapapeles'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
