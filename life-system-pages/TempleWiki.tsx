import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Plus, Edit3, Save, Sparkles, FileText, CheckCircle2, Share2, Layers, ExternalLink, Bookmark, Hash, ArrowRight, Network, Eye } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

interface WikiPage {
  id: string;
  title: string;
  category: 'cuerpo' | 'mente' | 'espiritu' | 'operaciones';
  infobox?: { label: string; value: string }[];
  content: string;
  updatedAt: string;
}

const DEFAULT_WIKI_PAGES: WikiPage[] = [
  {
    id: 'index',
    title: '🏛️ Índice de Conocimiento TempleWiki',
    category: 'operaciones',
    infobox: [
      { label: 'Tipo', value: 'Base Maestra del Cerebro' },
      { label: 'Acceso', value: 'Paulo & Admin Exclusivo' },
      { label: 'Formato', value: 'Obsidian Markdown (.md)' }
    ],
    content: `# 🏛️ TempleWiki: Base de Conocimiento Holística

Bienvenido al **Cerebro Central de TempleFit**, diseñado bajo el formato de notas interconectadas de **Obsidian** y la especificación **LLM-Wiki de Karpathy**.

## 📌 Artículos Principales de la Bóveda
- [[Pilar_Cuerpo]] — Manual de Nutrición Bio-optimizada, Hidratación y Fuerza.
- [[Pilar_Mente]] — Disciplina Cognitiva, Journaling y Neuro-Ventas.
- [[Pilar_Espiritu]] — Fe, Valores Eternos y Sábados CristoFit Camp.
- [[Manual_Instructores]] — Estándares operativos de seguimiento de alumnos.

---
*Esta base de conocimiento es gestionada exclusivamente por los Fundadores y actualizada dinámicamente por la IA.*`,
    updatedAt: '23 de Julio, 2026'
  },
  {
    id: 'Pilar_Cuerpo',
    title: '🏋️‍♂️ Pilar Cuerpo: Nutrición & Entrenamiento Híbrido',
    category: 'cuerpo',
    infobox: [
      { label: 'Pilar', value: 'Cuerpo (Físico)' },
      { label: 'Meta Agua', value: '2.5L - 3.0L / Día' },
      { label: 'Proteína', value: '1.6g - 2.0g / kg' },
      { label: 'Frecuencia', value: '5 Días / Semana' }
    ],
    content: `# 🏋️‍♂️ Pilar Cuerpo: Nutrición Bio-optimizada & Fuerza Real

El cuerpo físico es el templo biológico de la acción. Para mantener un rendimiento de élite aplicamos los siguientes estándares:

## 1. Hidratación Táctica
- **Mínimo Diario:** 2.5L a 3.0L de agua purificada.
- **Protocolo Matutino:** Beber 500ml inmediatamente al despertar antes de cualquier alimento.

## 2. Nutrición Bio-optimizada
- Eliminación de azúcares refinados y aceites vegetales procesados.
- Prioridad a la densidad proteica limpia (1.6g a 2.0g por kg de peso corporal).
- Incorporación de grasas saludables (palta, aceite de oliva, frutos secos).

## 3. Entrenamiento Híbrido
- Combinación de ejercicios compuestos con pesas y acondicionamiento al aire libre.`,
    updatedAt: '23 de Julio, 2026'
  },
  {
    id: 'Pilar_Mente',
    title: '🧠 Pilar Mente: Disciplina Cognitiva & Neuro-Ventas',
    category: 'mente',
    infobox: [
      { label: 'Pilar', value: 'Mente (Cognitivo)' },
      { label: 'Lectura', value: '10-15 Páginas / Día' },
      { label: 'Regla Matutina', value: '0 Redes 1h Al Despertar' },
      { label: 'Enfoque', value: 'Neuro-Ventas Éticas' }
    ],
    content: `# 🧠 Pilar Mente: Disciplina Cognitiva & Neuro-Ventas

El dominio mental determina la consistencia y resiliencia en el tiempo.

## 1. Regla de Oro Matutina
- **Cero Redes Sociales:** Ninguna red social ni mensajes durante los primeros 60 minutos del día.
- **Lectura Diaria:** Mínimo 10 a 15 páginas de libros de desarrollo personal o liderazgo.

## 2. Journaling de Victorias & Errores
- Registrar diariamente los logros y aprendizajes en el Scorecard de Victoria.
- Reconocer errores con honestidad para ajustar la estrategia de la siguiente semana.

## 3. Neuro-Ventas con Propósito
- Conectar con los alumnos desde la empatía y la transformación real de sus vidas.`,
    updatedAt: '23 de Julio, 2026'
  },
  {
    id: 'Pilar_Espiritu',
    title: '❤️ Pilar Espíritu: Fe & Comunidad CristoFit',
    category: 'espiritu',
    infobox: [
      { label: 'Pilar', value: 'Espíritu (Valores)' },
      { label: 'Oración', value: '10-15 Min / Mañana' },
      { label: 'Comunidad', value: 'Sábados CristoFit Camp' },
      { label: 'Pasaje Clave', value: 'Colosenses 3:23' }
    ],
    content: `# ❤️ Pilar Espíritu: Valores Eternos & CristoFit Camp

El espíritu es el ancla moral e inquebrantable del atleta íntegro.

## 1. Conexión Matutina
- 10 a 15 minutos de oración, meditación o reflexión bíblica matutina.
- Cultivar la gratitud escribiendo 3 cosas específicas por las que estar agradecido cada día.

## 2. Sábados CristoFit Camp
- Entrenamiento grupal al aire libre en Santa Cruz, Bolivia.
- Tiempo de palabra, confraternización y recarga de energía espiritual.

## 3. La Regla de la Excelencia
> *"Todo lo que hagan, háganlo de corazón, como para el Señor."* — Colosenses 3:23`,
    updatedAt: '23 de Julio, 2026'
  },
  {
    id: 'Manual_Instructores',
    title: '📋 Manual Operativo para Instructores',
    category: 'operaciones',
    infobox: [
      { label: 'Uso', value: 'Estándar de Operación' },
      { label: 'Auditoría', value: 'Semanal' },
      { label: 'Alertas', value: 'WhatsApp 1-Clic' }
    ],
    content: `# 📋 Manual Operativo de Instructores

Guía de estándares para la atención y seguimiento de alumnos en el CRM:

## 1. Seguimiento de Alumnos
- Revisar diariamente que los alumnos registren su Scorecard de Objetivos.

## 2. Alertas de Renovación
- Utilizar la herramienta de 1-Clic de WhatsApp cuando la suscripción esté a 3 días o menos de vencer.

## 3. Evaluación Trimestral
- Realizar la prueba de recomendación bio-optimizada y recomposición corporal.`,
    updatedAt: '23 de Julio, 2026'
  }
];

export function TempleWiki() {
  const [pages, setPages] = useState<WikiPage[]>(DEFAULT_WIKI_PAGES);
  const [activePageId, setActivePageId] = useState<string>('index');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [viewMode, setViewMode] = useState<'article' | 'graph'>('article');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('templefit_wiki_pages_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setPages(parsed);
      } catch (e) {}
    }
  }, []);

  const activePage = pages.find(p => p.id === activePageId || p.id.toLowerCase() === activePageId.toLowerCase()) || pages[0];

  useEffect(() => {
    setEditedContent(activePage.content);
    setIsEditing(false);
  }, [activePageId]);

  const handleSavePage = () => {
    const updated = pages.map(p => p.id === activePage.id ? { ...p, content: editedContent, updatedAt: 'Hoy' } : p);
    setPages(updated);
    localStorage.setItem('templefit_wiki_pages_v2', JSON.stringify(updated));
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCreatePage = () => {
    const newTitle = prompt('Título del nuevo artículo de la Wiki (Formato Obsidian):');
    if (!newTitle || !newTitle.trim()) return;
    const cleanId = newTitle.trim().replace(/\s+/g, '_');
    const newP: WikiPage = {
      id: cleanId,
      title: `📄 ${newTitle.trim()}`,
      category: 'operaciones',
      infobox: [{ label: 'Artículo', value: newTitle.trim() }],
      content: `# 📄 ${newTitle.trim()}\n\nEscribe aquí tu nota en formato Markdown de Obsidian...\n\n- Conecta con otras notas usando [[Pilar_Cuerpo]], [[Pilar_Mente]] o [[Pilar_Espiritu]]`,
      updatedAt: 'Hoy'
    };
    const updated = [...pages, newP];
    setPages(updated);
    localStorage.setItem('templefit_wiki_pages_v2', JSON.stringify(updated));
    setActivePageId(cleanId);
  };

  const navigateToWikiLink = (linkText: string) => {
    const target = pages.find(p => p.id.toLowerCase() === linkText.toLowerCase() || p.id.toLowerCase().includes(linkText.toLowerCase()));
    if (target) {
      setActivePageId(target.id);
      setViewMode('article');
    }
  };

  const renderContentWithLinks = (text: string) => {
    const parts = text.split(/(\[\[.*?\]\])/g);
    return parts.map((part, i) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const linkName = part.slice(2, -2);
        return (
          <button
            key={i}
            onClick={() => navigateToWikiLink(linkName)}
            className="text-temple-gold font-bold underline hover:text-white transition px-1 bg-temple-gold/10 rounded"
          >
            {linkName.replace(/_/g, ' ')} ↗
          </button>
        );
      }
      return part;
    });
  };

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Nodes for Obsidian Graph View
  const graphNodes = [
    { id: 'index', label: '🏛️ Índice Wiki', x: 50, y: 50, color: '#C5A059' },
    { id: 'Pilar_Cuerpo', label: '🏋️‍♂️ Pilar Cuerpo', x: 25, y: 30, color: '#E53E3E' },
    { id: 'Pilar_Mente', label: '🧠 Pilar Mente', x: 75, y: 30, color: '#48BB78' },
    { id: 'Pilar_Espiritu', label: '❤️ Pilar Espíritu', x: 25, y: 75, color: '#ED8936' },
    { id: 'Manual_Instructores', label: '📋 Manual Operativo', x: 75, y: 75, color: '#4299E1' }
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-black font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl flex items-center gap-2.5 shadow-2xl">
          <CheckCircle2 size={16} />
          <span>Nota Guardada en la Bóveda de la Wiki</span>
        </div>
      )}

      {/* Header Banner & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-temple-gold bg-temple-gold/10 px-2.5 py-0.5 rounded-full border border-temple-gold/30">
              Cerebro Obsidian & Karpathy Spec
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase text-white tracking-tight mt-1">
            TEMPLE<span className="text-temple-gold italic">WIKI</span>
          </h2>
        </div>

        {/* View Mode & Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-black/50 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('article')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                viewMode === 'article' ? 'bg-temple-gold text-black shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Eye size={14} /> Vista Lectura
            </button>
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                viewMode === 'graph' ? 'bg-temple-gold text-black shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Network size={14} /> Grafo Obsidian 🕸️
            </button>
          </div>

          <button
            onClick={handleCreatePage}
            className="px-4 py-2 bg-temple-gold text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-400 transition flex items-center gap-1.5 shadow-lg"
          >
            <Plus size={16} /> Nueva Nota
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: OBSIDIAN KNOWLEDGE GRAPH VIEW 🕸️ */}
      {viewMode === 'graph' ? (
        <Card className="bg-[#0B0F19]/95 border-temple-gold/30 min-h-[600px] relative overflow-hidden">
          <CardContent className="!p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-temple-gold/10 border border-temple-gold/30 rounded-2xl text-temple-gold">
                  <Network size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-temple-gold">Mapa de Conexiones Visuales</span>
                  <h3 className="text-xl font-serif font-black uppercase text-white">Grafo de Conocimiento (Obsidian Graph View)</h3>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {pages.length} Nodos Conectados
              </span>
            </div>

            {/* Interactive Graph Canvas */}
            <div className="relative w-full h-[450px] bg-black/60 rounded-3xl border border-white/10 p-6 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="#C5A059" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="#C5A059" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#C5A059" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#C5A059" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
                <line x1="25%" y1="30%" x2="75%" y2="30%" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
                <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="#ffffff" strokeWidth="1" opacity="0.2" />
              </svg>

              {/* Interactive Nodes */}
              {graphNodes.map((node) => {
                const isActive = activePage.id.toLowerCase().includes(node.id.toLowerCase());
                return (
                  <motion.div
                    key={node.id}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateToWikiLink(node.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex flex-col items-center gap-2 transition-all ${
                      isActive
                        ? 'bg-temple-gold text-black border-white shadow-temple-gold/40 shadow-xl scale-110 z-20'
                        : 'bg-[#0B0F19]/90 border-white/20 text-white hover:border-temple-gold'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${isActive ? 'bg-black text-temple-gold' : 'bg-white/10 text-white'}`}>
                      {node.label.charAt(0)}
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-center">{node.label}</span>
                    <span className="text-[9px] opacity-75 font-mono uppercase">Abrir Nota ↗</span>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* VIEW MODE 2: ARTICLE READING & EDITING VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar: Obsidian Index Navigation */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="bg-[#0B0F19]/90 border-white/10">
              <CardContent className="!p-4 space-y-4">
                
                {/* Search Bar */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar nota en Obsidian..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold"
                  />
                </div>

                {/* Index Header */}
                <div className="flex items-center justify-between px-2 pt-1 border-b border-white/5 pb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Bóveda de Notas ({filteredPages.length})</span>
                  <span className="text-[10px] text-temple-gold font-bold">Obsidian .md</span>
                </div>

                {/* Pages List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {filteredPages.map((p) => {
                    const isActive = p.id === activePage.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setActivePageId(p.id)}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-temple-gold/15 border-temple-gold text-white shadow-md'
                            : 'bg-black/40 border-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText size={16} className={isActive ? 'text-temple-gold shrink-0' : 'text-gray-500 shrink-0'} />
                          <span className="text-xs font-bold truncate">{p.title}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Right Pane: Article Reader / Markdown Editor */}
          <div className="lg:col-span-8 space-y-4">
            <Card className="bg-[#0B0F19]/90 border-white/10 min-h-[600px]">
              <CardContent className="!p-8 space-y-6">
                
                {/* Article Header & Controls */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                    <BookOpen size={16} className="text-temple-gold" />
                    <span>Wiki</span>
                    <span>/</span>
                    <span className="text-white">{activePage.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <button
                        onClick={handleSavePage}
                        className="px-4 py-2 bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition flex items-center gap-1.5"
                      >
                        <Save size={14} /> Guardar Nota
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-white/10 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-white/20 transition flex items-center gap-1.5 border border-white/10"
                      >
                        <Edit3 size={14} /> Editar Nota (.md)
                      </button>
                    )}
                  </div>
                </div>

                {/* Article Layout (Infobox + Markdown Content Grid) */}
                {isEditing ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={18}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold leading-relaxed"
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Article Text Content */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="prose prose-invert max-w-none text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {renderContentWithLinks(activePage.content)}
                      </div>
                    </div>

                    {/* Infobox Sidebar */}
                    {activePage.infobox && (
                      <div className="md:col-span-4 p-5 rounded-2xl bg-black/60 border border-temple-gold/30 space-y-3">
                        <div className="text-center pb-2 border-b border-temple-gold/30">
                          <span className="text-[9px] uppercase font-extrabold tracking-widest text-temple-gold">Ficha de Datos</span>
                          <h4 className="text-xs font-bold text-white mt-0.5">{activePage.title}</h4>
                        </div>
                        <div className="space-y-2 text-xs">
                          {activePage.infobox.map((item, idx) => (
                            <div key={idx} className="flex justify-between py-1 border-b border-white/5 text-[11px]">
                              <span className="text-gray-400 font-bold">{item.label}:</span>
                              <span className="text-temple-gold font-extrabold text-right">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </CardContent>
            </Card>
          </div>

        </div>
      )}

    </div>
  );
}
