import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CoffeeScene from './components/CoffeeScene';
import HeroOverlay from './components/HeroOverlay';
import StorySection from './components/StorySection';
import DynamicMenuSection, { type MenuItemData } from './components/DynamicMenuSection';
import CafeExperience from './components/CafeExperience';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import SpecialOffer from './components/SpecialOffer';
import Gallery from './components/Gallery';
import Location from './components/Location';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import TableReservationModal from './components/TableReservationModal';
import EventsSection from './components/EventsSection';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);

  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const isStaffRoute = window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/staff');

  useEffect(() => {
    fetchMenuData();

    const handleScroll = () => {
      const maxScroll = window.innerHeight * 1.5;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      setScrollProgress(progress);
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
      console.error('API menu fetch error:', e);
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
    return <AdminDashboard />;
  }

  return (
    <div className="relative min-h-screen bg-espresso text-cream selection:bg-caramel selection:text-white bg-noise">
      <Navbar
        onOpenOrderModal={() => setIsCartModalOpen(true)}
        onOpenReservationModal={() => setIsReservationModalOpen(true)}
      />

      <div id="hero" className="relative h-[220vh] w-full">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          <CoffeeScene scrollProgress={scrollProgress} />
          <HeroOverlay
            scrollProgress={scrollProgress}
            onOpenReservationModal={() => setIsReservationModalOpen(true)}
          />
        </div>
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

        <CafeExperience />
        <WhyUs />
        <Testimonials />

        <SpecialOffer onOpenOrderModal={() => setIsCartModalOpen(true)} />

        <EventsSection />

        <Gallery />
        <Location />

        <FinalCTA
          onOpenOrderModal={() => setIsCartModalOpen(true)}
          onOpenReservationModal={() => setIsReservationModalOpen(true)}
        />
      </main>

      <Footer />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        menuItems={menuItems}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <TableReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      />
    </div>
  );
}
