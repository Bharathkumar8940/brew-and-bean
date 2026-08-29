import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, MessageCircle, Info } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

export default function Location() {
  return (
    <section id="location" className="py-24 bg-espresso border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Visit & Connect
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-2">
              {defaultCafeConfig.brand.name}
            </h2>

            <p className="text-coffee-300 mt-4 text-xs sm:text-base leading-relaxed">
              Located in the heart of the city's quiet cultural quarter. Drop in for your morning brew or stay late for evening conversations.
            </p>

            {/* Demo Address Disclaimer */}
            <div className="mt-4 p-3 rounded-2xl bg-coffee-950/80 border border-coffee-800/80 text-[11px] text-coffee-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-caramel shrink-0" />
              <span><strong>Sample Location:</strong> Replace with real client address in `cafeConfig.ts`.</span>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Opening Hours</h4>
                  <p className="text-xs sm:text-sm text-coffee-300 mt-0.5">
                    Weekdays: {defaultCafeConfig.contact.openingHours.weekdays} <br />
                    Weekends: {defaultCafeConfig.contact.openingHours.weekends}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Address</h4>
                  <p className="text-xs sm:text-sm text-coffee-300 mt-0.5">
                    {defaultCafeConfig.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Phone & WhatsApp Desk</h4>
                  <p className="text-xs sm:text-sm text-coffee-300 mt-0.5">{defaultCafeConfig.contact.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a
                href={defaultCafeConfig.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-caramel hover:bg-coffee-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-glow flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-caramel"
              >
                <Navigation className="w-4 h-4" /> Get Directions
              </a>

              <a
                href={`https://wa.me/${defaultCafeConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hi Brew & Bean Café, I would like to inquire about reservations or menu options.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-espresso border border-coffee-700 hover:bg-coffee-900 text-cream font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Direct ({defaultCafeConfig.contact.phone})
              </a>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden border border-coffee-800 shadow-2xl h-[380px] sm:h-[420px] relative bg-coffee-950 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-caramel/20 border border-caramel/40 flex items-center justify-center text-caramel mb-4 animate-bounce">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream">Interactive Location Map</h3>
            <p className="text-coffee-300 text-xs mt-2 max-w-sm">
              {defaultCafeConfig.contact.address}
            </p>

            <a
              href={defaultCafeConfig.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-2.5 rounded-full bg-coffee-800 hover:bg-caramel text-cream font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              Open in Google Maps
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
