import { motion } from 'framer-motion';
import { ShoppingBag, Flame } from 'lucide-react';

interface CoffeeItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag: string;
  intensity: number;
}

const signatureCoffees: CoffeeItem[] = [
  {
    id: 'c1',
    name: 'Espresso',
    price: 120,
    description: 'Rich, full-bodied single shot brewed under high pressure with thick golden crema.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    tag: 'Classic',
    intensity: 5,
  },
  {
    id: 'c2',
    name: 'Cappuccino',
    price: 160,
    description: 'Equal harmony of rich espresso, silky steamed milk, and dense airy microfoam.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    tag: 'Bestseller',
    intensity: 3,
  },
  {
    id: 'c3',
    name: 'Café Latte',
    price: 170,
    description: 'Smooth espresso gently poured over generous steamed velvet milk with delicate art.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    tag: 'Popular',
    intensity: 2,
  },
  {
    id: 'c4',
    name: 'Cold Coffee',
    price: 180,
    description: 'Blended espresso, chilled full-cream milk, vanilla ice cream, and dark cocoa dust.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    tag: 'Refreshing',
    intensity: 3,
  },
  {
    id: 'c5',
    name: 'Mocha',
    price: 190,
    description: 'Decadent espresso combined with rich Belgian cocoa syrup and steamed milk foam.',
    image: 'https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?auto=format&fit=crop&w=600&q=80',
    tag: 'Sweet & Strong',
    intensity: 4,
  },
  {
    id: 'c6',
    name: 'Caramel Macchiato',
    price: 210,
    description: 'Freshly steamed milk marked with espresso and finished with handmade caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
    tag: 'Chef Signature',
    intensity: 3,
  },
];

interface SignatureCoffeeProps {
  onSelectItem: (item: CoffeeItem) => void;
}

export default function SignatureCoffee({ onSelectItem }: SignatureCoffeeProps) {
  return (
    <section id="signature-coffee" className="py-28 bg-coffee-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-2">
            <Flame className="w-4 h-4" /> Artisanal Brews
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
            Signature Coffee Selection
          </h2>
          <p className="text-coffee-300 mt-4 text-sm md:text-base font-sans">
            Handcrafted with precision by our master baristas using ethically harvested 100% Arabica beans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {signatureCoffees.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group rounded-3xl bg-espresso/80 border border-coffee-800/60 overflow-hidden shadow-2xl hover:border-caramel/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-caramel/90 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                    {item.tag}
                  </span>

                  <span className="absolute bottom-4 right-4 font-serif text-2xl font-bold text-cream bg-espresso/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-coffee-700">
                    ₹{item.price}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-cream group-hover:text-caramel transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-caramel">
                      {[...Array(item.intensity)].map((_, i) => (
                        <span key={i}>☕</span>
                      ))}
                    </div>
                  </div>

                  <p className="text-coffee-300 text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onSelectItem(item)}
                  className="w-full py-3 rounded-2xl bg-coffee-800/80 hover:bg-caramel text-cream font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-glow"
                >
                  <ShoppingBag className="w-4 h-4" /> Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
