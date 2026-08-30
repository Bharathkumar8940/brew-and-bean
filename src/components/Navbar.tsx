import { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, Calendar, Shield } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#story' },
    { name: 'Menu', href: '#food-menu' },
    { name: 'Reservations', href: '#reservations-section' },
    { name: 'Experience', href: '#experience' },
    { name: 'Events', href: '#events-section' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#location' },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-espresso/95 backdrop-blur-md border-b border-coffee-800/80 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-caramel rounded-lg">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-coffee-800 via-caramel to-amber-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform shine-gold-border">
            <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-cream animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-cream group-hover:text-caramel transition-colors shine-text-gold">
              {defaultCafeConfig.brand.name.toUpperCase()}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-coffee-300 uppercase -mt-1">
              {defaultCafeConfig.brand.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-cream/80 hover:text-caramel transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-caramel hover:after:w-full after:transition-all focus:outline-none focus:text-caramel"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2.5 sm:gap-3">
          <a
            href="./?page=admin"
            title="Staff & Admin Management Portal"
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-coffee-300 hover:text-caramel transition-colors px-3 py-2 border border-coffee-800/80 rounded-full hover:border-caramel/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-caramel"
          >
            <Shield className="w-3.5 h-3.5 text-caramel/80" /> Staff Portal
          </a>

          <button
            onClick={onOpenReservationModal}
            className="shine-sweep-container flex items-center gap-1.5 border border-caramel/70 hover:bg-caramel/20 text-cream text-[11px] uppercase tracking-wider font-semibold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all shadow-glow focus:outline-none focus:ring-2 focus:ring-caramel"
          >
            <Calendar className="w-3.5 h-3.5 text-caramel" />
            Book a Table
          </button>

          <button
            onClick={onOpenOrderModal}
            className="shine-sweep-container flex items-center gap-1.5 bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel text-white text-[11px] uppercase tracking-wider font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-glow hover:shadow-3d transition-all hover:scale-105 border border-amber-300/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Order Online
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-cream hover:text-caramel focus:outline-none focus:ring-2 focus:ring-caramel rounded-lg"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-espresso/98 backdrop-blur-xl border-b border-coffee-800 px-6 py-6 transition-all shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-cream/90 hover:text-caramel transition-colors py-1.5 border-b border-coffee-900/50"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="./?page=admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 border border-coffee-700 text-coffee-300 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                <Shield className="w-4 h-4 text-caramel" />
                Staff Portal
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservationModal();
                }}
                className="shine-sweep-container w-full flex items-center justify-center gap-2 border border-caramel text-cream py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4 text-caramel" />
                Book a Table
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal();
                }}
                className="shine-sweep-container w-full flex items-center justify-center gap-2 bg-caramel text-white py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-glow"
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
