import { motion } from 'framer-motion';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

export default function StorySection() {
  return (
    <section id="story" className="relative py-24 sm:py-28 bg-espresso overflow-hidden border-t border-coffee-900">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-coffee-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> {defaultCafeConfig.brand.storyTitle}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-3 leading-tight">
              {defaultCafeConfig.brand.storyHeading}
            </h2>

            <p className="mt-6 text-coffee-200 text-base md:text-lg leading-relaxed font-sans">
              {defaultCafeConfig.brand.storyParagraph1}
            </p>

            <p className="mt-4 text-coffee-300 text-sm md:text-base leading-relaxed">
              {defaultCafeConfig.brand.storyParagraph2}
            </p>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-coffee-800/80">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Master Roasts</h4>
                  <p className="text-xs text-coffee-300 mt-1">Ethically sourced Arabica beans roasted for peak crema.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coffee-800/80 border border-coffee-700 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">Handcrafted Food</h4>
                  <p className="text-xs text-coffee-300 mt-1">Sourdough breads, delicate croissants & pasta baked daily.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-coffee-700/50">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80"
                alt="Brewing artisanal espresso at Brew and Bean Cafe"
                loading="lazy"
                className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 rounded-2xl bg-espresso/90 backdrop-blur-md border border-coffee-700/60 flex items-center justify-between text-center">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-caramel">100%</span>
                  <p className="text-[10px] sm:text-xs text-coffee-200 uppercase tracking-wider font-medium">Arabica Beans</p>
                </div>
                <div className="h-8 sm:h-10 w-[1px] bg-coffee-700" />
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-caramel">15+</span>
                  <p className="text-[10px] sm:text-xs text-coffee-200 uppercase tracking-wider font-medium">Brew Styles</p>
                </div>
                <div className="h-8 sm:h-10 w-[1px] bg-coffee-700" />
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-caramel">Demo</span>
                  <p className="text-[10px] sm:text-xs text-coffee-200 uppercase tracking-wider font-medium">Sample Metric</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
