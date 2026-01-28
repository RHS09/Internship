
import React, { useState } from 'react';
import { Turf } from '../types';
import { Star, MapPin, Trophy, Zap, ChevronDown, ChevronUp, ShieldCheck, ArrowRight, Play } from 'lucide-react';
import { formatPrice } from '../utils/priceHelper';

interface TurfCardProps {
  turf: Turf;
  onClick: (id: string) => void;
}

const TurfCard: React.FC<TurfCardProps> = ({ turf, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnterArena = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(turf.id);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEnterArena}
      className="group relative bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 cursor-pointer hover:border-lime-500/50 hover:shadow-[0_20px_50px_-12px_rgba(132,204,22,0.15)] transform hover:-translate-y-2"
    >
      {/* Visual Header */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={turf.image} 
          alt={turf.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-5 left-5 flex gap-2">
          {turf.sports.slice(0, 2).map(sport => (
            <span key={sport} className="px-3 py-1 bg-lime-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl flex items-center gap-1.5">
              <Trophy className="w-3 h-3" />
              {sport}
            </span>
          ))}
        </div>

        <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
          <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black text-white border border-white/10">
            <Star className="w-3.5 h-3.5 fill-lime-500 text-lime-500" />
            {turf.rating}
          </div>
        </div>

        {/* Play Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
           <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-slate-950 shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
             <Play className="w-6 h-6 fill-current ml-1" />
           </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black text-lime-500 uppercase tracking-[0.3em] mb-1">
            <Zap className="w-3 h-3 fill-current" />
            Elite Venue
          </div>
          <h3 className="text-3xl font-sport font-black text-white tracking-tighter italic uppercase leading-none group-hover:text-lime-500 transition-colors">
            {turf.name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold uppercase tracking-widest italic">
            <MapPin className="w-3.5 h-3.5" />
            {turf.location}
          </div>
        </div>

        <p className="text-slate-400 text-xs font-medium leading-relaxed font-['Inter'] line-clamp-2 italic">
          "{turf.description}"
        </p>
        
        <div className="pt-6 border-t border-white/5 flex items-end justify-between">
          <div className="space-y-0.5">
            <div className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Pricing Model</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-sport font-black text-white">{formatPrice(turf.basePrice)}</span>
              <span className="text-slate-600 text-[10px] font-black">/ HR</span>
            </div>
          </div>
          <button 
            className="bg-white text-slate-950 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] italic transition-all hover:bg-lime-500 transform active:scale-95 shadow-xl shadow-white/5"
          >
            BOOK SLOT
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
