'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { getCRMDatabase } from '../store';
import { Student } from '../types';

export type UserRole = 'instructor' | 'admin';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  avatar: string; // initials
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (minRole: UserRole) => boolean;
  students: Student[];
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student) => void;
}

const ROLE_HIERARCHY: Record<UserRole, number> = {
  instructor: 1,
  admin: 2,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedStudent, setSelectedStudentState] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    try {
      const db = getCRMDatabase();
      setStudents(db.students || []);

      if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('templefit_user');
        const savedStudent = localStorage.getItem('templefit_selected_student');
        
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser) as User;
            // Safety check: if an old 'alumno' session exists, log them out
            if ((parsedUser.role as any) === 'alumno') {
              localStorage.removeItem('templefit_user');
              return;
            }
            
            setUser(parsedUser);
            if (savedStudent) {
              try {
                setSelectedStudentState(JSON.parse(savedStudent));
              } catch (e) {
                if (db.students && db.students.length > 0) setSelectedStudentState(db.students[0]);
              }
            } else {
              if (db.students && db.students.length > 0) setSelectedStudentState(db.students[0]);
            }
          } catch (e) {
            console.warn('Error al deserializar sesión de usuario:', e);
            localStorage.removeItem('templefit_user');
          }
        }
      }
    } catch (e) {
      console.warn('Error inicializando AuthProvider:', e);
    }
  }, []);

  const setSelectedStudent = useCallback((student: Student) => {
    setSelectedStudentState(student);
    localStorage.setItem('templefit_selected_student', JSON.stringify(student));
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const db = getCRMDatabase();
    const systemUser = (db.users || []).find(u => u.email.toLowerCase() === email.toLowerCase());

    if (systemUser && systemUser.password === password && systemUser.role !== 'alumno' as any) {
      const loggedUser: User = {
        email: systemUser.email,
        name: systemUser.name,
        role: systemUser.role as UserRole,
        avatar: systemUser.avatar
      };
      setUser(loggedUser);
      localStorage.setItem('templefit_user', JSON.stringify(loggedUser));
      localStorage.setItem(`templefit_last_access_${loggedUser.email}`, new Date().toLocaleString('es-ES'));

      if(db.students && db.students.length > 0) {
        setSelectedStudentState(db.students[0]);
        localStorage.setItem('templefit_selected_student', JSON.stringify(db.students[0]));
      }
      return true;
    }
    
    // Fallback for hardcoded original demo users if they try to login and aren't in users db yet or have old passwords
    if (email === 'admin@templefit.com' && (password === 'admin123' || password === 'admin')) {
      const fbUser: User = { email: 'admin@templefit.com', name: 'Administrador Maestro', role: 'admin', avatar: 'AM' };
      setUser(fbUser);
      localStorage.setItem('templefit_user', JSON.stringify(fbUser));
      if (db.students && db.students.length > 0) {
        setSelectedStudentState(db.students[0]);
        localStorage.setItem('templefit_selected_student', JSON.stringify(db.students[0]));
      }
      return true;
    }
    if (email === 'instructor@templefit.com' && (password === 'instructor123' || password === 'coach')) {
      const fbUser: User = { email: 'instructor@templefit.com', name: 'Instructor Coach', role: 'instructor', avatar: 'IC' };
      setUser(fbUser);
      localStorage.setItem('templefit_user', JSON.stringify(fbUser));
      if (db.students && db.students.length > 0) {
        setSelectedStudentState(db.students[0]);
        localStorage.setItem('templefit_selected_student', JSON.stringify(db.students[0]));
      }
      return true;
    }
    
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSelectedStudentState(null);
    localStorage.removeItem('templefit_user');
    localStorage.removeItem('templefit_selected_student');
  }, []);

  const hasRole = useCallback((minRole: UserRole): boolean => {
    if (!user) return false;
    return ROLE_HIERARCHY[user.role] >= ROLE_HIERARCHY[minRole];
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user, 
      hasRole,
      students,
      selectedStudent,
      setSelectedStudent
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
