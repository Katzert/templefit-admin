import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Settings, Users, Shield, Mail, UserCog, Trash2 } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: 'alumno' | 'instructor' | 'admin';
  status: 'activo' | 'inactivo';
  joined: string;
}

const INITIAL_USERS: SystemUser[] = [
  { id: 1, name: 'Carlos Mendoza', email: 'alumno@templefit.com', role: 'alumno', status: 'activo', joined: '2026-01-15' },
  { id: 2, name: 'Juan Pérez', email: 'juan@templefit.com', role: 'alumno', status: 'activo', joined: '2026-02-10' },
  { id: 3, name: 'María Gómez', email: 'maria@templefit.com', role: 'alumno', status: 'activo', joined: '2026-03-05' },
  { id: 4, name: 'David Torres', email: 'instructor@templefit.com', role: 'instructor', status: 'activo', joined: '2025-11-01' },
  { id: 5, name: 'Marco Katzert', email: 'admin@templefit.com', role: 'admin', status: 'activo', joined: '2025-06-01' },
];

const ROLE_LABELS = { alumno: '🎓 Alumno', instructor: '🏋️ Instructor', admin: '👑 Admin' };
const ROLE_COLORS = {
  alumno: 'bg-white/5 text-gray-300 border-white/10',
  instructor: 'bg-temple-gold/10 text-temple-gold border-temple-gold/30',
  admin: 'bg-temple-red/10 text-temple-red border-temple-red/30',
};

export function SettingsPage() {
  const [users, setUsers] = useState(INITIAL_USERS);

  useEffect(() => {
    // Seed some last access times if they are completely missing
    const seedAccess = {
      'alumno@templefit.com': '30/06/2026, 18:45:12',
      'juan@templefit.com': '29/06/2026, 10:30:45',
      'maria@templefit.com': '28/06/2026, 15:40:22',
      'instructor@templefit.com': '30/06/2026, 19:10:04',
      'admin@templefit.com': '30/06/2026, 19:25:50',
    };
    Object.entries(seedAccess).forEach(([email, time]) => {
      const key = `templefit_last_access_${email}`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, time);
      }
    });
  }, []);

  const getLastAccess = (email: string) => {
    if (typeof window === 'undefined') return 'Nunca';
    return localStorage.getItem(`templefit_last_access_${email}`) || 'Nunca';
  };

  const cycleRole = (id: number) => {
    const order: SystemUser['role'][] = ['alumno', 'instructor', 'admin'];
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      const nextIdx = (order.indexOf(u.role) + 1) % order.length;
      return { ...u, role: order[nextIdx] };
    }));
  };

  const toggleStatus = (id: number) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'activo' ? 'inactivo' as const : 'activo' as const } : u
    ));
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <motion.div variants={item}>
        <h1 className="text-3xl md:text-5xl font-serif font-black uppercase text-white">
          <span className="text-temple-gold">CONFIGURACIÓN</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest border-l-2 border-temple-gold pl-3">
          Gestión de usuarios, roles y permisos del sistema.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: <Users size={20} />, value: users.length, label: 'Usuarios totales' },
          { icon: <Shield size={20} />, value: users.filter(u => u.status === 'activo').length, label: 'Activos' },
          { icon: <UserCog size={20} />, value: users.filter(u => u.role === 'instructor').length, label: 'Instructores' },
        ].map((s, i) => (
          <motion.div key={i} variants={item}>
            <Card className="!p-5">
              <div className="flex items-center gap-3">
                <div className="text-temple-gold opacity-50">{s.icon}</div>
                <div>
                  <p className="text-2xl font-black text-white">{s.value}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{s.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* User Table */}
      <motion.div variants={item}>
        <Card>
          <CardContent className="!p-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Settings className="text-temple-gold" size={20} />
              Gestión de Usuarios
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Usuario</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Rol</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Estado</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Último Acceso</th>
                    <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Registro</th>
                    <th className="text-right py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-temple-gold/10 border border-temple-gold/30 flex items-center justify-center text-xs font-bold text-temple-gold">
                            {u.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-bold text-white">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Mail size={10} /> {u.email}</span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => cycleRole(u.id)}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all hover:opacity-80 ${ROLE_COLORS[u.role]}`}
                        >
                          {ROLE_LABELS[u.role]}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all ${
                            u.status === 'activo'
                              ? 'bg-temple-green/10 text-temple-green border-temple-green/30'
                              : 'bg-white/5 text-gray-500 border-white/10'
                          }`}
                        >
                          {u.status}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-xs font-medium text-gray-300">{getLastAccess(u.email)}</td>
                      <td className="py-4 px-4 text-xs text-gray-500">{u.joined}</td>
                      <td className="py-4 px-4 text-right">
                        <button className="p-2 text-gray-600 hover:text-temple-red transition">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
