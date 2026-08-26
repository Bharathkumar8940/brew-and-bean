import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Utensils, Table, ShoppingBag, Tag, Bell, LogOut, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('staff_token'));
  const [email, setEmail] = useState('admin@brewandbean.com');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'metrics' | 'tables' | 'reservations' | 'orders' | 'menu' | 'coupons' | 'notifications'>('metrics');

  const [metrics, setMetrics] = useState<any>(null);
  const [tables, setTables] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [newMenuDesc, setNewMenuDesc] = useState('');

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('staff_token', data.token);
        setLoginError('');
      } else {
        setLoginError(data.error);
      }
    } catch (e) {
      setLoginError('Server connection error');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('staff_token');
  };

  const fetchAdminData = async () => {
    try {
      const [mRes, tRes, rRes, oRes, menuRes, cRes, nRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/metrics'),
        fetch('http://localhost:5000/api/admin/tables'),
        fetch('http://localhost:5000/api/admin/reservations'),
        fetch('http://localhost:5000/api/admin/orders'),
        fetch('http://localhost:5000/api/menu'),
        fetch('http://localhost:5000/api/admin/coupons'),
        fetch('http://localhost:5000/api/admin/notifications'),
      ]);

      setMetrics(await mRes.json());
      setTables(await tRes.json());
      setReservations(await rRes.json());
      setOrders(await oRes.json());
      const menuData = await menuRes.json();
      setMenuItems(menuData.items);
      setCoupons(await cRes.json());
      setNotifications(await nRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  const updateTableStatus = async (id: string, status: string) => {
    await fetch(`http://localhost:5000/api/admin/tables/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchAdminData();
  };

  const updateReservationStatus = async (id: string, status: string) => {
    await fetch(`http://localhost:5000/api/admin/reservations/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchAdminData();
  };

  const updateOrderStatus = async (id: string, orderStatus: string) => {
    await fetch(`http://localhost:5000/api/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus }),
    });
    fetchAdminData();
  };

  const handleCreateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/admin/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categoryId: 'cat-1',
        name: newMenuName,
        price: Number(newMenuPrice),
        description: newMenuDesc,
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
        isVegetarian: true,
      }),
    });
    setNewMenuName('');
    setNewMenuPrice('');
    setNewMenuDesc('');
    fetchAdminData();
  };

  const handleDeleteMenuItem = async (id: string) => {
    await fetch(`http://localhost:5000/api/admin/menu/${id}`, { method: 'DELETE' });
    fetchAdminData();
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-espresso flex items-center justify-center p-6 text-cream">
        <div className="w-full max-w-md bg-coffee-950 p-8 rounded-3xl border border-coffee-800 shadow-3d">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold">Brew & Bean Admin</h2>
            <p className="text-xs text-coffee-300 mt-1">Staff Portal & Table Management Login</p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-espresso border border-coffee-800 text-sm text-cream focus:border-caramel focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-espresso border border-coffee-800 text-sm text-cream focus:border-caramel focus:outline-none"
              />
            </div>

            {loginError && <p className="text-xs text-rose-400">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-caramel hover:bg-coffee-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all"
            >
              Log In to Portal
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/" className="text-xs text-coffee-400 hover:text-caramel">← Back to Customer Website</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-espresso text-cream flex">
      <aside className="w-64 bg-coffee-950 border-r border-coffee-800/80 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-coffee-800">
            <div className="w-9 h-9 rounded-full bg-caramel flex items-center justify-center font-bold text-white">
              B
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">Brew & Bean</h3>
              <span className="text-[10px] text-caramel uppercase tracking-widest font-semibold">Staff Portal</span>
            </div>
          </div>

          <nav className="mt-8 space-y-1.5">
            {[
              { id: 'metrics', name: 'Overview', icon: LayoutDashboard },
              { id: 'tables', name: 'Table Map', icon: Table },
              { id: 'reservations', name: 'Reservations', icon: Calendar },
              { id: 'orders', name: 'Live Orders', icon: ShoppingBag },
              { id: 'menu', name: 'Menu Editor', icon: Utensils },
              { id: 'coupons', name: 'Coupons', icon: Tag },
              { id: 'notifications', name: 'WhatsApp Logs', icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === item.id ? 'bg-caramel text-white shadow-glow' : 'text-coffee-300 hover:bg-coffee-900 hover:text-cream'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 pt-6 border-t border-coffee-800"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        
        <div className="flex items-center justify-between pb-8 border-b border-coffee-900">
          <div>
            <h1 className="font-serif text-3xl font-bold">Café Staff Management Dashboard</h1>
            <p className="text-xs text-coffee-300 mt-1">Real-time table status, live orders & WhatsApp notification logs</p>
          </div>

          <a href="/" target="_blank" className="px-4 py-2 rounded-full border border-caramel/50 text-caramel hover:bg-caramel hover:text-white text-xs font-semibold uppercase transition-colors">
            View Live Website ↗
          </a>
        </div>

        {activeTab === 'metrics' && metrics && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800">
                <span className="text-xs text-coffee-300 uppercase font-semibold">Today's Revenue</span>
                <h3 className="font-serif text-3xl font-bold text-caramel mt-2">₹{metrics.revenue}</h3>
              </div>
              <div className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800">
                <span className="text-xs text-coffee-300 uppercase font-semibold">Today's Orders</span>
                <h3 className="font-serif text-3xl font-bold text-cream mt-2">{metrics.orders}</h3>
              </div>
              <div className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800">
                <span className="text-xs text-coffee-300 uppercase font-semibold">Reservations</span>
                <h3 className="font-serif text-3xl font-bold text-cream mt-2">{metrics.reservations}</h3>
              </div>
              <div className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800">
                <span className="text-xs text-coffee-300 uppercase font-semibold">Available / Occupied</span>
                <h3 className="font-serif text-3xl font-bold text-emerald-400 mt-2">{metrics.availableTables} / {metrics.occupiedTables}</h3>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-coffee-950 border border-coffee-800">
              <h3 className="font-serif text-xl font-bold text-cream mb-4">Active Live Orders</h3>
              <div className="space-y-3">
                {orders.slice(0, 4).map((ord) => (
                  <div key={ord.id} className="flex items-center justify-between p-4 rounded-2xl bg-espresso border border-coffee-800 text-xs">
                    <div>
                      <span className="font-bold text-caramel">#{ord.orderNumber}</span> — {ord.customerName} ({ord.orderType})
                      <p className="text-coffee-400 mt-0.5">{ord.items.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-cream">₹{ord.totalAmount}</span>
                      <span className="px-3 py-1 rounded-full bg-caramel/20 text-caramel font-semibold uppercase">{ord.orderStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="mt-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cream">Visual Table Grid Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {tables.map((t) => (
                <div key={t.id} className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800 flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-2xl font-bold text-cream">Table {t.tableNumber}</span>
                    <span className="text-xs text-coffee-300 font-semibold">{t.seats} Seats</span>
                  </div>

                  <span className={`self-start px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    t.status === 'Available' ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-500/40' :
                    t.status === 'Occupied' ? 'bg-rose-900/60 text-rose-400 border border-rose-500/40' :
                    t.status === 'Reserved' ? 'bg-caramel/30 text-caramel border border-caramel/50' : 'bg-coffee-800 text-coffee-300'
                  }`}>
                    {t.status}
                  </span>

                  <select
                    value={t.status}
                    onChange={(e) => updateTableStatus(t.id, e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-espresso border border-coffee-800 text-xs text-cream focus:outline-none"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="mt-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cream">Guest Reservations Pipeline</h2>
            <div className="space-y-4">
              {reservations.map((r) => (
                <div key={r.id} className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-caramel">#{r.reservationNumber}</span>
                      <h4 className="font-serif font-bold text-lg text-cream">{r.customerName}</h4>
                      <span className="text-xs text-coffee-400">({r.customerPhone})</span>
                    </div>
                    <p className="text-xs text-coffee-300 mt-1">
                      {r.reservationDate} at {r.reservationTime} — {r.guests} Guests (Table {r.tableNumber || 'Auto'})
                    </p>
                    {r.specialRequest && <p className="text-xs italic text-caramel/80 mt-1">"{r.specialRequest}"</p>}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-coffee-900 text-caramel border border-coffee-800">{r.status}</span>
                    <select
                      value={r.status}
                      onChange={(e) => updateReservationStatus(r.id, e.target.value)}
                      className="px-3 py-2 rounded-xl bg-espresso border border-coffee-800 text-xs text-cream focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Seated">Seated</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="mt-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cream">Kitchen & Barista Orders Pipeline</h2>
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-coffee-800 pb-3">
                    <div>
                      <span className="font-bold text-caramel">#{o.orderNumber}</span> — <span className="text-cream font-semibold">{o.customerName}</span> ({o.orderType})
                    </div>
                    <span className="font-serif text-lg font-bold text-caramel">₹{o.totalAmount}</span>
                  </div>

                  <div className="text-xs text-coffee-300 space-y-1">
                    {o.items.map((i: any) => (
                      <div key={i.id} className="flex justify-between">
                        <span>{i.quantity} × {i.name}</span>
                        <span>₹{i.unitPrice * i.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-coffee-800">
                    <span className="text-xs text-coffee-400">{new Date(o.createdAt).toLocaleTimeString()}</span>
                    <div className="flex items-center gap-3">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="px-3 py-2 rounded-xl bg-espresso border border-coffee-800 text-xs text-cream focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="mt-8 space-y-8">
            <div className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800">
              <h3 className="font-serif text-xl font-bold text-cream mb-4">Add New Menu Item to Database</h3>
              <form onSubmit={handleCreateMenuItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Item Name"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-espresso border border-coffee-800 text-xs text-cream focus:outline-none"
                />
                <input
                  type="number"
                  required
                  placeholder="Price (₹)"
                  value={newMenuPrice}
                  onChange={(e) => setNewMenuPrice(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-espresso border border-coffee-800 text-xs text-cream focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Description"
                  value={newMenuDesc}
                  onChange={(e) => setNewMenuDesc(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-espresso border border-coffee-800 text-xs text-cream focus:outline-none"
                />
                <button
                  type="submit"
                  className="py-2.5 bg-caramel hover:bg-coffee-500 text-white font-bold text-xs uppercase rounded-xl transition-colors"
                >
                  Add Item
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {menuItems.map((m) => (
                <div key={m.id} className="p-4 rounded-3xl bg-coffee-950 border border-coffee-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={m.image} alt={m.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-cream">{m.name}</h4>
                      <span className="text-xs text-caramel">₹{m.price}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteMenuItem(m.id)} className="p-2 text-rose-400 hover:text-rose-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'coupons' && (
          <div className="mt-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cream">Coupons & Offer Engine</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coupons.map((c) => (
                <div key={c.id} className="p-6 rounded-3xl bg-coffee-950 border border-coffee-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-caramel text-lg">{c.code}</span>
                    <p className="text-xs text-coffee-300 mt-1">{c.discountPercent}% Discount — Usage: {c.currentUsage}/{c.maxUsage}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-400 text-xs font-semibold">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="mt-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-cream">WhatsApp & System Notification Logs</h2>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="p-4 rounded-2xl bg-coffee-950 border border-coffee-800 text-xs">
                  <div className="flex justify-between font-bold text-caramel">
                    <span>{n.title}</span>
                    <span className="text-coffee-400">{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-coffee-200 mt-1 whitespace-pre-line">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
