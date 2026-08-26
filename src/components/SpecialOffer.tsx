import { ArrowRight, Gift, Sparkles } from 'lucide-react';

interface SpecialOfferProps {
  onOpenOrderModal: () => void;
}

export default function SpecialOffer({ onOpenOrderModal }: SpecialOfferProps) {
  return (
    <section id="special-offer" className="py-24 bg-espresso border-t border-coffee-900 relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-espresso to-coffee-950 opacity-90" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-caramel/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="shine-sweep-container rounded-3xl bg-gradient-to-r from-coffee-900 via-coffee-800 to-caramel/90 p-8 md:p-14 border border-amber-400/50 shadow-glow flex flex-col lg:flex-row items-center justify-between gap-10 shine-gold-border">
          
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-espresso/90 text-amber-300 font-semibold text-xs uppercase tracking-widest border border-amber-400/40 shadow-glow">
              <Gift className="w-4 h-4 text-amber-300 animate-pulse" /> Limited Time Combo Offer <Sparkles className="w-3 h-3 text-amber-300" />
            </span>

            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-cream mt-4 leading-tight">
              Your Perfect Coffee Break
            </h2>

            <p className="text-coffee-100 text-base md:text-lg mt-3 leading-relaxed">
              Pair your favorite handcrafted coffee with a freshly made artisanal dessert and enjoy <span className="shine-text-gold font-bold text-xl">20% OFF</span> every weekday afternoon with code <span className="font-bold text-amber-300 underline tracking-wider">WELCOME50</span>!
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onOpenOrderModal}
              className="shine-sweep-container px-9 py-4 rounded-full bg-gradient-to-r from-cream via-amber-100 to-cream hover:bg-white text-espresso font-extrabold text-xs uppercase tracking-widest shadow-3d hover:scale-105 transition-all flex items-center justify-center gap-2 border border-amber-200"
            >
              Explore Offers <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
