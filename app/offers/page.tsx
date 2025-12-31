'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaTag, FaGift, FaSpa, FaUmbrellaBeach, FaHeart, FaUsers, FaBirthdayCake, FaPlane, FaStar, FaCalendarAlt, FaPercent, FaCrown } from 'react-icons/fa';

const offers = [
  {
    title: 'Early Bird Special',
    description: 'Book 30 days in advance and save up to 25% on your stay. Includes complimentary breakfast and late checkout.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',
    discount: '25% OFF',
    validUntil: 'Valid until March 31, 2026',
    includes: ['Complimentary Breakfast', 'Late Checkout', 'Free WiFi', 'Welcome Drink'],
    category: 'Popular',
  },
  {
    title: 'Romantic Getaway Package',
    description: 'Perfect for couples seeking a romantic escape. Includes champagne, couples spa treatment, and beachfront dinner.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070',
    discount: 'From $599',
    validUntil: 'Limited availability',
    includes: ['Champagne on Arrival', 'Couples Spa Treatment', 'Beachfront Dinner', 'Rose Petal Turndown'],
    category: 'Romance',
  },
  {
    title: 'Extended Stay Offer',
    description: 'Stay 4 nights or more and get your 5th night free. Perfect for those who want to truly unwind.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    discount: '1 Night FREE',
    validUntil: 'Year-round offer',
    includes: ['Free 5th Night', 'Daily Breakfast', 'Spa Credit $100', 'Airport Transfer'],
    category: 'Value',
  },
  {
    title: 'Family Fun Package',
    description: 'Create unforgettable memories with activities for all ages, kids club access, and family dining credits.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070',
    discount: '30% OFF',
    validUntil: 'Valid for bookings until June 30, 2026',
    includes: ['Kids Club Access', 'Family Activities', '$200 Dining Credit', 'Welcome Gifts for Kids'],
    category: 'Family',
  },
  {
    title: 'Spa & Wellness Retreat',
    description: 'Rejuvenate your mind and body with daily spa treatments, yoga sessions, and healthy gourmet dining.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070',
    discount: 'Save $400',
    validUntil: 'Valid until December 31, 2026',
    includes: ['Daily Spa Treatment', 'Yoga Sessions', 'Wellness Consultation', 'Healthy Cuisine Menu'],
    category: 'Wellness',
  },
  {
    title: 'Last Minute Escape',
    description: 'Book within 48 hours of arrival and enjoy incredible savings on luxurious accommodations.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
    discount: '35% OFF',
    validUntil: 'Book 48 hours before arrival',
    includes: ['Instant Savings', 'Room Upgrade (Subject to Availability)', 'Welcome Cocktail', 'Breakfast Included'],
    category: 'Flash Deal',
  },
];

const seasonalOffers = [
  {
    season: 'Summer Paradise',
    period: 'June - August 2026',
    title: 'Beat the Heat Special',
    discount: 'Up to 40% OFF',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070',
    perks: ['Unlimited Pool Access', 'Water Sports Package', 'Ice Cream Daily', 'Beach Cabana'],
  },
  {
    season: 'Winter Wonderland',
    period: 'December - February 2027',
    title: 'Festive Season Getaway',
    discount: 'Up to 20% OFF + Extras',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2070',
    perks: ['Holiday Gala Access', 'Festive Dinner', 'Christmas Treats', 'New Year Celebration'],
  },
  {
    season: 'Spring Renewal',
    period: 'March - May 2026',
    title: 'Blossom & Bloom Package',
    discount: 'Up to 30% OFF',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070',
    perks: ['Garden Tours', 'Spring Spa Treatment', 'Outdoor Yoga', 'Nature Walk Guides'],
  },
];

const membershipBenefits = [
  {
    tier: 'Silver Member',
    icon: <FaStar />,
    discount: '10% off all bookings',
    benefits: ['Priority Check-in', 'Late Checkout', 'Welcome Gift', 'Birthday Bonus'],
    annualFee: 'Free to Join',
    color: 'from-gray-400 to-gray-500',
  },
  {
    tier: 'Gold Member',
    icon: <FaCrown />,
    discount: '15% off + Perks',
    benefits: ['Room Upgrades', 'Spa Discounts 20%', 'Dining Credit $100', 'Exclusive Events'],
    annualFee: '$299/year',
    color: 'from-amber-400 to-amber-600',
  },
  {
    tier: 'Platinum Member',
    icon: <FaCrown />,
    discount: '25% off + Premium Perks',
    benefits: ['Complimentary Nights', 'Personal Concierge', 'Airport Transfers', 'All Gold Benefits'],
    annualFee: '$799/year',
    color: 'from-purple-400 to-purple-600',
  },
];

const limitedTimeDeals = [
  {
    title: 'Flash Sale - Today Only!',
    description: 'Book any room type for dates in the next 30 days',
    discount: '45% OFF',
    countdown: '23:59:59',
    buttonText: 'Grab This Deal',
  },
  {
    title: 'Weekend Warrior',
    description: 'Friday to Sunday stays with complimentary activities',
    discount: 'From $399',
    countdown: 'This Weekend Only',
    buttonText: 'Book Weekend',
  },
];

export default function OffersPage() {
  const handleSubscribeNewsletter = () => {
    alert('Newsletter subscription coming soon! Get exclusive offers delivered to your inbox.');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Special Offers</h1>
          <p className="text-xl md:text-2xl mb-6">Exclusive deals and packages for your dream vacation</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="bg-accent-500 px-6 py-2 rounded-full font-bold">Save Up to 45%</span>
            <span className="bg-primary-500 px-6 py-2 rounded-full font-bold">Limited Time Only</span>
          </div>
        </div>
      </section>

      {/* Limited Time Deals */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {limitedTimeDeals.map((deal, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{deal.title}</h3>
                    <p className="text-white/90">{deal.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold mb-1">{deal.discount}</div>
                    <div className="text-sm flex items-center gap-1">
                      <FaClock /> {deal.countdown}
                    </div>
                  </div>
                </div>
                <Link href="/contact" className="block w-full bg-white text-red-600 text-center font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors mt-4">
                  {deal.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Offers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Packages & Offers</h2>
            <p className="section-subtitle">
              Carefully curated experiences designed for unforgettable moments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                    <FaTag />
                    {offer.discount}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 px-4 py-2 rounded-full font-semibold text-sm">
                    {offer.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{offer.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-sm text-gray-700 mb-2 flex items-center gap-2">
                      <FaGift className="text-primary-500" /> Package Includes:
                    </h4>
                    <ul className="space-y-1">
                      {offer.includes.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-accent-500">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4 pt-4 border-t">
                    <FaClock className="mr-2 text-primary-500" />
                    {offer.validUntil}
                  </div>
                  <Link href="/contact" className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 text-center">
                    Book This Offer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Seasonal Specials</h2>
            <p className="section-subtitle">Experience the magic of each season with exclusive perks</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {seasonalOffers.map((offer, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl">
                <div className="relative h-96">
                  <Image
                    src={offer.image}
                    alt={offer.season}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-2 flex items-center gap-2">
                      <FaCalendarAlt />
                      <span className="text-sm font-semibold">{offer.period}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{offer.season}</h3>
                    <p className="text-xl font-bold mb-4 text-accent-300">{offer.discount}</p>
                    <div className="space-y-1 mb-4">
                      {offer.perks.map((perk, idx) => (
                        <p key={idx} className="text-sm flex items-center gap-2">
                          <span className="text-accent-400">★</span> {perk}
                        </p>
                      ))}
                    </div>
                    <Link href="/contact" className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Program */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Membership Program</h2>
            <p className="text-xl text-gray-300">
              Join our loyalty program and unlock incredible benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipBenefits.map((tier, index) => (
              <div key={index} className={`bg-gradient-to-br ${tier.color} rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{tier.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{tier.tier}</h3>
                  <p className="text-3xl font-bold mb-1">{tier.discount}</p>
                  <p className="text-sm opacity-90">{tier.annualFee}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white mt-1">✓</span>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => alert(`${tier.tier} membership enrollment coming soon! Contact us for more details.`)}
                  className="w-full bg-white text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Occasions */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Celebrate Special Occasions</h2>
            <p className="section-subtitle">Make your milestone moments unforgettable</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <FaHeart />, title: 'Honeymoon Package', discount: 'From $899', color: 'from-red-400 to-pink-500' },
              { icon: <FaBirthdayCake />, title: 'Birthday Celebration', discount: '20% OFF', color: 'from-purple-400 to-pink-400' },
              { icon: <FaUsers />, title: 'Group Getaway', discount: 'From $99/person', color: 'from-blue-400 to-cyan-400' },
              { icon: <FaSpa />, title: 'Anniversary Special', discount: 'From $749', color: 'from-green-400 to-teal-400' },
            ].map((occasion, index) => (
              <div key={index} className={`bg-gradient-to-br ${occasion.color} text-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all`}>
                <div className="text-5xl mb-4">{occasion.icon}</div>
                <h3 className="text-xl font-bold mb-2">{occasion.title}</h3>
                <p className="text-2xl font-bold mb-4">{occasion.discount}</p>
                <Link href="/contact" className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Inquire Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="text-5xl mb-6 flex justify-center">
            <FaGift />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Exclusive Offers</h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter and be the first to know about flash sales, special promotions, and exclusive member-only deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button 
              onClick={handleSubscribeNewsletter}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Subscribe Now
            </button>
          </div>
          <p className="text-sm mt-4 opacity-90">
            🎁 Get 10% off your next booking when you subscribe!
          </p>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Terms & Conditions</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              All offers are subject to availability and may be withdrawn at any time. Blackout dates may apply. 
              Offers cannot be combined unless stated otherwise. Please contact our reservations team for complete 
              terms and conditions. Prices are per room per night unless otherwise specified.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
