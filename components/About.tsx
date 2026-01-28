
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-emerald-500/30 group bg-slate-800 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" 
                alt="Computer Engineering Academic Life" 
                className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Academic Badge - Updated to remove red gradient */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2">
              <i className="fa-solid fa-microchip"></i>
              BE Computer Engineering.
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-8 -right-8 p-6 glass rounded-2xl shadow-2xl hidden md:block border border-emerald-500/20 z-10">
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-emerald-400">7.7</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Current GPA</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-400">Final</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Year Eng.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-4xl font-bold mb-6 flex items-center gap-3">
              About Me
              <span className="h-1 w-12 bg-emerald-500 rounded-full"></span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              I'm a Final Year Computer Engineering student at GTU, focusing on the intersection of Data Science and DevOps. 
              My academic journey is more than just lectures; it's about solving complex algorithmic puzzles and building scalable 
              digital infrastructures.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 border-l-2 border-emerald-500/30 pl-6 italic bg-white/5 py-4 rounded-r-xl">
              Based in Vadodara, I've spent my academic years mastering Python and modern data tools, while always keeping an eye 
              on emerging tech trends—from the latest EV innovations to advanced AI deployments in manufacturing.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <i className="fa-solid fa-graduation-cap text-emerald-400 text-xl group-hover:text-inherit"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">GTU (Sigma Institute of Engineering)</h4>
                  <p className="text-sm text-slate-500">Bachelors of Engineering • 2022 - 2026</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-slate-950 transition-all">
                  <i className="fa-solid fa-laptop-code text-blue-400 text-xl group-hover:text-inherit"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Core Specialization</h4>
                  <p className="text-sm text-slate-500">Data Analytics & Automation Architecture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
