import { Coffee, MessageCircle, Heart } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

export default function Footer() {
  return (
    <footer className="bg-espresso border-t border-coffee-900/80 pt-16 pb-12 text-coffee-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-coffee-900">
          
          <div className="md:col-span-1">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-coffee-800 to-caramel flex items-center justify-center">
                <Coffee className="w-5 h-5 text-cream" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-cream">
                {defaultCafeConfig.brand.name.toUpperCase()}
              </span>
            </a>
            <p className="text-xs text-coffee-400 mt-4 leading-relaxed">
              Craft coffee shop serving single-origin roasts, handmade pasta, and fresh desserts.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-cream font-bold text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li><a href="#hero" className="hover:text-caramel transition-colors">Hero Experience</a></li>
              <li><a href="#story" className="hover:text-caramel transition-colors">Our Story</a></li>
              <li><a href="#food-menu" className="hover:text-caramel transition-colors">Artisanal Menu</a></li>
              <li><a href="#reservations-section" className="hover:text-caramel transition-colors">Table Reservations</a></li>
              <li><a href="#experience" className="hover:text-caramel transition-colors">Café Atmosphere</a></li>
              <li><a href="#events-section" className="hover:text-caramel transition-colors">Private Events</a></li>
              <li><a href="./?page=admin" className="hover:text-caramel transition-colors">Staff Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-cream font-bold text-sm uppercase tracking-wider">Our Location</h4>
            <p className="text-xs text-coffee-400 mt-4 leading-relaxed">
              {defaultCafeConfig.contact.address}
            </p>
            <p className="text-xs text-coffee-400 mt-2">
              Hours: {defaultCafeConfig.contact.openingHours.weekdays}
            </p>
            <p className="text-xs text-caramel mt-2 font-medium">
              {defaultCafeConfig.contact.phone}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-cream font-bold text-sm uppercase tracking-wider">Direct WhatsApp Inquiry</h4>
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`https://wa.me/${defaultCafeConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hi Brew & Bean Café, I have an inquiry about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-coffee-900 border border-coffee-800 flex items-center justify-center hover:bg-caramel hover:text-white transition-colors"
                title="WhatsApp Direct Contact"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>
              <span className="text-xs text-coffee-400">{defaultCafeConfig.contact.phone}</span>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-coffee-400 gap-2">
          <p>© {new Date().getFullYear()} {defaultCafeConfig.brand.name} Café. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-caramel fill-current" />
          </p>
        </div>

      </div>
    </footer>
  );
}
