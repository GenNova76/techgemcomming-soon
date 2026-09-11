import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, User, ShieldCheck, } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
  const { signIn, user, profile } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to={profile?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    const { error, role} = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    
    else {
     setLoading(false);
    }

    } 
    if(loginType === 'admin' && role !== 'admin'){
      setError('This account does not have administrator access.');
      setLoading(false);
      return;
    }
    if(role === 'admin'){
      navigate('/admin');
    }
    else {
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-15" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-600/10 dark:bg-cyan-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <Link to="/"><Logo size={48} showText={false} /></Link>
            <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white mt-4">
              {loginType === 'admin' ? 'Admin Login' : 'Welcome Back'}
            </h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
              {loginType === 'admin'
                ? 'Sign in with your administrator account'
                : 'Sign in to your TechGems account'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
            >
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
                
                {/* Admin field             */}
                 <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLoginType('user')}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                      loginType === 'user'
                        ? 'border-cyan-600 bg-cyan-600 text-white hover:bg-yellow-400 hover:text-night-400'
                        : 'border-ink-200 dark:border-white/10 text-ink-600 dark:text-ink-300 hover:border-cyan-400'
                    }`}
                  >
                    <User size={18} />
                    User Login
                  </button>

                  <button
                    type="button"
                    onClick={() => setLoginType('admin')}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                      loginType === 'admin'
                        ? 'border-yellow-500 bg-yellow-500 text-ink-900 hover:bg-cyan-400  hover:text-white'
                        : 'border-ink-200 dark:border-white/10 text-ink-600 dark:text-ink-300 hover:border-yellow-400'
                    }`}
                  >
                    <ShieldCheck size={18} />
                    Admin Login
                  </button>
                </div>
                <div>
                
                <label htmlFor="email" className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Email</label>
                <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400 " />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-base pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-base pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500 dark:text-ink-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
