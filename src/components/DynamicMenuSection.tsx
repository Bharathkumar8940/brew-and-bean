import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ShoppingBag, Plus, Minus } from 'lucide-react';

export interface MenuItemData {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVegetarian: boolean;
  isPopular: boolean;
  isAvailable: boolean;
}

interface MenuSectionProps {
  categories: any[];
  menuItems: MenuItemData[];
  cart: { [key: string]: number };
  onAddToCart: (item: MenuItemData) => void;
  onRemoveFromCart: (itemId: string) => void;
  onOpenCartModal: () => void;
}

export default function DynamicMenuSection({
  categories,
  menuItems,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCartModal,
}: MenuSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('cat-1');

  const filteredItems = menuItems.filter(item => item.categoryId === activeCategoryId);
  const totalCartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <section id="food-menu" className="py-28 bg-espresso border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-2">
            <Utensils className="w-4 h-4" /> Live Café Menu
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
            Artisanal Food & Coffee Menu
          </h2>
          <p className="text-coffee-300 mt-3 text-sm md:text-base font-sans">
            Freshly prepared by our baristas and culinary team. All items managed dynamically from our backend database.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategoryId === cat.id
                  ? 'bg-caramel text-white shadow-glow'
                  : 'bg-coffee-950/80 text-coffee-300 hover:text-cream border border-coffee-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => {
              const qtyInCart = cart[item.id] || 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-coffee-950/90 border border-coffee-800/80 hover:border-caramel/40 transition-all shadow-xl group relative"
                >
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {item.isVegetarian && (
                      <span className="w-5 h-5 rounded-full bg-emerald-900/90 border border-emerald-400 flex items-center justify-center text-[10px] text-emerald-400 font-bold" title="Vegetarian">
                        🌱
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-caramel text-white text-[10px] font-bold uppercase tracking-wider">
                        Bestseller
                      </span>
                    )}
                  </div>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-36 h-36 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md"
                  />

                  <div className="flex-1 w-full flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl font-bold text-cream group-hover:text-caramel transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-serif text-xl font-bold text-caramel">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-coffee-300 text-xs mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[11px] text-coffee-400 uppercase tracking-wider">
                        {item.isAvailable ? 'Available' : 'Sold Out'}
                      </span>

                      {qtyInCart === 0 ? (
                        <button
                          onClick={() => onAddToCart(item)}
                          disabled={!item.isAvailable}
                          className="px-4 py-2 rounded-xl bg-coffee-800 hover:bg-caramel disabled:opacity-50 text-cream font-medium text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 bg-coffee-900 border border-caramel/50 rounded-xl px-3 py-1.5">
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="p-1 text-cream hover:text-caramel"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold text-caramel">{qtyInCart}</span>
                          <button
                            onClick={() => onAddToCart(item)}
                            className="p-1 text-cream hover:text-caramel"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {totalCartCount > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={onOpenCartModal}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-caramel to-coffee-600 text-white font-bold text-sm uppercase tracking-wider shadow-glow hover:shadow-3d transition-all flex items-center gap-3 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>View Cart ({totalCartCount} items)</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
