import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, LogOut, Globe, Activity, ExternalLink, Sparkles, User, Users, ClipboardList, Briefcase, FileText, BookOpen, Home, Image as ImageIcon, Database, ChefHat, PieChart, BarChart2 as Kanban, ShoppingBag, DollarSign, Download, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GlobalSearch } from '../components/GlobalSearch';
import { ThemeToggle } from '../components/ThemeToggle';
import { syncFromCloud, getCRMDatabase } from '../store';
import type { ReactNode } from 'react';

interface NavItem {
  id: string;
  icon: ReactNode;
  label: string;
  minRole?: 'instructor' | 'admin';
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

const FLAT_NAV_GROUPS: NavGroup[] = [
  {
    groupName: 'Administración TempleFit',
    items: [
      { id: 'home', icon: <Home size={18} />, label: '1. Centro de Mando' },
      { id: 'directory', icon: <Users size={18} />, label: '2. Atletas & Fichas', minRole: 'instructor' },
      { id: 'pipeline', icon: <Briefcase size={18} />, label: '3. Embudo Comercial', minRole: 'admin' },
      { id: 'armeria', icon: <ShoppingBag size={18} />, label: '4. Armería & Snack Bar', minRole: 'admin' },
      { id: 'finance', icon: <DollarSign size={18} />, label: '5. Finanzas & Caja', minRole: 'admin' },
    ]
  }
];

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBackToWeb?: () => void;
}

export function DashboardLayout({ children, activeTab, setActiveTab, onBackToWeb }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, hasRole } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);
  const [isSyncing, setIsSyncing] = useState(true);

  const [backupDownloaded, setBackupDownloaded] = useState(false);

  const handleDownloadBackup = () => {
    try {
      const data = getCRMDatabase();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `templefit_respaldo_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setBackupDownloaded(true);
      setTimeout(() => setBackupDownloaded(false), 3000);
    } catch (e) {
      console.error('Error al descargar respaldo:', e);
    }
  };

  useEffect(() => {
    syncFromCloud().finally(() => {
      setIsSyncing(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-temple-cream dark:bg-[#07090E] text-slate-900 dark:text-white overflow-hidden flex font-sans selection:bg-temple-gold selection:text-black transition-colors duration-300">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/6 dark:bg-black/60 dark:bg-black/80 backdrop-blur-md z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white/95 dark:bg-[#0B0F19]/95 border-r border-black/10 dark:border-white/10 backdrop-blur-2xl transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col shadow-xl dark:shadow-2xl`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/5 rounded-xl p-1.5 border border-black/10 dark:border-white/10 shadow-sm">
              <img src="/assets/img/logo-tf-abreviado.png" alt="TF" className="w-full h-full object-contain dark:filter dark:invert-0 filter" />
            </div>
            <div>
              <h1 className="text-lg font-serif font-black tracking-wider uppercase text-slate-900 dark:text-white flex items-center gap-1">
                TEMPLE<span className="text-amber-600 dark:text-temple-gold">FIT</span>
              </h1>
              <p className="text-[9px] text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em] font-extrabold">Panel de Control</p>
            </div>
          </div>
          <button className="md:hidden text-amber-700 dark:text-temple-gold hover:text-slate-900 dark:hover:text-temple-gold dark:hover:text-white transition p-1" onClick={() => setSidebarOpen(false)} aria-label="Cerrar barra lateral">
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto custom-scrollbar mt-2">
          <div>
            {onBackToWeb && (
              <button
                onClick={onBackToWeb}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-temple-gold bg-amber-500/10 dark:bg-temple-gold/10 border border-amber-500/30 dark:border-temple-gold/30 hover:bg-amber-600 hover:text-temple-gold dark:hover:text-white dark:hover:bg-temple-gold dark:hover:text-black transition-all duration-200 mb-2 group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
              >
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>Web Pública</span>
                </div>
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition" />
              </button>
            )}

            <a
              href="https://katzert.github.io/templefit-wiki/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-temple-gold bg-amber-500/10 dark:bg-temple-gold/10 border border-amber-500/30 dark:border-temple-gold/30 hover:bg-amber-600 hover:text-temple-gold dark:hover:text-white dark:hover:bg-temple-gold dark:hover:text-black transition-all duration-200 mb-2 group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
            >
              <div className="flex items-center gap-2">
                <ClipboardList size={16} />
                <span>TempleFit Wiki</span>
              </div>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 transition" />
            </a>
          </div>

          <div className="space-y-4">
            {FLAT_NAV_GROUPS.map((group) => {
              // Filter items by role
              const visibleItems = group.items.filter(item => !item.minRole || hasRole(item.minRole));
              if (visibleItems.length === 0) return null;

              return (
                <div key={group.groupName} className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500">
                    {group.groupName}
                  </div>
                  {visibleItems.map(item => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold ${
                          isActive
                            ? 'bg-amber-500/15 dark:bg-gradient-to-r dark:from-temple-gold/20 dark:to-amber-500/10 text-amber-950 dark:text-white border border-amber-500/30 dark:border-temple-gold/40 shadow-sm font-bold'
                            : 'text-slate-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-temple-gold dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isActive ? 'text-amber-700 dark:text-temple-gold' : 'text-slate-400 dark:text-gray-500'}>{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        {isActive && (
                          <motion.div layoutId="activePill" className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-temple-gold shadow-sm shadow-temple-gold" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-black/5 dark:border-white/5 bg-white dark:bg-black/[0.02] dark:bg-black/20">
          <div className="flex items-center justify-between group cursor-pointer bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl p-3 transition-colors shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-temple-gold to-amber-600 flex items-center justify-center text-black font-bold shadow-sm">
                {user?.avatar || 'U'}
              </div>
              <div className="text-left max-w-[120px]">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider">{user?.role}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="text-slate-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
              title="Cerrar Sesión"
              aria-label="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#FBF9F5] dark:bg-[#05070B] text-temple-navy dark:text-white relative transition-colors duration-300">
        
        {/* Top Header Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 bg-white/90 dark:bg-[#0B0F19]/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-amber-800 dark:text-temple-gold bg-black/5 dark:bg-white/5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold" aria-label="Abrir navegación lateral">
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-white/5 rounded-lg p-1 border border-black/10 dark:border-white/10">
              <img src="/assets/img/logo-tf-abreviado.png" alt="TF" className="w-full h-full object-contain dark:filter dark:invert-0 filter" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-600 dark:text-gray-400 hover:text-amber-800 dark:hover:text-temple-gold transition relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold rounded-lg"
              aria-label="Ver notificaciones"
            >
              <Bell size={20} />
              {unreadNotifications && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-600 dark:bg-temple-gold rounded-full ring-2 ring-white dark:ring-[#0B0F19]" />
              )}
            </button>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-black/5 dark:border-white/5 bg-white/90 dark:bg-[#0B0F19]/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
              {FLAT_NAV_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab)?.label || 'Sistema CRM'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <button
              onClick={handleDownloadBackup}
              title="Descargar copia de seguridad completa (JSON)"
              className="flex items-center gap-2 px-3.5 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 hover:text-amber-800 dark:hover:text-temple-gold border border-black/10 dark:border-white/10 rounded-xl text-xs font-bold transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
            >
              {backupDownloaded ? (
                <>
                  <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">¡Respaldo Guardado!</span>
                </>
              ) : (
                <>
                  <Download size={15} className="text-amber-700 dark:text-temple-gold" />
                  <span>Respaldar CRM</span>
                </>
              )}
            </button>

            <GlobalSearch onNavigate={setActiveTab} />
            
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadNotifications(false);
                }}
                className="p-2.5 text-slate-600 dark:text-gray-400 hover:text-amber-800 dark:hover:text-temple-gold bg-black/5 dark:bg-white/5 rounded-xl transition relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
                aria-label="Ver notificaciones del sistema"
              >
                <Bell size={18} className="group-hover:scale-110 transition-transform" />
                {unreadNotifications && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-600 dark:bg-temple-gold rounded-full ring-2 ring-white dark:ring-[#0B0F19] animate-pulse" />
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#121826] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 text-slate-900 dark:text-white"
                  >
                    <div className="p-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notificaciones</h3>
                      <button className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-temple-gold font-bold">Marcar leídas</button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      <div className="p-4 border-b border-black/5 dark:border-white/5 hover:bg-white dark:bg-black/5 dark:hover:bg-white/5 transition flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/15 dark:bg-temple-gold/20 flex items-center justify-center text-amber-700 dark:text-temple-gold flex-shrink-0 mt-1">
                          <Sparkles size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">Directorio de Atletas activado</p>
                          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">El nuevo sistema de Workspaces está listo.</p>
                          <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-2">Ahora</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-10 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick Action Floating Speed-Dial */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          <AnimatePresence>
            {showNotifications === false && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('finance')}
                  className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-[#121826]/90 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg hover:bg-emerald-600 hover:text-temple-gold dark:hover:text-white transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  title="Nuevo Asiento Contable"
                >
                  <DollarSign size={13} />
                  <span>+ Caja</span>
                </button>
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-[#121826]/90 border border-blue-500/40 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg hover:bg-blue-600 hover:text-temple-gold dark:hover:text-white transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  title="Nuevo Prospecto"
                >
                  <Briefcase size={13} />
                  <span>+ Lead</span>
                </button>
                <button
                  onClick={() => setActiveTab('directory')}
                  className="px-3.5 py-2 rounded-xl bg-temple-gold text-black text-[10px] font-black uppercase tracking-wider shadow-lg hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-temple-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-temple-gold"
                  title="Directorio de Atletas"
                >
                  <Users size={13} />
                  <span>+ Atleta</span>
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
