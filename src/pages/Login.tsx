import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        navigate('/admin');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Network error: Failed to connect to Supabase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-jade-950/40 z-10" />
        <img 
          src="/images/livingroom.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 w-full max-w-md bg-white dark:bg-jade-950 rounded-3xl p-8 shadow-2xl border border-jade-100 dark:border-jade-800"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-puyo-jade/10 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-puyo-jade dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-jade-900 dark:text-jade-50">Admin Portal</h1>
          <p className="text-sm text-jade-500 mt-2">Sign in to manage your property listings</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-jade-600 dark:text-jade-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-jade-400" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-jade-50 dark:bg-jade-900/50 border border-jade-100 dark:border-jade-800 focus:ring-2 focus:ring-puyo-jade focus:border-transparent outline-none transition-all"
                placeholder="admin@puyo.ph"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-jade-600 dark:text-jade-400 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-jade-400" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-jade-50 dark:bg-jade-900/50 border border-jade-100 dark:border-jade-800 focus:ring-2 focus:ring-puyo-jade focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-red-500 text-xs text-center font-medium bg-red-50 dark:bg-red-950/20 py-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="jade-button w-full py-4 flex items-center justify-center gap-2 group"
          >
            {loading ? 'Authenticating...' : 'Sign In'} 
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
