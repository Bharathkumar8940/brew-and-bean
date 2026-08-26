import { motion } from 'framer-motion';
import { Sparkles, Heart, Flame } from 'lucide-react';

export default function StorySection() {
  return (
    <section id="story" className="relative py-28 bg-espresso overflow-hidden border-t border-coffee-900">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-coffee-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Our Story & Heritage
            </span>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-3 leading-tight">
              More Than Coffee. <br />
              <span className="text-caramel italic">A Warm Sanctuary.</span>
            </h2>

            <p className="mt-6 text-coffee-200 text-base md:text-lg leading-relaxed font-sans">
              Brew & Bean Café was born out of a simple belief: coffee isn't just a morning routine; 
              it's an invitation to slow down, connect, and savor the rich moments of life.
            </p>

            <p className="mt-4 text-coffee-300 text-sm md:text-base leading-relaxed">
              Every bean is sustainably sourced from single-origin high-altitude estates, roasted in 
              small artisanal batches to unlock subtle notes of chocolate, toasted hazelnuts, and dark caramel. 
              Whether you're finding a quiet corner to write, catching up with old friends, or enjoying our freshly 
              baked pastries, our table is always set for you.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 pt-6 border-t border-coffee-800/80">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Master Roasts</h4>
                  <p className="text-xs text-coffee-300 mt-1">Roasted daily for peak aroma & crema.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Handcrafted Food</h4>
                  <p className="text-xs text-coffee-300 mt-1">Made fresh daily with organic ingredients.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-coffee-700/50">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80"
                alt="Brewing artisanal espresso"
                className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-espresso/80 backdrop-blur-md border border-coffee-700/60 flex items-center justify-between">
                <div>
                  <span className="font-serif text-3xl font-extrabold text-caramel">100%</span>
                  <p className="text-xs text-coffee-200 uppercase tracking-wider font-medium">Arabica Beans</p>
                </div>
                <div className="h-10 w-[1px] bg-coffee-700" />
                <div>
                  <span className="font-serif text-3xl font-extrabold text-caramel">15+</span>
                  <p className="text-xs text-coffee-200 uppercase tracking-wider font-medium">Brew Styles</p>
                </div>
                <div className="h-10 w-[1px] bg-coffee-700" />
                <div>
                  <span className="font-serif text-3xl font-extrabold text-caramel">4.9★</span>
                  <p className="text-xs text-coffee-200 uppercase tracking-wider font-medium">Guest Rating</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
