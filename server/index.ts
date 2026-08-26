import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { dbStore, Category, MenuItem, CafeTable, Reservation, Order, Coupon, EventRequest, Review, NotificationLog } from './store';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'brew_bean_secret_key_2026';

app.use(cors());
app.use(express.json());

// Helper to notify WhatsApp (Backend API Architecture)
function triggerWhatsAppNotification(type: string, data: any) {
  const whatsappToken = process.env.WHATSAPP_API_TOKEN;
  const whatsappPhoneId = process.env.WHATSAPP_PHONE_ID;
  const ownerPhone = process.env.WHATSAPP_OWNER_PHONE || '918639098389';

  console.log(`[WHATSAPP NOTIFICATION TRIGGERED] Type: ${type}`);
  console.log(`Target Phone: ${ownerPhone}`);

  const store = dbStore.getStore();
  let title = '';
  let message = '';

  if (type === 'NEW_RESERVATION') {
    title = `🔔 New Reservation #${data.reservationNumber}`;
    message = `Customer: ${data.customerName} (${data.customerPhone})\nDate: ${data.reservationDate} at ${data.reservationTime}\nGuests: ${data.guests}\nTable: Table ${data.tableNumber || 'Auto-Assigned'}`;
  } else if (type === 'NEW_ORDER') {
    title = `🛍️ New Order #${data.orderNumber}`;
    message = `Customer: ${data.customerName} (${data.customerPhone})\nType: ${data.orderType}\nTotal: ₹${data.totalAmount}`;
  } else if (type === 'EVENT_REQUEST') {
    title = `🎉 Private Event Booking Request`;
    message = `Customer: ${data.customerName} (${data.customerPhone})\nEvent: ${data.eventType}\nGuests: ${data.guests} on ${data.eventDate}`;
  }

  store.notifications.unshift({
    id: `n-${Date.now()}`,
    type,
    title,
    message,
    isRead: false,
    createdAt: new Date().toISOString(),
  });

  dbStore.saveData();

  if (whatsappToken && whatsappPhoneId) {
    // Production Graph API call endpoint:
    // https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages
  }
}

// ----------------------------------------------------
// PUBLIC & CUSTOMER API ENDPOINTS
// ----------------------------------------------------

// 1. Get Categories & Menu Items
app.get('/api/menu', (req: Request, res: Response) => {
  const store = dbStore.getStore();
  res.json({
    categories: store.categories,
    items: store.menuItems,
  });
});

// 2. Validate Coupon Code
app.post('/api/coupons/validate', (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });

  const store = dbStore.getStore();
  const coupon = store.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);

  if (!coupon) {
    return res.status(404).json({ error: 'Invalid or expired coupon code' });
  }

  res.json({
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    message: `${coupon.discountPercent}% discount applied!`,
  });
});

// 3. Get Table Availability & Recommend Suitable Tables
app.post('/api/reservations/check-availability', (req: Request, res: Response) => {
  const { date, time, guests } = req.body;

  if (!date || !time || !guests) {
    return res.status(400).json({ error: 'Date, time, and guests count are required' });
  }

  const store = dbStore.getStore();
  const suitableTables = store.tables.filter(t => t.seats >= Number(guests) && t.status !== 'Unavailable');

  // Find existing reservations for that date & time slot
  const bookedTableIds = new Set(
    store.reservations
      .filter(r => r.reservationDate === date && r.reservationTime === time && ['Confirmed', 'Seated', 'Pending'].includes(r.status))
      .map(r => r.tableId)
  );

  const availableTables = suitableTables.filter(t => !bookedTableIds.has(t.id));

  res.json({
    available: availableTables.length > 0,
    suitableTables: availableTables,
  });
});

// 4. Create Table Reservation
app.post('/api/reservations', (req: Request, res: Response) => {
  const { customerName, customerPhone, customerEmail, reservationDate, reservationTime, guests, specialRequest } = req.body;

  if (!customerName || !customerPhone || !reservationDate || !reservationTime || !guests) {
    return res.status(400).json({ error: 'Missing required reservation fields' });
  }

  const store = dbStore.getStore();
  
  // Find best fitting table
  const suitableTable = store.tables
    .filter(t => t.seats >= Number(guests) && t.status !== 'Unavailable')
    .sort((a, b) => a.seats - b.seats)[0];

  const tableId = suitableTable ? suitableTable.id : undefined;
  const tableNum = suitableTable ? suitableTable.tableNumber : 'Pending Assignment';

  const reservationId = `res-${Date.now()}`;
  const resNumber = `BB-${Math.floor(1000 + Math.random() * 9000)}`;

  const newReservation: Reservation = {
    id: reservationId,
    reservationNumber: resNumber,
    customerName,
    customerPhone,
    customerEmail: customerEmail || '',
    reservationDate,
    reservationTime,
    guests: Number(guests),
    tableId,
    specialRequest: specialRequest || '',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  store.reservations.unshift(newReservation);

  if (suitableTable) {
    suitableTable.status = 'Reserved';
  }

  dbStore.saveData();

  triggerWhatsAppNotification('NEW_RESERVATION', {
    reservationNumber: resNumber,
    customerName,
    customerPhone,
    reservationDate,
    reservationTime,
    guests,
    tableNumber: tableNum,
  });

  res.json({
    success: true,
    reservation: newReservation,
  });
});

// 5. Submit Online Order
app.post('/api/orders', (req: Request, res: Response) => {
  const { customerName, customerPhone, orderType, tableNumber, deliveryAddress, items, couponCode, notes } = req.body;

  if (!customerName || !customerPhone || !orderType || !items || !items.length) {
    return res.status(400).json({ error: 'Missing order details' });
  }

  const store = dbStore.getStore();
  let subtotal = 0;
  items.forEach((item: any) => {
    subtotal += item.price * item.quantity;
  });

  let discount = 0;
  if (couponCode) {
    const coupon = store.coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive);
    if (coupon) {
      discount = (subtotal * coupon.discountPercent) / 100;
      coupon.currentUsage += 1;
    }
  }

  const tax = (subtotal - discount) * 0.05; // 5% GST
  const totalAmount = Math.round(subtotal - discount + tax);

  const orderId = `ord-${Date.now()}`;
  const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  const orderItems = items.map((i: any) => ({
    id: `oi-${Date.now()}-${Math.random()}`,
    orderId,
    menuItemId: i.id,
    name: i.name,
    quantity: i.quantity,
    unitPrice: i.price,
  }));

  const newOrder: Order = {
    id: orderId,
    orderNumber,
    customerName,
    customerPhone,
    orderType,
    tableNumber: tableNumber ? Number(tableNumber) : undefined,
    deliveryAddress: deliveryAddress || '',
    subtotal,
    tax,
    discount,
    totalAmount,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    notes: notes || '',
    createdAt: new Date().toISOString(),
    items: orderItems,
  };

  store.orders.unshift(newOrder);

  // Award Loyalty Points if existing customer
  const user = store.users.find(u => u.phone === customerPhone);
  if (user) {
    user.loyaltyPoints += Math.floor(totalAmount / 10); // ₹100 = 10 points
  }

  dbStore.saveData();

  triggerWhatsAppNotification('NEW_ORDER', {
    orderNumber,
    customerName,
    customerPhone,
    orderType,
    totalAmount,
  });

  res.json({
    success: true,
    order: newOrder,
  });
});

// 6. Submit Private Event Request
app.post('/api/events', (req: Request, res: Response) => {
  const { customerName, customerPhone, eventType, eventDate, eventTime, guests, requirements } = req.body;

  if (!customerName || !customerPhone || !eventType || !eventDate || !guests) {
    return res.status(400).json({ error: 'Missing required event fields' });
  }

  const store = dbStore.getStore();
  const newEvent: EventRequest = {
    id: `ev-${Date.now()}`,
    customerName,
    customerPhone,
    eventType,
    eventDate,
    eventTime: eventTime || '7:00 PM',
    guests: Number(guests),
    requirements: requirements || '',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  store.events.unshift(newEvent);
  dbStore.saveData();

  triggerWhatsAppNotification('EVENT_REQUEST', newEvent);

  res.json({ success: true, message: 'Event booking request submitted successfully!' });
});

// 7. Get Customer Reviews & Submit Review
app.get('/api/reviews', (req: Request, res: Response) => {
  const store = dbStore.getStore();
  res.json(store.reviews.filter(r => r.isApproved));
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { customerName, rating, reviewText } = req.body;

  if (!customerName || !rating || !reviewText) {
    return res.status(400).json({ error: 'Missing required review fields' });
  }

  const store = dbStore.getStore();
  const newReview: Review = {
    id: `r-${Date.now()}`,
    customerName,
    rating: Number(rating),
    reviewText,
    date: new Date().toISOString().split('T')[0],
    isApproved: true,
  };

  store.reviews.unshift(newReview);
  dbStore.saveData();

  res.json({ success: true, message: 'Thank you for your review!' });
});


// ----------------------------------------------------
// STAFF & ADMIN AUTHENTICATED API ENDPOINTS
// ----------------------------------------------------

// Admin Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const store = dbStore.getStore();

  const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      loyaltyPoints: user.loyaltyPoints,
    },
  });
});

// Admin Dashboard Operational Metrics
app.get('/api/admin/metrics', (req: Request, res: Response) => {
  const store = dbStore.getStore();

  const totalReservations = store.reservations.length;
  const todayOrders = store.orders.length;
  const totalRevenue = store.orders
    .filter(o => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const availableTables = store.tables.filter(t => t.status === 'Available').length;
  const occupiedTables = store.tables.filter(t => t.status === 'Occupied').length;

  res.json({
    reservations: totalReservations,
    orders: todayOrders,
    revenue: totalRevenue,
    availableTables,
    occupiedTables,
  });
});

// Admin Table Management
app.get('/api/admin/tables', (req: Request, res: Response) => {
  const store = dbStore.getStore();
  res.json(store.tables);
});

app.put('/api/admin/tables/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const store = dbStore.getStore();
  const table = store.tables.find(t => t.id === id);

  if (table) {
    table.status = status;
    dbStore.saveData();
  }

  res.json({ success: true, message: 'Table status updated' });
});

// Admin Reservations Management
app.get('/api/admin/reservations', (req: Request, res: Response) => {
  const store = dbStore.getStore();
  const enriched = store.reservations.map(r => {
    const table = store.tables.find(t => t.id === r.tableId);
    return {
      ...r,
      tableNumber: table ? table.tableNumber : 'Unassigned',
    };
  });
  res.json(enriched);
});

app.put('/api/admin/reservations/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, tableId } = req.body;

  const store = dbStore.getStore();
  const resv = store.reservations.find(r => r.id === id);

  if (resv) {
    resv.status = status;
    if (tableId) resv.tableId = tableId;
    dbStore.saveData();
  }

  res.json({ success: true, message: 'Reservation updated' });
});

// Admin Orders Management
app.get('/api/admin/orders', (req: Request, res: Response) => {
  const store = dbStore.getStore();
  res.json(store.orders);
});

app.put('/api/admin/orders/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const store = dbStore.getStore();
  const order = store.orders.find(o => o.id === id);

  if (order) {
    order.orderStatus = orderStatus;
    dbStore.saveData();
  }

  res.json({ success: true, message: 'Order status updated' });
});

// Admin Menu CRUD
app.post('/api/admin/menu', (req: Request, res: Response) => {
  const { categoryId, name, description, price, image, isVegetarian, isPopular } = req.body;

  const store = dbStore.getStore();
  const newItem: MenuItem = {
    id: `m-${Date.now()}`,
    categoryId: categoryId || 'cat-1',
    name,
    description,
    price: Number(price),
    image: image || 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    isVegetarian: Boolean(isVegetarian),
    isPopular: Boolean(isPopular),
    isAvailable: true,
  };

  store.menuItems.unshift(newItem);
  dbStore.saveData();

  res.json({ success: true, item: newItem });
});

app.delete('/api/admin/menu/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const store = dbStore.getStore();
  store.menuItems = store.menuItems.filter(m => m.id !== id);
  dbStore.saveData();
  res.json({ success: true, message: 'Menu item deleted' });
});

// Admin Offers & Coupons CRUD
app.get('/api/admin/coupons', (req: Request, res: Response) => {
  const store = dbStore.getStore();
  res.json(store.coupons);
});

app.post('/api/admin/coupons', (req: Request, res: Response) => {
  const { code, discountPercent, expiryDate } = req.body;
  const store = dbStore.getStore();

  const newCoupon: Coupon = {
    id: `c-${Date.now()}`,
    code: code.toUpperCase(),
    discountPercent: Number(discountPercent),
    maxUsage: 100,
    currentUsage: 0,
    expiryDate: expiryDate || '2026-12-31',
    isActive: true,
  };

  store.coupons.unshift(newCoupon);
  dbStore.saveData();

  res.json({ success: true, coupon: newCoupon });
});

// Admin Notifications
app.get('/api/admin/notifications', (req: Request, res: Response) => {
  const store = dbStore.getStore();
  res.json(store.notifications);
});

app.listen(PORT, () => {
  console.log(`☕ Brew & Bean Backend Express Server running on http://localhost:${PORT}`);
});
