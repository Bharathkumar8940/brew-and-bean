import { motion } from 'framer-motion';
import { Coffee, ShieldCheck, Flame, Utensils, Wifi, Calendar, Sparkles } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

const iconMap: Record<string, any> = {
  Flame,
  Utensils,
  Wifi,
  Calendar,
  ShieldCheck,
  Coffee,
};

export default function WhyUs() {
  return (
    <section className="py-24 bg-espresso border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Why Guests Come Back
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-2">
            The Craft Café Advantage
          </h2>
          <p className="text-coffee-300 mt-3 text-xs sm:text-base">
            Every detail is designed to make your visit comforting, productive, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {defaultCafeConfig.benefits.map((feat, idx) => {
            const Icon = iconMap[feat.iconName] || Coffee;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-coffee-950/80 border border-coffee-800/80 hover:border-caramel/50 transition-all group hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-coffee-800 to-caramel flex items-center justify-center text-white shadow-glow group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-cream mt-5 group-hover:text-caramel transition-colors leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-coffee-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
