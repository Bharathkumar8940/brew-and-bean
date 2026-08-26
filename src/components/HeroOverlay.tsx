import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Sparkles } from 'lucide-react';

interface HeroOverlayProps {
  scrollProgress: number;
  onOpenReservationModal: () => void;
}

export default function HeroOverlay({ scrollProgress, onOpenReservationModal }: HeroOverlayProps) {
  const opacity = Math.max(0, 1 - scrollProgress * 3.2);

  return (
    <div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-6 pt-28 pb-12 transition-opacity duration-300"
    >
      {/* Top Shining Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto w-full text-center"
      >
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-espresso/80 border border-caramel/60 backdrop-blur-md text-xs font-semibold tracking-widest text-caramel uppercase shine-gold-border shadow-glow">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span className="shine-text-gold">Handcrafted Micro-Roasts</span>
        </span>
      </motion.div>

      {/* Main Hero Headlines with Shining Gold Effect */}
      <div className="max-w-4xl mx-auto w-full text-center my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-extrabold text-cream tracking-tight leading-[1.1]"
        >
          Where Every Sip <br />
          <span className="shine-text-gold italic font-bold">
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

        {/* Shining Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <button
            onClick={onOpenReservationModal}
            className="shine-sweep-container px-8 py-4 rounded-full bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel text-white font-bold text-sm uppercase tracking-wider shadow-glow hover:shadow-3d transition-all hover:scale-105 flex items-center gap-2 border border-amber-400/40"
          >
            <Calendar className="w-4 h-4" /> Book a Table
          </button>

          <a
            href="#food-menu"
            className="shine-sweep-container px-8 py-4 rounded-full bg-espresso/90 border border-coffee-600 hover:border-caramel hover:bg-coffee-900 text-cream font-semibold text-sm uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105"
          >
            Explore Menu
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="flex flex-col items-center gap-2 text-coffee-300 text-xs uppercase tracking-widest"
      >
        <span className="shine-text-gold font-semibold">Scroll to pour</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="w-5 h-5 text-caramel" />
        </motion.div>
      </motion.div>
    </div>
  );
}
