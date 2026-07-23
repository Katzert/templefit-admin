import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { Activity, Flame, Target, Users, Zap, AlertCircle, Droplets } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface HomePageProps {
  onNavigate?: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { user, selectedStudent } = useAuth();

  const studentEmail = selectedStudent?.email || 'default';

  const { streak, water, activeStudents, expiringStudents } = useMemo(() => {
    // --- Daily Log data ---
    const dailyKey = `templefit_daily_${studentEmail}`;
    const dailyRaw = localStorage.getItem(dailyKey);
    let streak = 0;
    let water = 0;

    if (dailyRaw) {
      try {
        const daily = JSON.parse(dailyRaw);
        streak = daily.streak || 0;
        water = daily.water || 0;
      } catch { /* use defaults */ }
    }

    // --- CRM Data ---
    const studentsKey = 'templefit_holistic_students_v3';
    const studentsRaw = localStorage.getItem(studentsKey);
    let activeStudents = 0;
    let expiringStudents = 0;

    if (studentsRaw) {
      try {
        const students = JSON.parse(studentsRaw);
        activeStudents = students.filter((s: any) => s.status === 'active').length;
        expiringStudents = students.filter((s: any) => s.status === 'expiring').length;
      } catch { /* use defaults */ }
    }

    return { streak, water, activeStudents, expiringStudents };
  }, [studentEmail]);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      {/* Hero Section */}
      <motion.div variants={item} className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-temple-navy-dark via-temple-navy-dark/60 to-transparent" />
        <div className="relative z-10 p-6 md:p-10 w-full">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-temple-gold mb-2">
            SISTEMA DE GESTIÓN TEMPLEFIT
          </p>
          <h1 className="text-3xl md:text-5xl font-serif font-black uppercase leading-tight text-white">
            Bienvenido,<br />
            <span className="text-temple-gold">{user?.name?.split(' ')[0] || 'Guerrero'}.</span>
          </h1>
          <p className="text-sm text-gray-300 mt-3 max-w-lg">
            "El ejercicio de fuerza no es una opción, es un mandato para cuidar tu cuerpo que es tu templo."
          </p>
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Users size={22} />, label: 'Alumnos Activos', value: `${activeStudents}`, sub: 'en la comunidad', color: 'text-temple-gold' },
          { icon: <AlertCircle size={22} />, label: 'Próximos a Vencer', value: `${expiringStudents}`, sub: 'esta semana', color: 'text-amber-400' },
          { icon: <Droplets size={22} />, label: 'Hidratación Hoy', value: `${water}`, sub: 'litros', color: 'text-temple-gold-bright' },
          { icon: <Flame size={22} />, label: 'Racha de Hábitos', value: `${streak}`, sub: streak === 1 ? 'día' : 'días', color: 'text-temple-red' },
        ].map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className="!p-5 border-white/5 bg-black/40">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{kpi.label}</p>
                  <h3 className="text-3xl font-black text-white">
                    {kpi.value}
                    <span className="text-sm font-medium text-gray-500 ml-1">{kpi.sub}</span>
                  </h3>
                </div>
                <div className={`${kpi.color} opacity-40`}>{kpi.icon}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div variants={item} className="lg:col-span-12">
          <Card className="border-white/5 bg-black/40">
            <CardContent>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="text-temple-gold" size={20} />
                Acciones Rápidas
              </h3>
              <p className="text-xs text-gray-500 mb-4">Navega directamente a las secciones principales del CRM.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { title: 'Libro & Materiales', desc: 'Copys y apuntes', emoji: '📘', tab: 'social-media' },
                  { title: 'Alumnos e Instructores', desc: 'Fichas y CRM', emoji: '👥', tab: 'team-ops' },
                  { title: 'Hábitos & Mi Día', desc: 'Registro diario', emoji: '☀️', tab: 'daily' },
                  { title: 'Control Financiero', desc: 'Ingresos y proyecciones', emoji: '💰', tab: 'financial' },
                ].map((action, i) => (
                  <div
                    key={i}
                    onClick={() => onNavigate?.(action.tab)}
                    className="flex items-center gap-4 p-4 bg-black/60 rounded-xl border border-white/5 hover:border-temple-gold/30 transition-all cursor-pointer group"
                  >
                    <span className="text-2xl">{action.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white group-hover:text-temple-gold transition">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Motivational Quote */}
      <motion.div variants={item} className="text-center py-6 border-t border-white/5">
        <p className="font-serif italic text-xl text-gray-400">
          "Nutre, Crea, Reta, Mente, Cuerpo y Espíritu."
        </p>
        <p className="text-xs text-temple-gold uppercase tracking-[0.3em] mt-2">— TempleFit, Santa Cruz - Bolivia</p>
      </motion.div>
    </motion.div>
  );
}
