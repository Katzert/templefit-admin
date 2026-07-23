'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="header-glass fixed top-0 w-full z-[100]">
      <div className="container mx-auto px-4 py-2 md:px-6 md:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 md:space-x-4">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-white border-2 border-temple-gold flex items-center justify-center shrink-0 rounded transition-transform group-hover:scale-105">
              <span className="font-bold text-temple-navy">TF</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase elegant-title not-italic">TEMPLE<span className="text-temple-gold">FIT</span></h1>
              <p className="hidden sm:block label-tactical text-[8px] mt-0.5">Centro de Impacto y Transformación</p>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-12">
          <div className="hidden md:flex space-x-8 text-[11px] font-black uppercase tracking-widest text-white items-center">
            <Link href="/" className="hover:text-temple-gold transition-colors border-b-2 border-transparent hover:border-temple-gold pb-1">Inicio</Link>
            <Link href="/alianzas" className="hover:text-temple-gold transition-colors border-b-2 border-transparent hover:border-temple-gold pb-1">Franquicias</Link>
            <Link href="/tienda" className="hover:text-temple-gold transition-colors border-b-2 border-transparent hover:border-temple-gold pb-1">Tienda</Link>
            <Link href="/recetas" className="hover:text-temple-gold transition-colors border-b-2 border-transparent hover:border-temple-gold pb-1">Recetas</Link>
            <Link href="/neuro-ventas" className="hover:text-temple-gold transition-colors border-b-2 border-transparent hover:border-temple-gold pb-1">Neuro Ventas</Link>
            
            <Link href="https://admin.templefit.com" className="hover:text-temple-gold transition-colors border-b-2 border-transparent hover:border-temple-gold pb-1 text-white/50">
              Usuario
            </Link>
          </div>
          
          <div className="md:hidden flex items-center bg-temple-gold/20 px-3 py-1.5 border border-temple-gold/30 rounded-full cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-4 h-4 text-temple-gold mr-1" /> : <Menu className="w-4 h-4 text-temple-gold mr-1" />}
            <span className="text-[10px] font-bold text-temple-gold">MENU</span>
          </div>
          
          <Link href="https://admin.templefit.com" className="hidden lg:flex items-center bg-temple-red/20 px-4 py-2 border border-temple-red/30 rounded-full cursor-pointer hover:bg-temple-red/30 transition-colors">
            <span className="w-2 h-2 bg-temple-red rounded-full mr-3 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">UNIRSE AL RETO</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-temple-navy-dark/95 backdrop-blur-md border-t border-temple-gold/30 p-6 space-y-6">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm tracking-widest font-bold uppercase text-white hover:text-temple-gold">Inicio</Link>
          <Link href="/alianzas" onClick={() => setIsOpen(false)} className="block text-sm tracking-widest font-bold uppercase text-white hover:text-temple-gold">Franquicias</Link>
          <Link href="/tienda" onClick={() => setIsOpen(false)} className="block text-sm tracking-widest font-bold uppercase text-white hover:text-temple-gold">Tienda</Link>
          <Link href="/recetas" onClick={() => setIsOpen(false)} className="block text-sm tracking-widest font-bold uppercase text-white hover:text-temple-gold">Recetas</Link>
          <Link href="/neuro-ventas" onClick={() => setIsOpen(false)} className="block text-sm tracking-widest font-bold uppercase text-white hover:text-temple-gold">Neuro Ventas</Link>
          
          <Link href="https://admin.templefit.com" onClick={() => setIsOpen(false)} className="block text-sm tracking-widest font-bold uppercase text-white/50 hover:text-temple-gold">
            Usuario
          </Link>
          <Link 
            href="https://admin.templefit.com" 
            onClick={() => setIsOpen(false)}
            className="block text-center bg-temple-red/20 border border-temple-red/30 text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest"
          >
            Únete al Reto
          </Link>
        </div>
      )}
    </nav>
  );
}
