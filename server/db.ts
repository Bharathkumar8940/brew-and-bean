import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(process.cwd(), 'brew_bean.db');
const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

export function initDb() {
  db.exec(`
    -- Users Table (Customers, Staff, Manager, Owner)
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      role TEXT CHECK(role IN ('Owner', 'Manager', 'Staff', 'Customer')) NOT NULL DEFAULT 'Customer',
      loyaltyPoints INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Menu Categories Table
    CREATE TABLE IF NOT EXISTS menu_categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      displayOrder INTEGER DEFAULT 0
    );

    -- Menu Items Table
    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      categoryId TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT NOT NULL,
      isVegetarian INTEGER DEFAULT 1,
      isPopular INTEGER DEFAULT 0,
      isAvailable INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryId) REFERENCES menu_categories(id) ON DELETE CASCADE
    );

    -- Café Tables
    CREATE TABLE IF NOT EXISTS cafe_tables (
      id TEXT PRIMARY KEY,
      tableNumber INTEGER UNIQUE NOT NULL,
      seats INTEGER NOT NULL,
      status TEXT CHECK(status IN ('Available', 'Reserved', 'Occupied', 'Cleaning', 'Unavailable')) DEFAULT 'Available'
    );

    -- Reservations Table
    CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY,
      reservationNumber TEXT UNIQUE NOT NULL,
      customerName TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      customerEmail TEXT,
      reservationDate TEXT NOT NULL,
      reservationTime TEXT NOT NULL,
      guests INTEGER NOT NULL,
      tableId TEXT,
      specialRequest TEXT,
      status TEXT CHECK(status IN ('Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled', 'No-show')) DEFAULT 'Pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (tableId) REFERENCES cafe_tables(id)
    );

    -- Orders Table
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      orderNumber TEXT UNIQUE NOT NULL,
      userId TEXT,
      customerName TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      orderType TEXT CHECK(orderType IN ('Dine-in', 'Takeaway', 'Delivery')) NOT NULL,
      tableNumber INTEGER,
      deliveryAddress TEXT,
      subtotal REAL NOT NULL,
      tax REAL NOT NULL,
      discount REAL DEFAULT 0,
      totalAmount REAL NOT NULL,
      paymentStatus TEXT DEFAULT 'Pending',
      orderStatus TEXT CHECK(orderStatus IN ('Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled')) DEFAULT 'Pending',
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Order Items Table
    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      orderId TEXT NOT NULL,
      menuItemId TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unitPrice REAL NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (menuItemId) REFERENCES menu_items(id)
    );

    -- Coupons Table
    CREATE TABLE IF NOT EXISTS coupons (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      discountPercent REAL NOT NULL,
      maxUsage INTEGER DEFAULT 100,
      currentUsage INTEGER DEFAULT 0,
      expiryDate TEXT NOT NULL,
      isActive INTEGER DEFAULT 1
    );

    -- Private Events Table
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      customerPhone TEXT NOT NULL,
      eventType TEXT NOT NULL,
      eventDate TEXT NOT NULL,
      eventTime TEXT NOT NULL,
      guests INTEGER NOT NULL,
      requirements TEXT,
      status TEXT DEFAULT 'Pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Customer Reviews Table
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      rating INTEGER NOT NULL,
      reviewText TEXT NOT NULL,
      date TEXT DEFAULT CURRENT_DATE,
      isApproved INTEGER DEFAULT 1
    );

    -- Notifications Log
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      isRead INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedDefaultData();
}

function seedDefaultData() {
  // Check if categories seeded
  const categoryCount = db.prepare('SELECT COUNT(*) as count FROM menu_categories').get() as { count: number };
  if (categoryCount.count === 0) {
    const categories = [
      { id: 'cat-1', name: 'Coffee', displayOrder: 1 },
      { id: 'cat-2', name: 'Tea', displayOrder: 2 },
      { id: 'cat-3', name: 'Cold Beverages', displayOrder: 3 },
      { id: 'cat-4', name: 'Breakfast', displayOrder: 4 },
      { id: 'cat-5', name: 'Snacks', displayOrder: 5 },
      { id: 'cat-6', name: 'Sandwiches', displayOrder: 6 },
      { id: 'cat-7', name: 'Pasta', displayOrder: 7 },
      { id: 'cat-8', name: 'Desserts', displayOrder: 8 },
    ];
    const insertCat = db.prepare('INSERT INTO menu_categories (id, name, displayOrder) VALUES (?, ?, ?)');
    categories.forEach(c => insertCat.run(c.id, c.name, c.displayOrder));
  }

  // Seed Menu Items
  const itemCount = db.prepare('SELECT COUNT(*) as count FROM menu_items').get() as { count: number };
  if (itemCount.count === 0) {
    const menuItems = [
      { id: 'm-1', categoryId: 'cat-1', name: 'Espresso Single Shot', description: 'Rich, intense extraction with golden crema', price: 120, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-2', categoryId: 'cat-1', name: 'Cappuccino', description: 'Espresso, steamed milk and velvety microfoam', price: 160, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-3', categoryId: 'cat-1', name: 'Café Latte', description: 'Smooth espresso with generous velvety milk', price: 170, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 0, isAvailable: 1 },
      { id: 'm-4', categoryId: 'cat-3', name: 'Artisan Cold Coffee', description: 'Chilled blended espresso with vanilla ice cream', price: 180, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-5', categoryId: 'cat-1', name: 'Caramel Macchiato', description: 'Steamed milk marked with espresso & caramel drizzle', price: 210, image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-6', categoryId: 'cat-4', name: 'Classic Buttermilk Pancakes', description: 'Golden fluffy stack with maple syrup & butter', price: 220, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-7', categoryId: 'cat-6', name: 'Grilled Paneer Sandwich', description: 'Spiced cottage cheese, mint chutney, sourdough', price: 190, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-8', categoryId: 'cat-6', name: 'Smoked Chicken Sandwich', description: 'Pulled smoked chicken, cheddar, herb aioli', price: 220, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80', isVegetarian: 0, isPopular: 1, isAvailable: 1 },
      { id: 'm-9', categoryId: 'cat-7', name: 'Creamy Alfredo Pasta', description: 'Penne in parmesan garlic sauce with mushrooms', price: 280, image: 'https://images.unsplash.com/photo-1621996346565-e3def616409e?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-10', categoryId: 'cat-8', name: 'Fudgy Belgian Brownie', description: 'Warm chocolate brownie with vanilla bean ice cream', price: 160, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-11', categoryId: 'cat-8', name: 'New York Baked Cheesecake', description: 'Velvety cheesecake over graham cracker crust', price: 220, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 1, isAvailable: 1 },
      { id: 'm-12', categoryId: 'cat-5', name: 'Garlic Butter Croissant', description: 'Flaky pastry with garlic herb butter & sea salt', price: 150, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', isVegetarian: 1, isPopular: 0, isAvailable: 1 },
    ];

    const insertItem = db.prepare(`
      INSERT INTO menu_items (id, categoryId, name, description, price, image, isVegetarian, isPopular, isAvailable)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    menuItems.forEach(i => insertItem.run(i.id, i.categoryId, i.name, i.description, i.price, i.image, i.isVegetarian, i.isPopular, i.isAvailable));
  }

  // Seed Cafe Tables
  const tableCount = db.prepare('SELECT COUNT(*) as count FROM cafe_tables').get() as { count: number };
  if (tableCount.count === 0) {
    const tables = [
      { id: 't-1', tableNumber: 1, seats: 2, status: 'Available' },
      { id: 't-2', tableNumber: 2, seats: 2, status: 'Occupied' },
      { id: 't-3', tableNumber: 3, seats: 4, status: 'Available' },
      { id: 't-4', tableNumber: 4, seats: 4, status: 'Reserved' },
      { id: 't-5', tableNumber: 5, seats: 6, status: 'Available' },
      { id: 't-6', tableNumber: 6, seats: 6, status: 'Available' },
      { id: 't-7', tableNumber: 7, seats: 8, status: 'Cleaning' },
    ];
    const insertTable = db.prepare('INSERT INTO cafe_tables (id, tableNumber, seats, status) VALUES (?, ?, ?, ?)');
    tables.forEach(t => insertTable.run(t.id, t.tableNumber, t.seats, t.status));
  }

  // Seed Default Staff User
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (userCount.count === 0) {
    // Default admin: admin@brewandbean.com / admin123
    const insertUser = db.prepare(`
      INSERT INTO users (id, name, email, phone, passwordHash, role, loyaltyPoints)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertUser.run('u-admin', 'Brew & Bean Manager', 'admin@brewandbean.com', '9876543210', 'admin123', 'Owner', 500);
    insertUser.run('u-staff', 'Barista Counter', 'staff@brewandbean.com', '9876543211', 'staff123', 'Staff', 0);
  }

  // Seed Sample Coupon
  const couponCount = db.prepare('SELECT COUNT(*) as count FROM coupons').get() as { count: number };
  if (couponCount.count === 0) {
    const insertCoupon = db.prepare('INSERT INTO coupons (id, code, discountPercent, maxUsage, currentUsage, expiryDate, isActive) VALUES (?, ?, ?, ?, ?, ?, ?)');
    insertCoupon.run('c-1', 'WELCOME50', 20, 100, 12, '2026-12-31', 1);
    insertCoupon.run('c-2', 'BREWBEANS', 15, 50, 4, '2026-12-31', 1);
  }

  // Seed Sample Reviews
  const reviewCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get() as { count: number };
  if (reviewCount.count === 0) {
    const insertReview = db.prepare('INSERT INTO reviews (id, customerName, rating, reviewText, date, isApproved) VALUES (?, ?, ?, ?, ?, ?)');
    insertReview.run('r-1', 'Aarav Sharma', 5, 'The Caramel Macchiato is unmatched! Soft ambient lighting and warm cozy vibes.', '2026-08-20', 1);
    insertReview.run('r-2', 'Priya Nair', 5, 'My favorite coffee spot in Indiranagar. Their Alfredo Pasta paired with Cold Coffee is divine.', '2026-08-22', 1);
    insertReview.run('r-3', 'Rohan Mehta', 5, 'Staff is extremely attentive and the 3D scroll coffee theme on their website is incredible!', '2026-08-24', 1);
  }
}

export default db;
