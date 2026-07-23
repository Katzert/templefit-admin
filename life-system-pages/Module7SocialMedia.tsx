import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, MessageSquare, Plus, MoreVertical, Trash2, Edit2, Copy, Check } from 'lucide-react';

interface NotionDocument {
  id: string;
  icon: string;
  title: string;
  content: string;
  category: 'templates' | 'book' | 'materials';
}

const DEFAULT_DOCUMENTS: NotionDocument[] = [
  {
    id: 'doc_1',
    icon: '📘',
    title: 'Borrador del Libro (TempleFit)',
    category: 'book',
    content: `# El Cuerpo como Templo

Aquí puedes escribir el borrador de tu libro. El ejercicio de fuerza no es una opción, es un mandato para cuidar tu cuerpo que es tu templo (1 Corintios 6:19-20).

## Capítulo 1: El Despertar
...`
  },
  {
    id: 'doc_2',
    icon: '💬',
    title: 'Mensaje Aliados/Inversionistas',
    category: 'templates',
    content: `Quiero compartirte algo en lo que llevo cerca de dos años trabajando: TempleFit, un ecosistema donde el entrenamiento físico, la formación espiritual y la comunidad se trabajan juntos — no por separado.

[Aquí — inserta el dato específico: por qué le escribes a él en particular]

La base es simple: tu cuerpo es un templo, y cuidarlo con disciplina cambia la trayectoria de una persona. Eso es lo que hacemos cada sábado en CristoFit Camp, y lo que sostenemos toda la semana a través del Reto 21 Días.

Te comparto el enlace con toda la propuesta [https://katzert.github.io/templefit/] para que la veas con calma. Me encantaría escuchar qué piensas.

Un abrazo,
Paulo`
  },
  {
    id: 'doc_3',
    icon: '🏋️‍♂️',
    title: 'Post IG - CristoFit Camp',
    category: 'templates',
    content: `⚡ ¡ESTE SÁBADO ENTRENAMOS CUERPO Y ESPÍRITU!

No es solo sudar, es fortalecer el templo que Dios te dio.

📍 CristoFit Camp en Santa Cruz
⏰ Sábado 07:00 AM
💬 Entrenamiento Funcional + Palabra de Poder + Comunidad

¿Estás listo para dar el primer paso? Deja un "YO VOY" en los comentarios o haz clic en el enlace de nuestra bio para reservar tu lugar sin costo.`
  }
];

export function Module7SocialMedia() {
  const [documents, setDocuments] = useState<NotionDocument[]>([]);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('templefit_notion_docs');
    if (saved) {
      const parsed = JSON.parse(saved);
      setDocuments(parsed);
      if (parsed.length > 0) setActiveDocId(parsed[0].id);
    } else {
      setDocuments(DEFAULT_DOCUMENTS);
      setActiveDocId(DEFAULT_DOCUMENTS[0].id);
      localStorage.setItem('templefit_notion_docs', JSON.stringify(DEFAULT_DOCUMENTS));
    }
  }, []);

  // Save to localStorage whenever documents change
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('templefit_notion_docs', JSON.stringify(documents));
    }
  }, [documents]);

  const activeDoc = documents.find(d => d.id === activeDocId);

  const updateActiveDoc = (field: keyof NotionDocument, value: string) => {
    setDocuments(docs => docs.map(d => 
      d.id === activeDocId ? { ...d, [field]: value } : d
    ));
  };

  const createNewDoc = () => {
    const newDoc: NotionDocument = {
      id: `doc_${Date.now()}`,
      icon: '📄',
      title: 'Nueva Página',
      category: 'materials',
      content: ''
    };
    setDocuments([...documents, newDoc]);
    setActiveDocId(newDoc.id);
  };

  const deleteDoc = (id: string) => {
    const filtered = documents.filter(d => d.id !== id);
    setDocuments(filtered);
    if (activeDocId === id) {
      setActiveDocId(filtered.length > 0 ? filtered[0].id : null);
    }
  };

  const handleCopy = () => {
    if (activeDoc) {
      navigator.clipboard.writeText(activeDoc.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex bg-[#191919] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      
      {/* Notion Sidebar */}
      <div className="w-64 bg-[#202020] border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-temple-gold/20 flex items-center justify-center text-temple-gold">
              <BookOpen size={14} />
            </div>
            <span className="font-bold text-sm text-gray-200">TempleWiki</span>
          </div>
          <button onClick={createNewDoc} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition">
            <Plus size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-4 custom-scrollbar">
          
          {/* Category: Libros */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase px-2 mb-1">El Libro</p>
            {documents.filter(d => d.category === 'book').map(doc => (
              <SidebarItem key={doc.id} doc={doc} isActive={activeDocId === doc.id} onClick={() => setActiveDocId(doc.id)} onDelete={() => deleteDoc(doc.id)} />
            ))}
          </div>

          {/* Category: Templates */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase px-2 mb-1">Copys & Mensajes</p>
            {documents.filter(d => d.category === 'templates').map(doc => (
              <SidebarItem key={doc.id} doc={doc} isActive={activeDocId === doc.id} onClick={() => setActiveDocId(doc.id)} onDelete={() => deleteDoc(doc.id)} />
            ))}
          </div>

          {/* Category: Materials */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase px-2 mb-1">Otros Materiales</p>
            {documents.filter(d => d.category === 'materials').map(doc => (
              <SidebarItem key={doc.id} doc={doc} isActive={activeDocId === doc.id} onClick={() => setActiveDocId(doc.id)} onDelete={() => deleteDoc(doc.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Notion Editor Area */}
      <div className="flex-1 flex flex-col bg-[#191919] relative">
        {activeDoc ? (
          <>
            {/* Toolbar */}
            <div className="h-12 border-b border-white/5 flex items-center justify-end px-4">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-md transition"
              >
                {copied ? <Check size={14} className="text-temple-green" /> : <Copy size={14} />}
                {copied ? 'Copiado' : 'Copiar Texto'}
              </button>
            </div>

            {/* Editor */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:px-24">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={activeDoc.id} className="max-w-3xl mx-auto w-full">
                
                {/* Icon Picker (Simulated) */}
                <div className="group relative w-20 mb-4">
                  <input 
                    type="text" 
                    value={activeDoc.icon} 
                    onChange={(e) => updateActiveDoc('icon', e.target.value)}
                    className="text-6xl bg-transparent border-none outline-none w-full text-left"
                    maxLength={2}
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-4 left-0 text-xs text-gray-500 bg-black/80 px-2 py-1 rounded">Cambiar icono</div>
                </div>

                {/* Title */}
                <input
                  type="text"
                  value={activeDoc.title}
                  onChange={(e) => updateActiveDoc('title', e.target.value)}
                  placeholder="Título de la página"
                  className="w-full text-4xl font-bold bg-transparent border-none outline-none text-white mb-6 placeholder-gray-700"
                />

                {/* Category Selector */}
                <div className="flex gap-2 mb-8">
                  {['book', 'templates', 'materials'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => updateActiveDoc('category', cat)}
                      className={\`text-xs px-2 py-1 rounded \${activeDoc.category === cat ? 'bg-white/20 text-white' : 'text-gray-500 hover:bg-white/5'}\`}
                    >
                      {cat === 'book' ? 'Libro' : cat === 'templates' ? 'Copys' : 'Materiales'}
                    </button>
                  ))}
                </div>

                {/* Text Area (Markdown-like feeling) */}
                <textarea
                  value={activeDoc.content}
                  onChange={(e) => updateActiveDoc('content', e.target.value)}
                  placeholder="Escribe aquí..."
                  className="w-full min-h-[500px] bg-transparent border-none outline-none text-gray-300 text-lg leading-relaxed resize-none placeholder-gray-700 custom-scrollbar"
                />

              </motion.div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <FileText size={48} className="mb-4 opacity-20" />
            <p>Selecciona o crea una página</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ doc, isActive, onClick, onDelete }: { doc: NotionDocument, isActive: boolean, onClick: () => void, onDelete: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={\`group flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors \${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}\`}
    >
      <div className="flex items-center gap-2 truncate">
        <span>{doc.icon}</span>
        <span className="text-sm truncate">{doc.title || 'Sin título'}</span>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/40 rounded text-gray-500 hover:text-red-400 transition"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}
