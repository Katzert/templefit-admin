import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-24 bg-black border-t-8 border-temple-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/templefit/dashboard/bg_dynamic.png')] bg-scroll md:bg-fixed pointer-events-none"></div>
        
        <div className="container mx-auto px-6 space-y-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                {/* Brand Column */}
                <div className="lg:col-span-5 space-y-10">
                    <div className="flex flex-col space-y-4">
                        <h5 className="text-6xl md:text-8xl font-black text-white uppercase elegant-title not-italic tracking-tighter">TEMPLE<span className="text-temple-gold">FIT</span></h5>
                        <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-white/40">Atletas Valientes ● Valores Eternos</p>
                    </div>
                    <p className="text-lg text-white/60 font-medium leading-relaxed border-l-4 border-temple-gold pl-6">
                        Centro de Transformación integral: Forjando atletas íntegros en cuerpo, mente y espíritu desde el corazón de la comunidad en Santa Cruz, Bolivia.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-temple-gold hover:text-temple-navy-dark transition-all"><Instagram className="h-5 w-5" /></a>
                        <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-temple-gold hover:text-temple-navy-dark transition-all"><Facebook className="h-5 w-5" /></a>
                        <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-temple-gold hover:text-temple-navy-dark transition-all"><Youtube className="h-5 w-5" /></a>
                    </div>
                </div>

                {/* Navigation */}
                <div className="lg:col-span-3 space-y-8">
                    <h3 className="text-xs font-bold text-temple-gold uppercase tracking-[0.3em]">NAVEGACIÓN</h3>
                    <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-white/80">
                        <li><Link href="/" className="hover:text-temple-gold transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-temple-red opacity-50"></span>Inicio</Link></li>
                        <li><Link href="/alianzas" className="hover:text-temple-gold transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-temple-red opacity-50"></span>Franquicias</Link></li>
                        <li><Link href="/tienda" className="hover:text-temple-gold transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-temple-red opacity-50"></span>Tienda</Link></li>
                        <li><Link href="/recetas" className="hover:text-temple-gold transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-temple-red opacity-50"></span>Recetas</Link></li>
                        <li><Link href="/usuario" className="hover:text-temple-gold transition-colors text-white/40 flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-temple-red opacity-50"></span>Área de Usuario</Link></li>
                    </ul>
                </div>

                {/* Values */}
                <div className="lg:col-span-4 space-y-8">
                    <h3 className="text-xs font-bold text-temple-gold uppercase tracking-[0.3em]">NUESTRA REGLA</h3>
                    <div className="tactical-card border-white/10 p-8">
                        <p className="text-xl md:text-2xl text-white font-serif italic font-bold leading-relaxed">
                            &quot;Todo lo que hagan, háganlo de corazón, como para el Señor.&quot;
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] text-white/30 uppercase font-bold tracking-[0.5em] gap-8">
                <p>&copy; 2026 ESTRATEGIA Y MISIÓN ● BOLIVIA</p>
                <div className="flex gap-12">
                    <span className="text-temple-gold">VALORES ETERNOS</span>
                    <span>ATLETAS VALIENTES</span>
                </div>
            </div>
        </div>
    </footer>
  );
}
