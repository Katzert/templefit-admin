import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Plus, Edit3, Save, Sparkles, FileText, CheckCircle2, Share2, Layers, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

interface WikiPage {
  id: string;
  title: string;
  category: 'cuerpo' | 'mente' | 'espiritu' | 'operaciones';
  content: string;
  updatedAt: string;
}

const DEFAULT_WIKI_PAGES: WikiPage[] = [
  {
    id: 'index',
    title: '🏛️ Índice de Conocimiento TempleWiki',
    category: 'operaciones',
    content: `# 🏛️ TempleWiki: Base de Conocimiento Holística

Bienvenido a **TempleWiki**, el sistema de gestión de conocimiento basado en la especificación **LLM-Wiki de Karpathy**.

## 📌 Navegación Rápida
- **[[Pilar_Cuerpo]]**: Protocolo Nutricional Bio-optimizado, Hidratación (3L) y Entrenamiento Híbrido.
- **[[Pilar_Mente]]**: Lectura diaria, Journaling de Victorias y Neuro-Ventas.
- **[[Pilar_Espiritu]]**: Oración Matutina, Valores Eternos y Sábados CristoFit Camp.
- **[[Manual_Instructores]]**: Guía operativa para entrenadores y alertas de WhatsApp.

---
*TempleWiki es actualizado continuamente por el sistema y por los instructores de TempleFit.*`,
    updatedAt: '23 de Julio, 2026'
  },
  {
    id: 'pilar-cuerpo',
    title: '🏋️‍♂️ Pilar Cuerpo: Nutrición & Entrenamiento',
    category: 'cuerpo',
    content: `# 🏋️‍♂️ Pilar Cuerpo: Nutrición Bio-optimizada & Fuerza

El cuerpo físico es el templo de la acción. Para mantener un rendimiento óptimo aplicamos los siguientes estándares:

### 1. Hidratación Táctica
- **Mínimo:** 2.5L a 3.0L de agua diarios.
- **Regla:** Beber 500ml inmediatamente al despertar antes de consumir café o alimentos.

### 2. Nutrición Bio-optimizada
- Eliminación de azúcares refinados y aceites vegetales procesados.
- Prioridad a la densidad proteica (1.6g a 2.0g por kg de peso corporal).
- Incorporación de grasas saludables (palta, aceite de oliva, frutos secos).

### 3. Entrenamiento Híbrido
- Combinación de ejercicios compuestos (Sentadilla, Peso Muerto, Press) con resistencia funcional al aire libre.`,
    updatedAt: '23 de Julio, 2026'
  },
  {
    id: 'pilar-mente',
    title: '🧠 Pilar Mente: Disciplina Cognitiva',
    category: 'mente',
    content: `# 🧠 Pilar Mente: Disciplina Cognitiva & Neuro-Ventas

El dominio mental determina la consistencia en el tiempo.

### 1. Regla de Oro Matutina
- **0 Redes Sociales:** Ninguna red social ni mensajes durante los primeros 60 minutos del día.
- **Lectura Diaria:** Mínimo 10 a 15 páginas de libros de desarrollo personal, ética o negocios.

### 2. Journaling de Victorias & Errores
- Registrar en el Scorecard Diario los logros del día.
- Reconocer errores honestamente para ajustar la estrategia de la siguiente semana.

### 3. Neuro-Ventas con Propósito
- Conectar con los clientes desde la empatía y la transformación real, no desde la presión comercial.`,
    updatedAt: '23 de Julio, 2026'
  },
  {
    id: 'pilar-espiritu',
    title: '❤️ Pilar Espíritu: Fe & Comunidad',
    category: 'espiritu',
    content: `# ❤️ Pilar Espíritu: Valores Eternos & CristoFit Camp

El espíritu es el ancla moral del atleta íntegro.

### 1. Conexión Matutina
- 10 a 15 minutos de oración, meditación o reflexión bíblica matutina.
- Cultivar la gratitud escribiendo 3 cosas específicas por las que estar agradecido cada día.

### 2. Sábados CristoFit Camp
- Entrenamiento grupal al aire libre en Santa Cruz, Bolivia.
- Confraternización y tiempo de palabra al finalizar el entrenamiento.

### 3. La Regla de la Excelencia
> *"Todo lo que hagan, háganlo de corazón, como para el Señor."* — Colosenses 3:23`,
    updatedAt: '23 de Julio, 2026'
  },
  {
    id: 'manual-instructores',
    title: '📋 Manual para Instructores TempleFit',
    category: 'operaciones',
    content: `# 📋 Manual Operativo de Instructores

Guía de estándares para la atención y seguimiento de alumnos en el CRM:

1. **Revisión Diaria:** Verificar que los alumnos seleccionados registren su Scorecard de Objetivos.
2. **Alertas de Renovación:** Utilizar la herramienta de 1-Clic de WhatsApp cuando la suscripción de un alumno esté a 3 días o menos de vencer.
3. **Evaluación Trimestral:** Realizar la prueba de recomendación bio-optimizada y recomposición corporal.`,
    updatedAt: '23 de Julio, 2026'
  }
];

export function TempleWiki() {
  const [pages, setPages] = useState<WikiPage[]>(DEFAULT_WIKI_PAGES);
  const [activePageId, setActivePageId] = useState<string>('index');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('templefit_wiki_pages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setPages(parsed);
      } catch (e) {}
    }
  }, []);

  const activePage = pages.find(p => p.id === activePageId) || pages[0];

  useEffect(() => {
    setEditedContent(activePage.content);
    setIsEditing(false);
  }, [activePageId]);

  const handleSavePage = () => {
    const updated = pages.map(p => p.id === activePageId ? { ...p, content: editedContent, updatedAt: 'Hoy' } : p);
    setPages(updated);
    localStorage.setItem('templefit_wiki_pages', JSON.stringify(updated));
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCreatePage = () => {
    const newTitle = prompt('Nombre de la nueva página de la Wiki:');
    if (!newTitle || !newTitle.trim()) return;
    const newId = `page-${Date.now()}`;
    const newP: WikiPage = {
      id: newId,
      title: newTitle.trim(),
      category: 'operaciones',
      content: `# ${newTitle.trim()}\n\nEscribe aquí el contenido en formato Markdown...`,
      updatedAt: 'Hoy'
    };
    const updated = [...pages, newP];
    setPages(updated);
    localStorage.setItem('templefit_wiki_pages', JSON.stringify(updated));
    setActivePageId(newId);
  };

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-black font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl flex items-center gap-2.5 shadow-2xl">
          <CheckCircle2 size={16} />
          <span>Página de la Wiki Guardada Correctamente</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-temple-gold bg-temple-gold/10 px-2.5 py-0.5 rounded-full border border-temple-gold/30">
              Motor LLM-Wiki (Karpathy Spec)
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black uppercase text-white tracking-tight mt-1">
            TEMPLE<span className="text-temple-gold italic">WIKI</span>
          </h2>
        </div>
        <button
          onClick={handleCreatePage}
          className="px-5 py-3 bg-temple-gold text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-400 transition flex items-center gap-2 shadow-lg"
        >
          <Plus size={16} /> Nueva Página Wiki
        </button>
      </div>

      {/* Main Wiki Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Pages Index & Search */}
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
                  placeholder="Buscar en la Wiki..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold"
                />
              </div>

              {/* Pages List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredPages.map((p) => {
                  const isActive = p.id === activePageId;
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

        {/* Right Viewer & Editor Pane */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="bg-[#0B0F19]/90 border-white/10 min-h-[600px] flex flex-col justify-between">
            <CardContent className="!p-8 space-y-6">
              
              {/* Page Title Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-temple-gold">
                    Actualizado: {activePage.updatedAt}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">{activePage.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <button
                      onClick={handleSavePage}
                      className="px-4 py-2 bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition flex items-center gap-1.5"
                    >
                      <Save size={14} /> Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-white/10 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-white/20 transition flex items-center gap-1.5 border border-white/10"
                    >
                      <Edit3 size={14} /> Editar Página
                    </button>
                  )}
                </div>
              </div>

              {/* Page Content Body (Reader / Markdown Editor) */}
              {isEditing ? (
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={18}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold leading-relaxed"
                />
              ) : (
                <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                  {activePage.content}
                </div>
              )}

            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
