import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Dental Services' },
    { id: 'why-choose-us', label: 'Why Choose Us' },
    { id: 'gallery', label: 'Smile Transformations' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Banner - Utility Bar */}
      <div className="bg-slate-950 text-slate-300 py-2 px-4 text-xs font-medium border-b border-slate-900 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Mon - Fri: 8:30 AM - 4:30 PM</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-sky-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <a href="#contact" onClick={() => handleNavClick('contact')}>
                2740 3rd Ave, Bronx, NY 10455
              </a>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-500">|</span>
            <a
              href="tel:7186180162"
              className="flex items-center space-x-1.5 text-sky-400 hover:text-sky-300 font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(718) 618-0162</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100'
            : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Authentic Replicated Storefront Signage Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              {/* Custom SVG Tooth Logo modeled from input_file_0.png */}
              <div className="relative w-10 h-10 bg-slate-950 rounded-lg p-1.5 border border-slate-800 shadow-inner flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full fill-none stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Three panels background block */}
                  <rect x="5" y="5" width="28" height="90" rx="3" fill="#0ea5e9" opacity="0.15" stroke="none" />
                  <rect x="36" y="5" width="28" height="90" rx="3" fill="#ffffff" opacity="0.1" stroke="none" />
                  <rect x="67" y="5" width="28" height="90" rx="3" fill="#ffffff" opacity="0.1" stroke="none" />
                  
                  {/* Vertical dividers representing the panels on input_file_0 */}
                  <line x1="33" y1="5" x2="33" y2="95" stroke="#475569" strokeWidth="2" />
                  <line x1="66" y1="5" x2="66" y2="95" stroke="#475569" strokeWidth="2" />
                  <rect x="5" y="5" width="90" height="90" rx="6" stroke="#475569" strokeWidth="3" />

                  {/* Replicated physical tooth design */}
                  <path
                    d="M 50 15 
                       C 68 15, 82 23, 82 45 
                       C 82 60, 74 72, 71 85 
                       C 70 88, 65 88, 63 85
                       C 58 75, 54 68, 50 68
                       C 46 68, 42 75, 37 85
                       C 35 88, 30 88, 29 85
                       C 26 72, 18 60, 18 45
                       C 18 23, 32 15, 50 15 Z"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* The Cyan/Blue Accent on the Left-Crown Crown partition */}
                  <path
                    d="M 50 15
                       C 41 15, 31 18, 26 25
                       C 18 33, 18 43, 20 53
                       L 33 53
                       L 33 18
                       Z"
                    fill="#38bdf8"
                    stroke="none"
                  />
                </svg>
              </div>

              {/* Text Typography replicating physical store text */}
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1">
                  <span className="font-display font-black text-slate-900 tracking-tight text-lg md:text-xl leading-none">
                    3<span className="text-xs align-super font-bold text-sky-500">RD</span> AVE
                  </span>
                  <span className="font-display font-light text-slate-600 tracking-wider text-sm md:text-md uppercase leading-none">
                    BRONX DENTAL
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-sky-600 uppercase font-semibold">
                  Third Avenue Bronx Dental P.C.
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-sky-600 bg-sky-50'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="tel:7186180162"
                className="flex items-center space-x-2 text-slate-700 hover:text-sky-600 px-3 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4 text-sky-500" />
                <span>(718) 618-0162</span>
              </a>
              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-100 hover:shadow-sky-200 px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-sky-600 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-100 shadow-inner px-4 pt-2 pb-4 space-y-1 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-md font-semibold tracking-wide transition-all ${
                  activeSection === item.id
                    ? 'text-sky-600 bg-sky-50/80 font-bold'
                    : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-100 flex flex-col space-y-2">
              <a
                href="tel:7186180162"
                className="flex items-center justify-center space-x-2 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl font-bold text-sm transition-all border border-slate-200"
              >
                <Phone className="w-4 h-4 text-sky-500" />
                <span>Call Practice: (718) 618-0162</span>
              </a>
              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center justify-center space-x-2 w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
