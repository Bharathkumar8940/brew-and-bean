import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    title: 'Pour-Over Precision',
    category: 'Coffee Art',
  },
  {
    src: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    title: 'Velvet Latte Art',
    category: 'Barista',
  },
  {
    src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    title: 'Chocolate Cheesecake',
    category: 'Dessert',
  },
  {
    src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    title: 'Whole Roasted Beans',
    category: 'Beans',
  },
  {
    src: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80',
    title: 'Evening Café Ambiance',
    category: 'Atmosphere',
  },
  {
    src: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80',
    title: 'Warm Wooden Tables',
    category: 'Interior',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-coffee-950 border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-2">
            <Camera className="w-4 h-4" /> Visual Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
            Café Moments & Gallery
          </h2>
          <p className="text-coffee-300 mt-3 text-sm md:text-base">
            Take a glance into our daily rituals, freshly baked treats, and warm evening glow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-2xl border border-coffee-800/80 cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-bold uppercase tracking-widest text-caramel">
                  {img.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-cream mt-0.5">
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
