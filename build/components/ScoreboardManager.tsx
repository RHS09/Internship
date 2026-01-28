
import React, { useState, useEffect } from 'react';
// Added MapPin to imports to fix line 243 error
import { Trophy, Plus, History, Swords, Trash2, Calendar, Target, Activity, ArrowLeft, Zap, RotateCcw, Save, Trash, Shield, Timer, FileText, Share2, Download, X, MapPin } from 'lucide-react';
import { ScoreRecord, SportType } from '../types';
import { MOCK_SCORES } from '../data/mockData';

interface ScoreboardManagerProps {
  onBack: () => void;
}

const ScoreboardManager: React.FC<ScoreboardManagerProps> = ({ onBack }) => {
  const [scores, setScores] = useState<ScoreRecord[]>(MOCK_SCORES);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [viewingReport, setViewingReport] = useState<ScoreRecord | null>(null);
  const [activeSport, setActiveSport] = useState<SportType>(SportType.CRICKET);
  
  // Live Match State
  const [matchData, setMatchData] = useState({
    teamA: 'Challengers',
    teamB: 'Titans',
    scoreA: 0,
    scoreB: 0,
    wicketsA: 0,
    wicketsB: 0,
    ballsA: 0,
    ballsB: 0,
    currentInnings: 'A' as 'A' | 'B',
    foulsA: 0,
    foulsB: 0,
  });

  const [historyStack, setHistoryStack] = useState<any[]>([]);

  const formatOvers = (balls: number) => {
    const overs = Math.floor(balls / 6);
    const remainingBalls = balls % 6;
    return `${overs}.${remainingBalls}`;
  };

  const updateScore = (type: string, value: number = 1, team?: 'A' | 'B') => {
    setHistoryStack([...historyStack, { ...matchData }]);
    
    setMatchData(prev => {
      const activeTeam = team || prev.currentInnings;
      const isTeamA = activeTeam === 'A';
      const updated = { ...prev };

      if (activeSport === SportType.CRICKET) {
        if (type === 'run') {
          if (isTeamA) {
            updated.scoreA += value;
            updated.ballsA += 1;
          } else {
            updated.scoreB += value;
            updated.ballsB += 1;
          }
        } else if (type === 'wicket') {
          if (isTeamA) {
            updated.wicketsA += 1;
            updated.ballsA += 1;
          } else {
            updated.wicketsB += 1;
            updated.ballsB += 1;
          }
        } else if (type === 'extra') {
          if (isTeamA) updated.scoreA += value;
          else updated.scoreB += value;
        }
      } else if (activeSport === SportType.FOOTBALL) {
        if (type === 'goal') {
          if (isTeamA) updated.scoreA += 1;
          else updated.scoreB += 1;
        } else if (type === 'foul') {
          if (isTeamA) updated.foulsA += 1;
          else updated.foulsB += 1;
        }
      } else {
        // Racket Sports (Badminton, Tennis, Pickleball)
        if (type === 'point') {
          if (isTeamA) updated.scoreA += 1;
          else updated.scoreB += 1;
        }
      }

      return updated;
    });
  };

  const undoLastAction = () => {
    if (historyStack.length > 0) {
      const lastState = historyStack[historyStack.length - 1];
      setMatchData(lastState);
      setHistoryStack(historyStack.slice(0, -1));
    }
  };

  const saveLiveMatch = () => {
    const record: ScoreRecord = {
      id: `S-${Date.now()}`,
      teamA: matchData.teamA,
      teamB: matchData.teamB,
      scoreA: matchData.scoreA,
      scoreB: matchData.scoreB,
      wicketsA: activeSport === SportType.CRICKET ? matchData.wicketsA : undefined,
      wicketsB: activeSport === SportType.CRICKET ? matchData.wicketsB : undefined,
      ballsA: activeSport === SportType.CRICKET ? matchData.ballsA : undefined,
      ballsB: activeSport === SportType.CRICKET ? matchData.ballsB : undefined,
      turfName: 'Live Arena',
      sport: activeSport,
      date: new Date().toISOString().split('T')[0],
      notes: activeSport === SportType.FOOTBALL ? `Fouls: ${matchData.foulsA} - ${matchData.foulsB}` : undefined
    };
    setScores([record, ...scores]);
    setIsLiveMode(false);
    // Automatically open report for the newly saved match
    setViewingReport(record);
  };

  const renderActionPad = () => {
    if (activeSport === SportType.CRICKET) {
      return (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {[0, 1, 2, 3, 4, 6].map(run => (
            <button key={run} onClick={() => updateScore('run', run)}
              className="aspect-square glass-dark border border-white/5 rounded-3xl flex items-center justify-center text-4xl font-sport font-black text-white hover:bg-lime-500 hover:text-slate-950 hover:scale-105 active:scale-95 transition-all shadow-xl">
              {run}
            </button>
          ))}
          <button onClick={() => updateScore('wicket')}
            className="aspect-square bg-red-500/10 border border-red-500/20 rounded-3xl flex flex-col items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl">
            <Target className="w-8 h-8 mb-1" />
            <span className="text-[10px] font-black uppercase tracking-widest">WICKET</span>
          </button>
          <button onClick={() => updateScore('extra', 1)}
            className="aspect-square bg-amber-500/10 border border-amber-500/20 rounded-3xl flex flex-col items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all shadow-xl">
            <div className="text-2xl font-black">WD</div>
            <span className="text-[10px] font-black uppercase tracking-widest">WIDE</span>
          </button>
          <button onClick={() => updateScore('extra', 1)}
            className="aspect-square bg-amber-500/10 border border-amber-500/20 rounded-3xl flex flex-col items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all shadow-xl">
            <div className="text-2xl font-black">NB</div>
            <span className="text-[10px] font-black uppercase tracking-widest">NO BALL</span>
          </button>
        </div>
      );
    } else if (activeSport === SportType.FOOTBALL) {
      return (
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">TEAM A Actions</p>
            <button onClick={() => updateScore('goal', 1, 'A')} className="w-full aspect-video bg-lime-500 text-slate-950 rounded-[2rem] flex flex-col items-center justify-center gap-2 font-black shadow-xl shadow-lime-500/20 hover:scale-105 transition-all">
              <Zap className="w-8 h-8 fill-current" />
              GOAL!
            </button>
            <button onClick={() => updateScore('foul', 1, 'A')} className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
              YELLOW/RED CARD
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">TEAM B Actions</p>
            <button onClick={() => updateScore('goal', 1, 'B')} className="w-full aspect-video bg-blue-500 text-white rounded-[2rem] flex flex-col items-center justify-center gap-2 font-black shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
              <Zap className="w-8 h-8 fill-current" />
              GOAL!
            </button>
            <button onClick={() => updateScore('foul', 1, 'B')} className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
              YELLOW/RED CARD
            </button>
          </div>
        </div>
      );
    } else {
      // Racket Sports
      return (
        <div className="grid grid-cols-2 gap-8 h-full">
          <button onClick={() => updateScore('point', 1, 'A')} className="w-full h-full glass-dark border border-white/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 hover:bg-lime-500 hover:text-slate-950 hover:scale-105 transition-all group">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-slate-900">Add Point</div>
            <Plus className="w-12 h-12" />
            <div className="text-xl font-sport font-black italic">{matchData.teamA}</div>
          </button>
          <button onClick={() => updateScore('point', 1, 'B')} className="w-full h-full glass-dark border border-white/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 hover:bg-lime-500 hover:text-slate-950 hover:scale-105 transition-all group">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-slate-900">Add Point</div>
            <Plus className="w-12 h-12" />
            <div className="text-xl font-sport font-black italic">{matchData.teamB}</div>
          </button>
        </div>
      );
    }
  };

  const MatchReport = ({ record }: { record: ScoreRecord }) => {
    const isWinnerA = record.scoreA > record.scoreB;
    const isWinnerB = record.scoreB > record.scoreA;
    const isDraw = record.scoreA === record.scoreB;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
        <div className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] animate-in zoom-in slide-in-from-bottom-8 duration-500">
          {/* Report Header */}
          <div className="bg-lime-500 p-8 flex items-center justify-between text-slate-950">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-lime-500 rotate-6 shadow-2xl">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-sport font-black italic uppercase tracking-widest leading-none">Official Match Report</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70">ID: {record.id}</p>
              </div>
            </div>
            <button 
              onClick={() => setViewingReport(null)}
              className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-12 space-y-10 overflow-y-auto max-h-[70vh] no-scrollbar">
            {/* Victory Banner */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-lime-500 font-black italic uppercase tracking-[0.4em] text-xs">
                <Trophy className="w-4 h-4" />
                {isDraw ? 'Match Drawn' : (isWinnerA ? `${record.teamA} VICTORIOUS` : `${record.teamB} VICTORIOUS`)}
              </div>
              <h3 className="text-xl font-black text-slate-500 uppercase tracking-[0.3em] italic">{record.sport} Arena Session</h3>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className={`p-8 rounded-[2.5rem] border transition-all ${isWinnerA ? 'bg-lime-500/10 border-lime-500/40' : 'bg-white/5 border-white/10'}`}>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Home Squad</p>
                <h4 className="text-3xl font-sport font-black text-white italic uppercase truncate mb-2">{record.teamA}</h4>
                <div className="text-7xl font-sport font-black text-white italic tabular-nums leading-none">
                  {record.scoreA}
                  {record.wicketsA !== undefined && <span className="text-2xl text-slate-600">/{record.wicketsA}</span>}
                </div>
                {record.ballsA !== undefined && <p className="text-[10px] font-black text-lime-500 mt-2">({formatOvers(record.ballsA)} Overs)</p>}
              </div>

              <div className="text-center">
                 <div className="text-5xl font-sport font-black text-slate-800 italic">VS</div>
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">{record.date}</p>
                 <div className="mt-4 flex flex-col items-center gap-1">
                   <MapPin className="w-4 h-4 text-lime-500" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{record.turfName}</span>
                 </div>
              </div>

              <div className={`p-8 rounded-[2.5rem] border transition-all ${isWinnerB ? 'bg-lime-500/10 border-lime-500/40' : 'bg-white/5 border-white/10'}`}>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Away Squad</p>
                <h4 className="text-3xl font-sport font-black text-white italic uppercase truncate mb-2">{record.teamB}</h4>
                <div className="text-7xl font-sport font-black text-white italic tabular-nums leading-none">
                  {record.scoreB}
                  {record.wicketsB !== undefined && <span className="text-2xl text-slate-600">/{record.wicketsB}</span>}
                </div>
                {record.ballsB !== undefined && <p className="text-[10px] font-black text-lime-500 mt-2">({formatOvers(record.ballsB)} Overs)</p>}
              </div>
            </div>

            {/* Performance Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-slate-950/50 p-8 rounded-[2.5rem] border border-white/5">
                  <h5 className="text-[10px] font-black text-lime-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> STATISTICAL BREAKDOWN
                  </h5>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-xs font-bold text-slate-500 uppercase">Match Discipline</span>
                      <span className="text-xs font-black text-white uppercase">{record.sport}</span>
                    </div>
                    {record.sport === SportType.CRICKET && (
                      <>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                          <span className="text-xs font-bold text-slate-500 uppercase">Combined Runs</span>
                          <span className="text-xs font-black text-white">{record.scoreA + record.scoreB}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                          <span className="text-xs font-bold text-slate-500 uppercase">Total Wickets</span>
                          <span className="text-xs font-black text-white">{(record.wicketsA || 0) + (record.wicketsB || 0)}</span>
                        </div>
                      </>
                    )}
                    {record.notes && (
                       <div className="pt-4">
                          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Match Officials Notes</p>
                          <p className="text-sm font-bold italic text-slate-400">"{record.notes}"</p>
                       </div>
                    )}
                  </div>
               </div>

               <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center items-center text-center space-y-4">
                  <Shield className="w-12 h-12 text-lime-500" />
                  <h5 className="text-xl font-sport font-black italic text-white uppercase tracking-widest">Athlete Certification</h5>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed italic px-4">
                    This match record has been verified by BookMyTurf Jumbotron. All statistics are official and logged for player progression.
                  </p>
               </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
               <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-6 rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all">
                  <Download className="w-4 h-4" /> Download PDF
               </button>
               <button className="flex-1 bg-lime-500 text-slate-950 py-6 rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:scale-105 shadow-xl shadow-lime-500/20">
                  <Share2 className="w-4 h-4" /> Share Glory
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pb-24">
      {viewingReport && <MatchReport record={viewingReport} />}
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <button onClick={onBack} className="group mb-4 flex items-center gap-2 text-slate-400 hover:text-lime-400 transition-colors font-bold uppercase text-xs tracking-widest">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Arena Home
          </button>
          <div className="flex items-center gap-2 text-lime-500 mb-2">
            <Zap className="w-5 h-5 fill-current" />
            <span className="text-sm font-black uppercase tracking-[0.3em] italic">Athlete Match Center</span>
          </div>
          <h1 className="text-5xl font-sport font-black text-white italic uppercase leading-none tracking-tight">
            {isLiveMode ? `Live ${activeSport}` : 'Score Hub'}
          </h1>
        </div>
        
        {!isLiveMode && (
          <div className="flex gap-4">
             <button onClick={() => setIsLiveMode(true)}
              className="bg-lime-500 text-slate-950 px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest shadow-xl shadow-lime-500/20 hover:scale-105 transition-all flex items-center gap-3">
              <Activity className="w-5 h-5" />
              New Match
            </button>
          </div>
        )}
      </div>

      {isLiveMode ? (
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Settings & Status */}
          <div className="flex items-center justify-between px-6 py-4 glass-dark rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Discipline</span>
                <select 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-lime-500 focus:outline-none"
                  value={activeSport}
                  onChange={(e) => setActiveSport(e.target.value as SportType)}
                >
                  {Object.values(SportType).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <div className="flex flex-col">
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Recording</span>
                  <span className="text-white text-xs font-bold font-mono">00:42:15</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsLiveMode(false)} className="bg-white/5 p-3 rounded-xl hover:bg-red-500/20 text-slate-400 hover:text-red-500 transition-all">
              <Trash className="w-5 h-5" />
            </button>
          </div>

          {/* Specialized Score Display */}
          <div className="glass-dark border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-lime-500/[0.03] to-transparent pointer-events-none"></div>
            
            <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-xl font-sport font-black text-slate-600 italic rotate-12">VS</div>
              </div>

              {/* Team A Display */}
              <div className={`text-center space-y-6 transition-all duration-500 ${matchData.currentInnings === 'A' || activeSport !== SportType.CRICKET ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}>
                <div className="space-y-2">
                  <span className="text-lime-500 text-[10px] font-black uppercase tracking-[0.4em]">HOME SQUAD</span>
                  <input className="bg-transparent text-center text-3xl font-sport font-black text-white uppercase tracking-widest border-none focus:outline-none w-full italic" value={matchData.teamA} onChange={(e) => setMatchData({...matchData, teamA: e.target.value})} />
                </div>
                
                <div className="relative inline-block">
                  <div className="text-9xl font-sport font-black text-white italic leading-none tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {matchData.scoreA}
                    {activeSport === SportType.CRICKET && <span className="text-4xl text-slate-600 ml-2">/{matchData.wicketsA}</span>}
                  </div>
                  {activeSport === SportType.FOOTBALL && matchData.foulsA > 0 && (
                     <div className="absolute -top-4 -right-12 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-500 text-[10px] font-black">
                        {matchData.foulsA} FOULS
                     </div>
                  )}
                </div>

                {activeSport === SportType.CRICKET && (
                  <div className="text-sm font-black text-slate-500 tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                    <Timer className="w-4 h-4 text-lime-500" />
                    Overs: {formatOvers(matchData.ballsA)}
                  </div>
                )}

                {activeSport === SportType.CRICKET && (
                  <button onClick={() => setMatchData({...matchData, currentInnings: 'A'})} className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${matchData.currentInnings === 'A' ? 'bg-lime-500 text-slate-950 shadow-lg shadow-lime-500/20' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
                    Active Innings
                  </button>
                )}
              </div>

              {/* Team B Display */}
              <div className={`text-center space-y-6 transition-all duration-500 ${matchData.currentInnings === 'B' || activeSport !== SportType.CRICKET ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}>
                <div className="space-y-2">
                  <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">AWAY SQUAD</span>
                  <input className="bg-transparent text-center text-3xl font-sport font-black text-white uppercase tracking-widest border-none focus:outline-none w-full italic" value={matchData.teamB} onChange={(e) => setMatchData({...matchData, teamB: e.target.value})} />
                </div>
                
                <div className="relative inline-block">
                  <div className="text-9xl font-sport font-black text-white italic leading-none tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    {matchData.scoreB}
                    {activeSport === SportType.CRICKET && <span className="text-4xl text-slate-600 ml-2">/{matchData.wicketsB}</span>}
                  </div>
                  {activeSport === SportType.FOOTBALL && matchData.foulsB > 0 && (
                     <div className="absolute -top-4 -right-12 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-500 text-[10px] font-black">
                        {matchData.foulsB} FOULS
                     </div>
                  )}
                </div>

                {activeSport === SportType.CRICKET && (
                  <div className="text-sm font-black text-slate-500 tracking-[0.3em] uppercase flex items-center justify-center gap-2">
                    <Timer className="w-4 h-4 text-lime-500" />
                    Overs: {formatOvers(matchData.ballsB)}
                  </div>
                )}

                {activeSport === SportType.CRICKET && (
                  <button onClick={() => setMatchData({...matchData, currentInnings: 'B'})} className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${matchData.currentInnings === 'B' ? 'bg-lime-500 text-slate-950 shadow-lg shadow-lime-500/20' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
                    Active Innings
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Action Pad & Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            <div className="md:col-span-3">
              {renderActionPad()}
            </div>

            <div className="flex flex-col gap-4">
              <button onClick={undoLastAction} disabled={historyStack.length === 0}
                className="w-full bg-slate-900 border border-white/10 text-white py-6 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 disabled:opacity-20 transition-all shadow-xl">
                <RotateCcw className="w-5 h-5" />
                Correction
              </button>
              <button onClick={saveLiveMatch}
                className="w-full flex-1 bg-lime-500 text-slate-950 rounded-[2.5rem] font-black uppercase italic tracking-[0.2em] flex flex-col items-center justify-center gap-2 hover:bg-white transition-all shadow-2xl shadow-lime-500/20 group">
                <Save className="w-8 h-8 group-hover:scale-110 transition-transform" />
                Finish Match
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* HISTORY VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scores.map((score) => (
            <div key={score.id} className="glass-dark border border-white/5 rounded-[2.5rem] p-8 space-y-6 group hover:border-lime-500/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lime-500">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{score.sport}</span>
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">{score.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <button onClick={() => setViewingReport(score)} className="p-2 text-slate-700 hover:text-lime-500 transition-colors">
                    <FileText className="w-4 h-4" />
                  </button>
                   <button onClick={() => setScores(scores.filter(s => s.id !== score.id))} className="p-2 text-slate-700 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-[2rem] border border-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-center space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase truncate">{score.teamA}</p>
                    <p className={`text-4xl font-sport font-black italic ${score.scoreA > score.scoreB ? 'text-lime-500' : 'text-white'}`}>
                      {score.scoreA}{score.wicketsA !== undefined && <span className="text-base text-slate-700">/{score.wicketsA}</span>}
                    </p>
                  </div>
                  <div className="text-slate-800 font-sport font-black italic text-xl">VS</div>
                  <div className="flex-1 text-center space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase truncate">{score.teamB}</p>
                    <p className={`text-4xl font-sport font-black italic ${score.scoreB > score.scoreA ? 'text-lime-500' : 'text-white'}`}>
                      {score.scoreB}{score.wicketsB !== undefined && <span className="text-base text-slate-700">/{score.wicketsB}</span>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                 <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-lime-500 italic">
                    {score.scoreA === score.scoreB ? 'Drawn Series' : (score.scoreA > score.scoreB ? `${score.teamA} VICTORIOUS` : `${score.teamB} VICTORIOUS`)}
                 </div>
                 
                 <button 
                  onClick={() => setViewingReport(score)}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-lime-500 hover:text-slate-950 hover:border-lime-500 transition-all group"
                 >
                    <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    View Detailed Report
                 </button>

                 <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest pt-2">
                   <Target className="w-3.5 h-3.5 text-lime-500" />
                   {score.turfName}
                 </div>
              </div>
            </div>
          ))}

          {scores.length === 0 && (
            <div className="col-span-full py-40 text-center glass-dark rounded-[3.5rem] border border-dashed border-white/10">
               <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-700 ring-8 ring-slate-900/50">
                  <Trophy className="w-12 h-12" />
               </div>
               <p className="text-slate-400 font-black uppercase text-2xl tracking-[0.2em] italic mb-2">No Glory Recorded</p>
               <p className="text-slate-600 font-bold uppercase text-xs tracking-widest mb-8">Start a live match to track your performance</p>
               <button onClick={() => setIsLiveMode(true)}
                className="bg-white text-slate-950 px-12 py-5 rounded-[2rem] font-black uppercase italic tracking-widest hover:bg-lime-500 transition-all shadow-2xl">
                 Initiate Match
               </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreboardManager;
