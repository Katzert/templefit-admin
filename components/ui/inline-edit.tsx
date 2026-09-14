import React, { useState, useRef, useEffect } from 'react';
import { cn } from './card';
import { Pencil } from 'lucide-react';

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function InlineEdit({ value, onSave, multiline = false, className, placeholder, disabled = false }: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    onSave(tempValue);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing && !disabled) {
    return (
      <div className="space-y-2 w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "w-full bg-white dark:bg-[#07090E] border-2 border-amber-500 dark:border-temple-gold rounded-xl p-3 text-slate-900 dark:text-white font-medium text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/30 resize-y min-h-[90px] shadow-sm",
              className
            )}
            rows={4}
          />
        ) : (
          <input
            aria-label="Editar valor"
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "w-full bg-white dark:bg-[#07090E] border-2 border-amber-500 dark:border-temple-gold rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-sm",
              className
            )}
          />
        )}
        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1 text-[11px] font-bold text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-3.5 py-1 text-[11px] font-black uppercase tracking-wider bg-temple-gold text-black hover:bg-amber-400 rounded-lg shadow-sm transition flex items-center gap-1"
          >
            ✓ Guardar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => { if (!disabled) setIsEditing(true); }}
      className={cn(
        "group/edit relative rounded-xl p-2.5 transition-all border border-black/5 dark:border-white/10 min-h-[40px] whitespace-pre-wrap flex justify-between items-start gap-2 text-slate-900 dark:text-white bg-slate-50/80 dark:bg-white/[0.02]",
        !disabled ? "cursor-text hover:bg-amber-500/5 hover:border-amber-500/40 dark:hover:border-temple-gold/40" : "cursor-default",
        !value && "text-slate-400 dark:text-gray-500 italic",
        className
      )}
      title={!disabled ? "Toca para editar este campo" : undefined}
    >
      <span className="flex-1 font-medium text-slate-900 dark:text-gray-100">
        {value || placeholder || "Toca aquí para ingresar contenido..."}
      </span>
      {!disabled && (
        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[10px] font-bold text-slate-500 dark:text-gray-400 opacity-80 group-hover/edit:opacity-100 transition-opacity shrink-0">
          <Pencil size={11} className="text-temple-gold" />
          <span className="hidden sm:inline">Editar</span>
        </span>
      )}
    </div>
  );
}
