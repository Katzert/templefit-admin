import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { FieldLabel } from '../components/ui/field-label';
import { InlineEdit } from '../components/ui/inline-edit';
import { Calendar, Share2, Target, Type, Image as ImageIcon, Link2, Hash, BookOpen, AlertCircle, Plus, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

interface SocialPost {
  id: string;
  day: string;
  date: string;
  time: string;
  topic: string;
  objective: string;
  copys: string; // FB, TW, IG, LI, YT combined or structured
  link: string;
  keyword: string;
  hashtags: string;
  image: string;
  observations: string;
}

const DECALOGO = [
  "1. Crear mejores copys para las publicaciones.",
  "2. Cómo detectar tendencias y buenos temas para los posts.",
  "3. Cuáles son las mejores horas y días para publicar.",
  "4. Objetivos concretos para las publicaciones.",
  "5. Trackear enlaces para medir resultados.",
  "6. Incorporar palabras y fórmulas de impacto para incrementar el CTR.",
  "7. Localizar hashtags óptimos para tu estrategia.",
  "8. Optimizar las imágenes para conseguir mayor impacto."
];

export function Module7SocialMedia() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [skillsList, setSkillsList] = useState("");

  const dataKey = 'templefit_social_media_v1';
  const skillsKey = 'templefit_social_skills_v1';

  useEffect(() => {
    const savedPosts = localStorage.getItem(dataKey);
    if (savedPosts) {
      try { setPosts(JSON.parse(savedPosts)); } catch (e) {}
    } else {
      // Demo data
      setPosts([{
        id: '1', day: 'Lunes', date: '2026-07-06', time: '10:00', topic: 'Motivación Lunes', objective: 'Interacción',
        copys: 'FB: Empieza la semana con fuerza. IG: #MondayMotivation TempleFit', link: 'https://templefit.com/blog1',
        keyword: 'motivación', hashtags: '#TempleFit #Fuerza', image: 'Sí', observations: 'Usar imagen de clase de Crossfit'
      }]);
    }

    const savedSkills = localStorage.getItem(skillsKey);
    if (savedSkills) setSkillsList(savedSkills);
    else setSkillsList("1. Redacción persuasiva\n2. Edición de video (Reels/TikTok)\n3. Análisis de métricas (CTR, Engagement)");
  }, []);

  const savePosts = (newPosts: SocialPost[]) => {
    setPosts(newPosts);
    localStorage.setItem(dataKey, JSON.stringify(newPosts));
  };

  const addEmptyPost = () => {
    const newPost: SocialPost = {
      id: Date.now().toString(),
      day: '', date: '', time: '', topic: '', objective: '',
      copys: '', link: '', keyword: '', hashtags: '', image: '', observations: ''
    };
    savePosts([newPost, ...posts]);
  };

  const updatePost = (id: string, field: keyof SocialPost, value: string) => {
    const updated = posts.map(p => p.id === id ? { ...p, [field]: value } : p);
    savePosts(updated);
  };

  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertCircle size={48} className="text-temple-red mb-4 opacity-50" />
        <h2 className="text-xl font-bold uppercase text-white mb-2">Acceso Restringido</h2>
        <p className="text-gray-500 text-sm">Este módulo es exclusivo para administradores y Community Managers.</p>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      <motion.div variants={item}>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-temple-gold mb-2">Community Management</p>
        <h1 className="text-3xl md:text-5xl font-serif font-black uppercase text-white">
          REDES <span className="text-temple-gold italic">SOCIALES</span>
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-xl">
          Planificación de contenido (Año #1 - 12 Meses) y directrices estratégicas de comunicación.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 8 Decálogos */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="h-full border-t-4 border-t-temple-gold bg-black/40">
            <CardContent className="!p-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="text-temple-gold" size={20} />
                8 Decálogos del Community Manager
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DECALOGO.map((regla, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-temple-gold font-black font-serif text-lg leading-none">{i + 1}</span>
                    <p className="text-xs text-gray-300 leading-relaxed">{regla.substring(3)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Habilidades a potenciar */}
        <motion.div variants={item}>
          <Card className="h-full bg-temple-navy/40">
            <CardContent className="!p-6 flex flex-col h-full">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Target className="text-temple-gold" size={20} />
                Potenciar Habilidades
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4">Listas de Habilidades en Redes Sociales</p>
              
              <div className="flex-1 bg-black/30 rounded-xl border border-white/5 p-4">
                <textarea
                  value={skillsList}
                  onChange={(e) => {
                    setSkillsList(e.target.value);
                    localStorage.setItem(skillsKey, e.target.value);
                  }}
                  className="w-full h-full bg-transparent border-none text-sm text-gray-300 focus:outline-none resize-none leading-relaxed"
                  placeholder="Ej: 1. Edición rápida en CapCut..."
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabla de Planificación */}
      <motion.div variants={item}>
        <Card>
          <CardContent className="!p-0 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Share2 className="text-temple-gold" size={20} />
                Planificación Anual (12 Meses)
              </h3>
              <button
                onClick={addEmptyPost}
                className="flex items-center gap-2 px-4 py-2 bg-temple-gold/10 text-temple-gold border border-temple-gold/20 font-bold uppercase tracking-widest text-[10px] rounded-lg hover:bg-temple-gold hover:text-black transition-all"
              >
                <Plus size={14} /> Añadir Fila
              </button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/40">
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 min-w-[100px]">Día / Fecha</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 min-w-[80px]">Hora</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 min-w-[150px]">Tema / Objetivo</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 min-w-[200px]">Copys (FB/TW/IG/LI/YT)</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 min-w-[120px]">Palabra Clave / Hash</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-gray-500 min-w-[150px]">Enlace / Img / Obs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length === 0 ? (
                    <TableRow className="border-white/5">
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500 text-sm">
                        No hay planificaciones. Haz clic en "Añadir Fila" para comenzar.
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map((post) => (
                      <TableRow key={post.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                        <TableCell className="align-top">
                          <input
                            type="text"
                            value={post.day}
                            onChange={(e) => updatePost(post.id, 'day', e.target.value)}
                            placeholder="Día (Ej: Lunes)"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs font-bold text-white mb-1"
                          />
                          <input
                            type="date"
                            value={post.date}
                            onChange={(e) => updatePost(post.id, 'date', e.target.value)}
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-[10px] text-gray-400"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <input
                            type="time"
                            value={post.time}
                            onChange={(e) => updatePost(post.id, 'time', e.target.value)}
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-gray-300"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <input
                            type="text"
                            value={post.topic}
                            onChange={(e) => updatePost(post.id, 'topic', e.target.value)}
                            placeholder="Tema"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-white mb-1"
                          />
                          <input
                            type="text"
                            value={post.objective}
                            onChange={(e) => updatePost(post.id, 'objective', e.target.value)}
                            placeholder="Objetivo"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-[10px] text-temple-gold uppercase tracking-wider"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <textarea
                            value={post.copys}
                            onChange={(e) => updatePost(post.id, 'copys', e.target.value)}
                            placeholder="FB: ... / IG: ..."
                            rows={3}
                            className="w-full bg-transparent border border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-gray-300 resize-none p-1 rounded"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <input
                            type="text"
                            value={post.keyword}
                            onChange={(e) => updatePost(post.id, 'keyword', e.target.value)}
                            placeholder="Palabra Clave"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-gray-300 mb-1"
                          />
                          <input
                            type="text"
                            value={post.hashtags}
                            onChange={(e) => updatePost(post.id, 'hashtags', e.target.value)}
                            placeholder="#hashtags"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-[10px] text-temple-gold"
                          />
                        </TableCell>
                        <TableCell className="align-top">
                          <input
                            type="text"
                            value={post.link}
                            onChange={(e) => updatePost(post.id, 'link', e.target.value)}
                            placeholder="Enlace URL"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-[10px] text-blue-400 mb-1"
                          />
                          <input
                            type="text"
                            value={post.image}
                            onChange={(e) => updatePost(post.id, 'image', e.target.value)}
                            placeholder="Imagen (Sí/No/Ref)"
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-gray-300 mb-1"
                          />
                          <input
                            type="text"
                            value={post.observations}
                            onChange={(e) => updatePost(post.id, 'observations', e.target.value)}
                            placeholder="Observaciones..."
                            className="w-full bg-transparent border-b border-transparent hover:border-white/10 focus:border-temple-gold focus:outline-none text-xs text-gray-500 italic"
                          />
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
