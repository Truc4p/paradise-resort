import Image from 'next/image';
import { FaClock, FaTag } from 'react-icons/fa';

const offers = [
  {
    title: 'Early Bird Special',
    description: 'Book 30 days in advance and save up to 25% on your stay',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',
    discount: '25% OFF',
    validUntil: 'Valid until March 31, 2026'
  },
  {
    title: 'Romantic Getaway Package',
    description: 'Includes champagne, couples spa treatment, and beachfront dinner',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070',
    discount: 'From $599',
    validUntil: 'Limited availability'
  },
  {
    title: 'Extended Stay Offer',
    description: 'Stay 4 nights or more and get your 5th night free',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    discount: '1 Night FREE',
    validUntil: 'Year-round offer'
  },
];

export default function Offers() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Special Offers</h2>
          <p className="section-subtitle">
            Exclusive deals and packages for your perfect escape
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                  <FaTag />
                  {offer.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaClock className="mr-2" />
                  {offer.validUntil}
                </div>
                <a href="/contact" className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 text-center">
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
