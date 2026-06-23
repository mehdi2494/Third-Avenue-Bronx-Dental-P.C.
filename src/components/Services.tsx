import React, { useState } from 'react';
import { 
  Heart, Sparkles, Activity, ShieldAlert, CheckCircle, 
  Clock, DollarSign, ArrowRight, X, HeartHandshake, Eye
} from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  onBookService: (serviceTitle: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const servicesData: Service[] = [
    {
      id: 'exams',
      title: 'Dental Exams',
      description: 'Comprehensive evaluations including oral cancer screening and physical diagnostic checks.',
      fullDescription: 'Our regular diagnostic dental exams are designed to prevent disease, scan for structural wear, evaluate jaw joint (TMJ) status, and check your gum health before conditions escalate. Includes digital low-radiation X-rays to screen between teeth.',
      category: 'preventative',
      duration: '45 mins',
      priceEstimate: '$80 - $150',
      iconName: 'Activity',
    },
    {
      id: 'cleaning',
      title: 'Teeth Cleaning',
      description: 'Professional dental prophylaxis to remove plaque, deep-seated tartar, and surface stains.',
      fullDescription: 'Experience our gentle scaling, ultrasonic debris removal, and professional fine polishing. Our state-of-the-art scaling tech ensures maximum stain removal and gum pocket cleaning with minimal discomfort. Prevents periodontal bone loss.',
      category: 'preventative',
      duration: '60 mins',
      priceEstimate: '$100 - $190',
      iconName: 'Sparkles',
    },
    {
      id: 'cosmetic',
      title: 'Cosmetic Dentistry',
      description: 'Veneers, dental bonding, and medical-grade whitening for your dream smile.',
      fullDescription: 'Revitalize your visual confidence. We offer clinical-strength custom teeth whitening (In-Office or Take-Home), custom-layered composite bonding to repair minor chips, and porcelain veneers matching your exact facial structure.',
      category: 'cosmetic',
      duration: 'Varies',
      priceEstimate: 'Consultation Free',
      iconName: 'Sparkles',
    },
    {
      id: 'fillings',
      title: 'Composite Fillings',
      description: 'Tooth-colored resin restorations to repair cavities and keep your teeth looking natural.',
      fullDescription: 'Say goodbye to dark metal amalgams. We utilize premium biocompatible, BPA-free composite resins that bond directly to your natural tooth structure. They are custom shade-matched to render invisible, durable repairs.',
      category: 'preventative',
      duration: '40 mins',
      priceEstimate: '$150 - $280',
      iconName: 'CheckCircle',
    },
    {
      id: 'root-canals',
      title: 'Root Canals',
      description: 'Painless endodontic therapy designed to save infected teeth and eliminate deep nerve pain.',
      fullDescription: 'Modern root canals are as comfortable as standard fillings. By clearing decayed pulp chambers, sterilizing root pathways, and sealing them with advanced gutta-percha sealant, we completely cure infections and preserve the physical tooth structure.',
      category: 'surgical',
      duration: '75 mins',
      priceEstimate: '$800 - $1200',
      iconName: 'Heart',
    },
    {
      id: 'crowns',
      title: 'Crowns & Bridges',
      description: 'Durable custom porcelain prosthetics to restore heavily decayed or missing teeth.',
      fullDescription: 'Our custom-milled porcelain crowns offer 100% natural luster, color matching, and bite durability. For missing teeth, our porcelain bridge work anchors securely to neighboring teeth, preventing shifting and restoring standard chewing force.',
      category: 'surgical',
      duration: '2 visits',
      priceEstimate: '$900 - $1400',
      iconName: 'CheckCircle',
    },
    {
      id: 'dentures',
      title: 'Premium Dentures',
      description: 'Custom full & partial removable dental arches matching your face shape and bite.',
      fullDescription: 'We craft comfortable, lightweight, modern acrylic and metal-framework partial or full dentures. Our prosthetics are contoured to avoid gum irritation, providing full bite support, facial dimension correction, and fluent speech.',
      category: 'surgical',
      duration: '3 visits',
      priceEstimate: '$1200 - $2200',
      iconName: 'HeartHandshake',
    },
    {
      id: 'general',
      title: 'General Dentistry',
      description: 'Comprehensive healthcare protecting your oral hygiene, gums, and teeth.',
      fullDescription: 'The foundation of lifelong oral safety. From pediatric care to senior dental solutions, our general dentistry covers family treatment plans, night guards for tooth grinding (bruxism), and custom sports mouthguards.',
      category: 'preventative',
      duration: 'Varies',
      priceEstimate: 'Varies',
      iconName: 'Activity',
    },
    {
      id: 'emergency',
      title: 'Emergency Dental Care',
      description: 'Same-day urgent relief for broken teeth, swelling, trauma, or severe toothaches.',
      fullDescription: 'We prioritize active dental pain immediately. If you have a knocked-out tooth, deep abscess swelling, fractured jaw, or excruciating nerve pain, call us. We offer same-day emergency relief and walk-ins.',
      category: 'emergency',
      duration: 'Immediate',
      priceEstimate: 'Evaluation $120',
      iconName: 'ShieldAlert',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity': return <Activity className="w-5 h-5 text-sky-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-sky-600" />;
      case 'Heart': return <Heart className="w-5 h-5 text-sky-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-sky-600" />;
      default: return <CheckCircle className="w-5 h-5 text-sky-600" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'preventative': return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'cosmetic': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'surgical': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'emergency': return 'bg-rose-50 text-rose-700 border-rose-100 animate-pulse';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 text-xs font-mono tracking-widest uppercase font-bold bg-sky-50 px-3 py-1.5 rounded-full">
            Our Dental Specializations
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mt-4 leading-tight">
            Comprehensive Care for Your Family
          </h2>
          <p className="text-slate-500 mt-4 text-md md:text-lg leading-relaxed">
            From routine checkups and high-tech cleanings to emergency relief and cosmetic restorations, we offer everything needed to maintain optimal oral health.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`border border-slate-100 rounded-3xl p-6 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-50/50 transition-all duration-300 flex flex-col group relative overflow-hidden bg-slate-50/50 hover:bg-white ${
                service.category === 'emergency' ? 'ring-2 ring-rose-100/50 bg-rose-50/10' : ''
              }`}
            >
              {/* Category tag */}
              <div className="flex justify-between items-center mb-6">
                <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${getCategoryColor(service.category)}`}>
                  {service.category}
                </span>
                <span className="text-slate-400 font-mono text-xs flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-300" />
                  <span>{service.duration}</span>
                </span>
              </div>

              {/* Service title & icon */}
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  service.category === 'emergency' ? 'bg-rose-100' : 'bg-sky-100'
                }`}>
                  {getIcon(service.iconName)}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-slate-400 flex items-center mt-1">
                    <DollarSign className="w-3 h-3 text-slate-300" />
                    <span>Est: {service.priceEstimate}</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Call-to-actions at bottom */}
              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-mono font-bold tracking-wider text-slate-500 hover:text-sky-600 flex items-center space-x-1 bg-white hover:bg-sky-50 px-3 py-2 rounded-xl border border-slate-100 hover:border-sky-100 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => onBookService(service.title)}
                  className={`text-xs font-mono font-bold tracking-wider flex items-center space-x-1 px-3 py-2 rounded-xl transition-all ${
                    service.category === 'emergency'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm'
                  }`}
                >
                  <span>Book</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Pseudo-3D subtle geometric wireframe pattern behind on hover */}
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-sky-100/30 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Modern Dialog Modal for Service Details */}
      {selectedService && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 animate-slideUp">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${getCategoryColor(selectedService.category)}`}>
              {selectedService.category}
            </span>

            <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 mt-4 mb-2 leading-tight">
              {selectedService.title}
            </h3>

            <div className="flex space-x-4 my-4 font-mono text-xs text-slate-500 border-y border-slate-100 py-3">
              <span className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Est: {selectedService.duration}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4 text-sky-500" />
                <span>Range: {selectedService.priceEstimate}</span>
              </span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedService.fullDescription}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  onBookService(selectedService.title);
                  setSelectedService(null);
                }}
                className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-center font-bold text-sm shadow-md shadow-sky-100 hover:shadow-sky-200 transition-all"
              >
                Schedule This Service Now
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm border border-slate-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
