import { motion } from 'framer-motion';
import { Star, Quote, Info } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

export default function Testimonials() {
  return (
    <section className="py-24 bg-coffee-950 border-t border-coffee-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> Guest Experience — Sample Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-2">
            What Guests Could Say
          </h2>
          <p className="text-coffee-300 mt-3 text-xs sm:text-base leading-relaxed">
            Sample feedback layout demonstrating how guest testimonials and Google review highlights can be displayed for your café.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {defaultCafeConfig.sampleTestimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-6 sm:p-8 rounded-3xl bg-espresso/80 border border-coffee-800/80 hover:border-caramel/50 transition-all flex flex-col justify-between shadow-2xl relative group"
            >
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-caramel/20 absolute top-6 right-6 group-hover:text-caramel/40 transition-colors" />

              <div>
                <div className="flex items-center gap-1 text-caramel">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-coffee-200 text-xs sm:text-sm italic mt-5 leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-5 border-t border-coffee-800/60">
                <div>
                  <h4 className="font-serif text-cream font-bold text-sm sm:text-base">{t.name}</h4>
                  <p className="text-coffee-400 text-[11px]">{t.role}</p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-coffee-900 border border-coffee-800 text-caramel">
                  Sample Review
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo Notice Disclaimer Footer */}
        <div className="mt-12 text-center text-xs text-coffee-400 max-w-xl mx-auto italic">
          * Demo Disclaimer: The reviews above are sample template cards provided to illustrate the design layout for prospective clients.
        </div>

      </div>
    </section>
  );
}
