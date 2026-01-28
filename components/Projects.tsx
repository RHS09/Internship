
import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 -skew-x-12 -z-10"></div>
        
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="font-heading text-4xl font-bold mb-2">Projects & Certifications</h2>
            <p className="text-slate-500">Real-world impact through specialized training programs.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">Microsoft</span>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">Intel</span>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20">GTU</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <div key={index} className="group relative p-8 glass rounded-2xl hover:bg-white/[0.08] transition-all border border-white/10">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <i className={`fa-solid ${project.type === 'AI' ? 'fa-microchip' : 'fa-database'} text-2xl`}></i>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Issued By</p>
                  <p className="text-sm font-semibold">{project.issuedBy}</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
              <p className="text-xs text-slate-500 mb-4 font-mono">ID: {project.certificateId}</p>
              
              <p className="text-slate-400 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">{project.date}</span>
                <button className="flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300">
                  View Credential <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
