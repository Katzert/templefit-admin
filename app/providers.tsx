'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { AuditProvider } from '../context/AuditContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <AuditProvider>
        {children}
      </AuditProvider>
    </AuthProvider>
  );
}
