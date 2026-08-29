import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, CheckCircle, Info } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

export default function EventsSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Birthday Gathering');
  const [eventDate, setEventDate] = useState('2026-09-12');
  const [guests, setGuests] = useState(15);
  const [requirements, setRequirements] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="events-section" className="py-24 sm:py-28 bg-coffee-950 border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs flex items-center gap-2">
              <PartyPopper className="w-4 h-4" /> Private Events & Gatherings
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-2">
              Host Your Event at {defaultCafeConfig.brand.name}
            </h2>

            <p className="text-coffee-300 mt-4 text-xs sm:text-base leading-relaxed">
              Celebrate birthdays, host corporate workshops, book club sessions, or acoustic live music evenings in our warm, acoustically tuned café space.
            </p>

            <div className="mt-6 sm:mt-8 space-y-3.5 text-xs text-coffee-300">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-caramel shrink-0" />
                <span>Customized artisanal coffee flights & bakery catering</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-caramel shrink-0" />
                <span>Full venue or private terrace seating available</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-caramel shrink-0" />
                <span>Audio-visual projector setup & dedicated barista team</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-3xl bg-espresso border border-coffee-800 shadow-2xl"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream">Request Private Event (Demo)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:border-caramel focus:outline-none"
                    >
                      <option value="Birthday Gathering">Birthday Gathering</option>
                      <option value="Corporate Workshop">Corporate Workshop</option>
                      <option value="Book Club">Book Club Session</option>
                      <option value="Live Music & Jam">Live Music Session</option>
                      <option value="Private Dining">Private Dining</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:border-caramel focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ananya Roy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:border-caramel focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:border-caramel focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:border-caramel focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={50}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:border-caramel focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                    Special Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Projector setup, custom cake, specific acoustic playlist..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:border-caramel focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all hover:scale-[1.01] border border-amber-300/30"
                >
                  Submit Event Request (Demo)
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
                <h3 className="font-serif text-2xl font-bold text-cream">Event Request Received</h3>
                <p className="text-xs text-coffee-300 max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong className="text-cream">{name}</strong>! Your demo event request for <strong className="text-caramel">{eventType}</strong> on {eventDate} has been logged.
                </p>
                <div className="p-3 rounded-xl bg-coffee-950/80 border border-coffee-800/80 text-[11px] text-coffee-300 text-left">
                  <Info className="w-4 h-4 text-caramel inline mr-1" />
                  <strong>Production Note:</strong> In a production website, this request would automatically dispatch an email/WhatsApp message to the café manager.
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2 rounded-full bg-coffee-800 text-cream text-xs uppercase font-bold tracking-wider hover:bg-caramel transition-colors"
                >
                  Reset Demo Form
                </button>
              </div>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
