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
  ArrowRight
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
    totalStudents,
    monthIncome,
    squadCount
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

    return { 
      streak, 
      water, 
      activeStudents: active, 
      expiringStudentsList: expiring,
      totalStudents: allStudents.length,
      monthIncome: income,
      squadCount: uniqueSquads.size
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
                Centro de Mando 2026
              </span>
              <span className="text-[11px] text-gray-400 font-bold">Santa Cruz de la Sierra</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-black uppercase leading-tight text-white tracking-wide">
              Bienvenido,<br />
              <span className="text-temple-gold">{user?.name?.split(' ')[0] || 'Paulo'}.</span>
            </h1>
            <p className="text-sm text-gray-300 mt-2 max-w-xl italic">
              "El espíritu da el diseño. El cuerpo es el templo. La mente crea y edifica vidas."
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate?.('directory')}
              className="px-5 py-3 bg-temple-gold text-black font-extrabold uppercase tracking-wider text-xs rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-temple-gold/20 flex items-center gap-2"
            >
              <Users size={16} />
              <span>Directorio de Atletas</span>
            </button>
            <button
              onClick={() => onNavigate?.('sales-pipeline')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold uppercase tracking-wider text-xs rounded-xl transition border border-white/10 flex items-center gap-2"
            >
              <ShieldCheck size={16} className="text-temple-gold" />
              <span>Pipeline F1-F3</span>
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
            icon: <ShieldCheck size={22} />, 
            label: 'Escuadrones Activos', 
            value: `${squadCount}`, 
            sub: 'meta anual: 25', 
            color: 'text-blue-400',
            bg: 'from-blue-500/10 to-transparent'
          },
          { 
            icon: <AlertCircle size={22} />, 
            label: 'Por Vencer (Renovación)', 
            value: `${expiringStudentsList.length}`, 
            sub: 'acción inmediata', 
            color: 'text-amber-400',
            bg: 'from-amber-500/10 to-transparent'
          },
          { 
            icon: <DollarSign size={22} />, 
            label: 'Ingresos del Mes', 
            value: `Bs. ${monthIncome.toLocaleString('es-BO')}`, 
            sub: 'recaudación real', 
            color: 'text-emerald-400',
            bg: 'from-emerald-500/10 to-transparent'
          },
        ].map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className="!p-5 border-white/10 bg-[#0E1424]/90 backdrop-blur-xl relative overflow-hidden group hover:border-temple-gold/40 transition-all shadow-xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bg} opacity-50 pointer-events-none`} />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">{kpi.label}</p>
                  <h3 className="text-3xl font-black text-white tracking-tight">
                    {kpi.value}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 mt-1">{kpi.sub}</p>
                </div>
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${kpi.color} shadow-sm group-hover:scale-110 transition-transform`}>
                  {kpi.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Actionable Renewal Alerts (WhatsApp Direct Button) */}
      {expiringStudentsList.length > 0 && (
        <motion.div variants={item}>
          <Card className="border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-[#0B0F19] to-black shadow-2xl">
            <CardContent className="!p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <AlertCircle size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      Alertas de Renovación de Membresía ({expiringStudentsList.length})
                    </h3>
                    <p className="text-xs text-gray-400">Planes con vencimiento próximo que requieren cobranza y seguimiento.</p>
                  </div>
                </div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 w-max">
                  Vencimiento Próximo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {expiringStudentsList.map((st) => (
                  <div key={st.id} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between gap-4 transition-all">
                    <div>
                      <p className="text-sm font-bold text-white">{st.name}</p>
                      <p className="text-xs text-temple-gold font-semibold">{st.plan || 'Reto 21 Días'}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{st.phone} • {st.escuadronId}</p>
                    </div>
                    <a
                      href={`https://wa.me/${st.phone?.replace(/[^0-9]/g, '') || '59170000000'}?text=${encodeURIComponent(
                        `¡Hola ${st.name}! 👋 Te escribo de TempleFit para recordarte que tu plan vence pronto. ¡Sigamos con paso firme en tu entrenamiento y transformación integral!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 bg-emerald-500 text-black font-extrabold hover:bg-emerald-400 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 flex-shrink-0"
                    >
                      <MessageSquare size={15} />
                      <span>Cobrar WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Meta Anual del Movimiento TempleFit */}
      <motion.div variants={item}>
        <Card className="border-temple-gold/30 bg-gradient-to-r from-[#0E1424] via-[#0B0F19] to-black shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-temple-gold/10 to-transparent pointer-events-none" />
          <CardContent className="!p-6 md:!p-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="text-temple-gold" size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-temple-gold">
                    Meta Anual 2026: Evangelismo Fitness
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase text-white tracking-wide">
                  Formar y Certificar a 300 Atletas Íntegros de las Ventas
                </h3>
                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  Estructura replicable en <strong className="text-white">25 Escuadrones de 12 Atletas</strong> bajo las 3 fases: 
                  Fase 1 (Escuadrón de Paz), Fase 2 (Gedeón / Reto 21 Días) y Fase 3 (Escuadrón de Cristo / E.A.G.E.).
                </p>
              </div>

              <div className="flex items-center gap-6 bg-black/40 p-4 rounded-2xl border border-white/10">
                <div className="text-center">
                  <p className="text-2xl font-black text-temple-gold">{activeStudents}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Atletas Formados</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-black text-white">300</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Meta Anual</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-black text-emerald-400">{Math.round((activeStudents / 300) * 100)}%</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Progreso</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div variants={item} className="lg:col-span-12">
          <Card className="border-white/10 bg-[#0E1424]/90 backdrop-blur-xl">
            <CardContent className="!p-6">
              <h3 className="text-base font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="text-temple-gold" size={18} />
                Acciones Rápidas del Sistema
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { title: 'Directorio Atletas', desc: 'Fichas holísticas de 3 pilares', emoji: '👥', tab: 'directory' },
                  { title: 'Pipeline F1-F3', desc: 'Gestión y avance por fases', emoji: '🛡️', tab: 'sales-pipeline' },
                  { title: 'CRM Prospectos', desc: 'Captación de nuevos alumnos', emoji: '🎯', tab: 'leads-pipeline' },
                  { title: 'Libro Diario & Finanzas', desc: 'Ingresos, gastos y regla 50/50', emoji: '💰', tab: 'finance-ledger' },
                  { title: 'SOPs & Estrategia', desc: 'Manuales y campañas de mkt', emoji: '🧠', tab: 'sops' },
                  { title: 'Hábitos & Mi Día', desc: 'Scorecard de 3 horas diarias', emoji: '☀️', tab: 'daily' },
                  { title: 'Gestión de Recetas', desc: 'Snack Bar y Nutrición bíblica', emoji: '🍵', tab: 'recipes' },
                  { title: 'Corte Ejecutivo', desc: 'Balance semanal y metas', emoji: '📊', tab: 'corte-ejecutivo' },
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
        <p className="font-serif italic text-lg md:text-xl text-gray-300">
          "Nutre, Reta, Vive — Mente, Cuerpo y Espíritu."
        </p>
        <p className="text-xs text-temple-gold uppercase tracking-[0.3em] font-extrabold mt-2">
          Paulo Alberto Gil Cuellar • TEMPLEFIT Santa Cruz, Bolivia
        </p>
      </motion.div>
    </motion.div>
  );
}
