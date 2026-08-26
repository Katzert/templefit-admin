'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { getCRMDatabase } from '../store';
import { 
  Flame, 
  Users, 
  Zap, 
  AlertCircle, 
  Droplets, 
  MessageSquare, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Award,
  BookOpen,
  ArrowRight,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface HomePageProps {
  onNavigate?: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { user, selectedStudent } = useAuth();
  const studentEmail = selectedStudent?.email || 'default';

  const { 
    streak, 
    water, 
    activeStudents, 
    expiringStudentsList, 
    inactiveStudentsList,
    totalStudents,
    monthIncome,
    squadCount,
    retentionRate
  } = useMemo(() => {
    // --- Daily Log data ---
    const dailyKey = `templefit_daily_${studentEmail}`;
    const dailyRaw = typeof window !== 'undefined' ? localStorage.getItem(dailyKey) : null;
    let streak = 7;
    let water = 2.8;

    if (dailyRaw) {
      try {
        const daily = JSON.parse(dailyRaw);
        streak = daily.streak || 7;
        water = daily.water !== undefined ? daily.water : 2.8;
      } catch { /* use defaults */ }
    }

    // --- CRM Data ---
    const db = getCRMDatabase();
    const allStudents = db.students || [];
    const active = allStudents.filter(s => s.status === 'active').length;
    const expiring = allStudents.filter(s => s.status === 'expiring');
    
    // Squads count
    const uniqueSquads = new Set(allStudents.map(s => s.escuadronId).filter(Boolean));

    // Current Month Income
    const now = new Date();
    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const txs = db.transactions || [];
    const income = txs
      .filter(t => t.type === 'income' && t.date.startsWith(monthPrefix))
      .reduce((s, t) => s + t.amount, 0);

    // Inactive Students (5+ days without attendance)
    const fiveDaysAgo = new Date(Date.now() - 5*24*60*60*1000).toISOString().split('T')[0];
    const inactive = allStudents.filter(s => {
      if (s.status !== 'active') return false;
      const history = s.attendanceHistory || [];
      if (history.length === 0) return true;
      return history[0].date < fiveDaysAgo;
    });

    return { 
      streak, 
      water, 
      activeStudents: active, 
      expiringStudentsList: expiring,
      inactiveStudentsList: inactive,
      totalStudents: allStudents.length,
      monthIncome: income,
      squadCount: uniqueSquads.size,
      retentionRate: allStudents.length > 0 ? Math.round((active / allStudents.length) * 100) : 100
    };
  }, [studentEmail]);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12 font-sans">
      {/* Hero Section */}
      <motion.div variants={item} className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-end border border-temple-gold/20 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-50"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/70 to-transparent" />
        <div className="relative z-10 p-6 md:p-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Panel Principal
              </span>
              <span className="text-[11px] text-gray-400 font-bold">Santa Cruz de la Sierra</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-black uppercase leading-tight text-white tracking-wide">
              Hola,<br />
              <span className="text-temple-gold">{user?.name?.split(' ')[0] || 'Paulo'}.</span>
            </h1>
            <p className="text-sm text-gray-300 mt-2 max-w-xl">
              Cuerpo, mente y disciplina diaria para guiar a cada atleta de la comunidad.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate?.('directory')}
              className="px-5 py-3 bg-temple-gold text-black font-extrabold uppercase tracking-wider text-xs rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-temple-gold/20 flex items-center gap-2"
            >
              <Users size={16} />
              <span>Pase de Lista & Atletas</span>
            </button>
            <button
              onClick={() => onNavigate?.('corte-ejecutivo')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold uppercase tracking-wider text-xs rounded-xl transition border border-white/10 flex items-center gap-2"
            >
              <DollarSign size={16} className="text-temple-gold" />
              <span>Tablero P&L Simétrico</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* WIDGET ANTI-BURNOUT: BRIEFING MATUTINO (06:00 AM) */}
      <motion.div variants={item} className="bg-gradient-to-r from-[#0E1424] via-[#12192B] to-black border border-temple-gold/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider">
                <Sparkles size={13} className="text-emerald-400" />
                Piloto Automático Matutino • 06:00 AM
              </span>
              <span className="text-[11px] text-gray-400 font-bold">Sin fricción administrativa</span>
            </div>
            <h3 className="text-lg md:text-xl font-black uppercase text-white tracking-wide">
              {activeStudents} Atletas Activos en {squadCount} Escuadrones Listos Hoy
            </h3>
            <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
              Tu prioridad hoy: <strong className="text-temple-gold">1. Pase de lista grupal matutino</strong> y <strong className="text-emerald-400">2. Notificar vencimientos próximos en 1 toque</strong>. El sistema se encarga del cálculo contable y control de stock.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate?.('directory')}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold uppercase tracking-wider text-xs rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>Pase de Lista (1 Toque)</span>
            </button>
            <button
              onClick={() => onNavigate?.('daily-log')}
              className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-extrabold uppercase tracking-wider text-xs rounded-xl transition border border-white/10 flex items-center gap-2"
            >
              <Clock size={16} className="text-temple-gold" />
              <span>12 Hábitos de Calidad</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            icon: <Users size={22} />, 
            label: 'Atletas Activos', 
            value: `${activeStudents}`, 
            sub: `/ ${totalStudents} registrados`, 
            color: 'text-temple-gold',
            bg: 'from-amber-500/10 to-transparent'
          },
          { 
            icon: <TrendingUp size={22} />, 
            label: 'Ingresos del Mes', 
            value: `Bs. ${monthIncome.toLocaleString()}`, 
            sub: 'Caja registrada', 
            color: 'text-emerald-400',
            bg: 'from-emerald-500/10 to-transparent'
          },
          { 
            icon: <Award size={22} />, 
            label: 'Escuadrones Activos', 
            value: `${squadCount}`, 
            sub: 'Grupos en entrenamiento', 
            color: 'text-blue-400',
            bg: 'from-blue-500/10 to-transparent'
          },
          { 
            icon: <Activity size={22} />, 
            label: 'Retención de Atletas', 
            value: `${retentionRate}%`, 
            sub: 'Índice de permanencia', 
            color: 'text-emerald-400',
            bg: 'from-emerald-500/10 to-transparent'
          },
        ].map((kpi, index) => (
          <motion.div key={index} variants={item}>
            <Card className="bg-[#0E1424]/90 backdrop-blur-xl border-white/10 shadow-lg hover:border-temple-gold/30 transition">
              <CardContent className="!p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{kpi.label}</span>
                  <div className={`p-2 rounded-xl bg-white/5 ${kpi.color}`}>{kpi.icon}</div>
                </div>
                <p className="text-2xl font-black text-white mt-2">{kpi.value}</p>
                <p className="text-[11px] text-gray-500 mt-1 font-medium">{kpi.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Alerta de Retención (Membresías por Vencer) */}
      {expiringStudentsList.length > 0 && (
        <motion.div variants={item}>
          <Card className="border-amber-500/40 bg-amber-500/10 shadow-xl overflow-hidden">
            <CardContent className="!p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    {expiringStudentsList.length} membresía(s) por vencer
                  </h4>
                  <p className="text-xs text-gray-300">
                    Revisa los vencimientos próximos para coordinar la continuidad de sus entrenamientos.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate?.('directory')}
                className="px-4 py-2 bg-amber-500 text-black font-extrabold uppercase tracking-wider text-xs rounded-xl hover:bg-amber-400 transition whitespace-nowrap"
              >
                Ver Lista de Vencimientos
              </button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Radar Anti-Abandono (Alerta de Inasistencia >5 días) */}
      {inactiveStudentsList && inactiveStudentsList.length > 0 && (
        <motion.div variants={item}>
          <Card className="border-red-500/30 bg-red-500/10 shadow-xl overflow-hidden">
            <CardContent className="!p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Radar Anti-Abandono: {inactiveStudentsList.length} atleta(s) con inasistencias
                  </h4>
                  <p className="text-xs text-gray-300">
                    Llevan más de 5 días sin registrar asistencia. Contáctalos para motivarlos y evitar deserciones.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate?.('directory')}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-extrabold uppercase tracking-wider text-xs rounded-xl transition whitespace-nowrap"
              >
                Abrir Seguimiento
              </button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Meta Anual */}
      <motion.div variants={item}>
        <Card className="border-temple-gold/30 bg-gradient-to-r from-[#0E1424] via-[#0B0F19] to-black shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-temple-gold/10 to-transparent pointer-events-none" />
          <CardContent className="!p-6 md:!p-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="text-temple-gold" size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-temple-gold">
                    Meta Anual
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-wide">
                  Formar a 300 atletas en la comunidad
                </h3>
                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  Organizados en <strong className="text-white">25 escuadrones de 12 personas</strong> en tres etapas: 
                  Fase 1 (Iniciación y Paz), Fase 2 (Reto 21 Días / Gedeón) y Fase 3 (Liderazgo / E.A.G.E.).
                </p>
              </div>

              <div className="flex items-center gap-6 bg-black/40 p-4 rounded-2xl border border-white/10">
                <div className="text-center">
                  <p className="text-2xl font-black text-temple-gold">{activeStudents}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Atletas Actuales</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-black text-white">300</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Meta</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-black text-emerald-400">{Math.round((activeStudents / 300) * 100)}%</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Avance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div variants={item} className="lg:col-span-12">
          <Card className="border-white/10 bg-[#0E1424]/90 backdrop-blur-xl">
            <CardContent className="!p-6">
              <h3 className="text-base font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="text-temple-gold" size={18} />
                Accesos Directos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { title: 'Directorio de Atletas', desc: 'Fichas y datos de alumnos', emoji: '👥', tab: 'directory' },
                  { title: 'Fases F1 a F3', desc: 'Progreso y etapas de atletas', emoji: '🛡️', tab: 'sales-pipeline' },
                  { title: 'Prospectos y Leads', desc: 'Contactos y nuevas pruebas', emoji: '🎯', tab: 'leads-pipeline' },
                  { title: 'Caja y Finanzas', desc: 'Ingresos, gastos y balance', emoji: '💰', tab: 'finance-ledger' },
                  { title: 'Guías y SOPs', desc: 'Protocolos de atención y camp', emoji: '🧠', tab: 'sops' },
                  { title: 'Mi Registro Diario', desc: 'Hábitos y calendario del mes', emoji: '☀️', tab: 'daily' },
                  { title: 'Recetario Nutricional', desc: 'Bebidas y snacks saludables', emoji: '🍵', tab: 'recipes' },
                  { title: 'Corte Semanal', desc: 'Resumen y balance 50/50', emoji: '📊', tab: 'corte-ejecutivo' },
                ].map((action, i) => (
                  <div
                    key={i}
                    onClick={() => onNavigate?.(action.tab)}
                    className="flex items-center gap-4 p-4 bg-black/50 hover:bg-black/80 rounded-2xl border border-white/5 hover:border-temple-gold/40 transition-all cursor-pointer group shadow-md"
                  >
                    <span className="text-2xl p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">{action.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white group-hover:text-temple-gold transition truncate">{action.title}</p>
                      <p className="text-xs text-gray-500 truncate">{action.desc}</p>
                    </div>
                    <ArrowRight size={14} className="text-gray-600 group-hover:text-temple-gold group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Motivational Quote */}
      <motion.div variants={item} className="text-center py-6 border-t border-white/5">
        <p className="italic text-base md:text-lg text-gray-300">
          "Disciplina, nutrición y constancia: cuerpo y mente en equilibrio."
        </p>
        <p className="text-xs text-temple-gold uppercase tracking-[0.2em] font-extrabold mt-2">
          Paulo Alberto Gil Cuellar • TempleFit Santa Cruz, Bolivia
        </p>
      </motion.div>
    </motion.div>
  );
}
