'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Check } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (base64OrUrl: string) => void;
  className?: string;
  label?: string;
  aspectRatio?: 'square' | 'video' | 'wide';
}

/**
 * Resizes large images client-side before converting to Base64
 * to prevent localStorage quotas from overflowing.
 */
function compressImage(file: File, maxWidth = 800, quality = 0.75): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export function ImageUpload({ value, onChange, className = '', label, aspectRatio = 'square' }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).');
      return;
    }

    try {
      setIsProcessing(true);
      const compressedBase64 = await compressImage(file);
      onChange(compressedBase64);
    } catch (err) {
      console.error('Error al procesar imagen:', err);
      alert('Hubo un error al procesar la imagen.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setIsUrlMode(false);
      setUrlInput('');
    }
  };

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : aspectRatio === 'video' ? 'aspect-video' : 'h-48';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</label>
          <button
            type="button"
            onClick={() => setIsUrlMode(!isUrlMode)}
            className="text-[10px] text-temple-gold hover:underline flex items-center gap-1 font-bold"
          >
            <LinkIcon size={11} /> {isUrlMode ? 'Subir Archivo' : 'Pegar URL'}
          </button>
        </div>
      )}

      {isUrlMode ? (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-temple-gold"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-temple-gold text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition"
          >
            Aplicar
          </button>
        </form>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !value && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl overflow-hidden transition-all flex flex-col items-center justify-center cursor-pointer ${aspectClass} ${
            isDragging 
              ? 'border-temple-gold bg-temple-gold/10' 
              : value 
              ? 'border-white/10 bg-black/40' 
              : 'border-white/20 hover:border-temple-gold/50 bg-black/30'
          }`}
        >
          {value ? (
            <div className="relative w-full h-full group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="p-2.5 bg-temple-gold text-black rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition"
                >
                  <Upload size={14} /> Cambiar Foto
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onChange(''); }}
                  className="p-2.5 bg-red-500/80 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-red-500 transition"
                >
                  <X size={14} /> Eliminar
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2 text-temple-gold">
                {isProcessing ? <Upload className="animate-pulse" size={20} /> : <Upload size={20} />}
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                {isProcessing ? 'Optimizando Imagen...' : 'Click o Arrastra tu Imagen'}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">JPG, PNG, WEBP (Auto-optimizado)</p>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
