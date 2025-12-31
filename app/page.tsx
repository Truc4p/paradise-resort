'use client';

import { useState } from 'react';
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaAward, FaLeaf, FaHeart, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaPlay, FaQuoteLeft } from 'react-icons/fa';

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { number: '500+', label: 'Luxury Rooms', icon: <FaStar /> },
    { number: '15+', label: 'Years Excellence', icon: <FaAward /> },
    { number: '50K+', label: 'Happy Guests', icon: <FaHeart /> },
    { number: '98%', label: 'Satisfaction Rate', icon: <FaUsers /> },
  ];

  const featuredRooms = [
    {
      name: 'Ocean View Suite',
      price: '$250',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
      rating: 4.9,
      features: ['Ocean View', 'King Bed', 'Private Balcony'],
    },
    {
      name: 'Presidential Villa',
      price: '$850',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
      rating: 5.0,
      features: ['Private Pool', 'Beach Access', '2 Bedrooms'],
    },
    {
      name: 'Garden View Room',
      price: '$180',
      image: 'https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=2070',
      rating: 4.7,
      features: ['Garden View', 'Queen Bed', 'Private Terrace'],
    },
  ];

  const upcomingEvents = [
    {
      title: 'Sunset Beach BBQ',
      date: 'Every Friday',
      time: '6:00 PM',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070',
      description: 'Live music and fresh seafood',
    },
    {
      title: 'Yoga on the Beach',
      date: 'Daily',
      time: '7:00 AM',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070',
      description: 'Start your day mindfully',
    },
    {
      title: 'Wine Tasting Evening',
      date: 'Saturdays',
      time: '7:00 PM',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070',
      description: 'Premium selection of wines',
    },
  ];

  const awards = [
    { title: 'Best Luxury Resort 2025', organization: 'Travel Excellence Awards' },
    { title: 'Top Rated Hotel', organization: 'TripAdvisor' },
    { title: 'Eco-Friendly Resort', organization: 'Green Tourism' },
    { title: 'Excellence in Service', organization: 'Hospitality Awards' },
  ];

  return (
    <>
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />

      {/* Video Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070"
            alt="Resort background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience Paradise</h2>
            <p className="text-xl mb-8 text-gray-300">
              Take a virtual tour of our stunning resort and discover what makes us special
            </p>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                 onClick={() => setIsVideoPlaying(true)}>
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080"
                alt="Video thumbnail"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FaPlay className="text-primary-600 text-2xl ml-1" />
                </div>
              </div>
            </div>
            {isVideoPlaying && (
              <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                   onClick={() => setIsVideoPlaying(false)}>
                <button className="absolute top-4 right-4 text-white text-4xl hover:text-primary-400 transition-colors">×</button>
                <div className="max-w-4xl w-full aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 relative"
                     onClick={(e) => e.stopPropagation()}>
                  {/* Video embed - Replace with actual video URL */}
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/STJbhVKAd1g?si=f5qGoDwQ6cmSAnWR"
                    title="Paradise Resort Virtual Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {/* Fallback for when iframe doesn't load */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-accent-900 flex flex-col items-center justify-center text-white pointer-events-none opacity-0 hover:opacity-0">
                    <FaPlay className="text-6xl mb-6 text-white/80" />
                    <h3 className="text-3xl font-bold mb-2">Experience Paradise</h3>
                    <p className="text-lg text-white/80">Virtual Tour Coming Soon</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Accommodations</h2>
            <p className="section-subtitle">Discover our most popular rooms</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full font-bold text-primary-600 shadow-lg">
                    {room.price}/night
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold">{room.name}</h3>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-amber-400" />
                      <span className="font-bold">{room.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features.map((feature, idx) => (
                      <span key={idx} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link href="/rooms" className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-semibold transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/rooms" className="inline-block bg-accent-600 hover:bg-accent-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-colors">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary-600 font-semibold mb-4">
              <FaCalendarAlt />
              <span className="uppercase tracking-wider text-sm">What's Happening</span>
            </div>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">Join us for exclusive experiences</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-accent-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    {event.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <FaClock />
                    <span>{event.time}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <Link href="/activities" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center gap-2">
                    Learn More <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-5xl mb-4 flex justify-center">
              <FaAward />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Award-Winning Excellence</h2>
            <p className="text-xl text-white/90">
              Recognized globally for exceptional service and hospitality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="text-3xl mb-3 flex justify-center">
                  <FaAward />
                </div>
                <h3 className="font-bold text-lg mb-2">{award.title}</h3>
                <p className="text-sm text-white/80">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram-style Highlight Quote */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FaQuoteLeft className="text-6xl text-primary-200 mb-6 mx-auto" />
            <blockquote className="text-3xl md:text-4xl font-light text-gray-800 leading-relaxed mb-8">
              "Paradise isn't just a place, it's a feeling. And at our resort, that feeling becomes your reality."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                PR
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">Paradise Resort</div>
                <div className="text-gray-600">Your Home Away From Home</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070"
                  alt="Sustainability"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-green-600 font-semibold mb-4">
                  <FaLeaf className="text-2xl" />
                  <span className="uppercase tracking-wider text-sm">Our Commitment</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">Sustainable Tourism</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We're committed to preserving the natural beauty that surrounds us. From solar power to ocean conservation, every decision we make considers our environmental impact.
                </p>
                <ul className="space-y-3 mb-8">
                  {['100% Renewable Energy', 'Zero Plastic Policy', 'Local Community Support', 'Marine Conservation Program'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary-600 font-semibold mb-4">
                <FaMapMarkerAlt />
                <span className="uppercase tracking-wider text-sm">Find Us</span>
              </div>
              <h2 className="section-title">Prime Location</h2>
              <p className="section-subtitle">Paradise awaits in the heart of tropical beauty</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Getting Here</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-primary-500 mt-1" />
                    <div>
                      <div className="font-semibold">Address</div>
                      <div>123 Paradise Beach Road, Tropical Island</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-primary-500 mt-1" />
                    <div>
                      <div className="font-semibold">From Airport</div>
                      <div>25 minutes drive - Complimentary transfer available</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-primary-500 mt-1" />
                    <div>
                      <div className="font-semibold">Nearby</div>
                      <div>City Center: 15 min | Marina: 10 min | Golf Course: 5 min</div>
                    </div>
                  </div>
                </div>
                <Link href="/contact" className="mt-8 block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-semibold transition-colors">
                  Get Directions
                </Link>
              </div>
              <div 
                className="relative h-96 rounded-2xl overflow-hidden shadow-lg group cursor-pointer hover:shadow-2xl transition-all"
                onClick={() => window.open('https://maps.google.com/?q=Paradise+Beach+Resort+Tropical+Island', '_blank')}
              >
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074"
                  alt="Resort location map"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center animate-pulse">
                      <FaMapMarkerAlt className="text-white text-xl" />
                    </div>
                    <div className="text-white">
                      <div className="font-bold text-lg">Paradise Beach Resort</div>
                      <div className="text-sm text-white/90">Tropical Island Paradise</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">4.9</div>
                      <div className="text-xs text-white/80">Rating</div>
                    </div>
                    <div className="text-center border-x border-white/20">
                      <div className="text-2xl font-bold text-white">25min</div>
                      <div className="text-xs text-white/80">From Airport</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">Beach</div>
                      <div className="text-xs text-white/80">Front</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-white text-sm font-semibold group-hover:gap-3 transition-all">
                    <span>View on Google Maps</span>
                    <span className="text-lg">↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Links to Main Sections */}
      <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-primary-600 font-semibold tracking-widest uppercase text-sm">Discover</span>
            </div>
            <h2 className="section-title">Explore Paradise Resort</h2>
            <p className="section-subtitle mt-6">
              Discover everything we have to offer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Rooms & Suites', 
                image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
                description: 'Luxurious accommodations with ocean views',
                link: '/rooms'
              },
              { 
                title: 'Dining', 
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
                description: 'World-class restaurants and bars',
                link: '/dining'
              },
              { 
                title: 'Special Offers', 
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',
                description: 'Exclusive packages and deals',
                link: '/offers'
              },
              { 
                title: 'Activities', 
                image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070',
                description: 'Recreation and entertainment',
                link: '/activities'
              },
              { 
                title: 'Gallery', 
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
                description: 'Visual tour of our paradise',
                link: '/gallery'
              },
              { 
                title: 'Contact', 
                image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070',
                description: 'Get in touch with us',
                link: '/contact'
              },
            ].map((section, index) => (
              <Link 
                key={index}
                href={section.link}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-4xl font-bold text-white mb-3 tracking-tight">{section.title}</h3>
                  <p className="text-white/95 mb-6 text-lg font-light">{section.description}</p>
                  <span className="inline-flex items-center gap-3 text-white font-semibold group-hover:gap-5 transition-all text-lg tracking-wide">
                    Explore <span className="text-2xl">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
