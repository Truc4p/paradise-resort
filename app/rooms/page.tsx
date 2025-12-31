'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaExpand, FaWifi, FaTv, FaCoffee, FaBath, FaUsers, FaStar, FaCheck, FaSwimmingPool, FaUtensilSpoon, FaDumbbell, FaSpa, FaParking, FaConciergeBell, FaShieldAlt, FaWind, FaHeart, FaShareAlt, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const rooms = [
  {
    name: 'Deluxe Ocean View',
    slug: 'deluxe-ocean-view',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070',
    ],
    price: '$250',
    priceUnit: 'per night',
    description: 'Spacious room with stunning ocean views and private balcony. Perfect for couples or solo travelers seeking tranquility.',
    features: ['King Bed', 'Ocean View', 'Private Balcony', '45 m²'],
    amenities: ['Free WiFi', 'Smart TV', 'Coffee Maker', 'Minibar', 'Luxury Bathroom', 'Air Conditioning'],
    maxGuests: 2,
    rating: 4.8,
    reviews: 156,
    popular: true,
  },
  {
    name: 'Premium Suite',
    slug: 'premium-suite',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070',
    ],
    price: '$450',
    priceUnit: 'per night',
    description: 'Luxurious suite with separate living area and panoramic views. Ideal for extended stays or special occasions.',
    features: ['King Bed', 'Living Room', 'Ocean View Balcony', '75 m²'],
    amenities: ['Free WiFi', 'Smart TV', 'Espresso Machine', 'Premium Minibar', 'Spa Bathroom', 'Workspace'],
    maxGuests: 3,
    rating: 4.9,
    reviews: 203,
    popular: false,
  },
  {
    name: 'Presidential Villa',
    slug: 'presidential-villa',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=2070',
      'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=2070',
    ],
    price: '$850',
    priceUnit: 'per night',
    description: 'Ultimate luxury with private pool and beachfront access. Experience unparalleled comfort and exclusive amenities.',
    features: ['2 Bedrooms', 'Private Pool', 'Beach Access', '150 m²'],
    amenities: ['Free WiFi', 'Smart TVs', 'Full Kitchen', 'Premium Minibar', 'Jacuzzi', 'Butler Service'],
    maxGuests: 6,
    rating: 5.0,
    reviews: 89,
    popular: true,
  },
  {
    name: 'Garden View Room',
    slug: 'garden-view-room',
    image: 'https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=2070',
      'https://images.unsplash.com/photo-1560185009-5bf9f2849488?q=80&w=2070',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070',
    ],
    price: '$180',
    priceUnit: 'per night',
    description: 'Cozy room overlooking lush tropical gardens with a private terrace. Perfect for nature lovers and peaceful stays.',
    features: ['Queen Bed', 'Garden View', 'Private Terrace', '35 m²'],
    amenities: ['Free WiFi', 'LED TV', 'Coffee Maker', 'Safe', 'Rainfall Shower', 'Air Conditioning'],
    maxGuests: 2,
    rating: 4.7,
    reviews: 127,
    popular: false,
  },
  {
    name: 'Family Suite',
    slug: 'family-suite',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070',
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?q=80&w=2070',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070',
    ],
    price: '$550',
    priceUnit: 'per night',
    description: 'Spacious two-bedroom suite designed for families with connecting rooms and kid-friendly amenities.',
    features: ['2 Bedrooms', 'Connecting Rooms', 'Ocean View', '95 m²'],
    amenities: ['Free WiFi', '2 Smart TVs', 'Kitchenette', 'Baby Cot Available', 'Kids Amenities', 'Game Console'],
    maxGuests: 5,
    rating: 4.8,
    reviews: 94,
    popular: true,
  },
];

const resortAmenities = [
  { icon: <FaSwimmingPool />, name: 'Infinity Pool', description: '3 pools including heated options' },
  { icon: <FaUtensilSpoon />, name: 'Dining', description: '4 restaurants & bars' },
  { icon: <FaDumbbell />, name: 'Fitness Center', description: '24/7 gym access' },
  { icon: <FaSpa />, name: 'Spa & Wellness', description: 'Full-service spa' },
  { icon: <FaWifi />, name: 'Free WiFi', description: 'High-speed throughout' },
  { icon: <FaParking />, name: 'Free Parking', description: 'Valet available' },
  { icon: <FaConciergeBell />, name: 'Concierge', description: '24/7 service' },
  { icon: <FaShieldAlt />, name: 'Security', description: '24-hour security' },
];

const roomPolicies = [
  { title: 'Check-in', info: '3:00 PM', details: 'Early check-in subject to availability' },
  { title: 'Check-out', info: '12:00 PM', details: 'Late check-out available for a fee' },
  { title: 'Cancellation', info: 'Free up to 48h', details: 'Full refund if cancelled 48 hours before arrival' },
  { title: 'Children', info: 'All ages welcome', details: 'Kids under 12 stay free' },
  { title: 'Pets', info: 'Not allowed', details: 'Service animals are welcome' },
  { title: 'Smoking', info: 'Non-smoking', details: 'Designated smoking areas available' },
];

const guestReviews = [
  {
    name: 'Emily Rodriguez',
    country: 'USA',
    rating: 5,
    date: 'December 2025',
    room: 'Presidential Villa',
    comment: 'Absolutely stunning! The villa exceeded all expectations. Private pool was amazing and the butler service was impeccable.',
    helpful: 45,
  },
  {
    name: 'James Chen',
    country: 'Singapore',
    rating: 5,
    date: 'November 2025',
    room: 'Premium Suite',
    comment: 'Perfect for our anniversary. The ocean view was breathtaking and the staff went above and beyond to make it special.',
    helpful: 38,
  },
  {
    name: 'Sophie Laurent',
    country: 'France',
    rating: 4,
    date: 'October 2025',
    room: 'Deluxe Ocean View',
    comment: 'Beautiful room with excellent amenities. The balcony was our favorite spot for morning coffee. Highly recommend!',
    helpful: 29,
  },
];

export default function RoomsPage() {
  const [favoriteRooms, setFavoriteRooms] = useState<Set<string>>(new Set());
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const toggleFavorite = (roomSlug: string) => {
    setFavoriteRooms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roomSlug)) {
        newSet.delete(roomSlug);
      } else {
        newSet.add(roomSlug);
      }
      return newSet;
    });
  };

  const handleShare = (roomName: string) => {
    if (navigator.share) {
      navigator.share({
        title: roomName,
        text: `Check out ${roomName} at our resort!`,
        url: window.location.href,
      });
    } else {
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Rooms & Suites</h1>
          <p className="text-xl md:text-2xl mb-6">Discover your perfect retreat</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#rooms" className="bg-primary-600 hover:bg-primary-700 px-8 py-3 rounded-lg font-bold transition-colors">
              Browse Rooms
            </Link>
            <Link href="#compare" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white px-8 py-3 rounded-lg font-bold transition-colors">
              Compare Options
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-sm opacity-90">Room Types</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">669</div>
              <div className="text-sm opacity-90">Guest Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section id="rooms" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Choose Your Perfect Room</h2>
            <p className="section-subtitle">Luxury accommodations for every preference</p>
          </div>

          <div className="space-y-16">
            {rooms.map((room, index) => (
              <div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all`}
              >
                <div className="lg:w-1/2 relative h-96 lg:h-auto group">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {room.popular && (
                    <div className="absolute top-4 left-4 bg-accent-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                      <FaStar /> Most Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => toggleFavorite(room.slug)}
                      className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                        favoriteRooms.has(room.slug) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <FaHeart />
                    </button>
                    <button 
                      onClick={() => handleShare(room.name)}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <FaShareAlt />
                    </button>
                  </div>

                  {/* Gallery Preview */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {room.gallery.slice(1, 4).map((img, idx) => (
                      <div key={idx} className="relative w-20 h-16 rounded overflow-hidden border-2 border-white">
                        <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-3xl md:text-4xl font-bold">{room.name}</h2>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(room.rating) ? '' : 'opacity-30'} />
                      ))}
                    </div>
                    <span className="font-bold text-lg">{room.rating}</span>
                    <span className="text-gray-500">({room.reviews} reviews)</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      {room.price}
                    </span>
                    <span className="text-gray-600">{room.priceUnit}</span>
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{room.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <FaBed className="text-primary-500" /> Room Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {room.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <FaCheck className="text-green-500" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-6 pb-6 border-b">
                    <FaUsers />
                    <span>Accommodates up to {room.maxGuests} guests</span>
                  </div>

                  <div className="flex gap-4">
                    <Link href="/contact" className="flex-1 btn-primary text-center flex items-center justify-center gap-2">
                      <FaCalendarAlt /> Book Now
                    </Link>
                    <Link href={`/rooms/${room.slug}`} className="flex-1 btn-secondary text-center flex items-center justify-center gap-2">
                      <FaInfoCircle /> View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resort Amenities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Resort Amenities</h2>
            <p className="section-subtitle">Everything you need for a perfect stay</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resortAmenities.map((amenity, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center">
                <div className="text-5xl text-primary-600 mb-4 flex justify-center">
                  {amenity.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{amenity.name}</h3>
                <p className="text-gray-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Guests Say</h2>
            <p className="section-subtitle">Real experiences from real guests</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {guestReviews.map((review, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.country}</p>
                    </div>
                    <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{review.room}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{review.date}</span>
                    <span>{review.helpful} found helpful</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Policies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Room Policies</h2>
            <p className="section-subtitle">Important information for your stay</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {roomPolicies.map((policy, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
                <h3 className="text-xl font-bold mb-2 text-primary-700">{policy.title}</h3>
                <p className="text-2xl font-bold mb-2">{policy.info}</p>
                <p className="text-sm text-gray-600">{policy.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Comparison */}
      <section id="compare" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Compare Rooms</h2>
            <p className="section-subtitle">Find the perfect accommodation for your needs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-primary-500 to-accent-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Feature</th>
                  {rooms.map((room, idx) => (
                    <th key={idx} className="px-6 py-4 text-center font-bold">{room.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-700">Price per night</td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center font-bold text-primary-600">{room.price}</td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4 font-semibold text-gray-700">Size</td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">{room.features.find(f => f.includes('m²'))}</td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-700">Max Guests</td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">{room.maxGuests} guests</td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4 font-semibold text-gray-700">Rating</td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FaStar className="text-amber-400" />
                        <span className="font-bold">{room.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-700">View Type</td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">{room.features[1]}</td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-700"></td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      <Link href="/contact" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Book Now
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Book Direct & Save</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get exclusive benefits when you book directly with us including best rate guarantee, free upgrades, and flexible cancellation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Check Availability
            </Link>
            <Link href="/offers" className="border-2 border-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-colors">
              View Special Offers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
