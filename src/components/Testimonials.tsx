import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Coffee Enthusiast & Architect',
    rating: 5,
    comment: 'The Caramel Macchiato here is unmatched. You can literally taste the quality of the freshly roasted beans. The 3D vibe of the space is just incredible.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Creative Director',
    rating: 5,
    comment: 'My go-to spot for afternoon work sessions! The atmosphere is cozy, music is perfect, and their Alfredo Pasta paired with Cold Coffee is pure perfection.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rohan Mehta',
    role: 'Tech Lead',
    rating: 5,
    comment: 'Brew & Bean has ruined all other coffee shops for me! Once you try their signature Cappuccino and warm brownie, there is no going back.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-coffee-950 border-t border-coffee-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs">
            Guest Experiences
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
            What Our Visitors Say
          </h2>
          <p className="text-coffee-300 mt-3 text-sm md:text-base">
            Real stories from coffee lovers who make Brew & Bean their daily sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-3xl bg-espresso/80 border border-coffee-800/80 hover:border-caramel/50 transition-all flex flex-col justify-between shadow-2xl relative group"
            >
              <Quote className="w-10 h-10 text-caramel/20 absolute top-6 right-6 group-hover:text-caramel/40 transition-colors" />

              <div>
                <div className="flex items-center gap-1 text-caramel">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-coffee-200 text-sm italic mt-6 leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-coffee-800/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-caramel"
                />
                <div>
                  <h4 className="font-serif text-cream font-bold text-base">{t.name}</h4>
                  <p className="text-coffee-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
