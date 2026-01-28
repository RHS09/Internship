
import React from 'react';
import { User, History, Calendar, MapPin, Clock, Trophy, ChevronRight, UserCircle, Mail } from 'lucide-react';
import { User as UserType } from '../types';
import { MOCK_BOOKINGS, TURFS } from '../data/mockData';
import { formatPrice, getHourLabel } from '../utils/priceHelper';

interface UserProfileProps {
  user: UserType;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12">
      {/* Profile Header Card */}
      <div className="relative glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-lime-500/20 via-blue-500/10 to-transparent"></div>
        <div className="relative p-8 flex flex-col md:flex-row items-center gap-8 pt-16">
          <div className="w-32 h-32 rounded-[2rem] bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-lime-500 shadow-2xl">
            <UserCircle className="w-20 h-20" />
          </div>
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl font-sport font-black text-white italic uppercase tracking-widest">{user.name}</h1>
              <span className="px-3 py-1 bg-lime-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full">Elite Athlete</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 text-slate-400 font-bold text-sm tracking-widest">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime-500" />
                {user.email}
              </div>
              <div className="hidden md:block w-px h-4 bg-white/10"></div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-lime-500" />
                12 Matches Played
              </div>
            </div>
          </div>
          <div className="md:ml-auto">
            <button 
              onClick={onBack}
              className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10 transition-all"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      </div>

      {/* Booking History Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-sport font-black text-white italic uppercase tracking-widest flex items-center gap-3">
            <History className="w-6 h-6 text-lime-500" />
            Booking History
          </h2>
          <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Showing last 3 months</div>
        </div>

        <div className="grid gap-4">
          {MOCK_BOOKINGS.map((booking) => {
            const turf = TURFS.find(t => t.id === booking.turfId);
            return (
              <div 
                key={booking.id}
                className="group relative glass-dark rounded-[1.5rem] border border-white/5 hover:border-lime-500/30 transition-all p-6 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 shrink-0">
                    <img src={turf?.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lime-500 text-[10px] font-black uppercase tracking-widest">{booking.id}</div>
                    <h3 className="text-xl font-sport font-black text-white italic uppercase tracking-wider">{turf?.name}</h3>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      {turf?.location}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <div className="space-y-1">
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Date & Time</div>
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Calendar className="w-4 h-4 text-lime-500" />
                      {booking.date} @ {getHourLabel(booking.slot)}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Amount Paid</div>
                    <div className="text-white font-sport font-black text-xl leading-none">
                      {formatPrice(booking.totalPrice)}
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center gap-2">
                    <span className="px-3 py-1 bg-lime-500/10 border border-lime-500/20 text-lime-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                      Confirmed
                    </span>
                  </div>

                  <button className="md:ml-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
