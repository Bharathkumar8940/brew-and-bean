import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, CheckCircle } from 'lucide-react';

export default function EventsSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Birthday Celebration');
  const [eventDate, setEventDate] = useState('2026-09-05');
  const [guests, setGuests] = useState(15);
  const [requirements, setRequirements] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          eventType,
          eventDate,
          guests,
          requirements,
        }),
      });

      if (res.ok) setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="events-section" className="py-28 bg-coffee-950 border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs flex items-center gap-2">
              <PartyPopper className="w-4 h-4" /> Private Bookings
            </span>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
              Host Your Event at Brew & Bean
            </h2>

            <p className="text-coffee-300 mt-4 text-sm md:text-base leading-relaxed">
              Celebrate birthdays, host corporate workshops, book club sessions, or intimate live music evenings in our warm, acoustically tuned café space.
            </p>

            <div className="mt-8 space-y-4 text-xs text-coffee-300">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-caramel" />
                <span>Customized artisanal coffee flights & pastry catering</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-caramel" />
                <span>Full venue or private terrace seating available</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-caramel" />
                <span>Audio-visual setup, ambient lighting & dedicated barista team</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-espresso border border-coffee-800 shadow-2xl"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-cream">Request Private Event</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                      Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:outline-none"
                    >
                      <option value="Birthday Celebration">Birthday</option>
                      <option value="Corporate Workshop">Corporate Meeting</option>
                      <option value="Private Dinner">Private Dinner</option>
                      <option value="Book Club">Book Club</option>
                      <option value="Live Music & Jam">Live Music Session</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ananya Roy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="8639098389"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    required
                    min={5}
                    max={50}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Projector, custom cake, specific music playlist..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-cream text-xs focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-caramel hover:bg-coffee-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all"
                >
                  Submit Event Request
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-cream">Request Sent!</h3>
                <p className="text-xs text-coffee-300">
                  Our café event manager will review your request and get in touch via WhatsApp within 2 hours.
                </p>
              </div>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
