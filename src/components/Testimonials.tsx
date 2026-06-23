import React, { useState } from 'react';
import { Star, MessageSquare, Quote, Heart, Send } from 'lucide-react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 't1',
      name: 'Maria S.',
      role: 'Bronx Resident',
      text: 'I was extremely nervous about getting a root canal, but the dental team here explained every step of the procedure and kept me completely pain-free. Outstanding bedside manner!',
      rating: 5,
      date: 'May 12, 2026',
      verified: true,
    },
    {
      id: 't2',
      name: 'James L.',
      role: 'Family Care Patient',
      text: 'Our entire family has transitioned our dental checkups here. They have modern digital x-ray equipment and their hygienists are thorough yet incredibly gentle. Highly recommend!',
      rating: 5,
      date: 'June 01, 2026',
      verified: true,
    },
    {
      id: 't3',
      name: 'Elena R.',
      role: 'Cosmetic Patient',
      text: 'The teeth whitening results are unbelievable! My smile is significantly whiter, and the custom sensitivity guard they prepared worked perfectly. Friendly staff and spotless environment.',
      rating: 5,
      date: 'June 18, 2026',
      verified: true,
    },
    {
      id: 't4',
      name: 'Marcus K.',
      role: 'Emergency Patient',
      text: 'I had a broken crown causing horrible nerve pain on a Tuesday morning. I walked in and they accommodated me immediately, replacing my crown on the spot. Lifesavers!',
      rating: 5,
      date: 'June 20, 2026',
      verified: true,
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  // New review form states
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newText) return;

    const newReview: Testimonial = {
      id: `t-${Date.now()}`,
      name: newName,
      role: 'Verified Patient',
      text: newText,
      rating: newRating,
      date: 'Just now',
      verified: true,
    };

    setTestimonials([newReview, ...testimonials]);
    setNewName('');
    setNewText('');
    setNewRating(5);
    setIsSuccess(true);
    setActiveIndex(0);

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 text-xs font-mono tracking-widest uppercase font-bold bg-sky-50 px-3 py-1.5 rounded-full">
            Patient Satisfaction Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mt-4 leading-tight">
            Loved by the Bronx Community
          </h2>
          <p className="text-slate-500 mt-4 text-md md:text-lg leading-relaxed">
            Discover verified reviews from real individuals who have found comfortable dental care and glowing smile transformations at our practice.
          </p>
        </div>

        {/* Carousel & Review Submission split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Active Carousel Review (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 flex-1 flex flex-col justify-between relative min-h-[300px]">
              
              {/* Giant quote decorator */}
              <Quote className="absolute right-6 top-6 w-16 h-16 text-sky-500/5 rotate-180 pointer-events-none" />

              <div>
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[activeIndex].rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-slate-700 text-md md:text-xl font-display font-medium leading-relaxed italic mb-8">
                  "{testimonials[activeIndex].text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center font-display font-extrabold text-sky-700 text-md">
                    {testimonials[activeIndex].name[0]}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-slate-900 leading-none">
                      {testimonials[activeIndex].name}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono mt-1 block">
                      {testimonials[activeIndex].role} • {testimonials[activeIndex].date}
                    </span>
                  </div>
                </div>

                {testimonials[activeIndex].verified && (
                  <span className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                    <Heart className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                    <span>Verified Patient</span>
                  </span>
                )}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center space-x-2 mt-6 justify-center lg:justify-start">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-8 bg-sky-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Interactive Write Review Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full translate-x-10 -translate-y-10 blur-xl pointer-events-none" />

              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-5 h-5 text-sky-400" />
                <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-wider">
                  Share Your Experience
                </h3>
              </div>
              
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
                Are you a current patient? Your feedback helps families in the Bronx find quality, gentle care. Leave a rating below!
              </p>

              {isSuccess ? (
                <div className="bg-emerald-500/20 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-2 animate-fadeIn">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-display font-black text-lg text-emerald-300">Review Submitted!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you so much! Your review has been recorded and placed first in the patient gallery.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating selection */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase font-bold mb-2">
                      Your Rating
                    </label>
                    <div className="flex space-x-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="focus:outline-none transition-transform active:scale-125"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="revName" className="block text-xs font-mono text-slate-400 uppercase font-bold mb-2">
                      Full Name / Nickname
                    </label>
                    <input
                      id="revName"
                      type="text"
                      required
                      placeholder="e.g. Sandra M."
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <label htmlFor="revText" className="block text-xs font-mono text-slate-400 uppercase font-bold mb-2">
                      Your Treatment Feedback
                    </label>
                    <textarea
                      id="revText"
                      required
                      rows={3}
                      placeholder="Tell other Bronx families about your cleaning, crown work, or overall comfort level..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors placeholder:text-slate-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md cursor-pointer active:scale-95"
                  >
                    Post Patient Review
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
