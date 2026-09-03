import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import CoffeeScene from './components/CoffeeScene';
import HeroOverlay from './components/HeroOverlay';
import StorySection from './components/StorySection';
import DynamicMenuSection, { type MenuItemData } from './components/DynamicMenuSection';

// Lazy load non-critical below-the-fold components to improve mobile load speed & memory efficiency
const CafeExperience = lazy(() => import('./components/CafeExperience'));
const WhyUs = lazy(() => import('./components/WhyUs'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Gallery = lazy(() => import('./components/Gallery'));
const Location = lazy(() => import('./components/Location'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));
const CartModal = lazy(() => import('./components/CartModal'));
const TableReservationModal = lazy(() => import('./components/TableReservationModal'));
const EventsSection = lazy(() => import('./components/EventsSection'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const isStaffRoute = 
    window.location.pathname.includes('/admin') || 
    window.location.pathname.includes('/staff') ||
    urlParams.get('page') === 'admin' ||
    urlParams.get('page') === 'staff' ||
    window.location.hash.includes('admin');

  useEffect(() => {
    fetchMenuData();

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = window.innerHeight * 0.8;
          const currentScroll = window.scrollY;
          const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchMenuData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/menu');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
        setMenuItems(data.items);
      }
    } catch (e) {
      // Clean fallback if local server is not running
    }
  };

  const handleAddToCart = (item: MenuItemData) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  if (isStaffRoute) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-espresso flex items-center justify-center text-cream text-xs">Loading Staff Portal...</div>}>
        <AdminDashboard />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen bg-espresso text-cream selection:bg-caramel selection:text-white bg-noise">
      <Navbar
        onOpenOrderModal={() => setIsCartModalOpen(true)}
        onOpenReservationModal={() => setIsReservationModalOpen(true)}
      />

      <div id="hero" className="relative h-screen w-full overflow-hidden">
        <CoffeeScene />
        <HeroOverlay
          scrollProgress={scrollProgress}
          onOpenReservationModal={() => setIsReservationModalOpen(true)}
        />
      </div>

      <main className="relative z-30">
        <StorySection />
        
        <DynamicMenuSection
          categories={categories}
          menuItems={menuItems}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenCartModal={() => setIsCartModalOpen(true)}
        />

        <Suspense fallback={<div className="py-12 text-center text-xs text-coffee-400">Loading experience...</div>}>
          <CafeExperience />
          <WhyUs />
          <Testimonials />
          <EventsSection />
          <Gallery />
          <Location />
          <FinalCTA
            onOpenOrderModal={() => setIsCartModalOpen(true)}
            onOpenReservationModal={() => setIsReservationModalOpen(true)}
          />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />

        {isCartModalOpen && (
          <CartModal
            isOpen={isCartModalOpen}
            onClose={() => setIsCartModalOpen(false)}
            cart={cart}
            menuItems={menuItems}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        )}

        {isReservationModalOpen && (
          <TableReservationModal
            isOpen={isReservationModalOpen}
            onClose={() => setIsReservationModalOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
