import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ShoppingBag } from 'lucide-react';

interface FoodItem {
  id: string;
  category: 'Breakfast' | 'Snacks' | 'Sandwiches' | 'Pasta' | 'Desserts';
  name: string;
  price: number;
  description: string;
  image: string;
}

const foodCategories = ['Breakfast', 'Snacks', 'Sandwiches', 'Pasta', 'Desserts'] as const;

const foodMenuItems: FoodItem[] = [
  {
    id: 'f1',
    category: 'Breakfast',
    name: 'Classic Pancakes',
    price: 220,
    description: 'Fluffy golden buttermilk pancakes stacked with maple syrup and whipped butter.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f2',
    category: 'Sandwiches',
    name: 'Paneer Sandwich',
    price: 180,
    description: 'Grilled sourdough layered with spiced cottage cheese, mint chutney, and veggies.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f3',
    category: 'Sandwiches',
    name: 'Chicken Sandwich',
    price: 220,
    description: 'Smoked pulled chicken, melted cheddar, crisp lettuce, and herb aioli in ciabatta.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f4',
    category: 'Pasta',
    name: 'Creamy Alfredo Pasta',
    price: 280,
    description: 'Penne tossed in rich parmesan garlic cream sauce with sautéed mushrooms.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3def616409e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f5',
    category: 'Desserts',
    name: 'Chocolate Brownie',
    price: 160,
    description: 'Warm fudgy Belgian chocolate brownie served with vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f6',
    category: 'Desserts',
    name: 'Cheesecake',
    price: 220,
    description: 'New York style velvety baked cheesecake over a buttery graham cracker crust.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f7',
    category: 'Snacks',
    name: 'Garlic Butter Croissant',
    price: 150,
    description: 'Flaky French pastry infused with fresh garlic herb butter and sea salt.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'f8',
    category: 'Breakfast',
    name: 'Avocado Toast',
    price: 240,
    description: 'Smashed avocado, poached egg, chili flakes, and microgreens on toasted artisan bread.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
  },
];

interface FoodMenuProps {
  onSelectItem: (item: FoodItem) => void;
}

export default function FoodMenu({ onSelectItem }: FoodMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Breakfast');

  const filteredItems = foodMenuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="food-menu" className="py-28 bg-espresso border-t border-coffee-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-2">
            <Utensils className="w-4 h-4" /> Freshly Baked & Cooked
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-2">
            Handcrafted Food Menu
          </h2>
          <p className="text-coffee-300 mt-3 text-sm md:text-base font-sans">
            Prepared fresh to pair perfectly with your favorite hot or iced coffee.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
          {foodCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-caramel text-white shadow-glow'
                  : 'bg-coffee-900/80 text-coffee-300 hover:text-cream border border-coffee-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-coffee-950/80 border border-coffee-800/80 hover:border-caramel/40 transition-all shadow-xl group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-md"
                />

                <div className="flex-1 w-full flex flex-col justify-between">
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

                  <button
                    onClick={() => onSelectItem(item)}
                    className="mt-4 self-start px-4 py-2 rounded-xl bg-coffee-800 hover:bg-caramel text-cream font-medium text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Order
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
