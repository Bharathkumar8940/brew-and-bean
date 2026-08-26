import { Coffee, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = "918639098389";

  return (
    <footer className="bg-espresso border-t border-coffee-900/80 pt-16 pb-12 text-coffee-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-coffee-900">
          
          <div className="md:col-span-1">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-coffee-800 to-caramel flex items-center justify-center">
                <Coffee className="w-5 h-5 text-cream" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-cream">
                BREW & BEAN
              </span>
            </a>
            <p className="text-xs text-coffee-400 mt-4 leading-relaxed">
              Craft coffee shop serving single-origin roasts, handmade pasta, and fresh desserts.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-cream font-bold text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li><a href="#hero" className="hover:text-caramel transition-colors">Hero Experience</a></li>
              <li><a href="#story" className="hover:text-caramel transition-colors">Our Story</a></li>
              <li><a href="#signature-coffee" className="hover:text-caramel transition-colors">Signature Coffee</a></li>
              <li><a href="#food-menu" className="hover:text-caramel transition-colors">Food Menu</a></li>
              <li><a href="#experience" className="hover:text-caramel transition-colors">Café Experience</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-cream font-bold text-sm uppercase tracking-wider">Visit Us</h4>
            <p className="text-xs text-coffee-400 mt-4 leading-relaxed">
              Plot 42, Heritage Boulevard, Indiranagar, Bengaluru
            </p>
            <p className="text-xs text-coffee-400 mt-2">
              Hours: 9:00 AM – 10:30 PM
            </p>
            <p className="text-xs text-caramel mt-2 font-medium">
              +91 86390 98389
            </p>
          </div>

          <div>
            <h4 className="font-serif text-cream font-bold text-sm uppercase tracking-wider">Follow Our Journal</h4>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Brew & Bean Café, I have a query about your menu.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-coffee-900 border border-coffee-800 flex items-center justify-center hover:bg-caramel hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-green-500" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-coffee-400">
          <p>© {new Date().getFullYear()} Brew & Bean Café. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Brewed with <Heart className="w-3.5 h-3.5 text-caramel fill-current" /> in Bengaluru
          </p>
        </div>

      </div>
    </footer>
  );
}
