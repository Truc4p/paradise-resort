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
    <section className="relative py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Gradient Overlays for Depth */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-6 bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-sm rounded-full mb-8 border border-primary-400/20">
            <FaEnvelope className="text-5xl text-primary-400" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Stay in Touch
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, travel tips, and resort updates
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-8 py-5 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400/50 text-lg border border-white/10 focus:bg-white/15 transition-all"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold px-10 py-5 rounded-full transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-0.5 uppercase tracking-wider text-sm"
              >
                <FaPaperPlane />
                Subscribe
              </button>
            </div>
          </form>

          {subscribed && (
            <div className="mt-8 bg-primary-500/20 backdrop-blur-sm text-white px-8 py-4 rounded-full inline-flex items-center gap-3 border border-primary-400/30 animate-fadeIn">
              <span className="text-2xl">✓</span>
              <span className="font-medium">Thank you for subscribing! Check your email for confirmation.</span>
            </div>
          )}

          <p className="text-sm text-gray-400 mt-8 font-light">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
