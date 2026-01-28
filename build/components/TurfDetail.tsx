
import React, { useState, useMemo, useEffect } from 'react';
import { Turf, TimeSlot } from '../types';
import { ArrowLeft, Clock, ShieldCheck, Zap, CalendarDays, MapPin, Trophy, Lock, Star, ChevronRight, Activity, MousePointer2, Settings2 } from 'lucide-react';
import { calculateSlotPrice, formatPrice, getHourLabel, calculateRangePrice, formatTimeDisplay } from '../utils/priceHelper';

interface TurfDetailProps {
  turf: Turf;
  onBack: () => void;
  onBook: (slot: number | string, price: number) => void;
}

const TurfDetail: React.FC<TurfDetailProps> = ({ turf, onBack, onBook }) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customStartTime, setCustomStartTime] = useState('18:00');
  const [customEndTime, setCustomEndTime] = useState('19:30');
  const [customPrice, setCustomPrice] = useState(0);

  const slots: TimeSlot[] = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      isBooked: [19, 20, 10, 11, 21].includes(i),
      price: calculateSlotPrice(turf.basePrice, i)
    }));
  }, [turf.basePrice]);

  useEffect(() => {
    if (isCustomMode) {
      const price = calculateRangePrice(turf.basePrice, customStartTime, customEndTime);
      setCustomPrice(price);
    }
  }, [isCustomMode, customStartTime, customEndTime, turf.basePrice]);

  const selectedSlotData = selectedSlot !== null ? slots.find(s => s.hour === selectedSlot) : null;

  const handleBookingClick = () => {
    if (isCustomMode) {
      if (customPrice > 0) {
        onBook(`${customStartTime} - ${customEndTime}`, customPrice);
      }
    } else if (selectedSlotData) {
      onBook(selectedSlotData.hour, selectedSlotData.price);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-12 duration-700">
      {/* Banner & Header */}
      <div className="relative h-[50vh] min-h-[400px] rounded-[3rem] overflow-hidden mb-12 border border-white/5 shadow-2xl">
        <img src={turf.image} alt={turf.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 bg-slate-950/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 text-white hover:bg-lime-500 hover:text-slate-950 transition-all font-black uppercase text-xs tracking-widest italic"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
            Back to Hub
          </button>
          <div className="flex gap-2">
            <div className="bg-lime-500 text-slate-950 px-4 py-2 rounded-2xl font-black text-xs uppercase italic tracking-widest shadow-2xl">
               FEATURED ARENA
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-lime-400 text-xs font-black uppercase tracking-widest">
                <Star className="w-4 h-4 fill-current" />
                {turf.rating} Rating
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="text-slate-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lime-500" />
                {turf.location}
              </div>
            </div>
            <h1 className="text-7xl md:text-9xl font-sport font-black text-white italic uppercase leading-[0.85] tracking-tighter drop-shadow-2xl">
              {turf.name}
            </h1>
          </div>
          
          <div className="flex gap-4">
             {turf.sports.map(sport => (
               <div key={sport} className="bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-4 rounded-[1.5rem] flex flex-col items-center gap-2">
                  <Activity className="w-6 h-6 text-lime-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">{sport}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Section: Booking Grid */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex bg-slate-900 p-2 rounded-[2.5rem] border border-white/5">
            <button 
              onClick={() => setIsCustomMode(false)}
              className={`flex-1 py-4 rounded-3xl font-black uppercase italic tracking-widest transition-all ${!isCustomMode ? 'bg-lime-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              Fixed Hours
            </button>
            <button 
              onClick={() => setIsCustomMode(true)}
              className={`flex-1 py-4 rounded-3xl font-black uppercase italic tracking-widest transition-all ${isCustomMode ? 'bg-lime-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              Custom Session
            </button>
          </div>

          <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-xl">
            {!isCustomMode ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-sport font-black text-white italic uppercase tracking-wider flex items-center gap-3">
                      <CalendarDays className="w-8 h-8 text-lime-500" />
                      Standard Slots
                    </h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest ml-11">Pick your kick-off hour</p>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <div className="w-3 h-3 rounded bg-slate-800"></div> Free
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-lime-500">
                      <div className="w-3 h-3 rounded bg-lime-500"></div> Picked
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {slots.map((slot) => {
                    const isSelected = selectedSlot === slot.hour;
                    const isNight = slot.hour >= 18 || slot.hour < 5;
                    
                    return (
                      <button
                        key={slot.hour}
                        disabled={slot.isBooked}
                        onClick={() => setSelectedSlot(slot.hour)}
                        className={`
                          relative p-6 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all duration-300
                          ${slot.isBooked 
                            ? 'bg-red-500/5 text-slate-700 cursor-not-allowed border border-red-500/10' 
                            : isSelected
                              ? 'bg-lime-500 text-slate-950 shadow-[0_15px_30px_-10px_rgba(132,204,22,0.4)] scale-110 z-10'
                              : 'bg-white/5 border border-white/10 hover:border-lime-500 hover:scale-105 text-white'
                          }
                        `}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                          {slot.hour >= 12 ? 'PM' : 'AM'}
                        </span>
                        <span className="text-2xl font-sport font-black italic leading-none">
                          {slot.hour % 12 || 12}
                        </span>
                        
                        {!slot.isBooked && (
                          <span className={`text-[10px] font-black tracking-tighter ${isSelected ? 'text-slate-900' : 'text-lime-500/80'}`}>
                            {formatPrice(slot.price)}
                          </span>
                        )}

                        {slot.isBooked && (
                          <Lock className="w-4 h-4 text-red-500/20" />
                        )}

                        {isNight && !slot.isBooked && !isSelected && (
                          <div className="absolute top-2 right-2">
                            <Zap className="w-3 h-3 text-amber-500 fill-current" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="space-y-12 py-4">
                <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                  <Settings2 className="w-10 h-10 text-lime-500" />
                  <div>
                    <h2 className="text-4xl font-sport font-black text-white italic uppercase tracking-widest leading-none">Configure Session</h2>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-2">Exact start and finish timing</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-lime-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Start Match
                      </label>
                      <input 
                        type="time" 
                        value={customStartTime}
                        onChange={(e) => setCustomStartTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 text-4xl font-sport font-black text-white focus:ring-2 focus:ring-lime-500 transition-all uppercase outline-none"
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Finish Match
                      </label>
                      <input 
                        type="time" 
                        value={customEndTime}
                        onChange={(e) => setCustomEndTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 text-4xl font-sport font-black text-white focus:ring-2 focus:ring-lime-500 transition-all uppercase outline-none"
                      />
                   </div>
                </div>

                <div className="bg-lime-500/10 border-2 border-lime-500/20 rounded-[2.5rem] p-8 flex items-center gap-6">
                   <div className="w-16 h-16 bg-lime-500 rounded-2xl flex items-center justify-center text-slate-950 shrink-0 shadow-2xl">
                      <MousePointer2 className="w-8 h-8" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-lime-500 text-[10px] font-black uppercase tracking-widest">Player Tip</p>
                      <p className="text-white text-sm font-bold italic leading-tight">
                        Custom sessions allow non-hourly bookings. Night surges (1.3x) apply automatically between 6 PM and 5 AM.
                      </p>
                   </div>
                </div>
              </div>
            )}
            
            <div className="pt-10 border-t border-white/5">
               <h3 className="text-xl font-sport font-black text-white italic uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                 <ShieldCheck className="w-6 h-6 text-lime-500" />
                 Arena Amenities
               </h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {turf.amenities.map(amenity => (
                    <div key={amenity} className="bg-slate-950/50 p-5 rounded-[1.5rem] border border-white/5 flex flex-col items-center gap-3 text-center">
                       <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lime-500">
                          <Trophy className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 leading-tight">{amenity}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Right Section: Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-slate-900 border-2 border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl">
              <div className="bg-lime-500 p-8 flex flex-col items-center text-slate-950">
                 <h2 className="text-2xl font-sport font-black italic uppercase tracking-[0.3em]">Session Ticket</h2>
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Digital Match Authorization</p>
              </div>
              
              <div className="p-10 space-y-8">
                {(!isCustomMode && selectedSlotData) || (isCustomMode && customPrice > 0) ? (
                  <>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Window</span>
                        <span className="text-lg font-sport font-black text-white italic">
                          {isCustomMode 
                            ? `${formatTimeDisplay(customStartTime)} - ${formatTimeDisplay(customEndTime)}`
                            : getHourLabel(selectedSlotData!.hour)
                          }
                        </span>
                      </div>
                      
                      {((isCustomMode && (customStartTime >= '18:00' || customEndTime >= '18:00')) || (!isCustomMode && (selectedSlotData!.hour >= 18 || selectedSlotData!.hour < 5))) ? (
                        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex justify-between items-center text-amber-500">
                          <div className="flex items-center gap-2 italic text-[10px] font-black uppercase tracking-widest">
                            <Zap className="w-4 h-4 fill-current" />
                            Active Surge
                          </div>
                          <span className="font-sport font-black text-lg">PROPORTIONAL</span>
                        </div>
                      ) : null}

                      <div className="py-10 flex flex-col items-center border-y border-white/5">
                         <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Final Amount</span>
                         <span className="text-7xl font-sport font-black text-white italic leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                           {formatPrice(isCustomMode ? customPrice : selectedSlotData!.price)}
                         </span>
                      </div>
                    </div>

                    <button 
                      onClick={handleBookingClick}
                      className="group w-full bg-lime-500 text-slate-950 py-6 rounded-[2rem] font-black uppercase text-xl tracking-[0.2em] italic flex items-center justify-center gap-3 transition-all transform hover:bg-white hover:scale-105 active:scale-95 shadow-2xl shadow-lime-500/20"
                    >
                      SECURE MATCH
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                ) : (
                  <div className="py-24 text-center space-y-6 opacity-30">
                    <Clock className="w-20 h-20 text-slate-700 mx-auto animate-pulse" />
                    <p className="text-slate-400 font-black uppercase text-xs tracking-[0.3em] italic">
                      {isCustomMode ? 'Adjust start and end times' : 'Select your kick-off hour'}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-slate-950 p-6 flex items-center justify-between border-t border-dashed border-white/10">
                 <div className="text-[9px] font-mono text-slate-600 font-bold tracking-widest">BMT-SES-{Math.random().toString(36).substring(7).toUpperCase()}</div>
                 <div className="flex gap-1.5 opacity-20">
                   {[1,2,3,4,5,6].map(i => <div key={i} className="w-1 h-4 bg-white"></div>)}
                 </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 flex items-center gap-6">
               <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                  <ShieldCheck className="w-8 h-8" />
               </div>
               <div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Elite Protection</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">Verified facility. No double-bookings guaranteed.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfDetail;
