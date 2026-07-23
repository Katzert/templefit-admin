import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { DollarSign, Users, TrendingUp, BarChart3, Target, Rocket } from 'lucide-react';
import { Slider } from '../components/ui/slider';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

export function FinancialDashboard() {
  const [newStudents, setNewStudents] = useState(8);
  const [avgTicket, setAvgTicket] = useState(350);
  const [retention, setRetention] = useState(75);

  // Calculate 6-month projection: cumulative revenue accounting for retention
  const projection = (() => {
    let total = 0;
    let activeBase = 65; // current active students
    for (let m = 1; m <= 6; m++) {
      activeBase = Math.round(activeBase * (retention / 100)) + newStudents;
      total += activeBase * avgTicket;
    }
    return total;
  })();

  const formatBs = (n: number) => `Bs. ${n.toLocaleString('es-BO')}`;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      {/* Hero */}
      <motion.div variants={item} className="relative rounded-3xl overflow-hidden min-h-[220px] flex items-end">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-temple-navy-dark via-temple-navy-dark/70 to-transparent" />
        <div className="relative z-10 p-6 md:p-10 w-full">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-temple-gold mb-2">Sistema de Control TempleFit V3.0</p>
          <h1 className="text-3xl md:text-4xl font-serif font-black uppercase text-white">
            CORONA DE <span className="text-temple-gold italic">VICTORIA.</span>
          </h1>
          <p className="text-sm text-gray-300 mt-2">Nutre, Crea, Reta, Mente, Cuerpo y Espíritu en Santa Cruz — Bolivia.</p>
        </div>
      </motion.div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <DollarSign size={36} />, value: '10,500', unit: 'Bs.', label: 'INGRESOS DEL MES', color: 'border-t-temple-gold', accent: 'text-temple-gold' },
          { icon: <Users size={36} />, value: '65', unit: '', label: 'VIDAS IMPACTADAS', color: 'border-t-temple-gold-bright', accent: 'text-temple-gold-bright' },
          { icon: <TrendingUp size={36} />, value: '+12%', unit: '', label: 'MARGEN NETO', color: 'border-t-temple-green', accent: 'text-temple-green' },
        ].map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className={`${kpi.color} border-t-4`}>
              <CardContent className="!p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                  <h3 className="text-4xl font-black text-white">
                    {kpi.value} <span className={`text-lg ${kpi.accent}`}>{kpi.unit}</span>
                  </h3>
                </div>
                <div className={`${kpi.accent} opacity-30`}>{kpi.icon}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Projection Simulator */}
        <motion.div variants={item} className="lg:col-span-5">
          <Card className="h-full">
            <CardContent className="!p-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <BarChart3 className="text-temple-gold" size={20} />
                Simulador de Proyección
              </h3>
              <p className="text-xs text-gray-500 mb-6">Ajusta los parámetros para proyectar tus ingresos a 6 meses.</p>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">
                    <span>Alumnos nuevos / mes</span>
                    <span className="text-temple-gold">{newStudents}</span>
                  </div>
                  <Slider value={[newStudents]} onValueChange={(v) => setNewStudents(v[0])} max={30} step={1} />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">
                    <span>Ticket promedio (Bs.)</span>
                    <span className="text-temple-gold">{avgTicket}</span>
                  </div>
                  <Slider value={[avgTicket]} onValueChange={(v) => setAvgTicket(v[0])} max={1000} step={50} />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">
                    <span>Tasa de retención</span>
                    <span className="text-temple-gold">{retention}%</span>
                  </div>
                  <Slider value={[retention]} onValueChange={(v) => setRetention(v[0])} max={100} step={5} />
                </div>
                <div className="pt-4 border-t border-white/5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Proyección 6 meses</p>
                  <p className="text-4xl font-black text-temple-gold">{formatBs(projection)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Roadmap */}
        <motion.div variants={item} className="lg:col-span-7">
          <Card className="h-full">
            <CardContent className="!p-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Rocket className="text-temple-gold" size={20} />
                Hoja de Ruta — Expansión
              </h3>
              <p className="text-xs text-gray-500 mb-6">Fases estratégicas para el crecimiento del ecosistema TempleFit.</p>
              <div className="space-y-6">
                {[
                  { phase: 'Fase 1', title: 'Consolidación Local', period: 'Ene - Mar 2026', status: 'Completado', pct: 100, color: 'bg-temple-green' },
                  { phase: 'Fase 2', title: 'Expansión Digital', period: 'Abr - Jun 2026', status: 'En Progreso', pct: 90, color: 'bg-temple-gold' },
                  { phase: 'Fase 3', title: 'Franquicias', period: 'Jul - Sep 2026', status: 'Planificando', pct: 15, color: 'bg-temple-gold-bright' },
                  { phase: 'Fase 4', title: 'Escala Regional', period: 'Oct - Dic 2026', status: 'Pendiente', pct: 0, color: 'bg-white/20' },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <Target size={14} className="text-temple-gold" />
                        <span className="font-bold text-white uppercase tracking-wider">{f.phase}: {f.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">{f.period}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          f.status === 'Completado' ? 'bg-temple-green/10 text-temple-green border border-temple-green/30' :
                          f.status === 'En Progreso' ? 'bg-temple-gold/10 text-temple-gold border border-temple-gold/30' :
                          'bg-white/5 text-gray-400 border border-white/10'
                        }`}>{f.status}</span>
                      </div>
                    </div>
                    <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${f.pct}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
                        className={`h-full ${f.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
