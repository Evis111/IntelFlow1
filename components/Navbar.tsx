import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-midnight/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => scrollToSection('hero')}>
          Intel<span className="text-accent">Flow</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Кто мы</button>
          <button onClick={() => scrollToSection('benefits')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Преимущества</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Кейсы</button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-midnight transition-all text-sm font-medium"
          >
            Начать проект
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-midnight/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col p-6 space-y-4 shadow-2xl">
           <button onClick={() => scrollToSection('about')} className="text-left text-slate-300 hover:text-white py-2">Кто мы</button>
          <button onClick={() => scrollToSection('benefits')} className="text-left text-slate-300 hover:text-white py-2">Преимущества</button>
          <button onClick={() => scrollToSection('testimonials')} className="text-left text-slate-300 hover:text-white py-2">Кейсы</button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="w-full py-3 mt-2 rounded-lg bg-accent text-midnight font-semibold"
          >
            Начать проект
          </button>
        </div>
      )}
    </nav>
  );
};