import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, User, Briefcase, ChefHat, ShoppingBag, BookOpen, Command, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getCRMDatabase } from '../store';

interface GlobalSearchProps {
  onNavigate?: (tab: string) => void;
}

export function GlobalSearch({ onNavigate }: GlobalSearchProps) {
  const { setSelectedStudent } = useAuth();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Multi-entity search results
  const searchResults = useMemo(() => {
    if (!query || query.trim().length < 2) return null;
    const q = query.toLowerCase().trim();
    const db = getCRMDatabase();

    const students = (db.students || []).filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.includes(q) ||
      s.escuadronId.toLowerCase().includes(q)
    ).slice(0, 4);

    const leads = (db.leads || []).filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.notes.toLowerCase().includes(q)
    ).slice(0, 3);

    const recipes = (db.recipes || []).filter(r =>
      r.name.toLowerCase().includes(q) ||
      (r.description && r.description.toLowerCase().includes(q))
    ).slice(0, 3);

    const inventory = (db.inventory || []).filter(i =>
      i.name.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const sops = (db.sopsList || []).filter(s =>
      s.title.toLowerCase().includes(q) ||
      (s.content && s.content.toLowerCase().includes(q))
    ).slice(0, 2);

    const totalCount = students.length + leads.length + recipes.length + inventory.length + sops.length;

    return { students, leads, recipes, inventory, sops, totalCount };
  }, [query]);

  return (
    <div className="relative z-50 flex items-center" ref={wrapperRef}>
      {/* Search Input Button / Bar */}
      <div 
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`flex items-center bg-black/5 dark:bg-white/5 border transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer ${
          isOpen ? 'border-amber-500/60 dark:border-temple-gold/60 shadow-lg shadow-amber-500/10 dark:shadow-temple-gold/20 bg-white dark:bg-black/80 ring-2 ring-amber-500/20' : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10'
        }`}
      >
        <div className="pl-3.5 pr-2 text-slate-500 dark:text-gray-400">
          <Search size={15} className={isOpen ? 'text-amber-600 dark:text-temple-gold' : ''} />
        </div>
        <input 
          ref={inputRef}
          type="text"
          placeholder="Buscar atleta, lead, receta, stock..."
          className="bg-transparent border-none outline-none text-xs text-slate-900 dark:text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 py-2.5 w-48 sm:w-64 md:w-80 font-medium"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          aria-label="Búsqueda global"
        />
        <div className="pr-3 flex items-center gap-1">
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[9px] font-black uppercase text-slate-500 dark:text-gray-400 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-md">
            <Command size={10} /> K
          </kbd>
        </div>
      </div>

      {/* Floating Spotlight Dropdown */}
      <AnimatePresence>
        {isOpen && query.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 md:right-0 mt-3 w-80 sm:w-96 md:w-[480px] bg-white dark:bg-[#0E1424] border border-black/10 dark:border-temple-gold/30 rounded-3xl shadow-2xl overflow-hidden max-h-[420px] overflow-y-auto custom-scrollbar z-50 backdrop-blur-2xl text-slate-900 dark:text-white"
          >
            {/* Header info */}
            <div className="px-4 py-3 bg-white dark:bg-black/[0.03] dark:bg-black/40 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 dark:text-temple-gold">
                Resultados Globales ({searchResults?.totalCount || 0})
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:text-gray-400 dark:hover:text-temple-gold dark:hover:text-white p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
                aria-label="Cerrar búsqueda"
              >
                <X size={14} />
              </button>
            </div>

            {searchResults && searchResults.totalCount > 0 ? (
              <div className="p-2 space-y-3">
                
                {/* 1. Atletas */}
                {searchResults.students.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500">
                      Atletas ({searchResults.students.length})
                    </div>
                    <div className="space-y-1">
                      {searchResults.students.map(st => (
                        <button
                          key={st.id}
                          onClick={() => {
                            setSelectedStudent(st);
                            setIsOpen(false);
                            setQuery('');
                            onNavigate?.('directory');
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-500/15 dark:bg-temple-gold/20 text-amber-700 dark:text-temple-gold flex items-center justify-center font-bold text-xs">
                              <User size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-temple-gold transition-colors leading-tight">{st.name}</p>
                              <p className="text-[10px] text-slate-500 dark:text-gray-400 mt-0.5">{st.escuadronId} • {st.plan}</p>
                            </div>
                          </div>
                          <ArrowRight size={12} className="text-slate-400 dark:text-gray-600 group-hover:text-amber-700 dark:group-hover:text-temple-gold transition-transform group-hover:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Leads / Prospectos */}
                {searchResults.leads.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500">
                      Prospectos / Leads ({searchResults.leads.length})
                    </div>
                    <div className="space-y-1">
                      {searchResults.leads.map(ld => (
                        <button
                          key={ld.id}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery('');
                            onNavigate?.('pipeline');
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-500/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                              <Briefcase size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">{ld.name}</p>
                              <p className="text-[10px] text-slate-500 dark:text-gray-400 mt-0.5">{ld.phone} • Estado: {ld.status}</p>
                            </div>
                          </div>
                          <ArrowRight size={12} className="text-slate-400 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Recetas */}
                {searchResults.recipes.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500">
                      Recetas Snack Bar ({searchResults.recipes.length})
                    </div>
                    <div className="space-y-1">
                      {searchResults.recipes.map(rc => (
                        <button
                          key={rc.id}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery('');
                            onNavigate?.('armeria');
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                              <ChefHat size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-tight">{rc.name}</p>
                              <p className="text-[10px] text-slate-500 dark:text-gray-400 mt-0.5">Bs. {rc.suggestedPrice || 0} • {rc.category || 'Nutrición'}</p>
                            </div>
                          </div>
                          <ArrowRight size={12} className="text-slate-400 dark:text-gray-600 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Inventario */}
                {searchResults.inventory.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500">
                      Inventario & Armería ({searchResults.inventory.length})
                    </div>
                    <div className="space-y-1">
                      {searchResults.inventory.map(inv => (
                        <button
                          key={inv.id}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery('');
                            onNavigate?.('armeria');
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                              <ShoppingBag size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-temple-navy dark:text-white group-hover:text-amber-400 transition-colors leading-tight">{inv.name}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">Stock: {inv.stock} • Bs. {inv.price}</p>
                            </div>
                          </div>
                          <ArrowRight size={12} className="text-gray-600 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. SOPs */}
                {searchResults.sops.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                      SOPs & Protocolos ({searchResults.sops.length})
                    </div>
                    <div className="space-y-1">
                      {searchResults.sops.map(sop => (
                        <button
                          key={sop.id}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery('');
                            onNavigate?.('home');
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                              <BookOpen size={14} />
                            </div>
                            <div>
                              <p className="text-xs font-black text-temple-navy dark:text-white group-hover:text-purple-400 transition-colors leading-tight">{sop.title}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{sop.content ? `${sop.content.slice(0, 45)}...` : ''}</p>
                            </div>
                          </div>
                          <ArrowRight size={12} className="text-gray-600 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-8 text-center">
                <Search size={28} className="text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-bold">No se encontraron resultados para "{query}"</p>
                <p className="text-[10px] text-gray-600 mt-1">Prueba buscando por nombre, teléfono o ingrediente.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
