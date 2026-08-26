import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Tag, ArrowRight, CheckCircle } from 'lucide-react';
import { type MenuItemData } from './DynamicMenuSection';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [key: string]: number };
  menuItems: MenuItemData[];
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cart,
  menuItems,
  onRemoveFromCart,
  onClearCart,
}: CartModalProps) {
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway' | 'Delivery'>('Dine-in');
  const [tableNumber, setTableNumber] = useState<number>(4);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);

  if (!isOpen) return null;

  const cartItemDetails = Object.keys(cart).map(id => {
    const item = menuItems.find(m => m.id === id);
    return item ? { ...item, quantity: cart[id] } : null;
  }).filter(Boolean) as (MenuItemData & { quantity: number })[];

  const subtotal = cartItemDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const tax = Math.round((subtotal - discount) * 0.05);
  const totalAmount = Math.round(subtotal - discount + tax);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      const res = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setDiscountPercent(data.discountPercent);
        setCouponMsg(data.message);
      } else {
        setCouponMsg(data.error);
      }
    } catch (e) {
      setCouponMsg('Coupon error');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        customerName: name,
        customerPhone: phone,
        orderType,
        tableNumber: orderType === 'Dine-in' ? tableNumber : undefined,
        deliveryAddress: orderType === 'Delivery' ? deliveryAddress : undefined,
        items: cartItemDetails,
        couponCode,
        notes,
      };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedOrder(data.order);
        onClearCart();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseAll = () => {
    setSubmittedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-espresso border border-coffee-700/80 rounded-3xl p-8 shadow-3d text-cream max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={handleCloseAll}
          className="absolute top-6 right-6 p-2 text-coffee-300 hover:text-cream rounded-full hover:bg-coffee-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedOrder ? (
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-caramel/20 border border-caramel/40 flex items-center justify-center text-caramel">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold">Your Order Cart</h3>
                <p className="text-xs text-coffee-300">{cartItemDetails.length} unique items selected</p>
              </div>
            </div>

            <div className="mt-6 flex bg-coffee-950 p-1 rounded-2xl border border-coffee-800">
              {(['Dine-in', 'Takeaway', 'Delivery'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all ${
                    orderType === type ? 'bg-caramel text-white shadow-glow' : 'text-coffee-300 hover:text-cream'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3 max-h-48 overflow-y-auto pr-1">
              {cartItemDetails.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-coffee-950/80 border border-coffee-800">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-cream">{item.name}</h4>
                      <span className="text-xs text-caramel">₹{item.price} × {item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-cream">₹{item.price * item.quantity}</span>
                    <button onClick={() => onRemoveFromCart(item.id)} className="text-coffee-400 hover:text-rose-400 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. WELCOME50)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream uppercase focus:border-caramel focus:outline-none"
                />
                <Tag className="w-3.5 h-3.5 text-caramel absolute left-3 top-3" />
              </div>
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-coffee-800 hover:bg-caramel text-cream text-xs font-semibold rounded-xl uppercase transition-colors"
              >
                Apply
              </button>
            </div>
            {couponMsg && <p className="text-[11px] text-caramel mt-1">{couponMsg}</p>}

            <div className="mt-4 p-4 rounded-2xl bg-coffee-950/90 border border-coffee-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-coffee-300">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount ({discountPercent}%):</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-coffee-300">
                <span>Taxes & GST (5%):</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-cream pt-2 border-t border-coffee-800">
                <span>Total Amount:</span>
                <span className="text-caramel">₹{totalAmount}</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="mt-4 space-y-3">
              {orderType === 'Dine-in' && (
                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Table Number
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={12}
                    value={tableNumber}
                    onChange={(e) => setTableNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none"
                  />
                </div>
              )}

              {orderType === 'Delivery' && (
                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House 42, Heritage Boulevard, Indiranagar..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none resize-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="8639098389"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                  Special Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Less sugar on cappuccino..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-caramel to-coffee-600 hover:from-coffee-500 hover:to-caramel text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all hover:scale-[1.02] mt-2 flex items-center justify-center gap-2"
              >
                Place Order (₹{totalAmount}) <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-cream">Order Received!</h3>

            <p className="text-coffee-300 text-sm leading-relaxed max-w-xs mx-auto">
              Order <span className="text-caramel font-semibold">#{submittedOrder.orderNumber}</span> has been dispatched to our barista kitchen pipeline!
            </p>

            <button
              onClick={handleCloseAll}
              className="mt-6 px-8 py-3 rounded-full bg-coffee-800 hover:bg-caramel text-cream text-xs uppercase font-bold tracking-wider transition-colors"
            >
              Back to Café
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
