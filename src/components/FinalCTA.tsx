import { motion } from 'framer-motion';
import { Coffee, Calendar, ShoppingBag } from 'lucide-react';

interface FinalCTAProps {
  onOpenOrderModal: () => void;
  onOpenReservationModal: () => void;
}

export default function FinalCTA({ onOpenOrderModal, onOpenReservationModal }: FinalCTAProps) {
  return (
    <section className="py-32 bg-gradient-to-b from-coffee-950 via-espresso to-black relative overflow-hidden border-t border-coffee-900 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-caramel/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-coffee-800 to-caramel flex items-center justify-center mx-auto shadow-glow mb-6">
            <Coffee className="w-8 h-8 text-cream" />
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-extrabold text-cream leading-tight">
            Your Table Is Waiting.
          </h2>

          <p className="text-coffee-200 text-base md:text-xl mt-6 max-w-xl mx-auto font-sans leading-relaxed">
            Come in for the coffee. Stay for the moments.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <button
              onClick={onOpenReservationModal}
              className="px-9 py-4 rounded-full bg-gradient-to-r from-caramel to-coffee-600 hover:from-coffee-500 hover:to-caramel text-white font-bold text-xs uppercase tracking-widest shadow-glow hover:shadow-3d transition-all hover:scale-105 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book a Table
            </button>

            <button
              onClick={onOpenOrderModal}
              className="px-9 py-4 rounded-full bg-espresso/90 border border-coffee-700 hover:bg-coffee-900 text-cream font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-caramel" /> View Menu & Order
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
