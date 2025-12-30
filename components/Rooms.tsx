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
    <section id="rooms" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Luxurious Accommodations</h2>
          <p className="section-subtitle">
            Choose from our carefully designed rooms and suites
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{room.name}</h3>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">{room.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="btn-primary w-full">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
