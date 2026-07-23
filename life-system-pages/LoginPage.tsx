import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-temple-navy-dark/95 via-temple-navy/90 to-temple-navy-dark/95" />
      
      {/* Ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-temple-gold/5 blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-temple-gold/10 border border-temple-gold/30 mb-4">
            <span className="text-2xl font-serif font-black text-temple-gold">TF</span>
          </div>
          <h1 className="text-3xl font-serif font-black tracking-tighter uppercase">
            TEMPLE<span className="text-temple-gold">FIT</span>
          </h1>
          <p className="text-xs text-gray-400 uppercase tracking-[0.25em] mt-1">
            Life System — Centro de Impacto
          </p>
        </div>

        {/* Login Card */}
        <div className="tactical-card !p-8">
          <h2 className="text-xl font-bold text-white mb-1">Iniciar Sesión</h2>
          <p className="text-sm text-gray-400 mb-6">
            Ingresa tus credenciales para acceder al sistema.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold focus:ring-1 focus:ring-temple-gold transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-temple-gold focus:ring-1 focus:ring-temple-gold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
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
              className="w-full py-3.5 bg-temple-gold text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-temple-gold-bright transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center mb-3">
              Acceso Rápido (Demo)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickLogin('alumno@templefit.com', 'alumno123')}
                className="py-2.5 px-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:border-temple-gold/30 hover:text-temple-gold transition-all text-center"
              >
                <div className="text-lg mb-0.5">🎓</div>
                Alumno
              </button>
              <button
                onClick={() => quickLogin('instructor@templefit.com', 'instructor123')}
                className="py-2.5 px-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:border-temple-gold/30 hover:text-temple-gold transition-all text-center"
              >
                <div className="text-lg mb-0.5">🏋️</div>
                Instructor
              </button>
              <button
                onClick={() => quickLogin('admin@templefit.com', 'admin123')}
                className="py-2.5 px-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:border-temple-gold/30 hover:text-temple-gold transition-all text-center"
              >
                <div className="text-lg mb-0.5">👑</div>
                Admin
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
