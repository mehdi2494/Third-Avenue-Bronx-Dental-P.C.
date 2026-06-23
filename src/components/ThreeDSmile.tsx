import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Eye, ShieldCheck, Zap, Activity, Filter, Info } from 'lucide-react';

interface ThreeDSmileProps {
  className?: string;
}

type DiagnosticFilter = 'standard' | 'shaded' | 'xray';

export default function ThreeDSmile({ className = '' }: ThreeDSmileProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Luxury 3D Perspective States
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeFilter, setActiveFilter] = useState<DiagnosticFilter>('standard');
  const [showAnatomyTags, setShowAnatomyTags] = useState(true);

  // Handle slider drag
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSliding) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSliding) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsSliding(false);
    
    if (isSliding) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isSliding]);

  // 3D holographic hover effect mapping
  const handleHoverMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isSliding) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setRotateX(-y * 14); // slightly sharper tilt
    setRotateY(x * 14);
  };

  const handleHoverLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsSliding(false);
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch ${className}`}>
      
      {/* LEFT COLUMN: The Interactive 3D Comparison Frame (8 columns) */}
      <div className="lg:col-span-8 flex flex-col justify-between">
        
        {/* Main interactive sliding canvas card */}
        <div
          ref={containerRef}
          onMouseMove={handleHoverMove}
          onMouseLeave={handleHoverLeave}
          className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-white/10 select-none group transition-transform duration-250 ease-out"
          style={{
            transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* BACKGROUND: After Image (Gorgeous polished smile) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/input_file_2.png"
              alt="After Smile Transformation"
              className={`w-full h-full object-cover object-center scale-[1.03] transition-all duration-300 ${
                activeFilter === 'xray' ? 'filter invert brightness-[1.1] hue-rotate-180 contrast-125' : ''
              }`}
              referrerPolicy="no-referrer"
            />
            
            {/* Elegant luxury HUD layout */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Diagnostic Tags Overlaid */}
            {showAnatomyTags && sliderPosition < 85 && (
              <div className="absolute right-12 top-1/3 z-20 bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 rounded-xl p-3 text-white max-w-[150px] space-y-1 shadow-lg animate-fadeIn text-[10px] font-mono">
                <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>VITA SHADE B1</span>
                </div>
                <p className="text-slate-300 leading-normal text-[9px]">
                  Maximum brightness, enamel luster polished, alignment corrected.
                </p>
              </div>
            )}
          </div>

          {/* FOREGROUND: Masked Before Image (Stained / uncorrected teeth) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white/80"
            style={{ width: `${sliderPosition}%`, zIndex: 10 }}
          >
            <div className="absolute inset-0 w-full max-w-none aspect-[16/10]" style={{ width: containerRef.current?.clientWidth || '100%' }}>
              <img
                src="/input_file_2.png"
                alt="Before Treatment"
                className={`w-full h-full object-cover object-center scale-[1.03] transition-all duration-300 ${
                  activeFilter === 'xray' 
                    ? 'filter invert brightness-[0.8] contrast-[1.5]' 
                    : activeFilter === 'shaded'
                    ? 'filter saturate-[1.6] sepia-[0.55] hue-rotate-[-15deg]'
                    : 'filter saturate-[0.8] brightness-[0.82] sepia-[0.35] hue-rotate-[-10deg]'
                }`}
                style={{ width: containerRef.current?.clientWidth || 640 }}
                referrerPolicy="no-referrer"
              />
              
              {/* Stained Shade Tag Overlay */}
              {showAnatomyTags && sliderPosition > 15 && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 z-20 bg-slate-950/80 backdrop-blur-md border border-rose-500/30 rounded-xl p-3 text-white max-w-[150px] space-y-1 shadow-lg animate-fadeIn text-[10px] font-mono">
                  <div className="flex items-center space-x-1 text-rose-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>VITA SHADE A3</span>
                  </div>
                  <p className="text-slate-300 leading-normal text-[9px]">
                    Extrinsic stains, micro-abrasions, surface dullness.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* DRAG HANDLE CONTROLLER */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 hover:scale-x-150 transition-transform"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsSliding(true);
            }}
            onTouchStart={() => setIsSliding(true)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white hover:bg-sky-50 text-sky-600 rounded-full shadow-2xl flex items-center justify-center border-2 border-sky-500 transition-colors z-30">
              <svg
                className="w-6 h-6 select-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M8 9l-4 4 4 4m8 0l4-4-4-4"
                />
              </svg>
            </div>
          </div>

          {/* Clinical overlays status indicator */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1 text-[9px] font-mono text-slate-400 uppercase tracking-widest">
            {sliderPosition.toFixed(0)}% AFTER VS {(100 - sliderPosition).toFixed(0)}% BEFORE
          </div>

          {/* Elegant top badges */}
          <div className="absolute right-4 top-4 z-20 flex space-x-2">
            <span className="bg-sky-500/90 backdrop-blur-md text-white font-display text-[9px] font-extrabold px-2.5 py-1 rounded-full shadow-md tracking-wider">
              AFTER TREATMENT
            </span>
            <span className="bg-slate-800/90 backdrop-blur-md text-slate-300 font-display text-[9px] font-extrabold px-2.5 py-1 rounded-full shadow-md tracking-wider">
              BEFORE
            </span>
          </div>
          
        </div>

        {/* Drag Helper Guide lines */}
        <div className="mt-4 flex justify-between items-center px-2 text-xs font-mono text-slate-400">
          <span>← Drag slide track to compare</span>
          <span className="text-sky-500 font-bold">Clinical transformation comparison</span>
          <span>Hover card to tilt 3D perspective →</span>
        </div>

      </div>

      {/* RIGHT COLUMN: Diagnostic Controls & Technical Specs (4 columns) */}
      <div className="lg:col-span-4 bg-slate-950 border border-white/10 rounded-3xl p-6 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
        
        {/* Cyberpunk grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />

        <div className="space-y-6 relative z-10">
          
          <div>
            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-black block mb-1">
              Visual Analytics HUD
            </span>
            <h3 className="font-display font-black text-xl text-white tracking-tight">
              Smile Quality Map
            </h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
              Toggle customized radiographic filters to inspect enamel thickness, tartar stain depth, and structural alignment.
            </p>
          </div>

          {/* Diagnostic Filter Selector */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-extrabold tracking-wider block">
              Imaging Filter Select
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveFilter('standard')}
                className={`py-2 px-1 rounded-xl text-[9px] font-mono font-bold uppercase transition-all border cursor-pointer ${
                  activeFilter === 'standard'
                    ? 'bg-white text-slate-950 border-white'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setActiveFilter('shaded')}
                className={`py-2 px-1 rounded-xl text-[9px] font-mono font-bold uppercase transition-all border cursor-pointer ${
                  activeFilter === 'shaded'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                Hyper Stain
              </button>
              <button
                onClick={() => setActiveFilter('xray')}
                className={`py-2 px-1 rounded-xl text-[9px] font-mono font-bold uppercase transition-all border cursor-pointer ${
                  activeFilter === 'xray'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-400/30'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:bg-slate-800'
                }`}
              >
                Radiograph
              </button>
            </div>
          </div>

          {/* Dynamic Switchers */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-extrabold tracking-wider block">
              Analytical HUD Overlays
            </span>
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 cursor-pointer text-xs">
              <span className="flex items-center space-x-2 text-slate-300 font-medium">
                <Info className="w-3.5 h-3.5 text-sky-400" />
                <span>Anatomy Shade Labels</span>
              </span>
              <input
                type="checkbox"
                checked={showAnatomyTags}
                onChange={(e) => setShowAnatomyTags(e.target.checked)}
                className="rounded bg-slate-950 border-white/10 text-sky-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
              />
            </label>
          </div>

          {/* Performance Data Metrics */}
          <div className="bg-slate-900/50 rounded-2xl border border-white/5 p-4 space-y-3.5">
            <span className="text-[9px] font-mono text-slate-400 uppercase font-extrabold tracking-wider block">
              Treatment Specs
            </span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 block uppercase font-mono">Procedure Time</span>
                <span className="text-xs font-bold text-white">1 Visit (In-Office)</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 block uppercase font-mono">Longevity Estimate</span>
                <span className="text-xs font-bold text-white">Up to 36 Months</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 block uppercase font-mono">Sensitivity Risk</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>0% (Hypoallergenic)</span>
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-500 block uppercase font-mono">Whitening Index</span>
                <span className="text-xs font-bold text-sky-400">Up to 8 Shades</span>
              </div>
            </div>

          </div>

        </div>

        {/* Professional summary footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-start space-x-2.5 text-[11px] text-slate-400 leading-relaxed font-sans">
          <Activity className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p>
            Our clinic features high-intensity <strong>ZOOM!® WhiteSpeed</strong> laser teeth whiteners paired with custom density-mapped protective barriers for extreme clinical comfort.
          </p>
        </div>

      </div>

    </div>
  );
}
