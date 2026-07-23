'use client';

import { useAuth } from '../../../context/AuthContext';

export default function OriginalDashboardPage() {
  const { user, hasRole } = useAuth();

  const isAdmin = hasRole('admin');

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 text-center space-y-6">
        <div className="text-6xl">🔒</div>
        <h2 className="text-3xl font-serif font-black text-white uppercase tracking-wider">Acceso Restringido</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Esta sección de referencia del Sitio Original está reservada únicamente para administradores.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 pt-28 pb-12 flex flex-col space-y-4 min-h-[90vh]">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h1 className="text-2xl font-serif font-black uppercase text-white tracking-widest">
          Sitio Original: <span className="text-temple-gold">Dashboard de Referencia</span>
        </h1>
        <span className="text-[10px] text-temple-gold uppercase tracking-widest font-bold hidden md:inline">Vista de Administrador</span>
      </div>
      <div className="flex-1 w-full h-[75vh] rounded-2xl overflow-hidden border border-white/10 bg-temple-navy shadow-2xl relative">
        <iframe
          src="/templefit/dashboard/index.html"
          className="w-full h-full"
          style={{ border: 'none' }}
          title="Dashboard de Referencia Original"
        />
      </div>
    </div>
  );
}
