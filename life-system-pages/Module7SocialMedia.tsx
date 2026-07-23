import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, MessageSquare, Plus, MoreVertical, Trash2, Edit2, Copy, Check, Paperclip, X, Image as ImageIcon, File } from 'lucide-react';

interface NotionAttachment {
  id: string;
  name: string;
  data: string;
  type: string;
}

interface NotionDocument {
  id: string;
  icon: string;
  title: string;
  content: string;
  category: 'templates' | 'book' | 'materials';
  attachments?: NotionAttachment[];
}

const DEFAULT_DOCUMENTS: NotionDocument[] = [
  {
    id: 'doc_1',
    icon: '📘',
    title: 'Borrador del Libro (TempleFit)',
    category: 'book',
    content: `# El Cuerpo como Templo\n\nAquí puedes escribir el borrador de tu libro. El ejercicio de fuerza no es una opción, es un mandato para cuidar tu cuerpo que es tu templo (1 Corintios 6:19-20).`,
    attachments: []
  },
  {
    id: 'doc_2',
    icon: '💬',
    title: 'Mensaje Aliados/Inversionistas',
    category: 'templates',
    content: `Quiero compartirte algo en lo que llevo cerca de dos años trabajando: TempleFit, un ecosistema donde el entrenamiento físico, la formación espiritual y la comunidad se trabajan juntos — no por separado.\n\n[Aquí — inserta el dato específico: por qué le escribes a él en particular]\n\nLa base es simple: tu cuerpo es un templo, y cuidarlo con disciplina cambia la trayectoria de una persona. Eso es lo que hacemos cada sábado en CristoFit Camp, y lo que sostenemos toda la semana a través del Reto 21 Días.\n\nTe comparto el enlace con toda la propuesta [https://katzert.github.io/templefit/] para que la veas con calma. Me encantaría escuchar qué piensas.\n\nUn abrazo,\nPaulo`,
    attachments: []
  },
  {
    id: 'doc_3',
    icon: '🏋️‍♂️',
    title: 'Post IG - CristoFit Camp',
    category: 'templates',
    content: `⚡ ¡ESTE SÁBADO ENTRENAMOS CUERPO Y ESPÍRITU!\n\nNo es solo sudar, es fortalecer el templo que Dios te dio.\n\n📍 CristoFit Camp en Santa Cruz\n⏰ Sábado 07:00 AM\n💬 Entrenamiento Funcional + Palabra de Poder + Comunidad\n\n¿Estás listo para dar el primer paso? Deja un "YO VOY" en los comentarios o haz clic en el enlace de nuestra bio para reservar tu lugar sin costo.`,
    attachments: []
  }
];

export function Module7SocialMedia() {
  const [documents, setDocuments] = useState<NotionDocument[]>([]);
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('templefit_notion_docs_v2'); // Upgrade key to avoid conflicts with old structure if needed
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDocuments(parsed);
        if (parsed.length > 0) setActiveDocId(parsed[0].id);
      } catch (e) {
        setDocuments(DEFAULT_DOCUMENTS);
      }
    } else {
      // Try migrating old data
      const oldSaved = localStorage.getItem('templefit_notion_docs');
      if (oldSaved) {
        const parsed = JSON.parse(oldSaved);
        setDocuments(parsed);
        if (parsed.length > 0) setActiveDocId(parsed[0].id);
      } else {
        setDocuments(DEFAULT_DOCUMENTS);
        setActiveDocId(DEFAULT_DOCUMENTS[0].id);
      }
    }
  }, []);

  // Save to localStorage whenever documents change
  useEffect(() => {
    if (documents.length > 0) {
      try {
        localStorage.setItem('templefit_notion_docs_v2', JSON.stringify(documents));
      } catch (e) {
        alert("Atención: El almacenamiento local está lleno. Elimina imágenes pesadas para seguir guardando.");
      }
    }
  }, [documents]);

  const activeDoc = documents.find(d => d.id === activeDocId);

  const updateActiveDoc = (field: keyof NotionDocument, value: any) => {
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
      content: '',
      attachments: []
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

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeDoc) return;

    // Strict limit for non-images to prevent blowing up localStorage
    if (!file.type.startsWith('image/') && file.size > 500 * 1024) {
      alert("Para documentos (PDF, Word), el límite es 500KB. Para archivos más pesados, usa Google Drive y pega el enlace.");
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      
      if (file.type.startsWith('image/')) {
        // Compress image using canvas
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG 0.6
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          
          addAttachment({
            id: `att_${Date.now()}`,
            name: file.name,
            data: compressedDataUrl,
            type: file.type
          });
        };
        img.src = result;
      } else {
        // Add direct base64 for small files
        addAttachment({
          id: `att_${Date.now()}`,
          name: file.name,
          data: result,
          type: file.type
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // reset
  };

  const addAttachment = (att: NotionAttachment) => {
    if (!activeDoc) return;
    const currentAtts = activeDoc.attachments || [];
    updateActiveDoc('attachments', [...currentAtts, att]);
  };
  
  const removeAttachment = (attId: string) => {
    if (!activeDoc) return;
    const currentAtts = activeDoc.attachments || [];
    updateActiveDoc('attachments', currentAtts.filter(a => a.id !== attId));
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
            <div className="h-12 border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex gap-2">
                 <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleAttachFile} 
                  accept="image/*,.pdf,.doc,.docx" 
                />
                 <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-md transition"
                >
                  <Paperclip size={14} /> Adjuntar
                </button>
              </div>

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
                      className={`text-xs px-2 py-1 rounded ${activeDoc.category === cat ? 'bg-white/20 text-white' : 'text-gray-500 hover:bg-white/5'}`}
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
                  className="w-full min-h-[300px] bg-transparent border-none outline-none text-gray-300 text-lg leading-relaxed resize-none placeholder-gray-700 custom-scrollbar mb-8"
                  style={{ fieldSizing: 'content' } as any}
                />

                {/* Attachments Gallery */}
                {(activeDoc.attachments || []).length > 0 && (
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <h4 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                      <Paperclip size={16} /> Archivos Adjuntos
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {(activeDoc.attachments || []).map(att => (
                        <div key={att.id} className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/40">
                          {att.type.startsWith('image/') ? (
                            <img src={att.data} alt={att.name} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition" />
                          ) : (
                            <div className="w-full h-32 flex flex-col items-center justify-center text-gray-500">
                              <File size={32} className="mb-2" />
                              <span className="text-xs max-w-[90%] truncate" title={att.name}>{att.name}</span>
                            </div>
                          )}
                          
                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition gap-2">
                            {att.type.startsWith('image/') && (
                              <button 
                                onClick={() => {
                                  const w = window.open();
                                  w?.document.write(`<img src="${att.data}" />`);
                                }} 
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white" title="Ver completa"
                              >
                                <ImageIcon size={16} />
                              </button>
                            )}
                            <a 
                              href={att.data} 
                              download={att.name}
                              className="p-2 bg-temple-gold/20 hover:bg-temple-gold/40 rounded-full text-temple-gold" title="Descargar"
                            >
                              <Copy size={16} />
                            </a>
                            <button 
                              onClick={() => removeAttachment(att.id)}
                              className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-400" title="Eliminar"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
      className={`group flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}`}
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
