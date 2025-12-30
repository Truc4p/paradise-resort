import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaUtensils, FaGlassMartini, FaConciergeBell } from 'react-icons/fa';

const restaurants = [
  {
    name: 'Ocean Breeze Restaurant',
    cuisine: 'International Cuisine',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
    description: 'Fine dining with panoramic ocean views. Our signature restaurant offers an exquisite selection of international dishes prepared by award-winning chefs.',
    hours: '6:00 AM - 11:00 PM',
    specialties: ['Fresh Seafood', 'Premium Steaks', 'Vegetarian Options', 'Wine Pairing'],
    dressCode: 'Smart Casual',
    reservations: 'Recommended',
  },
  {
    name: 'Seaside Grill',
    cuisine: 'BBQ & Seafood',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070',
    description: 'Fresh seafood and grilled specialties served beachfront. Experience the taste of the ocean with our daily catch and premium cuts.',
    hours: '12:00 PM - 10:00 PM',
    specialties: ['Grilled Lobster', 'BBQ Ribs', 'Fresh Oysters', 'Beach BBQ'],
    dressCode: 'Casual',
    reservations: 'Walk-ins Welcome',
  },
  {
    name: 'Sunset Lounge',
    cuisine: 'Bar & Cocktails',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069',
    description: 'Signature cocktails and light bites with breathtaking sunset views. Our expert mixologists craft unique drinks inspired by local flavors.',
    hours: '4:00 PM - 2:00 AM',
    specialties: ['Craft Cocktails', 'Premium Spirits', 'Tapas', 'Live Music'],
    dressCode: 'Resort Casual',
    reservations: 'Not Required',
  },
];

const menuHighlights = [
  { category: 'Appetizers', items: ['Seared Scallops', 'Tuna Tartare', 'Crispy Calamari', 'Wagyu Carpaccio'] },
  { category: 'Main Courses', items: ['Grilled Lobster Thermidor', 'Angus Beef Tenderloin', 'Pan-Seared Sea Bass', 'Truffle Risotto'] },
  { category: 'Desserts', items: ['Chocolate Lava Cake', 'Mango Cheesecake', 'Crème Brûlée', 'Tropical Fruit Platter'] },
];

export default function DiningPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Dining Experience</h1>
          <p className="text-xl md:text-2xl">Culinary excellence meets ocean views</p>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Restaurants & Bars</h2>
            <p className="section-subtitle">
              Savor world-class cuisine at our signature venues
            </p>
          </div>

          <div className="space-y-16">
            {restaurants.map((restaurant, index) => (
              <div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 bg-white rounded-2xl overflow-hidden shadow-xl`}
              >
                <div className="lg:w-1/2 relative h-96 lg:h-auto">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h2>
                  <p className="text-primary-600 font-semibold text-xl mb-4">{restaurant.cuisine}</p>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{restaurant.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaClock className="text-primary-500" />
                        <span className="font-semibold">Hours</span>
                      </div>
                      <p className="text-gray-700">{restaurant.hours}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <FaConciergeBell className="text-primary-500" />
                        <span className="font-semibold">Reservations</span>
                      </div>
                      <p className="text-gray-700">{restaurant.reservations}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <FaUtensils className="text-primary-500" />
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="bg-accent-50 text-accent-700 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact" className="btn-primary w-full text-center inline-block">
                    Reserve a Table
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Menu Highlights</h2>
            <p className="section-subtitle">Signature dishes crafted by our culinary masters</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {menuHighlights.map((section, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {section.category}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-secondary">Download Full Menu</button>
          </div>
        </div>
      </section>

      {/* Private Dining */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">Private Dining & Events</h2>
            <p className="text-lg text-gray-700 mb-8">
              Host your special occasion in our exclusive private dining rooms with personalized menus and dedicated service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Inquire About Private Events
              </Link>
              <button className="btn-secondary">View Event Spaces</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
