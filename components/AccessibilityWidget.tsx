'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Type, 
  Contrast, 
  ZapOff, 
  Link, 
  RotateCcw, 
  X, 
  Sliders, 
  Check, 
  Maximize2, 
  FileText,
  MousePointer
} from 'lucide-react';

interface A11ySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  dyslexicFont: boolean;
  highContrast: boolean;
  monochrome: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
  textSpacing: boolean;
  readingRuler: boolean;
  bigCursor: boolean;
}

const defaultSettings: A11ySettings = {
  fontSize: 'normal',
  dyslexicFont: false,
  highContrast: false,
  monochrome: false,
  highlightLinks: false,
  stopAnimations: false,
  textSpacing: false,
  readingRuler: false,
  bigCursor: false,
};

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(defaultSettings);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('templefit_admin_a11y_prefs');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch (e) {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!settings.readingRuler) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingRuler]);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('a11y-font-lg', 'a11y-font-xl');
    if (settings.fontSize === 'large') root.classList.add('a11y-font-lg');
    if (settings.fontSize === 'xlarge') root.classList.add('a11y-font-xl');

    root.classList.toggle('a11y-dyslexic', settings.dyslexicFont);
    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    root.classList.toggle('a11y-monochrome', settings.monochrome);
    root.classList.toggle('a11y-highlight-links', settings.highlightLinks);
    root.classList.toggle('a11y-stop-animations', settings.stopAnimations);
    root.classList.toggle('a11y-text-spacing', settings.textSpacing);
    root.classList.toggle('a11y-big-cursor', settings.bigCursor);

    try {
      localStorage.setItem('templefit_admin_a11y_prefs', JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  const updateSetting = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const activeCount = Object.entries(settings).filter(([key, val]) => {
    if (key === 'fontSize') return val !== 'normal';
    return val === true;
  }).length;

  return (
    <>
      {/* Reading Ruler */}
      {settings.readingRuler && (
        <div 
          className="fixed left-0 right-0 h-10 bg-amber-400/20 border-y-2 border-amber-500 pointer-events-none z-[9999] shadow-2xl transition-all duration-75"
          style={{ top: `${mouseY - 20}px` }}
          aria-hidden="true"
        />
      )}

      {/* Floating Trigger Button */}
      <aside aria-label="Herramientas de accesibilidad">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="fixed bottom-5 left-5 z-[990] min-w-[48px] min-h-[48px] p-3 rounded-full bg-temple-gold hover:bg-temple-gold-bright text-temple-navy-dark dark:text-black font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-amber-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500"
          aria-label="Abrir panel de accesibilidad A11y (Alt + A)"
          aria-expanded={isOpen}
          aria-controls="a11y-modal-drawer"
          title="Herramientas de Accesibilidad (Alt + A)"
        >
          <Sliders size={22} aria-hidden="true" className="animate-spin-slow" />
          <span className="hidden sm:inline-block text-xs font-black uppercase tracking-wider pr-1">A11y</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-temple-navy text-temple-gold text-[10px] font-black flex items-center justify-center absolute -top-1 -right-1 shadow-md">
              {activeCount}
            </span>
          )}
        </button>
      </aside>

      {/* A11y Drawer Panel */}
      {isOpen && (
        <div 
          id="a11y-modal-drawer"
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-start p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-admin-panel-title"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white dark:bg-[#0B0F19] text-temple-navy dark:text-white border-2 border-temple-gold/40 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 shadow-2xl relative space-y-6 animate-in slide-in-from-bottom duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-temple-gold/15 text-temple-gold border border-temple-gold/30">
                  <Sliders size={20} />
                </div>
                <div>
                  <h3 id="a11y-admin-panel-title" className="text-base font-black uppercase tracking-wider text-temple-navy dark:text-white">
                    Accesibilidad (A11y)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400">Estándar WCAG 2.1 AA • Panel CRM</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-temple-navy dark:hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
                aria-label="Cerrar panel de accesibilidad"
              >
                <X size={18} />
              </button>
            </div>

            {/* Controls Grid */}
            <div className="space-y-4">
              {/* 1. Font Size */}
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Type size={16} className="text-temple-gold" />
                    Tamaño del Texto
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 font-bold uppercase">
                    {settings.fontSize === 'normal' ? '100%' : settings.fontSize === 'large' ? '115%' : '130%'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateSetting('fontSize', 'normal')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border ${
                      settings.fontSize === 'normal'
                        ? 'bg-temple-gold text-black border-temple-gold font-black shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-gray-300 border-transparent hover:border-black/10 dark:hover:border-white/10'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => updateSetting('fontSize', 'large')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border ${
                      settings.fontSize === 'large'
                        ? 'bg-temple-gold text-black border-temple-gold font-black shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-gray-300 border-transparent hover:border-black/10 dark:hover:border-white/10'
                    }`}
                  >
                    Grande
                  </button>
                  <button
                    onClick={() => updateSetting('fontSize', 'xlarge')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 border ${
                      settings.fontSize === 'xlarge'
                        ? 'bg-temple-gold text-black border-temple-gold font-black shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-gray-300 border-transparent hover:border-black/10 dark:hover:border-white/10'
                    }`}
                  >
                    Extra
                  </button>
                </div>
              </div>

              {/* 2. Dyslexia Friendly & Spacing */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => updateSetting('dyslexicFont', !settings.dyslexicFont)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                    settings.dyslexicFont
                      ? 'bg-temple-gold/15 border-temple-gold text-amber-900 dark:text-temple-gold'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <FileText size={16} className="text-temple-gold" />
                    {settings.dyslexicFont && <Check size={14} className="text-temple-gold" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Fuente Legible</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Apoyo a Dislexia</p>
                  </div>
                </button>

                <button
                  onClick={() => updateSetting('textSpacing', !settings.textSpacing)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                    settings.textSpacing
                      ? 'bg-temple-gold/15 border-temple-gold text-amber-900 dark:text-temple-gold'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Maximize2 size={16} className="text-temple-gold" />
                    {settings.textSpacing && <Check size={14} className="text-temple-gold" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Espaciado</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Interlineado amplio</p>
                  </div>
                </button>
              </div>

              {/* 3. Contrast & Monochrome */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                    settings.highContrast
                      ? 'bg-temple-gold/15 border-temple-gold text-amber-900 dark:text-temple-gold'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Contrast size={16} className="text-temple-gold" />
                    {settings.highContrast && <Check size={14} className="text-temple-gold" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Alto Contraste</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Realce visual</p>
                  </div>
                </button>

                <button
                  onClick={() => updateSetting('monochrome', !settings.monochrome)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                    settings.monochrome
                      ? 'bg-temple-gold/15 border-temple-gold text-amber-900 dark:text-temple-gold'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Eye size={16} className="text-temple-gold" />
                    {settings.monochrome && <Check size={14} className="text-temple-gold" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Monocromático</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Escala de grises</p>
                  </div>
                </button>
              </div>

              {/* 4. Highlight Links & Stop Animations */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                    settings.highlightLinks
                      ? 'bg-temple-gold/15 border-temple-gold text-amber-900 dark:text-temple-gold'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Link size={16} className="text-temple-gold" />
                    {settings.highlightLinks && <Check size={14} className="text-temple-gold" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Resaltar Links</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Subrayar enlaces</p>
                  </div>
                </button>

                <button
                  onClick={() => updateSetting('stopAnimations', !settings.stopAnimations)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                    settings.stopAnimations
                      ? 'bg-temple-gold/15 border-temple-gold text-amber-900 dark:text-temple-gold'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <ZapOff size={16} className="text-temple-gold" />
                    {settings.stopAnimations && <Check size={14} className="text-temple-gold" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Pausar Animaciones</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Cero movimiento</p>
                  </div>
                </button>
              </div>

              {/* 5. Reading Ruler & Big Cursor */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => updateSetting('readingRuler', !settings.readingRuler)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                    settings.readingRuler
                      ? 'bg-temple-gold/15 border-temple-gold text-amber-900 dark:text-temple-gold'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Eye size={16} className="text-temple-gold" />
                    {settings.readingRuler && <Check size={14} className="text-temple-gold" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Guía de Lectura</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Regla horizontal</p>
                  </div>
                </button>

                <button
                  onClick={() => updateSetting('bigCursor', !settings.bigCursor)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2 ${
                    settings.bigCursor
                      ? 'bg-temple-gold/15 border-temple-gold text-amber-900 dark:text-temple-gold'
                      : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <MousePointer size={16} className="text-temple-gold" />
                    {settings.bigCursor && <Check size={14} className="text-temple-gold" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">Cursor Grande</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Puntero accesible</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Footer / Reset */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={resetSettings}
                className="text-xs font-bold text-slate-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1.5 transition"
              >
                <RotateCcw size={14} />
                Restablecer Todo
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-temple-gold hover:bg-temple-gold-bright text-black font-extrabold text-xs uppercase tracking-wider shadow-md transition"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
