
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Hobbies', href: '#hobbies' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const offset = 90; // The height of your fixed navbar
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-slate-950/90 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => handleLinkClick(e, '#')}
          className="font-heading text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 hover:scale-105 transition-transform"
        >
          HET.RAMOLIYA
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                activeSection === link.href ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-emerald-400 transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.8)] ${activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white p-2 focus:outline-none relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
                <div className="relative">
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1'}`}></span>
                </div>
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-slate-950/98 backdrop-blur-2xl border-b border-white/5 transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 py-10' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-xl font-bold uppercase tracking-widest transition-all ${
                activeSection === link.href ? 'text-emerald-400 scale-110' : 'text-slate-300'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
