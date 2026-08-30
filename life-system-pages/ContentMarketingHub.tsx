'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { getCRMDatabase, saveCRMDatabase } from '../store';
import { ContentPost } from '../types';
import { 
  Calendar, 
  Share2, 
  Copy, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Plus, 
  Sparkles, 
  Video, 
  Flame, 
  Crown, 
  Folder, 
  FolderOpen,
  Image as ImageIcon,
  MessageSquare,
  X,
  Search,
  Filter,
  Map,
  Table
} from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

const twelveMonthRoadmap = [
  { month: 'Mes 1', phase: 'F1: Cimentación', activities: 'Contratos, Sistema Digital, Reclutamiento, Permisos.', plan: 'Firma de roles y setup tecnológico.' },
  { month: 'Mes 2', phase: 'F2: Captación (A)', activities: 'Ventas Reto 21 Días, Medios, Entrevistas vendedores.', plan: 'Embudo de ventas y citas con medios.' },
  { month: 'Mes 3', phase: 'F3: Inicio CAMP (A)', activities: 'NeuroEntrenamiento, Discipulado (1-30), Eventos s/tarima.', plan: 'Capacitación teórica y práctica inicial.' },
  { month: 'Mes 4', phase: 'F3: Inicio CAMP (B)', activities: 'Discipulado (31-60), Transición Parque Urbano.', plan: 'Campaña de expectativa masiva.' },
  { month: 'Mes 5', phase: 'F4: Consolidación', activities: 'Práctica supervisada, Discipulado (61-90), Eventos s/tarima.', plan: 'Refuerzo de ventas y permanencia.' },
  { month: 'Mes 6', phase: 'F5: Multiplicación (A)', activities: 'Eventos c/tarima, Premiación (Copa/Corona), Maduración.', plan: 'Ejecución de primer gran evento masivo.' },
  { month: 'Mes 7', phase: 'F5: Multiplicación (B)', activities: 'Segundo evento masivo, Evaluación de impacto.', plan: 'Ajuste de logística según resultados previos.' },
  { month: 'Mes 8', phase: 'F5: Multiplicación (C)', activities: 'Tercer evento masivo, Lanzamiento iniciativas.', plan: 'Consolidación de marca en la ciudad.' },
  { month: 'Mes 9', phase: 'F6: Expansión (A)', activities: 'Escalado a nuevas zonas, Atracción masiva.', plan: 'Mapeo y apertura de nuevos puntos.' },
  { month: 'Mes 10', phase: 'F6: Expansión (B)', activities: 'Consolidación nuevas zonas, Alianzas regionales.', plan: 'Formalización de alianzas estratégicas.' },
  { month: 'Mes 11', phase: 'F7: Proyección', activities: 'Auditoría de KPIs, Sumatoria de logros.', plan: 'Análisis integral del rendimiento anual.' },
  { month: 'Mes 12', phase: 'F7: Consolidación', activities: 'Plan Año 2, Movimiento Consolidado, Celebración.', plan: 'Lanzamiento de servicios futuros.' }
];

export function ContentMarketingHub() {
  const [hubView, setHubView] = useState<'content' | 'annual-roadmap'>('content');
  const [selectedMonth, setSelectedMonth] = useState<1 | 2 | 3>(1);
  const [pillarFilter, setPillarFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const [posts, setPosts] = useState<ContentPost[]>(() => {
    const db = getCRMDatabase();
    return db.contentPosts || [];
  });

  // New Post Form State
  const [newPost, setNewPost] = useState<Partial<ContentPost>>({
    monthIndex: 1,
    dayOfWeek: 'Lunes',
    pillar: 'Storytelling & Testimonios',
    title: '',
    hookAndStory: '',
    callToAction: '',
    driveDocLink: '',
    status: 'scheduled',
    targetAudience: 'Comunidad General'
  });

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesMonth = post.monthIndex === selectedMonth;
      const matchesPillar = pillarFilter === 'all' || post.pillar === pillarFilter;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.hookAndStory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.callToAction.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesMonth && matchesPillar && matchesSearch;
    });
  }, [posts, selectedMonth, pillarFilter, searchTerm]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.hookAndStory) return;

    const postToSave: ContentPost = {
      id: `post-${Date.now()}`,
      monthIndex: newPost.monthIndex || selectedMonth,
      dayOfWeek: (newPost.dayOfWeek as any) || 'Lunes',
      pillar: (newPost.pillar as any) || 'Storytelling & Testimonios',
      title: newPost.title,
      hookAndStory: newPost.hookAndStory,
      callToAction: newPost.callToAction || '',
      driveDocLink: newPost.driveDocLink || '',
      status: (newPost.status as any) || 'scheduled',
      targetAudience: newPost.targetAudience || 'Comunidad General'
    };

    const updated = [postToSave, ...posts];
    setPosts(updated);

    const db = getCRMDatabase();
    db.contentPosts = updated;
    saveCRMDatabase(db);

    setIsModalOpen(false);
    setNewPost({
      monthIndex: selectedMonth,
      dayOfWeek: 'Lunes',
      pillar: 'Storytelling & Testimonios',
      title: '',
      hookAndStory: '',
      callToAction: '',
      driveDocLink: '',
      status: 'scheduled',
      targetAudience: 'Comunidad General'
    });
  };

  const resourceFolders = [
    { name: 'Guiones & Storytelling (90 Días)', count: '12 guiones', icon: <FileText size={20} className="text-amber-400" />, link: 'https://drive.google.com' },
    { name: 'Artes & Fotografías CristoFit Camp', count: '45 fotos HD', icon: <ImageIcon size={20} className="text-emerald-400" />, link: 'https://drive.google.com' },
    { name: 'Recetario Snack Bar & AbuelaFit', count: '8 PDFs', icon: <Sparkles size={20} className="text-blue-400" />, link: 'https://drive.google.com' },
    { name: 'Expediente VIP Antonio Eid', count: 'Plan Maestro', icon: <Crown size={20} className="text-temple-gold" />, link: 'https://drive.google.com' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-16 font-sans max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <motion.div variants={item} className="bg-white dark:bg-gradient-to-r dark:from-[#0E1424] dark:via-[#0B0F19] dark:to-black text-temple-navy dark:text-white p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-temple-gold/20 text-temple-gold border border-temple-gold/40 text-[10px] font-black uppercase tracking-[0.2em]">
                Contenido & Storytelling
              </span>
              <span className="text-[11px] text-slate-600 dark:text-gray-400 font-bold">Matriz de 90 Días Replicable</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-temple-navy dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Share2 className="text-temple-gold" size={26} />
              Marketing & Plan Estratégico
            </h2>
            <p className="text-xs md:text-sm text-slate-700 dark:text-gray-300 mt-1 max-w-2xl">
              Banco de contenidos 90D para redes • Matriz Maestra de Expansión Anual (Mes 1 a 12) • Enlaces directos a Google Drive.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-white dark:bg-black/5 dark:bg-black/60 p-1 rounded-2xl border border-black/10 dark:border-white/10">
              <button
                onClick={() => setHubView('content')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  hubView === 'content'
                    ? 'bg-temple-gold text-black font-extrabold shadow-md'
                    : 'text-slate-600 dark:text-gray-400 hover:text-white'
                }`}
              >
                1. Banco de Redes (90D)
              </button>
              <button
                onClick={() => setHubView('annual-roadmap')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  hubView === 'annual-roadmap'
                    ? 'bg-emerald-500 text-black font-extrabold shadow-md'
                    : 'text-slate-600 dark:text-gray-400 hover:text-white'
                }`}
              >
                2. Plan Anual (Mes 1 a 12)
              </button>
            </div>

            {hubView === 'content' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-temple-gold text-black rounded-xl font-extrabold hover:bg-amber-400 transition-all uppercase tracking-wider text-xs shadow-lg shadow-temple-gold/20 w-max shrink-0"
              >
                <Plus size={16} /> Nueva Publicación
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Resource Folders Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resourceFolders.map((folder, idx) => (
          <a
            key={idx}
            href={folder.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 hover:border-temple-gold/40 rounded-2xl transition group flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white dark:bg-black/5 dark:bg-white/5 group-hover:scale-110 transition">
                {folder.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-temple-navy dark:text-white group-hover:text-temple-gold transition line-clamp-1">{folder.name}</h4>
                <p className="text-[10px] text-slate-500 dark:text-gray-500 font-medium">{folder.count}</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-slate-500 dark:text-gray-500 group-hover:text-white transition" />
          </a>
        ))}
      </motion.div>

      {hubView === 'annual-roadmap' ? (
        /* MATRIZ MAESTRA DE EXPANSIÓN ANUAL (MES 1 A MES 12) */
        <motion.div variants={item} className="bg-white dark:bg-[#0E1424]/90 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
                <Map size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-temple-navy dark:text-white uppercase tracking-wider">
                  Matriz Maestra de Expansión Anual (F1 a F7)
                </h3>
                <p className="text-xs text-slate-600 dark:text-gray-400">
                  Planificación estratégica de 12 meses • Actividades clave • Eventos masivos • Planes de acción estándar
                </p>
              </div>
            </div>
            <span className="px-3.5 py-1.5 bg-black/5 dark:bg-black/60 border border-black/10 dark:border-white/10 rounded-xl text-xs tabular-nums text-emerald-400 font-bold self-start sm:self-auto">
              Horizonte: 12 Meses
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-y border-black/10 dark:border-white/10 text-[11px] uppercase tracking-wider text-slate-600 dark:text-gray-400">
                  <th className="py-3.5 px-4 font-black w-24">Mes</th>
                  <th className="py-3.5 px-4 font-black w-48">Fase / Concepto</th>
                  <th className="py-3.5 px-4 font-black">Actividades Clave</th>
                  <th className="py-3.5 px-4 font-black">Plan de Acción Estándar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {twelveMonthRoadmap.map((row) => (
                  <tr key={row.month} className="hover:bg-black/5 dark:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-black tabular-nums text-temple-gold whitespace-nowrap">
                      {row.month}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-white">
                      <span className="px-2.5 py-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 inline-block text-[11px]">
                        {row.phase}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-gray-300 font-medium leading-relaxed">
                      {row.activities}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-300 font-bold leading-relaxed">
                      {row.plan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        /* BANCO DE CONTENIDOS 90 DÍAS */
        <>
          {/* Month Tabs & Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-black/5 dark:bg-black/60 p-3 rounded-2xl border border-black/10 dark:border-white/10">
            {/* Month Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {[
                { index: 1, label: 'Mes 1: Lanzamiento & Hábitos' },
                { index: 2, label: 'Mes 2: Reto 21D & Nutrición' },
                { index: 3, label: 'Mes 3: CristoFit Camp & VIP' },
              ].map(m => (
                <button
                  key={m.index}
                  onClick={() => setSelectedMonth(m.index as any)}
                  className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    selectedMonth === m.index
                      ? 'bg-temple-gold text-black shadow-lg shadow-temple-gold/20 font-extrabold'
                      : 'text-slate-600 dark:text-gray-400 hover:text-white hover:bg-black/5 dark:bg-white/5'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-2.5 text-slate-600 dark:text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Buscar por tema o guion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold"
              />
            </div>
          </div>

      {/* Pillar Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'CristoFit Camp', label: 'CristoFit Camp' },
          { id: 'Hábitos 3 Áreas', label: 'Hábitos 3 Áreas' },
          { id: 'Consumo Consciente & Snack', label: 'Snack Bar' },
          { id: 'Storytelling & Testimonios', label: 'Storytelling' },
          { id: 'Lives & Retos', label: 'Lives & VIP' },
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setPillarFilter(p.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              pillarFilter === p.id
                ? 'bg-white/20 text-white border border-white/30'
                : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <motion.div key={post.id} variants={item}>
            <Card className="border-black/10 dark:border-white/10 bg-white dark:bg-[#0E1424]/90 backdrop-blur-xl shadow-xl hover:border-temple-gold/40 transition flex flex-col justify-between h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-temple-gold/10 text-temple-gold border border-temple-gold/30 text-[10px] font-black uppercase tracking-wider">
                    {post.dayOfWeek} • {post.pillar}
                  </span>
                  {post.targetAudience?.includes('VIP') && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <Crown size={11} /> VIP
                    </span>
                  )}
                </div>
                <CardTitle className="text-base font-bold text-white leading-snug">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col justify-between pt-0">
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 dark:bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500 block mb-1">
                      📖 Gancho & Storytelling:
                    </span>
                    {post.hookAndStory}
                  </div>

                  {post.callToAction && (
                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-emerald-400">
                      <span className="text-[10px] font-black uppercase tracking-wider block mb-1">
                        🎯 Llamada a la Acción (CTA):
                      </span>
                      {post.callToAction}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                  {post.driveDocLink ? (
                    <a
                      href={post.driveDocLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-temple-gold hover:underline flex items-center gap-1.5 font-bold"
                    >
                      <FileText size={14} />
                      <span>Ver Documento</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-gray-500">Sin archivo adjunto</span>
                  )}

                  <button
                    onClick={() => handleCopyText(post.id, `${post.title}\n\n${post.hookAndStory}\n\n${post.callToAction}`)}
                    className="px-3 py-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 rounded-lg text-xs font-bold text-slate-700 dark:text-gray-300 hover:text-white transition flex items-center gap-1.5"
                  >
                    {copiedId === post.id ? (
                      <>
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        <span className="text-emerald-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copiar Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      </>
      )}

      {/* Modal: Nueva Publicación */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white dark:bg-black/8 dark:bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-[#0E1424] border border-black/10 dark:border-white/10 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <h3 className="text-lg font-black uppercase tracking-wider text-temple-navy dark:text-white flex items-center gap-2">
                <Plus className="text-temple-gold" size={20} />
                Nuevo Guion / Contenido
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-600 dark:text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Mes del Plan</label>
                  <select
                    value={newPost.monthIndex}
                    onChange={(e) => setNewPost({ ...newPost, monthIndex: Number(e.target.value) as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-white font-bold"
                  >
                    <option value={1} className="bg-white dark:bg-[#121826]">Mes 1</option>
                    <option value={2} className="bg-white dark:bg-[#121826]">Mes 2</option>
                    <option value={3} className="bg-white dark:bg-[#121826]">Mes 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Día de Publicación</label>
                  <select
                    value={newPost.dayOfWeek}
                    onChange={(e) => setNewPost({ ...newPost, dayOfWeek: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-white font-bold"
                  >
                    <option value="Lunes" className="bg-white dark:bg-[#121826]">Lunes</option>
                    <option value="Martes" className="bg-white dark:bg-[#121826]">Martes</option>
                    <option value="Miércoles" className="bg-white dark:bg-[#121826]">Miércoles</option>
                    <option value="Jueves" className="bg-white dark:bg-[#121826]">Jueves</option>
                    <option value="Viernes" className="bg-white dark:bg-[#121826]">Viernes</option>
                    <option value="Sábado" className="bg-white dark:bg-[#121826]">Sábado</option>
                    <option value="Domingo" className="bg-white dark:bg-[#121826]">Domingo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Pilar Temático</label>
                <select
                  value={newPost.pillar}
                  onChange={(e) => setNewPost({ ...newPost, pillar: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-white font-bold"
                >
                  <option value="Storytelling & Testimonios" className="bg-white dark:bg-[#121826]">Storytelling & Testimonios</option>
                  <option value="Hábitos 3 Áreas" className="bg-white dark:bg-[#121826]">Hábitos 3 Áreas (Cuerpo, Mente, Espíritu)</option>
                  <option value="CristoFit Camp" className="bg-white dark:bg-[#121826]">CristoFit Camp & Actividades</option>
                  <option value="Consumo Consciente & Snack" className="bg-white dark:bg-[#121826]">Consumo Consciente & Snack Bar</option>
                  <option value="Lives & Retos" className="bg-white dark:bg-[#121826]">Lives & Retos VIP (Antonio Eid)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Título de la Publicación</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Por qué entrenar a las 06:00 AM te cambia la vida..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Gancho & Storytelling (Cuerpo del post)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escribe el texto principal, anécdota o reflexión que conectarás..."
                  value={newPost.hookAndStory}
                  onChange={(e) => setNewPost({ ...newPost, hookAndStory: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Llamada a la Acción (CTA)</label>
                <input
                  type="text"
                  placeholder="Ej. Comenta RETO21 o envía un DM para unirte..."
                  value={newPost.callToAction}
                  onChange={(e) => setNewPost({ ...newPost, callToAction: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-1">Enlace a Google Drive / PDF / Imagen</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={newPost.driveDocLink}
                  onChange={(e) => setNewPost({ ...newPost, driveDocLink: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-white rounded-xl font-bold uppercase text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-temple-gold text-black rounded-xl font-extrabold uppercase text-xs hover:bg-amber-400 transition"
                >
                  Guardar Publicación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </motion.div>
  );
}
