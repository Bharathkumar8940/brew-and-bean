import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ShoppingBag, Plus, Minus } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

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
  categories?: any[];
  menuItems?: MenuItemData[];
  cart: { [key: string]: number };
  onAddToCart: (item: MenuItemData) => void;
  onRemoveFromCart: (itemId: string) => void;
  onOpenCartModal: () => void;
}

export default function DynamicMenuSection({
  categories = defaultCafeConfig.menuCategories,
  menuItems = defaultCafeConfig.menuItems,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCartModal,
}: MenuSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || 'coffee');

  const itemsToDisplay = menuItems.length > 0 ? menuItems : defaultCafeConfig.menuItems;
  const filteredItems = itemsToDisplay.filter(item => item.categoryId === activeCategoryId);
  const totalCartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <section id="food-menu" className="py-24 sm:py-28 bg-espresso border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-2">
            <Utensils className="w-4 h-4" /> Artisanal Menu (Demo Showcase)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-2">
            Craft Coffee & Bakery Selection
          </h2>
          <p className="text-coffee-300 mt-3 text-xs sm:text-base font-sans leading-relaxed">
            Organized demo menu items with category filters, dietary indicators, and customizable pricing models.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 sm:mt-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-caramel ${
                activeCategoryId === cat.id
                  ? 'bg-caramel text-white shadow-glow'
                  : 'bg-coffee-950/80 text-coffee-300 hover:text-cream border border-coffee-800/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => {
              const qtyInCart = cart[item.id] || 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col sm:flex-row items-center gap-5 p-5 sm:p-6 rounded-3xl bg-coffee-950/90 border border-coffee-800/80 hover:border-caramel/40 transition-all shadow-xl group relative"
                >
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {item.isVegetarian && (
                      <span className="w-5 h-5 rounded-full bg-emerald-950/90 border border-emerald-500/60 flex items-center justify-center text-[10px] text-emerald-400 font-bold" title="Vegetarian">
                        🌱
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-caramel text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Bestseller
                      </span>
                    )}
                  </div>

                  <img
                    src={item.image}
                    alt={`${item.name} at Brew and Bean`}
                    loading="lazy"
                    className="w-full sm:w-36 h-40 sm:h-36 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md"
                  />

                  <div className="flex-1 w-full flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-cream group-hover:text-caramel transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-serif text-lg sm:text-xl font-bold text-caramel">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-coffee-300 text-xs mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-5 flex items-center justify-between pt-3 border-t border-coffee-900/60">
                      <span className="text-[10px] text-coffee-400 uppercase tracking-wider font-medium">
                        {item.isAvailable ? 'Available' : 'Sold Out'}
                      </span>

                      {qtyInCart === 0 ? (
                        <button
                          onClick={() => onAddToCart(item)}
                          disabled={!item.isAvailable}
                          className="px-3.5 py-2 rounded-xl bg-coffee-800/90 hover:bg-caramel disabled:opacity-50 text-cream font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-caramel"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 bg-coffee-900 border border-caramel/50 rounded-xl px-3 py-1">
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="p-1 text-cream hover:text-caramel focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-caramel">{qtyInCart}</span>
                          <button
                            onClick={() => onAddToCart(item)}
                            className="p-1 text-cream hover:text-caramel focus:outline-none"
                            aria-label="Increase quantity"
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

        {/* Floating Cart Button */}
        {totalCartCount > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={onOpenCartModal}
              className="shine-sweep-container px-6 py-3.5 rounded-full bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:shadow-3d transition-all flex items-center gap-3 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-amber-300/40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Order Demo ({totalCartCount} items)</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
