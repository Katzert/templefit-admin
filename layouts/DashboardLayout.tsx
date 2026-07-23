import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, LogOut, ChevronDown, Globe, Activity, Share2, Briefcase } from 'lucide-react';
import { Home, User, ClipboardList, CalendarDays, Microscope, Target, UtensilsCrossed, ShoppingBag, BarChart3, Brain, FileText, Settings, HelpCircle } from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';
import type { ReactNode } from 'react';

interface NavItem {
  id: string;
  icon: ReactNode;
  label: string;
  minRole?: UserRole;
  children?: { id: string; label: string; minRole?: UserRole }[];
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: <Home size={18} />, label: 'Inicio' },
  { id: 'profile', icon: <User size={18} />, label: 'Mi Perfil' },
  {
    id: 'progress', icon: <Target size={18} />, label: 'Mi Progreso',
    children: [
      { id: 'daily', label: 'Registro Diario' },
      { id: 'habits', label: 'Tracker Hábitos' },
      { id: 'technical', label: 'Ficha Técnica' },
      { id: 'audit', label: 'Auditoría Mensual' },
      { id: 'training-log', label: 'Entrenamiento' },
    ]
  },
  {
    id: 'admin', icon: <Briefcase size={18} />, label: 'Administración', minRole: 'instructor',
    children: [
      { id: 'team-ops', label: 'Libro Operativo' },
      { id: 'changelog', label: 'Registro de Cambios' },
      { id: 'social-media', label: '📖 Libro & Copys Notion', minRole: 'admin' },
      { id: 'financial', label: 'Financiero', minRole: 'admin' },
      { id: 'settings', label: 'Configuración', minRole: 'admin' }
    ]
  },
  { id: 'help', icon: <HelpCircle size={18} />, label: 'Ayuda y Tutorial' },
];

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBackToWeb?: () => void;
}

export function DashboardLayout({ children, activeTab, setActiveTab, onBackToWeb }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, hasRole, students, selectedStudent, setSelectedStudent } = useAuth();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  const filteredNav = NAV_ITEMS.filter(item => !item.minRole || hasRole(item.minRole));

  const toggleGroup = (id: string) => {
    setExpandedGroup(prev => prev === id ? null : id);
  };

  const handleNavClick = (navItem: NavItem) => {
    if (navItem.children) {
      toggleGroup(navItem.id);
    } else {
      setActiveTab(navItem.id);
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-temple-navy-dark text-white overflow-hidden flex font-sans">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-temple-navy/95 border-r border-temple-gold/10 backdrop-blur-xl transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-temple-gold/10 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-temple-gold/10 border border-temple-gold/30 flex items-center justify-center">
              <span className="text-sm font-serif font-black text-temple-gold">TF</span>
            </div>
            <div>
              <h1 className="text-lg font-serif font-black tracking-tighter uppercase">
                TEMPLE<span className="text-temple-gold">FIT</span>
              </h1>
              <p className="text-[8px] text-gray-500 uppercase tracking-[0.2em]">Life System v3.0</p>
            </div>
          </div>
          <button className="md:hidden text-temple-gold" onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {onBackToWeb && (
            <button
              onClick={onBackToWeb}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-temple-gold bg-temple-gold/5 border border-temple-gold/25 hover:bg-temple-gold hover:text-black transition-all mb-4"
            >
              <span className="flex-shrink-0"><Globe size={18} /></span>
              <span className="truncate text-left">Volver al Sitio Web</span>
            </button>
          )}

          {/* Student Selector for Instructors/Admins */}
          {(user?.role === 'instructor' || user?.role === 'admin') && selectedStudent && (
            <div className="mb-6 p-3 bg-black/40 border border-temple-gold/20 rounded-xl space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-temple-gold block">
                Alumno en Foco
              </label>
              <div className="relative">
                <select
                  value={selectedStudent.email}
                  onChange={(e) => {
                    const found = students.find(s => s.email === e.target.value);
                    if (found) setSelectedStudent(found);
                  }}
                  className="w-full bg-temple-navy border border-white/10 rounded-lg py-2 px-3 pr-8 text-xs text-white focus:outline-none focus:border-temple-gold focus:ring-1 focus:ring-temple-gold appearance-none cursor-pointer font-bold uppercase tracking-wider"
                >
                  {students.map(s => (
                    <option key={s.email} value={s.email}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-temple-gold text-[10px]">
                  ▼
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <div className="w-5 h-5 rounded-full bg-temple-gold/10 border border-temple-gold flex items-center justify-center font-bold text-temple-gold text-[9px]">
                  {selectedStudent.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-300 truncate uppercase">{selectedStudent.name}</p>
                </div>
              </div>
            </div>
          )}
          {filteredNav.map((navItem) => {
            const isActive = activeTab === navItem.id;
            const isExpanded = expandedGroup === navItem.id;
            const hasChildren = !!navItem.children;

            return (
              <div key={navItem.id}>
                <button
                  onClick={() => handleNavClick(navItem)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl transition-all duration-200 text-[11px] font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-temple-gold/10 text-temple-gold border border-temple-gold/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="flex-shrink-0">{navItem.icon}</span>
                    <span className="truncate text-left leading-tight">{navItem.label}</span>
                  </span>
                  {hasChildren && (
                    <ChevronDown size={13} className={`flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {hasChildren && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-8 space-y-1 mt-1"
                    >
                      {navItem.children!.filter(c => !c.minRole || hasRole(c.minRole)).map(child => (
                        <button
                          key={child.id}
                          onClick={() => { setActiveTab(child.id); setSidebarOpen(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-medium transition-colors ${
                            activeTab === child.id ? 'text-temple-gold bg-temple-gold/5' : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-3 border-t border-temple-gold/10 flex-shrink-0">
          <div className="flex items-center space-x-3 bg-black/20 p-3 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-temple-gold/20 border border-temple-gold flex items-center justify-center font-bold text-temple-gold text-xs">
              {user?.avatar || '??'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-temple-gold uppercase tracking-widest">{user?.role}</p>
            </div>
            <button onClick={logout} className="p-1.5 text-gray-500 hover:text-temple-red transition" title="Cerrar sesión">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-14 border-b border-temple-gold/10 bg-temple-navy-dark/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 z-30 flex-shrink-0">
          <div className="flex items-center">
            <button className="md:hidden text-temple-gold mr-4" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400">
              Área de Usuario
            </h2>
          </div>
          <div className="flex items-center space-x-3 relative">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-temple-gold bg-temple-gold/10 px-3 py-1.5 rounded-full border border-temple-gold/20">
              <span className="w-2 h-2 rounded-full bg-temple-gold animate-pulse"></span>
              <span>SISTEMA ACTIVO</span>
            </div>
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadNotifications(false);
                }}
                className="relative text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition"
              >
                <Bell size={18} />
                {unreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-temple-red rounded-full"></span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 bg-temple-navy-dark/95 border border-temple-gold/20 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-4 z-50 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-temple-gold">Notificaciones</span>
                        <button 
                          onClick={() => {
                            setUnreadNotifications(false);
                            setShowNotifications(false);
                          }}
                          className="text-[9px] font-bold uppercase tracking-wider text-gray-500 hover:text-white transition"
                        >
                          Marcar como leídas
                        </button>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {[
                          { id: 1, title: 'Ficha Técnica Actualizada', text: 'David Torres actualizó tu rutina de calistenia.', time: 'Hace 10 min' },
                          { id: 2, title: 'Consistencia de Hábitos', text: '¡Llevas 5 días seguidos marcando victorias!', time: 'Hace 2 horas' },
                          { id: 3, title: 'Alerta de Auditoría', text: 'Recuerda auditar tus métricas semanales.', time: 'Hace 1 día' }
                        ].map(notif => (
                          <div key={notif.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition space-y-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-white uppercase">{notif.title}</span>
                              <span className="text-[8px] text-gray-500">{notif.time}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{notif.text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
