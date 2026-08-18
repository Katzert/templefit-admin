import { useState, useRef, useEffect } from 'react';
import { Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface GlobalSearchProps {
  onNavigate?: (tab: string) => void;
}

export function GlobalSearch({ onNavigate }: GlobalSearchProps) {
  const { students, selectedStudent, setSelectedStudent, hasRole } = useAuth();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  if (!hasRole('instructor')) return null;

  const filteredStudents = query.length >= 2 
    ? students.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) || 
        s.email.toLowerCase().includes(query.toLowerCase()) ||
        s.phone.includes(query)
      )
    : [];

  return (
    <div className="relative z-50 flex items-center" ref={wrapperRef}>
      <div className={`flex items-center bg-white/5 border transition-all duration-300 rounded-xl overflow-hidden ${isOpen ? 'border-temple-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'border-white/10 hover:border-white/20'}`}>
        <div className="pl-3 pr-2 text-gray-400">
          <Search size={16} className={isOpen ? 'text-temple-gold' : ''} />
        </div>
        <input 
          type="text"
          placeholder="Buscar atleta (nombre, email)..."
          className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 py-2.5 w-64 md:w-80"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      <AnimatePresence>
        {isOpen && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#121826] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto"
          >
            {filteredStudents.length > 0 ? (
              <div className="py-2">
                {filteredStudents.map(student => (
                  <button
                    key={student.id}
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsOpen(false);
                      setQuery('');
                      onNavigate?.('profile');
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-white/5 transition flex items-center gap-3 ${selectedStudent?.id === student.id ? 'bg-temple-gold/10' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-temple-gold/20 flex items-center justify-center text-temple-gold flex-shrink-0">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{student.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{student.email} • {student.phase}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <Search size={24} className="text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No se encontraron atletas para "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
