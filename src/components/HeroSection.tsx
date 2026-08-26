import { motion } from 'framer-motion';
import { MapPin, ChevronDown, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenOrderModal: () => void;
}

export default function HeroSection({ onOpenOrderModal }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 overflow-hidden bg-espresso">
      {/* Cinematic Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80"
          alt="Brew & Bean Café Barista Coffee Pouring"
          className="w-full h-full object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/80 to-espresso/40" />
      </div>

      {/* Top Tagline Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-7xl mx-auto w-full text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coffee-950/80 border border-caramel/40 backdrop-blur-md text-xs font-semibold tracking-widest text-caramel uppercase shadow-glow">
          <Sparkles className="w-3.5 h-3.5" /> Artisan Handcrafted Roasts
        </span>
      </motion.div>

      {/* Hero Headline & Intro Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-extrabold text-cream tracking-tight leading-[1.1]"
        >
          Where Every Sip <br />
          <span className="bg-gradient-to-r from-cream via-caramel to-coffee-300 bg-clip-text text-transparent italic">
            Feels Like Home.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 text-base md:text-xl text-coffee-200/90 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Freshly brewed coffee, handcrafted food, and moments worth slowing down for.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onOpenOrderModal}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-caramel to-coffee-600 hover:from-coffee-500 hover:to-caramel text-white font-semibold text-sm uppercase tracking-wider shadow-glow hover:shadow-3d transition-all hover:scale-105"
          >
            Order Now & Reserve
          </button>
          <a
            href="#location"
            className="px-8 py-4 rounded-full bg-espresso/80 border border-coffee-600 hover:bg-coffee-900 text-cream font-semibold text-sm uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-caramel" />
            Visit Us
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex flex-col items-center gap-2 text-coffee-300 text-xs uppercase tracking-widest"
      >
        <span>Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="w-5 h-5 text-caramel" />
        </motion.div>
      </motion.div>
    </section>
  );
}
