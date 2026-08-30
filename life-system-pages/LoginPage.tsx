import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff, AlertCircle, User } from 'lucide-react';

export function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    const success = login(email, password);
    if (!success) {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
    setLoading(false);
  };

  const quickLogin = (email: string, pass: string) => {
    setEmail(email);
    setPassword(pass);
    login(email, pass);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-temple-cream dark:bg-[#07090E] relative overflow-hidden selection:bg-temple-gold selection:text-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-temple-cream via-temple-cream to-slate-200 dark:from-[#002147] dark:via-[#07090E] dark:to-[#07090E] opacity-100 z-0"></div>
      
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Login Card */}
        <div className="bg-white/80 dark:bg-[#0B0F19]/90 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-black/10 dark:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-temple-gold to-transparent opacity-50"></div>
          
          <h2 className="text-xl font-bold text-slate-900 dark:text-temple-navy dark:text-white mb-1">Iniciar Sesión</h2>
          <p className="text-sm text-slate-600 dark:text-gray-400 mb-6">
            Ingresa tus credenciales para acceder al sistema.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-gray-400 mb-2">
                Identificación de Usuario
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-gray-500 group-focus-within:text-temple-gold transition-colors">
                  <User size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/5 dark:bg-[#07090E]/50 border border-black/10 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                  placeholder="admin@templefit.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-gray-400 mb-1.5 block">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/5 dark:bg-[#07090E]/50 border border-black/10 dark:border-white/10 rounded-xl py-3.5 px-4 pr-12 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-temple-gold focus:ring-2 focus:ring-temple-gold/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-500 hover:text-temple-gold dark:hover:text-white transition"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-temple-red bg-temple-red/10 border border-temple-red/20 rounded-xl p-3"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-temple-gold hover:bg-temple-gold-bright text-black font-black uppercase tracking-[0.2em] text-sm py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-temple-gold focus-visible:ring-offset-2 focus-visible:ring-offset-temple-cream dark:focus-visible:ring-offset-[#0B0F19]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Lock size={16} />
                  Ingresar al Sistema
                </>
              )}
            </button>
          </form>

          {/* Quick Login Buttons */}
          <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5">
            <h2 className="text-3xl font-serif font-black tracking-wider text-slate-900 dark:text-temple-navy dark:text-white uppercase mb-2">
              TEMPLE<span className="text-temple-gold">FIT</span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-gray-400 uppercase tracking-[0.3em] font-extrabold mb-8">
              Sistema Operativo
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => quickLogin('admin@templefit.com', 'admin123')}
                className="py-2.5 px-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-xs font-bold text-slate-600 dark:text-gray-300 hover:border-temple-gold/30 hover:text-temple-gold transition-all text-center"
              >
                Acceso Rápido Administrador (Paulo)
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
