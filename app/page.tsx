'use client';

import { Suspense } from 'react';
import UsuarioPage from './usuario/page';

export default function RootAdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-temple-navy-dark text-white flex items-center justify-center">Cargando Sistema...</div>}>
      <UsuarioPage />
    </Suspense>
  );
}
