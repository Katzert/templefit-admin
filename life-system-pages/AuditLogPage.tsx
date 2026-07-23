import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { useAudit } from '../context/AuditContext';
import { useAuth } from '../context/AuthContext';
import { Clock, Filter, User, FileEdit, Trash2, PlusCircle, Search } from 'lucide-react';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

const ACTION_ICONS = {
  create: <PlusCircle size={14} className="text-temple-green" />,
  update: <FileEdit size={14} className="text-temple-gold" />,
  delete: <Trash2 size={14} className="text-temple-red" />,
};

const ACTION_LABELS = {
  create: 'Creó',
  update: 'Modificó',
  delete: 'Eliminó',
};

export function AuditLogPage() {
  const { entries } = useAudit();
  const { user, hasRole } = useAuth();
  const [search, setSearch] = useState('');
  const [filterModule, setFilterModule] = useState('Todos');

  // Instructors only see their own entries, admins see all
  const visibleEntries = hasRole('admin')
    ? entries
    : entries.filter(e => e.userEmail === user?.email);

  const modules = ['Todos', ...new Set(visibleEntries.map(e => e.module))];

  const filtered = visibleEntries.filter(e => {
    const matchesModule = filterModule === 'Todos' || e.module === filterModule;
    const matchesSearch = search === '' ||
      e.field.toLowerCase().includes(search.toLowerCase()) ||
      e.userName.toLowerCase().includes(search.toLowerCase()) ||
      (e.targetUser || '').toLowerCase().includes(search.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      <motion.div variants={item}>
        <h1 className="text-3xl md:text-5xl font-serif font-black uppercase text-white">
          REGISTRO DE <span className="text-temple-gold">CAMBIOS</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest border-l-2 border-temple-gold pl-3">
          {hasRole('admin') ? 'Historial completo de todas las modificaciones del sistema.' : 'Historial de tus modificaciones.'}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Buscar por campo, usuario o alumno..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold focus:ring-1 focus:ring-temple-gold transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={filterModule}
            onChange={e => setFilterModule(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-temple-gold transition-all"
          >
            {modules.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4 text-center">
          <p className="text-2xl font-black text-white">{visibleEntries.length}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total cambios</p>
        </Card>
        <Card className="!p-4 text-center">
          <p className="text-2xl font-black text-temple-gold">{visibleEntries.filter(e => e.action === 'update').length}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Modificaciones</p>
        </Card>
        <Card className="!p-4 text-center">
          <p className="text-2xl font-black text-temple-green">{visibleEntries.filter(e => e.action === 'create').length}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Creaciones</p>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={item}>
        <Card>
          <CardContent className="!p-6">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <Clock size={40} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No se encontraron registros de cambios.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 p-4 bg-black/20 rounded-xl border border-white/5 hover:border-temple-gold/20 transition-all"
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                      entry.action === 'create' ? 'bg-temple-green/10 border border-temple-green/30' :
                      entry.action === 'update' ? 'bg-temple-gold/10 border border-temple-gold/30' :
                      'bg-temple-red/10 border border-temple-red/30'
                    }`}>
                      {ACTION_ICONS[entry.action]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white">{entry.userName}</span>
                        <span className="text-xs text-gray-500">{ACTION_LABELS[entry.action]}</span>
                        <span className="text-sm font-bold text-temple-gold">{entry.field}</span>
                        <span className="text-xs text-gray-600">en</span>
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">{entry.module}</span>
                      </div>
                      
                      {entry.targetUser && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <User size={10} />
                          Alumno: <span className="text-gray-300">{entry.targetUser}</span>
                        </div>
                      )}

                      {(entry.oldValue || entry.newValue) && (
                        <div className="flex flex-wrap gap-3 mt-2 text-xs">
                          {entry.oldValue && (
                            <span className="px-2 py-1 bg-temple-red/10 text-temple-red rounded-lg border border-temple-red/20 line-through">
                              {entry.oldValue}
                            </span>
                          )}
                          {entry.newValue && (
                            <span className="px-2 py-1 bg-temple-green/10 text-temple-green rounded-lg border border-temple-green/20">
                              {entry.newValue}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="flex-shrink-0 text-right">
                      <p className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Clock size={10} />
                        {formatDate(entry.timestamp)}
                      </p>
                      <p className="text-[9px] text-gray-600 uppercase tracking-wider mt-0.5">{entry.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
