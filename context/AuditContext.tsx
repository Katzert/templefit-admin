import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface AuditEntry {
  id: string;
  timestamp: string;
  userEmail: string;
  userName: string;
  role: 'instructor' | 'admin';
  action: 'create' | 'update' | 'delete';
  module: string;
  field: string;
  oldValue: string;
  newValue: string;
  targetUser?: string;
}

interface AuditContextType {
  entries: AuditEntry[];
  log: (entry: Omit<AuditEntry, 'id' | 'timestamp'>) => void;
  getEntriesForUser: (email: string) => AuditEntry[];
  clearAll: () => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<AuditEntry[]>(SEED_ENTRIES);

  useEffect(() => {
    const saved = localStorage.getItem('templefit_audit');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const log = useCallback((entry: Omit<AuditEntry, 'id' | 'timestamp'>) => {
    const newEntry: AuditEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    setEntries(prev => {
      const updated = [newEntry, ...prev];
      localStorage.setItem('templefit_audit', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getEntriesForUser = useCallback((email: string) => {
    return entries.filter(e => e.userEmail === email);
  }, [entries]);

  const clearAll = useCallback(() => {
    setEntries([]);
    localStorage.removeItem('templefit_audit');
  }, []);

  return (
    <AuditContext.Provider value={{ entries, log, getEntriesForUser, clearAll }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const ctx = useContext(AuditContext);
  if (!ctx) throw new Error('useAudit must be used within AuditProvider');
  return ctx;
}

const SEED_ENTRIES: AuditEntry[] = [
  {
    id: '1', timestamp: '2026-06-28T14:30:00Z',
    userEmail: 'instructor@templefit.com', userName: 'David Torres', role: 'instructor',
    action: 'update', module: 'Ficha Técnica', field: 'Peso Semana 3',
    oldValue: '80.2 kg', newValue: '79.1 kg', targetUser: 'Carlos Mendoza',
  },
  {
    id: '2', timestamp: '2026-06-27T09:15:00Z',
    userEmail: 'admin@templefit.com', userName: 'Marco Katzert', role: 'admin',
    action: 'update', module: 'Configuración', field: 'Rol de usuario',
    oldValue: 'alumno', newValue: 'instructor', targetUser: 'David Torres',
  },
  {
    id: '3', timestamp: '2026-06-26T11:00:00Z',
    userEmail: 'instructor@templefit.com', userName: 'David Torres', role: 'instructor',
    action: 'update', module: 'Ficha Técnica', field: 'Notas Semana 2',
    oldValue: 'Sin notas', newValue: 'Ligera molestia en lumbar. Reducir carga.', targetUser: 'Carlos Mendoza',
  },
  {
    id: '4', timestamp: '2026-06-25T16:45:00Z',
    userEmail: 'admin@templefit.com', userName: 'Marco Katzert', role: 'admin',
    action: 'create', module: 'Recetas', field: 'Power Bowl Proteico',
    oldValue: '', newValue: 'Nueva receta añadida',
  },
];
