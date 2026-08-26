import { motion } from 'framer-motion';
import { Flame, ShieldCheck, Armchair, Heart } from 'lucide-react';

const features = [
  {
    icon: Flame,
    title: 'Freshly Roasted Beans',
    description: 'Ethically harvested 100% Arabica beans roasted in micro-batches every single morning.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Ingredients',
    description: 'Pure organic milk, single-origin cacao, natural syrups, and zero artificial flavors.',
  },
  {
    icon: Armchair,
    title: 'Cozy Atmosphere',
    description: 'Ergonomic seating, fast Wi-Fi, ambient warm lighting, and acoustic background tunes.',
  },
  {
    icon: Heart,
    title: 'Made With Love',
    description: 'Every cup is poured with passionate barista artistry to brighten your day.',
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-espresso border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs">
            Our Promise
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
            Why Brew & Bean?
          </h2>
          <p className="text-coffee-300 mt-3 text-sm md:text-base">
            We are dedicated to elevating every single aspect of your café visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-coffee-950/80 border border-coffee-800/80 hover:border-caramel/50 transition-all group hover:-translate-y-2 shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-coffee-800 to-caramel flex items-center justify-center text-white shadow-glow group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-serif text-xl font-bold text-cream mt-6 group-hover:text-caramel transition-colors">
                  {feat.title}
                </h3>

                <p className="text-coffee-300 text-xs md:text-sm mt-3 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
