import React, { useState } from 'react';
import { Calendar, CheckCircle, Info } from 'lucide-react';
import { defaultCafeConfig } from '../cafeConfig';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TableReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [reservationDate, setReservationDate] = useState('2026-09-05');
  const [reservationTime, setReservationTime] = useState('7:30 PM');
  const [guests, setGuests] = useState(2);
  const [specialRequest, setSpecialRequest] = useState('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [reservationId, setReservationId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `BB-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      id="reservations-section"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg bg-espresso border border-coffee-700/80 rounded-3xl p-6 sm:p-8 shadow-3d text-cream max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 text-coffee-300 hover:text-cream rounded-full hover:bg-coffee-800 transition-colors focus:outline-none focus:ring-2 focus:ring-caramel"
          aria-label="Close Reservation Modal"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-caramel/20 border border-caramel/40 flex items-center justify-center text-caramel">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 id="reservation-modal-title" className="font-serif text-xl sm:text-2xl font-bold">
                  Book a Table (Demo Flow)
                </h3>
                <p className="text-xs text-coffee-300">Experience our interactive guest reservation process</p>
              </div>
            </div>

            {/* Demo Notice Banner */}
            <div className="mt-4 p-3 rounded-2xl bg-coffee-950/80 border border-coffee-800/80 text-[11px] text-coffee-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-caramel shrink-0 mt-0.5" />
              <span>
                <strong className="text-cream">Portfolio Demo Mode:</strong> Submitting this form simulates a reservation request. In a live production deployment, this request automatically routes to your café management dashboard or WhatsApp desk.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream text-xs focus:outline-none"
                  >
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream text-xs focus:outline-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={8}>8+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-semibold text-coffee-300 mb-1">
                  Special Request (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday celebration table setup..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-xs focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all hover:scale-[1.01] mt-2 border border-amber-300/30"
              >
                Submit Reservation Request (Demo)
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-caramel/20 border border-caramel/40 text-caramel flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-cream">Reservation Request Received</h3>

            <p className="text-xs text-coffee-300 max-w-xs mx-auto leading-relaxed">
              Your sample booking request <strong className="text-caramel">{reservationId}</strong> has been logged into the demo interface.
            </p>

            <div className="p-4 rounded-2xl bg-coffee-950 border border-coffee-800/80 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-coffee-800/60 pb-2">
                <span className="text-coffee-400">Guest Name:</span>
                <span className="font-semibold text-cream">{customerName}</span>
              </div>
              <div className="flex justify-between border-b border-coffee-800/60 pb-2">
                <span className="text-coffee-400">Date & Time:</span>
                <span className="font-semibold text-cream">{reservationDate} at {reservationTime}</span>
              </div>
              <div className="flex justify-between border-b border-coffee-800/60 pb-2">
                <span className="text-coffee-400">Party Size:</span>
                <span className="font-semibold text-cream">{guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-400">Status:</span>
                <span className="font-bold text-amber-400">Request Pending Café Confirmation</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-coffee-950/80 border border-coffee-800/80 text-[11px] text-coffee-300 text-left">
              💡 <strong>Production Note:</strong> In a real client installation, this form triggers an instant WhatsApp confirmation to {defaultCafeConfig.contact.phone} and logs into the manager dashboard.
            </div>

            <button
              onClick={handleReset}
              className="mt-2 px-6 py-2.5 rounded-full bg-caramel text-white text-xs font-bold uppercase tracking-wider hover:bg-coffee-500 transition-colors"
            >
              Close Demo Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
