
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
