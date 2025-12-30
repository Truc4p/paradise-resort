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
    <section className="py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-primary-600 font-semibold tracking-widest uppercase text-sm">Our Amenities</span>
          </div>
          <h2 className="section-title">World-Class Experiences</h2>
          <p className="section-subtitle mt-6">
            Everything you need for an unforgettable stay
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-accent-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <feature.icon className="text-6xl text-primary-600 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-3 relative z-10">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed relative z-10">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
