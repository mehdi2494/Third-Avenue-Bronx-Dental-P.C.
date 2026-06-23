import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Microscope, MapPin, Building, Sparkles } from 'lucide-react';

interface AboutProps {
  onNavigateToBooking: () => void;
}

export default function About({ onNavigateToBooking }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Visual Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Brand Mosaic & Real Storefront Assets (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="relative">
              {/* Outer floating ambient blur */}
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

              {/* Real assets grid */}
              <div className="grid grid-cols-12 gap-4 relative">
                
                {/* 1. Nighttime Signage - Replicated from input_file_0.png */}
                <div className="col-span-12 md:col-span-8 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-300 bg-slate-900 group">
                  <div className="relative aspect-[16/9]">
                    <img
                      src="/input_file_0.png"
                      alt="Third Avenue Bronx Dental Nighttime Sign"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-bold bg-slate-950/80 px-2 py-0.5 rounded-full">
                        Illuminated Signage
                      </span>
                      <h4 className="font-display font-extrabold text-sm md:text-md mt-1">
                        Our 3rd Avenue Frontage
                      </h4>
                    </div>
                  </div>
                </div>

                {/* 2. Floating Star Badge */}
                <div className="hidden md:flex absolute top-1/2 left-2/3 -translate-y-1/2 z-20 bg-white shadow-2xl rounded-2xl p-4 border border-sky-100 flex-col items-center justify-center animate-bounce duration-1000">
                  <Sparkles className="w-6 h-6 text-sky-500 mb-1" />
                  <span className="font-display font-black text-slate-800 text-lg">Walk-ins</span>
                  <span className="text-[9px] font-mono uppercase text-slate-400 font-bold tracking-wide">Are Welcome</span>
                </div>

                {/* 3. Daytime Storefront - Replicated from input_file_1.png */}
                <div className="col-span-12 md:col-span-7 rounded-3xl overflow-hidden shadow-lg border-4 border-white transform hover:scale-[1.02] transition-transform duration-300 group">
                  <div className="relative aspect-[4/3]">
                    <img
                      src="/input_file_1.png"
                      alt="Third Avenue Bronx Dental Exterior awning"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase font-bold bg-slate-950/80 px-2 py-0.5 rounded-full">
                        Daytime Entrance
                      </span>
                      <h4 className="font-display font-bold text-xs mt-0.5">
                        2740 3rd Avenue, Bronx
                      </h4>
                    </div>
                  </div>
                </div>

                {/* 4. Mini Clinical Statement */}
                <div className="col-span-12 md:col-span-5 bg-sky-600 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500 rounded-full translate-x-8 -translate-y-8 blur-lg pointer-events-none" />
                  <MapPin className="w-8 h-8 text-sky-200" />
                  <div className="mt-8">
                    <p className="font-display font-extrabold text-sm text-sky-100 uppercase tracking-widest">
                      Our Location
                    </p>
                    <p className="font-display font-black text-xl mt-1 leading-snug">
                      Heart of the Bronx
                    </p>
                    <p className="text-xs text-sky-200 mt-2 leading-normal font-medium">
                      Easily accessible via major MTA transit loops and bus stops.
                    </p>
                  </div>
                </div>

              </div>
            </div>
            
          </div>

          {/* Right Column: Narrative & Values (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-sky-600 text-xs font-mono tracking-widest uppercase font-bold bg-sky-50 px-3 py-1.5 rounded-full">
                Introducing Our Practice
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mt-4 leading-tight">
                Third Avenue Bronx Dental P.C.
              </h2>
              <p className="text-slate-500 mt-4 text-md md:text-lg leading-relaxed">
                Located conveniently at **2740 3rd Ave**, we are dedicated to providing accessible, high-end general dentistry and preventative dental health solutions. Our mission is to make comfortable, certified dental care a standard for all individuals and families in the Bronx.
              </p>
            </div>

            {/* Core Values / Competencies List */}
            <div className="space-y-4">
              
              <div className="flex items-start space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-md text-slate-900">
                    Patient-Focused & Comfortable Care
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    We treat dental anxiety with compassion. Enjoy custom sedation options, warm explanations, and patient comfort suites designed to keep you entirely at ease.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center shrink-0">
                  <Microscope className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-md text-slate-900">
                    Modern Clinical Technology
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Our clinic uses top-tier low-radiation digital dental radiography, 3D intraoral imaging scanners, and automated sterilization devices to ensure total hygiene.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-md text-slate-900">
                    Accessible & Accredited Providers
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Licensed dentists with decades of accredited training in dental restorations, fillings, endodontics, cosmetic dental adjustments, and emergency trauma relief.
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onNavigateToBooking}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-center text-sm px-6 py-4 rounded-xl shadow-md shadow-sky-100 transition-all active:scale-95"
              >
                Schedule an Initial Consultation
              </button>
              <a
                href="tel:7186180162"
                className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-6 py-4 rounded-xl transition-all"
              >
                <span>Call Practice Now</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
