import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-coffee-950 border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-2">
            <Camera className="w-4 h-4" /> Visual Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-2">
            Café Atmosphere & Moments
          </h2>
          <p className="text-coffee-300 mt-3 text-xs sm:text-base">
            Take a glance into our daily rituals, freshly baked pastries, and cozy evening lighting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
          {defaultCafeConfig.galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border border-coffee-800/80 cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-5 left-5 right-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-bold uppercase tracking-widest text-caramel">
                  {img.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-cream mt-0.5">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
