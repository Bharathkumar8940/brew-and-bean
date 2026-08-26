import { motion } from 'framer-motion';

export default function CafeExperience() {
  return (
    <section id="experience" className="py-28 bg-coffee-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-caramel/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs">
            Atmosphere & Ambience
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
            The Brew & Bean Experience
          </h2>
          <p className="text-coffee-300 mt-4 text-sm md:text-base">
            Warm wooden finishes, subtle ambient jazz, fragrant roasted aromas, and comfortable seating designed for endless conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 border border-coffee-800/80 shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
              alt="Warm café interior"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-caramel text-xs font-bold uppercase tracking-widest">Cozy Spaces</span>
              <h3 className="font-serif text-2xl font-bold text-cream mt-1">Warm Café Interior</h3>
              <p className="text-coffee-300 text-xs mt-2">Soft yellow lights, acoustic vibes, and comfortable leather seating.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 border border-coffee-800/80 shadow-2xl md:-translate-y-6"
          >
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
              alt="Artisan Barista preparing coffee"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-caramel text-xs font-bold uppercase tracking-widest">Master Craft</span>
              <h3 className="font-serif text-2xl font-bold text-cream mt-1">Artisan Baristas</h3>
              <p className="text-coffee-300 text-xs mt-2">Precision extraction and customized roast profiles for your taste.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative rounded-3xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 border border-coffee-800/80 shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
              alt="Freshly baked artisan pastries"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
            <div className="relative z-10">
              <span className="text-caramel text-xs font-bold uppercase tracking-widest">Fresh Bakery</span>
              <h3 className="font-serif text-2xl font-bold text-cream mt-1">Handmade Delights</h3>
              <p className="text-coffee-300 text-xs mt-2">Baked every morning with French butter and fine chocolate.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
