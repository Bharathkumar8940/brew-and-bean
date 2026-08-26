import { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, Calendar, Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onOpenReservationModal: () => void;
}

export default function Navbar({ onOpenOrderModal, onOpenReservationModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#story' },
    { name: 'Menu', href: '#food-menu' },
    { name: 'Reservations', href: '#reservations-section' },
    { name: 'Experience', href: '#experience' },
    { name: 'Offers', href: '#special-offer' },
    { name: 'Events', href: '#events-section' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#location' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-espresso/90 backdrop-blur-md border-b border-coffee-800/80 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo with Shining Glow */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-coffee-800 via-caramel to-amber-400 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform shine-gold-border">
            <Coffee className="w-5 h-5 text-cream animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-wider text-cream group-hover:text-caramel transition-colors shine-text-gold">
              BREW & BEAN
            </span>
            <span className="text-[10px] tracking-[0.25em] text-coffee-300 uppercase -mt-1 flex items-center gap-1">
              Craft Café <Sparkles className="w-2.5 h-2.5 text-caramel inline" />
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium uppercase tracking-wider text-cream/80 hover:text-caramel transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-caramel hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons with Shining Shimmer */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/admin"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-coffee-300 hover:text-caramel transition-colors px-3.5 py-2 border border-coffee-800 rounded-full hover:border-caramel/50 backdrop-blur-sm"
          >
            <Shield className="w-3.5 h-3.5" /> Staff Portal
          </a>

          <button
            onClick={onOpenReservationModal}
            className="shine-sweep-container flex items-center gap-1.5 border border-caramel/70 hover:bg-caramel/20 text-cream text-xs uppercase tracking-wider font-semibold px-4.5 py-2.5 rounded-full transition-all shadow-glow"
          >
            <Calendar className="w-3.5 h-3.5 text-caramel" />
            Book a Table
          </button>

          <button
            onClick={onOpenOrderModal}
            className="shine-sweep-container flex items-center gap-1.5 bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel text-white text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full shadow-glow hover:shadow-3d transition-all hover:scale-105 border border-amber-300/30"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Order Online
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-cream hover:text-caramel focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-espresso/98 backdrop-blur-xl border-b border-coffee-800 px-6 py-6 transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-cream hover:text-caramel transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-coffee-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservationModal();
                }}
                className="shine-sweep-container w-full flex items-center justify-center gap-2 border border-caramel text-cream py-3 rounded-full font-medium"
              >
                <Calendar className="w-4 h-4 text-caramel" />
                Book a Table
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="shine-sweep-container w-full flex items-center justify-center gap-2 bg-caramel text-white py-3 rounded-full font-medium shadow-glow"
              >
                <ShoppingBag className="w-4 h-4" />
                Order Online
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
