import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Tag, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { type MenuItemData } from './DynamicMenuSection';
import { defaultCafeConfig } from '../cafeConfig';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [key: string]: number };
  menuItems?: MenuItemData[];
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cart,
  menuItems = defaultCafeConfig.menuItems,
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

  const itemsToUse = menuItems.length > 0 ? menuItems : defaultCafeConfig.menuItems;

  const cartItemDetails = Object.keys(cart).map(id => {
    const item = itemsToUse.find(m => m.id === id);
    return item ? { ...item, quantity: cart[id] } : null;
  }).filter(Boolean) as (MenuItemData & { quantity: number })[];

  const subtotal = cartItemDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const tax = Math.round((subtotal - discount) * 0.05);
  const totalAmount = Math.round(subtotal - discount + tax);

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'WELCOME50' || cleanCode === 'BREW20') {
      setDiscountPercent(20);
      setCouponMsg('Demo Promo Code Applied! 20% Discount');
    } else if (cleanCode === 'BREWBEANS') {
      setDiscountPercent(15);
      setCouponMsg('Demo Promo Code Applied! 15% Discount');
    } else {
      setCouponMsg('Invalid demo code. Try WELCOME50');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const demoOrder = {
      orderNumber: `ORD-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: name,
      customerPhone: phone,
      orderType,
      items: cartItemDetails,
      totalAmount,
      createdAt: new Date().toISOString()
    };

    setSubmittedOrder(demoOrder);
    onClearCart();
  };

  const handleCloseAll = () => {
    setSubmittedOrder(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg bg-espresso border border-coffee-700/80 rounded-3xl p-6 sm:p-8 shadow-3d text-cream max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={handleCloseAll}
          className="absolute top-5 right-5 p-2 text-coffee-300 hover:text-cream rounded-full hover:bg-coffee-800 transition-colors focus:outline-none focus:ring-2 focus:ring-caramel"
          aria-label="Close Cart Modal"
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
                <h3 id="cart-modal-title" className="font-serif text-xl sm:text-2xl font-bold">
                  Your Order Cart (Demo Flow)
                </h3>
                <p className="text-xs text-coffee-300">{cartItemDetails.length} items selected</p>
              </div>
            </div>

            {/* Demo Notice Banner */}
            <div className="mt-4 p-3 rounded-2xl bg-coffee-950/80 border border-coffee-800/80 text-[11px] text-coffee-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-caramel shrink-0 mt-0.5" />
              <span>
                <strong className="text-cream">Demo Checkout:</strong> Experience our online ordering workflow. In a production client installation, this connects to Razorpay / Stripe or WhatsApp order dispatch.
              </span>
            </div>

            {/* Order Type Toggle */}
            <div className="mt-4 flex bg-coffee-950 p-1 rounded-2xl border border-coffee-800">
              {(['Dine-in', 'Takeaway', 'Delivery'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-2 text-[11px] font-semibold rounded-xl uppercase tracking-wider transition-all focus:outline-none ${
                    orderType === type ? 'bg-caramel text-white shadow-glow' : 'text-coffee-300 hover:text-cream'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Selected Items */}
            <div className="mt-4 space-y-2.5 max-h-44 overflow-y-auto pr-1">
              {cartItemDetails.length === 0 ? (
                <p className="text-xs text-coffee-400 text-center py-6">Your cart is empty. Add items from the menu!</p>
              ) : (
                cartItemDetails.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-coffee-950/90 border border-coffee-800/80">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-cream">{item.name}</h4>
                        <span className="text-[11px] text-caramel">₹{item.price} × {item.quantity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-cream">₹{item.price * item.quantity}</span>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-coffee-400 hover:text-rose-400 p-1 focus:outline-none"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Coupon Code Input */}
            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Demo Coupon (e.g. WELCOME50)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream uppercase focus:border-caramel focus:outline-none"
                />
                <Tag className="w-3.5 h-3.5 text-caramel absolute left-2.5 top-2.5" />
              </div>
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-3.5 py-2 bg-coffee-800 hover:bg-caramel text-cream text-xs font-semibold rounded-xl uppercase transition-colors"
              >
                Apply
              </button>
            </div>
            {couponMsg && <p className="text-[11px] text-caramel mt-1 font-medium">{couponMsg}</p>}

            {/* Price Calculations */}
            <div className="mt-4 p-3.5 rounded-2xl bg-coffee-950/90 border border-coffee-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-coffee-300">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Demo Coupon Discount ({discountPercent}%):</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-coffee-300">
                <span>Estimated Taxes & GST (5%):</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-cream pt-2 border-t border-coffee-800">
                <span>Total Amount:</span>
                <span className="text-caramel">₹{totalAmount}</span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="mt-4 space-y-3">
              {orderType === 'Dine-in' && (
                <div>
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                    Table Number
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={20}
                    value={tableNumber}
                    onChange={(e) => setTableNumber(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none"
                  />
                </div>
              )}

              {orderType === 'Delivery' && (
                <div>
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
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
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
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
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                  Special Cooking Instructions (Optional)
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
                disabled={cartItemDetails.length === 0}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all hover:scale-[1.01] mt-2 flex items-center justify-center gap-2 border border-amber-300/30"
              >
                Place Demo Order (₹{totalAmount}) <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">Demo Order Placed!</h3>

            <p className="text-coffee-300 text-xs leading-relaxed max-w-xs mx-auto">
              Sample order <span className="text-caramel font-semibold">{submittedOrder.orderNumber}</span> has been processed in this demo interface.
            </p>

            <div className="p-3.5 rounded-2xl bg-coffee-950 border border-coffee-800 text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-coffee-800/60 pb-1.5">
                <span className="text-coffee-400">Customer:</span>
                <span className="font-semibold text-cream">{submittedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-coffee-800/60 pb-1.5">
                <span className="text-coffee-400">Order Type:</span>
                <span className="font-semibold text-cream">{submittedOrder.orderType}</span>
              </div>
              <div className="flex justify-between border-b border-coffee-800/60 pb-1.5">
                <span className="text-coffee-400">Total Amount:</span>
                <span className="font-bold text-caramel">₹{submittedOrder.totalAmount}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-coffee-950/80 border border-coffee-800/80 text-[11px] text-coffee-300 text-left">
              💡 <strong>Production Note:</strong> On a live client deployment, this step triggers instant SMS updates and dispatches payment processing.
            </div>

            <button
              onClick={handleCloseAll}
              className="mt-4 px-7 py-2.5 rounded-full bg-coffee-800 hover:bg-caramel text-cream text-xs uppercase font-bold tracking-wider transition-colors"
            >
              Back to Café Demo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
