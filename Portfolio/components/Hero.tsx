
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Open to New Opportunities
        </div>
        
        <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          Crafting Insights <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-600">
            Across Landscapes
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          Data Analyst & Python DevOps professional with a heart for the mountains, 
          a mind for automation, and an eye for the next big leap in tech.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#projects" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            Explore My Work
          </a>
          <button onClick={() => window.print()} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg border border-white/10 transition-all flex items-center gap-2">
            <i className="fa-solid fa-download"></i> Download CV
          </button>
        </div>
      </div>

      {/* Floating Icons representing hobbies */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-12 text-slate-600 opacity-50 animate-bounce">
        <i className="fa-solid fa-baseball-bat-ball text-3xl"></i>
        <i className="fa-solid fa-mountain text-3xl"></i>
        <i className="fa-solid fa-car text-3xl"></i>
        <i className="fa-solid fa-terminal text-3xl"></i>
      </div>
    </section>
  );
};

export default Hero;
