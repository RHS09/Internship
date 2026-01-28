
import React, { useState } from 'react';
import { Trophy, User, ShieldCheck, Mail, Lock, ArrowRight, Zap } from 'lucide-react';
import { UserRole, User as UserType } from '../types';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    const mockUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'admin' ? 'Arena Manager' : 'Pro Player',
      email: email || (role === 'admin' ? 'admin@bookmyturf.com' : 'player@field.com'),
      role: role
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover opacity-20 brightness-50"
          alt="Stadium"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-lime-500/10"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-lime-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-2xl shadow-lime-500/20 mx-auto mb-4 rotate-3">
            <Trophy className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-sport font-black italic text-white uppercase tracking-tighter">
            BOOKMYTURF<span className="text-lime-500">.</span>
          </h1>
          <p className="text-slate-400 font-bold tracking-widest text-xs uppercase mt-2">Elite Arena Access</p>
        </div>

        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
          {/* Role Switcher */}
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl mb-8 border border-white/5">
            <button 
              onClick={() => setRole('user')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-black uppercase text-xs tracking-widest ${role === 'user' ? 'bg-lime-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}
            >
              <User className="w-4 h-4" />
              Player
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-black uppercase text-xs tracking-widest ${role === 'admin' ? 'bg-lime-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}
            >
              <ShieldCheck className="w-4 h-4" />
              Manager
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'admin' ? 'manager@arena.com' : 'pro@player.com'}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-lime-500 transition-all font-bold"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-lime-500 transition-all font-bold"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white hover:bg-lime-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-xl shadow-white/5 flex items-center justify-center gap-3 mt-4"
            >
              Enter Stadium
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-lime-500 fill-current" />
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Instant matchmaking active</p>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-600 text-[10px] font-black uppercase tracking-widest">
          {role === 'admin' ? 'New Arena? Register Facility' : 'New Player? Join the League'}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
