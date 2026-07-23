import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type UserRole = 'alumno' | 'instructor' | 'admin';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  avatar: string; // initials
}

export interface Student {
  email: string;
  name: string;
  avatar: string;
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

const DEMO_STUDENTS: Student[] = [
  { email: 'alumno@templefit.com', name: 'Carlos Mendoza', avatar: 'CM' },
  { email: 'juan@templefit.com', name: 'Juan Pérez', avatar: 'JP' },
  { email: 'maria@templefit.com', name: 'María Gómez', avatar: 'MG' },
];

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'alumno@templefit.com': {
    password: 'alumno123',
    user: { email: 'alumno@templefit.com', name: 'Carlos Mendoza', role: 'alumno', avatar: 'CM' },
  },
  'juan@templefit.com': {
    password: 'juan123',
    user: { email: 'juan@templefit.com', name: 'Juan Pérez', role: 'alumno', avatar: 'JP' },
  },
  'maria@templefit.com': {
    password: 'maria123',
    user: { email: 'maria@templefit.com', name: 'María Gómez', role: 'alumno', avatar: 'MG' },
  },
  'instructor@templefit.com': {
    password: 'instructor123',
    user: { email: 'instructor@templefit.com', name: 'David Torres', role: 'instructor', avatar: 'DT' },
  },
  'admin@templefit.com': {
    password: 'admin123',
    user: { email: 'admin@templefit.com', name: 'Marco Katzert', role: 'admin', avatar: 'MK' },
  },
};

const ROLE_HIERARCHY: Record<UserRole, number> = {
  alumno: 1,
  instructor: 2,
  admin: 3,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedStudent, setSelectedStudentState] = useState<Student | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('templefit_user');
    const savedStudent = localStorage.getItem('templefit_selected_student');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      setUser(parsedUser);
      if (savedStudent) {
        setSelectedStudentState(JSON.parse(savedStudent));
      } else {
        if (parsedUser.role === 'alumno') {
          const selfStudent = DEMO_STUDENTS.find(s => s.email === parsedUser.email) || {
            email: parsedUser.email,
            name: parsedUser.name,
            avatar: parsedUser.avatar
          };
          setSelectedStudentState(selfStudent);
        } else {
          setSelectedStudentState(DEMO_STUDENTS[0]);
        }
      }
    }
  }, []);

  const setSelectedStudent = useCallback((student: Student) => {
    setSelectedStudentState(student);
    localStorage.setItem('templefit_selected_student', JSON.stringify(student));
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const entry = DEMO_USERS[email.toLowerCase()];
    if (entry && entry.password === password) {
      setUser(entry.user);
      localStorage.setItem('templefit_user', JSON.stringify(entry.user));
      localStorage.setItem(`templefit_last_access_${entry.user.email}`, new Date().toLocaleString('es-ES'));

      if (entry.user.role === 'alumno') {
        const selfStudent = DEMO_STUDENTS.find(s => s.email === entry.user.email) || {
          email: entry.user.email,
          name: entry.user.name,
          avatar: entry.user.avatar
        };
        setSelectedStudentState(selfStudent);
        localStorage.setItem('templefit_selected_student', JSON.stringify(selfStudent));
      } else {
        setSelectedStudentState(DEMO_STUDENTS[0]);
        localStorage.setItem('templefit_selected_student', JSON.stringify(DEMO_STUDENTS[0]));
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
      students: DEMO_STUDENTS,
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
