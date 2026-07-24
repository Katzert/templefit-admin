import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, LogOut, ChevronDown, Globe, Activity, Share2, Briefcase, ExternalLink, Sparkles } from 'lucide-react';
import { Home, User, Users, ClipboardList, CalendarDays, Microscope, Target, UtensilsCrossed, ShoppingBag, BarChart3, Brain, FileText, Settings, HelpCircle, BookOpen } from 'lucide-react';
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
  { id: 'home', icon: <Home size={18} />, label: 'Inicio / Resumen' },
  { id: 'team-ops', icon: <Users size={18} />, label: 'Alumnos e Instructores' },
  { id: 'daily', icon: <Target size={18} />, label: 'Hábitos & Mi Día' },
  { id: 'calendar', icon: <CalendarDays size={18} />, label: 'Calendario & Eventos' },
  { id: 'financial', icon: <BarChart3 size={18} />, label: 'Finanzas & Control', minRole: 'admin' },
  { id: 'profile', icon: <User size={18} />, label: 'Mi Perfil' },
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

  const filteredNav = NAV_ITEMS.filter(item => !item.minRole || hasRole(item.minRole));

  return (
    <div className="min-h-screen bg-[#07090E] text-white overflow-hidden flex font-sans selection:bg-temple-gold selection:text-black">
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0B0F19]/95 border-r border-white/10 backdrop-blur-2xl transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col shadow-2xl`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-temple-gold/20 to-amber-500/10 border border-temple-gold/40 flex items-center justify-center shadow-lg shadow-temple-gold/10">
              <span className="text-sm font-serif font-black text-temple-gold">TF</span>
            </div>
            <div>
              <h1 className="text-lg font-serif font-black tracking-wider uppercase text-white flex items-center gap-1">
                TEMPLE<span className="text-temple-gold">FIT</span>
              </h1>
              <p className="text-[9px] text-temple-gold uppercase tracking-[0.2em] font-extrabold">Life System v3.5 (Actualizado)</p>
            </div>
          </div>
          <button className="md:hidden text-temple-gold hover:text-white transition" onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {onBackToWeb && (
            <button
              onClick={onBackToWeb}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-temple-gold bg-temple-gold/10 border border-temple-gold/30 hover:bg-temple-gold hover:text-black transition-all duration-200 mb-2 group shadow-sm"
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
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-temple-gold bg-temple-gold/10 border border-temple-gold/30 hover:bg-temple-gold hover:text-black transition-all duration-200 mb-4 group shadow-sm"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>TempleFit Wiki</span>
            </div>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition" />
          </a>

          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Módulos del Sistema</div>

          {filteredNav.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-temple-gold/20 to-amber-500/10 text-white border border-temple-gold/40 shadow-lg shadow-temple-gold/5 font-bold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-temple-gold' : 'text-gray-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="activePill" className="w-1.5 h-1.5 rounded-full bg-temple-gold shadow-sm shadow-temple-gold" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer User Info */}
        <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-temple-gold/20 border border-temple-gold/40 flex items-center justify-center font-bold text-temple-gold text-xs flex-shrink-0">
              {user?.name?.[0] || 'P'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Paulo Coach'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email || 'admin@templefit.com'}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-red-400 transition"
            title="Cerrar sesión"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-b from-[#07090E] via-[#0A0E17] to-[#07090E]">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-300">Sistema en Vivo</span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadNotifications(false);
                }}
                className="p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white relative transition"
              >
                <Bell size={18} />
                {unreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-temple-gold shadow-sm shadow-temple-gold" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0F1420] border border-white/10 rounded-2xl shadow-2xl p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Notificaciones</span>
                    <span className="text-[10px] text-temple-gold">Al día</span>
                  </div>
                  <div className="space-y-2 text-xs text-gray-400">
                    <p className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer">
                      💡 3 alumnos tienen su suscripción venciendo en los próximos 3 días.
                    </p>
                    <p className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer">
                      🏋️‍♂️ Recordatorio: Sábado CristoFit Camp a las 07:00 AM.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-temple-gold px-2.5 py-1 rounded-full bg-temple-gold/10 border border-temple-gold/30">
                Santa Cruz, BO
              </span>
            </div>
          </div>
        </header>

        {/* Page View Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
