import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Sparkles, Utensils } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

interface HeroOverlayProps {
  scrollProgress: number;
  onOpenReservationModal: () => void;
}

export default function HeroOverlay({ scrollProgress, onOpenReservationModal }: HeroOverlayProps) {
  const opacity = Math.max(0, 1 - scrollProgress * 2.5);

  return (
    <div
      style={{ opacity, pointerEvents: opacity <= 0.05 ? 'none' : 'auto' }}
      className="absolute inset-0 z-20 flex flex-col justify-between px-4 sm:px-6 pt-32 pb-10 transition-opacity duration-300 pointer-events-none"
    >
      {/* Top Eyebrow Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto w-full text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-espresso/80 border border-caramel/60 backdrop-blur-md text-[10px] sm:text-xs font-semibold tracking-widest text-caramel uppercase shine-gold-border shadow-glow">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span className="shine-text-gold">{defaultCafeConfig.brand.eyebrow}</span>
        </span>
      </motion.div>

      {/* Main Hero Typography */}
      <div className="max-w-4xl mx-auto w-full text-center my-auto px-2">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-cream tracking-tight leading-[1.1]"
        >
          {defaultCafeConfig.brand.heroHeading.line1} <br />
          <span className="shine-text-gold italic font-bold">
            {defaultCafeConfig.brand.heroHeading.line2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-coffee-200/90 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          {defaultCafeConfig.brand.heroSubtext}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto"
        >
          <button
            onClick={onOpenReservationModal}
            className="shine-sweep-container px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-glow hover:shadow-3d transition-all hover:scale-105 flex items-center gap-2 border border-amber-400/40 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <Calendar className="w-4 h-4" /> BOOK A TABLE
          </button>

          <a
            href="#food-menu"
            className="shine-sweep-container px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-espresso/90 border border-coffee-600 hover:border-caramel hover:bg-coffee-900 text-cream font-semibold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-caramel"
          >
            <Utensils className="w-4 h-4 text-caramel" /> EXPLORE MENU
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="flex flex-col items-center gap-1.5 text-coffee-300 text-[10px] sm:text-xs uppercase tracking-widest"
      >
        <span className="shine-text-gold font-semibold">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-caramel" />
        </motion.div>
      </motion.div>
    </div>
  );
}
