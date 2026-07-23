import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  BookOpen, Copy, Check, Plus, Trash2, Sparkles, MessageSquare, 
  Share2, FileText, Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface ContentTemplate {
  id: string;
  title: string;
  category: 'outreach' | 'redes' | 'documento' | 'script';
  tag: string;
  content: string;
  variableNote?: string;
}

interface SocialPost {
  id: string;
  day: string;
  date: string;
  time: string;
  topic: string;
  objective: string;
  copys: string;
  link: string;
  keyword: string;
  hashtags: string;
  image: string;
  observations: string;
}

const DEFAULT_TEMPLATES: ContentTemplate[] = [
  {
    id: '1',
    title: 'Mensaje Personalizado — Invitación a Aliado / Inversionista (Ej: Antonio Eid)',
    category: 'outreach',
    tag: 'WhatsApp / Directo',
    variableNote: 'Reemplaza [Nombre] y el motivo específico antes de enviar.',
    content: `Antonio,

Quiero compartirte algo en lo que llevo cerca de dos años trabajando: TempleFit, un ecosistema donde el entrenamiento físico, la formación espiritual y la comunidad se trabajan juntos — no por separado.

[Aquí — inserta el dato específico: por qué le escribes a él en particular: ¿posible aliado, inversionista, referido, amigo que buscas invitar a un rol concreto?]

La base es simple: tu cuerpo es un templo (1 Corintios 6:19-20), y cuidarlo con disciplina, con propósito y en comunidad cambia la trayectoria de una persona. Eso es lo que hacemos cada sábado en CristoFit Camp, y lo que sostenemos toda la semana a través del Reto 21 Días Íntegros y el acompañamiento Neuro-Espiritual.

Te comparto el enlace con toda la propuesta [https://katzert.github.io/templefit/] para que la veas con calma. Me encantaría escuchar qué piensas.

Un abrazo,
Paulo`
  },
  {
    id: '2',
    title: 'Convocatoria Semanal — CristoFit Camp (Sábados)',
    category: 'redes',
    tag: 'Redes Sociales / IG',
    content: `🏋️‍♂️⚡ ¡ESTE SÁBADO ENTRENAMOS CUERPO Y ESPÍRITU!

No es solo sudar, es fortalecer el templo que Dios te dio.

📍 CristoFit Camp en Santa Cruz
⏰ Sábado 07:00 AM
💬 Entrenamiento Funcional + Palabra de Poder + Comunidad

¿Estás listo para dar el primer paso? Deja un "YO VOY" en los comentarios o haz clic en el enlace de nuestra bio para reservar tu lugar sin costo.`
  },
  {
    id: '3',
    title: 'Presentación del Reto 21 Días Íntegros',
    category: 'outreach',
    tag: 'Cierre / Prospectos',
    content: `¡Hola! Si sientes que tu cuerpo necesita energía y tu mente necesita dirección, el Reto 21 Días Íntegros es para ti.

Durante 21 días trabajaremos:
1. Plan Nutricional Preventivo.
2. Rutinas Funcionales Adaptadas.
3. Hackeo de Hábitos y Renovación Mente-Espíritu.

Accede al programa desde nuestro panel: https://katzert.github.io/templefit/`
  }
];

export function Module7SocialMedia() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Custom Document Note State
  const [bookText, setBookText] = useState<string>('');

  // Social Posts
  const [posts, setPosts] = useState<SocialPost[]>([]);

  const templatesKey = 'templefit_content_templates_v3';
  const bookKey = 'templefit_book_notes_v3';
  const postsKey = 'templefit_social_posts_v3';

  useEffect(() => {
    const savedTemplates = localStorage.getItem(templatesKey);
    if (savedTemplates) {
      try { setTemplates(JSON.parse(savedTemplates)); } catch (e) { setTemplates(DEFAULT_TEMPLATES); }
    } else {
      setTemplates(DEFAULT_TEMPLATES);
    }

    const savedBook = localStorage.getItem(bookKey);
    if (savedBook) setBookText(savedBook);
    else setBookText(`📖 LIBRO PERSONALIZADO Y APUNTES DE PAULO\n\n- Propósito Principal: Construir la comunidad de fe y fitness más sólida de Santa Cruz.\n- Estrategia de Redes: Publicar 3 veces por semana enfocados en transformación real.\n- Próximos Eventos: CristoFit Camp Presencial.`);

    const savedPosts = localStorage.getItem(postsKey);
    if (savedPosts) {
      try { setPosts(JSON.parse(savedPosts)); } catch (e) {}
    } else {
      setPosts([{
        id: '1', day: 'Lunes', date: '2026-07-27', time: '09:00', topic: 'Lanzamiento Reto 21 Días', objective: 'Captación de Prospectos',
        copys: 'Texto de invitación directa', link: 'https://katzert.github.io/templefit/',
        keyword: 'Reto21', hashtags: '#TempleFit #SantaCruz #CristoFit', image: 'Sí', observations: 'Usar banner dorado'
      }]);
    }
  }, []);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveBook = (val: string) => {
    setBookText(val);
    localStorage.setItem(bookKey, val);
  };

  const filteredTemplates = templates.filter(t => {
    const matchesCat = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addEmptyPost = () => {
    const newPost: SocialPost = {
      id: Date.now().toString(),
      day: 'Lunes', date: '', time: '10:00', topic: '', objective: '',
      copys: '', link: '', keyword: '', hashtags: '', image: 'Sí', observations: ''
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem(postsKey, JSON.stringify(updated));
  };

  const updatePost = (id: string, field: keyof SocialPost, value: string) => {
    const updated = posts.map(p => p.id === id ? { ...p, [field]: value } : p);
    setPosts(updated);
    localStorage.setItem(postsKey, JSON.stringify(updated));
  };

  const deletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem(postsKey, JSON.stringify(updated));
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-16 font-sans">
      
      {/* Header */}
      <motion.div variants={item} className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-temple-gold/10 border border-temple-gold/30 rounded-xl text-temple-gold">
            <BookOpen size={24} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-temple-gold">Centro de Documentos y Copys</span>
            <h1 className="text-3xl md:text-4xl font-serif font-black uppercase text-white tracking-tight">
              LIBRO PERSONALIZADO <span className="text-temple-gold italic">& MATERIALES</span>
            </h1>
          </div>
        </div>
        <p className="text-xs text-gray-400 max-w-2xl mt-1">
          Organizador de documentos, plantillas de mensajes de 1-clic y planificador de contenidos para Paulo.
        </p>
      </motion.div>

      {/* Bloque de Inspiración */}
      <motion.div variants={item} className="bg-gradient-to-r from-temple-gold/15 via-black/40 to-black/60 border-l-4 border-temple-gold p-5 rounded-r-2xl border-y border-r border-white/5 shadow-xl">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Cuerpo como Templo — 1 Corintios 6:19-20</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              "¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros...?" Este espacio organiza todo el material de impacto, textos de contacto y la visión de TempleFit.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Sección 1: Plantillas de Mensajes y Copys (1-Click Copy Cards) */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-temple-gold" size={20} />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Biblioteca de Copys y Mensajes Rápido</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Buscador */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar plantilla..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold w-48"
              />
            </div>

            {/* Filtros */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'outreach', label: 'Contacto' },
                { id: 'redes', label: 'Redes' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg font-bold uppercase tracking-wider text-[10px] transition-all ${
                    activeCategory === cat.id ? 'bg-temple-gold text-black shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTemplates.map(tpl => (
            <Card key={tpl.id} className="bg-black/40 border-white/10 hover:border-temple-gold/40 transition-all flex flex-col justify-between group">
              <CardContent className="!p-6 flex flex-col h-full justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-temple-gold/10 text-temple-gold border border-temple-gold/20 rounded-full">
                      {tpl.tag}
                    </span>
                    <button
                      onClick={() => handleCopy(tpl.id, tpl.content)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-temple-gold hover:text-black text-gray-300 font-bold uppercase tracking-widest text-[10px] rounded-lg transition-all border border-white/10"
                    >
                      {copiedId === tpl.id ? (
                        <>
                          <Check size={12} className="text-green-400" /> ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copiar Texto
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-temple-gold transition-colors">{tpl.title}</h3>
                  
                  {tpl.variableNote && (
                    <p className="text-[10px] text-amber-400/90 italic bg-amber-500/10 border-l-2 border-amber-500 p-2 rounded-r-lg mb-3">
                      💡 {tpl.variableNote}
                    </p>
                  )}

                  <div className="bg-black/60 rounded-xl p-4 border border-white/5 text-xs text-gray-300 font-mono leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar">
                    {tpl.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Sección 2: Libro Personalizado */}
      <motion.div variants={item}>
        <Card className="bg-black/40 border-white/10">
          <CardContent className="!p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="text-temple-gold" size={18} />
                Cuaderno de Notas y Libro Estratégico (Edición Libre)
              </h3>
              <span className="text-[10px] uppercase text-gray-500 tracking-widest">Se guarda automáticamente</span>
            </div>

            <textarea
              value={bookText}
              onChange={(e) => handleSaveBook(e.target.value)}
              className="w-full h-64 bg-black/60 border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-200 focus:outline-none focus:border-temple-gold resize-y leading-relaxed custom-scrollbar"
              placeholder="Escribe tus apuntes, notas o capítulos de tu libro aquí..."
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Sección 3: Planificador de Publicaciones */}
      <motion.div variants={item}>
        <Card className="bg-black/40 border-white/10">
          <CardContent className="!p-0 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Share2 className="text-temple-gold" size={18} />
                Planificador de Publicaciones y Redes Sociales
              </h3>
              <button
                onClick={addEmptyPost}
                className="flex items-center gap-2 px-4 py-2 bg-temple-gold text-black font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-temple-gold-bright transition-all shadow-md"
              >
                <Plus size={14} /> Nueva Publicación
              </button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/60">
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Día / Fecha</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Hora</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Tema / Objetivo</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Copys (Texto)</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Hashtags / Enlace</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length === 0 ? (
                    <TableRow className="border-white/5">
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500 text-xs">
                        No hay publicaciones programadas. Toca "Nueva Publicación" para añadir una.
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map((post) => (
                      <TableRow key={post.id} className="border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="align-top">
                          <input
                            type="text"
                            value={post.day}
                            onChange={(e) => updatePost(post.id, 'day', e.target.value)}
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs font-bold text-white mb-1"
                          />
                          <input
                            type="date"
                            value={post.date}
                            onChange={(e) => updatePost(post.id, 'date', e.target.value)}
                            className="w-full bg-transparent border-none text-[10px] text-gray-400 focus:outline-none"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <input
                            type="time"
                            value={post.time}
                            onChange={(e) => updatePost(post.id, 'time', e.target.value)}
                            className="bg-transparent border-none text-xs text-temple-gold font-mono focus:outline-none"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <input
                            type="text"
                            value={post.topic}
                            onChange={(e) => updatePost(post.id, 'topic', e.target.value)}
                            placeholder="Tema de la publicación"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs font-bold text-white mb-1"
                          />
                          <input
                            type="text"
                            value={post.objective}
                            onChange={(e) => updatePost(post.id, 'objective', e.target.value)}
                            placeholder="Objetivo (Ej: Leads)"
                            className="w-full bg-transparent border-none text-[10px] text-gray-400 focus:outline-none"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <textarea
                            value={post.copys}
                            onChange={(e) => updatePost(post.id, 'copys', e.target.value)}
                            placeholder="Escribe el texto del post..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-temple-gold h-16 resize-y"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <input
                            type="text"
                            value={post.hashtags}
                            onChange={(e) => updatePost(post.id, 'hashtags', e.target.value)}
                            placeholder="#TempleFit #CristoFit"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-[10px] text-temple-gold mb-1"
                          />
                          <input
                            type="text"
                            value={post.link}
                            onChange={(e) => updatePost(post.id, 'link', e.target.value)}
                            placeholder="https://templefit.com"
                            className="w-full bg-transparent border-none text-[10px] text-gray-400 focus:outline-none"
                          />
                        </TableCell>
                        <TableCell className="align-top text-right">
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  );
}
