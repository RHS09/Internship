
import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl font-bold mb-16">Technical Arsenal</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="p-6 glass rounded-2xl group hover:-translate-y-2 transition-all duration-300 border border-white/5">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all">
                <i className={`${skill.icon} text-3xl`}></i>
              </div>
              <h4 className="font-bold text-lg mb-1">{skill.name}</h4>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-1000 group-hover:opacity-100" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">{skill.level}% Proficiency</p>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-20 max-w-2xl mx-auto p-8 glass rounded-3xl border border-white/5">
            <h3 className="font-heading text-2xl font-bold mb-6">Languages Spoken</h3>
            <div className="flex justify-around gap-8">
                {['English', 'Hindi', 'Gujarati'].map(lang => (
                    <div key={lang} className="text-center">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 mx-auto mb-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="font-bold text-slate-300">{lang}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
