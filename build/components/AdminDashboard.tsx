
import React from 'react';
import { LayoutDashboard, Users, CreditCard, Activity, TrendingUp, Calendar, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { TURFS } from '../data/mockData';
import { formatPrice } from '../utils/priceHelper';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: '₹4.2L', icon: CreditCard, trend: '+12.5%', color: 'text-lime-500' },
    { label: 'Active Bookings', value: '128', icon: Calendar, trend: '+5.2%', color: 'text-blue-500' },
    { label: 'Players Reached', value: '1.2K', icon: Users, trend: '+18.1%', color: 'text-purple-500' },
    { label: 'Occupancy Rate', value: '84%', icon: Activity, trend: '+2.4%', color: 'text-orange-500' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-lime-500 mb-2">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-[0.3em] italic">Arena Manager Control</span>
          </div>
          <h1 className="text-5xl font-sport font-black text-white italic uppercase leading-none tracking-tight">
            War Room Dashboard
          </h1>
        </div>
        <button className="bg-lime-500 text-slate-950 px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest shadow-xl shadow-lime-500/20 hover:scale-105 transition-all flex items-center gap-3">
          <Plus className="w-5 h-5" />
          Add New Field
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-black italic">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-sport font-black text-white italic">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Managed Turfs Table */}
      <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-sport font-extrabold text-white italic uppercase tracking-wider">Managed Fields</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Export Report</button>
            <button className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Filters</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Field Details</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Sports</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Base Price</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Rating</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {TURFS.map(turf => (
                <tr key={turf.id} className="group hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800">
                        <img src={turf.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-white font-black uppercase italic tracking-wider">{turf.name}</div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{turf.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-1.5">
                      {turf.sports.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[8px] font-black uppercase text-slate-400 tracking-tighter">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-white font-sport font-black text-lg">{formatPrice(turf.basePrice)}</div>
                    <div className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">Per Hour</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5 text-lime-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-sport text-lg font-black">{turf.rating}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                      <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-lime-500 transition-all"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
