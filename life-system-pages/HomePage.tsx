'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { getCRMDatabase } from '../store';
import { Student } from '../types';
import { 
  Flame, 
  Users, 
  Zap, 
  Droplets, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  Award,
  ArrowRight,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Check,
  Copy,
  AlertTriangle
} from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface HomePageProps {
  onNavigate?: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { user, selectedStudent, setSelectedStudent } = useAuth();
  const studentEmail = selectedStudent?.email || 'default';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyMessage = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

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
    // --- Daily Log data (Hábitos y Disciplina) ---
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
    const allStudents: Student[] = db.students || [];
    const active = allStudents.filter(s => s.status === 'active').length;
    const expiring = allStudents.filter(s => s.status === 'expiring');
    
    // Squads count
    const uniqueSquads = new Set(allStudents.map(s => s.escuadronId).filter(Boolean));

    // Current Month Income
    const now = new Date();
    const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const txs = db.transactions || [];
    let income = txs
      .filter(t => t.type === 'income' && t.date.startsWith(monthPrefix))
      .reduce((s, t) => s + t.amount, 0);

    // Fallback proyectado si el mes no tuviese transacciones manuales aún
    if (income === 0 && active > 0) {
      income = active * 200;
    }

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
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBF9F5] via-[#FBF9F5]/80 to-transparent dark:from-[#0B0F19] dark:via-[#0B0F19]/70 dark:to-transparent" />
        <div className="relative z-10 p-6 md:p-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Panel Principal
              </span>
              <span className="text-[11px] text-slate-600 dark:text-gray-400 font-bold">Santa Cruz de la Sierra</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-black uppercase leading-tight text-temple-navy dark:text-white tracking-wide">
              Hola,<br />
              <span className="text-temple-gold">{user?.name?.split(' ')[0] || 'Paulo'}.</span>
            </h1>
            <p className="text-sm text-slate-700 dark:text-gray-300 mt-2 max-w-xl">
              Cuerpo, mente y disciplina diaria para guiar a cada atleta de la comunidad CristoFit.
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
              className="px-5 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 text-temple-navy dark:text-white font-extrabold uppercase tracking-wider text-xs rounded-xl transition border border-black/10 dark:border-white/10 flex items-center gap-2"
            >
              <DollarSign size={16} className="text-temple-gold" />
              <span>Tablero P&L Simétrico</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* WIDGET ANTI-BURNOUT: BRIEFING MATUTINO (06:00 AM) */}
      <motion.div variants={item} className="bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#12192B] dark:to-black text-temple-navy dark:text-white border border-temple-gold/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider">
                <Sparkles size={13} className="text-emerald-400" />
                Piloto Automático Matutino • 06:00 AM
              </span>
              <span className="text-[11px] text-slate-600 dark:text-gray-400 font-bold">Sin fricción administrativa</span>
            </div>
            <h3 className="text-lg md:text-xl font-black uppercase text-temple-navy dark:text-white tracking-wide">
              {activeStudents} Atletas Activos en {squadCount} Escuadrones Listos Hoy
            </h3>
            <p className="text-xs text-slate-700 dark:text-gray-300 max-w-2xl leading-relaxed">
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
              className="px-5 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-temple-navy dark:text-white font-extrabold uppercase tracking-wider text-xs rounded-xl transition border border-black/10 dark:border-white/10 flex items-center gap-2"
            >
              <Clock size={16} className="text-temple-gold" />
              <span>12 Hábitos de Calidad</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* WIDGET HÁBITOS & DISCIPLINA DIARIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <Card className="bg-white dark:bg-[#0E1424]/90 border border-amber-500/30 shadow-lg hover:border-amber-500/50 transition">
            <CardContent className="!p-5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  <Flame size={24} className="animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-400 font-bold">Racha de Disciplina</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <p className="text-2xl font-black text-slate-800 dark:text-white">{streak}</p>
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Días Consecutivos</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-gray-400 mt-0.5 font-medium">Constancia en entrenamiento matutino y oración</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate?.('daily-log')}
                className="px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shrink-0"
              >
                <span>Hábitos</span>
                <ArrowRight size={13} />
              </button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-white dark:bg-[#0E1424]/90 border border-blue-500/30 shadow-lg hover:border-blue-500/50 transition">
            <CardContent className="!p-5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Droplets size={24} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-400 font-bold">Hidratación Diaria</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <p className="text-2xl font-black text-slate-800 dark:text-white">{water}L</p>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">/ 3.5L Meta</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-gray-400 mt-0.5 font-medium">Protocolo Buteyko & Sales ElectroHidra</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate?.('daily-log')}
                className="px-3.5 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shrink-0"
              >
                <span>Hidratar</span>
                <ArrowRight size={13} />
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

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
            <Card className="bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl border-black/10 dark:border-white/10 shadow-lg hover:border-temple-gold/30 transition">
              <CardContent className="!p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-gray-400 font-bold">{kpi.label}</span>
                  <div className={`p-2 rounded-xl bg-black/5 dark:bg-white/5 ${kpi.color}`}>{kpi.icon}</div>
                </div>
                <p className="text-2xl font-black text-slate-800 dark:text-white mt-2">{kpi.value}</p>
                <p className="text-[11px] text-slate-500 dark:text-gray-500 mt-1 font-medium">{kpi.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Alerta de Retención: Membresías por Vencer con WhatsApp en 1 toque */}
      {expiringStudentsList.length > 0 && (
        <motion.div variants={item}>
          <Card className="border-amber-500/40 bg-amber-500/10 shadow-xl overflow-hidden">
            <CardContent className="!p-5 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500 shrink-0">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <span>{expiringStudentsList.length} membresía(s) por vencer</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-500 border border-amber-500/40">Acción Requerida</span>
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-gray-300">
                      Gestiona la renovación personalizada antes del corte para asegurar su continuidad deportiva.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate?.('directory')}
                  className="px-4 py-2 bg-amber-500 text-black font-extrabold uppercase tracking-wider text-xs rounded-xl hover:bg-amber-400 transition whitespace-nowrap shrink-0 shadow-md"
                >
                  Ver Todos en Directorio
                </button>
              </div>

              {/* Lista Accionable de Atletas por Vencer */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {expiringStudentsList.slice(0, 6).map((student) => {
                  const cleanPhone = student.phone?.replace(/[^0-9]/g, '') || '59170000000';
                  const messageText = `Hola ${student.name}, te saluda Paulo de TempleFit. ¿Cómo estás? Te escribo para coordinar la continuidad de tus entrenamientos y la renovación de tu plan (${student.plan || 'Membresía'}). ¿Seguimos firmes este mes?`;
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

                  return (
                    <div 
                      key={student.id}
                      className="p-3.5 bg-white/70 dark:bg-black/40 rounded-2xl border border-amber-500/30 flex flex-col justify-between gap-3 shadow-sm hover:border-amber-500/60 transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 dark:text-white truncate">{student.name}</p>
                          <p className="text-[11px] text-amber-500 font-bold truncate">{student.plan}</p>
                          <p className="text-[10px] text-slate-500 dark:text-gray-400">
                            Vence: <strong className="text-slate-700 dark:text-gray-300">{student.renewalDate || 'Pronto'}</strong>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (setSelectedStudent) setSelectedStudent(student);
                            onNavigate?.('directory');
                          }}
                          className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-lg text-[10px] font-black uppercase transition shrink-0"
                          title="Ver Ficha Integral"
                        >
                          Ficha
                        </button>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-black/5 dark:border-white/5">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 px-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-[11px] uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <MessageSquare size={13} />
                          <span>WhatsApp</span>
                        </a>
                        <button
                          onClick={() => handleCopyMessage(student.id, messageText)}
                          className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 rounded-xl transition border border-black/5 dark:border-white/5 shrink-0"
                          title="Copiar texto de mensaje"
                        >
                          {copiedId === student.id ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Radar Anti-Abandono: Inasistencia >5 días con reactivación en 1 toque */}
      {inactiveStudentsList && inactiveStudentsList.length > 0 && (
        <motion.div variants={item}>
          <Card className="border-red-500/30 bg-red-500/10 shadow-xl overflow-hidden">
            <CardContent className="!p-5 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-500/20 text-red-500 shrink-0">
                    <AlertTriangle size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <span>Radar Anti-Abandono: {inactiveStudentsList.length} atleta(s) con inasistencias</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500/20 text-red-400 border border-red-500/40">Riesgo Deserción</span>
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-gray-300">
                      Llevan más de 5 días sin registrar asistencia. Contáctalos hoy mismo para motivarlos y reactivarlos.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate?.('directory')}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 font-extrabold uppercase tracking-wider text-xs rounded-xl transition whitespace-nowrap shrink-0"
                >
                  Abrir Seguimiento
                </button>
              </div>

              {/* Lista Accionable de Atletas en Riesgo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {inactiveStudentsList.slice(0, 6).map((student) => {
                  const cleanPhone = student.phone?.replace(/[^0-9]/g, '') || '59170000000';
                  const lastDate = student.attendanceHistory?.[0]?.date || 'Sin registro';
                  const messageText = `Hola ${student.name}, te saluda Paulo de TempleFit. Notamos que no has podido venir a entrenar en estos días. ¿Todo bien? ¡Tu escuadrón (${student.escuadronId || 'Paz-Alfa'}) te espera para seguir firmes con tus metas!`;
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

                  return (
                    <div 
                      key={student.id}
                      className="p-3.5 bg-white/70 dark:bg-black/40 rounded-2xl border border-red-500/30 flex flex-col justify-between gap-3 shadow-sm hover:border-red-500/60 transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-800 dark:text-white truncate">{student.name}</p>
                          <p className="text-[11px] text-red-400 font-bold truncate">Escuadrón: {student.escuadronId || 'Sin asignar'}</p>
                          <p className="text-[10px] text-slate-500 dark:text-gray-400">
                            Última asistencia: <strong className="text-slate-700 dark:text-gray-300">{lastDate}</strong>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (setSelectedStudent) setSelectedStudent(student);
                            onNavigate?.('directory');
                          }}
                          className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-[10px] font-black uppercase transition shrink-0"
                          title="Ver Ficha Integral"
                        >
                          Ficha
                        </button>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-black/5 dark:border-white/5">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1.5 px-2.5 bg-red-500 hover:bg-red-400 text-white font-extrabold rounded-xl text-[11px] uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <MessageSquare size={13} />
                          <span>Reactivar WA</span>
                        </a>
                        <button
                          onClick={() => handleCopyMessage(student.id, messageText)}
                          className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 rounded-xl transition border border-black/5 dark:border-white/5 shrink-0"
                          title="Copiar texto de mensaje"
                        >
                          {copiedId === student.id ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Meta Anual */}
      <motion.div variants={item}>
        <Card className="border-temple-gold/30 bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white shadow-2xl relative overflow-hidden">
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
                <h3 className="text-xl md:text-2xl font-black uppercase text-temple-navy dark:text-white tracking-wide">
                  Formar a 300 atletas en la comunidad
                </h3>
                <p className="text-xs text-slate-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                  Organizados en <strong className="text-temple-navy dark:text-white">25 escuadrones de 12 personas</strong> en tres etapas: 
                  Fase 1 (Iniciación y Paz), Fase 2 (Reto 21 Días / Gedeón) y Fase 3 (Liderazgo / E.A.G.E.).
                </p>
              </div>

              <div className="flex items-center gap-6 bg-black/[0.03] dark:bg-black/40 p-4 rounded-2xl border border-black/10 dark:border-white/10">
                <div className="text-center">
                  <p className="text-2xl font-black text-temple-gold">{activeStudents}</p>
                  <p className="text-[10px] text-slate-600 dark:text-gray-400 uppercase tracking-wider font-bold">Atletas Actuales</p>
                </div>
                <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-800 dark:text-white">300</p>
                  <p className="text-[10px] text-slate-600 dark:text-gray-400 uppercase tracking-wider font-bold">Meta</p>
                </div>
                <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-black text-emerald-400">{Math.round((activeStudents / 300) * 100)}%</p>
                  <p className="text-[10px] text-slate-600 dark:text-gray-400 uppercase tracking-wider font-bold">Avance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div variants={item} className="lg:col-span-12">
          <Card className="border-black/10 dark:border-white/10 bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl">
            <CardContent className="!p-6">
              <h3 className="text-base font-black text-temple-navy dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
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
                    className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-black/50 hover:bg-black/8 dark:bg-black/80 rounded-2xl border border-black/5 dark:border-white/5 hover:border-temple-gold/40 transition-all cursor-pointer group shadow-md"
                  >
                    <span className="text-2xl p-2 rounded-xl bg-black/5 dark:bg-white/5 group-hover:scale-110 transition-transform">{action.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-temple-gold transition truncate">{action.title}</p>
                      <p className="text-xs text-slate-500 dark:text-gray-500 truncate">{action.desc}</p>
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
      <motion.div variants={item} className="text-center py-6 border-t border-black/5 dark:border-white/5">
        <p className="italic text-base md:text-lg text-slate-700 dark:text-gray-300">
          "Disciplina, nutrición y constancia: cuerpo y mente en equilibrio."
        </p>
        <p className="text-xs text-temple-gold uppercase tracking-[0.2em] font-extrabold mt-2">
          Paulo Alberto Gil Cuellar • TempleFit Santa Cruz, Bolivia
        </p>
      </motion.div>
    </motion.div>
  );
}
