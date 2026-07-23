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

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing && !disabled) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full bg-black/40 border border-temple-gold/50 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-temple-gold resize-none",
            className
          )}
          rows={3}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full bg-black/40 border border-temple-gold/50 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-temple-gold",
          className
        )}
      />
    );
  }

  return (
    <div
      onClick={() => { if (!disabled) setIsEditing(true); }}
      className={cn(
        "group/edit relative rounded-lg p-2 transition-colors border border-transparent min-h-[40px] whitespace-pre-wrap flex justify-between items-start gap-2",
        !disabled ? "cursor-text hover:bg-white/5 hover:border-white/10" : "cursor-default",
        !value && "text-gray-500 italic",
        className
      )}
    >
      <span className="flex-1">{value || placeholder || "Haz clic para editar..."}</span>
      {!disabled && (
        <Pencil 
          size={14} 
          className="text-gray-500 opacity-60 md:opacity-0 group-hover/edit:opacity-100 transition-opacity shrink-0 mt-1" 
        />
      )}
    </div>
  );
}
