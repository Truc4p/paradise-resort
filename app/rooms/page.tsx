import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaExpand, FaWifi, FaTv, FaCoffee, FaBath } from 'react-icons/fa';

const rooms = [
  {
    name: 'Deluxe Ocean View',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
    price: '$250',
    priceUnit: 'per night',
    description: 'Spacious room with stunning ocean views and private balcony. Perfect for couples or solo travelers seeking tranquility.',
    features: ['King Bed', 'Ocean View', 'Private Balcony', '45 m²'],
    amenities: ['Free WiFi', 'Smart TV', 'Coffee Maker', 'Minibar', 'Luxury Bathroom', 'Air Conditioning'],
    maxGuests: 2,
  },
  {
    name: 'Premium Suite',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
    price: '$450',
    priceUnit: 'per night',
    description: 'Luxurious suite with separate living area and panoramic views. Ideal for extended stays or special occasions.',
    features: ['King Bed', 'Living Room', 'Ocean View Balcony', '75 m²'],
    amenities: ['Free WiFi', 'Smart TV', 'Espresso Machine', 'Premium Minibar', 'Spa Bathroom', 'Workspace'],
    maxGuests: 3,
  },
  {
    name: 'Presidential Villa',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
    price: '$850',
    priceUnit: 'per night',
    description: 'Ultimate luxury with private pool and beachfront access. Experience unparalleled comfort and exclusive amenities.',
    features: ['2 Bedrooms', 'Private Pool', 'Beach Access', '150 m²'],
    amenities: ['Free WiFi', 'Smart TVs', 'Full Kitchen', 'Premium Minibar', 'Jacuzzi', 'Butler Service'],
    maxGuests: 6,
  },
];

export default function RoomsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
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
          <p className="text-xl md:text-2xl">Discover your perfect retreat</p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {rooms.map((room, index) => (
              <div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 bg-white rounded-2xl overflow-hidden shadow-xl`}
              >
                <div className="lg:w-1/2 relative h-96 lg:h-auto">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{room.name}</h2>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      {room.price}
                    </span>
                    <span className="text-gray-600">{room.priceUnit}</span>
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{room.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">Room Features</h3>
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

                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Link href="/contact" className="flex-1 btn-primary text-center">
                      Book Now
                    </Link>
                    <button className="flex-1 btn-secondary">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Compare Rooms</h2>
            <p className="section-subtitle">Find the perfect accommodation for your needs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-primary-500 to-accent-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  {rooms.map((room, idx) => (
                    <th key={idx} className="px-6 py-4 text-center">{room.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 font-semibold">Price per night</td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">{room.price}</td>
                  ))}
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Size</td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">{room.features.find(f => f.includes('m²'))}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 font-semibold">Max Guests</td>
                  {rooms.map((room, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">{room.maxGuests}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
