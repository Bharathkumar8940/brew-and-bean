import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve(process.cwd(), 'cafe_store.json');

export interface Category {
  id: string;
  name: string;
  displayOrder: number;
}

export interface MenuItem {
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

export interface CafeTable {
  id: string;
  tableNumber: number;
  seats: number;
  status: 'Available' | 'Reserved' | 'Occupied' | 'Cleaning' | 'Unavailable';
}

export interface Reservation {
  id: string;
  reservationNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  tableId?: string;
  specialRequest?: string;
  status: 'Pending' | 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled' | 'No-show';
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  orderType: 'Dine-in' | 'Takeaway' | 'Delivery';
  tableNumber?: number;
  deliveryAddress?: string;
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: 'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
  items: OrderItem[];
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxUsage: number;
  currentUsage: number;
  expiryDate: string;
  isActive: boolean;
}

export interface EventRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  guests: number;
  requirements?: string;
  status: string;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  date: string;
  isApproved: boolean;
}

export interface NotificationLog {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'Owner' | 'Manager' | 'Staff' | 'Customer';
  loyaltyPoints: number;
  createdAt: string;
}

export interface CafeStoreData {
  categories: Category[];
  menuItems: MenuItem[];
  tables: CafeTable[];
  reservations: Reservation[];
  orders: Order[];
  coupons: Coupon[];
  events: EventRequest[];
  reviews: Review[];
  notifications: NotificationLog[];
  users: User[];
}

const initialStoreData: CafeStoreData = {
  categories: [
    { id: 'cat-1', name: 'Coffee', displayOrder: 1 },
    { id: 'cat-2', name: 'Tea', displayOrder: 2 },
    { id: 'cat-3', name: 'Cold Beverages', displayOrder: 3 },
    { id: 'cat-4', name: 'Breakfast', displayOrder: 4 },
    { id: 'cat-5', name: 'Snacks', displayOrder: 5 },
    { id: 'cat-6', name: 'Sandwiches', displayOrder: 6 },
    { id: 'cat-7', name: 'Pasta', displayOrder: 7 },
    { id: 'cat-8', name: 'Desserts', displayOrder: 8 },
  ],
  menuItems: [
    { id: 'm-1', categoryId: 'cat-1', name: 'Espresso Single Shot', description: 'Rich, intense extraction with golden crema', price: 120, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-2', categoryId: 'cat-1', name: 'Cappuccino', description: 'Espresso, steamed milk and velvety microfoam', price: 160, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-3', categoryId: 'cat-1', name: 'Café Latte', description: 'Smooth espresso with generous velvety milk', price: 170, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: false, isAvailable: true },
    { id: 'm-4', categoryId: 'cat-3', name: 'Artisan Cold Coffee', description: 'Chilled blended espresso with vanilla ice cream', price: 180, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-5', categoryId: 'cat-1', name: 'Caramel Macchiato', description: 'Steamed milk marked with espresso & caramel drizzle', price: 210, image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-6', categoryId: 'cat-4', name: 'Classic Buttermilk Pancakes', description: 'Golden fluffy stack with maple syrup & butter', price: 220, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-7', categoryId: 'cat-6', name: 'Grilled Paneer Sandwich', description: 'Spiced cottage cheese, mint chutney, sourdough', price: 190, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-8', categoryId: 'cat-6', name: 'Smoked Chicken Sandwich', description: 'Pulled smoked chicken, cheddar, herb aioli', price: 220, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80', isVegetarian: false, isPopular: true, isAvailable: true },
    { id: 'm-9', categoryId: 'cat-7', name: 'Creamy Alfredo Pasta', description: 'Penne in parmesan garlic sauce with mushrooms', price: 280, image: 'https://images.unsplash.com/photo-1621996346565-e3def616409e?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-10', categoryId: 'cat-8', name: 'Fudgy Belgian Brownie', description: 'Warm chocolate brownie with vanilla bean ice cream', price: 160, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-11', categoryId: 'cat-8', name: 'New York Baked Cheesecake', description: 'Velvety cheesecake over graham cracker crust', price: 220, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: true, isAvailable: true },
    { id: 'm-12', categoryId: 'cat-5', name: 'Garlic Butter Croissant', description: 'Flaky pastry with garlic herb butter & sea salt', price: 150, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', isVegetarian: true, isPopular: false, isAvailable: true },
  ],
  tables: [
    { id: 't-1', tableNumber: 1, seats: 2, status: 'Available' },
    { id: 't-2', tableNumber: 2, seats: 2, status: 'Occupied' },
    { id: 't-3', tableNumber: 3, seats: 4, status: 'Available' },
    { id: 't-4', tableNumber: 4, seats: 4, status: 'Reserved' },
    { id: 't-5', tableNumber: 5, seats: 6, status: 'Available' },
    { id: 't-6', tableNumber: 6, seats: 6, status: 'Available' },
    { id: 't-7', tableNumber: 7, seats: 8, status: 'Cleaning' },
  ],
  reservations: [
    {
      id: 'res-101',
      reservationNumber: 'BB-1024',
      customerName: 'Rahul Kumar',
      customerPhone: '9876543210',
      customerEmail: 'rahul@example.com',
      reservationDate: '2026-08-30',
      reservationTime: '7:30 PM',
      guests: 4,
      tableId: 't-4',
      specialRequest: 'Birthday celebration table setup',
      status: 'Confirmed',
      createdAt: '2026-08-25T14:30:00Z',
    },
    {
      id: 'res-102',
      reservationNumber: 'BB-1025',
      customerName: 'Priya Sharma',
      customerPhone: '9876543211',
      customerEmail: 'priya@example.com',
      reservationDate: '2026-08-30',
      reservationTime: '8:00 PM',
      guests: 2,
      tableId: 't-1',
      specialRequest: 'Quiet window seat preferred',
      status: 'Pending',
      createdAt: '2026-08-26T09:15:00Z',
    },
  ],
  orders: [
    {
      id: 'ord-501',
      orderNumber: 'ORD-1024',
      customerName: 'Rahul Kumar',
      customerPhone: '9876543210',
      orderType: 'Dine-in',
      tableNumber: 4,
      subtotal: 480,
      tax: 24,
      discount: 0,
      totalAmount: 504,
      paymentStatus: 'Paid',
      orderStatus: 'Preparing',
      notes: 'Less sugar on Cappuccino',
      createdAt: '2026-08-26T10:15:00Z',
      items: [
        { id: 'oi-1', orderId: 'ord-501', menuItemId: 'm-2', name: 'Cappuccino', quantity: 2, unitPrice: 160 },
        { id: 'oi-2', orderId: 'ord-501', menuItemId: 'm-10', name: 'Fudgy Belgian Brownie', quantity: 1, unitPrice: 160 },
      ],
    },
  ],
  coupons: [
    { id: 'c-1', code: 'WELCOME50', discountPercent: 20, maxUsage: 100, currentUsage: 12, expiryDate: '2026-12-31', isActive: true },
    { id: 'c-2', code: 'BREWBEANS', discountPercent: 15, maxUsage: 50, currentUsage: 4, expiryDate: '2026-12-31', isActive: true },
  ],
  events: [
    {
      id: 'ev-1',
      customerName: 'Ananya Roy',
      customerPhone: '9876543212',
      eventType: 'Corporate Workshop & Coffee Tasting',
      eventDate: '2026-09-05',
      eventTime: '5:00 PM',
      guests: 15,
      requirements: 'Need projector screen and custom coffee flight menu',
      status: 'Pending',
      createdAt: '2026-08-25T11:00:00Z',
    },
  ],
  reviews: [
    { id: 'r-1', customerName: 'Aarav Sharma', rating: 5, reviewText: 'The Caramel Macchiato is unmatched! Soft ambient lighting and warm cozy vibes.', date: '2026-08-20', isApproved: true },
    { id: 'r-2', customerName: 'Priya Nair', rating: 5, reviewText: 'My favorite coffee spot in Indiranagar. Their Alfredo Pasta paired with Cold Coffee is divine.', date: '2026-08-22', isApproved: true },
    { id: 'r-3', customerName: 'Rohan Mehta', rating: 5, reviewText: 'Staff is extremely attentive and the 3D scroll coffee theme on their website is incredible!', date: '2026-08-24', isApproved: true },
  ],
  notifications: [
    { id: 'n-1', type: 'NEW_RESERVATION', title: '🔔 New Reservation #BB-1025', message: 'Priya Sharma (2 Guests) for 8:00 PM', isRead: false, createdAt: '2026-08-26T09:15:00Z' },
  ],
  users: [
    { id: 'u-admin', name: 'Brew & Bean Manager', email: 'admin@brewandbean.com', phone: '8639098389', passwordHash: 'admin123', role: 'Owner', loyaltyPoints: 500, createdAt: '2026-08-01' },
    { id: 'u-staff', name: 'Barista Counter', email: 'staff@brewandbean.com', phone: '8639098389', passwordHash: 'staff123', role: 'Staff', loyaltyPoints: 0, createdAt: '2026-08-01' },
    { id: 'u-cust', name: 'Rahul Kumar', email: 'rahul@example.com', phone: '9876543210', passwordHash: 'rahul123', role: 'Customer', loyaltyPoints: 320, createdAt: '2026-08-10' },
  ],
};

class Store {
  private data: CafeStoreData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): CafeStoreData {
    try {
      if (fs.existsSync(dataFilePath)) {
        const raw = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error loading cafe_store.json, using initial data:', e);
    }
    this.saveData(initialStoreData);
    return initialStoreData;
  }

  public saveData(newData?: CafeStoreData): void {
    if (newData) this.data = newData;
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving cafe_store.json:', e);
    }
  }

  public getStore(): CafeStoreData {
    return this.data;
  }
}

export const dbStore = new Store();
