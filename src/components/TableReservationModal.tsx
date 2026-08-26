import React, { useState } from 'react';
import { Calendar, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TableReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [reservationDate, setReservationDate] = useState('2026-08-30');
  const [reservationTime, setReservationTime] = useState('7:30 PM');
  const [guests, setGuests] = useState(2);
  const [specialRequest, setSpecialRequest] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [confirmation, setConfirmation] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleCheckAvailability = async () => {
    setChecking(true);
    try {
      const res = await fetch('http://localhost:5000/api/reservations/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: reservationDate, time: reservationTime, guests }),
      });
      const data = await res.json();
      setAvailable(data.available);
    } catch (err) {
      setAvailable(true);
    } finally {
      setChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          reservationDate,
          reservationTime,
          guests,
          specialRequest,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmation(data.reservation);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    setAvailable(null);
    onClose();
  };

  return (
    <div id="reservations-section" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-espresso border border-coffee-700/80 rounded-3xl p-8 shadow-3d text-cream max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={handleReset}
          className="absolute top-6 right-6 p-2 text-coffee-300 hover:text-cream rounded-full hover:bg-coffee-800 transition-colors"
        >
          ✕
        </button>

        {!confirmation ? (
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-caramel/20 border border-caramel/40 flex items-center justify-center text-caramel">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold">Book a Table</h3>
                <p className="text-xs text-coffee-300">Instant reservation & automated table assignment</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream text-xs focus:outline-none"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream text-xs focus:outline-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={8}>8+ Guests</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleCheckAvailability}
                    disabled={checking}
                    className="w-full py-2.5 rounded-xl bg-coffee-800 hover:bg-coffee-700 text-cream text-xs uppercase font-semibold transition-colors"
                  >
                    {checking ? 'Checking...' : 'Check Tables'}
                  </button>
                </div>
              </div>

              {available !== null && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${available ? 'bg-emerald-900/40 border border-emerald-500/50 text-emerald-300' : 'bg-rose-900/40 border border-rose-500/50 text-rose-300'}`}>
                  {available ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{available ? 'Tables available for your selected time!' : 'High demand slot. Request pending manager approval.'}</span>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">
                  Special Request
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday celebration table setup..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 focus:border-caramel text-cream placeholder-coffee-600 text-xs focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-caramel to-coffee-600 hover:from-coffee-500 hover:to-caramel text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all hover:scale-[1.02] mt-2"
              >
                Confirm Reservation Request
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-caramel/20 border border-caramel/40 text-caramel flex items-center justify-center mx-auto animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-cream">Reservation Confirmed!</h3>

            <div className="p-4 rounded-2xl bg-coffee-950 border border-coffee-800 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-coffee-800 pb-2">
                <span className="text-coffee-400">Reservation ID:</span>
                <span className="font-bold text-caramel">{confirmation.reservationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-400">Guest Name:</span>
                <span className="font-semibold text-cream">{confirmation.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-400">Date & Time:</span>
                <span className="font-semibold text-cream">{confirmation.reservationDate} at {confirmation.reservationTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-400">Party Size:</span>
                <span className="font-semibold text-cream">{confirmation.guests} Guests</span>
              </div>
              <div className="flex justify-between border-t border-coffee-800 pt-2">
                <span className="text-coffee-400">Table:</span>
                <span className="font-bold text-emerald-400">Table {confirmation.tableNumber}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-caramel text-white text-xs font-bold uppercase tracking-wider hover:bg-coffee-500 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
