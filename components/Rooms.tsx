import Image from 'next/image';

const rooms = [
  {
    name: 'Deluxe Ocean View',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
    price: '$250',
    description: 'Spacious room with stunning ocean views and private balcony',
    features: ['King Bed', 'Ocean View', 'Balcony', '45 m²']
  },
  {
    name: 'Premium Suite',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
    price: '$450',
    description: 'Luxurious suite with separate living area and panoramic views',
    features: ['King Bed', 'Living Room', 'Balcony', '75 m²']
  },
  {
    name: 'Presidential Villa',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
    price: '$850',
    description: 'Ultimate luxury with private pool and beachfront access',
    features: ['2 Bedrooms', 'Private Pool', 'Beach Access', '150 m²']
  },
];

export default function Rooms() {
  return (
    <section id="rooms" className="py-32 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-primary-600 font-semibold tracking-widest uppercase text-sm">Accommodations</span>
          </div>
          <h2 className="section-title">Luxurious Retreats</h2>
          <p className="section-subtitle mt-6">
            Choose from our carefully designed rooms and suites
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rooms.map((room, index) => (
            <div 
              key={index}
              className="luxury-card group"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-3xl font-bold">{room.name}</h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 font-light">from</div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">{room.price}</span>
                    <div className="text-sm text-gray-500 font-light">per night</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{room.description}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {room.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="bg-gradient-to-br from-primary-50 to-accent-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium border border-primary-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="btn-primary w-full uppercase tracking-wider">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
