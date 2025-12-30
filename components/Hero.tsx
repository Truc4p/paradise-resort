'use client';

import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
      </div>

      {/* Animated Overlay Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold tracking-wider mb-4">
            LUXURY BEACHFRONT RESORT
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.95] tracking-tighter"
        >
          Your Paradise
          <br />
          <span className="bg-gradient-to-r from-primary-300 via-accent-300 to-primary-400 bg-clip-text text-transparent drop-shadow-2xl">
            Awaits
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-white/95 font-light"
        >
          Discover unparalleled luxury on pristine beaches. Experience world-class dining, rejuvenating spa treatments, and breathtaking ocean views.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/rooms" className="btn-primary text-lg uppercase tracking-wider">
            Explore Rooms
          </Link>
          <Link href="/contact" className="bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 font-semibold px-10 py-4 rounded-full transition-all duration-500 shadow-2xl hover:shadow-2xl hover:-translate-y-0.5 text-lg uppercase tracking-wider">
            Book Your Stay
          </Link>
          <button className="flex items-center gap-4 text-white hover:text-primary-300 transition-all duration-300 font-medium group">
            <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-all duration-300 border border-white/30 group-hover:border-white/50 shadow-xl">
              <FaPlay className="text-white ml-1 text-sm" />
            </div>
            <span className="text-lg">Watch Video</span>
          </button>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-6 lg:gap-8"
        >
          {['Private Beach Access', 'Infinity Pool', 'Award-Winning Spa', '5-Star Dining'].map((feature, index) => (
            <div key={index} className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center gap-3 hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg">
              <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></div>
              <span className="text-white font-medium tracking-wide">{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-white text-sm mb-2 tracking-wider">SCROLL</span>
          <div className="text-white text-2xl">↓</div>
        </motion.div>
      </div>
    </section>
  );
}
