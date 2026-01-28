
import React from 'react';

const Footer: React.FC = () => {
  const exportCode = () => {
    alert("To save this project: \n1. Copy the code from the chat window.\n2. Save them as 'index.html', 'index.tsx', 'App.tsx' etc.\n3. Use 'npx serve' to run.");
  };

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} Het Ramoliya. Built with Passion, Tech & Data.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-slate-600 text-sm">
            <span className="flex items-center gap-2"><i className="fa-solid fa-code text-emerald-500"></i> React & TS</span>
            <span className="flex items-center gap-2"><i className="fa-solid fa-wind text-blue-500"></i> Tailwind CSS</span>
            <button onClick={exportCode} className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <i className="fa-solid fa-file-export text-purple-500"></i> Export Guide
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
