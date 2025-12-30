import { FaSwimmingPool, FaSpa, FaUtensilSpoon, FaWifi, FaCocktail, FaDumbbell } from 'react-icons/fa';

const features = [
  { icon: FaSwimmingPool, title: 'Infinity Pool', description: 'Stunning oceanfront infinity pool' },
  { icon: FaSpa, title: 'Luxury Spa', description: 'Premium spa and wellness center' },
  { icon: FaUtensilSpoon, title: 'Fine Dining', description: 'Multiple gourmet restaurants' },
  { icon: FaWifi, title: 'Free WiFi', description: 'High-speed internet throughout' },
  { icon: FaCocktail, title: 'Beach Bar', description: 'Cocktails with ocean views' },
  { icon: FaDumbbell, title: 'Fitness Center', description: 'State-of-the-art gym facilities' },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">World-Class Amenities</h2>
          <p className="section-subtitle">
            Everything you need for an unforgettable stay
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300"
            >
              <feature.icon className="text-5xl text-primary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
