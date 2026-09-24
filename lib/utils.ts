import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBoliviaWhatsAppPhone(phone?: string): string {
  if (!phone) return '59169127691';
  const clean = phone.replace(/[^0-9]/g, '');
  if (!clean) return '59169127691';
  if (clean.length === 8 && (clean.startsWith('6') || clean.startsWith('7'))) {
    return `591${clean}`;
  }
  return clean;
}

export function createWhatsAppLink(message: string, phone: string = '59169127691'): string {
  const cleanPhone = formatBoliviaWhatsAppPhone(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getAssetPath(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (cleanPath.startsWith('/templefit-admin/')) {
    return cleanPath;
  }
  
  if (typeof window !== 'undefined') {
    if (window.location.pathname.startsWith('/templefit-admin')) {
      return `/templefit-admin${cleanPath}`;
    }
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (basePath) {
    return `${basePath}${cleanPath}`;
  }

  return cleanPath;
}
