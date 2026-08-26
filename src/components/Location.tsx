import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, MessageCircle } from 'lucide-react';

export default function Location() {
  const whatsappNumber = "918639098389";

  return (
    <section id="location" className="py-24 bg-espresso border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Find Our Table
            </span>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
              Brew & Bean Café
            </h2>

            <p className="text-coffee-300 mt-4 text-sm md:text-base leading-relaxed">
              Located in the heart of the city's quiet cultural quarter. Drop in for your morning brew or stay late for evening conversations.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Opening Hours</h4>
                  <p className="text-sm text-coffee-300 mt-0.5">Monday – Sunday: 9:00 AM – 10:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Address</h4>
                  <p className="text-sm text-coffee-300 mt-0.5">
                    Plot 42, Heritage Boulevard, Indiranagar, Bengaluru, KA 560038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Phone & Reservations</h4>
                  <p className="text-sm text-coffee-300 mt-0.5">+91 86390 98389</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-caramel hover:bg-coffee-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-glow flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Brew & Bean Café, I would like to reserve a table or ask a question.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-espresso border border-coffee-700 hover:bg-coffee-900 text-cream font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp Us (+91 86390 98389)
              </a>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden border border-coffee-800 shadow-2xl h-[420px] relative bg-coffee-950 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-caramel/20 border border-caramel/40 flex items-center justify-center text-caramel mb-4 animate-bounce">
              <MapPin className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-cream">Interactive Café Map</h3>
            <p className="text-coffee-300 text-xs mt-2 max-w-sm">
              Plot 42, Heritage Boulevard, Indiranagar, Bengaluru
            </p>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-2.5 rounded-full bg-coffee-800 hover:bg-caramel text-cream font-medium text-xs uppercase tracking-wider transition-colors"
            >
              Open in Google Maps
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
