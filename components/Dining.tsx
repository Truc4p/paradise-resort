import Image from 'next/image';

const restaurants = [
  {
    name: 'Ocean Breeze Restaurant',
    cuisine: 'International Cuisine',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
    description: 'Fine dining with panoramic ocean views',
    hours: '6:00 AM - 11:00 PM'
  },
  {
    name: 'Seaside Grill',
    cuisine: 'BBQ & Seafood',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070',
    description: 'Fresh seafood and grilled specialties',
    hours: '12:00 PM - 10:00 PM'
  },
  {
    name: 'Sunset Lounge',
    cuisine: 'Bar & Cocktails',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069',
    description: 'Signature cocktails and light bites',
    hours: '4:00 PM - 2:00 AM'
  },
];

export default function Dining() {
  return (
    <section id="dining" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Culinary Excellence</h2>
          <p className="section-subtitle">
            Savor world-class cuisine at our signature restaurants
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{restaurant.cuisine}</p>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                <p className="text-sm text-gray-500">⏰ {restaurant.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
