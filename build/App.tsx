
import React, { useState, useCallback, useEffect } from 'react';
import { Search, MapPin, Calendar, Bell, User, LayoutGrid, CheckCircle2, Zap, Trophy, Filter, LogOut, Settings, History, Target, ArrowRight, Play } from 'lucide-react';
import { Turf, User as UserType } from './types';
import { TURFS } from './data/mockData';
import TurfCard from './components/TurfCard';
import TurfDetail from './components/TurfDetail';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import ScoreboardManager from './components/ScoreboardManager';
import { getSmartTurfRecommendation } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [activeTurfId, setActiveTurfId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTurfs, setFilteredTurfs] = useState<Turf[]>(TURFS);
  const [aiLoading, setAiLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<Record<string, string>>({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isProfileView, setIsProfileView] = useState(false);
  const [isScoreboardView, setIsScoreboardView] = useState(false);

  // Smooth scroll to results when filtering or searching
  const scrollToResults = () => {
    const grid = document.getElementById('arenas-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredTurfs(TURFS);
      setAiReasoning({});
      return;
    }

    setAiLoading(true);
    const result = await getSmartTurfRecommendation(searchTerm);
    
    if (result.recommendations && result.recommendations.length > 0) {
      const recIds = result.recommendations.map((r: any) => r.id);
      const reasoningMap: Record<string, string> = {};
      result.recommendations.forEach((r: any) => reasoningMap[r.id] = r.reason);
      
      const newFiltered = TURFS.filter(t => recIds.includes(t.id));
      setFilteredTurfs(newFiltered.length > 0 ? newFiltered : TURFS);
      setAiReasoning(reasoningMap);
      scrollToResults();
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredTurfs(TURFS.filter(t => 
        t.name.toLowerCase().includes(lowerSearch) || 
        t.sports.some(s => s.toLowerCase().includes(lowerSearch))
      ));
    }
    setAiLoading(false);
  }, [searchTerm]);

  const handleFilter = (cat: string) => {
    setActiveFilter(cat);
    if (cat === 'All') {
      setFilteredTurfs(TURFS);
    } else {
      setFilteredTurfs(TURFS.filter(t => t.sports.includes(cat as any)));
    }
    scrollToResults();
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdminView(false);
    setIsProfileView(false);
    setIsScoreboardView(false);
    setActiveTurfId(null);
  };

  const activeTurf = TURFS.find(t => t.id === activeTurfId);

  const handleBook = (slot: number, price: number) => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveTurfId(null);
    }, 3000);
  };

  const resetViews = () => {
    setActiveTurfId(null); 
    setFilteredTurfs(TURFS); 
    setSearchTerm(''); 
    setActiveFilter('All');
    setIsAdminView(false);
    setIsProfileView(false);
    setIsScoreboardView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen text-slate-100 font-sport uppercase tracking-tight selection:bg-lime-500 selection:text-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-dark border-b border-white/5 h-28">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between gap-8">
          <div 
            className="flex items-center gap-4 cursor-pointer group shrink-0"
            onClick={resetViews}
          >
            <div className="w-14 h-14 bg-lime-500 rounded-[1.25rem] flex items-center justify-center text-slate-950 shadow-[0_0_25px_rgba(132,204,22,0.3)] group-hover:scale-110 transition-transform rotate-6">
              <Trophy className="w-8 h-8" />
            </div>
            <span className="text-4xl font-black italic tracking-tighter text-white">
              BOOKMYTURF<span className="text-lime-500">.</span>
            </span>
          </div>

          {!isAdminView && !isProfileView && !isScoreboardView && !activeTurfId && (
            <div className="hidden lg:flex flex-1 max-w-2xl px-8">
              <form onSubmit={handleSearch} className="w-full relative group">
                <input 
                  type="text" 
                  placeholder="Find your discipline (e.g. Football night turf)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-lime-500 focus:bg-white/10 transition-all text-lg font-black text-white placeholder:text-slate-600 italic tracking-widest"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600 group-focus-within:text-lime-500 transition-colors" />
                {aiLoading && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                     <div className="w-6 h-6 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </form>
            </div>
          )}

          <div className="flex items-center gap-6">
            <button className="hidden xl:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              <MapPin className="w-4 h-4 text-lime-500" />
              BENGALURU
            </button>
            
            <div className="relative group/profile">
              <button className="flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black hover:bg-lime-500 transition-all shadow-2xl shadow-white/5 transform active:scale-95 italic">
                <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden lg:inline uppercase tracking-widest text-sm">{user.name}</span>
              </button>
              
              <div className="absolute top-full right-0 mt-4 w-64 bg-slate-950 border border-white/10 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all p-3 z-50">
                <div className="px-5 py-3 text-[9px] font-black text-slate-600 border-b border-white/5 mb-2 tracking-[0.3em] uppercase">Player Panel</div>
                
                <button 
                  onClick={() => { setIsProfileView(true); setIsAdminView(false); setIsScoreboardView(false); setActiveTurfId(null); }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-sm font-black text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                >
                  <History className="w-5 h-5 text-lime-500" /> PRO PROFILE
                </button>

                <button 
                  onClick={() => { setIsScoreboardView(true); setIsAdminView(false); setIsProfileView(false); setActiveTurfId(null); }}
                  className="w-full flex items-center gap-4 px-5 py-4 text-sm font-black text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                >
                  <Target className="w-5 h-5 text-blue-500" /> LIVE SCOREBOARD
                </button>

                {user.role === 'admin' && (
                  <button 
                    onClick={() => { setIsAdminView(true); setIsProfileView(false); setIsScoreboardView(false); setActiveTurfId(null); }}
                    className="w-full flex items-center gap-4 px-5 py-4 text-sm font-black text-slate-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                  >
                    <Settings className="w-5 h-5 text-amber-500" /> ADMIN DASHBOARD
                  </button>
                )}
                
                <div className="h-px bg-white/5 my-2"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-5 py-4 text-sm font-black text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all"
                >
                  <LogOut className="w-5 h-5" /> SIGN OUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {isAdminView ? (
          <AdminDashboard />
        ) : isScoreboardView ? (
          <ScoreboardManager onBack={() => setIsScoreboardView(false)} />
        ) : isProfileView ? (
          <UserProfile user={user} onBack={() => setIsProfileView(false)} />
        ) : bookingSuccess ? (
          <div className="flex flex-col items-center justify-center py-40 animate-in zoom-in duration-700">
            <div className="w-40 h-40 bg-lime-500/10 rounded-full flex items-center justify-center mb-10 border-4 border-lime-500 shadow-[0_0_50px_rgba(132,204,22,0.3)] animate-bounce">
              <CheckCircle2 className="w-24 h-24 text-lime-500" />
            </div>
            <h1 className="text-7xl font-black text-white italic uppercase tracking-tighter mb-4 drop-shadow-2xl">SLOT SECURED!</h1>
            <p className="text-slate-500 font-black tracking-[0.4em] uppercase text-sm">Prepare for kick-off • Details sent to email</p>
          </div>
        ) : activeTurf ? (
          <TurfDetail 
            turf={activeTurf} 
            onBack={() => setActiveTurfId(null)}
            onBook={handleBook}
          />
        ) : (
          <div className="space-y-20">
            {/* Cinematic Hero */}
            <section className="relative h-[600px] rounded-[4rem] overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] brightness-50" 
                alt="Main Hero"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-center items-start px-16 md:px-24 space-y-10">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-1 bg-lime-500 rounded-full shadow-[0_0_15px_rgba(132,204,22,0.8)]"></div>
                   <span className="text-lime-500 text-sm font-black uppercase tracking-[0.6em] animate-pulse">Live Arena Network</span>
                </div>
                
                <h2 className="text-8xl md:text-[10rem] font-black text-white leading-[0.8] italic uppercase tracking-tighter">
                  LEVEL UP <br/><span className="text-transparent stroke-text">YOUR GAME.</span>
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                  <button 
                    onClick={scrollToResults}
                    className="group bg-lime-500 text-slate-950 px-14 py-6 rounded-3xl font-black hover:bg-white hover:scale-110 transition-all transform active:scale-95 italic text-2xl shadow-[0_20px_50px_-10px_rgba(132,204,22,0.4)] flex items-center gap-4"
                  >
                    EXPLORE FIELDS
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="group bg-white/5 backdrop-blur-xl border border-white/20 text-white px-14 py-6 rounded-3xl font-black hover:bg-white/10 transition-all italic text-2xl flex items-center gap-4">
                    <Play className="w-7 h-7 fill-current" />
                    LIVE VIEW
                  </button>
                </div>

                <div className="flex gap-12 pt-8">
                   <div className="space-y-1">
                      <div className="text-white text-3xl font-sport font-black italic">50+</div>
                      <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active Arenas</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-white text-3xl font-sport font-black italic">12K</div>
                      <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Players Monthly</div>
                   </div>
                   <div className="space-y-1">
                      <div className="text-white text-3xl font-sport font-black italic">24/7</div>
                      <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Global Support</div>
                   </div>
                </div>
              </div>
            </section>

            {/* Quick Filters - Inspired by BookMyShow's category bar */}
            <div className="space-y-8" id="arenas-grid">
              <div className="flex items-center justify-between px-2">
                <div className="space-y-2">
                  <h3 className="text-4xl font-sport font-black italic tracking-widest text-white uppercase flex items-center gap-4">
                    <Filter className="w-8 h-8 text-lime-500" />
                    Select Discipline
                  </h3>
                  <div className="w-20 h-1 bg-lime-500 rounded-full"></div>
                </div>
                <div className="hidden md:block text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Sorted by Popularity</div>
              </div>
              
              <div className="flex gap-5 overflow-x-auto pb-8 no-scrollbar scroll-smooth px-2">
                {['All', 'Football', 'Cricket', 'Badminton', 'Tennis', 'Pickleball'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    className={`
                      px-12 py-6 rounded-[2rem] font-black text-base whitespace-nowrap transition-all transform active:scale-95 shadow-2xl border-2 italic tracking-[0.2em]
                      ${activeFilter === cat 
                        ? 'bg-lime-500 text-slate-950 border-lime-500 shadow-lime-500/20 scale-105' 
                        : 'bg-slate-900 border-white/5 text-slate-500 hover:border-lime-500/30 hover:text-white'
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Reasoning Bar */}
            {searchTerm && !aiLoading && (
              <div className="bg-lime-500/10 border-2 border-lime-500/20 p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 animate-in slide-in-from-left-8 duration-700 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 blur-[80px] -z-10 group-hover:bg-lime-500/10 transition-colors"></div>
                <div className="p-6 bg-lime-500 rounded-[2rem] text-slate-950 shadow-2xl shrink-0 group-hover:rotate-12 transition-transform">
                  <Zap className="w-10 h-10 fill-current" />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-3xl font-sport font-black italic text-lime-500 uppercase tracking-widest leading-none">Elite Scouting Analysis</h4>
                  <p className="text-slate-400 font-bold tracking-[0.1em] text-lg uppercase italic">Targeting: "{searchTerm}" • Matching your playstyle with elite venues.</p>
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredTurfs.map(turf => (
                <div key={turf.id} className="relative group/card-wrapper">
                  <TurfCard 
                    turf={turf} 
                    onClick={setActiveTurfId}
                  />
                  {aiReasoning[turf.id] && (
                    <div className="absolute -top-4 left-8 right-8 bg-lime-500 text-slate-950 text-[10px] font-black py-2 px-6 rounded-full shadow-2xl z-30 uppercase italic tracking-widest border-2 border-slate-950 animate-in zoom-in">
                      Scout: {aiReasoning[turf.id]}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredTurfs.length === 0 && (
              <div className="text-center py-48 bg-slate-900/30 border-4 border-dashed border-white/5 rounded-[4rem]">
                <Trophy className="w-32 h-32 text-slate-800 mx-auto mb-10 opacity-50" />
                <p className="text-slate-500 font-black uppercase text-3xl tracking-[0.3em] italic mb-10">No Arenas in this Sector</p>
                <button 
                  onClick={() => handleFilter('All')}
                  className="bg-white text-slate-950 px-16 py-6 rounded-3xl font-black italic uppercase tracking-widest hover:bg-lime-500 transition-all text-xl"
                >
                  RESCAN ALL SECTORS
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer / Contact */}
      {!activeTurfId && !isAdminView && !isScoreboardView && !isProfileView && (
        <footer className="mt-20 py-20 bg-slate-950 border-t border-white/5 text-center space-y-8">
           <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-0.5 bg-lime-500/30"></div>
              <Trophy className="w-10 h-10 text-lime-500" />
              <div className="w-12 h-0.5 bg-lime-500/30"></div>
           </div>
           <h5 className="text-4xl font-sport font-black italic text-white tracking-widest uppercase">The Arena Network</h5>
           <p className="text-slate-600 font-bold uppercase tracking-[0.5em] text-xs">Built for Athletes • Powered by Data</p>
           <div className="flex justify-center gap-10 pt-10">
              {['Instagram', 'Twitter', 'Facebook', 'LinkedIn'].map(s => (
                <span key={s} className="text-slate-500 hover:text-white transition-colors cursor-pointer font-black uppercase text-[10px] tracking-widest italic">{s}</span>
              ))}
           </div>
           <div className="pt-20 text-[10px] font-black text-slate-800 uppercase tracking-widest">© 2024 BookMyTurf Elite. No compromise.</div>
        </footer>
      )}

      {/* Styles */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;
