'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaUtensils, FaGlassMartini, FaConciergeBell, FaLeaf, FaAward, FaStar, FaWineGlass, FaCoffee, FaFish } from 'react-icons/fa';

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

const culinaryExperiences = [
  {
    title: 'Chef\'s Table Experience',
    description: 'An intimate dining experience where our executive chef prepares a multi-course tasting menu right before your eyes.',
    icon: <FaAward />,
    price: 'From $150 per person',
    duration: '3 hours',
  },
  {
    title: 'Wine Tasting Evening',
    description: 'Explore our curated selection of international wines paired with artisanal cheeses and canapés.',
    icon: <FaWineGlass />,
    price: 'From $80 per person',
    duration: '2 hours',
  },
  {
    title: 'Beach BBQ Dinner',
    description: 'A romantic beachfront dining experience under the stars with fresh grilled seafood and live entertainment.',
    icon: <FaFish />,
    price: 'From $120 per person',
    duration: '2.5 hours',
  },
  {
    title: 'Cooking Masterclass',
    description: 'Learn to prepare signature dishes with our culinary team in an interactive hands-on session.',
    icon: <FaUtensils />,
    price: 'From $95 per person',
    duration: '2 hours',
  },
];

const dietaryOptions = [
  { name: 'Vegetarian', icon: <FaLeaf />, color: 'text-green-600' },
  { name: 'Vegan', icon: <FaLeaf />, color: 'text-green-700' },
  { name: 'Gluten-Free', icon: <FaUtensils />, color: 'text-amber-600' },
  { name: 'Halal', icon: <FaStar />, color: 'text-purple-600' },
  { name: 'Kosher', icon: <FaStar />, color: 'text-blue-600' },
];

const chefSpecials = [
  {
    name: 'Mediterranean Seabass',
    chef: 'Chef Antonio Rossi',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070',
    description: 'Pan-seared Mediterranean seabass with herb-crusted potatoes, grilled vegetables, and saffron butter sauce',
    price: '$48',
  },
  {
    name: 'Wagyu Beef Wellington',
    chef: 'Chef Marcus Chen',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070',
    description: 'Premium Wagyu beef wrapped in puff pastry with mushroom duxelles and foie gras, served with truffle jus',
    price: '$68',
  },
  {
    name: 'Lobster Thermidor',
    chef: 'Chef Isabella Laurent',
    image: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=2070',
    description: 'Classic French dish with fresh lobster in a creamy brandy sauce, gratinated with Gruyère cheese',
    price: '$62',
  },
];

const breakfastMenu = {
  title: 'All-Day Breakfast',
  hours: '6:00 AM - 12:00 PM',
  sections: [
    { name: 'Continental', items: ['Fresh Pastries', 'Seasonal Fruits', 'Yogurt & Granola', 'Assorted Cereals'] },
    { name: 'Hot Breakfast', items: ['Eggs Any Style', 'Pancakes & Waffles', 'French Toast', 'Breakfast Burrito'] },
    { name: 'Healthy Options', items: ['Açai Bowl', 'Avocado Toast', 'Smoothie Bowl', 'Egg White Omelette'] },
  ],
};

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
            <button 
              onClick={() => {
                // Create a simple menu document
                const menuContent = `
==============================================
RESORT DINING - FULL MENU
==============================================

APPETIZERS
----------
- Seared Scallops - $24
- Tuna Tartare - $22
- Crispy Calamari - $18
- Wagyu Carpaccio - $28

MAIN COURSES
------------
- Grilled Lobster Thermidor - $62
- Angus Beef Tenderloin - $48
- Pan-Seared Sea Bass - $42
- Truffle Risotto - $32

DESSERTS
--------
- Chocolate Lava Cake - $14
- Mango Cheesecake - $12
- Crème Brûlée - $13
- Tropical Fruit Platter - $16

CHEF'S SPECIALS
---------------
- Mediterranean Seabass - $48
- Wagyu Beef Wellington - $68
- Lobster Thermidor - $62

For reservations, please contact us.
Thank you for choosing our resort!
`;
                const blob = new Blob([menuContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'resort-dining-menu.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="btn-secondary hover:bg-primary-700 transition-colors cursor-pointer"
            >
              Download Full Menu
            </button>
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
              <button 
                onClick={() => {
                  // Scroll to culinary experiences section or show modal
                  const experiencesSection = document.querySelector('#culinary-experiences');
                  if (experiencesSection) {
                    experiencesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    alert('Event Spaces Information:\n\n' +
                      '• Grand Ballroom - Capacity: 200 guests\n' +
                      '• Oceanview Terrace - Capacity: 100 guests\n' +
                      '• Private Dining Room - Capacity: 30 guests\n' +
                      '• Beach Pavilion - Capacity: 80 guests\n\n' +
                      'Contact us for more details and booking.');
                  }
                }}
                className="btn-secondary hover:bg-gray-300 transition-colors cursor-pointer"
              >
                View Event Spaces
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Chef's Specials */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Chef's Signature Dishes</h2>
            <p className="text-gray-300 text-lg">
              Exclusive creations by our award-winning culinary team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {chefSpecials.map((dish, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-accent-500 text-white px-4 py-2 rounded-full font-bold">
                    {dish.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{dish.name}</h3>
                  <p className="text-accent-400 text-sm mb-3 font-semibold">{dish.chef}</p>
                  <p className="text-gray-300 leading-relaxed">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Experiences */}
      <section id="culinary-experiences" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Exclusive Culinary Experiences</h2>
            <p className="section-subtitle">
              Elevate your dining with our curated gastronomic adventures
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culinaryExperiences.map((experience, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
                <div className="text-4xl text-primary-600 mb-4">
                  {experience.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{experience.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {experience.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaClock className="text-primary-500" />
                    <span>{experience.duration}</span>
                  </div>
                  <p className="font-bold text-accent-600">{experience.price}</p>
                </div>
                <Link href="/contact" className="mt-6 inline-block w-full text-center bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breakfast Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-5xl mb-4 flex justify-center">
                <FaCoffee className="text-amber-600" />
              </div>
              <h2 className="section-title">{breakfastMenu.title}</h2>
              <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
                <FaClock className="text-primary-500" />
                {breakfastMenu.hours}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {breakfastMenu.sections.map((section, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-primary-700">{section.name}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-accent-500 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Breakfast Buffet</h3>
              <p className="text-gray-700 mb-4">
                Unlimited access to our extensive breakfast buffet with live cooking stations
              </p>
              <p className="text-3xl font-bold text-primary-600">$35 per person</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dietary Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dietary Accommodations</h2>
            <p className="text-gray-600 mb-8">
              We cater to all dietary requirements and preferences
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {dietaryOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-md">
                  <span className={`text-2xl ${option.color}`}>{option.icon}</span>
                  <span className="font-semibold text-gray-800">{option.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Guests Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "The Ocean Breeze Restaurant exceeded all expectations. The seafood was incredibly fresh and the ocean views made it a magical experience."
              </p>
              <p className="font-bold text-gray-900">- Sarah Mitchell</p>
              <p className="text-sm text-gray-500">New York, USA</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Chef's Table Experience was unforgettable. Watching the culinary artistry and tasting each perfectly prepared course was extraordinary."
              </p>
              <p className="font-bold text-gray-900">- Michael Chen</p>
              <p className="text-sm text-gray-500">Singapore</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "As a vegetarian, I was thrilled with the variety of options. Every dish was creative, delicious, and beautifully presented."
              </p>
              <p className="font-bold text-gray-900">- Priya Sharma</p>
              <p className="text-sm text-gray-500">Mumbai, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Indulge?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Reserve your table today and embark on an unforgettable culinary journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Make a Reservation
            </Link>
            <button className="border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-colors">
              View Full Menus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
