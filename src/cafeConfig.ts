export interface CafeConfig {
  isDemo: boolean;
  demoNotice: string;
  brand: {
    name: string;
    tagline: string;
    eyebrow: string;
    heroHeading: {
      line1: string;
      line2: string;
    };
    heroSubtext: string;
    storyTitle: string;
    storyHeading: string;
    storyParagraph1: string;
    storyParagraph2: string;
  };
  contact: {
    address: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    openingHours: {
      weekdays: string;
      weekends: string;
    };
    googleMapsUrl: string;
  };
  menuCategories: Array<{ id: string; name: string }>;
  menuItems: Array<{
    id: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isVegetarian: boolean;
    isPopular: boolean;
    isAvailable: boolean;
  }>;
  galleryImages: Array<{
    id: string;
    title: string;
    category: string;
    url: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
}

export const defaultCafeConfig: CafeConfig = {
  isDemo: true,
  demoNotice: "BREW & BEAN — DEMO EXPERIENCE",
  brand: {
    name: "Brew & Bean",
    tagline: "Craft Café & Micro-Roasters",
    eyebrow: "HANDCRAFTED MICRO-ROASTS",
    heroHeading: {
      line1: "Where Every Sip",
      line2: "Feels Like Home."
    },
    heroSubtext: "Freshly brewed coffee, handcrafted food, and moments worth slowing down for.",
    storyTitle: "OUR HERITAGE",
    storyHeading: "More Than Coffee. A Warm Sanctuary.",
    storyParagraph1: "Founded on a passion for micro-batch roasting and artisanal baking, Brew & Bean brings together ethically harvested Arabica beans from high-altitude estates with rustic, handcrafted meals.",
    storyParagraph2: "Whether you need a quiet morning corner to work, an afternoon espresso break, or a warm venue to celebrate with friends, our space is thoughtfully designed to be your daily sanctuary."
  },
  contact: {
    address: "Plot 42, Heritage Boulevard, Indiranagar, Bengaluru, KA 560038",
    phone: "+91 86390 98389",
    whatsappNumber: "918639098389",
    email: "hello@brewandbean-demo.com",
    openingHours: {
      weekdays: "8:00 AM – 10:30 PM",
      weekends: "8:00 AM – 11:30 PM"
    },
    googleMapsUrl: "https://maps.google.com"
  },
  menuCategories: [
    { id: "coffee", name: "Coffee" },
    { id: "food", name: "Food" },
    { id: "desserts", name: "Desserts" },
    { id: "tea", name: "Tea & Drinks" }
  ],
  menuItems: [
    // Coffee
    {
      id: "c1",
      categoryId: "coffee",
      name: "Signature Espresso",
      description: "Rich, full-bodied double shot extracted from freshly roasted 100% Arabica beans.",
      price: 160,
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },
    {
      id: "c2",
      categoryId: "coffee",
      name: "Velvet Cappuccino",
      description: "Smooth espresso layered with velvety steamed milk and a delicate dusted cocoa top.",
      price: 210,
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },
    {
      id: "c3",
      categoryId: "coffee",
      name: "Caramel Macchiato",
      description: "Freshly steamed milk marked with espresso and finished with homemade caramel drizzle.",
      price: 240,
      image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },
    {
      id: "c4",
      categoryId: "coffee",
      name: "Classic Caffe Americano",
      description: "Double shot espresso diluted with hot water for a crisp, clean coffee profile.",
      price: 180,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: false,
      isAvailable: true
    },
    {
      id: "c5",
      categoryId: "coffee",
      name: "Dark Chocolate Mocha",
      description: "Espresso combined with rich single-origin melted chocolate and steamed milk.",
      price: 250,
      image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: false,
      isAvailable: true
    },
    {
      id: "c6",
      categoryId: "coffee",
      name: "18-Hour Cold Brew",
      description: "Steeped slowly in filtered cold water for 18 hours. Naturally sweet and smooth.",
      price: 220,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },

    // Food
    {
      id: "f1",
      categoryId: "food",
      name: "Butter Croissant",
      description: "Flaky, golden French butter croissant baked fresh every morning in-house.",
      price: 150,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },
    {
      id: "f2",
      categoryId: "food",
      name: "Artisanal Avocado Toast",
      description: "Toasted sourdough bread topped with mashed avocado, cherry tomatoes, and microgreens.",
      price: 290,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },
    {
      id: "f3",
      categoryId: "food",
      name: "Creamy Alfredo Pasta",
      description: "Penne pasta tossed in garlic parmesan cream sauce with herbs and toasted garlic bread.",
      price: 340,
      image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: false,
      isAvailable: true
    },
    {
      id: "f4",
      categoryId: "food",
      name: "Grilled Mozzarella Sandwich",
      description: "Fresh mozzarella, basil pesto, and sliced tomatoes grilled on artisanal ciabatta.",
      price: 280,
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: false,
      isAvailable: true
    },
    {
      id: "f5",
      categoryId: "food",
      name: "Fluffy Maple Pancakes",
      description: "Stack of 3 golden pancakes served with pure maple syrup and fresh berry compote.",
      price: 260,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },

    // Desserts
    {
      id: "d1",
      categoryId: "desserts",
      name: "Belgian Chocolate Cake",
      description: "Decadent multi-layered dark chocolate cake with ganache glaze.",
      price: 240,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },
    {
      id: "d2",
      categoryId: "desserts",
      name: "New York Baked Cheesecake",
      description: "Rich and creamy baked cheesecake with a buttery graham cracker crust.",
      price: 270,
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },
    {
      id: "d3",
      categoryId: "desserts",
      name: "Warm Fudgy Brownie",
      description: "Dense dark chocolate brownie served warm with a scoop of Madagascar vanilla bean ice cream.",
      price: 210,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: false,
      isAvailable: true
    },
    {
      id: "d4",
      categoryId: "desserts",
      name: "Classic Italian Tiramisu",
      description: "Ladyfingers dipped in espresso, layered with whipped mascarpone cream and cocoa.",
      price: 280,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: true,
      isAvailable: true
    },

    // Tea & Drinks
    {
      id: "t1",
      categoryId: "tea",
      name: "Organic Matcha Green Tea Latte",
      description: "Japanese ceremonial grade matcha whisked with steamed oat or dairy milk.",
      price: 230,
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: false,
      isAvailable: true
    },
    {
      id: "t2",
      categoryId: "tea",
      name: "Iced Hibiscus Berry Brew",
      description: "Refreshing herbal cold infusion of dried hibiscus flowers, berries, and mint.",
      price: 190,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
      isVegetarian: true,
      isPopular: false,
      isAvailable: true
    }
  ],
  galleryImages: [
    {
      id: "g1",
      title: "Artisanal Pour-Over",
      category: "Coffee Craft",
      url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g2",
      title: "Warm Interior Lounge",
      category: "Ambiance",
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g3",
      title: "Fresh Morning Pastries",
      category: "Bakery",
      url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g4",
      title: "Barista Latte Art",
      category: "Coffee Craft",
      url: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g5",
      title: "Cozy Work Corner",
      category: "Ambiance",
      url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "g6",
      title: "Handcrafted Desserts",
      category: "Bakery",
      url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    }
  ],
  benefits: [
    {
      title: "Freshly Roasted Specialty Coffee",
      description: "100% Arabica beans ethically sourced from high-altitude single-origin estates and roasted weekly.",
      iconName: "Flame"
    },
    {
      title: "Handcrafted Culinary Menu",
      description: "Freshly baked sourdough pastries, gourmet sandwiches, and artisanal desserts prepared daily.",
      iconName: "Utensils"
    },
    {
      title: "Work-Friendly Sanctuary",
      description: "Ergonomic seating, high-speed Wi-Fi, abundant power outlets, and warm, focused background acoustics.",
      iconName: "Wifi"
    },
    {
      title: "Private Events & Gatherings",
      description: "Dedicated spaces available for birthday celebrations, team workshops, book clubs, and acoustic sessions.",
      iconName: "Calendar"
    }
  ]
};
