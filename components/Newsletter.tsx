'use client';

import { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your newsletter service
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="inline-block p-4 bg-white/20 rounded-full mb-6">
            <FaEnvelope className="text-5xl" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay in Touch
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Subscribe to our newsletter for exclusive offers, travel tips, and resort updates
          </p>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg"
              />
              <button
                type="submit"
                className="bg-white text-primary-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
              >
                <FaPaperPlane />
                Subscribe
              </button>
            </div>
          </form>

          {subscribed && (
            <div className="mt-6 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full inline-block">
              ✓ Thank you for subscribing! Check your email for confirmation.
            </div>
          )}

          <p className="text-sm text-white/70 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
