import React, { useState, useEffect } from 'react';
import { 
  Phone, MapPin, Clock, Calendar, Send, 
  CheckCircle2, Trash2, Mail, MessageSquare, AlertCircle
} from 'lucide-react';
import { Booking } from '../types';

interface ContactProps {
  initialServiceSelection?: string;
}

export default function Contact({ initialServiceSelection = 'General Dentistry' }: ContactProps) {
  // Appointment states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialServiceSelection);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);

  // Update chosen service when prop changes
  useEffect(() => {
    if (initialServiceSelection) {
      setService(initialServiceSelection);
    }
  }, [initialServiceSelection]);

  // Load bookings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('bronx_dental_bookings');
    if (stored) {
      try {
        setActiveBookings(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing bookings', e);
      }
    }
  }, []);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) return;

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      name,
      email,
      phone,
      service,
      date,
      time,
      notes,
      createdAt: new Date().toLocaleDateString(),
      status: 'confirmed', // Immediate auto-confirm for demonstration ease!
    };

    const updated = [newBooking, ...activeBookings];
    setActiveBookings(updated);
    localStorage.setItem('bronx_dental_bookings', JSON.stringify(updated));

    // Reset fields
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = activeBookings.filter((b) => b.id !== id);
    setActiveBookings(updated);
    localStorage.setItem('bronx_dental_bookings', JSON.stringify(updated));
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 text-xs font-mono tracking-widest uppercase font-bold bg-sky-50 px-3 py-1.5 rounded-full">
            Connect With Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mt-4 leading-tight">
            Schedule Your Visit Today
          </h2>
          <p className="text-slate-500 mt-4 text-md md:text-lg leading-relaxed">
            Ready for a healthier smile? Complete our instant dental scheduler or reach out to our office staff directly. We look forward to welcoming you to our clinic!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Location & Clinic Information + Google Maps (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Clinic Coordinates
              </h3>

              <div className="space-y-4 font-sans">
                
                {/* Physical Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Practice Address</h4>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5 leading-relaxed">
                      Third Avenue Bronx Dental P.C.<br />
                      2740 3rd Ave, Bronx, NY 10455
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Direct Phone</h4>
                    <a
                      href="tel:7186180162"
                      className="text-sky-600 font-bold hover:text-sky-700 text-xs md:text-sm mt-0.5 block hover:underline"
                    >
                      (718) 618-0162
                    </a>
                    <span className="text-[10px] text-slate-400 font-mono">Click to call practice</span>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Office Hours</h4>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5 leading-relaxed">
                      Monday - Friday<br />
                      8:30 AM - 4:30 PM
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">Saturday & Sunday: Closed</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Real Google Maps Integration Embed */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-slate-100 aspect-video lg:aspect-[4/3] relative">
              <iframe
                title="Google Map location of Third Avenue Bronx Dental"
                src="https://maps.google.com/maps?q=2740%203rd%20Ave,%20Bronx,%20NY%2010455&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Panel: Interactive Scheduler Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8 relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 leading-none">
                    Instant Dental Scheduler
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your slot and service to book instantly
                  </p>
                </div>
              </div>

              {isSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-black text-xl text-emerald-950">Appointment Secured!</h4>
                  <p className="text-sm leading-relaxed max-w-sm mx-auto text-emerald-700">
                    Your cleaning/exam booking has been logged in local persistence. Our medical coordinators will contact you shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="col-span-2">
                    <label htmlFor="aptName" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Patient Full Name
                    </label>
                    <input
                      id="aptName"
                      type="text"
                      required
                      placeholder="Sandra Lopez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors focus:bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="aptEmail" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="aptEmail"
                      type="email"
                      required
                      placeholder="sandra@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors focus:bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="aptPhone" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="aptPhone"
                      type="tel"
                      required
                      placeholder="(718) 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors focus:bg-white"
                    />
                  </div>

                  {/* Chosen Service */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="aptService" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Dental Specialization
                    </label>
                    <select
                      id="aptService"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors focus:bg-white appearance-none"
                    >
                      <option value="General Dentistry">General Dentistry</option>
                      <option value="Teeth Cleaning">Teeth Cleaning</option>
                      <option value="Dental Exams">Dental Exams</option>
                      <option value="Composite Fillings">Composite Fillings</option>
                      <option value="Root Canals">Root Canals</option>
                      <option value="Crowns & Bridges">Crowns & Bridges</option>
                      <option value="Premium Dentures">Premium Dentures</option>
                      <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                      <option value="Emergency Dental Care">Emergency Dental Care</option>
                    </select>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label htmlFor="aptDate" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      id="aptDate"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors focus:bg-white"
                    />
                  </div>

                  {/* Time Selection */}
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="aptTime" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      id="aptTime"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors focus:bg-white"
                    >
                      <option value="">-- Choose Slot --</option>
                      <option value="08:30 AM">08:30 AM</option>
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="col-span-2">
                    <label htmlFor="aptNotes" className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Special Medical Requests (Optional)
                    </label>
                    <textarea
                      id="aptNotes"
                      rows={2}
                      placeholder="Share details regarding extreme tooth pain, sedation preferences, etc..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="col-span-2 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-center font-bold text-sm shadow-md shadow-sky-100 hover:shadow-sky-200 transition-all cursor-pointer mt-2 active:scale-95"
                  >
                    Confirm Secure Booking
                  </button>
                </form>
              )}
            </div>

            {/* PERSISTED UPCOMING APPOINTMENTS SECTION */}
            {activeBookings.length > 0 && (
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-inner space-y-4 animate-slideUp">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-sm text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Your Scheduled Visits ({activeBookings.length})</span>
                  </h4>
                  <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-mono font-bold">
                    Local Device Persistence
                  </span>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {activeBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white border border-slate-100 rounded-2xl p-4 flex justify-between items-center shadow-sm"
                    >
                      <div className="space-y-1">
                        <span className="text-xs bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded-full uppercase font-mono border border-sky-100">
                          {booking.service}
                        </span>
                        <h5 className="font-display font-bold text-slate-900 text-sm mt-1.5">
                          {booking.name}
                        </h5>
                        <p className="text-xs text-slate-500 font-mono flex items-center space-x-1">
                          <span>Date: {booking.date} at {booking.time}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-slate-300 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-all"
                        title="Cancel appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
