
import React from 'react';
import { HOBBIES } from '../constants';

const Hobbies: React.FC = () => {
  return (
    <section id="hobbies" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-heading text-4xl font-bold mb-2">Beyond the Code</h2>
          <p className="text-slate-500">What keeps me energized and inspired.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOBBIES.map((hobby, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-3xl h-[450px] hobby-card cursor-default">
              {/* Background Image */}
              <img 
                src={hobby.imageUrl} 
                alt={hobby.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.4] group-hover:brightness-[0.6]"
              />
              
              {/* Overlay Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${hobby.color} opacity-40 group-hover:opacity-60 transition-opacity`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="hobby-icon mb-6 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl transition-transform duration-500 shadow-xl">
                  <i className={hobby.icon}></i>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{hobby.title}</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {hobby.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
