import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, PlusCircle, CheckCircle, MessageSquare } from 'lucide-react';

export interface Review {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
}

export default function Testimonials() {
  // Load reviews from localStorage so real reviews persist across reloads
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('cafe_guest_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('cafe_guest_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Guest',
      comment: comment.trim(),
      rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setReviews(prev => [newReview, ...prev]);
    setSubmitted(true);
  };

  const handleResetModal = () => {
    setName('');
    setRole('');
    setComment('');
    setRating(5);
    setSubmitted(false);
    setIsModalOpen(false);
  };

  return (
    <section className="py-24 bg-coffee-950 border-t border-coffee-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header with Leave a Review Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-caramel uppercase tracking-[0.25em] font-semibold text-xs inline-flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Guest Reviews & Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-2">
              Guest Experiences
            </h2>
            <p className="text-coffee-300 mt-2 text-xs sm:text-base leading-relaxed">
              Read real experiences shared by our café guests or leave your own review.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="shine-sweep-container px-6 py-3.5 rounded-full bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel text-white font-bold text-xs uppercase tracking-wider shadow-glow transition-all hover:scale-105 flex items-center gap-2 border border-amber-300/40 shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> Leave a Review
          </button>
        </div>

        {/* Reviews Grid / Empty State */}
        {reviews.length === 0 ? (
          <div className="mt-12 p-10 rounded-3xl bg-espresso/60 border border-coffee-800/80 text-center max-w-xl mx-auto">
            <MessageSquare className="w-12 h-12 text-caramel/40 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-cream">No Guest Reviews Yet</h3>
            <p className="text-coffee-300 text-xs mt-2 leading-relaxed">
              Be the very first guest to share your experience with us! Click below to leave your review.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-5 px-6 py-2.5 rounded-full bg-caramel hover:bg-coffee-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              Write First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
            <AnimatePresence mode="popLayout">
              {reviews.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-3xl bg-espresso/80 border border-coffee-800/80 hover:border-caramel/50 transition-all flex flex-col justify-between shadow-2xl relative group"
                >
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-caramel/20 absolute top-6 right-6 group-hover:text-caramel/40 transition-colors" />

                  <div>
                    <div className="flex items-center gap-1 text-caramel">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <p className="text-coffee-200 text-xs sm:text-sm italic mt-5 leading-relaxed">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-coffee-800/60">
                    <div>
                      <h4 className="font-serif text-cream font-bold text-sm sm:text-base">{t.name}</h4>
                      <p className="text-coffee-400 text-[11px]">{t.role}</p>
                    </div>
                    <span className="text-[10px] text-coffee-400 font-medium">
                      {t.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Write a Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-espresso border border-coffee-700/80 rounded-3xl p-6 sm:p-8 shadow-3d text-cream">
              <button
                onClick={handleResetModal}
                className="absolute top-5 right-5 p-2 text-coffee-300 hover:text-cream rounded-full hover:bg-coffee-800 transition-colors focus:outline-none"
              >
                ✕
              </button>

              {!submitted ? (
                <div>
                  <h3 className="font-serif text-2xl font-bold">Leave a Guest Review</h3>
                  <p className="text-xs text-coffee-300 mt-1">Share your café visit, coffee, or food experience.</p>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div>
                      <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">Star Rating</label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= rating ? 'text-caramel fill-current' : 'text-coffee-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">Your Role / Description (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Coffee Lover / Regular Visitor"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-coffee-300 mb-1">Your Review *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tell us about the coffee, ambiance, service, or food..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-coffee-950 border border-coffee-800 text-xs text-cream focus:border-caramel focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-caramel via-amber-600 to-coffee-600 hover:from-amber-500 hover:to-caramel text-white font-bold text-xs uppercase tracking-widest shadow-glow transition-all"
                    >
                      Post Review
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto animate-pulse" />
                  <h3 className="font-serif text-2xl font-bold">Thank You for Your Review!</h3>
                  <p className="text-xs text-coffee-300 max-w-xs mx-auto leading-relaxed">
                    Your feedback has been posted and added to our guest stories list.
                  </p>
                  <button
                    onClick={handleResetModal}
                    className="px-6 py-2.5 rounded-full bg-caramel text-white text-xs font-bold uppercase tracking-wider hover:bg-coffee-500 transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
