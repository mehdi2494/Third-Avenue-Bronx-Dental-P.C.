import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';

// Dynamic lazy load of the image comparison engine to maximize page speed
const ThreeDSmile = lazy(() => import('./components/ThreeDSmile'));

function SmileSkeleton() {
  return (
    <div className="w-full aspect-[16/10] flex flex-col items-center justify-center relative rounded-3xl bg-slate-950 border border-white/10 overflow-hidden animate-pulse">
      {/* Holographic grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      <span className="text-xs font-mono text-slate-400">INITIALIZING IMAGING FEED...</span>
    </div>
  );
}

import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import { 
  Phone, MapPin, Clock, Calendar, Check, ArrowUp, Heart, Smile, Sparkles, Building, Award 
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('General Dentistry');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scrolling to highlight navbar links and show back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back-to-top button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Identify which section is in view
      const sections = ['home', 'about', 'services', 'why-choose-us', 'gallery', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for sticky header
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Bridge action: booking a specific dental service
  const handleBookService = (serviceTitle: string) => {
    setSelectedServiceForBooking(serviceTitle);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative font-sans">
      
      {/* 1. Universal Header Navigation */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* 2. Primary Layout Flow */}
      <main className="flex-grow">
        
        {/* Home / Hero Section */}
        <Hero onNavigateToBooking={() => scrollToSection('contact')} />

        {/* About Practice Section */}
        <About onNavigateToBooking={() => scrollToSection('contact')} />

        {/* Services Showcase Catalog */}
        <Services onBookService={handleBookService} />

        {/* Animated Clinic Performance Metrics */}
        <Stats />

        {/* Dynamic before/after 3D smile transformations */}
        <section id="gallery" className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sky-600 text-xs font-mono tracking-widest uppercase font-bold bg-sky-50 px-3 py-1.5 rounded-full">
                Smile Transformations
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mt-4 leading-tight">
                Flawless Results, Healthier Smiles
              </h2>
              <p className="text-slate-500 mt-4 text-md md:text-lg leading-relaxed">
                Review physical aesthetic enhancements from actual patients of Third Avenue Bronx Dental P.C. Slide the controller to witness complete whitening and shape alignment.
              </p>
            </div>

            {/* Slider frame */}
            <Suspense fallback={<SmileSkeleton />}>
              <ThreeDSmile className="w-full relative" />
            </Suspense>

          </div>
        </section>

        {/* Patient reviews and feedback */}
        <Testimonials />

        {/* Direct Appointment Booking, Hours, and Google Maps */}
        <Contact initialServiceSelection={selectedServiceForBooking} />

      </main>

      {/* 3. Luxury Dental Branding Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-slate-900 pb-12 mb-12">
            
            {/* Logo and Description (5 columns) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-3 text-white">
                {/* Embedded Mini Logo */}
                <div className="w-8 h-8 bg-slate-900 rounded-lg p-1 flex items-center justify-center border border-slate-800">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current text-sky-400" xmlns="http://www.w3.org/2000/svg">
                    <line x1="33" y1="5" x2="33" y2="95" stroke="#475569" strokeWidth="3" />
                    <line x1="66" y1="5" x2="66" y2="95" stroke="#475569" strokeWidth="3" />
                    <rect x="5" y="5" width="90" height="90" rx="6" stroke="#475569" strokeWidth="4" />
                    <path d="M 50 15 C 68 15, 82 23, 82 45 C 82 60, 74 72, 71 85 C 70 88, 65 88, 63 85 C 58 75, 54 68, 50 68 C 46 68, 42 75, 37 85 C 35 88, 30 88, 29 85 C 26 72, 18 60, 18 45 C 18 23, 32 15, 50 15 Z" fill="none" stroke="#ffffff" strokeWidth="5" />
                    <path d="M 50 15 C 41 15, 31 18, 26 25 C 18 33, 18 43, 20 53 L 33 53 L 33 18 Z" fill="#38bdf8" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-black text-white text-md tracking-tight">
                    3RD AVE BRONX DENTAL
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase leading-none font-bold">
                    Third Avenue Bronx Dental P.C.
                  </span>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Providing standard general dentistry, preventative cleanings, root canals, dentures, and emergency relief to families in the South Bronx and wider NYC.
              </p>

              <div className="pt-2 flex items-center space-x-3 text-slate-500 text-xs">
                <span>© {new Date().getFullYear()} Third Avenue Bronx Dental P.C.</span>
                <span>•</span>
                <span>All rights reserved.</span>
              </div>
            </div>

            {/* Quick Links (3 columns) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Services Provided
              </h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><button onClick={() => handleBookService('Dental Exams')} className="hover:text-sky-400 transition-colors">Comprehensive Dental Exams</button></li>
                <li><button onClick={() => handleBookService('Teeth Cleaning')} className="hover:text-sky-400 transition-colors">Ultrasonic Cleanings</button></li>
                <li><button onClick={() => handleBookService('Root Canals')} className="hover:text-sky-400 transition-colors">Gentle Root Canals</button></li>
                <li><button onClick={() => handleBookService('Crowns & Bridges')} className="hover:text-sky-400 transition-colors">Porcelain Crowns & Bridges</button></li>
                <li><button onClick={() => handleBookService('Emergency Dental Care')} className="hover:text-sky-400 transition-colors">24/7 Urgent Emergency Relief</button></li>
              </ul>
            </div>

            {/* Quick Clinic Info (4 columns) */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                Practice Contact
              </h4>
              <div className="space-y-3 text-sm text-slate-500">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>2740 3rd Ave, Bronx, NY 10455</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Phone className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <a href="tel:7186180162" className="hover:text-sky-400 transition-colors font-semibold text-slate-300">
                    (718) 618-0162
                  </a>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>Mon - Fri: 8:30 AM - 4:30 PM</span>
                </div>
              </div>

              {/* MTA Transit notes */}
              <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl flex items-start space-x-2.5 text-xs text-slate-500">
                <Building className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Transit Access:</strong> Conveniently close to the **3rd Ave - 149th St** Subway Station (2 & 5 Train lines) and Bronx Bx2, Bx15, Bx21 bus terminals.
                </p>
              </div>
            </div>

          </div>

          {/* ADA Compliance & Health Disclaimers */}
          <div className="text-[11px] text-slate-600 space-y-2 leading-relaxed">
            <p>
              <strong>Dental Health Disclaimer:</strong> All clinical content, pricing estimations, and treatment plans represented on this website concept are for presentation and clinical simulation purposes only. Consult with a certified medical doctor or licensed dental surgeon for actual diagnosis, prescriptions, or surgery.
            </p>
            <p>
              <strong>ADA Accessibility Compliance Statement:</strong> Third Avenue Bronx Dental P.C. is committed to ensuring digital accessibility for people with physical disabilities. We continually improve the user experience for everyone, applying relevant Web Content Accessibility Guidelines (WCAG 2.1 AA) benchmarks.
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-sky-600 hover:bg-sky-500 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:translate-y-[-4px] active:scale-95 border border-white/10"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
