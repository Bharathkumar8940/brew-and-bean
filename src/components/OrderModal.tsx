import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: any | null;
}

export default function OrderModal({ isOpen, onClose, selectedItem }: OrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Brew & Bean Café WhatsApp Number updated as requested
  const cafeWhatsAppNumber = "918639098389";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C67C38', '#653B1A', '#FAF5EE']
      });
    } catch (err) {}

    // Construct formatted WhatsApp message
    const itemName = selectedItem ? selectedItem.name : "Table Reservation / General Order";
    const itemPrice = selectedItem ? `₹${selectedItem.price}` : "N/A";
    
    const message = `*☕ NEW ORDER - BREW & BEAN CAFÉ*\n\n` +
      `*Customer Name:* ${name}\n` +
      `*Customer Phone:* ${phone}\n` +
      `*Selected Item:* ${itemName} (${itemPrice})\n` +
      (notes ? `*Special Notes/Time:* ${notes}\n` : '') +
      `\n_Sent via Brew & Bean Café Website_`;

    const whatsappUrl = `https://wa.me/${cafeWhatsAppNumber}?text=${encodeURIComponent(message)}`;

    // Automatically open WhatsApp in a new tab after brief feedback delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-espresso border border-coffee-700/80 rounded-3xl p-8 shadow-3d text-cream">
        
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 text-coffee-300 hover:text-cream rounded-full hover:bg-coffee-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-caramel/20 border border-caramel/40 flex items-center justify-center text-caramel">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold">WhatsApp Order</h3>
                <p className="text-xs text-coffee-300">Direct order to +91 86390 98389</p>
              </div>
            </div>

            {selectedItem && (
              <div className="mt-6 p-4 rounded-2xl bg-coffee-950/90 border border-coffee-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedItem.image && (
                    <img src={selectedItem.image} alt={selectedItem.name} className="w-12 h-12 rounded-xl object-cover" />
                  )}
                  <div>
                    <h4 className="font-serif font-bold text-cream text-sm">{selectedItem.name}</h4>
                    <span className="text-xs text-caramel font-semibold">₹{selectedItem.price}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-caramel/20 text-caramel border border-caramel/40">
                  Selected
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1.5">
                  Your Contact Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1.5">
                  Special Notes / Preferred Time
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Extra hot espresso with oat milk at 4:30 PM..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-sm focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all hover:scale-[1.02] mt-2 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Send Order via WhatsApp
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
              <MessageCircle className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-cream">Opening WhatsApp...</h3>

            <p className="text-coffee-300 text-sm leading-relaxed max-w-xs mx-auto">
              Your order details for <span className="text-caramel font-semibold">{name}</span> have been formatted. Redirecting to WhatsApp (+91 86390 98389)!
            </p>

            <button
              onClick={handleResetAndClose}
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
