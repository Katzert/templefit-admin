import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { Activity, Flame, Target, TrendingUp, Trophy, Calendar, Zap, ClipboardList, CalendarDays } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface HomePageProps {
  onNavigate?: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { user, selectedStudent } = useAuth();

  // Derive KPIs from localStorage data for the active student
  const studentEmail = selectedStudent?.email || 'default';

  const { productiveHours, streak, habitPct, achievementCount, bodyPct, mindPct, spiritPct } = useMemo(() => {
    // --- Daily Log data ---
    const dailyKey = `templefit_daily_${studentEmail}`;
    const dailyRaw = localStorage.getItem(dailyKey);
    let productiveHours = 0;
    let streak = 0;

    if (dailyRaw) {
      try {
        const daily = JSON.parse(dailyRaw);
        // Calculate productive hours from blocks or fallback to legacy hours matrix
        if (daily.blocks) {
          productiveHours = (daily.blocks.morning ? 6 : 0) + (daily.blocks.afternoon ? 6 : 0) + (daily.blocks.evening ? 6 : 0);
        } else if (daily.hours) {
          productiveHours = Object.values(daily.hours).filter(Boolean).length;
        } else {
          productiveHours = 0;
        }
        // Streak: count consecutive days with daily logs saved
        streak = daily.streak || (productiveHours > 0 ? 1 : 0);
      } catch { /* use defaults */ }
    }

    // --- Habit Tracker data ---
    const habitKey = `templefit_habits_${studentEmail}`;
    const habitRaw = localStorage.getItem(habitKey);
    let habitPct = 0;

    if (habitRaw) {
      try {
        const habits = JSON.parse(habitRaw);
        // Count victories across the 31-day grid
        const victories = habits.victories || [];
        const totalDays = 31;
        const completedDays = victories.filter((v: boolean) => v).length;
        habitPct = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
      } catch { /* use defaults */ }
    }

    // --- Monthly Audit data ---
    const auditKey = `templefit_monthly_audit_${studentEmail}`;
    const auditRaw = localStorage.getItem(auditKey);
    let achievementCount = 0;
    let bodyPct = 0;
    let mindPct = 0;
    let spiritPct = 0;

    if (auditRaw) {
      try {
        const audit = JSON.parse(auditRaw);
        const scores = audit.scores || {};
        // Body = average of training, nutrition, hydration
        bodyPct = Math.round(((scores.training || 0) + (scores.nutrition || 0) + (scores.hydration || 0)) / 3);
        // Mind = average of mindset, consistency
        mindPct = Math.round(((scores.mindset || 0) + (scores.consistency || 0)) / 2);
        // Spirit = rest (representing balance/spiritual dimension)
        spiritPct = scores.rest || 0;
        // Count non-empty achievements
        const achText = audit.achievements || '';
        achievementCount = achText.trim() ? achText.split(',').filter((a: string) => a.trim()).length : 0;
      } catch { /* use defaults */ }
    }

    return { productiveHours, streak, habitPct, achievementCount, bodyPct, mindPct, spiritPct };
  }, [studentEmail]);

  // Determine if we have any data at all
  const hasData = productiveHours > 0 || habitPct > 0 || bodyPct > 0;

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
            SISTEMA DE CONTROL TEMPLEFIT V3.0
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

      {/* KPI Row — derived from real data */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Activity size={22} />, label: 'Horas Productivas Hoy', value: hasData ? `${productiveHours}` : '—', sub: hasData ? '/ 24 hrs' : 'Sin registro', color: 'text-temple-gold' },
          { icon: <Flame size={22} />, label: 'Racha Actual', value: hasData ? `${streak}` : '—', sub: hasData ? (streak === 1 ? 'día' : 'días seguidos') : 'Sin registro', color: 'text-temple-red' },
          { icon: <Target size={22} />, label: 'Hábitos del Mes', value: hasData ? `${habitPct}%` : '—', sub: hasData ? 'cumplimiento' : 'Sin registro', color: 'text-temple-green' },
          { icon: <Trophy size={22} />, label: 'Logros Registrados', value: hasData ? `${achievementCount}` : '—', sub: hasData ? 'este mes' : 'Sin registro', color: 'text-temple-gold-bright' },
        ].map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className="!p-5">
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

      {/* Quick Actions + Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Actions — functional navigation */}
        <motion.div variants={item} className="lg:col-span-5">
          <Card>
            <CardContent>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="text-temple-gold" size={20} />
                Acciones Rápidas
              </h3>
              <p className="text-xs text-gray-500 mb-4">Navega directamente a las secciones más relevantes.</p>
              <div className="space-y-3">
                {[
                  { title: 'Registrar mi día', desc: 'Completa tu matriz de 24 horas y hábitos diarios', emoji: '📋', tab: 'daily' },
                  { title: 'Ver mi progreso mensual', desc: 'Revisa tu tracker de 31 días y tendencia', emoji: '📅', tab: 'habits' },
                  { title: 'Auditoría de vida', desc: 'Analiza tu Rueda del Rendimiento', emoji: '🎯', tab: 'audit' },
                ].map((action, i) => (
                  <div
                    key={i}
                    onClick={() => onNavigate?.(action.tab)}
                    className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/5 hover:border-temple-gold/30 transition-all cursor-pointer group"
                  >
                    <span className="text-2xl">{action.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white group-hover:text-temple-gold transition">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.desc}</p>
                    </div>
                    <TrendingUp size={16} className="text-gray-600 group-hover:text-temple-gold transition" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Progress — derived from audit scores */}
        <motion.div variants={item} className="lg:col-span-7">
          <Card>
            <CardContent>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="text-temple-gold" size={20} />
                Progreso Semanal
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                {hasData
                  ? 'Tu rendimiento esta semana en las 3 dimensiones del templo.'
                  : 'Completa tu Auditoría Mensual para ver tu progreso aquí.'}
              </p>
              <div className="space-y-6">
                {[
                  { label: 'CUERPO', pct: bodyPct, color: 'bg-temple-gold', desc: 'Entrenamiento, nutrición, hidratación' },
                  { label: 'MENTE', pct: mindPct, color: 'bg-temple-gold-bright', desc: 'Mentalidad, consistencia' },
                  { label: 'ESPÍRITU', pct: spiritPct, color: 'bg-temple-green', desc: 'Descanso, balance, conexión' },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <div>
                        <span className="font-bold text-white uppercase tracking-widest">{bar.label}</span>
                        <span className="text-gray-500 ml-2">— {bar.desc}</span>
                      </div>
                      <span className="font-black text-temple-gold">{hasData ? `${bar.pct}%` : '—'}</span>
                    </div>
                    <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: hasData ? `${bar.pct}%` : '0%' }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
                        className={`h-full ${bar.color} rounded-full`}
                      />
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
