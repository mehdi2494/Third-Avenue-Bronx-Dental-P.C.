import React, { Suspense, lazy } from 'react';
import { Calendar, Phone, Sparkles, Star, ShieldCheck } from 'lucide-react';

// Lazy-load the heavy 3D WebGL Tooth Component for instant page paint
const ThreeDTooth = lazy(() => import('./ThreeDTooth'));

function ToothSkeleton() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden animate-pulse">
      {/* Holographic grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
      
      {/* Glowing core */}
      <div className="absolute w-24 h-24 bg-sky-500/10 rounded-full blur-xl animate-pulse" />
      
      {/* Clean high-tech Tooth Vector */}
      <svg className="w-16 h-16 text-sky-400/40 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.5 2 6 4 6 7.5c0 3 1.5 4.5 2.5 5.5l-1 5c-.5 2 1 3.5 2.5 3.5s2-1 2-2.5V17m0-15c3.5 0 6 2 6 5.5 0 3-1.5 4.5-2.5 5.5l1 5c.5 2-1 3.5-2.5 3.5s-2-1-2-2.5V17" />
      </svg>
      
      <span className="text-[10px] font-mono tracking-widest text-sky-400/80">CAD MODEL ACTIVE...</span>
    </div>
  );
}

interface HeroProps {
  onNavigateToBooking: () => void;
}

export default function Hero({ onNavigateToBooking }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[90vh] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white overflow-hidden flex items-center">
      
      {/* Absolute Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Decorator */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptive Hero Copy & Badges (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-400/20 rounded-full px-3 py-1.5 text-xs font-mono font-bold text-sky-400 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>ACCREDITED BRONX DENTAL CLINIC</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              Your Trusted Bronx <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-white">
                Dental Care Partner
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Comprehensive dental care for families and individuals in the Bronx. Experience high-tech, patient-focused treatments in a comfortable and warm setting.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              
              <button
                onClick={onNavigateToBooking}
                className="flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-6 py-4 rounded-xl text-md shadow-lg shadow-sky-950/50 hover:shadow-sky-500/20 hover:scale-[1.02] transition-all cursor-pointer active:scale-95"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>

              <a
                href="tel:7186180162"
                className="flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold px-6 py-4 rounded-xl text-md border border-slate-800 transition-all active:scale-95 hover:border-slate-700"
              >
                <Phone className="w-5 h-5 text-sky-400 animate-pulse" />
                <span>Call Now: (718) 618-0162</span>
              </a>

            </div>

            {/* Ratings & Certifications */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              
              {/* Star Ratings */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  <strong className="text-slate-100">4.9 / 5.0 Rating</strong> by local families
                </span>
              </div>

              {/* Security Badge */}
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>ADA Certified Standard Safety</span>
              </div>

            </div>

          </div>

          {/* Right Column: High-End Interactive 3D Tooth Object (5 Cols) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            
            {/* Glossy Backdrop ring */}
            <div className="absolute w-[320px] h-[320px] bg-sky-500/5 rounded-full border border-sky-500/10 pointer-events-none animate-pulse" />
            <div className="absolute w-[240px] h-[240px] bg-cyan-400/5 rounded-full border border-cyan-400/10 pointer-events-none" />

            {/* Three.js tooth rendering element */}
            <div className="w-full aspect-square max-w-[360px] h-[360px] relative z-10 filter drop-shadow-2xl">
              <Suspense fallback={<ToothSkeleton />}>
                <ThreeDTooth className="w-full h-full" autoRotateSpeed={1.5} highlightColor="#0ea5e9" minimal={true} />
              </Suspense>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
