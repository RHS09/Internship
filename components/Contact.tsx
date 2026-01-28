
import React, { useState } from 'react';
import { askHetAI } from '../services/geminiService';

const Contact: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    const res = await askHetAI(question);
    setAiResponse(res);
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/80">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Direct Contact */}
          <div>
            <h2 className="font-heading text-4xl font-bold mb-8">Get In Touch</h2>
            <p className="text-slate-400 mb-12 text-lg">
              Whether you're looking for a dedicated Data Analyst, a Python enthusiast, 
              or just want to talk about the latest cricket match, my inbox is always open.
            </p>

            <div className="space-y-6">
              <a href="mailto:hetramoliya1@gmail.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all shadow-lg">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Email Me</p>
                  <p className="text-lg font-semibold">hetramoliya1@gmail.com</p>
                </div>
              </a>

              <a href="tel:+917574958833" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl group-hover:bg-blue-500 group-hover:text-slate-950 transition-all shadow-lg">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Call Me</p>
                  <p className="text-lg font-semibold">+91 7574958833</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-xl shadow-lg">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Location</p>
                  <p className="text-lg font-semibold">Vadodara, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
                {['linkedin', 'github', 'twitter', 'instagram'].map(platform => (
                    <a key={platform} href="#" className="w-12 h-12 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all">
                        <i className={`fa-brands fa-${platform} text-xl`}></i>
                    </a>
                ))}
            </div>
          </div>

          {/* AI Feature */}
          <div className="p-8 glass rounded-3xl border border-white/10 flex flex-col h-full relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
             
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    <i className="fa-solid fa-robot"></i>
                </div>
                <h3 className="font-heading text-xl font-bold">Ask "Het AI"</h3>
            </div>

            <p className="text-sm text-slate-400 mb-6 italic">
              "Hi! I'm an AI twin of Het. Ask me about his favorite treks, his tech stack, or his thoughts on the latest electric cars!"
            </p>

            <form onSubmit={handleAskAI} className="space-y-4">
              <input 
                type="text" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="How many mountains has Het climbed?" 
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                {loading ? 'Consulting the Oracle...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-8 flex-grow">
              {aiResponse && (
                <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <p className="text-sm text-emerald-400 font-bold mb-1 uppercase tracking-widest text-[10px]">Het's Digital Twin says:</p>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {aiResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
