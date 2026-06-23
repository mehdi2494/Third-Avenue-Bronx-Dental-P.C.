import React, { useEffect, useState, useRef } from 'react';
import { Award, ShieldCheck, HeartPulse, Smile } from 'lucide-react';

interface StatCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function StatCounter({ target, suffix = '', duration = 1500 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statsList = [
    {
      icon: <Award className="w-6 h-6 text-sky-500" />,
      title: 'Experienced Team',
      value: 15,
      suffix: '+ Years',
      description: 'Dedicated dental experts serving families in the Bronx community.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'Modern Equipment',
      value: 100,
      suffix: '% Digital',
      description: 'Equipped with digital X-rays, 3D intraoral scanners & modern sterilization.',
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-rose-500" />,
      title: 'Comfortable Suites',
      value: 10,
      suffix: ' Private Rooms',
      description: 'Ergonomic massage chairs, smart TVs, and relaxing ambient music.',
    },
    {
      icon: <Smile className="w-6 h-6 text-amber-500" />,
      title: 'Patient Satisfaction',
      value: 99,
      suffix: '% rating',
      description: 'Highly rated for warm bedside manner, clarity, and treatment safety.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-400 text-xs font-mono tracking-widest uppercase font-bold">
            Clinic Standards
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mt-2 leading-tight">
            Setting the Standard for Bronx Family Dentistry
          </h2>
          <p className="text-slate-400 mt-4 text-md md:text-lg leading-relaxed">
            By combining high-end diagnostic tools, experienced practitioners, and comfortable sedation care, we make keeping your smile healthy a stress-free experience.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsList.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 hover:border-sky-500/30 transition-all duration-300 hover:translate-y-[-4px] shadow-lg flex flex-col group"
            >
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              
              <div className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight flex items-baseline space-x-1">
                <StatCounter target={stat.value} suffix={stat.suffix} />
              </div>

              <h3 className="font-display font-bold text-lg text-slate-100 mt-3 mb-2">
                {stat.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mt-auto">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
